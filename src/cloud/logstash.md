---
title: logstash
---

## 一、安装logstash

[官方文档](https://www.elastic.co/guide/en/logstash/7.17/installing-logstash.html)

注意版本要和自己的es版本一致

下载地址：[logstash](https://www.elastic.co/cn/downloads/past-releases#logstash)   上传至服务器并进行解压。


## 二、下载mysql连接jar包

通过官网下载mysql连接jar包

下载地址：[mysql 连接jar包](https://www.mysql.com/)  也可以从本地maven仓库复制



## 三、移动jar包位置

将jar包移动至/logstash/logstash-core/lib/jars/下

## 四、创建mysql表

### 1、建表

``` sql
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `num` int DEFAULT NULL COMMENT '数量',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者',
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '修改者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
```

### 2、添加数据

到数据库表中添加记录



##  五、创建es索引

``` sql
PUT product
{
  "mappings": {
    "properties": {
      "id":{
        "type": "keyword"
      },
      "name":{
        "type": "text",
        "analyzer": "standard"
      },
      "num":{
        "type": "keyword"
      },
       "createTime":{
        "type": "date",
         "format": "yyyy-MM-dd HH:mm:ss"
      },
      "updateTime":{
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "creat_by":{
        "type": "keyword"
      },
      "update_by":{
        "type": "keyword"
      }
    }
  }
}
```

## 六、编写conf文件

1、进入logstash的bin目录下，创建文件product.conf，编辑文件。

``` text
input {
	stdin {}
    
	jdbc {
		type => "jdbc"
		 # 数据库连接地址
		jdbc_connection_string => "jdbc:mysql://localhost:3306/hygmall?characterEncoding=UTF-8&autoReconnect=true"
		 # 数据库连接账号密码；
		jdbc_user => "root"
		jdbc_password => "root"
		 # MySQL依赖包路径
		jdbc_driver_library => "D:\logstash-7.4.2\logstash-core\lib\jars\mysql-connector-java-8.0.30.jar"
		 # the name of the driver class for mysql
		jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
		 # 数据库重连尝试次数
		connection_retry_attempts => "3"
		 # 判断数据库连接是否可用，默认false不开启
		jdbc_validate_connection => "true"
		 # 数据库连接可用校验超时时间，默认3600S
		jdbc_validation_timeout => "3600"
		 # 开启分页查询（默认false不开启）；
		jdbc_paging_enabled => "true"
		 # 单次分页查询条数（默认100000,若字段较多且更新频率较高，建议调低此值）；
		jdbc_page_size => "500"
		 # statement为查询数据sql，如果sql较复杂，建议配通过statement_filepath配置sql文件的存放路径；
		 # sql_last_value为内置的变量，存放上次查询结果中最后一条数据tracking_column的值，此处即为ModifyTime；
		 # statement_filepath => "mysql/jdbc.sql"
		statement => "SELECT t.id as id,t.`name` as name,t.num as num,t.create_by as createBy,DATE_FORMAT(t.create_time,'%Y-%m-%d %H:%i:%s') as createTime,t.update_by as updateBy,DATE_FORMAT(t.update_time,'%Y-%m-%d %H:%i:%s') as updateTime  FROM product as t WHERE DATE_FORMAT(t.update_time,'%Y-%m-%d %H:%i:%s') >= DATE_FORMAT(:sql_last_value,'%Y-%m-%d %H:%i:%s') order by t.update_time asc"

		 # 是否将字段名转换为小写，默认true（如果有数据序列化、反序列化需求，建议改为false）；
		lowercase_column_names => false
		 # Value can be any of: fatal,error,warn,info,debug，默认info；
		sql_log_level => warn
	    # 是否记录上次执行结果，true表示会将上次执行结果的tracking_column字段的值保存到last_run_metadata_path指定的文件中；
		record_last_run => true
		 # 需要记录查询结果某字段的值时，此字段为true，否则默认tracking_column为timestamp的值；
		use_column_value => true
		 # 需要记录的字段，用于增量同步，需是数据库字段
		tracking_column => "updateTime"
		 # Value can be any of: numeric,timestamp，Default value is "numeric"
		tracking_column_type => timestamp
		 # record_last_run上次数据存放位置；
		last_run_metadata_path => "/data/last_time.txt"
		 # 是否清除last_run_metadata_path的记录，需要增量同步时此字段必须为false；
		clean_run => false
		 # 同步频率(分 时 天 月 年)，默认每分钟同步一次；
		schedule => "* * * * *"
	}
}

output {
	elasticsearch {
		# host => "localhost"
		# port => "9200"
		# 配置ES集群地址
		hosts => ["localhost:9200"]
		 # 索引名字，必须小写
		index => "product"
		 # 数据唯一索引（建议使用数据库KeyID）
		document_id => "%{id}"
	}
	stdout {
		codec => json_lines
	}
}
```

 2、建立缓存

用于记录上次同步的位置：last_time.txt

## 七、启动logstash

1、执行启动命令

进入安装logstash的bin目录，执行命令：

``` text
./logstash -f product.conf
```


2、结果

从Kibana中查询上面索引中的数据



3、修改mysql数据库数据

在conf文件中配置了定时同步的任务

修改用于增量同步的字段updateTime 或者新增了数据

ES中数据就同步过来了


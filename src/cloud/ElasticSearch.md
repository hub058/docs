---
title: ElasticSearch

---

[]

![1587014280437](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/timg.jfif)

# ElasticSearch

## 一、引言

### 1.1 海量数据

> 在海量数据中执行搜索功能时，如果使用MySQL，效率太低。

### 1.2 全文检索

> 在海量数据中执行全文搜索时，如果使用MySQL，效率太低。

### 1.3 高亮显示

> 将搜索关键字，以红色的字体展示。

## 二、ES概述

### 2.1 ES的介绍

> - ES是一个使用Java语言并且基于Lucene编写的搜索引擎框架，他提供了分布式的全文搜索功能，提供了一个统一的基于RESTful风格的WEB接口，官方客户端也对多种语言都提供了相应的API。
>
> - Lucene：Lucene本身就是一个搜索引擎的底层。
>
> - 分布式：ES主要是为了突出他的横向扩展能力。
>
> - 全文检索：将一段词语进行分词，并且将分出的单个词语统一的放到一个分词库中，在搜索时，根据关键字去分词库中检索，找到匹配的内容。（倒排索引）
>
> - RESTful风格的WEB接口：操作ES很简单，只需要发送一个HTTP请求，并且根据请求方式的不同，携带参数的不同，执行相应的功能。
>
> - 应用广泛：Github.com，WIKI，Gold Man用ES每天维护将近10TB的数据。

### 2.2 ES的由来

|                  ES回忆时光                  |
| :------------------------------------------: |
| ![1587029047688](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587029047688.png) |

### 2.3 ES和Solr

> - Solr在查询死数据时，速度相对ES更快一些。但是数据如果是实时改变的，Solr的查询速度会降低很多，ES的查询的效率基本没有变化。
> - Solr搭建基于需要依赖Zookeeper来帮助管理。ES本身就支持集群的搭建，不需要第三方的介入。
> - 最开始Solr的社区可以说是非常火爆，针对国内的文档并不是很多。在ES出现之后，ES的社区火爆程度直线上升，ES的文档非常健全。
> - ES对现在云计算和大数据支持的特别好。

### 2.4 倒排索引

> 将存放的数据，以一定的方式进行分词，并且将分词的内容存放到一个单独的分词库中。
>
> 当用户去查询数据时，会将用户的查询关键字进行分词。
>
> 然后去分词库中匹配内容，最终得到数据的id标识。
>
> 根据id标识去存放数据的位置拉取到指定的数据。

| 搜索：中国人                               | 分词库                                                       | 数据                                                        |
| ------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------- |
| 得到的结果：<br/>我是中国人<br/>我是大好人 | 我 1 2 3<br/>是 1 2 3<br/>中国人 1<br/>中国 1<br/>人 1 2<br/>大 2<br/>好人 2<br/>好 2<br/>谁 3<br/>要 4<br/>去 4<br/>哪 4 | 1、我是中国人<br/>2、我是大好人<br/>3、我是谁<br/>4、要去哪 |

|                           倒排索引                           |
| :----------------------------------------------------------: |
| ![1587278510541](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587278510541.png) |

### 2.5基本概念

#### 2.4.1 Index (索引)

动词 ，相当于Mysql 中的insert

名词， 相当于Mysql 中的 Database

#### 2.4.2 Type （类型）

在Index(索引)中 ，可以定义一个或多个类型。

类似Mysql 中的table ,每一种类型的数据放在一起

_doc: ElasticSearch 新版本默认的类型

#### 2.4.3 Document （文档）

保存在某个索引（index）下，某种类型（type）的一个数据（Document） ,文档是json 格式的，Document 就像是Mysql 中某个table里面的内容。

| MySQL           | ElasticSearch |
| --------------- | ------------- |
| DataBase 数据库 | Index 索引    |
| Table 表        | Type 类型     |
| Row 一行数据    | Document 文档 |

<img src="https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200913180053166.png" alt="image-20200913180053166" style="zoom:80%;" />

## 三、 ElasticSearch安装

### 3.1 安装ES&Kibana

```  shell
mkdir -p /opt/docker_elasticsearch/config
mkdir -p /opt/docker_elasticsearch/data
mkdir -p /opt/docker_elasticsearch/plugins
echo "http.host: 0.0.0.0"  >>  /opt/docker_elasticsearch/config/elasticsearch.yml
```

编写docker-compose.yml文件，192.168.174.128 IP地址换成自己的

```  yml
version: "3.1"
services:
 elasticsearch:
  image: daocloud.io/library/elasticsearch:7.4.2
  restart: always
  container_name: elasticsearch
  environment:
     - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
  volumes:
     - /opt/docker_elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
     - /opt/docker_elasticsearch/data:/usr/share/elasticsearch/data
     - /opt/docker_elasticsearch/plugins:/usr/share/elasticsearch/plugins
  ports:
     - 9200:9200
     - 9300:9300
 kibana:
   image: daocloud.io/library/kibana:7.4.2
   restart: always
   container_name: kibana
   ports:
     - 5601:5601
   environment:
     - elasticsearch_url=http://192.168.174.128:9200
   depends_on:
     - elasticsearch
```

9300端口为es集群间组件的通信端口，9200端口为浏览器访问的http协议resetful端口

记得给文件夹授权 `chmod 777 config` `chmod 777 data`

如果访问 `http://192.168.174.128:9200` 失败

查看日志是否vm内存配置过小elasticsearch启动时遇到的错误

问题翻译过来就是：elasticsearch用户拥有的内存权限太小，至少需要262144；

::: details 解决办法

解决办法1:
在 `/etc/sysctl.conf` 文件最后添加一行 `vm.max_map_count=262144`把宿主机内存配大一些

解决办法2:
启动时指定内存,咱们的安装方法就是启动时指定内存
:::

> 启动 `docker-compose up -d` 完成后，
>
> 在浏览器输入 `http://192.168.174.128:9200/` 看到ES欢迎信息说明安装成功！

```  json
{
    "name": "c1b07c4cc184",
    "cluster_name": "elasticsearch",
    "cluster_uuid": "GHZc8voLTA6XS-hUKb636g",
    "version": {
        "number": "7.4.2",
        "build_flavor": "default",
        "build_type": "docker",
        "build_hash": "2f90bbf7b93631e52bafb59b3b049cb44ec25e96",
        "build_date": "2019-10-28T20:40:44.881551Z",
        "build_snapshot": false,
        "lucene_version": "8.2.0",
        "minimum_wire_compatibility_version": "6.8.0",
        "minimum_index_compatibility_version": "6.0.0-beta1"
    },
    "tagline": "You Know, for Search"
}
```

 在浏览器输入 `http://192.168.174.128:5601/` 进入kibana

![image-20220601113143605](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220601113143605.png)

### 3.2 安装IK分词器

::: tip ik分词器就是 elasticsearch 的一个插件
由于直接访问Github很慢，下载IK分词器的地址替换为加速器的地址 <https://ghproxy.com/https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip>
:::

**进去到ES容器内部**，跳转到bin目录下，执行bin目录下的脚本文件：

```  shell
cd bin

./elasticsearch-plugin install https://ghproxy.com/https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip
```

执行 `elasticsearch-plugin list` 查看插件列表有没有 analysis-ik

![image-20220825110050475](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208251100206.png)

> 注意：分词器安装后，一定要重启ES！！！！
重启后，可以在kibana中验证分词器插件是否可用

``` json
# 不指定分词器
# 使用默认分词器 对中文是一个字一个字分词 
POST _analyze
{
  "text": "我是中国人"
}


# 验证中文的分词结果
# ik_smart 粗粒度的分词
POST _analyze
{
  "text": "我是中国人",
  "tokenizer": "ik_smart"
}


# 验证中文的分词结果
# ik_max_word 细粒度的分词
POST _analyze
{
  "text": "我是中国人",
  "tokenizer": "ik_max_word"
}

```

## 四、 ElasticSearch基本操作

### 4.1 ES的结构

#### 4.1.1 索引Index

> - ES的服务中，可以创建多个索引。
>
> - 每一个索引默认被分成5片存储。
>
> - 每一个分片都会存在至少一个备份分片。
>
> - 备份分片默认不会帮助检索数据，当ES检索压力特别大的时候，备份分片才会帮助检索数据。
>
> - 备份的分片必须放在不同的服务器中。
    >
    >   理解： 索引index是es 中最大的数据存储单位 ，和mysql 的区别是 一个索引（index）中可以存海量（几亿条）数据 ，如果我们要在几亿条数据中检索出几条想要的数据 效率会很低 所以 es 提供了 一种对索引进行分片的机制 ，ES 天然支持集群，在集群服务器中 ES 把一个索引进行分片 放在不同的服务器上 如下图 例如 有一亿条数据 分成两个分片 每个分片上有5000万条数据 这样做的好处 一是 提高查询速度 二是 提高数据的存储量，另外 为了保证数据的安全 每个主分片会有备份分片 主分片和备份分片在不同的服务器上 ， 比如 主分片2 挂掉了 在 ES服务1 上面 还有 主分片2的备份分片 ，这样在一定程度上保证了数据的安全性 避免数据的丢失。但是 如果 当前集群中 只有一台es服务器 那么 这台服务器上 放的都是主分片，没有备份分片，什么时候扩展了集群中的 另一台服务器 才会存放备份分片。

|                         索引分片备份                         |
| :----------------------------------------------------------: |
| ![1587048753470](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587048753470.png) |

#### 4.1.2 类型 Type

> 一个索引下，可以创建多个类型。
>
> [Ps：根据版本不同，类型的创建也不同。]()
>
> es7 版本 不推荐使用type ，但是还是能用，到后面的es 版本 就不能再使用type 了

|                             类型                             |
| :----------------------------------------------------------: |
| ![1587048924494](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587048924494.png) |

#### 4.1.3 文档 Doc

> 一个类型下，可以有多个文档。这个文档就类似于MySQL表中的多行数据。

|                             文档                             |
| :----------------------------------------------------------: |
| ![1587048972631](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587048972631.png) |

#### 4.1.4 属性 Field

> 一个文档中，可以包含多个属性。类似于MySQL表中的一行数据存在多个列。

|                             属性                             |
| :----------------------------------------------------------: |
| ![1587049031609](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587049031609.png) |

### 4.2 操作ES的RESTful语法

请求方式

> GET 查询
>
> POST 查询添加更新
>
> PUT 添加/更新
>
> DELETE 删除

Kibana快捷键操作：

> ctrl i  自动补全
>
> ctrl /  打开帮助文档
>
> ctrl Enter 执行当前选中的请求

- GET请求：

>`/_cat/nodes`：查看所有节点
>
>`/_cat/health`：查看es 健康状况
>
>`/_cat/master`：查看主节点
>
>`/_cat/indices`：查看所有索引 相当于 show databases;
>
>`/index`：查询索引信息 GET book 相当于查看 数据库表结构
>
>`/index/type/doc_id`：查询指定的文档信息
>
>注意:咱们用的是es7 直接使用type的话会给出警告信息咱们使用_doc代替type
>比如查询指定文档信息GET book/_doc/1 查询 book 索引中 id 为1 的文档信息

### 4.2 索引的操作

#### 4.2.1 创建一个索引

> 语法如下 先创建一个最简单的 先不指定他的结构化数据

```  sh
# 删除索引
DELETE book

# 查看ES中的全部索引
GET _cat/indices

# 创建索引,重复执行会报错
PUT book

# 创建索引同时手动指定配置信息
PUT book2
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}

# 查询索引详情的
GET book
```

#### 4.3.2 查看索引信息

> 语法如下 去management 中 查看索引信息
>
> Primaries 意思是 分片
>
> Replicas 意思是备份
>
> Health 健康状态黄色 表示不太健康 因为现在es 集群中只有一台服务器 备份分片没有地方存放 所以是黄色的健康状态， 如果 集群中有多台服务器 备份分片 就可以存储在别的服务器上 避免这台服务器挂掉 数据丢失问题
>
> 点索引的名字 可以查看索引的详细信息

```  sh
# get 索引名 查看索引信息相当于查看库的描述
GET book

# 查询指定的文档信息
GET book/_doc/1

# 查看所有索引 相当于 show databases
GET _cat/indices
```

![image-20201206130416212](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201206130416212.png)

|                           查看信息                           |
| :----------------------------------------------------------: |
| ![image-20220601151839010](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220601151839010.png) |

#### 4.2.3 删除索引

> 语法如下

```  json
# 删除索引
DELETE /book2
```

### 4.3 数据操作

- POST请求：`index/type/doc_id`

```  sh
# 添加数据的，如果索引不存在会自动创建索引
POST book/_doc/1
{
  "name":"吴承恩",
  "title":"西游记"
}

# 添加数据，自动生成ID
POST book/_doc/
{
  "name":"施耐庵",
  "title":"水浒传"
}

# 查看索引里的所有数据
POST book/_search

# 根据条件查询
POST book/_search
{
  "query": {
    "match": {
      "title": "西游记"
    }
  }
}

# 更新数据 book/_doc/id,在请求体中指定json字符串代表修改的具体信息，不是动态更新
POST book/_doc/k2v3HYEBfQIebKurLtEf
{
  "title":"三国"
}

# 动态更新语法
POST book/_update/2
{
  "doc":{
    "title":"西游记222"
  }
}
```

- PUT请求：

```  sh
# 添加或修改文档,第一次是添加（同样 索引不存在 也会创建索引） 后面再执行是修改
PUT book/_doc/3
{
  "name":"曹雪芹",
  "title":"红楼梦222"
}
```

- DELETE请求：

`DELETE book2`  删除book2 索引

`http://ip:port/index/type/doc_id`：删除指定的文档

```  sh
# 删除索引book中  id 为2 的文档
DELETE book/_doc/2
```

### 4.4 ES中Field可以指定的类型

> 字符串类型：
>
> text：一把被用于全文检索。 将当前Field进行分词。
>
> keyword：当前Field不会被分词。

>数值类型：
>
>long：取值范围为-9223372036854774808~922337203685477480(-2的63次方到2的63次方-1)，占用8个字节
>
>integer：取值范围为-2147483648~2147483647(-2的31次方到2的31次方-1)，占用4个字节
>
>short：取值范围为-32768~32767(-2的15次方到2的15次方-1)，占用2个字节
>
>byte：取值范围为-128~127(-2的7次方到2的7次方-1)，占用1个字节
>
>double：1.797693e+308~ 4.9000000e-324 (e+308表示是乘以10的308次方，e-324表示乘以10的负324次方)占用8个字节
>
>float：3.402823e+38 ~ 1.401298e-45(e+38表示是乘以10的38次方，e-45表示乘以10的负45次方)，占用4个字节
>
>half_float：精度比float小一半。
>
>scaled_float：根据一个long和scaled来表达一个浮点型，long-345，scaled-100 -> 3.45

> 布尔类型：
>
> boolean类型，表达true和false

> 二进制类型：
>
> binary类型暂时支持Base64 encode string

> 时间类型：
>
> date类型，针对时间类型指定具体的格式
>
> format 指定时间格式 yyyy-MM-dd

> 范围类型：
>
> long_range：赋值时，无需指定具体的内容，只需要存储一个范围即可，指定gt，lt，gte，lte
>
> integer_range：同上
>
> double_range：同上
>
> float_range：同上
>
> date_range：同上
>
> ip_range：同上

> 经纬度类型：
>
> geo_point：用来存储经纬度的：经度/纬度
>
> ip类型：
>
> ip：可以存储IPV4或者IPV6
>
> [其他的数据类型参考官网](https://www.elastic.co/guide/en/elasticsearch/reference/7.6/mapping-types.html)

### 4.5 创建索引并指定数据结构

> 语法如下
>
> ![image-20220601155154897](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220601155154897.png)

```  sh
# 创建索引，指定数据结构
PUT /book
{
  "settings": {
    # 分片数
    "number_of_shards": 5,
    # 备份数
    "number_of_replicas": 1
  },
  # 指定数据结构
  "mappings": {
    # 文档存储的Field
    "properties": {
      # Field属性名
      "name": {
     # 类型
        "type": "text",
     # 指定当前Field可以被作为查询的条件
        "index": true ,
     # 是否需要额外存储
        "store": false 
      },
      "author": {
          # keyword 也算是字符串类型 
        "type": "keyword"
      },
      "count": {
        "type": "long"
      },
      "on-sale": {
        "type": "date",
         # 时间类型的格式化方式 
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
      },
      "descr": {
        "type": "text"
      }
    }
  }
}
```

### 4.6 文档的操作

> 文档在ES服务中的唯一标识，`_index`，`_type`，`_id`三个内容为组合，锁定一个文档，
>
> 操作是添加还是修改删除。

#### 4.6.1 新建文档

> 自动生成_id

```  sh
# 添加文档，自动生成id，不推荐这种自动生成的id 
POST /book/_doc
{
  "name": "游山西村",
  "author": "陆游",
  "count": 100000,
  "on-sale": "2000-01-01",
  "descr": "山重水复疑无路，柳暗花明又一村"
}
```

> 手动指定_id

```  json
# 添加文档，手动指定id     推荐使用
PUT /book/_doc/1
{
  "name": "红楼梦",
  "author": "曹雪芹",
  "count": 10000000,
  "on-sale": "1985-01-01",
  "descr": "一个是阆苑仙葩，一个是美玉无瑕"
}
```

#### 4.6.2 修改文档

> doc覆盖式修改

```  json
# 修改文档   覆盖式修改  如果没有指定某个属性 这个属性会被覆盖掉  覆盖没了
PUT /book/_doc/1
{
  "name": "红楼梦",
  "author": "曹雪芹",
  "count": 4353453,
  "on-sale": "1985-01-01",
  "descr": "一个是阆苑仙葩，一个是美玉无瑕"
}
```

> update修改方式

```  json
# 修改文档，基于doc方式，不会覆盖之前的内容 指定哪一个属性 修改哪一个属性
POST book/_update/1
{
  "doc": {
    "descr":"一把辛酸泪，满纸荒唐言"
  }
}
```

#### 4.6.3 删除文档

> 根据id删除

```  json
# 根据id删除文档
DELETE book/_doc/1      # 删除id 为1 的文档
```

#### 4.6.4 补充

> 在kibana 可视化界面中可以看到 创建的索引信息

![image-20201026160812996](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201026160812996.png)

![image-20201026160904473](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201026160904473.png)

![image-20201026160922091](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201026160922091.png)

![image-20201026160941223](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201026160941223.png)

![image-20201026161008465](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201026161008465.png)

## 五、Java操作ElasticSearch【`重点`】

### 5.1 Spring Boot连接ES

> 1、创建springboot工程，选择依赖的模块【包含：spring-boot-starter-data-elasticsearch】依赖如下

```  xml
<properties>
    <java.version>1.8</java.version>
    <!-- 由于我们使用的es的版本是7.4.2 手动指定下ES的版本 -->
    <elasticsearch.version>7.4.2</elasticsearch.version>
</properties>

<dependencies>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
  </dependency>

  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-devtools</artifactId>
   <scope>runtime</scope>
   <optional>true</optional>
  </dependency>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-configuration-processor</artifactId>
   <optional>true</optional>
  </dependency>
  <dependency>
   <groupId>org.projectlombok</groupId>
   <artifactId>lombok</artifactId>
   <optional>true</optional>
  </dependency>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-test</artifactId>
   <scope>test</scope>
  </dependency>
 </dependencies>
```

> 2、配置文件 application.yml文件内容如下

```  yml
spring:
  elasticsearch:
    # 指定ElasticSearch连接信息
    uris: http://192.168.174.128:9200
```

> 3、单元测试

```  java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private RestHighLevelClient client;

    @Test
    void contextLoads() {
        System.out.println(client);
    }
}
```

> 看到控制台是输出：org.elasticsearch.client.RestHighLevelClient@47d023b7
>
> 表示整合成功！

### 5.2 Java操作索引

#### 5.2.1 创建索引

> 代码如下：**一定要注意导入的ES包的版本**
>
> 在pom.xml文件中修改es的版本
>
> ![image-20220825164557952](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208251654899.png)

![image-20220602093053981](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220602093053981.png)

```  java
package com.qf.bootes;

import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.json.JsonXContent;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.io.IOException;

@SpringBootTest
class BootEsApplicationTests {

    @Resource
    RestHighLevelClient client;

    @Test
    void contextLoads() {
        System.out.println(client);
    }

    /**
     * 索引的mappings结构
     * {
     *  "properties":{
     *      "name":{
     *          "type":"text"
     *      },
     *      "age":{
     *          "type":"integer"
     *      },
     *      "birthday":{
     *          "type":"date",
     *          "format":"yyyy-MM-dd"
     *      }
     *  }
     * }
     *
     * */
    @Test
    void createIndex() throws IOException {
        // 1、设置setting对象
        Settings settings = Settings.builder()
                .put("number_of_shards", 5)
                .put("number_of_replicas", 1)
                .build();
        // 2、设置mappings对象
        XContentBuilder mappings = JsonXContent.contentBuilder()
                .startObject()
                .startObject("properties")
                // name filed
                .startObject("name")
                .field("type", "text")
                .endObject()
                // age filed
                .startObject("age")
                .field("type", "integer")
                .endObject()
                // birthday filed
                .startObject("birthday")
                .field("type", "date")
                .field("format", "yyyy-MM-dd")
                .endObject()

                .endObject()
                .endObject();

        // 3、创建索引的请求对象 CreateIndexRequest
        CreateIndexRequest request = new CreateIndexRequest("person").settings(settings).mapping(mappings);

        // 4、使用client客户端发送创建索引的请求
        // 通过client 对象 把上面准备的 request 对象 发到es执行 
        CreateIndexResponse response = client.indices().create(request, RequestOptions.DEFAULT);

        // 5、打印返回值对象
        System.out.println(response);
    }

}
```

> 一定要注入导入的CreateIndexRequest这个包！！！
>
> ![image-20220825164120418](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208251655965.png)

#### 5.2.2 检查索引是否存在

> 代码如下

```  java
/**
* 判断索引是否存在
* */
@Test
public void testExist() throws IOException {
    //1. 准备request对象
    String index = "person";
    GetIndexRequest request = new GetIndexRequest(index);
    //2. 通过client去操作
    boolean exists = client.indices().exists(request, RequestOptions.DEFAULT);
    //3. 输出
    System.out.println(exists);
}
```

#### 5.2.3 删除索引

> 代码如下

```  java
@Test
public void testDelete() throws IOException {
    //1. 准备request对象
    String index = "person";
    DeleteIndexRequest request = new DeleteIndexRequest(index);
    //2. 通过client对象执行
    AcknowledgedResponse delete = client.indices().delete(request, RequestOptions.DEFAULT);
    //3. 获取返回结果
    System.out.println(delete.isAcknowledged());
}
```

### 5.3 Java操作文档

#### 5.3.1 添加文档操作

> 创建实体类

```  java
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Person {

    private Integer id;

    private String name;

    private Integer age;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

}
```

> 测试添加文档 方式一
>
> request.source(json, XContentType.JSON);

```  java
// 创建文档
@Test
void createDocumentJson() throws IOException {
    String index = "person";
    Person person = new Person(2,"李四",19,new Date());
    IndexRequest request = new IndexRequest(index);
    // 构造文档内容
    // 指定文档的ID
    request.id(person.getId().toString());
    // 指定文档的内容
    ObjectMapper mapper = new ObjectMapper();
    String json = mapper.writeValueAsString(person);
    request.source(json, XContentType.JSON);
    IndexResponse response = client.index(request, RequestOptions.DEFAULT);
    System.out.println(response);
}
```

> 测试添加文档 方式二
>
> request.source(map);

```  java
// 创建文档
@Test
void createDocumentMap() throws IOException {
    // 创建Map数据
    String index = "person";
    Map<String,Object> person = new HashMap<>();
    String id = "3";
    person.put("id",id);
    person.put("name","王五");
    person.put("age",20);
    person.put("birthday","2008-10-12");

    IndexRequest request = new IndexRequest(index);
    request.id(id);
    // 指定文档的内容
    request.source(person);
    IndexResponse response = client.index(request, RequestOptions.DEFAULT);
    System.out.println(response);
}
```

#### 5.3.2 修改文档

> 修改文档

```  java
// 修改文档
@Test
void updateDocumentMap() throws IOException {
    String index = "person";
    String docId= "3";
    // 更新哪个索引的哪条数据
    UpdateRequest update = new UpdateRequest(index,docId);
    // 更新的内容
    Map<String,Object> map = new HashMap<>();
    map.put("name","赵六");
    update.doc(map);
    // 发送更新请求
    UpdateResponse response = client.update(update, RequestOptions.DEFAULT);
    System.out.println(response);
}
```

#### 5.3.3 删除文档

> 代码如下

```  java
// 删除文档
@Test
void deleteDocument() throws IOException {
    // 构造删除索引请求 指定索引名 数据ID
    DeleteRequest delete = new DeleteRequest("person","3");
    DeleteResponse response = client.delete(delete, RequestOptions.DEFAULT);
    System.out.println(response);
}
```

### 5.4 Java批量操作文档

#### 5.4.1 批量添加

> 代码如下

```  java
/**
     * 批量添加
     * @throws IOException
     */
@Test
void testBulkCreateDoc() throws IOException {
    // 1、准备数据
    String index = "person";
    Person person1 = new Person(11, "王朝", 18, new Date());
    Person person2 = new Person(12, "马汉", 19, new Date());
    Person person3 = new Person(13, "张龙", 20, new Date());
    Person person4 = new Person(14, "赵虎", 21, new Date());
    // 转JSON
    ObjectMapper mapper = new ObjectMapper();
    String json1 = mapper.writeValueAsString(person1);
    String json2 = mapper.writeValueAsString(person2);
    String json3 = mapper.writeValueAsString(person3);
    String json4 = mapper.writeValueAsString(person4);

    // 2、构造一个执行批量操作的对象,将准备好的数据封装进去
    BulkRequest request = new BulkRequest();
    request.add(new IndexRequest(index).id(person1.getId().toString()).source(json1,XContentType.JSON));
    request.add(new IndexRequest(index).id(person2.getId().toString()).source(json2,XContentType.JSON));
    request.add(new IndexRequest(index).id(person3.getId().toString()).source(json3,XContentType.JSON));
    request.add(new IndexRequest(index).id(person4.getId().toString()).source(json4,XContentType.JSON));

    // 3、发送批量添加的请求
    BulkResponse bulkResponse = client.bulk(request, RequestOptions.DEFAULT);

    // 4、查看结果
    System.out.println(bulkResponse.status());
}
```

#### 5.4.2 批量删除

> 代码如下

```  java
@Test
void testBulkDeleteDoc() throws IOException {
    // 1、准备数据
    String index= "person";
    // 2、创建批量请求
    BulkRequest request = new BulkRequest();
    request.add(new DeleteRequest(index,"11"));
    request.add(new DeleteRequest(index,"12"));
    request.add(new DeleteRequest(index,"13"));
    request.add(new DeleteRequest(index,"14"));
    // 3、发送请求
    BulkResponse response = client.bulk(request, RequestOptions.DEFAULT);
    // 4、查看结果
    System.out.println(response.status());
}
```

### 5.5 ElasticSearch练习

> 创建索引，指定数据结构 索引名：sms-logs-index
>
> 结构如下：

|                          索引结构图                          |
| :----------------------------------------------------------: |
| ![1587137696912](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587137696912.png) |

##### 5.5.1代码

>实体类

```  java

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmsLogs {

    private String id;  // 唯一ID

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createDate;  // 创建时间

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date sendDate;  // 发送时间

    private String longCode;  //  发送的长号码

    private String mobile;  // 下发手机号

    private String corpName;   // 发送公司名称

    private String smsContent;  // 下发短信内容

    private Integer state;  // 短信下发状态 0 成功  1 失败

    private Integer operatorId;   // 运营商编号  1 移动  2 联通 3 电信

    private String province;  // 省份

    private String ipAddr;  // 下发服务器IP地址

    private Integer replyTotal;  // 短信状态报告返回时长（秒）

    private Integer fee;  // 费用

}

```

> 准备 测试练习数据

```  java
/**
 * 检索操作
 */

@SpringBootTest
public class SmsLogsTest {

    private static final String INDEX = "sms-logs-index";

    @Resource
    RestHighLevelClient client;

    // 创建索引
    // 中文分词器 日期格式 需要注意
    @Test
    void createIndex() throws IOException {
        // 1、settings
        Settings settings = Settings.builder()
                // 分片数
                .put("number_of_shards", 5)
                // 副本数
                .put("number_of_replicas", 1)
                .build();
        // 2、mappings
        XContentBuilder mappings = JsonXContent.contentBuilder()
                .startObject()
                .startObject("properties")
                // 指定属性
                .startObject("createDate")
                .field("type", "date")
                // 指定日期格式
                .field("format","yyyy-MM-dd HH:mm:ss")
                .endObject()
                .startObject("sendDate")
                .field("type", "date")
                .field("format","yyyy-MM-dd HH:mm:ss")
                .endObject()
                .startObject("longCode")
                .field("type", "keyword")
                .endObject()
                .startObject("mobile")
                .field("type", "keyword")
                .endObject()
                .startObject("corpName")
                .field("type", "text")
                // 中文内容的属性指定了分词器
                .field("analyzer", "ik_smart")
                .endObject()
                .startObject("smsContent")
                .field("type", "text")
                // ik_smart中文分词器
                .field("analyzer", "ik_smart")
                .endObject()
                .startObject("state")
                .field("type", "integer")
                .endObject()
                .startObject("operatorId")
                .field("type", "integer")
                .endObject()
                .startObject("province")
                .field("type", "keyword")
                .endObject()
                .startObject("ipAddr")
                .field("type", "ip")
                .endObject()
                .startObject("replyTotal")
                .field("type", "integer")
                .endObject()
                .startObject("fee")
                .field("type", "long")
                .endObject()
                .endObject()
                .endObject();
        // 3、创建索引的请求 指定了：索引名称 settings配置信息 mappings索引的数据结构
        CreateIndexRequest request = new CreateIndexRequest(INDEX).settings(settings).mapping(mappings);
        // 4、发送创建索引的请求
        CreateIndexResponse response = client.indices().create(request, RequestOptions.DEFAULT);
        System.out.println(response.isAcknowledged());
    }


    /**
     * 添加测试数据
     *
     * @throws IOException ioexception
     */
    @Test
    public void addTestData() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        BulkRequest request = new BulkRequest();

        SmsLogs smsLogs = new SmsLogs();
        smsLogs.setMobile("13800000000");
        smsLogs.setCorpName("途虎养车");
        smsLogs.setCreateDate(new Date());
        smsLogs.setSendDate(new Date());
        smsLogs.setIpAddr("10.126.2.9");
        smsLogs.setLongCode("10690000988");
        smsLogs.setReplyTotal(10);
        smsLogs.setState(0);
        smsLogs.setSmsContent("【途虎养车】亲爱的张三先生/女士，您在途虎购买的货品(单号TH123456)已 到指定安装店多日，" + "现需与您确认订单的安装情况，请点击链接按实际情况选择（此链接有效期为72H）。您也可以登录途 虎APP进入" + "“我的-待安装订单”进行预约安装。若您在服务过程中有任何疑问，请致电400-111-8868向途虎咨 询。");
        smsLogs.setProvince("北京");
        smsLogs.setOperatorId(1);
        smsLogs.setFee(3);
        smsLogs.setId("21");
        request.add(new IndexRequest(INDEX).id("21").source(mapper.writeValueAsString(smsLogs), XContentType.JSON));

        smsLogs.setId("22");
        smsLogs.setMobile("13700000001");
        smsLogs.setProvince("上海");
        smsLogs.setSmsContent("【途虎养车】亲爱的刘红先生/女士，您在途虎购买的货品(单号TH1234526)已 到指定安装店多日，" + "现需与您确认订单的安装情况，请点击链接按实际情况选择（此链接有效期为72H）。您也可以登录途 虎APP进入" + "“我的-待安装订单”进行预约安装。若您在服务过程中有任何疑问，请致电400-111-8868向途虎咨 询。");
        request.add(new IndexRequest(INDEX).id("22").source(mapper.writeValueAsString(smsLogs), XContentType.JSON));


        // -------------------------

        SmsLogs smsLogs1 = new SmsLogs();
        smsLogs1.setMobile("13100000000");
        smsLogs1.setCorpName("盒马鲜生");
        smsLogs1.setCreateDate(new Date());
        smsLogs1.setSendDate(new Date());
        smsLogs1.setIpAddr("10.126.2.9");
        smsLogs1.setLongCode("10660000988");
        smsLogs1.setReplyTotal(15);
        smsLogs1.setState(0);
        smsLogs1.setSmsContent("【盒马】您尾号12345678的订单已开始配送，请在您指定的时间收货不要走开 哦~配送员：" + "刘三，电话：13800000000");
        smsLogs1.setProvince("北京");
        smsLogs1.setOperatorId(2);
        smsLogs1.setFee(5);
        smsLogs1.setId("23");
        request.add(new IndexRequest(INDEX).id("23").source(mapper.writeValueAsString(smsLogs1), XContentType.JSON));

        smsLogs1.setMobile("18600000001");
        smsLogs1.setProvince("上海");
        smsLogs1.setId("24");
        smsLogs1.setSmsContent("【盒马】您尾号7775678的订单已开始配送，请在您指定的时间收货不要走开 哦~配送员：" + "王五，电话：13800000001");
        request.add(new IndexRequest(INDEX).id("24").source(mapper.writeValueAsString(smsLogs1), XContentType.JSON));

        // -------------------------

        SmsLogs smsLogs2 = new SmsLogs();
        smsLogs2.setMobile("15300000000");
        smsLogs2.setCorpName("滴滴打车");
        smsLogs2.setCreateDate(new Date());
        smsLogs2.setSendDate(new Date());
        smsLogs2.setIpAddr("10.126.2.8");
        smsLogs2.setLongCode("10660000988");
        smsLogs2.setReplyTotal(50);
        smsLogs2.setState(1);
        smsLogs2.setSmsContent("【滴滴单车平台】专属限时福利！青桔/小蓝月卡立享5折，特惠畅骑30天。" + "戳 https://xxxxxx退订TD");
        smsLogs2.setProvince("上海");
        smsLogs2.setOperatorId(3);
        smsLogs2.setFee(7);
        smsLogs2.setId("25");
        request.add(new IndexRequest(INDEX).id("25").source(mapper.writeValueAsString(smsLogs2), XContentType.JSON));

        smsLogs2.setMobile("18000000001");
        smsLogs2.setProvince("武汉");
        smsLogs2.setId("26");
        smsLogs2.setSmsContent("【滴滴单车平台】专属限时福利！青桔/小蓝月卡立享5折，特惠畅骑30天。" + "戳 https://xxxxxx退订TD");
        request.add(new IndexRequest(INDEX).id("26").source(mapper.writeValueAsString(smsLogs2), XContentType.JSON));


        // -------------------------

        SmsLogs smsLogs3 = new SmsLogs();
        smsLogs3.setMobile("13900000000");
        smsLogs3.setCorpName("招商银行");
        smsLogs3.setCreateDate(new Date());
        smsLogs3.setSendDate(new Date());
        smsLogs3.setIpAddr("10.126.2.8");
        smsLogs3.setLongCode("10690000988");
        smsLogs3.setReplyTotal(50);
        smsLogs3.setState(0);
        smsLogs3.setSmsContent("【招商银行】尊贵的李四先生,恭喜您获得华为P30 Pro抽奖资格,还可领100 元打" + "车红包,仅限1天");
        smsLogs3.setProvince("上海");
        smsLogs3.setOperatorId(1);
        smsLogs3.setFee(8);
        smsLogs3.setId("27");
        request.add(new IndexRequest(INDEX).id("27").source(mapper.writeValueAsString(smsLogs3), XContentType.JSON));

        smsLogs3.setMobile("13990000001");
        smsLogs3.setProvince("武汉");
        smsLogs3.setId("28");
        smsLogs3.setSmsContent("【招商银行】尊贵的李四先生,恭喜您获得华为P30 Pro抽奖资格,还可领100 元打" + "车红包,仅限1天");
        request.add(new IndexRequest(INDEX).id("28").source(mapper.writeValueAsString(smsLogs3), XContentType.JSON));

        // -------------------------

        SmsLogs smsLogs4 = new SmsLogs();
        smsLogs4.setMobile("13700000000");
        smsLogs4.setCorpName("中国平安保险有限公司");
        smsLogs4.setCreateDate(new Date());
        smsLogs4.setSendDate(new Date());
        smsLogs4.setIpAddr("10.126.2.8");
        smsLogs4.setLongCode("10690000998");
        smsLogs4.setReplyTotal(18);
        smsLogs4.setState(0);
        smsLogs4.setId("29");
        smsLogs4.setSmsContent("【中国平安】奋斗的时代，更需要健康的身体。中国平安为您提供多重健康保 障，在奋斗之路上为您保驾护航。退订请回复TD");
        smsLogs4.setProvince("武汉");
        smsLogs4.setOperatorId(1);
        smsLogs4.setFee(5);
        request.add(new IndexRequest(INDEX).id("29").source(mapper.writeValueAsString(smsLogs4), XContentType.JSON));

        smsLogs4.setMobile("13990000002");
        smsLogs4.setProvince("武汉");
        smsLogs4.setId("30");
        smsLogs4.setSmsContent("【招商银行】尊贵的王五先生,恭喜您获得iphone 56抽奖资格,还可领5 元打" + "车红包,仅限100天");
        request.add(new IndexRequest(INDEX).id("30").source(mapper.writeValueAsString(smsLogs4), XContentType.JSON));

        // -------------------------

        SmsLogs smsLogs5 = new SmsLogs();
        smsLogs5.setMobile("13600000000");
        smsLogs5.setCorpName("中国移动");
        smsLogs5.setCreateDate(new Date());
        smsLogs5.setSendDate(new Date());
        smsLogs5.setIpAddr("10.126.2.8");
        smsLogs5.setLongCode("10650000998");
        smsLogs5.setReplyTotal(60);
        smsLogs5.setState(0);
        smsLogs5.setSmsContent("【北京移动】尊敬的客户137****0000，5月话费账单已送达您的139邮箱，" + "点击查看账单详情 http://y.10086.cn/; " + " 回Q关闭通知，关注“中国移动139邮箱”微信随时查账单【中国移动 139邮箱】");
        smsLogs5.setProvince("武汉");
        smsLogs5.setOperatorId(1);
        smsLogs5.setFee(4);
        smsLogs5.setId("31");
        request.add(new IndexRequest(INDEX).id("31").source(mapper.writeValueAsString(smsLogs5), XContentType.JSON));

        smsLogs5.setMobile("13990001234");
        smsLogs5.setProvince("山西");
        smsLogs5.setId("32");
        smsLogs5.setSmsContent("【北京移动】尊敬的客户137****1234，8月话费账单已送达您的126邮箱，\" + \"点击查看账单详情 http://y.10086.cn/; \" + \" 回Q关闭通知，关注“中国移动126邮箱”微信随时查账单【中国移动 126邮箱】");
        request.add(new IndexRequest(INDEX).id("32").source(mapper.writeValueAsString(smsLogs5), XContentType.JSON));
        // ------------------------

        BulkResponse response = client.bulk(request, RequestOptions.DEFAULT);
        System.out.println(response);
        System.out.println("OK!");
    }

}

```

## 六、ElasticSearch的各种查询

### 6.1 term&terms查询【`重点`】

#### 6.1.1 term查询

> term的查询是代表完全匹配，搜索之前不会对你搜索的关键字进行分词，对你的关键字去文档分词库中去匹配内容。

```  sh
# term查询
POST /sms-logs-index/_search
{
  "from": 0,     # limit ?
  "size": 5,   # limit x,?
  "query": {
    "term": {    # 完整匹配
      "province": {
        "value": "北京"    # 拿这个 北京 去完整匹配   不会分词匹配
      }
    }
  }
}
```

注意这里对 term的理解 即 对 field 类型text 和 keyword 的理解 ，term 是拿这个查询条件不进行分词去匹配文档中的内容， 而文档中的内容 如果是text 类型，会对这个 field 进行分词 ，如果分词后的内容 没有和 term 的 查询条件匹配上 ，那么term 查询 就查不出来结果， 如果文档中的内容 是 keyword ，就不会对文档中的进行分词，此时就需要term 的完整匹配查询  才能查到数据。

 总结  term 不对查询条件进行分词，field是text或者keyword 类型  分别是 对文档内容分词（text）和不分词(keyword)

```  sh
# 查询结果
{
  "took" : 2,    # 查询用了2毫秒
  "timed_out" : false,    # 是否超时  没有超时
  "_shards" : {    # 分片信息
    "total" : 3,   # 一共使用三个分片
    "successful" : 3,   # 成功了三个分片
    "skipped" : 0,    # 跳过
    "failed" : 0      # 失败
  },
  "hits" : {           # 查询命中
    "total" : {         # 总命中
      "value" : 2,      # 命中数
      "relation" : "eq"  # 查询关系
    },
    "max_score" : 0.6931472,    # 匹配分数   匹配度越高  分数越高
    "hits" : [
      {
        "_index" : "sms-logs-index",
        "_type" : "_doc",
        "_id" : "21",
        "_score" : 0.6931472,
        "_source" : {
          "corpName" : "途虎养车",
          "createDate" : 1607833538978,
          "fee" : 3,
          "ipAddr" : "10.126.2.9",
          "longCode" : "10690000988",
          "mobile" : "13800000000",
          "operatorId" : 1,
          "province" : "北京",
          "replyTotal" : 10,
          "sendDate" : 1607833538978,
          "smsContent" : "【途虎养车】亲爱的张三先生/女士，您在途虎购买的货品(单号TH123456)已 到指定安装店多日，现需与您确认订单的安装情况，请点击链接按实际情况选择（此链接有效期为72H）。您也可以登录途 虎APP进入“我的-待安装订单”进行预约安装。若您在服务过程中有任何疑问，请致电400-111-8868向途虎咨 询。",
          "state" : 0
        }
      },
      {
        "_index" : "sms-logs-index",
        "_type" : "_doc",
        "_id" : "23",
        "_score" : 0.6931472,
        "_source" : {
          "corpName" : "盒马鲜生",
          "createDate" : 1607833539131,
          "fee" : 5,
          "ipAddr" : "10.126.2.9",
          "longCode" : "10660000988",
          "mobile" : "13100000000",
          "operatorId" : 2,
          "province" : "北京",
          "replyTotal" : 15,
          "sendDate" : 1607833539131,
          "smsContent" : "【盒马】您尾号12345678的订单已开始配送，请在您指定的时间收货不要走开 哦~配送员：刘三，电话：13800000000",
          "state" : 0
        }
      }
    ]
  }
}
```

> 代码实现方式

```  java
@Test
void testTerm() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    builder.query(QueryBuilders.termQuery("province","北京"));
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

::: details 代码模板

由于后面要经常使用上面类似的代码，建议添加一个代码模板 LiveTemplate

![image-20220602144107186](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220602144107186.png)

:::

#### 6.1.2 terms查询

> terms和term的查询机制是一样，都不会将指定的查询关键字进行分词，直接去分词库中匹配，找到相应文档内容。
>
> terms是在针对一个字段包含多个值的时候使用。
>
> term：where province = 北京；
>
> terms：where province = 北京 or province = ？or province = ？
>
> 一个字段可以等于多个值 有点类似 in

```  sh
# terms查询
POST /sms-logs-index/_search
{
  "query": {
    "terms": {
      "province": [
        "北京",
        "山西",
        "武汉"
      ]
    }
  }
}
```

> 代码实现方式

```  java
/**
 * Terms查询
 * @throws IOException
 */
@Test
void testTerms() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.termsQuery("province","北京","河南","山西"));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

### 6.2 match查询【`重点`】

> match查询属于高层查询，他会根据你查询的字段类型不一样，采用不同的查询方式。
>
> - 查询的是日期或者是数值的话，他会将你基于的字符串查询内容转换为日期或者数值对待。
> - 如果查询的内容是一个不能被分词的内容（keyword），match查询不会对你指定的查询关键字进行分词。
> - 如果查询的内容时一个可以被分词的内容（text），match会将你指定的查询内容根据一定的方式去分词，去分词库中匹配指定的内容。
>
> match查询，实际底层就是多个term查询，将多个term查询的结果给你封装到了一起。

#### 6.2.1 match_all查询

> 查询全部内容，不指定任何查询条件。

```  sh
# match_all查询
POST /sms-logs-index/_search
{
  "query": {
    "match_all": {}
  }
}
```

> 代码实现方式

```  java
/**
 * MatchAll查询
 * @throws IOException
 */
@Test
void testMatchAll() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.matchAllQuery());
    builder.size(2);
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

#### 6.2.2 match查询

> 指定一个Field作为筛选的条件

```  sh
# match查询
POST /sms-logs-index/_search
{
  "query": {
    "match": {
      "smsContent": "收货安装" 
      }
  }
}
```

 smsContent 是 text 类型，match 会自动识别 会对查询条件也进行分词 也就是把`收获安装` 按照分词器规则 拆分，比如 拆为  收获  和 安装 去和文档进行匹配

> 代码实现方式

```  java
/**
 * Match查询
 * @throws IOException
 */
@Test
void testMatch() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.matchQuery("smsContent","收货安装"));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

#### 6.2.3 布尔match查询

> 基于一个Field匹配的内容，采用and或者or的方式连接

```  sh
# 布尔match查询
POST /sms-logs-index/_search
{
  "query": {
    "match": {
      "smsContent": {
        "query": "中国 健康",
        "operator": "and"      # 内容既包含中国也包含健康
      }
    }
  }
}

# 布尔match查询
POST /sms-logs-index/_search
{
  "query": {
    "match": {
      "smsContent": {
        "query": "中国 健康",
        "operator": "or"  # 内容包括健康或者包括中国
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java代码实现
@Test
public void booleanMatchQuery() throws IOException {
    //1. 创建Request
    SearchRequest request = new SearchRequest(index);
    //2. 指定查询条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    //-----------------选择AND或者OR
    builder.query(QueryBuilders.matchQuery("smsContent","中国 健康").operator(Operator.OR));
    request.source(builder);
    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);
    //4. 输出结果
    for (SearchHit hit : resp.getHits().getHits()) {
        System.out.println(hit.getSourceAsMap());
    }
}
```

#### 6.2.4 multi_match查询

> match针对一个field做检索，multi_match针对多个field进行检索，多个field对应一个text。

```  sh
# multi_match 查询,多个field只要有查询的关键字就能查到
POST /sms-logs-index/_search
{
  "query": {
    "multi_match": {
      "query": "北京",     # 指定text
      "fields": ["province","smsContent"]    # 指定field们
    }
  }
}
```

> 代码实现方式

```  java
// java代码实现
@Test
public void multiMatchQuery() throws IOException {
    //1. 创建Request
    SearchRequest request = new SearchRequest(index);
    //2. 指定查询条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    builder.query(QueryBuilders.multiMatchQuery("北京","province","smsContent"));
    request.source(builder);
    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);
    //4. 输出结果
    for (SearchHit hit : resp.getHits().getHits()) {
        System.out.println(hit.getSourceAsMap());
    }
}
```

### 6.3 其他查询

#### 6.3.1 id查询

> 根据id查询 where id = ?

```  json
# id查询      
GET /sms-logs-index/_doc/1
```

> 代码实现方式

```  java
// Java代码实现
@Test
public void findById() throws IOException {
    //1. 创建GetRequest
    GetRequest request = new GetRequest(index,"1");
    //2. 执行查询
    GetResponse resp = client.get(request, RequestOptions.DEFAULT);
    //3. 输出结果
    System.out.println(resp.getSourceAsMap());
}
```

#### 6.3.2 ids查询

> 根据多个id查询，类似MySQL中的where id in（id1，id2，id2...）

```  json
# ids查询
POST /sms-logs-index/_search
{
  "query": {
    "ids": {
      "values": ["1","2","3"]
    }
  }
}
```

> 代码实现方式

```  java
/**
 * IdsQuery查询
 * @throws IOException
 */
@Test
void testIdsQuery() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.idsQuery().addIds("21","22","23"));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

#### 6.3.3 prefix查询

> 前缀查询，可以通过一个关键字去指定一个Field的前缀，从而查询到指定的文档。
>
> 针对keyword类型，可以进行前缀查询

```  sh
#prefix 查询
POST /sms-logs-index/_search
{
  "query": {
    "prefix": {
      "province": {
        "value": "北"
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java实现前缀查询
@Test
public void findByPrefix() throws IOException {
    //1. 创建SearchRequest
    SearchRequest request = new SearchRequest(index);
    
    //2. 指定查询条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    builder.query(QueryBuilders.prefixQuery("province","北"));
    request.source(builder);

    //3. 执行
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 输出结果
    for (SearchHit hit : resp.getHits().getHits()) {
        System.out.println(hit.getSourceAsMap());
    }
}
```

#### 6.3.4 fuzzy查询

> 模糊查询，我们输入字符的大概（比如 出现错别字），ES就可以去根据输入的内容大概去匹配一下结果。

```  sh
# fuzzy查询
POST /sms-logs-index/_search
{
  "query": {
    "fuzzy": {
      "corpName": {
        "value": "盒马先生",
        "prefix_length": 2 # 指定前面几个字符是不允许出现错误的
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java代码实现Fuzzy查询
@Test
void testFuzzy() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.fuzzyQuery("corpName","盒马先生").prefixLength(2));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

#### 6.3.5 wildcard查询

> 通配查询，和MySQL中的like是一个套路，可以在查询时，在字符串中指定通配符*和占位符？
>
> *号匹配多个字符 ?匹配一个字符

```  sh
# wildcard 查询
POST /sms-logs-index/_search
{
  "query": {
    "wildcard": {
      "corpName": {
        "value": "中国*"    # 可以使用*和？指定通配符和占位符
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java代码实现Wildcard查询
@Test
void testWildCard() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.wildcardQuery("corpName","中国*"));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
```

#### 6.3.6 range查询

> 范围查询，只针对数值类型，对某一个Field进行大于或者小于的范围指定
>
> 可以使用 gt：>      gte：>=     lt：<     lte：<=

```  sh
# range查询
POST /sms-logs-index/_search
{
  "query": {
    "range": {
      "fee": {
        "gt": 5,
        "lte": 10
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java实现range范围查询
@Test
void testRange() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.rangeQuery("fee").gt(5).lte(10));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

#### 6.3.7 regexp查询

> 正则查询，通过你编写的正则表达式去匹配内容。
>
> [Ps：prefix，fuzzy，wildcard和regexp查询效率相对比较低，要求效率比较高时，避免去使用]()

```  sh
# regexp 查询
POST /sms-logs-index/_search
{
  "query": {
    "regexp": {
      "mobile": "180[0-9]{8}"    # 编写正则
    }
  }
}
```

> 代码实现方式

```  java
// Java代码实现正则查询
@Test
void testRegExp() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    builder.query(QueryBuilders.regexpQuery("mobile","18[0-9]{9}"));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

### 6.4 深分页Scroll

> ES对from + size是有限制的，from和size二者之和不能超过1W
>
> 原理：
>
> - from+size在ES查询数据的方式：
>   - 第一步先将用户指定的关键进行分词。
>   - 第二步将词汇去分词库中进行检索，得到多个文档的id。
>   - 第三步去各个分片中去拉取指定的**全部数据**。耗时较长。
>   - 第四步将数据根据score进行排序。耗时较长。
>   - 第五步根据from的值，将查询到的数据舍弃一部分。
>   - 第六步返回结果。
> - scroll+size在ES查询数据的方式：
>   - 第一步先将用户指定的关键进行分词。
>   - 第二步将词汇去分词库中进行检索，得到多个文档的id。
>   - 第三步将文档的id存放在一个ES的上下文中。
>   - 第四步根据你指定的size的个数去ES中检索指定个数的数据，拿完数据的文档id，会从上下文中移除。
>   - 第五步如果需要下一页数据，直接去ES的上下文中，找后续内容。
>   - 第六步循环第四步和第五步
>
> [Scroll查询方式，不适合做实时的查询]()

- 执行scroll查询，返回第一页数据，并且将文档id信息存放在ES上下文中，指定生存时间1m

``` shell
POST /sms-logs-index/_search?scroll=1m
{
    "query": {
        "match_all": {}
     },
    "size": 2,
    "sort": [ # 排序      默认是根据id字段排序
        {
         "fee": { # 自定义排序字段   也可以指定多个字段排序，比如 fee一样时，按照另一个字段排序
           "order": "desc"    
         }
     }
    ]
}
```

- 根据scroll查询下一页数据

``` shell
POST /_search/scroll
{
"scroll_id": "<根据上面第一步得到的scorll_id去指定>",
"scroll": "<scorll信息的生存时间>" 
# 第二次查询 要重新指定上下文存活时间  要不然第二次查询之后  上下文就没了
}
```

- 当全部查询完之后 这个 scroll_id 对应的es上下文中的doc id 都被移除干净了

- 删除scroll在ES上下文中的数据

``` shell
DELETE /_search/scroll/scroll_id
```

> 代码实现方式

``` java
// Java实现scroll分页
@Test
void testScroll() throws IOException {
    //1、SearchRequest
    SearchRequest request = new SearchRequest("sms-logs-index");
    //指定scroll信息
    request.scroll(TimeValue.timeValueMinutes(1L));

    //2、指定查询条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    builder.size(2);
    builder.query(QueryBuilders.matchAllQuery());
    request.source(builder);
    //3、执行查询
    SearchResponse response = client.search(request, RequestOptions.DEFAULT);
    //4、获取结果
    String scrollId = response.getScrollId();
    System.out.println("=====首页=====");
    for (SearchHit hit : response.getHits().getHits()) {
        System.out.println(hit.getSourceAsMap());
    }

    //5、循环获取下一页
    while (true) {
        SearchScrollRequest scrollRequest = new SearchScrollRequest(scrollId);
        scrollRequest.scroll(TimeValue.timeValueMinutes(1L));
        SearchResponse searchResponse = client.scroll(scrollRequest, RequestOptions.DEFAULT);
        SearchHit[] hits = searchResponse.getHits().getHits();
        if (Arrays.isNullOrEmpty(hits)) {
            //判断没有查询到数据-退出循环
            System.out.println("=====结束=====");
            break;
        } else {
            //查询到了数据，输出
            System.out.println("=====下一页=====");
            for (SearchHit hit : hits) {
                System.out.println(hit.getSourceAsMap());
            }
        }
    }

    //6、清除scroll
    //创建CLearScrollRequest
    ClearScrollRequest clearScrollRequest = new ClearScrollRequest();
    //指定ScrollId
    clearScrollRequest.addScrollId(scrollId);
    //删除ScrollId
    ClearScrollResponse clearScrollResponse = client.clearScroll(clearScrollRequest, RequestOptions.DEFAULT);
    //输出结果
    System.out.println(clearScrollResponse.isSucceeded());
}
```

### 6.5 delete-by-query

> 根据term，match等查询方式去删除大量的文档
>
> [Ps：如果你需要删除的内容，是index下的大部分数据，推荐创建一个全新的index，将保留的文档内容，添加到全新的索引]()

```  json
# delete-by-query
POST /sms-logs-index/_delete_by_query
{
  "query": {
    "range": {
      "fee": {
        "lt": 4
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java代码实现
@Test
public void deleteByQuery() throws IOException {
    //1. 创建DeleteByQueryRequest
    DeleteByQueryRequest request = new DeleteByQueryRequest(index);
    
    //2. 指定检索的条件 和SearchRequest指定Query的方式不一样
    request.setQuery(QueryBuilders.rangeQuery("fee").lt(4));

    //3. 执行删除
    BulkByScrollResponse resp = client.deleteByQuery(request, RequestOptions.DEFAULT);

    //4. 输出返回结果
    System.out.println(resp.toString());

}
```

### 6.6 复合查询

#### 6.6.1 bool查询

> 复合过滤器，将你的多个查询条件，以一定的逻辑组合在一起。
>
> - must： 所有的条件，用must组合在一起，表示And的意思
> - must_not：将must_not中的条件，全部都不能匹配，标识Not的意思
> - should：所有的条件，用should组合在一起，表示Or的意思
>
> must  必须同时满足 and
>
> should 任意条件符合即可 or
>
> must_not 取反 not

```  json
# 查询省份为武汉或者北京
# 运营商不是联通
# smsContent中包含中国和平安
# bool查询
POST sms-logs-index/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "province": {
              "value": "武汉"
            }
          }
        },
        {
          "term": {
            "province": {
              "value": "北京"
            }
          }
        }
      ],
      "must_not": [
        {
          "term": {
            "operatorId": {
              "value": "2"
            }
          }
        }
      ],
      "must": [
        {
          "match": {
            "smsContent": "中国"
          }
        },
        {
          "match": {
            "smsContent": "平安"
          }
        }
      ]
    }
  }
}
```

> 代码实现方式

```  java
// Java代码实现Bool查询
@Test
void testBool() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest(index);
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
    // 查询省份为武汉或者北京
    boolQueryBuilder.should(QueryBuilders.termQuery("province","武汉"));
    boolQueryBuilder.should(QueryBuilders.termQuery("province","北京"));
    // 运营商不是联通
    boolQueryBuilder.mustNot(QueryBuilders.termQuery("operatorId",2));
    // smsContent中包含中国和平安
    boolQueryBuilder.must(QueryBuilders.matchQuery("smsContent","中国"));
    boolQueryBuilder.must(QueryBuilders.matchQuery("smsContent","平安"));
    builder.query(boolQueryBuilder);
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

#### 6.6.2 boosting查询

> boosting查询可以帮助我们去影响查询后的score。
>
> - positive：只有匹配上positive的查询的内容，才会被放到返回的结果集中。
> - negative：如果匹配上和positive并且也匹配上了negative，就可以降低这样的文档score。
> - negative_boost：指定系数，必须小于1.0
>
> 关于查询时，分数是如何计算的：
>
> - 搜索的关键字在文档中出现的频次越高，分数就越高
> - 指定的文档内容越短，分数就越高
> - 我们在搜索时，指定的关键字也会被分词，这个被分词的内容，被分词库匹配的个数越多，分数越高

```  json
# boosting查询  收货安装
POST /sms-logs-index/_search
{
  "query": {
    "boosting": {
      "positive": {
        "match": {
          "smsContent": "收货安装"
        }
      },
      "negative": {
        "match": {
          "smsContent": "王五"
        }
      },
      "negative_boost": 0.5
    }
  }
}
```

> 代码实现方式

```  java
// Java实现Boosting查询
@Test
public void BoostingQuery() throws IOException {
    //1. 创建SearchRequest
    SearchRequest request = new SearchRequest(index);
    request.types(type);

    //2. 指定查询条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    BoostingQueryBuilder boostingQuery = QueryBuilders.boostingQuery(
            QueryBuilders.matchQuery("smsContent", "收货安装"),
            QueryBuilders.matchQuery("smsContent", "王五")
    ).negativeBoost(0.5f);

    builder.query(boostingQuery);
    request.source(builder);

    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 输出结果
    for (SearchHit hit : resp.getHits().getHits()) {
        System.out.println(hit.getSourceAsMap());
    }
}
```

### 6.7 filter查询

> query，根据你的查询条件，去计算文档的匹配度得到一个分数，并且根据分数进行排序，不会做缓存的。
>
> filter，根据你的查询条件去查询文档，不去计算分数，而且filter会对经常被过滤的数据进行缓存。

```  json
# filter查询
POST /sms-logs-index/_search
{
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "corpName": "盒马鲜生"
          }
        },
        {
          "range": {
            "fee": {
              "lte": 4
            }
          }
        }
      ]
    }
  }
}
```

> 代码实现方式

```  java
// Java实现filter操作
@Test
public void filter() throws IOException {
    //1. SearchRequest
    SearchRequest request = new SearchRequest(index);
    request.types(type);

    //2. 查询条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
    boolQuery.filter(QueryBuilders.termQuery("corpName","盒马鲜生"));
    boolQuery.filter(QueryBuilders.rangeQuery("fee").lte(5));

    builder.query(boolQuery);
    request.source(builder);

    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 输出结果
    for (SearchHit hit : resp.getHits().getHits()) {
        System.out.println(hit.getSourceAsMap());
    }


}
```

### 6.8 高亮查询【`重点`】

> 高亮查询就是你用户输入的关键字，以一定的特殊样式展示给用户，让用户知道为什么这个结果被检索出来。
>
> 高亮展示的数据，本身就是文档中的一个Field，单独将Field以highlight的形式返回给你。
>
> ES提供了一个highlight属性，和query同级别的。
>
> - fragment_size：指定高亮数据展示多少个字符回来。默认100个
> - pre_tags：指定前缀标签，举个栗子< font color="red" >
> - post_tags：指定后缀标签，举个栗子< /font >
> - fields：指定哪几个Field以高亮形式返回

|                            效果图                            |
| :----------------------------------------------------------: |
| ![image-20201208195749344](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201208195749344.png) |

> RESTful实现

```  json
# highlight查询
POST /sms-logs-index/_search
{
  "query": {
    "match": {
      "smsContent": "盒马"
    }
  },
  "highlight": {
    "fields": {
      "smsContent": {}
    },
    "pre_tags": "<font color='red'>",
    "post_tags": "</font>",
    "fragment_size": 10
  }
}
```

> 代码实现方式

```  java
// Java实现高亮查询
@Test
public void highLightQuery() throws IOException {
    //1. SearchRequest
    SearchRequest request = new SearchRequest(index);
    
    //2. 指定查询条件（高亮）
    SearchSourceBuilder builder = new SearchSourceBuilder();
    //2.1 指定查询条件
    builder.query(QueryBuilders.matchQuery("smsContent","盒马"));
    //2.2 指定高亮
    HighlightBuilder highlightBuilder = new HighlightBuilder();
    highlightBuilder.field("smsContent",10)
            .preTags("<font color='red'>")
            .postTags("</font>");
    builder.highlighter(highlightBuilder);

    request.source(builder);

    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 获取高亮数据，输出
    for (SearchHit hit : resp.getHits().getHits()) {
        System.out.println(hit.getHighlightFields().get("smsContent"));
    }
}
```

### 6.9 聚合查询【`重点`】

> aggregations :提供了从数据中分组和提取数据的能力，最简单的聚合方法大致等于SQL GROUP BY 和 SQL 聚合函数。在ES中可以执行搜索返回hits(命中结果)，并且同时返回聚合结果，把一个响应中所有hits (命中结果)分隔开的能力，这是非常强大且有效的 ，可以执行多个查询和聚合，并且在一次使用中得到各自的返回结果，使用一次简洁和简化的API来避免网络往返。
>
> ES的聚合查询和MySQL的聚合查询类似，ES的聚合查询相比MySQL要强大的多，ES提供的统计数据的方式多种多样。

```  json
# ES聚合查询的RESTful语法
POST /index/_search
{
    "aggs": {
        "名字（agg）": {   # 名字 自定义 只会影响返回结果的名字
            "agg_type": {    # es 给咱们提供的聚合类型   咱们直接使用即可 
                "属性": "值"
            }
        }
    }
}
```

#### 6.9.1 去重计数查询

> 去重计数，即Cardinality，第一步先将返回的文档中的一个指定的field进行去重，统计一共有多少条

```  json
# 去重计数查询 北京 上海 武汉 山西
# 这些记录中 一共出现了几个省份
POST /sms-logs-index/_search
{
  "aggs": {
    "agg": {
      "cardinality": {
        "field": "province"     # 按照 field 进行去重
      }
    }
  }
}
```

> 代码实现方式

```  java
//  Java代码实现去重计数查询
@Test
public void cardinality() throws IOException {
    //1. 创建SearchRequest
    SearchRequest request = new SearchRequest(index);
    request.types(type);

    //2. 指定使用的聚合查询方式
    SearchSourceBuilder builder = new SearchSourceBuilder();
    builder.aggregation(AggregationBuilders.cardinality("agg").field("province"));

    request.source(builder);

    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 获取返回结果
    Cardinality agg = resp.getAggregations().get("agg");
    long value = agg.getValue();
    System.out.println(value);
}
```

#### 6.9.2 范围统计

> 统计一定范围内出现的文档个数，比如，针对某一个Field的值在 0~100,100~200,200~300之间文档出现的个数分别是多少。
>
> 范围统计可以针对普通的数值，针对时间类型，针对ip类型都可以做相应的统计。
>
> range，date_range，ip_range

> 数值统计:
>
> from: 包含当前值
>
> to: 不包含当前值

```  json
# 数值方式范围统计
POST /sms-logs-index/_search
{
  "aggs": {
    "agg": {
      "range": {
        "field": "fee",
        "ranges": [
          {
            "to": 5        # 没有等于的效果
          },
          {
            "from": 5,    # from有包含当前值的意思    有等于的效果 
            "to": 10
          },
          {
            "from": 10
          }
        ]
      }
    }
  }
}
```

> 时间范围统计

```  json
# 时间方式范围统计
POST /sms-logs-index/_search
{
  "aggs": {
    "agg": {
      "date_range": {
        "field": "createDate",
        "format": "yyyy", 
        "ranges": [
          {
            "to": 2000
          },
          {
            "from": 2000
          }
        ]
      }
    }
  }
}
```

> ip统计方式

```  json
# ip方式 范围统计
POST /sms-logs-index/_search
{
  "aggs": {
    "agg": {
      "ip_range": {
        "field": "ipAddr",
        "ranges": [
          {
            "to": "10.126.2.9"
          },
          {
            "from": "10.126.2.9"
          }
        ]
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java实现数值 范围统计
@Test
public void range() throws IOException {
    //1. 创建SearchRequest
    SearchRequest request = new SearchRequest(index);
   

    //2. 指定使用的聚合查询方式
    SearchSourceBuilder builder = new SearchSourceBuilder();
    //---------------------------------------------
    builder.aggregation(AggregationBuilders.range("agg").field("fee")
                                        .addUnboundedTo(5)
                                        .addRange(5,10)
                                        .addUnboundedFrom(10));
    //---------------------------------------------
    request.source(builder);

    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 获取返回结果
    Range agg = resp.getAggregations().get("agg");
    for (Range.Bucket bucket : agg.getBuckets()) {
        String key = bucket.getKeyAsString();
        Object from = bucket.getFrom();
        Object to = bucket.getTo();
        long docCount = bucket.getDocCount();
        System.out.println(String.format("key：%s，from：%s，to：%s，docCount：%s",key,from,to,docCount));
    }
}
```

#### 6.9.3 统计聚合查询

> 他可以帮你查询指定Field的最大值，最小值，平均值，平方和等
>
> 使用：extended_stats

```  json
# 统计聚合查询
POST /sms-logs-index/_search
{
  "aggs": {
    "agg": {
      "extended_stats": {
        "field": "fee"
      }
    }
  }
}
```

> 代码实现方式

```  java
// Java实现统计聚合查询
@Test
public void extendedStats() throws IOException {
    //1. 创建SearchRequest
    SearchRequest request = new SearchRequest(index);
    request.types(type);

    //2. 指定使用的聚合查询方式
    SearchSourceBuilder builder = new SearchSourceBuilder();
    //---------------------------------------------
    builder.aggregation(AggregationBuilders.extendedStats("agg").field("fee"));
    //---------------------------------------------
    request.source(builder);

    //3. 执行查询
    SearchResponse resp = client.search(request, RequestOptions.DEFAULT);

    //4. 获取返回结果
    ExtendedStats agg = resp.getAggregations().get("agg");
    double max = agg.getMax();
    double min = agg.getMin();
    System.out.println("fee的最大值为：" + max + "，最小值为：" + min);
}
```

> 其他的聚合查询方式查看官方文档：<https://www.elastic.co/guide/en/elasticsearch/reference/6.5/index.html>

### 6.10 地图经纬度搜索

> ES中提供了一个数据类型 geo_point，这个类型就是用来存储经纬度的。
>
> 创建一个带geo_point类型的索引，并添加测试数据 [坐标拾取](http://api.map.baidu.com/lbsapi/getpoint/index.html)

```  json
# 创建一个索引，指定一个name，locaiton

# 创建一个map索引包含经纬度数据
PUT /map
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name":{
        "type": "text"
      },
      "location":{
        "type": "geo_point"
      }
    }
  }
}


PUT map/_doc/1
{
  "name": "月季公园",
  "location": {
    "lon": 113.6368,
    "lat": 34.773985
  }
}


PUT map/_doc/2
{
  "name": "郑州人民公园",
  "location": {
    "lon": 113.669581,
    "lat": 34.768197
  }
}


PUT map/_doc/3
{
  "name": "火车站",
  "location": {
    "lon": 113.665988,
    "lat": 34.752776
  }
}

# 查看所有数据
GET map/_search
```

#### 6.10.1 ES的地图检索方式

| 语法             | 说明                                             |
| ---------------- | ------------------------------------------------ |
| geo_distance     | 直线距离检索方式                                 |
| geo_bounding_box | 以两个点确定一个矩形，获取在矩形内的全部数据     |
| geo_polygon      | 以多个点，确定一个多边形，获取多边形内的全部数据 |

#### 6.10.2 基于RESTful实现地图检索

> geo_distance

```  json
# geo_distance 直线距离检索
POST map/_search
{
  "query": {
    "geo_distance": {
      "location": {   # 确定一个点
        "lon": 113.672455, # 确定半径默认为米，可以通过unit来指定
        "lat": 34.758619 # 指定形状为圆形
      },
      "distance": 2000,
      "distance_type": "arc"
    }
  }
}
```

> geo_bounding_box

```  json
# 两个点[左上角/右下角]确定一个矩形，查找内部的数据
POST map/_search
{
  "query": {
    "geo_bounding_box": {
      "location": {
        "top_left": {
          "lon": 113.616689,
          "lat": 34.768405
        },
        "bottom_right": {
          "lon": 113.695452,
          "lat": 34.768167
        }
      }
    }
  }
}

```

> geo_polygon

```  json
# geo_polygon

# 多边形
POST map/_search
{
  "query": {
    "geo_polygon": {
      "location": {
        "points": [
          {
            "lon": 113.624306,
            "lat": 34.778486
          },
          {
            "lon": 113.616976,
            "lat": 34.768286
          },
          {
            "lon": 113.675186,
            "lat": 34.747645
          },
          {
            "lon": 113.687834,
            "lat": 34.78406
          }
        ]
      }
    }
  }
}
```

#### 6.10.3 Java实现geo_polygon

```  java
// 基于Java实现geo_polygon查询
@Test
void testGeo() throws IOException {
    // 1、创建查询请求的对象
    SearchRequest searchRequest = new SearchRequest("map");
    // 2、查询条件构造器
    SearchSourceBuilder builder = new SearchSourceBuilder();
    // 3、设置查询条件
    // ------------
    List<GeoPoint> points = new ArrayList<>();
    points.add(new GeoPoint(34.778486,113.624306));
    points.add(new GeoPoint(34.768286,113.616976));
    points.add(new GeoPoint(34.747645,113.675186));
    points.add(new GeoPoint(34.78406,113.687834));
    builder.query(QueryBuilders.geoPolygonQuery("location",points));
    // ------------
    searchRequest.source(builder);
    // 4、执行查询
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    // 5、获取查询结果
    SearchHit[] hits = response.getHits().getHits();
    for (SearchHit hit : hits) {
        Map<String, Object> map = hit.getSourceAsMap();
        System.out.println(map);
    }
}
```

## 七、复杂检索练习

> 参考 <https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-search.html>
>
> <a href="/json/accounts.json">下载测试JSON文件</a>
>
> 打开这个网站以后是一堆json数据 我们复制一下这段json数据

然后我们打开kibana，输入如下命令，将数据保存进去

```  shell
POST /bank/_doc/_bulk
//这里把刚才网站的json数据复制进来
```

执行完毕后,执行以下这个代码

```  shell
GET /bank/_search
{
  "query": {
    "match_all": {}
  }
}
```

> 需求：
>
> 1. 查询地址中包含mill的
> 2. 按照年龄的值分布进行聚合[每个年龄的人数]
> 3. 按照平均薪资聚合
>
> 代码如下

```  java
@Test
public void searchData() throws IOException {
    //1.创建检索请求
    SearchRequest searchRequest = new SearchRequest("bank");
    //2.指定DSL检索条件
    SearchSourceBuilder builder = new SearchSourceBuilder();
    //3.构造检索条件
    //builder.query();
    //builder.from();
    //builder.size();
    //builder.aggregation();
    builder.query(QueryBuilders.matchQuery("address","mill"));
    // 按照年龄的值分布 进行聚合
    TermsAggregationBuilder ageAgg = AggregationBuilders.terms("ageAgg").field("age");
    builder.aggregation(ageAgg);
    // 按照平均薪资 聚合
    AvgAggregationBuilder balanceAvg = AggregationBuilders.avg("balanceAvg").field("balance");
    builder.aggregation(balanceAvg);
    // 检索条件DSL
    System.out.println("检索条件"+builder);
    searchRequest.source(builder);

    //4. 执行 检索
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    System.out.println(response.toString());

    //5. 分析结果，结果封装在response对象中

    //RestStatus status = response.status();  得到响应状态码
    //TimeValue took = response.getTook();   花费了多长时间
    //boolean timedOut = response.isTimedOut();  是否超时

    // 外层的hits
    SearchHits hits = response.getHits();   // 得到所有命中的记录

    //TotalHits totalHits = hits.getTotalHits();  // 得到 总记录数
    //long value = totalHits.value;   // 总记录数
    //TotalHits.Relation relation = totalHits.relation;   // 相关性得分
    //float maxScore = hits.getMaxScore();   //最大得分

    // 获取所有记录遍历内层的hits
    SearchHit[] searchHits = hits.getHits();
    for(SearchHit hit : searchHits){
        //String index = hit.getIndex();
        //String id = hit.getId();
        //float score = hit.getScore();
        //
        //String sourceAsString = hit.getSourceAsString();
        //Map<String, Object> sourceAsMap = hit.getSourceAsMap();  // 将返回的数据 转为map

        String sourceAsString = hit.getSourceAsString();
        //将返回的数据 转为对象
        Account account = new ObjectMapper().readValue(sourceAsString, Account.class);
        System.out.println("account:"+account);
    }

    //获取这次检索到的分析信息
    Aggregations aggregations = response.getAggregations();
    //List<Aggregation> aggregations1 = aggregations.asList();
    //for(Aggregation aggregation : aggregations1){
    //    System.out.println("当前聚合的名字："+aggregation.getName());
    //}

    Terms ageAgg1 = aggregations.get("ageAgg");
    for(Terms.Bucket bucket : ageAgg1.getBuckets()){
        String keyAsString = bucket.getKeyAsString();
        System.out.println("年龄："+keyAsString);
    }

    Avg balanceAvg1 = aggregations.get("balanceAvg");
    System.out.println("平均薪资："+balanceAvg1.getValue());
}

@Data
@ToString
static class Account{
    private int account_number;
    private int balance;
    private String firstname;
    private String lastname;
    private int age;
    private String gender;
    private String address;
    private String employer;
    private String email;
    private String city;
    private String state;

}
```

::: details  本文档代码

[仓库地址](http://124.223.190.53/2202/springboot-es.git)

:::

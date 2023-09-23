---
title: 智慧大棚环境搭建
---

**Mysql:**

ip:110.40.192.129

端口号: 3306

用户名: root

密码：qfjava

**Redis:**

ip:110.40.192.129

端口号: 6379

密码：qfjava

**MongoDB：**

ip：110.40.192.129

端口号：27017

数据库:admin

**RabbitMQ:**

ip：110.40.192.129

端口号：5672

可视化地址：http://110.40.192.129:15672

**EMQX：**

ip：110.40.192.129

端口号：1883

账号：admin

密码：public

可视化地址：http://110.40.192.129:18083/

## 一、基于Docker安装环境

### 1.1 搭建Mysql

1.创建文件夹

mkdir -p /usr/docker/mysql3306/conf

2.创建配置文件

vim /usr/docker/mysql3306/conf/my.cnf

内容如下所示：

```properties
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
symbolic-links=0
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
lower_case_table_names=1
```

3.运行命令创建Mysql容器

docker run -d --name mysql3306 -p 3306:3306 -v /usr/docker/mysql3306/conf/my.cnf:/etc/mysql/my.cnf -e MYSQL_ROOT_PASSWORD=qfjava  mysql:5.7

![image-20230614180000422](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141800485.png)

4.连接测试

ip:110.40.192.129

端口号: 3306

用户名: root

密码：qfjava

![image-20230614180210027](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141802087.png)

### 1.2 搭建Redis

1.创建文件夹

mkdir -p /docker/redis/redis6379/data
mkdir -p /docker/redis/redis6379/conf

2.创建配置文件

vim /docker/redis/redis6379/conf/redis.conf

文件内容如下所示：

requirepass 123456

3.运行命令创建Redis容器

docker run -d --name redis6379 -p 6379:6379  -v /docker/redis/redis6379/conf/redis.conf:/etc/redis/redis.conf -v /docker/redis/redis6379/data:/data  redis:7.0.9 redis-server /etc/redis/redis.conf

![image-20230614175542295](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141755506.png)

4.连接测试

ip:110.40.192.129



![image-20230614180725484](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141807607.png)

### 1.3 搭建MongoDB

1.创建对应的文件夹

mkdir -p /docker/mongodb/data

2.执行命令，创建容器

docker run -d --name mongo27017 -p 27017:27017 -v /docker/mongodb/data:/data/db  mongo

![image-20230613105907609](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131059654.png)

3.验证

Ip:110.40.192.129

![image-20230614180957054](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141809113.png)



### 1.4 搭建RabbitMQ

1.执行命令，创建容器

docker run -d --name rabbitmq5672  -p 15672:15672 -p 5672:5672 rabbitmq:management

![image-20221010103347640](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306061003976.png)

2.连接测试

点击访问：http://110.40.192.129:15672/

![image-20230606100357210](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306061003270.png)

注意：如果访问不到，请开放安全组：15672、5672端口



### 1.5 搭建EMQX

1.执行名称 创建容器

docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:5.0.26

![image-20230614182400985](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141824045.png)

2.连接测试

访问可视化页面：http://110.40.192.129:18083

默认的账号 和密码 ：admin/public

![image-20230614153313106](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141533221.png)

![image-20230614153535263](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141535341.png)

基于MQTTX连接测试MQTT服务器

![image-20230614152841932](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141528025.png)

![image-20230614153056575](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141530662.png)



![image-20230612202534811](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306122025987.png)


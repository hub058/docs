---
title: Nginx
---

![1586499306778](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/Nginx.png)


## 一、引言

### 1.1 代理问题

> 客户端到底要将请求发送给哪台服务器。

|                   发送给服务器1还是服务器2                   |
| :----------------------------------------------------------: |
| ![1589264952529](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1589264952529.png) |

### 1.2 负载均衡问题

> 如果所有客户端的请求都发送给了服务器1，那么服务器2将没有任何意义

|                         负载均衡问题                         |
| :----------------------------------------------------------: |
| ![1589265005701](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1589265005701.png) |



### 1.3 资源优化

> 客户端发送的请求可能是申请动态资源的，也有申请静态资源，但是都是去Tomcat中获取的

| 静态资源访问  |
| :----------------------------------------------------------: |
| ![1589265063451](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1589265063451.png) |



### 1.4 Nginx处理

|                   在搭建集群后，使用Nginx                    |
| :----------------------------------------------------------: |
| ![1589265181473](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1589265181473.png) |



## 二、Nginx概述

> Nginx是由俄罗斯人研发的，应对Rambler的网站，并且2004年发布的第一个版本。
>
> 1.Nginx 是一个高性能的Http和反向代理服务器，特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好。国内使用nginx的网站有很多，如 百度  京东 新浪 网易 淘宝 等
>
> 2.Nginx作为web 服务器 ： nginx 只能作为静态页面的web服务器，同时还支持CGI协议的动态语言，比如perl,php 等， 但是不支持java ,java程序只能通过与tomcat配合完成。nginx 专为性能优化而开发，性能是其最重要的考量，实现上 非常注重效率，能经受高负载的考验，有报告表明能支持高达50000个并发连接数。

|                          Nginx之父                           |
| :----------------------------------------------------------: |
| ![1586502874584](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586502874584.png) |



> Nginx的特点：
>
> - 稳定性极强。 7*24小时不间断运行。
> - Nginx提供了非常丰富的配置实例。
> - 占用内存小，并发能力强。
>
> tomcat 默认线程池线程线程数数  150   可以认为 tomcat 只能承受150个并发， nginx 最高承受50000以上并发



## 三、Nginx的安装

### 3.1 安装Nginx

> 使用Docker-Compose安装

``` shell
cd /opt
mkdir docker_nginx
cd docker_nginx
vim docker-compose.yml
```

docker-compose.yml 文件的内容如下：

``` yml
version: '3.1'
services:
  nginx:
    restart: always
    image: daocloud.io/library/nginx:1.12.0-alpine
    container_name: nginx
    ports:
      - 80:80     
```

然后启动： `docker-compose up -d  `

启动成功界面

![image-20220526161800570](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220526161800570.png)





### 3.2 Nginx的配置文件

> 关于Nginx的核心配置文件nginx.conf
>
> 现在可以进入NGINX容器，查看下/etc/nginx下的配置文件，稍后通过volumn映射出来

![image-20220526164436557](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220526164436557.png)



nginx.conf配置文件的内容如下：

``` json
user  nginx;     # Nginx用户  
worker_processes  1;   # 工作进程：数目。根据硬件调整，通常等于CPU数量或者2倍于CPU

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;    # pid（进程标识符）：存放路径。
# 以上统称为全局块， 
# worker_processes他的数值越大，Nginx的并发能力就越强
# error_log 代表Nginx的错误日志存放的位置

events {
    worker_connections  1024;   #每个工作进程的最大连接数量。根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行
}
# events块
# worker_connections他的数值越大，Nignx并发能力越强

http {   # http块
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
	# include代表引入一个外部的文件 -> /mime.types中放着大量的媒体类型
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;   # 日志

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;    # keepalive超时时间  单位是秒

    #gzip  on;
	#include /etc/nginx/conf.d/*.conf; -> 引入了conf.d目录下的以.conf为结尾的配置文件
    # 相当于引入外部的配置文件  咱们主要关注这个文件
    include /etc/nginx/conf.d/*.conf;
    
}

```



default.conf配置文件的内容如下：

``` json
# 这个是 /etc/nginx/conf.d/default.conf;   这个配置文件  大部分内容被注释掉了   是一些配置示例
server {
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;    
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```

**上面两个配置文件在这里不需要修改**。



### 3.3 修改docker-compose文件

> 为了方便修改Nginx配置，修改yml文件

``` yml
version: '3.1'
services:
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports:
      - 80:80
    volumes:
      - /opt/docker_nginx/conf.d/:/etc/nginx/conf.d
```

>这里注意  使用docker-compose 创建容器  挂载的容器卷里面的内容是空的  ，需要自己在容器卷内创建 配置文件。比如  默认端口  默认访问页面的配置  即上文的  default.conf 内的配置

在本地映射的数据卷的目录/opt/docker_nginx/conf.d/下面创建一个新的配置文件

``` sh
cd /opt/docker_nginx/conf.d/
vi default.conf
```

配置文件的内容如下：

``` yml
# 这个是 /etc/nginx/conf.d/default.conf
server {    # server 块是http 块中的 内容
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;    
    server_name  localhost;  # ip 
	
	# location块
	# root：将接收到的请求根据/usr/share/nginx/html去查找静态资源
	# index： 默认去上述的路径中找到index.html或者index.htm
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
 	
    #50x 错误页面跳转 
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

重启nginx： `docker-compose restart nginx ` 可以再次打开浏览器验证



![image-20220526170026597](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220526170026597.png)

> 我们看到的Nginx欢迎页面是在容器内部的 /usr/share/nginx/html 目录下的 index.html页面


## 四、Nginx的反向代理【`重点`】

### 4.1 正向代理和反向代理介绍

> 正向代理：
>
> - 正向代理服务是由客户端设立的。
> - 客户端了解代理服务器和目标服务器都是谁。
> - 帮助咱们实现突破访问权限，提高访问的速度，对目标服务器隐藏客户端的ip地址。

|                           正向代理                           |
| :----------------------------------------------------------: |
| ![1586512751639](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586512751639.png) |



> 反向代理：
>
> - 反向代理服务器是配置在服务端的。
> - 客户端是不知道访问的到底是哪一台服务器。
> - 达到负载均衡，并且可以隐藏服务器真正的ip地址。

![1586513061851](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586513061851.png)

### 4.2 基于Nginx实现反向代理

> 准备一个目标服务器。
>
> 启动了之前的tomcat服务器。
>
> `docker run -d -p 8080:8080 --name tomcat 镜像ID`
>
> 编写nginx的配置文件，通过Nginx访问到tomcat服务器。
>
> 配置文件是conf.d目录下的 default.conf文件内容如下

``` json
server {    # server 块是http 块中的 内容
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;
    server_name  localhost;  # ip

    location / {
        #root /usr/share/nginx/html;
        #index index.html index.htm;
        proxy_pass http://192.168.174.128:8080;
    }

    #50x 错误页面跳转
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```



--------



### 4.3 关于Nginx的location路径映射

前置条件：为了验证路径优先级问题，我们准备两台Tomcat服务器

本地准备两个文件夹 

-v 通过数据卷，可以把本地的目录映射到容器内部

| 本地的文件夹              | 映射到容器内的文件夹                           |
| ------------------------- | ---------------------------------------------- |
| /opt/docker_nginx/tomcat1 | Tomcat1容器内的 /usr/local/tomcat/webapps/ROOT |
| /opt/docker_nginx/tomcat2 | Tomcat2容器内的 /usr/local/tomcat/webapps/ROOT |

``` sh
# 准备两个tomcat  
docker run -d -p 8080:8080 --name tomcat1 -v /opt/docker_nginx/tomcat1:/usr/local/tomcat/webapps/ROOT  daocloud.io/library/tomcat:9.0.0.M22

docker run -d -p 8081:8080 --name tomcat2 -v /opt/docker_nginx/tomcat2:/usr/local/tomcat/webapps/ROOT  daocloud.io/library/tomcat:9.0.0.M22
```



Tomcat1目录下有个index.html文件，内容如下

``` jsp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Tomcat1的内容</h1>
</body>
</html>
```

Tomcat2目录下有个index.html文件 内容如下

``` jsp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Tomcat2的内容</h1>
</body>
</html>

```

效果如图

| Tomcat1                                                      | Tomcat2                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220815161127041](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151611299.png) | ![image-20220815161138192](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151611366.png) |



> 优先级关系如下：
>
> - location = /路径：优先级最高，精准匹配，一旦匹配， 不再去找其他匹配项。
> - location ^~ /路径：优先级次之，字符串匹配，一旦匹配， 不再去找其他匹配项。
> - location ~ 正则表达式：如果有多个location的正则能匹配的话，则使用正则表达式最长的那个。
> - location ~* 正则表达式：和location ~ 正则表达式相同，不过当前方式不区分大小写。
> - location /路径：常规方式，匹配前缀，优先级最低。
>
> **注意：有没有映射（匹配）上 是一回事    映射上了location     有没有找到  对应的资源  是另外一回事**
>
> 举个栗子：

``` json
# 直接匹配 优先级最高
location = / {
  # 精准匹配，主机名后面不能带任何的字符串
}

# 完全匹配 精确匹配 a
location /aaa/bbb/ccc/d.html {
    proxy_pass http://192.168.133.107:8080;
}


# 匹配开头路径 正则匹配 b
location ^~ /aaa/bbb {
  # 匹配所有以/aaa/bbb开头的路径，匹配后，不再筛选其他选项
}

# 正则匹配优先级 c
location ~ /aaa/bbb { 
  # 匹配所有以/aaa/bbb开头的路径
}

location ~ /aaa/bbb/ccc {
    proxy_pass http://192.168.133.107:8081;
}

# 正则匹配后缀    优先级4
location ~* \.(gif|jpg|png|js|css)$ {
  # 匹配以gif或者jpg或者png为结尾的路径
}

# 常规匹配   通用匹配   优先级5
location /xxx {
  # 匹配所有以/xxx开头的路径
}

# 全部通配     优先级6
location / {
  # 匹配全部路径  
}
```



nginx的conf.d/default.conf配置文件内容

``` xml
server {    # server 块是http 块中的 内容
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;
    server_name  localhost;  # ip

    location ^~ / {
        proxy_pass http://192.168.174.128:8080;
    }

    location ~ / {
        proxy_pass http://192.168.174.128:8081;
    }

    #50x 错误页面跳转
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

```

第一次比较  	`^~ /优先级高于  ~ /` 

![image-20220815162656593](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151626880.png)

> nginx会访问到Tomcat1



配置文件内容改为：

``` sh
server {    # server 块是http 块中的 内容
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;
    server_name  localhost;  # ip

    location / {
        proxy_pass http://192.168.174.128:8080;
    }

    location ~ / {
        proxy_pass http://192.168.174.128:8081;
    }

    #50x 错误页面跳转
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

```



第二次比较  	`~ /`   优先级高于  `/` 

> nginx会访问到tomcat2

> TIPS：
>
> ^~ 和直接写路径的两种方式，不同同时存在！比如： `^~ /abc 和 /abc` 同时存在会出错！

总结：

> `^~  /路径 ` > `~ /路径` > `/路径`



## 五、Nginx负载均衡【`重点`】

> Nginx为我们默认提供了三种负载均衡的策略：
>
> - 轮询：将客户端发起的请求，平均的分配给每一台服务器。   默认策略
>
> - 权重：会将客户端的请求，根据服务器的权重值不同，分配不同的数量。
>- ip_hash：基于发起请求的客户端的ip地址不同，他始终会将请求发送到指定的服务器上。 根据ip地址计算出一个结果  根据这个结果找对应的服务器

![image-20200912132640390](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200912132640390.png)

### 5.1 轮询

前置条件，为了看到负载均衡的效果，我们上一步设置了两个Tomcat



> 想实现Nginx轮询负载均衡机制只需要在配置文件中添加以下内容

``` json
upstream 名字 {
  server ip:port;
  server ip:port;
  ...
}
server {
  listen 80;
  server_name localhost;
  
  location / {
    proxy_pass http://upstream的名字/;
  }
}
```

配置如下

``` sh
#########      轮询访问   一次80   一次81
#负载均衡
upstream ssm {
  server 192.168.29.110:8080;
  server 192.168.29.110:8081;
}

server {
    listen       80;
    server_name  localhost;


	#  演示  负载均衡
    location / {
         proxy_pass http://ssm;
    }
}
```

| 配置文件部分截图：                                           |
| ------------------------------------------------------------ |
| ![image-20220815172010365](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151720215.png) |

| 效果如下：  轮询访问   一次Tomcat   一次Tomcat2              |
| ------------------------------------------------------------ |
| ![image-20220815172032401](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151720589.png) |
| ![image-20220815172039981](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151720127.png) |



### 5.2 权重

> 实现权重的方式

语法格式：

``` sh
upstream 名字 {
  server ip:port weight=权重比例;
  server ip:port weight=权重比例;
  ...
}
server {
  listen 80;
  server_name localhost;
  
  location / {
    proxy_pass http://upstream的名字/;
  }
}
```



具体代码如下

``` json
upstream emp {
    server 192.168.174.128:8080 weight=2;
    server 192.168.174.128:8081 weight=1;
}

server {    # server 块是http 块中的 内容
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;
    server_name  localhost;  # ip

    location / {
        proxy_pass http://emp;
    }

    #50x 错误页面跳转
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

```



### 5.3 ip_hash

> ip_hash实现          根据hash 算法  固定访问某个地址

``` json
upstream emp {
    ip_hash;
    server 192.168.174.128:8080;
    server 192.168.174.128:8081;
}

server {    # server 块是http 块中的 内容
    listen       80;    # nginx 默认监听的端口号
    listen  [::]:80;
    server_name  localhost;  # ip

    location / {
        proxy_pass http://emp;
    }

    #50x 错误页面跳转
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

```



## 六、Nginx动静分离【`重点`】

> Nginx的并发能力公式：
>
> ​	worker_processes * worker_connections / 4 | 2 = Nginx最终的并发能力
>
> 动态资源需要/4，静态资源需要/2.
>
> Nginx通过动静分离，来提升Nginx的并发能力，更快的给用户响应。

![image-20201128170727898](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201128170727898.png)

上图是动态资源的请求工程   四个连接数  ，咱们把静态资源放在nginx 上面  就只需要两个连接数， 同时也减轻了后面服务器的压力 ，  如下图  静态资源直接放在nginx

![image-20201128170916162](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201128170916162.png)

### 6.1 动态资源代理

> 使用proxy_pass动态代理

``` json
# 配置如下
location / {
  proxy_pass 路径;
}
```



### 6.2 静态资源代理

为了验证效果，把应用中的静态资源都拷贝到 /opt/docker_nginx/statics/ 目录下

这个目录通过数据卷映射到了nginx内部的 /usr/share/nginx/statics 目录

我们通过location 指定了特性类型的静态资源访问这个路径。

>  所以，本质上静态资源会到 ` /opt/docker_nginx/statics/` 目录加载。
>
> 我们把要验证的静态资源，比如汤姆猫图片，美女图片【命名为tomcat.png】，放到这个目录。

![image-20220527115746911](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527115746911.png)

配置文件如图：

``` json
# 修改配置文件
upstream emp {
  ip_hash;
  server 192.168.174.128:8081;
  server 192.168.174.128:8080;
}

server{
	listen 80;
	server_name localhost;
    
    location ~* \.(gif|jpg|png|js|css|html)$ {
        # 匹配以gif|jpg|png|js|css|html为结尾的路径 静态资源
        root /usr/share/nginx/statics;
    }
	
	location / {
		proxy_pass http://emp/;
	}

}
```

``` yml
version: '3.1'
services:
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports:
      - 80:80
    volumes:
      - /opt/docker_nginx/conf.d/:/etc/nginx/conf.d
      - /opt/docker_nginx/statics/:/usr/share/nginx/statics
```

> 我们当前的所有静态资源文件，比如js/css/images/html都放在了 /opt/docker_nginx/statics 目录下
>
> 如果遇到访问静态资源403无权限查看的问题，原因是nginx访问时是通过nginx用户
>
> 而statics 静态文件夹是root用户创建的，其他用户没有访问权限，需要添加访问权限
>
> `chmod -R 777 /opt/docker_nginx/statics/`



| 配置文件截图                                                 |
| ------------------------------------------------------------ |
| ![image-20220815180420790](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151804288.png) |



效果如下： 动态资源从tomcat获取，静态资源从/opt/docker_nginx/statics/目录获取

![image-20220527115236219](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527115236219.png)


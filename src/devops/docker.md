---
title: Docker

---

[TOC]

![1586333742105](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586333742105.png)

## 一、引言

### 1.1 环境不一致

> 我本地运行没问题啊：由于环境不一致，导致相同的程序，运行结果却不一致。

### 1.2 隔离性

> 哪个哥们又写死循环了，怎么这么卡：在多用户的操作系统下，会因为其他用户的操作失误影响到你自己编些的程序。

### 1.3 弹性伸缩

> 淘宝在双11的时候，用户量暴增：需要很多很多的运维人员去增加部署的服务器，运维成本过高的问题。

### 1.4 学习成本

> 学习一门技术，得先安装啊：学习每一门技术都要先安装响应的软件，但是还有他所依赖的各种环境，安装软件成本快高过学习成本啦。

## 二、Docker介绍

### 2.1 Docker的由来

> 一帮年轻人创业，创办了一家公司，2010年的专门做PAAS平台。但是到了2013年的时候，像亚马逊，微软，Google都开始做PAAS平台。到了2013年，公司资金链断裂，不得不倒闭，于是将公司内的核心技术对外开源，核心技术就是Docker。由于开源了Docker，到了2014年的时候，得到了C轮的融资 $4000W，2015年的时候，得到了D轮的融资.$9500W。于是公司开始全神贯注的维护Docker。

|                    Docker主要作者-所罗门                     |
| :----------------------------------------------------------: |
| ![1586340594252](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586340594252.png) |

|            Docker的作者已经离开了维护Docker的团队            |
| :----------------------------------------------------------: |
| ![1586340639934](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586340639934.png) |

### 2.2 Docker的思想

> - 集装箱：会将所有需要的内容放到不同的集装箱中，谁需要这些环境就直接拿到这个集装箱就可以了。
> - 标准化：
>   - 运输的标准化：Docker有一个码头，所有上传的集装箱都放在了这个码头上，当谁需要某一个环境，就直接指派大鱼去搬运这个集装箱就可以了。
>   - 命令的标准化：Docker提供了一些列的命令，帮助我们去获取集装箱等等操作。
>   - 提供了REST的API：衍生出了很多的图形化界面，Rancher。
> - 隔离性：Docker在运行集装箱内的内容时，会在Linux的内核中，单独的开辟一片空间，这片空间不会影响到其他程序。
>
> - 中央仓库|注册中心：超级码头，上面放的就是集装箱
> - 镜像：就是集装箱
> - 容器：运行起来的镜像

> 中央仓库：集中放置镜像的地方
>
> 镜像：集装箱
>
> 容器：运行起来的镜像

## 三、Docker的安装

### 3.1 下载Docker依赖的环境

> 想安装Docker，需要先将依赖的环境全部下载，就像Maven依赖JDK一样

``` sh
yum -y install yum-utils device-mapper-persistent-data lvm2
```

### 3.2 指定Docker镜像源

> 默认下载Docker会去国外服务器下载，速度较慢，我们可以设置为阿里云镜像源，速度更快

``` sh
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 3.3 安装Docker

> 依然采用yum的方式安装

``` sh
yum makecache fast
yum -y install docker-ce
```

### 3.4 启动Docker并测试

> 安装成功后，需要手动启动，设置为开机自启，并测试一下Docker

``` sh
# 启动Docker服务
systemctl start docker
# 设置开机自动启动
systemctl enable docker
# 测试    运行hello-world 镜像 根据这个镜像 创建容器
docker run hello-world
```

![image-20220812094622628](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208120946283.png)

## 四、Docker的中央仓库【`重点`】

> - Docker官方的中央仓库：这个仓库是镜像最全的，但是下载速度较慢。
>
>      <https://hub.docker.com/>
>
> - 国内的镜像网站：网易蜂巢，daoCloud等，下载速度快，但是镜像相对不全。
>
>      <https://c.163yun.com/hub#/home>
>
>      <http://hub.daocloud.io/>     （推荐使用）
>

## 五、镜像的操作【`重点`】

![image-20220812104454491](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208121044826.png)

### 5.1 拉取镜像

> 从中央仓库拉取镜像到本地，也可以使用国内的镜像站 `https://hub.daocloud.io/`

``` sh
docker pull 镜像名称[:tag]
# 举个栗子：docker pull daocloud.io/library/tomcat:9.0.0.M22
```

### 5.2 查看本地全部镜像

> 查看本地已经安装过的镜像信息，包含标识，名称，版本，更新时间，大小

``` sh
docker images
```

### 5.3 删除本地镜像

> 镜像会占用磁盘空间，可以直接手动删除，表示通过查看获取

``` sh
docker rmi 镜像的标识
```

## 六、容器操作【`重点`】

### 6.1 运行容器

> 运行容器需要指定具体镜像，如果镜像不存在，会直接下载

``` sh
# 简单操作
docker run 镜像的标识|镜像名称[:tag]

# 常用的参数
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像的标识|镜像名称[:tag]
# -d：代表后台运行容器
# -p 宿主机端口:容器端口：为了映射当前Linux的端口和容器的端口
# --name 容器名称：指定容器的名称
```

### 6.2 查看正在运行的容器

> 查看全部正在运行的容器信息

``` sh
docker ps [-qa]
# -a：查看全部的容器，包括没有运行
# -q：只查看容器的标识
```

### 6.3 查看容器日志

> 查看容器日志，以查看容器运行的信息

``` sh
docker logs -f 容器id
# -f：可以滚动查看日志的最后几行
```

### 6.4 进入容器内容部

> 可以进入容器内部进行操作

``` sh
docker exec -it 容器id  bash
```

### 6.5 复制内容到容器

> 将宿主机的文件复制到容器内部的指定目录

``` sh
docker cp 文件名称 容器id:容器内部路径
```

>将容器内部的文件复制到宿主机

``` shell
docker cp 容器id：容器目录    宿主机目录
```

### 6.6 重启&启动&停止&删除容器

> 容器的启动，停止，删除等操作，后续经常会使用到

``` sh
# 重新启动容器
docker restart 容器id

# 启动停止运行的容器
docker start 容器id

# 停止指定的容器（删除容器前，需要先停止容器）
docker stop 容器id

# 停止全部容器
docker stop $(docker ps -qa)

# 删除指定容器
docker rm 容器id
# 删除全部容器
docker rm $(docker ps -qa)
```

### 6.7提交运行时容器成为镜像

``` shell
docker commit -a='作者' -m='备注' 运行时容器ID 新镜像名称
```

### 6.8查看容器元信息

``` shell
docker inspect 容器id
```

### 6.9 设置容器自动启动

``` shell
docker update --restart=always 容器id
```

## 七、Docker应用

### 7.1 Docker安装Tomcat

> 运行Tomcat容器，为部署SSM工程做准备

``` sh
docker run -d -p 8080:8080 --name tomcat daocloud.io/library/tomcat:9.0.0.M22
```

### 7.2 Docker安装MySQL

> 运行MySQL容器，为部署SSM工程做准备
>
> 注意：如果之前在服务器上已经安装过MySQL了，并且MySQL是正在运行的，那么使用docker运行mysql就会出错！！！
>
> 我们需要停止服务器上正在运行的mysql,并且设置为禁止开机启动！
>
> 使用命令：
>
> `systemctl stop mysqld.service`
>
> `systemctl disable mysqld.service`
>
> 然后才可以使用docker运行mysql，否则之前运行的mysql和docker运行的端口有冲突！

``` sh
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=root daocloud.io/library/mysql:5.7.5-m15
```

### 7.3 部署SSM工程

> - 修改SSM工程环境，设置为Linux中Docker容器的信息
> - 通过Maven的package重新打成war包
> - 将Windows下的war包复制到Linux中
> - 通过docker命令将宿主机的war包复制到容器内部
> - 测试访问SSM工程

## 八、数据卷【`重点`】

> 为了部署SSM的工程，需要使用到cp的命令将宿主机内的ssm.war文件复制到容器内部。
>
> 数据卷：将宿主机的一个目录映射到容器的一个目录中。
>
> 可以在宿主机中操作目录中的内容，那么容器内部映射的文件，也会跟着一起改变。

### 8.1 创建数据卷

> 创建数据卷之后，默认会存放在一个目录下 /var/lib/docker/volumes/数据卷名称/_data

``` sh
docker volume create 数据卷名称
```

### 8.2 查看数据卷详情

> 查看数据卷的详细信息，可以查询到存放路径，创建时间等等

``` sh
docker volume inspect 数据卷名称
```

### 8.3 查看全部数据卷

> 查看全部数据卷信息

``` sh
docker volume ls
```

### 8.4 删除数据卷

> 删除指定数据卷

``` sh
docker volume rm 数据卷名称
```

### 8.5 容器映射数据卷

> 映射有两种方式：
>
> - 通过数据卷名称映射，如果数据卷不存在。Docker会帮你自动创建，会将容器内部自带的文件，存储在默认的存放路径中。
> - 通过路径映射数据卷，直接指定一个路径作为数据卷的存放位置。但是这个路径下是空的。

``` sh
# 通过数据卷名称映射
docker run -v 数据卷名称:容器内部的路径 镜像id
# 通过路径映射数据卷
docker run -v 路径:容器内部的路径 镜像id

# 举个例子：
docker run -d -p 8080:8080 -v /root/webapps/:/usr/local/tomcat/webapps --name tomcat e71
```

## 九、Dockerfile自定义镜像【`重点`】

> 我们可以从中央仓库下载一个镜像，也可以自己手动去制作一个镜像，需要通过Dockerfile去指定自定义镜像的信息

如果看到下面的提示

![image-20220815094241640](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208150942958.png)

> WARNING: IPv4 forwarding is disabled. Networking will not work.
>
> 解决办法：
>
> vi /etc/sysctl.conf
>
> net.ipv4.ip_forward=1 #添加这段代码
>
> ![image-20220815094459015](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208150944328.png)

添加完成后，需要重启网络服务 `systemctl restart network`

也可以验证下是否修改成功 `sysctl net.ipv4.ip_forward`

![image-20220815094702728](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208150947882.png)

### 9.1 Dockerfile

> 创建自定义镜像就需要创建一个Dockerfile，如下为Dockerfile的语言
>
> Dockerfile是由一系列命令和参数构成的脚本，这些命令应用于操作系统(centos或者Ubuntu)基础镜像并最终创建的一个新镜像；
>
> 我们前面讲过的用手工的方式，修改配置文件，或者添加，删除文件目录的方式，来构建一种新镜像；这种手工方式麻烦，容易出错，而且不能复用；
> 我们这里讲Dockerfile，用脚本方式来构建自动化，可复用的，高效率的创建镜像方式，是企业级开发的首选方式；
>
> 再软件系统开发生命周期中，采用Dockerfile来构建镜像；
> 1、对于开发人员:可以为开发团队提供一个完全一致的开发环境;
> 2、对于测试人员:可以直接拿开发时所构建的镜像或者通过Dockerfile文件构建一个新的镜像开始工作；
> 3、对于运维人员:在部署时，可以实现应用的无缝移植。

``` sh
from: 指定当前自定义镜像依赖的环境  指定基础镜像 一切从这里开始构建
copy: 将相对路径下的内容复制到自定义镜像中
workdir: 声明镜像的默认工作目录
run: 执行的命令，可以编写多个
cmd: 需要执行的命令（在workdir下执行的，cmd可以写多个，只以最后一个为准）

# 举个例子，制作SSM容器镜像，而且ROOT.war要放在Dockerfile的同级目录下
from daocloud.io/library/tomcat:9.0.0.M22
copy ROOT.war /usr/local/tomcat/webapps
```

### 9.2 通过Dockerfile制作镜像

> 编写完Dockerfile后需要通过命令将其制作为镜像，并且要在Dockerfile的当前目录下，之后即可在镜像中查看到指定的镜像信息，注意最后的 [.]()

``` sh
docker build -t 镜像名称[:tag] .
```

## 十. Docker-Compose【`重点`】

> 之前运行一个镜像，需要添加大量的参数,可以通过Docker-Compose编写这些参数。而且Docker-Compose可以帮助我们批量的管理容器。这些信息只需要通过一个docker-compose.yml文件去维护即可。

### 10.1 下载并安装Docker-Compose

``` shell
# 直接联网下载到本地     /usr/local/bin/docker-compose
curl -L http://heyige.cn/root/soft/-/raw/master/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose

cd /usr/local/bin   # 进入该目录
chmod 777 docker-compose     # 给这个文件授权

# 在任意目录 测试  docker-compose  命令
```

| 授权的截图                                                   |
| ------------------------------------------------------------ |
| ![image-20220815105141364](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151051588.png) |

#### 10.1.4 测试

> 在任意目录下输入docker-compose

|                           测试效果                           |
| :----------------------------------------------------------: |
| ![1586420176720](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586420176720.png) |

### 10.2 Docker-Compose管理MySQL和Tomcat容器

> yml文件以key: value方式来指定配置信息 【key:value 冒号后面需要有个空格】
>
> 多个配置信息以换行+缩进的方式来区分【缩进使用的是两个空格】
>
> 在docker-compose.yml文件中，不要使用制表符

``` yml
version: '3.1'
services:
  mysql:           # 服务的名称
    restart: always   # 代表只要docker启动，那么这个容器就跟着一起启动
    image: daocloud.io/library/mysql:5.7.5-m15  # 指定镜像路径
    container_name: mysql  # 指定容器名称
    ports:
      - 3306:3306   #  指定端口号的映射
    environment:
      MYSQL_ROOT_PASSWORD: root   # 指定MySQL的ROOT用户登录密码
      TZ: Asia/Shanghai        # 指定时区
    volumes:
     - /opt/docker_mysql_tomcat/mysql_data:/var/lib/mysql   # 映射数据卷
  tomcat:
    restart: always
    image: daocloud.io/library/tomcat:9.0.0.M22
    container_name: tomcat
    ports:
      - 8080:8080
    environment:
      TZ: Asia/Shanghai
    volumes:
      - /opt/docker_mysql_tomcat/tomcat_webapps:/usr/local/tomcat/webapps
      - /opt/docker_mysql_tomcat/tomcat_logs:/usr/local/tomcat/logs
```

### 10.3 使用docker-compose命令管理容器

> 在使用docker-compose的命令时 ，默认会在当前目录下找docker-compose.yml文件

``` sh
# 1. 基于docker-compose.yml启动管理的容器
docker-compose up -d

# 2. 关闭并删除容器
docker-compose down

# 3. 开启|关闭|重启已经存在的由docker-compose维护的容器
docker-compose start|stop|restart

# 4. 查看由docker-compose管理的容器
docker-compose ps

# 5. 查看日志
docker-compose logs -f
```

### 10.4 docker-compose配合Dockerfile使用

> 使用docker-compose.yml文件以及Dockerfile文件在生成自定义镜像的同时启动当前镜像，并且由docker-compose去管理容器

#### 10.4.1 docker-compose文件

> 编写docker-compose.yml文件

``` yml
# yml文件
version: '3.1'
services:
  ssm:
    restart: always
    build: # 构建自定义镜像
      context: ./      # 指定dockerfile文件的所在路径
      dockerfile: Dockerfile   # 指定Dockerfile文件名称
    image: ssm:1.0.1
    container_name: ssm
    ports:
      - 8081:8080
    environment:
      TZ: Asia/Shanghai
```

#### 10.4.2 Dockerfile文件

> 编写Dockerfile文件

```
from daocloud.io/library/tomcat:9.0.0.M22
copy ssm.war /usr/local/tomcat/webapps
```

注意：这里如果是ssm.war 那么提供的war包名字也得是一样的！

![image-20220815120432596](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208151204731.png)

#### 10.4.3 运行

> 测试效果

``` sh
# 可以直接启动基于docker-compose.yml以及Dockerfile文件构建的自定义镜像
docker-compose up -d
# 如果自定义镜像不存在，会帮助我们构建出自定义镜像，如果自定义镜像已经存在，会直接运行这个自定义镜像
# 重新构建的话。
# 重新构建自定义镜像
docker-compose build
# 运行当前内容，并重新构建
docker-compose up -d --build
```

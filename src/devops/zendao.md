---
title: 禅道
---

# Linux(centos7)安装禅道

## **1、环境**
Centos7.3
禅道9.7开源集成版(集成了mysql、apache、php)不需要自己配置



## **2、下载**
禅道下载地址：http://dl.cnezsoft.com/zentao/9.7/ZenTaoPMS.9.7.stable.zbox_64.tar.gz

```shell
wget http://dl.cnezsoft.com/zentao/9.7/ZenTaoPMS.9.7.stable.zbox_64.tar.gz
```

 

## **3、安装**
将我们下载好的安装包解压到/opt文件夹下

特别说明：不要解压到别的目录再拷贝到/opt/，因为这样会导致文件的所有者和读写权限改变，也不要解压后把整个目录777权限。可以使用命令：

```shell
tar -zxvf ZenTaoPMS.9.7.stable.zbox_64.tar.gz -C /opt
```

 

4、修改集成的mysql和apache端口号

为了不影响本地安装的mysql和apache服务的时候我们修改禅道默认的端口号：
\#设置mysql端口号是3307：

```shell
[root@izuf6bopxrlqcajllezob1z zbox]# ./zbox -mp 3307
#设置apache端口号是90
[root@izuf6bopxrlqcajllezob1z zbox]# ./zbox -ap 90
```

 

Apache和Mysql常用命令

```shell
#命令开启Apache和Mysql
/opt/zbox/zbox start

#命令停止Apache和Mysql
/opt/zbox/zbox stop

#命令重启Apache和Mysql
/opt/zbox/zbox restart
```



添加数据库用户
运行auth下的adduser.sh进行添加数据库用户。

如果不设置用户，我们访问禅道首页的时候会报错：

```shell
4:44:48 ERROR: SQLSTATE[HY000] [1045] Access denied for user ‘zentao’@’localhost’ (using password: YES) in framework/base/router.class.php on line 2145, last called by framework/base/router.class.php on line 2103 through function connectByPDO.
in framework/base/router.class.php on line 2195 when visiting.
```

 

添加用户的命令如下，我设置的是root，root：

```shell
#运行添加用户的脚本
cd /opt/zbox/auth
./adduser.sh
```

 

访问禅道
访问输入ip:90，点击开源版，输入默认的用户名admin密码123456
![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202305241947735.png)

初次登陆需要修改密码：
![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202305241947741.png)

进入首页：
![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202305241947790.png)


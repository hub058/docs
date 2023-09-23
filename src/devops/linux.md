---
title: Linux
---

![1586185429977](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586185429977.png)


## 一、引言

### 1.1 开发环境

> 平时大家大多是在Windows或者Mac操作系统下去编写代码进行开发，在开发环境中安装大量的软件，这样会导致环境的稳定性和安全性降低



### 1.2 生产环境

> 是将程序运行在此环境中，供用户去使用。这个环境是有专业的人员去维护，一般人是没有权限去操做生产环境的



### 1.3 测试环境

> 一般克隆一份生产环境，会将开发环境中的程序部署到测试环境中，这个环境的主要目的是去程序进行检测，收集程序中的各种问题，并交给开发人员进行修改



### 1.4 操作系统的选择

> 生产环境中，常用的操作系统有Windows 2003 service，Linux，Unix等等，Linux操作系统，在生产环境中占据了大量的市场份额，Linux主要以稳定，可靠，免费的特点成为全球使用最多的**服务器操作系统**。
>
> Linux操作系统现在已经成为后台开发人员必备的技能，并且后期学习的各种知识都会涉及到Linux操作系统。



## 二、Linux介绍

### 2.1 Linux介绍

> 在Linux操作系统出现之前，还有一个操作系统叫做Minix，Minix操作系统是由Andrew的大学教授研发出来的，当时大学教授是为了给学生上课，买了一套Unix操作系统，参考Unix自己写了一个操作系统，并且命名为Minix。同时将Minix开源，供学校内部的研究和教学，到了2000年，Andrew将Minix操作系统完全对外开源。
>
> Minix由于完全对外开源之后，在互联网上迅速的传播，但是大家在使用时，发现Minix不是很完美，内部存在各种各样问题。用户将问题解决后，编写了一个补丁，将补丁以邮件的方式发给Andrew，但是Andrew教授最初的目的只是为了教学和研究。
>
> 于此同时，一位芬兰的大学生出现了，叫Linus，在Minix操作系统基础上，自己添加了一些补丁和插件，并将其命名为Linux操作系统，并且完全对外开源，而且开始维护Linux操作系统。
>
> 之前学习的Git也时Linus研发的。

|                   Linus Torvalds 和 Linux                    |
| :----------------------------------------------------------: |
| ![1586225837185](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586225837185.png) |



### 2.2 Linux的版本

> Linux的版本分为两种，一种是Linus团队正在维护的开源内核版本
>
> 。另一种是一些厂商基于内核版本封装的发行版本。
>
>    - Linux的内核版本官网：https://www.kernel.org/
>
> - Linux的发行版本，咱们需要学习的发行版本就时CentOS

|                     Linux的常见发行版本                      |
| :----------------------------------------------------------: |
| ![1586227096086](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586227096086.png) |



### 2.3 Linux和Windows区别

> window图形界面操作，Linux很少使用图形界面，使用命令行操作

> - Linux是**严格区分大小**写的，Windows无所谓。
> - Linux中一切皆是文件。所有东西都是文件，硬件，目录都是文件。
> - Linux中文件是没有后缀的，但是他有一些约定俗成的后缀。
> - Windows下的软件一般是无法直接运行的Linux中。
>
> [Ps：我们在学习Linux时，参考Windows下做了什么，就在Linux中做什么]()

## 三、Linux安装

> - 安装Linux，我们需要一个虚拟机，为了安装虚拟环境：VMware或者Virtual Box（采用VMware）
>
> https://www.wrfou.com/vmware-workstation-pro.html
>
> 16.2.3版本
>
> - 为了安装Linux，我们需要一个Linux的镜像文件：CentOS7版本
>
> http://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso
>
> CentOS7版本
>
> - 安装一个连接Linux的图形化界面：Xterm，SSH，XShell（Xterm），FinalShell
>
> http://www.hostbuf.com/t/988.html
>
> 3.9.5版本


### 3.1 安装VMware

> 傻瓜式安装，下一步下一步下一步……



### 3.2 安装FinalShell

> 傻瓜式安装，下一步下一步下一步……



### 3.3 在VMware中安装Linux

> 按照下图步骤，逐步安装Linux操作系统……
>

#### 3.3.1 配置硬件环境

|                         选择安装方式                         | 指定镜像方式                                                 | 选择操作系统类型                                             |
| :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220522214242834](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220522214242834.png) | ![image-20220522214259773](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220522214259773.png) | ![image-20220522214319754](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220522214319754.png) |
|                        指定虚拟机名称                        | 磁盘存储方式                                                 | 自定义硬件                                                   |
| ![1586231466922](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586231466922.png) | ![1586231519493](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586231519493.png) | ![image-20220522214450664](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220522214450664.png) |



#### 3.3.2 安装CentOS

| 开始界面选择语言 | 配置虚拟机网络连接 | 设置ROOT用户的密码 |
| :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|         ![1586231719094](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586231719094.png)         |         ![1586231811319](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586231811319.png)         |         ![1586231864794](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586231864794.png)         |
| 安装成功，选择输入法 | 选择时区，输入beijing | 设置用户名 |
| ![image-20220523094416663](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523094416663.png) | ![image-20220523094532750](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523094532750.png) | ![image-20220523094636292](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523094636292.png) |

> 设置用户的密码，密码不能太简单，太简单就不能继续下一步了



#### 3.3.3 配置静态IP[非必须]

如果是其他用户登录的，没有权限操作可以切换为root用户

![image-20220523113706798](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523113706798.png)

> | 查看自己网卡网段的方式，在windows的cmd中输入ipconfig         |
> | ------------------------------------------------------------ |
> | ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/222.png) |
> | 查看VMnet8网段                                               |
> | ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/333.png) |
> |                                                              |
>



``` shell
1. 修改网卡配置文件
cd /etc/sysconfig/network-scripts/
2.查看ifcfg-ens33      #  ifcfg-ensxx
vi ifcfg-ens33 
按 i 进入编辑模式

```

``` properties
IPADDR=192.168.174.101
GATEWAY=192.168.174.2
NETMASK=255.255.255.0
NM_CONTROLLED=no
DNS1=8.8.8.8
DNS2=8.8.4.4
```

| 完整文档如下                                                 |
| ------------------------------------------------------------ |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/111.png) |

> 上图中需要修改的地方
>
> 1、BOOTPROTO=static
>
> 2、ONBOOT=yes
>
> 3、IPADDR中IP地址的第三位
>
> 网段我的是174，需要改成自己net8网卡的网段
>
> 4、GATEWAY网关的第三位同上

``` shell
编辑完之后  按esc退出编辑   按  :wq    保存并退出
重启网络服务
# service network restart
重启网路服务之后   连接中断   重新连接   然后测试网络是否联通
ping www.baidu.com
从自己的 windows ping 虚拟机
```

| 命令截图如下                                                 |
| ------------------------------------------------------------ |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523101435286.png) |

> 扩展：
>
> *DHCP*是Dynamic Host Configuration Protocol的缩写，即动态主机配置协议。
>
> NM_CONTROLLED=yes
>
> NM_CONTROLLED 设置 yes 表示网卡允许用 NetworkManager 程序管理。它可以降低网络配置使用难度，便于管理无线网络、虚拟专用网等网络连接，适合普通台式机和笔记本电脑使用。
>
> 当 NM_CONTROLLED 设为 yes 并有安装运行 NetworkManager 服务。若编辑了网卡配置文件，需要先重启 NetworkManager 再重启 network 服务。
>
> NM_CONTROLLED=no
>
> NM_CONTROLLED 设置 no 表示网卡使用传统方式管理而不用 NetworkManager。好处是修改网卡配置文件后直接重启 network 就生效，不受 NetworkManager 干扰。适合用以太网连接的服务器使用。

#### 3.3.4 检查防火墙

``` shell
1.检测并关闭firewall
systemctl status firewalld.service #检测是否开启了firewall
systemctl stop firewalld.service #关闭firewall 
systemctl disable firewalld.service #禁止firewall开机自启 
```

![image-20220523111838604](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523111838604.png)



### 3.4 使用FinalShell

> 直接在Vmware中操作Linux有很多限制，我们可以在图形化界面中操作Linux操作系统
>
> 具体步骤如下……
>
> 使用 ip a 命令在linux中查看虚拟机的IP

|                          查看ip地址                          | 新建连接                                                     | 配置连接信息                                                 |
| :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220523113824950](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523113824950.png) | ![image-20220523111344199](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523111344199.png) | ![image-20220523111458790](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220523111458790.png) |
|                                                              |                                                              |                                                              |
|                                                              |                                                              |                                                              |

### 3.5配置yum源[非必须]
> 网络不好时，不要更新

``` shell
1.先安装 wget
yum install wget -y
2.备份旧的 yum源
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo_bak
3.获取阿里yum源配置文件
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
4.更新缓存 
yum makecache
5. 查看
yum -y update
```



## 四、Linux的目录结构

---

> Windows的目录结构是带有盘符的。D：  E： C：，而Linux中是没有盘符的
>
> 在Xterm中输入ls / 查看Linux的顶级目录。

|                             ls /                             |
| :----------------------------------------------------------: |
| ![1586239207504](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586239207504.png) |

> Linux的常用目录……

|                       Linux目录树状图                        |
| :----------------------------------------------------------: |
| ![1586239342796](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586239342796.png) |

> - root：该目录为系统管理员HOME目录
> - bin：这个目录下放着经常使用的命令
> - boot：这里存放的是启动Linux时的一些核心文件
> - etc：存放系统管理所需要的配置文件和子目录
> - home：普通用户的HOME目录
> - usr：默认安装软件的目录，类似Windows中的Program Files目录
> - opt：是主机额外安装软件拜访的目录



## 五、Linux的基本命令   掌握

---------------------------

> Linux中命令的基本格式：命令 【选项】 【参数】
>
> 需要注意，个别命令是不遵循这个格式
>
> 当命令中有多个选项时，可以写在一起的，并且选项也是由简写方式的 命令 -选项A选项B
>
> Linux的基本操作命令，不遵循上述格式，但是后期会经常使用……

``` sh
# 1. 我是谁
who am i

# 2. 我在哪
pwd

# 3. 查看ip 地址
ip a | ip address

# 4. 清屏
clear

# 5. ping域名|ip
ping 地址

# 6. 强制停止
Ctrl + C
```



## 六、Linux目录命令【`重点`】 掌握

----

### 6.1 列出目录

> 查看指定目录下的内容，默认查看当前目录下内容
>
> [Linux中的隐藏文件是以.开头的，当前目录使用.表示，上一级目录使用..表示]()

``` sh
ls [-ald] [目录名]
# 目录名不填写，默认为当前目录。
# -a：列出的全部的文件，包括隐藏文件
# -l：列举出全部的信息
# -d：仅查看目录本身
```



### 6.2 切换目录

> 实现目录间切换，使用绝对路径、相对路径、特殊符号

``` sh
cd 具体路径 | 特殊符号
```

| 特殊符号 | 表达的路径             |
| -------- | ---------------------- |
| .        | 当前目录               |
| ..       | 上一级目录             |
| /        | 根目录                 |
| ~        | 当前登录用户的HOME目录 |
| -        | 返回                   |



### 6.3 创建目录

> 创建目录，以及创建多级目录方式

``` sh
mkdir [-p] 目录名
# -p：代表创建多级目录时，使用      mkdir -p aa/bb/cc    
```



### 6.4 删除目录

> 删除非空目录或包含内容的目录

``` sh
# 只能删除空目录
rmdir 目录名

# 删除非空目录
rm [-rf] 目录名
# -r：代表递归删除目录下的全部内容
# -f：不询问，直接删除
```



### 6.5 复制目录

> 复制目录下的全部内容

``` sh
cp -r 来源目录 目标目录
# -r：递归复制全部内容，必填项
```



### 6.6 移动、重命名目录

> 移动、重命名目录，会根据第二个参数指定具体操作逻辑

``` sh
mv 目录名 新目录名 | 路径
# 如果第二个参数指定的路径不存在，就是重命名，如果第二个参数的路径存在，就是移动
```



## 七、Linux的文件命令【`重点`】   

---

### 7.1 创建文件

> 创建空文件

``` sh
touch 文件名1 文件名2 ……
```



### 7.2 编辑文件

> 编辑文件，后期最常的命令之一

``` sh
vi 文件名 				# 查看文件。（查看模式）
i | a | o   		  # 进入编辑模式。（编辑模式）
                      # i：在当前光标处，进入编辑模式。 
                      # a：在当前光标后一格，进入编辑模式。 
                      # o：在当前光标下一行，进入编辑模式。
esc				      # 退出编辑模式，回到查看模式。
:				      # 从查看模式进入到底行命令模式。（底行命名模式）
                      # 在底行命令模式下，输入wq：保存并退出。输入q!：不保存并退出
                      # 在查看模式下，摁ZZ，可以快速保存并退出。
```



### 7.3 vi文件时，其他操作

> 编辑文件时，常用的快捷键，方便操作

``` sh
# 在vi文件时，在底行命令模式下可以输入以下常用内容
# 行号操作
set nu              # 查看文件的行号
to rownum           # 快速的跳转到指定行
set nonu            # 取消行号
# 搜索操作
/word               # 类似Windows的Ctrl + F搜索文件中的具体内容所在位置，查看下一个可以输入字母n
# 快速定位
G                   # 快速跳转到最后一行    不需要写冒号：   
gg                  # 快速跳转到第一行     不需要写冒号：
10G                 # 快速跳转到第10行     10可以是任意数字
```
> vi的其他常用命令

``` sh
# 复制一行
yy 
# 从当前行开始复制下面的20行
20yy 

# 小写p 粘贴，把粘贴板的内容粘贴到下一行
p 
# 大写P 粘贴，把粘贴板的内容粘贴到上一行
P

# 删除一行
dd
# 删除10行
10dd
```


### 7.4 查看文件

> 根据不同的业务，可以选择不同的查看方式

``` sh
# 查看文件，直接展示到最后一行
cat 文件名

# 显示文件的用时，展示行号
more 文件名
# 查看大文件时，可以一页一页的向下翻
# 嗯space向下翻页，退出时摁q

less 文件名
# 查看大文件时，可以任意的向上或者向下翻
# 向上或向下翻页摁PageUp和PageDown，一行一行查看，摁光标的↑↓

# 只查看前几行
head 文件名

# 只查看后几行
tail 文件名
# tail -f 日志 监控日志
```



### 7.5 移动、重命名文件

> 移动、重命名目录，会根据第二个参数指定具体操作逻辑

``` sh
mv 文件名 新文件名 | 路径
# 如果在当前目录移动就是重命名
```



### 7.6 复制文件

> 复制文件到指定目录下

``` sh
cp 文件名 目录|文件名
```



### 7.7 删除文件

> 删除文件方式

``` sh
rm [-f] 文件名
# -f：是否询问
```



## 八、Linux的压缩包命令【`重点`】

### 8.1 针对tar命令

> Linux中常用的压缩包，大多是.tar，.tar.gz，tgz的



#### 8.1.1 解压压缩包

> 针对压缩包后缀的情况，采用不同的参数，否则可能会损失文件

``` sh
tar [-zxvf] 压缩包名称 [-C 路径]
# -z： 代表压缩包后缀是.gz的
# -x： 代表解压
# -v： 解压时，打印详细信息
# -f： -f选项必须放在所有选项的最后，代表指定文件名称
# -C 路径： 代表将压缩包内容解压到指定路径
```



#### 8.1.2 打包成压缩包

> 可以将多个文件以及目录打包成压缩包，根据选择的参数指定压缩包名

``` sh
tar [-zcvf] 压缩包名称 文件1 文件2 目录1 目录2 ...
# -c： 代表打包
# 其他参数同上
```



### 8.2 针对zip类型压缩包

> Linux不仅仅针对tar类型的压缩包，也支持zip，rar这种Windows下的压缩包。
>
> 不过需要安装软件针对对各种类型压缩包的操作



#### 8.2.1 安装软件

``` sh
yum -y install zip     # 打包程序
yum -y install unzip   # 解压程序
```



#### 8.2.2 解压以及打包

``` sh
# 解压
unzip 压缩包名称

# 打包
zip 压缩包名称 文件1 文件2 目录1 目录2 ...
```



### 链接文件

> ln:链接命令  link的缩写
> 链接分为软链接 soft 和硬链接 hard

> 软链接 语法: `ln -s 源文件 软链接文件`
> 软链接：类似于windows上的快捷方式
> 特点：
>
> - 访问软链接文件时，本质上就是访问源文件
> - 如果源文件被删除了，软链接文件也就失效了硬链接
>
> ![image-20220811095750886](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208110957189.png)

| 如果源文件被删或移动了，软连接文件失效                       |
| ------------------------------------------------------------ |
| ![image-20220811095841208](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208110958451.png) |

> 硬链接
> 语法： `ln 源文件 硬链接文件`
> 特点：类似于文件副本[但是又不完全一样]
> 本质上是两个文件
> 硬链接文件的内容和源文件一样[可以保持跟源文件的实时同步]
> 如果源文件没有了，硬链接文件还能使用

可以利用这个特点，做重要文件的备份！



## 九、用户&用户组的操作   了解

### 9.1 用户的常用操作命令

> Linux是一个多用户的操作系统，任何一个用户想要操作Linux操作系统，必须向系统管理员申请一个账号才可以，并且以这个账号的身份去操作Linux。
>
> 用户的账号一方面可以帮助系统管理员追踪当前用户的操作。另一方面可以控制当前用户对系统资源访问。



#### 9.1.1 用户的创建

``` sh
useradd [-gd] [选项指定的具体内容] 用户名
# -g：代表group，可以修改用户的所在组
# -d：代表指定用户的HOME目录
# 查看用户列表  compgen -u
```



#### 9.1.2 设置用户密码

``` sh
passwd 用户名
# 回车以后再输入密码
```



#### 9.1.3 切换用户

``` sh
su 用户名
# [root@localhost ~]#   -> root用户在本地登录，并且当前在~目录下，#代表是超级管理员
# [qf@localhost ~]$		-> qf用户在本地登录，并且当前在~目录下，$代表是普通用户
```



#### 9.1.4 删除用户

``` sh
userdel [-r] 用户名
# -r： 代表删除用户的同时，删除该用户的HOME目录
# userdel: user zs is currently used by process 11900   原因是   使用了su频繁转换用户  
# 解决方法：直接退出后重新登录root，然后userdel -r 用户名

```



#### 9.1.5 修改用户

[Linux usermod命令：修改用户信息 (biancheng.net)](http://c.biancheng.net/view/849.html)     参考了解

![image-20220811102018114](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208111020322.png)

``` sh
usermod [-gd] [选项指定的具体内容] 用户名
# -G：代表group，可以修改用户的所在组
# -d：代表指定用户的HOME目录
# grep zs /etc/group  查看zs 在那个分组 
```



### 9.2 用户组的操作   了解

> 用户的身份除了用户本身，还会分配到指定的用户组，可以通过用户组对设置一些文件的操作权限



#### 9.2.1 创建用户组

``` sh
groupadd 用户组名
```



#### 9.2.2 修改用户组

``` sh
groupmod [-n] [选项指定的具体内容] 用户组名
# -n 修改用户组名称
```



#### 9.2.1 删除用户组

``` sh
groupdel 用户组名
# 只能删除不存在用户的用户组
```



## 十、文件权限的修改【`重点`】

> 首先我们要清楚Linux文件的权限信息
>
> 在Linux中输入ls -l 或者 ll查看文件和目录的详细信息

|                           文件详情                           |
| :----------------------------------------------------------: |
| ![1586268971368](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586268971368.png) |

> 实例中，a目录的第一个属性用“d”标识这个a是一个目录。
>
> anaconda-ks.cfg第一个属性用“-”标识他是一个文件。
>
> 在Linux文件详情的后面属性需要分为三组查看
>
> - rwx： 代表文件拥有者的权限
> - rwx： 代表文件所属组用户的权限
> - rwx： 代表其他用户对当前文件的操作权限
>   - r： 代表read，读的权限
>   - w： 代表write，写的权限
>   - x： 代表execute，代表执行权限
>
> 其余信息
>
> - 后续的第一个root：代表当前文件的拥有者
>
> - 后续的第二个root： 代表当前文件的所属组
>
> - 后续分别为：文件的大小和最后修改时间等信息



### 10.1 对文件的权限修改

> 使用chmod对文件的权限进行修改，一种使用数字，一种使用符号……
>
> - 数字方式方便操作，不过要修改整体权限信息
> - 符号方式更细粒度华，不过操作麻烦



#### 10.1.1 数字方式

``` sh
chmod [-R] 777 文件|目录
# rwx在这三个权限中r：4，w：2，x：1
# -R： 当修改一个目录权限时，可以添加-R，将目录下的全部内容，都修改权限。
```

``` properties
# 二进制举例子
rw-rw-r--
664
rwxrwxrwx
777
rwx 
4+2+1=7
rw-
4+2=6
r--
4
r-x
4+1=5
```



#### 10.1.2 符号方式

``` sh
chmod [-R] a=rw 文件|目录
# user：u，group：g，other：o，all：a
# read：r，write：w，execute：x
# 赋予权限的方式 , 添加：+，减掉：-，设定：=
# -R： 当修改一个目录权限时，可以添加-R，将目录下的全部内容，都修改权限。
```

> u `user 文件所属者`
> g `group 文件所属组的用户`
> o `other 其他用户`
> a `all 所有用户`
>
> + `+ 添加什么权限[在原先权限的基础上新增]`
> - `- 撤销什么权限[在原先权限的基础上减去]`
> - `= 赋予什么权限[直接改成什么权限]`
>
> r `read 读`
> w `write 写`
> x `execute 执行`
>
> chmod u-w file 给文件的所有者撤掉写的权限
> chmod o+x file 给其他用户添加执行的权限
> chmod a=rw file 给所有用户赋予读写的权限



### 10.2 文件拥有者及所属组修改

> chown可以直接修改拥有者和所属组，chgrp只能修改所属组

``` sh
# 修改文件的拥有者和所属组
chown [-R] 拥有者：所属组 文件|目录
# 修改文件的拥有者
chown [-R] 拥有者 文件|目录
# 修改文件的所属组
chgrp [-R] 所属组 文件|目录
```

`chown zs:zs b.txt   `

把b.txt 这个文件的拥有者 及组 改为  zs   

测试创建新用户 ww  对比  ww 分组到zs组 前后  操作  b.txt文件的权限

![image-20210526162117763](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210526162117763.png)



## 十一、Linux的其他操作命令【`重点`】

### 11.1 进程的操作

> 需要用到类似Windows的结束进程时，在Linux下需要使用如下命令

``` sh
ps -ef     # 查看全部正在运行的进程  

ps -ef | grep 搜索的内容    # 查看搜索的进程  
# 杀死进程
kill -9 pid
```

![image-20210526134108380](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210526134108380.png)

![image-20210526134147605](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210526134147605.png)



### 11.2 服务的操作

> 和Windows下的服务操作一致，只需使用如下命令，默认为centos7版本

``` sh
# 针对服务的启动，停止，重启，开机自动启动，禁止开机自动启动，查看服务状态。
systemctl start|stop|restart|enable|disable|status 服务名称

systemctl stop firewalld    停止防火墙
systemctl start firewalld   启动防火墙
ps -ef | grep firewalld  查看防火墙 进程号
systemctl disable firewalld  禁止防火墙开机自启动
```



### 11.3 端口号查看

> 如发现端口号被占用，可以使用如下方式查找pid，并结束进程

``` sh
# 想使用指定的命令需要事先下载netstat
yum -y install net-tools
# 查看端口号占用情况
netstat -naop | grep 端口号
```



### 11.4 访问地址

> 类似浏览器访问路径，无法图形化显示，一般用于测试

``` sh
curl 访问地址
```



### 11.5 查找文件

> 在Linux中查找指定文件，参数较多，如下为根据文件名称查询

``` sh
# -type 指的是文件类型     f 指的是普通文件    还有别的文件类型  比如目录  d  链接 l
find 路径 -type f | grep 文件名      
# 查找 etc 下  叫  profile 的 文件
find /etc -type f | grep profile    
```

linux 中的命令 大概有3000 多个  咱们掌握常用的几十个 就基本够用了



## 十二、Linux下安装软件【`重点`】

### 12.1 安装JDK

> 在Linux下安装JDK，并配置JAVA_HOME环境变量……



#### 12.1.1 下载JDK的压缩包

> 去官网下载压缩包，由于oracle官网更新，需要登录并同意协议才允许下载
>
> [https://www.oracle.com/java/technologies/javase-jdk8-downloads.html]()



#### 12.1.2 将jdk压缩包拉取到Linux系统中

> 需要使用图形化界面的Sftp拖拽到Linux操作系统

|                      FinalShell的Sftp图                      |
| :----------------------------------------------------------: |
| ![image-20220811154728784](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208111547156.png) |



#### 12.1.3 将jdk的压缩包解压

> 后期大多软件都安装在/usr/local下，直接使用tar解压

``` sh
tar -zxvf jdk-8u333-linux-x64.tar.gz -C /usr/local
```



#### 12.1.4 将jdk的目录名修改一下

> 为了方便配置环境变量，修改一下目录名称

``` sh
cd /usr/local
mv jdk1.8.0_333 jdk
```



#### 12.1.5 配置环境变量

> Linux提供了两种环境变量的文件
>
> - 第一个是用户级别的环境变量，存放在：~/.bashrc
> - 第二个是系统级别的环境变量，存放在：/etc/profile
>
> 修改哪个文件都可以，毕竟虚拟机就我们自己使用

``` sh
# 在环境变量文件中，添加如下内容
vi /etc/profile
export JAVA_HOME=/usr/local/jdk
export PATH=$JAVA_HOME/bin:$PATH
# 重新加载环境变量文件
source /etc/profile
# 最终测试
java -version
```

|                           测试效果                           |
| :----------------------------------------------------------: |
| ![image-20220811155550855](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208111555148.png) |



### 12.2 安装MySQL

> 在MySQL下用yum的方式安装MySQL……



#### 12.2.1 安装MySQL的YUM存储库

> 使用wget下载即可，不过需要先下载wget，再通过wget下载rpm包

``` sh
# 首先通过yum下载wget命令
yum -y install wget
# 通过wget下载MySQL存储库
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
```



#### 12.2.2 安装下载好的rpm包

> 使用rpm包的命令直接安装

``` sh
# 安装rpm包
rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
# 查看rpm包[这一步在这里不需要执行，先了解]
rpm -qa | grep 内容
# 卸载rpm  [这一步在这里不需要执行，先了解]
rpm -e --nodeps rpm名称
```



#### 12.2.3 选择发行版本

> 由于默认安装8.0版本的MySQL，我们需要修改为5.7版本
>
> ![image-20220811160212240](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208111602834.png)

``` sh
# 查看一下默认选择的发行版本
yum repolist all | grep mysql
# 通过编辑/etc/yum.repos.d/mysql-community.repo文件，去修改发行版本
# 将80的enabled更改为0，将57的enabled更改为1，保存即可，再次通过yum repolist all | grep mysql查看
# 效果如下
```

| 打开这个文件                                                 |
| ------------------------------------------------------------ |
| `vi /etc/yum.repos.d/mysql-community.repo`                   |
| 修改如下内容                                                 |
| ![image-20220811063150994](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208110631701.png) |



#### 12.2.4 安装MySQL社区版服务

> 开始安装，这一步需要下载一段时间，下载失败就是网络较差了，学会科学上网

``` sh
yum -y install mysql-community-server
```

> 注意：如果安装结束后由如下提示
>
> `源 "MySQL 5.7 Community Server" 的 GPG 密钥已安装，但是不适用于此软件包`
>
> 请执行下面的命令
>
> `rm -f /etc/pki/rpm-gpg/RPM-GPG-KEY-mysql `
>
> `rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022 `
>
> 这两行执行完毕后，重新运行安装命令 `yum -y install mysql-community-server`
>
> 如果没有出现这个提示，上面两行不用执行!



#### 12.2.5 启动MySQL服务，并连接

> 安装成功后，手动启动，并使用日志中的密码登陆，而且第一个操作必须是修改密码，才可后续正常操作

``` sh
# 启动MySQL服务
systemctl start mysqld.service
# 查看初始化密码
grep 'temporary password' /var/log/mysqld.log
# 连接MySQL服务
mysql -u root -p
Enter password:随机密码
# 修改密码
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'P@ssw0rd';
# 要求密码，必须携带大写字母，小写字母，数字，特殊符号
```



#### 12.2.6 开启远程连接

> 默认MySQL禁止远程链接，需要单独创建一个用户开启远程链接，这样就可以在windows下使用图形化工具连接

``` sh
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'P@ssw0rd' WITH GRANT OPTION;
mysql> FLUSH PRIVILEGES;
```



#### 12.2.7 检查防火墙设置

检查防火墙 ` systemctl status firewalld`

关闭防火墙 `systemctl stop firewalld`

禁用防火墙 `systemctl disable firewalld`

| 检查防火墙                                                   |
| ------------------------------------------------------------ |
| ![image-20220811064314239](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208110643807.png) |
| 关闭防火墙并禁用防火墙后，重新查看                           |
| ![image-20220811064514572](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208110645056.png) |



| 使用本地的Sqlyog远程连接数据库                               |
| ------------------------------------------------------------ |
| ![image-20220811064704143](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208110647311.png) |



### 12.3 安装Tomcat

> 在Linux下安装Tomcat，以便部署工程到Linux操作系统



#### 12.3.1 下载Tomcat的压缩包

> 通过wget直接下载即可，或者本地下载过的，使用FTP工具上传到虚拟机

``` sh
wget https://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-9/v9.0.75/bin/apache-tomcat-9.0.75.tar.gz
```



#### 12.3.2 解压压缩包

> 一样解压到/usr/local目录下

``` sh
tar -zxvf apache-tomcat-9.0.75.tar.gz -C /usr/local
```



#### 12.3.3 启动Tomcat并监听日志

> 通过./执行可运行文件，并使用tail监控日志信息

``` sh
# 跳转到tomcat的bin目录
cd /usr/local/apache-tomcat-9.0.75/bin
# 启动
./startup.sh
# 监控日志
cd ../logs
tail -f catalina.out
# 启动成功如下
```

|                       日志及Tomcat首页                       |
| :----------------------------------------------------------: |
| ![image-20220811171449717](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208111714947.png) |



## 十三、部署SSM工程

> 部署项目到Linux中需要注意一下内容：
>
> - 项目要保证在Windows下是没有问题的，再考虑部署到Linux。
> - 将开发环境中的内容更改为测试环境。
>    - 连接数据库的信息。
>    - 存放文件的路径。
>    - 日志文件存放的位置。
>    - 项目路径问题。
> - 将Maven项目打包。
> - 根据项目路径的不同，将项目部署到Tomcat中。
> - 在部署到Linux操作系统中后，一定要查看日志。

-----


## Linux练习题

### 题目一

#### 1.在主目录~下新建目录newdir

>

#### 2.在主目录下新建目录dir1/dir2/dir3/dir4

>

#### 3.按照以下要求显示主目录的内容：

- a)默认方式显示

- >

- b)以长格式[详细方式]方式显示

- >

- c)显示所有内容

- >

- d)以长格式方式显示所有内容

- >

#### 4.已知/etc目录下有个passwd文件(/etc/passwd)，显示该文件的详细属性信息（长格式方式）

>

#### 5.显示主目录的详细属性信息、显示/bin目录的详细属性信息

>

#### 6.在第2题所创建的dir1/dir2/dir3/dir4目录下使用VIM新建一个文件hello，内容任意，然后保存在dir4目录下，尝试使用绝对路径和相对路径两种方式显示dir4目录下hello文件的详细属性信息（长格式方式）

- a)当前目录切换到主目录，然后显示dir4下的hello文件内容

- >

- b)当前目录切换到~/dir1目录，然后显示dir4下的hello文件内容

- >

- c)当前目录切换到根目录，然后显示dir4下的hello文件内容

- >

- d)当前目录切换到dir4目录，然后显示dir4下的hello文件内容

- >





### 题目二

#### 1.在主目录下创建test/test1/test2/test3目录。把/bin目录下的ls和chmod文件复制到test3目录下。然后把test3目录下的ls文件名修改为ls.ls，最后把test目录及其下面的内容全部删除

>


#### 2.对/etc/passwd文件，按如下方式分别显示其内容：

- a)显示全部内容

- >

- b)显示全部内容并显示行号

- >

- c)分页从第10行开始显示

- >

- d)分页从第10行开始显示，且每页显示4行

- >

- e)分页显示内容并显示行号

- >

- f)显示头4行

- >

- g)显示后5行

- >



#### 3.在主目录下创建cp_test目录和test目录。然后在cp_test目录下使用touch命令创建文件cp1和cp2：touch cp1 cp2。然后把cp_test目录连同目录下的cp1、cp2文件复制到test目录下。

>



#### 4.在主目录下新建目录dir1/dir2/dir3/dir4，把文件/etc/passwd复制到dir4目录下，尝试使用绝对路径和相对路径两种方式显示dir4目录中passwd文件内容

- a)当前目录切换到主目录，然后显示dir4下的passwd文件内容

- >

- b)当前目录切换到~/dir1目录，然后显示dir4下的passwd文件内容

- >

- c)当前目录切换到根目录，然后显示dir4下的passwd文件内容

- >

- d)当前目录切换到dir4目录，然后显示dir4下的passwd文件内容

- >



#### 5.使用VIM创建一个名字为myvim的文件，并输入三行内容，分别是：
this is a test for link
hard link
symbol link
输入完内容之后，保存文件。然后创建myvim的符号链接文件myvim.soft和硬链接文件myvim.hard。在myvim文件的最后新添加一行“hard and symbol link”，保存后退出。然后分别显示符号链接和硬链接文件的内容，查看其内容是否有变化。删除myvim文件，然后分别查看符号链接和硬链接文件内容，时候还能正常读出文件内容。

>
>



### 题目三

1.创建一个名字为xxx的用户，并指定其用户主目录为/home/xxx；

>

创建一个名字为xxx_group的组；

>

删除xxx_group组；

>

删除xxx用户，同时删除其主目录。

>



### 题目四

1、在主目录下使用使用VIM新建一个文本文件chmodtest，内容任意，然后执行如下操作：

a)查看chmodtest文件的user、group是谁？并查看其user、group、others的相应权限是什么？

>

b)为chmodtest文件的others添加w权限；

>

c)为chmodtest的user拿掉可读权限，然后读取该文件内容，看能否读出

>

d)恢复chmodtest的user可读权限，去掉可写权限，然后用VIM重新打开文件，并对文件内容进行修改，最后保存时能否保存成功，为什么？

>

e)把chmodtest文件复制到/home目录下，看能否复制成功，为什么

>

f)把chmodtest文件复制到/bin目录下，看能否复制成功，为什么

>

g)在/home下新建一个目录dir，能否创建成功，为什么？是否还能正常读出文件内容。

> 


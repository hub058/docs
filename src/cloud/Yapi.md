---
title: Yapi
---



::: tip Yapi是什么

高效、易用、功能强大的API管理平台
旨在为开发、产品、测试人员提供更优雅的接口管理服务.

功能：

帮助开发者轻松创建、发布、维护 API。
自动化生成接口文档。

:::

## 1、Yapi接口服务搭建

### 拉取yapi镜像文件

#### 1.docker安装yapi

```  sh
docker pull registry.cn-hangzhou.aliyuncs.com/anoy/yapi
``` 

#### 2.创建数据存储目录

```  sh
mkdir -p /home/data/yapi/mongodata
``` 

##### 3.使用专用mongodata存储yapi数据：

```  sh
docker run --restart always -v /home/data/yapi/mongodata:/data/db -d --name yapimongo mongo
``` 



### yapi启动和配置

#### 初始化yapi镜像参数

```  sh
docker run -it --rm --link yapimongo:mongo --entrypoint npm --workdir /api/vendors registry.cn-hangzhou.aliyuncs.com/anoy/yapi run install-server
``` 

#### 启动yapi镜像
使用3001端口进行启动，并跟随docker启动。

```  sh
docker run -d  --restart=always --name yapi  --link yapimongo:mongo --workdir /api/vendors  -p 3001:3000  registry.cn-hangzhou.aliyuncs.com/anoy/yapi  server/app.js
``` 

#### 登陆
```  sh
输入： http:\\ip:3001 进入系统。
``` 

![image-20220531142554465](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531142554465.png)

## 2、Yapi接口使用

| 主界面介绍                                                   |
| ------------------------------------------------------------ |
| ![image-20220531142755531](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531142755531.png) |



| 新建项目                                                     |
| ------------------------------------------------------------ |
| ![image-20220531143009455](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531143009455.png) |



| 新建接口                                                     |
| ------------------------------------------------------------ |
| ![image-20220531144501779](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531144501779.png) |



## 3、IDEA的EasyYapi插件

#### 安装IDEA的EasyYapi插件

| 安装插件                                                     |
| ------------------------------------------------------------ |
| ![image-20220531144747593](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531144747593.png) |



#### 使用方式

打开项目中的包含`api/rpc`的文件或者在IDEA的左边项目文件区域选择文件或者文件夹, 使用快捷键`alt shift E(windows)/ctrl E(mac)`, 



第一次导出需要指定Yapi服务器的地址和项目的token

![image-20220531145117076](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531145117076.png)



| 设置Yapi                                                     |
| ------------------------------------------------------------ |
| ![image-20220531145257863](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531145257863.png) |
| 导出接口                                                     |
| ![image-20220531145430664](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531145430664.png) |





## 4、接口测试

::: tip

Chrome浏览器运行接口需要安装 cross-request插件

:::

#### 安装

安装地址cross-request插件

```  sh
git clone https://github.com/YMFE/cross-request
``` 

下载完成后，打开chrome扩展插件，选择上面一步下载的文件目录，安装已解压的插件

![image-20220531150754178](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531150754178.png)



#### 运行接口

访问真实的后端服务地址

| 设置运行环境，发送请求                                       |
| ------------------------------------------------------------ |
| ![image-20220531152832277](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531152832277.png) |

响应的结果

![image-20220531152858316](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531152858316.png)



## 5、成员管理

![image-20220531154829279](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220531154829279.png)

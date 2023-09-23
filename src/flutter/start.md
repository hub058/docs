---
title: Flutter入门
author: zed
---



## 系统配置要求

要想安装和运行 Flutter，你的开发环境至少应该满足如下的需求：

- **操作系统**：Windows 10 或更高的版本（基于 x86-64 的 64 位操作系统）。

- **磁盘空间**：除安装 IDE 和一些工具之外还应有至少 1.64 GB 的空间。

- **设置**: 必须在 Windows 10/11 上启用开发者模式。

- **工具**：要让 Flutter 在你的开发环境中正常使用，依赖于以下的工具：

  - [Windows PowerShell 5.0](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-windows-powershell) 或者更高的版本（Windows 10 中已预装）

  - [Git for Windows](https://git-scm.com/download/win) 2.x，并且勾选**从 Windows 命令提示符使用 Git** 选项。

    如果 Windows 版的 Git 已经安装过了，那么请确保能从命令提示符或者 PowerShell 中直接执行 git 命令。



## 下载Flutter SDK

下载Flutter源代码到本地

**注意：Flutter文件的保存位置不要有中文和特殊字符及空格**

![image-20220902193633057](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209021936309.png)

> git clone https://github.com/flutter/flutter.git

下载完成后，修改系统环境变量

> 在系统的Path条目中，增加 `flutter/bin` 目录的完整路径



## 安装相关工具

> 这一步是最考验耐心的步骤，工具多，安装包大，安装时间长，网络差[很有可能]
>
> 难点在这一步

- GIT

- IDEA 及Flutter插件
- Android Studio 及Flutter插件
- Chrome 浏览器
- Visual Studio 【如果要进行WINDOWS端开发】



## 执行Flutter检查

> 执行flutter的bin目录下的 flutter命令，如果看到全部条件都是绿色状态，就说明Flutter环境安装OK！
>
> ![image-20220902194012656](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209021940809.png)

如果Android toolchain这一步显示红×，需要接受安卓的许可协议！

```shell
flutter doctor --android-licenses
```



## 安卓模拟器

模拟器可以安装，也可以不安装，直接在真机[你的安卓或者苹果手机]上运行



## 创建项目

> 作为后端开发者，还是习惯使用IDEA作为我们的开发利器！
>
> 需要在IDEA插件库中安装 `flutter`和 `Dart` 插件
>
> ![image-20220902194958045](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209021949180.png)



1、创建项目，然后点下一步

![image-20220902195117174](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209021951290.png)



2、填写项目信息，然后点下一步

![image-20220902195242935](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209021952079.png)



## 目录说明

![image-20220902195537383](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209021955498.png)





## 运行项目

![image-20220902200717249](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022007537.png)

> Flutter 支持热更新，修改代码后
>
> 保存代码或者点击闪电⚡图标，可以立即生效

比如：设置主题色

![image-20220902200850770](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022008082.png)



## 打包APK安卓包

![image-20220902201024740](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022010810.png)

获取安装包

![image-20220902201338708](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022013952.png)

可以找到安装包，发给小伙伴，秀一把！自己手机上也可以安装



## 在浏览器中运行

![image-20220902201724208](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022017442.png)





## 打包web项目

需要在终端执行如下命令

> 渲染方式，了解下【不需要指定】
>
> 第一种渲染方式：
>
> flutter build web --web-renderer html
>
> 第二种渲染方式：
>
> flutter build web --web-renderer canvaskit

打包时注意：

> 第一步清空历史数据：`flutter clean`
>
> 第二步开启web：`flutter config --enable-web`
>
> 第三步新建项目：`flutter create .`  注意最后的小点
>
> 第四步编译： `flutter build web --release`
> 



运行结束后，可以看到，在项目目录下多了个web文件夹

![image-20220902205516075](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022055220.png)

重新打web包

![image-20220902202821903](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022028058.png)

## 部署web应用

> 把上一步打包的web目录 整个放到 web容器中
>
> ![image-20220902205846871](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022058967.png)
>
> 比如放到tomcat中，注意需要放到ROOT目录中，因为在访问静态资源的时候默认路径是项目的根目录
>
> ![image-20220902205808791](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022058043.png)



## 打包桌面端

> 前提是需要安装 Visual Studio 和Window 10 必要的组件

在终端执行如下命令 `flutter build windows --release ` 打包windows桌面端应用

| 如图所示                                                     |
| ------------------------------------------------------------ |
| ![image-20220902210129977](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022101088.png) |
| 第一次执行，需要下载一些工具，等待一会 执行结果如下          |
| ![image-20220902210619325](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209022106559.png) |




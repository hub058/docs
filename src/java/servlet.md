---
title: Servlet
---

## 一、引言

### 1.1 C/S架构和B/S架构

> C/S和B/S是软件发展过程中出现的两种软件架构方式。
>
> Client 客户端
>
> Server  服务器端
>
> Browser 浏览器



###  1.2 C/S架构（Client/Server 客户端/服务器）

> - 特点：必须在客户端【用户电脑上】安装特定软件
> - 优点：图形效果显示较好(如：3D游戏)
> - 缺点：服务器的软件和功能进行升级，客户端也必须升级、不利于维护
>
> - 常见的C/S程序：QQ、微信等

|                           C/S架构                            |
| :----------------------------------------------------------: |
| ![C_S](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/C_S.png) |



### 1.3 B/S架构（Browser/Server 浏览器/服务器）

> - 特点：无需安装客户端，任何浏览器都可直接访问
> - 优点：涉及到功能的升级，只需要升级服务器端
> - 缺点：图形显示效果不如C/S架构
> - 需要通过HTTP协议访问

|                           B/S架构                            |
| :----------------------------------------------------------: |
| ![B_S](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/B_S.png) |



## 二 、服务器

------

###  2.1 概念

### 2.1.1 什么是Web

> Web(World Wide Web) 称为万维网，简单理解就是网站，它用来表示Internet主机上供外界访问的资源。
>
> Internet上供外界访问的资源分为两大类
>
> +  静态资源：指Web页面中供人们浏览的数据始终是不变的。(HTML、CSS)
>
> + 动态资源：指Web页面中供人们浏览的数据是由程序产生的，不同时间点，甚至不同设备访问Web页面看到的内容各不相同。（JSP/Servlet）
>
> - 在Java中，动态Web资源开发技术我们统称为Java Web开发。



### 2.1.2 什么是Web服务器

> Web服务器是运行及发布Web应用的容器，只有将开发的Web项目放置到该容器中，才能使网络中的所有用户通过浏览器进行访问。



### 2.2 常见服务器

> - 开源：OpenSource（1、开放源代码 2、免费）
>   - Tomcat(主流Web服务器之一，适合初学者) SpringBoot【内置了Tomcat】
>   - jetty（淘宝，运行效率比Tomcat高）
>   - resin（新浪，所有开源服务器软件中，运行效率最高的）
>   - 三者的用法从代码角度完全相同，只有在开启、关闭服务器软件时对应的命令稍有区别。掌握一个即掌握所有
> - 收费
>   - WebLogic（Oracle）
>   - WebSphere（IBM）
>   - 提供相应的服务与支持，软件大，耗资源



### 2.3 Tomcat服务器

> Tomcat是Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，免费开源、并支持Servlet 和JSP 规范。目前Tomcat最新版本为10.0。
>
> Tomcat 技术先进、性能稳定，深受Java 爱好者喜爱并得到了部分软件开发商的认可，成为目前比较流行的Web 应用服务器。
>
> https://tomcat.apache.org/



###  2.4 Tomcat安装

### 2.4.1 下载

> 官网下载(http://tomcat.apache.org/)  download -> Tomcat9.0解压缩版本



### 2.4.2 解压安装

> 将Tomcat解压到一个没有特殊符号的目录中（一般纯英文即可）
>
> 注意
>
> + 不建议将服务器软件放在磁盘层次很多的文件夹
> + 不建议放在中文路径下



### 2.4.3 Tomcat目录结构

| 文件夹  | 说明                                                         | 备注                                                         |
| ------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| bin     | 该目录下存放的是二进制可执行文件                             | startup.bat启动Tomcat、shutdown.bat停止Tomcat                |
| conf    | 这是一个非常重要的目录，这个目录下有两个最为重要的文件server.xml和web.xml | server.xml：配置整个服务器信息。例如修改端口号，编码格式等。<br/>web.xml：项目部署描述符文件，这个文件中注册了很多MIME类型，即文档类型。 |
| lib     | Tomcat的类库，里面存放Tomcat运行所需要的jar文件。            |                                                              |
| logs    | 存放日志文件，记录了Tomcat启动和关闭的信息，如果启动Tomcat时有错误，异常也会记录在日志文件中。 |                                                              |
| temp    | Tomcat的临时文件，这个目录下的东西在停止Tomcat后删除。       |                                                              |
| webapps | 存放web项目的目录，其中每个文件夹都是一个项目；其中ROOT是一个特殊的项目，在地址栏中没有给出项目目录时，对应的就是ROOT项目。 |                                                              |
| work    | 运行时生成的文件，最终运行的文件都在这里。                   | 当客户端用户访问一个JSP文件时，Tomcat会通过JSP生成Java文件，然后再编译Java文件生成class文件，生成的java和class文件都会存放到这个目录下。 |



### 2.5 Tomcat启动和停止

### 2.5.0 Tomcat配置

> 需要配置Tomcat安装位置，还需要配置Path路径

| CATALINA_HOME                                                |
| ------------------------------------------------------------ |
| ![image-20220728094546364](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207280945615.png) |
| 配置Path环境变量，需要追加tomcat目录下的bin目录              |
| ![image-20220728094749677](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207280947938.png) |



### 2.5.1 启动

> 进入tomcat安装目录bin下，双击startup.bat 启动程序，出现如下界面

|                       Tomcat启动控制台                       |
| :----------------------------------------------------------: |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/005.png) |

> 启动后，控制台中文乱码的处理方案
>
> 原因：Console终端默认的编码是GBK，可以通过查看cmd终端的属性验证
>
> Tomcat log编码为utf-8,需要修改为一致的编码类型
>
> 解决方案: 修改~/conf/logging.properties
>
> java.util.logging.ConsoleHandler.encoding = GBK

默认的端口号是 8080

conf/server.xml文件中

![image-20220406141806004](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406141806004.png)

如果要修改端口号的话 

> 如果把你的电脑比作一个你们小区的楼 IP地址找到，端口号就类似于你家的门牌号 1-101,1-102。端口号 1-2000之间的被系统占用的，8080 9090 11100 .

注意：修改端口号需要重新启动Tomcat才能生效

### 2.5.2 验证

> 打开浏览器，输入 http://localhost:8080
>
> 如果出现以下界面证明Tomcat启动成功。
>

|                        Tomcat访问页面                        |
| :----------------------------------------------------------: |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/tomcat.png) |



### 2.5.3 停止

> 双击shutdown.bat即可关闭Tomcat启动窗口。



### 常见错误

### 2.5.4 Tomcat控制台闪退

> 闪退问题是由于JAVA_HOME配置导致的，检查JAVA_HOME配置是否正确

1、先配置JAVA_HOME环境变量

![image-20220406113030329](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406113030329.png)

2、配置CATALINA_HOME环境变量

![image-20220406113136641](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406113136641.png)

3、配置Path变量

![image-20220406112912563](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406112912563.png)




### 2.6 项目部署及访问静态资源

> Tomcat是Web服务器，我们的项目应用是部署在webapps下，然后通过特定的[URL]()访问。



### 2.6.1 创建项目

> -  在webapps中建立文件夹（项目应用），比如：bootstrap
>   -  把网页index.html复制到bootstrap文件夹中

![image-20220728101341945](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281013078.png)

![image-20220728101402878](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281014015.png)



### 2.6.2 URL访问资源

> 浏览器地址中输入URL：http://localhost:8080/bootstrap/index.html

- [经验：URL主要有4部分组成：协议、主机、端口、资源路径]()

|                           URL组成                            |
| :----------------------------------------------------------: |
| ![image-20220728101450609](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281014953.png) |

> 浏览器访问网站时，如果地址栏不明确指定访问哪个网页[或者接口]就会默认查找 `index.html` `index.htm` `index.jsp` 这些文件



### 2.6.3 Tomcat响应流程图

|                        请求响应流程图                        |
| :----------------------------------------------------------: |
| ![image-20200422205742782](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/请求流程.png) |



### 2.6.4 404

> 访问资源不存在，出现404错误
>
> 资源不仅仅是html/css/js这些静态资源
>
> 还包括servlet接口地址，接口也属于资源

|                           404错误                            |
| :----------------------------------------------------------: |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207280642957.png)|



## 三 、Servlet

------

### 3.1 概念

> - Servlet：Server Applet的简称，是服务器端的程序（代码、功能实现），可交互式的处理客户端发送到服务端的请求，并完成操作响应。
> - 动态网页技术
> - JavaWeb程序开发的基础，JavaEE规范（一套接口）的一个组成部分。



### 3.1.1 Servlet作用

> - 接收客户端请求，完成操作。
> - 动态生成网页（页面数据可变）。
> - 将包含操作结果的动态网页响应给客户端。



## 四、IDEA创建Web项目【`重点`】

### 4.1 IDEA创建Web项目

> 打开IDEA -> New project -> Java Enterprise  按下图的操作配置完成  然后Next , Finish结束。

|                         创建Web项目                          |
| :----------------------------------------------------------: |
| ![image-20220728110100801](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281101084.png) |

> 输入项目名称和项目保存位置，点击Finish,完成项目创建。
>
> 项目创建完成后，默认给我们生成了一个HelloServlet类，生成了一个hello.jsp 页面，我们不需要就可以删掉这两个文件。pom.xml 文件中的 dependencies标签也可以删掉。
>
> ![image-20220406172325134](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406172325134.png)
>
> 添加servlet-api.jar包到工程中
>
> ![image-20220406172708133](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406172708133.png)

|                          启动Tomcat                          |
| :----------------------------------------------------------: |
| ![image-20220406173121419](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220406173121419.png) |



> Web项目目录介绍

|                           目录结构                           |
| :----------------------------------------------------------: |
| ![image-20220728115401747](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281154880.png) |



### 4.2 IDEA开发Servlet

> 使用开发工具编写Servlet，仍要手工导入[servlet-api.jar]()文件，并与项目关联。



### 4.2.1 编写Servlet

> 创建MyServlet，实现Servlet接口，覆盖5个方法

```  java
package com.qf.servlet;

import javax.servlet.*;
import java.io.IOException;

/**
 * @author zed
 * @date 2022/7/28
 */
public class MyServlet implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    // 处理浏览器请求的方法
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("Hello Servlet,你好");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}

```



### 4.2.2 配置web.xml

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <!--配置servlet类的-->
    <servlet>
        <servlet-name>my</servlet-name>
        <servlet-class>com.qf.servlet.MyServlet</servlet-class>
    </servlet>
    
    <!--配置请求地址和servlet的映射管理 -->
    <!--也就是浏览器发送什么请求地址交给哪个servlet进行处理-->
    <servlet-mapping>
        <servlet-name>my</servlet-name>
        <url-pattern>/my</url-pattern>
    </servlet-mapping>
</web-app>
```

> 选择Project Library,完成。
>
> + Global Library  表示所有工程都可以使用。
> + Project Library 表示当前工程中所有模块都可以使用。
> + Module Library  表示当前模块可以使用。

|                         关键项目环境                         |
| :----------------------------------------------------------: |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/030.png) |

| servlet执行过程                                              |
| ------------------------------------------------------------ |
| ![image-20220728120622030](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281206367.png) |



IDEA终端 乱码问题

> 原因：编码不一致导致的
>
> 建议所有的编码都改成UTF-8编码
>
> tomcat idea concole 全都修改为UTF-8编码
>
> tomcat修改编码 conf/logging.properties文件中修改下面这一行
>
> - java.util.logging.ConsoleHandler.encoding = UTF-8

idea修改文件编码

> ![image-20220407115656395](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407115656395.png)



> idea修改终端编码
>
> ![image-20220407115342118](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407115342118.png)

修改wmoptions编码

![image-20220407121644481](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407121644481.png)



打包：可以脱离开发环境，直接在Tomcat中运行web项目

1、maven打包插件

```  xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.3.2</version>
        </plugin>
    </plugins>
</build>
```

2、plugins -> war -> war:war






## 五、HTTP协议

------

### 5.1 什么是HTTP

html超文本标记语言

> 超文本传输协议（HTTP，HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议,是一个基于**请求与响应模式**的、无状态的、应用层的协议，运行于TCP协议基础之上。



### 5.2 HTTP协议特点

> - 支持客户端（浏览器）/服务器模式。
>
> - 简单快速：客户端只向服务器发送请求方法和路径，服务器即可响应数据，因而通信速度很快。请求方法常用的有GET、POST等。
>
> - 灵活：HTTP允许传输任意类型的数据，传输的数据类型由Content-Type标识。 text/html  applicaion/json
>
>
> - 无连接：无连接指的是每次TCP连接只处理一个或多个请求，服务器处理完客户的请求后，即断开连接。采用这种方式可以节省传输时间。
>   - HTTP1.0版本是一个请求响应之后，直接就断开了。称为短连接。
>   - HTTP1.1版本不是响应后直接就断开了，而是等几秒钟,这几秒钟之内有新的请求，那么还是通过之前的连接通道来收发消息，如果过了这几秒钟用户没有发送新的请求，就会断开连接。称为长连接。
>
> - 无状态：HTTP协议是无状态协议。
>   - 无状态是指协议对于事务处理没有记忆能力。



### 5.3 HTTP协议通信流程

> - 客户与服务器建立连接（三次握手）。
>
> - 客户向服务器发送请求。
> - 服务器接受请求，并根据请求返回相应的文件作为应答。
> - 客户与服务器关闭连接（四次挥手）。

|                           HTTP原理                           |
| :----------------------------------------------------------: |
| ![http](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/http.png) |



### 5.4 请求报文和响应报文【了解】

### 5.4.1 HTTP请求报文

> 当浏览器向Web服务器发出请求时，它向服务器传递了一个数据块，也就是请求信息（请求报文），HTTP请求信息由4部分组成：
> 1、请求行 请求方法/地址 URI协议/版本
> 2、请求头(Request Header)
> 3、空行
> 4、请求正文

|                           请求报文                           |
| :----------------------------------------------------------: |
| ![image-20220407095636206](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407095636206.png) |



### 5.4.2 HTTP响应报文

> HTTP响应报文与HTTP请求报文相似，HTTP响应也由4个部分组成：
> 1、状态行
> 2、响应头(Response Header)
> 3、空行
> 4、响应正文

|                           响应报文                           |
| :----------------------------------------------------------: |
| ![image-20220407095650168](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407095650168.png) |



### 5.4.3 常见状态码

| 状态代码 | 状态描述              | 说明                                                         |
| -------- | --------------------- | ------------------------------------------------------------ |
| 200      | OK                    | 客户端请求成功                                               |
| 302      | Found                 | 临时重定向                                                   |
| 403      | Forbidden             | 服务器收到请求，但是拒绝提供服务。服务器通常会在响应正文中给出不提供服务的原因 |
| 404      | Not Found             | 请求的资源不存在，例如，输入了错误的URL。                    |
| 500      | Internal Server Error | 服务器发生不可预期的错误，导致无法完成客户端的请求。         |



##  六、Servlet详解【`重点`】

------

### 6.1 Servlet核心接口和类

> 在Servlet体系结构中，除了实现Servlet接口，还可以通过继承GenericServlet 或 HttpServlet类，完成编写。



### 6.1.1 Servlet接口

> 在Servlet API中最重要的是Servlet接口，所有Servlet都会直接或间接的与该接口发生联系，或是直接实现该接口，或间接继承自实现了该接口的类。
> 该接口包括以下五个方法：
>
> - init(ServletConfig config)  # 初始化servlet的方法
>
> - ServletConfig getServletConfig() # 获取ServletConfig配置对象
>
> - service(ServletRequest req,ServletResponse res) #核心的处理请求的方法
>
> - String getServletInfo() # 获取servlet信息的，返回字串
>
> - destroy( ) # 请求处理完成后，servlet销毁的方法



### 6.1.2 GenericServlet抽象类

> GenericServlet 使编写 Servlet 变得更容易。它提供生命周期方法 init 和 destroy 的简单实现，要编写一般的 Servlet，只需重写抽象 service 方法即可。 

适配器模式

> 创建一个适配器类，实现接口的全部方法，可以是空实现。
>
> 我们自己在创建类的时候就不需要实现接口[不用重写接口里的所有方法]，我们只需要继承适配器类，
>
> 只需要重写你关注的方法就可以。
>
> 在安卓开发中适用的非常多。

```  java
package com.qf.web02;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

public class MyGenServlet extends GenericServlet {
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("适用通用的servlet类GenericServlet创建的Servlet");
    }
}

```

web.xml文件中增加 

> 请求路径和Servlet类的映射[关联]关系

```  xml
<servlet>
    <servlet-name>gen</servlet-name>
    <servlet-class>com.qf.web02.MyGenServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>gen</servlet-name>
    <url-pattern>/gen</url-pattern>
</servlet-mapping>
```


### 6.1.3 HttpServlet类

> HttpServlet是继承GenericServlet的基础上进一步的扩展。
> 提供将要被子类化以创建适用于 Web 站点的 HTTP servlet 的抽象类。
>
> HttpServlet 的子类至少必须重写一个方法，该方法通常是以下这些方法之一： 
> 	doGet，如果 servlet 支持 HTTP GET 请求 
> 	doPost，用于 HTTP POST 请求 
> 	doPut，用于 HTTP PUT 请求 
> 	doDelete，用于 HTTP DELETE 请求 



### 6.2 Servlet两种创建方式

### 6.2.1 实现接口Servlet

```  Java
/**
 * Servlet创建的第一种方式：实现接口Servlet
 * */
public class HelloServlet2 implements Servlet{

	@Override
	public void destroy() {
	}

	@Override
	public ServletConfig getServletConfig() {
		return null;
	}

	@Override
	public String getServletInfo() {
		return null;
	}

	@Override
	public void init(ServletConfig arg0) throws ServletException {
	}
	@Override
	public void service(ServletRequest request, ServletResponse response) throws ServletException, IOException {
		System.out.println("OK");
		response.getWriter().println("welcome use servlet");
	}
}
```

- [该方式比较麻烦，需要实现接口中所有方法。]()



> TIPS：实现web开发中的热更新

| 发布war包时选择 exploded 版本的                              |
| ------------------------------------------------------------ |
| ![image-20220728155055800](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281550032.png) |
| 配置热更新                                                   |
| ![image-20220728155402723](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207281554079.png) |
| 使用热更的方式                                               |
| 1、项目启动时使用debug调试运行  2、编写完代码后，在IDEA失去焦点时会自动编译项目，自动发布<br />打开浏览器访问，就可以看到修改后的效果了，不需要重新启动Tomcat. |

> 新增方式 或者 删除方法 热更新不生效



### 6.2.2 继承HttpServlet（推荐）

- 如果使用了get请求，servlet中又没有重写doGet方法，就会返回405错误，请求的GET方式不支持。
- 如果使用了post请求，servlet中又没有重写doPost方法，就会返回405错误，请求的POST方式不支持。

错误截图

![image-20220407142324241](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407142324241.png)

```  Java
/**
 * Servlet implementation class HelloServlet
 * Servlet的第二种创建方式，继承HttpServlet.也是开发中推荐的
 * 
 */
public class HelloServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().print("welcome use servlet");
	}
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
```

网页乱码问题的解决方案：

![image-20220407142053927](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220407142053927.png)

### 6.2.3 常见错误

```  text
- HTTP Status 404   资源找不到 。
  - 第一种情况：地址书写错误。
  - 第二种情况：地址没有问题，把IDEA项目中out目录删除，然后重新运行。
- Serlvet地址配置重复。both mapped to the url-pattern [/helloservlet] which is not permitted。
- Serlvet地址配置错误。比如没有写/  Invalid <url-pattern> [helloservlet2] in servlet mapping。
```

### 6.3 Servlet两种配置方式

### 6.3.1 使用web.xml（Servlet2.5之前使用）

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" version="3.1">
  <display-name>Web_Day11</display-name>
  <!--Servlet的第二种配置  -->
  <!--Servlet配置  -->
  <servlet>
  <!--名称  -->
    <servlet-name>hello2</servlet-name>
    <!--Servlet的全称类名  -->
    <servlet-class>com.qf.web.servlet.HelloServlet</servlet-class>
    <!--启动的优先级，数字越小越先起作用  -->
    <load-on-startup>1</load-on-startup>
  </servlet>
  <!--映射配置  -->
  <servlet-mapping>
  <!--名称  -->
    <servlet-name>hello2</servlet-name>
    <!--资源的匹配规则：精确匹配  -->
    <url-pattern>/hello2</url-pattern>
  </servlet-mapping>
  <welcome-file-list>
    <welcome-file>login.html</welcome-file>
  </welcome-file-list>
</web-app>
```



### 6.3.2 配置属性

> url-pattern定义匹配规则，取值说明：
> 精确匹配     `/具体的名称`		只有url路径是具体的名称的时候才会触发Servlet
> 后缀匹配     `*.action`		   只要是以xxx结尾的就匹配触发Servlet
> 通配符匹配   `/*` 			   匹配所有请求，包含服务器的所有资源
> 通配符匹配  ` / `          匹配所有请求，包含服务器的所有资源，不包括.js .css静态文件



> load-on-startup 
> 1元素标记容器是否应该在web应用程序启动的时候就加载这个servlet。
> 2它的值必须是一个整数，表示servlet被加载的先后顺序。
> 3如果该元素的值为负数或者没有设置，则容器会当Servlet被请求时再加载。
> 4如果值为正整数或者0时，表示容器在应用启动时就加载并初始化这个servlet，值越小，servlet的优先级越高，就越先被加载。值相同时，容器就会自己选择顺序来加载。


### 6.3.3 使用注解 （Servlet3.0后支持，推荐）

```  Java
package com.qf.web02;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//@WebServlet(value = {"/http","/http1","/http2"})
@WebServlet(value = "/http",loadOnStartup = 1)
public class MyHttpServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter out = resp.getWriter();
        out.println("继承<font color=\"red\">HttpServlet</font>的方式创建servlet");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}

```



### 6.3.4 @WebServlet注解常用属性

> - name: Serlvet名字 （可选）
>
> - value: 配置url路径,可以配置多个
>
> - urlPatterns：配置url路径 ，和value作用一样，不能同时使用
>
> - loadOnStartup:配置Servlet的创建的时机， 如果是0或者正数 启动程序时创建，如果是负数，则访问时创建。 数子越小优先级越高。





## 七、Servlet应用【`重点`】

------

### 	7.1 request对象

> 在Servlet中用来处理客户端请求需要用doGet或doPost方法的request对象

|                           request                            |
| :----------------------------------------------------------: |
| ![image-20200512135542823](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/request对象.png) |



### 7.1.1 get和post区别

> [get请求]()
>
> + get提交的数据会放在URL之后，以?分割URL和传输数据，参数之间以&相连
> + get方式明文传递，数据量小，不安全
> + 效率高，浏览器默认请求方式为GET请求
> + 对应的Servlet的方法是doGet
>
> [post请求]()
>
> + post方法是把提交的数据放在HTTP包的Body中
> + 密文传递数据，数据量大，安全
> +  效率相对没有GET高
> + 对应的Servlet的方法是doPost



### 7.1.2 request主要方法

| 方法名                                    | 说明                         |
| ----------------------------------------- | ---------------------------- |
| String getParameter(String name)          | 根据表单组件名称获取提交数据 |
| void setCharacterEncoding(String charset) | 指定每个请求的编码           |



### 7.1.3 request应用

> HTML页面
>

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
</head>
<body>
    <form action="hi" method="post">
        名字：<input type="text" name="name" /> <br />
        密码：<input type="password" name="pwd" /> <br />
        <input type="submit" value="登录">
    </form>
</body>
</html>
```



> Servlet代码
>

``` java
package com.qf.web02;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hi")
public class HiServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应的编码
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter writer = resp.getWriter();
        // 修改请求的编码为utf-8
        req.setCharacterEncoding("utf-8");
        // 获取请求参数
        String name = req.getParameter("name");
        String pwd = req.getParameter("pwd");
        // 判斷登錄是否成功
        if ("大壮".equals(name) && "123".equals(pwd)) {
            writer.println("<h1>恭喜你，" + name + "登录成功!</h1>");
        } else {
            writer.println("<font color='red'>用户名或密码错误!</h1>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // post方法调用get方法
        doGet(req, resp);
    }
}

```



### 7.1.4 get请求收参问题

> 产生乱码是因为服务器和客户端沟通的编码不一致造成的，因此解决的办法是：在客户端和服务器之间设置一个统一的编码，之后就按照此编码进行数据的传输和接收



### 7.1.5 get中文乱码

> 在Tomcat7及以下版本，客户端以UTF-8的编码传输数据到服务器端，而服务器端的request对象使用的是ISO8859-1这个字符编码来接收数据，服务器和客户端沟通的编码不一致因此才会产生中文乱码的。
>
> - 解决办法：在接收到数据后，先获取request对象以ISO8859-1字符编码接收到的原始数据的字节数组，然后通过字节数组以指定的编码构建字符串，解决乱码问题。
>
>
> - **Tomcat8的版本中get方式不会出现乱码了**，因为服务器对url的编码格式可以进行自动转换。

``` java
package com.qf.web02;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hi")
public class HiServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应的编码
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter writer = resp.getWriter();
        // 修改请求的编码为utf-8
        req.setCharacterEncoding("utf-8");
        // 获取请求参数
        String name = req.getParameter("name");
        String pwd = req.getParameter("pwd");
        // 判斷登錄是否成功
        if ("大壮".equals(name) && "123".equals(pwd)) {
            writer.println("<h1>恭喜你，" + name + "登录成功!</h1>");
        } else {
            writer.println("<font color='red'>用户名或密码错误!</h1>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // post方法调用get方法
        doGet(req, resp);
    }
}

```



### 7.1.6 post中文乱码

> 由于客户端是以UTF-8字符编码将表单数据传输到服务器端的，因此服务器也需要设置以UTF-8字符编码进行接收。
>
> - 解决方案：使用从ServletRequest接口继承而来的setCharacterEncoding(charset)方法进行统一的编码设置。

``` Java
package com.qf.web02;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hi")
public class HiServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应的编码
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter writer = resp.getWriter();
        // 修改请求的编码为utf-8
        req.setCharacterEncoding("utf-8");
        // 获取请求参数
        String name = req.getParameter("name");
        String pwd = req.getParameter("pwd");
        // 判斷登錄是否成功
        if ("大壮".equals(name) && "123".equals(pwd)) {
            writer.println("<h1>恭喜你，" + name + "登录成功!</h1>");
        } else {
            writer.println("<font color='red'>用户名或密码错误!</h1>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // post方法调用get方法
        doGet(req, resp);
    }
}

```

 

### 	7.2 response对象

> response对象用于响应客户请求并向客户端输出信息。

|                           response                           |
| :----------------------------------------------------------: |
| ![image-20200512135658133](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/response对象.png) |



### 7.2.1 response主要方法

| 方法名称                     | 作用                               |
| :--------------------------- | :--------------------------------- |
| setHeader(name,value)        | 设置响应信息头                     |
| setContentType(String)       | 设置响应文件类型、响应式的编码格式 |
| setCharacterEncoding(String) | 设置服务端响应内容编码格式         |
| getWriter()                  | 获取字符输出流                     |



### 7.2.2 response应用

```  java
// 设置响应的编码
resp.setContentType("text/html;charset=utf-8");
PrintWriter writer = resp.getWriter();
// 修改请求的编码为utf-8
req.setCharacterEncoding("utf-8");
// 获取请求参数
String name = req.getParameter("name");
String pwd = req.getParameter("pwd");
// 判斷登錄是否成功
if ("大壮".equals(name) && "123".equals(pwd)) {
    writer.println("<h1>恭喜你，" + name + "登录成功!</h1>");
} else {
    writer.println("<font color='red'>用户名或密码错误!</h1>");
}

```

- [如果输出内容包含中文，则出现乱码，因为服务器默认采用ISO8859-1编码响应内容]()



### 7.2.3 解决输出中文乱码

> response.setContentType("text/html;charset=UTF-8");



### 7.3 综合案例(Servlet + JDBC)

::: details 项目代码

[代码仓库](http://124.223.190.53/2209/empproject)

:::

> - 要求：实现登录功能、展示所有用户功能
>- 以下仅展示关键代码
> - ![image-20220729101523801](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207291015048.png)



### 7.3.1 数据库

演示：用户登录，查询所有用户

![image-20220408100915775](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220408100915775.png)

```  mysql
CREATE TABLE admin(
`username` VARCHAR(20) NOT NULL PRIMARY KEY,
`password` VARCHAR(20) NOT NULL,
`phone` VARCHAR(11),
`address` VARCHAR(250)
) CHARSET=utf8;

INSERT INTO admin(`username`,`password`)
VALUES('狗蛋','123456'),('李萌','123');
```



### 7.3.2 DBUtils

|                                                              |
| ------------------------------------------------------------ |
| ![image-20220729094610823](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207291015288.png) |

database.properties 文件内容

``` properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/java2209?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8
username=root
password=root
```



```  java
package com.qf.empproject.utils;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.pool.DruidPooledConnection;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Objects;
import java.util.Properties;

/**
 * @author zed
 * @date 2022/7/29
 * 操作数据库的工具类
 * 1、从数据源中获取连接
 * 2、提交事务的方法
 * 3、回滚事务的方法
 * 4、关闭资源的方法
 */
public class DbUtils {

    // 声明一个DruidDataSource对象
    private static DruidDataSource ds;
    // 声明一个ThreadLocal对象 本地线程对象
    private static final ThreadLocal<Connection> THREAD_LOCAL = new ThreadLocal<>();

    // 静态代码块 在类加载时只执行一次 我们可以在这里初始化数据源对象
    // 整个项目中只需要一个数据源对象就可以 数据源内部有个连接池对象 我们之后获取连接可以从连接池中获取
    static {
        try {
            // 读取database.properties属性文件获取到输入流对象
            InputStream inputStream = DbUtils.class.getResourceAsStream("/database.properties");
            Properties properties = new Properties();
            // 属性文件中的内容就读取到properties中了
            properties.load(inputStream);
            // 根据properties文件创建数据源
            ds = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 获取连接的方法 getConnection
    public static Connection getConnection() {
        // 从THREAD_LOCAL获取连接对象
        Connection connection = THREAD_LOCAL.get();
        if (Objects.isNull(connection)) {
            try {
                connection = ds.getConnection();
                // 第一次获取到连接对象 connection 就放到THREAD_LOCAL,以后再取的时候里面就有值了
                THREAD_LOCAL.set(connection);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return connection;
    }

    // 开启事务的方法
    public static void begin() {
        try {
            Connection connection = getConnection();
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 提交事务的方法
    public static void commit() {
        Connection connection = getConnection();
        try {
            connection.commit();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            closeAll(connection);
        }
    }

    // 回滚事务的方法
    public static void rollback() {
        Connection connection = getConnection();
        try {
            connection.rollback();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            closeAll(connection);
        }
    }

    // 关闭资源的方法
    private static void closeAll(Connection connection) {
        if (Objects.nonNull(connection)) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

}
```

> 容易忘记的地方：
>
> ```  java
> connection.close();
> // 关闭连接 情况本地线程
> THREAD_LOCAL.remove();
> ```



### 7.3.3 AdminDaoImpl

AdminDao 接口

```  java
package com.qf.empproject.dao;

import com.qf.empproject.entity.Admin;

import java.util.List;

/**
 * @author zed
 * @date 2022/7/29
 * 用户的DAO层接口
 */
public interface AdminDao {
    /**
     * 新增用户
     *
     * @param admin 用户对象
     * @return 影响行数
     */
    int insert(Admin admin);

    /**
     * 更新用户
     *
     * @param admin 用户对象
     * @return 影响行数
     */
    int update(Admin admin);

    /**
     * 删除用户
     *
     * @param username 用户名
     * @return 影响行数
     */
    int delete(String username);

    /**
     * 查询单个用户
     *
     * @param username 用户名
     * @return 用户对象
     */
    Admin selectOne(String username);

    /**
     * 查询所有用户
     *
     * @return 用户列表
     */
    List<Admin> selectAll();
}

```



AdminDaoImpl 接口实现

```  java
package com.qf.empproject.dao.impl;

import com.qf.empproject.dao.AdminDao;
import com.qf.empproject.entity.Admin;
import com.qf.empproject.utils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

/**
 * @author zed
 * @date 2022/7/29
 * 用户接口的实现类
 */
public class AdminDaoImpl implements AdminDao {

    //  apache工具类中的对象，帮助我们操作数据库的
    private QueryRunner runner = new QueryRunner();

    // 增删改需要提交或者回滚事务
    @Override
    public int insert(Admin admin) {
        int insert = 0;
        try {
            // 设置手动提交事务
            DbUtils.begin();
            String sql = "insert into java2209.admin values(?,?,?,?)";
            insert = runner.update(DbUtils.getConnection(), sql,
                    admin.getUsername(), admin.getPassword(), admin.getPhone(), admin.getAddress());
            DbUtils.commit();
        } catch (SQLException e) {
            e.printStackTrace();
            DbUtils.rollback();
        }
        return insert;
    }

    @Override
    public int update(Admin admin) {
        int update = 0;
        try {
            // 设置手动提交事务
            DbUtils.begin();
            String sql = "update java2209.admin set password=?,phone=?,address=? where username=?";
            update = runner.update(DbUtils.getConnection(), sql,
                    admin.getPassword(), admin.getPhone(), admin.getAddress(), admin.getUsername());
            DbUtils.commit();
        } catch (SQLException e) {
            e.printStackTrace();
            DbUtils.rollback();
        }
        return update;
    }

    @Override
    public int delete(String username) {
        int delete = 0;
        try {
            // 设置手动提交事务
            DbUtils.begin();
            String sql = "delete from java2209.admin where username=?";
            delete = runner.update(DbUtils.getConnection(), sql, username);
            DbUtils.commit();
        } catch (SQLException e) {
            e.printStackTrace();
            DbUtils.rollback();
        }
        return delete;
    }

    @Override
    public Admin selectOne(String username) {
        try {
            // 查询SQL语句
            String sql = "select * from java2209.admin where username=?";
            // query方法的几个参数说明
            // 第一个参数 连接对象Connection
            // 第二个参数 SQL语句
            // 第三个参数 查询结果的怎么进行封装 BeanHandler：封装单个对象 Admin.class：对象类型
            // 第四个参数 SQL语句需要传递的参数
            // Admin类中的属性名字 必须和 表中的列名一致
            return runner.query(DbUtils.getConnection(), sql, new BeanHandler<>(Admin.class), username);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Admin> selectAll() {
        try {
            String sql = "select * from java2209.admin";
            // BeanListHandler 查询结果如果是多条数据，需要使用集合进行封装
            return runner.query(DbUtils.getConnection(), sql, new BeanListHandler<>(Admin.class));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}

```



### 7.3.4 AdminServiceImpl

AdminService 接口

```  java
package com.qf.empproject.service;

import com.qf.empproject.entity.Admin;

import java.util.List;

/**
 * @author zed
 * @date 2022/7/29
 * 业务层接口
 */
public interface AdminService {

    /**
     * 用户登录的方法
     * @param username 用户名
     * @param password 密码
     * @return 登录用户
     */
    Admin login(String username, String password);

    /**
     * 查询所有用户
     * @return 用户列表
     */
    List<Admin> selectAll();

}

```



AdminServiceImpl 接口实现

```  java
package com.qf.empproject.service.impl;

import com.qf.empproject.dao.AdminDao;
import com.qf.empproject.dao.impl.AdminDaoImpl;
import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;

import java.util.List;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/7/29
 * 业务层的实现
 */
public class AdminServiceImpl implements AdminService {

    private AdminDao adminDao = new AdminDaoImpl();

    @Override
    public Admin login(String username, String password) {
        // 1、根据用户名到数据库查询用户
        Admin admin = adminDao.selectOne(username);
        // 2、比对传过来的密码和数据库中用户的密码是否一致
        if (Objects.nonNull(admin)) {
            if (Objects.equals(password, admin.getPassword())) {
                // 3、如果密码一致，登录成功返回用户信息，否则登录失败返回null
                return admin;
            }
        }
        return null;
    }

    @Override
    public List<Admin> selectAll() {
        return adminDao.selectAll();
    }
}

```



实现main方法验证下

```  java
package com.qf.empproject.test;

import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;
import com.qf.empproject.service.impl.AdminServiceImpl;

/**
 * @author zed
 * @date 2022/7/29
 */
public class TestAdminService {
    public static void main(String[] args) {
        AdminService adminService = new AdminServiceImpl();
//        List<Admin> list = adminService.selectAll();
//        list.forEach(System.out::println);

        Admin admin = adminService.login("李萌", "123");
        System.out.println(admin);
    }
}
```

> 结果如下：
>
> [Admin{username='四宇', password='123', phone='null', address='null'}, Admin{username='大壮', password='123456', phone='null', address='null'}]



### 7.3.5 HTML页面代码

```  html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
</head>
<body>
<!--1、编写登录页面-->
<form action="login" method="post">
    用户名 <input type="text" name="username"><br/>
    密码 <input type="password" name="password"><br/>
    <input type="submit" value="登录">
</form>
</body>
</html>
```



tomcat启动的时候默认访问的是webapp目录下的 index文件名的jsp或者html文件

>index.jsp   index.html
>
>如果修改了静态文件 webapp目录下的html css js 文件，启动tomcat没有更新，
>
>可以执行update classes and resource
>
>![image-20220411093620450](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220411093620450.png)

如果想修改默认访问的首页，可以修改webapp/WEB-INF目录下的web.xml文件，web项目的配置文件

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <welcome-file-list>
        <!-- 我们可以通过这个标签修改默认访问的首页[欢迎页] -->
        <welcome-file>/welcome.html</welcome-file>
    </welcome-file-list>
</web-app>
```



### 7.3.6 LoginServlet

```  java
package com.qf.empproject.servlet;

import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;
import com.qf.empproject.service.impl.AdminServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/7/28
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    // 注入业务层接口对象
    private AdminService adminService = new AdminServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应格式和编码
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();
        // 处理登录请求
        // 设置请求编码的
        req.setCharacterEncoding("UTF-8");
        // 接收浏览器传递的参数【用户名和密码】
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.printf("获取到的用户名是：%s,密码是%s\n", username, password);

        // 4、判断用户名和密码是否正确
        Admin admin = adminService.login(username, password);

        // 5、告诉用户登录成功或失败!
        if (Objects.nonNull(admin)) {
            // 登录成功，到页面响应成功提示
            writer.write("<h1>恭喜你登录成功，欢迎" + username + "</h1>");
            // 查询一下所有用户 并把用户信息返回到页面展示
            List<Admin> list = adminService.selectAll();

            writer.write("<table border='1'>");
            writer.write("<tr>");
            writer.write("<td>姓名</td>");
            writer.write("<td>地址</td>");
            writer.write("<td>电话</td>");
            writer.write("</tr>");
            for (Admin user : list) {
                writer.write("<tr>");
                writer.write("<td>"+user.getUsername()+"</td>");
                writer.write("<td>"+user.getAddress()+"</td>");
                writer.write("<td>"+user.getPhone()+"</td>");
                writer.write("</tr>");
            }
            writer.write("</table>");
        } else {
            writer.write("<h1 style='color:red'>登录失败，用户名或密码错误</h1>");
        }

    }
}
```

> 新增修改删除 用户

![image-20220408181936417](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220408181936417.png)



## 八、 转发与重定向

转发：服务器内部的行为，自己跳转到另外一个地址  

快递公司顺丰送不到了，托管EMS送货，给用户



重定向：浏览器的行为，服务器告诉浏览器你要重新发送一个请求 

快递公司顺丰送不到了，让用户重新下单，选EMS快速

------

### 8.1 现有问题

> 在之前案例中，调用业务逻辑和显示结果页面都在同一个Servlet里，就会产生设计问题
>
> - 不符合单一职能原则、各司其职的思想
> - 不利于后续的维护
>
> 应该将业务逻辑和显示结果分离开

|                          现阶段问题                          |
| :----------------------------------------------------------: |
| ![image-20200421161151487](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/040.png) |



### 8.1.1 业务、显示分离

|                        业务与显示分离                        |
| :----------------------------------------------------------: |
| ![image-20200421161738926](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/041.png) |



- [问题：业务逻辑和显示结果分离后，如何跳转到显示结果的Servlet？]()
- [业务逻辑得到的数据结果如何传递给显示结果的Servlet？]()



### 8.2 转发

> 转发的作用在服务器端，将请求发送给服务器上的其他资源，以共同完成一次请求的处理。



### 8.2.1 页面跳转

> 在调用业务逻辑的Servlet中，编写以下代码
>
> - request.getRequestDispatcher("/目标URL-pattern").forward(request, response);

|                           forward                            |
| :----------------------------------------------------------: |
| ![image-20200421161418126](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/forward.png) |

- [使用forward跳转时，是在服务器内部跳转，地址栏不发生变化，属于同一次请求]()

| 转发的核心代码                                               |
| ------------------------------------------------------------ |
| ![image-20220801100155206](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208011001488.png) |



### 8.2.2 数据传递

> forward表示一次请求，是在服务器内部跳转，可以共享同一次request作用域中的数据
>
> - request作用域：拥有存储数据的空间，作用范围是一次请求有效(一次请求可以经过多次转发)
>   - 可以将数据存入request后，在一次请求过程中的任何位置进行获取
>   - 可传递任何数据(基本数据类型、对象、数组、集合等)
>
> - 存数据：request.setAttribute(key,value); 
>
>   - 以键值对形式存储在request作用域中。key为String类型，value为Object类型
>
> - 取数据：request.getAttribute(key);
>
>   - 通过String类型的key访问Object类型的value
>
> ![image-20220801100332106](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208011003336.png)



### 8.2.3 转发特点

> - 转发是服务器行为
>
> - 转发是浏览器只做了一次访问请求
>
> - 转发浏览器地址不变
>
> - 转发两次跳转之间传输的信息不会丢失，所以可以通过request进行数据的传递、
>
> - 转发只能将请求转发给同一个Web应用中的组件

代码：

登录servlet

```  java
package com.qf.empproject.servlet;

import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;
import com.qf.empproject.service.impl.AdminServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/7/28
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    // 注入业务层接口对象
    private AdminService adminService = new AdminServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应格式和编码
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();
        // 处理登录请求
        // 设置请求编码的
        req.setCharacterEncoding("UTF-8");
        // 接收浏览器传递的参数【用户名和密码】
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.printf("获取到的用户名是：%s,密码是%s\n", username, password);

        // 4、判断用户名和密码是否正确
        Admin admin = adminService.login(username, password);

        // 5、告诉用户登录成功或失败!
        if (Objects.nonNull(admin)) {
            // 登录成功后，转发到显示用户列表的servlet中
            // 我们可以在请求对象中设置一下数据，转发后，也可以在获取到这里设置的数据
            req.setAttribute("bf","超凡");
            req.getRequestDispatcher("/success").forward(req, resp);
        } else {
            writer.write("<h1 style='color:red'>登录失败，用户名或密码错误</h1>");
        }

    }
}

```

登录成功servlet

```  java
package com.qf.empproject.servlet;

import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;
import com.qf.empproject.service.impl.AdminServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * @author zed
 * @date 2022/8/1
 * 用户登录成功后查看所有用户
 */
@WebServlet("/success")
public class SuccessJsp extends HttpServlet {

    private AdminService adminService = new AdminServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应格式和编码
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();

        // 设置请求编码的
        req.setCharacterEncoding("UTF-8");
        // 接收浏览器传递的参数【用户名和密码】
        String username = req.getParameter("username");

        // 获取request中的属性
        String bf = (String) req.getAttribute("bf");

        // 登录成功，到页面响应成功提示
        writer.write("<h1>恭喜你登录成功，欢迎" + username + "和他的小伙伴" + bf + "</h1>");
        // 查询一下所有用户 并把用户信息返回到页面展示
        List<Admin> list = adminService.selectAll();

        writer.write("<table border='1'>");
        writer.write("<tr>");
        writer.write("<td>姓名</td>");
        writer.write("<td>地址</td>");
        writer.write("<td>电话</td>");
        writer.write("</tr>");
        for (Admin user : list) {
            writer.write("<tr>");
            writer.write("<td>" + user.getUsername() + "</td>");
            writer.write("<td>" + user.getAddress() + "</td>");
            writer.write("<td>" + user.getPhone() + "</td>");
            writer.write("</tr>");
        }
        writer.write("</table>");
    }
}


```

登录失败servlet

```  java
package com.qf.empproject.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author zed
 * @date 2022/7/31
 */
@WebServlet("/fail")
public class FailServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应格式和编码
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter writer = resp.getWriter();
        writer.write("<h1 style='color:red'>登录失败，用户名或密码错误</h1>");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

> 在上面的转发中，除了可以转发到一个API地址，还可以转发到服务器中的资源

| 修改目录，在/WEB-INF目录下创建一个新的文件 fail.html         |
| ------------------------------------------------------------ |
| ![image-20220731081546331](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207310815689.png) |

登录失败后，修改代码如下

``` java
// 登录失败，转发到失败页面
req.getRequestDispatcher("/WEB-INF/fail.html").forward(req,resp);
```



### 8.3 重定向

> 重定向作用在客户端，客户端将请求发送给服务器后，服务器响应给客户端一个新的请求地址，客户端重新发送新请求。
>



### 8.3.1 页面跳转

> 在调用业务逻辑的Servlet中，编写以下代码
>
> - response.sendRedirect("目标URI");

- [URI:统一资源标识符(Uniform Resource Identifier)，用来表示服务器中定位一个资源，资源在web项目中的路径(/project/source)]()



|                           redirect                           |
| :----------------------------------------------------------: |
| ![image-20200512151855703](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/redirect.png) |

- [使用redirect跳转时，是在客户端跳转，地址栏发生变化，属于多次请求]()

代码如下：

``` java
// 登录失败，浏览器重定向到百度
resp.sendRedirect("http://www.baidu.com");
```

``` java
// 登录失败，也可以重定向到自己的服务地址
resp.sendRedirect("http://localhost:8080/fail");
```



### 8.3.2 数据传递

> sendRedirect跳转时，地址栏改变，代表客户端重新发送的请求。属于两次请求
>
> - response没有作用域，两次request请求中的数据无法共享
> - 传递数据：通过URI的拼接进行数据传递("/WebProject/b?username=tom");
> - 获取数据：request.getParameter("username");

``` java
public static void main(String[] args) throws UnsupportedEncodingException {
    // URL编码
    // String name = URLEncoder.encode("赵消", "UTF-8");
    // URL解码
    String name = URLDecoder.decode("%E8%B5%B5%E6%B6%88", "UTF-8");
    System.out.println(name);
}
```



::: details URL中有中文或特殊字符的处理方式

```java
// URL地址中的中文和特殊字符需要进行URL编码
URLEncoder.encode(username,"UTF-8");
// 完整代码如下
resp.sendRedirect("http://localhost:8080/fail?username="+ URLEncoder.encode(username,"UTF-8"));
```

:::



### 8.3.3 重定向特点

> - 重定向是客户端行为。
>
> - 重定向是浏览器做了至少两次的访问请求。
>
> - 重定向浏览器地址改变。
>
> - 重定向两次跳转之间传输的信息会丢失（request范围）。
>
> - 重定向可以指向任何的资源，包括当前应用程序中的其他资源、同一个站点上的其他应用程序中的资源、其他站点的资源。



### 8.4 转发、重定向总结

> 当两个Servlet需要传递数据时，选择forward转发。不建议使用sendRedirect进行传递



## 九、 Servlet生命周期

生命周期：生老病死，任何物质都有从出生到死亡的过程，

一行代码，一个类，一个servlet实例，创建初始化服务销毁。

------

### 9.1 生命周期四个阶段

### 9.1.1 实例化

::: tip
当用户第一次访问Servlet时，由容器调用Servlet的构造器创建具体的Servlet对象。也可以在容器启动之后立刻创建实例。使用如下代码可以设置Servlet是否在服务器启动时就创建。
`<load-on-startup>1</load-on-startup>`

默认servlet是懒加载的，也就是第一次访问的时候会创建实例

:::

### 9.1.2 初始化

> 在初始化阶段，init()方法会被调用。这个方法在javax.servlet.Servlet接口中定义。其中，方法以一个ServletConfig类型的对象作为参数。
>
> + 注意：init方法只被执行一次



### 9.1.3 服务

> 当客户端有一个请求时，容器就会将请求ServletRequest与响应ServletResponse对象转给Servlet，以参数的形式传给service方法。
>
> + 此方法会执行多次



### 9.1.4 销毁

> 当Servlet容器停止或者重新启动都会引起销毁Servlet对象并调用destroy方法。
>
> + destroy方法执行一次



### 9.1.5 Servlet执行流程

|                       Servlet执行流程                        |
| :----------------------------------------------------------: |
| ![Servlet声明周期](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/Servlet%E5%A3%B0%E6%98%8E%E5%91%A8%E6%9C%9F.png) |



```  java
package com.qf.empproject.servlet;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

/**
 * Servlet implementation class LifeServlet
 * 演示Servlet的生命周期：
 * 1、实例化
 * 2、init:初始化
 * 3、service：服务
 * 4、destroy：销毁
 */
@WebServlet("/ls")
public class LifeServlet implements Servlet {

    public LifeServlet() {
        System.out.println("实例化的过程");
    }

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("init初始化");
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("LifeServlet提供服务的方法");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {
        System.out.println("servlet销毁了");
    }
}
```



## 十、Servlet特性

### 10.1 线程安全问题

> Servlet在访问之后，会执行实例化操作，创建一个Servlet对象。而我们Tomcat容器可以同时多个线程并发访问同一个Servlet，如果在方法中对成员变量做修改操作，就会有线程安全的问题。



### 10.2 如何保证线程安全

> - synchronized
>   - 将存在线程安全问题的代码放到同步代码块中
>
> - 实现SingleThreadModel接口
>   - servlet实现SingleThreadModel接口后，每个线程都会创建servlet实例，这样每个客户端请求就不存在共享资源的问题，但是servlet响应客户端请求的效率太低，所以已经淘汰。
>
> - 尽可能使用局部变量

```  java
package com.qf.servlet3;

import javax.servlet.ServletException;
import javax.servlet.SingleThreadModel;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class SafeServlet extends HttpServlet  implements SingleThreadModel {
     //private String message = "";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String message = "";
        //假设1、接收参数
        //2、调用业务逻辑 得到登录结果
        message = "登录成功";//登录失败！
        PrintWriter printWriter = resp.getWriter();
        printWriter.println(message);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}

```

> 怎么避免servlet线程安全问题？
>
> 1、避免使用成员变量【Service层接口】
>
> 2、使用局部变量



## 十一、状态管理

### 11.1 现有问题

> - HTTP协议是无状态的，不能保存每次提交的信息
>
> -  如果用户发来一个新的请求，服务器无法知道它是否与上次的请求有联系。
>
> - 对于那些需要多次提交数据才能完成的Web操作，比如登录来说，就成问题了。



### 11.2 概念

> 将浏览器与web服务器之间多次交互当作一个整体【Session会话】来处理，并且将多次交互所涉及的数据（即状态）保存下来。



### 11.3 状态管理分类

> - 客户端状态管理技术：将状态保存在客户端。代表性的是Cookie技术。
>
> - 服务器状态管理技术：将状态保存在服务器端。代表性的是session技术
>
>   （服务器传递sessionID时需要使用Cookie的方式）



## 十二、Cookie的使用

Cookie: 小甜点 饼干，就是保存key/value的

### 12.1 什么是Cookie

1、**服务端生成cookie** 2、通过响应response 返回给浏览器 3、**浏览器保存下来**

> - Cookie是在浏览器访问Web服务器的某个资源时，由Web服务器在HTTP响应消息头中附带传送给浏览器的一小段数据。
>
>
> - 一旦Web浏览器保存了某个Cookie，那么它在以后每次访问该Web服务器时，都应在HTTP请求头中将这个Cookie回传给Web服务器。
>
>
> - 一个Cookie主要由标识该信息的名称（name）和值（value）组成。
>

|                          Cookie原理                          |
| :----------------------------------------------------------: |
| ![image-20200420113202276](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/cookie%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86.png) |



### 12.2 创建Cookie

```  java
//创建Cookie
Cookie ck=new Cookie("code", code);
//设置Cookie的路径
ck.setPath("/");
ck.setMaxAge(-1);
response.addCookie(ck);//添加到response对象中，响应时发送给客户端
```

> cookie.setMaxAge(0);//不记录cookie
>
> cookie.setMaxAge(-1);//会话级cookie，关闭浏览器失效，默认值
>
> cookie.setMaxAge(60*60);//过期时间为1小时，单位是秒

**备注：**

Chrome浏览器cookie存储的时间是GMT时区的时间，即：北京标准时间-8小时。 查看cookie有效期时默认加8小时就对了。

| 从请求中查看Cookie                                           |
| ------------------------------------------------------------ |
| ![image-20220801115544365](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208011155566.png) |
| 也可以从应用中查看Cookie                                     |
| ![image-20220801115628651](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208011156808.png) |



### 12.3 获取Cookie

```  java
//获取所有的Cookie
Cookie[] cks=request.getCookies();
//遍历Cookie
for(Cookie ck:cks){
    //检索出自己的Cookie
    if(ck.getName().equals("code"))
    {
        //记录Cookie的值
        code=ck.getValue();
        break;
    }
}
```



### 12.4 修改Cookie

> 只需要保证Cookie的名和路径一致即可修改

```  java
//修改Cookie
Cookie ck=new Cookie("code", code);
ck.setPath("/");
ck.setMaxAge(-1);
response.addCookie(ck);//让浏览器添加Cookie
```

+ [注意：如果改变cookie的name和有效路径会新建cookie, 而改变cookie值、有效期会覆盖原有cookie]()



### 12.5 Cookie编码与解码

> Cookie默认不支持中文，只能包含ASCII字符，所以Cookie需要对Unicode字符进行编码，否则会出现乱码。
>
> - 编码可以使用java.net.URLEncoder类的encode(String str,String encoding)方法
>
> - 解码使用java.net.URLDecoder类的decode(String str,String encoding)方法



### 12.5.1 创建带中文Cookie

```  java
 // 使用中文的 Cookie. name 与 value 都使用 UTF-8 编码. 
Cookie cookie = new Cookie(URLEncoder.encode("姓名", "UTF-8"), URLEncoder.encode("超凡", "UTF-8"));
// 发送到客户端   
response.addCookie(cookie);
```



### 12.5.2 读取带中文Cookie

```  java
if(request.getCookies() != null){
    for(Cookie cc : request.getCookies()){
        String cookieName = URLDecoder.decode(cc.getName(), "UTF-8");
        String cookieValue = URLDecoder.decode(cc.getValue(), "UTF-8");
        out.println(cookieName + "=" + cookieValue + "; <br/>");
    }
}
```

Cookie一存一取的过程：

| 种Cookie                                                     | 取Cookie                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220731100958198](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207311009571.png) | ![image-20220731101014129](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207311010770.png) |
| 中文编码                                                     | 中文解码                                                     |
| URLEncoder.encode("吴中洋","utf-8")                          | URLDecoder.decode(cookie.getValue(), "utf-8")                |



### 12.6 Cookie优点和缺点

### 12.6.1 优点

> - 可配置到期规则。
>
> - 简单性：Cookie 是一种基于文本的轻量结构，包含简单的键值对。
>
> - 数据持久性：Cookie默认在过期之前是可以一直存在客户端**浏览器上**的。



### 12.6.2 缺点

> - 大小受到限制：大多数浏览器对 Cookie 的大小有 4K、8K字节的限制。
>
> - 用户配置为禁用：有些用户禁用了浏览器或客户端设备接收 Cookie 的能力，因此限制了这一功能。
>
> - 潜在的安全风险：Cookie 可能会被篡改。会对安全性造成潜在风险或者导致依赖于Cookie 的应用程序失败。

完整代码 设置Cookie

``` java
// 登录成功，返回用户列表的时候 创建一个Cookie返回给客户端
// 如果cookie中有中文 需要对中文进行URL编码
Cookie cookie = new Cookie("name", URLEncoder.encode("狗蛋","UTF-8"));
// 可以设置cookie路径
cookie.setPath("/");
// cookie的有效期
cookie.setMaxAge(60 * 5);
// 通过response响应 把cookie给客户端
resp.addCookie(cookie);
```

获取Cookie

``` java
// 获取所有的cookie
Cookie[] cookies = req.getCookies();
if (Objects.nonNull(cookies)) {
    for (Cookie cookie : cookies) {
        // 获取某一个cookie的值
        if(Objects.equals("name",cookie.getName())){
            String value = cookie.getValue();
            // 对cookie中的中文进行解码
            System.out.println(URLDecoder.decode(value,"UTF-8"));
        }
    }
}
```



## 十三、Session对象【`重点`】

### 13.1 Session概述

保存在服务器端的对象，表示一次会话session

> - Session用于记录用户的状态。Session指的是在一段时间内，单个客户端与Web服务器的一连串相关的交互过程。
> - 在一个Session中，客户可能会多次请求访问同一个资源，也有可能请求访问各种不同的服务器资源。



### 13.2 Session原理

> - 服务器会为每一次会话分配一个Session对象
>
> - 同一个浏览器发起的多次请求，同属于一次会话(Session)
> - 首次使用到Session时，服务器会自动创建Session，并创建Cookie存储SessionId发送回客户端

- [注意：session是由服务端创建的。]()



### 13.3 Session使用

> - Session作用域：拥有存储数据的空间，作用范围是一次会话有效
>   - 一次会话是使用同一浏览器发送的多次请求。一旦浏览器关闭，则结束会话
>   - 可以将数据存入Session中，在一次会话的任意位置进行获取
>   - 可传递任何数据(基本数据类型、对象、集合、数组)



### 13.3.1 获取Session

> session是服务器端自动创建的，通过request对象获取

```  java
//获取Session对象 
HttpSession session=request.getSession();
System.out.println("Id："+session.getId());//唯一标记，
```



### 13.3.2 Session保存数据

```  java
session.setAttribute("key",value);//以键值对形式存储在session作用域中。
```



### 13.3.3 Session获取数据

```  java
session.getAttribute("key");//通过String类型的key访问Object类型的value
```



### 13.3.4 Session移除数据

```  java
session.removeAttribute("key");//通过键移除session作用域中的值
```



### 13.4 Session与Request应用区别

> - request是一次请求有效，请求改变，则request改变
> - session是一次会话有效，浏览器改变，则session改变

| Session的使用                                                |
| ------------------------------------------------------------ |
| ![image-20220801150837797](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208011508099.png) |



### 13.4.1 Session应用

> 需求
> 用户如果没有登录的话 不能查询所有用户列表
> 如果用户登录过了 才可以查看用户列表
> 实现方案：session
>
> 步骤1、登录判断？
> 登录成功了，我们的到**session中保存用户信息**
> 没有登录过或者登录失败了，不保存用户信息
>
> 步骤2、查询所有用户列表
> 判断？
> 登录过的用户[session中有用户信息了说明登录过]
> 允许查询用户列表
> 没有登录过或登录失败的，没有权限查看

```  java
package com.qf.empproject.servlet;

import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;
import com.qf.empproject.service.impl.AdminServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/7/28
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    // 注入业务层接口对象
    private AdminService adminService = new AdminServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理登录请求
        // 设置请求编码的
        req.setCharacterEncoding("UTF-8");
        // 接收浏览器传递的参数【用户名和密码】
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        System.out.printf("获取到的用户名是：%s,密码是%s\n", username, password);

        // 4、判断用户名和密码是否正确
        Admin admin = adminService.login(username, password);

        // 5、告诉用户登录成功或失败!
        if (Objects.nonNull(admin)) {
            req.setAttribute("username",username);
            // 把登录用户信息放入session中,在后续会话中可以随时获取到登录用户
            HttpSession session = req.getSession();
            session.setAttribute("admin",admin);
            req.getRequestDispatcher("/success").forward(req,resp);
        } else {
            // req.getRequestDispatcher("/WEB-INF/fail.html").forward(req,resp);
            // 登录失败，浏览器重定向到百度，也可以重定向到自己的服务地址
            resp.sendRedirect("http://localhost:8080/fail?username="+ URLEncoder.encode(username,"UTF-8"));
        }

    }
}

```



### 13.4.2 SuccessServlet.java

```  java
package com.qf.empproject.servlet;

import com.qf.empproject.entity.Admin;
import com.qf.empproject.service.AdminService;
import com.qf.empproject.service.impl.AdminServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.List;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/7/31
 */
@WebServlet("/success")
public class SuccessServlet extends HttpServlet {

    // 注入业务层接口对象
    private AdminService adminService = new AdminServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 设置响应格式和编码
        resp.setContentType("text/html;charset=UTF-8");
        // 设置Cookie
        Cookie cookie = new Cookie("name", URLEncoder.encode("超凡", "UTF-8"));
        cookie.setMaxAge(60 * 60);
        resp.addCookie(cookie);

        PrintWriter writer = resp.getWriter();

        // 从session获取登录用户
        HttpSession session = req.getSession();
        Admin admin = (Admin) session.getAttribute("admin");
        // 登录用户不为null 说明用户登录过，才有权限查看用户列表
        if (Objects.nonNull(admin)) {

            // 处理页面
            // 登录成功，到页面响应成功提示
            String username = (String) req.getAttribute("username");
            // 查询一下所有用户 并把用户信息返回到页面展示
            List<Admin> list = adminService.selectAll();
            req.setAttribute("list", list);

            writer.write("<h1>恭喜你登录成功，欢迎" + username + "</h1>");

            writer.write("<table border='1'>");
            writer.write("<tr>");
            writer.write("<td>姓名</td>");
            writer.write("<td>地址</td>");
            writer.write("<td>电话</td>");
            writer.write("</tr>");
            for (Admin user : list) {
                writer.write("<tr>");
                writer.write("<td>" + user.getUsername() + "</td>");
                writer.write("<td>" + user.getAddress() + "</td>");
                writer.write("<td>" + user.getPhone() + "</td>");
                writer.write("</tr>");
            }
            writer.write("</table>");
        } else {
            writer.write("<h1>未登录用户，无权查看</h1>");
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}

```

核心代码截图:

| LoginServlet 在session中存用户                               | SuccessServlet从session中取用户                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220731103503691](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207311035983.png) | ![image-20220731103557117](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207311035514.png) |



### 13.5 Session的生命周期

> - 开始：只有客户端没有jsessionid或者服务端没有jsessionid所对应的session对象的时候，则创建Session
>
> - 结束：
>   - 浏览器关闭，则失效
>   - Session超时，则失效
>     - session.setMaxInactiveInterval(seconds);//设置最大有效时间(单位：秒)
>   - 手工销毁，则失效
>     - session.invalidate();//登录退出、注销



### 13.5.1 Session失效

```  java
session.setMaxInactiveInterval(60*60);//设置session最大有效期为一小时
session.invalidate();//手工销毁
```



### 13.4 浏览器禁用Cookie解决方案【了解】

### 13.4.1 浏览器禁用Cookie的后果

> 服务器在默认情况下，会使用Cookie的方式将sessionID发送给浏览器，如果用户禁止Cookie，则sessionID不会被浏览器保存，此时，服务器可以使用如URL重写这样的方式来发送sessionID。



### 13.4.2 URL重写

> 浏览器在访问服务器上的某个地址时，不再使用原来的那个地址，而是使用经过改写的地址（即在原来的地址后面加上了sessionID）。



### 13.4.3 实现URL重写

> response.encodeRedirectURL(String url)生成重写的URL。

```  java
HttpSession session = req.getSession();
String url = "http://localhost:8080/fail?username=" + URLEncoder.encode(username, "UTF-8");
url = resp.encodeRedirectURL(url);
resp.sendRedirect(url);
```

> encodeURL () ：表单提交和超链接的URL重写
>
>  encodeRedirectedURL () ：重定向的URL重写
>
> 如果客户端浏览器禁用cookie，会自动重写url且连接后面有jsessionid
>
> ![image-20220731110017655](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207311100837.png)



### 13.5 Session实战权限验证

|                     Session记录登录状态                      |
| :----------------------------------------------------------: |
| ![image-20200422105652452](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/%E8%AE%B0%E5%BD%95%E7%99%BB%E5%BD%95%E7%8A%B6%E6%80%81.png) |



### 13.5.1 创建管理员表

```  mysql
create table manager(
    id int primary key auto_increment comment '主键ID',
    username varchar(20) not null comment '用户名',
    `password` varchar(20) not null comment '密码'
)charset=UTF8;

insert into manager(username, password) VALUES ('admin','123'),('赵消','123456'),('赵攀','123456');
```



### 13.5.2 登录页面

```  html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
</head>
<body>

<form action="/login" method="post">
    用户 <input type="text" name="username"><br/>
    密码 <input type="password" name="password"><br/>
    <input type="submit" value="登录">
</form>
</body>
</html>
```



### 13.5.3 LoginServlet

```  java
package com.qf.managerproject.servlet;

import com.qf.managerproject.entity.Manager;
import com.qf.managerproject.service.ManagerService;
import com.qf.managerproject.service.impl.ManagerServiceImpl;
import com.qf.managerproject.utils.Constant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Objects;

import static com.qf.managerproject.utils.Constant.VALIDATE_CODE;

/**
 * @author zed
 * @date 2022/8/1
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private ManagerService managerService = new ManagerServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // super.doGet(req, resp) 父类这个方法什么都没有做 只抛出了个405方法不支持的异常
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理登录请求
        // 1、先处理下请求和响应的编码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        // 2、获取参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        Manager manager = managerService.login(username, password);
        if (Objects.nonNull(manager)) {
            // 登录成功,把用户信息放入session中
            HttpSession session = req.getSession();
            session.setAttribute(Constant.LOGIN_USER, manager);
            // 转发到用户列表页，展示用户信息
            req.getRequestDispatcher("/showAll").forward(req, resp);
        } else {
            // 重定向到登录页面
            resp.sendRedirect("/index.html");
        }

    }
}

```



### 13.5.4 ShowAllAdminController

```  java
package com.qf.managerproject.servlet;

import com.qf.managerproject.entity.Manager;
import com.qf.managerproject.service.ManagerService;
import com.qf.managerproject.service.impl.ManagerServiceImpl;
import com.qf.managerproject.utils.Constant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/8/1
 * 展示所有用户信息的servlet
 */
@WebServlet("/showAll")
public class ShowAllAdminController extends HttpServlet {

    private ManagerService managerService = new ManagerServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 如果用户登录过，展示用户信息
        HttpSession session = req.getSession();
        Manager manager = (Manager) session.getAttribute(Constant.LOGIN_USER);
        if (Objects.nonNull(manager)) {
            List<Manager> list = managerService.selectAll();
            resp.setContentType("text/html;charset=UTF-8");
            PrintWriter writer = resp.getWriter();
            writer.write("<h1>用户列表如下</h1>");
            writer.write("<table border='1px'>");
            writer.write("<tr>");
            writer.write("<td>编号</td>");
            writer.write("<td>名字</td>");
            writer.write("<td>密码</td>");
            writer.write("</tr>");
            for (Manager man : list) {
                writer.write("<tr>");
                writer.write("<td>" + man.getId() + "</td>");
                writer.write("<td>" + man.getUsername() + "</td>");
                writer.write("<td>" + man.getPassword() + "</td>");
                writer.write("</tr>");
            }
            writer.write("</table>");
        } else {
            // 重定向到登录页面
            resp.sendRedirect("/index.html");
        }
    }
}

```



字串常量工具类

``` java
public interface Constant {
    String LOGIN_USER = "loginUser";
    String VALIDATE_CODE = "validateCode";
}
```



### 13.6 Session实战保存验证码

### 13.6.1 创建验证码

> - 导入ValidateCode.jar
>
> - 创建生成验证码的Servlet

```  java
package com.qf.managerproject.servlet;

import cn.dsna.util.images.ValidateCode;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.qf.managerproject.utils.Constant.VALIDATE_CODE;

/**
 * @author zed
 * @date 2022/8/1
 * 验证码的servlet
 */
@WebServlet("/code")
public class CreateCode extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // get请求获取验证码
        // 1、实例化验证码对象
        // 第一个参数是：图片宽度
        // 第二个参数是：图片高度
        // 第三个参数是：字符数量
        // 第四个参数是：干扰线数量
        ValidateCode vc = new ValidateCode(200,40,3,20);
        // 2、获取验证码字符
        // 把验证码放入session中，登录的时候可以先比对验证码
        req.getSession().setAttribute(VALIDATE_CODE, vc.getCode());
        // 3、获取验证码图片并返回给客户端
        vc.write(resp.getOutputStream());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```



### 13.6.2 登录页面

```  html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录</title>
</head>
<body>

<form action="/login" method="post">
    用户 <input type="text" name="username"><br/>
    密码 <input type="password" name="password"><br/>
    验证码 <input type="text" name="code"><br/>
    <img src="/code"><br/>
    <input type="submit" value="登录">
</form>
</body>
</html>
```



### 13.6.3 LoginServlet

```  java
package com.qf.managerproject.servlet;

import com.qf.managerproject.entity.Manager;
import com.qf.managerproject.service.ManagerService;
import com.qf.managerproject.service.impl.ManagerServiceImpl;
import com.qf.managerproject.utils.Constant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Objects;

import static com.qf.managerproject.utils.Constant.VALIDATE_CODE;

/**
 * @author zed
 * @date 2022/8/1
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private ManagerService managerService = new ManagerServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // super.doGet(req, resp) 父类这个方法什么都没有做 只抛出了个405方法不支持的异常
        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理登录请求
        // 1、先处理下请求和响应的编码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        // 2、获取参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String code = req.getParameter("code");

        // 优先比对验证码是否正确
        String sessionCode = (String) req.getSession().getAttribute(VALIDATE_CODE);
        if (sessionCode.equalsIgnoreCase(code)) {
            // 验证码通过后 才进行登录查数据库
            Manager manager = managerService.login(username, password);
            if (Objects.nonNull(manager)) {
                // 登录成功,把用户信息放入session中
                HttpSession session = req.getSession();
                session.setAttribute(Constant.LOGIN_USER, manager);
                // 转发到用户列表页，展示用户信息
                req.getRequestDispatcher("/showAll").forward(req, resp);
            } else {
                // 重定向到登录页面
                resp.sendRedirect("/index.html");
            }
        } else {
            // 重定向到登录页面
            resp.sendRedirect("/index.html");
        }

    }
}
```



## 十四、ServletContext对象【`重点`】

### 14.1 ServletContext概述

> - 全局对象，也拥有作用域，对应一个Tomcat中的Web应用
>
> - 当Web服务器启动时，会为每一个Web应用程序创建一块共享的存储区域（ServletContext）。
>
> - ServletContext在Web服务器启动时创建，服务器关闭时销毁。

总结：作用域范围从小到大

> request 请求  ==> session 会话 ==> ServletContext 应用



### 14.2 获取ServletContext对象

> - GenericServlet提供了getServletContext()方法。（推荐） this.getServletContext();
>- HttpServletRequest提供了getServletContext()方法。(推荐)
> - HttpSession提供了getServletContext()方法。
>
> `request.getServletContext() `从请求对象中获取应用上下文比较方便



### 14.3 ServletContext作用

### 14.3.1 获取项目真实路径

> 获取当前项目在服务器发布的真实路径
>
> 也就是项目目录在你的电脑磁盘上的什么位置 [D:\Apps\Tomcat]

```  java
String realpath=servletContext.getRealPath("/");
```

> 上传文件 上传图片时需要用到项目在磁盘上的真实路径



### 14.3.2 获取项目上下文路径

> 获取当前项目上下文路径（应用程序名称）

```  java
System.out.println(servletContext.getContextPath());//上下文路径（应用程序名称）
System.out.println(request.getContextPath());
```

> request.getContextPath() 返回值就是发布的项目名称 



### 14.3.3 全局容器

> ServletContext拥有作用域，可以存储数据到全局容器中
>
> - 存储数据：servletContext.setAttribute("name",value);
> - 获取数据：servletContext.getAttribute("name");
>
> - 移除数据：servletContext.removeAttribute("name");



### 14.4 ServletContext特点

> - 唯一性: 一个应用对应一个ServletContext。
>
> - 生命周期: 只要容器不关闭或者应用不卸载，ServletContext就一直存在。



### 14.5 ServletContext应用场景

> ServletContext统计当前servlet访问次数
>
> ServletContext统计当前项目访问次数【需要配合后面的过滤器】

```  java
package com.qf.managerproject.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/8/2
 */
@WebServlet("/myContext")
public class MyContextServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 演示ServletContext 应用上下文对象 表示的是整个web应用
        // 1、获取ServletContext对象
        ServletContext servletContext = req.getServletContext();
        // 2、获取项目的真实路径
        String realPath = servletContext.getRealPath("/");
        System.out.println(realPath);
        // 3、获取项目发布名称
        String contextPath = servletContext.getContextPath();
        System.out.println(contextPath);

        // 4、获取当前servlet的访问次数,如果是第一次访问count是0
        Integer count = (Integer) servletContext.getAttribute("count");
        if(Objects.isNull(count)){
            count = 1;
            servletContext.setAttribute("count", count);
        }else {
            servletContext.setAttribute("count", ++count);
        }
        // 访问过，访问次数加1
        System.out.println("myServlet的访问次数是:" + count);

    }
}
```



### 14.6 作用域总结

> - HttpServletRequest：一次请求，请求响应之前有效
> - HttpSession：一次会话开始，浏览器不关闭或不超时之前有效
> - ServletContext：服务器启动开始，服务器停止之前有效



## 十五、过滤器【`重点`】

### 15.1 现有问题

> 在以往的Servlet中，有没有冗余的代码，多个Servlet都要进行编写。



### 15.2 概念

> 过滤器（Filter）是处于客户端与服务器目标资源之间的一道过滤技术。

|                            过滤器                            |
| :----------------------------------------------------------: |
| ![image-20200423124307700](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/Filter0.png) |



### 15.3 过滤器作用

> - 执行地位在Servlet之前，客户端发送请求时，会先经过Filter，再到达目标Servlet中；响应时，会根据执行流程再次反向执行Filter
>
> - 可以解决多个Servlet共性代码的冗余问题（例如：乱码处理、登录验证）



### 15.4 编写过滤器

> Servlet API中提供了一个Filter接口，开发人员编写一个Java类实现了这个接口即可，这个Java类称之为过滤器（Filter）



### 15.4.1 实现过程

> - 编写Java类实现Filter接口
>
> - 在doFilter方法中编写拦截逻辑
>
> - 设置拦截路径

```  java
package com.qf.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter("/myfilter1")//过滤路径,也就是要拦截哪些路径
public class MyFilter1 implements Filter {


    //执行过滤
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("过滤前........doFilter ");
        //放行
        chain.doFilter(request, response);

        System.out.println("过滤后.......doFilter");

    }


}
```





### 15.5 过滤器配置

### 15.5.1 注解配置

> 在自定义的Filter类上使用注解@WebFilter(value=“/过滤目标资源”)

### 15.5.2 xml配置

``` Xml
<!--过滤器的xml配置  -->
  <filter>
  <!--名称-->
    <filter-name>sf</filter-name>
    <!--过滤器类全称-->
    <filter-class>com.qf.web.filter.SecondFilter</filter-class>
  </filter>
 <!--映射路径配置-->
  <filter-mapping>
     <!--名称-->
    <filter-name>sf</filter-name>
     <!--过滤的url匹配规则和Servlet类似-->
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```



### 15.5.3 过滤器路径

```  shell
过滤器的过滤路径通常有三种形式:
精确过滤匹配 ，比如/index.jsp   /myservlet1
后缀过滤匹配，比如*.jsp、*.html、*.jpg
通配符过滤匹配/*，表示拦截所有。注意过滤器不能使用/匹配。
	/aaa/bbb/* 允许 
```



### 15.6 过滤器链和优先级

### 15.6.1 过滤器链

> 客户端对服务器请求之后，服务器调用Servlet之前会执行一组过滤器（多个过滤器），那么这组过滤器就称为一条过滤器链。
>
> 每个过滤器实现某个特定的功能，当第一个Filter的doFilter方法被调用时，Web服务器会创建一个代表Filter链的FilterChain对象传递给该方法。在doFilter方法中，开发人员如果调用了FilterChain对象的doFilter方法，则Web服务器会检查FilterChain对象中是否还有filter，如果有，则调用第2个filter，如果没有，则调用目标资源。

|                           过滤器链                           |
| :----------------------------------------------------------: |
| ![image-20200422212814562](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/Filter.png) |



### 15.6.2 过滤器优先级

> 在一个Web应用中，可以开发编写多个Filter，这些Filter组合起来称之为一个Filter链。
> 优先级：	
>
> - 如果为注解的话，是按照类全名称的字符串顺序决定作用顺序
>
> - 如果web.xml，按照 filter-mapping注册顺序，从上往下
>
> - web.xml配置高于注解方式
>
> - 如果注解和web.xml同时配置，会创建多个过滤器对象，造成过滤多次。



### 15.7 过滤器典型应用

### 15.7.1 过滤器解决编码

```  java
package com.qf.managerproject.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * @author zed
 * @date 2022/8/2
 * 字符编码过滤器
 * @WebFilter("/*") 指定过滤器要拦截的路径
 */
@WebFilter("/*")
public class CharsetFilter implements Filter {

    /**
     * 进行拦截过滤的方法
     *
     * @param servletRequest  请求对象
     * @param servletResponse 响应对象
     * @param filterChain     过滤器链
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("CharsetFilter 开始执行了...");

        // 统一设置请求和响应的字符编码
        servletRequest.setCharacterEncoding("UTF-8");
        servletResponse.setContentType("text/html;charset=UTF-8");
        // 过滤器放行,让后续的过滤器和目标资源继续执行
        filterChain.doFilter(servletRequest, servletResponse);

        System.out.println("CharsetFilter 执行结束了...");
    }

}
```



### 15.7.2 权限验证

> ShowAllAdminController
>

``` java
package com.qf.managerproject.servlet;

import com.qf.managerproject.entity.Manager;
import com.qf.managerproject.service.ManagerService;
import com.qf.managerproject.service.impl.ManagerServiceImpl;
import com.qf.managerproject.utils.Constant;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/8/1
 * 展示所有用户信息的servlet
 */
@WebServlet("/showAll")
public class ShowAllAdminController extends HttpServlet {

    private ManagerService managerService = new ManagerServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Manager> list = managerService.selectAll();
        PrintWriter writer = resp.getWriter();
        writer.write("<h1>用户列表如下</h1>");
        writer.write("<table border='1px'>");
        writer.write("<tr>");
        writer.write("<td>编号</td>");
        writer.write("<td>名字</td>");
        writer.write("<td>密码</td>");
        writer.write("</tr>");
        for (Manager man : list) {
            writer.write("<tr>");
            writer.write("<td>" + man.getId() + "</td>");
            writer.write("<td>" + man.getUsername() + "</td>");
            writer.write("<td>" + man.getPassword() + "</td>");
            writer.write("</tr>");
        }
        writer.write("</table>");

    }
}

```



> CheckFilter

``` Java
package com.qf.managerproject.filter;

import com.qf.managerproject.entity.Manager;
import com.qf.managerproject.utils.Constant;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/8/2
 * 权限验证的过滤器
 * @WebFilter 这个注解指定过滤器要过滤哪些请求地址
 */
@WebFilter("/showAll")
public class CheckFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 注意：这里需要对request强转为HttpServletRequest类型
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        // 校验用户权限
        // 从session中获取到登录人
        HttpSession session = req.getSession();
        Manager manager = (Manager) session.getAttribute(Constant.LOGIN_USER);

        // 判断权限的
        if (Objects.nonNull(manager)) {
            // 登录过,放行
            chain.doFilter(request, response);
        } else {
            // 不放行，返回登录页面
            resp.sendRedirect("/index.html");
        }
    }
}
```


## 十六、综合案例（EmpProject）

### 16.1 数据库环境搭建

> 该案例是EmpProject员工管理系统。使用了两张表
>
> - EMP 员工信息表
> - EmpManager 管理员表



### 16.1.1 创建数据库

```  mysql
CREATE DATABASE EMP;
```



### 16.1.2 创建数据表

```  MYSQL
CREATE TABLE EMP(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(20) NOT NULL,
    SALARY DOUBLE NOT NULL,
    AGE INT NOT NULL
)CHARSET=UTF8;

CREATE TABLE EmpManager(
    USERNAME VARCHAR(20) NOT NULL,
    PASSWORD VARCHAR(20) NOT NULL
)CHARSET=UTF8;
```



### 16.2 创建Web项目

> 创建Web项目，导入相关jar包
>
> - commons-dbutils-1.7.jar
>
> - druid-1.1.5.jar
>
> - mysql-connector-java-5.1.25-bin.jar
>
> - ValidateCode.jar



### 16.3 基础环境搭建

> 项目下创建包目录结构
>
> - com.qf.emp.controller   调用业务逻辑Servlet
> - com.qf.emp.dao      数据访问层
> - com.qf.emp.dao.impl     数据访问层实现类
> - com.qf.emp.entity   实体类
> - com.qf.emp.filter     过滤器
> - com.qf.emp.jsp        打印显示页面Servlet
> - com.qf.emp.service  业务逻辑层
> - com.qf.emp.service.impl      业务逻辑层实现类
> - com.qf.emp.utils      工具类
> - database.properties  数据库连接及连接池配置文件



### 16.4 管理员登录功能

> 仅展示Controller代码

```  java
package com.qf.emp.controller;

import com.qf.emp.entity.EmpManager;
import com.qf.emp.service.EmpManagerService;
import com.qf.emp.service.impl.EmpManagerServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "EmpManagerLoginController",value = "/manager/EmpManagerLoginController")
public class EmpManagerLoginController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.收参
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String inputVcode = request.getParameter("inputVcode");

        //2.校验验证码
        String codes = (String)request.getSession().getAttribute("codes");
        if(!inputVcode.isEmpty() && inputVcode.equalsIgnoreCase(codes)){
            //调用业务逻辑实现登录
            EmpManagerService empManagerService = new EmpManagerServiceImpl();
            EmpManager empManager = empManagerService.login(username,password);
            if(empManager!=null){
                //登录成功
                //存储在session作用域
                HttpSession session = request.getSession();
                session.setAttribute("empManager",empManager);
                //跳转到查询所有的controller
                response.sendRedirect(request.getContextPath()+"/manager/safe/showAllEmpController");
            }else{
                response.sendRedirect(request.getContextPath()+"/login.html");
            }
        }else{
            //验证码输入错误，跳转到登录页面
            response.sendRedirect(request.getContextPath()+"/login.html");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}

```



### 16.5 查询所有员工功能

### 16.5.1 调用业务逻辑Controller

```  java
package com.qf.emp.controller;

import com.qf.emp.entity.Emp;
import com.qf.emp.service.EmpService;
import com.qf.emp.service.impl.EmpServiceImpl;
import sun.security.util.AuthResources_it;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ShowAllEmpController",value = "/manager/safe/showAllEmpController")
public class ShowAllEmpController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//权限验证存放在过滤器实现
        EmpService empService = new EmpServiceImpl();
        List<Emp> emps = empService.showAllEmp();
        request.setAttribute("emps",emps);

 request.getRequestDispatcher("/manager/showAllEmpJSP").forward(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

```



### 16.5.2 显示页面JSP

```  java
package com.qf.emp.jsp;

import com.qf.emp.entity.Emp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(value = "/manager/showAllEmpJSP")
public class ShowAllEmpJSP extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取集合数据
        List<Emp> emps = (List<Emp>)request.getAttribute("emps");

        PrintWriter printWriter = response.getWriter();

        printWriter.println("<html>");
        printWriter.println("   <head>");
        printWriter.println("       <meta charset='UTF-8'>");
        printWriter.println("       <title>查询所有员工页面</title>");
        printWriter.println("   </head>");
        printWriter.println("   <body>");
        printWriter.println("       <table border='1'>");
        printWriter.println("           <tr>");
        printWriter.println("               <td>编号</td>");
        printWriter.println("               <td>姓名</td>");
        printWriter.println("               <td>工资</td>");
        printWriter.println("               <td>年龄</td>");
        printWriter.println("               <td colspan='2'>操作</td>");
        printWriter.println("           </tr>");
        for(Emp emp: emps){
            printWriter.println("           <tr>");
            printWriter.println("               <td>"+emp.getId()+"</td>");
            printWriter.println("               <td>"+emp.getName()+"</td>");
            printWriter.println("               <td>"+emp.getSalary()+"</td>");
            printWriter.println("               <td>"+emp.getAge()+"</td>");
            printWriter.println("               <td><a href='"+request.getContextPath()+"/manager/safe/removeEmpController?id="+emp.getId()+"'>删除<a></td>");
            printWriter.println("               <td><a href='"+request.getContextPath()+"/manager/safe/showEmpController?id="+emp.getId()+"'>修改</a></td>");
            printWriter.println("           </tr>");
        }
        printWriter.println("       </table>");
        printWriter.println("   </body>");
        printWriter.println("</html>");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

```



### 16.5.3 权限验证过滤器

```  java
package com.qf.emp.filter;

import com.qf.emp.entity.EmpManager;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
@WebFilter(value = "/manager/safe/*")
public class CheckFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;

        HttpSession session = request.getSession();
        EmpManager empManager = (EmpManager)session.getAttribute("empManager");
        if(empManager!=null){//登录过
            filterChain.doFilter(request,response);
        }else{
            response.sendRedirect(request.getContextPath()+"/login.html");
        }
    }

    @Override
    public void destroy() {

    }
}

```



### 16.5.4 字符编码过滤器

```  java
package com.qf.emp.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;
@WebFilter(value = "/manager/*")
public class EncodingFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        servletRequest.setCharacterEncoding("UTF-8");
        servletResponse.setContentType("text/html;charset=UTF-8");
        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    public void destroy() {

    }
}

```



### 16.6 删除员工功能

### 16.6.1 删除员工Controller

```  java
package com.qf.emp.controller;

import com.qf.emp.service.EmpService;
import com.qf.emp.service.impl.EmpServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/manager/removeEmpController")
public class RemoveEmpController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Integer id = Integer.valueOf(request.getParameter("id"));

        EmpService empService = new EmpServiceImpl();

        empService.removeEmp(id);

        response.sendRedirect(request.getContextPath()+"/manager/showAllEmpController");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

```



### 16.7 修改员工功能

### 16.7.1 查询单个员工Controller

```  java
package com.qf.emp.controller;

import com.qf.emp.entity.Emp;
import com.qf.emp.service.EmpService;
import com.qf.emp.service.impl.EmpServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/manager/showEmpController")
public class ShowEmpController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Integer id = Integer.valueOf(request.getParameter("id"));

        EmpService empService = new EmpServiceImpl();
        Emp emp = empService.showEmp(id);
        request.setAttribute("emp",emp);
        request.getRequestDispatcher("/manager/showUpdateEmpInfoJSP").forward(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

```



### 16.7.2 显示修改页面JSP

```  java
package com.qf.emp.jsp;

import com.qf.emp.entity.Emp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(value = "/manager/showUpdateEmpInfoJSP")
public class ShowUpdateEmpInfoController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Emp emp = (Emp)request.getAttribute("emp");

        PrintWriter printWriter = response.getWriter();

        printWriter.println("<html>");
        printWriter.println("   <head>");
        printWriter.println("       <meta charset='UTF-8'>");
        printWriter.println("       <title>修改员工信息页面</title>");
        printWriter.println("   </head>");
        printWriter.println("   <body>");
        printWriter.println("       <form action='/manager/updateEmpController' method='post'>");
        printWriter.println("       编号：<input type='text' name='id' value='"+emp.getId()+"' readonly/><br/>");
        printWriter.println("       姓名：<input type='text' name='name' value='"+emp.getName()+"'/><br/>");
        printWriter.println("       工资：<input type='text' name='salary' value='"+emp.getSalary()+"'/><br/>");
        printWriter.println("       年龄：<input type='text' name='age' value='"+emp.getAge()+"'/><br/>");
        printWriter.println("       <input type='submit'  value='修改'/><br/>");
        printWriter.println("       </form>");
        printWriter.println("   </body>");
        printWriter.println("</html>");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

```



### 16.7.3 修改员工信息Controller

```  java
package com.qf.emp.controller;

import com.qf.emp.entity.Emp;
import com.qf.emp.service.EmpService;
import com.qf.emp.service.impl.EmpServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/manager/updateEmpController")
public class UpdateEmpController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.收参
        Integer id = Integer.valueOf(request.getParameter("id"));
        String name = request.getParameter("name");
        Double salary = Double.valueOf(request.getParameter("salary"));
        Integer age = Integer.valueOf(request.getParameter("age"));

        Emp emp = new Emp(id,name,salary,age);
        EmpService empService = new EmpServiceImpl();
        empService.modify(emp);

        response.sendRedirect(request.getContextPath()+"/manager/showAllEmpController");

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}

```


::: details 课堂案例

[仓库地址](http://124.223.190.53/2209/managerproject)

:::
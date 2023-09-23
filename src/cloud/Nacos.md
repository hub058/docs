---
title: Nacos
---

## 一：微服务架构

### 1.0：单体架构

> 将项目所有模块（功能）打成jar或者war，然后部署一个进程

![v2-1b379f20419869e262997606ea5fd4ed_720w](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240544.png)

```  txt
优点：
1：部署简单: 由于是完整的结构体，可以直接部署在一个服务器上即可。
2：技术单一: 项目不需要复杂的技术栈，往往一套熟悉的技术栈就可以完成开发。
3：用人成本低: 单个程序员可以完成业务接口到数据库的整个流程。

缺点：
1：系统启动慢， 一个进程包含了所有的业务逻辑，涉及到的启动模块过多，导致系统的启动、重启时间周期过长;
2：系统错误隔离性差、可用性差，任何一个模块的错误均可能造成整个系统的宕机;
3：可伸缩性差：系统的扩容只能只对这个应用进行扩容，无法结合业务模块的特点进行伸缩。
4：线上问题修复周期长：任何一个线上问题修复需要对整个应用系统进行全面升级。
5. 跨语言程度差
6. 不利于安全管理，所有开发人员都拥有全量代码
```

### 1.1：微服务架构

微服务架构论文：<https://martinfowler.com/articles/microservices.html>

译文：<https://mp.weixin.qq.com/s?__biz=MjM5MjEwNTEzOQ==&mid=401500724&idx=1&sn=4e42fa2ffcd5732ae044fe6a387a1cc3#rd>

```  txt
In short, the microservice architectural style [1] is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms（ 美 ['mekə,nɪzəm]  机制）, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.

简而言之，微服务架构风格[1]这种开发方法，是以开发一组小型服务的方式来开发一个独立的应用系统的。其中每个小型服务都运行在自己的进程中，并经常采用HTTP资源API这样轻量的机制来相互通信。这些服务围绕业务功能进行构建，并能通过全自动的部署机制来进行独立部署。这些微服务可以使用不同的语言来编写，并且可以使用不同的数据存储技术。对这些微服务我们仅做最低限度的集中管理。
```

**解读微服务特点:**

1:微服务是一种项目架构思想(风格)

2:微服务架构是一系列小服务的组合（组件化与多服务）

3:任何一个微服务，都是一个独立的进程（独立开发、独立维护、独立部署）

4:轻量级通信http协议(跨语言,跨平台)

5:服务粒度(围绕业务功能拆分)

6:去中心化管理(去中心化”地治理技术、去中心化地管理数据)

### 1.2：微服务架构的优势

**1.易于开发和维护**
 一个微服务只关注一个特定的业务功能，所以它的业务清晰、代码量较少。开发和维护单个微服务相对比较简单，整个应用是由若干个微服务构建而成，所以整个应用也会维持在可控状态；

**2.单个微服务启动较快**
 单个微服务代码量较少，所以启动会比较快；

**3.局部修改容易部署**
 单体应用只要有修改，就要重新部署整个应用，微服务解决了这样的问题。一般来说，对某个微服务进行修改，只需要重新部署这个服务即可；

**4.技术栈不受限**
 在微服务中，我们可以结合项目业务及团队的特点，合理地选择技术栈

**5.按需伸缩**

### 1.3：微服务架构的缺点(挑战)

1、服务太多，导致服务间的依赖错综复杂，运维难度大

2、微服务放大了分布式架构的系列问题

- 分布式事务（seata）
- 分布式锁怎么处理（redisson）
- 服务注册与发现（nacos）
- 依赖服务不稳定（sentinel）导致服务雪崩怎么办？

3、运维复杂度陡增，部署数量多、监控进程多导致整体运维复杂度提升。

### 1.4：SpringCloud与微服务关系

- Springcloud为微服务思想提供了完美的解决方案
- Springcloud是一些列框架的集合体（服务的注册与发现【注册中心】、服务间远程调用、服务降级、服务熔断、服务限流、分布式事务 等）

> 一般我们说springcloud 其实指的是Springcloud-netflix，Springcloud并不是造轮子，只是把Netflix公司的组件做二次开发

### 1.5：SpringBoot和SpringCloud关系

- SpringBoot专注于快速方便的开发单个个体微服务。

- SpringCloud是关注全局的微服务协调、整理、治理的框架，它将SpringBoot开发的单体整合并管理起来。
- SpringBoot可以离开SpringCloud独立使用开发项目，但是SpringCloud离不开SpringBoot，属于依赖关系。

## 二：服务注册与发现

### 2.1：服务注册与发现

> **服务注册**，就是将提供某个服务的模块信息(通常是这个服务的ip和端口)注册到1个公共的组件上去（比如: zookeeper\consul\eureka\nacos）。
>
> **服务发现**，就是新注册的这个服务模块能够及时的被其他调用者发现。不管是服务新增和服务删减都能实现自动发现。

### 2.2：注册中心对比

**nacos**：是阿里开源的，经过了阿里实践的

**eureka**：netflix公司的，现在不维护了，不开源了

**Consul** : HashiCorp 公司推出的开源产品，用于实现分布式系统的服务发现、服务隔离、服务配置

| 对比组件        | Nacos                | Eureka      | Consul        | Zookeeper  |
| --------------- | -------------------- | ----------- | ------------- | ---------- |
| 一致性对比      | 支持AP和CP模型       | AP模型      | CP模型        | CP模型     |
| 健康检查        | tcp/http/client Beat | client Beat | TCP/HTTP/gRPC | keep Alive |
| 负载均衡策略    | Ribbon               | Ribbon      | Fabio         | -          |
| 雪崩保护        | 有                   | 有          | 无            | 无         |
| 自动注销实例    | 支持                 | 支持        | 不支持        | 支持       |
| 访问协议        | HTTP                 | HTTP        | HTTP          | TCP        |
| 监听支持        | 支持                 | 支持        | 支持          | 支持       |
| 多数据中心      | 支持                 | 支持        | 支持          | 不支持     |
| 跨注册中心同步  | 支持                 | 不支持      | 支持          | 不支持     |
| Springcloud集成 | 支持                 | 支持        | 支持          | 不支持     |
| Dubbo集成       | 支持                 | 不支持      | 不支持        | 支持       |
| K8s集成         | 支持                 | 不支持      | 支持          | 不支持     |

::: details 什么是CAP理论

分布式系统（distributed system）正变得越来越重要，大型网站几乎都是分布式的。

分布式系统的最大难点，就是各个节点的状态如何保持一致。CAP理论是在设计分布式系统的过程中，处理数据一致性问题时必须考虑的理论。

CAP即：

- Consistency（一致性）
- Availability（可用性）
- Partition tolerance（分区容忍性）

这三个性质对应了分布式系统的三个指标：
而CAP理论说的就是：一个分布式系统，不可能同时做到这三点。如下图：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082255794.jpeg)

①一致性：对于客户端的每次读操作，要么读到的是最新的数据，要么读取失败。换句话说，一致性是站在分布式系统的角度，对访问本系统的客户端的一种承诺：要么我给您返回一个错误，要么我给你返回绝对一致的最新数据，不难看出，其强调的是数据正确。

②可用性：任何客户端的请求都能得到响应数据，不会出现响应错误。换句话说，可用性是站在分布式系统的角度，对访问本系统的客户的另一种承诺：我一定会给您返回数据，不会给你返回错误，但不保证数据最新，强调的是不出错。

③分区容忍性：由于分布式系统通过网络进行通信，网络是不可靠的。当任意数量的消息丢失或延迟到达时，系统仍会继续提供服务，不会挂掉。换句话说，分区容忍性是站在分布式系统的角度，对访问本系统的客户端的再一种承诺：我会一直运行，不管我的内部出现何种数据同步问题，强调的是不挂掉。

总结：我会一直提供正确的数据【我会一直运行不挂掉，会返回数据不会返回错误，返回的数据是正确的】，做不到！

:::

## 三：nacos简介与安装

官网：<https://nacos.io/zh-cn/docs/what-is-nacos.html>

### 3.1：nacos功能与架构

**nacos架构：**

> 多数据中心Nacos集群：
>
> Nacos Server: Nacos服务端，后台运行
>
> Nacos Console: Nacos命令行终端，启动停止Nacos服务等
>
> Provider APP: 服务提供者
>
> Consumer APP: 服务消费者

![1561217892717-1418fb9b-7faa-4324-87b9-f1740329f564](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240549.jpeg)

**nacos功能：**

- 名字服务 (Naming Service)

 ```  txt
 命名服务是指通过指定的名字来获取资源或者服务的地址，提供者的信息
 ```

- 配置服务 (Configuration Service)

 ```  txt
 动态配置服务让您能够以中心化、外部化和动态化的方式管理所有环境的配置。动态配置消除了配置变更时重新部署应用和服务的需要。配置中心化管理让实现无状态服务更简单，也让按需弹性扩展服务更容易。
 ```

> 名词解释：*无状态服务*:在任何时候服务都不存储数据(除缓存),可以任意销毁创建,用户数据不会发生丢失,可以任意切换到任何一个副本

### 3.2：nacos安装

下载地址:<https://github.com/alibaba/nacos/tags>

加速下载地址：<https://ghproxy.com/https://github.com//alibaba/nacos/releases/download/2.0.3/nacos-server-2.0.3.zip>  **选用2.0.3版本**

1：解压安装

2：配置

![image-20210816151513489](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240547.png)

3：创建数据库nacos以及导入表（conf>nacos-mysql.sql）

4：配置startup.cmd，以standalone方式启动

![image-20210816150721928](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240550.png)

5：启动

> Nacos启动出现问题
>
> 1、nacos不能安装在中文目录
> 2、nacos要求必须有JAVA_HOME环境变量
> 3、nacos不兼容某些JDK版本

### 3.2：nacos注册中心工作流程

![image-20201025201055054](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240559.png)

## 四：微服务入门案例

### 4.1：boot与cloud版本

```  txt
springboot:提供了快速开发微服务的能力
springcloud:提供了微服务治理的能力（服务注册与发现、服务降级、限流、熔断、网关、负载均衡、配置中心...），为微服务开发提供了全家桶服务
```

springboot的版本查看地址：<https://spring.io/projects/spring-boot#learn>

springcloud的版本查看地址：<https://spring.io/projects/spring-cloud#overview>

详细版本对应信息查看：<https://start.spring.io/actuator/info>

![image-20201017145706708](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240557.png)

```  txt
注意：
如果采用springboot和springcloud（springcloud netflix）那么使用以上版本对应就ok了，
但是如果要使用alibaba的组件（nacos、sentinel、RocketMQ、Seata）必须使用springcloud alibaba
```

### 4.2：SpringCloud-alibaba

Springcloud与springcloud-alibaba关系

```  txt
◆ 我们通常说的SpringCloud，泛指Spring Cloud Netflix，也是springcloud第一代
◆ SpringCloud Alibaba是SpringCloud的子项目，是阿里巴巴结合自身微服务实践，
◆ SpringCloud Alibaba符合SpringCloud标准，依赖于springcloud
```

![image-20201017153801040](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082243127.png)

### 4.3：确定版本

确定方式：通过查看springcloud alibaba 官网确定

<https://github.com/alibaba/spring-cloud-alibaba/wiki/>版本说明

| Spring Cloud Version        | Spring Cloud Alibaba Version      | Spring Boot Version |
| --------------------------- | --------------------------------- | ------------------- |
| Spring Cloud Hoxton.SR12    | 2.2.7.RELEASE                     | 2.3.12.RELEASE      |
| Spring Cloud Hoxton.SR8     | 2.2.4.RELEASE                     | 2.3.2.RELEASE       |
| Spring Cloud Greenwich.SR6  | 2.1.3.RELEASE                     | 2.1.13.RELEASE      |
| Spring Cloud Hoxton.SR3     | 2.2.1.RELEASE                     | 2.2.5.RELEASE       |
| Spring Cloud Hoxton.RELEASE | 2.2.0.RELEASE                     | 2.2.X.RELEASE       |
| Spring Cloud Greenwich      | 2.1.2.RELEASE                     | 2.1.X.RELEASE       |
| Spring Cloud Finchley       | 2.0.3.RELEASE                     | 2.0.X.RELEASE       |
| Spring Cloud Edgware        | 1.5.1.RELEASE(停止维护，建议升级) | 1.5.X.RELEASE       |

| Spring Cloud Alibaba Version | Sentinel | Nacos | RocketMQ | Dubbo  | Seata |
| ---------------------------- | -------- | ----- | -------- | ------ | ----- |
| 2.2.7.RELEASE                | 1.8.1    | 2.0.3 | 4.6.1    | 2.7.13 | 1.3.0 |

**最终决定（版本号记忆）：**

springcloud-alibaba:     2.2.7.RELEASE

springcloud:                   Hoxton.SR12

springboot:                     2.3.12.RELEASE

Nacos:         2.0.3

### 4.4：创建父工程

> 工程名字： cloud-parent

在父工程锁定springboot、springcloud、springcloud-alibaba版本

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.12.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
    <groupId>com.qf</groupId>
    <artifactId>cloud-parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>cloud-parent</name>
    <description>cloud-parent</description>
    <!-- 打包方式为pom -->
    <packaging>pom</packaging>
    
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.2.7.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Hoxton.SR12</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

        </dependencies>
    </dependencyManagement>

</project>
```

### 4.5：DOMAIN对象层

> 工程名字： cloud-entity
>
> 此工程中只有实体类，工具类等，不需要单独启动，故而无需编写启动类和配置文件！

#### 4.5.1：pom.xml

```  xml
<groupId>com.qf</groupId>
<artifactId>cloud-entity</artifactId>

<properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
</properties>

<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

#### 4.5.2：实体类

```  java
package com.qf.cloud.goods.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author zed
 * @date 2022/6/9 0:03
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goods {
    private String name;
    private Integer price;
}
```

### 4.6：服务提供者

> 工程名字： cloud-goods

#### 4.6.1：pom.xml

``` xml
<dependencies>
    <!--    web的场景依赖    -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--     端点监控的场景依赖   -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <!--     nacos场景依赖   -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    
    <!--     实体对象   -->
    <dependency>
         <groupId>com.qf</groupId>
         <artifactId>cloud-entity</artifactId>
         <version>1.0-SNAPSHOT</version>
    </dependency>

</dependencies>
```

> cloud-goods 模块依赖 cloud-entity 模块，
>
> 他们都属于 cloud-parent的子模块

#### 4.6.2：application.yml

``` properties
spring:
  application:
    name: cloud-goods #服务名称，必须，保证唯一
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #指定nacos-server的地址
        username: nacos
        password: nacos
server:
  port: ${port:9001}
```

#### 4.6.3：启动类加注解

``` java
package com.qf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient  //开关，开启服务的注册与发现功能
public class GoodsApp {

    public static void main(String[] args) {
        SpringApplication.run(GoodsApp.class, args);
    }
}
```

#### 4.6.4：查询商品接口

``` java
@RestController
@RequestMapping("goods")
public class GoodsController {

    @RequestMapping("findById/{id}")
    public Goods findById(@PathVariable String id){

        System.out.println("id"+id);
        return  new Goods("小米", 99);
    }

}
```

### 4.7：服务消费者

> 工程名称：cloud-orders 订单模块，属于服务消费者，他要调用商品服务[服务提供者]
>
> 同时也依赖 cloud-entity 模块

#### 4.7.1：pom.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud-parent</artifactId>
        <groupId>com.qf</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-orders</artifactId>

    <dependencies>
        <!--  web的场景依赖      -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- 健康检查的场景依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!-- nacos服务注册与发现的场景依赖-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>com.qf</groupId>
            <artifactId>cloud-entity</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

</project>
```

#### 4.7.2：application.yml

``` properties
spring:
  application:
    name: cloud-orders  #服务的应用名称
  cloud:
    nacos:
      discovery: #nacos配置
        server-addr: localhost:8848
        username: nacos
        password: nacos

server:
  port: ${port:8081}

```

#### 4.7.3：启动类加注解

``` java
package com.qf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class OrdersApp {

    public static void main(String[] args) {
        SpringApplication.run(OrdersApp.class, args);
    }

    @Bean
    //让ribbon拦截RestTemplate发出的所有的请求
    //ribbon获取url中的service name
    //从nacos注册中心获取实例列表
    //负责从实例列表中通过相应的负载均衡算法，获取一个实例
    //RestTemplate请求实例
    @LoadBalanced
    public RestTemplate  initRestTemplate(){
        return new RestTemplate();
    }

}
```

#### 4.7.4：保存订单接口

``` java
package com.qf.controller;

import com.qf.entity.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("order")
public class OrderController {


    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping("save")
    public Map save(){

        // 获取购买的商品信息（远程调用商品微服务去获取商品信息） 发送http请求
        // java 发送http请求，使用apache httpclient
        // spring resttemplate  简洁
        String url = "http://cloud-goods/goods/findById/1" ;  //硬编码服务名
        Goods goods = restTemplate.getForObject(url, Goods.class);

        System.out.println(goods);

        //保存订单(本地调用)
        System.out.println("保存订单成功!!!");

        //todo: 扣库存

        return  new HashMap(){{
            put("code", 200);
            put("msg", "success");
        }};

    }

}
```

> 保存订单接口 是订单服务中的，但是下单时需要获取商品，所以需要调用到商品服务！

### 4.8：微服务集群演示

``` properties
#如果不指定端口，那么微服务启动时使用8001，如果指定端口，那么微服务就在指定端口启动
server.port=${port:9091}
```

可以同时启动多个服务提供者[商品服务]

| IDEA2021.3版本 多实例运行配置如下                            |
| ------------------------------------------------------------ |
| ![image-20220914152208978](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209141522247.png) |
| IDEA2020版本多实例运行配置如下                               |
| ![image-20210816163533652](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209141522454.png) |

### 4.9：nacos领域模型

```  txt
nacos的服务由三元组唯一确定   (namespace、group、servicename)
nacos的配置由三元组唯一确定     (namespace、group、dataId)

不同的namespace是相互隔离的，相同namespace但是不同的group也是相互隔离的

默认的namespace是public ，不能删除
默认的group是DEFAULT-GROUP
```

1：创建namespace

![image-20210817102910080](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240328.png)

2：发布服务到指定的namespace

![image-20210817103155453](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240333.png)

## 五：RestTemplate

> 实现服务间远程调用

### 5.1：RestTemplate简介

```  txt
1:RestTemplate是java模拟浏览器发送http请求的工具类
2:RestTemplate基于`Apache`的`HttpClient`实现。HttpClient使用起来太过繁琐。spring提供了一种简单便捷的模板类来进行操作，这就是`RestTemplate`。
```

### 5.2：ForObject

> 返回的是响应结果

get请求

``` java
Goods goods = restTemplate.getForObject(BaseURL+"findById/12", Goods.class);
System.out.println(goods.getName());
```

post请求（发送的是json串）

``` java
Map goods = restTemplate.postForObject(BaseURL + "/save", new Goods("huawei", 99.99), Map.class);
System.out.println(goods.get("code"));
```

提示：

``` java
// 1: 微服务之间数据传输格式统一为json
// 2：entity的空构造方法要提供
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goods  {

      private String name;
      private double price;

}
```

### 5.3：ForEntity

> 返回的是响应体

get请求

``` java
ResponseEntity<Goods> forEntity = restTemplate.getForEntity(BaseURL + "findGoodsById?goodsId=12", Goods.class);

System.out.println("http status:"+forEntity.getStatusCode());
System.out.println("http response body:"+forEntity.getBody());
```

post请求

``` java
ResponseEntity<Map> responseEntity = restTemplate.postForEntity(BaseURL + "/save", new Goods("huawei", 99.99), Map.class);

System.out.println("http status:"+responseEntity.getStatusCode());
System.out.println("http response body:"+responseEntity.getBody());
```

## 六：负载均衡器Ribbon

```  txt
nacos: 注册中心，解决服务的注册与发现
Ribbon：客户端的负载均衡器，解决的是服务实例列表的负载均衡的问题
```

### 6.1：Ribbon简介

```  txt
Ribbon是Netflix公司开源的一个负载均衡的项目，是一个"客户端"负载均衡器，运行在客户端上
```

### 6.2：Ribbon在项目中怎么使用

第一步：pom依赖

> springcloud alibaba 对Ribbon做了兼容

![image-20201018110223408](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240334.png)

第二步：@LoadBalanced注解

``` java
@Bean
@LoadBalanced
public RestTemplate restTemplate(){
    return new RestTemplate();
}
```

### 6.3：Ribbon的工作流程

### 6.4：Ribbon源码追踪

![image-20210817135810619](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240335.png)

```
LoadBalancerInterceptor
```

![image-20210817135834178](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240342.png)

```
RibbonLoadBalancerClient
```

![image-20210817140127081](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240733.png)

负载均衡

![image-20210817140537724](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240735.png)

```  txt
Ribbon核心组件IRule：根据特定算法从服务列表中选取一个需要访问的服务；
其中IRule是一个接口，有七个自带的落地实现类，可以实现不同的负载均衡算法规则：
```

![image-20210716160640128](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240737.png)

### 6.5：切换Ribbon负载均衡策略

![image-20210817142501714](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240736.png)

![image-20210817142523916](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240743.png)

### 6.6：服务实例列表同步更新

```
DynamicServerListLoadBalancer.updateListOfServers
//从nacos server获取最新的实例列表
NacosServerList.getServers
```

问题：服务消费者一旦成功调用一次，nacos server关闭后还能继续访问？

> 还可以，本地有服务列表的缓存

## 七：nacos集群搭建

### 7.1：nacos集群架构

![image-20210817150519355](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240761.png)

### 7.2：nacos集群搭建

> 伪集群：一台服务器搭建3台nacos 通过端口进行区分
>

#### 7.2.1：集群规划

| 服务名     | ip             | 端口 | 备注                 |
| ---------- | -------------- | ---- | -------------------- |
| nacos实例1 | 192.168.29.110 | 8848 |                      |
| nacos实例2 | 192.168.29.110 | 8858 |                      |
| nacos实例3 | 192.168.29.110 | 8868 |                      |
| nginx      | 192.168.29.110 | 80   | 反向代理nacos3个实例 |
| mysql      | 192.168.29.110 | 3306 | 存储nacos数据        |

#### 7.2.2：详细步骤

第一步：上传nacos包到linux服务器并解压

``` she
mkdir -p /opt/server
tar -zxvf nacos-server-2.0.3.tar.gz -C /opt/server/
```

第二步：修改nacos数据源

> 1、启动MYSQL

使用docker-compose启动mysql

```  sh
mkdir -p /opt/docker_mysql
cd /opt/docker_mysql
vi docker-compose.yml
```

docker-compose.yml 文件的内容如下

```  yml
version: '3.1'
services:
  mysql:           ## 服务的名称
    restart: always   ## 代表只要docker启动，那么这个容器就跟着一起启动
    image: daocloud.io/library/mysql:5.7.5-m15  ## 指定镜像路径
    container_name: mysql  ## 指定容器名称
    ports:
      - 3306:3306   ##  指定端口号的映射
    environment:
      MYSQL_ROOT_PASSWORD: root   ## 指定MySQL的ROOT用户登录密码
      TZ: Asia/Shanghai        ## 指定时区
    volumes:
     - /opt/docker_mysql/mysql_data:/var/lib/mysql   ## 映射数据卷
```

然后启动mysql

```  sh
docker-compose up -d
```

> 2、远程连接然后创建数据库并导入表
>
> ![image-20220609221437752](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206092214828.png)

> 3、修改MYSQL数据库的连接信息

```  sh
cd /opt/server/nacos/conf/
vi application.properties
```

| 修改连接信息                                                 |
| ------------------------------------------------------------ |
| ![image-20220609223313395](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206092233676.png) |

第三步：修改/opt/server/nacos/bin/startup.sh 的JAVA_OPT

![image-20220914165158892](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209141651169.png)

![image-20220914165421996](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209141654962.png)

> 虚拟机内存至少要2G，然后修改如下配置

``` sh
原设置：
JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
修改后：
JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m -Xmn128m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=160m"
```

第四步：配置/opt/server/nacos/conf/cluster.conf配置文件

修改集群配置文件的文件名

 cp cluster.conf.example cluster.conf

``` properties
192.168.29.110:8848
192.168.29.110:8858
192.168.29.110:8868
```

第五步：复制三份，同时修改监听端口

``` shell
[root@zhuxm01 server]# cp nacos/   nacos8848 -r
[root@zhuxm01 server]# cp nacos/   nacos8858 -r
[root@zhuxm01 server]# cp nacos/   nacos8868 -r
```

![image-20220609222242017](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206092222071.png)

修改上面三个目录中的conf/application.properties文件，修改对用的监听端口

```  properties
server.port=8868
```

第六步：分别启动nacos实例

创建nacos-cluster-startup.sh

``` shell
vi nacos-cluster-startup.sh

## 文件内容如下
sh /opt/server/nacos8848/bin/startup.sh
sh /opt/server/nacos8858/bin/startup.sh
sh /opt/server/nacos8868/bin/startup.sh
```

给nacos-cluster-startup.sh文件添加可执行权限

```  sh
chmod 777 nacos-cluster-startup.sh
## 启动nacos集群
./nacos-cluster-startup.sh
```

启动后，看到如下的提示，说明集群启动成功

```  sh
INFO Nacos started successfully in cluster mode. use external storage
```

第七步：测试1

打开浏览器查看

![image-20220609223528820](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206092235906.png)

在代码中使用时，指定server-addr为集群地址

``` pro
spring.cloud.nacos.discovery.server-addr=192.168.174.128:8848,192.168.174.128:8858,192.168.174.128:8868
```

第八步：配置nginx反向代理（可选）

``` json
upstream  nacos-cluster {
    server    192.168.174.128:8848;
    server    192.168.174.128:8858;
    server    192.168.174.128:8868;
}

server {
    listen       80;
    server_name  localhost;
    #charset koi8-r;
    #access_log  logs/host.access.log  main;
    location / {
        proxy_pass http://nacos-cluster/;
    }
}
```

## 八：Spring Cloud OpenFeign

> 作为Spring Cloud的子项目之一，Spring Cloud OpenFeign 是一种声明式、模板化的 HTTP 客户端，在 Spring Cloud 中使用 OpenFeign，可以做到使用 HTTP请求远程服务时能与调用本地方法一样的编码体验，开发者完全感知不到这是远程方法，更感知不到这是个 HTTP 请求。同时OpenFeign通过集成Ribbon实现客户端的负载均衡

> nacos-server : 注册中心，解决是服务的注册与发现
>
> Ribbon：客户端负载均衡器，解决的是服务集群负载均衡的问题
>
> OpenFeign：声明式 HTTP 客户端 、代替Resttemplate组件，实现远程调用

### 8.1：演示案例说明

> cloud-order为服务消费者、cloud-jifen为服务提供者
>
> 功能1：添加订单，生成一条积分记录
>
> 功能2：修改订单，修改积分记录
>
> 功能3：删除订单，删除积分记录
>
> 功能4：查询订单，获取积分记录

### 8.2：新建积分微服务

模块名称：cloud-jifen

#### 8.2.1：pom依赖

``` xml
 <dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>

     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-actuator</artifactId>
     </dependency>

     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
     </dependency>

     <!-- entity -->
    <dependency>
        <groupId>com.qf</groupId>
        <artifactId>cloud-entity</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```

#### 8.2.2：application.yml

``` yml
spring:
  application:
    name: cloud-jifen #服务名称，必须，保证唯一
  cloud:
    nacos:
      discovery:
        server-addr: 192.168.174.128 #指定nacos-server的Nginx地址
        username: nacos
        password: nacos
server:
  port: ${port:7071}
```

#### 8.2.3：启动类

``` java
@SpringBootApplication
@EnableDiscoveryClient
public class JifenApplication {

    public static void main(String[] args) {
        SpringApplication.run(JifenApplication.class,args);
    }

}
```

#### 8.2.4：暴露接口

``` java
@RestController
@RequestMapping("/jifen")
public class JifenController {

    @PostMapping(value = "/save")
    public Map save(@RequestBody Jifen jifen) {

        System.out.println("调用了积分保存接口");
        System.out.println(jifen);
        return new HashMap(){{
            put("isSuccess",true);
            put("msg","save success");
        }};
    }
 
}
```

在cloud-entity模块中增加实体类

``` java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Jifen {
    
    private Integer jifenId;
    
    private Integer count;
    
    private String type;

}
```

``` java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goods {

    private Integer id;
    private String name;
    private Integer price;

}
```

``` java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultVo {
    
    private boolean success;
    
    private String msg;
    
}
```

``` java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    
    private Integer uid;
    private Integer num;
    private String type;
    
}
```

### 8.3：Openfeign使用

在订单模块cloud-orders中做如下操作，因为cloud-orders要通Openfeign调用积分模块

#### 8.3.1：openfeign依赖

``` xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

![image-20210202105915087](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240371.png)

#### 8.3.2：开启openfeign

```  java
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients // 这个注解开启OpenFeign
public class OrdersApp {

    public static void main(String[] args) {
        SpringApplication.run(OrdersApp.class,args);
    }
}
```

#### 8.3.3：接口声明

```  java
@FeignClient("cloud-jifen")
@RequestMapping("/jifen")
public interface JifenApi {

    @PostMapping(value = "/save")
    Map save(@RequestBody Jifen jifen);
}
```

#### 8.3.4：接口调用

扫描openfeign接口

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206092313260.png)

``` java
@RestController
@RequestMapping("order")
public class OrderFeignController {

    @Resource
    JifenApi jifenApi;

    @GetMapping("testFeign")
    public Map saveJifen(){
        //通过openfeign远程调用 cloud-jifen服务的/jifen/save接口
        Jifen jifen = new Jifen(1, 100, "消费积分");
        //url:http://cloud-jifen/jifen/save
        Map save = jifenApi.save(jifen);
        return save;
    }

}
```

### 8.4：Openfeign常用配置

``` properties
spring:
  application:
    name: cloud-orders  #服务的应用名称
  cloud:
    nacos:
      discovery: #nacos配置
        server-addr: 192.168.174.128
        username: nacos
        password: nacos
server:
  port: 8080
ribbon:
  eager-load:
    enabled: true
    clients:
      - cloud-jifen
      - cloud-goods
feign:
  client:
    config:
      cloud-jifen:
        connect-timeout: 1000
        read-timeout: 1  #设置cloud-jifen相应的超时时间为1毫秒
      default: #设置默认的超时时间
        connect-timeout: 1000
        read-timeout: 1
```

> Ribbon的饥饿加载(eager-load)模式
>
> 目前测试的时候发现在服务都成功启动的时候第一次访问会有报错的情况发生,但是之后又恢复正常访问
>
> 通过查询相关文档,了解到要解决此问题那么让需要实例化的类提前创建，而不是在第一次调用的时候创建
>
> 摘自DD的博客:
>
> 主要是Ribbon进行客户端负载均衡的Client并不是在服务启动的时候就初始化好的，而是在调用的时候才会去创建相应的Client，所以第一次调用的耗时不仅仅包含发送HTTP请求的时间，还包含了创建RibbonClient的时间，这样一来如果创建时间速度较慢，同时设置的超时时间又比较短的话，很容易就会出现上面所描述的显现。
> 因此我们可以通过设置:
>
> ribbon.eager-load.enabled=true
>
> ribbon.eager-load.clients=cloud-shop-userservice
>
> 参数说明:
>
> ribbon.eager-load.enabled : 开启Ribbon的饥饿加载模式
>
> ribbon.eager-load.clients: 指定需要饥饿加载的服务名

## 九：Nacos配置中心

> 小结：
>
> Nacos：注册中心，解决服务的注册与发现
>
> Ribbon：客户端的负载均衡器，服务集群的负载均衡
>
> OpenFeign：声明式的HTTP客户端，服务远程调用
>
> Nacos：配置中心，中心化管理配置文件

### 9.1：为什么使用配置中心

> 服务越来越多，配置项越来越复杂，配置文件都保存在本地，不方便维护和管理
>
> 也容易造成代码冲突。
>
> 每个模块可能有许多公共的配置项，需要进行集中管理和复用！
>
> 修改配置后，需要重启服务新的配置才能生效!
>
> 配置中心可以解决上面的问题：
>
> 1、集中统一管理配置项
>
> 2、不同环境的配置文件是隔离的
>
> 3、修改配置后，不需要重启服务可以实现直接生效

### 9.2：主流配置中心对比

目前市面上用的比较多的配置中心有：Spring Cloud Config、Apollo、Nacos和Disconf等。
由于Disconf不再维护，下面主要对比一下Spring Cloud Config、Apollo和Nacos。

| 对比项目     | Spring Cloud Config      | Apollo                   | Nacos                    |
| ------------ | ------------------------ | ------------------------ | ------------------------ |
| 配置实时推送 | 支持（Spring Cloud Bus） | 支持(HTTP长轮询1s内)     | 支持(HTTP长轮询1s内)     |
| 版本管理     | 支持（Git）              | 支持                     | 支持                     |
| 配置回滚     | （Git）支持              | 支持                     | 支持                     |
| 灰度发布     | 支持                     | 支持                     | 不支持                   |
| 权限管理     | 支持（依赖Git）          | 支持                     | 不支持                   |
| 多集群       | 支持                     | 支持                     | 支持                     |
| 多环境       | 支持                     | 支持                     | 支持                     |
| 监听查询     | 支持                     | 支持                     | 支持                     |
| 多语言       | 只支持Java               | 主流语言，提供了Open API | 主流语言，提供了Open API |
| 配置格式校验 | 不支持                   | 支持                     | 支持                     |
| 单机读(QPS)  | 7（限流所致）            | 9000                     | 15000                    |
| 单机写(QPS)  | 5（限流所致）            | 1100                     | 1800                     |
| 3节点读(QPS) | 21（限流所致）           | 27000                    | 45000                    |
| 3节点写(QPS) | 5（限流所致）            | 3300                     | 5600                     |

```  txt
从配置中心角度来看，性能方面Nacos的读写性能最高，Apollo次之，Spring Cloud Config依赖Git场景不适合开放的大规模自动化运维API。
功能方面Apollo最为完善，nacos具有Apollo大部分配置管理功能，而Spring CloudConfig不带运维管理界面，需要自行开发。
Nacos的一大优势是整合了注册中心、配置中心功能，部署和操作相比Apollo都要直观简单，因此它简化了架构复杂度，并减轻运维及部署工作。
```

nacos config 官网：<https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-config>

### 9.3：配置管理领域模型

![image-20201101203849080](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240404.png)

### 9.4：配置中心入门使用

1：创建命名空间

![image-20220610162758779](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206101627973.png)

1.1：在测试环境中创建文件

| 创建配置文件                                                 |
| ------------------------------------------------------------ |
| ![image-20220610162840437](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206101628704.png) |
| 配置文件内容                                                 |
| ![image-20220610163021872](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206101630015.png) |

配置内容如下：

```  yaml
spring:
  application:
    name: cloud-jifen # 应用名称，到nacos注册服务时服务的名称默认就是应用名
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 # naocs注册中心服务的地址
        username: nacos
        password: nacos
server:
  port: ${port:7071} # 服务提供者端口号
```

2：服务端加载配置信息

``` xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

> 在积分服务的resources资源目录下新建配置文件：bootstrap.properties

```  properties
#从配置中心加载配置文件
#文件名是通过公式来拼接${prefix}-${spring.profiles.active}.${file-extension}
# 应用名称
spring.application.name=cloud-jifen
# nacos服务地址
spring.cloud.nacos.server-addr=localhost:8848
# nacos配置的命名空间和分组
spring.cloud.nacos.config.namespace=test
spring.cloud.nacos.config.group=DEFAULT_GROUP
# nacos配置文件
spring.cloud.nacos.config.prefix=cloud-jifen
spring.profiles.active=test
spring.cloud.nacos.config.file-extension=yml

```

> 根据bootstrap.properties配置文件的描述，应用会从nacos的test命名空间拉取cloud-jifen-test.yml配置文件
>
> 可以启动项目，验证配置中心可用！

### 9.5：nacos配置动态刷新

> 动态刷新：不停机动态修改配置,立即生效

可以在Nacos配置中心的配置文件中，增加pic.url的key，验证动态刷新生效。

![image-20210818114421971](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082240989.png)

### 9.6：配置文件版本管理

| 配置列表查看历史版本                                         |
| ------------------------------------------------------------ |
| ![image-20220610163946162](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206101639318.png) |
| 历史版本列表                                                 |
| ![image-20220610164025937](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206101640068.png) |

### 9.7：多环境切换

测试环境

cloud-jifen-test.yml

``` yml
spring:
  application:
    name: cloud-jifen # 应用名称，到nacos注册服务时服务的名称默认就是应用名
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 # naocs注册中心服务的地址
        username: nacos
        password: nacos
server:
  port: ${port:7071} # 服务提供者端口号

pic:
  url: http://i.heyige.cn
```

生产环境

cloud-jifen-online.yml

``` yml
spring:
  application:
    name: cloud-jifen # 应用名称，到nacos注册服务时服务的名称默认就是应用名
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 # naocs注册中心服务的地址
        username: nacos
        password: nacos
server:
  port: ${port:7072} # 服务提供者端口号

pic:
  url: http://google.com
```

> 笨的方法：生产环境创建新配置文件，配置项拷贝过去
>
> 好的方法：直接克隆配置文件
>
> ![image-20220915115351892](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209151153111.png)

环境切换

![image-20220610002349982](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206100023081.png)

### 9.8：nacos共享配置

1.新建共享配置

common.yml

``` yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 192.168.174.128 #指定nacos-server的地址
        username: nacos
        password: nacos
```

cloud-jifen个性配置

``` yml
spring:
  application:
    name: cloud-jifen #服务名称，必须，保证唯一
server:
  port: ${port:9005}
pic:
  url: http://www.taobao.com
```

配置中心内容如下：

![image-20220915120129539](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209151201674.png)

2.加载共享配置

![image-20220915120310852](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209151203991.png)

::: details  本文档代码
[代码地址](http://heyige.cn/22081/cloud-parent)
:::

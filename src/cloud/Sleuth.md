---
title: Sleuth
---

::: tip 小结

- nacos 【name server】：注册中心，解决服务的注册与发现
- nacos【config】：配置中心，微服务配置文件的中心化管理，同时配置信息的动态刷新
- Ribbon：客户端负载均衡器，解决微服务集群负载均衡的问题
- Openfeign：声明式HTTP客户端，解决微服务之间远程调用问题
- Sentinel：微服务流量防卫兵,以流量为入口，保护微服务，防止服务雪崩
- gateway：微服务网关，服务集群的入口，路由转发以及负载均衡（全局认证、流控）
链路追踪【sleuth】 

:::


## 一：为什么要链路追踪



随着服务的越来越多，对调用链的分析会越来越复杂。它们之间的调用关系也许如下图：

![image-20201101225842101](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091713011.png)



> 问题：
>
> 1：微服务之间的调用错综复杂，用户发送的请求经历那些服务，调用链不清楚，没有一个自动化工具来维护调用链。
>
> 2：无法快速定位调用链中哪个环节出了问题
>
> 3：无法快速定位调用链中哪个环节比较耗时



## 二：Sleuth简介

### 2.1：SpringCloud-Sleuth 

> SpringCloud-Sleuth 提供的分布式系统中链路追踪解决方案
>
> 同类产品：
>
> SkyWalking是本土开源的基于字节码注入的调用链分析，以及应用监控分析工具。特点是支持多
>
> 种插件，UI功能较强，接入端无代码侵入。目前已加入Apache孵化器。
>
> cat 由大众点评开源，基于Java开发的实时应用监控平台，包括实时应用监控，业务监控 。 集成方案是通过代码埋点的方式来实现监控

### 2.2：Sleuth术语

> span：
>
> 代表了一组**基本的工作单元**。为了统计各处理单元的延迟，当请求到达各个服务组件的时候，也通过一个唯一标识（SpanId）来标记它的开始、具体过程和结束。通过SpanId的开始和结束时间戳，就能统计该span的调用时间，除此之外，我们还可以获取如事件的名称。请求信息等元数据。
>

> Trace：
>
> 由一组Trace Id相同的Span串联形成一个树状结构。为了实现请求跟踪，当请求到达分布式系统的入口端点时，只需要服务跟踪框架为该请求创建一个唯一的标识（即TraceId），同时在分布式系统内部流转的时候，框架始终保持传递该唯一值，直到整个请求的返回。那么我们就可以使用该唯一标识将所有的请求串联起来，形成一条完整的请求链路。

> Annotation：用它记录一个完成请求的4个事件，内部使用的重要注释：
>
> cs（Client Send）客户端发出请求，开始一个请求的生命
>
> sr（Server Received）服务端接受到请求开始进行处理， sr－cs = 网络延迟（服务调用的时间）
>
> ss（Server Send）服务端处理完毕准备发送到客户端，ss - sr = 服务器上的请求处理时间
>
> cr（Client Reveived）客户端接受到服务端的响应，请求结束。 cr - sr = 请求的总时间



### 2.3：Sleuth+Zipkin架构

![image-20210331224808688](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091713007.png)





下载Zipkin dashboard

``` sh
Zipkin 是Twitter开放源代码分布式的跟踪系统，每个服务向zipkin报告计时数据，zipkin会根据调用关系通过Zipkin UI生成依赖关系图
```

下载地址：https://repo1.maven.org/maven2/io/zipkin/zipkin-server/2.23.9/

启动zipkin，默认启动端口9411

```  java
java -jar xxx.jar
```



### 2.4：cloud-goods集成Sleuth

- pom.xml

``` xml
<!--链路追踪场景依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

- application.yml

``` yml
spring:
  zipkin:
    base-url: http://localhost:9411
    discovery-client-enabled: false
  sleuth:
    sampler:
      # 限速器，每秒采集10个请求，防止大并发过载。推荐
      rate: 10
```



### 2.5：cloud-jifen集成Sleuth

- pom.xml

``` xml
<!--链路追踪场景依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

- application.yml

``` yml
spring:
  zipkin:
    base-url: http://localhost:9411
    discovery-client-enabled: false
  sleuth:
    sampler:
      rate: 10
```



### 2.6：cloud-order集成Sleuth

- pom.xml

``` xml
<!--链路追踪场景依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

- application.yml

``` yml
spring:
  zipkin:
    base-url: http://localhost:9411
    discovery-client-enabled: false
  sleuth:
    sampler:
      rate: 10
```

> 每个需要加入链路追踪的服务，都需要做上面的配置
>
> 网关服务也可能同样是方式加入到链路追踪



## 三：使用效果

| 接口列表                                                     |
| ------------------------------------------------------------ |
| ![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206151522280.png) |
| 链路追踪                                                     |
| ![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206151522756.png) |
| 拓扑依赖关系                                                 |
| ![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206151522476.png) |


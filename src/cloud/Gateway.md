---
title: Gateway
---

::: tip 小结

nacos ：注册中心，解决服务的注册与发现
nacos ：配置中心，配置文件中心化管理
Ribbon：客户端负载均衡器，解决微服务集群负载均衡的问题
Openfeign：声明式HTTP客户端，解决微服务之间远程调用问题
Sentinel：微服务流量防卫兵,以流量为入口，保护微服务，防止出现服务雪崩

:::

## 一：Gateway简介

文档：https://spring.io/projects/spring-cloud-gateway#learn


### 1.1：为什么使用网关



![22576587-68590189c9c9d696](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091709151.png)



### 1.2：Springcloud-gateway简介

是基于spring5、springboot2.0和Project Reactor等技术开发的网关，目的是为微服务架构系统提供高性能，且简单易用的api路由管理方式。

优点：

1：性能强劲，是第一代网关zuul的1.6倍

2：功能强大，内置很多实用功能如：路由、过滤、限流、监控等。

3：易于扩展。



### 1.3：gateway核心概念

![image-20201029133319078](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091709154.png)



- Route（路由）

``` 
路由是构建网关的基本模块，它由ID，目标URI，一系列的断言和过滤器组成，如果断言为true则匹配该路由
```

- Predicate（断言、谓词）

``` 
开发人员可以匹配HTTP请求中的所有内容（例如请求头或请求参数），如果请求与断言相匹配则进行路由
```

- Filter（过滤）

``` 
指的是Spring框架中GatewayFilter的实例，使用过滤器，可以在请求被路由前或者之后对请求进行修改
```



### 1.4：gateway的工作流程

```  txt
1:客户端向 Spring Cloud Gateway 发出请求。然后在 Gateway Handler Mapping 中找到与请求相匹配的路由
2:将其发送到 Gateway Web Handler。
3:Handler 再通过指 定的过滤器链来将请求发送到我们实际的服务执行业务逻辑，然后返回。过滤器之间用虚线分开是因为过滤器可能会在发送代理请求之前（“pre”）或之后（“post”）执行业务逻辑。
```


![20200315104010965](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091709156.png)



### 1.5：搭建网关

#### 1.5.1：pom依赖

注意：不要依赖spring-boot-starter-web

``` xml
<dependency>
    <groupId>org.springfrawmework.boot</groupId>
    <!--servlet编程模型、运行的服务器是tomcat-->
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

依赖如下:

```  xml
 <dependencies>
     <!--   spring-cloud gateway,底层基于netty     -->
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-gateway</artifactId>
     </dependency>
     <!-- 端点监控 -->
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-actuator</artifactId>
     </dependency>

     <!--  nacos注册中心      -->
     <dependency>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
     </dependency>
</dependencies>
```



#### 1.5.2：基本配置

配置文件采用yml

``` yml
server:
  #gateway的端口
  port: 8040

spring:
  application:
    name: cloud-gateway
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```



#### 1.5.3：引导类

``` java
package com.qf.spring.cloud.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApp {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApp.class,args);
    }

}
```



## 二：路由配置姿势

### 2.1：路由到指定URL

``` yaml
spring:
  cloud:
    gateway:
      routes:
        - id: baidu
          uri: http://www.baidu.com
          predicates:
            - Path=/**
```

访问 http://localhost:8040/**  转发给   http://www.baidu.com/**

http://localhost:8040/a     =>     http://www.baidu.com/a

http://localhost:8040/a/b     =>     http://www.baidu.com/a/b



### 2.2：路由到微服务

#### 2.2.1：静态路由

```  yml
spring:
    cloud:
     gateway:
      #路由是一个数组，可以配置多个路由
      routes:
        #配置商品微服务,静态配置
        - id: cloud-orders
          uri: http://localhost:8080
          predicates:
            - Path=/order/**
```



#### 2.2.2：动态路由

```  yml
server:
  #gateway启动端口
  port: 8040
spring:
  cloud:
    gateway:
      routes:
        #配置订单微服务
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/**
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
  application:
    name: cloud-gateway

```





## 三：谓词工厂详解

Spring Cloud Gateway提供了十来种路由谓词工厂。为网关实现灵活的转发提供了基石。

Spring Cloud Gateway中内置的谓词工厂，包括：



![20191029224916279](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091709166.png)

#### Path

```  yml
 gateway:
      #配置路由规则
      routes:
        - id: cloud-orders
          #请求转发到微服务集群
          uri: lb://cloud-orders
          predicates:
            - Path=/order/**    #http://localhost:8040/goods/hello ->lb://wfx-goods/goods/hello
```



#### After

示例：

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:24:40.626+08:00[Asia/Shanghai]   //true
```

#### Before

示例：

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - Before=2020-10-29T22:24:40.626+08:00[Asia/Shanghai]
```

#### Between

示例：

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - Between=2020-10-28T22:24:40.626+08:00[Asia/Shanghai], 2020-10-29T22:24:40.626+08:00[Asia/Shanghai]
```

#### Cookie

示例：

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:26:40.626+08:00[Asia/Shanghai]
            - Cookie=age,18
```

#### Header

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:26:40.626+08:00[Asia/Shanghai]
            - Cookie=name,jack
            - Header=token,123
```

#### Host

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:26:40.626+08:00[Asia/Shanghai]
            - Cookie=name,jack
            - Header=token
            - Host=goods.wfx.com,**.jd.com
```

#### Method

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:26:40.626+08:00[Asia/Shanghai]
            - Cookie=name,jack
            - Header=token
            - Host=**.wfx.com,**.jd.com
            - Method=GET
```



#### Query

示例：

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:26:40.626+08:00[Asia/Shanghai]
            - Cookie=name,jack
            - Header=token
            - Host=**.wfx.com,**.jd.com
            - Method=GET
            - Query=baz,123
```



#### RemoteAddr

示例：

```  yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/order/test9   //true
            - After=2020-10-29T22:26:40.626+08:00[Asia/Shanghai]
##            - Cookie=name,jack
            - Header=token
            - Host=**.wfx.com,**.jd.com
            - Query=baz
            - RemoteAddr=192.168.234.122,192.168.234.123
```


#### 自定义RoutePredicateFactory

> 自定义谓词工厂的类名规范：后缀必须是RoutePredicateFactory

``` java

import com.qf.spring.cloud.gateway.config.MyConfig;
import org.springframework.cloud.gateway.handler.predicate.AbstractRoutePredicateFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

/**
 * @author zed
 * @date 2022/6/14 19:00
 */
@Component
public class MyHeaderRoutePredicateFactory extends AbstractRoutePredicateFactory<MyConfig> {
    public MyHeaderRoutePredicateFactory() {
        super(MyConfig.class);
    }

    @Override
    public Predicate<ServerWebExchange> apply(MyConfig config) {
        return exchange -> {

            if (StringUtils.isEmpty(config.getValue())) {//只配置了key，但是没有配置value

                if (exchange.getRequest().getHeaders().containsKey(config.getKey())) {
                    return true;
                } else {
                    return false;
                }

            } else {//同时配置了key和value

                //根据key获取value
                String value = exchange.getRequest().getHeaders().getFirst(config.getKey());
                if (config.getValue().equals(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        };
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("key", "value");
    }
}
```



``` java
server:
  port: 8040

spring:
  application:
    name: cloud-gateway
  cloud:
    nacos:
      server-addr: localhost:8848
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders # 带负载均衡效果的
          predicates:
            - Path=/order/**
            - MyHeader=aa
```





## 四：过滤器工厂详解



![20200315104010965](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091709156.png)



### 4.1：内置过滤器

- 1 AddRequestHeader GatewayFilter Factory
- 2 AddRequestParameter GatewayFilter Factory
- 3 AddResponseHeader GatewayFilter Factory
- 4 DedupeResponseHeader GatewayFilter Factory
- 5 Hystrix GatewayFilter Factory
- 6 FallbackHeaders GatewayFilter Factory
- 7 PrefixPath GatewayFilter Factory
- 8 PreserveHostHeader GatewayFilter Factory
- 9 RequestRateLimiter GatewayFilter Factory
- 10 RedirectTo GatewayFilter Factory
- 11 RemoveHopByHopHeadersFilter GatewayFilter Factory
- 12 RemoveRequestHeader GatewayFilter Factory
- 13 RemoveResponseHeader GatewayFilter Factory
- 14 RewritePath GatewayFilter Factory
- 15 RewriteResponseHeader GatewayFilter Factory
- 16 SaveSession GatewayFilter Factory
- 17 SecureHeaders GatewayFilter Factory
- 18 SetPath GatewayFilter Factory
- 19 SetResponseHeader GatewayFilter Factory
- 20 SetStatus GatewayFilter Factory
- 21 StripPrefix GatewayFilter Factory
- 22 Retry GatewayFilter Factory
- 23 RequestSize GatewayFilter Factory
- 24 Modify Request Body GatewayFilter Factory
- 25 Modify Response Body GatewayFilter Factory
- 26 Default Filters



### 4.2：使用内置过滤器

``` yaml
server:
  port: 8040
spring:
  application:
    name: cloud-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        username: nacos
        password: nacos
    gateway:
      routes:
        # lb://cloud-orders lb：启用网关的负载均衡 cloud-orders：服务名称
        - id: cloud-orders
          uri: lb://cloud-orders
          filters:
            - AddRequestHeader=name,xiongfeng
            - AddRequestParameter=age,18
```

``` java
@RequestMapping("test")
public String test(@RequestHeader("name") String name,@RequestParam("age") String age) {
    System.out.println("获取到的请求头中的name=" + name);
    System.out.println("获取到的请求参数的age=" + age);
    return "Order Test! name="+name+",age="+age;
}
```



### 4.3：自定义过滤器

命名规范：过滤器工厂的类名必须以GatewayFilterFactory为后缀

``` java
package com.qf.spring.cloud.gateway.factory;

import com.qf.spring.cloud.gateway.config.MyConfig;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@Component
public class CalServiceTimeGatewayFilterFactory extends AbstractGatewayFilterFactory<MyConfig> {

    public CalServiceTimeGatewayFilterFactory() {
        super(MyConfig.class);
    }

    @Override
    public GatewayFilter apply(MyConfig config) {

        return new GatewayFilter() {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
                //前处理
                long startTime = System.currentTimeMillis();

                System.out.println("name:"+config.getKey());
                System.out.println("value:"+config.getValue());

//                return chain.filter(exchange);//放行

                return  chain.filter(exchange).then(
                        //后置处理
                        Mono.fromRunnable(()->{
                            System.out.println("post come in");
                            //获取系统当前时间戳为endTime
                            long entTime = System.currentTimeMillis();
                            System.out.println("time="+(entTime-startTime));

                        }));
            }
        };
    }

    @Override
    public ShortcutType shortcutType() {
        return ShortcutType.DEFAULT;
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("key", "value");
    }
}
```



``` yml
server:
  port: 8040

spring:
  application:
    name: cloud-gateway
  cloud:
    nacos:
      server-addr: localhost:8848
    gateway:
      routes:
        - id: cloud-orders
          uri: lb://cloud-orders # 带负载均衡效果的
          predicates:
            - Path=/order/**
          filters:
            - CalServiceTime=name,zed
```

> 过滤器执行的顺序，就是配置的顺序



### 4.4：全局过滤器

Spring Cloud Gateway内置的全局过滤器。包括：
- 1 Combined Global Filter and GatewayFilter Ordering
- 2 Forward Routing Filter
- 3 LoadBalancerClient Filter
- 4 Netty Routing Filter
- 5 Netty Write Response Filter
- 6 RouteToRequestUrl Filter
- 7 Websocket Routing Filter
- 8 Gateway Metrics Filter
- 9 Marking An Exchange As Routed

> 自定义全局过滤器

``` java
package com.qf.spring.cloud.gateway.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * 自定义的全局过滤器
 */
@Component
public class AuthFilter implements GlobalFilter, Ordered {

    //针对所有的路由进行过滤
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        //过滤器的前处理
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        String token = request.getHeaders().getFirst("token");
        if (StringUtils.isEmpty(token)) {
            Map result = new HashMap() {{
                put("msg", "没有登录!!");
            }};
            return response(response, result);
        } else {
            if (!"123".equals(token)) {
                Map res = new HashMap() {{
                    put("msg", "令牌无效!!");
                }};
                return response(response, res);
            } else {
                return chain.filter(exchange);  //放行
            }
        }

    }

    private Mono<Void> response(ServerHttpResponse response, Object msg) {
        String resJson = "";
        try {
            response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
            resJson = new ObjectMapper().writeValueAsString(msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
        DataBuffer dataBuffer = response.bufferFactory().wrap(resJson.getBytes());
        return response.writeWith(Flux.just(dataBuffer));//响应json数据
    }


    //数字越小越先执行
    @Override
    public int getOrder() {
        return 0;
    }
}
```

> 无需配置，直接生效！



``` java
package com.qf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import reactor.core.publisher.Mono;

@SpringBootApplication
@EnableDiscoveryClient
public class GWApp {


    public static void main(String[] args) {
        SpringApplication.run(GWApp.class, args);
    }


    @Bean
    @Order(-1)
    public GlobalFilter a() {
        return (exchange, chain) -> {
            System.out.println("first pre filter");
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                System.out.println("first post filter");
            }));
        };
    }

    @Bean
    @Order(0)
    public GlobalFilter b() {
        return (exchange, chain) -> {
            System.out.println("second pre filter");
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                System.out.println("second post filter");
            }));
        };
    }

    @Bean
    @Order(1)
    public GlobalFilter c() {
        return (exchange, chain) -> {
            System.out.println("third pre filter");
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                System.out.println("third post filter");
            }));
        };
    }

}
```



## 五：gateway整合sentinel

Sentinel从 1.6.0 版本开始提供了 Spring Cloud Gateway 的适配模块，可以提供两种资源维度的限流：

- route 维度：即在 Spring 配置文件中配置的路由条目，资源名为对应的 routeId自定义
- API 维度：用户可以利用 Sentinel 提供的 API 来自定义一些 API 分组

### 5.1：整合步骤

第一步：pom依赖，完整依赖如下

``` xml
<dependencies>
    <!--   spring-cloud gateway,底层基于netty     -->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    <!-- 端点监控 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!--  nacos注册中心      -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.csp</groupId>
        <artifactId>sentinel-spring-cloud-gateway-adapter</artifactId>
    </dependency>

    <!-- sentinel-datasource-nacos -->
    <dependency>
        <groupId>com.alibaba.csp</groupId>
        <artifactId>sentinel-datasource-nacos</artifactId>
    </dependency>

</dependencies>
```



第二步：配置

``` yml
sserver:
  #gateway的端口
  port: 8040
spring:
  application:
    name: cloud-gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        username: nacos
        password: nacos
    # sentinel配置
    sentinel:
      transport:
        dashboard: localhost:8888
      datasource:
        flow:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: nacos
            password: nacos
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-flow-rules
            rule-type: flow
        degrade:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: nacos
            password: nacos
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-degrade-rules
            rule-type: degrade
        param-flow:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: nacos
            password: nacos
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-param-rules
            rule-type: param-flow
        system:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: nacos
            password: nacos
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-system-rules
            rule-type: system
        authority:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: nacos
            password: nacos
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-authority-rules
            rule-type: authority
    # 网关配置
    gateway:
      # 路由配置 可以配置很多路由定义所以传list形式
      routes:
        # 订单服务的路由配置
        - id: cloud-orders
          uri: lb://cloud-orders
          predicates:
            - Path=/orders/**
            # 请求发起的时间如果在这个配置的时间之后，断言通过，路由生效
            # - After=2023-03-11T10:55:00.317+08:00[Asia/Shanghai]
            # - Before=2023-03-11T10:55:00.317+08:00[Asia/Shanghai]
            # - Between=2023-03-11T10:59:00.317+08:00[Asia/Shanghai],2023-03-11T10:59:10.317+08:00[Asia/Shanghai]
            # 要求请求必须携带Cookie 键是age 值是18
            # - Cookie=age,18
            # 要求请求头中必须有token值必须是123
            # - Header=token,123
            # 要求必须是指定的主机[域名]发起的请求才能通过
            # - Host=goods.wfx.com,**.jd.com
            # 请求方式必须是下面指定的,如果有多个值就使用,逗号隔开
            # - Method=GET
            # Query要求请求参数必须包含指定的值
            # - Query=name,zs
            # RemoteAddr要求发起请求的服务器地址必须是下面指定的地址
            # - RemoteAddr=169.254.118.209,192.168.1.94,127.0.0.1,192.168.147.1,192.168.30.1
            # - MyHeader=token
          filters:
            - AddRequestHeader=name,xiaoming
            - AddRequestParameter=age,18
            - CalServiceTime

```



### 5.2：BlockException异常处理

默认BlockException异常全局处理器 SentinelGatewayBlockExceptionHandler

``` java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.alibaba.csp.sentinel.adapter.spring.webflux.exception;

import com.alibaba.csp.sentinel.adapter.spring.webflux.callback.WebFluxCallbackManager;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.util.function.Supplier;
import java.util.List;
import org.springframework.http.codec.HttpMessageWriter;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.server.ServerResponse.Context;
import org.springframework.web.reactive.result.view.ViewResolver;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

public class SentinelBlockExceptionHandler implements WebExceptionHandler {
    private List<ViewResolver> viewResolvers;
    private List<HttpMessageWriter<?>> messageWriters;
    private final Supplier<Context> contextSupplier = () -> {
        return new Context() {
            public List<HttpMessageWriter<?>> messageWriters() {
                return SentinelBlockExceptionHandler.this.messageWriters;
            }

            public List<ViewResolver> viewResolvers() {
                return SentinelBlockExceptionHandler.this.viewResolvers;
            }
        };
    };

    public SentinelBlockExceptionHandler(List<ViewResolver> viewResolvers, ServerCodecConfigurer serverCodecConfigurer) {
        this.viewResolvers = viewResolvers;
        this.messageWriters = serverCodecConfigurer.getWriters();
    }

    private Mono<Void> writeResponse(ServerResponse response, ServerWebExchange exchange) {
        return response.writeTo(exchange, (Context)this.contextSupplier.get());
    }

    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        if (exchange.getResponse().isCommitted()) {
            return Mono.error(ex);
        } else {
            return !BlockException.isBlockException(ex) ? Mono.error(ex) : this.handleBlockedRequest(exchange, ex).flatMap((response) -> {
                return this.writeResponse(response, exchange);
            });
        }
    }

    private Mono<ServerResponse> handleBlockedRequest(ServerWebExchange exchange, Throwable throwable) {
        return WebFluxCallbackManager.getBlockHandler().handleRequest(exchange, throwable);
    }
}

```



**自定义BlockException异常处理器**

``` java
package com.qf.spring.cloud.gateway.config;

import com.alibaba.csp.sentinel.adapter.gateway.sc.callback.GatewayCallbackManager;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.util.function.Supplier;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.codec.HttpMessageWriter;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.result.view.ViewResolver;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MySentinelGatewayBlockExceptionHandler  implements WebExceptionHandler {
    private List<ViewResolver> viewResolvers;
    private List<HttpMessageWriter<?>> messageWriters;
    private final Supplier<ServerResponse.Context> contextSupplier = () -> {
        return new ServerResponse.Context() {
            public List<HttpMessageWriter<?>> messageWriters() {
                return MySentinelGatewayBlockExceptionHandler.this.messageWriters;
            }

            public List<ViewResolver> viewResolvers() {
                return MySentinelGatewayBlockExceptionHandler.this.viewResolvers;
            }
        };
    };

    public MySentinelGatewayBlockExceptionHandler(List<ViewResolver> viewResolvers, ServerCodecConfigurer serverCodecConfigurer) {
        this.viewResolvers = viewResolvers;
        this.messageWriters = serverCodecConfigurer.getWriters();
    }


    //自定义异常处理
    private Mono<Void> writeResponse(ServerResponse response1, ServerWebExchange exchange) {

        ServerHttpResponse response = exchange.getResponse();

        //不能放行，直接返回，返回json信息
        response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");

        Map res = new HashMap(){{
            put("success",false);
            put("msg","系统繁忙，请稍后重试，网关发送的消息!!");
        }};

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStr = null;
        try {
            jsonStr = objectMapper.writeValueAsString(res);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


        DataBuffer dataBuffer = response.bufferFactory().wrap(jsonStr.getBytes());

        return response.writeWith(Flux.just(dataBuffer));//响应json数据

    }

    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        if (exchange.getResponse().isCommitted()) {
            return Mono.error(ex);
        } else {
            return !BlockException.isBlockException(ex) ? Mono.error(ex) : this.handleBlockedRequest(exchange, ex).flatMap((response) -> {
                return this.writeResponse(response, exchange);
            });
        }
    }

    private Mono<ServerResponse> handleBlockedRequest(ServerWebExchange exchange, Throwable throwable) {
        return GatewayCallbackManager.getBlockHandler().handleRequest(exchange, throwable);
    }
}
```



**网关配置类**

``` java
package com.qf.spring.cloud.gateway.config;

import com.alibaba.csp.sentinel.adapter.gateway.sc.SentinelGatewayFilter;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.web.reactive.result.view.ViewResolver;

import java.util.Collections;
import java.util.List;

@Configuration
public class GatewayConfiguration {

    private final List<ViewResolver> viewResolvers;
    private final ServerCodecConfigurer serverCodecConfigurer;

    public GatewayConfiguration(ObjectProvider<List<ViewResolver>> viewResolversProvider,
                                ServerCodecConfigurer serverCodecConfigurer) {
        this.viewResolvers = viewResolversProvider.getIfAvailable(Collections::emptyList);
        this.serverCodecConfigurer = serverCodecConfigurer;
    }

    @Bean
    // 必须优先级最高
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public MySentinelGatewayBlockExceptionHandler sentinelGatewayBlockExceptionHandler() {
        // Register the block exception handler for Spring Cloud Gateway.
        return new MySentinelGatewayBlockExceptionHandler(viewResolvers, serverCodecConfigurer);
    }

    @Bean
    public GlobalFilter sentinelGatewayFilter() {
        // By default the order is HIGHEST_PRECEDENCE
        return new SentinelGatewayFilter();
    }
}
```



## 六：gateway跨域

由于gateway使用的是webflux，而不是springmvc，所以需要先关闭springmvc的cors，再从gateway的filter里边设置cors就行了。

| Reactive Microservices With Spring Boot                      |
| ------------------------------------------------------------ |
| ![image-20220920173328446](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209201733646.png) |

``` java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.util.pattern.PathPatternParser;

@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod("*");
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
}
```

::: details 文档代码
[文档代码](http://heyige.cn/22081/cloud-parent)
:::

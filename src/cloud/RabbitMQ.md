---
title: RabbitMQ
---

## 1.MQ引言

> MessageQueue: 消息队列
>
> 模块之间的耦合度多高，导致一个模块宕机后，全部功能都不能用了，并且同步通讯的成本过高，用户体验差。

![1587650344256](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587650344256.png)

### 1.1什么是MQ

MQ（Message Queue）消息队列，是基础数据结构中“先进先出”的一种数据结构。一般用来解决应用解耦，异步消息，流量削峰等问题，实现高性能，高可用，可伸缩和最终一致性架构。

### 1.2MQ有哪些

主要的MQ产品包括：RabbitMQ、ActiveMQ、RocketMQ、ZeroMQ、Kafka、IBM WebSphere 等。

>市面上比较火爆的几款MQ：
>
>ActiveMQ，RocketMQ，Kafka，RabbitMQ。
>
>- 语言的支持：ActiveMQ，RocketMQ只支持Java语言，Kafka可以支持多们语言，RabbitMQ支持多种语言。
>- 效率方面：ActiveMQ，RocketMQ，Kafka效率都是毫秒级别，RabbitMQ是微秒级别的。
>- 消息丢失，消息重复问题： RabbitMQ针对消息的持久化，和重复问题都有比较成熟的解决方案。
>
>- 学习成本：RabbitMQ非常简单。
>
>RabbitMQ是由Rabbit公司去研发和维护的，最终是在Pivotal公司维护。
>
>RabbitMQ严格的遵循AMQP协议，一种高级消息队列协议，帮助我们在进程之间传递异步消息。

```  shell
AMQP，即Advanced Message Queuing Protocol，一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同的开发语言等条件的限制。Erlang中的实现有RabbitMQ等
```



### 1.3不同MQ的特点


| 特性                    |                           ActiveMq                           |                           RabbitMq                           |                           RocketMQ                           |                                                        Kafka |
| ----------------------- | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | -----------------------------------------------------------: |
| 成熟度                  |                             成熟                             |                             成熟                             |                           比较成熟                           |                                               成熟的日志领域 |
| 时效性                  |                                                              |                            微秒级                            |                            毫秒级                            |                                                       毫秒级 |
| 社区活跃度              |                              低                              |                              高                              |                              高                              |                                                           高 |
| 单机吞吐量              |        万级，吞吐量比RocketMQ和Kafka要低了一个数量级         |        万级，吞吐量比RocketMQ和Kafka要低了一个数量级         |          10万级，RocketMQ也是可以支撑高吞吐的一种MQ          | 10万级别，这是kafka最大的优点，就是吞吐量高。一般配合大数据类的系统来进行实时数据计算、日志采集等场景 |
| topic数量对吞吐量的影响 |                                                              |                                                              | topic可以达到几百，几千个的级别，吞吐量会有较小幅度的下降这是RocketMQ的一大优势，在同等机器下，可以支撑大量的topic | topic从几十个到几百个的时候，吞吐量会大幅度下降所以在同等机器下，kafka尽量保证topic数量不要过多。如果要支撑大规模topic，需要增加更多的机器资源 |
| 可用性                  |                 高，基于主从架构实现高可用性                 |                 高，基于主从架构实现高可用性                 |                      非常高，分布式架构                      | 非常高，kafka是分布式的，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用 |
| 消息可靠性              |                     有较低的概率丢失数据                     |                                                              |               经过参数优化配置，可以做到0丢失                |                          经过参数优化配置，消息可以做到0丢失 |
| 功能支持                |                     MQ领域的功能极其完备                     |    基于erlang开发，所以并发能力很强，性能极其好，延时很低    |            MQ功能较为完善，还是分布式的，扩展性好            | 功能较为简单，主要支持简单的MQ功能，在大数据领域的实时计算以及日志采集被大规模使用，是事实上的标准 |
| 优劣势总结              | 非常成熟，功能强大，在业内大量的公司以及项目中都有应用偶尔会有较低概率丢失消息而且现在社区以及国内应用都越来越少，官方社区现维护越来越少，几个月才发布一个版本而且确实主要是基于解耦和异步来用的，较少在大规模吞吐的场景中使用 | erlang语言开发，性能极其好，延时很低；吞吐量到万级，MQ功能比较完备而且开源提供的管理界面非常棒，用起来很好用社区相对比较活跃，几乎每个月都发布几个版本分在国内一些互联网公司近几年用rabbitmq也比较多一些但是问题也是显而易见的，RabbitMQ确实吞吐量会低一些，这是因为他做的实现机制比较重。而且erlang开发，国内有几个公司有实力做erlang源码级别的研究和定制？如果说你没这个实力的话，确实偶尔会有一些问题，你很难去看懂源码，你公司对这个东西的掌控很弱，基本职能依赖于开源社区的快速维护和修复bug。而且rabbitmq集群动态扩展会很麻烦，不过这个我觉得还好。其实主要是erlang语言本身带来的问题。很难读源码，很难定制和掌控。 | 接口简单易用，而且毕竟在阿里大规模应用过，有阿里品牌保障日处理消息上百亿之多，可以做到大规模吞吐，性能也非常好，分布式扩展也很方便，社区维护还可以，可靠性和可用性都是ok的，还可以支撑大规模的topic数量，支持复杂MQ业务场景而且一个很大的优势在于，阿里出品都是java系的，我们可以自己阅读源码，定制自己公司的MQ，可以掌控社区活跃度相对较为一般，不过也还可以，文档相对来说简单一些，然后接口这块不是按照标准JMS规范走的有些系统要迁移需要修改大量代码还有就是阿里出台的技术，你得做好这个技术万一被抛弃，社区黄掉的风险，那如果你们公司有技术实力我觉得用RocketMQ挺好的 | kafka的特点其实很明显，就是仅仅提供较少的核心功能，但是提供超高的吞吐量，ms级的延迟，极高的可用性以及可靠性，而且分布式可以任意扩展同时kafka最好是支撑较少的topic数量即可，保证其超高吞吐量而且kafka唯一的一点劣势是有可能消息重复消费，那么对数据准确性会造成极其轻微的影响，在大数据领域中以及日志采集中，这点轻微影响可以忽略这个特性天然适合大数据实时计算以及日志收集 |


### 1.4RabbitMQ介绍

RabbitMQ is the most widely deployed open source message broker.

为什么最受欢迎，应用最广泛？

1.使用AMQP协议   支持很多业务场景  比如  点对点   交换机路由   发布订阅模式  能适用很多业务场景

2. 使用 erlang 语言  这个语言的特点 叫做面向并发编程 自身并发能力强  对socket 编程 支持友好
3. 和spring 无缝整合
4. 对数据一致性  数据丢失 错误处理 非常友好    可以不丢失任何数据  对错误数据恢复

https://rabbitmq.com/

rabbit 是部署最广泛的消息中间件


## 2.RabbitMQ安装

### 2.1下载

官网下载地址：https://www.rabbitmq.com/download.html

<img src="https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200902201442656.png" alt="image-20200902201442656" style="zoom:80%;" />

使用 docker-compose  安装    启动服务  进入服务内部 启动web 访问

官方下载地址： https://rabbitmq.com/download.html

```  sh
cd /opt
mkdir docker_rabbitmq
cd docker_rabbitmq/
vim docker-compose.yml
# -d 后台作为守护进程启动
docker-compose up -d
```

docker-compose.yml 文件内容如下

```  yml
version: "3.1"
services:
  rabbitmq:
    image: rabbitmq:3.12-management
    restart: always
    container_name: rabbitmq
    ports:
      - 5672:5672     #rabbitmq  服务的端口号
      - 15672:15672   # rabbitmq 图形化界面的端口号
    volumes:
      - ./data:/var/lib/rabbitmq
```

打开浏览器：http://192.168.174.128:15672      用户名    guest   密码  guest

### 2.2RabbitMQ架构【`重点`】

#### 2.2.1 官方的简单架构图

> - Publisher - 生产者：发布消息到RabbitMQ中的Exchange
> - Consumer - 消费者：监听RabbitMQ中的Queue中的消息
> - Exchange - 交换机：和生产者建立连接并接收生产者的消息
> - Queue - 队列：Exchange会将消息分发到指定的Queue，Queue和消费者进行交互
> - Routes - 路由：交换机以什么样的策略将消息发布到Queue



|                         简单的架构图                         |
| :----------------------------------------------------------: |
| ![1587703812776](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587703812776.png) |

#### 2.2.2 RabbitMQ的完整架构图

|                          完整架构图                          |
| :----------------------------------------------------------: |
| ![1587705504342](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587705504342.png) |

![image-20200902200329661](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200902200329661.png)

![image-20210322181722088](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210322181722088.png)

![image-20210322181923032](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210322181923032.png)



>#### 查看图形化界面并创建一个Virtual Host
>
>创建一个全新test用户，全新的Virtual Host，并且将test用户设置上可以操作/test的权限

<img src="https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200905171744241.png" alt="image-20200905171744241" style="zoom:80%;" />


## 3.RabbitMQ的使用【`重点`】

#### RabbitMQ的通讯方式

|                           通讯方式                           |
| :----------------------------------------------------------: |
| ![1589104462867](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1589104462867.png) |
| ![1587707774754](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587707774754.png) |
| ![image-20200905173415121](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200905173415121.png) |
| ![image-20200909105131707](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200909105131707.png) |

## 4.SpringBoot整合RabbitMQ【`重点`】

#### 4.1 SpringBoot整合RabbitMQ

##### 4.1.1 创建SpringBoot工程

##### 4.1.2 导入依赖

```  xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.amqp</groupId>
        <artifactId>spring-rabbit-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

##### 4.1.3 编写配置文件

```  yml
spring:
  rabbitmq:
    host: 192.168.5.201
    port: 5672
    username: test
    password: test
    virtual-host: /test
```

##### 4.1.4 Hello-World

第一种使用配置类定义队列的方式

```  java
//===========配置类===========
@Configuration
public class RabbitMQConfig {

    @Bean
    Queue simpleQueue(){
        return new Queue("simpleQueue");
    }
}

//=============消费者=============
@Component
public class HelloConsume {

    // 在配置类中创建queue在这里引用即可从simpleQueue队列中消费消息
    // @RabbitListener也可以在类上使用
    @RabbitListener(queues = "simpleQueue")
    public void receive(String msg){
        System.out.println("消费者接收到的消息是:" + msg);
    }

}

//==========生产者========
@SpringBootTest
class SpringbootMqApplicationTests {

    // 注入rabbitTemplate
    @Autowired
    RabbitTemplate rabbitTemplate;

    // 生产者到simpleQueue对列发布消息
    @Test
    void contextLoads() {
        rabbitTemplate.convertAndSend("simpleQueue","SpringBoot整合MQ发送的消息");
    }

}
```

第二种使用注解的方式定义队列

```  java
//=========消费者==========
@Component
public class HelloConsume {

    // 使用queuesToDeclare声明队列并从这个队列中消费消息
    @RabbitListener(queuesToDeclare = @Queue(name = "simpleQueue"))
    public void receive(String msg){
        System.out.println("消费者接收到的消息是:" + msg);
    }

}

//===========生产者============
@SpringBootTest
class SpringbootMqApplicationTests {

    // 注入rabbitTemplate
    @Autowired
    RabbitTemplate rabbitTemplate;

    // 生产者到simpleQueue对列发布消息
    @Test
    void contextLoads() {
        rabbitTemplate.convertAndSend("simpleQueue","SpringBoot整合MQ发送的消息");
    }

}
```



##### 4.1.5Work

```  java
// 生产者
@Test
public void testWork(){
    // Work 模型
    for(int i=0;i<20;i++){
        rabbitTemplate.convertAndSend("work","work模型:   "+i);
    }
}
-----------------------------------------------------------------------------
@Component
public class WorkConsumer {

    @RabbitListener(queuesToDeclare = @Queue(name = "work",durable = "false"))
    public void getMessage(Object message){
        System.out.println("接收到消息1：" + message);
    }

    @RabbitListener(queuesToDeclare = @Queue(name = "work",durable = "false"))
    public void getMessage2(Object message){
        System.out.println("接收到消息2：" + message);
    }
}

```



##### 4.1.6Pub/Sub

```  java
// 生产者
@Test
public void testFanout(){
    // 生产发布模型 广播模型
    rabbitTemplate.convertAndSend("boot-pubsub-exchange","","广播模式");
}
  -----------------------------------------------------------
// 消费者
@Component
public class PubSubConsumer {
      @RabbitListener(bindings = {
      @QueueBinding(value = @Queue,   // 创建临时队列
       exchange = @Exchange(value = "boot-pubsub-exchange",type ="fanout")) // 绑定的交换机
      })
      public void getMessage(Object message){
          System.out.println("消费者1："+message);
      }
    
      @RabbitListener(bindings = {
      @QueueBinding(value = @Queue,   // 创建临时队列
      exchange = @Exchange(value = "boot-pubsub-exchange",type ="fanout")) // 绑定的交换机
      })
      public void getMessage2(Object message){
          System.out.println("消费者2："+message);
      }
}
```

##### 4.1.7route

```  java
// 生产者
@Test
public void testRouting(){
    // 路由模式
    rabbitTemplate.convertAndSend("boot-route-exchange","info","发送的是info的key的路由信息");
}
// ------------------------------------------------------
// 消费者
@Component
public class RouteConsumer {

    @RabbitListener(bindings = {
    @QueueBinding(value = @Queue,    // 创建临时队列
     exchange = @Exchange(value = "boot-route-exchange",type = "direct"),
                  key = {"info","error"})})
    public void getMessage1(Object message){
        System.out.println("消费者1："+message);
    }

    @RabbitListener(bindings = {
    @QueueBinding(value = @Queue,    // 创建临时队列
    exchange = @Exchange(value = "boot-route-exchange",type = "direct"),key = {"info"})})
    public void getMessage2(Object message){
        System.out.println("消费者2："+message);
    }
    
}   
```

##### 4.1.8topic

```  java
// 生产者
@Test
void testTopic2(){
    //rabbitTemplate.convertAndSend("boot-topic-exchange","slow.red.dog","红色大狼狗！！");
    rabbitTemplate.convertAndSend("boot-topic-exchange","black.dog.and.cat","黑色狗和猫！！");
}
//消费者
package com.glls.bootrabbitmqdemo1._5topic;

import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class TopicConsumer {

    @RabbitListener(
            bindings = {
                    @QueueBinding(
                            value = @Queue,
                            exchange = @Exchange(value = "boot-topic-exchange",type = "topic"),
                            key = {"*.red.*","black.*.#"}
                    )
            }
    )
    public void getMessage1(Object message){
        System.out.println("接收到消息1：" + message);
    }


    @RabbitListener(
            bindings = {
                    @QueueBinding(
                            value = @Queue,
                            exchange = @Exchange(value = "boot-topic-exchange",type = "topic"),
                            key = {"black.*.#"}
                    )
            }
    )
    public void getMessage2(Object message){
        System.out.println("接收到消息2：" + message);
    }

}
```

#### 4.2 手动ack

>要在消息消费完之后才告诉 rabbitmq 这个消息消费了，而不是还没消费就确认。 
>
>避免消息消费失败了但是消息已经被自动确认了  那么这个消息就相当于丢了   即丢消息
>
>实现步骤：
>
>1.在yml 配置文件 指定 手动 配置

```  yml
spring:
  rabbitmq:
    host: 192.168.5.201
    port: 5672
    username: test
    password: test
    virtual-host: /test
    listener:
      simple:
        acknowledge-mode: manual    #  手动指定 ack
```

>2. 在 消费者的方法参数中  指定参数
>

```  java
@RabbitListener(
       bindings = {
               @QueueBinding(
                       value = @Queue,
                       exchange = @Exchange(value = "boot-topic-exchange",type = "topic"),
                       key = {"black.*.#"}
               )
       }
)
public void getMessage3(String msg, Channel channel, Message message) throws IOException {
   System.out.println("接收到消息3：" + msg);

  // 手动  ack
   channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
}
```



## 5.RabbitMQ的其他操作

>RabbitMQ的消息确认机制  保证了 消息的可靠性传递
>
>RabbitMQ的消息确认有两种。
>
>**一种是消息发送确认**。这种是用来确认生产者将消息发送给交换器，交换器传递给队列的过程中，消息是否成功投递。发送确认分为两步，一是确认是否到达交换器，二是确认是否到达队列。   确认是否到达交换机  使用 confirm  机制 确认是否到达 queue  使用  return 机制
>
>**第二种是消费接收确认**。这种是确认消费者是否成功消费了队列中的消息。   即消费者的 ack
>
>消息确认的作用是什么？
>
>为了防止消息丢失。消息丢失分为发送丢失和消费者处理丢失，相应的也有两种确认机制。

### 5.1消息的可靠性

>RabbitMQ的事务：事务可以保证消息100%传递，可以通过事务的回滚去记录日志，后面定时再次发送当前消息。事务的操作，效率太低，加了事务操作后，比平时的操作效率至少要慢100倍。
>
>RabbitMQ除了事务，还提供了Confirm的确认机制，这个效率比事务高很多。

![image-20201001114157249](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20201001114157249.png)


> Confirm只能监听到消息是否到达exchange，无法保证消息可以被exchange分发到指定queue。
>
> 而且exchange是不能持久化消息的，queue是可以持久化消息。
>
> 采用Return机制来监听消息是否从exchange送到了指定的queue中

![1587801910926](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587801910926.png)

### 5.2 springboot 实现rabbitmq消息的可靠性

#### 5.2.1配置文件

>编写配置文件  开启Confirm 和 Return 机制

```  yml
spring:
  rabbitmq:
    host: 192.168.5.201
    port: 5672
    username: test
    password: test
    virtual-host: /test
    listener:
      simple:
        acknowledge-mode: manual    #  手动指定 ack
    publisher-confirm-type: simple    #  确认
    publisher-returns: true           #  消息可靠性
```

>指定RabbitTemplate 对象 开启 Confirm 和 Return  并编写回调方法
>
>生产者 消费者 没有什么变化

```  java
package com.qf.springbootmq.config;

import org.springframework.amqp.core.ReturnedMessage;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @author zed
 * @date 2022/6/8 6:46
 */
@Component
public class MqConfirmAndReturnConfig implements RabbitTemplate.ConfirmCallback,RabbitTemplate.ReturnsCallback {

    @Autowired
    RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init(){
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnsCallback(this);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        System.out.println("消息唯一标识"+correlationData);
        System.out.println("确认结果"+ack);
        System.out.println("失败原因"+cause);
        if(ack){
            System.out.println("消息已经送到了exchange");
        }else{
            System.out.println("消息没有送到exchange");
        }
    }

    @Override
    public void returnedMessage(ReturnedMessage returnedMessage) {
        // 如果执行了这个方法  说明消息没有送到 queue 中
        System.out.println("消息没有送到 queue ");
    }
}
```

### 5.3避免消息的重复消费

> 重复消费消息，会对非幂等行操作造成问题

> 重复消费消息的原因是，消费者没有给RabbitMQ一个ack

![1587820070938](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1587820070938.png)



>为了解决消息重复消费的问题，可以采用Redis，在消费者消费消息之前，现将消息的id放到Redis中，
>
>id-0（正在执行业务）
>
>id-1（执行业务成功）
>
>如果ack失败，在RabbitMQ将消息交给其他的消费者时，先执行setnx，如果key已经存在，获取他的值，如果是0，当前消费者就什么都不做，如果是1，直接ack。
>
>极端情况：第一个消费者在执行业务时，出现了死锁，在setnx的基础上，再给key设置一个生存时间。



### 5.4避免消息的重复消费-springboot 实现

#### 5.4.1 导入依赖

```  xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

#### 5.4.2 编写配置文件

```  yml
spring:
  redis:
    host: 192.168.199.109
    port: 6379
```

#### 5.4.3 修改生产者

```  java
    @Test
    void testRepeat(){
        rabbitTemplate.convertAndSend("boot-topic-exchange-repeat","black.dog.and.cat","黑色狗和猫！！",new CorrelationData());
        //System.in.read();
    }

```

#### 5.4.4 修改消费者

```  java
package com.glls.bootrabbitmqdemo1._8repeat;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component
public class TopicRepeatConsumer {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @RabbitListener(
            bindings = {
                    @QueueBinding(
                            value = @Queue,
                            exchange = @Exchange(value = "boot-topic-exchange-repeat",type = "topic"),
                            key = {"black.*.#"}
                    )
            }
    )
    public void getMessage4(String msg, Channel channel, Message message) throws IOException {
        //0. 获取MessageId
        String messageId = message.getMessageProperties().getHeader("spring_returned_message_correlation");
        //1. 设置key到Redis
        if(redisTemplate.opsForValue().setIfAbsent(messageId,"0",10, TimeUnit.SECONDS)) {
            //2. 消费消息
            System.out.println("接收到消息：" + msg);
            //3. 设置key的value为1
            redisTemplate.opsForValue().set(messageId,"1",10,TimeUnit.SECONDS);
            //4.  手动ack
            channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
        }else {
            //5. 获取Redis中的value即可 如果是1，手动ack
            if("1".equalsIgnoreCase(redisTemplate.opsForValue().get(messageId))){
                channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
            }
        }

    }
}
```

### 5.5 高级特性

#### 5.5.1 TTL

Time to live 过期时间  设置消息的过期时间  有两种方式

1. 指定一条消息的过期时间
2. 给队列设置消息过期时间，队列中所有的消息都有同样的过期时间

> 应用场景：比如  下单未支付  则订单自动删除的实现

#### 5.5.1.1   设置消息的过期时间

> 发送一条设置了过期时间的消息

细节： 过期时间 指的是 消息在 队列中的存活时间，所以 此时 为了看到效果  不用设置消费者监听队列    一直消费消息，如果 一直监听队列 消费消息的话  就看不到消息过期之后   消息从队列中消失的的效果了

> 所以  创建  交换机  创建 队列   别创建消费者

创建一个工具类  封装 交换机名字  队列名字 等 这些常量值

```  java
public class RabbitMQCommonConfig {

    //ttl-direct-exchange 交换机
    public static final String TTL_DIRECT_EXCHANGE = "ttldirectExchange";
    //ttl-direct-queue 队列
    public static final String TTL_DIRECT_QUEUE = "ttldirectQueue";
    //ttl-direct-routingkey  路由key
    public static final String TTL_DIRECT_ROUTINGKEY = "ttl_direct_routingkey";

}
```

在消费者端     创建 交换机 队列  Binging 这些bean ,注意 不创建消费者  是为了看到消息的过期时间属性效果

```  java
@Configuration
public class TTLConfig {

    @Bean
    public DirectExchange ttlDirectExchange(){
        return new DirectExchange(RabbitMQCommonConfig.TTL_DIRECT_EXCHANGE);
    }

    @Bean
    public Queue ttlDirectQueue(){
        return new Queue(RabbitMQCommonConfig.TTL_DIRECT_QUEUE);
    }


    @Bean
    public Binding ttlDirectBinding(){
        return BindingBuilder.bind(ttlDirectQueue()).to(ttlDirectExchange()).with(RabbitMQCommonConfig.TTL_DIRECT_ROUTINGKEY);
    }

}
```

在生产者端  发送一条 设置了 过期时间的消息

```  java
// 发送 ttl 消息   
// 第一种方式 设置消息的 属性 
@Test
public void sendTTLMessage(){

    String msg = "测试设置了过期时间的消息"+new Date().toLocaleString();
    MessageProperties messageProperties=new MessageProperties();   // 消息属性对象
    messageProperties.setMessageId(UUID.randomUUID().toString());
    messageProperties.setExpiration("10000");  // 设置消息的过期时间为10秒

    Message message = new Message(msg.getBytes(),messageProperties);
    rabbitTemplate.send(RabbitMQCommonConfig.TTL_DIRECT_EXCHANGE,RabbitMQCommonConfig.TTL_DIRECT_ROUTINGKEY,message);
}
```

> 测试 发现 消息在队列 10 秒后 消失

#### 5.5.1.2   设置队列的过期时间

> 直接在队列上设置消息的过期时间 这样 队列中的消息过期时间也都跟 队列设置的过期时间相同，  
>
> 如果 消息也设置了过期时间  谁小谁优先级高

```  java
@Bean
public Queue ttlDirectQueue(){
    // 在队列上 设置  此队列中  消息的过期时间
    Map<String,Object> map=new HashMap<>();
    // 队列中 所有的消息的过期时间 为 20秒
    //map.put("x-message-ttl",20000);
    // 队列中 所有的消息的过期时间 为 5秒
    map.put("x-message-ttl",5000);
    //return new Queue(TTL_DIRECT_QUEUE,true,false,false);
    return new Queue(TTL_DIRECT_QUEUE,true,false,false,map);
}
```

> 说明： 如果同时指定了Message的TTL 和  Queue 的 TTL ，则优先较小的那一个

所以  最佳实践  是 在 队列上设置过期时间

注意点：

TTL的延时队列存在一个问题，就是同一个队列里的消息延时时间最好一致，比如说队列里的延时时间都是1小时，千万不能队列里的消息延时时间乱七八糟多久的都有，这样的话先入队的消息如果延时时间过长会堵着后入队延时时间小的消息，导致后面的消息到时也无法变成死信转发出去，很坑！！！

举个栗子：延时队列里先后进入A,B,C三条消息，存活时间是3h,2h,1h，结果到了1小时C不会死，到了2hB不会死，到了3小时A死了，同时B,C也死了，意味着3h后A,B,C才能消费，很坑！！！



### 7.2 死信队列

![image-20210605220216190](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210605220216190.png)

队列中的消息可能会变成死信消息(dead-lettered)，进而当以下几个事件任意一个发生时，消息将会被重新发送到一个交换机：,

1，消息被消费者使用basic.reject或basic.nack方法并且requeue参数值设置为false的方式进行消息确认(negatively acknowledged)

2，消息由于消息有效期(per-message TTL)过期

3，消息由于队列超过其长度限制而被丢弃

注意，队列的有效期并不会导致其中的消息过期



### 7.3 延迟队列

> 什么是延迟队列？

延时队列，首先，它是一种队列，队列意味着内部的元素是有序的，元素出队和入队是有方向性的，元素从一端进入，从另一端取出。

其次，延时队列，最重要的特性就体现在它的延时属性上，跟普通的队列不一样的是，普通队列中的元素总是等着希望被早点取出处理，而延时队列中的元素则是希望被在指定时间得到取出和处理，所以延时队列中的元素是都是带时间属性的，通常来说是需要被处理的消息或者任务。

简单来说，延时队列就是用来存放需要在指定时间被处理的元素的队列。

> **延迟队列使用场景：**

那么什么时候需要用延时队列呢？考虑一下以下场景：

订单在十分钟之内未支付则自动取消。

新创建的店铺，如果在十天内都没有上传过商品，则自动发送消息提醒。

账单在一周内未支付，则自动结算。

用户注册成功后，如果三天内没有登陆则进行短信提醒。

用户发起退款，如果三天内没有得到处理则通知相关运营人员。

预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议。



> **延迟队列的实现方式：**

1，利用TTL+死信队列

生产者生产一条延时消息，根据需要延时时间的不同，利用不同的routingkey将消息路由到不同的延时队列，每个队列都设置了不同的TTL属性，并绑定在同一个死信交换机中，消息过期后，根据routingkey的不同，又会被路由到不同的死信队列中，消费者只需要监听对应的死信队列进行处理即可。

![image-20210606093916208](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210606093916208.png)


这种方式的弊端，无法做到通用性，每搞一个新的延迟任务，都要去实现一个实现的TTL+死信队列，比较麻烦；

2，利用RabbitMQ插件实现

安装一个插件即可，下载rabbitmq_delayed_message_exchange插件，然后解压放置到RabbitMQ的插件目录。

[官方下载地址](https://www.rabbitmq.com/community-plugins.html)

[GitHub地址](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)

[本地下载地址](http://124.223.190.53/root/soft/-/blob/master/rabbitmq_delayed_message_exchange-3.12.0.ez)

把下载的插件 放到 容器内的  /plugins 目录内

![image-20210606095728590](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210606095728590.png)

rabbitmq-plugins enable rabbitmq_delayed_message_exchange    安装插件

> 注意：一定要把插件放到容器内的 /plugins目录
>
> 在 /plugins 目录下执行 安装插件的命令



| 重启 rabbitmq 容器，注意在docker-compose.yml所在目录执行     |
| ------------------------------------------------------------ |
| ![image-20220906163236562](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209061632725.png) |

```  java
// 常量配置
public class RabbitMQCommonConfig {

    // 延时交换机
    public static final String DELAYED_DIRECT_EXCHANGE = "delayedDirectExchange";
    // 延时队列
    public static final String DELAYED_DIRECT_QUEUE = "delayedDirectQueue";
    // 延时路由KEY
    public static final String DELAYED_DIRECT_ROUTE_KEY = "delayedDirectRouteKey";
}
```

```  java
package com.qf.springbootmq.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.CustomExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

/**
 * @author zed
 * @date 2022/6/8 21:45
 * 延迟队列配置类
 */
@Configuration
public class DelayConfig {

    @Bean
    public CustomExchange delayedCustomExchange() {
        String type = "x-delayed-message";
        return new CustomExchange(RabbitMQCommonConfig.DELAYED_DIRECT_EXCHANGE, type, true, false, new HashMap<String, Object>() {{
            put("x-delayed-type", "direct");
        }});
    }

    @Bean
    public Queue delayedDirectQueue() {
        return new Queue(RabbitMQCommonConfig.DELAYED_DIRECT_QUEUE);
    }

    @Bean
    public Binding delayedDirectBinding() {
        return BindingBuilder.bind(delayedDirectQueue()).to(delayedCustomExchange()).with(RabbitMQCommonConfig.DELAYED_DIRECT_ROUTE_KEY).noargs();
    }
}
```

```  java
package com.qf.springbootmq.consume;

import com.qf.springbootmq.config.RabbitMQCommonConfig;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;

/**
 * @author zed
 * @date 2022/6/8 21:57
 * 延迟队列消费者
 */
@Component
public class DelayConsumer {

    @RabbitListener(queues = RabbitMQCommonConfig.DELAYED_DIRECT_QUEUE)
    public void receiver(String msg, Channel channel, Message message) throws IOException {
        System.out.println("延迟队列消费消息:" + msg + ",时间是:" + new Date());
        channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
    }
}
```


```  java
package com.qf.springbootmq.controller;

import com.qf.springbootmq.config.RabbitMQCommonConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * @author zed
 * @date 2022/6/8 22:00
 * 延时队列发送方
 */
@RestController
public class DelayedController {

    @Resource
    RabbitTemplate rabbitTemplate;

    @GetMapping("test")
    public String testMsg(String msg) {
        rabbitTemplate.convertAndSend(RabbitMQCommonConfig.DELAYED_DIRECT_EXCHANGE, RabbitMQCommonConfig.DELAYED_DIRECT_ROUTE_KEY, msg.getBytes(StandardCharsets.UTF_8), (message) -> {
            message.getMessageProperties().setDelay(10000);
            return message;
        });
        System.out.println("消息发送时间:" + new Date());
        return "success";
    }
}
```



## 6.MQ的应用场景

### 6.1异步处理

![image-20200909220500294](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200909220500294.png)

![image-20200909220517778](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200909220517778.png)

![image-20200909220840680](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200909220840680.png)

### 6.2应用解耦

![image-20200909220935835](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200909220935835.png)

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082222913.png)

![image-20220608222257482](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206082222525.png)

### 6.3流量削峰

![image-20200909221842847](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200909221842847.png)

1.用户的请求，服务器接收到之后，首先写入到消息队列，加入消息队列长度超过最大值，则直接抛弃用户的请求或跳转到错误页面。

2.秒杀业务根据消息队列中的请求信息，在做后续处理。



## 7.练习

创建消息服务  发送阿里云手机短信验证码

![image-20210323160232573](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210323160232573.png)

>腾讯COS 京东万象



::: details  本文档代码

[代码仓库](http://heyige.cn/2303/mq-boot)

:::


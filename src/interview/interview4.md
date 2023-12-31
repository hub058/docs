---
title: MyBatis&MQ-精简版
---

## 1. #{}和${}的区别？

- \#{}是占位符，预编译处理；${}是拼接符，字符串替换，没有预编译处理。
- Mybatis在处理#{}时，#{}传入参数是以字符串传入，会将SQL中的#{}替换为?号，调用PreparedStatement的set方法来赋值。
- 变量替换后，#{} 对应的变量自动加上单引号 ''；变量替换后，${} 对应的变量不会加上单引号 ''
- \#{} 可以有效的防止SQL注入，提高系统安全性；${} 不能防止SQL 注入
- \#{} 的变量替换是在DBMS 中；${} 的变量替换是在 DBMS 外

## 2. 在Mapper中如何传递多个参数？

1、若Dao层函数有多个参数，那么其对应的xml中，`#{0}`代表接收的是Dao层中的第一个参数，`#{1}`代表Dao中的第二个参数，以此类推。

2、使用@Param注解：在Dao层的参数中前加@Param注解,注解内的参数名为传递到Mapper中的参数名。

3、多个参数封装成Map，以HashMap的形式传递到Mapper中。

## 3. Mybatis动态sql有什么用？执行原理是什么？有哪些动态sql？

Mybatis动态sql可以在xml映射文件内，以标签的形式编写动态sql，执行原理是根据表达式的值完成逻辑判断，并动态拼接sql的功能。

Mybatis提供了9种动态sql标签：trim、where、set、foreach、if、choose、when、otherwise、bind

## 4.为什么使用MQ？

使用MQ的场景很多，主要有三个：解耦、异步、削峰。

## 5.消息队列的缺点

1、 系统可用性降低

系统引入的外部依赖越多，越容易挂掉。

2、 系统复杂度提高

加入了消息队列，要多考虑很多方面的问题，比如：一致性问题、如何保证消息不被重复消费、如何保证消息可靠性传输等。因此，需要考虑的东西更多，复杂性增大。

3、 一致性问题

A 系统处理完了直接返回成功了，人都以为你这个请求就成功了；但是问题是，要是 BCD 三个系统那里，BD 两个系统写库成功了，结果 C 系统写库失败了，这就数据不一致了。

## 6.如何保证消息的可靠性？

分三点：

生产者到RabbitMQ：事务机制和Confirm机制，注意：事务机制和 Confirm 机制是互斥的，两者不能共存，会导致 RabbitMQ 报错。
RabbitMQ自身：持久化、集群、普通模式、镜像模式。
RabbitMQ到消费者：basicAck机制、死信队列、消息补偿机制。

## 7. 生产者如何将消息可靠投递到RabbitMQ？

生产者把消息可靠投递到交换机是通过Confirm机制，
交换机中的消息可靠到达Queue队列是通过Return机制。

## 8. RabbitMQ如何将消息可靠投递到消费者？

MQ将消息push给Client（或Client来pull消息）

Client得到消息并做完业务逻辑

Client发送Ack消息给MQ，通知MQ删除该消息，此处有可能因为网络问题导致Ack失败，那么Client会重复消息，这里就引出消费幂等的问题；

MQ将已消费的消息删除。

## 9. 签到服务是如何实现的

自己总结。。

题目：

``` shell
1. #{}和${}的区别？
2. 在Mapper中如何传递多个参数？
3. Mybatis动态sql有什么用？执行原理是什么？有哪些动态sql？

4. 为什么使用MQ？
5. 消息队列的缺点
6. 如何保证消息的可靠性？

7. 生产者如何将消息可靠投递到RabbitMQ？
8. RabbitMQ如何将消息可靠投递到消费者？
9. 签到服务是如何实现的
是什么？解决什么问题？
用什么技术？
为什么用这个技术实现？
具体怎么实现？
```

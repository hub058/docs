---
title: 报警系统
---

::: tip
应用的监控预警服务

线上的服务出现问题
sentinel临时解决
限流
熔断降级

还需要第一时间知道这个问题并及时处理
预警机制：
自动给管理员，开发人员提示
IM：给开发/运维人员发消息WEIXIN,QQ,DINGDING...
EMAIL：发邮件
SMS：发短信

预警机制需要可定制可升级，多种预警方式，给指定用户发消息
:::

## I. 背景

日常的系统中，报警是不可缺少的一环，目前报警方式很多，最常见的有直接打日志，微信报警，短信报警，邮件报警等；而涉及到报警，一般不可避免的需要提前设置一些基本信息，如报警方式，报警频率，报警用户，开关等；

另外一个常见的问题是一般采用的是单一的报警方式，比如不管什么类型的报警全部都用短信方式触达，然后就会发现手机时常处于被淹没的状态了，久而久之对报警短信就不会敏感了


## II. 目标

因此我们准备设计一个通用的报警框架

- 可以自由选择报警方式，
- 支持用户自定义报警方式拓展
- 支持动态的报警配置，
- 支持用户自定义报警规则拓展
- 支持报警方式自动切换规则设定
- 支持报警方式自定义自动切换规则拓展


通过做一个东西，当然是希望可以带来一些用处，或者能学习到什么东西，才不枉花费精力来折腾一下，那么我们这个报警系统，究竟有什么用，或者可以从中学习到什么东西呢？

**用途：**

- 支持灵活可配的报警规则，以及具体报警业务的自定义拓展
- 目标就是统一报警的使用姿势，也就是不管什么报警，都一个姿势，但是内部可以玩出各种花样，对使用者而言就方便简洁了

**学习：**

抛开特有的知识点，可以抽象一些公共可用的地方，大概就下面这两点了

- 我们可以如何支持功能的动态可拓展
- 线程池的使用

## III. 设计

整体来说，报警主要可以划分为三个步骤，如下：

![IMAGE](https://s17.mogucdn.com/mlcdn/c45406/180209_3f276k99cb3k1kec5g184f6c4hb7f_2030x996.jpg)

- 提交报警：对外部使用者提供的接口
- 选择报警：根据报警相关信息，选择具体的报警执行单元
- 执行报警：实现具体的报警逻辑


从任务划分上来看，比较清晰简单，但是每一块的内容又必须可以拓展，

- 选择报警：
  - 报警规则的制定
  - 报警规则加载器  `ConfLoader`
  - 报警规则变更的触发器 `ConfChangeTrigger`
  - 报警规则解析器
    - `ConfParse` ： 解析文本格式报警规则为业务对象
    - `AlarmSelector` ：根据报警规则和报警类型，选择具体报警执行器 `AlarmExecute`

- 执行报警：
  - 线程池执行（以防止影响主业务流程）
  - AlarmExecute的动态拓展（支持用户自定义的报警器实现）
  - 实际的报警逻辑

根据上面的拆解，在应用启动的时候，就有一些事情必须去做了

1. ConfLoader的选择
2. 报警规则加载
3. AlarmExecute的加载（包括默认的+自定义实现的）


下图显示在应用启动时，报警规则解析的相关步骤

![应用启动.png](https://s17.mogucdn.com/mlcdn/c45406/180209_41ccjhcg1ag35i36ikel3jekf8ld9_868x608.png)


至于报警执行器的加载就比较简单了，如下图

![IMAGE](https://s17.mogucdn.com/mlcdn/c45406/180209_5jii7f1ed2j3f8e0di3aalhgji114_1666x402.jpg)


因此，整个的工作流程如下图

![alarm-arch.jpg](https://s17.mogucdn.com/mlcdn/c45406/180209_5eh16796bg6gk4622dj44diaa09bd_1078x620.jpg)


## IV. 任务拆解

通过前面的任务设计之后，对需要做的东西有了一个大概的脉络了，因此在正式操刀实现之前，下对整个架构进行任务拆解，看下可以具体的执行步骤可以怎么来

- 最直接的就是设计报警执行器`AlarmExecute`
  - 定义基本接口
  - 制定自定义扩展规则
- 接下来就是设计报警规则
  - 如何加载报警规则？
  - 报警规则具体的定义细则
  - 报警规则的解析：即根据报警类型来获取报警执行器
  - 报警规则动态更新支持
- 报警线程池
  - 维护报警队列
  - 报警的计数与频率控制
- 封装对外使用接口

所以，通过上面的分析可以看出，这个系统的结构还是蛮简单的，整个只需要四个部分就可以搞定，其中最主要的就是前面两个了，后面将分别说明

## V. 整体说明

### 0. 简单使用case

#### a. 引入依赖

基于maven项目，如下配置

先添加仓库

```xml
<repositories>
    <repository>
        <id>yihui-maven-repo</id>
        <url>https://raw.githubusercontent.com/liuyueyi/maven-repository/master/repository</url>
    </repository>
</repositories>
```

引入依赖

```xml
<dependency>
    <groupId>com.hust.hui.alarm</groupId>
    <artifactId>core</artifactId>
    <version>1.0</version>
</dependency>
```

也可以直接在将代码拷贝下来使用

#### b. 添加基本配置文件

如果使用系统默认的配置注册方式，则在项目的资源目录下新增文件

alarm.properties

```
## 应用名，必填
appName=test

## 报警规则文件所在的路径，如果采用系统默认加载方式，必填
## / 开头，表示存的是绝对路径
## 非/开头，表示存的是系统相对路径，一般是放在资源目录下
alarmConfPath=/tmp/alarmConfig

## 最大的报警类型，非必填
maxAlarmType=1000

## 默认报警用户，必填
defaultAlarmUsers=yihui
```


请注意其中的 `alramConfPath` 参数，这个指定报警规则文件的路径, 然后根据这个路径，添加报警规则文件，一个case如下:

(说明，外层的key为报警类型，default为默认的兜底规则，支持多个报警规则共享一个配置项，只需要用英文逗号分割即可，如下面的NPE, SELFDEFINE两种报警类型)

```json
{
    "default": {
        "level": "NONE",
        "autoIncEmergency": true,
        "max": 30,
        "min": 3,
        "threshold": [
            {
                "level": "LOG",
                "threshold": 5,
                "users": [
                    "yihui",
                    "erhui"
                ]
            }
        ],
        "users": [
            "yihui"
        ]
    },
    "NPE,SELFDEFINE": {
        "level": "LOG",
        "autoIncEmergency": false,
        "max": 30,
        "min": 0,
        "threshold": [
            {
                "level": "SMS",
                "threshold": 20,
                "users": [
                    "345345345345",
                    "123123123123"
                ]
            },
            {
                "level": "WEIXIN",
                "threshold": 10,
                "users": [
                    "小灰灰Blog",
                    "greyBlog"
                ]
            }
        ],
        "users": [
            "yihui"
        ]
    }
}
```

#### c. 报警调用

一个测试case如下

```java
@Test
public void sendMsg() throws InterruptedException {
    String key = "NPE";
    String title = "NPE异常";
    String msg = "出现NPE异常了!!!";
    AlarmWrapper.getInstance().sendMsg(key, title, msg);

    // 不存在异常配置类型, 采用默认报警, 次数较小, 则直接不输出
    AlarmWrapper.getInstance().sendMsg("zzz", "不存在xxx异常配置", "报警嗒嗒嗒嗒");

    // 确保报警执行完毕，再退出任务
    Thread.sleep(1000);
}
```


::: details 项目地址

[代码仓库](http://heyige.cn/2303/cloud-parent/-/tree/master/cloud-alarm)

:::


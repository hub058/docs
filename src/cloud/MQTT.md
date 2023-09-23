---
title: MQTT
---

## MQTT

### MQTT是什么

![image-20230612181602492](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306121816568.png)

MQTT (Message Queue Telemetry Transport) 是一个轻量级传输协议，它被设计用于轻量级的发布/订阅式消息传输，MQTT协议针对低带宽网络，低计算能力的设备，做了特殊的优化。是一种简单、稳定、开放、轻量级易于实现的消息协议，在物联网的应用下的信息采集，工业控制，智能家居等方面具有广泛的适用性。

官网：[mqtt.org](https://mqtt.org/)

MQTT的客户端工具，可以使用MQTTX

[MQTT 客户端库 & SDK 大全 | EMQ (emqx.com)](https://www.emqx.com/zh/mqtt-client-sdk)

### MQTT特点

**特点：**

1. MQTT更加简单：MQTT是一种消息队列协议，使用发布/订阅消息模式，提供一对多的消息发布，解除应用程序耦合，相对于其他协议，开发更简单；
2. MQTT网络更加稳定：工作在TCP/IP协议上；由TCP/IP协议提供稳定的网络连接；
3. 轻量级：小型传输，开销很小（固定长度的头部是 2 字节），协议交换最小化，以降低网络流量；适合低带宽，数据量较小的应用；

**MQTT支持三种消息发布服务质量(QoS)：**

- “至多一次”(QoS==0)：消息发布完全依赖底层 TCP/IP 网络。会发生消息丢失或重复。这一级别可用于如下情况，环境传感器数据，丢失一次读记录无所谓，因为不久后还会有第二次发送。
- “至少一次”(QoS==1)：确保消息到达，但消息重复可能会发生。
- “只有一次”(QoS==2)：确保消息到达一次。这一级别可用于如下情况，在计费系统中，消息重复或丢失会导致不正确的结果。

**MQTT 三种身份：**

![image-20230613150913684](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131509731.png)

- 发布者、代理、订阅者，发布者和订阅者都为客户端，代理为服务器，同时消息的发布者也可以是订阅者（为了节约内存和流量发布者和订阅者一般都会定义在一起）。
- MQTT传输的消息分为主题（Topic，可理解为消息的类型，订阅者订阅后，就会收到该主题的消息内容（payload））和负载（payload，可以理解为消息的内容）两部分。

**应用场景：**

遥感数据、汽车、智能家居、智慧城市、医疗医护
即时通讯：MQ 可以通过订阅主题，轻松实现 1对1、1对多的通讯

![image-20230613150742602](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131507783.png)

### EMQX

EMQX大规模分布式 MQTT 消息服务器，大规模可弹性伸缩的云原生分布式物联网 MQTT 消息服务器，高效可靠连接海量物联网设备，高性能实时处理消息与事件流数据，助力构建关键业务的物联网平台与应用。

官网地址：[EMQX: 大规模分布式 MQTT 消息服务器](https://www.emqx.io/zh)

**基于Docker安装：**

1.执行名称 创建容器

docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx:5.0.26

![image-20230614152722355](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141527529.png)

2.连接测试

访问可视化页面：

http://106.15.249.162:18083

默认的账号 和密码 ：admin/public

![image-20230614153313106](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141533221.png)

![image-20230614153535263](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141535341.png)

基于MQTTX连接测试MQTT服务器

![image-20230614152841932](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141528025.png)

![image-20230614153056575](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141530662.png)

公网的EMQX服务器：

ip：106.15.249.162

端口号：1883

账号：admin

密码：public



### RabbitMQ的MQTT插件

RabbitMQ的MQTT插件

1. 执行命令 创建RabbitMQ容器

docker run -d --hostname qf-rabbit --name qf-rabbit -p 15672:15672 -p 5672:5672 -p 1883:1883 -p 15675:15675 daocloud.io/library/rabbitmq:3.8.4

![image-20230613152514254](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131525309.png)

2.执行命令，开启插件

docker exec qf-rabbit   rabbitmq-plugins enable rabbitmq_management
docker exec qf-rabbit  rabbitmq-plugins enable rabbitmq_mqtt
docker exec qf-rabbit  rabbitmq-plugins enable rabbitmq_web_mqtt

![image-20230613152550340](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131525382.png)

3.访问RabbitMQ 查看是否开启MQTT

![image-20230613152622253](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131526301.png)

4.使用MQTTX测试MQTT

![image-20230613170511319](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131705387.png)

公网的RabbitMQ的MQTT服务器：

ip：111.231.15.99

端口号：1883

账号：guest

密码：guest



### 初体验

在Java程序中实现MQTT的发布和订阅

实现步骤：

1.依赖jar

```xml
<!--        mqtt通信的jar-->
        <dependency>
            <groupId>org.springframework.integration</groupId>
            <artifactId>spring-integration-mqtt</artifactId>
        </dependency>
```

2.编写MQTT客户端类

```Java
@Slf4j
public class MyMqttClient {
    private static String url="tcp://106.15.249.162:1883";
    private static String clientId="mqtt_lx_";
    private static MqttCallback cb=new MqttCallback() {
        @Override
        public void connectionLost(Throwable throwable) {
        }

        @Override
        public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {
            log.info("消息主题{},消息内容:{}",s,new String(mqttMessage.getPayload()));
        }

        @Override
        public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
        }
    };
    private static MqttClient client;

    public static void sendMsg(String msg) throws MqttException {
        client.publish("MQTT",new MqttMessage(msg.getBytes()));
    }
    public static void receiveMsg() throws MqttException {
        client.subscribe("MQTT",1);
    }
    public static void main(String[] args) throws MqttException {
        client=new MqttClient(url,clientId+new Random().nextInt(100000));
        MqttConnectOptions options=new MqttConnectOptions();
        options.setUserName("admin");
        options.setPassword("public".toCharArray());
        client.setCallback(cb);
        client.connect(options);
        System.err.println("已开启订阅，等待消息");
        //sendMsg("嗨，醒醒吧！");
        receiveMsg();
    }
}
```

3.运行测试

![image-20230614164242973](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141642188.png)

### 核心

实际中实现MQTT需要考虑解耦和消息订阅之后存储到MongoDB中

MQTT的核心：

MqttClient 类，MQTT的客户端类，可以去连接MQTT服务器(Emqx或RabbitMQ 都可以)

MqttConnectOptions 类，MQTT客户端的配置类，可以设置mqtt服务器的账号和密码

MqttCallback 接口，监听消息的获取，采用的接口回调，可以获取对应订阅到的消息



具体的代码如下所示：

1.依赖jar

```xml
<!--        mqtt通信的jar-->
        <dependency>
            <groupId>org.springframework.integration</groupId>
            <artifactId>spring-integration-mqtt</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.83</version>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.10</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
```

2.实现配置

```yaml
mqtt:
  url: tcp://106.15.249.162:1883
  clientid: mqtt_lx_
  user: admin
  pass: public
  qos: 0
  topic: MQTT
spring:
  data:
    mongodb:
      uri: mongodb://111.231.15.99:27017/admin
```

3.编写代码-MongoDB代码

```Java
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class MqttMsg {
    @Id
    private Long id;//雪花算法
    private String msg;//消息内容
    private long ctime;//消息时间 毫秒为单位
}
```

```Java
public interface MqttmsgDao extends MongoRepository<MqttMsg,Long> {
}
```

4.编写代码-MQTT代码

```Java
@Component
@Slf4j
public class MyMqttCallBack implements MqttCallback {
    @Resource
    private MqttmsgDao dao;
    @Override
    public void connectionLost(Throwable throwable) {
    }
    @Override
    public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {
        switch (s){
            case "MQTT":
                String json=new String(mqttMessage.getPayload());
                log.info("消息内容：{}",json);
                try{
                    MqttMsg mqttMsg= JSON.parseObject(json,MqttMsg.class);
                    dao.save(mqttMsg);
                }catch (Exception ex){
                    log.error("亲，不是我们规定的消息格式！");
                }
                break;
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
    }
}
```

```Java
@Slf4j
@Component
public class MqttConfig implements InitializingBean {
    @Value("${mqtt.url}")
    private String url;
    @Value("${mqtt.clientid}")
    private String clientid;
    @Value("${mqtt.user}")
    private String user;
    @Value("${mqtt.pass}")
    private String pass;
    @Value("${mqtt.qos}")
    private Integer qos;
    @Value("${mqtt.topic}")
    private String topic;

    @Resource
    public MyMqttCallBack callBack;

    private MqttClient client;
    
    /**
     * 发送消息*/
    public boolean publishMsg(String msg){
        try {
            client.publish(topic,new MqttMessage(msg.getBytes()));
            return true;
        } catch (MqttException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        //实例化 mqtt客户端对象 参数说明：1.mqtt服务器地址 2.客户端名称 唯一
        client=new MqttClient(url,clientid+new Random().nextInt(100000));
        //实例化 mqtt 参数对象 设置参数信息
        MqttConnectOptions options=new MqttConnectOptions();
        //账号 EMQX 的账号
        options.setUserName(user);
        //密码 EMQX 的密码
        options.setPassword(pass.toCharArray());
        //设置 消息接收对象  回调函数
        client.setCallback(callBack);
        //发起连接 连接到MQTT服务器
        client.connect(options);
        //定义 对应的主题的消息
        client.subscribe(topic,qos);
    }
}
```

编写代码实现控制层

```Java
@RestController
@RequestMapping("/api/mqtt/")
public class MqttController {
    @Resource
    private MqttConfig config;
    @Resource
    private MqttmsgDao dao;

    @GetMapping("sendmsg")
    public String sendMsg(String msg){
        if(StringUtils.hasLength(msg)){
            MqttMsg mqttMsg=new MqttMsg(IdUtil.getSnowflakeNextId(),msg,System.currentTimeMillis());
            if(config.publishMsg(JSON.toJSONString(mqttMsg))){
                return "OK";
            }
        }
        return "FAIL";
    }

    @GetMapping("all")
    public List<MqttMsg> all(){
        return dao.findAll(Sort.by(Sort.Order.desc("ctime")));
    }

}
```

5.运行测试

![image-20230614170435543](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141704737.png)

![image-20230614170500202](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306141705285.png)
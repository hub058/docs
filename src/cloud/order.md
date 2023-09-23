---
title: 订单服务
---

商品、购物车

商品服务：

1.全品类购物平台

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262253385.png)



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262253553.png)



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262254473.png)



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262253282.png)



SPU:Standard Product Unit 标准化产品单元。是商品信息聚合的最小单位。是一组可复用、易检索的标准化信息的集合，该集合描述了一个产品的特性。通俗点讲，属性值、特性相同的商品就可以称为一个SPU。通俗的说法：商品属性

SKU:Stock Keeping Unit，库存进出计量的基本单元，可以是以件，盒，托盘等为单位。通俗的说法：影响商品库存的属性。

SPU包含SKU

一个商品有100个属性，SPU，2个属性影响库存，2个SKU

购物车服务：

加减号的性能：Redis缓存->更新Redis->MQ->更新Mysql



## 一、需求

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262254811.png)



实现订单业务：预览、下单、订单超时、取消订单、更新订单状态、我的订单

下单（超卖）、超时（回滚）、取消（回滚）

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262254340.png)



## 二、分析

订单状态：

1. 待付款：代表买家下单了但是还没有付款。
2. 待发货（同待接单）：代表买家付款了卖家还没有发货。
3. 已发货（同待收货）：代表卖家已经发货并寄出商品了。
4. 已完成（同待评价）：代表买家已经确认收到货了。
5. 已关闭（同已取消）：代表订单过期了买家也没付款、或者卖家关闭了订单。
6. 已超时：超过一定时间，没有付款

订单的核心接口：

下单：购物车选择

下单：商品详情-立即购买

下单接口

订单超时-MQ的延迟队列

订单取消接口

查询我的订单

更改订单状态接口

## 三、设计

数据库设计：

```  sql
CREATE TABLE `t_items`  (
`id` int(11) primary key auto_increment,
`name` varchar(20) ,
`no` varchar(10)
) comment '10.商品类型表';

CREATE TABLE `t_goods`  (
`id` int(11) primary key AUTO_INCREMENT,
`item_id` int(11) comment '类型id',
`title` varchar(256) comment '名称',
`promo_words` varchar(2048) comment '描述',
`small_pic` varchar(100) comment '图片',
`price` decimal(10, 2) comment '价格',
`create_time` datetime,
`status` char(1) comment '状态',
`stock_num` int(11) comment '库存数量'
) comment '11.商品表';

CREATE TABLE `t_cart`  (
`id` int(11) primary key auto_increment,
`uid` int,
`gid` int,
`gjprice` decimal(10, 2) comment '加入时价格',
`num` int
) comment '12.购物车表';

CREATE TABLE `t_order`  (
`id` int(11) primary key auto_increment,
`uid` int,
`uaid` int comment '用户收货地址',
`total_money` decimal(10, 2) comment '总金额',
`pay_money` decimal(10, 2) comment '支付金额',
`free_money` decimal(10, 2) comment '优惠金额',
`pay_type` int comment '支付类型',
`flag` int comment '订单状态',
`create_time` datetime comment '创建时间',
`update_time` datetime comment '更新时间',
 `no` varchar(50) comment '订单编号'
) comment '13.订单表';

CREATE TABLE `t_orderitem`  (
`id` int(11) primary key auto_increment,
`oid` int,
`gid` int,
`price` decimal(10, 2) comment '价格',
`num` int
) comment '14.订单详情表';

CREATE TABLE `t_orderlog`  (
`id` int(11) primary key auto_increment,
`oid` int,
`type` int comment '对应订单状态类型',
`info` varchar(50) comment '内容',
`create_time` datetime
) comment '15.订单状态变化表';
```

难点：

1.超卖 -锁 [Redission分布式锁]

2.数据一致性--事务 [seata分布式事务]

3.超时-MQ死信机制

4.性能-MQ削峰填谷



锁：保证多个线程，同时只能有一个访问

事务：保证多个SQL语句，要么都成功要么都失败

## 四、编码

### 4.1 商品服务

DDD领域驱动设计 Domain Driver Design

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262255702.png)



什么时候可以使用DDD领域驱动：大型互联网

业务：快速变化

需求变更快，需求迭代快，业务扩展快的项目。

开发人员：3-5年经验

需要熟练应用过很多设计模式，有了这些经验才能理解为什么这么设计，才能不偷懒的去做这件事，否则很容易对领域造成污染。

时间：更充分

需要有充分的时间去划分业务，设计领域，需要更多的类，编写更多代码量

DDD领域驱动设计的分包：

- gate: 对外暴露的服务

- - rest：对外暴露的rest服务  => Controller层

- application：应用服务层  => service层
- domain：领域层 => entity层

- - item：商品分类
  - goods：商品

- infra：基础设施层 => DAO层

- - repo：仓储实现
  - mapper: 数据库交互

| DDD包结构                                                    |
| ------------------------------------------------------------ |
| ![image-20220929153100377](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220929153100377.png) |

ORM框架：操作数据库的框架

Mybatis(Mybatis-plus)、Hibernate(曾经的王者)、Spring Data JPA

SSH框架：Struts2+Spring+Hibernate

SSM框架：SpringMVC+Spring+Mybatis

SSS框架：SpringMVC+Spring+Spring Data JPA

SpringBoot框架：SpringBoot+Mybatis(Spring Data JPA)

Spring Data JPA:Spring开发的一套操作数据库的框架

Spring Data系列框架，都是Spring封装操作数据的各种框架的组合

比如：

操作Mysql数据库：Spring Data JPA

操作Redis数据库：Spring Data Redis

操作ElasticSearch：Spring Data ElasticSearch

Spring Data JPA基于Java 的JPA技术，实现的操作数据库的框架，基于注解实现数据库的操作

特性：自动生成对应表，封装了单表的操作，多种实现方式(JPQL、方法名解析查询、原生SQL、CRUD接口)

使用步骤：

1.依赖jar包

```  xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <!-- druid 数据源 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid-spring-boot-starter</artifactId>
        <version>1.2.6</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
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

    <!--整合 sentinel-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>

    <!-- sentinel整合nacos的数据源 -->
    <dependency>
        <groupId>com.alibaba.csp</groupId>
        <artifactId>sentinel-datasource-nacos</artifactId>
    </dependency>

    <!--链路追踪场景依赖-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-sleuth</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-zipkin</artifactId>
    </dependency>

    <!-- 单元测试依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>

    <!-- seata -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-seata</artifactId>
        <version>2.2.0.RELEASE</version>
        <exclusions>
            <exclusion>
                <groupId>io.seata</groupId>
                <artifactId>seata-spring-boot-starter</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>io.seata</groupId>
        <artifactId>seata-spring-boot-starter</artifactId>
        <version>1.4.2</version>
    </dependency>

    <!-- 添加common依赖 -->
    <dependency>
        <groupId>org.qf</groupId>
        <artifactId>cloud-common</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>

    <dependency>
        <groupId>org.qf</groupId>
        <artifactId>cloud-entity</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>

</dependencies>
```

2.实现配置

```  yaml
spring:
  application:
    name: cloud-goodsddd # 应用名称，到nacos注册服务时服务的名称默认就是应用名
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 # naocs注册中心服务的地址
        username: nacos
        password: nacos
    # sentinel配置
    sentinel:
      # 饥饿加载模式
      eager: true
      transport:
        # sentinel客户端与服务端通信的端口
        port: 8719
        # sentinel控制台的地址
        dashboard: localhost:8888
      web-context-unify: false
      # nacos数据源
      datasource:
        flow:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: ${spring.cloud.nacos.discovery.username}
            password: ${spring.cloud.nacos.discovery.password}
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-flow-rules
            rule-type: flow
        degrade:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: ${spring.cloud.nacos.discovery.username}
            password: ${spring.cloud.nacos.discovery.password}
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-degrade-rules
            rule-type: degrade
        param-flow:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: ${spring.cloud.nacos.discovery.username}
            password: ${spring.cloud.nacos.discovery.password}
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-param-rules
            rule-type: param-flow
        system:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: ${spring.cloud.nacos.discovery.username}
            password: ${spring.cloud.nacos.discovery.password}
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-system-rules
            rule-type: system
        authority:
          nacos:
            server-addr: ${spring.cloud.nacos.discovery.server-addr}
            username: ${spring.cloud.nacos.discovery.username}
            password: ${spring.cloud.nacos.discovery.password}
            groupId: SENTINEL_GROUP
            dataId: ${spring.application.name}-authority-rules
            rule-type: authority

  zipkin:
    base-url: http://localhost:9411/
    discovery-client-enabled: false
  sleuth:
    sampler:
      # 采样率，每秒钟到zikpin发送10个请求
      rate: 10
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: root
      password: root
      url: jdbc:mysql://127.0.0.1:3306/cloud2208?useUnicode=true&characterEncoding=utf8&useSSL=false
      #连接池配置
      max-active: 40
      web-stat-filter:
        enabled: true
        url-pattern: "/*"
        exclusions: "*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*"
      stat-view-servlet:
        url-pattern: "/druid/*"
        reset-enable: false
        login-username: admin
        login-password: zzjava
        enabled: true
  jpa:
    database: mysql
    hibernate:
      ddl-auto: update
    show-sql: true # 是否显示自动执行的SQL
server:
  port: 9010 # 服务消费者端口号
feign:
  sentinel:
    enabled: true

# logger日志
logging:
  level:
    org.qf.goodsddd.infra.repo: debug

seata:
  enabled: true
  enable-auto-data-source-proxy: true
  config:
    type: nacos
    nacos:
      server-addr: localhost:8848
      group: SEATA_GROUP
      username: nacos
      password: nacos
      data-id: seataServer.properties
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: localhost:8848
      group: SEATA_GROUP
      username: nacos
      password: nacos
```

3.编写实体类

```  java
@Data
@Entity //标识 映射类
@Table(name = "t_goods")//设置表名
public class Goods {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer itemId;
    private String title;
    private String promoWords;
    private String smallPic;
    private Double price;
    private Date createTime;
    private Integer status;
    private Integer stockNum;
}
```

``` java
@Data
@Entity
@Table(name = "t_items")
public class GoodsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String no;
}
```

编写DAO层

``` java
public interface GoodsDao extends JpaRepository<Goods, Integer> {
    //查询 JQPL:面向对象查询语言 表->类
    @Query(value = "from Goods")
    List<Goods> selectAll();

    //方法名解析查询:按照约定，编写方法名，就会自动生成SQL语句
    Goods getById(int id);

    //模糊查询
    List<Goods> getByTitleLike(String title);

    //原生SQL语句
    @Modifying//执行DML类型
    @Query(value = "update t_goods set stock_num=stock_num+:num where id=:id", nativeQuery = true)
    int updateStock(int num, int id);

}
```

> 解决InvalidDataAccessApiUsageException: Executing an update/delete query
>
> 注解SQL  在后面加上 `@Transactional` 让spirng来管理事务

``` java
public interface GoodsItemDao extends JpaRepository<GoodsItem,Integer> {

}
```

entity公共模块中的实体

``` java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoodsStockDto {
    private Integer id;//商品id
    private int num;//修改的库存数量
}
```

``` java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoodsDto {
    private Integer id;
    private Integer itemId;
    private Integer status;
    private Double price;
    private Integer stockNum;
}
```

``` java
@Data
public class OrderAddDto {
    private Integer gid;//商品id
    private Integer uaid;//用户收货地址
    private Integer num;//购买数量
    private Integer score;//抵扣积分
    private int ucid;//优惠券id
}
```

``` java
@Data
public class OrderDetailDto {
    private Integer id;
    private Integer oid;
    private Integer gid;
    private Integer status;
    private String title;
    private String smallPic;
    private Double price;//订单中商品价格
    private Integer num;//数量
}
```

``` java
@Data
public class OrderFlagDto {
    private Integer oid;
    private Integer flag;
}
```



业务层 接口

``` java
public interface GoodsService {
    //查询全部
    Response queryAll();
    //查询单个详情
    Response<Goods> queryOne(int id);
    //修改库存
    Response update(GoodsStockDto dto);
}
```

``` java
public interface GoodsItemService {
    //查询
    Response all();
}
```

业务层实现

``` java
/**
 * 商品服务实现
 *
 * @author zed
 * @date 2022/9/28
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsServiceImpl implements GoodsService {

    private final GoodsDao dao;

    @Override
    public Response queryAll() {
        return Response.ok(dao.findAll());
    }

    @Override
    public Response<Goods> queryOne(int id) {
        return Response.ok(dao.getById(id));
    }

    @Override
    @Transactional
    public Response update(GoodsStockDto dto) {
        log.info("修改{}的库存，更新{}", dto.getId(), dto.getNum());
        if (dao.updateStock(dto.getNum(), dto.getId()) > 0) {
            return Response.ok("修改库存成功");
        }
        return Response.fail("修改库存失败");
    }
}
```

``` java
/**
 * 商品分类服务实现
 *
 * @author zed
 * @date 2022/09/28
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GoodsItemServiceImpl implements GoodsItemService {
    private final GoodsItemDao dao;

    @Override
    public Response all() {
        return Response.ok(dao.findAll());
    }
}
```



4.编写控制器层

创建GoodsController

```  java
/**
 * 商品控制器
 *
 * @author zed
 * @date 2022/9/28
 */
@RestController
@RequestMapping("/service/goods")
@RequiredArgsConstructor
public class GoodsController {

    private final GoodsService service;

    @GetMapping("all")
    public Response all(){
        return service.queryAll();
    }
    @GetMapping("single")
    public Response<Goods> single(@RequestParam int id){
        return service.queryOne(id);
    }
    @PostMapping("update")
    public Response update(@RequestBody GoodsStockDto dto){
        return service.update(dto);
    }
}
```
``` java
@RestController
@RequestMapping("/server/goodsitem/")
@RequiredArgsConstructor
public class GoodsItemController {

    private final GoodsItemService service;
    @GetMapping("all")
    public Response all(){
        return service.all();
    }
}
```



5.使用

Spring Data JPA的核心：

1.接口：JpaRepository<实体类名,主键的数据类型>

提供：单表的增删改查分页和排序

2.JPQL:面向对象查询语言

Spring Data JPA-封装的面向对象查询语句

表名--->类名

字段--->属性

@Query 注解

```  java
@Query(value = "from Goods")
List<Goods> selectAll();
```



比如：

sql：select * from t_goods 

jpql：from Goods

3.方法名解析查询

根据规则，合理的命名方法名，可以自动根据方法名生成SQL语句

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262257225.png)



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262257375.png)

4.原生SQL语句

可以在注解@Query上面写SQL语句，但是需要设置属性：nativeQuery = true。否则只能写jpql

如果执行的sql语句是DML类型，那么必须使用一个注解：@Modifying//执行DML类型

```  java
@Modifying//执行DML类型
@Query(value = "update t_goods set stock_num=stock_num+:num where id=:id",nativeQuery = true)
int updateStock(int num,int id);
```

> 测试商品服务接口及DDD：领域驱动设计



### 4.2 订单服务

搬砖

下单接口-->考虑实现订单超时

下单接口的第一版实现：

Feign-API中的GoodsProvider

``` java
@FeignClient(value = "cloud-goodsddd")
public interface GoodsProvider {
    //查询商品
    @GetMapping("/server/goods/single")
    Response<Goods> single(@RequestParam int id);
    //更改库存
    @PostMapping("/server/goods/update")
    Response update(@RequestBody GoodsStockDto dto);
}
```

订单DAO层接口

``` java
// MyBatis 代码生成DAO层接口/xml/和实体类
OrderLogDao 自动生成
```

OrderDao

``` java
public interface OrderDao {

    @Update("update t_order set flag=#{flag} where id=#{id}")
    int updateFlag(@Param("id") int id,@Param("flag") int flag);

    // 新增订单的方法
    @Insert("insert into t_order(uid, uaid, total_money, pay_money, free_money, pay_type, flag, create_time, update_time, `no`) " +
            "values (#{uid},#{uaid},#{totalMoney},#{payMoney},#{freeMoney},#{payType},#{flag},#{createTime},#{updateTime},#{no})")
    int save(TOrder order);
}
```

OrderItemDao

``` java
public interface OrderItemDao {
    @Select("select oi.*,g.title,g.status,g.small_pic from t_orderitem oi left join t_goods g on oi.gid = g.id where oi.oid=#{oid}")
    List<OrderDetailDto> selectByOid(int oid);

    // 新增订单详情的方法
    @Insert("INSERT INTO t_orderitem(oid,gid,price,num) VALUES(#{oid},#{gid},#{price},#{num})")
    int insert(TOrderitem item);
}
```

注意：

> 配置文件中需要新增MQ的配置



系统常量类SystemConfig中添加下面的属性

并讲这个配置类抽到公共模块中

``` java
//商品状态 状态 101：未审核 102：审核成功 103：已上架 104：已下架 105：审核失败
public static final int GOODS_STATUS_ADD=101;
public static final int GOODS_STATUS_SUCCESS=102;
public static final int GOODS_STATUS_FAIL=105;
public static final int GOODS_STATUS_UP=103;
public static final int GOODS_STATUS_DOWN=104;

//订单超时的时间，时间单位是毫秒
public static final int ORDER_TIMEOUT=60000;//1分钟
```

公共模块中的订单状态枚举类

``` java
public enum OrderFlag {
    待付款(111),待发货(112), 已发货(113),已完成(114),已关闭(115),已超时(116),已确认(117),已评价(118);
    private int code;
    private OrderFlag(int c){
        code=c;
    }

    public int getCode() {
        return code;
    }
}
```



订单业务层接口

``` java
public interface OrderService {
    //商品详情-下单
    R save(OrderAddDto dto,int uid);

    //商品详情-下单-削峰填谷(MQ Redis)
    R save2(OrderAddDto dto,int uid);

    //查询我的订单
    R queryMy(int uid,int flag);
    //更改订单状态
    R updateFlag(OrderFlagDto dto);
    //取消订单
    R cancel(String no,int uid);
}
```

下订单实现

```  java
@Service
public class OrderServiceImpl implements OrderService {
    @Resource
    private OrderDao dao;
    @Resource
    private OrderLogDao logDao;
    @Resource
    private OrderItemDao itemDao;
    @Resource
    private RabbitTemplate rabbitTemplate;
    @Resource
    private GoodsProvider goodsProvider;
    @Resource
    private CouponProvider couponProvider;
    
    
    //难点：1.超卖-锁 2.多服务调用-数据一致性-事务 3.性能-Redis MQ 4.订单超时
    @Override
    public Response save(OrderAddDto dto,int uid) {
        //下单业务-流程
        //1.查询商品 跨服务远程调用
        Response rgoods=goodsProvider.single(dto.getGid());
        if(RCode.成功.getCode()==rgoods.getCode()){
            GoodsDto goodsDto= (GoodsDto) rgoods.getData();
            
            //2.验证库存 校验商品是否存在并查验商品状态
            if(goodsDto!=null && SystemConfig.GOODS_STATUS_UP==goodsDto.getStatus()){
                //检查库存 普通锁
                Lock lock=new ReentrantLock();
                lock.lock();
                try {
                    if (goodsDto.getStockNum() >= dto.getNum()) {
                        //库存够
                        
                        //3.生成订单
                        Order order = new Order();
                        order.setFlag(OrderFlag.待付款.getCode());
                        order.setTotalMoney(goodsDto.getPrice() * dto.getNum());
                        //优惠金额=积分抵扣+优惠券减免
                        order.setFreeMoney(dto.getScore() / 100.0);
                        //4.查询优惠信息，计算优惠
                        boolean isCoupon = false;
                        UserCouponDto couponDto = couponProvider.detail(dto.getUcid());
                        if (couponDto != null) {
                            //前端已经校验，为什么后端还需要校验，防止绕过前端
                            // 验证优惠券是否可用 1.有没有失效 2.满减规则 3.范围
                            if (couponDto.getCategory() == 51) {
                                //满减 满一定金额。才可以使用优惠券
                                if (order.getTotalMoney() >= couponDto.getLimitmoney()) {
                                    order.setFreeMoney(order.getFreeMoney() + couponDto.getDiscount());
                                    isCoupon = true;
                                }
                            } else if (couponDto.getCategory() == 52) {
                                //折扣 满一定金额才可以才可以打折
                                if (order.getTotalMoney() >= couponDto.getLimitmoney()) {
                                    order.setFreeMoney(order.getFreeMoney() + order.getTotalMoney() * couponDto.getDiscount());
                                    isCoupon = true;
                                }
                            } else if (couponDto.getCategory() == 53) {
                                //立减
                                order.setFreeMoney(order.getFreeMoney() + couponDto.getDiscount());
                                isCoupon = true;
                            }
                        }
                        //设置支付金额
                        order.setPayMoney(order.getTotalMoney() - order.getFreeMoney());
                        
                        order.setCreateTime(new Date());
                        order.setUaid(dto.getUaid());
                        order.setUpdateTime(new Date());
                        //操作数据库，新增订单
                        if (dao.insert(order) > 0) {
                            
                            //4.扣减库存
                            goodsProvider.update(new GoodsStockDto(goodsDto.getId(), dto.getNum()));
                            
                            //5.积分抵扣
                            if (dto.getScore() > 0) {
                                //MQ
                                rabbitTemplate.convertAndSend("",
                                                              RabbitMQConstConfig.Q_USERSCORE,
                                                              new MqMsgBo(SnowFlowUtil.getInstance().nextId(), RabbitMQConstConfig.MQTYPE_ORDERADD,
                                                                          new UserMqBo(uid, dto.getScore(), SystemConfig.USER_OP_SIGN, "", "")));
                            }
                            
                            //6.优惠券使用
                            if (isCoupon) {
                                couponProvider.update(couponDto.getId(), SystemConfig.USER_COUPON_USED);
                            }
                            
                            //7.新增订单详情
                            OrderItem item = new OrderItem(order.getId(), dto.getGid(), goodsDto.getPrice(), dto.getNum());
                            itemDao.insert(item);
                            //8.记录订单流水
                            logDao.insert(new OrderLog(order.getId(), OrderFlag.待付款.getCode(), "商品详情下单成功！"));
                            
                            return Response.ok(order);
                        }
                    } else {
                        //库存不够
                        return Response.fail("亲，商品库存不足！");
                    }
                }finally {
                    lock.unlock();
                }
                //分布式锁
                
                
            }else {
                return Response.fail("亲，商品不存在！");
            }
        }
        return RUtil.Response("亲，商品服务异常！");
    }
}
```

> 如果没有优惠券和积分扣除的服务可以暂时去掉 `//5.积分抵扣` 和 `//6.优惠券使用` 



查询我的订单

取消订单


### 4.3 分布式事务 

事务、分布式事务：解决数据操作(DML)的一致性

分布式事务：解决多个服务嵌套调用(涉及到数据库的数据改变)，保证要么都成功，要么都失败

比如：订单服务，远程调用商品服务、优惠券服务，保证三个服务要么都成功，要么都失败！

为什么需要使用分布式事务？

因为在服务的嵌套调用的时候，每个服务都有自己的Connection，所以之前的事务，只能保证同一个Connection下操作的一致性。

什么时候使用分布式事务：

服务嵌套调用，且服务(>1)都涉及到了DML语句的执行

为什么说：分布式事务是世界性难题？

原因：CAP



分布式事务解决方案：

1.2PC

1.准备阶段

2.确认阶段：提交或回滚

2.3PC

1.准备阶段

2.预提交阶段

3.确认阶段：提交或回滚

3.TCC

try:尝试执行

confrim:尝试成功，确认

cancel:尝试失败，取消

4.基于MQ

订单业务实现分布式事务：

订单服务：

入口方法上开启全局事务 `@GlobalTransactional`

所有被分布式事务协调的方法都需要本地事务的支持 `@Transactional`



### 4.4 订单超时

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262301173.png)

代码示例：

MQ的配置

``` java
package org.qf.cloud.neworder.config;

import org.qf.cloudcommon.config.RabbitMQConstConfig;
import org.qf.cloudcommon.config.SystemConfig;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
public class RabbitMQConfig {
    //创建队列，数据同步，这个队列中的消息消费后同步到数据库
    @Bean
    public Queue createq1(){
        return new Queue(RabbitMQConstConfig.Q_ORDER_SYNC);
    }
    
    // 死信队列 这个队列不需要有消费者
    // 消息进入到这个队列后 到了队列设置的过期时间会进入到死信交换机
    // 然后通过指定的routingkey 进入绑定的延迟队列createq3()=>Q_ORDER_TIMEOUT
    @Bean
    public Queue createq2(){
        HashMap<String,Object> params=new HashMap<>();
        params.put("x-dead-letter-exchange",RabbitMQConstConfig.EX_DEAD);
        params.put("x-dead-letter-routing-key",RabbitMQConstConfig.RK_DEAD_ORDERTO);
        params.put("x-message-ttl", SystemConfig.ORDER_TIMEOUT);
        return QueueBuilder.durable(RabbitMQConstConfig.Q_ORDER_DEAD).withArguments(params).build();
    }
    
    // 延迟队列
    @Bean
    public Queue createq3(){
        return new Queue(RabbitMQConstConfig.Q_ORDER_TIMEOUT);
    }
    
    // 创建交换器-下单的交换机 广播类型的
    // 进入这个交换机的消息 通过广播给同步队列和延迟队列
    @Bean
    public FanoutExchange createFe(){
        return new FanoutExchange(RabbitMQConstConfig.EX_ORDERADD);
    }
    
    // 死信交换机
    @Bean
    public DirectExchange createDe(){
        return new DirectExchange(RabbitMQConstConfig.EX_DEAD);
    }

    // 创建绑定 同步队列-他的消费者进行下单同步到数据库
    @Bean
    public Binding createB1(FanoutExchange fe){
        return  BindingBuilder.bind(createq1()).to(fe);
    }
    
    // 创建绑定 死信队列-没有消费者
    @Bean
    public Binding createB2(FanoutExchange fe){
        return  BindingBuilder.bind(createq2()).to(fe);
    }
    
    // 创建绑定 延迟队列 - 消息过期 设置订单超时和回退库存
    @Bean
    public Binding createB3(DirectExchange de){
        return  BindingBuilder.bind(createq3()).to(de).with(RabbitMQConstConfig.RK_DEAD_ORDERTO);
    }

}
```



### 4.5 下单操作2

RedisKeyConfig中新增常量值

``` java
//Redis 存储新订单
String ORDER_ADD="cp:orders";//Hash类型 存储所有的新订单 没有有效期
```

entity中新增订单传输对象

``` java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSyncDto implements Serializable {
    private String no;//订单编号
    private int ucid;//优惠券
    private int gid;// 商品ID
    private int num;// 商品数量
    private double price;// 商品价格
}
```

> 需要修改订单表结构：新增36位的订单编号no 可以使用雪花算法生成
>
> 数据库中新增字段



下单操作

```  java
// 下单第二版本->Redis->MQ->数据同步+延迟队列
@Override
@Transactional
@GlobalTransactional
public Response save2(OrderAddDto dto, int uid) {
    log.info("{}下单操作,商品ID是{}", uid, dto.getGid());
    Response<Goods> response = goodsProvider.single(dto.getGid());
    if (Objects.nonNull(response) && response.getCode() == 200) {
        Goods goods = response.getData();
        // 校验商品状态
        if (Objects.nonNull(goods) && goods.getStatus() == SystemConfig.GOODS_STATUS_UP) {
            // 添加分布式锁
            RLock lock = RedissionUtil.getLock(RedisKeyConfig.ORDER_LOCK + dto.getGid());
            try {
                if (lock.tryLock(10, TimeUnit.SECONDS)) {
                    // 校验商品库存够不够，在更新库存之前就加锁
                    if (dto.getNum() > goods.getStockNum()) {
                        return Response.fail("亲，库存不够了");
                    }
                    // 下订单
                    TOrder order = new TOrder();
                    order.setFlag(OrderFlag.待付款.getCode());
                    order.setCreateTime(new Date());
                    // 总价钱 = 商品价格 * 订购数量
                    Double totalMoney = goods.getPrice() * dto.getNum();
                    // 优惠价格 score/100[100个积分抵一元]
                    Double freeMoney = dto.getScore() / 100D;
                    // 支付价格 = 总价钱 - 优惠价格
                    Double payMoney = totalMoney - freeMoney;
                    order.setTotalMoney(totalMoney);
                    order.setFreeMoney(freeMoney);
                    order.setPayMoney(payMoney);
                    order.setPayType(SystemConfig.ALI_PAY);
                    order.setUaid(dto.getUaid());
                    order.setUid(uid);
                    // 新增订单编号字段
                    order.setNo(SnowFlowUtil.getInstance().nextId() + "");
                    // 把订单对象放入redis中
                    RedissionUtil.setHash(RedisKeyConfig.ORDER_ADD, order.getNo(), order);

                    // MQ发送消息给订单的交换机
                    OrderSyncDto orderSyncDto = new OrderSyncDto();
                    orderSyncDto.setGid(dto.getGid());
                    orderSyncDto.setNum(dto.getNum());
                    orderSyncDto.setPrice(goods.getPrice());
                    orderSyncDto.setUcid(dto.getUcid());
                    orderSyncDto.setNo(order.getNo());
                    rabbitTemplate.convertAndSend(RabbitMQConstConfig.EX_ORDERADD,
                                                  "",
                                                  new MqMsgBo(SnowFlowUtil.getInstance().nextId(), RabbitMQConstConfig.MQTYPE_ORDERSYNC, orderSyncDto));

                    return Response.ok("下单成功");
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        } else {
            return Response.fail("亲，未查询到该商品");
        }
    }
    return Response.fail("系统错误，下单失败！");
}
```



订单同步操作的消费者【监听器】

> 从Redis中取出来订单到数据库新增

``` java
/**
 * 订单同步侦听器
 *
 * @author zed
 * @date 2022/09/29
 */
public void handler(MqMsgBo bo){
    log.info("开始同步订单数据");
    //1.数据同步
    OrderSyncDto dto= (OrderSyncDto) bo.getData();
    if(Objects.nonNull(dto)){
        //查询Redis 的订单信息
        if(RedissionUtil.existsField(RedisKeyConfig.ORDER_ADD,dto.getNo())){
            TOrder order= (TOrder) RedissionUtil.getHash(RedisKeyConfig.ORDER_ADD,dto.getNo());
            if(dao.insert(order)>0){

                // RPC 修改库存，因为是减库存，所以商品数据应该是负的-
                goodsProvider.update(new GoodsStockDto(dto.getGid(), -dto.getNum()));

                // 6.优惠券使用

                //7.新增订单详情
                TOrderitem orderItem = new TOrderitem();
                orderItem.setGid(dto.getGid());
                orderItem.setOid(order.getId());
                orderItem.setNum(dto.getNum());
                orderItem.setPrice(dto.getPrice());
                itemDao.insert(orderItem);
                //8.记录订单流水
                TOrderlog orderlog = new TOrderlog();
                orderlog.setOid(order.getId());
                orderlog.setCreateTime(new Date());
                orderlog.setInfo("商品详情下单成功");
                orderlog.setType(OrderFlag.待付款.getCode());
                logDao.insert(orderlog);
                log.info(dto.getNo()+":订单数据同步结束");
                //9.删除
                RedissionUtil.delField(RedisKeyConfig.ORDER_ADD,dto.getNo());
            }else {
                log.info(dto.getNo()+":订单新增数据库失败！");
                //人工处理 一键处理
            }
        }else {
            log.info(dto.getNo()+":订单编号不正确");
        }
    }else {
        log.info("订单同步，消息内容为空！");
    }
}
```

MQ延时队列消费者【处理超时的订单】

> 1、需要增加根据订单no编号获取订单的方法
>
> 2、订单表中新增了no订单编号列
>
> 3、到Fanout类型的交换机中发消息时，不需要指定route-key
>
> ```java
> rabbitTemplate.convertAndSend(RabbitMQConstConfig.EX_ORDERADD,
>         "",
>         new MqMsgBo(SnowFlowUtil.getInstance().nextId(), RabbitMQConstConfig.MQTYPE_ORDERSYNC, orderSyncDto));
> ```

``` java
/**
 * @Description: 监听 队列消息 延迟消息 30分钟
 * @Author: zed
 * @Date: 2022/5/19 10:19
 */
@Slf4j
@Component
@RequiredArgsConstructor
@RabbitListener(queues = RabbitMQConstConfig.Q_ORDER_TIMEOUT)
public class OrderTimeOutListener {

    private final TOrderDao orderDao;
    private final TOrderitemDao orderitemDao;
    private final TOrderlogDao orderlogDao;
    private final GoodsProvider goodsProvider;

    @RabbitHandler
    @Transactional
    @GlobalTransactional
    public void handler(MqMsgBo msgBo) {
        // 超时的订单会进入这里
        log.info("处理超时的订单...");
        if (msgBo.getType() == RabbitMQConstConfig.MQTYPE_ORDERSYNC) {
            OrderSyncDto orderSyncDto = (OrderSyncDto) msgBo.getData();
            String no = orderSyncDto.getNo();
            TOrder order = orderDao.queryByNo(no);
            if (order.getFlag()== OrderFlag.待付款.getCode()) {
                // 修改订单状态
                orderDao.updateFlag(OrderFlag.已超时.getCode()+"",order.getId()+"");
                // 释放库存
                List<OrderDetailDto> detailDtos = orderitemDao.selectByOid(order.getId());
                // 修改每一个订单项中商品的库存
                detailDtos.forEach(dto-> goodsProvider.update(new GoodsStockDto(dto.getGid(),dto.getNum())));
                // 添加一条订单状态的记录
                TOrderlog orderlog = new TOrderlog();
                orderlog.setCreateTime(new Date());
                orderlog.setOid(order.getId());
                orderlog.setInfo("订单超时取消");
                orderlog.setType(OrderFlag.已超时.getCode());
                // 新增到数据库中
                orderlogDao.insert(orderlog);
                log.info("取消订单成功");
            }else {
                log.info("取消订单失败");
            }
        }
    }
}
```

> TIPS:
>
> 死信队列如何配置和TTL的时间单位
>
> ![image-20220929140318733](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220929140318733.png)

## 五、测试

| 测试下单接口                                                 |
| ------------------------------------------------------------ |
| ![image-20220929153001867](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220929153001867.png) |
| 查看MQ队列                                                   |
| ![image-20220929152932814](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220929152932814.png) |




::: details 本文代码
[代码仓库](http://heyige.cn/22081/cloud-parent)
:::

---
title: Redis
---

![redis](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/redis.png)


## 一、引言

### 1.1 数据库压力过大

> 由于用户量增大，请求数量也随之增大，数据压力过大



### 1.2 数据不同步

> 多台服务器之间，数据不同步     ----- session 共享问题



### 1.3 传统锁失效

> 多台服务器之间的锁，已经不存在互斥性了。     ------ 分布式锁的问题



## 二、Redis介绍

-----

### 2.1 NoSQL介绍

::: tip
- Redis就是一款NoSQL。    not  only   sql
- NoSQL -> 非关系型数据库 -> Not Only SQL。
- Key-Value：Redis。。。
- 文档型：ElasticSearch，Solr，Mongodb。。。
- 面向列：Hbase。。。
- 图形化：Neo4j。。。
- 除了关系型数据库都是非关系型数据库。
- NoSQL只是一种概念，泛指非关系型数据库，和关系型数据库做一个区分。
:::



### 2.2 Redis介绍
::: tip
有一位意大利人，在开发一款LLOOGG的统计页面，因为MySQL的性能不好，自己研发了一款非关系型数据库，并命名为Redis。Salvatore。
Redis（Remote Dictionary Server）即远程字典服务，Redis是由C语言去编写，Redis是一款基于Key-Value的NoSQL，而且Redis是基于内存存储数据的，Redis还提供了多种持久化机制，性能可以达到110000/s读取数据以及81000/s写入数据，Redis还提供了主从，哨兵以及集群的搭建方式，可以更方便的横向扩展以及垂直扩展。
:::

|                          Redis之父                           |
| :----------------------------------------------------------: |
| ![1586747559955](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586747559955.png) |



## 三、Redis安装

----

### 3.1 安装Redis

> Docker-Compose安装

```  yml
version: '3.1'
services:
  redis:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 6379:6379
```

注意： 这个镜像仓库 的 安装   默认 开启了 两种持久化方式rdb/aof，不同的安装方式，持久化开启情况不一样  



### 3.2 使用redis-cli连接Redis

> 进去Redis容器的内部
>
> docker exec -it 容器id bash
>
> 在容器内部，使用redis-cli连接
>
> redis-cli  在这个`/usr/local/bin`路径下 

进入容器内部后，可以使用容器自带的`redis-cli` 连接到redis的服务端

`redis-cli` 是redis自带的一个客户端工具，可以帮助我们连接到redis服务端，操作redis

|                           链接效果                           |
| :----------------------------------------------------------: |
| ![1586757208129](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586757208129.png) |



### 3.3 使用图形化界面连接Redis 

> 下载地址：https://github.com/lework/RedisDesktopManager-Windows/releases/download/2019.5/redis-desktop-manager-2019.5.zip
>
> 傻瓜式安装

|                     RedisDesktopManager                      |
| :----------------------------------------------------------: |
| ![1586757262085](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586757262085.png) |
|                     也可以使用Medis工具                      |
| ![image-20220527144825805](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527144825805.png) |



## 四、Redis常用命令【`重点`】

### 4.1 Redis存储数据的结构

> 常用的5种数据结构：
>
> - key-string：一个key对应一个值。
> - key-hash：一个key对应一个Map。
> - key-list：一个key对应一个列表。 有序的 可以重复的
> - key-set：一个key对应一个集合。 无序的 不可以重复的
> - key-zset：一个key对应一个有序的集合。  有序的 不可以重复的
>
> 另外三种数据结构：
>
> - HyperLogLog：计算近似值的。
> - GEO：地理位置。
> - BIT：一般存储的也是一个字符串，存储的是一个byte[]。

|                   五种常用的存储数据结构图                   |
| :----------------------------------------------------------: |
| ![1586759101828](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586759101828.png) |



> - key-string：最常用的，一般用于存储**一个值**。
>
> - key-hash：存储一个**对象**数据的。
>
> - key-list：使用list结构实现栈和队列结构。
>
> - key-set：交集，差集和并集的操作。
>
> - key-zset：排行榜，积分存储等操作。



### 4.2 string常用命令

> string常用操作命令

```  sh
#1.  添加值
set key value
set name zs 
#2. 取值
get key
get name
#3. 批量操作
mset key value [key value...]
mset k1 v1 k2 v2 k3 v3
mget key [key...]
mget k1 k2 k3
#4. 自增命令（自增1）
incr key 
set age 18
incr age 
#5. 自减命令（自减1）
decr key
decr age
#6. 自增或自减指定数量
incrby key increment
incrby age 2
decrby key increment
DECRBY age 2

#7. 设置值的同时，指定生存时间（每次向Redis中添加数据时，尽量都设置上生存时间）
setex key second value
setex address 30 zz      设置  address  zz 键值 存活30秒

ttl key    查看key 的 剩余存活时间
#8. 设置值，如果当前key不存在的话（如果这个key存在，什么事都不做，如果这个key不存在，和set命令一样）
setnx key value
setnx lock 1       
# 如果redis 内没有  lock 这个键  就执行成功   有的话就执行失败 
#9. 在key对应的value后，追加内容
append key value
append name zs      name 这个键对应的值后追加  zs

#10. 查看value字符串的长度
strlen key
```

> 设置key时同时指定过期时间
>
> 语法： set key value ex 秒
>
> 例子： `set foo bar ex 20`



### 4.3 hash常用命令

> hash常用命令
>
> 保存的value是一个对象 【属性和属性值】

![image-20220527153709533](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527153709533.png)

```  sh
#1. 存储数据
hset key field value

#2. 获取数据
hget key field

#3. 批量操作
hmset key field value [field value ...]
hmget key field [field ...]

#4. 自增（指定自增的值）
hincrby key field increment

#5. 设置值（如果key-field不存在，那么就正常添加，如果存在，什么事都不做）
hsetnx key field value

#6. 检查field是否存在
hexists key field 

#7. 删除key对应的field，可以删除多个
hdel key field [field ...]

#8. 获取当前hash结构中的全部field和value
hgetall key

#9. 获取当前hash结构中的全部field
hkeys key

#10. 获取当前hash结构中的全部value
hvals key

#11. 获取当前hash结构中field的数量
hlen key
```

hash应用场景

对象缓存

![image-20220527154554150](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527154554150.png)

> **模拟购物车**
>
> 用户id 为 key  商品id  为 field   商品数量 为  value
>
> 添加商品      hset cart:1001 10086 1  【hset cart:用户ID 商品ID  数量】
>
> 增加数量       HINCRBY cart:1001 10086 1 【HINCRBY cart:用户ID 商品ID 数量】
>
> 商品总数      HLEN cart:1001 【HLEN cart:用户ID】
>
> 删除商品     hdel cart:1001 10086 【 hdel cart:用户ID 商品ID】
>
> 获取购物车所有商品： HGETALL cart:1001   【HGETALL cart:用户ID 】





### 4.4 list常用命令

> list常用命令  有序的列表
>
> push 推，存数据
>
> pop 弹，取数据
>
> l  left：左边
>
> r  right: 右边

![image-20220527162802119](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527162802119.png)

```  sh
#1. 存储数据（从左侧插入数据，从右侧插入数据）
lpush key value [value ...]
rpush key value [value ...]

#2. 存储数据(如果key不存在，就什么都不做，如果key存在，就正常添加)
lpushx key value
rpushx key value

#3. 修改数据（在存储数据时，指定好你的索引位置,覆盖之前索引位置的数据，index超出整个列表的长度，也会失败）
lset key index value

#4. 弹栈方式获取数据（左侧弹出数据，从右侧弹出数据）
lpop key
rpop key

#5. 获取指定索引范围的数据（start从0开始，stop输入-1，代表最后一个，-2代表倒数第二个）
lrange key start stop

#6. 获取指定索引位置的数据
lindex key index

#7. 获取整个列表的长度
llen key

#8. 删除列表中的数据（他是删除当前列表中的count个value值，count > 0从左侧向右侧删除，count < 0从右侧向左侧删除，count == 0删除列表中全部的value）
lrem key count value

#9. 保留列表中的数据（保留你指定索引范围内的数据，超过整个索引范围被移除掉）
ltrim key start stop

#10. 将一个列表中最后的一个数据，插入到另外一个列表的头部位置
rpoplpush list1 list2
```

> list 模拟栈          statck = lpush + lpop 
>
> 模拟队列           queue = lpush + rpop     
>
> 
>
> 小明关注了     多个a,b,c三个公众号  三个公众号依次发消息   小明的id 为1 
>
> lpush   msg:1   1001        a公众号发id 为1001 的 消息
>
> lpush   msg:1   1002        b公众号发id 为1002 的 消息
>
> lpush   msg:1   1003        c公众号发id 为1003 的 消息



### 4.5 set常用命令

> set常用命令
>
> 无序不可重复

```  sh
#1. 存储数据
sadd key member [member ...]

#2. 获取数据（获取全部数据）
smembers key

#3. 随机获取一个数据（获取的同时，移除数据，count默认为1，代表弹出数据的数量）
spop key [count]

#4. 交集（取多个set集合交集）
sinter set1 set2 ...

#5. 并集（获取全部集合中的数据）
sunion set1 set2 ...

#6. 差集（获取多个集合中不一样的数据）
sdiff set1 set2 ...

# 7. 删除数据
srem key member [member ...]

# 8. 查看当前的set集合中是否包含这个值
sismember key member
```

>  应用场景  朋友圈点赞
>
> sadd like:messageid:1 1  messageid:1  消息 被  id为1 的用户点赞
>
>  SCARD like:messageid:1  获取点赞数
>
> SISMEMBER like:messageid:1 2    判断 id 为2 的  有没有给这个朋友圈信息点赞



> 抖音的关注模型
>
> zs关注的人     sadd zslike ls ww zl
>
> ls 关注的人    sadd lslike ww zl tq
>
> ww关注的人 sadd wwlike zs ls zl tq
>
> ww的粉丝    sadd wwfans  zs ls
>
> 
>
> zs和ls 共同关注的人  SINTER zslike lslike
>
> 
>
> zs可能认识的人
>
> SDIFF lslike zslike

![image-20220527170855737](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527170855737.png)



### 4.6 zset的常用命令

> zset常用命令
>
> 有序且不重复。每个元素都会关联一个double类型的分数，Redis通过分数进行从小到大的排序。
>
> 分数可以重复

```  sh
#1. 添加数据(score必须是数值。member不允许重复的。)
zadd key score member [score member ...]

#2. 修改member的分数（如果member是存在于key中的，正常增加分数，如果memeber不存在，这个命令就相当于zadd）
zincrby key increment member

#3. 查看指定的member的分数
zscore key member

#4. 获取zset中数据的数量
zcard key

#5. 根据score的范围查询member数量
zcount key min max

#6. 删除zset中的成员
zrem key member [member...]

#7. 根据分数从小到大排序，获取指定范围内的数据（withscores如果添加这个参数，那么会返回member对应的分数）
# 全部元素根据分数从小到大排序
# start 起始下标
# stop 终止下标
zrange key start stop [withscores]

#8. 根据分数从大到小排序，获取指定范围内的数据（withscores如果添加这个参数，那么会返回member对应的分数）
zrevrange key start stop [withscores]

#9. 根据分数的返回去获取member(withscores代表同时返回score，添加limit，就和MySQL中一样，如果不希望等于min或者max的值被查询出来可以采用 ‘(分数’ 相当于 < 但是不等于的方式，最大值和最小值使用+inf和-inf来标识)
zrangebyscore key min max [withscores] [limit offset count]

#   ZRANGEBYSCORE zset1 10 18 withscores limit 0 2    
取score  为  10 到  18 之间的 value（包含边界值10  和  18）  从 索引为 0 处开始取    取两个 

#   ZRANGEBYSCORE zset1 (10 (18 withscores limit 0 2 
取score  为  10 到  18 之间的 value（不包含边界值10  和  18）  从 索引为 0 处开始取    取两个

#  ZRANGEBYscore zset1 -inf +inf withscores limit 1  3
取 最小 score 到 最大score 的值   从 索引1  开始 取 ，取 3 个  

#10. 根据分数的返回去获取member(withscores代表同时返回score，添加limit，就和MySQL中一样)
#  返回有序集中指定分数区间内的所有的成员。有序集成员按分数值递减(从大到小)的次序排列。
#  成员按分数值递减的次序排列
zrevrangebyscore key max min [withscores] [limit offset count]
```

> rev: reverse 反转
>
> range: 范围
>
> score: 分数
>
> inf: 无穷，无限

| 分数的取值范围【可以是整数小数】                             |
| ------------------------------------------------------------ |
| ![image-20220823162427292](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208231624459.png) |
| 如果分数相同，就按元素的字典序排列【数值从小到大，字母从a到z】 |
| ![image-20220823162501748](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208231625036.png) |



### 4.7 key常用命令

> key常用命令

```  sh
#1. 查看Redis中的全部的key（pattern：* ，xxx*，*xxx）
keys pattern

#2. 查看某一个key是否存在（1 - key存在，0 - key不存在）
exists key

#3. 删除key
del key [key ...]

#4. 设置key的生存时间，单位为秒，设置还能活多久
expire key second
# 单位为毫秒,
pexpire key milliseconds

#5. 设置key的生存时间，单位为秒,设置能活到什么时间点    接收到的是unix 时间戳
expireat key timestamp 
# 单位为毫秒
pexpireat key milliseconds

#6. 查看key的剩余生存时间,单位为秒
#（-2 表示当前key不存在，-1 -表示当前key没有设置生存时间，其他数值表示具体剩余的生存时间）
ttl key
# 单位为毫秒
pttl key

#7. 移除key的生存时间（1 - 移除成功，0 - key不存在生存时间或者key不存在）
persist key

#8. 选择操作的库
select 0~15

#9. 移动key到另外一个库中
move key db

#10. 重命名key
rename key newkey：修改key的名称

#11. 查看key存储值的数据类型
type key：返回key所储存的值的类型
```

expirekey的**使用场景**：

> 1、限时的优惠活动
> 2、网站数据缓存
> 3、手机验证码
> 4、限制网站访客频率



key的**命名建议**：

> 1. key不要太长，尽量不要超过1024字节。不仅消耗内存，也会降低查找的效率
> 2. key不要太短，太短可读性会降低
> 3. 在一个项目中，key最好使用统一的命名模式，如     user:123:password
> 4. key区分大小写



### 4.8 库的常用命令

> db常用命令

```  sh
#1. 清空当前所在的数据库
flushdb

#2. 清空全部数据库
flushall

#3. 查看当前数据库中有多少个key
dbsize

#4. 查看最后一次操作的时间   Lastsave 命令返回最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示。
lastsave        返回   integer 值 

#5. 实时监控Redis服务接收到的命令   在一个连接上  使用 monitor 可以监控 别的连接对redis 的操作  
monitor
```



## 五、Java连接Redis【`重点`】

### 5.1 SpringBoot连接Redis

#### 5.1.1 创建Maven工程

> idea创建，创建时选择就选择单元测试/Lombok/NoSQL中的redis模块
>
> ![image-20220528110045879](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220528110045879.png)

#### 5.1.2 导入需要的依赖

```  xml
<dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
    
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

配置文件

```  yml
spring:
  # redis连接信息配置
  redis:
    host: 192.168.29.110
    port: 6379
    # springboot2.0以上的版本默认使用的是lettuce redis客户端
    lettuce:
      pool:
        max-active: 8
        max-wait: -1
        max-idle: 5
        min-idle: 0
```



#### 5.1.3 测试

```  java
@SpringBootTest
class RedisDemoApplicationTests {
    
    // 注入StringRedisTemplate 字串类型的redis操作模板类
    // 只能操作key/value都是字串类型的数据
    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @Test
    void contextLoads() {
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        // 设置数据
        ops.set("name1","仁康");
        // 获取值
        System.out.println(ops.get("name1"));

        // 设置值同时指定过期时间
        // ops.set("name2","李四",30,TimeUnit.SECONDS);

        // 如果key不存在时设置值并返回true，如果存在时什么都不在返回false
        // ops.setIfAbsent("name1","王五");

        // 如果key存在时设置值并返回true，如果不存在时什么都不在返回false
        // ops.setIfPresent("name1","王五");

        ops.append("name1","大好人");
        System.out.println(ops.get("name1"));
        // 获取字串的字符数
        System.out.println(ops.size("name1"));
    }

}
```



### 5.2 存储一个对象到Redis以json的形式

#### 5.2.1 准备一个User实体类

```  java
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 5700617907293625554L;
    private Integer id;
    private String name;
    private Date birthday;
}
```

配置序列化类，自动添加serialVersionUID

![image-20220527233621827](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527233621827.png)

> 实体类需要实现`Serializable`接口，
>
> 配置过以后，在类上使用 `alt+Enter`可以自动提示，生成`serialVersionUID`



#### 5.2.2 Redis配置类

一般需要配置 redis key/value的序列化方式

```  java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        //关联
        template.setConnectionFactory(factory);
        //设置key的序列化器
        template.setKeySerializer(RedisSerializer.string());
        //设置value的序列器
        template.setValueSerializer(RedisSerializer.json());
        return template;
    }

}
```

> RedisSerializer指定序列化的方式，常用的 string() 和 json()
>
> 本质上Spring自动注入的StringRedisTemplate就是指定了string()的序列化方式



#### 5.2.3 创建Demo测试类

```  java
@Test
void testJson(){
    ValueOperations<String, Object> ops = redisTemplate.opsForValue();
    User user = new User();
    user.setId(1);
    user.setName("董晨旭");
    user.setBirthday(new Date());
    ops.set("user1",user);
}
```



### 5.3 注意事项

![image-20220527234246659](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220527234246659.png)

```  xml
<!-- 需要引入jackson本质原因是因为redis使用了json序列化 -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>

<!-- 或者直接导入web模块，WEB模块中有依赖jackson-databind -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```



### 5.4 常用命令操作

> Java验证key的常用命令

```  java
@Test
void testKey(){
    ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
    RedisOperations<String, String> operations = ops.getOperations();
    System.out.println(operations.getExpire("aaa"));
    System.out.println(operations.getExpire("name1"));
    // 获取key的值数据类型
    DataType dataType = operations.type("name1");
    System.out.println(dataType);
}
```



## 六、Redis其他配置及集群【`重点`】

> redis默认配置文件中的内容

``` properties
# 他的意思是只允许指定的地址来连接
bind 127.0.0.1  

# 900秒 如果15分钟内有超过1个key发生变化，就会把redis内存中的数据持久化到磁盘
save 900 1 
# 300秒 如果5分钟内有超过10个key发生变化，就会把redis内存中的数据持久化到磁盘
save 300 10
# 60秒 如果1分钟内有超过10000个key发生变化，就会把redis内存中的数据持久化到磁盘
save 60 10000

# The filename where to dump the DB
# 默认持久化文件的名字是 dump.rdb
dbfilename dump.rdb

# requirepass 这个配置项是指定连接redis的密码的，默认没有开启
# 如果我们需要指定密码，就把这一项开启，设置一个密码就行
# requirepass foobared
```



> 修改yml文件，以方便后期修改Redis配置信息
>
> ./conf redis的配置文件目录
>
> ./data redis的数据文件
>
> command 启动redis并指定配置文件

```  yml
version: '3.1'
services:
  redis:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 6379:6379
    volumes:
      - ./conf/redis.conf:/usr/local/redis/redis.conf
      - ./data:/data
    command: ["redis-server","/usr/local/redis/redis.conf"]
```



### 6.1 Redis的AUTH

> 通过修改Redis的配置文件，实现Redis的密码校验，
>
> 需要在docker-compose.yml文件所在目录中创建 `conf` 和 `data`目录
>
> ![image-20220824095424074](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208240954353.png)
>
> 进入conf目录，创建redis.conf文件
>
> vi redis.conf
>
> 配置文件内容如下

```  conf
requirepass 密码
```

修改配置文件后重启redis

``` sh
# 先停止redis:  
docker-compose down
# 重新启动: 
docker-compose up -d
```



> 三种客户端的连接方式
>
> - redis-cli：在输入正常命令之前，先输入auth 密码即可。
>
> ![image-20220529183957294](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529183957294.png)
>
> 看到上面的提示，就表示要求输入密码，输入 `auth 你的密码`
>
> ![image-20220529184051503](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529184051503.png)
>
> - 图形化界面：在连接Redis的信息中添加上验证的密码。
>
> ![image-20220529184219439](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529184219439.png)
>
> - Java客户端：修改application.yml 文件指定redis的password
>

```  yml
spring:
  redis:
    password: 123
    host: 192.168.174.128
    port: 6379
```



### 6.2 Redis的事务

> Redis的事务：一次事务操作，该成功的成功，该失败的失败。
>
> 先开启事务，执行一些系列命令，但是命令不会立即执行，会被放在一个队列中，如果你执行事务，那么这个队列中的命令全部执行，如果取消了事务，一个队列中的命令全部作废。
>
> - 开启事务：multi
> - 输入要执行的命令：被放入到一个队列中
> - 执行事务：exec
> - ![image-20220824100653183](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208241006555.png)
> - 取消事务：discard
> - ![image-20220824100825780](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208241008107.png)
>
> Redis的事务要想发挥功能，需要配置watch监听机制
>
> ![image-20220529185006485](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529185006485.png)
>
> 在开启事务之前，先通过watch命令去监听一个或多个key，在开启事务之后，如果有其他客户端修改了我监听的key，事务会自动取消。
>
> | 当前客户端                                                   |
> | ------------------------------------------------------------ |
> | ![image-20220530101115996](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220530101115996.png) |
>
> 如果执行了事务，或者取消了事务，watch监听自动消除，一般不需要手动执行unwatch。



### 6.3 Redis持久化机制

#### 6.3.1 RDB

> RDB是Redis默认的持久化机制
>
>  - RDB持久化文件，速度比较快，而且存储的是一个二进制的文件，传输起来很方便。
>
>  - RDB持久化的时机：
>
>     save 900 1：在900秒内，有1个key改变了，就执行RDB持久化。
>
>     save 300 10：在300秒内，有10个key改变了，就执行RDB持久化。
>
>     save 60 10000：在60秒内，有10000个key改变了，就执行RDB持久化。
>
> - RDB无法保证数据的绝对安全。

| 关闭REDIS服务时可以指定，是否持久化[默认不持久化]            |
| ------------------------------------------------------------ |
| ![image-20220529190728717](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529190728717.png) |

重启redis可以验证，redis从磁盘恢复数据到内存中了。



#### 6.3.2 AOF

> AOF持久化机制默认是关闭的，Redis官方推荐同时开启RDB和AOF持久化，更安全，避免数据丢失。
>
> - AOF持久化的速度，相对RDB较慢的，存储的是一个文本文件，到了后期文件会比较大，传输困难。
>
> - AOF持久化时机。
>
>    appendfsync always：每执行一个写操作，立即持久化到AOF文件中，性能比较低。
>    appendfsync everysec：每秒执行一次持久化。
>    appendfsync no：会根据你的操作系统不同，环境的不同，在一定时间内执行一次持久化。
>
> - AOF相对RDB更安全，推荐同时开启AOF和RDB。

AOF相关的配置

``` sh
appendonly no
appendfilename "appendonly.aof"

# If unsure, use "everysec".
# 如果你不确定 aof持久化使用哪些配置，建议使用 everysec
# appendfsync always
# everysec 每秒中持久化一次
appendfsync everysec
# appendfsync no
```

修改为如下的配置内容

``` sh
# 开启AOF持久化
appendonly yes
appendfilename "redis.aof"
```



#### 6.3.3 注意事项

> 同时开启RDB和AOF的注意事项：
>
> 如果同时开启了AOF和RDB持久化，那么在Redis宕机重启之后，需要加载一个持久化文件，优先选择AOF文件。
>
> 如果先开启了RDB，再次开启AOF，如果RDB执行了持久化，那么RDB文件中的内容会被AOF覆盖掉。
>
> 或者是：建议redis配置完成后，同时开启RDB和AOF备份！



### 6.4 Redis的主从架构

> 单机版 Redis存在读写瓶颈的问题      110000/s 的 读    81000/s  的写 

|                           主从架构                           |
| :----------------------------------------------------------: |
| ![image-20220824110848902](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208241108519.png) |

> 指定docker-compose.yml文件

```  yml
version: "3.1"
services:
  redis1:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis1
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7001:6379
    volumes:
      - ./conf/redis1.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]
  redis2:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis2
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7002:6379
    volumes:
      - ./conf/redis2.conf:/usr/local/redis/redis.conf
    links:
      - redis1:master
    command: ["redis-server","/usr/local/redis/redis.conf"]
  redis3:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis3
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7003:6379
    volumes:
      - ./conf/redis3.conf:/usr/local/redis/redis.conf
    links:
      - redis1:master
    command: ["redis-server","/usr/local/redis/redis.conf"]
```

![image-20220529193406617](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529193406617.png)

```  sh
#redis1.conf配置文件中什么都不用写

# redis2.conf和redis3.conf从节点配置内容如下
replicaof master 6379
```

验证：到redis1中写数据，redis2/redis3中会同步数据。

| 主从示例                                                     |
| ------------------------------------------------------------ |
| ![image-20220529193950243](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529193950243.png) |

> 演示： 在redis1中写数据，redis2和redis3中会自动同步

主从结构： 读写分离性能扩展   容灾恢复，但是还是存在单点故障问题，就是主节点挂掉 ，redis 服务不可用了，剩下的从节点无法进行写操作，咱们希望的是  主节点挂掉，从节点能够上位。

解决这个问题需要使用哨兵模式。



### 6.5 哨兵

> 哨兵可以帮助我们解决主从架构中的单点故障问题

|                           添加哨兵                           |
| :----------------------------------------------------------: |
| ![image-20220824114645123](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208241146444.png) |


> 1、准备哨兵的配置文件，在conf目录中编写
>
> 主节点配置：sentinel1.conf   
>
> 从节点配置：sentinel2.conf   sentinel3.conf

```  sh
# 禁止保护模式
protected-mode no
# 哨兵需要后台启动
daemonize yes
# 指定Master节点的ip和端口（主节点配置）
sentinel monitor master localhost 6379 2
# 指定Master节点的ip和端口（从节点配置）
sentinel monitor master master 6379 2
# 哨兵每隔多久监听一次redis架构
sentinel down-after-milliseconds master 10000

#所有相关的端口号需要在防火墙开启比如 7001 7002 7003 26379（是哨兵通信端口也得开 在哨兵配置文件可以看到） 
```

| 配置文件目录                                                 |
| ------------------------------------------------------------ |
| ![image-20220529200303169](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529200303169.png) |
|                                                              |

完整的配置文件内容如下：

| 配置文件       | 内容                                                         |
| -------------- | ------------------------------------------------------------ |
| redis1.conf    |                                                              |
| redis2.conf    | replicaof master 6379                                        |
| redis3.conf    | replicaof master 6379                                        |
| sentinel1.conf | protected-mode no<br/> daemonize yes<br/>sentinel monitor master localhost 6379 2<br/>sentinel down-after-milliseconds master 10000 |
| sentinel2.conf | protected-mode no<br/>daemonize yes<br/>sentinel monitor master master 6379 2<br/>sentinel down-after-milliseconds master 10000 |
| sentinel3.conf | protected-mode no<br/>daemonize yes<br/>sentinel monitor master master 6379 2<br/>sentinel down-after-milliseconds master 10000 |



> 修改了以下docker-compose.yml，为了可以在容器内部使用哨兵的配置

```  yml
version: "3.1"
services:
  redis1:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis1
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7001:6379
    volumes:
      - ./conf/redis1.conf:/usr/local/redis/redis.conf
      - ./conf/sentinel1.conf:/data/sentinel.conf        # 添加的内容
    command: ["redis-server","/usr/local/redis/redis.conf"]
  redis2:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis2
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7002:6379
    volumes:
      - ./conf/redis2.conf:/usr/local/redis/redis.conf
      - ./conf/sentinel2.conf:/data/sentinel.conf        # 添加的内容
    links:
      - redis1:master
    command: ["redis-server","/usr/local/redis/redis.conf"]
  redis3:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis3
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7003:6379
    volumes:
      - ./conf/redis3.conf:/usr/local/redis/redis.conf
      - ./conf/sentinel3.conf:/data/sentinel.conf        # 添加的内容 
    links:
      - redis1:master
    command: ["redis-server","/usr/local/redis/redis.conf"]
```

> 启动docker-compose， `docker-compose up -d `
>
> 然后在Redis容器内部手动启动哨兵即可  `redis-sentinel sentinel.conf`  **三台机器的哨兵都需要启动**
>
> ![image-20220529200653149](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220529200653149.png)

哨兵模式  主节点 挂掉之后 在从机中选出新的主节点，哪个从机会被选为新的主节点？   

根据 配置文件的replica-priority  100    这个配置  这个值越小 优先级越高

> 验证哨兵：redis主节点停止后，redis会重新选择一个节点作为主节点



### 6.6 Redis的集群

> 前面的主从复制  解决了  redis 的  读写压力问题  ，分出了两个从节点 分担了 读取数据的压力
>
> 哨兵  解决了单点故障的问题  当有一个 master 节点 挂掉了  自动投票选举  出来一个 master  保证 主从架构正常执行  但是 这种架构还有一种问题  就是 存储的数据有限 ，也就是当数据量很大的时候  一个redis 存不下，上面的 一个 redis 主节点  无法存储这么多的数据  此时  就需要集群了 
>
> Redis集群在保证主从加哨兵的基本功能之外，还能够提升Redis存储数据的能力。

| Redis集群架构图                                              |
| ------------------------------------------------------------ |
| ![1586932636778](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586932636778.png) |

> 注意 这里的从节点 跟上面的一主二从的 从节点不一样  ，这里的从节点 只负责备份主节点的数据 不负责分担主节点的读压力，而是一直看主节点干活  如果发现主节点挂掉了  马上顶替主节点干活
>
> 那么 如果某个节点上的一些数据 查询频率太高 也可以针对某一个节点 搭建 读写分离的那种 主从
>
> 主从  哨兵  和 集群 是三个概念 
>
> 集群中的节点  超过半数挂掉 那么 整个集群服务就不可用了
>
> 如果某一个主节点挂掉   那么从节点顶上来做主节点  这个过程 是由其他节点选举
>
> 如果某一个主从节点都挂掉了  redis集群是否还能提供服务要看下面的配置
>
> cluster-require-full-coverage yes  那么 整个集群都挂掉 
>
> cluster-require-full-coverage no   该节点不可用  该节点上的插槽都不能使用  其他节点正常使用

```  text
正常的心跳数据包携带节点的完整配置，它能以幂等方式来更新配置。如果采用 16384 个插槽，占空间 2KB （16384/8）；如果采用 65536 个插槽，占空间 8KB (65536/8)。
Redis Cluster 不太可能扩展到超过 1000 个主节点，太多可能导致网络拥堵。
16384 个插槽范围比较合适，当集群扩展到1000个节点时，也能确保每个master节点有足够的插槽，
8KB 的心跳包看似不大，但是这个是心跳包每秒都要将本节点的信息同步给集群其他节点。比起 16384 个插槽，头大小增加了4倍，ping消息的消息头太大了，浪费带宽。
```



> 创建docker_redis_cluster目录，准备yml文件

```  yml
# docker-compose.yml
version: "3.1"
services:
  redis1:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis1
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7001:7001
      - 17001:17001
    volumes:
      - ./conf/redis1.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]
  redis2:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis2
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7002:7002
      - 17002:17002
    volumes:
      - ./conf/redis2.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]  
  redis3:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis3
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7003:7003
      - 17003:17003
    volumes:
      - ./conf/redis3.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]  
  redis4:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis4
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7004:7004
      - 17004:17004
    volumes:
      - ./conf/redis4.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]  
  redis5:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis5
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7005:7005
      - 17005:17005
    volumes:
      - ./conf/redis5.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]  
  redis6:
    image: daocloud.io/library/redis:5.0.7
    restart: always
    container_name: redis6
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 7006:7006
      - 17006:17006
    volumes:
      - ./conf/redis6.conf:/usr/local/redis/redis.conf
    command: ["redis-server","/usr/local/redis/redis.conf"]  
```

> 配置文件，创建redis1.conf redis2.conf ... redis6.conf 
>
> 配置文件内容类似，需要修改为不同的端口

```  sh
# redis1.conf
# 指定redis的端口号
port 7001
# 开启Redis集群
cluster-enabled yes
# 集群信息的文件
cluster-config-file nodes-7001.conf
# 集群的对外ip地址【这个IP地址需要改成自己的】
cluster-announce-ip 192.168.29.110
# 集群的对外port
cluster-announce-port 7001
# 集群的总线端口
cluster-announce-bus-port 17001
```

替换操作可以使用vi编辑器的替换命令

`:.,%s/7001/7002/g` 

进入尾行模式 `.,` 表示同从第一行到最后一行 `%s` 字符替换 

`/7701 要替换的字串`  `/7002 替换为`  `/g` 全局替换 

> 通过docker-compose启动了6个Redis的节点。 切记开启所有相关的端口号  重启防火墙  重启docker服务
>
> 随便跳转到一个容器内部，使用redis-cli管理集群



![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220531094904.png)

```  sh
# 【这个IP地址需要改成自己的】
redis-cli --cluster create 192.168.29.110:7001 192.168.29.110:7002  192.168.29.110:7003  192.168.29.110:7004  192.168.29.110:7005  192.168.29.110:7006 --cluster-replicas 1
```

| redis集群配置完成如图                                        |
| ------------------------------------------------------------ |
| ![image-20220824150636354](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208241506258.png) |

> 验证：操作集群
>
> ![image-20220824151707518](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208241517121.png)

```  sh
redis-cli 操作集群

# -c 实现自动重定向
# -h 指定IP地址 【这个IP地址需要改成自己的】
# -p 指定端口号
redis-cli -c -h 192.168.29.110 -p 7001 
```



### 6.7 Java连接Redis集群

> SpringBoot连接Redis集群，只需要修改配置文件，增加集群配置即可

SpringBoot配置文件

```  yml
spring:
  redis:
    cluster:
      # 集群IP和PORT
      nodes:
        - 192.168.29.110:7001
        - 192.168.29.110:7002
        - 192.168.29.110:7003
        - 192.168.29.110:7004
        - 192.168.29.110:7005
        - 192.168.29.110:7006
      # 跨集群执行命令时要遵循的最大重定向数
      max-redirects: 3
    lettuce:
      pool:
        max-active: 1024
        max-wait: 10000
        max-idle: 10
        min-idle: 5
```

正常测试

```  java
@Test
void testCluster() {
    ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
    ops.set("name", "哈哈");
}
```

Redis管道方式测试【了解】

```  java
@Test
void testPipeline() {
    // 管道命令
    SessionCallback<String> sessionCallback = new SessionCallback<String>() {
        @Override
        public String execute(RedisOperations operations) throws DataAccessException {
            for (int i = 0; i < 1000; i++) {
                operations.boundValueOps("cluster:" + i).set("集群" + i);
            }
            return null;
        }
    };
    redisTemplate.executePipelined();
}
```



## 七、Redis常见问题【`重点`】

### 7.1 key的生存时间到了，Redis会立即删除吗？

> 不会立即删除。
>
> - 定期删除：Redis每隔一段时间就去会去查看Redis设置了过期时间的key，会再100ms的间隔中默认查看3个key。
>
> - 惰性删除：如果当你去查询一个已经过了生存时间的key时，Redis会先查看当前key的生存时间，是否已经到了，直接删除当前key，并且给用户返回一个空值。



### 7.2 Redis的淘汰机制

> 在Redis内存已经满的时候，添加了一个新的数据，执行淘汰机制。
>
> - volatile-lru：在内存不足时，Redis会在设置过了生存时间的key中干掉一个最近最少使用的key。
>- allkeys-lru：在内存不足时，Redis会再全部的key中干掉一个最近最少使用的key。
> - volatile-lfu：在内存不足时，Redis会再设置过了生存时间的key中干掉一个最近最少频次使用的key。
>- allkeys-lfu：在内存不足时，Redis会再全部的key中干掉一个最近最少频次使用的key。
> - volatile-random：在内存不足时，Redis会再设置过了生存时间的key中随机干掉一个。
>- allkeys-random：在内存不足时，Redis会再全部的key中随机干掉一个。
> - volatile-ttl：在内存不足时，Redis会在设置过了生存时间的key中干掉一个剩余生存时间最少的key。
>- noeviction：（默认）在内存不足时，直接报错。
> 
>[指定淘汰机制的方式：maxmemory-policy 具体策略，设置Redis的最大内存：maxmemory 字节大小]()
> 内存配置
> (1)、内存设置
>
>   ①、如果不设置内存大小或者设置内存大小为0，在64位操作系统下不限制内存大小，在32位操作系统下最多使用3GB内存。
>   ②、Redis一般推荐设置内存为最大物理内存的四分之三。
>
> (2)、修改文件配置
>   修改maxmemory大小，单位字节
> 



### 7.3 缓存的常问题

#### 7.3.1 缓存穿透问题

> 缓存穿透
>
> 个人理解：指查询一个一定不存在的数据，由于缓存是不命中的，将去查询数据库，但是数据库也没有这个数据，更糟糕的是我们没有把这次查询的  null 结果  写入缓存，这将导致这个不存在的数据每次查询  都走数据库。 缓存也就没有意义了
>
> 风险: 利用不存在的数据 进行攻击  数据库瞬时压力增大  可能导致崩溃
>
> 解决：**将null 结果放入 缓存 ，最好 加入一个  过期时间**

|                           缓存穿透                           |
| :----------------------------------------------------------: |
| ![1586949401099](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586949401099.png) |



#### 7.3.2 缓存击穿问题

> 缓存击穿
>
> 个人理解：对于某些热点数据   可能设置了过期时间  或者 在 第一次访问之前缓存中没有  在某一刻的高并发访问  都没有命中缓存，都查询了数据库  这称之为   缓存击穿
>
> 解决方案：加锁
>
> ​					预先设置下热点数据



|                           缓存击穿                           |
| :----------------------------------------------------------: |
| ![1586949585287](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586949585287.png) |



#### 7.3.3 缓存雪崩问题

> 缓存雪崩
>
> 个人理解：我们在设置缓存的 key 时   采用了相同的过期时间   导致缓存在某一时刻同时失效 请求全部转到数据库 数据库瞬时压力大  造成雪崩
>
> 解决方案：设置key 的时候   在原有的过期时间上  加上一个   随机值  比如   1-5 分钟的随机值  这样 每一个缓存key 的过期时间 重复率就会降低  

|                           缓存雪崩                           |
| :----------------------------------------------------------: |
| ![1586949725602](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586949725602.png) |



#### 7.3.4 缓存倾斜问题

> 缓存倾斜

|                           缓存倾斜                           |
| :----------------------------------------------------------: |
| ![1586949955591](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1586949955591.png) |



## 八、Redis的使用场景

缓存和数据库的一致性问题，最终解决方案：延迟双删！



redis延迟双删的策略

1.为什么要进行延迟双删
一般我们在更新数据库数据时，需要同步redis中缓存的数据
所以存在两种方法：
（1）第一种方案：先执行update操作，再执行缓存清除。
（2）第二种方案：先执行缓存清除，再执行update操作。

弊端:当存在并发请求时，很容易出现问题
（1）第一种方案：当请求1执行update操作后，还未来得及进行缓存清除，此时请求2查询到并使用了redis中的旧数据。
（2）第二种方案：当请求1执行清除缓存后，还未进行update操作，此时请求2进行查询到了旧数据并写入了redis。

2.如何实现延迟双删
所以此时我们需要使用第三种方案：
先进行缓存清除，再执行update，最后（延迟N秒）再执行缓存清除。

3.需要注意的点
上述中（延迟N秒）的时间要大于一次写操作的时间，一般为3-5秒。
原因：如果延迟时间小于写入redis的时间，会导致请求1清除了缓存，但是请求2缓存还未写入的尴尬。。。




---
title: 分布式锁
---



## 一、为什么需要用分布式锁 

集群下，普通的锁，无法解决问题

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262239310.png)



集群下，保证安全需要使用分布式锁

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262239230.png)



## 二、Redis实现分布式锁 

Redisson内部封装的RedLock实现分布式锁

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262239973.png)



## 三、Zookeeper实现分布式锁 

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206262239308.png)



## 四、RedLock红锁

什么是RedLock

> 在第二部分，我们详细介绍了基于 redis 的分布式锁的实现：
>
> 但就“高可用”来说，似乎仍然有所欠缺，那就是如果他所依赖的 redis 是单点的，如果发生故障，则整个业务的分布式锁都将无法使用，即便是我们将单点的 redis 升级为 redis 主从模式或集群，对于固定的 key 来说，master 节点仍然是独立存在的，由于存在着主从同步的时间间隔，如果在这期间 master 节点发生故障，slaver 节点被选举为 master 节点，那么，master 节点上存储的分布式锁信息可能就会丢失，从而造成竞争条件。
>
> 那么，如何避免这种情况呢？
>
> redis 官方给出了基于多个 redis 集群部署的高可用分布式锁解决方案 — RedLock

> RedLock是基于redis实现的分布式锁，它能够保证以下特性：
>
> 互斥性：在任何时候，只能有一个客户端能够持有锁；
>
> 避免死锁：当客户端拿到锁后，即使发生了网络分区或者客户端宕机，也不会发生死锁；（利用key的存活时间）
>
> 容错性：只要多数节点的redis实例正常运行，就能够对外提供服务，加锁或者释放锁；
>
> 而非redLock是无法满足互斥性的，上面已经阐述过了原因。



RedLock 的加解锁过程

> 基于上述理论，我们知道，RedLock 是在多个 Redis 集群上部署的一种分布式锁的实现方式，他有效避免了单点问题。
>
> 假设我们有 N 个 Redis 服务或集群，RedLock 的加锁过程就如下所示：
>
> 1. client 获取当前毫秒级时间戳，并设置超时时间 TTL
> 2. 依次向 N 个 Redis 服务发出请求，用能够保证全局唯一的 value 申请锁 key
> 3. 如果从 N/2+1 个 redis 服务中都获取锁成功，那么，本次分布式锁的获取被视为成功，否则视为获取锁失败。
> 4. 如果获取锁失败，或执行达到 TTL，则向所有 Redis 服务都发出解锁请求。

| RedLock 的加锁过程                                           |
| ------------------------------------------------------------ |
| ![preload](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/66cba4ddac439a8f06dd40389d843ef4.png) |

Redission实现的分布式锁

> java 语言中，redisson 包实现了对 redlock 的封装，主要是通过 redis client 与 lua 脚本实现的，之所以使用 lua 脚本，是为了实现加解锁校验与执行的事务性。



## 五、Redission使用

添加redisson依赖

``` xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.16.4</version>
</dependency>
```



通过查看源码了解到

``` java
// Redisson类中的代码
public static RedissonClient create() {
    Config config = new Config();
    config.useSingleServer()
        .setAddress("redis://127.0.0.1:6379");
    return create(config);
}

/**
 * Create sync/async Redisson instance with provided config
 *
 * @param config for Redisson
 * @return Redisson instance
 */
public static RedissonClient create(Config config) {
    return new Redisson(config);
}
```



编写工具类

``` java
import org.redisson.Redisson;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;

import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class RedissonUtils {
    public static RedissonClient client;
    static {
        //1.实例化配置对象
        Config config=new Config();
        //2.设置Redis服务器的地址和密码
        config.useSingleServer().setAddress("redis://110.40.192.129:6380").setPassword("zzjava");
        //3.实例化客户端对象
        client=Redisson.create(config);
    }
    //String类型
    //添加字符串类型
    public static void setStr(String key,Object val){
        client.getBucket(key).set(val);
    }
    public static void setStr(String key,Object val,long seconds){
        client.getBucket(key).set(val,seconds, TimeUnit.SECONDS);
    }
    public static void addIncr(String key){
        int i= (int) client.getBucket(key).get();
        i++;
        client.getBucket(key).set(i);
    }
    //BitMap
    public static void setBitMap(String key,int index){
        client.getBitSet(key).set(index,true);
    }
    //List
    public static void setList(String key,Object val){
        client.getList(key).add(val);
    }
    public static void setList(String key,int index,Object val){
        client.getList(key).add(index,val);
    }
    public static void setList(String key, List<Object> vals){
        client.getList(key).addAll(vals);
    }
    public static Object getList(String key,int index){
        return client.getList(key).get(index);
    }
    public static Object getList(String key){
        return client.getList(key).remove(0);
    }
    //获取bitmap1的数量
    public static long getBitMap(String key){
        return client.getBitSet(key).cardinality();
    }
    public static void expire(String key,long seconds){
        client.getKeys().expire(key,seconds,TimeUnit.SECONDS);
    }
    public static long ttl(String key){
        return client.getKeys().remainTimeToLive(key);
    }
    public static void setSet(String key,String val)
    {
        client.getSet(key).add(val);
    }
    //获取字符串类型
    public static Object getStr(String key){
        return client.getBucket(key).get();
    }
    //Set类型
    public static Set<Object> getSet(String key){
        return client.getSet(key).readAll();
    }
    public static int getSize(String key){
        return client.getSet(key).size();
    }
    public static boolean exists(String key,Object val){
        return client.getSet(key).contains(val);
    }
    //Hash类型
    public static void setHash(String key,String field,Object obj){
        client.getMap(key).put(field,obj);
    }
    public static Object getHash(String key,String field){
        return client.getMap(key).get(field);
    }
    public static void delField(String key,String field){
        client.getMap(key).remove(field);
    }
    //删除
    public static void delSet(String key,Object val){
        client.getSet(key).remove(val);
    }
    public static void delKey(String... keys){
        client.getKeys().delete(keys);
    }
    //校验key
    public static boolean existsField(String key,String field){
        return client.getMap(key).containsKey(field);
    }
    public static boolean checkKey(String key){
        return client.getKeys().countExists(key)>0;
    }
    public static String getKey(String key){
        Iterator<String> keys=client.getKeys().getKeys().iterator();
        while (keys.hasNext()){
            String k=keys.next();
            if(k.startsWith(key)){
                return k;
            }
        }
        return null;
    }
    /**
     * 基于Redisson的分布式锁
     * @param key 分布式锁的key*/
    public static RLock getLock(String key){
        return client.getLock(key);
    }

}
```



业务中使用

``` java
//获取分布式锁的对象
RLock rLock=RedissonUtils.getLock(RedisKeyConfig.COUPON_LOCK+ctid);
try {
    //尝试获取分布式锁：超时时间和时间单位
    if(rLock.tryLock(10, TimeUnit.SECONDS)){
        //获取锁成功成功，就继续执行业务逻辑
        // 。。。
    }else {
        //获取锁失败，直接返回 领取失败
        return RUtil.fail("亲，没有了！");
    }
} catch (InterruptedException e) {
    e.printStackTrace();
    return RUtil.fail("亲，系统故障！");
} finally {
    rLock.unlock();
}
```




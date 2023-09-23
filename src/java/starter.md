---
title: 自定义starter
---



::: tip 自定义SpringBootStarter

作用：自定义starter的主要功能是自动帮我们将某个JavaBean转换成SpringBean

所以在项目中如果有哪些类是直接可以依赖注入的或者是某些配置类直接生效的，请不要感觉疑惑摸不着头脑，那是项目引用了对应的starter

:::

## 一、编写自定义启动器的配置文件

```  yml
spring:
  redis:
    host: 192.168.174.128
    port: 6379
    timeout: 10s
    lettuce:
      pool:
        min-idle: 0
        max-idle: 8
        max-active: 8
        max-wait: -1ms
``` 



## 二、配置文件绑定的配置类

![image-20220625152022394](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206251520865.png)



> 根据需求，配置文件和配置类的内容可以是自定义的任何内容

starter中的配置文件也可以没有，引用starter的调用方的配置文件中配置具体内容即可：

比如：我们项目中使用了 `mybatis-spring-boot-starter` 只需要在自己项目中的配置文件中编写mybatis和mysql的相关配置项就可以。

| 为了使用者更方便，我们也可以提供个配置的示例文件             |
| ------------------------------------------------------------ |
| ![image-20220625162520162](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206251625271.png) |

> starter的使用者需要在自己的配置文件中编写配置



## 三、实例化一个bean并注入到容器中

- 自动装配类

```  java

/**
 * @author zed
 * @date 2022/6/25 14:41
 * 启动器的自动装配类
 */
@Configuration
@EnableConfigurationProperties(ParkRedisProperties.class)
@ConditionalOnProperty(prefix = "spring.redis",value = "host")
public class ParkRedisAutoConfiguration {

    // 实例化bean并装配到容器中
    @Bean
    @ConditionalOnMissingBean(RedisUtils.class)
    RedisUtils redisUtils(){
        return new RedisUtils();
    }
    
    @Bean
    RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        // 设置redis模板使用的连接工厂
        redisTemplate.setConnectionFactory(factory);
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setValueSerializer(RedisSerializer.java());
        return redisTemplate;
    }

}
``` 

Redis工具类

```  java

/**
 * @author zed
 * @date 2022/6/18 17:58
 */
public class RedisUtils {

    public static final String REDIS_PREFIX = "ParkManager:";

    @Resource
    StringRedisTemplate stringRedisTemplate;

    @Resource
    RedisTemplate<String, Object> redisTemplate;

    /**
     * 设置字串类型的缓存
     * @param key key
     * @param value 字串类型的value
     * @param time 过期时间
     */
    public void setValue(String key, String value, long time) {
        stringRedisTemplate.opsForValue().set(REDIS_PREFIX + key, value, time, TimeUnit.SECONDS);
    }

    /**
     * 获取字串类型的缓存
     * @param key key
     */
    public String getValue(String key) {
        return stringRedisTemplate.opsForValue().get(REDIS_PREFIX + key);
    }

    /**
     * 设置对象类型的缓存
     * @param key key
     * @param value 要缓存的对象
     * @param time 过期时间
     */
    public void setObject(String key, Object value, long time) {
        redisTemplate.opsForValue().set(REDIS_PREFIX + key, value, time, TimeUnit.SECONDS);
    }

    /**
     * 获取对象类型的缓存
     * @param key key
     */
    public void getObject(String key) {
        redisTemplate.opsForValue().get(REDIS_PREFIX + key);
    }

}
``` 



## 四、spring.factories

![image-20220625152411491](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206251524614.png)

```  properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=com.qf.park.redis.ParkRedisAutoConfiguration
``` 






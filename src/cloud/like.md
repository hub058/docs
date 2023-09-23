---
title: 点赞模块设计
---

## 点赞模块设计


> Redis缓存 + 定时写入数据库实现高性能点赞功能

------

本文基于 SpringCloud, 用户发起点赞、取消点赞后先存入 Redis 中，再每隔两小时从 Redis 读取点赞数据写入数据库中做持久化存储。

点赞功能在很多系统中都有，但别看功能小，想要做好需要考虑的东西还挺多的。

点赞、取消点赞是高频次的操作，若每次都读写数据库，大量的操作会影响数据库性能，所以需要做缓存。

至于多久从 Redis 取一次数据存到数据库中，根据项目的实际情况定吧，我是暂时设了两个小时。

项目需求需要查看都谁点赞了，所以要存储每个点赞的点赞人、被点赞人，不能简单的做计数。

文章分四部分介绍：

- Redis 缓存设计及实现
- 数据库设计
- 数据库操作
- 开启定时任务持久化存储到数据库



## 一、Redis 缓存设计及实现

### 1.1 Redis安装及运行

Redis 安装请自行查阅相关教程。

说下Docker 安装运行 Redis


### 1.2 与SpringBoot项目的整合

1. 在 `pom.xml` 中引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

1. 在启动类上添加注释 `@EnableCaching`

```java
@SpringBootApplication
@EnableCaching
public class LikedApp {

    public static void main(String[] args) {
        SpringApplication.run(LikedApp.class, args);
    }
}
```

1. 编写 Redis 配置类 `RedisConfig`

```java
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setKeySerializer(RedisSerializer.json());
        template.setValueSerializer(RedisSerializer.json());
        template.setHashKeySerializer(RedisSerializer.json());
        template.setHashValueSerializer(RedisSerializer.json());
        template.afterPropertiesSet();
        return template;
    }

}
```

至此 Redis 在 SpringBoot 项目中的配置已经完成，可以愉快的使用了。

### 1.3 Redis 的数据结构类型

Redis 可以存储键与5种不同数据结构类型之间的映射，这5种数据结构类型分别为String（字符串）、List（列表）、Set（集合）、Hash（散列）和 Zset（有序集合）。

下面来对这5种数据结构类型作简单的介绍：

| 结构类型 | 结构存储的值                                                 | 结构的读写能力                                               |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| String   | 可以是字符串、整数或者浮点数                                 | 对整个字符串或者字符串的其中一部分执行操作；对象和浮点数执行自增(increment)或者自减(decrement) |
| List     | 一个链表，链表上的每个节点都包含了一个字符串                 | 从链表的两端推入或者弹出元素；根据偏移量对链表进行修剪(trim)；读取单个或者多个元素；根据值来查找或者移除元素 |
| Set      | 包含字符串的无序收集器(unorderedcollection)，并且被包含的每个字符串都是独一无二的、各不相同 | 添加、获取、移除单个元素；检查一个元素是否存在于某个集合中；计算交集、并集、差集；从集合里卖弄随机获取元素 |
| Hash     | 包含键值对的无序散列表                                       | 添加、获取、移除单个键值对；获取所有键值对                   |
| Zset     | 字符串成员(member)与浮点数分值(score)之间的有序映射，元素的排列顺序由分值的大小决定 | 添加、获取、删除单个元素；根据分值范围(range)或者成员来获取元素 |

### 1.4 Redis中的存储格式

用 Redis 存储两种数据，一种是记录点赞人、被点赞人、点赞状态的数据，另一种是每个用户被点赞了多少次，做个简单的计数。

由于需要记录点赞人和被点赞人，还有点赞状态（点赞、取消点赞），还要固定时间间隔取出 Redis 中所有点赞数据，分析了下 Redis 数据格式中 `Hash` 最合适。

因为 `Hash` 里的数据都是存在一个键里，可以通过这个键很方便的把所有的点赞数据都取出。这个键里面的数据还可以存成键值对的形式，方便存入点赞人、被点赞人和点赞状态。

设点赞人的 id 为 `likedPostId`，被点赞人的 id 为 `likedUserId` ，点赞时状态为 1，取消点赞状态为 0。将点赞人 id 和被点赞人 id 作为键，两个 id 中间用 `::` 隔开，点赞状态作为值。

所以如果用户点赞，存储的键为：`likedUserId::likedPostId`，对应的值为 1 。

取消点赞，存储的键为：`likedUserId::likedPostId`，对应的值为 0 。

取数据时把键用 `::` 切开就得到了两个id，也很方便。

在可视化工具 RDM 中看到的是这样子



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/2/166d3f33b931059a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.avis)





![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/2/166d3f360d75c8ea~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.avis)



### 1.5 操作 Redis

Redis 各种数据格式的操作方法可以看看 [这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F7bf5dc61ca06%2F) ，写的非常好。

将具体操作方法封装到了 `RedisService` 接口里

> RedisService.java

```java

import cn.allinone.liked.domain.UserLike;
import cn.allinone.liked.domain.dto.LikedCountDTO;

import java.util.List;

public interface RedisService {

    /**
     * 点赞。状态为1
     * @param likedUserId
     * @param likedPostId
     */
    void saveLiked2Redis(String likedUserId, String likedPostId);

    /**
     * 取消点赞。将状态改变为0
     * @param likedUserId
     * @param likedPostId
     */
    void unlikeFromRedis(String likedUserId, String likedPostId);

    /**
     * 从Redis中删除一条点赞数据
     * @param likedUserId
     * @param likedPostId
     */
    void deleteLikedFromRedis(String likedUserId, String likedPostId);

    /**
     * 该用户的点赞数加1
     * @param likedUserId
     */
    void incrementLikedCount(String likedUserId);

    /**
     * 该用户的点赞数减1
     * @param likedUserId
     */
    void decrementLikedCount(String likedUserId);

    /**
     * 获取Redis中存储的所有点赞数据
     * @return
     */
    List<UserLike> getLikedDataFromRedis();

    /**
     * 获取Redis中存储的所有点赞数量
     * @return
     */
    List<LikedCountDTO> getLikedCountFromRedis();

}

```

> 实现类 RedisServiceImpl.java

```java

import cn.allinone.liked.domain.UserLike;
import cn.allinone.liked.domain.dto.LikedCountDTO;
import cn.allinone.liked.enums.LikedStatusEnum;
import cn.allinone.liked.service.LikedService;
import cn.allinone.liked.service.RedisService;
import cn.allinone.liked.utils.RedisKeyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    final RedisTemplate<String, Object> redisTemplate;

    final LikedService likedService;

    @Override
    public void saveLiked2Redis(String likedUserId, String likedPostId) {
        String key = RedisKeyUtils.getLikedKey(likedUserId, likedPostId);
        redisTemplate.opsForHash().put(RedisKeyUtils.MAP_KEY_USER_LIKED, key, LikedStatusEnum.LIKE.getCode());
    }

    @Override
    public void unlikeFromRedis(String likedUserId, String likedPostId) {
        String key = RedisKeyUtils.getLikedKey(likedUserId, likedPostId);
        redisTemplate.opsForHash().put(RedisKeyUtils.MAP_KEY_USER_LIKED, key, LikedStatusEnum.UNLIKE.getCode());
    }

    @Override
    public void deleteLikedFromRedis(String likedUserId, String likedPostId) {
        String key = RedisKeyUtils.getLikedKey(likedUserId, likedPostId);
        redisTemplate.opsForHash().delete(RedisKeyUtils.MAP_KEY_USER_LIKED, key);
    }

    @Override
    public void incrementLikedCount(String likedUserId) {
        redisTemplate.opsForHash().increment(RedisKeyUtils.MAP_KEY_USER_LIKED_COUNT, likedUserId, 1);
    }

    @Override
    public void decrementLikedCount(String likedUserId) {
        redisTemplate.opsForHash().increment(RedisKeyUtils.MAP_KEY_USER_LIKED_COUNT, likedUserId, -1);
    }

    @Override
    public List<UserLike> getLikedDataFromRedis() {
        Cursor<Map.Entry<Object, Object>> cursor = redisTemplate.opsForHash().scan(RedisKeyUtils.MAP_KEY_USER_LIKED, ScanOptions.NONE);
        List<UserLike> list = new ArrayList<>();
        while (cursor.hasNext()) {
            Map.Entry<Object, Object> entry = cursor.next();
            String key = (String) entry.getKey();
            // 分离出 likedUserId，likedPostId
            String[] split = key.split("::");
            String likedUserId = split[0];
            String likedPostId = split[1];
            Integer value = (Integer) entry.getValue();

            // 组装成 UserLike 对象
            UserLike userLike = new UserLike(likedUserId, likedPostId, value);
            list.add(userLike);

            // 存到 list 后从 Redis 中删除
            redisTemplate.opsForHash().delete(RedisKeyUtils.MAP_KEY_USER_LIKED, key);
        }
        return list;
    }

    @Override
    public List<LikedCountDTO> getLikedCountFromRedis() {
        Cursor<Map.Entry<Object, Object>> cursor = redisTemplate.opsForHash().scan(RedisKeyUtils.MAP_KEY_USER_LIKED_COUNT, ScanOptions.NONE);
        List<LikedCountDTO> list = new ArrayList<>();
        while (cursor.hasNext()) {
            Map.Entry<Object, Object> map = cursor.next();
            // 将点赞数量存储在 LikedCountDT
            String key = (String) map.getKey();
            LikedCountDTO dto = new LikedCountDTO(Integer.valueOf(key), (Integer) map.getValue());
            list.add(dto);
            // 从Redis中删除这条记录
            redisTemplate.opsForHash().delete(RedisKeyUtils.MAP_KEY_USER_LIKED_COUNT, key);
        }
        return list;
    }
}
```

用到的工具类和枚举类

> RedisKeyUtils, 用于根据一定规则生成 key

```java

public class RedisKeyUtils {

    // 保存用户点赞数据的key
    public static final String MAP_KEY_USER_LIKED = "MAP_USER_LIKED";
    // 保存用户被点赞数量的key
    public static final String MAP_KEY_USER_LIKED_COUNT = "MAP_USER_LIKED_COUNT";

    /**
     * 拼接被点赞的用户id和点赞的人的id作为key。格式 222222::333333
     *
     * @param likedUserId 被点赞的人id
     * @param likedPostId 点赞的人的id
     */
    public static String getLikedKey(String likedUserId, String likedPostId) {
        return likedUserId + "::" + likedPostId;
    }
}

```

> LikedStatusEnum 用户点赞状态的枚举类

```java

import lombok.Getter;

/**
 * 用户点赞的状态
 */
@Getter
public enum LikedStatusEnum {
    LIKE(1, "点赞"),
    UNLIKE(0, "取消点赞/未点赞");

    private Integer code;

    private String msg;

    LikedStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}

```

## 二、数据库设计

数据库表中至少要包含三个字段：被点赞用户id，点赞用户id，点赞状态。再加上主键id，创建时间，修改时间就行了。

建表语句

```pgsql
create table `user_like`(
	`id` int not null auto_increment,
	`liked_user_id` varchar(32) not null comment '被点赞的用户id',
	`liked_post_id` varchar(32) not null comment '点赞的用户id',
	`status` tinyint(1) default '1' comment '点赞状态，0取消，1点赞',
	`create_time` timestamp not null default current_timestamp comment '创建时间',
  `update_time` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
	primary key(`id`),
	INDEX `liked_user_id`(`liked_user_id`),
	INDEX `liked_post_id`(`liked_post_id`)
) comment '用户点赞表';
```

对应的对象 `UserLike`

```java

import cn.allinone.liked.enums.LikedStatusEnum;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 用户点赞表
 */
@Entity
@Data
public class UserLike {

    //主键id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 被点赞的用户的id
    private String likedUserId;

    // 点赞的用户的id
    private String likedPostId;

    // 点赞的状态.默认未点赞
    private Integer status = LikedStatusEnum.UNLIKE.getCode();

    public UserLike() {
    }

    public UserLike(String likedUserId, String likedPostId, Integer status) {
        this.likedUserId = likedUserId;
        this.likedPostId = likedPostId;
        this.status = status;
    }
}

```


对应的对象 `UserInfo`

```java

import lombok.Data;

@Data
public class UserInfo {

    private Integer id;

    private String username;

    private Integer age;

    private Integer likeNum;
}


```



对应的对象 `LikedCountDTO`

```java


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikedCountDTO {

    private Integer id;

    private Integer count;
}


```



## 三、数据库操作

操作数据库同样封装在接口中

> LikedService

```java

import cn.allinone.liked.domain.UserLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LikedService {

    /**
     * 保存点赞记录
     * @param userLike
     * @return
     */
    UserLike save(UserLike userLike);

    /**
     * 批量保存或修改
     * @param list
     */
    List<UserLike> saveAll(List<UserLike> list);


    /**
     * 根据被点赞人的id查询点赞列表（即查询都谁给这个人点赞过）
     * @param likedUserId 被点赞人的id
     * @param pageable
     * @return
     */
    Page<UserLike> getLikedListByLikedUserId(String likedUserId, Pageable pageable);

    /**
     * 根据点赞人的id查询点赞列表（即查询这个人都给谁点赞过）
     * @param likedPostId
     * @param pageable
     * @return
     */
    Page<UserLike> getLikedListByLikedPostId(String likedPostId, Pageable pageable);

    /**
     * 通过被点赞人和点赞人id查询是否存在点赞记录
     * @param likedUserId
     * @param likedPostId
     * @return
     */
    UserLike getByLikedUserIdAndLikedPostId(String likedUserId, String likedPostId);

    /**
     * 将Redis里的点赞数据存入数据库中
     */
    void transLikedFromRedis2DB();

    /**
     * 将Redis中的点赞数量数据存入数据库
     */
    void transLikedCountFromRedis2DB();

}
```

> LikedServiceImpl 实现类

```java

import cn.allinone.liked.domain.UserInfo;
import cn.allinone.liked.domain.UserLike;
import cn.allinone.liked.domain.dto.LikedCountDTO;
import cn.allinone.liked.enums.LikedStatusEnum;
import cn.allinone.liked.repository.UserLikeRepository;
import cn.allinone.liked.service.LikedService;
import cn.allinone.liked.service.RedisService;
import cn.allinone.liked.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class LikedServiceImpl implements LikedService {

    final UserLikeRepository likeRepository;

    final RedisService redisService;

    final UserService userService;


    @Override
    @Transactional
    public UserLike save(UserLike userLike) {
        return likeRepository.save(userLike);
    }

    @Override
    @Transactional
    public List<UserLike> saveAll(List<UserLike> list) {
        return likeRepository.saveAll(list);
    }

    @Override
    public Page<UserLike> getLikedListByLikedUserId(String likedUserId, Pageable pageable) {
        return likeRepository.findByLikedUserIdAndStatus(likedUserId, LikedStatusEnum.LIKE.getCode(), pageable);
    }

    @Override
    public Page<UserLike> getLikedListByLikedPostId(String likedPostId, Pageable pageable) {
        return likeRepository.findByLikedPostIdAndStatus(likedPostId, LikedStatusEnum.LIKE.getCode(), pageable);
    }

    @Override
    public UserLike getByLikedUserIdAndLikedPostId(String likedUserId, String likedPostId) {
        return likeRepository.findByLikedUserIdAndLikedPostId(likedUserId, likedPostId);
    }

    @Override
    @Transactional
    public void transLikedFromRedis2DB() {
        List<UserLike> list = redisService.getLikedDataFromRedis();
        for (UserLike like : list) {
            UserLike ul = getByLikedUserIdAndLikedPostId(like.getLikedUserId(), like.getLikedPostId());
            if (ul == null) {
                //没有记录，直接存入
                save(like);
            } else {
                //有记录，需要更新
                ul.setStatus(like.getStatus());
                save(ul);
            }
        }
    }

    @Override
    @Transactional
    public void transLikedCountFromRedis2DB() {
        List<LikedCountDTO> list = redisService.getLikedCountFromRedis();
        for (LikedCountDTO dto : list) {
            UserInfo user = userService.findById(dto.getId());
            //点赞数量属于无关紧要的操作，出错无需抛异常
            if (user != null) {
                Integer likeNum = user.getLikeNum() + dto.getCount();
                user.setLikeNum(likeNum);
                //更新点赞数量
                userService.updateInfo(user);
            }
        }
    }
}

```


> UserLikeRepository 

```java

import cn.allinone.liked.domain.UserLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLikeRepository extends JpaRepository<UserLike,Integer> {
    Page<UserLike> findByLikedUserIdAndStatus(String likedUserId, Integer code, Pageable pageable);


    Page<UserLike> findByLikedPostIdAndStatus(String likedPostId, Integer code, Pageable pageable);


    UserLike findByLikedUserIdAndLikedPostId(String likedUserId, String likedPostId);

}

```


> UserRepository 

```java

import cn.allinone.liked.domain.UserInfo;
import cn.allinone.liked.domain.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserInfo,Integer> {
}

```


数据库的操作就这些，主要还是增删改查。

## 四、持久化存储到数据库

> 开启定时任务持久化存储到数据库

定时任务 `Quartz` 很强大，就用它了。

`Quartz` 使用步骤：

1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

1. 编写配置文件

```java

import cn.allinone.liked.task.LikeTask;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuartzConfig {

    private static final String LIKE_TASK_IDENTITY = "LikeTaskQuartz";

    @Bean
    public JobDetail quartzDetail() {
        return JobBuilder.newJob(LikeTask.class).withIdentity(LIKE_TASK_IDENTITY).storeDurably().build();
    }

    @Bean
    public Trigger quartzTrigger() {
        SimpleScheduleBuilder scheduleBuilder = SimpleScheduleBuilder.simpleSchedule()
//                .withIntervalInSeconds(10)  //设置时间周期单位秒
                .withIntervalInHours(2)  //两个小时执行一次
                .repeatForever();
        return TriggerBuilder.newTrigger().forJob(quartzDetail())
                .withIdentity(LIKE_TASK_IDENTITY)
                .withSchedule(scheduleBuilder)
                .build();
    }
}

```

1. 编写执行任务的类继承自 `QuartzJobBean`

```java

import cn.allinone.liked.service.LikedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 点赞的定时任务
 */
@Slf4j
@RequiredArgsConstructor
public class LikeTask extends QuartzJobBean {

    final LikedService likedService;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) {

        log.info("LikeTask-------- {}", LocalDateTime.now().format(FORMATTER));

        // 将Redis 里的点赞信息同步到数据库里
        likedService.transLikedFromRedis2DB();
        likedService.transLikedCountFromRedis2DB();
    }
}

```

在定时任务中直接调用 `LikedService` 封装的方法完成数据同步。

## 五、编写接口测试点赞

> 编写控制层接口


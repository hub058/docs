---
title: 签到服务
---
::: tip 
Redis中Bitmap的应用：用户签到。
:::

## Redis中的bitmap详解
> BitMap是通过一个bit位来表示某个元素对应的值或者状态,其中的key就是对应元素本身。我们知道8个bit可以组成一个Byte，所以bitmap本身会极大的节省储存空间，下面通过本文给大家介绍Redis中的bitmap知识，感兴趣的朋友一起看看吧


## 1、什么是bitmap？
> bitmap也叫位图，也就是用一个bit位来表示一个东西的状态，我们都知道bit位是二进制，所以只有两种状态，0和1。

## 2、为什么要有bitmap？
> bitmap的出现就是为了大数据量而来的，但是前提是统计的这个大数据量每个的状态只能有两种，因为每一个bit位只能表示两种状态。
下面我们直接以一个统计亿级用户活动的状态来说明吧。

## 3、案例说明
### 3.1、案例描述
> 如果有一个上亿用户的系统，需要我们去统计每一天的用户登录情况，我们应该如何去解决？
前提条件：设置在9月19号有下标为100、101、102、103四个用户都登录了系统
设置在9月20号有下标为100、101、102三个用户都登录了系统
> 
> 提出问题：
>
> 1、取出9月19号登录系统的有多少人？
>
> 答：直接获取即可。
>
> 2、取出9月19号和9月20号连续登录系统的有多少人？
>
> 答：两天的数据取&运算。
>
> 3、取出9月19号与9月20号任意一天登录的有多少人？
>
> 答：两天的数据取|运算。

### 3.2、解决方案
3.2.1、解决方案1—使用传统数据库解决
> 如果我们需要使用传统的数据库去统计的话，我么需要创建一张表，然后某个用户登录了，我们就去在表里面插上一条记录，登记用户的id，用户登录的时间等等，但是这样出现的问题就是，每一天的数据量都很大，我们在统计日活时，效率就很低，所以这种解决方案是不能被考虑的。

3.2.2、解决方案2—使用bitmap解决
> 既然用户登录只有两种状态，那么，我们就可以用bitmap
比如0表示未登录，1表示登录

``` shell
// 设置在9月19号有下标为100、101、102、103四个用户都登录了系统 start
127.0.0.1:6379> setbit login_09_19 100 1
(integer) 0
127.0.0.1:6379> setbit login_09_19 101 1
(integer) 0
127.0.0.1:6379> setbit login_09_19 102 1
(integer) 0
127.0.0.1:6379> setbit login_09_19 103 1
(integer) 0
// 设置在9月19号有下标为100、101、102、103四个用户都登录了系统 end

// 设置在9月20号有下标为100、101、102三个用户都登录了系统 start
127.0.0.1:6379> setbit login_09_20 100 1
(integer) 0
127.0.0.1:6379> setbit login_09_20 101 1
(integer) 0
127.0.0.1:6379> setbit login_09_20 102 1
(integer) 0
// 设置在9月20号有下标为100、101、102三个用户都登录了系统 end

// 取出9月19号登录系统的有多少人？ start
127.0.0.1:6379> bitcount login_09_19
(integer) 4
// 取出9月19号登录系统的有多少人？ end

// 取出9月19号和9月20号连续登录系统的有多少人？start
127.0.0.1:6379> bitop and login_in_09_19_20:and login_09_19 login_09_20
(integer) 13
127.0.0.1:6379> bitcount login_in_09_19_20:and
(integer) 3
// 取出9月19号和9月20号连续登录系统的有多少人？end

// 取出9月19号与9月20号任意一天登录的有多少人？start
127.0.0.1:6379> bitop or login_in_09_19_20:or login_09_19 login_09_20
(integer) 13
127.0.0.1:6379> bitcount login_in_09_19_20:or
(integer) 4
// 取出9月19号与9月20号任意一天登录的有多少人？end

```
![命令图片](https://img.jbzj.com/file_images/article/202110/2021102516073471.jpg)

到此这篇关于Redis中的bitmap详解的文章就介绍到这了

## 4、核心代码
### 用户签到
```java
package com.qf.cloudsignin.controller;

import com.qf.cloudentity.domain.R;
import com.qf.cloudsignin.service.CheckInService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 用户签到控制器控制器
 *
 * @author zed
 * @date 2023/03/17
 */
@Slf4j
@RestController
@RequestMapping("checkin")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    /**
     * 用户签到接口
     *
     * @param userId 用户ID
     * @return {@link String}
     */
    @PostMapping("/{userId}")
    public R checkIn(@PathVariable(name = "userId") Long userId) {
        return checkInService.checkIn(userId);
    }

    /**
     * 统计指定日期的签到人数
     *
     * @param date 日期
     * @return {@link Long} 签到的人数
     */
    @GetMapping("/count")
    public Long countDateCheckIn(String date) {
        return null;
    }

    /**
     * 获取指定用户在某个时间段内的签到次数
     *
     * @param userId    用户id
     * @param startDate 统计的开始时间
     * @param endDate   统计的结束时间
     * @return {@link Long} 签到次数
     */
    @GetMapping("/{userId}")
    public Long countCheckIn(@PathVariable(name = "userId") Long userId,
                             @RequestParam(name = "startDate") String startDate,
                             @RequestParam(name = "endDate") String endDate) {
        return null;
    }

    /**
     * 获取某个用户连续签到次数
     *
     * @param userId 用户id
     * @return long 连续签到次数
     */
    @GetMapping("/continuousdays/{userId}")
    public Long getContinuousCheckIn(@PathVariable(name = "userId") Long userId) {
        return null;
    }

}

```

```java
package com.qf.cloudsignin.service.impl;

import com.qf.cloudentity.domain.R;
import com.qf.cloudsignin.service.CheckInService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CheckInServiceImpl implements CheckInService {

    // 用户签到的key的前缀
    private static final String CHECK_IN_PRE_KEY = "USER_CHECKIN:DAY:";

    // 用户连续签到的缓存key的前缀
    private static final String CONTINUOUS_CHECK_IN_COUNT_PRE_KEY = "USER_CHECKIN:CONTINUOUS_COUNT:";

    // 日期格式化器
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");

    private final StringRedisTemplate stringRedisTemplate;


    /**
     * 用户签到
     * setbit key offset 1
     * setbit USER:CHECKIN:DAY:20230317 userId 1
     *
     * @param userId 用户id
     * @return {@link R}
     */
    @Override
    public R checkIn(Long userId) {
        // 获取当前日期
        String date = LocalDate.now().format(DATE_TIME_FORMATTER);
        String key = getCheckInKey(date);
        // 判断用户是否签到过，如果没有签到就进行签到
        if (isCheckIn(key, userId)) {
            return R.fail("您已经签到过了，无需重复签到");
        }
        // 继续签到
        stringRedisTemplate.opsForValue().setBit(key, userId, true);
        // 更新当前用户连续签到的天数
        updateContinuousCheckIn(userId);
        return R.ok("用户签到成功");
    }


    @Override
    public R<Long> countDateCheckIn(String date) {
        return null;
    }

    @Override
    public R<Long> countCheckIn(Long userId, String startDate, String endDate) {
        return null;
    }

    @Override
    public R<Long> getContinuousCheckIn(Long userId) {
        return null;
    }


    /**
     * 获取用户是否签到过
     * getbit key offet
     *
     * @param key    缓存key
     * @param userId 用户id
     * @return boolean
     */
    private boolean isCheckIn(String key, Long userId) {
        Boolean isCheckIn = stringRedisTemplate.opsForValue().getBit(key, userId);
        return Optional.ofNullable(isCheckIn).orElse(false);
    }

    /**
     * 更新用户连续签到天数
     *
     * @param userId 用户id
     */
    private void updateContinuousCheckIn(Long userId) {
        // 获取连续签到的key
        String key = getContinueCheckInKey(userId);
        // 获取指定用户的连续签到的天数
        String val = stringRedisTemplate.opsForValue().get(key);
        long count = 0;
        if (Objects.nonNull(val)) {
            count = Long.parseLong(val);
        }
        // 连续签到天数加一
        count++;
        // 更新连续签到天数
        stringRedisTemplate.opsForValue().set(key, count + "");
        // 设置连续签到天数key的过期时间
        // 过期时间需要设置为 后天的凌晨零分零零秒
        LocalDateTime time = LocalDateTime.now().plusDays(2).withHour(0).withMinute(0).withSecond(0);
        stringRedisTemplate.expireAt(key, time.toInstant(ZoneOffset.of("+8")));
        log.info("更新用户连续签到天数");
    }


    /**
     * 获取签到日期的key
     *
     * @param date 日期
     * @return {@link String}
     */
    private String getCheckInKey(String date) {
        return CHECK_IN_PRE_KEY + date;
    }

    /**
     * 获取用户连续签到的缓存key
     *
     * @param userId 用户id
     * @return {@link String}
     */
    private String getContinueCheckInKey(Long userId) {
        return CONTINUOUS_CHECK_IN_COUNT_PRE_KEY + userId;
    }
}

```

::: details 代码仓库
[代码仓库](http://heyige.cn/22081/checkin-redis-bitmap)
:::

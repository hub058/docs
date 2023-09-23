---
title: 评论模块后端
---

> 评论模块 - 后端数据库设计及功能实现



文章将分三部分介绍：

1. 前端界面分析
2. 数据库设计
3. 功能实现

## 一、前端界面分析

先看看前端界面长什么样，知道了前端需要什么数据，就知道数据库该怎么设计了。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/7/166edc8cb5978778~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.avis)



首先评论的主体可以是人、项目、资源，所以要有一个 `type` 字段标明这条评论的类型。

以项目为例，一个项目下面可能会有多条评论。每条评论其实分为两种，一种是直接对项目的评论，称之为父评论吧；另一种是对已有评论的评论，称为子评论。

梳理一下关系，每个项目可能有多个父评论，每个父评论可能有多个子评论。项目与父评论，父评论与子评论，都是一对多的关系。

由此可知数据库应该分为两个表，一个存储父评论，一个存储子评论。

再看都需要什么字段，先分析主评论。必须要有的是项目id，得知道是对谁评论的，叫 ownerId 吧。还有评论者的头像、昵称、id，还有评论时间、内容、点赞个数等。

子评论跟父评论的字段差不多，只是不要点赞数量。

## 二、数据库设计

分析了界面，知道需要什么字段，就开始设计数据库吧。

评论主表（父评论表）

```pgsql
CREATE TABLE `comments_info` (
  `id` varchar(32) NOT NULL COMMENT '评论主键id',
  `type` tinyint(1) NOT NULL COMMENT '评论类型：对人评论，对项目评论，对资源评论',
  `owner_id` varchar(32) NOT NULL COMMENT '被评论者id，可以是人、项目、资源',
  `from_id` varchar(32) NOT NULL COMMENT '评论者id',
  `from_name` varchar(32) NOT NULL COMMENT '评论者名字',
  `from_avatar` varchar(512) DEFAULT '' COMMENT '评论者头像',
  `like_num` int(11) DEFAULT '0' COMMENT '点赞的数量',
  `content` varchar(512) DEFAULT NULL COMMENT '评论内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论主表';
```

评论回复表（子评论表）

```pgsql
CREATE TABLE `comments_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(32) NOT NULL COMMENT '评论主表id',
  `from_id` varchar(32) NOT NULL COMMENT '评论者id',
  `from_name` varchar(32) NOT NULL COMMENT '评论者名字',
  `from_avatar` varchar(512) DEFAULT '' COMMENT '评论者头像',
  `to_id` varchar(32) NOT NULL COMMENT '被评论者id',
  `to_name` varchar(32) NOT NULL COMMENT '被评论者名字',
  `to_avatar` varchar(512) DEFAULT '' COMMENT '被评论者头像',
  `content` varchar(512) DEFAULT NULL COMMENT '评论内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='评论回复表';
```

## 三、功能实现

项目采用 `SpringCloud` 微服务架构，评论模块跟其他模块的关联性不强，可以抽出为一个单独的服务 `comments-service` 。

### 数据实体对象

> 数据实体对象 `CommentsInfo`

```java
package com.solo.coderiver.comments.dataobject;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

/**
 * 评论表主表
 */
@Entity
@Data
@DynamicUpdate
public class CommentsInfo {

    //评论主键id
    @Id
    private String id;

    //评论类型。1用户评论，2项目评论，3资源评论
    private Integer type;

    //被评论者的id
    private String ownerId;

    //评论者id
    private String fromId;

    //评论者名字
    private String fromName;

    //评论者头像
    private String fromAvatar;

    //获得点赞的数量
    private Integer likeNum;

    //评论内容
    private String content;

    //创建时间
    private Date createTime;

    //更新时间
    private Date updateTime;

}
```

> 数据实体对象 `CommentsReply`

```java
package com.solo.coderiver.comments.dataobject;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

/**
 * 评论回复表
 */
@Entity
@Data
@DynamicUpdate
public class CommentsReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //评论主表id
    private String commentId;

    //评论者id
    private String fromId;

    //评论者名字
    private String fromName;

    //评论者头像
    private String fromAvatar;

    //被评论者id
    private String toId;

    //被评论者名字
    private String toName;

    //被评论者头像
    private String toAvatar;

    //评论内容
    private String content;

    //创建时间
    private Date createTime;

    //更新时间
    private Date updateTime;

}
```

### 数据库操作仓库 repository

操作数据库暂时用的是 `Jpa` ，后期可能会增加一份 `mybatis` 的实现。

> CommentsInfoRepository

```java
package com.solo.coderiver.comments.repository;

import com.solo.coderiver.comments.dataobject.CommentsInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsInfoRepository extends JpaRepository<CommentsInfo, String> {

    List<CommentsInfo> findByOwnerId(String ownerId);
}
```

> CommentsReplyRepository

```java
package com.solo.coderiver.comments.repository;

import com.solo.coderiver.comments.dataobject.CommentsReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsReplyRepository extends JpaRepository<CommentsReply, Integer> {

    List<CommentsReply> findByCommentId(String commentId);
}
```

### Service 接口封装

为了代码更健壮，要把数据库的操作封装一下

> CommentsInfoService

```java
package com.solo.coderiver.comments.service;

import com.solo.coderiver.comments.dataobject.CommentsInfo;
import java.util.List;

public interface CommentsInfoService {

    /**
     * 保存评论
     * @param info
     * @return
     */
    CommentsInfo save(CommentsInfo info);

    /**
     * 根据被评论者的id查询评论列表
     * @param ownerId
     * @return
     */
    List<CommentsInfo> findByOwnerId(String ownerId);
}
```

> CommentsReplyService

```java
package com.solo.coderiver.comments.service;

import com.solo.coderiver.comments.dataobject.CommentsReply;
import java.util.List;

public interface CommentsReplyService {

    /**
     * 保存评论回复
     * @param reply
     * @return
     */
    CommentsReply save(CommentsReply reply);

    /**
     * 根据评论id查询回复
     * @param commentId
     * @return
     */
    List<CommentsReply> findByCommentId(String commentId);
}
```

接口的实现类

> CommentsInfoServiceImpl

```java
package com.solo.coderiver.comments.service.impl;

import com.solo.coderiver.comments.dataobject.CommentsInfo;
import com.solo.coderiver.comments.repository.CommentsInfoRepository;
import com.solo.coderiver.comments.service.CommentsInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsInfoServiceImpl implements CommentsInfoService {

    @Autowired
    CommentsInfoRepository repository;

    @Override
    public CommentsInfo save(CommentsInfo info) {
        return repository.save(info);
    }

    @Override
    public List<CommentsInfo> findByOwnerId(String ownerId) {
        return repository.findByOwnerId(ownerId);
    }
}
```

> CommentsReplyServiceImpl

```java
package com.solo.coderiver.comments.service.impl;

import com.solo.coderiver.comments.dataobject.CommentsReply;
import com.solo.coderiver.comments.repository.CommentsReplyRepository;
import com.solo.coderiver.comments.service.CommentsReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsReplyServiceImpl implements CommentsReplyService {

    @Autowired
    CommentsReplyRepository repository;

    @Override
    public CommentsReply save(CommentsReply reply) {
        return repository.save(reply);
    }

    @Override
    public List<CommentsReply> findByCommentId(String commentId) {
        return repository.findByCommentId(commentId);
    }
}
```

### 控制层 Controller

`Controller` 层分发请求，并返回前端需要的数据

```java
package com.solo.coderiver.comments.controller;

@RestController
@Api(description = "评论相关接口")
public class CommentsController {

    @Autowired
    CommentsInfoService infoService;

    @Autowired
    CommentsReplyService replyService;

    @PostMapping("/save")
    @ApiOperation("保存评论")
    @Transactional
    public ResultVO saveComments(@Valid CommentsInfoForm form, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new CommentsException(ResultEnums.PARAMS_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
        }
        //将 CommentsInfoForm 里的数据拷贝到 CommentsInfo
        CommentsInfo info = new CommentsInfo();
        BeanUtils.copyProperties(form, info);
        // 生成并设置评论的主键id
        info.setId(KeyUtils.genUniqueKey());
        CommentsInfo result = infoService.save(info);
        if (result == null) {
            throw new CommentsException(ResultEnums.SAVE_COMMENTS_FAIL);
        }
        return ResultVOUtils.success();
    }

    @GetMapping("/get/{ownerId}")
    @ApiOperation("根据 ownerId 查询评论")
    @ApiImplicitParam(name = "ownerId", value = "被评论者id")
    public ResultVO getCommentsByOwnerId(@PathVariable("ownerId") String ownerId) {
        List<CommentsInfo> infoList = infoService.findByOwnerId(ownerId);
        //将 CommentsInfo 转换为 CommentsInfoDTO
        List<CommentsInfoDTO> infoDTOS = infoList.stream().map(info -> {
            CommentsInfoDTO dto = new CommentsInfoDTO();
            BeanUtils.copyProperties(info, dto);
            return dto;
        }).collect(Collectors.toList());
        return ResultVOUtils.success(infoDTOS);
    }

    @PostMapping("/save-reply")
    @ApiOperation("保存评论回复")
    @Transactional
    public ResultVO saveReply(@Valid CommentsReplyForm form, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new CommentsException(ResultEnums.PARAMS_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
        }
        CommentsReply reply = new CommentsReply();
        BeanUtils.copyProperties(form, reply);
        CommentsReply result = replyService.save(reply);
        if (result == null) {
            throw new CommentsException(ResultEnums.SAVE_COMMENTS_FAIL);
        }
        return ResultVOUtils.success();
    }

    @GetMapping("/get-reply/{commentId}")
    @ApiOperation("通过commentId获取评论回复")
    public ResultVO getReplyByCommentId(@PathVariable("commentId") String commentId) {
        List<CommentsReply> replyList = replyService.findByCommentId(commentId);
        //将 CommentsReply 转换为 CommentsReplyDTO
        List<CommentsReplyDTO> replyDTOS = replyList.stream().map(reply -> {
            CommentsReplyDTO dto = new CommentsReplyDTO();
            BeanUtils.copyProperties(reply, dto);
            return dto;
        }).collect(Collectors.toList());

        return ResultVOUtils.success(replyDTOS);
    }
}
```

代码中工具类和枚举类请到 `github` 上查看源码。

项目地址：[github.com/cachecats/c…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcachecats%2Fcoderiver)

代码在 `根目录/java/comments-service`


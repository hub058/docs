---
title: 三方登录
---



## JustAuth

> 开箱即用的整合第三方登录的开源组件
>
> 项目官网：https://justauth.wiki/



## 相关名词

- `开发者` 指使用`JustAuth`的开发者
- `第三方` 指开发者对接的第三方网站，比如：QQ平台、微信平台、微博平台
- `用户` 指最终服务的真实用户



## JustAuth中的关键词

以下内容了解后，将会使你更容易地上手JustAuth。

- `clientId` 客户端身份标识符（应用id），一般在申请完Oauth应用后，由**第三方平台颁发**，唯一

- `clientSecret` 客户端密钥，一般在申请完Oauth应用后，由**第三方平台颁发**

- `redirectUri` **开发者项目中的有效api地址**。用户在确认第三方平台授权（登录）后，第三方平台会重定向到该地址，并携带code等参数

- `state` 用来保持授权会话流程完整性，防止CSRF攻击的安全的随机的参数，由**开发者生成**

- `alipayPublicKey` 支付宝公钥。当选择支付宝登录时，必传该值，由**开发者生成**

- `unionId` 是否需要申请unionid，目前只针对**qq登录**。注：qq授权登录时，获取unionid需要单独发送邮件申请权限。如果个人开发者账号中申请了该权限，可以将该值置为true，在获取openId时就会同步获取unionId。参考链接：[UnionID介绍(opens new window)](http://wiki.connect.qq.com/unionid介绍)

- `stackOverflowKey` Stack Overflow 登陆时需单独提供的key，由**第三方平台颁发**

- `agentId` 企业微信登陆时需单独提供该值，由**第三方平台颁发**，为授权方的网页应用ID

- `source` JustAuth支持的第三方平台，比如：GITHUB、GITEE等

- `uuid`

  一般为第三方平台的用户ID。以下几个平台需特别注意：

  - 钉钉、抖音：`uuid` 为用户的 `unionid`
  - 微信公众平台登录、京东、酷家乐、美团：`uuid` 为用户的 `openId`
  - 微信开放平台登录、QQ：`uuid` 为用户的 `openId`，平台支持获取`unionid`， `unionid` 在 `AuthToken` 中（如果支持），在登录完成后，可以通过 `response.getData().getToken().getUnionId()` 获取
  - Google：`uuid` 为用户的 `sub`，`sub`为Google的所有账户体系中用户唯一的身份标识符，详见：[OpenID Connect(opens new window)](https://developers.google.com/identity/protocols/oauth2/openid-connect)

注：建议通过`uuid` + `source`的方式唯一确定一个用户，这样可以解决用户身份归属的问题。因为 单个用户ID 在某一平台中是唯一的，但不能保证在所有平台中都是唯一的。



## OAuth 2 的授权流程

### 参与的角色

|                        |                                                              |
| ---------------------- | ------------------------------------------------------------ |
| `Resource Owner`       | 资源所有者，即代表授权客户端访问本身资源信息的用户（User），也就是应用场景中的“**开发者A**” |
| `Resource Server`      | 资源服务器，托管受保护的**用户账号信息**，比如Github         |
| `Authorization Server` | 授权服务器，验证用户身份，然后为客户端派发资源访问令牌，比如Github<br />  `Resource Server`和`Authorization Server` 可以是同一台服务器，也可以是不同的服务器，视具体的授权平台而有所差异 |
| `Client`               | 客户端，即代表意图访问受限资源的**第三方应用**               |



### 授权流程

``` html
     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+

```



上面的流程图取自[The OAuth 2.0 Authorization Framework#1.2(opens new window)](https://tools.ietf.org/html/rfc6749#section-1.2)

**流程解析**

- (A) 用户打开**客户端**以后，**客户端**要求**用户**给予授权。
- (B) **用户**同意给予**客户端**授权。
- (C) **客户端**使用上一步获得的授权，向**认证服务器**申请令牌。
- (D) **认证服务器**对**客户端**进行认证以后，确认无误，同意发放令牌
- (E) **客户端**使用令牌，向**资源服务器**申请获取资源。
- (F) **资源服务器**确认令牌无误，同意向**客户端**开放资源。



## 直白话 OAuth 2 流程

以上流程理解起来可能有些难度，这儿我们给出一个白话版的流程图

首先引入三个角色：

- 用户A：可以理解成你自己
- 网站B：可以理解成 OSChina
- 第三方C：可以理解成 Github

需求：你（用户A）想通过 Github（第三方C） 登录网站B（OSChina）。

💡注：**下面的内容为流程图，如果您在阅读的时候显示为纯文字，请尝试刷新页面，直到显示正常**



![](https://justauth.wiki/_media/63305215.png)





## 如何使用

JustAuth的特点之一就是**简**，极简主义，不给使用者造成不必要的障碍。

既然牛皮吹下了， 那么如何才能用JustAuth实现第三方登录呢？

## 使用步骤

使用JustAuth总共分三步（**这三步也适合于JustAuth支持的任何一个平台**）：

1. 申请注册第三方平台的开发者账号
2. 创建第三方平台的应用，获取配置信息(`accessKey`, `secretKey`, `redirectUri`)
3. 使用该工具实现授权登陆



## SpringBoot整合JustAuth

### 应用依赖

``` xml
<dependency>
  <groupId>com.xkcoding.justauth</groupId>
  <artifactId>justauth-spring-boot-starter</artifactId>
  <version>1.4.0</version>
</dependency>
```



## 配置文件

> 添加配置，在 `application.yml` 中添加配置配置信息

``` yml
justauth:
  enabled: true
  type:
    QQ:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/qq/callback
      union-id: false
    WEIBO:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/weibo/callback
    GITEE:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/gitee/callback
    DINGTALK:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/dingtalk/callback
    BAIDU:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/baidu/callback
    CSDN:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/csdn/callback
    CODING:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/coding/callback
      coding-group-name: xx
    OSCHINA:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/oschina/callback
    ALIPAY:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/alipay/callback
      alipay-public-key: MIIB**************DAQAB
    WECHAT_OPEN:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/wechat_open/callback
    WECHAT_MP:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/wechat_mp/callback
    WECHAT_ENTERPRISE:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/wechat_enterprise/callback
      agent-id: 1000002
    TAOBAO:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/taobao/callback
    GOOGLE:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/google/callback
    FACEBOOK:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/facebook/callback
    DOUYIN:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/douyin/callback
    LINKEDIN:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/linkedin/callback
    MICROSOFT:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/microsoft/callback
    MI:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/mi/callback
    TOUTIAO:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/toutiao/callback
    TEAMBITION:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/teambition/callback
    RENREN:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/renren/callback
    PINTEREST:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/pinterest/callback
    STACK_OVERFLOW:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/stack_overflow/callback
      stack-overflow-key: asd*********asd
    HUAWEI:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/huawei/callback
    KUJIALE:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/kujiale/callback
    GITLAB:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/gitlab/callback
    MEITUAN:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/meituan/callback
    ELEME:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/eleme/callback
    TWITTER:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/twitter/callback
    XMLY:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/xmly/callback
      # 设备唯一标识ID
      device-id: xxxxxxxxxxxxxx
      # 客户端操作系统类型，1-iOS系统，2-Android系统，3-Web
      client-os-type: 3
      # 客户端包名，如果 clientOsType 为1或2时必填。对Android客户端是包名，对IOS客户端是Bundle ID
      #pack-id: xxxx
    FEISHU:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/feishu/callback
    JD:
      client-id: 10**********6
      client-secret: 1f7d08**********5b7**********29e
      redirect-uri: http://oauth.xkcoding.com/demo/oauth/jd/callback
  cache:
    type: default
```

> 注意：
>
> - `justauth.type`节点的配置，请根据项目实际情况选择，多余的可以删除
> - 如果使用 QQ 登录，并且需要获取`unionId`，则必须传`union-id`配置，并置为`true`
> - 如果使用支付宝登录，必传`alipay-public-key`
> - 如果使用 Stack Overflow 登录，必传`stack-overflow-key`
> - 如果使用企业微信登录，必传`agent-id`
> - 如果使用 CODING 登录，必传`coding-group-name`
>
> redirect-uri：
>
> 给第三方平台提供的我们自己的授权回调接口，第三方平台可以通过这个接口给我们返回用户信息！
>
> 测试阶段：`http://oauth.xkcoding.com/demo` 这个地址可以替换为 `http://localhost:8080`



## 编写代码

> 然后就开始玩耍吧~

``` java
@Slf4j
@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class TestController {
    private final AuthRequestFactory factory;

    @GetMapping
    public List<String> list() {
        return factory.oauthList();
    }

  // 这个接口是前端或者移动端调用的[第三方]登录接口
    @GetMapping("/login/{type}")
    public void login(@PathVariable String type, HttpServletResponse response) throws IOException {
        AuthRequest authRequest = factory.get(type);
        response.sendRedirect(authRequest.authorize(AuthStateUtils.createState()));
    }

  // 这个接口是给授权平台使用的回调接口
  // 需要跟配置文件中的redirect-uri回调地址对应上
    @RequestMapping("/{type}/callback")
    public AuthResponse login(@PathVariable String type, AuthCallback callback) {
        AuthRequest authRequest = factory.get(type);
        AuthResponse response = authRequest.login(callback);
        log.info("【response】= {}", JSONUtil.toJsonStr(response));
        return response;
    }

}
```



## 缓存配置

> starter 内置了2种缓存实现，一种是上面的默认实现，另一种是基于 Redis 的缓存实现。
>
> 当然了，你也可以自定义实现你自己的缓存。

#### 默认缓存实现

在配置文件配置如下内容即可

``` yml
justauth:
  cache:
    type: default
```

####  Redis 缓存实现

1.添加 Redis 相关依赖

``` xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- 对象池，使用redis时必须引入 -->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-pool2</artifactId>
</dependency>
```

2.配置文件配置如下内容即可

``` yml
justauth:
  cache:
    type: redis
    # 缓存前缀，目前只对redis缓存生效，默认 JUSTAUTH::STATE::
    prefix: ''
    # 超时时长，目前只对redis缓存生效，默认3分钟
    timeout: 1h
spring:
  redis:
    host: localhost
    # 连接超时时间（记得添加单位，Duration）
    timeout: 10000ms
    # Redis默认情况下有16个分片，这里配置具体使用的分片
    # database: 0
    lettuce:
      pool:
        # 连接池最大连接数（使用负值表示没有限制） 默认 8
        max-active: 8
        # 连接池最大阻塞等待时间（使用负值表示没有限制） 默认 -1
        max-wait: -1ms
        # 连接池中的最大空闲连接 默认 8
        max-idle: 8
        # 连接池中的最小空闲连接 默认 0
        min-idle: 0
```



::: details 本文代码

> [代码仓库](http://heyige.cn/root/third-auth)


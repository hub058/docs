---
title: 支付服务和二维码
---


## 支付宝

> 支付宝沙箱环境

### 申请支付宝沙箱环境

> 支付宝开放平台地址： https://open.alipay.com/

1、在控制台页面进入沙箱应用

> 沙箱应用就是支付宝官方给开发者提供的一套测试环境。
>
> 跟真实环境基本是一样的，我们可以在沙箱环境中写代码测试，支付功能开放完成后，
>
> 在上线之前需要创建一个上线的应用，申请正式的公钥私钥替换下配置文件中的沙箱配置即可。
>
> 代码完成都不需要修改！
>
> 总结：我们在沙箱环境中测试通过的代码，只需要修改支付配置就可以在线下正常使用！

![image-20221128095433653](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211280954799.png)



2、在沙箱环境中，找到应用ID

> APPID: 2021000121676481
> 应用ID: 在线上环境中需要自己申请应用，并需要经过审核。

![image-20221128095421341](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211280954595.png)

比如正式上线的应用如下：

> 注意：沙箱环境中不需要申请上线应用。

![image-20221128100033564](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211281000682.png)



3、查询密钥

> 开发信息：公钥模式 > 查看

![image-20221128100221924](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211281002006.png)

> 保存一下：应用私钥和支付宝公钥
>
> ![image-20221128100445730](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211281004917.png)

应用私钥

``` text
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYkKGfkKQ2yFvSL7YbIWvJwUbPE7oQ3xv1t92ilapAK81feYZD978e+EJ/sFAnHhBPA53KzRvD0Wl7Cc42cS8UFcm/uSkfg2GqYabEZgr1Lgc2CvYuoBPCM6QWPSeVmDBb6FFQ+9364pX9NJaE444bySNppq+uU1nktyHDiGO1KLB+u2idWDQpnLZIjIcc+935owfdbDpjuF8lDtC726ALpUZxK8SI6NCeDwwEHYmNDZucq6cShoq7G630uAt9NlRviMbrtbQGR7RDTe7i1Tg4FD6Caqp0cWdI+0W2QJPkraMWFanFxI4Xu+s0DOAIzQ7ntMVDgCepYJreI86UGqOrAgMBAAECggEALyKLiuc4VpQVKBIqWI1VoHvopXltre5hb4GtQ42/mGfwMy+IAZMSjfMKxi/hwiHQ+uGWnmU1/dC+XIEt2LuZu41ic9AhGzLFNwg5+9UZ3XM/LowEOPGuWz5SIGT/EJgnLlnKGQ44qjpW2t1vRU0hyPpmMsCMzCxoDFeviZdN3EewYz9/3gFNC7D6GaRinUf/feBLlkSXeVMiBlVqQOLnOuhgCj37GGa9km+NTXmHo03LwdiD8w1qTHIVyLNl84Kl2pxhQkG6jGybTn+3/f6RehpZJoSlmaX+1qfjlafxY3D128W//n9VJHShIYovE7vfblzZmzrUko2BwPykCTRjgQKBgQDsgNYn7Ejk2wQM+HV3ZRNYrP7egaUgK7XlE64fT6C/O0z4mwQHqtFgHrqT/xtWbo++TPRTahAyw7JunHud5uK1Oy1mQuNj0y4aV+MWl0gUR2+EJTf4CWo8SrwZn/LsI3slO4V+X6pbwEMNbTgakN3ZWBb9ge8eiE77sfzrCf52UwKBgQDqawRab9q0lWp4BL0a4zjWvxOyEh5wQnGwme5AK4b4+WpXjYpHvJrZk1bFUWnFe27OPfq0XaIuueGGpy7P9TiazYPMFJhdcSQWWKBIeIRkQEK/zfJMy5d0kLgrIEpewZX3z3FgTZACUY26fUJ0PZa1TjYeC5LDHCZdAosEK6DCSQKBgHRXQIItIwKplsmGo8pTB3xUxZ/RaNh1iCojT0GJ20qXMlsNbqMS7aJ6G1BYaytOghmcI4ixITzHtgvhoJHhlV6PuNqYRuHBbel5mHVxf/yx03LPGERE5WS5YuS8ITT2k0qSiC3Ng7FU1+dP9gxjfS7AvbaBZ46+gRQhz4gTx4CPAoGAItl8ETHV0sjvxh32OxwSpCJN/EgjTE8kdbu8pr+R1kvGGnQJXbbVUolL+hOrZNd/1ptyPQQ6izXJKGqMVBBBtQnekSVyrVmXotbUJVH9ZKYFBlzIq9AMmSC2sHqhc8rVz7yAP2/oe9/B8TqT+ZH6aMPS2c6gp+70aRlqr1kJEjkCgYEAwhGJ6N6aBHDgdvtbsnjGz4O7zlAUrP863YUh8lARLrTx9yDwU6/1mAjQMMnp2j6C5f5JwUHk6HTNesTzdYhSEDR4EzrIhmlC8EoGO8HLtyr4DIsJhxQ8vXoxWtiSZAI1qzckc0mE7DB9SPRM0tdTWnBYo84am9boGYO9ot9tQFw=
```

支付宝公钥

``` text
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs7HNvMzuFk8+Xa/+kjeiP3qTEBvAQUF9w20yXSO1gBE7Cd/Et4yjqeqRGvIjqPKI8Xfv0kXwPSiYYuk1bFNoFyzuN/W8arKwum0vPf5AeRKdi6N+iHOaT5eRjOPzTL7jYJnNc+I7B998inuMeypVCuHlKa2qpCaN4RndGErK5qTusEP8mDhUhxhMIn1SrayDnT9cb1KK2a3cbOXu1uxQasLsbR3GYOK/g9YAisKGG/egqEM7q91rFC46zOZ0OQ8qLV7S3YQEXnpsAYPS5kH1xtVfFB3Uapo6rckSVDoM0Ryjq3h96fWsgcRme5T4kSQrleIPOqNU8NZJx1NZs4C0RQIDAQAB
```

支付宝加签方式说明：

> https://opendocs.alipay.com/common/02mse2
>
> 接口加签方式，是指应用在调用支付宝 OpenAPI 时，需要通过密钥或证书对消息内容进行加签、验签，从而保证双方通信消息的安全性和真实性。支付宝开放平台 SDK 封装了签名和验签过程，只需配置应用信息及密钥参数即可。
>
> 名词解释
>
> **应用私钥**：用来给应用消息进行签名，请务必要妥善保管，避免遗失或泄露。
>
> **应用公钥**：需要提供给支付宝开放平台，平台会对应用发送的消息进行签名验证。
>
> **支付宝公钥**：应用收到支付宝发送的同步、异步消息时，使用支付宝公钥验证签名信息。



4、支付宝网关地址

> https://openapi.alipaydev.com/gateway.do



### 沙箱账号信息

![image-20221128100927542](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211281009656.png)



### 沙箱工具

在使用沙箱环境测试支付时，需要使用这个沙箱版本支付宝测试！

登录时，需要使用上面沙箱账号买家或者[商家]登录。

> 需要在手机上安装沙箱版支付宝
>
> ![image-20221128101022998](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202211281010083.png)

 到这一步，支付的准备工作已经完成，下一步可以编写代码了！



## 使用支付宝支付

> 新建一个SpringBoot工程或者整合到现有的代码中

### 依赖

支付宝支付相关的核心依赖 alipay-easysdk

``` xml
<!-- 阿里支付easy api-->
<dependency>
  <groupId>com.alipay.sdk</groupId>
  <artifactId>alipay-easysdk</artifactId>
  <version>2.2.0</version>
</dependency>

<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>fastjson</artifactId>
  <version>2.0.7</version>
</dependency>

<dependency>
  <groupId>commons-logging</groupId>
  <artifactId>commons-logging</artifactId>
  <version>1.2</version>
</dependency>
```

完整依赖

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.10</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.qf.alipay</groupId>
    <artifactId>alipay</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>alipay</name>
    <description>alipay</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.24</version>
        </dependency>

        <!-- 阿里支付easy api-->
        <dependency>
            <groupId>com.alipay.sdk</groupId>
            <artifactId>alipay-easysdk</artifactId>
            <version>2.2.0</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>2.0.7</version>
        </dependency>

        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.2</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- hutool -->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.3</version>
        </dependency>

        <!-- zxing生成二维码 -->
        <dependency>
            <groupId>com.google.zxing</groupId>
            <artifactId>core</artifactId>
            <version>3.3.3</version>
        </dependency>

      <!-- zxing生成二维码 -->
        <dependency>
            <groupId>com.google.zxing</groupId>
            <artifactId>javase</artifactId>
            <version>3.3.3</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>

```



### 配置

yml 配置文件

``` yaml
alipay:
  # 支付宝沙箱环境或正式环境
  easy:
    # 通讯协议 可以是http 也可以是https[需要服务器配置SSL证书的]
    protocol: http
    ## 网关地址 沙箱环境是alipaydev 正式环境是alipay
    ## 网关地址要看自己的实际值填写 沙箱应用中有
    gatewayHost: openapi.alipaydev.com
    # 签名方式
    signType: RSA2
    # 应用ID
    appId: 2021000121676481
    # 应用私钥
    merchantPrivateKey: MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDYkKGfkKQ2yFvSL7YbIWvJwUbPE7oQ3xv1t92ilapAK81feYZD978e+EJ/sFAnHhBPA53KzRvD0Wl7Cc42cS8UFcm/uSkfg2GqYabEZgr1Lgc2CvYuoBPCM6QWPSeVmDBb6FFQ+9364pX9NJaE444bySNppq+uU1nktyHDiGO1KLB+u2idWDQpnLZIjIcc+935owfdbDpjuF8lDtC726ALpUZxK8SI6NCeDwwEHYmNDZucq6cShoq7G630uAt9NlRviMbrtbQGR7RDTe7i1Tg4FD6Caqp0cWdI+0W2QJPkraMWFanFxI4Xu+s0DOAIzQ7ntMVDgCepYJreI86UGqOrAgMBAAECggEALyKLiuc4VpQVKBIqWI1VoHvopXltre5hb4GtQ42/mGfwMy+IAZMSjfMKxi/hwiHQ+uGWnmU1/dC+XIEt2LuZu41ic9AhGzLFNwg5+9UZ3XM/LowEOPGuWz5SIGT/EJgnLlnKGQ44qjpW2t1vRU0hyPpmMsCMzCxoDFeviZdN3EewYz9/3gFNC7D6GaRinUf/feBLlkSXeVMiBlVqQOLnOuhgCj37GGa9km+NTXmHo03LwdiD8w1qTHIVyLNl84Kl2pxhQkG6jGybTn+3/f6RehpZJoSlmaX+1qfjlafxY3D128W//n9VJHShIYovE7vfblzZmzrUko2BwPykCTRjgQKBgQDsgNYn7Ejk2wQM+HV3ZRNYrP7egaUgK7XlE64fT6C/O0z4mwQHqtFgHrqT/xtWbo++TPRTahAyw7JunHud5uK1Oy1mQuNj0y4aV+MWl0gUR2+EJTf4CWo8SrwZn/LsI3slO4V+X6pbwEMNbTgakN3ZWBb9ge8eiE77sfzrCf52UwKBgQDqawRab9q0lWp4BL0a4zjWvxOyEh5wQnGwme5AK4b4+WpXjYpHvJrZk1bFUWnFe27OPfq0XaIuueGGpy7P9TiazYPMFJhdcSQWWKBIeIRkQEK/zfJMy5d0kLgrIEpewZX3z3FgTZACUY26fUJ0PZa1TjYeC5LDHCZdAosEK6DCSQKBgHRXQIItIwKplsmGo8pTB3xUxZ/RaNh1iCojT0GJ20qXMlsNbqMS7aJ6G1BYaytOghmcI4ixITzHtgvhoJHhlV6PuNqYRuHBbel5mHVxf/yx03LPGERE5WS5YuS8ITT2k0qSiC3Ng7FU1+dP9gxjfS7AvbaBZ46+gRQhz4gTx4CPAoGAItl8ETHV0sjvxh32OxwSpCJN/EgjTE8kdbu8pr+R1kvGGnQJXbbVUolL+hOrZNd/1ptyPQQ6izXJKGqMVBBBtQnekSVyrVmXotbUJVH9ZKYFBlzIq9AMmSC2sHqhc8rVz7yAP2/oe9/B8TqT+ZH6aMPS2c6gp+70aRlqr1kJEjkCgYEAwhGJ6N6aBHDgdvtbsnjGz4O7zlAUrP863YUh8lARLrTx9yDwU6/1mAjQMMnp2j6C5f5JwUHk6HTNesTzdYhSEDR4EzrIhmlC8EoGO8HLtyr4DIsJhxQ8vXoxWtiSZAI1qzckc0mE7DB9SPRM0tdTWnBYo84am9boGYO9ot9tQFw=
    # 支付宝公钥
    alipayPublicKey: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs7HNvMzuFk8+Xa/+kjeiP3qTEBvAQUF9w20yXSO1gBE7Cd/Et4yjqeqRGvIjqPKI8Xfv0kXwPSiYYuk1bFNoFyzuN/W8arKwum0vPf5AeRKdi6N+iHOaT5eRjOPzTL7jYJnNc+I7B998inuMeypVCuHlKa2qpCaN4RndGErK5qTusEP8mDhUhxhMIn1SrayDnT9cb1KK2a3cbOXu1uxQasLsbR3GYOK/g9YAisKGG/egqEM7q91rFC46zOZ0OQ8qLV7S3YQEXnpsAYPS5kH1xtVfFB3Uapo6rckSVDoM0Ryjq3h96fWsgcRme5T4kSQrleIPOqNU8NZJx1NZs4C0RQIDAQAB
    # 这个配置是可选的
    encryptKey: 4p+P9qj0GAQbk7rUjR2/wQ==
    # 授权回调地址[可选]
    notifyUrl: http://localhost:8080/pay/aliPay/notify

```

配置属性类

> 封装上面yml中配置信息的属性类

``` java

/**
 * @Description: 支付宝配置项
 * @Version: V1.0
 */
@Configuration
@Data
@ConfigurationProperties(prefix = "alipay.easy")
public class AliPayProperties {

    //请求协议
    private String protocol;
    // 请求网关
    private String gatewayHost;
    // 签名类型 RSA2
    private String signType;
    // 应用ID
    private String appId;
    // 应用私钥
    private String merchantPrivateKey;
    // 支付宝公钥
    private String alipayPublicKey;
    // 异步通知接收服务地址
    private String notifyUrl;
    // 设置AES密钥
    private String encryptKey;
}

```

配置类

``` java
package com.itheima.alipay.config;

import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Description: 支付宝配置类
 * @Version: V1.0
 */
@Configuration
public class AlipayConfig {

    @Bean
    public Config config(AliPayProperties payProperties) {
        Config config = new Config();
        config.protocol = payProperties.getProtocol();
        config.gatewayHost = payProperties.getGatewayHost();
        config.signType = payProperties.getSignType();

        config.appId = payProperties.getAppId();

        // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
        config.merchantPrivateKey = payProperties.getMerchantPrivateKey();

        //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
        config.alipayPublicKey = payProperties.getAlipayPublicKey();

        //可设置异步通知接收服务地址（可选）
        config.notifyUrl = payProperties.getNotifyUrl();

        //可设置AES密钥，调用AES加解密相关接口时需要（可选） <-- 请填写您的AES密钥，例如：aa4BtZ4tspm2wnXLb1ThQA== -->
        // 接口内容加密方式的加密密钥
        config.encryptKey = payProperties.getEncryptKey();

        // 设置参数（全局只需设置一次）
        Factory.setOptions(config);
        return config;
    }


}

```



### 写代码

#### 官方DEMO

``` java
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.factory.Factory.Payment;
import com.alipay.easysdk.kernel.Config;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.facetoface.models.AlipayTradePrecreateResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        // 1. 设置参数（全局只需设置一次）
        Factory.setOptions(getOptions());
        try {
            // 2. 发起API调用（以创建当面付收款二维码为例）
            AlipayTradePrecreateResponse response = Payment.FaceToFace()
                    .preCreate("Apple iPhone11 128G", "2234567890", "5799.00");
            // 3. 处理响应或异常
            if (ResponseChecker.success(response)) {
                System.out.println("调用成功");
            } else {
                System.err.println("调用失败，原因：" + response.msg + "，" + response.subMsg);
            }
        } catch (Exception e) {
            System.err.println("调用遭遇异常，原因：" + e.getMessage());
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private static Config getOptions() {
        Config config = new Config();
        config.protocol = "https";
        config.gatewayHost = "openapi.alipay.com";
        config.signType = "RSA2";

        config.appId = "<-- 请填写您的AppId，例如：2019091767145019 -->";

        // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
        config.merchantPrivateKey = "<-- 请填写您的应用私钥，例如：MIIEvQIBADANB ... ... -->";

        //注：证书文件路径支持设置为文件系统中的路径或CLASS_PATH中的路径，优先从文件系统中加载，加载失败后会继续尝试从CLASS_PATH中加载
        config.merchantCertPath = "<-- 请填写您的应用公钥证书文件路径，例如：/foo/appCertPublicKey_2019051064521003.crt -->";
        config.alipayCertPath = "<-- 请填写您的支付宝公钥证书文件路径，例如：/foo/alipayCertPublicKey_RSA2.crt -->";
        config.alipayRootCertPath = "<-- 请填写您的支付宝根证书文件路径，例如：/foo/alipayRootCert.crt -->";

        //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
        // config.alipayPublicKey = "<-- 请填写您的支付宝公钥，例如：MIIBIjANBg... -->";

        //可设置异步通知接收服务地址（可选）
        config.notifyUrl = "<-- 请填写您的支付类接口异步通知接收服务地址，例如：https://www.test.com/callback -->";

        //可设置AES密钥，调用AES加解密相关接口时需要（可选）
        config.encryptKey = "<-- 请填写您的AES密钥，例如：aa4BtZ4tspm2wnXLb1ThQA== -->";

        return config;
    }
}
```

#### 改造后的代码

``` java
package com.itheima.alipay.controller;

import com.alibaba.fastjson.JSON;
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.common.models.AlipayTradeQueryResponse;
import com.alipay.easysdk.payment.facetoface.models.AlipayTradePrecreateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

/**
 * @Description:
 * @Version: V1.0
 */
@Slf4j
@RestController
@RequestMapping("pay")
public class EasyPayController {

    /**
     * 支付
     *
     * @param code 订单编号
     * @return {@link String}
     */
    @GetMapping("aliPay/{code}")
    public String pay(@PathVariable String code) {
        try {
            // 2. 发起API调用（以创建当面付收款二维码为例）
            String subject = "iphone 14 pro max 256G";
            String totalMoney = "8999.00";
            log.info("发起支付,订单号{},订单的总金额{}", code, totalMoney);
            // 参数： subject: 商品信息 outTradeNo: 订单编号 totalAmount: 支付总金额
            AlipayTradePrecreateResponse response = Factory.Payment.FaceToFace().preCreate(subject, code, totalMoney);
            // 3. 处理响应或异常
            if (ResponseChecker.success(response)) {
                log.info("支付API调用成功");
                return response.getHttpBody();
            } else {
                log.error("调用失败，原因：" + response.toString());
            }
        } catch (Exception e) {
            log.error("调用遭遇异常，原因：" + e.getMessage());
            throw new RuntimeException(e.getMessage(), e);
        }
        return "ERROR";
    }


    /**
     * 查询支付状态
     *
     * @param code 订单编号
     * @return {@link String}
     */
    @GetMapping("queryPay/{code}")
    public String queryPay(@PathVariable String code) {
        try {
            // 通用能力中的一个接口 查询支付状态
            AlipayTradeQueryResponse response = Factory.Payment.Common().query(code);
            String s = response.getTradeStatus();
            if (Objects.isNull(s)) {
                return "交易不存在";
            }
            if (s.equals("TRADE_SUCCESS")) {
                System.out.println("支付成功......");
                System.out.println("处理订单后续操作.....");
                // 修改订单状态为已支付
            }
            return response.getHttpBody();
        } catch (Exception e) {
            System.err.println("调用遭遇异常，原因：" + e.getMessage());
            throw new RuntimeException(e.getMessage(), e);
        }
    }


}

```


#### API组织规范

在Alipay Easy SDK中，API的引用路径与能力地图的组织层次一致，遵循如下规范

> Factory.能力类别.场景类别.接口方法名称( ... )

比如，如果您想要使用[能力地图](https://opendocs.alipay.com/mini/00am3f)中`营销能力`下的`模板消息`场景中的`小程序发送模板消息`，只需按如下形式编写调用代码即可（不同编程语言的连接符号可能不同）。

```
Factory.Marketing.TemplateMessage().send( ... )
```

其中，接口方法名称通常是对其依赖的OpenAPI功能的一个最简概况，接口方法的出入参与OpenAPI中同名参数含义一致，可参照OpenAPI相关参数的使用说明。

Alipay Easy SDK将致力于保持良好的API命名，以符合开发者的编程直觉。

例如，普通支付

``` java
Factory.Payment.Common().create("Iphone6 16G", "202003019443", "0.10", "2088002656718920");
```



#### 已支持的API列表

| 能力类别           | 场景类别                       | 接口方法名称                                               | 调用的OpenAPI名称                                   |
| ------------------ | ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------- |
| Base 基础能力      | OAuth 用户授权                 | getToken 获取授权访问令牌和用户user_id                     | alipay.system.oauth.token                           |
| Base 基础能力      | OAuth 用户授权                 | refreshToken 刷新授权访问令牌                              | alipay.system.oauth.token                           |
| Base 基础能力      | Qrcode 小程序二维码            | create 创建小程序二维码                                    | alipay.open.app.qrcode.create                       |
| Base 基础能力      | Image 图片                     | upload 上传门店照片                                        | alipay.offline.material.image.upload                |
| Base 基础能力      | Video 视频                     | upload 上传门店视频                                        | alipay.offline.material.image.upload                |
| Member 会员能力    | Identification 支付宝身份认证  | init 身份认证初始化                                        | alipay.user.certify.open.initialize                 |
| Member 会员能力    | Identification 支付宝身份认证  | certify 生成认证链接                                       | alipay.user.certify.open.certify                    |
| Member 会员能力    | Identification 支付宝身份认证  | query 身份认证记录查询                                     | alipay.user.certify.open.query                      |
| Payment 支付能力   | Common 通用                    | create 创建交易                                            | alipay.trade.create                                 |
| Payment 支付能力   | Common 通用                    | query 查询交易                                             | alipay.trade.query                                  |
| Payment 支付能力   | Common 通用                    | refund 交易退款                                            | alipay.trade.refund                                 |
| Payment 支付能力   | Common 通用                    | close 关闭交易                                             | alipay.trade.close                                  |
| Payment 支付能力   | Common 通用                    | cancel 撤销交易                                            | alipay.trade.cancel                                 |
| Payment 支付能力   | Common 通用                    | queryRefund 交易退款查询                                   | alipay.trade.fastpay.refund.query                   |
| Payment 支付能力   | Common 通用                    | downloadBill 查询对账单下载地址                            | alipay.data.dataservice.bill.downloadurl.query      |
| Payment 支付能力   | Common 通用                    | verifyNotify 异步通知验签                                  | -                                                   |
| Payment 支付能力   | Huabei 花呗分期                | create 创建花呗分期交易                                    | alipay.trade.create                                 |
| Payment 支付能力   | FaceToFace 当面付              | pay 扫用户出示的付款码，完成付款                           | alipay.trade.pay                                    |
| Payment 支付能力   | FaceToFace 当面付              | precreate 生成交易付款码，待用户扫码付款                   | alipay.trade.precreate                              |
| Payment 支付能力   | App 手机APP                    | pay 生成订单串，再使用客户端 SDK 凭此串唤起支付宝收银台    | alipay.trade.app.pay                                |
| Payment 支付能力   | Page 电脑网站                  | pay 生成交易表单，渲染后自动跳转支付宝网站引导用户完成支付 | alipay.trade.page.pay                               |
| Payment 支付能力   | Wap 手机网站                   | pay 生成交易表单，渲染后自动跳转支付宝网站引导用户完成支付 | alipay.trade.wap.pay                                |
| Security 安全能力  | TextRisk 文本内容安全          | detect 检测内容风险                                        | alipay.security.risk.content.detect                 |
| Marketing 营销能力 | Pass 支付宝卡包                | createTemplate 卡券模板创建                                | alipay.pass.template.add                            |
| Marketing 营销能力 | Pass 支付宝卡包                | updateTemplate 卡券模板更新                                | alipay.pass.template.update                         |
| Marketing 营销能力 | Pass 支付宝卡包                | addInstance 卡券实例发放                                   | alipay.pass.instance.add                            |
| Marketing 营销能力 | Pass 支付宝卡包                | updateInstance 卡券实例更新                                | alipay.pass.instance.update                         |
| Marketing 营销能力 | TemplateMessage 小程序模板消息 | send 发送模板消息                                          | alipay.open.app.mini.templatemessage.send           |
| Marketing 营销能力 | OpenLife 生活号                | createImageTextContent 创建图文消息内容                    | alipay.open.public.message.content.create           |
| Marketing 营销能力 | OpenLife 生活号                | modifyImageTextContent 更新图文消息内容                    | alipay.open.public.message.content.modify           |
| Marketing 营销能力 | OpenLife 生活号                | sendText 群发本文消息                                      | alipay.open.public.message.total.send               |
| Marketing 营销能力 | OpenLife 生活号                | sendImageText 群发图文消息                                 | alipay.open.public.message.total.send               |
| Marketing 营销能力 | OpenLife 生活号                | sendSingleMessage 单发模板消息                             | alipay.open.public.message.single.send              |
| Marketing 营销能力 | OpenLife 生活号                | recallMessage 生活号消息撤回                               | alipay.open.public.life.msg.recall                  |
| Marketing 营销能力 | OpenLife 生活号                | setIndustry 模板消息行业设置                               | alipay.open.public.template.message.industry.modify |
| Marketing 营销能力 | OpenLife 生活号                | getIndustry 生活号查询行业设置                             | alipay.open.public.setting.category.query           |
| Util 辅助工具      | AES 加解密                     | decrypt 解密，常用于会员手机号解密                         | -                                                   |
| Util 辅助工具      | AES 加解密                     | encrypt 加密                                               | -                                                   |
| Util 辅助工具      | Generic 通用接口               | execute 自行拼接参数，执行OpenAPI调用                      | -                                                   |

> 注：更多高频场景的API持续更新中，敬请期待。

您还可以前往[API Doc](https://github.com/alipay/alipay-easysdk/blob/master/APIDoc.md)查看每个API的详细使用说明。



## 微信

> 微信支付商家未审核通过
>
> 敬请期待...



## 二维码

> 二维码生成

### 依赖

``` xml
<!-- hutool -->
<dependency>
  <groupId>cn.hutool</groupId>
  <artifactId>hutool-all</artifactId>
  <version>5.8.10</version>
</dependency>

<!-- zxing生成二维码 -->
<dependency>
  <groupId>com.google.zxing</groupId>
  <artifactId>core</artifactId>
  <version>3.5.1</version>
</dependency>
<!-- zxing生成二维码 -->
<dependency>
  <groupId>com.google.zxing</groupId>
  <artifactId>javase</artifactId>
  <version>3.5.1</version>
</dependency>
```



### 配置

``` java
@Configuration
public class QRCodeConfig {
    @Bean
    public QrConfig qrConfig() {
        QrConfig qrConfig = new QrConfig();
        // 二维码的背景色
        qrConfig.setBackColor(Color.white);
        // 二维码的前景色
        qrConfig.setForeColor(Color.black);
        return qrConfig;
    }
}
```



### 写代码

业务层接口

``` java
public interface QRService {
    // 生成到本地文件
    void generateFile(String content, File file);

    // 输出到流
    void generateStream(String content, HttpServletResponse response) throws IOException;

    // 生成base64的验证码图片
    String generateBase64(String content);

}
```

业务层实现

``` java
package com.itheima.alipay.service.impl;

import cn.hutool.extra.qrcode.QrCodeUtil;
import cn.hutool.extra.qrcode.QrConfig;
import com.itheima.alipay.service.QRService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class QRServiceImpl implements QRService {
    private final QrConfig qrConfig;

    // 生成到本地文件
    @Override
    public void generateFile(String content, File file) {
        QrCodeUtil.generate(content, qrConfig, file);
    }

    // 输出到流
    @Override
    public void generateStream(String content, HttpServletResponse response) throws IOException {
        QrCodeUtil.generate(content, qrConfig, "png", response.getOutputStream());
    }

    @Override
    public String generateBase64(String content) {
        return QrCodeUtil.generateAsBase64(content,qrConfig,"png");
    }
}

```

控制器层

``` java
package com.itheima.alipay.controller;

import com.itheima.alipay.service.impl.QRServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("qrcode")
public class QRController {
    private final QRServiceImpl qrService;

    /**
     * 生成二维码图片放入响应流中
     * @param content 文字内容
     * @param servletResponse
     * @throws IOException
     */
    @RequestMapping
    public void generateV3(String content, HttpServletResponse servletResponse) throws IOException {
        qrService.generateStream(content, servletResponse);
    }

    /**
     * 生成base64图片
     * @param content 文字内容
     * @return 图片的base64编码
     */
    @RequestMapping("base64")
    public String generateV3(String content) {
        return qrService.generateBase64(content);
    }

}

```





::: details 支付宝和微信支付和二维码生成

> [代码仓库](http://heyige.cn/root/alipay-demo)

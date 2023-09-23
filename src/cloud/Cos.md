---
title: COS对象存储

---

[TOC]

## 什么是对象存储

- 腾讯云叫COS，在阿里云叫OSS，是一样的

> 对象存储（Cloud Object Storage，COS）是腾讯云提供的一种存储海量文件的分布式存储服务，具有高扩展性、低成本、可靠安全等优点。通过控制台、API、SDK 和工具等多样化方式，用户可简单、快速地接入 COS，进行多格式文件的上传、下载和管理，实现海量数据存储和管理。



## 相关配置项

- 图床如果使用COS也需要设置一下配置

![image-20220606172739848](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220606172739848.png)

- 服务器上创建存储桶，从概览查看桶的信息

![image-20220606173018657](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220606173018657.png)

- 从密钥管理查看accessKey/secretKey



## 代码实现

#### POM依赖

```  xml
<!--腾讯云存储依赖-->
<dependency>
    <groupId>com.qcloud</groupId>
    <artifactId>cos_api</artifactId>
    <version>5.2.4</version>
</dependency>
```

#### COS配置文件

```  yml
spring:
  tencent:
    accesskey: 你自己的secretId
    secretKey: 你自己的secretKey
    bucket: ap-nanjing
    bucketName: test-1254123199
    path: https://test-1254123199.cos.ap-nanjing.myqcloud.com
    preffix: img
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
server:
  tomcat:
    max-swallow-size: 10MB
```

#### COS配置类

```  java
@Data
@Component
@ConfigurationProperties(prefix = "spring.tencent")
public class OssConfig {
    private String accesskey;
    private String secretKey;
    private String bucket;
    private String bucketName;
    private String path;
    private String preffix;
}
```

#### 控制器

```  java
/**
 * 文件上传控制器
 */
@Controller
@RequestMapping(value = "/upload")
public class UploadController {

    @Autowired
    OssConfig ossConfig;

    /**
     * 上传到腾讯云服务器（https://cloud.tencent.com/document/product/436/10199）
     *
     * @return
     */
    @PostMapping(value = "/tencent")
    @ResponseBody
    public Object upload(@RequestParam(value = "file") MultipartFile file) {
        if (file == null) {
            return new UploadMsg(0, "文件为空", null);
        }
        // 获取原始上传的文件名
        String oldFileName = file.getOriginalFilename();
        // 获取文件类型[后缀]
        String suffix = oldFileName.substring(oldFileName.lastIndexOf("."));
        // 使用UUID生成新的文件名
        String newFileName = UUID.randomUUID() + suffix;
        // 上传文件按日期生成的路径
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH);
        int day = cal.get(Calendar.DATE);
        // 1 初始化用户身份信息(secretId, secretKey)
        COSCredentials cred = new BasicCOSCredentials(ossConfig.getAccesskey(), ossConfig.getSecretKey());
        // 2 设置bucket的区域, COS地域的简称请参照 https://cloud.tencent.com/document/product/436/6224
        ClientConfig clientConfig = new ClientConfig(new Region(ossConfig.getBucket()));
        // 3 生成cos客户端
        COSClient cosclient = new COSClient(cred, clientConfig);
        // bucket的命名规则为{name}-{appid} ，此处填写的存储桶名称必须为此格式
        String bucketName = ossConfig.getBucketName();

        // 简单文件上传, 最大支持 5 GB, 适用于小文件上传, 建议 20 M 以下的文件使用该接口
        // 大文件上传请参照 API 文档高级 API 上传
        File localFile = null;
        try {
            localFile = File.createTempFile("temp", null);
            file.transferTo(localFile);
            // 指定要上传到 COS 上的路径
            String key = "/" + ossConfig.getPreffix() + "/" + year + "/" + month + "/" + day + "/" + newFileName;
            // 上传文件的请求对象
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, localFile);
            // 使用COS客户端上传文件
            PutObjectResult putObjectResult = cosclient.putObject(putObjectRequest);
            return new UploadMsg(1, "上传成功", ossConfig.getPath() + putObjectRequest.getKey());
        } catch (IOException e) {
            return new UploadMsg(-1, e.getMessage(), null);
        } finally {
            // 关闭客户端(关闭后台线程)
            cosclient.shutdown();
        }
    }

    private class UploadMsg {
        public int status;
        public String msg;
        public String path;

        public UploadMsg() {
            super();
        }

        public UploadMsg(int status, String msg, String path) {
            this.status = status;
            this.msg = msg;
            this.path = path;
        }
    }
}
```

#### 上传验证

![image-20220606173744126](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220606173744126.png)


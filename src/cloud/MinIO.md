---
title: MinIO
---

> 类似于FastDFS/HDFS的一个文件存储服务！
>
> SpringBoot整合MinIO实现分布式文件服务！

## 什么是MinIO？

Minio 是个基于 Golang 编写的开源对象存储套件，基于Apache License v2.0开源协议，虽然轻量，却拥有着不错的性能。它兼容亚马逊S3云存储服务接口。可以很简单的和其他应用结合使用，例如 NodeJS、Redis、MySQL等。

### **1. 应用场景**

MinIO 的应用场景除了可以作为私有云的对象存储服务来使用，也可以作为云对象存储的网关层，无缝对接 `Amazon S3` 或者 `MicroSoft Azure` 。

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131843.jpeg)

### **2. 特点**

1. **高性能**：作为一款高性能存储，在标准硬件条件下，其读写速率分别可以达到 `55Gb/s` 和 `35Gb/s`。并且MinIO 支持一个对象文件可以是任意大小，从几kb到最大5T不等。

2. **可扩展**：不同MinIO集群可以组成联邦，并形成一个全局的命名空间，并且支持跨越多个数据中心。

3. **云原生**：容器化、基于K8S的编排、多租户支持。

4. **Amazon S3兼容**：使用 Amazon S3 v2 / v4 API。可以使用Minio SDK，Minio Client，AWS SDK 和 AWS CLI 访问Minio服务器。

5. **SDK支持**：

6. - GO SDK：<https://github.com/minio/minio-go>
   - JavaSDK：<https://github.com/minio/minio-java>
   - PythonSDK：<https://github.com/minio/minio-py>

7. **图形化界面**：有操作页面

8. **支持纠删码**：MinIO使用纠删码、Checksum来防止硬件错误和静默数据污染。在最高冗余度配置下，即使丢失1/2的磁盘也能恢复数据。

> 功能很强大~
>
> 源码地址：<https://github.com/minio/minio>
>
> 中文文档地址：<https://www.minio.org.cn/index.shtml>

## 安装MinIO

安装非常简单，这里使用docker安装，步骤如下：

### **1. 获取镜像**

执行命令如下：

```shell
docker pull minio/minio
```

### **2. 启动镜像**

执行命令如下：

```shell
 docker run -p 9000:9000 -p 9001:9001 --name minio -d --restart=always -e "MINIO_ACCESS_KEY=admin" -e "MINIO_SECRET_KEY=admin123" -v /home/data:/data -v /home/config:/root/.minio minio/minio server --console-address ":9000" --address ":9001" /data
```

命令解释如下：

- **-p**：**9000**是图形界面的端口，**9001**是API的端口，在使用SDK连接需要用到
- **MINIO_ACCESS_KEY**：指定图形界面的用户名
- **MINIO_SECRET_KEY**：指定图形界面的密码

按照上述两个步骤启动成功即可。

> 注意：ACCESS_KEY 长度最少3个字符，SECRET_KEY 长度最少8个字符

### **3. 图形界面操作**

安装成功后直接访问地址：**http:/ip:9000/login**，如下：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131877.png)

输入用户名和密码登录成功后，如下：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131787.png)

菜单很多，这里就不再详细介绍了，笔者这里直接在**Buckets**菜单中创建一个桶为**test**，如下图：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131850.png)

并且设置这个桶的隐私规则为**public**，如下：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131805.png)

> MinIO到此已经安装设置成功了

## SpringBoot整合MinIO上传文件

虽然MinIO在图形界面提供了手动上传的操作，但是也可以通过SDK的方式去上传，下面介绍一下Spring Boot 整合MinIO上传文件。

### **1. 获取accessKey和secretKey**

这里的**accessKey**和**secretKey**并不是图形界面登录名和密码，获取很简单，直接在图形界面中操作，如下图：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131798.png)

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131181.png)

### **2. 添加依赖**

添加MinIO的依赖，如下：

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.2.1</version>
</dependency>
```

### **3. 添加配置**

这里对SDK做了简单的封装，案例源码都会提供，下面只列出部分代码。

在**aplication.yml**配置中添加MInIO相关的配置，如下：

```yml
minio:
  # 访问的url
  endpoint: http://192.168.47.148
  # API的端口
  port: 9001
  # 秘钥
  accessKey: HQGWFYLWGC6FVJ0CQFOG
  secretKey: pUGhAgQhZDxJaLmN3uz65YX7Bb3FyLdLglBvcCr1
  secure: false
  bucket-name: test # 桶名 我这是给出了一个默认桶名
  image-size: 10485760 # 我在这里设定了 图片文件的最大大小
  file-size: 1073741824 # 此处是设定了文件的最大大小
```

### **4. 新建上传文件接口**

> 在进行文件上传之前需要编写上传工具类和配置类
>
> 参考官方实例代码如下： <https://github.com/minio/minio-java-rest-example>
>
> 私有仓库项目地址：<http://heyige.cn/2210/java-minio>
>
> 控制器的上传文件接口，如下：

```java
/**
 * @author 
 */
@RequestMapping("/minio")
@RestController
public class MinioController {

    @Autowired
    private  MinioService minioService;

    @PostMapping("/upload")
    public String uploadFile(MultipartFile file, String bucketName) {
        String fileType = FileTypeUtils.getFileType(file);
        if (fileType != null) {
            return minioService.putObject(file, bucketName, fileType);
        }
        return "不支持的文件格式。请确认格式,重新上传！！！";
    }
}
```

### **5. 测试**

上述4个步骤已经整合完成了，下面直接调用接口上传一张图片试一下，如下：

> 注意：使用PostMan上传文件时，需要设置文件所在的工作目录
>
> | 文件> 设置                                                   |
> | ------------------------------------------------------------ |
> | ![image-20220908150905431](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081509526.png) |
> | 选择工作目录后，只能上传工作目录下的文件                     |
> | ![image-20220908150940700](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081509813.png) |

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131188.png)

接口返回的**URL**就是文件的访问地址，直接输入浏览器访问即可。

在MInIO中也可以看到存储的文件，如下图：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131106.png)

如果你需要分享给别人，也可以手动分享，有效期是7天，一旦过了这个有效期将会失效，如下：

![图片](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209081131258.png)

## 总结

MInIO虽然是个开源项目，但是功能非常强大，小型项目中完全可以用它实现对象存储，也可以使用MinIO搭建一个免费的图床。

## 项目源码地址

[源码地址](http://heyige.cn/2210/java-minio)

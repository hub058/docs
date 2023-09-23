---
title: SpringBoot
---

## 一、引言

### 1.1 初始化配置

> 为了使用SSM框架去开发，准备SSM框架的模板配置。

### 1.2 整合第三方框架

> 为了Spring整合第三方框架，单独的去编写xml文件。

### 1.3 后期维护

> 后期SSM项目后期xml文件特别多，维护xml文件的成本是很高的

### 1.4 部署工程

> SSM工程部署也是很麻烦，依赖第三方的容器

### 1.5 敏捷式开发

> 基于Java的SSM开发方式是很笨重，而现在的python，php，NodeJS的敏捷式开发已经盖过Java一头



## 二、SpringBoot介绍

**约定大于配置** **简化Java开发**

----

> SpringBoot是由Pivotal团队研发的，SpringBoot并不是一门新技术，只是将之前常用的Spring，SpringMVC，data-jpa等常用的框架封装到了一起，帮助你隐藏这些框架的整合细节，实现敏捷开发。
>
> SpringBoot就是一个工具集。


> SpringBoot特点：
>
> - SpringBoot项目不需要模板化的配置。 
> - SpringBoot中整合第三方框架时，只需要导入相应的starter依赖包，就自动整合了。
> - SpringBoot默认只有一个.properties的配置文件，不推荐使用xml，后期会采用.java的文件去编写配置信息。
> - SpringBoot工程在部署时，采用的是jar包的方式，内部自动依赖Tomcat容器，提供了多环境的配置。
> - 后期要学习的微服务框架SpringCloud需要建立在SpringBoot的基础上。



## 三、SpringBoot快速入门【`重点`】

### 3.1 快速构建SpringBoot

#### 3.1.1 选择构建项目的类型

|                选择构建项目的类型/项目的描述                 |
| :----------------------------------------------------------: |
| ![image-20220816094648061](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208160946236.png) |



#### 3.1.2 指定SpringBoot版本和需要的依赖

|                指定SpringBoot版本和需要的依赖                |
| :----------------------------------------------------------: |
| ![image-20220816094618779](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208160946026.png) |



#### 3.1.3 导入依赖

```  xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<!-- 将上述内容修改为下面的效果 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```



#### 3.1.4 编写了Controller

```  java
@RestController
public class HelloController {

    @GetMapping("hello")
    public String hello(){
        return "Hello SpringBoot!";
    }
}
```



#### 3.1.6 测试


### 3.2 SpringBoot的目录结构

#### 3.2.1 pom.xml文件

> - 指定了一个父工程： 指定当前工程为SpringBoot，帮助我们声明了starter依赖的版本。
> - 项目的元数据：包名，项目名，版本号。
> - 指定了properties信息：指定了java的版本为1.8
> - 导入依赖：默认情况导入spring-boot-starter，spring-boot-starter-test
> - 插件：spring-boot-maven-plugin
> - ![image-20220518102106235](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220518102106235.png)



#### 3.2.2 .gitignore文件

> 默认帮我们忽略了一些文件和目录，避免提交到Git仓库中



#### 3.2.3 src目录

```  json
-src
  -main	  
    -java
      -包名
        启动类.java			# 需要将controller类，放在启动类的子包中或者同级包下
    -resources
      -static				  # 存放静态资源的
      -templates			   # 存储模板页面的
      application.properties	 # SpringBoot提供的唯一的配置文件
  -test   				      # 只是为了测试用的
```



### 3.3 SpringBoot三种启动方式

#### 3.3.1 运行启动类的main方法

> 运行main方法即可



#### 3.3.2 maven命令

```  sh
mvn spring-boot:run
```



#### 3.3.3 采用jar包的方式运行

> ![image-20220816101717169](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208161017304.png)
>
> 将当前项目打包成一个jar文件，然后找到jar包目录，并执行java -jar jar文件运行
>
> ![image-20220816102136077](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208161021228.png)



## 四、SpringBoot常用注解【`重点`】

### 4.1 @Configuration和@Bean

``` xml
<beans>
    <bean id="user" class="com.qf.boot.entity.User">
        <property name="id" value="1"/>
        <property name="name" value="一帆"/>
        <property name="age" value="18"/>
    </bean>
    
</beans>
```

> - 之前使用SSM去开发时，在xml文件中编写bean标签，但是SpringBoot不推荐使用xml文件。
>
> - @Configuration注解相当于beans标签
>
> - @Bean注解相当于bean标签
>  - id=“方法名 | 注解中的name属性（优先级更高）”
>   -  class=“方法的返回结果”

```  java
@Configuration   // 代表当前类是一个配置类
public class UserConfig {
    
    @Bean     // 构建一个实例，放到spring容器中
    public User user(){
        User user = new User();
        user.setId(1);
        user.setName("一帆");
        user.setAge(18);
        return user;
    }
    
}
```



### 4.2 @SpringBootApplication

> @SpringBootApplication就是一个组合注解：
>
> -  @SpringBootConfiguration就是@Configuration注解，代表启动类就是一个配置类。@Component
> - @EnableAutoConfiguration帮你实现自动装配的，SpringBoot工程启动时，运行一个SpringFactoriesLoader的类，加载META-INF/spring.factories配置类（已经开启的），通过SpringFactoriesLoader中的load方法，以for循环的方式，一个一个加载。
>   - 好处：无需编写大量的整合配置信息，只需要按照SpringBoot提供好了约定去整合即可。
>   - 坏处：如果说你导入了一个starter依赖，那么你就需要填写他必要的配置信息。
>   - 手动关闭自动装配指定内容：@SpringBootApplication(exclude = QuartzAutoConfiguration.class)
> -  @ComponentScan就相当于<context:component-scan basePackage=“包名” />，帮助扫描注解的。



## 五、SpringBoot常用配置【`重点`】

### 5.1 SpringBoot的配置文件格式 yaml/yml

> SpringBoot的配置文件支持properties和yml，甚至他还支持json。
>
> 更推荐使用yml文件格式：
>
> 1. yml文件，会根据换行和缩进帮助咱们管理配置文件所在位置
>
>  	2. yml文件，相比properties更轻量级一些
>
> yml文件的劣势：
>
> 1. 严格遵循换行和缩进
>
>  	2. 在填写value时，一定要在: **后面跟上空格**



### 5.2 多环境配置

测试环境 开发环境 日常环境 预发环境  线上[生产]环境

> 在application.yml文件中添加一个配置项：

```  yml
spring:
  profiles:
    active: 环境名
```

> 在resource目录下，创建多个application-环境名.yml文件即可
>
> 在部署工程时，通过 java -jar jar文件 --spring.profiles.active=环境



### 5.3 引入外部配置文件信息

> 和传统的SSM方式一样，通过@Value的注解去获取properties/yml文件中的内容。
>
> 如果在yml文件中需要编写大量的自定义配置，并且具有统一的前缀时，采用如下方式

```  java
// Java程序
@ConfigurationProperties(prefix = "tencent")
@Component
@Data
public class TencentProperties {
    private String appId;
    private String spaceName;
    private String region;
    private String path;
}


tencent:
  # 配置项的名字支持驼峰中划线和下划线命名
  appId: zed12345
  spaceName: qfedu
  region: Shanghai
  path: /img
```

```  yml
yml中使用中文value？  使用双引号""括起来
```



### 5.4 热加载/热更新

#### 5.4.1 导入依赖

```  xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```



#### 5.4.2 settings配置

|                     修改settings中的配置                     |
| :----------------------------------------------------------: |
| ![image-20220517234018299](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220517234018299.png) |

> IDEA窗口失去焦点的时候，更新java字节码文件和配置文件
>
> 必须DEBUG，调试运行项目



## 六、SpringBoot整合Mybatis【`重点`】

### 6.1 xml方式整合Mybatis

> xml方式在编写复杂SQL时，更适合  UserMapper.xml

#### 6.1.1 导入依赖。

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.qf</groupId>
    <artifactId>boot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>boot</name>
    <description>boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <!-- 实现热更新的依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- mysql驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!-- druid数据源 -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.2.12</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.2</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```



#### 6.1.2 编写配置文件

``` yaml
# 数据库连接信息的配置
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/java2208?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8
    username: root
    password: root
# MyBatis的配置
mybatis:
  # mapper.xml文件的位置
  mapper-locations: classpath:mapper/*.xml
  # 扫描实体类别名
  type-aliases-package: com.qf.boot.entity
  configuration:
    # 开启表中的字段下划线名称转Java属性中的驼峰命令
    map-underscore-to-camel-case: true
```



> 实体类可以自动生成

```  java

/**
 * 空气质量表(Air)实体类
 *
 * @author makejava
 * @since 2022-08-16 15:18:03
 */
public class Air implements Serializable {
    private static final long serialVersionUID = 714509599831044452L;
    /**
     * 主键ID
     */
    private Integer id;
    /**
     * 区域ID
     */
    private Integer districtId;
    /**
     * 检测时间
     */
    private Date monitorTime;
    /**
     * PM10
     */
    private Integer pm10;
    /**
     * PM25
     */
    private Integer pm25;
    /**
     * 检测站
     */
    private String monitoringStation;
    /**
     * 更新时间
     */
    private Date lastModifyTime;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    public Date getMonitorTime() {
        return monitorTime;
    }

    public void setMonitorTime(Date monitorTime) {
        this.monitorTime = monitorTime;
    }

    public Integer getPm10() {
        return pm10;
    }

    public void setPm10(Integer pm10) {
        this.pm10 = pm10;
    }

    public Integer getPm25() {
        return pm25;
    }

    public void setPm25(Integer pm25) {
        this.pm25 = pm25;
    }

    public String getMonitoringStation() {
        return monitoringStation;
    }

    public void setMonitoringStation(String monitoringStation) {
        this.monitoringStation = monitoringStation;
    }

    public Date getLastModifyTime() {
        return lastModifyTime;
    }

    public void setLastModifyTime(Date lastModifyTime) {
        this.lastModifyTime = lastModifyTime;
    }

}
// ================================================

/**
 * (District)实体类
 *
 * @author makejava
 * @since 2022-08-16 15:14:12
 */
public class District implements Serializable {
    private static final long serialVersionUID = -34716519868199972L;
    /**
     * 主键
     */
    private Integer id;
    /**
     * 区域名称
     */
    private String name;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

```

```  sql
create table air(
    id int primary key auto_increment comment '主键ID',
    district_id int not null comment '区域ID',
    monitor_time date comment '检测时间',
    pm10 int comment 'PM10',
    pm25 int comment 'PM25',
    monitoring_station varchar(100) comment '检测站',
    last_modify_time date comment '更新时间'
)default charset='UTF8' comment '空气质量表';

-- 创建区域表
create table district(
    id int primary key auto_increment comment '主键',
    name varchar(50) not null comment '区域名称'
)charset='UTF8';
```



#### 6.1.3 准备Mybatis

> 接口和Mapper.xml文件自动生成,也可以手动写



#### 6.1.4 测试

```  java
package com.qf.bootmybatis;

import com.qf.bootmybatis.dao.AirDao;
import com.qf.bootmybatis.entity.Air;
import com.qf.bootmybatis.service.AirService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class BootMybatisApplicationTests {

    @Autowired
    AirService airService;

    @Autowired
    AirDao airDao;

    /**
     * 单元测试方法要求
     * 1、方法前面必须添加 @Test注解
     * 2、不能有参数
     * 3、不能有返回值
     */
    @Test
    void queryById() {
        Air air = airService.queryById(1);
        // 断言结果不为空
        Assertions.assertNotNull(air);
    }

    @Test
    void deleteById() {
        boolean delete = airService.deleteById(3);
        // 断言结果应该是true
        // Assertions.assertTrue(delete);
        System.out.println(delete);
    }

    @Test
    void findAirAll(){
        List<Air> airList = airDao.findAll();
        airList.forEach(System.out::println);
    }

}

```



### 6.2 注解方式整合Mybatis

> 注解方式在编写配置简单，简单SQL推荐使用

#### 6.2.1 创建District的Mapper接口

```  java
public interface DistrictDao {
    
    List<District> findAll();
}
```



#### 6.2.2 添加Mybatis注解

> 针对增删改查：@Insert，@Delete，@Update，@Select
>
> 还是需要在启动类中添加@MapperScan注解

```  java
/**
  * 查询所有区域
  * @return 区域列表
  */
@Select("SELECT * FROM district")
List<District> findAll();
```



#### 6.2.3 添加配置

```  yml
// yml文件
# 日志配置
logging:
  level:
    # dao层日志级别设置为debug，可以查看运行的SQL和参数，方便调试问题
    com.qf.bootmybatis.dao: debug
```



#### 6.2.4 测试，查看日志

```  java
class DistrictMapperTest extends BootMybatisApplicationTests {

    @Autowired
    private DistrictDao mapper;

    @Test
    void findAll() {
        List<District> list = mapper.findAll();
        for (District district : list) {
            System.out.println(district);
        }
    }
}
```



### 6.3 SpringBoot整合分页助手

#### 6.3.1 导入依赖

```  xml
<!--        pageHelper依赖-->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.2</version>
</dependency>
```



#### 6.3.2 测试使用

```  java
@Test
public void findByPage(){
    //1. 执行分页
    PageHelper.startPage(1,5);

    //2. 执行查询
    List<Air> list = airMapper.findAll();

    //3. 封装PageInfo对象
    PageInfo<Air> pageInfo = new PageInfo<>(list);

    //4. 输出
    for (Air air : pageInfo.getList()) {
        System.out.println(air);
    }
}
```

> 这里也可以写一个业务层的分页查询方法！



## 七、SpringBoot整合JSP

### 7.1 需要导入依赖

```  xml
<!--        JSP核心引擎依赖-->
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
<!--        JSTL-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
</dependency>
```



### 7.2 创建JSP页面

|              创建webapp以及WEB-INF去存放JSP页面              |
| :----------------------------------------------------------: |
| ![image-20220816230352440](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208162313760.png) |
|                         项目结构如下                         |
| ![image-20220816230231828](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208162313767.png) |

index.jsp页面内容如下

``` txt
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>首页 ${name}</h1>
</body>
</html>
```



### 7.3 创建Contorller

```  java
// Controller
@Controller
public class JspController {

    @GetMapping("/index")
    public String index(Model model){
        model.addAttribute("name","张三");
        return "index";
    }
}
```



### 7.4 配置前缀和后缀

```  yml
spring:
  mvc:
    # 视图的前缀和后缀
    view:
      prefix: /WEB-INF/jsp/
      suffix: .jsp
```



列表和删除

``` java
package com.qf.bootmybatis.controller;

import com.qf.bootmybatis.entity.District;
import com.qf.bootmybatis.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author zed
 * @date 2022/8/17
 */
@Controller
public class DistrictController {

    @Autowired
    DistrictService service;

    @GetMapping("/")
    public String listAll(Model model) {
        List<District> list = service.findAll();
        model.addAttribute("list", list);
        return "index";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable("id") Integer id, HttpServletRequest request,Model model) {
        if (service.deleteById(id)) {
            return "redirect:/" + request.getContextPath();
        }else {
            model.addAttribute("error","删除失败");
            return "index";
        }
    }
}
```

页面

``` jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>首页</title>
</head>
<body>
<h4>${error}</h4>
<h1>区域列表</h1>
<table border="1">
    <thead>
    <td>编号</td>
    <td>区域名称</td>
    <td>操作</td>
    </thead>
    <c:forEach items="${list}" var="d" varStatus="s">
        <tr style="background-color: <c:if test="${s.index%2==0}">red</c:if><c:if test="${s.index%2!=0}">purple</c:if> ">
            <td>${d.id}</td>
            <td>${d.name}</td>
            <td>
                <a href="${pageContext.request.contextPath}/delete/${d.id}">删除</a>
            </td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
```



## 八、SpringBoot整合Swagger/knife4j

```yaml
knife4j: 在线接口文档和接口测试工具,是swagger工具的增强版本
```

> 添加依赖

``` xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

> 修改配置文件

``` yaml
spring:
  mvc:
    pathmatch:
      # Springfox使用的路径匹配是基于AntPathMatcher的
      # 所以需要配置此参数
      matching-strategy: ant_path_matcher
```

> Swagger的配置类

``` java
package com.qf.bootmybatis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Knife4jConfiguration {

    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        String groupName = "3.X版本";
        Docket docket = new Docket(DocumentationType.OAS_30)
                .apiInfo(new ApiInfoBuilder()
                        .title("这是knife4j API ")
                        .description("# 这里记录服务端所有的接口的入参，出参等等信息")
                        .termsOfServiceUrl("http://i.heyige.cn")
                        .contact(new Contact("稀客大大", "http://i.heyige.cn", "877058128@qq.com"))
                        .version("3.0")
                        .build())
                //分组名称
                .groupName(groupName)
                .select()
                //这里指定Controller扫描包路径
                .apis(RequestHandlerSelectors.basePackage("com.qf.bootmybatis.controller"))
                .paths(PathSelectors.any())
                .build();
        return docket;
    }

}
```

> 控制层Controller接口

``` java
@Controller
@Api(tags = "测试swagger")
public class HelloController {

    @GetMapping("/hi")
    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation("测试接口")
    public String index(Model model, String name) {
        model.addAttribute("name", name);
        return "index";
    }
}
```

> 在浏览器中访问： `http://localhost:8080/doc.html` 访问路径是项目下的 `doc.html`

| 界面图                                                       |
| ------------------------------------------------------------ |
| ![image-20220816232529830](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208162325984.png) |
| 接口测试界面                                                 |
| ![image-20220816232605206](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208162326379.png) |



## 九、邮件和验证码

#### SpringBoot发送邮件

> 1、依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

准备工作，获取邮箱授权码

| 在QQ邮箱网页的，设置=>账户下 开启服务，生成授权码            |
| ------------------------------------------------------------ |
| ![image-20220817120826360](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208171208620.png) |



> 2、配置

```yaml
spring:
  # 邮件
  mail:
    username: 877058128@qq.com
    password: 授权码
    host: smtp.qq.com
    port: 465
    protocol: smtp
    properties:
      mail:
        smtp:
          ssl:
            enable: true
          auth: true
          starttls:
            enable: true
            required: true
          socketFactory:
            port: 465
            class: javax.net.ssl.SSLSocketFactory
```



> 3、测试

```java
@SpringBootTest
public class Boot1ApplicationTests {
    
    @Autowired
    JavaMailSender javaMailSender;

    // 发送普通邮件
    @Test
    public void sendSimpleMail() {
        // 构建一个邮件对象
        SimpleMailMessage message = new SimpleMailMessage();
        // 设置邮件主题
        message.setSubject("这是一封测试邮件");
        // 设置邮件发送者，这个跟application.yml中设置的要一致
        message.setFrom("877058128@qq.com");
        // 设置邮件接收者，可以有多个接收者，中间用逗号隔开，以下类似
        // message.setTo("1*****@qq.com","2*****qq.com");
        message.setTo("877058128@qq.com");
        // 设置邮件发送日期
        message.setSentDate(new Date());
        // 设置邮件的正文
        message.setText("这是测试邮件的正文");
        // 发送邮件
        javaMailSender.send(message);
    }
    
    // 发送富文本邮件
    @Test
    public void sendMimeMail() throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        // 构建一个邮件对象
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
        // 设置邮件主题
        helper.setSubject("这是一封测试邮件");
        // 设置邮件发送者，这个跟application.yml中设置的要一致
        helper.setFrom("877058128@qq.com");
        helper.setTo("877058128@qq.com");
        // 设置邮件发送日期
        helper.setSentDate(new Date());
        // 设置邮件的正文 true：是html文件
        helper.setText("<h1 style=\"color:red\">这是测试邮件的正文111</h1>",true);
        // 发送邮件
        javaMailSender.send(mimeMessage);
    }

}
```

#### SpringBoot验证码

> 1、依赖

```xml
<dependency>
    <groupId>com.github.whvcse</groupId>
    <artifactId>easy-captcha</artifactId>
    <version>1.6.2</version>
</dependency>
```



> 2、使用

```java
@GetMapping("/captcha")
public void getCaptcha(HttpServletResponse response) throws IOException {
    ServletOutputStream outputStream = response.getOutputStream();
    // 算术验证码
    // ArithmeticCaptcha arithmeticCaptcha = new ArithmeticCaptcha(120,40);

    // 中文验证码
    // ChineseCaptcha captcha =new ChineseCaptcha(120, 40);

    // 英文与数字验证码
    // SpecCaptcha captcha = new SpecCaptcha(120, 40);

    // 英文与数字动态验证码
    // GifCaptcha captcha = new GifCaptcha(120, 40);

    // 中文动态验证码
    ChineseGifCaptcha chineseCaptcha = new ChineseGifCaptcha();
    chineseCaptcha.setLen(2);
    System.out.println(chineseCaptcha.text());
    chineseCaptcha.out(outputStream);
}
```



## 十、 SpringBoot练习

> 日报需求
>
> 技术选型：
>
> 1、SpringBoot + VUE
>
> 2、SpringBoot + JSP
>
> 实现步骤：
>
> 需求分析：有哪些页面，哪些功能
>
> 业务流程图：Drow.io
>
> 原型设计：Adobe XD
>
> 数据库设计：根据页面和功能，设计表和字段
>
> 框架搭建：Spring Boot+MyBatis
>
> 代码生成：EasyCode
>
> 接口文档：Knife4J
>
> 编码实现：
>
> 界面设计：



| 参考界面                                                     |
| ------------------------------------------------------------ |
| ![image-20220518225906106](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208162344922.png) |
| ![image-20220518225946661](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208162344986.png) |



|                      web原型图-注册页面                      |
| :----------------------------------------------------------: |
| ![image-20220817155015401](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208171550626.png) |
|                           登录页面                           |
| ![image-20220817155033647](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208171550799.png) |
|                           新增日报                           |
| ![image-20220817155056634](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208171550775.png) |
|                           日报列表                           |
| ![image-20220817155123188](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208171551337.png) |
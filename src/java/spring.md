---
title: Spring
---

![LOGO](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/LOGO.png)


## 一、引言

------

### 1.1 原生web开发中存在哪些问题？

> * 传统Web开发存在硬编码所造成的过度程序耦合（例如：Service中作为属性Dao对象）。
>
> * 部分Java EE API较为复杂，使用效率低（例如：JDBC开发步骤）。
>
> * 侵入性强，移植性差（例如：DAO实现的更换，从Connection到SqlSession）。



## 二、Spring框架

------

### 2.1 概念

> * Spring是一个项目管理框架，同时也是一套Java EE解决方案。
>
> * Spring是众多优秀设计模式的组合（工厂、单例、代理、适配器、包装器、观察者、模板、策略）。
>
> * Spring并未替代现有框架产品，而是将众多框架进行有机整合，简化企业级开发，俗称"胶水框架"。



### 2.2 访问与下载

> 官方网站：<https://spring.io/>
>
> 下载地址：<http://repo.spring.io/release/org/springframework/spring/>



## 三、Spring架构组成

全景图

------


> Spring架构由诸多模块组成，可分类为
>
> * 核心技术：[依赖注入]()，事件，资源，i18n，验证，数据绑定，类型转换，SpEL，[AOP]()。
> * 测试：模拟对象，TestContext框架，Spring MVC测试，WebTestClient。
> * 数据访问：[事务]()，DAO支持，JDBC，ORM，封送XML。
> * Spring MVC和 Spring WebFlux Web框架。
> * 集成：远程处理，JMS，JCA，JMX，电子邮件，任务，调度，缓存。
> * 语言：Kotlin，Groovy，动态语言。

| Spring架构组成 |
| :------------: |
|                |

| **GroupId**         | **ArtifactId**             | **说明**                                           |
| ------------------- | -------------------------- | -------------------------------------------------- |
| org.springframework | [spring-beans]()           | [Beans 支持，包含 Groovy]()                        |
| org.springframework | [spring-aop]()             | [基于代理的AOP支持]()                              |
| org.springframework | [spring-aspects]()         | [基于AspectJ 的切面]()                             |
| org.springframework | [spring-context]()         | [应用上下文运行时，包括调度和远程抽象]()           |
| org.springframework | [spring-context-support]() | [支持将常见的第三方类库集成到 Spring 应用上下文]() |
| org.springframework | [spring-core]()            | [其他模块所依赖的核心模块]()                       |
| org.springframework | [spring-expression]()      | [Spring 表达式语言，SpEL]()                        |
| org.springframework | spring-instrument          | JVM 引导的仪表（监测器）代理                       |
| org.springframework | spring-instrument-tomcat   | Tomcat 的仪表（监测器）代理                        |
| org.springframework | spring-jdbc                | 支持包括数据源设置和 JDBC 访问支持                 |
| org.springframework | spring-jms                 | 支持包括发送/接收JMS消息的助手类                   |
| org.springframework | spring-messaging           | 对消息架构和协议的支持                             |
| org.springframework | spring-orm                 | 对象/关系映射，包括对 JPA 和 Hibernate 的支持      |
| org.springframework | spring-oxm                 | 对象/XML 映射（Object/XML Mapping，OXM）           |
| org.springframework | [spring-test]()            | [单元测试和集成测试支持组件]()                     |
| org.springframework | [spring-tx]()              | [事务基础组件，包括对 DAO 的支持及 JCA 的集成]()   |
| org.springframework | [spring-web]()             | [web支持包，包括客户端及web远程调用]()             |
| org.springframework | [spring-webmvc]()          | [REST web 服务及 web 应用的 MVC 实现]()            |
| org.springframework | spring-webmvc-portlet      | 用于 Portlet 环境的MVC实现                         |
| org.springframework | spring-websocket           | WebSocket 和 SockJS 实现，包括对 STOMP 的支持      |
| org.springframework | [spring-jcl]()             | [Jakarta Commons Logging 日志系统]()               |

## 四、自定义工厂

talk is cheep, show me code

### 4.1 配置文件

```  pro
# 自定义一个组件的名字=类的完整名字
userDao=com.qf.dao.impl.UserDaoImpl
userService=com.qf.service.impl.UserServiceImpl
```  

### 4.2 工厂类

```  java
package com.qf;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author zed
 * @date 2022/4/25 10:42
 */
public class MyFactory {

    private Properties properties;

    public MyFactory() {
        try {
            // 1、读取配置文件
            InputStream inputStream = MyFactory.class.getResourceAsStream("/bean.properties");
            // 把配置文件信息写入到一个properties对象中 key,value
            properties = new Properties();
            properties.load(inputStream);
            System.out.println(properties);
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    // 提供一个根据传入的名字获取对象实例的方法
    public Object getBean(String name) throws Exception {
        // classPath 类的完整名字
        String classPath = (String) properties.get(name);
        // 使用反射构造一个类的实例
        Class cls = Class.forName(classPath);
        // newInstance 获取类的实例 new 对象();
        return cls.newInstance();
    }
}
```  

测试代码

```  java
public class App {
    public static void main(String[] args) throws Exception {
        MyFactory factory = new MyFactory();
        // 传入名字获取对象
        Object userService = factory.getBean("userService");
        System.out.println(userService);
    }
}
```  





## 五、构建Maven项目

------

### 5.1 新建项目

|                使用IDEA打开已创建的文件夹目录                |
| :----------------------------------------------------------: |
| ![002](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/002.png) |



### 5.2 选择Maven目录

|                        选择Maven项目                         |
| :----------------------------------------------------------: |
| ![003](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/003.png) |



### 5.3 GAV坐标

|                           GAV坐标                            |
| :----------------------------------------------------------: |
| ![004](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/004.png) |



## 六、Spring环境搭建

------

### 6.1 pom.xml中引入Spring常用依赖

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation=
         "http://maven.apache.org/POM/4.0.0 
          http://maven.apache.org/xsd/maven-4.0.0.xsd">
  
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.qf</groupId>
    <artifactId>hello-spring</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!-- Spring常用依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.1.6.RELEASE</version>
        </dependency>
    </dependencies>
</project>

```  



### 6.2 创建Spring配置文件

> 命名无限制，约定俗成命名有：spring-context.xml、applicationContext.xml、beans.xml

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   
</beans>
```  

## 七、Spring工厂编码

------

> 定义目标Bean类型

```  java
public class User {
    private Integer id;
    private String name;
    // 省略set/get
}
```  

> spring-context.xml中的< beans >内部配置bean标签

```  xml
<!-- 在 spring 配置文件中，使用 bean 标签，标签里面添加对应属性，就可以实现对象创建， 配置实例（id:“唯一标识”  class="需要被创建的目标对象全限定名"） 创建对象时候，默认也是执行无参数构造方法完成对象创建
 -->
<!--配置一个bean id:唯一标识 class:类的全限定名-->
<bean id="user" class="com.qf.hello.spring.entity.User"/>
```  

> 调用Spring工厂API（ApplicationContext接口）

```  java
public static void main(String[] args) {
    // 1、读取配置文件,配置信息读取到了ApplicationContext应用上下文环境中
    ApplicationContext context = new ClassPathXmlApplicationContext("/beans.xml");
    // 2、根据名字获取类的实例
    User user = (User) context.getBean("user");
    user.setId(1);
    user.setName("吴中洋");
    // 3、查看这个类
    System.out.println(user);
}
```  

## 八、依赖与配置文件详解

------

> Spring框架包含多个模块，每个模块各司其职，可结合需求引入相关依赖Jar包实现功能。

### 8.1 Spring依赖关系

|                Spring常用功能的Jar包依赖关系                 |
| :----------------------------------------------------------: |
| ![image-20191230164517693](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20191230164517693.png) |

* [注意：Jar包彼此存在依赖，只需引入最外层Jar即可由Maven自动将相关依赖Jar引入到项目中。]()



### 8.2 schema 规范/约束

> 配置文件中的顶级标签中包含了语义化标签的相关信息
>
> * xmlns：语义化标签所在的命名空间。namespace
> * xmlns:xsi：XMLSchema-instance 标签遵循Schema标签标准。
> * xsi:schemaLocation：xsd文件位置，用以描述标签语义、属性、取值范围等。

## 九、IoC（Inversion of Control ）控制反转【`重点`】

控制权转移

---

> **Inverse Of Controll：控制反转**
>
> **反转了依赖关系的满足方式，由之前的自己创建依赖对象，变为由工厂推送。(变主动为被动，即反转)**
>
> **解决了具有依赖关系的组件之间的强耦合，使得项目形态更加稳健**
>
> 补充： 什么是IOC
>
> 1.控制反转，把对象创建和对象之间的调用过程，交给 Spring 进行管理
>
> 2.使用 IOC 目的：为了耦合度降低
>
> 3.入门案例就是 IOC 实现
>
> IOC 底层原理
>
> xml 解析、工厂模式、反射

### 9.1 项目中强耦合问题

```  java
public class UserDAOImpl implements UserDAO{....}
```  

```  java
public class UserServiceImpl implements UserService {
    // !!!强耦合了UserDAOImpl!!!,使得UserServiceImpl变得不稳健!!
    private UserDAO userDAO= new UserDAOImpl();
    @Override
    public User queryUser() {
        return userDAO.queryUser();
    }
    ....
}
```  

### 9.2 解决方案

```  java
// 不引用任何一个具体的组件(实现类)，在需要其他组件的位置预留存取值入口(set/get)
public class UserServiceImpl implements UserService {
    // !!!不再耦合任何DAO实现!!!,消除不稳健因素!!
    private UserDAO userDAO；
    // 为userDAO定义set/get,允许userDAO属性接收spring赋值
    // Getters And Setters
    @Override
    public User queryUser() {
        return userDAO.queryUser();
    }
    ....
}
```  

```  xml
<!--userDao-->
<bean id="userDao" class="com.qf.hello.spring.dao.impl.UserDaoImpl"/>

<!--userService  ref:引用的其他bean的id-->
<bean id="userService" class="com.qf.hello.spring.service.impl.UserServiceImpl">
    <!-- property:设置属性name:对象的属性名ref:对象的属性值，因为userDao属性的对象类型所以属性ref -->
    <property name="userDao" ref="userDao"/>
</bean>
```  

> 此时，如果需要更换其他UserDAO实现类，则UserServiceImpl不用任何改动！
>
> 则此时的UserServiceImpl组件变得更加稳健！

### 9.3 IOC 接口

1.IOC 思想基于 IOC 容器完成，IOC 容器底层就是对象工厂

2.Spring 提供 IOC 容器实现两种方式：（两个接口）

- BeanFactory：IOC 容器基本实现，是 Spring 内部的使用接口，不提供开发人员进行使用 
  -  加载配置文件时候不会创建对象，在获取对象（使用）才去创建对象

- ApplicationContext：BeanFactory 接口的子接口，提供更多更强大的功能，一般由开发人 员进行使用
  -  加载配置文件时候就会把在配置文件对象进行创建

![image-20210803101900198](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210803101900198.png)

3.IOC操作bean管理

Bean的管理指的是两个操作：1.Spring创建对象  2.Spring注入属性

Bean的常见的管理操作有两种方式：1.基于 xml 配置文件方式实现  2.基于注解方式实现



## 十、DI（Dependency Injection）依赖注入【`重点`】

------

### 10.1 概念

> 在Spring创建对象的同时，为其属性赋值，称之为依赖注入。

### 10.2 Set注入

> 创建对象时，Spring工厂会通过Set方法为对象的属性赋值。

#### 10.2.1 定义目标Bean类型

```  java
public class User {
    private Integer id;
    private String name;

    private String sex;
    private Integer age;
    private Date bornDate;
    private String[] hobbys;
    private Set<String> phones;
    private List<String> names;
    private Map<String,String> countries;
    private Properties files;
    //Getters And Setters
}
```  



#### 10.2.2 基本类型 + 字符串类型 + 日期类型

```  xml
<!-- 创建一个user对象，然后设置属性 -->
<bean id="user" class="com.qf.hello.spring.entity.User">
    <property name="id" value="1"/>
    <property name="name" value="王森正"/>
    <property name="sex" value="男"/>
    <property name="age" value="18"/>
    <property name="bornDate" value="2000/03/05"/><!--注意格式"/"-->
</bean>
```  



#### 10.2.3 容器类型

```  xml
<!-- 创建一个user对象，然后设置属性 -->
<bean id="user" class="com.qf.hello.spring.entity.User">
    <property name="id" value="1"/>
    <property name="name" value="王森正"/>
    <property name="sex" value="男"/>
    <property name="age" value="18"/>
    <property name="bornDate" value="2000/03/05"/>
    <property name="hobbys">
        <array>
            <value>写代码</value>
            <value>唱跳</value>
        </array>
    </property>

    <property name="phones">
        <set>
            <value>15112345678</value>
            <value>15114456668</value>
        </set>
    </property>

    <property name="names">
        <list>
            <value>张三</value>
            <value>赵六</value>
            <value>李四</value>
        </list>
    </property>

    <property name="countries">
        <map>
            <entry key="CN" value="中国"/>
            <entry key="USA" value="漂亮国"/>
        </map>
    </property>

    <property name="files">
        <props>
            <prop key="driver">com.mysql.jdbc.Driver</prop>
            <prop key="url">jdbc:mysql:///</prop>
        </props>
    </property>

</bean>
```  



#### 10.2.4 自建类型

```  xml
<!--次要bean，被作为属性-->
<bean id="address" class="com.qf.hello.spring.entity.Address">
    <property name="province" value="河南"/>
    <property name="city" value="郑州市"/>
</bean>

<!--主要bean，操作的主体-->
<bean id="user" class="com.qf.hello.spring.entity.User">
    <property name="address" ref="address" /><!--address属性引用addr对象-->
</bean>
```  

```  xml
<!--次要bean，被作为属性-->
<bean id="userDao" class="com.qf.hello.spring.dao.impl.UserDaoImpl" />

<!--主要bean，操作的主体-->
<bean id="userService" class="com.qf.hello.spring.service.impl.UserServiceImpl">
    <property name="userDao" ref="userDao" />
</bean>
```  



### 10.3 构造注入【了解】

> 创建对象时，Spring工厂会通过**构造方法**为对象的属性赋值。



#### 10.3.1 定义目标Bean类型

```  java
public class Student {
    private Integer id;
    private String name;
    private String sex;
    private Integer age;
  
    //Constructors
  	public Student(Integer id , String name , String sex , Integer age){
      	this.id = id;
    	this.name = name;
  	    this.sex = sex;
	    this.age = age;
    }
}
```  



#### 10.3.2 注入

```  xml
 <!--构造注入-->
<bean id="u3" class="com.qf.zcg.spring.day1.t2.ioc.Student">
    <constructor-arg name="id" value="1234" /> <!-- 除标签名称有变化，其他均和Set注入一致 -->
    <constructor-arg name="name" value="tom" />
    <constructor-arg name="age" value="20" />
    <constructor-arg name="sex" value="male" />
</bean>
```  



### 10.4 自动注入

> 不用在配置中 指定为哪个属性赋值，及赋什么值.
>
> 由spring自动根据某个 "原则" ，在工厂中查找一个bean，为属性注入属性值

```  java
public class UserServiceImpl implements UserService {
    private UserDAO userDAO；
    //Getters And Setters
    ....
}
```  

```  xml
<bean id="userDao" class="com.qf.spring.part1.injection.UserDaoImpl" />
<!-- 为UserServiceImpl中的属性基于类型自动注入值 -->
<bean id="userService" class="com.qf.spring.part1.injection.UserServiceImpl" autowire="byType"></bean>
```  

```  xml
<bean id="userDao" class="com.qf.spring.part1.injection.UserDaoImpl" />
<!-- 为UserServiceImpl中的属性基于类型自动注入值 -->
<bean id="userService" class="com.qf.spring.part1.injection.UserServiceImpl" autowire="byName"></bean>
```  



## 十一、Bean细节

------

### 11.1 控制简单对象的单例、多例模式

spring容器中

单例：只有一个实例 singleton 

多例[原型模式]：有多个实例  prototype

![image-20220425180346999](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220425180346999.png)

> 配置< bean scope="singleton | prototype" />

```  xml
<!--
	singleton（默认）：每次调用工厂，得到的都是同一个对象。  加载 spring 配置文件时候就会创建单实例对象
	prototype：每次调用工厂，都会创建新的对象。   不是在加载 spring 配置文件时候创建 对象，在调用
getBean 方法时候创建多实例对象

-->
<bean id="mc" class="com.qf.zcg.spring.day1.t1.basic.MyClass" scope="singleton" /> 
```  

* 注意：需要根据场景决定对象的单例、多例模式。
* 可以共用：Service、DAO、SqlSessionFactory（或者是所有的工厂）。
* 不可共用：Connection、SqlSession、ShoppingCart。



### 11.2 FactoryBean创建复杂对象

补充：spring有两种类型的bean ，一种是 普通bean ，另外一种是 工厂bean (FactoryBean)

普通的bean : 在配置文件中定义的bean的类型 就是返回类型

工厂bean 在配置文件中定义的bean类型可以和返回的bean类型不一样



> 作用：让Spring可以创建复杂对象、或者无法直接通过反射创建的对象。

|                 FactoryBean解决复杂对象创建                  |
| :----------------------------------------------------------: |
| ![image-20190419235128663](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20190419235128663.png) |



#### 11.2.1 实现FactoryBean接口

|                         接口方法描述                         |
| :----------------------------------------------------------: |
| ![image-20190419234550731](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20190419234550731.png) |

- 注意：isSingleton方法的返回值，需根据所创建对象的特点决定返回true/false。
- 例如：Connection 不应该被多个用户共享，返回false。
- 例如：SqlSessionFactory 重量级资源，不该过多创建，返回true。

#### 11.2.2 配置spring-context.xml

|                        配置与获取方式                        |
| :----------------------------------------------------------: |
| ![image-20190419235939298](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20190419235939298.png) |



#### 11.2.3 特例

| 获取FactoryBean接口的实现类对象，而非getObject()所生产的对象。 |
| :----------------------------------------------------------: |
| ![image-20190420000713143](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20190420000713143.png) |

## 十二、Spring工厂特性

------

### 12.1 饿汉式创建优势   --- 面试题  为什么spring bean 默认是单例

> 工厂创建之后，会将Spring配置文件中的所有对象都创建完成（饿汉式）。
>
> 提高程序运行效率。避免多次IO，减少对象创建时间。（概念接近连接池，一次性创建好，使用时直接获取）
>
> 如果默认是多例bean    首先创建多例bean  会消耗资源    还会占用堆空间

### 12.2 生命周期方法      ---- 面试题  spring bean 的声明周期是什么   非常重要

什么生命周期？ 

bean 对象从创建到销毁的过程

1. bean 的实例化   通过构造方法创建bean 的实例  默认是无参构造  
2. 给bean 的属性赋值 
3. 执行初始化的方法
4. 得到完整的bean 对象 ，这时的bean 对象才能够使用
5. 销毁bean



要考虑  bean 的后置处理器    BeanPostProcessor  

创建一个类实现BeanPostProcessor 重写 他的两个方法

``` java
public class MyBeanPost implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在bean 初始化之前执行");

        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {

        System.out.println("在bean初始化之后执行");
        if(bean instanceof User){
            User user = (User) bean;
            user.setName("貂蝉");
            return user;
        }

        return bean;
    }
}
``` 

在配置文件 配置这个 bean

``` java
 <bean id="myPostProcessor" class="com.qf.postprocessor.MyBeanPost"></bean>
``` 

总结：

1. bean 的实例化   通过构造方法创建bean 的实例  默认是无参构造  
2. 给bean 的属性赋值 
3. 把 bean 的 实例  传递给 bean的前置处理器的方法   postProcessBeforeInitialization
4. 执行初始化的方法
5. 把 bean 的 实例  传递给 bean的后置处理器的方法    postProcessAfterInitialization
6. 得到完整的bean 对象 ，这时的bean 对象才能够使用
7. 销毁bean  当容器关闭的时候 调用销毁的方法



> * 自定义初始化方法：添加“init-method”属性，Spring则会在创建对象之后，调用此方法。
>
> * 自定义销毁方法：添加“destroy-method”属性，Spring则会在销毁对象之前，调用此方法。
>
> * 销毁：工厂的close()方法被调用之后，Spring会毁掉所有已创建的单例对象。
>
> * 分类：Singleton对象由Spring容器销毁、Prototype对象由JVM销毁。

### 12.3 生命周期注解 

> 初始化注解、销毁注解

```  java
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@PostConstruct //初始化 
public void init(){
    System.out.println("init method executed");
}

@PreDestroy //销毁
public void destroy(){
    System.out.println("destroy method executed");
}
```  

### 12.4 生命周期阶段

> **单例bean：**singleton
>
> 随工厂启动[创建]() ==》  [构造方法]()  ==》 [set方法(注入值)]()  ==》 [init(初始化)]()  ==》 [构建完成]() ==》[随工厂关闭销毁]()

> **多例bean：**prototype
>
> 被使用时[创建]() ==》  [构造方法]()  ==》 [set方法(注入值)]()  ==》 [init(初始化)]()  ==》 [构建完成]() ==》[JVM垃圾回收销毁]()







## 十三、代理设计模式

------

### 13.1 概念

> 将核心功能与辅助功能（事务、日志、性能监控代码）分离，达到核心业务功能更纯粹、辅助业务功能可复用。

|                           功能分离                           |
| :----------------------------------------------------------: |
| ![image-20190420002535800](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20190420002535800.png) |

### 13.2 静态代理设计模式 

> 通过代理类的对象，为原始类的对象（目标类的对象）添加辅助功能，更容易更换代理实现类、利于维护。

|                           静态代理                           |
| :----------------------------------------------------------: |
| ![image-20190420004330551](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20190420004330551.png) |

* 代理类 = 实现原始类相同接口 + 添加辅助功能 + 调用原始类的业务方法。
* 静态代理的问题
    * 代理类数量过多，不利于项目的管理。
    * 多个代理类的辅助功能代码冗余，修改时，维护性差。



###  13.3 动态代理设计模式

> 动态创建代理类的对象，为原始类的对象添加辅助功能。



#### 13.3.1 JDK动态代理实现（基于接口）      代理对象和真实对象的关系  像是兄弟   代理对象 对真实对象进行增强

```  java
//目标
final OrderService os = new OrderServiceImpl();
//额外功能
InvocationHandler handler = new InvocationHandler(){//1.设置回调函数（额外功能代码）
    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable {
        System.out.println("start...");
        method.invoke(os, args);
         System.out.println("end...");
        return null;
    }
};
//2.创建动态代理类
Object proxyObj = Proxy.newProxyInstance(ClassLoader , Interfaces , InvocationHandler);
```  

**个人代码**

接口

``` java
public interface Marry {

    public void marry();


    public int money();

}
``` 



真实对象

``` java
public class You implements Marry {
    @Override
    public void marry() {
        System.out.println("终身大事");
    }

    @Override
    public int money() {
        int num = 10;
        System.out.println("花了"+num+"块钱");
        return num;
    }
}
``` 



封装的一个工具类

``` java
public class JdkProxy implements InvocationHandler {
    private Object target;   //真实对象   被代理的对象

    //把真实对象传进来   返回代理对象
    public Object getProxy(Object target){
        this.target = target;
       return Proxy.newProxyInstance(this.getClass().getClassLoader(),target.getClass().getInterfaces(),this);
    }


    //对真实对象的功能增强
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("准备工作");

        Object result = method.invoke(target, args);

        System.out.println("收尾工作");

        if(target instanceof Marry){
            return 100;
        }
        return result;
    }
}
``` 

测试

``` java
public class TestJdkProxy {
    public static void main(String[] args) {
        //真实对象
        You you = new You();

        JdkProxy jdkProxy = new JdkProxy();

        //得到代理对象
        Marry proxy = (Marry) jdkProxy.getProxy(you);

        //调用代理对象的方法
        proxy.marry();

        int money = proxy.money();

        System.out.println(money);
    }
}    
``` 



#### 13.3.2 CGlib动态代理实现（基于继承）    代理对象和真实对象的关系  就像是 父子

```  java
final OrderService os = new OrderServiceImpl();
Enhancer cnh = new Enhancer();//1.创建字节码曾强对象
enh.setSuperclass(os.getClass());//2.设置父类（等价于实现原始类接口）
enh.setCallback(new InvocationHandler(){//3.设置回调函数（额外功能代码）
    @Override
    public Object invoke(Object proxy , Method method, Object[] args) throws Throwable{
        System.out.println("start...");
        Object ret = method.invoke(os,args);
        System.out.println("end...");
        return ret;
    }
});
OrderService proxy = (OrderService)enh.create();//4.创建动态代理类
proxy,createOrder();
```  

**个人代码**

真实对象

``` java
public class You {
    public void marry() {
        System.out.println("终身大事");
    }

    public int money() {
        int num = 10;
        System.out.println("花了"+num+"块钱");
        return num;
    }

}
``` 

工具类  封装得到代理对象的方法  和 回调方法

``` java
package com.qf.proxy.cglibproxy;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.InvocationHandler;

import java.lang.reflect.Method;


public class CglibProxy implements InvocationHandler {
    //真实对象
    private Object target;

    //传入真实对象 得到代理对象
    public Object getProxy(Object target){
        this.target = target;
        Enhancer enhancer = new Enhancer();//1.创建字节码曾强对象
        enhancer.setSuperclass(target.getClass());//2.设置父类（等价于实现原始类接口）
        //设置回调函数
        enhancer.setCallback(this);
        //返回代理对象
        return enhancer.create();
    }



    //真实对象方法增强
    @Override
    public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
        System.out.println("准备工作");

        Object result = method.invoke(target, objects);
        System.out.println("收尾工作");
        return result;
    }
}

``` 



测试

```  java
package com.qf.proxy.cglibproxy;

public class TestCglibProxy {

    public static void main(String[] args) {
        //真实对象
        You you = new You();
        //工具类对象
        CglibProxy cglibProxy = new CglibProxy();
        //得到代理对象
        You proxy = (You) cglibProxy.getProxy(you);

        proxy.marry();
    }
}

``` 



## 十四、面向切面编程【`重点`】

---

### 14.1 概念

> AOP（Aspect Oriented Programming），即面向切面编程，利用一种称为"横切"的技术，剖开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。



什么是AOP ？

1.面向切面编程 利用AOP 可以对业务逻辑的各个部分进行隔离 从而使业务逻辑的各部分之间 耦合度降低，提高程序的可重用性，提好了开发效率，通俗的讲   可以实现不修改源代码的方式，在核心业务里面 添加新的功能



**AOP 底层的原理  就是 动态代理  ，真正干活的 bean 是 代理bean ,  代理bean 对真实bean 功能增强**





### 14.2 AOP开发术语

>* 连接点(Joinpoint)：连接点是程序类中客观存在的方法，可被Spring拦截并切入内容。
>     * 说白了   类中的哪些方法 可以被增强    这些方法  就称为是 连接点 
>* 切入点(Pointcut)：被Spring切入连接点。
>    * 真正被增强的方法   称为 切入点
> * 通知、增强(Advice)：可以为切入点添加额外功能，分为：前置通知、后置通知、异常通知、环绕通知，最终通知等。
>    * 实际增强的逻辑部分 称为通知（增强）
>* 
>     目标对象(Target)：代理的目标对象    真实对象
>* 引介(Introduction)：一种特殊的增强，可在运行期为类动态添加Field和Method。
>* 
>     织入(Weaving)：把通知应用到具体的类，进而创建新的代理类的过程。
>* 
>     代理(Proxy)：被AOP织入通知后，产生的结果类。  
>* 
>    切面(Aspect)：由切点和通知组成，将横切逻辑织入切面所指定的连接点中。    把通知 应用到 切入点的过程



### 14.3 作用

> Spring的AOP编程即是通过动态代理类为原始类的方法添加辅助功能。



### 14.4 环境搭建

> 引入AOP相关依赖

```  xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.1.6.RELEASE</version>
</dependency>
```  

> spring-context.xml引入AOP命名空间

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd
       ">
</beans>
```  



### 14.5 开发流程

> 定义原始类

```  java
package com.qf.aaron.aop.basic;

public interface UserService {
    public void save();
}
```  

```  java
package com.qf.aaron.aop.basic;

public class UserServiceImpl implements UserService {
    public void save() {
        System.out.println("save method executed...");
    }
}
```  



下面是 基于 Schema-based 的 aop实现方式 了解


> 定义通知类（添加额外功能）

```  java
package com.qf.aaron.aop.basic;
import org.springframework.aop.MethodBeforeAdvice;
import java.lang.reflect.Method;

public class MyAdvice implements MethodBeforeAdvice { //实现前置通知接口
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println("before advice executed...");
    }
}
```  



> 定义bean标签

```  xml
<!--原始对象-->
<bean id="us" class="com.qf.aaron.aop.basic.UserServiceImpl" />

<!--辅助对象-->
<bean id="myAdvice" class="com.qf.aaron.aop.basic.MyAdvice" />
```  


> 定义切入点（PointCut）
>
> 形成切面（Aspect）


```  xml
<aop:config>
    <!--切点-->
    <aop:pointcut id="myPointCut" expression="execution(* save())" />
    <!--组装切面 -->
    <aop:advisor advice-ref="myAdvice" pointcut-ref="myPointCut" />
</aop:config>
```  



下面是基于 AspectJ 的  AOP 实现方式

方式1  基于 xml 的配置

创建 通知类

``` java
package com.qf.aspectjadvice;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * @ClassName : MyAspectJAdvice

 * @Description :   AspectJ 的 通知类  无需实现接口
 */
public class MyAspectJAdvice {

    public void before(){
        System.out.println("前置增强代码");
    }

    public Object around(ProceedingJoinPoint jp) throws Throwable {
        System.out.println("环绕增强前面的代码");
        // 让目标方法继续执行
        Object result = jp.proceed();
        System.out.println("环绕增强后面的代码");
        return result;
    }


    public void after(){
        System.out.println("最终增强的代码，类似于finally，目标方法有没有异常都要执行的");
    }


    public void throwing(Exception e){
        System.out.println("异常抛出增强代码，只有在目标方法抛出异常时才能执行");
        System.out.println("异常信息是:" + e.getMessage());
    }

    public void afterReturning(Object result){
        System.out.println("后置增强,返回值是:"+result);
    }
}

``` 

xml 配置

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 其他bean的定义... -->

    <!--了解 基于 AspectJ 的 xml 的  AOP实现 配置-->

    <!-- 配置增强类 -->
    <bean id="advice" class="com.qf.spring.aop.advice.MyAspectJAdvice" />

    <!-- 配置AOP -->
    <aop:config>
        <!-- 配置切入点 -->
        <aop:pointcut id="pc" expression="execution(* save())"/>
        <aop:aspect ref="advice">
            <!-- aop:before 前置增强的配置 -->
            <aop:before method="before" pointcut-ref="pc" />
            <!-- 环绕目标方法执行 -->
            <aop:around method="around" pointcut-ref="pc" />
            <!-- 异常抛出增强 -->
            <aop:after-throwing method="throwing" pointcut-ref="pc" throwing="e" />
            <!-- 最终增强 -->
            <aop:after method="after" pointcut-ref="pc" />
            <!-- 后置增强，目标方法抛出异常时 后置增强不执行 -->
            <aop:after-returning method="afterReturning" pointcut-ref="pc" returning="result"/>
        </aop:aspect>

    </aop:config>

</beans>
``` 



测试：

``` java
@Test
void save() {
    ApplicationContext context = new ClassPathXmlApplicationContext("/beans.xml");
    UserService service = context.getBean(UserService.class);
    service.save();
}
``` 


### 14.6 AOP小结

> * 通过AOP提供的编码流程，更便利的定制切面，更方便的定制了动态代理。
>
> * 进而彻底解决了辅助功能冗余的问题；
>
> * 业务类中职责单一性得到更好保障；
>
> * 辅助功能也有很好的复用性。



### 14.7 通知类【可选】 

> 定义通知类，达到通知效果

```  java
前置通知：MethodBeforeAdvice

后置通知：AfterAdvice

后置通知：AfterReturningAdvice //有异常不执行，方法会因异常而结束，无返回值

异常通知：ThrowsAdvice

环绕通知：MethodInterceptor
```  

没有必要把通知的执行顺序 记得非常精确   因为  spring 新版本 5  和 之前的旧版本  通知的执行顺序 不一样



### 14.8 通配切入点

> 根据表达式通配切入点

```  xml
<!--匹配参数-->
<aop:pointcut id="myPointCut" expression="execution(* *(com.qf.aaron.aop.basic.User))" />
<!--匹配方法名（无参）-->
<aop:pointcut id="myPointCut" expression="execution(* save())" />
<!--匹配方法名（任意参数）-->
<aop:pointcut id="myPointCut" expression="execution(* save(..))" />
<!--匹配返回值类型-->
<aop:pointcut id="myPointCut" expression="execution(com.qf.aaron.aop.basic.User *(..))" />
<!--匹配类名-->
<aop:pointcut id="myPointCut" expression="execution(* com.qf.aaron.aop.basic.UserServiceImpl.*(..))" />
<!--匹配包名-->
<aop:pointcut id="myPointCut" expression="execution(* com.qf.aaron.aop.basic.*.*(..))" />
<!--匹配包名、以及子包名-->
<aop:pointcut id="myPointCut" expression="execution(* com.qf.aaron.aop..*.*(..))" />
```  

切入点表达式：expression    知道对哪个类的那个方法进行增强

语法结构： execution([权限修饰符] [返回值类型] [类全路径] [方法名称] （[参数列表])    



### 14.9 JDK和CGLIB选择

> * spring底层，包含了jdk代理和cglib代理两种动态代理生成机制
>
> * 基本规则是：目标业务类如果有接口则用JDK代理，没有接口则用CGLib代理

```  java
class DefaultAopProxyFactory{
    // 该方法中明确定义了 JDK代理和CGLib代理的选取规则
    // 基本规则是：目标业务类如果有接口则用JDK代理，没有接口则用CGLib代理
    public AopProxy createAopProxy(){...}
}
```  



### 14.10 后处理器

> * spring中定义了很多后处理器；
>
> * 每个bean在创建完成之前 ，都会有一个后处理过程，即再加工，对bean做出相关改变和调整；
>
> * spring-AOP中，就有一个专门的后处理器，负责通过原始业务组件(Service),再加工得到一个代理组件。

|                         常用后处理器                         |
| :----------------------------------------------------------: |
| ![系统后处理器](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/%E7%B3%BB%E7%BB%9F%E5%90%8E%E5%A4%84%E7%90%86%E5%99%A8.jpg) |

#### 14.10.1 后处理器定义

```  java
/**
 * 定义bean后处理器
 * 作用：在bean的创建之后，进行再加工
 */
public class MyBeanPostProcessor implements BeanPostProcessor{

    /**
     * 在bean的init方法之前执行
     * @param bean  原始的bean对象
     * @param beanName
     * @return
     * @throws BeansException
     */
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("后处理器 在init之前执行``` "+bean.getClass());
        return bean;
    }
	/**
     * 在bean的init方法之后执行
     * @param bean  postProcessBeforeInitialization返回的bean
     * @param beanName
     * @return
     * @throws BeansException
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("后处理器 在init之后执行``` "+bean.getClass());
        return bean;// 此处的返回是 getBean() 最终的返回值
    }
}
```  

#### 14.10.2 配置后处理器

```  xml
<!-- 配置后处理器,将对工厂中所有的bean声明周期进行干预 -->
<bean class="com.qianfeng.beanpostprocessor.MyBeanPostProcessor"></bean>
```  

#### 14.10.3 bean生命周期

> 构造 》 注入属性 满足依赖 》 后处理器前置过程   》 初始化  》后处理器后置过程 》 返回 》 销毁


## 十五、Spring + MyBatis【`重点`】

------

### 15.1 配置数据源

> 将数据源配置到项目中



#### 15.1.1 引入jdbc.properties配置文件

```  properties
#jdbc.properties
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/java2303?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serveTimezone=Asia/Shanghai
jdbc.username=root
jdbc.password=root
```  



#### 15.1.2 整合Spring配置文件和properties配置文件

```  xml
<!--spring-context.xml-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       ">

    <!--配置文件参数化（参数占位符）-->
	<context:property-placeholder location="classpath:jdbc.properties" />
    
    <!-- 数据源的配置 -->
    <bean id="dataSource" class="org.apache.ibatis.datasource.pooled.PooledDataSource">
        <property name="driver" value="${jdbc.driverClass}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

</bean>
```  


### 15.2 整合MyBatis

> 将 SqlSessionFactory、DAO、Service 配置到项目中

#### 15.2.1 导入依赖

```  xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.1.6.RELEASE</version>
    </dependency>

    <!-- spring-jdbc -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.1.6.RELEASE</version>
    </dependency>

    <!-- spring+mybatis集成依赖 包含mybatis依赖的 -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>1.3.1</version>
    </dependency>

    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.1</version>
    </dependency>

    <!-- mysql -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.26</version>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>RELEASE</version>
        <scope>test</scope>
    </dependency>

</dependencies>
```  

#### 15.2.2 配置SqlSessionFactory

```  xml
<!-- 工厂bean：生成SqlSessionFactory -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <!-- 注入连接池 -->
    <property name="dataSource" ref="dataSource"></property>
    <!-- 注入dao-mapper文件信息 ,如果映射文件和dao接口 同包且同名，则此配置可省略-->
    <property name="mapperLocations">
        <list>
            <value>classpath:com/qf/spring/dao/*.xml</value>
        </list>
    </property>
    <!-- 为 dao-mapper文件中的实体 定义缺省包路径 
		如：<select id="queryAll" resultType="User"> 中 User类可以不定义包
    -->
    <property name="typeAliasesPackage" value="com.qf.entity"></property>
</bean>
```  

#### 15.2.3 配置MapperScannerConfigurer

> 管理DAO实现类的创建，并创建DAO对象，存入工厂管理
>
> * 扫描所有DAO接口,去构建DAO实现
>
> * 将DAO实现存入工厂管理 
>
> * DAO实现对象在工厂中的id是：“首字母小写的-接口的类名”，   
>
>   例如：UserDAO==>userDAO , OrderDAO==>orderDAO

```  xml
<!-- mapperScannerConfigurer -->
<bean id="mapperScannerConfigurer9" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
   	<!-- dao接口所在的包  如果有多个包，可以用逗号或分号分隔 
  		<property name="basePackage" value="com.a.dao,com.b.dao"></property>
   	-->
    <property name="basePackage" value="com.qf.spring.dao"></property>
    <!-- 如果工厂中只有一个SqlSessionFactory的bean，此配置可省略 -->
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"></property>
</bean>
```  

#### 15.2.4 配置Service

```  xml
<bean id="userService" class="com.qf.spring.service.UserServiceImpl">
    <!-- 注意ref中的值是对应DAO接口的首字母小写的接口名 -->
	<property name="userDAO" ref="userDAO"></property>
</bean>
```  


## 十六、事务【`重点`】

1. 什么是事务？

   事务是数据库操作的基本单元，逻辑上的一组操作，要么都成功，要么都失败，也就是说只有一组操作中 有一个失败了，那么这组操作都失败

   举个栗子

   wsc转账500给wjl

   update t_account set money = money-500 where accountid  = 1      wsc 的账户  减500

   update t_account set money = money+500 where accountid=2        wjl的账户 加 500

2. 事务的特性  ACID

   A   atomicity   原子性      一组操作 整体不可拆分要么都成功  要么都失败

   C    consistency   一致性      数据在事务的前后，业务整体一致 

   I    isolation  隔离性      事务之间 互相隔离 

   D  durability  持久性      一旦事务执行成功  数据一定会落盘在数据库 

3.准备事务的环境

账户表

![image-20210811092715563](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20210811092715563.png)

service 定义转账方法

``` java
    //转账操作
    @Override
    public void transferMoney(int from, int to, double money) {
        //from 给   to 转了  money
        //一个账户 扣钱
        accountMapper.reduceMoney(from,money);
        //模拟一个异常
        int i = 5/0;
        //一个账户加钱
        accountMapper.addMOney(to,money);
    }
``` 

dao

``` java

    @Update("update t_account set money= money - #{money} where userid= #{from} ")
    void reduceMoney(@Param("from") int from,@Param("money") double money);

    @Update("update t_account set money = money + #{money} where userid = #{to} ")
    void addMOney(@Param("to")int to, @Param("money") double money);

``` 



转账过程中 模拟异常，出现一个账户扣钱了，另一个账户却没有加钱   数据不一致问题  怎么解决？

使用事务    进行解决



spring提供了 事务的解决方案    底层原理是  AOP

1. 基于注解的方案    掌握
2. 基于xml配置文件的方式   了解



------

### 16.1 配置DataSourceTransactionManager

> 事务管理器，其中持有DataSource，可以控制事务功能（commit,rollback等）。

```  xml
<!-- 1. 引入一个事务管理器，其中依赖DataSource,借以获得连接，进而控制事务逻辑 -->
<bean id="tx" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>
```  

> 注意：DataSourceTransactionManager 和 SqlSessionFactoryBean 要注入同一个DataSource的Bean，否则事务控制失败!!!

###16.2 配置事务通知

> 基于事务管理器，进一步定制，生成一个额外功能：Advice。
>
> 此Advice可以切入任何需要事务的方法，通过事务管理器为方法控制事务。

```  xml
<tx:advice id="txManager" transaction-manager="tx">
	<tx:attributes>
        <!--<tx:method name="insertUser" rollback-for="Exception" isolation="DEFAULT"    
              	propagation="REQUIRED" read-only="false"/>-->
        <!-- 以User结尾的方法，切入此方法时，采用对应事务实行-->
        <tx:method name="*User" rollback-for="Exception"/>
        <!-- 以query开头的方法，切入此方法时，采用对应事务实行 -->
        <tx:method name="query*" propagation="SUPPORTS"/>
        <!-- 剩余所有方法 -->
        <tx:method name="*"/>
    </tx:attributes>
</tx:advice>
```  



### 16.3 事务属性

#### 16.3.1 隔离级别

#### 16.3.1.1 概念

> `isolation`  隔离级别

| 名称            | 描述                                        |
| --------------- | ------------------------------------------- |
| default         | (默认值）（采用数据库的默认的设置) （建议） |
| read-uncommited | 读未提交                                    |
| read-commited   | 读提交 （Oracle数据库默认的隔离级别）       |
| repeatable-read | 可重复读	（MySQL数据库默认的隔离级别）   |
| serialized-read | 序列化读                                    |

> 隔离级别由低到高为：read-uncommited < read-commited < repeatable-read < serialized-read

#### 16.3.1.2 特性

> * 安全性：级别越高，多事务并发时，越安全。因为共享的数据越来越少，事务间彼此干扰减少。
>
> * 并发性：级别越高，多事务并发时，并发越差。因为共享的数据越来越少，事务间阻塞情况增多。

#### 16.3.1.3 并发问题

> 事务并发时的安全问题

| 问题       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 脏读       | 一个事务读取到另一个事务还未提交的数据。大于等于 read-commited 可防止 |
| 不可重复读 | 一个事务内多次读取一行数据的相同内容，其结果不一致。大于等于 repeatable-read 可防止 |
| 幻影读     | 一个事务内多次读取一张表中的相同内容，其结果不一致。serialized-read 可防止 |

#### 16.3.2 传播行为

> `propagation`传播行为

> 当涉及到事务嵌套（Service调用Service）时，可以设置：
>
> * SUPPORTS = 不存在外部事务，则不开启新事务；存在外部事务，则合并到外部事务中。（适合查询）
>
> * REQUIRED = 不存在外部事务，则开启新事务；存在外部事务，则合并到外部事务中。 (默认值)（适合增删改）

#### 16.3.3 读写性

> `readonly` 读写性

> * true：只读，可提高查询效率。(适合查询)
>
> * false：可读可写。 (默认值)（适合增删改）

#### 16.3.4 事务超时

> `timeout`事务超时时间 

> 当前事务所需操作的数据被其他事务占用，则等待。
>
> * 100：自定义等待时间100（秒）。
> * -1：由数据库指定等待时间，默认值。（建议）  

#### 16.3.5 事务回滚

> `rollback-for`  回滚属性

> * 如果事务中抛出 RuntimeException,则自动回滚
>
> * 如果事务中抛出 CheckException(非运行时异常 Exception)，不会自动回滚，而是默认提交事务
>
> * 处理方案 : 将CheckException转换成RuntimException上抛，或 设置 rollback-for="Exception"

### 16.4 编织

> 将事务管理的Advice 切入需要事务的业务方法中

```  xml
<aop:config>
	<aop:pointcut expression="execution(* com.qf.spring.service.UserServiceImpl.*(..))" id="pc"/>
    <!-- 组织切面 -->
    <aop:advisor advice-ref="txManager" pointcut-ref="pc"/>
</aop:config>
```  



基于xml的步骤

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx.xsd">
    
    <!--1. 配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!--2. 配置 事务的通知-->
    <tx:advice id="txadvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="transferMoney" propagation="REQUIRED"/>
        </tx:attributes>
    </tx:advice>

    <!--3.织入切面-->
    <aop:config>
        <!--配置切点-->
        <aop:pointcut id="txpoint" expression="execution(* com.qf.service.impl.AccountServiceImpl.*(..))"/>
        <!--配置切面-->
        <aop:advisor advice-ref="txadvice" pointcut-ref="txpoint"></aop:advisor>
    </aop:config>
    
</beans>    
``` 


## 十七、注解开发

1.什么是注解

（1）注解是代码特殊标记，格式：@注解名称(属性名称=属性值, 属性名称=属性值..) 

（2）使用注解，注解作用在类上面，方法上面，属性上面 

（3）使用注解目的：简化 xml 配置

2.spring针对Bean管理创建对象提供的注解

（1）@Component 

（2）@Service 

（3）@Controller 

（4）@Repository 

 上面四个注解功能是一样的，都可以用来创建 bean 实例

3.基于注解方式 实现对象创建

1.需要aop 依赖的支持   spring-aop

2.开启组件扫描

​	1 如果扫描多个包，多个包使用逗号隔开 

​	2 扫描包上层目录

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
	<!--    扫描-->
    <context:component-scan base-package="com.qf"></context:component-scan>
    
</beans>
``` 

3.创建类  在类上添加创建bean 的注解

//在注解里面 value 属性值可以省略不写，

 //默认值是类名称，首字母小写 

//UserService -- userService



4.开启组件扫描细节配置

``` xml
    <!--扫描该包下 的所有注解-->
    <context:component-scan base-package="com.qf" />
``` 

5.基于注解的方式 实现属性注入

（1）@Autowired：先根据类型注入  再根据名字注入

第一步 把 service 和 dao 对象创建，在 service 和 dao 类添加创建对象注解 

第二步 在 service 注入 dao 对象，在 service 类添加 dao 类型属性，在属性上面使用注解 

``` java
@Service 

public class UserService { 

	//定义 dao 类型属性 

	//不需要添加 set 方法 

	//添加注入属性注解 

	@Autowired  

	private UserDao userDao; 
    

	public void add() { 

		System.out.println("service add......."); 

	    userDao.add(); 

	} 

}
``` 

（2）@Qualifier：根据名称进行注入 

这个@Qualifier 注解的使用，和上面@Autowired 一起使用 

``` java
//定义 dao 类型属性 

//不需要添加 set 方法

//添加注入属性注解 

@Autowired //根据类型进行注入 

@Qualifier(value = "userDaoImpl1") 

//根据名称进行注入 

private UserDao userDao;
``` 

（3）@Resource：先根据名字注入     再根据类型注入 

``` java
//@Resource //根据类型进行注入 

@Resource(name = "userDaoImpl1") //根据名称进行注入 

private UserDao userDao; 
``` 



（4）@Value：注入普通类型属性 

``` java
@Value(value = "abc") 
private String name;
``` 

6、完全注解开发  

``` java
@Configuration //作为配置类，替代 xml 配置文件 
@ComponentScan(basePackages = {"com.qf"}) 
public class SpringConfig { 

} 
``` 


---

### 17.1 声明bean

> 用于替换自建类型组件的 <bean...>标签；可以更快速的声明bean

> * @Service  业务类专用
>   @Repository  dao实现类专用
>    @Controller  web层专用
> 
>* @Component  通用
> 
>* @Scope  用户控制bean的创建模式

```  java
// @Service说明 此类是一个业务类，需要将此类纳入工厂  等价替换掉 <bean class="xxx.UserServiceImpl">
// @Service默认beanId == 首字母小写的类名"userServiceImpl"
// @Service("userService") 自定义beanId为"userService"
@Service //声明bean，且id="userServiceImpl"
@Scope("singleton") //声明创建模式，默认为单例模式 ；@Scope("prototype")即可设置为多例模式
public class UserServiceImpl implements UserService {
 	...   
}
```  

### 17.2 注入(DI)

> 用于完成bean中属性值的注入

> * @Autowired  基于类型自动注入    先根据类型注入  如果找到多个 再根据名称注入
> * @Resource    基于名称自动注入    先根据名称注入  如果根据名称没找到 则根据类型找  根据类型 找到多个 则报错 找到一个则注入
> * @Qualifier("userDAO") 限定要自动注入的bean的id，一般和@Autowired联用 
> * @Value 注入简单类型数据 (jdk8种+String)

```  java
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired //注入类型为UserDAO的bean
    @Qualifier("userDAO2") //如果有多个类型为UserDAO的bean，可以用此注解从中挑选一个
    private UserDAO userDAO;
}
```  

```  java
@Service
public class UserServiceImpl implements UserService {
    
	@Resource("userDAO3") //注入id=“userDAO3”的bean
    private UserDAO userDAO;
    /*
    @Resource //注入id=“userDAO”的bean
    private UserDAO userDAO;
    */
}
```  

```  java
public class XX{
    @Value("100") //注入数字
    private Integer id;
    @Value("shine") //注入String
	private String name;
}
```  

### 17.3 事务控制

> 用于控制事务切入
>
> * @Transactional
>
> * 工厂配置中的 <tx:advice.... 和 <aop:config... 可以省略 !!

```  java
//类中的每个方法都切入事务(有自己的事务控制的方法除外)
@Transactional(isolation=Isolation.READ_COMMITTED,propagation=Propagation.REQUIRED,readOnly=false,rollbackFor=Exception.class,timeout = -1)
public class UserServiceImpl implements UserService {
	
    //该方法自己的事务控制，仅对此方法有效
	@Transactional(propagation=Propagation.SUPPORTS)
	public List<User> queryAll() {
		return userDao.queryAll();
	}
	public void save(User user){
		userDao.save(user);
	}
}
```  

### 17.4 注解所需配置

```  xml
<!-- 告知spring，哪些包中 有被注解的类、方法、属性 -->
<!-- <context:component-scan base-package="com.qf.a,com.xx.b"></context:component-scan> -->
<context:component-scan base-package="com.qf"></context:component-scan>
	
<!-- 告知spring，@Transactional在定制事务时，基于txManager=DataSourceTransactionManager -->
<tx:annotation-driven transaction-manager="txManager"/>
```  

### 17.5 AOP开发

#### 17.5.1 注解使用

```  java
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect // 声明此类是一个切面类：会包含切入点(pointcut)和通知(advice)
@Component //声明组件，进入工厂
public class MyAspect {
    // 定义切入点
    @Pointcut("execution(* com.qf.spring.service.UserServiceImpl.*(..))")
    public void pc(){}
    
    @Before("pc()") // 前置通知
    public void mybefore(JoinPoint a) {
        System.out.println("target:"+a.getTarget());
        System.out.println("args:"+a.getArgs());
        System.out.println("method's name:"+a.getSignature().getName());
        System.out.println("before``` ~");
    }

    @AfterReturning(value="pc()",returning="ret") // 后置通知
    public void myAfterReturning(JoinPoint a,Object ret){
        System.out.println("after``` ~:"+ret);
    }
    
    @Around("pc()") // 环绕通知
    public Object myAround(ProceedingJoinPoint p) throws Throwable {
        System.out.println("interceptor1``` ~");
        Object ret = p.proceed();
        System.out.println("interceptor2``` ~");
        return ret;
    }
    
    @AfterThrowing(value="pc()",throwing="ex") // 异常通知
    public void myThrows(JoinPoint jp,Exception ex){
        System.out.println("throws");
        System.out.println("===="+ex.getMessage());
    }
}
```  

#### 17.5.2 配置

```  xml
<!-- 添加如下配置,启用aop注解 -->
<aop:aspectj-autoproxy />
```  


## 十八、集成JUnit

---

### 18.1 导入依赖

```  xml
<!-- spring-test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.1.6.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>RELEASE</version>
    <scope>test</scope>
</dependency>
```  

### 18.2 编码

> 可以免去工厂的创建过程；
>
> 可以直接将要测试的组件注入到测试类。

```  java
@SpringJUnitConfig
@ContextConfiguration("classpath:beans.xml") //spring的配置文件位置
public class SpringTest{

    @Autowired // 注入要测试的组件
    private UserMapper userMapper;

    @Test
    public void test(){
        // 测试使用userMapper
        System.out.println(userMapper.queryAll());
    }
}
```  


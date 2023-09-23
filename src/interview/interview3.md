---
title: Spring-精简版
---

## 1. 什么是 Spring IOC 容器？

Spring 框架的核心是 Spring 容器。容器创建对象，将它们装配在一起，配置它们并管理它们的完整生命周期。Spring 容器使用依赖注入来管理组成应用程序的组件。


## 2.可以通过多少种方式完成依赖注入？

依赖注入可以通过三种方式完成，即：

- 构造函数注入
- setter 注入
- 接口注入


## 3. spring 提供了哪些配置方式？

- 基于 xml 配置
- 基于注解配置
- 基于 Java API 配置


## 4. 如何理解IoC和DI？

IOC就是控制反转，通俗的说就是我们不用自己创建实例对象，这些都交给Spring的bean工厂帮我们创建管理。这也是Spring的核心思想，通过面向接口编程的方式来是实现对业务组件的动态依赖。这就意味着IOC是Spring针对解决程序耦合而存在的。

**DI：DI—Dependency** Injection，即“依赖注入”：组件之间依赖关系由容器在运行期决定，形象的说，即由容器动态的将某个依赖关系注入到组件之中。


## 5. 将一个类声明为Spring的 bean 的注解有哪些?

我们一般使用 @Autowired 注解自动装配 bean，要想把类标识成可用于 @Autowired 注解自动装配的 bean 的类,采用以下注解可实现：

- @Component ：通用的注解，可标注任意类为 Spring 组件。如果一个Bean不知道属于哪个层，可以使用@Component 注解标注。 8 @Repository : 对应持久层即 Dao 层，主要用于数据库相关操作。
- @Service : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao层。
- @Controller : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。


## 6. spring 支持几种 bean scope？

Spring bean 支持 5 种 scope：

- **Singleton** - 每个 Spring IoC 容器仅有一个单实例。
- **Prototype** - 每次请求都会产生一个新的实例。
- **Request**
- **Session**
- **Global-session**

仅当用户使用支持 Web 的 ApplicationContext 时，最后三个才可用


## 7. Spring 中的 bean 生命周期?

Bean的生命周期是由容器来管理的。主要在创建和销毁两个时期。

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/1583675090641_51.png)


## 8. Spring 怎么解决循环依赖问题？

spring对循环依赖的处理有三种情况： ①**构造器的循环依赖：这种依赖spring是处理不了的**，直接抛出BeanCurrentlylnCreationException异常。 ②**单例模式下的setter循环依赖：通过“三级缓存”处理循环依赖**。 ③非单例循环依赖：无法处理。


## 9. 什么是 AOP？

AOP(Aspect-Oriented Programming), 即 **面向切面编程**, 它与 OOP( Object-Oriented Programming, 面向对象编程) 相辅相成, 提供了与 OOP 不同的抽象软件结构的视角. 在 OOP 中, 我们以类(class)作为我们的基本单元, 而 AOP 中的基本单元是 **Aspect(切面)**


## 10. AOP 有哪些实现方式？

实现 AOP 的技术，主要分为两大类：

- 静态代理
- 动态代理 - 在运行时在内存中“临时”生成 AOP 动态代理类，因此也被称为运行时增强。
  - `JDK` 动态代理：通过反射来接收被代理的类，并且要求被代理的类必须实现一个接口 
  - `CGLIB`动态代理： 如果目标类没有实现接口，那么 `Spring AOP` 会选择使用 `CGLIB` 来动态代理目标类 


## 11. SpringMVC 工作原理了解吗?

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/SpingMVC-Process.jpg)


**流程说明（重要）：**

1. 客户端（浏览器）发送请求，直接请求到 `DispatcherServlet`。
2. `DispatcherServlet` 根据请求信息调用 `HandlerMapping`，解析请求对应的 `Handler`。
3. 解析到对应的 `Handler`（也就是我们平常说的 `Controller` 控制器）后，开始由 `HandlerAdapter` 适配器处理。
4. `HandlerAdapter` 会根据 `Handler`来调用真正的处理器开处理请求，并处理相应的业务逻辑。
5. 处理器处理完业务后，会返回一个 `ModelAndView` 对象，`Model` 是返回的数据对象，`View` 是个逻辑上的 `View`。
6. `ViewResolver` 会根据逻辑 `View` 查找实际的 `View`。
7. `DispaterServlet` 把返回的 `Model` 传给 `View`（视图渲染）。
8. 把 `View` 返回给请求者（浏览器）


## 12. Spring Boot 的核心注解是哪个？

启动类上面的注解是@SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：

@SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。

@EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })。

@ComponentScan：Spring组件扫描。



题目：
``` shell
1. 什么是 Spring IOC 容器？
2. 可以通过多少种方式完成依赖注入？
3. spring 提供了哪些配置方式？
4. 如何理解IoC和DI？

5. 将一个类声明为Spring的 bean 的注解有哪些?
6. spring 支持几种 bean scope？
7. Spring 中的 bean 生命周期?
8. Spring 怎么解决循环依赖问题？

9. 什么是 AOP？
10. AOP 有哪些实现方式？
11. SpringMVC 工作原理了解吗?
12. Spring Boot 的核心注解是哪个？
```
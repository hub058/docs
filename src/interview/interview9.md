---
title: 设计模式
---

## spring8种设计模式

> spring框架中常用到的8种设计模式清单如下

| 设计模式     | 使用地方                                                     | 备注                 |
| ------------ | ------------------------------------------------------------ | -------------------- |
| 工厂模式     | BeanFactory<br/>ApplicationContext                           |                      |
| 单例模式     | Spring中的Bean                                               |                      |
| 代理模式     | Spring AOP                                                   | java反射实现动态代理 |
| 模板方法模式 | Spring中以Template结尾的类                                   | 使用继承的方式实现   |
| 观察者模式   | Spring事件驱动模型                                           |                      |
| 适配器模式   | Spring AOP中的AdvisorAdapter<br/>Spring MVC中的HandlerAdapter |                      |
| 装饰器模式   | Spring中含有Wrapper和含有Decorator的类                       |                      |
| 策略模式     | 资源访问Resource接口                                         |                      |

## Mybatis10种设计模式

> Mybatis中使用了哪些设计模式

Mybatis 中使用了10种设计模式，其中创建型模式3种（工厂、单例、建造者），结构型模式4种（适配器、代理、组合、装饰器），行为型模式3种（模板、策略、迭代器）

![](https://img-blog.csdnimg.cn/img_convert/a020ddeb34c7efbc5edf8ba9e492003a.png)

### 一、创建型模式

1、工厂模式

``` shell
DefaultSqlSession DefaultSqlSessionFactory
PooledDataSource PooledDataSourceFactory
UnpooledDataSource UnpooledDataSourceFactory
```

工厂模式：简单工厂，是一种创建型设计模式，其在父类中提供一个创建对象的方法，允许子类决定实例对象的类型。

场景介绍：SqlSessionFactory 是获取会话的工厂，每次我们使用 Mybatis 操作数据库的时候，都会开启一个新的会话。在会话工厂的实现中负责获取数据源环境配置信息、构建事务工厂、创建操作SQL的执行器，并最终返回会话实现类。

2、单例模式

``` shell
Configuration 配置类
```

单例模式：是一种创建型模式，让你能够保证一个类只有一个实例，并提供一个访问该实例的全局节点。

场景介绍：Configuration贯穿整个会话的生命周期，有以的配置对象：映射、缓存、入参、出参、拦截器、注册机、对象工厂等，都在 Configuration 配置项中初始化。并随着 SqlSessionFactoryBuilder 构建阶段完成实例化操作。

3、建造者模式

``` shell
XMLConfigBuilder
SqlSessionFactoryBuilder
```

建造者模式：使用多个简单的对象一步一步构建成一个复杂的对象，这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

场景介绍：关于建造者模式在 Mybatis 框架里的使用，到处都是 XxxxBuilder，所有关于 XML 文件的解析到各类对象的封装，都使用建造者以及建造者助手来完成对象的封装。它的核心目的就是不希望把过多的关于对象的属性设置，写到其他业务流程中，而是用建造者的方式提供最佳的边界隔离。

### 二、结构型模式

1、适配器模式

``` shell
Log4jImpl、Slf4jImpl
Slf4jLocationAwareLoggerImpl 适配
Log接口
```

适配器模式：是一种结构型设计模式，它能使接口不兼容的对象能够相互合作。

场景介绍：正是因为有太多的日志框架，包括：Log4j、Log4j2、Slf4J等等，而这些日志框架的使用接口又都各有差异，为了统一这些日志工具的接口，Mybatis 定义了一套统一的日志接口，为所有的其他日志工具接口做相应的适配操作。

2、代理模式

``` shell
MapperProxy、DriverProxy
```

代理模式：是一种结构型模式，让你能够提供对象的替代品或其占位符。代理控制着对原对象的访问，并允许在将请求提交给对象前进行一些处理。

场景介绍：没有代理模式，就不会有各类的框架存在。就像 Mybatis 中的 MapperProxy 映射器代理实现类，它所实现的功能就是帮助我们完成 DAO 接口的具体实现类的方法操作，你的任何一个配置的 DAO 接口所调用的 CRUD 方法，都会被 MapperProxy 接管，调用到方法执行器等一系列操作，并返回最终的数据库执行结果

3、组合模式

``` shell
SqlNode、IfSqlNode、WhereSqlNode等
```

组合模式：是一种结构型设计模式，你可以使用它将对象组合成树状结构，并且能独立使用对象一样使用它们。

场景介绍：在 Mybatis XML 动态的 SQL 配置中，共提供了9种(trim/where/set/foreach/if/choose/when/otherwise/bind)标签的使用，让使用者可以组合出各类场景的 SQL 语句。而 SqlNode 接口的实现就是每一个组合结构中的规则节点，通过规则节点的组装完成一颗规则树组合模式的使用。

4、装饰器模式

``` shell
Configuration.newExecutor();
```

装饰器模式：是一种结构型设计模式，允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

场景介绍：Mybatis 的所有 SQL 操作，都是经过 SqlSession 会话调用 SimpleExecutor 简单实现的执行器完成的，而一级缓存的操作也是在简单执行器中处理。那么这里二级缓存因为是基于一级缓存刷新操作的，所以在实现上，通过创建一个缓存执行器，包装简单执行器的处理逻辑，实现二级缓存操作。

### 三、行为型模式

1、模板模式

``` shell
执行器
Executor接口 --> BaseExecutor抽象类 --> SimpleExecutor继承抽象类 
```

模板模式：是一种行为设计模式，它在超类中定义了一个算法的框架，允许子类在不修改结构的情况下重写算法的特定步骤。

场景介绍：只要存在一系列可被标准定义的流程，在流程的步骤大部分是通用逻辑，只有一少部分是需要子类实现的，那么通常会采用模板模式来定义出这个标准的流程。就像 Mybatis 的 BaseExecutor 就是一个用于定义模板模式的抽象类，在这个类中把查询、修改的操作都定义出了一套标准的流程。

2、策略模式

``` shell
类型转换
TypeHandler、LongTypeHandler、StringTypeHandler
```

策略模式：是一种行为设计模式，它能定义一系列算法，并将每种算法分别放入独立的类中，以使算法的对象能够互相替换。

场景介绍：在 Mybatis 处理 JDBC 执行后返回的结果时，需要按照不同的类型获取对应的值，这样就可以避免大量的 if 判断。所以这里基于 TypeHandler 接口对每个参数类型分别做了自己的策略实现。

3、迭代器模式

``` shell
PropertyTokenizer implements Iterable<PropertyTokenizer>, Iterator<PropertyTokenizer>
```

迭代器模式：是一种行为设计模式，让你能在不暴露集合底层表现形式的情况下遍历集合中所有的元素。

场景介绍：PropertyTokenizer 是用于 Mybatis 框架 MetaObject 反射工具包下，用于解析对象关系的迭代操作。这个类在 Mybatis 框架中使用的非常频繁，包括解析数据源配置信息并填充到数据源类上，以及参数的解析、对象的设置都会使用到这个类



## 单例模式

### 1. 概述

java单例模式是一种常见的设计模式。

**单例模式有以下特点：**

1. 单例类只能有一个实例；
2. 单例类必须自己创建自己的唯一实例；
3. 单例类必须给所有其他对象提供这一实例；

### 2. 优缺点

 优点：由于单例模式只生成了一个实例，所以能够节约系统资源，减少性能开销，提高系统运行效率。
 缺点：因为系统中只有一个实例，导致了单例类的职责过重，违背了“单一职责原则”，同时不利于扩展。

### 3. 单例模式实现方式

常见的单例模式实现方式有五种：饿汉式、懒汉式、双重检测锁、静态内部类和枚举单例。

#### 3.1 饿汉式

``` java
public class SingletonDemoInHunger {
    
    // 私有实例，类初始化就加载
    private static SingletonDemoInHunger instance = new SingletonDemoInHunger();
    
    // 私有构造方法
    private SingletonDemoInHunger() {}
    
    // 公共的、静态的获取实例方法
    public static SingletonDemoInHunger getInstance() {
        return instance;
    }
}
```



**饿汉式：**

1. 类加载时就初始化，浪费内存，不能延迟加载；
2. 基于 classloader 机制避免了多线程的同步问题，线程安全；
3. 没有加锁，调用效率高。

#### 3.2 懒汉式

``` java
public class SingletonDemoInLazy {
    
    // 私有实例,初始化的时候不加载（延迟加载）
    private static SingletonDemoInLazy instance;
    
    // 私有构造
    private SingletonDemoInLazy() {}
    
    // 公共获取实例方法（线程不安全）
    public static SingletonDemoInLazy getInstance() {
        if(instance == null ) { // 使用的时候加载
            instance = new SingletonDemoInLazy();
        }
        return instance;
    }
}
```



上面这种写法，是**线程不安全**的，但是可以做到**延迟加载**。

下面是线程安全的懒汉模式：

```java
public class SingletonDemoInLazy {
   
    // 私有实例,初始化的时候不加载（延迟加载）
    private static SingletonDemoInLazy instance;
    
    // 私有构造
    private SingletonDemoInLazy() {}
    
    // 公共获取实例方法（线程安全，调用效率低）
    public synchronized static SingletonDemoInLazy getInstance() {
        if(instance == null ) {
            instance = new SingletonDemoInLazy();
        }
        return instance;
    }
}
```

上面代码中，通过关键字`synchronized`声明公共的获取实例的方法getInstance()，可以确保线程安全，能做到延迟加载，但是效率不高。

#### 3.3 double-checked locking（双重检查锁）

```java
public class SingletonDemoInDoubleCheckLock {

    // 私有实例，volatile关键字，禁止指令重排。
    private volatile static SingletonDemoInDoubleCheckLock instance;

    // 私有构造
    private SingletonDemoInDoubleCheckLock() {}

    // 公共获取实例方法（线程安全）
    public static SingletonDemoInDoubleCheckLock getInstance() {

        if(instance == null ) { // 一重检查
            synchronized (SingletonDemoInDoubleCheckLock.class) {
                if(instance == null) { // 二重检查
                    instance = new SingletonDemoInDoubleCheckLock();
                }
            }
        }
        return instance;
    }
}
```

在加锁之前判断是否为空，可以确保 instance 不为空的情况下，不用加锁，可以直接返回。

加锁之后，还需要判断 instance 是否为空，是为了防止在多线程并发的情况下，会实例化多个对象。例如：线程 a 和线程 b 同时调用 getInstance 方法，假如同时判断 instance 都为空，这时会同时进行抢锁。假如线程 a 先抢到锁，开始执行 synchronized 关键字包含的代码，此时线程 b 处于等待状态。线程 a 创建完新实例了，释放锁了，此时线程 b 拿到锁，进入 synchronized 关键字包含的代码，如果没有再判断一次 instance 是否为空，则可能会重复创建实例。

**双重检查锁：**

1. 双重判断，延迟加载；
2. 线程安全；
3. JDK 版本要求1.5起。

#### 3.4 静态内部类

```java
public class SingletonDemoInStaticInnerClass {
    // 静态内部类
    private static class InnerClass{
    // 初始化实例
    private final static SingletonDemoInStaticInnerClass INSTANCE = new SingletonDemoInStaticInnerClass();

    }

    // 私有构造
    private SingletonDemoInStaticInnerClass() {}

    // 公关获取实例方法（线程安全，延迟加载）
    public static SingletonDemoInStaticInnerClass getInstance() {
        return InnerClass.INSTANCE;
    }

}
```

**静态内部类：**

1. 利用了classloader机制来保证初始化 instance 时只有一个线程，**线程安全**；
2. 只有通过显式调用 getInstance 方法时，才会显式装载静态内部类，从而实例化instance，**延迟加载**。

#### 3.5 枚举

```java
public enum SingletonEnum {


    // 枚举元素本身就是单例 
    INSTANCE;

    // 其他要执行的方法
    public void sayHello() {
        System.out.println("你好");
    }
}
```

**枚举**：这是实现单例模式的最佳方法。它更简洁，不仅能避免多线程同步问题，而且还自动支持序列化机制，防止反序列化重新创建新的对象，绝对防止多次实例化。但是**不是延迟加载**的。


**如何选用哪种方式实现单例模式？**
 一般情况下，不建议懒汉式，建议使用饿汉式；只有在要明确实现延迟加载效果时，才会使用静态内部类；如果涉及到反序列化创建对象时，可以尝试使用枚举；如果有其他特殊的需求，可以考虑使用双重检查锁。




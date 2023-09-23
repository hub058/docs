---
title: MyBatis
---

## 一、引言

### 1.1 什么是框架？

框架：框架使用你的，而不是你在使用框架的。

框架让我们提供什么信息，配置信息，数据库连接用户名密码等，你必须提供，还得按照框架要要求的方式提供，否则你就别用它。

> [软件的半成品，解决了软件开发过程当中的普适性问题]()，从而**简化了开发步骤，提供了开发的效率**。

怎么写简历？下载一个简历的模板，就是一个简历的半成品，我们只需要到模板中填入数据【个人信息】就可以.

MyBatis: 只需要按框架的要求的给你数据库连接信息，提供一个Dao层接口，写一个SQL语句，就OK。



### 1.2 什么是ORM框架？

> * ORM（Object Relational Mapping）对象关系映射，将程序中的[一个对象与表中的一行数据一一对应]()。
> * ORM框架提供了持久化类与表的映射关系，在运行时参照映射文件的信息，[把对象持久化到数据库中`]()。



###  1.3 使用JDBC完成ORM操作的缺点？

> * 存在大量的冗余代码。
>
> * 手工创建 Connection、Statement 等。
>
> * 手工将结果集封装成实体对象。
>
> * 查询效率低，没有对数据访问进行过优化（Not Cache）。



##  二、MyBatis框架

------

### 2.1 概念

小鸟：轻量级简单灵活的框架。

> * MyBatis本是Apache软件基金会的一个开源项目iBatis, 2010年这个项目由apache software foundation 迁移到了Google Code，并且改名为MyBatis 。2013年11月迁移到Github。
> * MyBatis是一个[优秀的基于Java的持久层框架]()，支持自定义SQL，存储过程和高级映射。
> * MyBatis[对原有JDBC操作进行了封装]()，几乎消除了所有JDBC代码，使开发者只需关注 **SQL** 本身。
> * MyBatis可以使用简单的XML或Annotation来配置执行SQL，并[自动完成ORM操作]()，将执行结果返回。



### 2.2 访问与下载

> 官方网站：<http://www.mybatis.org/mybatis-3/>
>
> 下载地址：<https://github.com/mybatis/mybatis-3/releases/tag/mybatis-3.5.1>



## 三、构建Maven项目

------

### 3.1 新建项目

|                使用IDEA打开已创建的文件夹目录                |
| :----------------------------------------------------------: |
| ![image-20220419205728260](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220419205728260.png) |



### 3.2 选择Maven目录

|                        选择Maven项目                         |
| :----------------------------------------------------------: |
| ![image-20220419205746259](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220419205746259.png) |



### 3.3 GAV坐标

|                           GAV坐标                            |
| :----------------------------------------------------------: |
| ![image-20220419205837121](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220419205837121.png) |



## 四、MyBatis环境搭建【`重点`】

------

### 4.1 pom.xml中引入MyBatis核心依赖

> 在pom.xml中引入相关依赖

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.qf</groupId>
    <artifactId>hello-mybatis</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>


    <dependencies>
        <!-- 添加mybatis的依赖 -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>

        <!-- mysql驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>
    </dependencies>

</project>
``` 



### 4.2 创建MyBatis配置文件

>  数据库连接配置文件
>  注意修改下properties属性文件的编码
>
>  ![image-20220420092623860](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220420092623860.png)

``` properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/db2202?useUnicode=true&characterEncoding=UTF-8
username=root
password=root
initialSize=10
maxActive=20
minIdle=5
maxWait=3000
removeAbandoned=true
removeAbandonedTimeout=3000
``` 

> 创建并配置mybatis-config.xml

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!--MyBatis配置-->
<configuration>
    <properties resource="database.properties"/>
    <!--JDBC环境配置、选中默认环境-->
    <environments default="dev">
        <environment id="dev">
            <!--事务管理-->
            <transactionManager type="JDBC"/>
            <!--连接池-->
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>

    <!--Mapper注册-->
    <mappers>
        <mapper resource="mapper/UserMapper.xml" />
    </mappers>
    
</configuration>
``` 

* `注意：mapper.xml默认建议存放在resources中,路径不能以/开头`

扩展点：

IDEA的全局配置，新项目配置

![image-20220420101346517](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220420101346517.png)





## 五、MyBatis开发步骤【`重点`】

------

### 5.1 建表

``` 	sql
create table users(
  id int primary key auto_increment,
  name varchar(50),
  password varchar(50),
  sex varchar(1),
  birthday datetime,
  registTime datetime
)default charset = utf8;
``` 



### 5.2 定义实体类

> 定义所需CURD操作的实体类

``` java
package com.qf.mybatis.part1.basic;

public class User {
    private Integer id;
    private String name;
    private String password;
    private String sex;
  	private Date birthday;
  	private Date registTime;

    //Getters And Setters
}
``` 



### 5.3 定义DAO接口

> 根据所需DAO定义接口、以及方法

``` java
package com.qf.hello.mybatis.dao;

import com.qf.hello.mybatis.entity.User;

public interface UserMapper {
    // 根据ID查询用户
    User selectUserById(Integer id);
}

``` 



### 5.4 编写Mapper.xml

> 在resources目录中下新建mapper文件夹
>
> 在文件夹下创建UserMapper.xml文件

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.qf.hello.mybatis.dao.UserMapper">
    <select id="selectUserById" parameterType="int" resultType="com.qf.hello.mybatis.entity.User">
        select * from users where id=#{id}
    </select>
</mapper>
``` 

安装个mybatis的插件

![image-20220420103129653](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220420103129653.png)



### 5.5 注册Mapper

> 将Mapper.xml注册到mybatis-config.xml中

``` xml
<!--Mapper文件注册位置-->
<mappers>
    <!--注册Mapper文件-->
    <mapper resource="mapper/UserMapper.xml"/>
</mappers>
``` 



### 5.6 测试一

> MyBatis的API操作方式

``` java
package com.qf.hello.mybatis.dao;

import com.qf.hello.mybatis.entity.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;

class UserMapperTest {

    @Test
    void selectUserById() {
        try {
            // 1、读取mybatis的配置文件
            InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
            // 2、创建SqlSession会话,mybatis使用工厂建造者的方式创建
            SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(inputStream);
            SqlSession sqlSession = factory.openSession();
            // 3、获取要执行操作的接口
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            // 4、执行查询
            User user = userMapper.selectUserById(1);
            // 5、查看数据
            System.out.println(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
``` 



### 5.7 测试二【了解】

> iBatis传统操作方式

``` java
package com.qf.mybatis.part1.basic;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;

public class HelloMyBatis {

    @Test
    public void test2() throws IOException {
		//1.获得读取MyBatis配置文件的流对象
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");

        //2.构建SqlSession连接对象的工厂
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);

        //3.通过工厂获得连接对象
        SqlSession sqlSession = factory.openSession();

        //4.通过连接对象直接调用接口中的方法
		Object o = sqlSession.selectOne("com.qf.mybatis.part1.basic.UserDao.selectUserById", 1);
      
      	System.out.println(o);
    }
}
``` 



## 六、细节补充

------

### 6.1 解决mapper.xml存放在resources以外路径中的读取问题

> 在pom.xml文件最后追加< build >标签，以便可以将xml文件复制到classes中，并在程序运行时正确读取。

``` xml
 <build>
     <!--指定资源文件的位置-->
     <resources>
         <resource>
             <directory>src/main/java</directory>
             <includes>
                 <include>**/*.xml</include>
             </includes>
         </resource>

         <resource>
             <directory>src/main/resources</directory>
             <includes>
                 <include>**/*.xml</include>
                 <include>**/*.properties</include>
             </includes>
         </resource>
     </resources>
</build>
``` 



### 6.2 properties配置文件

> 对于mybatis-config.xml的核心配置中，如果存在需要频繁改动的数据内容，可以提取到properties中。

``` properties
#database.properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/example?useUnicode=true&characterEncpding=utf8
jdbc.username=root
jdbc.password=123456
``` 



> 修改mybatis-config.xml。

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
	<!--添加properties配置文件路径(外部配置、动态替换)-->
    <properties resource="database.properties" />

    <environments default="MySqlDB">
        <environment id="MySqlDB">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--使用$ + 占位符-->
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper resource="mapper/UserMapper.xml" />
    </mappers>
</configuration>
``` 



### 6.3 类型别名

> 为实体类定义别名，提高书写效率。

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <properties ... />
    
    <!--定义别名二选一-->
    <typeAliases>
        <!--定义类的别名-->
        <typeAlias type="com.qf.mybatis.part1.basic.User" alias="user" />
        
        <!--自动扫描包，将原类名作为别名-->
        <package name="com.qf.hello.mybatis.entity"/>
    </typeAliases>
  
  	...
</configuration>
``` 



### 6.4 创建log4j配置文件

> pom.xml添加log4j依赖

``` xml
<!-- log4j日志依赖 https://mvnrepository.com/artifact/log4j/log4j -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
``` 



> 创建并配置log4j.properties

``` properties
# Global logging configuration
log4j.rootLogger=DEBUG, stdout
# MyBatis logging configuration...
log4j.logger.org.mybatis.example.BlogMapper=TRACE
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
``` 



|   级别    | 描述                                                         |
| :-------: | :----------------------------------------------------------- |
| ALL LEVEL | 打开所有日志记录开关；是最低等级的，用于打开所有日志记录。   |
| [DEBUG]() | [输出调试信息；指出细粒度信息事件对调试应用程序是非常有帮助的。]() |
|   INFO    | 输出提示信息；消息在粗粒度级别上突出强调应用程序的运行过程。 |
|   WARN    | 输出警告信息；表明会出现潜在错误的情形。                     |
|   ERROR   | 输出错误信息；指出虽然发生错误事件，但仍然不影响系统的继续运行。 |
|   FATAL   | 输出致命错误；指出每个严重的错误事件将会导致应用程序的退出。 |
| OFF LEVEL | 关闭所有日志记录开关；是最高等级的，用于关闭所有日志记录。   |



## 七、MyBatis的CRUD操作【`重点`】

------

### 7.1 查询

> 标签：< select id="" resultType="" >



#### 7.1.1 注解参数绑定【推荐】

``` java
import org.apache.ibatis.annotations.Param; //引入注解

public interface UserMapper {
    // 根据名字和密码查询用户,如果是多参数入参推荐使用@Param指定参数名
    User selectUserByNameAndPwd(@Param("name") String name, @Param("password") String pwd);
}
``` 

``` xml
<!--  多参数入参在接口中使用@Param注解进行参数绑定  -->
<select id="selectUserByNameAndPwd" resultType="user">
    select *
    from users
    where name = #{name}
    and password = #{password}
</select>
``` 



#### 7.1.2 Map参数绑定

``` java
public interface UserMapper {
    // 根据名字和密码查询用户,传递map类型的参数
    User selectUserByNameAndPwdWithMap(Map<String,String> map);
}
``` 

``` java
Map<String, String> map = new HashMap<>();
map.put("name", "刘阳");
map.put("pwd", "123456");
User user = userMapper.selectUserByNameAndPwdWithMap(map);
``` 

``` xml
<!-- 参数如果传递的是map 占位符就是map中的key -->
<select id="selectUserByNameAndPwdWithMap" resultType="user" parameterType="map">
    select *
    from users
    where name = #{name}
    and password = #{pwd}
</select>
``` 



#### 7.1.3 对象参数绑定

``` java
public interface UserMapper {
    //使用对象属性进行参数绑定
    // 根据名字和密码查询用户,传递user类型的参数
    User selectUserByNameAndPwdWithUser(User user);
}
``` 

``` xml
<!--    如果参数传递的是对象，那么占位符中就是对象的属性-->
<select id="selectUserByNameAndPwdWithUser" resultType="user" parameterType="user">
    select *
    from users
    where name = #{name}
    and password = #{password}
</select>
``` 



#### 7.1.4 模糊查询

``` java
public interface UserMapper {
    // 根据用户名字模糊查询用户
    User selectUserByName(String name);
}
``` 

``` xml
<select id="selectUserByName" resultType="user" parameterType="string">
    select * from users where name like concat('%',#{name},'%')
</select>
``` 



### 7.2 删除

> 标签：< delete id="" parameterType="" >

``` xml
 <delete id="deleteUser" parameterType="int">
    DELETE FROM users
    WHERE id = #{id} <!--只有一个参数时，#{任意书写}-->
</delete>
``` 



### 7.3 修改

> 标签：< update id="" parameterType="" >

``` xml
<update id="updateUser" parameterType="user">
    UPDATE users SET name=#{name}, password=#{password}, sex=#{sex}, birthday=#{birthday}
    WHERE id = #{id} <!--方法参数为对象时，可直接使用#{属性名}进行获取-->
</update>
``` 



### 7.4 添加

> 标签：< insert id="" parameterType="" >

``` xml
<!--手动主键-->
<insert id="insertUser" parameterType="user">
    insert into users values (#{id},#{name},#{password},#{sex},#{birthday},#{registTime})
</insert>

<!--自动主键-->
<insert id="insertUser" parameterType="user">
	<!-- 自动增长主键，以下两种方案均可 -->
    insert into users values (#{id},#{name},#{password},#{sex},#{birthday},#{registTime})
	insert into users values (NULL,#{name},#{password},#{sex},#{birthday},#{registTime})
</insert>
``` 



### 7.5 主键回填

> 新增完成后，如果想要获取自增的主键ID，如何获取？


``` xml
<!-- 通过keyProperty指定生成的主键封装到哪个属性中 useGeneratedKeys="true"使用生成的主键回填 -->
<insert id="insert" parameterType="user" keyProperty="id" useGeneratedKeys="true">
    insert into users(name, password, sex, birthday, registTime)
    values (#{name},#{password},#{sex},#{birthday},#{registTime})
</insert>
``` 



## 八、MyBatis工具类【`重点`】

------

### 8.1 封装工具类

> * Resource：用于获得读取配置文件的IO对象，耗费资源，建议通过IO一次性读取所有所需要的数据。
>
>  * SqlSessionFactory：SqlSession工厂类，内存占用多，耗费资源，建议每个应用只创建一个对象。
>
> * SqlSession：相当于Connection，可控制事务，应为线程私有，不被多线程共享。
>
> * 将获得连接、关闭连接、提交事务、回滚事务、获得接口实现类等方法进行封装。

``` java
package com.qf.mybatis.part1.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class MyBatisUtils {

  	//获得SqlSession工厂
    private static SqlSessionFactory factory;

  	//创建ThreadLocal绑定当前线程中的SqlSession对象
    private static final ThreadLocal<SqlSession> tl = new ThreadLocal<SqlSession>();

    static {
        try {
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            factory = new SqlSessionFactoryBuilder().build(is);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //获得连接（从tl中获得当前线程SqlSession）
    private static SqlSession openSession(){
        SqlSession session = tl.get();
        if(session == null){
            session = factory.openSession();
            tl.set(session);
        }
        return session;
    }

    //释放连接（释放当前线程中的SqlSession）
    private static void closeSession(){
        SqlSession session = tl.get();
        session.close();
        tl.remove();
    }

    //提交事务（提交当前线程中的SqlSession所管理的事务）
    public static void commit(){
        SqlSession session = openSession();
        session.commit();
        closeSession();
    }

    //回滚事务（回滚当前线程中的SqlSession所管理的事务）
    public static void rollback(){
        SqlSession session = openSession();
        session.rollback();
        closeSession();
    }

    //获得接口实现类对象
    public static <T extends Object> T getMapper(Class<T> clazz){
        SqlSession session = openSession();
        return session.getMapper(clazz);
    }
}
``` 



### 8.2 测试工具类

> 调用MyBatisUtils中的封装方法。

``` java
@Test
public void testUtils() {
    try {
				UserDao userDao = MyBatisUtils.getMapper(UserDao.class);
				userDao.deleteUser(15);
				MyBatisUtils.commit();
		} catch (Exception e) {
				MyBatisUtils.rollback();
				e.printStackTrace();
		}
}
``` 



## 九、ORM映射【`重点`】

对象关系映射：

>  类 ----> 表  
>
> 类的属性--->字段
>
> 类的一个实例 ---> 表中的一条数据

------

### 9.1 MyBatis自动ORM失效

> MyBatis只能自动维护库表”列名“与”属性名“相同时的一一对应关系，二者不同时，无法自动ORM。

|                         自动ORM失效                          |
| :----------------------------------------------------------: |
| ![007](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/007.png) |

``` sql
create table t_manager(
    mgr_id int primary key auto_increment comment '主键',
    mgr_name varchar(20) not null comment '名字',
    mgr_pwd varchar(20) not null comment '密码'
)default charset='utf8';

show tables ;

desc t_manager;

insert into t_manager values(NULL,'杜猛','123');

select * from t_manager where mgr_id=1;
``` 





### 9.2 方案一：列的别名

> 在SQL中使用 as 为查询字段添加列别名，以匹配属性名。

``` xml
<mapper namespace="com.qf.mybatis.part2.orm.ManagerDao">
    <select id="selectManagerByIdAndPwd" resultType="com.qf.mybatis.part2.orm.Manager">
        SELECT mgr_id AS id , mgr_name AS username , mgr_pwd AS password
        FROM t_managers
        WHERE mgr_id = #{id} AND mgr_pwd = #{pwd}
    </select>
</mapper>
``` 



### 9.3 方案二：结果映射（ResultMap - 查询结果的封装规则）

> 通过< resultMap id="" type="" >映射，匹配列名与属性名。

``` xml
<mapper namespace="com.qf.mybatis.part2.orm.ManagerDao">

    <!--定义resultMap标签-->
    <resultMap id="managerResultMap" type="com.qf.mybatis.part2.orm.Manager">
      	<!--关联主键与列名-->
        <id property="id" column="mgr_id" />
      	<!--关联属性与列名-->
        <result property="username" column="mgr_name" />
        <result property="password" column="mgr_pwd" />
    </resultMap>
  
     <!--使用resultMap作为ORM映射依据-->
    <select id="selectAllManagers" resultMap="managerResultMap">
        SELECT mgr_id , mgr_name , mgr_pwd
        FROM t_managers
    </select>
</mapper>
``` 



| resultMap                                                    |
| ------------------------------------------------------------ |
| ![20220421152541](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220421152541.png) |



## 十、MyBatis处理关联关系-多表连接【`重点`】

------

> 实体间的关系：关联关系（拥有 has、属于 belong）
>
>  * OneToOne：一对一关系（Passenger--- Passport）
>
> * OneToMany：一对多关系（Department  ---  Employee ）
>
> * ManyToMany：多对多关系（Student --- Subject）

|                      Table建立外键关系                       |
| :----------------------------------------------------------: |
| ![008](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/008.png) |

|                      Entity添加关系属性                      |
| :----------------------------------------------------------: |
| ![009_2](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/009_2.jpg) |

|                   Mapper中将属性与列名对应                   |
| :----------------------------------------------------------: |
| ![010](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/010.png) |

SQL语句

``` sql
-- OneToOne 相关表
create table passenger(
    id int primary key auto_increment comment '主键ID',
    name varchar(20) not null comment '名字',
    sex varchar(1) not null default '男' comment '性别',
    birthday date comment '生日'
)default charset='utf8' comment '旅客表';

insert into passenger values (null,'杜猛','男',now());
insert into passport values (null,'中国',now(),1);
select * from passenger;
select * from passport;

create table passport(
    id int primary key auto_increment comment '主键ID',
    nationality varchar(20) not null comment '国家',
    expire date comment '过期时间',
    passenger_id int comment '旅客ID'
)default charset='utf8' comment '护照表';

select p1.id pid,p1.name name,p1.sex sex,p1.birthday birthday, p2.*
from passenger p1 
left join passport p2 
on p1.id = p2.passenger_id;
``` 



### 10.1 OneToOne

> SQL参考OneToOneExample.sql

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.qf.hello.mybatis.dao.PassengerMapper">

    <!-- 结果映射（查询结果的封装规则） -->
    <resultMap id="passengerResultMap" type="passenger">
        <id column="pid" property="id"/>
        <result column="name" property="name"/>
        <result column="sex" property="sex"/>
        <result column="birthday" property="birthday"/>
        <!-- association:关联 property:属性名 javaType:关联的java对象的类型 -->
        <!-- 关系表中数据的封装规则 -->	 <!-- 指定关系表的实体类型 -->
        <association property="passport" javaType="passport">
            <id column="id" property="id"/>
            <result column="nationality" property="nationality" />
            <result column="expire" property="expire"/>
        </association>
    </resultMap>

    <!-- 多表连接查询 -->					  	<!-- 结果映射（查询结果的封装规则）-->
    <select id="selectById" resultType="passenger" resultMap="passengerResultMap">
        select p1.id pid, p1.name name, p1.sex sex, p1.birthday birthday, p2.*
        from passenger p1 left join passport p2 on p1.id = p2.passenger_id where p1.id=#{id}
    </select>
</mapper>
``` 

* [注意：指定“一方”关系时（对象），使用< association javaType="" >]()

![image-20220422092407465](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220422092407465.png)

### 10.2 OneToMany

> SQL参考OneToManyExample.sql

``` xml
<resultMap id="deptResultMap" type="dept">
    <id property="id" column="did"/>
    <result property="name" column="name"/>
    <result property="location" column="location"/>
    <!-- 对象中的集合属性映射需要使用collection节点 property="属性名" ofType="集合中的元素类型" -->
    <collection property="emps" ofType="employee">
        <id property="empId" column="emp_id"/>
        <result property="empName" column="emp_name"/>
        <result property="salary" column="salary"/>
        <result property="deptId" column="dept_id"/>
    </collection>
</resultMap>

<select id="selectById" resultMap="deptResultMap" parameterType="int">
    select d.id did, d.name name, d.location location, e.*
    from dept d
    left join employee e
    on d.id = e.dept_id
    where d.id = #{id}
</select>
``` 

* [注意：指定“多方”关系时（集合），使用< collection ofType="" >]()

| 映射图示                                                     |
| ------------------------------------------------------------ |
| ![image-20220422103224595](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220422103224595.png) |



### 10.3 ManyToMany

> SQL参考ManyToManyExample.sql

|                       建立第三张关系表                       |
| :----------------------------------------------------------: |
| 多对多关系中，需要建立第三张关系表，当中存储两表中的外键，并设置为联合主键。 |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220422114139.png) |
| ![20220422115945](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220422115945.png) |



``` xml
<!--封装多对多的结果-->
<resultMap id="studentResultMap" type="student">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="sex" column="sex"/>
    <!-- property="集合属性的名称" ofType="集合里对象的类型" -->
    <collection property="subjectList" ofType="subject">
        <id property="id" column="sid"/>
        <result column="sname" property="name"/>
        <result column="grade" property="grade"/>
    </collection>
</resultMap>

<!--根据ID查询学生-->
<select id="selectById" resultMap="studentResultMap" parameterType="int">
    select s1.*,s2.id sid,s2.name sname,s2.grade grade
    from student s1
    left join student_subject ss
    on s1.id = ss.student_id
    left join subject s2
    on s2.id=ss.subject_id
    where s1.id=#{id}
</select>
``` 

* [注意：指定“多方”关系时（集合），使用< collection ofType="" >]()



### 10.4 关系总结

> 一方，添加集合；多方，添加对象。
>
> 双方均可建立关系属性，建立关系属性后，对应的Mapper文件中需使用< ResultMap >完成多表映射。
>
> 持有对象关系属性，使用< association property="dept" javaType="department" >
>
> 持有集合关系属性，使用< collection property="emps" ofType="employee" >



## 十一、动态SQL【`重点`】

------

> MyBatis的映射文件中支持在基础SQL上添加一些逻辑操作，并动态拼接成完整的SQL之后再执行，以达到SQL复用、简化编程的效果。

使用UserMapper举例子

### 11.1 < sql >

``` xml
<!-- 定义SQL片段 -->
<sql id="allField">
    select *
    from users
</sql>

<select id="selectUserByName" resultType="user" parameterType="string">
    <include refid="allField"/>
    where name like concat('%', #{name}, '%')
</select>
``` 

### 11.2 < if >

``` xml
<select id="selectUserByNameOrPassword" resultType="User">
    select * from users
    <where>
        <if test="name != null and name !=''">
            or name =#{name}
        </if>
        <if test="pwd != null and pwd !=''">
            or password =#{pwd}
        </if>
    </where>
</select>
``` 



### 11.3 < where >

``` xml
<select id="selectUserByNameOrPassword" resultType="User">
    select * from users
    <where>
        <if test="name != null and name !=''">
            or name =#{name}
        </if>
        <if test="pwd != null and pwd !=''">
            or password =#{pwd}
        </if>
    </where>
</select>
``` 

| where标签可以过滤的前缀：                                    |
| ------------------------------------------------------------ |
| ![image-20220422144238182](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220422144238182.png) |



### 11.4 < set >

动态更新

``` xml
<update id="updateUserDymatic" parameterType="user">
    update users
    <set>
        <if test="name !=null and name!=''">name=#{name},</if>
        <if test="password !=null and password!=''">password=#{password},</if>
        <if test="sex !=null and sex!=''">sex=#{sex},</if>
        <if test="birthday !=null">birthday=#{birthday},</if>
        <if test="registTime !=null">registTime=#{registTime},</if>
    </set>
    where id = #{id}
</update>
``` 



### 11.5 < trim >

动态添加和去除前后缀

![image-20220422155905121](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20220422155905121.png)

> < trim prefix="" suffix="" prefixOverrides="" suffixOverrides="" >代替< where > 、< set >
>
> prefix前缀 -[prefixOverrides前缀去重] +内容 -[suffixOverrides后缀去重] + suffix后缀 



prefixOverrides/suffixOverrides 如果有多个值的情况下，使用|分割

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/QQ%E5%9B%BE%E7%89%8720220422160129.jpg)

``` xml
<select id="selectUserByNameOrPassword" resultType="User">
    select * from users
    <trim prefix="WHERE" prefixOverrides="and|or">
        <if test="name != null and name !=''">
            or name =#{name}
        </if>
        <if test="pwd != null and pwd !=''">
            or password =#{pwd}
        </if>
    </trim>
</select>
``` 

``` xml
<update id="updateUserDynamic" parameterType="user">
    update users
    <trim prefix="set" suffixOverrides=",">
        <if test="name !=null and name!=''">name=#{name},</if>
        <if test="password !=null and password!=''">password=#{password},</if>
        <if test="sex !=null and sex!=''">sex=#{sex},</if>
        <if test="birthday !=null">birthday=#{birthday},</if>
        <if test="registTime !=null">registTime=#{registTime},</if>
    </trim>
    where id = #{id}
</update>
``` 



### 11.6 < foreach >

``` xml
批量删除
<!--  delete from users where id in (2,3,4)  -->
<!-- 如果传入的参数是一个集合 foreach的collection固定写list -->
<delete id="deleteByIdList" parameterType="list">
    delete from users where id in
    <foreach collection="list" open="(" close=")" item="uid" separator=",">
        #{uid}
    </foreach>
</delete>

<!-- 如果传入的参数是一个数组 foreach的collection固定写array -->
<delete id="deleteByIdArray" parameterType="int[]">
    delete from users where id in
    <foreach collection="array" open="(" close=")" item="uid" separator=",">
        #{uid}
    </foreach>
</delete>



-----批量添加
<insert id="addUsers">
    insert into users values
    <foreach collection="list" item="user"  separator=",">
        (null,#{user.name},#{user.password},#{user.sex},#{user.birthday})
    </foreach>
</insert>
``` 

| 参数       | 描述     | 取值                                          |
| ---------- | -------- | --------------------------------------------- |
| collection | 容器类型 | list、array、map                              |
| open       | 起始符   | (                                             |
| close      | 结束符   | )                                             |
| separator  | 分隔符   | ,                                             |
| index      | 下标号   | 从0开始，依次递增                             |
| item       | 当前项   | 任意名称（循环中通过 #{任意名称} 表达式访问） |



## 十二、缓存（Cache）【`重点`】

------

> 内存中的一块存储空间，服务于某个应用程序，旨在将频繁读取的数据临时保存在内存中，便于二次快速访问。

| 无缓存：用户在访问相同数据时，需要发起多次对数据库的直接访问，导致产生大量IO、读写硬盘的操作，效率低下 |
| :----------------------------------------------------------: |
| ![012](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/012.png) |

| 有缓存：首次访问时，查询数据库，将数据存储到缓存中；再次访问时，直接访问缓存，减少IO、硬盘读写次数、提高效率 |
| :----------------------------------------------------------: |
| ![013](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/013.png) |



### 12.1 一级缓存

> SqlSession级别的缓存，同一个SqlSession的发起多次同构查询，会将数据保存在一级缓存中。

* [注意：无需任何配置，默认开启一级缓存。]()

在sqlsession 中有一个数据结构 是map 结构， 这个区域就是一级缓存区域，一级缓存区域中的 key 是由 sql 语句   方法参数  statement 等 组成的一个唯一值   对应的 value 就是 缓存内容 ，  一级缓存 map  的生命周期 和当前  sqlSession  一致 

### 12.2 二级缓存

> SqlSessionFactory级别的缓存，同一个SqlSessionFactory构建的SqlSession发起的多次同构查询，会将数据保存在二级缓存中。

* [注意：在sqlSession.commit()或者sqlSession.close()之后生效。]()



二级缓存指的是 同一个 namespace 下的 mapper二级缓存的数据结构  也是一个  map    二级缓存 需要 手动开启 



#### 12.2.1 开启全局缓存

> < settings >是MyBatis中极为重要的调整设置，他们会改变MyBatis的运行行为，其他详细配置可参考官方文档。

``` xml
<configuration>
	<properties .../>
  	
  	<!-- 注意书写位置 -->
    <settings>
        <setting name="cacheEnabled" value="true"/> <!-- mybaits-config.xml中开启全局缓存（默认开启） -->
    </settings>
  
  	<typeAliases></typeAliases>
</configuration>
``` 



#### 12.2.2 指定Mapper缓存

``` xml
<mapper namespace="com.qf.mybatis.part2.cache.BookDao">
    <cache /> <!-- 开启 二级缓存   必须指定 这个   标签 -->

    <select id="selectBookByCondition" resultType="com.qf.mybatis.part2.cache.Book">
        SELECT * FROM t_books
    </select>
</mapper>
``` 

``` java
@Test
public void testMapperCache(){

  	SqlSession sqlSession1 = MyBatisUtils.getSession();
  
  	BookDao bookDao1 = sqlSession1.getMapper(BookDao.class);

  	bookDao1.selectBookByCondition(new Book());

  	sqlSession1.close(); //必须关闭SqlSession才可缓存数据

  	//--------------------

  	SqlSession sqlSession2 = MyBatisUtils.getSession();

  	BookDao bookDao2 = sqlSession2.getMapper(BookDao.class);

  	bookDao2.selectBookByCondition(new Book());

  	sqlSession2.close(); //缓存击中
}
``` 



#### 12.2.3 缓存清空并重新缓存

``` java
@Test
public void testMapperCache(){

  	SqlSession sqlSession1 = MyBatisUtils.getSession();
  
  	BookDao bookDao1 = sqlSession1.getMapper(BookDao.class);

  	bookDao1.selectBookByCondition(new Book());

  	sqlSession1.close(); //必须关闭SqlSession才可缓存数据到二级缓存

  	//--------------------
  	
		SqlSession sqlSession3 = MyBatisUtils.getSession();

		BookDao bookDao3 = sqlSession3.getMapper(BookDao.class);

		bookDao3.deleteBookById(102);

		sqlSession3.commit(); //DML成功，数据发生变化，缓存清空

		sqlSession3.close();
  
  	//--------------------

  	SqlSession sqlSession2 = MyBatisUtils.getSession();

  	BookDao bookDao2 = sqlSession2.getMapper(BookDao.class);

  	bookDao2.selectBookByCondition(new Book());

  	sqlSession2.close(); //缓存未击中，重新查询数据库、重新缓存
}
``` 



## 十三、Druid连接池

------

### 13.1 概念

> Druid 是阿里巴巴开源平台上的一个项目，整个项目由数据库连接池、插件框架和 SQL 解析器组成。该项目主要是为了扩展 JDBC 的一些限制，可以让程序员实现一些特殊的需求，比如向密钥服务请求凭证、统计 SQL 信息、SQL 性能收集、SQL 注入检查、SQL 翻译等，程序员可以通过定制来实现自己需要的功能。



### 13.2 不同连接池对比

> 测试执行申请归还连接 1,000,000（一百万）次总耗时性能对比。



#### 13.2.1 测试环境

| 环境 | 版本                  |
| ---- | --------------------- |
| OS   | OS X 10.8.2           |
| CPU  | Intel i7 2GHz 4 Core  |
| JVM  | Java Version 1.7.0_05 |



#### 13.2.2 基准测试结果对比

| JDBC-Conn Pool   | 1 Thread | 2 threads | 5 threads  | 10 threads | 20 threads | 50 threads  |
| ---------------- | -------- | --------- | ---------- | ---------- | ---------- | ----------- |
| [Druid]()        | [898]()  | [1,191]() | [1,324]()  | [1,362]()  | [1,325]()  | [1,459]()   |
| tomcat-jdbc      | 1,269    | 1,378     | 2,029      | 2,103      | 1,879      | 2,025       |
| DBCP             | 2,324    | 5,055     | 5,446      | 5,471      | 5,524      | 5,415       |
| BoneCP           | 3,738    | 3,150     | 3,194      | 5,681      | 11,018     | 23,125      |
| jboss-datasource | 4,377    | 2,988     | 3,680      | 3,980      | 32,708     | 37,742      |
| C3P0             | 10,841   | 13,637    | 10,682     | 11,055     | 14,497     | 20,351      |
| Proxool          | 16,337   | 16,187    | 18,310(Ex) | 25,945     | 33,706(Ex) | 39,501 (Ex) |



#### 13.2.3 测试结论

* [Druid 是性能最好的数据库连接池，tomcat-jdbc 和 druid 性能接近。]()
* Proxool 在激烈并发时会抛异常，不适用。
* C3P0 和 Proxool 都相当慢，影响 sql 执行效率。
* BoneCP 性能并不优越，采用 LinkedTransferQueue 并没有能够获得性能提升。
* 除了 bonecp，其他的在 JDK 7 上跑得比 JDK 6 上快。
* jboss-datasource 虽然稳定，但性能很糟糕。



### 13.3 配置pom.xml

> 引入Druid依赖

``` xml
<!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.16</version>
</dependency>
``` 



### 13.4 创建DruidDataSourceFactory

> MyDruidDataSourceFactory并继承PooledDataSourceFactory，并替换数据源。

``` java
package com.qf.mybatis.part2.utils;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.datasource.pooled.PooledDataSourceFactory;

public class MyDruidDataSourceFactory extends PooledDataSourceFactory {
    public MyDruidDataSourceFactory() {
        this.dataSource = new DruidDataSource();//替换数据源
    }
}
``` 



### 13.5 修改mybatis-config.xml

> mybatis-config.xml中连接池相关配置。

``` xml
<!--连接池     注意这里的属性名 -->
<dataSource type="com.qf.mybatis.part2.utils.DruidDataSourceFactory"><!--数据源工厂-->
    <property name="driverClass" value="${driver}"/>
    <property name="jdbcUrl" value="${url}"/>
    <property name="username" value="${username}"/>
    <property name="password" value="${password}"/> 
  
</dataSource>
``` 

[注意：< property name="属性名" />属性名必须与com.alibaba.druid.pool.DruidAbstractDataSource中一致。]()



## 十四、PageHelper

------

### 14.1 概念

> PageHelper是适用于MyBatis框架的一个分页插件，使用方式极为便捷，支持任何复杂的单表、多表分页查询操作。



### 14.2 访问与下载

> 官方网站：https://pagehelper.github.io/
>
> 下载地址：https://github.com/pagehelper/Mybatis-PageHelper



### 14.3 开发步骤

> PageHelper中提供了多个分页操作的静态方法入口。



#### 14.3.1 引入依赖

> pom.xml中引入PageHelper依赖。

``` xml
<dependency>
		<groupId>com.github.pagehelper</groupId>
		<artifactId>pagehelper</artifactId>
		<version>5.1.10</version>
</dependency>
``` 



#### 14.3.2 配置MyBatis-config.xml

> 在MyBatis-config.xml中添加< plugins >。

``` xml
<configuration>
  	<typeAliases></typeAliases>
  
    <plugins>
        <!-- com.github.pagehelper为PageHelper类所在包名 -->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>
  
  	<environments>...</environments>
</configuration>
``` 



#### 14.3.3 PageHelper应用方式

> 使用PageHelper提供的静态方法设置分页查询条件。

``` java
@Test
public void testPagehelper(){
		UserDao userDao = MyBatisUtils.getMapper(UserDao.class);
		PageHelper.startPage(1,2);//使用PageHelper设置分页条件
		List<User> users = userDao.selectAllUsers();
		for(User user : users){
				System.out.println(user);
		}
}
``` 



### 14.4 PageInfo对象

> PageInfo对象中包含了分页操作中的所有相关数据。

|                        PageInfo结构图                        |
| :----------------------------------------------------------: |
| ![image-20200116145234073](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20200116145234073.png) |



#### 14.4.1 PageInfo应用方式

> 使用PageInfo保存分页查询结果。

``` java
@Test
public void testPageInfo(){
		UserDao userDao = MyBatisUtils.getMapper(UserDao.class);
		PageHelper.startPage(6, 2);
		List<User> users = userDao.selectAllUsers();
		PageInfo<User> pageInfo = new PageInfo<User>(users);//将分页查询的结果集保存在PageInfo对象中
		System.out.println(pageInfo);
}
``` 



#### 14.4.2 注意事项

> * 只有在PageHelper.startPage()方法之后的[第一个查询会有执行分页]()。
> * 分页插件[不支持带有“for update”]()的查询语句。
> * 分页插件不支持[“嵌套查询”]()，由于嵌套结果方式会导致结果集被折叠，所以无法保证分页结果数量正确。。



#### 14.4.3 分页练习

> 使用Servlet+JSP+MyBatis+分页插件，完成分页查询功能。



## 十五、补充【了解】

------

> [以下内容并非必备知识，了解即可。]()



### 15.1 MyBatis注解操作

> 通过在接口中直接添加MyBatis注解，完成CRUD。

* [注意：接口注解定义完毕后，需将接口全限定名注册到mybatis-config.xml的< mappers >中。]()
* [经验：注解模式属于硬编码到.java文件中，失去了使用配置文件外部修改的优势，可结合需求选用。]()

``` xml
<mappers>
		<mapper class="com.qf.mybatis.part1.annotations.UserMapper" /><!-- class="接口全限定名"-->
</mappers>
``` 



#### 15.1.1 查询

``` java
public interface UserMapper {
    @Select("SELECT * FROM t_users WHERE id = #{id}")
    public User selectUserById(Integer id);

    @Select("SELECT * FROM t_users WHERE id = #{id} AND password = #{pwd}")
    public User selectUserByIdAndPwd_annotation(@Param("id") Integer id, @Param("pwd") String password);
}
``` 



#### 15.1.2 删除

``` java
@Delete(value = "DELETE FROM t_users WHERE id = #{id}")
public int deleteUser(Integer id);
``` 



#### 15.1.3 修改

``` java
@Update("UPDATE t_users SET name = #{name} , password = #{password} , salary = #{salary} , birthday = #{birthday} WHERE id = #{id}")
public int updateUser(User user);
``` 



#### 15.1.4 插入

``` java
@Insert("INSERT INTO t_users VALUES(#{id},#{name},#{password},#{salary},#{birthday},null)")
public int insertUser(User user);

@Options(useGeneratedKeys = true , keyProperty = "id") // 自增key，主键为id
@Insert("INSERT INTO t_users VALUES(#{id},#{name},#{password},#{salary},#{birthday},null)")
public int insertUserGeneratedKeys(User user);
``` 



### 15.2 $符号的应用场景

> ${attribute} 属于字符串拼接SQL，而非预编译占位符，会有注入攻击问题，不建议在常规SQL中使用，常用于可解决动态生降序问题。



#### 15.2.1 $符号参数绑定

``` java
public List<User> selectAllUsers1(User user); // ${name} ${id} 可获取user中的属性值
public List<User> selectAllUsers2(@Param("rule") String rule); //必须使用@Param否则会作为属性解析
``` 

``` xml
<select id="selectAllUsers1" resultType="user">
	SELECT * FROM t_users 
    WHERE name = '${name}' or id = ${id} <!-- 拼接name和id，如果是字符类型需要用单引号：'${name}' -->
</select>
<select id="selectAllUsers2" resultType="user">
	SELECT * FROM t_users 
  	ORDER BY id ${rule} <!-- 拼接 asc | desc -->
</select>
``` 

``` java
User user = new User(....);
List<User> ulist1 = userDAO.selectAllUsers1(user); //调用时传入user对象

List<User> ulist2 = userDao.selectAllUsers2("desc"); //调用时传入asc | desc
``` 



#### 15.2.2 $符号注入攻击

``` xml
<select id="selectUsersByKeyword" resultType="user">
	SELECT * FROM t_user
  	WHERE name = '${name}' <!-- 会存在注入攻击  比如传入参数是 【String name = "tom' or '1'='1";】-->
</select>
``` 

|       注入攻击，拼接的内容，改变了原sql语义，被攻击！        |
| :----------------------------------------------------------: |
| ![注入](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/%E6%B3%A8%E5%85%A5.jpg) |



### 15.3 MyBatis处理关联关系-嵌套查询【了解】

> 思路：查询部门信息时，及联查询所属的员工信息。
>
> * DepartmentDao接口中定义selectDepartmentById，并实现Mapper。
> * EmployeeDao接口中定义selectEmployeesByDeptId，并实现Mapper，
> * 当selectDepartmentById被执行时，通过< collection >调用selectEmployeesByDeptId方法，并传入条件参数。



#### 15.3.1 主表查询

> 定义selectEmployeesByDeptId，并书写Mapper，实现根据部门ID查询员工信息

``` java
public interface EmployeeDao {
    /**
     * 根据部门编号查询员工信息
     * @param did 部门编号
     * @return 该部门中的所有员工
     */
    public List<Employee> selectEmployeeByDeptId(@Param("did") String did);
}
``` 

``` xml
<mapper namespace="com.qf.mybatis.part2.one2many.EmployeeDao">
    <!-- 根据部门编号查询所有员工 -->
    <select id="selectEmployeeById" resultType="employee" >
        SELECT id,name,salary,dept_id 
      	FROM t_employees 
      	WHERE dept_id = #{did}
    </select>
</mapper>
``` 



#### 15.3.2 及联调用

> #### 定义selectDepartmentById，并书写Mapper，实现根据部门ID查询部门信息，并及联查询该部门员工信息

``` java
public interface DepartmentDao {
    /**
     * 查询部门信息
     * @param id
     * @return
     */
    public Department selectDepartmentById(@Param("id") String id);
}
``` 

``` xml
<mapper namespace="com.qf.mybatis.part2.one2many.DepartmentDao">
    <resultMap id="departmentResultMap" type="department">
        <id property="id" column="id" />
        <result property="name" column="name" />
        <result property="location" column="location" />
         <!-- column="传入目标方法的条件参数"  select="及联调用的查询目标"-->
        <collection property="emps" ofType="Employee" column="id" 
                    select="com.qf.mybatis.part2.one2many.EmployeeDao.selectEmployeeByDeptId" />
    </resultMap>
    <select id="selectAllDepartments" resultMap="departmentResultMap">
        SELECT id , name , location
        FROM t_departments
        WHERE id = #{id}
    </select>
</mapper>
``` 



#### 15.3.3 延迟加载

> #### mybatis-config.xml中开启延迟加载

``` xml
<settings>
		<setting name="lazyLoadingEnabled" value="true"/> <!-- 开启延迟加载（默认false） -->
</settings>
``` 

* [注意：开启延迟加载后，如果不使用及联数据，则不会触发及联查询操作，有利于加快查询速度、节省内存资源。]()


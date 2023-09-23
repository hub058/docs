---
title: JDBC使用
---


## 1 JDBC是什么

 如何操作数据库

> 使用客户端工具访问数据库，需要手工建立连接，输入用户名和密码登录，编写 SQL 语句，点击执行，查看操作结果（结果集或受影响行数）。

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220321224056.png)

实际开发中，会采用客户端操作数据库吗？

> 在实际开发中，当用户的数据发生改变时，不可能通过客户端操作执行 SQL 语句，因为操作量过大，无法保证效率和正确性。

什么是 JDBC？

> JDBC（Java Database Connectivity） Java 连接数据库的规范（标准），可以使用 Java 语言连接数据库完成 CRUD 操作。

JDBC 核心思想

> Java 中定义了访问数据库的接口，可以为多种关系型数据库提供统一的访问方式。由数据库厂商提供驱动实现类（Driver 数据库驱动）

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220321224133.png)

## 2 数据库操作

> 基本步骤：
>
> 1、导入驱动jar包
>
> 2、获取连接对象 Connection：IP PORT 账号/密码
>
> 3、创建Statement对象
>
> 4、执行sql语句 executeUpdate / executeQuery
>
> 5、关闭相关对象 close

### 2.1 导入jar

将对应的数据库驱动程序拷贝到lib目录下（lib需要手动创建）

| 在工程目录下创建一个lib文件夹                                |
| ------------------------------------------------------------ |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207270922937.png) |
| 把lib文件夹添加到类库中，之后就可以使用jar包中提供的类/方法了 |
| ![image-20220727092408682](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207270924845.png) |

 Jar文件上右键，Build->Add to build path

### 2.2建立连接对象

Mysql版本不同，驱动类和连接的url会有不同

> 例如：
>
> 驱动类：
>
> 8.0以下 com.mysql.jdbc.Driver
>
> 8.0及以上 com.mysql.cj.jdbc.Driver
>
> 连接的字符串：
>
> 8.0及以上 jdbc:mysql://localhost:3306/companydb?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8

```java
// 1、连接到数据库【地址 端口号 账号密码】
String url = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai";
String username = "root";
String password = "root";
Connection connection = DriverManager.getConnection(url, username, password);
//2、看一下连接对象
System.out.println(connection);
//3、关闭连接
connection.close();
```

> JDBC 是由多个接口和类进行功能实现。

|   类型    | 权限定名               | 简介                                                         |
| :-------: | :--------------------- | :----------------------------------------------------------- |
|   class   | java.sql.DriverManager | 管理多个数据库驱动类，提供了获取**数据库连接**的方法         |
| interface | java.sql.Connection    | 代表一个数据库连接（当connection不是null时，表示已连接数据库） |
| interface | java.sql.Statement     | 发送SQL语句到数据库工具                                      |
| interface | java.sql.ResultSet     | 保存SQL查询语句的结果数据（结果集）                          |
|   class   | java.sql.SQLException  | 处理数据库应用程序时所发生的异常                             |

### 2.3 通过Statement对象执行sql语句

> 先获取Statement对象
>
> 再执行executeUpdate() 增删改 / executeQuery() 查询

新增数据

 ```java
private static void insertData() throws SQLException {
    // 1、建立连接
    // jdbc:mysql:// 固定的格式
    // localhost:3306 MYSQL服务端的地址和端口号
    // companydb 你要连接的数据库
    // useSSL=false 不使用加密连接
    // serverTimezone=Asia/Shanghai 设置时区的
    // useUnicode=true&characterEncoding=utf8 字符编码使用UTF8编码
    String url = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8";
    String username = "root";
    String password = "root";
    // 返回的数据库连接对象
    Connection connection = DriverManager.getConnection(url, username, password);
    // 2、获取会话对象 用来操作数据库
    Statement statement = connection.createStatement();
    // 3、添加数据
    String sql = "insert into `user`(userId,username,password) values(5,'狗蛋2','123')";
    // executeUpdate 执行增删改语句的，增删改返回的是影响行数
    int count = statement.executeUpdate(sql);
    System.out.println("添加成功了" + count);
    // 4、关闭资源
    statement.close();
    connection.close();
}
 ```

修改数据：

``` java
private static void updateData() {
    // 声明连接对象和会话对象
    Connection connection = null;
    Statement statement = null;
    try {
        String url = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8";
        String username = "root";
        String password = "root";
        // 赋值操作
        connection = DriverManager.getConnection(url, username, password);
        statement = connection.createStatement();
        // 执行数据更新操作
        String sql = "update `user` set username='超凡' where userId=5";
        // 更新成功了几条数据
        int update = statement.executeUpdate(sql);
        System.out.println("更新成功了" + update + "条数据");
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 在finally块中，关闭资源,先打开的后关闭
        try {
            // 判断对象不是null 就关闭资源
            if (Objects.nonNull(statement)) {
                statement.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (Objects.nonNull(connection)) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

删除数据

``` java
private static void deleteData() {
    // 声明连接对象和会话对象
    Connection connection = null;
    Statement statement = null;
    try {
        String url = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8";
        String username = "root";
        String password = "root";
        // 赋值操作
        connection = DriverManager.getConnection(url, username, password);
        statement = connection.createStatement();
        // 执行数据更新操作
        String sql = "delete from `user` where userId=4";
        // 删除成功了几条数据
        int delete = statement.executeUpdate(sql);
        System.out.println("删除成功了" + delete + "条数据");
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 在finally块中，关闭资源,先打开的后关闭
        try {
            // 判断对象不是null 就关闭资源
            if (Objects.nonNull(statement)) {
                statement.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (Objects.nonNull(connection)) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

- [注意：在编写 DML 语句时，一定要注意字符串参数的符号是单引号 '值']()
- [DML 语句：增删改时，返回受影响行数（int 类型）。]()
- [DQL 语句：查询时，返回结果数据(ResultSet 结果集)。]()

  释放资源

> 遵循[先开后关]()原则，释放所使用到的资源对象。

```java
statement.close();
conn.close();
```

### 2.4 ResultSet对象处理结果集

使用查询方法后，会返回结果集对象

> 常用方法：
>
> next() 从前向后逐个获取结果集中的数据
>
> getString(int columnIndex) 根据字段索引获取指定字段的String类型的值
>
> getString(String columnName) 根据字段名称获取指定字段的String类型的值

 ```java
private static void selectData() {
    // 声明连接对象和会话对象
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
        String url = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8";
        String username = "root";
        String password = "root";
        // 赋值操作
        connection = DriverManager.getConnection(url, username, password);
        statement = connection.createStatement();
        // 执行查询
        String sql = "SELECT * FROM `user`";
        // 使用executeQuery方法执行查询，返回的是结果集
        resultSet = statement.executeQuery(sql);
        // 遍历返回的结果集，打印下数据
        // 调用next方法如果返回了false说明已经没有数据了
        while (resultSet.next()) {
            // 获取每一行的数据
            // 第一列的数据，下标是1而不是0
            int userId = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String pwd = resultSet.getString(3);
            String address = resultSet.getString(4);
            String phone = resultSet.getString(5);
            // 带格式打印 %d 表示一个数值占位值 %s 表示一个字串占位符
            // System.out.println("userId="+userId+",name="+name+",pwd="+pwd+",address="+address+",phone="+phone);
            System.out.printf("userId=%s,name=%s,pwd=%s,address=%s,phone=%s\n", userId, name, pwd, address, phone);
        }

    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 在finally块中，关闭资源,先打开的后关闭
        try {
            if (Objects.nonNull(resultSet)) {
                resultSet.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            // 判断对象不是null 就关闭资源
            if (Objects.nonNull(statement)) {
                statement.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (Objects.nonNull(connection)) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

 ```

查询数据并封装结果集

``` java
public static void main(String[] args) {
    List<User> userList = new ArrayList<>();
    // 声明连接对象和会话对象
    Connection connection = null;
    Statement statement = null;
    ResultSet resultSet = null;
    try {
        String url = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8";
        String username = "root";
        String password = "root";
        // 赋值操作
        connection = DriverManager.getConnection(url, username, password);
        statement = connection.createStatement();
        // 执行查询
        String sql = "SELECT * FROM `user`";
        // 使用executeQuery方法执行查询，返回的是结果集
        resultSet = statement.executeQuery(sql);
        // 遍历返回的结果集，打印下数据
        // 调用next方法如果返回了false说明已经没有数据了
        while (resultSet.next()) {
            // 第一列的数据，下标是1而不是0
            // resultSet.getXxx() 方法可以获取当前游标行的数据
            int userId = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String pwd = resultSet.getString(3);
            String address = resultSet.getString(4);
            String phone = resultSet.getString(5);
            // 带格式打印 %d 表示一个数值占位值 %s 表示一个字串占位符
            // System.out.println("userId="+userId+",name="+name+",pwd="+pwd+",address="+address+",phone="+phone);
            // System.out.printf("userId=%s,name=%s,pwd=%s,address=%s,phone=%s\n", userId, name, pwd, address, phone);
            userList.add(new User(userId, name, pwd, address, phone));
        }

        // :: 方法引用，就是告诉forEach方法，我要使用哪个方法处理每个对象
        userList.forEach(System.out::println);

    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 在finally块中，关闭资源,先打开的后关闭
        try {
            if (Objects.nonNull(resultSet)) {
                resultSet.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            // 判断对象不是null 就关闭资源
            if (Objects.nonNull(statement)) {
                statement.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (Objects.nonNull(connection)) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

 遍历方法

```java
int getInt(int columnIndex) throws SQLException //获得当前行第N列的int值
int getInt(String columnLabel) throws SQLException //获得当前行columnLabel列的int值

double getDouble(int columnIndex) throws SQLException //获得当前行第N列的double值
double getDouble(String columnLabel) throws SQLException //获得当前行columnLabel列的double值

String getString(int columnIndex) throws SQLException //获得当前行第N列的String值
String getString(String columnLabel) throws SQLException //获得当前行columnLabel列的String值

```

- [注意：列的编号从 1 开始。]()

### 2.5 PreparedStatement【`重点`】

------

> PreparedStatement 继承了 Statement 接口，执行 SQL 语句的方法无异。

PreparedStatement的应用

> 作用：
>
> - 预编译SQL 语句，效率高。
> - 安全，避免SQL注入 。
>
> - 可以动态的填充数据，执行多个同构的 SQL 语句。

| 使用PreparedStatement的核心代码                              |
| ------------------------------------------------------------ |
| ![image-20220727145136434](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207271451639.png) |

8.1.1 参数标记

```java
//1.预编译 SQL 语句
PreparedStatement statement = connection.prepareStatement("select * from `user` where username=? and password=?");
```

- [注意：JDBC中的所有参数都由 ？符号占位，这被称为参数标记。在执行SQL语句之前，必须为每个参数提供值。]()

8.1.2 动态参数绑定

> [pstmt.setXxx(下标,值)]() 参数下标从 1 开始，为指定参数下标绑定值

```java
//1.预编译 SQL 语句
PreparedStatement statement = connection.prepareStatement("select * from `user` where username=? and password=?");
// 给statement下标传递参数
statement.setString(1, "李萌");
statement.setString(2, "123");
```

## 3 封装工具类

> - 在实际JDBC的使用中，存在着大量的重复代码:例如连接数据库、关闭数据库等这些操作！
> - 我们需要把传统的JDBC代码进行重构，抽取出通用的JDBC工具类！以后连接任何数据库、释放资源都可以使用这个工具类。

|                        工具类核心思想                        |
| :----------------------------------------------------------: |
| ![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/20220321224600.png) |

重用性方案

> - 封装获取连接、释放资源两个方法。
>   - 提供public static Connection getConnection(){}方法。
>   - 提供public static void closeAll(ResultSet resultSet, Statement statement, Connection connection)方法。

重用工具类实现

```java
package com.qf.utils;

import java.sql.*;
import java.util.Objects;

/**
 * @author zed
 * @date 2022/7/27
 * 数据库连接的工具类
 */
public class DBUtils {

    private static final String URL = "jdbc:mysql://localhost:3306/companydb?useSSL=false&serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "root";

    // 获取连接的方法
    public static Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    // 关闭连接的方法
    public static void closeAll(ResultSet resultSet, Statement statement, Connection connection) {
        try {
            if (Objects.nonNull(resultSet)) {
                resultSet.close();
            }
            if (Objects.nonNull(statement)) {
                statement.close();
            }
            if (Objects.nonNull(connection)) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
```

## 4 综合案例【登录】

### 4.1 创建表

> - 创建一张用户表 User
>   - id ，主键、自动增长。
>   - 用户名，字符串类型，唯一、非空
>   - 密码，字符串类型，非空
>   - 手机号码，字符串类型
> - 插入 2 条测试语句

### 4.2 实现登录

> - 通过控制台用户输入用户名和密码。
> - 用户输入的用户名和密码作为条件，编写查询 SQL 语句。
> - 如果该用户存在，提示登录成功，反之提示失败。

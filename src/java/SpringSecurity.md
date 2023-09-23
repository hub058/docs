---
title: SpringSecurity
---

::: tip SpringSecurity是什么

Spring Security是一个功能强大且高度可定制的身份验证和访问控制框架。Spring Security致力于为Java应用程序提供身份验证和授权的能力。像所有Spring项目一样，Spring Security的真正强大之处在于它可以轻松扩展以满足定制需求的能力。

:::

## 一、Spring Security简介

![角色和权限时许](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180744804.jpg)

> Spring Security两大重要核心功能：**用户认证（Authentication）**和**用户授权（Authorization）**。
>
> - 用户认证：验证某个用户是否为系统中的合法主体，也就是说用户能否访问该系统。用户认证一般要求用户提供用户名和密码。系统通过校验用户名和密码来完成认证过程。
> - 用户授权：验证某个用户是否有权限执行某个操作。在一个系统中，不同用户所有的权限是不同的。比如对一个文件来说，有的用户只能进行读取，有的用户既能读取，又能修改。一般来说，系统会为不同的用户分配不同的角色，而每个角色则对应一系列的权限。

## 二、快速开始

> 使用Springboot工程搭建Spring Security项目。

### 1.引入依赖

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.qf</groupId>
    <artifactId>security-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>security-demo</name>
    <description>security-demo</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
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
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
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

> 在pom中新增了Spring Security的依赖

``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### 2.创建接口

> 用于访问接口时触发Spring Security登陆页面

``` java
@RestController
public class SecurityController {

    @RequestMapping("/add")
    public String add(){
        return "hello security!";
    }

}
```

### 3.访问接口

> 访问add接口，会自动跳转至Security的登陆页面

![image-20210305105043157](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180744005.png)

> 默认账号是: user
>
> 默认密码是：启动项目的控制台中输出的密码

![快速开始](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180744701.png)

## 三、原理剖析

> 在上一节中访问add接口，发现被Spring Security的登陆页面拦截，可以猜到这是触发了Security框架的过滤器。Spring Security本质上就是一个过滤器链。下面讲介绍Security框架的过滤器链。

### 1.过滤器链

> - UsernamePasswordAuthenticationFilter:  用于对/login的POST请求做拦截，校验表单中的用户名和密码。
> - ExceptionTranslationFilter: 异常过滤器，用来处理在认证授权过程中抛出异常。
> - FilterSecurityInterceptor：是一个方法级的权限过滤器，位于过滤器链的最底部。

### 2.过滤器加载过程

> Springboot在整合Spring Security项目时会自动配置**DelegatingFilterProxy**过滤器，若非Springboot工程，则需要手动配置该过滤器。

​

![springsecurity过滤器链](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180744438.jpg)

![image-20210504180253654](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180745841.png)

> 过滤器如何进行加载的？   可以通过断点  查看  bean   这个bean 是  FilterChainProxy
>
> 结合上图和源码，Security在**DelegatingFilterProxy**的doFilter()调用了initDelegat()方法，在该方法中调用了WebApplicationContext的getBean()方法，该方法触发FilterChainProxy的doFilterInternal方法，用于获取过滤链中的所有过滤器并进行加载。

![image-20210504180355381](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180745792.png)

### 3.Security的两个关键接口

> 在快速开始中发现Spring Security使用了默认的用户名和密码，实际用户名和密码需要自定义，因此会用到以下两个接口。下述两个接口的具体实现将在之后的例子中体现。

- UserDetailsService接口

> 若需要从数据库中获取用户名和密码，则需要把查询数据库的过程写在这个接口里。

- PasswordEncoder接口

> 在密码的处理上，需要进行编解码器，该接口实现对密码进行加密。

## 四、配置用户名和密码

> 可以使用多种方式配置登录的用户名和密码

### 1.通过配置文件设置

``` yaml
## 方式一：设置登陆的用户名和密码
spring:
  security:
    user:
      name: qfadmin
      password: 123456
```

### 2.通过创建配置类实现设置

``` java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 用于密码的密文处理
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        // 生成密文
        String password = passwordEncoder.encode("123456");
        // 设置用户名和密码，这种方式密码是保存在内存中的
   auth.inMemoryAuthentication().withUser("admin").password(password).roles("admin");
    }
  
    // 告诉SpringSecurity密码的加密方式
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
```

### 3.编写自定义实现类（常用）

**第一步：编写UserDetailsService实现类，可以从数据库中获取用户名和密码**

``` java
@Service
public class MyUserDetailsService implements UserDetailsService {
    
    //接收传过来的用户名，根据传过来的用户名查询数据库的密码，返回数据库中的用户名、密码、权限信息
    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        //设置角色，角色的概念在之后章节介绍
        List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("role");
        //可以从数据库获取用户名和密码,这里返回的是数据库中的数据,返回意味着认证成功 
        return new User("qfAdmin",new BCryptPasswordEncoder().encode("123456"),auths);
    }
}
```

或者编写Mapper层，根据用户名查询用户的接口，从数据库中查询用户信息，在后面的案例中详细演示

```  java
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
  // 根据username从数据库中查询用户信息，要求数据库中的密码使用同样的加密方式加密的
        com.qf.securitydemo.domain.User user = userMapper.selectByUserName(username);
        if(Objects.isNull(user)){
            throw new BadCredentialsException("用户名或密码错误");
        }
        List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("role");
        return new User(user.getUserName(),user.getPassWord(),auths);
    }
}
```

**第二步：编写配置类**

``` java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 使用UserDetailsService实现类查询用户名密码
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    // 密码的加密方式
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
```

::: details 查看代码

[查看代码](http://heyige.cn/22081/security-demo)

:::

## 五、基于角色和权限的访问控制

> Spring Security提供了四个方法用于角色和权限的访问控制。通过这些方法，对用户是否具有某个或某些**权限**，进行过滤访问。对用户是否具备某个或某些**角色**，进行过滤访问。

> 为了测试顺利，这里临时关闭csrf防护。所谓csrf防护，全称为跨站请求伪造（Cross-site request forgery），是一种网络攻击方式，CSRF攻击利用网站对于用户网页浏览器的信任，挟持用户当前已登陆的Web应用程序，去执行并非用户本意的操作。简而言之，用户通过盗取目标网站保存的cookie中的用户信息，实现非法使用。

### 1.hasAuthority方法

> 判断当前主体是否有指定的权限，有返回true，否则返回false
>
> 该方法适用于只拥有一个权限的用户。

**1）在配置类中设置当前主体具有怎样的权限才能访问。**

``` java
@Override
protected void configure(HttpSecurity http) throws Exception {
    
    //注销的配置
    http.logout().logoutUrl("/logout") //注销时访问的路径
        .logoutSuccessUrl("/logoutSuccess").permitAll(); //注销成功后访问的路径
    
    //配置没有权限的跳转页面
    http.exceptionHandling().accessDeniedPage("/error.html");
    
    http.formLogin()
        .loginPage("/login.html") //设置自定义登陆页面
        .loginProcessingUrl("/usr/login") //登陆时访问的路径
        .defaultSuccessUrl("/index").permitAll() //登陆成功后跳转的路径
        .and().authorizeRequests()
        .antMatchers("/","/add","/user/login").permitAll() //设置可以直接访问的路径，取消拦截
        //1.hasAuthority方法：当前登陆用户，只有具有admin权限才可以访问这个路径
        .antMatchers("/index").hasAuthority("admin")
        .anyRequest().authenticated()
        .and().csrf().disable(); //关闭csrf防护
}
```

> .antMatchers("/index").hasAuthority("admin")

### 2.hasAnyAuthority方法

> 适用于一个主体有多个权限的情况，多个权限用逗号隔开。

``` java
 @Override
protected void configure(HttpSecurity http) throws Exception {
    http.formLogin()
        .loginPage("/login.html")
        .loginProcessingUrl("/usr/login")
        .and().authorizeRequests()
        //2.hasAnyAuthority方法：当前登陆用户，具有admin或manager权限可以访问这个路径
        .antMatchers("/index").hasAnyAuthority("admin,manager")
        .anyRequest().authenticated()
        .and().csrf().disable(); //关闭csrf防护
}
```

> .antMatchers("/index").hasAnyAuthority("admin,manager")

### 3.hasRole方法

> 如果用户具备给定角色就允许访问，否则报403错误。

**1）修改配置类**

``` java
@Override
protected void configure(HttpSecurity http) throws Exception {

    http.formLogin()
        .loginPage("/login.html") //设置自定义登陆页面
        .loginProcessingUrl("/usr/login") //登陆时访问的路径
        .defaultSuccessUrl("/success.html").permitAll() //登陆成功后跳转的路径
        .and().authorizeRequests()
        .antMatchers("/","/add","/user/login").permitAll() //设置可以直接访问的路径，取消拦截
        //3.hasRole方法：当前主体具有指定角色，则允许访问
        .antMatchers("/index").hasRole("student")
        .anyRequest().authenticated()
        .and().csrf().disable(); //关闭csrf防护
}
```

> .antMatchers("/index").hasRole("student")

**2）修改user对象**

``` java
//权限设置
@Override
public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    //因目前还没引入角色的概念，先用工具类快速生成角色
    //hasRole:  由于源码会把role加上"ROLE_"，因此在这里设计角色时需加上前缀
    List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("admin,ROLE_student");
    //可以从数据库获取用户名和密码
    return new User("qfAdmin",new BCryptPasswordEncoder().encode("123456"),auths);
}
```

> 其中角色student需要在设置时加上“ROLE_”前缀，因为通过源码hasRole方法给自定义的角色名前加上了“ROLE_”前缀

``` java
private static String hasRole(String role) {
    Assert.notNull(role, "role cannot be null");
    Assert.isTrue(!role.startsWith("ROLE_"), () -> {
        return "role should not start with 'ROLE_' since it is automatically inserted. Got '" + role + "'";
    });
    return "hasRole('ROLE_" + role + "')";
}
```

### 4.hasAnyRole方法

> 设置多个角色，多个角色之间使用逗号隔开，只要用户具有某一个角色，就能访问。

``` java
@Override
protected void configure(HttpSecurity http) throws Exception {
    //注销的配置
    http.logout().logoutUrl("/logout") //注销时访问的路径
        .logoutSuccessUrl("/logoutSuccess").permitAll(); //注销成功后访问的路径

    //配置没有权限的跳转页面
    http.exceptionHandling().accessDeniedPage("/error.html");
    http.formLogin()
        .loginPage("/login.html") //设置自定义登陆页面
        .loginProcessingUrl("/usr/login") //登陆时访问的路径
        //.defaultSuccessUrl("/index").permitAll() //登陆成功后跳转的路径
        .defaultSuccessUrl("/success.html").permitAll() //登陆成功后跳转的路径
        .and().authorizeRequests()
        .antMatchers("/","/add","/user/login").permitAll() //设置可以直接访问的路径，取消拦截
        //4.hasAnyRole方法：当前主体只要具备其中某一个角色就能访问
        .antMatchers("/index").hasAnyRole("student1,teacher")
        .anyRequest().authenticated()
        .and().csrf().disable(); //关闭csrf防护
}
```

## 六、SpringSecurity的常用注解

### 1、@Secured注解

> @Secured注解用于校验用户**具有某个角色**，才可以访问方法

**1）启动类上开启注解**

``` java
@EnableGlobalMethodSecurity(securedEnabled = true)
```

**2）在方法上配置注解**

``` java
/**
 * 测试@Secured注解
 * @return
*/
@RequestMapping("/add")
@Secured({"ROLE_student"})
public String add(){
    return "hello student!";
}

// 主体没有ROLE_teacher角色不能访问这个方法
@RequestMapping("/add2")
@Secured({"ROLE_teacher"})
public String add2(){
    return "hello teacher!";
}
```

**3）用户对象中设置角色**

``` java
@Override
public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("admin,ROLE_student");
    //可以从数据库获取用户名和密码
    return new User("qfAdmin",new BCryptPasswordEncoder().encode("123456"),auths);
}
```

### 2、@PreAuthorize

> 进入方法前的**权限验证**

**1）在启动类上开启注解**

``` java
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
```

**2）在方法上使用注解**

``` java
// 注意：方法参数是之前介绍的四个方法。
@RequestMapping("/items")
@PreAuthorize("hasAnyRole('admin','ROLE_student')")
public String items(){
    return "show items";
}
```

### 3、@PostAuthorize

> 在方法访问之后进行校验，实际使用并不多

**1）启动类上开启注解**

``` java
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
```

**2）方法上使用注解**

``` java
@RequestMapping("/postItems")
@PostAuthorize("hasAnyAuthority('teacher')")
public String postItems(){
    //先执行方法内容，再做权限校验
    System.out.println("show detail here...");
    return "show post items";
}
```

### 4、@PostFilter

> 权限验证之后对数据进行过滤，只能获取满足条件的数据

**实体类**

```  java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String userName;
}
```

**在方法上使用注解**

``` java
@RequestMapping("/postFilterItems")
@PreAuthorize("hasAnyAuthority('admin')")
@PostFilter("filterObject.userName == 'xiaoming'")
public List<User> getUsers(){
    ArrayList<User> list = new ArrayList<User>();
    list.add(new User(1L,"xiaowang"));
    list.add(new User(2L,"xiaoming"));
    return list;
}
```

- 访问接口，发现list集合中获取了满足条件的xiaoming对象

### 5、@PreFilter

> 对传入方法的数据进行过滤

**在方法上使用注解**

``` java
@RequestMapping("/preFilterItems")
@PreAuthorize("hasAnyAuthority('admin')")
@PreFilter(value = "filterObject.userName == 'xiaoming'")
public List<User> getUsersByPreFilter(@RequestBody List<User> list) {
    //只有userName是'xiaoming'的数据才会被传入
    list.forEach(t -> {
        System.out.println(t.getUserName());
    });
    return list;
}
```

- 访问方法，发现只有userName是'xiaoming'的数据才会被传入

使用HttpClient或者PostMan发送请求

```  sh
GET http://localhost:8080/preFilterItems
Content-Type: application/json

[
  {
    "id": 1,
    "userName": "xiaoming"
  },
  {
    "id": 2,
    "userName": "xiaohong"
  },
  {
    "id": 3,
    "userName": "xiaogang"
  }
]
```

## 七、用户注销

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180746761.jpg)

### 1.在配置类添加注销的配置

``` java
@Override
protected void configure(HttpSecurity http) throws Exception {
    //注销的配置
    http.logout().logoutUrl("/logout") //注销时访问的路径
        .logoutSuccessUrl("/logoutSuccess").permitAll(); //注销成功后访问的路径

    //配置没有权限的跳转页面
    http.exceptionHandling().accessDeniedPage("/error.html");
    
    http.formLogin()
        .loginPage("/login.html") //设置自定义登陆页面
        .loginProcessingUrl("/usr/login") //登陆时访问的路径
        //.defaultSuccessUrl("/index").permitAll() //登陆成功后跳转的路径
        .defaultSuccessUrl("/success.html").permitAll() //登陆成功后跳转的路径
        .and().authorizeRequests()
        .antMatchers("/","/add","/user/login").permitAll() //设置可以直接访问的路径，取消拦截
        //1.hasAuthority方法：当前登陆用户，只有具有admin权限才可以访问这个路径
        //.antMatchers("/index").hasAuthority("admin")
        //2.hasAnyAuthority方法：当前登陆用户，具有admin或manager权限可以访问这个路径
        //.antMatchers("/index").hasAnyAuthority("admin,manager")
        //3.hasRole方法：当前主体具有指定角色，则允许访问
        //.antMatchers("/index").hasRole("student")
        //4.hasAnyRole方法：当前主体只要具备其中某一个角色就能访问
        .antMatchers("/index").hasAnyRole("student1,teacher")
        .anyRequest().authenticated()
        .and().csrf().disable(); //关闭csrf防护
}
```

### 2.设置注销链接

添加success.html页面作为登陆成功后的跳转页面

``` html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    登陆成功 <a href="/logout">退出</a>
</body>
</html>
```

登陆后访问退出按钮，实现注销功能。

## 八、案例演示

### 8.1 和shiro做比较

> spring security 特点

- 与spring无缝整合

- 全面的权限控制

- 专门为Web开发设计
  - 旧版本不能脱离web环境使用
  - 新版本对整个框架进行了分层抽取，分成了核心模块和web模块，单独引入核心模块就可以脱离web环境

- 重量级

>shiro的特点

- apache旗下轻量级权限控制框架
- 轻量级 shiro主张的理念把复杂的事情变简单，针对性能有更高要求的互联网应用有更好的表现
- 通用性
  - 好处  不局限于web环境，可以脱离web使用
  - 缺陷  在web环境下的 一些特定的需求需要手动编写代码定制

> spring security 是spring家族的一个安全框架 在springboot出现之前 spring security 就已经发展多年了，但是使用的并不多，安全管理这个领域 一直是shiro 的天下。相对于shiro ，在ssm整合spring security都是比较麻烦的操作，所以  spring security 虽然功能比shiro 强大，但是反而没有shiro 使用的多（shiro虽然没有security强大，但是对于大部分项目而言也已经够用了） 但是有了spring boot之后 spring boot对security 提供了自动化配置方案 可以使用较少的配置来使用 spring security

>因此 一般来说 常见的安全管理技术栈的组合是这样的     注意 是一般来讲 ，实际上无论怎么组合 都是可以的

- ssm + shiro
- spring boot /cloud + security

### 8.2  SpringSecurity Web 权限方案

| 实现数据库认证来完成用户登录                                 |
| ------------------------------------------------------------ |
| ![image-20211124144138221](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206191831940.png) |

**准备sql**

```  sql
create table users(
    id bigint primary key auto_increment,
    username varchar(20) unique not null,
    password varchar(100)
);
-- 密码 123456
insert into users values(1,'zs','$2a$10$mXydam1p7dcGGWWTfdUH..feST5wWPlMnXMV1t/7nZjTCWsSJrF1y');
-- 密码 1234567
insert into users values(2,'ls','$2a$10$fJTxLZ9G6I/J0WCTC7B0tuTbsqxQKJPDpdYORXXGSgMDpcN334mfG');


create table role(
    id bigint primary key auto_increment,
    name varchar(20)
);

insert into role values(1,'管理员');
insert into role values(2,'普通用户');


create table role_user(
    uid bigint,
    rid bigint
);
insert into role_user values(1,1);
insert into role_user values(2,2);

create table menu(
    id bigint primary key auto_increment,
    name varchar(20),
    url varchar(100),
    parentid bigint,
    permission varchar(20)
);


insert into menu values(1,'系统管理','',0,'menu:system');
insert into menu values(2,'用户管理','',0,'menu:user');

create table role_menu(
    mid bigint,
    rid bigint
);

insert into role_menu values(1,1);
insert into role_menu values(2,1);
insert into role_menu values(2,2);
```

**添加依赖**

```  xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-test</artifactId>
    <scope>test</scope>
</dependency>
  
<dependency>
     <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>

```

**实体类**

```  java
@Data
public class Users {

    private Integer id;
    private String username;
    private String password;

}
```

**mybatis配置**

```  java
package com.example.securitydemo.mapper;

import com.example.securitydemo.domain.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper     // 这个注解的作用是注入的时候 不报红色警告
public interface UsersMapper{
    @Select("SELECT * FROM users WHERE username=#{username}")
    Users selectByUserName(String username);
}
```

**启动类扫描mapper**

```  java
@MapperScan(basePackages = {"com.example.securitydemo.mapper"})
```

**配置文件**

```  yml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://127.0.0.1:3306/cloud_demo?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver

logging:
  level:
    com.qf: debug
```

**UserDetailsService 接口 注入自定义逻辑**

```  java
package com.glls.springsecuritydemo2.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.glls.springsecuritydemo2.mapper.UsersMapper;
import com.glls.springsecuritydemo2.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UsersMapper usersMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersMapper.selectByUserName(username);
        if(users == null) {
            throw new UsernameNotFoundException("用户名不存在！");
        }
        System.out.println(users);
        List<GrantedAuthority> auths =
                AuthorityUtils.commaSeparatedStringToAuthorityList("role");
        return new User(users.getUsername(),users.getPassword(),auths);

    }
}
```

测试登录

未认证请求跳转到登录页   自定义登录页

引入前端模板依赖

```  xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

配置 关闭缓存

```  yml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://127.0.0.1:3306/cloud_demo?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver
  thymeleaf:
    cache: false #关闭页面缓存

logging:
  level:
    com.qf: debug
```

引入登录页面  templates/login.html

```  html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8">
  <title>用户登录</title>
</head>
<body>
<h1>用户登录</h1>
<form action="/login"  method="post">
  <input type="text" name="username" /> <br>
  <input type="password" name="password" /> <br>
  <input type="submit" value="提交"/>
</form>
</body>
</html>
```

登录后的主页面 templates/main.html

```  html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>欢迎页面</title>
</head>
<body>
<h1>主页面</h1>
</body>
</html>
```

编写controller 

```  java
// 注意这里是Controller,需要返回视图名称，找到html页面
@Controller
public class IndexController {

    @GetMapping("/index")
    public String index(){
        return "login";
    }
    
    @GetMapping("/main")
    public String success(){
        return "main";
    }

}
```

```  java
@RestController
@RequestMapping("/user")
public class UsersController {

    @GetMapping("/findAll")
    public String findAll(){
        return "findAll";
    }

    @GetMapping("/anno")
    public String anno(){
        return "不需要认证可以访问";
    }
}
```

编写配置类放行登录页面以及静态资源

```  java
package com.example.securitydemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    // 告诉SpringSecurity密码的加密方式
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.formLogin()  // 自定义登录页面
            //.loginPage("/login.html")  // 指定登录页面路径  如果直接是页面  必须在static中
            .loginPage("/index")  // 指定登录页面路径  通过controller 跳转  则在templates 中
            .loginProcessingUrl("/login")

            .defaultSuccessUrl("/main").permitAll() // 登陆成功之后跳转路径

            .and().authorizeRequests().antMatchers("/layui/**", "/user/anno") //配置无需认证的请求路径
            .permitAll() // 指定 URL 无需保护。
            .anyRequest() // 其他请求
            .authenticated() //需要认证
            .and().csrf().disable(); //关闭csrf防护  这个一定要加上
    }

}
```

> 测试    无需认证的访问路径

![image-20210505140918235](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180750387.png)

> 测试 需要认证的访问路径  直接跳转到登录页面

![image-20210505141153890](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180750081.png)

> 登录 成功 跳转到  之前的访问路径

![image-20210505141321580](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180750682.png)

自定义表单参数

```  html
<form action="/login"method="post">
    用户名:<input type="text"name="myname"/><br/>
    密码：<input type="password"name="mypassword"/><br/>
    <input type="submit"value="提交"/>
</form>
```

```  java
// 配置类也需要改
@Override
protected void configure(HttpSecurity http) throws Exception {

    http.formLogin()  // 自定义登录页面
        .loginPage("/login.html")  // 指定登录页面路径  如果直接是页面  必须在static中
        //.loginPage("/index")  // 指定登录页面路径  通过controller 跳转  则在templates 中
        .loginProcessingUrl("/login")
        .defaultSuccessUrl("/main").permitAll() // 登陆成功之后 默认 跳转路径
        .usernameParameter("myusername")
        .passwordParameter("mypassword")
        .and()
        .authorizeRequests()
        .antMatchers("/layui/**","/user/anno") //表示配置请求路径
        .permitAll() // 指定 URL 无需保护。
        .anyRequest() // 其他请求
        .authenticated() //需要认证
        .and().csrf().disable(); //关闭csrf防护  这个一定要加上
}
```

### 8.3 基于角色或权限进行访问控制

> 参考第五章节，基于角色和权限的访问控制

#### 8.3.1 hasAuthority 方法

如果当前的主体具有指定的权限，则返回 true,否则返回 false

#### 8.3.2 hasAnyAuthority 方法

如果当前的主体有任何提供的角色（给定的作为一个逗号分隔的字符串列表）的话，返回 true.

#### 8.3.3  hasRole 方

如果用户具备给定角色就允许访问,否则出现 403。 如果当前主体具有指定的角色，则返回 true。

#### 8.3.4 hasAnyRole

表示用户具备任何一个角色都可以访问。

### 8.4  基于数据库实现权限认证

#### 8.4.1 实体类

```  java
@Data
@Alias("menu")
public class Menu {
    private Long id;
    private String name;
    private String url;
    private Long parentId;
    private String permission;
}
```

```  java
@Data
@Alias("role")
public class Role {
    private Long id;
    private String name;
}
```

#### 8.4.2 mybatis配置

>在UsersMapper接口定义查询 角色 和 权限的方法

```  java
package com.example.securitydemo.mapper;

import com.example.securitydemo.domain.Menu;
import com.example.securitydemo.domain.Role;
import com.example.securitydemo.domain.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper     // 这个注解的作用是注入的时候 不报红色警告
public interface UsersMapper{
    @Select("SELECT * FROM users WHERE username=#{username}")
    Users selectByUserName(String username);

    /**
     * 根据用户 Id 查询用户角色
     * @param userId
     * @return
     */
    List<Role> selectRoleByUserId(Integer userId);
    /**
     * 根据用户 Id 查询菜单
     * @param userId
     * @return
     */
    List<Menu> selectMenuByUserId(Integer userId);
}
```

> 映射文件 UserMapper.xml

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.securitydemo.mapper.UsersMapper">

    <!--根据用户 Id 查询角色信息-->
    <select id="selectRoleByUserId" resultType="role">
        SELECT r.id, r.name
        FROM role r
                 INNER JOIN role_user ru ON
            ru.rid = r.id
        where ru.uid = #{0}
    </select>
    <!--根据用户 Id 查询权限信息-->
    <select id="selectMenuByUserId" resultType="menu">
        SELECT m.id, m.name, m.url, m.parentid, m.permission
        FROM menu m
                 INNER JOIN role_menu rm ON m.id = rm.mid
                 INNER JOIN role r ON r.id = rm.rid
                 INNER JOIN role_user ru ON r.id = ru.rid
        WHERE ru.uid = #{0}
    </select>
</mapper>
```

> 配置文件扫描映射文件

```  yml
mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.securitydemo.domain
```

> 修改MyUserDetailsService  的 loadUserByUsername 方法

```  java
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Users users = usersMapper.selectByUserName(username);
    if (users == null) {
        throw new UsernameNotFoundException("用户名不存在！");
    }
    //查询 权限 和 角色  然后 封装到 User 中
    List<GrantedAuthority> auths = new ArrayList<>();
    //查询用户角色列表
    List<Role> roles = usersMapper.selectRoleByUserId(users.getId());
    //查询用户权限列表
    List<Menu> menus = usersMapper.selectMenuByUserId(users.getId());

    //处理角色  拼接   ROLE_xxx
    for (Role role : roles) {
        auths.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
    }
    //处理权限
    for (Menu menu : menus) {
        auths.add(new SimpleGrantedAuthority(menu.getPermission()));
    }

    // 注意  new User(String username, String password, Collection<? extends GrantedAuthority> authorities)
    // 这第二个参数 是加密之后的 密码
    return new User(users.getUsername(), users.getPassword(), auths);
}
```

>修改 访问配置类 进行测试   使用  管理员 和  非管理员测试

```  java
@Override
protected void configure(HttpSecurity http) throws Exception {

    http.formLogin()  // 自定义登录页面
        .loginPage("/login.html")  // 指定登录页面路径  如果直接是页面  必须在static中
        //.loginPage("/index")  // 指定登录页面路径  通过controller 跳转  则在templates 中
        .loginProcessingUrl("/login")
        //.successForwardUrl("/main")  // 登录页面表单的请求路径
        .defaultSuccessUrl("/main").permitAll() // 登陆成功之后 默认 跳转路径
        //.failureForwardUrl("/fail")    // 登录失败跳转到哪个url
        .usernameParameter("myusername")
        .passwordParameter("mypassword")
        .and()
        .authorizeRequests()
        .antMatchers("/layui/**","/user/anno") //表示配置请求路径
        .permitAll() // 指定 URL 无需保护。
        //1.hasAuthority方法：当前登陆用户，只有具有admin权限才可以访问这个路径
        //.antMatchers("/user/findAll").hasAuthority("menu:system")
        //2.hasAnyAuthority方法：当前登陆用户，具有admin或manager权限可以访问这个路径
        .antMatchers("/user/findAll").hasAnyAuthority("menu:user")
        //3.hasRole方法：当前主体具有指定角色，则允许访问
        //.antMatchers("/user/findAll").hasRole("管理员")
        //4.hasAnyRole方法：当前主体只要具备其中某一个角色就能访问
        //.antMatchers("/user/findAll").hasAnyRole("管理员","普通用户")
        .anyRequest() // 其他请求
        .authenticated() //需要认证
        .and().csrf().disable(); //关闭csrf防护  这个一定要加上
}
```

### 8.5 自定义 403 页面

>修改访问配置类

![image-20210505160301650](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180751294.png)

```  java
http.exceptionHandling().accessDeniedPage("/unauth");
```

>添加controller 方法

```  java
@GetMapping("/unauth")
public String accessDenyPage(){
    return "unauth";
}
```

> 页面内容

```  html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>无权访问</title>
</head>
<body>
<h1>对不起，您没有权限访问</h1>
</body>
</html>
```

![image-20210505160352843](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180751628.png)

![image-20210505160310902](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180751422.png)

### 8.6 注解使用

>@Secured
>
>**只能判断登录主体具有某种角色**

判断是否具有**角色**，另外需要注意的是这里匹配的字符串需要添加前缀“ROLE_“。 使用注解先要开启注解功能！ @EnableGlobalMethodSecurity(securedEnabled=true)

```  java
@SpringBootApplication
@MapperScan(basePackages = "com.qf.springsercurity.mapper")
// 开启全局的方法级别认证授权
@EnableGlobalMethodSecurity(securedEnabled = true,prePostEnabled = true)
public class SpringSercurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSercurityApplication.class, args);
    }

}
```

在控制器方法上添加注解

```  java
@GetMapping("/hasUser")
@Secured("ROLE_普通用户")
public String hasUser() {
    return "Security hasUser";
}
```

使用不同的角色测试

```  html
http://localhost:8080/user/hasUser
```

>@PreAuthorize

先开启注解功能： @EnableGlobalMethodSecurity(prePostEnabled = true)

@PreAuthorize：注解适合进入方法前的权限验证，

@PreAuthorize 可以将登录用户的 roles/permissions 参数传到方法中。

```  java
@EnableGlobalMethodSecurity(securedEnabled = true,prePostEnabled = true)
```

```  java
@GetMapping("/prePost")
// @PreAuthorize("hasRole('ROLE_管理员')")
// @PreAuthorize("hasAnyRole('ROLE_管理员','ROLE_普通用户')")
@PreAuthorize("hasAuthority('menu:user')")
public String prePostSecurity() {
    return "Security prePostSecurity";
}
```

>@PostAuthorize

先开启注解功能： @EnableGlobalMethodSecurity(prePostEnabled = true)

@PostAuthorize 注解使用并不多，在方法执行后再进行权限验证，适合验证带有返回值 的权限.

```  java
@RequestMapping("/testPostAuthorize")
@ResponseBody
@PostAuthorize("hasAnyAuthority('menu:system')")
public String postAuthorize(){
    System.out.println("test--PostAuthorize");
    return "PostAuthorize";
}
```

使用 不同的 用户进行测试

>@PostFilter

@PostFilter ：权限验证之后对数据进行过滤 留下用户名是 admin1 的数据 表达式中的 filterObject 引用的是方法返回值 List 中的某一个元素

```  java
@GetMapping("/prePost")
//    @PreAuthorize("hasRole('ROLE_管理员')")
//    @PreAuthorize("hasAnyRole('ROLE_管理员','ROLE_普通用户')")
@PreAuthorize("hasAuthority('menu:user')")
@PostFilter("filterObject.id %2 ==0")
public List<Users> prePostSecurity() {
    return new ArrayList<Users>() {{
        add(new Users(1, "admin1", "1234"));
        add(new Users(2, "admin2", "1234"));
        add(new Users(3, "admin3", "1234"));
        add(new Users(4, "admin4", "1234"));
    }};
}
```

>@PreFilter

@PreFilter: 进入控制器之前对数据进行过滤

需要先登录 拿到J   Cookie:JSESSIONID

![image-20210505172547186](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180753779.png)

使用postman

![image-20210505172609847](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180752609.png)

![image-20210505172630506](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180752975.png)

```  json
[
    {
        "id": "1",
        "username": "admin",
        "password": "666"
    },
    {
        "id": "2",
        "username": "admins",
        "password": "888"
    },
    {
        "id": "3",
        "username": "admins11",
        "password": "11888"
    },
    {
        "id": "4",
        "username": "admins22",
        "password": "22888"
    }
]
```

接收id 为 偶数的

```  java
@RequestMapping("/testPreFilter")
@PreAuthorize("hasRole('ROLE_管理员')")
@PreFilter(value = "filterObject.id%2==0")
public List<Users> getTestPreFilter(@RequestBody List<Users> list){
    list.forEach(t-> {
        System.out.println(t.getId()+"\t"+t.getUsername());
    });
    return list;
}
```

### 8.7 记住我

>检测数据源配置，没问题就**不需要修改**

```  yml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://127.0.0.1:3306/cloud_demo?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false
    driver-class-name: com.mysql.cj.jdbc.Driver
```

>编写配置类

```  java
@Configuration
public class BrowserSecurityConfig {

    @Autowired
    private DataSource dataSource;
    @Bean
    public PersistentTokenRepository persistentTokenRepository(){
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
  // 赋值数据源
        jdbcTokenRepository.setDataSource(dataSource);
  // 自动创建表,第一次执行会创建，以后要执行就要删除掉！
       // jdbcTokenRepository.setCreateTableOnStartup(true);
        return jdbcTokenRepository;
    }

}
```

> 修改安全配置类

```  java
package com.glls.springsecuritydemo3.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;


@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PersistentTokenRepository tokenRepository;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.formLogin()  // 自定义登录页面
                .loginPage("/login.html")  // 指定登录页面路径  如果直接是页面  必须在static中
                //.loginPage("/index")  // 指定登录页面路径  通过controller 跳转  则在templates 中
                .loginProcessingUrl("/login")
                //.successForwardUrl("/main")  // 登录页面表单的请求路径
                .defaultSuccessUrl("/main").permitAll() // 登陆成功之后 默认 跳转路径
                //.failureForwardUrl("/fail")    // 登录失败跳转到哪个url

                .usernameParameter("myusername")
                .passwordParameter("mypassword")
                .and()
                .authorizeRequests()
                .antMatchers("/layui/**","/user/anno") //表示配置请求路径
                .permitAll() // 指定 URL 无需保护。
                //1.hasAuthority方法：当前登陆用户，只有具有admin权限才可以访问这个路径
                //.antMatchers("/user/findAll").hasAuthority("menu:system")
                //2.hasAnyAuthority方法：当前登陆用户，具有admin或manager权限可以访问这个路径
                //.antMatchers("/user/findAll").hasAnyAuthority("menu:user")
                //3.hasRole方法：当前主体具有指定角色，则允许访问
                .antMatchers("/user/findAll").hasRole("管理员")
                //4.hasAnyRole方法：当前主体只要具备其中某一个角色就能访问
                //.antMatchers("/user/findAll").hasAnyRole("管理员,普通用户")
                .anyRequest() // 其他请求
                .authenticated() //需要认证
                .and().csrf().disable(); //关闭csrf防护  这个一定要加上

        http.exceptionHandling().accessDeniedPage("/unauth");

        // ======开启记住我功能========
        http.rememberMe()
                .tokenRepository(tokenRepository)
                .userDetailsService(userDetailsService);

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
```

> 页面添加记住我复选框

```  html
<form action="/login"  method="post">
    <input type="text" name="myusername" /> <br>
    <input type="password" name="mypassword" /> <br>
    记住我：<input type="checkbox"name="remember-me"title="记住密码"/><br/>
    <input type="submit" value="提交"/>
</form>
```

此处：name 属性值必须为 `remember-me` 不能改为其他值

使用张三进行登录测试 登录成功之后，关闭浏览器再次访问 <http://localhost:8080/user/findAll，发现依然可以使用>！

设置有效期：默认 2 周时间。但是可以通过设置状态有效时间，即使项目重新启动下次也可以正常登录。 在配置文件中设置

```  java
http.rememberMe()
    .tokenValiditySeconds(60)   // 单位是秒
    .tokenRepository(tokenRepository)
    .userDetailsService(userDetailsService);
```

### 8.8 注销

>配置类中添加退出映射地址

```  java
http.logout().logoutUrl("/logout") //注销时访问的路径
 .logoutSuccessUrl("/login.html").permitAll(); //注销成功后访问的路径
```

### 8.9 Spring2.7.3版本

>Spring2.7.3新版本的SecurityConfig配置方式,新版本需要使用SecurityFilterChain

``` java

package com.qf.springsercurity.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zed
 * @date 2022/8/31
 * 权限认证的配置类
 */
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    private final PersistentTokenRepository tokenRepository;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.formLogin().loginPage("/") // 通过这个请求地址去找登录页面
                .loginProcessingUrl("/login") //登录处理路径
                .usernameParameter("uname")
                .passwordParameter("pwd")
                .permitAll()

                .and().authorizeRequests()
                .antMatchers("/static/**", "/user/anno").permitAll() //不需要认证直接放行的请求

                //.antMatchers("/user/findAll").hasAuthority("menu:system") // 具有menu:system权限的人可以访问/user/findAll地址
                .antMatchers("/user/findAll").hasAnyRole("管理员") // 具有menu:system权限的人可以访问/user/findAll地址

                .anyRequest().authenticated() // 其他请求都需要认证

                .and().exceptionHandling().accessDeniedPage("/unAuth") // 自定义403页面

                .and().rememberMe().tokenRepository(tokenRepository).userDetailsService(userDetailsService) // 记住我功能

                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/").permitAll()

                .and().csrf().disable();  //关闭csrf

        http.userDetailsService(userDetailsService);

        return http.build();
    }
}


```

## 九、Oauth2认证

### 9.1授权服务器

![image-20210624195626170](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180753868.png)

- Authorize Endpoint : 授权端点 进行授权
- Token Endpoint : 令牌端点 ，经过授权拿到对应的Token
- Introspection Endpoint : 校验端点 校验Token的合法性
- Revocation Endpoint : 撤销端点 撤销授权

### 9.2  Spring Security Oauth2架构

![image-20210624200517196](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180754910.png)

| 流程：                                                       |
| ------------------------------------------------------------ |
| 1、用户访问，此时没有Token,Oauth2RestTemplate 会报错，这个报错信息会被Oauth2ClientContextFilter 捕获并重定向到认证服务器 |
| 2、认证服务器通过Authorization Endpoint 进行授权，并通过AuthorizationServerTokenServices 生成授权码并返回给客户端 |
| 3、客户端拿到授权码去认证服务器通过Token Endpoint 调用 AuthorizationServerTokenServices 生成Token并返回给客户端 |
| 4、客户端拿到Token 去资源服务器访问资源，一般会通过Oauth2AuthenticationManager 调用ResourceServerTokenServices进行校验。校验通过可以获取资源。 |

### 9.3 环境搭建 创建工程

1.添加依赖

```  xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.10.RELEASE</version><!-- 注意这里的版本 -->
        <relativePath/> 
    </parent>
    <groupId>com.qf</groupId>
    <artifactId>oauth2</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>oauth2</name>
    <description>oauth2</description>
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

        <!--这里不使用springboot自带的 ,比较麻烦-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-security</artifactId>
            <version>2.2.5.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-oauth2</artifactId>
            <version>2.2.5.RELEASE</version>
        </dependency>
    </dependencies>

</project>
```

2.创建springsecurity的配置类

```  java
package com.qf.oauth2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                //放行的请求  oauth的请求
                .antMatchers("/oauth/**","/login/**","/logout/**")
                .permitAll()
                //剩下的请求要全部通过认证才能访问
                .anyRequest()
                .authenticated()
                .and()
                //表单的操作全局允许
                .formLogin()
                .permitAll()
                .and()
                //关闭  csrf
                .csrf().disable();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
```

3.自定义登录逻辑   这里可以理解成客户端

```  java
package com.qf.oauth2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //自定义了登录逻辑
        String password = passwordEncoder.encode("123456");

        return new User(username,password, AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
    }
}
```

4.配置授权服务器

```  java
package com.qf.oauth2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;

/**
 * 授权服务器
 */
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {

        clients.inMemory()
                //客户端id
                .withClient("client")
                //秘钥
                .secret(passwordEncoder.encode("123456"))
                //重定向地址
                .redirectUris("http://www.baidu.com")
                //授权范围
                .scopes("all")
                //授权类型   授权码模式
                .authorizedGrantTypes("authorization_code");

    }
}
```

5.配置资源服务器

```  java
package com.qf.oauth2.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * @ClassName : ResourceServerConfig
 * @Author : glls
 * @Date: 2021/6/28 19:35
 * @Description :   资源服务器
 *
 * 这里是为了方便  把授权服务器和资源服务器放在了一起   正式环境下  二者是在不同的服务器
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .requestMatchers()
                .antMatchers("/user/**");  // 配置需要保护的资源路径
    }
}

```

新建rest请求资源

``` java
package com.qf.oauth2.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zed
 * @date 2022/9/1
 */
@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping("/getCurrentUser")
    public Object getCurrentUser() {
        return SecurityContextHolder.getContext() // 获取security上下文环境
                .getAuthentication() // 获取认证信息
                .getPrincipal(); // 获取认证主体[登录用户]
    }

    @GetMapping("/hello")
    public Object hello() {
        return "Hello world Oauth2";
    }
}
```

6.测试

#### 获取授权码

| 请求地址                                                     |
| ------------------------------------------------------------ |
| <http://localhost:8080/oauth/authorize?response_type=code&client_id=client&redirect_uri=http://www.baidu.com&scope=all> |
| 响应的界面如下【授权】                                       |
| ![image-20220901155522733](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209011555934.png) |
| 下一步 获取到授权码                                          |
| ![image-20220901155607524](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209011556701.png) |

根据授权码获取令牌   需要发送post请求

> 在body的code参数中 设置为上一步获取到的【授权码】
>
> 设置用户名和密码

![image-20210628211632314](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209011710793.png)

> 设置参数

![image-20210628211642379](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180754645.png)

返回的结果如下

``` json
{
    "access_token": "98006025-5f40-4bf9-bbc2-70a5cd1ef4a2", # 返回的令牌
    "token_type": "bearer", #令牌的类型
    "expires_in": 43199, #令牌的过期时间
    "scope": "all" #作用域
}
```

携带令牌 访问资源

> token令牌就是上一步获取到的 access_token的值

![image-20210628211850307](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180754237.png)

#### 密码模式

1.在SecurityConfig 中

> 配置bean  AuthenticationManager

```  java
@Override
@Bean
public AuthenticationManager authenticationManager() throws Exception {
    return super.authenticationManager();
}
```

2.在 授权服务器  

> 重写方法 需要注入上一步配置的bean

```  java
@Autowired
private AuthenticationManager authenticationManager;

@Autowired
private UserService userService;

@Override
public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
    //配置密码模式 需要的配置
    endpoints.authenticationManager(authenticationManager).userDetailsService(userService);
}
```

3.开启密码模式

> 核心代码： .authorizedGrantTypes("authorization_code","password"); //授权类型   授权码模式   密码模式

```  java
@Override
public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
    //这里是为了演示方便 下面的参数 直接写死了
    clients.inMemory()
        //客户端id
        .withClient("client")
        //秘钥
        .secret(passwordEncoder.encode("123456"))
        //重定向地址
        .redirectUris("http://www.baidu.com")
        //授权范围
        .scopes("all")
        //授权类型   授权码模式   密码模式
        .authorizedGrantTypes("authorization_code","password");

}
```

验证

> 无需获取授权码，直接使用密码获取令牌token

![image-20220901160843782](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209011608972.png)

> grant_type: 授权类型使用 password
>
> 同时指定密码 ，就可以获取到token

| 正常使用token获取资源                                        |
| ------------------------------------------------------------ |
| ![image-20220901161030386](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209011610674.png) |

> 总结：
>
> 授权码模式
>
> 1、颁发 授权码
> 2、客户端 使用授权码 获取 令牌token
> 3、客户端 使用令牌token 访问 系统资源
>
> 使用密码模式
>
> 1、客户端 使用密码 获取 令牌token
> 2、客户端 使用令牌token 访问 系统资源

::: details OAuth2和JWT区别与联系

场景：

1. 你已经或者正在实现API。
2. 你正在考虑选择一个合适的方法保证API的安全性。

要比较JWT和OAuth2，首先要明白一点就是，这两个根本没有可比性，是两个完全不同的东西。

**JWT是一种认证协议**

JWT提供了一种用于发布接入令牌（Access Token),并对发布的签名接入令牌进行验证的方法。 令牌（Token）本身包含了一系列声明，应用程序可以根据这些声明限制用户对资源的访问。

**OAuth2是一种授权框架**

另一方面，OAuth2是一种授权框架，提供了一套详细的授权机制（指导）。用户或应用可以通过公开的或私有的设置，授权第三方应用访问特定资源。

**为什么要比较**

既然JWT和OAuth2没有可比性，为什么还要把这两个放在一起说呢？实际中确实会有很多人拿JWT和OAuth2作比较。很多情况下，在讨论OAuth2的实现时，`会把JSON Web Token作为一种认证机制使用`。这也是为什么他们会经常一起出现。

简单来说：`应用场景不一样`

1. OAuth2用在使用第三方账号登录的情况(比如使用weibo, qq, github登录某个app)
2. JWT是用在前后端分离, 需要简单的对后台API进行保护时使用.(前后端分离无session, 频繁传用户密码不安全)

OAuth2是一个相对复杂的协议, 有4种授权模式, 其中的`access code模式在实现时可以使用jwt才生成code`, 也可以不用. 它们之间没有必然的联系；oauth2有client和scope的概念，jwt没有。如果只是拿来用于颁布token的话，二者没区别。常用的bearer算法oauth、jwt都可以用，只是应用场景不同而已。

:::

## 十、拦截器和过滤器

### SpringBoot 使用 Filter 的正确姿势

Filter 是 JavaEE 中 Servlet 规范的一个组件，位于包javax.servlet 中，它可以在 HTTP 请求到达 Servlet 之前，被一个或多个Filter处理。

**它的工作流程如图：**

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180745880.jpeg)

Filter的这个特性在生产环境中有很广泛的应用，如：修改请求和响应、防止xss攻击、包装二进制流使其可以多次读，等等。

实际工作中，我们都是使用 SpringBoot 进行业务开发，本文总结三种 Filter 用法

#### 1. 编写Filter

要编写 Filter ，只需要实现javax.servlet.Filter接口就可以了

``` java
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("MyFilter");
        // 要继续处理请求，必须添加 filterChain.doFilter()
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
```

Filter 接口有三个方法：init(),doFilter(),destroy()。

其中doFilter()需要自己实现，其余两个是default的，可以不用实现。

注意：如果Filter要使请求继续被处理，就一定要调用filterChain.doFilter()！

#### 2. 配置Filter被 Spring 管理

让自定义的 Filter 被 Spring 的 IOC 容器管理，有三种实现方式，各有优缺点。

##### 1. 使用@Component+@Order

在刚刚定义的MyFilter类上加上@Component和@Order注解，即可被Spring管理

``` java
@Component
@Order(1)
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("MyFilter");
        // 要继续处理请求，必须添加 filterChain.doFilter()
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
```

没错就这么简单，这样 MyFilter 就生效了，写个Controller 调用一下就可以看到效果。

当有多个Filter时，这里的@Order(1)注解会指定执行顺序，数字越小，越优先执行，如果只写@Order，默认顺序值是Integer.MAX_VALUE。

@Component + @Order 注解方式配置简单，支持自定义 Filter 顺序。缺点是只能拦截所有URL，不能通过配置去拦截指定的 URL。

##### 2.使用@WebFilter+@ServletComponentScan

在 MyFilter上添加@WebFilter注解，并在启动类上增加`@ServletComponentScan`注解，参数就是Filter所在的包路径，相当于告诉 SpringBoot，去哪里扫描 Filter

``` java
@WebFilter(urlPatterns = "/*")
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("MyFilter");
        // 要继续处理请求，必须添加 filterChain.doFilter()
        filterChain.doFilter(servletRequest,servletResponse);
    }
}


///////////////////下面是启动类//////////////////////

@SpringBootApplication
// Filter所在的包路径的默认值是启动类所在的路径，可以不指定
@ServletComponentScan("com.qf.xxx.filter")
public class FilterDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(FilterDemoApplication.class, args);
    }
}
```

@WebFilter+@ServletComponentScan 注解方式支持对 Filter 匹配指定URL，但是不支持指定 Filter 的执行顺序。

##### 3. JavaConfig 配置方式

``` java
@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean registerMyFilter(){
        FilterRegistrationBean<MyFilter> bean = new FilterRegistrationBean<>();
        bean.setOrder(1);
        bean.setFilter(new MyFilter());
        // 匹配"/hello/"下面的所有url
        bean.addUrlPatterns("/hello/*");
        return bean;
    }
    @Bean
    public FilterRegistrationBean registerMyAnotherFilter(){
        FilterRegistrationBean<MyAnotherFilter> bean = new FilterRegistrationBean<>();
        bean.setOrder(2);
        bean.setFilter(new MyAnotherFilter());
        // 匹配所有url
        bean.addUrlPatterns("/*");
        return bean;
    }
}
```

通过 Java 代码显式配置 Filter ，功能强大，配置灵活。只需要把每个自定义的 Filter 声明成 Bean 交给 Spring 管理即可，还可以设置匹配的 URL 、指定 Filter 的先后顺序。

#### 3. 三种方式对比

以上介绍完 SpringBoot 中三种 Filter的使用姿势，非常简单，下面列个表格总结一下：

| 使用方式                         | 排序 | 指定URL |
| :------------------------------- | :--- | :------ |
| @Component @Order                | 1    | 0       |
| @WebFilter @ServletComponentScan | 0    | 1       |
| JavaConfig                       | 1    | 1       |

实际使用过程中，可以按照业务需求选择合适的使用方式，比如：如果编写的过滤器要拦截所有请求，不需要指定URL，那选择最简单的 @Component+@Order 就非常合适。

### 过滤器和拦截器的区别

过滤器 和 拦截器 均体现了`AOP`的编程思想，都可以实现诸如日志记录、登录鉴权等功能，但二者的不同点也是比较多的，接下来一一说明。

1、实现原理不同
过滤器和拦截器 底层实现方式大不相同，过滤器 是基于函数回调的，拦截器 则是基于Java的反射机制（动态代理）实现的。

这里重点说下过滤器！

| 在我们自定义的过滤器中都会实现一个 doFilter()方法，这个方法有一个FilterChain 参数，而实际上它是一个回调接口。ApplicationFilterChain是它的实现类， 这个实现类内部也有一个 doFilter() 方法就是回调方法。 |
| ------------------------------------------------------------ |
| ![在这里插入图片描述](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180700465.png) |

2、使用范围不同

我们看到过滤器 实现的是 `javax.servlet.Filter` 接口，而这个接口是在`Servlet`规范中定义的，也就是说过滤器`Filter` 的使用要依赖于`Tomcat`等容器，导致它只能在`web`程序中使用。

而拦截器(`Interceptor`) 它是一个`Spring`组件，并由`Spring`容器管理，并不依赖`Tomcat`等容器，是可以单独使用的。不仅能应用在`web`程序中，也可以用于`Application`、`Swing`等程序中。

3、触发时机不同
过滤器 和 拦截器的触发时机也不同，我们看下边这张图。

![在这里插入图片描述](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206180703237.png)

过滤器`Filter`是在请求进入容器后，但在进入`servlet`之前进行预处理，请求结束是在`servlet`处理完以后。

拦截器 `Interceptor` 是在请求进入`servlet`后，在进入`Controller`之前进行预处理的，`Controller` 中渲染了对应的视图之后请求结束。

4、拦截的请求范围不同

过滤器几乎可以对所有进入容器的请求起作用，而拦截器只会对`Controller`中请求或访问`static`目录下的资源请求起作用。

> 既然，Filter本身是在Tomcat容器中，并不在Spring的IOC容器中，并且Filter执行在进入servlet之前，那么在Filter中能使用Spring容器中的bean吗？
>
> 答案是可以的，spring是通过 `DelegatingFilterProxy` 过滤器委派代理来实现接管Filter过滤器的。

5、在SpringBoot中使用拦截器

```  java
// 定义拦截器
@Component
public class AddInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("AddInterceptor .........");
        return true;
    }
}
```

```  java
// 配置拦截器
@Configuration
public class MyWebAppConfigurer extends WebMvcConfigurerAdapter {
 
 @Autowired
 AddInterceptor addInterceptor;

 @Override
 public void addInterceptors(InterceptorRegistry registry) {
  // 多个拦截器组成一个拦截器链
  // addPathPatterns 用于添加拦截规则
  // excludePathPatterns 用户排除拦截
  registry.addInterceptor(addInterceptor).addPathPatterns("/**");
  super.addInterceptors(registry);
 }
}
```

> 执行顺序： filter ---> interceptor

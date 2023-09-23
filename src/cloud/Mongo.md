---
title: MongoDB
---

### 1.1 MongoDB是什么

MongoDB：基于分布式文件存储的数据库，记录是一个文档，它是由字段和值对组成的数据结构。

由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

是目前市面上最火的NO-SQL数据库的一种

官网：<https://www.mongodb.com/docs/guides/>

MongoDB文档类似于JSON对象。字段的值可以包括其他文档，数组和文档数组：

文档内容格式：

![image-20230613094504709](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306130945781.png)

### 1.2 MongoDB的特点

- MongoDB 是一个面向文档存储的数据库，操作起来比较简单和容易。
- MongoDB记录中设置任何属性的索引 (如：FirstName="",Address="8 Gandhi Road")来实现更快的排序。
- 你可以通过本地或者网络创建数据镜像，这使得MongoDB有更强的扩展性。
- 负载的增加（需要更多的存储空间和更强的处理能力） ，它可以分布在计算机网络中的其他节点上这就是所谓的分片。
- Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。
- MongoDb 使用update()命令可以实现替换完成的文档（数据）或者一些指定的数据字段 。
- Mongodb中的Map/reduce主要是用来对数据进行批量处理和聚合操作。
- Map和ReduceMap函数调用emit(key,value)遍历集合中所有的记录，将key与value传给Reduce函数进行处理。
- Map函数和Reduce函数是使用Javascript编写的，并可以通过db.runCommand或mapreduce命令来执行MapReduce操作。
- GridFS是MongoDB中的一个内置功能，可以用于存放大量小文件。
- MongoDB允许在服务端执行脚本，可以用Javascript编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。
- MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。

### 1.3 MongoDB安装

采用Docker进行MongoDB的安装

1.创建对应的文件夹

mkdir -p /opt/mongodb/data

2.执行命令，创建容器

docker run -d --name mongo27017 -p 27017:27017 -v /opt/mongodb/data:/data/db  mongo

![image-20230613105907609](https://codingsir.oss-cn-hangzhou.aliyuncs.com/202306131059654.png)

3.验证

ip地址：111.231.15.99

端口号：27017

### 1.4 初体验

Spring Data MongoDB，这是Spring Data框架中操作MongoDB数据库的子框架

1.依赖jar

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

2.实现配置

在application.yml中实现mongoDb数据库的地址

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://111.231.15.99:27017/admin
    
```

3.编写代码

实体层

```java
@Data
@Document("student")
@NoArgsConstructor
public class Student {
    @Id
    private String id;
    private String name;
    private String sex;

    public Student(String name, String sex) {
        this.name = name;
        this.sex = sex;
    }
}
```

持久层

```javascript
public interface StudentDao extends MongoRepository<Student,String> {
}
```

4.运行测试

```java
@SpringBootTest
public class MongoTest {
    @Resource
    private StudentDao dao;
    
    //insert 新增
    @Test
    public void add(){
        Student s1=new Student("stu001","男");
        System.err.println(dao.insert(s1));
    }
    //save id存在就是修改 不存在就是新增
    @Test
    public void update(){
        Student s1=new Student("stu168","女");
        s1.setId("6487de6930f4686648233e07");
        System.err.println(dao.save(s1));
    }
    //删除 deleteById
    @Test
    public void del(){
        dao.deleteById("6487de6930f4686648233e07");
    }
    //查询 findAll
    @Test
    public void query(){
        System.err.println(dao.findAll());
    }
}
```

### 1.5 MongoDB核心

Spring Data MongoDB操作MongoDB有2种方式：

1.继承接口：MongoRepository<实体类的名称,主键对应的数据类型>

​  内部默认实现：CRUD各组操作

2.直接注入MongoTemplate对象

​  可以直接调用对应的方法实现对应的操作

**MongoRepository常用的操作：**

1.CRUD

insert、save、remove、find

2.分页和排序

PageRequest.of(第几页,每页数量)+Sort

```Java
@Test
public void t3(){
    //分页并排序
    System.err.println(dao.findAll(PageRequest.of(0,5).withSort(Sort.by(Sort.Order.desc("id")))).getContent());
}
```

3.条件查询

ExampleMatcher+Example

```Java
//查询 findAll
@Test
public void query(){
    //Criteria.where("name").is("stu001")
    //1.设置要查询的值
    Student student=new Student();
    student.setName("00");
    student.setSex("女");
    
    //2.设置查询的关系 contains 包含：模糊查询，endwith 以xx结尾 exact 精确查询
    ExampleMatcher matcher=ExampleMatcher.matching().
            withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains()).
            withMatcher("sex",ExampleMatcher.GenericPropertyMatchers.exact());

    //3.构造查询条件对象
    Example example=Example.of(student,matcher);
    //4.执行查询 查询条件、分页、排序
    List<Project> list=dao.findAll(example, PageRequest.of(1,2).withSort(Sort.by(Sort.Order.desc("name")))).getContent();
    System.err.println(list);
}
```

**MongoTemplate常用操作：**

```Java
@SpringBootTest
public class MongoTest3 {
    @Resource
    private MongoTemplate template;

    @Test
    public void t1(){
        //新增
        template.insert(new Project(100,"充电桩01",100,20000.0));
        template.save(new Project(101,"充电桩02",120,26000.0));
    }
    @Test
    public void t2(){
        //查询 全部
        System.err.println(template.findAll(Project.class));
    }
    @Test
    public void t3(){
        //精确查询
        Query query=new Query();
        query.addCriteria(Criteria.where("name").is("充电桩02"));
        System.err.println(template.find(query,Project.class));
    }
    @Test
    public void t4(){
        //模糊查询
        Query query=new Query();
        Pattern pattern=Pattern.compile("^.*项目.*$", Pattern.CASE_INSENSITIVE);
        query.addCriteria(Criteria.where("name").regex(pattern));
        //设置分页 skip 起始索引 limit 设置数量
        query.skip(3).limit(3);
        System.err.println(template.find(query,Project.class));
    }
    @Test
    public void t5(){
        //修改
        Update update=new Update();
        update.set("days",500);
        Query query=new Query();
        query.addCriteria(Criteria.where("id").gte(10));
        //批量修改
        UpdateResult result=template.updateMulti(query,update,Project.class);
        System.err.println(result.getModifiedCount());
    }
    @Test
    public void t6(){
        //删除
        Query query=new Query();
        query.addCriteria(Criteria.where("id").gt(8));
        DeleteResult result=template.remove(query,Project.class);
        System.err.println(result.getDeletedCount());
    }
}
```

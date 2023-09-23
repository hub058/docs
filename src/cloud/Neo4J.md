---
title: Neo4J
---


## Neo4j是什么

首先我们要了解下什么是Neo4j。Neo4j是一个高性能的、NoSQL图形数据库，它将结构化数据存储在网络上而不是表中。它是一个嵌入式的、基于磁盘的、具备完全的事务特性的Java持久化引擎，但是它将结构化数据存储在网络(从数学角度叫做图)上而不是表中。Neo4j也可以被看作是一个高性能的图引擎，该引擎具有成熟数据库的所有特性。

程序员工作在一个面向对象的、灵活的网络结构下而不是严格、静态的表中——但是他们可以享受到具备完全的事务特性、企业级的数据库的所有好处。

上面的介绍比较正式，看了好像有点懵。其实，简单的说，Neo4j就是一个存储节点和边的图数据库，就类似树形结构一样，根节点—>子节点—>子节点。



## 为什么要用Neo4j

用MySQL存储的好好的，为啥要用Neo4j，相信很多人都有这个疑惑。

首先，正如上面所介绍的，Neo4j是一个NoSQL图形数据库。作为一个图形数据库，Neo4j具有以下优点：

灵活。不管有什么新的数据需要存储，Neo4j都是一律的节点和边，只需要考虑节点属性和边属性。但是在MySQL中存储的话需要很多表，并且表之间需要做join操作。
 语句简单。相比SQL语句，CQL简单很多（CQL是什么？CQL代表Cypher查询语言，Neo4j将CQL作为查询语言，就像MySQL和SQL的关系一样）
 数据库操作的速度并不会随着数据库的增大有明显的降低。这得益于Neo4j特殊的数据存储结构和专门优化的图算法。



## 什么场景使用

**欺诈检测**

通过图分析可以清楚地知道洗钱网络及相关嫌疑，例如对用户所使用的帐号、发生交易时的IP地址、MAC地址、手机IMEI号等进行关联分析。

**推荐系统**

比如你在淘宝上浏览了Thinkpad T480，它就在下面的猜你喜欢，推荐你Thinkpad E430，Thinkpad T580。

**社交网络图**

社区聚类分析，朋友朋友推荐（就像使用QQ的时候，王姨和你有32个共同好友），社交电商里面的绑定关系。

**身份和访问管理**

使用图形数据库进行身份和访问管理时，可以快速有效地跟踪用户，资产，关系和授权。

当然，使用场景远远不止这些，具体还要根据特定场景来判断。



这个问题，要追述到以前的一次爬虫。
以前需要做一个需求，就是去爬天眼查的企业信息。
当时有这么一个需求人物关系图，那时候还没有接触Neo4j用的还是关系型数据库来处理。

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211528217.webp)



如果你用mysql这类关系型数据库处理数据也是非常麻烦的。
 redis,monogod这类nosql数据库，虽然可以处理，可是处理起来还是相当麻烦！！

这个时候我们就要介绍我们的主角Neo4j



## Neo4j - CQL简介

CQL代表Cypher查询语言。 像Oracle数据库具有查询语言SQL，Neo4j具有CQL作为查询语言。

它是Neo4j图形数据库的查询语言。
 它是一种声明性模式匹配语言
 它遵循SQL语法。
 它的语法是非常简单且人性化、可读的格式。
 如Oracle SQL -
 Neo4j CQL 已命令来执行数据库操作。
 Neo4j CQL 支持多个子句像在哪里，顺序等，以非常简单的方式编写非常复杂的查询。
 NNeo4j CQL 支持一些功能，如字符串，Aggregation.In 加入他们，它还支持一些关系功能。
 Neo4j CQL命令/条款

常用的Neo4j CQL命令/条款如下：
 S.No.   CQL命令/条 用法
 1。  CREATE
 创建  创建节点，关系和属性
 2。  MATCH
 匹配  检索有关节点，关系和属性数据
 3。  RETURN
 返回  返回查询结果
 4。  WHERE
 哪里  提供条件过滤检索数据
 5。  DELETE
 删除  删除节点和关系
 6。  REMOVE
 移除  删除节点和关系的属性
 7。
 ORDER BY
 以…排序
 排序检索数据
 8。  SET
 组   添加或更新标签

## Neo4j CQL 函数

以下是常用的Neo4j CQL函数：
 S.No.   定制列表功能  用法
 1。  String
 字符串 它们用于使用String字面量。
 2。  Aggregation
 聚合  它们用于对CQL查询结果执行一些聚合操作。
 3。  Relationship
 关系  他们用于获取关系的细节，如startnode，endnode等。
 我们将在后面的章节中详细讨论所有Neo4j CQL命令，子句和函数语法，用法和示例。
 Neo4j CQL数据类型

这些数据类型与Java语言类似。 它们用于定义节点或关系的属性

Neo4j CQL支持以下数据类型：
 S.No.   CQL数据类型 用法

1. boolean 用于表示布尔文字：true，false。
2. byte    用于表示8位整数。
3. short   用于表示16位整数。
4. int 用于表示32位整数。
5. long    用于表示64位整数。
6. float   I用于表示32位浮点数。
7. double  用于表示64位浮点数。
8. char    用于表示16位字符。
9. String  用于表示字符串。

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529883.webp)



## 案例

了解北欧神话的小伙伴们应该知道，它的神话体系可以用一个字来形容，那就是『**乱**』！就像是雷神3中下面这张错综复杂的关系网，也只能算是其中的一支半节。

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529835.webp)

如何在springboot项目中，实现并呈现这张雷神中复杂的人物关系图谱。





## Neo4j安装

知识图谱的底层依赖于关键的图数据库，在这里我们选择Neo4j，它是一款高性能的 nosql 图形数据库，能够将结构化的数据存储在**图**而不是**表**中。

需要注意的是，neo4j 4.x以上的版本都需要依赖 jdk11环境，所以如果运行环境是jdk8的话，那么还是老老实实使用3.x版本就行

使用Docker安装命令启动：

```yaml
version: '3.1'
services:
  neo4j:
    # 如果是JDK11使用neo4j:4.4.5-community镜像
    image: neo4j:3.5.22-community
    restart: always
    container_name: neo4j
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - "NEO4J_AUTH=neo4j/123456"
    volumes:
      - D:/docker/data/neo4j/data:/data
      - D:/docker/data/neo4j/logs:/logs
      - D:/docker/data/neo4j/conf:/var/lib/neo4j/conf
      - D:/docker/data/neo4j/import:/var/lib/neo4j/import
```

启动后在浏览器访问安装服务器的7474端口，就可以打开neo4j的控制台页面：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529653.webp)

通过左侧的导航栏，我们依次可以查看存储的数据、一些基础查询的示例以及一些帮助说明。

而顶部带有`$`符号的输入框，可以用来输入neo4j特有的CQL查询语句并执行，具体的语法我们放在下面介绍。

## 简单CQL入门

就像我们平常使用关系型数据库中的SQL语句一样，neo4j中可以使用Cypher查询语言（CQL）进行图形数据库的查询，我们简单来看一下增删改查的用法。

### 添加节点

在CQL中，可以通过`CREATE`命令去创建一个节点，创建不含有属性节点的语法如下：

```sql
CREATE (<node-name>:<label-name>)
```

在`CREATE`语句中，包含两个基础元素，节点名称`node-name`和标签名称`lable-name`。标签名称相当于关系型数据库中的表名，而节点名称则代指这一条数据。

以下面的`CREATE`语句为例，就相当于在`Person`这张表中创建一条没有属性的空数据。

```cql
CREATE (索尔:Person)
```

而创建包含属性的节点时，可以在标签名称后面追加一个描绘属性的`json`字符串：

```cql
CREATE (
   <node-name>:<label-name>
   {    
      <key1>:<value1>,
      …
      <keyN>:<valueN>
   }
)
```

用下面的语句创建一个包含属性的节点：

```cql
CREATE (洛基:Person {name:"洛基",title:"诡计之神"})
```

### 查询节点

在创建完节点后，我们就可以使用`MATCH`匹配命令查询已存在的节点及属性的数据，命令的格式如下：

```CQL
MATCH (<node-name>:<label-name>)
```

通常，`MATCH`命令在后面配合`RETURN`、`DELETE`等命令使用，执行具体的返回或删除等操作。

执行下面的命令：

```cql
MATCH (p:Person) RETURN p
```

查看可视化的显示结果：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529458.webp)

可以看到上面添加的两个节点，分别是不包含属性的空节点和包含属性的节点，并且所有节点会有一个默认生成的`id`作为唯一标识。

### 删除节点

接下来，我们删除之前创建的不包含属性的无用节点，上面提到过，需要使用`MATCH`配合`DELETE`进行删除。

```cql
MATCH (p:Person) WHERE id(p)=100 
DELETE p
```

在这条删除语句中，额外使用了`WHERE`过滤条件，它与SQL中的`WHERE`非常相似，命令中通过节点的`id`进行了过滤。

删除完成后，再次执行查询操作，可以看到只保留了`洛基`这一个节点：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c18e45c007c4a53b67f2ae4271ef039~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 添加关联

在neo4j图数据库中，遵循属性图模型来存储和管理数据，也就是说我们可以维护节点之间的关系。

在上面，我们创建过一个节点，所以还需要再创建一个节点作为关系的两端：

```cql
CREATE (p:Person {name:"索尔",title:"雷神"})
```

创建关系的基本语法如下：

```cql
CREATE (<node-name1>:<label-name1>) 
- [<relation-name>:<relation-label-name>]
-> (<node-name2>:<label-name2>)
```

当然，也可以利用已经存在的节点创建关系，下面我们借助`MATCH`先进行查询，再将结果进行关联，创建两个节点之间的关联关系：

```cql
MATCH (m:Person),(n:Person) 
WHERE m.name='索尔' and n.name='洛基' 
CREATE (m)-[r:BROTHER {relation:"无血缘兄弟"}]->(n)
RETURN r
```

添加完成后，可以通过关系查询符合条件的节点及关系：

```cql
MATCH (m:Person)-[re:BROTHER]->(n:Person) 
RETURN m,re,n
```

可以看到两者之间已经添加了关联：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529978.webp)

需要注意的是，如果节点被添加了关联关系后，单纯删除节点的话会报错，：

```xml
Neo.ClientError.Schema.ConstraintValidationFailed
Cannot delete node<85>, because it still has relationships. To delete this node, you must first delete its relationships.
```

这时，需要在删除节点时同时删除关联关系：

```CQL
MATCH (m:Person)-[r:BROTHER]->(n:Person) 
DELETE m,r
```

执行上面的语句，就会在删除节点的同时，删除它所包含的关联关系了。

那么，简单的cql语句入门到此为止，它已经基本能够满足我们的简单业务场景了，下面我们开始在springboot中整合neo4j。

## SpringBoot整合Neo4j

创建一个springboot项目，这里使用的是`2.3.4`版本，引入neo4j的依赖坐标：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-neo4j</artifactId>
</dependency>
```

在`application.yml`中配置neo4j连接信息：

```yml
spring:
  data:
    neo4j:
      uri: bolt://127.0.0.1:7687
      username: neo4j
      password: 123456
```

大家如果对`jpa`的应用非常熟练的话，那么接下来的过程可以说是轻车熟路，因为它们基本上是一个模式，同样是构建model层、repository层，然后在此基础上操作自定义或模板方法就可以了。

### 节点实体

我们可以使用基于注解的实体映射来描述图中的节点，通过在实体类上添加`@NodeEntity`表明它是图中的一个节点实体，在属性上添加`@Property`代表它是节点中的具体属性。

```java
@Data
@NodeEntity(label = "Person")
public class Node {
    @Id
    @GeneratedValue
    private Long id;

    @Property(name = "name")
    private String name;

    @Property(name = "title")
    private String title;
}
```

这样一个实体类，就代表它创建的实例节点的`<label-name>`为`Person`，并且每个节点拥有`name`和`title`两个属性。

### Repository持久层

对上面的实体构建持久层接口，继承`Neo4jRepository`接口，并在接口上添加`@Repository`注解即可。

```java
@Repository
public interface NodeRepository extends Neo4jRepository<Node,Long> {
    @Query("MATCH p=(n:Person) RETURN p")
    List<Node> selectAll();

    @Query("MATCH(p:Person{name:{name}}) return p")
    Node findByName(String name);
}
```

在接口中添加了个两个方法，供后面测试使用，`selectAll()`用于返回全部数据，`findByName()`用于根据`name`查询特定的节点。

接下来，在service层中调用repository层的模板方法：

```java
@Service
@AllArgsConstructor
public class NodeServiceImpl implements NodeService {
    private final NodeRepository nodeRepository;
    
    @Override
    public Node save(Node node) {
        Node save = nodeRepository.save(node);
        return save;
    }
}
```

前端调用`save()`接口，添加一个节点后，再到控制台用查询语句进行查询，可以看到新的节点已经通过接口方式被添加到了图中：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529744.webp)

在service中再添加一个方法，用于查询全部节点，直接调用我们在`NodeRepository`中定义的`selectAll()`方法：

```java
@Override
public List<Node> getAll() {
    List<Node> nodes = nodeRepository.selectAll();
    nodes.forEach(System.out::println);
    return nodes;
}
```

在控制台打印了查询结果：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529096.webp)

对节点的操作我们就介绍到这里，接下来开始构建节点间的关联关系。

### 关联关系

在neo4j中，关联关系其实也可以看做一种特殊的实体，所以可以用实体类来对其进行描述。与节点不同，需要在类上添加`@RelationshipEntity`注解，并通过`@StartNode`和`@EndNode`指定关联关系的开始和结束节点。

```java
@Data
@RelationshipEntity(type = "Relation")
public class Relation {
    @Id
    @GeneratedValue
    private Long id;

    @StartNode
    private Node startNode;

    @EndNode
    private Node endNode;

    @Property
    private String relation;
}
```

同样，接下来也为它创建一个持久层的接口：

```java
@Repository
public interface RelationRepository extends Neo4jRepository<Relation,Long> {
    @Query("MATCH p=(n:Person)-[r:Relation]->(m:Person) " +
            "WHERE id(n)={startNode} and id(m)={endNode} and r.relation={relation}" +
            "RETURN p")
    List<Relation> findRelation(@Param("startNode") Node startNode,
                                @Param("endNode") Node endNode,
                                @Param("relation") String relation);
}
```

在接口中自定义了一个根据起始节点、结束节点以及关联内容查询关联关系的方法，我们会在后面用到。

### 创建关联

在service层中，创建提供一个根据节点名称构建关联关系的方法：

```java
@Override
public void bind(String name1, String name2, String relationName) {
    Node start = nodeRepository.findByName(name1);
    Node end = nodeRepository.findByName(name2);

    Relation relation =new Relation();
    relation.setStartNode(start);
    relation.setEndNode(end);
    relation.setRelation(relationName);
    
    relationRepository.save(relation);
}
```

通过接口调用这个方法，绑定`海拉`和`索尔`之间的关系后，查询结果：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529676.webp)

## 文本SPO抽取

在项目中构建知识图谱时，很大一部分场景是基于非结构化的数据，而不是由我们手动输入确定图谱中的节点或关系。因此，我们需要基于文本进行知识抽取的能力，简单来说就是要在一段文本中抽取出SPO主谓宾三元组，来构成图谱中的点和边。

这里我们借助Git上一个现成的工具类，来进行文本的语义分析和SPO三元组的抽取工作，项目地址：

> [github.com/hankcs/Main…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fhankcs%2FMainPartExtractor)

这个项目虽然比较简单一共就两个类两个资源文件，但其中的工具类却能够有效帮助我们完成句子中的主谓宾的提取，使用它前需要先引入依赖的坐标：

```xml
<dependency>
    <groupId>com.hankcs</groupId>
    <artifactId>hanlp</artifactId>
    <version>portable-1.2.4</version>
</dependency>
<dependency>
    <groupId>edu.stanford.nlp</groupId>
    <artifactId>stanford-parser</artifactId>
    <version>3.3.1</version>
</dependency>
```

然后把这个项目中`com.hankcs.nlp.lex`包下的两个类拷到我们的项目中，把`resources`下的`models`目录拷贝到我们的`resources`下。

完成上面的步骤后，调用`MainPartExtractor`工具类中的方法，进行一下简单的文本SPO抽取测试：

```java
public void mpTest(){
    String[] testCaseArray = {
            "我一直很喜欢你",
            "你被我喜欢",
            "美丽又善良的你被卑微的我深深的喜欢着……",
            "小米公司主要生产智能手机",
            "他送给了我一份礼物",
            "这类算法在有限的一段时间内终止",
            "如果大海能够带走我的哀愁",
            "天青色等烟雨，而我在等你",
            "我昨天看见了一个非常可爱的小孩"
    };
    for (String testCase : testCaseArray) {
        MainPart mp = MainPartExtractor.getMainPart(testCase);
        System.out.printf("%s   %s   %s \n",
                GraphUtil.getNodeValue(mp.getSubject()),
                GraphUtil.getNodeValue(mp.getPredicate()),
                GraphUtil.getNodeValue(mp.getObject()));
    }
}
```

在处理结果`MainPart`中，比较重要的是其中的`subject`、`predicate`和`object`三个属性，它们的类型是`TreeGraphNode`，封装了句子的主谓宾语成分。下面我们看一下测试结果：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529331.webp)

可以看到，如果句子中有明确的主谓宾语，那么则会进行抽取。如果某一项为空，则该项为`null`，其余句子结构也能够正常抽取。

## 动态构建知识图谱

在上面的基础上，我们就可以在项目中动态构建知识图谱了，新建一个`TextAnalysisServiceImpl`，其中实现两个关键方法。

首先是根据句子中抽取的主语或宾语在neo4j中创建节点的方法，这里根据节点的`name`判断是否为已存在的节点，如果存在则直接返回，不存在则添加：

```java
private Node addNode(TreeGraphNode treeGraphNode){
    String nodeName = GraphUtil.getNodeValue(treeGraphNode);

    Node existNode = nodeRepository.findByName(nodeName);
    if (Objects.nonNull(existNode))
        return existNode;

    Node node =new Node();
    node.setName(nodeName);
    return nodeRepository.save(node);
}
```

然后是核心方法，说白了也很简单，参数传进来一个句子作为文本先进行spo的抽取，对实体进行`Node`的保存，再查看是否已经存在同名的关系，如果不存在则创建关联关系，存在的话则不重复创建。下面是关键代码：

```java
public List<Relation> parseAndBind(String sentence) {
    MainPart mp = MainPartExtractor.getMainPart(sentence);

    TreeGraphNode subject = mp.getSubject();    //主语
    TreeGraphNode predicate = mp.getPredicate();//谓语
    TreeGraphNode object = mp.getObject();      //宾语

    if (Objects.isNull(subject) || Objects.isNull(object))
        return null;

    Node startNode = addNode(subject);
    Node endNode = addNode(object);
    String relationName = GraphUtil.getNodeValue(predicate);//关系词

    List<Relation> oldRelation = relationRepository
            .findRelation(startNode, endNode,relationName);
    if (!oldRelation.isEmpty())
        return oldRelation;

    Relation botRelation=new Relation();
    botRelation.setStartNode(startNode);
    botRelation.setEndNode(endNode);
    botRelation.setRelation(relationName);
    Relation relation = relationRepository.save(botRelation);

    return Arrays.asList(relation);
}
```

创建一个简单的controller接口，用于接收文本：

```java
@GetMapping("parse")
public List<Relation> parse(String sentence) {
    return textAnalysisService.parseAndBind(sentence);
}
```

接下来，我们从前端传入下面几个句子文本进行测试：

```
复制代码海拉又被称为死亡女神
死亡女神捏碎了雷神之锤
雷神之锤属于索尔
```

调用完成后，我们再来看看neo4j中的图形关系，可以看到**海拉**、**死亡女神**、**索尔**、**锤**这些实体被关联在了一起：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202309211529074.webp)

到这里，一个简单的文本处理和图谱创建的流程就被完整的串了起来，但是这个流程还是比较粗糙，之后还需要在下面几个方面继续优化：

- 当前使用的还是单一类型的节点和关联关系，后续可以在代码中丰富更多类型的节点和关联关系实体类
- 文中使用的文本spo抽取效果一般，如果应用于企业项目，那么建议基于更精确的nlp算法去做语义分析
- 当前抽取的节点只包含了实体的名称，不包含具体的属性，后续需要继续完善补充实体的属性
- 完善知识融合，主要是添加实体的指代消解以及属性的融合功能






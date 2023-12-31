---
title: MySQL-精简版
---

## 1. 如何定位及优化SQL语句的性能问题？

对于低性能的SQL语句的定位，最重要也是最有效的方法就是使用执行计划，MySQL提供了explain命令来查看语句的执行计划。 

**大表数据查询的优化**
* 优化shema、sql语句+索引；
* 第二加缓存，memcached, redis；
* 主从复制，读写分离；
* 通过分库分表的方式进行优化，主要有垂直分表和水平分表

**优化查询过程中的数据访问**
* 访问数据太多导致查询性能下降
* 确认MySQL服务器是否在分析大量不必要的数据行
* 查询不需要的数据。解决办法：使用limit解决
* 多表关联返回全部列。解决办法：指定列名
* 总是返回全部列。解决办法：避免使用SELECT *
* 重复查询相同的数据。解决办法：可以缓存数据，下次直接读取缓存
* 改变数据库和表的结构，修改数据表范式
* 重写SQL语句，让优化器可以以更优的方式执行查询。

**优化关联查询**
- 确定ON或者USING子句中是否有索引。
- 确保GROUP BY和ORDER BY只有一个表中的列，这样MySQL才有可能使用索引。

**数据库结构优化**
一个好的数据库设计方案对于数据库的性能往往会起到事半功倍的效果。

需要考虑数据冗余、查询和更新的速度、字段的数据类型是否合理等多方面的内容。
1. 将字段很多的表分解成多个表
2. 增加中间表
3. 增加冗余字段

## 2.  MySQL中myisam与innodb的区别?

* InnoDB支持事物，而MyISAM不支持事物
* InnoDB支持行级锁，而MyISAM支持表级锁
* InnoDB支持MVCC, 而MyISAM不支持
* InnoDB支持外键，而MyISAM不支持
* InnoDB不支持全文索引，而MyISAM支持。

## 3. 事务的特性

- 原子性：
- 一致性：
- 隔离性：
- 持久性：

## 4. 索引是什么？

索引是表的目录，在查找内容之前可以先在目录中查找索引位置，以此快速定位查询数据。对于索引，会保存在额外的文件中。

索引是帮助MySQL高效获取数据的数据结构。

## 5. 索引能干什么?有什么好处？

当表中的数据量越来越大时，索引对于性能的影响愈发重要。索引能够轻易将查询性能提高好几个数量级，总的来说就是可以明显的提高查询效率。

## 6.  索引的种类有哪些？

1、从存储结构上来划分：BTree索引（B-Tree或B+Tree索引），Hash索引，full-index全文索引，R-Tree索引。这里所描述的是索引存储时保存的形式，
2、从应用层次来分：普通索引，唯一索引，复合索引
3、根据中数据的物理顺序与键值的逻辑（索引）顺序关系：聚集索引，非聚集索引。

平时讲的索引类型一般是指在应用层次的划分。
* 普通索引
* 复合索引
* 唯一索引

## 7. 为什么 MySQL 的索引要使用 B+树

B-tree：因为B树不管叶子节点还是非叶子节点，都会保存数据，这样导致在非叶子节点中能保存的指针数量变少（有些资料也称为扇出），指针少的情况下要保存大量数据，只能增加树的高度，导致IO操作变多，查询性能变低；

Hash：虽然可以快速定位，但是没有顺序，IO复杂度高。

二叉树：树的高度不均匀，不能自平衡，查找效率跟数据有关（树的高度），并且IO代价高。

红黑树：树的高度随着数据量增加而增加，IO代价高。


## 8. 哪些列上适合创建索引？创建索引有哪些开销？

经常需要作为条件查询的列上适合创建索引，并且该列上也必须有一定的区分度。创建索引需要维护，在插入数据的时候会重新维护各个索引树（数据页的分裂与合并），对性能造成影响

## 9. 索引这么多优点，为什么不对表中的每一个列创建一个索引呢？

1. 当对表中的数据进行增加、删除和修改的时候，索引也要动态的维护，这样就降低了数据的维护速度。
2. 索引需要占物理空间，除了数据表占数据空间之外，每一个索引还要占一定的物理空间，如果要建立聚簇索引，那么需要的空间就会更大。
3. 创建索引和维护索引要耗费时间，这种时间随着数据量的增加而增加。

## 10. 什么情况下不走索引（索引失效）？

1、使用!= 或者 <> 导致索引失效

2、类型不一致导致的索引失效

3、函数导致的索引失效

4、运算符导致的索引失效

5、OR引起的索引失效

6、模糊搜索导致的索引失效

7、NOT IN、NOT EXISTS导致索引失效

## 11. MySQL建表的约束条件有哪些？

- 主键约束（Primay Key Coustraint） 唯一性，非空性
- 唯一约束 （Unique Counstraint）唯一性，可以空，但只能有一个
- 检查约束 (Check Counstraint) 对该列数据的范围、格式的限制
- 默认约束 (Default Counstraint) 该数据的默认值
- 外键约束 (Foreign Key Counstraint) 需要建立两表间的关系并引用主表的列


## 12. 什么是最左匹配原则？

最左优先，以最左边的为起点任何连续的索引都能匹配上。同时遇到范围查询(>、<、between、like)就会停止匹配。

**最左匹配原则的原理**

MySQL中的索引可以以一定顺序引用多列，这种索引叫作联合索引.最左匹配原则都是针对联合索引来说的

优点：最左前缀原则的利用也可以显著提高查询效率，是常见的MySQL性能优化手段。


题目：
``` shell
1、怎么进行SQL优化？
2. MySQL中myisam与innodb的区别？
3. 事务的特性？
4. 索引是什么？
5. 索引能干什么?有什么好处？
6. 索引的种类有哪些？
7. 为什么 MySQL 的索引要使用 B+树
8. 哪些列上适合创建索引？创建索引有哪些开销？
9. 索引这么多优点，为什么不对表中的每一个列创建一个索引呢？
10、什么情况下不走索引（索引失效）？
11. MySQL建表的约束条件有哪些？
12. 什么是最左匹配原则？
```
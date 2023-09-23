---
title: 集合题-精简版
---

## 1. 常见的集合有哪些？

Java集合类主要由两个根接口**Collection**和**Map**派生出来的，Collection派生出了三个子接口：List、Set、Queue（Java5新增的队列），因此Java集合大致也可分成List、Set、Queue、Map四种接口体系。

**注意：Collection是一个接口，Collections是一个工具类，Map不是Collection的子接口**。

List代表了有序可重复集合，可直接根据元素的索引来访问；Set代表无序不可重复集合，只能根据元素本身来访问；Queue是队列集合。

Map代表的是存储key-value对的集合，可根据元素的key来访问value。

## 2. 线程安全的集合有哪些？线程不安全的呢？

线程安全的：

- Hashtable：比HashMap多了个线程安全。
- ConcurrentHashMap:是一种高效但是线程安全的集合。
- Vector：比ArrayList多了个同步化机制。
- Stack：栈，也是线程安全的，继承于Vector。

线程不安全的：

- HashMap
- ArrayList
- LinkedList
- HashSet
- TreeSet
- TreeMap

## 3. ArrayList与 LinkedList 异同点？

- **是否保证线程安全：** ArrayList 和 LinkedList 都是不同步的，也就是不保证线程安全；
- **底层数据结构：** ArrayList 底层使用的是Object数组；LinkedList 底层使用的是双向循环链表数据结构；
- **插入和删除是否受元素位置的影响：**ArrayList 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响。 LinkedList 采用链表存储，所以插入，删除元素时间复杂度不受元素位置的影响，都是近似 O（1）而数组为近似 O（n）。
- **是否支持快速随机访问：** LinkedList 不支持高效的随机元素访问，而ArrayList 实现了RandomAccess 接口，所以有随机访问功能。

## 4. 说一说ArrayList 的扩容机制？

ArrayList扩容的本质就是计算出新的扩容数组的size后实例化，并将原有数组内容复制到新数组中去。**默认情况下，新的容量会是原容量的1.5倍**。

## 5. Array 和 ArrayList 有什么区别？什么时候该应 Array 而不是 ArrayList 呢？

- Array 可以包含基本类型和对象类型，ArrayList 只能包含对象类型。
- Array 大小是固定的，ArrayList 的大小是动态变化的。
- ArrayList 提供了更多的方法和特性，比如：addAll()，removeAll()，iterator() 等等。

## 6. HashMap的底层数据结构是什么？

在JDK1.7 和JDK1.8 中有所差别：

在JDK1.7 中，由“数组+链表”组成，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的。

在JDK1.8 中，由“数组+链表+红黑树”组成。当链表过长，则会严重影响 HashMap 的性能，红黑树搜索时间复杂度是 O(logn)，而链表是糟糕的 O(n)。因此，JDK1.8 对数据结构做了进一步的优化，引入了红黑树，链表和红黑树在达到一定条件会进行转换：

- 当链表超过 8 且数据总量超过 64 才会转红黑树。
- 将链表转换成红黑树前会判断，如果当前数组的长度小于 64，那么会选择先进行数组扩容，而不是转换为红黑树，以减少搜索时间。

## 7. HashMap为什么线程不安全？

![image-20221006144832504](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20221006144832504.png)

- 多线程下扩容死循环。JDK1.7中的 HashMap 使用头插法插入元素，在多线程的环境下，扩容的时候有可能导致环形链表的出现，形成死循环。因此，JDK1.8使用尾插法插入元素，在扩容时会保持链表元素原本的顺序，不会出现环形链表的问题。
- 多线程的put可能导致元素的丢失。多线程同时执行 put 操作，如果计算出来的索引位置是相同的，那会造成前一个 key 被后一个 key 覆盖，从而导致元素的丢失。此问题在JDK 1.7和 JDK 1.8 中都存在。
- put和get并发时，可能导致get为null。线程1执行put时，因为元素个数超出threshold而导致rehash，线程2此时执行get，有可能导致这个问题。此问题在JDK 1.7和 JDK 1.8 中都存在。

## 8. ConcurrentHashMap 的实现原理是什么？

ConcurrentHashMap 在 JDK1.7 和 JDK1.8 的实现方式是不同的。

**先来看下JDK1.7**

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/ConcurrentHashMap-jdk1.7.png)

JDK1.7中的ConcurrentHashMap 是由 `Segment` 数组结构和 `HashEntry` 数组结构组成，即ConcurrentHashMap 把哈希桶切分成小数组（Segment ），每个小数组有 n 个 HashEntry 组成。

其中，Segment 继承了 ReentrantLock，所以 Segment 是一种可重入锁，扮演锁的角色；HashEntry 用于存储键值对数据。

**再来看下JDK1.8**

![](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/ConcurrentHashMap-jdk1.8.png)

在数据结构上， JDK1.8 中的ConcurrentHashMap 选择了与 HashMap 相同的**数组+链表+红黑树**结构；在锁的实现上，抛弃了原有的 Segment 分段锁，采用`CAS + synchronized`实现更加低粒度的锁。

将锁的级别控制在了更细粒度的哈希桶元素级别，也就是说只需要锁住这个**链表头结点**（红黑树的根节点），就不会影响其他的哈希桶元素的读写，大大提高了并发度。

## 9. JDK1.7与JDK1.8 中ConcurrentHashMap 的区别？

- 数据结构：取消了Segment分段锁的数据结构，取而代之的是数组+链表+红黑树的结构。
- 保证线程安全机制：JDK1.7采用Segment的分段锁机制实现线程安全，其中segment继承自ReentrantLock。JDK1.8 采用CAS+Synchronized保证线程安全。
- 锁的粒度：原来是对需要进行数据操作的Segment加锁，现调整为对每个数组元素加锁（Node）。
- 链表转化为红黑树:定位结点的hash算法简化会带来弊端,Hash冲突加剧,因此在链表节点数量大于8时，会将链表转化为红黑树进行存储。
- 查询时间复杂度：从原来的遍历链表O(n)，变成遍历红黑树O(logN)。

## 10. ConcurrentHashMap 和Hashtable的效率哪个更高？为什么？

ConcurrentHashMap 的效率要高于Hashtable，因为Hashtable给整个哈希表加了一把大锁从而实现线程安全。而ConcurrentHashMap 的锁粒度更低，在JDK1.7中采用分段锁实现线程安全，在JDK1.8 中采用`CAS+Synchronized`实现线程安全。

## 11. HashSet 和 HashMap 区别?

HashSet的底层其实就是HashMap，只不过我们**HashSet是实现了Set接口并且把数据作为K值，而V值一直使用一个相同的虚值来保存**。

题目：

``` shell
1. 常见的集合有哪些？
2. 线程安全的集合有哪些？线程不安全的呢？
3. ArrayList与 LinkedList 异同点？
4. 说一说ArrayList 的扩容机制？
5. Array 和 ArrayList 有什么区别？什么时候该应 Array 而不是 ArrayList 呢？
6. HashMap的底层数据结构是什么？
7. HashMap为什么线程不安全？
8. ConcurrentHashMap 的实现原理是什么？
9. JDK1.7与JDK1.8 中ConcurrentHashMap 的区别？
10. ConcurrentHashMap 和Hashtable的效率哪个更高？为什么？
11. HashSet 和 HashMap 区别?
```

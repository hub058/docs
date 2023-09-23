---
title: Stream
---


1、生成Stream流

> 常用的可以使用 List，Set, Map
>
> 调用steam生成Stream对象


2、生成的stream

>filter: 过滤元素的方法：(t)->boolean
>
>如果结果是true,这个元素会保留（不过滤掉），
>
>如果为false元素会被扔掉
>
>``` 
>Stream<T> filter(Predicate<? super T> predicate);
>``` 

filter:方法的参数是一个函数：


> 传入你要判断的元素对象，实现可以使用lambda表达式，表达是的入参T就是元素
>
> 返回值就是true/false,
>
> lambda: x -> !x.isEmpty()   就是上面的test方法的实现。

collect()

> ``` java
>  collect()结束流的操作，可以返回你要的结果
>  Collectors.toList() // 把结果生成一个新的list返回
>  Collectors.toSet() // 把结果生成一个新的set返回
> ``` 





### 代码

``` java
public class Main {

    public static void main(String[] args) {
        // 实现一个效果，把list中空格元素去除掉，得到一个新的list
        // 1、创建一个list
        List<String> list = Arrays.asList("a", "b", "", "d", "e");
        // 2、生成一个stream  filer:是一个过滤操作
        long count = list.stream().filter(x -> !x.isEmpty()).count();
        System.out.println("非空的元素个数：" + count);
        // 3、得到一个新的list collect()结束流的操作，可以返回你要的结果
        List<String> filteredList = list.stream().filter(x -> !x.isEmpty()).collect(Collectors.toList());
        System.out.println(filteredList);
        // 4、得到一个新的set
        Set<String> filteredSet= list.stream().filter(x -> !x.isEmpty()).collect(Collectors.toSet());
        System.out.println(filteredSet);
    }
}
``` 




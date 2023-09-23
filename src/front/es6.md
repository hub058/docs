---
title: ES6
---

## 0、什么是ES6

> ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

一个常见的问题是，ECMAScript 和 JavaScript 到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

该标准从一开始就是针对 JavaScript 语言制定的，但是之所以不叫 JavaScript，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。



## 1、变量

- var 声明变量，没有局部作用域的，可以声明多次
- let 声明变量，有局部作用域，只能声明一次

``` html
<script>
    // var 声明变量,没有局部作用域的,可以声明多次
    {
        var a = 2;
        var a = 3;
    }
    console.log(a);

    // let 声明变量 ,有局部作用域,只能声明一次
    {
        let b = 3;
        let b = 4; //Cannot redeclare block-scoped variable 'b'.
    }
    console.log(b); //b is not defined
</script>
``` 

> 错误说明
>
> Cannot redeclare block-scoped variable 'b'  
>
> - 不能再次声明块级作用域[局部变量]b
>
> b is not defined 
>
> - b未定义

## 2、常量

- const 使用常量关键词声明，声明后必须赋值，声明后不能修改值

``` html
<script>
    // const PI; // 'const' declarations must be initialized
    const PI = 3.14;
    PI = 3.1415;  // Assignment to constant variable.
    console.log(PI);
</script>
``` 

> 错误说明
>
> 'const' declarations must be initialized
>
> - const声明必须初始化[赋值]
>
> Assignment to constant variable.
>
> - 给常量赋值了



## 3、解构赋值

> 解构：把整体拆分成组件
>
> 数组解构使用： []
>
> 对象解构使用：{}

解构赋值是对 **赋值运算符** 的 一种扩展，他是一种针对**数组或者对象**进行模式匹配，然后对其中的变量进行赋值。    在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。

### 数组解构

``` html
<script>
    // 1、数组解构
    let a = 1, b = 2, c = 3;
    console.log(a, b, c);
    // ES6数组解构
    let [x, y, z] = [4, 5, 6];
    console.log(x, y, z);
</script>
``` 

### 对象解构

``` html
<script>
    // 2、对象结解构
    let user = { name: '稀客', age: 18, address: '郑州' };
    // 把对象的属性拆分出来
    let username = user.name;
    let userage = user.age;
    let useraddr = user.address;

    console.log(username, userage, useraddr);

    // ES6的对象解构,{}解构的符号
    let { name, age } = user;
    let { address } = user;
    console.log(name, age, address);
</script>
``` 



## 4、模板字符串

> 模板字符串相当于加强版的字符串，用反引号 `，除了作为普通字符串，还可以用来定义多行字符串，
>
> 还可以在字符串用${}中加入变量和表达式。
>
> 模板字串使用：`
>
> 变量和表达式使用：${}

``` html
<script>
    let name = '稀客';
    let city = '郑州';
    // 传统的字符串拼接
    let info = 'Im ' + name + ',Im from ' + city;
    console.log(info);

    // ES6的模板字符串
    let info2 = `Im ${name},Im from ${city}`;
    console.log(info2);

    let info3 = `我还可以
        换行哦`;
    console.log(info3);
</script>
``` 



## 5、对象简写

> 对象中的属性名和需要赋值的变量名一致时，可以省略属性名
>
> let user2 = {name,age};

``` html
<script>
    let name = '稀客';
    let age = 18;
    // user对象中有name和age两个属性
    let user = {name:name,age:age};
    console.log(user);

    // ES6的对象简写
    let user2 = {name,age};
    console.log(user2);
</script>
``` 



## 6、对象拓展运算符

> 拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。
>
> - 取出可遍历属性
> - 拷贝到当前对象

``` html
<script>
    // ... 对象扩展运算符
    let user = { name: '稀客大大', age: 18 };
    // 对象复制
    let xike = { ...user };
    console.log(xike);

    // 对象合并
    let hobby = 'girl';
    let address = { province: '河南', city: '郑州' };
    let xikeman = { ...user, hobby, address };
    console.log(xikeman);

    // 与数组解构表达式结合，... 也可称为剩余运算符
    let [x, y, ...z] = [1, 2, 3, 4, 5];
    console.log(x, y, z);
</script>
``` 



## 7、箭头函数

> 箭头函数提供了一种更加简洁的函数书写方式。基本语法是：参数 => 函数体
>
> 箭头函数多用于**匿名函数**的定义
>
> 当箭头函数没有参数或者有多个参数，要用 () 括起来。 (m,n)=>m+n;
> 当箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块，(m,n)=>{m+n;}
> 当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回。

``` html
<script>
    // 传统方式定义函数
    var fun = function (a) {
        return a;
    }
    console.log(fun('Hello'));

    // 箭头函数
    var fun2 = x => x;
    console.log(fun2('World'));

    // 加法函数
    // 当箭头函数没有参数或者有多个参数，要用 () 括起来。
    // 当箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块，
    // 当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回。
    var fun3 = (m, n) => m + n;
    console.log(fun3(3, 4));
</script>
``` 








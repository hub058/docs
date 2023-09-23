---
title: JS课堂笔记
---

## 什么javaScript

> html: 定义也界面元素，画框架的
>
> CSS：美化网页元素的
>
> JavaScript:让页面元素可以动起来，还可以跟用户和跟服务端交互。



## JavaScript简介

> 解释型的动态语言，弱类型【不需要明确指定变量的类型，JS引擎自动判断】
>
> String Number Boolean Undefined Null
>
> 他是运行在客户端浏览器的，浏览器内置的JS解释器。



## JavaScript使用【重点】

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS入门</title>
</head>
<body>
    <script>
        document.write('Hello JavaScript!');
        document.write('Hello Java!');
    </script>
</body>
</html>
```

内部位置：一般情况下，js代码编写在 body或者head内置，使用`script`标签括起来js代码。

| 外部JS文件使用：                                             |
| ------------------------------------------------------------ |
| ![image-20220715093720231](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207150937577.png) |



## js的数据类型

五种：Number 数值 String 字串 Boolean 布尔[真假] Undefined 未定义 Null 空类型

document: 网页文档

html内容：可以带html标签 也可以带样式

> document.write() 作用是：到页面上输出html内容。



## json数据格式【重点】

*JSON*（JavaScript Object Notation, JS对象简谱）是一种轻量级的数据交换格式

作用是：数据传递，前后端，浏览器和服务器之间传递数据使用的一种简单的数据格式

语法： `var chaofen = {id:1,name:'goudan',age:18}`  

大括号括起来标识一个对象；

对象里可以有很多个属性 ，格式是 `属性名:属性值`

如果有多个属性，属性之间可以用逗号隔开。

> 属性名要不要引号都可以；`var chaofen = {'id':1,'name':'goudan','age':18}`  



## console和document的区别

使用的方法不一样：

网页： document.write()

控制台： console.log() 

最大的区别是:

控制台打印的东西是给**开发人员**看的，用于**代码调试**

网页打印的东西是给用户看的。

| 浏览器控制台界面                                             |
| ------------------------------------------------------------ |
| ![image-20220715114158913](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151141065.png) |



## js中的数组【重点】

> 语法： var arr = [值1,值2,...];
>
> 举例： var num = [1,2,3,4];

如果要获取数组中的某个元素： 数组名[下标]

> var aa = [1,'hello',true];
>
>  js的数组中可以是不同类型的数据

``` js
// 普通数组
var num = [1, 2, 3, 4];
document.write(num);
document.write('<br />');
document.write(num[0]);
document.write('<hr />');
//  js的数组中可以是不同类型的数据
var aa = [1, 'hello', true];
document.write(aa);
document.write('<hr />');
```



对象数组：

``` js
/* 对象数组的第一种方式 先定义对象，把对象放到数组中 */
var chaofan = { name: '超凡', age: 16 };
var limeng = { name: '李萌', age: 99 };
var superman = [chaofan, limeng];
console.log(superman);

/* 对象数组的第二种方式 直接在数组中写对象 */
var person = [
    { name: '超凡', age: 16 },
    { name: '李萌', age: 99 }
];
console.log(person);
```



## 运算符

算术运算符 ` + - * / % ++ -- `

比较运算符 `==   ===  > < >= <= !=`

逻辑运算 `&& || ！`

> == 比较内容
>
> === 严格相等，内容和类型都得相同才是true

三目运算符

> // 三目运算符
>
> ​    var cf = 18
>
> ​    var lm = 99;
>
> ​    console.log(cf > lm ? '超凡是大哥' : '超凡是小弟');



## 全局函数

全局函数可以直接使用的

> parseInt() 转整型的函数
>
> parseFloat() 转浮点数的函数
>
> Date() 获取系统当前事件的函数
>
> alert() 警告弹窗
>
> confirm() 确认弹窗
>
> prompt() 提示弹窗 



## 条件分支结构

### if-else

``` js
var weather = '下冰雹';
if (weather == '下雨') {
    document.write('在家打代码');
} else {
    document.write('在学校打代码');
}
```

### switch

``` js
var weather = '下冰雹';
switch (weather) {
    case '下雨':
        document.write('在家打代码');
        break;
    case '晴天':
        document.write('在学校打代码');
        break;
    default:
        document.write('出去玩');
        break;
}

var num = 2;
switch (num) {
    case 1:
        document.write('星期一');
        break;
    case 2:
        document.write('星期二');
        break;
    default:
        document.write('休息日');
        break;
}
```

## 循环结构

### for-i循环

> let 声明的是局部变量
>
> var 声明的是全局变量

``` js
var sum = 0;
for (let num = 1; num <= 200; num++) {
    sum += num;
}
document.writeln(sum);
document.write('<hr />');
```



### while循环

```` js
// while循环
var sum = 0;
var num1 = 1;
while (num1<=200) {
    sum+=num1;
    num1++;
}
document.writeln(sum);
document.write('<hr />');
````



### do-while循环

``` js
// do-while
var sum = 0;
var num2 = 1;
do {
    sum+=num2;
    num2++;
} while (num2<=200);
document.write(sum);
```



### for-of 循环【重点】

> for-of只能遍历可迭代的对象, **数组，字串等**
>
> 可以循环获取到数组的每个值

遍历字串，可以拆分字串

![image-20220715153605341](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151536485.png)

遍历数组

![image-20220715153706228](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151537307.png)

> for-of **遍历的是可迭代的对象，比如数组，字串**，对象不能！！！
>
> ![image-20220715154048165](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151540314.png)



### for-in循环【重点】

> 遍历的是**数组的下标和对象的属性**，既可以遍历数组又可以遍历对象

```js
// for-in 可以遍历对象中的全部属性
var stu = { name: '连冠欣', age: 18 }
for (const key in stu) {
    document.writeln(key);
    // 对象[属性名]
    document.writeln(stu[key]);
    document.write('<br />');
}
document.write('<hr />');

var arr2 = ['董硕','腾飞','狗蛋'];
for (const key in arr2) {
    document.writeln(key);
    document.writeln(arr2[key]);
}
```

对象数组？遍历



### for-each循环

可以使用箭头函数，类似于Java的lambda表达式

只能遍历数组

```js
// for-each 可以遍历数组，需要使用 => 箭头函数
var arr = ['郑州','洛阳','南街村'];
arr.forEach(a => document.writeln(a));
```



##  JS函数【重点】

函数定义

``` js
// java定义函数
public int add(int a,int b){
	return a+b;
}

// js定义函数
function add(a,b){
	return a+b;
}
```

> 使用function声明一个函数，接着写方法名，方法参数直接写变量就行[不用写类型]
>
> 方法也不用写返回值类型
>
> 如果方法中需要返回东西，直接return,如果不需要返回东西，就不写return

``` js
// 函数定义
function add(a,b) {
    return a + b;
}

// add(1,2) 函数调用
// document.writeln(add(3,4));
var sum = add(10,20);
document.writeln(sum);
```



## 常用函数

### 警告弹窗
只能单向的提示信息，不能交互

``` js
浏览器弹窗
alert('稀客大大');
```

| 效果如下                                                     |
| ------------------------------------------------------------ |
| ![image-20220715161302414](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151613512.png) |



### 确认弹窗

用户可以选择[确认/取消]，有了一定的自主权 

``` js
// 可以确定或取消 返回true/false
var ans = confirm('你是大傻X吗');
document.writeln(ans);
```

| 效果如下                                                     |
| ------------------------------------------------------------ |
| ![image-20220715161459166](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151614256.png) |
| ![image-20220715161515698](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151615774.png) |

> 如果用户选择了确定，会返回 true,否则返回false



### 提示弹窗

交互更加丰富了，用户有了更多的自主权，用户 可以输入自己的内容进行回答

``` js
// prompt 你可以自定义答案
var ans = prompt('你喜欢腾飞吗？','喜欢');
document.writeln(ans);
```

| 效果如下                                                     |
| ------------------------------------------------------------ |
| ![image-20220715161840778](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207151618883.png) |
| 页面显示： 喜欢                                              |



## 事件

> 什么叫事件？ 就是发生了某种行为。。 包括鼠标的行为，键盘的行为，浏览器的行为，网页元素的行为等
>
> 在这种行为发生的时候，做什么事情【指定一个处理函数】，就是事件机制！
>
> 比如：我们可以指定在用户点击HTML元素的时候[元素的onclick事件发生时]，做什么处理。

| 事件名称    | 描述                         |
| ----------- | ---------------------------- |
| onchange    | HTML 元素内容改变            |
| onclick     | 用户点击 HTML 元素           |
| onmouseover | 用户将鼠标移入一个HTML元素中 |
| onmousemove | 用户在一个HTML元素上移动鼠标 |
| onmouseout  | 用户从一个HTML元素上移开鼠标 |
| onkeyup     | 键盘                         |
| onkeydown   | 用户按下键盘按键             |
| onload      | 浏览器已完成页面的加载       |
| onsubmit    | 表单提交                     |



## JS正则表达式【重点】

### 正则表达式是什么？

> **是描述字串的字串？ 可以用户匹配、查找、替换字符串。**
>
> 官方解释：正则表达式是描述字符模式的对象。
>
> 作用：正则表达式用于对字符串模式匹配及检索替换，是对字符串执行模式匹配的强大工具

语法格式：

> var patt1 = new RegExp('\w')  匹配一个字符类型的字串
>
> var patt2 = new RegExp('\w',i)  匹配一个字符类型的字串
>
> 推荐第二种写法 `var patt = /\w/i`

| 快速看一个字符匹配的例子: 配到任意一个字符，默认只返回第一个匹配到的字符。 |
| ------------------------------------------------------------ |
| ![image-20220718095835962](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207180958174.png) |



### 匹配任意一个字符

并且开启了全局匹配模式，**可以匹配全部能匹配到的字符。**

``` js
var patt = /\w/g;
patt.exec('abcd')
#['a', index: 0, input: 'abcd', groups: undefined]
patt.exec('abcd')
#['b', index: 1, input: 'abcd', groups: undefined]
patt.exec('abcd')
#['c', index: 2, input: 'abcd', groups: undefined]
patt.exec('abcd')
#['d', index: 3, input: 'abcd', groups: undefined]
```



### 匹配非字符

是对`\w`的取反操作，类似的还有 `\d`匹配数字，`\D`匹配非数字。

``` js
var patt = /\W/
patt.exec('123abc def')
#[' ', index: 6, input: '123abc def', groups: undefined]
```



### 匹配数字

匹配任意一个数字，没有使用全局匹配模式，只匹配查找到的第一个字符

``` js
var patt = /\d/
patt.exec('abcd')
# null 返回的结果，没有找到
patt.exec('123')
#['1', index: 0, input: '123', groups: undefined]
patt.exec('123')
#['1', index: 0, input: '123', groups: undefined]
```



### 复杂字串的匹配

``` js
var patt = /\d/
patt.exec('abcd1234f &6')
#['1', index: 4, input: 'abcd1234f &6', groups: undefined]

var patt = /\d/g
# 添加上了全局匹配模式
patt.exec('abcd1234f &6')
# ['1', index: 4, input: 'abcd1234f &6', groups: undefined]
patt.exec('abcd1234f &6')
# ['2', index: 5, input: 'abcd1234f &6', groups: undefined]
patt.exec('abcd1234f &6')
# ['3', index: 6, input: 'abcd1234f &6', groups: undefined]
patt.exec('abcd1234f &6')
# ['4', index: 7, input: 'abcd1234f &6', groups: undefined]
patt.exec('abcd1234f &6')
# ['6', index: 11, input: 'abcd1234f &6', groups: undefined]
```



### 正则修饰符补充

匹配固定字符

``` js
var patt = /a/
patt.exec('abcdAbcda')
# ['a', index: 0, input: 'abcdAbcda', groups: undefined]
patt.exec('abcdAbcda')
# ['a', index: 0, input: 'abcdAbcda', groups: undefined]
```

忽略大小写匹配

``` js
var patt = /a/i

patt.exec('abcdAbcda')
# ['a', index: 0, input: 'abcdAbcda', groups: undefined]
patt.exec('abcdAbcda')
# ['a', index: 0, input: 'abcdAbcda', groups: undefined]

```

全局匹配

``` js
var patt = /a/g

patt.exec('abcdAbcda')
# ['a', index: 0, input: 'abcdAbcda', groups: undefined]
patt.exec('abcdAbcda')
# ['a', index: 8, input: 'abcdAbcda', groups: undefined]

```

忽略大小写全局匹配

``` js
var patt = /a/gi

patt.exec('abcdAbcda')
# ['a', index: 0, input: 'abcdAbcda', groups: undefined]
patt.exec('abcdAbcda')
# ['A', index: 4, input: 'abcdAbcda', groups: undefined]
```

> 上面的演示，我们是在浏览器控制台中操作的，比较直观，简洁
>
> 那么在代码中如何使用呢？？本质是一样的，把控制台代码放到html文件中

### 在js脚本中使用正则

![image-20220718105232964](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181052099.png)

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>正则表达式</title>
    <script>
        var patt = /\d/g;
        var res;
        // 循环获取匹配到的字符
        while ((res = patt.exec('abcd123')) != null) {
            console.log(res);
            console.log(res[0] + '==='+res.index + '===='+res.input);
        }
    </script>
</head>
<body>
</body>
</html>
```

### 量词

> `+` 指定字符至少出现一次【一次或多次】
>
> `*` 指定字符出现0次或多次
>
> ![image-20220718111222343](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181112730.png)

| 特殊符号 | 含义                        |
| -------- | --------------------------- |
| ^n       | 匹配任何开头为 n 的字符串。 |
| n$       | 匹配任何结尾为 n 的字符串。 |

| String对象的正则表达式方法                                   |
| ------------------------------------------------------------ |
| ![image-20220718113801461](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181138639.png) |

> 修饰符：用于执行区分大小写和全局匹配:

| 修饰符 | 描述                                                     |
| ------ | -------------------------------------------------------- |
| i      | 执行对大小写不敏感的匹配。                               |
| g      | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。 |
| m      | 执行多行匹配。                                           |

> 方括号：用于查找某个范围内的字符

| 表达式             | 描述                               |
| ------------------ | ---------------------------------- |
| [abc]              | 查找方括号之间的任何字符。         |
| [^abc]             | 查找任何不在方括号之间的字符。     |
| [0-9]              | 查找任何从 0 至 9 的数字。         |
| [a-z]              | 查找任何从小写 a 到小写 z 的字符。 |
| [A-Z]              | 查找任何从大写 A 到大写 Z 的字符。 |
| [A-z]              | 查找任何从大写 A 到小写 z 的字符。 |
| [adgk]             | 查找给定集合内的任何字符。         |
| [^adgk]            | 查找给定集合外的任何字符。         |
| (red\|blue\|green) | 查找任何指定的选项。               |

> 元字符（Metacharacter）：是拥有特殊含义的字符：

| 元字符 | 描述                                        |
| ------ | ------------------------------------------- |
| .      | 查找单个字符，除了换行和行结束符。          |
| \w     | 查找单词字符。                              |
| \W     | 查找非单词字符。                            |
| \d     | 查找数字。                                  |
| \D     | 查找非数字字符。                            |
| \s     | 查找空白字符。                              |
| \S     | 查找非空白字符。                            |
| \b     | 匹配单词边界。                              |
| \B     | 匹配非单词边界。                            |
| \0     | 查找 NULL 字符。                            |
| \n     | 查找换行符。                                |
| \f     | 查找换页符。                                |
| \r     | 查找回车符。                                |
| \t     | 查找制表符。                                |
| \v     | 查找垂直制表符。                            |
| \xxx   | 查找以八进制数 xxx 规定的字符。             |
| \xdd   | 查找以十六进制数 dd 规定的字符。            |
| \uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |

> 量词：用于表示重复次数的含义

| 量词   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| n+     | 匹配任何包含至少一个 n 的字符串。例如，/a+/ 匹配 "candy" 中的 "a"，"caaaaaaandy" 中所有的 "a"。 |
| n*     | 匹配任何包含零个或多个 n 的字符串。例如，/bo*/ 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"。 |
| n?     | 匹配任何包含零个或一个 n 的字符串。例如，/e?le?/ 匹配 "angel" 中的 "el"，"angle" 中的 "le"。 |
| n{X}   | 匹配包含 X 个 n 的序列的字符串。例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。 |
| n{X,}  | X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。 |
| n{X,Y} | X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。 |
| n{X}   | 前面的模式 n 连续出现X 次时匹配                              |
| n$     | 匹配任何结尾为 n 的字符串。                                  |
| ^n     | 匹配任何开头为 n 的字符串。                                  |
| ?=n    | 匹配任何其后紧接指定字符串 n 的字符串。                      |
| ?!n    | 匹配任何其后没有紧接指定字符串 n 的字符串。                  |

> RegExp 对象方法

| 方法    | 描述                                               |
| ------- | -------------------------------------------------- |
| compile | 编译正则表达式。                                   |
| exec    | 检索字符串中指定的值。返回找到的值，并确定其位置。 |
| test    | 检索字符串中指定的值。返回 true 或 false。         |

> 支持正则表达式的 String 对象的方法

| 方法    | 描述                             |
| ------- | -------------------------------- |
| search  | 检索与正则表达式相匹配的值。     |
| match   | 找到一个或多个正则表达式的匹配。 |
| replace | 替换与正则表达式匹配的子串。     |
| split   | 把字符串分割为字符串数组。       |

> 正则表达式的使用
>
> - test方法：搜索字符串指定的值，根据结果并返回真或假
> - exec() 方法：检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。

## DOM/BOM是什么

> DOM : Document 文档 Object 对象 Model 模型
>
> html > body > div 文档对象模型：可以操作页面元素
>
> BOM: Browser 浏览器  Object 对象 Model 模型
>
> 浏览器对象模型：可以操作浏览器相关的内容：地址栏，历史记录，窗口，滚动条



## 获取DOM元素的三种方式 
### 先找到HTML元素
​	通过ID找到
​	通过class找到
​	通过标签tag`tag:<h1> <img> <span>。。。`找到

| Element返回单个元素  Elements返回一个数组                    |
| ------------------------------------------------------------ |
| ![image-20220718150412718](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181504959.png) |

> JS的执行顺序： 从上到下一行一行执行
>
> innerText/innerHTML **是属性不是方法**，不能使用() 获取和修改值

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM操作</title>
    <script>
        // div 是 null 没有找到元素的时候返回的是null
        var div = document.getElementById('div');

        // 找到id="div1"的元素，并返回
        var div1 = document.getElementById('div1');

        // 找到id="div2"的元素，并返回
        var div2 = document.getElementById('div2');

        // 通过样式类名获取元素，返回的是一个**数组** 获取某个元素可以通过数组的下标
        var clsdiv = document.getElementsByClassName('cls1');

        // 通过name属性获取元素,注意返回的也是数组
        var sex = document.getElementsByName('sex');

        // 通过tag标签名获取元素,注意返回的也是数组
        var span = document.getElementsByTagName('span');
    </script>
</head>
<body>
    <div id="div1" class="cls1">DIV1111</div>
    <div id="div2" class="cls1">DIV222</div>
    <div>DIV333</div>
    <span name="mytext">AAAA</span>
    <input type="text" name="username">
    <input type="text" name="password">
    <hr />
    性别:<input type="radio" name="sex" id="">男  <input type="radio" name="sex" id="">女 
</body>
</html>
```



### 操作HTML元素
​	获取修改：元素本身[创建，修改，删除]

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>innerText&innerHTML</title>
</head>

<body>
    <p id="p1">修改之前的文字</p>

    <p id="p2">
        <font color="red">修改之前的文字</font>
    </p>

    <p id="p3">修改之前的文字</p>

    <script>
        // 通过ID找到p
        var p1 = document.getElementById('p1');
        // 获取元素的文本内容
        console.log('p1-text:' + p1.innerText);
        console.log('p1-html:' + p1.innerHTML);
        // 要特别注意下，JS的执行顺序问题

        var p2 = document.getElementById('p2');
        console.log('p2-text:' + p2.innerText);
        console.log('p2-html:' + p2.innerHTML);

        var p3 = document.getElementById('p3');
        p3.innerText='修改之后的文字';

    </script>
</body>

</html>
```



​	JS修改元素属性，演示点击按钮修改图片地址

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>切换切换</title>
</head>
<body>
    <img src="https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207102019258.png" alt="">
    <button id="btn" onclick="changeImg()">切换图片</button>

    <script>
        function changeImg() {
            var img = document.getElementsByTagName('img')[0];
            img.src='http://124.223.190.53:90/images/logo.png';
            img.width = '200';
            img.height = '200';
        }
    </script>
</body>
</html>
```



​	JS修改元素的样式

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS操作</title>
</head>

<body>
    <div id="div1">这里的一个DIV</div>
    <button onclick="changeCss()">点我</button>
    <script>
        function changeCss() {
            var div1 = document.getElementById('div1');
            div1.style.width = '200px';
            div1.style.height = '200px';
            div1.style.backgroundColor = 'red';
            div1.style.border = 'dotted blue 10px';
        }
    </script>
</body>

</html>
```

> 注意：
>
> 之前元素的css样式中有中划线的`-`,在JS操作样式时全都要换成驼峰名字,比如下面的属性

| CSS样式名称      | JS中样式名称    |
| ---------------- | --------------- |
| background-color | backgroundColor |
| font-size        | fontSize        |



## 事件监听

### 添加事件监听

> EventListener: 事件监听
>
> HTML元素中都有一个添加事件监听的方法，addEventListener()
>
> 他的作用是：给元素绑定一个指定的事件处理函数，触发元素对应的事件时，会回调处理函数。
>
> 语法： 元素对象.addEventListener(事件名称，处理函数)，其实还有第三个参数，事件冒泡
>
> 事件名称：比如 click mouseover mouseout resize keyup keydown。。
>
> 处理函数：可以是命名函数，也可以是匿名函数

![image-20220718171056833](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181710122.png)

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件监听</title>
</head>

<body>
    <div id="div1">div的内容</div>
    <div id="div2">div2的内容</div>

    <script>
        // 找到div这个元素
        var div1 = document.getElementById('div1');
        var div2 = document.getElementById('div2');

        // 给div1添加点击的事件监听
        div1.addEventListener('click', changeCss);
        div2.addEventListener('mouseover', changeCss);
        div2.addEventListener('mouseout', changeCss2);

        // 使用命名函数，我们可以通过参数接收事件对象
        function changeCss(event) {
            // 获取到触发这个事件的对象 event.target
            var t = event.target;
            t.style.color = 'red';
            t.style.fontSize = '30px';
        }

        function changeCss2(event) {
            event.target.style.color='blue';
        }

    </script>
</body>

</html>
```



### 冒泡和捕获

> 事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181713798.webp)

1-5是捕获过程，5-6是目标阶段，6-10是冒泡阶段；

注意看这里的红色箭头，标识执行顺序！

![image-20220718172351287](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207181723482.png)

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件冒泡和事件捕获</title>
</head>

<body>
    <div id="div1">
        div的内容
        <p id="p1">P段落标签的内容</p>
    </div>

    <script>
        // 1、找元素
        var div1 = document.getElementById('div1');
        var p1 = document.getElementById('p1');
        // 2、添加事件监听，第三个参数默认是false冒泡阶段执行，如果改为true就是事件捕获阶段执行
        div1.addEventListener('click',showMsg,false);
        p1.addEventListener('click',showMsg2,true);

        function showMsg(event) {
            alert('div1触发点击事件');
        }

        function showMsg2(event) {
            alert('p1触发点击事件');
        }

    </script>
</body>

</html>
```

### 移除事件监听

> removeEventListener() 方法移除由 addEventListener() 方法添加的事件句柄:

``` js
element.removeEventListener("mousemove", myFunction);
```



## 操作元素

### 创建元素

> document.createElement('标签名')  创建一个新的元素

### 追加元素

> 1、 先找到父元素
>
> 2、把第一步创建的元素追加到父元素内部 appendChild()

### 删除元素

> 1、先找到父元素
>
> 2、带哦用父元素的 removeChild(子元素对象)

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>元素创建和删除</title>
</head>
<body>
    <div id="div1"></div>

    <button onclick="removeP()">删除P段落</button>

    <script>
        // 1、创建元素
        var p = document.createElement('p');
        var text = document.createTextNode('新的段落内容文字');
        // 2、追加元素
        p.appendChild(text);
        // 3、把p标签追加到div内
        var div1 = document.getElementById('div1');
        div1.appendChild(p);


        // 删除元素的函数
        function removeP() {
            div1.removeChild(p);
        }

    </script>
</body>
</html>
```





## 浏览器BOM

> 全局函数，变量都是window的对象，**window可以省略**
>
> 比如： alert()   window.alert()
>
> parseInt()  window.parseInt()



### window的尺寸

> 浏览器**窗口宽高**
>
> innerHeight：高度
> 681
> innerWidth：宽度
> 648



> document.body.clientHeight  : 获取页面内容的高度
>
> document.body.clientWidth：获取页面内容的宽度



### Window Screen

> 屏幕宽高
>
> ```javascript
> document.write("可用宽度: " + screen.availWidth);
> document.write("可用高度: " + screen.availHeight);
> ```



### Window Location

> 浏览器**地址栏**
>
> window.location.assign("http://www.baidu.com/") 手动设置地址栏地址，并自动跳转

![image-20220719095312532](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207190953793.png)



### Window History

> 浏览器历史记录
>
> window.history.forward()  前进
>
> window.history.back()  后退
>
> window.history.go(数字)  数字：如果是正的，就是前进几步，如果是负值，就是后退几步
>
> - window.history.go(1) 前进一步



### Window Navigator

> 浏览器信息：名称、版本、代号等

``` html
<div id="example"></div>
<script>
    txt = "<p>浏览器代号: " + navigator.appCodeName + "</p>";
    txt+= "<p>浏览器名称: " + navigator.appName + "</p>";
    txt+= "<p>浏览器版本: " + navigator.appVersion + "</p>";
    txt+= "<p>启用Cookies: " + navigator.cookieEnabled + "</p>";
    txt+= "<p>硬件平台: " + navigator.platform + "</p>";
    txt+= "<p>用户代理: " + navigator.userAgent + "</p>";
    txt+= "<p>用户代理语言: " + navigator.language + "</p>";
    document.getElementById("example").innerHTML=txt;
</script> 
```



## JavaScript定时器

### 定义定时器

> 固定时间间隔，周期执行的 setInterval(函数,时间)
>
> 函数： 做什么事情
>
> 时间：固定的时间间隔，比如每秒都做什么事情 1000 毫秒单位

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>定时器</title>
</head>

<body>
    <h1>每隔一秒中到页面上追加一个p段落</h1>
    <h1 id="now">系统时间</h1>

    <script>

        /* function createP() {
            // 1、创建一个p段落标签
            var p = document.createElement('p');
            var text = document.createTextNode('p段落p段落p段落p段落');
            p.appendChild(text);
            document.body.appendChild(p);
        }

        setInterval(createP, 1000); */

        var now = document.getElementById('now');
        
        // 更新系统时间
        setInterval(() => {
            now.innerText = new Date().toLocaleString();
        }, 1000);
    </script>
</body>

</html>
```



> 固定时间之后，执行一次的

```  html
<body>
    <h1 id="now">系统时间</h1>
    <script>
        // 演示3秒钟后 只执行一次的定时器
        setTimeout(() => {
            document.getElementById('now').innerText = new Date().toLocaleString();
        }, 3000);
    </script>
</body>
```



### 关闭定时器

> setInterval：设置固定时间间隔周期执行的定时器
>
> clearInterval：清除定时器的
>
> setTimeout：固定时间之后 只执行一次的定时器
>
> clearTimeout：清除定时器

语法：设置定时器时会有个返回值，这个返回值表示定时器对象，clearInterval需要传入定时器对象。

var timer = setInterval(函数，时间);

clearInterval(timer)

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>清除定时器</title>
</head>

<body>
    <h1 id="now">系统时间</h1>
    <button id="btn">清除定时器</button>
    <script>
        var now = document.getElementById('now');
        // 更新系统时间
        var timer = setInterval(() => {
            now.innerText = new Date().toLocaleString();
        }, 1000);
        // 点击按钮清除定时器
        var btn = document.getElementById('btn');
        btn.onclick = ()=>{
            // 需要传入定时器的名字
            clearInterval(timer);
        }
    </script>
</body>
</html>
```


































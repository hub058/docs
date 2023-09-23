---
title: 实操练习题925
---



## 题目一

1、在页面中实现一个a标签效果，文字内容为“跳转至百度”，点击之后能够在当前页面跳转到百度首页。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<a href="http://www.baidu.com">跳转至百度</a>

</body>
</html>
```





## 题目二

2、在网页中实现一个宽为500px高为500px的红色矩形，通过添加:hover伪类，当鼠标移入这个矩形后变为绿色



鼠标移入前：![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221942929.jpg)鼠标移入后：![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221942939.jpg)                      

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }

    .box1{
      width: 500px;
      height: 500px;
      background-color: red;
    }
    .box1:hover{
      background-color: green;
    }
    
  </style>
</head>
<body>

<div class="box1"></div>

</body>
</html>
```



## 题目三

3、在网页中实现一个宽为500px高为200px的div，黑色边框宽为2px，里面有三个宽为100px高为100px的div，分别是红黄蓝三个颜色，通过使用flex布局，使这三个元素右对齐，并且垂直方向居中排列，如下图所示：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221942937.jpg)

 ``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    
    .box2{
      width: 500px;
      height: 200px;
      border: 2px solid #000;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .box2 div{
      width: 100px;
      height: 100px;
    }
    .box2 div:nth-child(1){
      background-color: red;
    }
    .box2 div:nth-child(2){
      background-color: yellow;
    }
    .box2 div:nth-child(3){
      background-color: blue;
    }
    
  </style>
</head>
<body>

<div class="box2">
  <div></div>
  <div></div>
  <div></div>
</div>

</body>
</html>
 ```



## 题目四

4、在网页中实现一个宽为500px的div，黑色边框宽为2px，里面的内容超出第三行时出现省略号，内容可以自己随意写。如下图所示：



![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221942944.jpg)

社会主义的根本任务是解放和发展社会生产力坚持发展中国特色社会主义必须坚持以经济建设为中心。实施科教兴国战略、人才强国战略和可持续发展战略。科学技术是第一生产力。提高自主创新能力，建设创新型国家是国家发展战略的核心。这一理论丰富和发展了马克思主义关于社会主义历史任务的思想。

 ``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    
    .box3{
      width: 500px;
      border: 2px solid #000;
      display:-webkit-box;
      -webkit-box-orient:vertical;/*设置方向*/
      -webkit-line-clamp:3;/*设置超过为省略号的行数*/
      overflow:hidden;
    }
    
  </style>
</head>
<body>

<div class="box3">
  社会主义的根本任务是解放和发展社会生产力坚持发展中国特色社会主义必须坚持以经济建设为中心。实施科教兴国战略、人才强国战略和可持续发展战略。科学技术是第一生产力。提高自主创新能力，建设创新型国家是国家发展战略的核心。这一理论丰富和发展了马克思主义关于社会主义历史任务的思想。
</div>

</body>
</html>
 ```



## 题目五

5、在网页中实现一个矩形宽500px，高度300px，边框5px。 在矩形的四个角各有一个1/4的圆行，圆的位置使用定位来实现，半径为100px。

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221942940.jpg)

 ``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    
    .box4{
      width: 500px;
      height: 300px;
      border: 5px solid #000;
      position: relative;
      overflow: hidden;
    }
    .box4 div{
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: #000;
      position: absolute;
    }
    .box4 div:nth-child(1){
      top: -100px;
      left: -100px;
    }
    .box4 div:nth-child(2){
      top: -100px;
      right: -100px;
    }
    .box4 div:nth-child(3){
      bottom: -100px;
      left: -100px;
    }
    .box4 div:nth-child(4){
      bottom: -100px;
      right: -100px;
    }
  </style>
</head>
<body>

<div class="box4">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

</body>
</html>
 ```



## 简答题

一、SQL Server2000执行远程安装时，本地计算机和远程计算机必须满足的条件有哪些

> 1)  确保本地和远程计算机都在运行Microsoft Windows NT或Windows 2000.
>
> 2) 确保本地和远程计算机都有Intel兼容处理器。
>
> 3) 确保本地计算机登录的账号对远程计算机拥有管理员级别的管理权限。



---

二、描绘用例图

![image-20220922195047846](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221950921.png)



三、用例分析法的概念

> 用例分析法是来自面向对象的分析方法。用例描述系统的用户和系统本身之间
>
> 有可用 的交互过程，对如何使用系统提供了一种详细的陈述。用例分析是获取系统功能需 求的一个重要技术。



四、编程

1、 //programme name Helloworld.java

``` java
public class Helloworld {

  public static void main(String args[]) {

   System.out.print ("世界，你好！" );

  }

}
```

2、// programme name ForTest.java

``` java
public class ForTest {
	public static void main( String args[] ) {
		int  i,j,mul,sum=0;
		for(i=1;i<=10;i++) {
			mul=1;
		for(j=1;j<=i;j++) {
			mul=mul*j;
		}
		sum=sum+mul;
		}
		System.out.println("1！+2！+3！+……+10！= "+sum);
		}
}
```



 五、系统测试的目标

> (1)确保系统测试的活动是按计划进行的。
>
> (2)验证软件产品是否与系统需求用例不相符合或与之矛盾。
>
> (3)建立完善的系统测试缺陷记录跟踪库。
>
> (4)确保软件系统测试活动及其结果及时通知相关小组和个人。



六、以图书馆管理系统的部分需求分析为例，来说明系统的模块划分有哪些

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202209221942405.gif)



七、C#中对CHM文件的调用方法有哪些？

1.方法一

`System. Diagnostics. Process.Start("帮助文件路径");`

2.方法二

通过.Net Framework 提供的 Help 类来完成CHM 帮助文件的调用， `Namespace:System.Windows. Forms`。

 
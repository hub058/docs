---
title: MySQL练习题
---

## SQL练习作业

``` tex
SQL练习作业
1、查询员工姓名的最后三个字母
2、查询部门60中的所有员工
3、列出所有员工的姓名,编号和部门编号
4、找出提成高于薪金的员工
5、求出每个员工的年薪
6、找出佣金高于薪金的60%的员工
7、找出早于2000年前受雇的员工
8、以首字母大写的方式显示所有员工的姓名
9、显示不带有"R"的员工的姓名
10、显示所有员工的姓名的前三个字符
11、显示所有员工的姓名,用"a"代替所有的"A"
12、显示员工详细信息,按姓名排序
13、显示员工的姓名和受雇日期,根据其服务年限,将最老的员工排在前面
14、显示所有员工的姓名,工作和薪金,按工作的降序排序,若工作相同则薪金排序
15、显示所有员工的姓名,加入公司的年份和月份,按受雇日期所在月排序,若月份相同则将最早年份的员工排在前面
```




## 1、查询员工姓名的最后三个字母
``` sql
SELECT `FIRST_NAME`,RIGHT(`FIRST_NAME`,3) FROM `t_employees`
SELECT `FIRST_NAME`,SUBSTRING(`FIRST_NAME`,-3,3) FROM `t_employees`
```

## 2、查询部门60中的所有员工
``` sql
SELECT * FROM `t_employees` WHERE `DEPARTMENT_ID`=60
```
## 3、列出所有员工的姓名,编号和部门编号
``` sql
SELECT `FIRST_NAME`,`EMPLOYEE_ID`,`DEPARTMENT_ID` FROM `t_employees` 
```
## 4、找出提成高于薪金的员工
``` sql
SELECT * FROM `t_employees` WHERE `COMMISSION_PCT`>1
```
## 5、求出每个员工的年薪
``` sql
SELECT `SALARY`*12 年薪 FROM `t_employees`
```
## 6、找出提成高于薪金的60%的员工
``` sql
SELECT * FROM `t_employees` WHERE `COMMISSION_PCT`>0.6
```
## 7、找出早于2000年前【2000年前】受雇的员工
``` sql
SELECT * FROM `t_employees` WHERE YEAR(`HIRE_DATE`)<2000
```
## 8、以首字母大写的方式显示所有员工的姓名

> MySQL中没有单个函数仅将字符串的首字母大写
> 
``` sql
SELECT CONCAT(UPPER(SUBSTRING(`FIRST_NAME`,1,1)),SUBSTRING(`FIRST_NAME`,2)) FROM `t_employees`
```
## 9、显示不带有"R"的员工的姓名
``` sql
SELECT * FROM `t_employees` WHERE `FIRST_NAME` NOT LIKE('%R%')
```
## 10、显示所有员工的姓名的前三个字符
``` sql
SELECT SUBSTRING(`FIRST_NAME`,1,3) FROM `t_employees`
SELECT LEFT(`FIRST_NAME`,3) FROM `t_employees`
```
## 11、显示所有员工的姓名,用"a"代替所有的"A"
``` sql
SELECT `FIRST_NAME`,REPLACE(`FIRST_NAME`,'A','a') FROM `t_employees` 
```
## 12、显示员工详细信息,按姓名排序
``` sql
SELECT * FROM `t_employees` ORDER BY `FIRST_NAME`
```
## 13、显示员工的姓名和受雇日期,根据其服务年限,将最老的员工排在前面
``` sql
SELECT `FIRST_NAME`,`HIRE_DATE` FROM `t_employees` ORDER BY `HIRE_DATE`
```
## 14、显示所有员工的姓名,岗位和薪金,按岗位的降序排序,若工作相同则薪金排序
``` sql
SELECT `FIRST_NAME`,`JOB_ID`,`SALARY` 
FROM `t_employees`
ORDER BY `JOB_ID` DESC,`SALARY` 
-- 同时查询岗位名称的
SELECT e.`FIRST_NAME`,e.`JOB_ID`,j.`JOB_TITLE`,e.`SALARY` 
FROM `t_employees` e
INNER JOIN `t_jobs` j
ON e.job_id=j.job_id
ORDER BY `JOB_ID` DESC,`SALARY` 
```
## 15、显示所有员工的姓名,加入公司的年份和月份
## 按受雇日期所在月排序,若月份相同则将最早年份的员工排在前面
``` sql
SELECT `FIRST_NAME` 姓名,`HIRE_DATE` 雇佣日期,YEAR(`HIRE_DATE`) 年份,MONTH(`HIRE_DATE`) 月份
FROM `t_employees`
ORDER BY MONTH(`HIRE_DATE`),YEAR(`HIRE_DATE`)
```
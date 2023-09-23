---
title: 评论服务

---

[TOC]

# 0、前言

用户输入的内容，需要进行审核，防止用户输入违规内容（涉恐、涉政、色情、暴力等）

文本审核：对文本内容进行内容审核，查看是否合规



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207012258262.png)



图片审核：鉴别，图片的合法性



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207012258794.png)



基于百度的AI接口实现文本审核和图片审核

1.开通账号，添加应用

https://cloud.baidu.com/doc/ANTIPORN/s/hk3h6xdbp



AppID:17540802

AppKey:wKE4Iuyd383Wld3GXCKCGNF7

AppSec:cUDtMt9n5Ur4xoQRKiLizW5flGLS15AZ



2.查阅文档，编写代码

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207012258338.png)

1.依赖jar

``` xml
<dependency>
    <groupId>com.baidu.aip</groupId>
    <artifactId>java-sdk</artifactId>
    <version>4.16.6</version>
</dependency>
```

2.编写代码

``` java
public class BaiduContentCensor {
    public static final String APP_ID = "17540802";
    public static final String API_KEY = "wKE4Iuyd383Wld3GXCKCGNF7";
    public static final String SECRET_KEY = "cUDtMt9n5Ur4xoQRKiLizW5flGLS15AZ";

    private AipContentCensor client;
    private BaiduContentCensor(){
        client = new AipContentCensor(APP_ID, API_KEY, SECRET_KEY);
        // 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);
    }
    private static class BaiduContentSignle{
        public static BaiduContentCensor contentCensor=new BaiduContentCensor();
    }
    public static BaiduContentCensor getInstance(){
        return BaiduContentSignle.contentCensor;
    }
    /**
     * 文本内容审核*/
    public boolean censorText(String msg){
        JSONObject response=client.textCensorUserDefined(msg);
        int r=response.getInt("conclusionType");
        return r==1;
    }
    /**
     * 图片审核*/
    public boolean censorImg(byte[] data){
        JSONObject response=client.imageCensorUserDefined(data,null);
        int r=response.getInt("conclusionType");
        return r==1;
    }
}
```

3.测试

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207012258831.png)



# 一、需求 

实现系统的评价业务，用户对订单进行评价

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207012258630.png)





# 二、分析 

梳理需求，明白需要要干什么

接口列表：

1.评价接口

2.追加评价接口

3.查询我的评价

难点：

1.流程（1.校验 2.内容 3.奖励 4.自动好评）

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202207012258641.png)



2.数据库设计



会员生日提醒：定时任务（每日早上7点）

自动好评：定时任务（每日1点）



## 三、定时任务

1、启动类增加注解，作用是启用定时任务，Spring默认自动装配了定时任务组件

```  xml
@EnableScheduling
```

2、使用定时任务

```  java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AutoCommentTask {

    @Scheduled(cron = "*/5 * * * * ?")
    public void handler(){
        System.out.println("开始每日自动评价检查");

        System.out.println("开始每日自动评价结束");
    }
}
```

3、Cron表达式

```text
> cron表达式格式：
>
> 秒数 分钟 小时 日期 月份 星期 年份(可为空)
>
> 例  "0 0 12 ? * WED" 在每星期三下午12:00 执行（年份通常 省略）
```


```shell
### 每个字段的允许值
字段 允许值 允许的特殊字符 
秒 0-59 , - * / 
分 0-59 , - * / 
小时 0-23 , - * / 
日期 1-31 , - * ? / L W C 
月份 1-12 或者 JAN-DEC , - * / 
星期 1-7 或者 SUN-SAT , - * ? / L C # 
年（可选） 留空, 1970-2099 , - * / 
```

示例

```  shell
*/5 * * * * ? 每隔5秒执行一次
0 */1 * * * ? 每隔1分钟执行一次
0 0 5-15 * * ? 每天5-15点整点触发
0 0/3 * * * ? 每三分钟触发一次
0 0-5 14 * * ? 在每天下午2点到下午2:05期间的每1分钟触发 
0 0/5 14 * * ? 在每天下午2点到下午2:55期间的每5分钟触发
0 0/5 14,18 * * ? 在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发
0 0/30 9-17 * * ? 朝九晚五工作时间内每半小时
0 0 10,14,16 * * ? 每天上午10点，下午2点，4点 

0 0 12 ? * WED 表示每个星期三中午12点
0 0 17 ? * TUES,THUR,SAT 每周二、四、六下午五点
0 10,44 14 ? 3 WED 每年三月的星期三的下午2:10和2:44触发 
0 15 10 ? * MON-FRI 周一至周五的上午10:15触发
0 0 23 L * ? 每月最后一天23点执行一次
0 15 10 L * ? 每月最后一日的上午10:15触发 
0 15 10 ? * 6L 每月的最后一个星期五上午10:15触发 
0 15 10 * * ? 2005 2005年的每天上午10:15触发 
0 15 10 ? * 6L 2002-2005 2002年至2005年的每月的最后一个星期五上午10:15触发 
0 15 10 ? * 6#3 每月的第三个星期五上午10:15触发


"30 * * * * ?" 每半分钟触发任务
"30 10 * * * ?" 每小时的10分30秒触发任务
"30 10 1 * * ?" 每天1点10分30秒触发任务
"30 10 1 20 * ?" 每月20号1点10分30秒触发任务
"30 10 1 20 10 ? *" 每年10月20号1点10分30秒触发任务
"30 10 1 20 10 ? 2011" 2011年10月20号1点10分30秒触发任务
"30 10 1 ? 10 * 2011" 2011年10月每天1点10分30秒触发任务
"30 10 1 ? 10 SUN 2011" 2011年10月每周日1点10分30秒触发任务
"15,30,45 * * * * ?" 每15秒，30秒，45秒时触发任务
"15-45 * * * * ?" 15到45秒内，每秒都触发任务
"15/5 * * * * ?" 每分钟的每15秒开始触发，每隔5秒触发一次
"15-30/5 * * * * ?" 每分钟的15秒到30秒之间开始触发，每隔5秒触发一次
"0 0/3 * * * ?" 每小时的第0分0秒开始，每三分钟触发一次
"0 15 10 ? * MON-FRI" 星期一到星期五的10点15分0秒触发任务
"0 15 10 L * ?" 每个月最后一天的10点15分0秒触发任务
"0 15 10 LW * ?" 每个月最后一个工作日的10点15分0秒触发任务
"0 15 10 ? * 5L" 每个月最后一个星期四的10点15分0秒触发任务
"0 15 10 ? * 5#3" 每个月第三周的星期四的10点15分0秒触发任务
```

4、表达式生成器

http://cron.qqe2.com/





## 四、设计 

数据库设计：

1.订单评价表 

2.商品评价表

``` sql
CREATE TABLE t_ordercomment(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
    oid INT    COMMENT '订单ID' ,
    rate INT    COMMENT '评分' ,
    lrate INT    COMMENT '物流评分' ,
    ctime DATETIME    COMMENT '创建时间' ,
    PRIMARY KEY (id)
)  COMMENT = '订单评价表';

CREATE TABLE t_goodscomment(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
    rate INT    COMMENT '评分' ,
    ocid INT    COMMENT '订单评价ID' ,
    content VARCHAR(255)    COMMENT '评价内容' ,
    score INT    COMMENT '积分' ,
    ctime DATETIME    COMMENT '创建时间' ,
    pid INT    COMMENT '上级ID' ,
    sid INT    COMMENT '商家id' ,
    type INT    COMMENT '类型' ,
    uid INT    COMMENT '用户ID' ,
    PRIMARY KEY (id)
)  COMMENT = '商品评价信息';

```

## 五、编码 



``` java
@Service
public class OrderCommentserviceImpl implements OrderCommentservice {
    @Resource
    private OrderCommentDao dao;
    @Resource
    private GoodsCommentDao goodsCommentDao;
    @Resource
    private NetWorkProvider workProvider;
    @Resource
    private OrderProvider orderProvider;
    @Resource
    private RabbitTemplate rabbitTemplate;

    private int oid=0;
    private OrderComment comment=null;
    //用户新增评价
    @Override
    @Transactional
    @GlobalTransactional//分布式事务
    public R save(CommentAddDto dto,int uid) {
        //1.查询
        OrderDetailDto detailDto=orderProvider.queryById(dto.getOid());
        if(detailDto!=null && detailDto.getStatus()== OrderFlag.已确认.getCode()) {
            //允许评价
            //2.文本审核
            if(workProvider.consorText(dto.getContent())){
                //3.生成信息
                OrderComment comment=new OrderComment(dto.getOid(),dto.getRate1(),dto.getRate2());

                //4.数据更改
                if(dao.insert(comment)>0){
                    //5.远程服务-订单
                    orderProvider.updateFalg(detailDto.getOid(),OrderFlag.已评价.getCode());
                    int s=(int)(detailDto.getPrice()*detailDto.getNum());
                    //6.奖励-MQ 积分-1元=1积分(1分钱)
                    rabbitTemplate.convertAndSend("", RabbitMQConstConfig.Q_USERSCORE,new MqMsgBo(SnowFlowUtil.getInstance().nextId(), RabbitMQConstConfig.MQTYPE_ORDERCOMMENT,
                            new UserMqBo(uid,s,SystemConfig.SCORETYPE_ORDERCOMMENT,dto.getIp(),dto.getDecive())));

                    //7.其他数据
                    GoodsComment goodsComment=new GoodsComment(dto.getRate3(),comment.getId(),dto.getContent(),s,0,0,SystemConfig.COMMENT_TYPE_ADD,uid);
                    //8.返回
                    return RUtil.ok();
                }
            }
        }
        return RUtil.fail();
    }

    @Override
    @Transactional
    @GlobalTransactional
    public R autoSave() {
        //每日定时任务 检查是否需要自动评价
        //1.查询需要自动评价的订单信息
        List<OrderItemCommentDto> list=orderProvider.queryAuto();
        //2.遍历，实现自动好评  量多->批处理-->线程池 分担压力
        list.forEach(dto->{
            if(oid!=dto.getId()){
                oid=dto.getId();
                comment=new OrderComment(dto.getId(),5,5);
                //新增订单评价到数据库
                if(dao.insert(comment)>0){
                    //操作远程服务 更改订单状态
                    orderProvider.updateFalg(dto.getId(),OrderFlag.已评价.getCode());
                    //订单流水日志

                }
            }
            //新增订单商品评价
            GoodsComment goodsComment=new GoodsComment(5,comment.getId(),"系统自动评价",0,0,0,SystemConfig.COMMENT_TYPE_AUTOADD,
                    dto.getUid());
            goodsCommentDao.insert(goodsComment);
        });

        return RUtil.ok();
    }
}
```

## 六、测试 
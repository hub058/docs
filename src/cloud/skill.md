---
title: 秒杀服务
---

## 0、前言 

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455230.png)



 **0.1 秒杀的难点** 

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455608.png)



友好的用户体验

用户不能接受破窗的体验，例如：系统超时、系统错误的提示，或者直接 404 页面

瞬时高并发流量的挑战

木桶短板理论，整个系统的瓶颈往往都在 DB，如何设计出高并发、高可用系统

 **0.2 漏斗型实现** 

漏斗型业务，指的是，用户的请求，从客户端到 db 层，层层递减，递减的程度视业务而定。例如当 10w 人去抢 1 个物品时，db 层的请求在个位数量级，这就是比较理想的模型。如下图所示



![1111.jpeg](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455974.jpeg)



![222.jpeg](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455272.jpeg)



 **0.3 不同层次的设计理念** 

**产品设计**

轻重逻辑分离，以秒杀为例，将抢到和到账分开；

抢到，是比较轻的操作，库存扣成功后，就可以成功了

到账，是比较重的操作，需要涉及到到事务操作

用户分流，以整点秒杀活动为例，在 1 分钟内，陆续对用户放开入口，将所有用户请求打散在 60s 内，请求就可以降一个数量级

页面简化，在秒杀开始的时候，需要简化页面展示，该时刻只保留和秒杀相关的功能。例如，秒杀开始的时候，页面可以不展示推荐的商品。

**客户端**

重试策略非常关键，如果用户秒杀失败了，频繁重试，会加剧后端的雪崩。如何重试呢？根据后端返回码的约定，有两种方法：

不允许重试错误，此时 ui 和文案都需要有一个提示。同时不允许重试

可重试错误，需要策略重试，例如二进制退避法。同时文案和 ui 需要提示。

ui 和文案，秒杀开始前后，用户的所有异常都需要有精心设计的 ui 和文案提示。例如：【当前活动太火爆，请稍后再重试】【你的货物堵在路上，请稍后查看】等

前端随机丢弃请求可以作为降级方案，当用户流量远远大于系统容量时，人工下发随机丢弃标记，用户本地客户端开始随机丢弃请求。

**接入层**

所有请求需要鉴权，校验合法身份

如果是长链接的服务，鉴权粒度可以在 session 级别；如果是短链接业务，需要应对这种高并发流量，例如 cache 等

根据后端系统容量，需要一个全局的限流功能，通常有两种做法：

设置好 N 后，动态获取机器部署情况 M，然后下发单机限流值 N/M。要求请求均匀访问，部署机器统一。

维护全局 key，以时间戳建 key。有热 key 问题，可以通过增加更细粒度的 key 或者定时更新 key 的方法。

对于单用户/单 ip 需要频控，主要是防黑产和恶意用户。如果秒杀是有条件的，例如需要完成 xxx 任务，解锁资格，对于获得资格的步骤，可以进行安全扫描，识别出黑产和恶意用户。

**逻辑层**

逻辑层首先应该进入校验逻辑，例如参数的合法性，是否有资格，如果失败的用户，快速返回，避免请求洞穿到 db。

异步补单，对于已经扣除秒杀资格的用户，如果发货失败后，通常的两种做法是：

事务回滚，回滚本次行为，提示用户重试。这个代价特别大，而且用户重试和前面的重试策略结合的话，用户体验也不大流畅。

异步重做，记录本次用户的 log，提示用户【稍后查看，正在发货中】，后台在峰值过后，启动异步补单。需要服务支持幂等

对于发货的库存，需要处理热 key。通常的做法是，维护多个 key，每个用户固定去某个查询库存。对于大量人抢红包的场景，可以提前分配

**存储层**

对于业务模型而言，对于 db 的要求需要保证几个原则：

可靠性

主备：主备能互相切换，一般要求在同城跨机房

异地容灾：当一地异常，数据能恢复，异地能选主

数据需要持久化到磁盘，或者更冷的设备

一致性

对于秒杀而言，需要严格的一致性，一般要求主备严格的一致。

## 一、秒杀需求 

实现一个秒杀的业务，可以是秒杀热门、特卖的商品、也可以是秒杀稀缺物品、也可以是秒杀一个资格、也可以是秒杀一个红包等等。

秒杀是一种常见的营销手段，商品以极低的价格，在特定的时间点开售，引发大量的用户抢购，制造轰动效应。活动时间短，并发流量极高，对网站的其他业务形成冲击。

## 二、秒杀分析 

### 2.1 难点分析 

**秒杀页面静态化--Freemarker**

将商品的描述、参数、成交记录、图像、评价等全部写入到一个静态页面，用户请求不需要通过访问后端服务器，不需要经过数据库，直接在前台客户端生成，这样可以最大可能的减少服务器的压力。

**接口限流--RateLimter实现令牌桶**

接口限流的策略有很多，我们这里采用令牌桶算法，guava提供了RateLimter

**redis预减库存--Redis**

很多请求进来，都需要后台查询库存,这是一个频繁读的场景。可以使用redis来预减库存，在秒杀开始前可以在redis设值

**异步下单---RabbitMQ**

为了提升下单的效率，并且防止下单服务的失败。需要将下单这一操作进行异步处理。最常采用的办法是使用队列，队列最显著的三个优点：异步、削峰、解耦

**秒杀接口动态化---动态加密+Redis有效期**

为了避免有程序访问经验的人通过下单页面url直接访问后台接口来秒杀货品，我们需要将秒杀的url实现动态化，即使是开发整个系统的人都无法在秒杀开始前知道秒杀的url。

### 2.2 秒杀相关接口 

秒杀活动：创建 审核 查询-列表 查询倒计时

秒杀商品：创建 上架-静态化 列表 详情 查询下单接口-动态化

秒杀订单：下单 查询 超时

## 三、秒杀设计 

数据：

T_SKILLACTIVITY[秒杀活动表]

T_SKILLGOODS[秒杀商品表]

T_SKILLORDER[秒杀订单表]

T_SKILLORDERLOG[秒杀订单流水表]

T_SKILLOG[秒杀记录表]

```  sql

CREATE TABLE t_skillactivity(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
    title VARCHAR(255)    COMMENT '名称' ,
    info VARCHAR(255)    COMMENT '描述' ,
    picurl VARCHAR(500)    COMMENT '活动图片' ,
    stime DATETIME    COMMENT '开始时间' ,
    etime DATETIME    COMMENT '结束时间' ,
    flag INT    COMMENT '状态' ,
    ctime DATETIME    COMMENT '创建时间' ,
    maxcount INT    COMMENT '最大购买量' ,
    PRIMARY KEY (id)
)  COMMENT = '17.秒杀活动表';


CREATE TABLE t_skillgoods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
    title VARCHAR(90)    COMMENT '名称' ,
    picurl VARCHAR(500)    COMMENT '图片地址' ,
    info VARCHAR(900)    COMMENT '描述信息' ,
    price DECIMAL(24,6)    COMMENT '原价' ,
    currprice DECIMAL(24,6)    COMMENT '现价' ,
    stock INT    COMMENT '库存' ,
    flag INT    COMMENT '状态' ,
    item_id INT    COMMENT '商品类型' ,
    ctime DATETIME    COMMENT '创建时间' ,
    said int comment '秒杀活动id',
    htmlurl varchar(100) comment '静态化页面路径',
    PRIMARY KEY (id)
)  COMMENT = '18.秒杀商品表';

CREATE TABLE t_skillorder(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
  no VARCHAR(32)    COMMENT '订单号' ,
  sgid INT    COMMENT '商品id' ,
  price DECIMAL(24,6)    COMMENT '价格' ,
  num INT    COMMENT '数量' ,
  flag INT    COMMENT '状态' ,
  ctime DATETIME    COMMENT '创建时间' ,
  utime DATETIME    COMMENT '更新时间' ,
  uaid INT    COMMENT '收货地址' ,
  uid INT    COMMENT '用户id' ,
  PRIMARY KEY (id)
)  COMMENT = '19.秒杀订单表';

CREATE TABLE t_skillorderlog(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
  oid INT    COMMENT '秒杀订单id' ,
  type INT    COMMENT '状态' ,
  info VARCHAR(255)    COMMENT '备注信息' ,
  ctime DATETIME    COMMENT '更新时间' ,
  PRIMARY KEY (id)
)  COMMENT = '20.秒杀订单流水表';

CREATE TABLE t_skilllog(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键' ,
  uid INT    COMMENT '用户id' ,
  sgid INT    COMMENT '秒杀商品ID' ,
  status VARCHAR(1)    COMMENT '秒杀结果 1.成功 2.失败' ,
  ctime DATETIME    COMMENT '创建时间' ,
  PRIMARY KEY (id)
)  COMMENT = '21.秒杀记录表';
```



安全：

1.限流

目的：防止服务器宕机

令牌桶算法：单位时间内容产生指定数量的令牌，请求进来获取令牌。如果获取到，进行下一步。如果获取不到，结束请求。

第三方技术实现

2.接口防刷

目的：别人恶意请求接口

访问频率进行限制:ip和用户id

3.秒杀接口隐藏

目的：防止暴露秒杀接口

通过一定加密算法，实现秒杀接口动态化

4.超卖

目的：防止超卖

锁(是否需要使用分布式锁-就看秒杀服务是否为集群部署)

5.传输协议

https协议进行数据传输

## 四、秒杀编码 



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455102.png)



 4.1 秒杀活动 

代码：

``` java
@Service
@RequiredArgsConstructor
public class SkillactivityServiceImpl implements SkillactivityService {

    private final SkillactivityDao dao;

    /**
     * 新增秒杀活动
     *
     * @param dto dto 秒杀活动传输对象
     * @return {@link Response}
     */
    @Override
    public Response save(SkillActivityAddDto dto) {
        Skillactivity skillactivity = new Skillactivity();
        // 对象拷贝
        BeanUtils.copyProperties(dto, skillactivity);
        if (dao.insert(skillactivity) > 0) {
            return Response.ok();
        } else {
            return Response.fail();
        }
    }

    //内部 -
    @Override
    public Response change(SkillActivityAuditDto dto) {
        if (dao.updateFlag(dto) > 0) {
            //审核成功-缓存活动
            if (dto.getFlag() == SystemConfig.ACTIVITY_SUCCESS) {
                //缓存2个key
                Skillactivity skillactivity = dao.selectById(dto.getId());
                Date date = new Date();
                long s = (skillactivity.getStime().getTime() - date.getTime()) / 1000;
                long e = (skillactivity.getEtime().getTime() - date.getTime()) / 1000;

                //用来解决活动是否开始：未开始的秒杀活动
                RedissionUtil.setStr(RedisKeyConfig.SKILL_ACTIVITY_NOSTART + dto.getId(), 1, s);
                //用来缓存秒杀活动信息：进行中的秒杀活动
                RedissionUtil.setStr(RedisKeyConfig.SKILL_ACTIVITY + dto.getId(), skillactivity, e);

            } else if (dto.getFlag() == SystemConfig.ACTIVITY_DEL) {
                //删除了
                RedissionUtil.delKey(RedisKeyConfig.SKILL_ACTIVITY_NOSTART + dto.getId(), RedisKeyConfig.SKILL_ACTIVITY + dto.getId());
            }
            return Response.ok();
        } else {
            return Response.fail();
        }
    }

    //用户-只能看审核通过活动 flag:0.查询全部秒杀活动 1.未开始活动 2.进行中活动 3.结束的活动
    @Override
    public Response queryList(int flag) {
        QueryWrapper<Skillactivity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("flag", SystemConfig.ACTIVITY_SUCCESS);
        if (flag > 0) {
            //查询某些状态
            switch (flag) {
                case 1://未开始活动
                    // stime>new Date()
                    queryWrapper.gt("stime", new Date());
                    break;
                case 2://2.进行中活动
                    queryWrapper.lt("stime", new Date()).gt("etime", new Date());
                    break;
                case 3://3.结束的活动
                    // etime < new Date()
                    queryWrapper.lt("etime", new Date());
                    break;
            }
        }
        queryWrapper.orderByDesc("id");
        return Response.ok(dao.selectList(queryWrapper));
    }

    //秒杀活动开始的倒计时
    @Override
    public Response queryTime(int id) {
        //活动开始的剩余时间
        if (RedissionUtil.checkKey(RedisKeyConfig.SKILL_ACTIVITY_NOSTART + id)) {
            return Response.ok(RedissionUtil.ttl(RedisKeyConfig.SKILL_ACTIVITY_NOSTART + id));
        } else {
            if (RedissionUtil.checkKey(RedisKeyConfig.SKILL_ACTIVITY + id)) {
                return Response.fail("秒杀活动进行中");
            }
        }
        return Response.fail("秒杀活动不存在");
    }
}
```

 4.2 秒杀商品 

代码：

``` java
@Service
@RequiredArgsConstructor
public class SkillgoodsServiceImpl implements SkillgoodsService {

    // spring 的 bean 既然是单例的 只有一个实例 怎么保证线程安全？
    private final SkillgoodsDao dao;

    @Override
    @Transactional
    public Response save(SkillGoodsAddDto dto) {
        Skillgoods skillgoods = new Skillgoods();
        BeanUtils.copyProperties(dto, skillgoods);
        if (dao.insert(skillgoods) > 0) {
            return Response.ok();
        } else {
            return Response.fail();
        }
    }

    //内部人员使用
    @Override
    @Transactional
    public Response up(SkillGoodsDto dto) {
        //1.验证是否位数商品上架
        if (dto.getFlag() == SystemConfig.GOODS_UP) {
            //2.修改状态和静态路径
            //如果是商品上架，生成静态页面
            if (dao.updateFlagUrl(dto.getFlag(),
                    SystemConfig.GOODS_DETAIL_PRE + dto.getId() + ".html", dto.getId()) > 0) {

                //动态页面静态化-FreeMarker
                //3.查询详细信息
                SkillGoodsDetailDto detailDto = dao.selectByGid(dto.getId());
                //4.通过FreeMarker 生成静态页面 直接生成(推荐) 、MQ 异步生成
                FreeMarkerUtil.createHtml(detailDto);
                //5.实现商品缓存
                // hash数据结构 key:秒杀活动前缀+ID  field:秒杀商品ID  value:商品库存数
                String key = RedisKeyConfig.SKILL_GOODS + detailDto.getSaid();
                if (RedissionUtil.checkKey(key)) {
                    //直接缓存本商品
                    RedissionUtil.setHash(key, detailDto.getSgid() + "", detailDto.getStock());
                } else {
                    //缓存商品
                    RedissionUtil.setHash(key, detailDto.getSgid() + "", detailDto.getStock());
                    //设置有效期
                    RedissionUtil.expire(RedisKeyConfig.SKILL_GOODS + detailDto.getSaid(), RedissionUtil.ttl(RedisKeyConfig.SKILL_ACTIVITY + detailDto.getSaid()));
                }
                //6.返回
                return Response.ok();
            } else {
                return Response.fail();
            }
        } else {
            if (dao.updateFlag(dto) > 0) {
                return Response.ok();
            } else {
                return Response.fail();
            }
        }
    }

    @Override
    public Response queryList(int said) {
        QueryWrapper<Skillgoods> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("said", said);
        queryWrapper.orderByDesc("id");
        return Response.ok(dao.selectList(queryWrapper));
    }
}
```

 4.3 秒杀订单 

![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455530.png)



``` java
@Service
public class SkillorderServiceImpl implements SkillorderService {
    @Resource
    private SkillorderDao dao;
    @Resource
    SkillgoodsDao skillgoodsDao;
    @Resource
    private SkilllogDao skilllogDao;
    @Resource
    private SkillorderlogDao skillorderlogDao;
    @Resource
    private RabbitTemplate rabbitTemplate;

    /**
     * Review 评审
     * 1.操作直接落到Mysql
     * 2.锁，无法保证超卖
     * 3.Redis
     * 4.MQ
     * 5.幂等性的问题：操作多次，结果一样，新增接口 需要解决幂等性的问题
     *解决方案：
     * 1.前端  点击之后，立即把按钮不可使用
     * 2.锁
     * 3.Redis 性能
     * */
    //秒杀
    @Override
    @Transactional //事务
    public R save(SkillOrderAddDto dto, int uid) {
        //秒杀实现--下单
        //1.查询秒杀商品的商品信息
//        Lock lock=new ReentrantLock();//通过Lock 解决超卖的问题
//        lock.lock();
        RLock rLock=RedissonUtils.getLock(RedisKeyConfig.SKILL_ACTIVITY_LOCK+dto.getSgid());
        try {
            //分布式锁  设置超时时间 防止意外情况的锁无法释放问题
            if(rLock.tryLock(6, TimeUnit.SECONDS)){
                SkillGoodsDetailDto detailDto=skillgoodsDao.selectByGid(dto.getSgid());
                if(detailDto!=null){

                    //2.验证秒杀活动没有结束
                    Date date=new Date();
                    if(detailDto.getStime().getTime()<date.getTime() && detailDto.getEtime().getTime()>date.getTime()){

                        //3.验证购买的数量是否超出约定的上限
                        if(detailDto.getMaxcount()>=dto.getNum()) {

                            //4.验证用户是否已经购买过
                            Skillorder skillorder = dao.selectOne(new QueryWrapper<Skillorder>().eq("uid", uid).eq("sgid", dto.getSgid()));
                            if (skillorder == null) {
                                //用户没有购买过，可以购买

                                //5.验证库存

                                if (detailDto.getStock() >= dto.getNum()) {

                                    //库存够，可以下单
                                    //6.生成订单信息
                                    Skillorder order = new Skillorder(SnowFlowUtil.getInstance().nextId() + "",
                                            dto.getSgid(), detailDto.getCurrprice(), dto.getNum(), dto.getUaid(), uid);
                                    if(dao.insert(order)>0){

                                        //7.扣减库存
                                        skillgoodsDao.updateStock(dto.getSgid(),-dto.getNum());

                                        //8.秒杀成功-记录
                                        skillorderlogDao.insert(new Skillorderlog(order.getId(), SystemConfig.ORDER_ADD,"秒杀订单生成！"));
                                        skilllogDao.insert(new Skilllog(uid, dto.getSgid(), "1"));//记录秒杀结果

                                        //9.返回
                                        return RUtil.ok();
                                    }else {
                                        skilllogDao.insert(new Skilllog(uid, dto.getSgid(), "2"));//记录秒杀结果
                                        return RUtil.fail("下单失败！");
                                    }
                                }else {
                                    return RUtil.fail("亲，秒杀商品已卖完！");
                                }
                            } else {
                                //买过，本次不允许
                                return RUtil.fail("亲，你已经买过了！");
                            }
                        }else {
                            return RUtil.fail("亲，超出规定的购买上限！");
                        }
                    }else {
                        return RUtil.fail("亲，秒杀活动已结束！");
                    }
                }else {
                    return RUtil.fail("亲，秒杀商品无效！");
                }
            }
            rLock.unlock();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return RUtil.fail("亲，秒杀已结束！");
    }

    @Override
    public R save2(SkillOrderAddDto dto, int uid, String sign) {

        //1.加锁 分布式锁
        RLock rLock=RedissonUtils.getLock(RedisKeyConfig.SKILL_ACTIVITY_LOCK+dto.getSgid());
        try {
            if(rLock.tryLock(6,TimeUnit.SECONDS)){
                //校验库存
                String key=RedisKeyConfig.SKILL_GOODS+dto.getSaid();
                if(RedissonUtils.existsField(key,dto.getSgid()+"")){
                    int n= (int) RedissonUtils.getHash(key,dto.getSgid()+"");
                    if(n>=dto.getNum()){

                        //扣减库存
                        if(skillgoodsDao.updateStock(dto.getSgid(),-dto.getNum())>0){
                            RedissonUtils.setHash(key,dto.getSgid()+"",n-dto.getNum());

                            //生成订单信息
                            Skillorder order = new Skillorder(SnowFlowUtil.getInstance().nextId() + "",
                                    dto.getSgid(), dto.getPrice(), dto.getNum(), dto.getUaid(), uid);

                            //发送MQ消息
                            rabbitTemplate.convertAndSend(new MqMsgBo(SnowFlowUtil.getInstance().nextId(),
                                    RabbitMQConstConfig.MQTYPE_SKILLORDERADD,order));

                            return RUtil.ok();
                        }
                    }else {
                        return RUtil.fail("亲，已售完！");
                    }
                }
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return RUtil.fail("亲，秒杀已结束！");
    }
}
```

## 五、秒杀测试 

[ ](https://blog.csdn.net/chengzhang1989/article/details/81711734)

## 六、Freemarker 

页面模板技术：JSP，Thymeleaf，Freemarker

页面+占位符+动态数据=渲染最终的静态页面

http://freemarker.foofun.cn/

 **6.1 是什么** 



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455279.png)



FreeMarker 是一款 模板引擎： 即一种基于模板和要改变的数据， 并用来生成输出文本(HTML网页，电子邮件，配置文件，源代码等)的通用工具。 它不是面向最终用户的，而是一个Java类库，是一款程序员可以嵌入他们所开发产品的组件

> 代码生成框架就会使用Freemaker

 **6.2 作用** 

1.基于模板生成静态页面-HTML网页

2.基于模板生成配置文件

3.基于模板生成Java源文件

等等

通过FreeMarker实现动态页面静态化

 6.3 怎么用 

1.依赖jar

``` xml
<dependency>
  <groupId>org.freemarker</groupId>
  <artifactId>freemarker</artifactId>
  <version>2.3.31</version>
</dependency>
```

2.编写模板文件

xxx.ftl

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>秒杀商品详情页</title>
  </head>
  <body>
    <div>
      <!--    1.秒杀活动-->
      <div>
        <h2>${dto.title}</h2>
        <h3>开始时间：${dto.stime?string('yyyy-MM-dd HH:mm:ss')}---结束时间：${dto.etime?string('yyyy-MM-dd HH:mm:ss')}</h3>
      </div>
      <!--    2.秒杀商品信息-->
      <h1>${dto.gtitle}</h1>
      <img src="${dto.picurl}">
      <h5>原价：${dto.price}，秒杀价格：${dto.currprice}</h5>
      <h6>库存：${dto.stock}</h6>
      <div>
        
      </div>
      <!--    3.下单-->
      <div>
        <button onclick="sendOrder()">立即抢购</button>
      </div>
    </div>
    <script>
      function sendOrder(){
        //1.请求接口--获取秒杀真正接口
        //ajax
        //2.再请求秒杀接口
        //ajax
        
      }
    </script>
  </body>
</html>
```

3.编写代码实现页面生成

读取模板、设置变量、输出文件

``` java
/**
* 生成秒杀商品静态页面
*/
public static void createHtml(SkillGoodsDetailDto dto){
    // 第一步：创建一个Configuration对象，直接new一个对象。构造方法的参数就是freemarker对于的版本号。
    Configuration configuration = new Configuration(Configuration.getVersion());
    try{
        // 第二步：设置模板文件所在的路径
        configuration.setDirectoryForTemplateLoading(new File(dto.getClass().getClassLoader().getResource("templ").getPath()));
        // 第三步：设置模板文件使用的字符集。一般就是utf-8.
        configuration.setDefaultEncoding("utf-8");
        // 第四步：加载一个模板，创建一个模板对象。
        Template template = configuration.getTemplate("goodsdetail.ftl");
        // 第五步：创建一个模板使用的数据集，可以是pojo也可以是map。一般是Map。
        Map dataModel = new HashMap<>();
        //向数据集中添加数据
        dataModel.put("dto", dto);
        // 第六步：创建一个Writer对象，一般创建一FileWriter对象，指定生成的文件名。
        Writer out = new FileWriter(new File(dto.getClass().getClassLoader().getResource("static").getPath(),SystemConfig.GOODS_DETAIL_PRE+dto.getSgid()+".html"));
        // 第七步：调用模板对象的process方法输出文件。
        template.process(dataModel, out);
        // 第八步：关闭流。
        out.close();
        
    }catch (Exception e){
        
    }
    }
```

4.访问测试

![image.png](https://cdn.nlark.com/yuque/0/2022/png/8389448/1653035261323-5549e2fd-d9ff-45f9-8151-5c9ee0765492.png?x-oss-process=image%2Fresize%2Cw_1119%2Climit_0)

## 七、限流算法 

7.1令牌桶算法 

令牌桶算法是网络流量整形（Traffic Shaping）和速率限制（Rate Limiting）中最常使用的一种算法。

典型情况下，令牌桶算法用来控制发送到网络上的数据的数目，并允许突发数据的发送。



![image.png](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206291455476.png)



7.2 实现 

选择谷歌的guava工具包，内部RateLimter类提供了令牌桶算法实现令牌发放

实现步骤：

1.依赖jar

``` xml
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>31.1-jre</version>
</dependency>
```

2.编写代码实现令牌发放

``` java
public class TokenLimiterFilter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        RateLimiter rateLimiter = RateLimiter.create(SystemConfig.SKILL_TOKENS);
        //获取令牌就放行，获取不到就拦截
        if(rateLimiter.tryAcquire()){
            return true;
        }else {
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().println(JSON.toJSONString(RUtil.ok("亲，秒杀已售罄！")));
            return false;
        }
    }
}
```



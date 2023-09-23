---
title: 智慧大棚数字孪生系统
---

## 1.介绍

IT技术未来趋势



数字孪生



孪生体引擎





技术栈

传感器 收集数据 传递到服务器          mqtt 协议   






云平台 创建产品   设备     基于 sdk  写入设备端



盈利模式  卖流量 和 服务 

**# 智慧大棚数字孪生系统**



IT技术未来趋势









数字孪生





孪生体引擎







技术栈



传感器 收集数据 传递到服务器      mqtt 协议  



云平台 创建产品  设备   基于 sdk  写入设备端



盈利模式  卖流量 和 服务 





## 2.先跑起来

### 2.0 环境准备

这里 咱么有两套环境，一套是云上的环境，一套是我本地docker 的环境，这里以本地docker环境运行

![image-20230629115600987](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115603.png)

需要注意的是 这些配置文件的配置

![image-20230629115652267](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115654.png)

以及 mqtt协议的通信地址 是在 这里

![image-20230629115751191](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115754.png)

还需要搭配  switchhosts 来使用

![image-20230629115850410](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115853.png)

> 所有环境准备好 配置修改好  注意 这里咱们用的是 局域网的ip   ,如果 局域网ip 变了  ，注意修改这里面的配置









### 2.1 idea 导入工程

![image-20230629114852502](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629121534.png)

### 2.2 前端工程

| 管理员端代码                                                 | 页面展示                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20230629114942848](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115027.png) | ![image-20230629115112553](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115115.png) |
| ![image-20230629115159289](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115204.png) |                                                              |



| 租户端代码                                                   | 压面展示                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20230629115302935](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115304.png) | ![image-20230629115403252](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115405.png) |
| ![image-20230629115441688](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629115444.png) |                                                              |



### 2.3 设备

![image-20230629120230789](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629120233.png)

**先插上网线，再通电**，然后 找到他局域网ip，访问设备的web 页面

![image-20230629120326678](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629120332.png)

这个页面是 暂未升级的页面， 只能修改  设备认证地址 ，这里 咱们需要修改为咱们**当前环境**的认证地址

```
http://10.8.157.68:8701/driver/auth/login
```

修改完以后，断电   再通电 ，设备会自动请求物联网平台的认证接口，进行认证，注意 这里的动作是发生在 租户 创建产品  创建设备以后， 咱们是为了先演示效果，没有按照业务流程顺序来操作 。 设备认证成功后  会自动像 emqx 发送消息 ，物联网平台会监听 emqx 的主题  /qfjava/device/data/device_1664537091313164288  ， 这个消息 会在idea 的 控制台 输出

![image-20230629120819011](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629120820.png)

收到 设备上传的指令 

2023-06-29 11:26:46.018  INFO 28768 --- [-driver-mqtt_in] [  39] c.q.d.mqtt.handler.MqttReceiveHandler    : 设备的发送的头:{"mqtt_receivedRetained":false,"mqtt_id":0,"mqtt_duplicate":false,"id":"6af49c30-1cf4-3a36-dd98-1be87a7e66c2","mqtt_receivedTopic":"/qfjava/device/data/device_1664537091313164288","mqtt_receivedQos":0,"timestamp":1688009206017}
======={"device": "device_1664537091313164288", "product_key": "product_110108_1664536988481413120", "tenant_id": "1648954167023718400", "data": {"soil_humidity": 0, "soil_temperature": 0, "soil_ph": 0, "soil_npk": 0, "air_temperature": 25.0, "air_humidity": 74.0, "illumination": 1, "co2": 0, "ph": 0, "wind_speed": 0, "flow_velocity": 0}}



> 注意  设备重新通电后 需要等一段时间  才能看到这个输出   不要着急 稍等他一会儿，然后  看到这些内容以后 就表示  设备 已经和 网联网平台建立了通信，咱们就可以 发送指令给设备  来操控设备了



可以通过swagger 或者 postman 来 请求 发送指令的接口 

![image-20230629121039855](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629121041.png)

接口参数

![image-20230629121107422](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230629121109.png)

~~~json
{
    "deviceKey":"device_1664537091313164288",
    "deviceSubCode": 3,
    "cmdName":"on_off",
    "value":"1"
}
~~~

参数说明：

- deviceKey  设备编号

- deviceSubCode  子设备  


- deviceSubCode  设备  1是风扇   2 是水泵    3 是灯  4 是大棚
- value   0  是开  1 是关 

> MQTT协议通信流程   **重要**

产品设备----->认证接口------>MQTT----->产品设备发起消息（主题，3个主题：1.认证 2.数据推送 3.指令推送）---->订阅主题（1.认证主题 获取消息了修改设备的实时状态:在线 2.数据推送主题 -发送到RabbitMQ---死信---延迟---监听队列---存储到MongoDB 3.指令主题 ）





传感器定时数据主题：/qfjava/device/data/device_1664537091313164288   每十秒上报数据到平台

传感器设备控制主题：/qfjava/device/ctrl/device_1664537091313164288     发送指令





物联网平台项目配套资料



> 技术栈部分

基于 ThingJs  搭建 数字孪生体  ，

5.熟悉NoSql数据库 redis，mongodb,能够基于redis缓解数据库压力  实现服务之间的数据共享，及分布式锁等问题  利用mongodb存储灵活的数据模型 对海量数据 进行数据统计分析

6.熟悉消息中间件 rocketmq , emqx    根据实际业务场景使用rocketmq 解决服务间的异步通信 削峰 解耦 数据分发的问题， 使用emqx的  mqtt  协议  实现与硬件终端的通信    

> 项目话术部分

我们公司是    近几年在布局物联网研发， 当前公司的主要产品就是这个 xxxx 物联网平台， 应用场景 有 农业的 畜牧业 还有医院的，  我负责的是 一个智慧大棚项目 ，因为 我们平台是一个 saas 平台 ， 以租户的形式 来进行管理，  展示层 有 数字孪生体  租户平台 管理平台 三方业务平台 。



租户入驻平台 



登录租户平台



租户创建产品   这是一个概念   比如        



租户创建设备   这个设备  要和现实中的 某一个实物对应  ，刚创建完 设备 这个设备是未激活的状态  ， 需要在设备上 填写 刚才 新建的设备的  device key   ,  填写完后 重启设备   此时 在租户端 会看到 设备的 为 已激活

![image-20230628163655743](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230628163705.png)





智慧大棚 需要联网 ，它上面是有网关的 可以进行网络通信 ， 智慧终端连上网之后 自动进行认证 请求 咱们平台的网关进行认证 qf-driver-gateway  设备网关 ，  硬件的认证 没法通过oauth2  ，所以 这里 我们单独设置了 硬件设备的认证网关，  硬件认证成功之后  就可以和 物联网平台进行通信了    如何通信的？

![image-20230628165800668](https://gllspictures.oss-cn-beijing.aliyuncs.com/img/20230628165803.png)

问：设备怎么知道emqx 地址在哪里？

设备联网 通电  会自动向  driver/auth/login  进行认证   认证成功后  返回emqx 服务器的地址        然后设备 向emqx 发送数据



## 3.物联网平台







## 4.数字孪生

基于ThingJs  [ThingJS - 物联网3D可视化开发平台 - 数字孪生可视化平台](https://www.thingjs.com/guide/)







### 1 场景搭建

开发平台：https://www.thingjs.com/guide/

场景开发：https://campus.thingjs.com/#/zh    需要依赖开发平台提供的素材（付费定制）

- 园区 ：场景的顶级容器
- 建筑 ：class="building"             $(".building")
- 物体：class="thing"







## 第一天：初识数字孪生

1. 数字孪生系统开发的意义和目的
2. 千锋Java智慧农业大棚项目架构
3. 孪生系统与IoT平台的关系与项目演示
4. 孪生系统开发任务分配
5. ThingJS与ThingJS低代码开发平台介绍
6. 补充一些JavaScript基础知识（根据学生基础动态调整）
7. 手把手创建第一个ThingJS孪生系统

## 第二天：数字孪生场景搭建

> https://support.thingjs.com/book/thingjs-lowcode10/63842fc9ddc46115804148a5

1. 自定义场景开发介绍

2. 基于自定义场景的ThingJS开发学习

   - App对象
   - 创建及销毁物体
   - 对象获取与控制
   - 事件管理
   - 摄像机控制

3. 创建Java智慧大棚孪生系统（导入现有的场景）

   - 加载场景

     ```javascript
     // 加载场景代码 
     var app = new THING.App({ 
        url: '/api/scene/353b46b3a426e946e09ec3c4',
        skyBox: 'BlueSky'
     });
     ```

   - 导入所需的静态资源（参考给定的静态资源包）

     - 上传静态资源文件到孪生系统项目
     - 在项目中引用静态资源（路径直接通过资源文件右键引用，避免错误）

     ```javascript
     const echartsurl = '/uploads/wechat/841037/file/Java智慧大棚/echarts.min.js'
     const chartCss = '/uploads/wechat/841037/file/Java智慧大棚/charts.css'
     const deviceCss = '/uploads/wechat/841037/file/Java智慧大棚/device.css'
     const markerCss = '/uploads/wechat/841037/file/Java智慧大棚/marker.css'
     const bootstrapCss = '/uploads/wechat/841037/file/Java智慧大棚/bootstrap.min.css'
     const mqttjs='/uploads/wechat/841037/file/Java智慧大棚/mqtt.min.js'
     ```

   - 动态载入初始化资源

     ```javascript
     // 动态载资源，并初始化场景
     THING.Utils.dynamicLoad([echartsurl, deviceCss, chartCss, markerCss,bootstrapCss,mqttjs], () => {
       console.log("----动态加载")
       app.on('load', (ev) => {
         
       })
     })
     ```

## 第三天：孪生系统场景开发

> 根据给定的开发任务，选取一个设备进行开发讲解
>
> - 大棚棚顶开闭控制
> - 风机控制
> - 灯管控制
> - 水肥机控制

1. 场景初始化

   - 初始化场景

   ```java
   THING.Utils.dynamicLoad([echartsurl, deviceCss, chartCss, markerCss,bootstrapCss,mqttjs], () => {
       console.log("----动态加载")
       app.on('load', (ev) => {
           //初始化场景
           initScene();
       })
   })
   ```

   ```java
   // 2. 三维初始化
   function initScene() {
       // 获取引用场景的园区对象（顶层）
       campus = app.root.campuses[0];
       // 切换层级到园区
       app.level.change(campus) ;
       // 禁止默认事件
       forbidEvents();
   }
   
   // 禁止默认事件
   function forbidEvents() {
     // 禁止双击进入
     app.pauseEvent(THING.EventType.EnterLevel,'.Building || .Thing || .Room || .Marker || .Facade',);
     // 禁止鼠标单击退出当前层级的默认操作
     app.pauseEvent(THING.EventType.Click, null, THING.EventTag.LevelBackOperation);
   }
   ```

   - 在初始化场景函数中，绑定建筑的双击事件和物体的单击事件

   ```javascript
   // 2. 三维初始化
   function initScene() {
       // 获取引用场景的园区对象（顶层）
       campus = app.root.campuses[0];
       // 切换层级到园区
       app.level.change(campus) ;
       // 禁止默认事件
       forbidEvents();
   
       // 获取到所有建筑（建筑在这里代表层级）
       allBuilding = app.query(".Building");
       //绑定建筑双击事件
       allBuilding.forEach((obj) => {
           bindDoubleClick(obj,"dblBuildingClick")
       })
       // 获取到所有物体
       allThing = app.query(".Thing");
       // 绑定物体单击事件
       allThing.forEach((obj) => {
           bindSingleClick(obj,"clickToLocateObj");
       })
   }
   ```

   ```javascript
   // 绑定建筑的双击事件
   function bindDoubleClick(obj, tag) {
       obj.on(
           THING.EventType.DBLClick,
           (ev) => {
               const { button } = ev
               if (button === 0) {
                   //destroyPanel()
                   app.camera.flyTo({
                       object:obj,
                       radius:30,
                       yAngle:90,
                       xAngle:12,
                       complete:()=> {
                           //createPanel(obj)
                       }
                   })
               }
           },
           tag
       )
   }
   ```

   ```javascript
   // 物体绑定左键单击事件
   function bindSingleClick(obj, tag) {
     obj.on(
       THING.EventType.SingleClick,
       (ev) => {
         const { button } = ev
         if (button === 0) {
           //destroyPanel()
           //locateThing(obj)
         }
       },
       tag,
     )
   }
   ```

2. 建筑顶牌开发

   - 创建顶牌

   ```javascript
   // 创建信息面板
   function createPanel(obj) {
     const { name } = obj
     const paneldom = _panelUI(obj)
     app.domElement.appendChild(paneldom)
     const panel = app.create({
       type: 'Marker',
       name: `${name}_panel`,
       keepSize: false,
       inheritScale: false,
       size: 1,
       position: obj.position,
       visible: false,
       element: paneldom,
       parent: obj,
       style: {
         alwaysOnTop: true,
         renderOrder: -1,
       },
       complete: (ev) => {
         ev.object.pivot = [-0.1, 0.5]
         setTimeout(() => {
           ev.object.visible = true
         }, 100)
       },
     })
   }
   
   // 绘制顶牌
   function _panelUI(obj) {
       console.log("----------_panelUI");
       console.log(obj);
     const { name, id, userData } = obj
     let paneldom = document.createElement('div')
     paneldom.className = 'panel-wrap'
     const ctrl = userData.ctrl
     const isCamera = userData.type === '监控摄像头'
     let videoUrl = ''
     if (isCamera) {
       videoUrl = 'https://video-for-inside-online-env.thingjs.com/index.html?id=1'
     }
     paneldom.innerHTML = `
      <div class="panel-wrap">
         <div class="top-icon">
           <img
             src="https://static.3dmomoda.com/textures/22040714innijpmrnzu8hujw3ozfbdlg.png"
             alt=""
           />
         </div>
         <div class="content">
           <div class="close" onclick="closePanel('${name}','${
       userData.type
     }')"></div>
           <div class="info">
             <h2 class="title">基础信息</h2>
             <div class="detail">
               <div class="item">
                 <span>编号：</span>
                 <span>${id}</span>
               </div>
               <div class="item">
                 <span>名称：</span>
                 <span>${name}</span>
               </div>
               <div class="item">
                 <span>状态：</span>
                 <span id="statespan">${(userData.ctrl === 0 && '关闭') || '开启'}</span>
               </div>
             </div>
           </div>
           <div class="info">
             <h2 class="title">告警状态</h2>
             <div class="detail">
               <div class="item">
                 <span>状态：</span>
                 <span>${(userData.isAlarm && '告警') || '无'}</span>
               </div>
               <div class="item">
                 <span>详情：</span>
                 <span>${userData.alarmDesc || '无'}</span>
               </div>
             </div>
           </div>
           <div class="info" style="display: ${ctrl != undefined ? 'block' : 'none'}">
             <h2 class="title">控制开关</h2>
             <div class="detail">
               <button type="button" class="btn btn-success" onclick="ctrlDevice(1,'${id}')">开</button>
               <button type="button" class="btn btn-warning" onclick="ctrlDevice(0,'${id}')">关</button>
             </div>
           <div class="info" style="display: ${isCamera ? 'block' : 'none'}">
             <h2 class="title">监控视频</h2>
             <div class="detail">
               <iframe
                 class="video-iframe"
                 src="${videoUrl}"
                 marginwidth="0"
                 frameborder="0"
                 >监控摄像头</iframe
               >
             </div>
           </div>
         </div>
       </div>
       `
     return paneldom
   }
   ```

   - 删除顶牌

   ```javascript
   // 点击面板关闭按钮，回到当前层级默认视角，并且销毁面板
   function closePanel(name, type) {
       const object = app.query(name)[0]
       backToDefaultView()
       destroyPanel()
   }
   
   // 回到当前层级默认视角
   function backToDefaultView() {
       const currentLevel = app.level.current
       app.level.change(currentLevel)
   }
   
   // 销毁信息面板
   function destroyPanel() {
       app.query(/_panel/).destroyAll()
   }
   ```

3. 物体顶牌开发

   ```javascript
   // 定位Thing类型物体
   // 1. 如果当前层级为物体所在层级，直接飞
   // 2. 如果当前层级不是物体所在层级，先切换层级再飞
   function locateThing(object) {
       let obj = object.type === 'Marker' ? object.parent : object
     // 如果在同一层级
       cameraFly(obj)
   }
   
   // 视角飞行事件
   function cameraFly(object) {
       console.log(object)
       y_angle = object.angles[2]==0?-180:object.angles[2]
       console.log(y_angle)
       app.camera.flyTo({
           object:object,
           radius:15,
           yAngle:y_angle,
           xAngle:10,
           complete:()=> {
               createPanel(object)
           }
       })
   }
   ```

4. 设备状态控制：点击开启和关闭按钮，孪生体状态随之变化

   ```javascript
   // 设备控制
   function ctrlDevice(num,id){
       const obj = app.query("#"+id)[0]
       if(obj.type == 'Building') {
           //开启
           if(num === 1) {
               //sendMessage(4,0)
               setStateSpan("开启")
               obj.rotateTo({
                   angles: [180, 0, 0],
                   time: 3000, 
                   complete: function () {
                       app.camera.flyTo({
                           object:obj,
                           radiusFactor:0.5,
                           xAngle:-30
                       })
                       console.log('Rotation completed!');  // 旋转结束回调
                   }
               });
           } else {
               //关闭
               //sendMessage(4,1)
               setStateSpan("关闭")
               obj.rotateTo({
                   angles: [0, 0, 0],
                   time: 3000, 
                   complete: function () {
                       console.log('Rotation completed!');  // 旋转结束回调
                   }
               });
           }
           
       } else {
           const deviceId = obj.id
           if(num === 1) {
               obj.playAnimation("开启")
               setStateSpan("开启")
               if(deviceId.startsWith("deng")) {
                   sendMessage(3,0)
               } else if(deviceId.startsWith("fengji")){
                   sendMessage(1,0)
               } else if(deviceId.startsWith("shui")){
                   sendMessage(2,0)
               }
               
           } else {
               obj.playAnimation("关闭")
               setStateSpan("关闭")
               if(deviceId.startsWith("deng")) {
                   sendMessage(3,1)
               } else if(deviceId.startsWith("fengji")){
                   sendMessage(1,1)
               } else if(deviceId.startsWith("shui")){
                   sendMessage(2,1)
               }
           }
       }    
   }
   
   //修改面板文本
   function setStateSpan(state){
       $("#statespan").text(state)
   }
   ```

5. 数据通信

   ```javascript
   // 发送设备控制指令（对接IoT平台设备指令接口）     不用这个 
   function sendMessage(code,state){
       console.log("发送指令："+code+"、"+state)
       $.ajax({
           url:"https://javaeeproject.com/sendMQTTMessage",
           type:"POST",
           data:{
               qos:0,
               retained:false,
               topic:"/qfjava/device/ctrl/beijing/1",
               deviceCode:code,
               deviceState:state
           },
           success:function(msg){
               console.log(msg)
           }
       });
   }
   ```

   ```javascript
   // 这个是 优化过的
   function sendMessage(code,state){
       console.log("发送指令："+code+"、"+state)
       var data = {
               "deviceKey": "device_1673635543947075584",
               "deviceSubCode": 4,
               "cmdName": "on_off",
               "value": "0"
           };
       
       $.ajax({
           url:"https://javaeeproject.com/managergateway/api/cmd/send",
           type:"POST",
           headers:{
               "access-key":"1648954167023718400",
               "access-securit":"4e925941edce4252a1908b630733b80b",
               "sign":"60f1e2c8f761607a552272209a5f692560750df2ecff6ea4bcdf151d7247004742d3283e"
           },
           contentType:"application/json",
           data:JSON.stringify(data),
           success:function(res){
               console.log("~~~"+res)
           }
       });
   }
   ```

   

## 第四天：图表开发

> https://echarts.apache.org/zh/index.html

1. 初始化场景的同时初始化图标

   ```javascript
   // 动态载资源，并初始化场景
   THING.Utils.dynamicLoad([echartsurl, deviceCss, chartCss, markerCss,bootstrapCss,mqttjs], () => {
       console.log("----动态加载")
       app.on('load', (ev) => {
           //初始化场景
           initScene();
           //初始化echarts图表
           initCharts();
       })
   })
   
   function initCharts(){
       //airInfo()
       //soilInfo()
       //airInfo2()
       //otherInfo()
       //info1()
       //info2();
       createTitle()
   }
   ```

2. 初始化孪生系统title

   ```javascript
   function createTitle(){
       const titleDiv = document.createElement("div")
       titleDiv.setAttribute("style","position:absolute;top:0px;left:0px;background: rgba(22,24,63,0.5);color:#fff;border-radius:0px 0px 20px 0px;padding:10px 10px;font-family:STLiti")
       const imgTag = document.createElement("img")
       imgTag.setAttribute("src","/uploads/wechat/829420/file/智慧大棚/智慧大棚1.png")
       titleDiv.appendChild(imgTag)
       app.domElement.appendChild(titleDiv)
   }
   ```

3. 空气质量一周数据（曲线图）

   ```javascript
   function airInfo(){
       //从接口获取动态实时数据
       option = {
           title: {
               text: '一周数据',
               textStyle:{
                   color:'#FFFFFF'
               }
           },
           xAxis: {
               type: 'category',
               data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
               nameTextStyle:{
                   color:'#E0BB65'
               }
           },
           yAxis: {
               type: 'value',
               nameTextStyle:{
                   color:'#E0BB65'
               }
           },
           series: [
               {
               data: [820, 932, 901, 934, 1290, 1330, 1320],
               type: 'line',
               smooth: true
               }
           ]
       };
       createChart(option,"季节性气温")
   }
   ```

   ```javascript
   function createChart(option, type) {
       var bottomBackground = document.createElement('div'); // 创建背景 div
       var bottomDom = document.createElement('div'); // 图表 div
   
       // 设置背景div和图表div的样式
       if (type == "季节性气温") {
           var backgroundStyle = 'position: absolute;top:100px;right:3px;height:220px;width:280px;background: rgba(22,24,63,0.2); border-radius:5px';
           var chartsStyle = 'position: absolute;top:0px;right:0px;width:260px;height:250px;margin:0 5px;';
       } else if (type == "实时温度") {
           var backgroundStyle = 'position: absolute;top:341px;right:3px;height:220px;width:280px;background: rgba(22,24,63,0.2); border-radius:5px';
           var chartsStyle = 'position: absolute;top:0px;right:0px;width:260px;height:250px;margin:0 5px;';
       }  else if (type == "other2") {
           var backgroundStyle = 'position: absolute;top:581px;right:3px;height:220px;width:280px;background: rgba(22,24,63,0.2); border-radius:5px';
           var chartsStyle = 'position: absolute;top:0px;right:0px;width:260px;height:250px;margin:0 5px;';
       } else if (type == "空气信息") {
           var backgroundStyle = 'position: absolute;top:100px;left:3px;height:220px;width:280px;background: rgba(22,24,63,0.2); border-radius:5px';
           var chartsStyle = 'position: absolute;top:0px;right:0px;width:260px;height:250px;margin:0 5px;';
       } else if (type == "光照信息") {
           var backgroundStyle = 'position: absolute;top:341px;left:3px;height:220px;width:280px;background: rgba(22,24,63,0.2); border-radius:5px';
           var chartsStyle = 'position: absolute;top:0px;right:0px;width:260px;height:250px;margin:0 5px;';
       } else if (type == "other1") {
           var backgroundStyle = 'position: absolute;top:581px;left:3px;height:220px;width:280px;background: rgba(22,24,63,0.2); border-radius:5px';
           var chartsStyle = 'position: absolute;top:0px;right:0px;width:260px;height:250px;margin:0 5px;';
       }
       bottomBackground.setAttribute('style', backgroundStyle);
       bottomDom.setAttribute('style', chartsStyle);
       bottomBackground.setAttribute('class', 'chart');
       bottomDom.setAttribute('class', 'chart');
   
       // echarts 初始化
       var bottomCharts = window.echarts.init(bottomDom);
       bottomCharts.setOption(option);
   
       bottomBackground.appendChild(bottomDom);
       app.domElement.appendChild(bottomBackground); // 添加到app dom下
   }
   ```

4. 土壤数据（指针图）

   ```javascript
   function soilInfo(){
       option = {
           title: {
               text: '土壤信息',
               textStyle:{
                   color:'#FFFFFF'
               }
           },
           tooltip: {
               formatter: '{a} <br/>{b} : {c}%'
           },
           series: [
               {
               name: 'Pressure',
               type: 'gauge',
               progress: {
                   show: true
               },
               detail: {
                   valueAnimation: true,
                   formatter: '{value}'
               },
               data: [
                   {
                   value: 50,
                   name: 'SCORE'
                   }
               ]
               }
           ]
           };
   
           createChart(option,"实时温度")
   }
   ```

5. 空气信息2(柱状图)

   ```javascript
   function airInfo2(){
       option = {
               title: {
               text: '信息展板',
               textStyle:{
                   color:'#FFFFFF'
               }
           },
           xAxis: {
               type: 'category',
               data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
               nameTextStyle:{
                   color:'#E0BB65'
               }
           },
           yAxis: {
               type: 'value',
               nameTextStyle:{
                   color:'#E0BB65'
               }
           },
           series: [
               {
               data: [120, 200, 150, 80, 70, 110, 130],
               type: 'bar',
               showBackground: true,
               backgroundStyle: {
                   color: 'rgba(180, 180, 180, 0.2)'
               }
               }
           ]
       };
       createChart(option,"空气信息")
   }
   ```

6. 温湿度信息(折线图)

   ```javascript
   function otherInfo(){
       option = {
           title: {
               text: '温湿度数据',
               textStyle:{
                   color:'#FFFFFF'
               }
           },
           tooltip: {
               trigger: 'axis'
           },
           legend: {},
           toolbox: {
               show: true,
               feature: {
               dataZoom: {
                   yAxisIndex: 'none'
               },
               dataView: { readOnly: false },
               magicType: { type: ['line', 'bar'] },
               restore: {},
               saveAsImage: {}
               }
           },
           xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
               nameTextStyle:{
                   color:'#FFFFFF'
               }
           },
           yAxis: {
               type: 'value',
               axisLabel: {
               formatter: '{value} °C'
               },
               nameTextStyle:{
                   color:'#FFFFFF'
               }
           },
           series: [
               {
               name: 'Highest',
               type: 'line',
               data: [10, 11, 13, 11, 12, 12, 9],
               markPoint: {
                   data: [
                   { type: 'max', name: 'Max' },
                   { type: 'min', name: 'Min' }
                   ]
               },
               markLine: {
                   data: [{ type: 'average', name: 'Avg' }]
               }
               },
               {
               name: 'Lowest',
               type: 'line',
               data: [1, -2, 2, 5, 3, 2, 0],
               markPoint: {
                   data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
               },
               markLine: {
                   data: [
                   { type: 'average', name: 'Avg' },
                   [
                       {
                       symbol: 'none',
                       x: '90%',
                       yAxis: 'max'
                       },
                       {
                       symbol: 'circle',
                       label: {
                           position: 'start',
                           formatter: 'Max'
                       },
                       type: 'max',
                       name: '最高点'
                       }
                   ]
                   ]
               }
               }
           ]
           };
   
           createChart(option,"光照信息")
   }
   ```

7. 折线图2

   ```javascript
   function info1(){
       option = {
       xAxis: {
           type: 'category',
           boundaryGap: false,
           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
       },
       yAxis: {
           type: 'value'
       },
       series: [
           {
           data: [820, 932, 901, 934, 1290, 1330, 1320],
           type: 'line',
           areaStyle: {}
           }
       ]
       };
       createChart(option,"other1")
   }
   ```

8. 走势图

   ```javascript
   function info2(){
       for (var i = 0; i < 1000; i++) {
       data.push(randomData());
       }
       option = {
       title: {
           text: '数据展板1',
           textStyle:{
               color:'#FFFFFF'
           }
       },
       tooltip: {
           trigger: 'axis',
           formatter: function (params) {
           params = params[0];
           var date = new Date(params.name);
           return (
               date.getDate() +
               '/' +
               (date.getMonth() + 1) +
               '/' +
               date.getFullYear() +
               ' : ' +
               params.value[1]
           );
           },
           axisPointer: {
           animation: false
           }
       },
       xAxis: {
           type: 'time',
           splitLine: {
           show: false
           },
           nameTextStyle:{
                   color:'#E0BB65'
               }
       },
       yAxis: {
           type: 'value',
           boundaryGap: [0, '100%'],
           splitLine: {
           show: false
           },
           nameTextStyle:{
                   color:'#E0BB65'
               }
       },
       series: [
           {
           name: 'Fake Data',
           type: 'line',
           showSymbol: false,
           data: data
           }
       ]
       };
       setInterval(function () {
       for (var i = 0; i < 5; i++) {
           data.shift();
           data.push(randomData());
       }
       myChart.setOption({
           series: [
           {
               data: data
           }
           ]
       });
       }, 1000);
       createChart(option,"other2")
   }
   ```

   ```javascript
   let data = [];
   let now = new Date(1997, 9, 3);
   let oneDay = 24 * 3600 * 1000;
   let value = Math.random() * 1000;
   function randomData() {
       now = new Date(+now + oneDay);
       value = value + Math.random() * 21 - 10;
       return {
           name: now.toString(),
           value: [
           [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
           Math.round(value)
           ]
       };
   }
   ```

   

## 第五天：学员自主开发+辅导答辩


---
title: 发送短信
---

## 腾讯云

1、需要我们创建签名，短息模板，还需要审核通过才能使用

2、SDK使用太麻烦，代码量大

3、短信性价比不高



## 京东万象【推荐】

1、登录 [京东万象](https://wx.jdcloud.com/)

2、点击短信服务

![image-20220609114911023](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091149315.png)



3、免费适用

![image-20220609115242157](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091152367.png)



4、REST方式和JAVA方式调用

![image-20220609115547766](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206091156448.png)





5、Java发送短信

> 下载JAR包，添加到工厂中

```  java
ackage com.wxapi.demo;

import com.wxapi.WxApiCall.WxApiCall;
import com.wxapi.model.RequestModel;

import java.util.HashMap;
import java.util.Map;

public class Demo {

	public static void main(String[] args) {
		RequestModel model = new RequestModel();
		model.setGwUrl("https://way.jd.com/chonry/smsnotice");
		model.setAppkey("abad3f41c206322708fb6e5986da57bd");
		Map queryMap = new HashMap();
		queryMap.put("sign","【创瑞云】"); //访问参数
		queryMap.put("mobile","17755324095"); //访问参数
		queryMap.put("content","您的本次的验证码是：0086。"); //访问参数
		model.setQueryParams(queryMap);
		WxApiCall call = new WxApiCall();
		call.setModel(model);
		call.request();
	}
}
``` 


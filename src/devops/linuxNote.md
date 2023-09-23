---
title: Linux笔记
---

## VMWare安装

虚拟机软件，推荐大家使用虚拟机安装Centos，虚拟机可以在我们的电脑上虚拟出来另外一台电脑。

>  傻瓜式安装，下一步下一步



## Centos安装

Linux主流的一种操作系统

### 安装过程

| ![image-20220810094216043](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100942403.png) | ![image-20220810094234596](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100942712.png) | ![image-20220810094256844](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100942021.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220810094403254](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100944396.png) | ![image-20220810094554913](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100945063.png) | ![image-20220810094632199](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100946347.png) |
| ![image-20220810094653849](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100946945.png) | ![image-20220810095005257](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100950453.png) | ![image-20220810095023362](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100950502.png) |

到这一步，相当于组装好了一台电脑，下一步就需要给电脑通电启动！



在虚拟机界面中，点击启动此虚拟机

| ![image-20220810095309349](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100953470.png) | ![image-20220810095414790](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100954042.png) | ![image-20220810095512936](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100955177.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220810095545597](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100955882.png) | ![image-20220810095638334](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100956563.png) | ![image-20220810095703837](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100957088.png) |
| ![image-20220810095729823](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100957053.png) | ![image-20220810095821300](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100958535.png) | ![image-20220810095916659](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208100959918.png) |
| ![image-20220810100046805](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101000011.png) | 等待安装过程...出现右边的界面点击重启                        | ![image-20220810101006460](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101010734.png) |

> 需要点击接收许可协议，完成配置即可使用了！

|                                                              |                                                              |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220810101251156](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101012290.png) | ![image-20220810101337244](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101013351.png) | ![image-20220810101434516](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101014610.png) |

> 这个用户的密码需要复杂点，自己记下来！



### 配置静态IP

> 使用命令方式设置

| 切换管理员登录，必须使用root用户操作                         |
| ------------------------------------------------------------ |
| ![image-20220810110912821](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101109923.png) |



| 查看VMNet8网卡的网段                                         |
| ------------------------------------------------------------ |
| ![image-20220810111008070](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101110189.png) |



修改网卡的配置文件

![image-20220810111333315](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101113487.png)

| 修改的内容如下，使用vi 文件名打开文件                        |
| ------------------------------------------------------------ |
| ![image-20220810111919964](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101119203.png) |

``` sh
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=f6ba0eb8-db9c-4a2f-91da-cbf7b92da2c1
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.29.110
PREFIX=24
GATEWAY=192.168.29.2
NETMASK=255.255.255.0
NM_CONTROLLED=no
DNS1=8.8.8.8
DNS2=8.8.4.4
```

> 注意上面的29网段改成自己的！



| 保存退出文件                                                 |
| ------------------------------------------------------------ |
| 先按esc 退出插入模式，按下冒号，输入wq然后回车 `:wq`         |
| 重启网卡                                                     |
| `service network restart`![image-20220810112126679](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101121790.png) |



| 查看修改后的新的IP地址，ping虚拟机的地址测试下网络           |
| ------------------------------------------------------------ |
| ![image-20220810112231323](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101122458.png) |



## FinalShell安装

| 输入连接信息                                                 |
| ------------------------------------------------------------ |
| ![image-20220810115522813](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101155017.png) |
| 接收并保存密码，看到下面的界面说明连接成功！                 |
| ![image-20220810115909140](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202208101159241.png) |



---
title: 多线程练习题
---

::: tip 需求

模拟多人爬山

![image-20220608113116176](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206081131306.png)

:::



## ClimbThread

```  java
public class ClimbThread extends Thread {
    private int time; // 爬100米的时间
    public int num = 0; // 爬多少个100米

    public ClimbThread(String name, int time, int kilometer) {
        super(name);
        this.time = time;
        this.num = kilometer * 1000 / 100;
    }

    public void run() {
        while (num > 0) {
            try {
                Thread.sleep(this.time);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "爬完100米！");
            num--;
        }
        System.out.println(Thread.currentThread().getName()+"到达终点！");
    }
}
``` 



## MainThread

```  java
/**
 * 模拟多人爬山
 */
public class Test {
    public static void main(String[] args) {
        ClimbThread youngMan = new ClimbThread("年轻人",500,1);
        ClimbThread oldMan = new ClimbThread("老年人",1500,1);
        System.out.println("********开始爬山*********");
        youngMan.start();
        oldMan.start();
    }
}
``` 



## 运行结果

| 控制台截图                                                   |
| ------------------------------------------------------------ |
| ![image-20220608113606580](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206081136660.png) |


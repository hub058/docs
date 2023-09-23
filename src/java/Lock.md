---
title: Java中的Lock详解
---


## 简介

> java.util.concurrent.locks.Lock 是一个类似于synchronized 块的线程同步机制。
>
> 但是 Lock比 synchronized 块更加灵活。Lock是个接口，有个实现类是ReentrantLock。

## Lock和syncronized的区别

- synchronized是Java语言的关键字。Lock是一个类。
- synchronized不需要用户去手动释放锁，发生异常或者线程结束时自动释放锁;Lock则必须要用户去手动释放锁，如果没有主动释放锁，就有可能导致出现死锁现象。
- lock可以配置公平策略,实现线程按照先后顺序获取锁。
- 提供了trylock方法 可以试图获取锁，获取到或获取不到时，返回不同的返回值 让程序可以灵活处理。
- lock()和unlock()可以在不同的方法中执行,可以实现同一个线程在上一个方法中lock()在后续的其他方法中unlock(),比syncronized灵活的多。



## Lock接口抽象方法

`void lock()`：

获取锁，如果锁不可用，则出于线程调度的目的，当前线程将被禁用，并且在获取锁之前处于休眠状态。

```  java
Lock lock = ...;
lock.lock();
try{
    //处理任务
}catch(Exception ex){
     
}finally{
    lock.unlock();   //释放锁
}
``` 

`boolean tryLock()`：

如果锁可用立即返回true，如果锁不可用立即返回false；
`boolean tryLock(long time, TimeUnit unit) throws InterruptedException`：

如果锁可用，则此方法立即返回true。 如果该锁不可用，则当前线程将出于线程调度目的而被禁用并处于休眠状态，直到发生以下三种情况之一为止：①当前线程获取到该锁；②当前线程被其他线程中断，并且支持中断获取锁；③经过指定的等待时间如果获得了锁，则返回true，没获取到锁返回false。

```  java
Lock lock = ...;
if(lock.tryLock()) {
     try{
         //处理任务
     }catch(Exception ex){
         
     }finally{
         lock.unlock();   //释放锁
     } 
}else {
    //如果不能获取锁，则直接做其他事情
}
``` 

`void unlock()`：

释放锁。释放锁的操作放在finally块中进行，以保证锁一定被被释放，防止死锁的发生。

## ReentrantLock

重入锁也叫做递归锁，指的是同一线程 外层函数获得锁之后 ，内层递归函数仍然有获取该锁的代码，但不受影响。避免死锁问题的,synchronized也可重入。

## synchronized重入测试

```  java
public class ReentrantDemo {
    public synchronized  void method1() {
        System.out.println("synchronized method1");
        method2();
    }
    public synchronized void method2() {
        System.out.println("synchronized method2");
    }
    public static void main(String[] args) {
        ReentrantDemo reentrantDemo = new ReentrantDemo();
        reentrantDemo.method1();
    }
}

``` 



| 执行结果                                                     |
| ------------------------------------------------------------ |
| ![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206081149742.png) |



## ReentrantLock重入测试



``` java
public class ReentrantDemo implements Runnable {
    Lock lock = new ReentrantLock();
    @Override
    public void run() {
        set();
    }
    public void set() {
        try {
            lock.lock();
            System.out.println("set 方法");
            get();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();// 必须在finally中释放
        }
    }
    
    public void get() {
        try {
            lock.lock();
            System.out.println("get 方法");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}

//=======主方法=======
public static void main(String[] args) {
    ReentrantDemo reentrantDemo = new ReentrantDemo();
    new Thread(reentrantDemo).start();
}
``` 


| 测试结果：                                                   |
| ------------------------------------------------------------ |
| 同一个线程，首先在set方法中获取锁，然后调用get方法，get方法中重复获取同一个锁。<br />两个方法都执行成功。 |
| ![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206081151349.png) |



## NonReentrantLock

> 不可重入锁，new NonReentrantLock()

``` java
public class NonLockDemo implements Runnable {
    Lock lock = new NonReentrantLock();
    @Override
    public void run() {
        set();
    }
    public  void set() {
        try {
            lock.lock();
            System.out.println("set 方法");
            get();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();// 必须在finally中释放
        }
    }

    public void get() {
        try {
            boolean b = lock.tryLock();
            if (b) {
                System.out.println("get 方法");
            } else {
                System.out.println("get 方法获取锁失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
    public static void main(String[] args) {
        NonLockDemo nonLockDemo = new NonLockDemo();
        new Thread(nonLockDemo).start();
    }
}
``` 
| 测试结果：                                                   |
| ------------------------------------------------------------ |
| 同一个线程先调用set方法并获取到锁后继续调用get方法，此时set方法还未执行所得释放，在get方法中尝试获取锁时返回false。 |
| ![在这里插入图片描述](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206081153389.png) |



## ReentrantReadWriteLock

读写锁，可以分别获取读锁或写锁。也就是说将数据的读写操作分开，分成2个锁来分配给线程，从而使得多个线程可以同时进行读操作。读锁使用共享模式；写锁使用独占模式；读锁可以在没有写锁的时候被多个线程同时持有，写锁是独占的。当有读锁时，写锁就不能获得；而当有写锁时，除了获得写锁的这个线程可以获得读锁外，其他线程不能获得读锁

`writeLock()`：获取写锁。
`readLock()`：获取读锁。
执行三个线程进行读写操作，并设置一个屏障，线程依次准备就绪后未获取锁之前都在等待，当第三个线程执行 cyclicBarrier.await();后屏障解除，三个线程同时执行。

``` java
public class WriteAndReadLockTest {
    private static ReentrantReadWriteLock reentrantReadWriteLock = new ReentrantReadWriteLock();
    private static ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(10, 10,
            60L, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());
    private static CyclicBarrier cyclicBarrier = new CyclicBarrier(3);
    private static int i = 100;
    public static void main(String[] args) {
        threadPoolExecutor.execute(()->{
            read(Thread.currentThread());
        });
        threadPoolExecutor.execute(()->{
            write(Thread.currentThread());
        });
        threadPoolExecutor.execute(()->{
            read(Thread.currentThread());
        });
        threadPoolExecutor.shutdown();
    }

    private static void read(Thread thread) {
        try {
            cyclicBarrier.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (BrokenBarrierException e) {
            e.printStackTrace();
        }
        reentrantReadWriteLock.readLock().lock();
        try {
            System.out.println("读线程 "+ thread.getName() + " 开始执行, i=" + i);
            Thread.sleep(1000);
            System.out.println(thread.getName() +" is over!");
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            reentrantReadWriteLock.readLock().unlock();

        }
    }
    private static void write(Thread thread) {
        try {
            cyclicBarrier.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (BrokenBarrierException e) {
            e.printStackTrace();
        }
        reentrantReadWriteLock.writeLock().lock();
        try {
            i++;
            System.out.println("写线程 "+ thread.getName() + " is doing, i=" + i);
            System.out.println(thread.getName() +" is over!");
        } finally {
            reentrantReadWriteLock.writeLock().unlock();
        }
    }
}
``` 
| 执行结果：                                                   |
| ------------------------------------------------------------ |
| 线程1先获取到了读锁，因为读锁时可以共享的，所有线程3也可以获取到读锁，线程1、3读操作完成后将读锁释放后，线程2才能获取到写锁并开始执行写操作。 |
| ![在这里插入图片描述](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202206081155628.png) |



## 公平锁与非公平锁

`公平锁`：

就是很公平，在并发环境中，每个线程在获取锁时会先查看此锁维护的等待队列，如果为空，或者当前线程线程是等待队列的第一个，就占有锁，否则就会加入到等待队列中，以后会按照FIFO的规则从队列中取到自己
`非公平锁`：

比较粗鲁，上来就直接尝试占有锁，如果尝试失败，就再采用类似公平锁那种方式



## 如何实现

> ReentrantLock：模式是非公平锁。也可通过构造方法创建公平锁；

```  java
public ReentrantLock() {
	sync = new NonfairSync();
}
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
``` 



> ReentrantReadWriteLock：默认是非公平锁，也可以通过构造方法创建公平锁；

```  java
public ReentrantReadWriteLock() {
	this(false);
}
public ReentrantReadWriteLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
    readerLock = new ReadLock(this);
    writerLock = new WriteLock(this);
}
``` 



## 优缺点

非公平锁性能高于公平锁性能。首先，在恢复一个被挂起的线程与该线程真正运行之间存在着严重的延迟。而且，非公平锁能更充分的利用cpu的时间片，尽量的减少cpu空闲的状态时间。
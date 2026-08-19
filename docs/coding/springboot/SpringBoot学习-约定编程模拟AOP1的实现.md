# SpringBoot学习-约定编程模拟AOP的实现.md

## 1.需求说明

### 1.1 背景说明

- 存在一个`HelloService`接口，里面一个`hello`方法。并有对应的实现类`HelloServiceImpl`；
- 存在一个拦截器`Interceptor`并有对应的实现类:`MyInterceptorIml`

### 1.2 要求执行流程

在执行`HelloServiceImpl.hello`时的执行流程如下:

- 调用`hello`方法前会先执行拦截器的`before`(前置方法);
- 调用`before`后，判断是否走拦截器的`around`（代理方法），拦截器的方法`useAround`返回`true`,则代表走。
- 调用`hello`方法后,会先执行拦截器的`after`(后置方法);
- 在执行`hello`时，**如果发生异常**则执行拦截器的`afterThrowing`;
- 在执行`hello`时，**如果没发生异常**则执行拦截器的`afterReturning`;

### 1.3 期望结果

走代理时,调用`hello("Java")`希望能打印以下内容:

```java
properties
执行拦截器方法-> before() 
执行拦截器方法-> useAround(): true
执行拦截器方法-> after() 
执行拦截器方法-> afterReturning()
结果二次处理--> Java is good
```

## 2. 代码实现

### 2.1 创建HelloSevice接口实现类

#### 1.创建HelloSevice接口

新建文件: `src/main/java/com/hui/aop/service/HelloService.java`

```java

package com.hui.aop.service;
public interface HelloService {
    String hello(String str);
}
```

#### 2.创建HelloSevice实现类

新建文件: `src/main/java/com/hui/aop/service/Impl/HelloServiceImpl.java`

```java

package com.hui.aop.service.Impl;
import com.hui.aop.service.HelloService;
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello(String str) {
        return str;
    }
}
```

### 2.2 创建拦截器以及实现类

#### 1. 创建拦截器接口

新建文件: `src/main/java/com/hui/aop/interceptor/Interceptor.java`

```java

package com.hui.aop.interceptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 定义拦截器
 */
public interface Interceptor {
    /**
     * 前置方法
     */
    boolean before();

    /**
     * 后置方法
     */
    void after();

    /**
     * 代理原有方法
     * @param target
     * @param method
     * @param params
     * @return
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     */
    Object around(Object target, Method method, Object[] params) throws InvocationTargetException, IllegalAccessException;

    /**
     * 方法执行后，没有发生异常时执行
     */
    void afterReturning();

    /**
     * 方法执行后，发生异常时执行
     */
    void afterThrowing();

    /**
     * 是否使用around方法取代原有方法
     */
    boolean useAround();
}
```

#### 2.创建拦截器实现类

新建文件: `src/main/java/com/hui/aop/interceptor/Impl/MyInterceptorIml.java`

```java

package com.hui.aop.interceptor.Impl;

import com.hui.aop.interceptor.Interceptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 实现拦截器
 */
public class MyInterceptorIml implements Interceptor {
    @Override
    public boolean before() {
        System.out.println(" 执行拦截器方法-> before() ");
        return false;
    }

    @Override
    public void after() {
        System.out.println(" 执行拦截器方法-> after() ");
    }

    @Override
    public Object around(Object target, Method method, Object[] params) throws InvocationTargetException, IllegalAccessException {
        Object invoke = method.invoke(target, params);
        return " 结果二次处理--> " + invoke + " is good";
    }

    @Override
    public void afterReturning() {
        System.out.println(" 执行拦截器方法-> afterReturning()");
    }

    @Override
    public void afterThrowing() {
        System.out.println(" 执行拦截器方法-> afterThrowing()");
    }

    @Override
    public boolean useAround() {
        boolean d =  true;
        System.out.println(" 执行拦截器方法-> useAround(): "+ d);
        return d;
    }
}
```

## 3. 织入流程

上述拦截器`MyInterceptorIml`和服务`HelloSevice`虽然已经创建成功，但是怎么将服务类和拦截方法织入对应的流程，是`ProxyBean`要实现的功能。这里通过代理模式中的**动态代理模式**来实现。动态代理相关的文章推荐:

- [Java三种代理模式：静态代理、动态代理和cglib代理 ( https://segmentfault.com/a/1190000011291179)](https://segmentfault.com/a/1190000011291179)
- [廖雪峰-动态代理(https://www.liaoxuefeng.com/wiki/1252599548343744/1264804593397984)](https://www.liaoxuefeng.com/wiki/1252599548343744/1264804593397984)
- [Java 动态代理作用是什么？(https://www.zhihu.com/question/20794107)](https://www.zhihu.com/question/20794107)

### 3.1 创建代理类ProxyBean

新建文件: `src/main/java/com/hui/aop/proxy/ProxyBean.java`

```java

package com.hui.aop.proxy;

import com.hui.aop.interceptor.Interceptor;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyBean implements InvocationHandler {

    private Object target;
    private Interceptor interceptor;

    /**
     * 绑定代理对象
     * @param target
     * @param interceptor
     * @return
     */
    public static Object getProxyBean(Object target, Interceptor interceptor){
        ProxyBean proxyBean = new ProxyBean();
        // 保存被代理对象 target
        proxyBean.target = target;
        // 保存拦截器 interceptor
        proxyBean.interceptor = interceptor;
        // 生成代理对象
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class<?>[] interfaces = target.getClass().getInterfaces();
        return Proxy.newProxyInstance(classLoader, interfaces, proxyBean);
    }


    /**
     * 约定请求流程 (代理对象的方法最终都会被JVM导向它的invoke方法)
     * @param proxy
     * @param method
     * @param args
     * @return
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 执行拦截器前置方法
        this.interceptor.before();
        boolean isError = false;
        Object result = null;
        try {
            // 检测是否要执行around方法
            if (this.interceptor.useAround()){
                // 通过拦截器触发原方法
                result = this.interceptor.around(target,method,args);
            }  else  {
                // 直接执行原方法
                result = method.invoke(target,args);
            }
            // 执行拦截器后置方法
            this.interceptor.after();
        } catch (Exception e){
            isError = true;
        }

        if (isError){
            // 方法执行后，发生异常时执行
            this.interceptor.afterThrowing();
        } else  {
            // 方法执行后，没有发生异常时执行
            this.interceptor.afterReturning();
        }
        return result;
    }
}
```

### 3.2 代码测试

新建文件：`src/test/java/com/hui/aop/AopApplicationTests.java`

```java

package com.hui.aop;

import com.hui.aop.interceptor.Impl.MyInterceptorIml;
import com.hui.aop.proxy.ProxyBean;
import com.hui.aop.service.HelloService;
import com.hui.aop.service.Impl.HelloServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AopApplicationTests {
    @Test
    void contextLoads() {
        HelloService proxyBean = (HelloService) ProxyBean.getProxyBean(new HelloServiceImpl(), new MyInterceptorIml());
        System.out.println(proxyBean.hello("Java"));
    }
}
```

**输出**

```
properties
执行拦截器方法-> before() 
执行拦截器方法-> useAround(): true
执行拦截器方法-> after() 
执行拦截器方法-> afterReturning()
结果二次处理--> Java is good
```

[上述源码地址（https://github.com/java-item/aop-demo）](https://github.com/java-item/aop-demo)




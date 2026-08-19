## SpringBoot学习AOP使用实践.md

### 1.AOP的概念

`AOP（Aspect-Oriented Programming，面向切面编程）`是`Spring`框架**面向切面**的编程思想，其利用一种被我们称为`“横切”`的技术，对`OOP（Object-OrientedPrograming，面向对象编程`）进行了补充和完善。使用`AOP`的横向切入可以对系统进行无侵入性的日志监听、事务管理、权限管理等。

### 2. 为什么使用AOP

- `AOP`可以减少大量重复的工作,提升代码使用率；
- `Spring AOP`可以处理一些无法使用`OOP`实现的业务逻辑；
- 通过约定，可以将一些业务逻辑织入流程中，并且可以将一些通用的逻辑抽取出来；从而可以使代码更加简短，维护性更高；
- 对现有的业务可以达到既增强又对业务零侵入；

### 3.AOP术语

| 名词                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| 切面(`Aspect`)       | `@Aspect`将一个java类定**义为切面类**。切面是对横切关注点的抽象。 在切面中会包含一些切入点(`Pointcut`)以及相应的通知(`Advice`)。 |
| 连接点(`Join Point`) | 对应的是具体被拦截的对象，因为`Spring`只能支持方法， 所以被拦截的对象往往就是指特定的方法。 |
| 切点(`Pointcut`)     | 使用`@Pointcut`定义的切点(规则表达式)。对连接点进行拦截定义。 切点表示一组连接点，这些连接点通过逻辑关系组合起来或者通过正则表达式集合起来。 |
| 通知(`Advice`)       | 所谓通知就是指拦截到连接点之后要执行的代码， 通知分为前置、后置、环绕、事后返回和异常通知等5种； 前置`@Before`:在切点开始处切入内容； 后置`@After`:在切点结尾处切入内容； 事后返回`@AfterReturning`:在切点return之后切入内容； 环绕`@Around`:在切点前后切入内容，并自己控制何时执行切入； 异常`@AfterThrowing`:用来处理切入内容部分抛出异常之后的处理逻辑； **接收参数**： `@Around`: 这个方法参数必须为`ProceedingJoinPoint`，`proceed()`方法就是被切面的方法。 其他四个注解接收的参数:`JoinPoint` |
| 目标对象(`Target`)   | 即被代理对象                                                 |
| 织入                 | 是一个通过动态代理技术，为原有服务对象生成代理对象， 然后将与切点定义匹配的连接点拦截，并按约定将各类通知织入约定流程的过程。 |
| 引入                 | 是指引入新的类和其方法，增强现有Bean的功能。                 |
| AOP代理              | 在`Spring`中，AOP代理可以用动态代理或CGLIB代理实现， 而通过拦截器模型应用切面 |

### 4. 在SpringBoot中使用

#### 4.1 引入依赖

```xml

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

#### 4.2 创建服务对象

##### 1.创建HelloSevice接口

新建文件: `src/main/java/com/hui/aop/service/HelloService.java`

```java

package com.hui.aop.service;
public interface HelloService {
    String hello(String str);
}
```

##### 2.创建HelloSevice实现类

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

#### 4.3 开发切面

##### 1.切面代码清单

新建文件: `src/main/java/com/hui/aop/aspect/MyAspect.java`

```java
java
package com.hui.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import java.util.Arrays;

/**
 * 定义切面类
 */
@Aspect
@Component
public class MyAspect {
    /**
     * 定义切点
     */
    @Pointcut("execution(public * com.hui.aop.service.Impl.HelloServiceImpl.hello(..))")
    public void pointCut(){}

    /**
     * 前置通知
     */
    @Before("pointCut()")
    public void before(){
        System.out.println("MyAspect --> before");
    }

    /**
     * 环绕通知
     * @param proceedingJoinPoint
     * @return
     * @throws Throwable
     */
    @Around("pointCut()")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
        String argsString = Arrays.toString(proceedingJoinPoint.getArgs());
        System.out.println("MyAspect --> around-before ");
        Object proceed = proceedingJoinPoint.proceed();
        System.out.println("MyAspect --> around-after ");
        return  proceed;
    }

    /**
     * 后置通知
     * @param joinPoint
     */
    @After("pointCut()")
    public void after(JoinPoint joinPoint){
        System.out.println("MyAspect --> after");
    }


    /**
     * 事后返回
     * @param joinPoint
     */
    @AfterReturning("pointCut()")
    public void afterReturning(JoinPoint joinPoint){
        System.out.println("MyAspect --> afterReturning");
    }

    /**
     * 异常
     * @param joinPoint
     */
    @AfterThrowing("pointCut()")
    public void afterThrow(JoinPoint joinPoint){
        System.out.println("MyAspect --> afterThrow");
    }
}
```

##### 2.测试AOP

新建文件: `src/test/java/com/hui/aop/AopApplicationTests.java`

```java

package com.hui.aop;

import com.hui.aop.service.HelloService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class AopApplicationTests {
    @Resource
    private HelloService helloService;
    @Test
    void contextLoads() {
        String java = helloService.hello("Java");
        System.out.println("result -->" + java);
    }
}
```

**输出:**

```
properties
MyAspect --> around-before 
MyAspect --> before
MyAspect --> afterReturning
MyAspect --> after
MyAspect --> around-after 
result -->Java
```

> 有环绕通知(`@Around`)的时候,执行流程是总是先执行`@Around`–>`@Before`,这是在使用时需要注意的。

##### 3.代码分析

**@Pointcut**

```java

@Pointcut("execution(* com.hui.aop.service.Impl.HelloServiceImpl.hello(..))")
```

`execution`方法参数:

```
java
//可以使用通配符匹配字符，*可以匹配任意字符
execution(方法修饰符(可选) 返回类型　方法名　参数　异常模式(可选))
```

- `*`: 表示任意返回的类型；
- `com.hui.aop.service.Impl.HelloServiceImpl`: 指定目标对象的全限定名称;
- `hello`: 指定目标对象的方法；
- `(..)`: 表示任意参数进行匹配






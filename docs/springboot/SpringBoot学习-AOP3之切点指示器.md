# SpringBoot学习AOP之切点指示器



## 1.切点指示器

在`Spring AOP`中，要使用`AspectJ`的**切点表达式语言**来定义切点，但是`Spring`仅支持`AspectJ`切点指示器的一个子集,`Spirng AOP`支持的`AspectJ`切点指示器有：

| AspectJ指示器       | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| `args()`            | 限定连接点参数                                               |
| `@args()`           | 通过连接点方法参数上的注解进行限定                           |
| `execution()`       | 用于匹配是连接点的执行方法                                   |
| `this()`            | 限制连接点匹配`AOP`代理的`bean`引用为指定类型的类            |
| `target`            | 限制连接点匹配目标对象为指定类型的类                         |
| `@target()`         | 限制目标对象的配置了指定的注解                               |
| `within()`          | 限制连接点匹配的指定类型                                     |
| `@within(注解类型)` | 限制连接点匹配指定注解所标注的类型 只能作用于类，不能是方法，也不能是接口。 |
| `@annotation`       | 限定匹配带有指定注解的连接点                                 |

## 2. 准备测试条件

为了方便测试使用，需创建

### 2.1 创建HelloSevice接口

新建文件: `src/main/java/com/hui/aop/service/HelloService.java`

```java

package com.hui.aop.service;
public interface HelloService {
    String hello(String str);
}
```

### 2.2 创建HelloSevice实现类

新建文件: `src/main/java/com/hui/aop/service/Impl/HelloServiceImpl.java`

```

package com.hui.aop.service.Impl;
import com.hui.aop.service.HelloService;
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello(String str) {
        return str;
    }
}
```

### 2.3 创建切面

新建文件: `src/main/java/com/hui/aop/aspect/UseAspectJ.java`

```
java
package com.hui.aop.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class UseAspectJ {
  // 后续测试添加
}
```

## 3.指示器使用

### 3.1 args()

```
java
/**
 * 编写切面
 */
@Aspect
@Component
public class UseAspectJ {
    @Pointcut(value = "execution(* com.hui.aop.service.Impl.HelloServiceImpl.hello(..)) && args(arg)")
    public void testArgs(String arg){}
    @Before(value = "testArgs(arg)", argNames = "arg")
    public void useArgs(String arg){
        System.out.println("arg = " + arg);
    }
}

/**
 * 测试
 */
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
/**输出
 arg = Java
 result -->Java
 */
```

> 这种获取参数的方式不太灵活，而且开销大，所以可以用另外一种更加便捷的方式获取参数，可以通过`joinPoint.getArgs()`的方式去拿方法参数

### 3.2 execution

`execution`指示器是我们在编写切点定义时最主要使用的指示器。

#### 1. 语法

```
java
// 可以使用通配符匹配字符，*可以匹配任意字符
execution( 方法修饰符(可选) 返回类型　方法名　参数　异常模式(可选))
```

- `*`: 表示任意xx；
- `com.hui.aop.service.Impl.HelloServiceImpl`: 指定目标对象的全限定名称;
- `hello`: 指定目标对象的方法；
- `(..)`: 表示任意参数进行匹配

#### 2. 表达式匹配

| 正则表达式                                                   | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `public * *(..)`                                             | 任何公共方法的执行                                           |
| `* com.hui..IPointcutService.*()`                            | `com.hui`包及所有子包下`IPointcutService`接口中的任何无参方法 |
| `* com.hui..*.*(..)`                                         | `com.hui`包及所有子包下任何类的任何方法                      |
| `* com.hui..IPointcutService.*(*)`                           | `com.hui`包及所有子包下`IPointcutService`接口的任何只有一个参数方法 |
| `* (!com.hui..IPointcutService+).*(..)`                      | 非`com.hui`包及所有子包下`IPointcutService`接口及子类型的任何方法 |
| `* com.hui..IPointcutService+.*()`                           | `com.hui`包及所有子包下`IPointcutService`接口及子类型的的任何无参方法 |
| `* com.hui..IPointcut*.test*(java.util.Date)`                | `com.hui`包及所有子包下`IPointcut`前缀类型的的以test开头的只有一个参数类型为`java.util.Date`的方法， 注意该匹配是根据方法签名的参数类型进行匹配的，而不是根据执行时传入的参数类型决定的。 如定义方法：`public void test(Object obj)`;即使执行时传入`java.util.Date`，也不会匹配的； |
| `* com.hui..IPointcut*.test*(..) throws IllegalArgumentException, ArrayIndexOutOfBoundsException` | `com.hui`包及所有子包下`IPointcut`前缀类型的的任何方法， 且抛出`IllegalArgumentException`和`ArrayIndexOutOfBoundsException`异常 |
| `* (com.hui..IPointcutService+ && java.io.Serializable+).*(..)` | 任何实现了`com.hui`包及所有子包下`IPointcutService`接口和`java.io.Serializable`接口的类型的任何方法 |
| `@java.lang.Deprecated * *(..)`                              | 任何持有`@java.lang.Deprecated`注解的方法                    |
| `* *(java.util.Map<com.hui..Model, com.hui..Model>, ..)`     | 任何带有一个`java.util.Map`参数的方法，且该参数类型是以`<com.hui..Model, com.hui..Model>`为泛型参数； 注意只匹配第一个参数为`java.util.Map`,不包括子类型； 如`public void test(HashMap<Model, Model> map, String str)`;将不匹配，必须使用`* *(java.util.HashMap<com.hui..Model,com.hui..Model>, ..)`进行匹配； 而`public void test(Map map, int i)`;也将不匹配，因为泛型参数不匹配 |

### 3.3 within

为了方便类型（**如接口、类名、包名**）过滤方法，AOP 提供了`within`关键字。其语法格式如下：

#### 1.语法

```
java
with(类型)//注意：within的粒度为类
```

#### 2. 使用

```
java
// 匹配 com.hui.aop.service.Impl.HelloServiceImpl 类中的所有方法 
@Pointcut(value = "within(com.hui.aop.service.Impl.HelloServiceImpl)")

// 匹配com.hui.aop.service.Impl包及其子包中所有类中的所有方法 
@Pointcut(value = "within(com.hui.aop.service.Impl..*)")

// 匹配所有实现com.hui.aop.service.HelloService接口的类的所有方法，包括接口方法和实现类的额外方法
@Pointcut(value = "within(com.hui.aop.service.HelloService+)")
```

### 3.4 @annotation

匹配带有指定注解的连接点(注意是方法)；

#### 1.创建自定义注解

新建文件: `src/main/java/com/hui/aop/annotation/AopTest.java`

```
java
package com.hui.aop.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AopTest {
    String value() default "";
}
```

#### 2.给方法添加注解

修改文件: `src/main/java/com/hui/aop/service/Impl/HelloServiceImpl.java`

```
java
package com.hui.aop.service.Impl;

import com.hui.aop.annotation.AopTest;
import com.hui.aop.service.HelloService;
import org.springframework.stereotype.Service;

@Service
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello(String str) {
        return str;
    }
    // 添加注解
    @AopTest("hello")
    public void other(String str){
        System.out.println("other....." + str);
    }
}
```

#### 3.编辑切面

修改文件: `src/main/java/com/hui/aop/aspect/UseAspectJ.java`

```
java
package com.hui.aop.aspect;
import com.hui.aop.annotation.AopTest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Aspect
@Component
public class UseAspectJ {
    @Pointcut("@annotation(com.hui.aop.annotation.AopTest)")
    public void pointCut(){}

    @Before("pointCut() && @annotation(aopTest)")
    public void before(JoinPoint joinPoint,AopTest aopTest){
        // 获取方法参数
        String param = Arrays.toString(joinPoint.getArgs());
        // 获取注解值
        String value = aopTest.value();
        System.out.println("before -> 方法参数: " + param + "注解值: " + value);
    }
}
```

#### 4. 测试输出

```
java
@SpringBootTest
class AopApplicationTests {
    @Resource
    private HelloServiceImpl helloService;
    @Test
    void contextLoads() {
        helloService.other("other");
    }
}
/* 输出:
before -> 方法参数: [other]注解值: hello
other.....other
*/
```

### 4.相关文章推荐

- [慕课网-AOP切面表达式](https://www.imooc.com/article/39144)
- [aop切点表达式（execution）](https://www.jianshu.com/p/044c149caf7f)


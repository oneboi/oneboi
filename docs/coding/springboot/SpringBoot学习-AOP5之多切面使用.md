## SpringBoot学习-AOP之多切面使用

> `Spring`可以支持多个切面的运行，在组织多个切面时，我们需要设置其运行的顺序。

### 1.创建服务

```java

/*接口*/
package com.hui.aop.service;
public interface HelloService {
    void hello(String str);
}

/*实现类*/
package com.hui.aop.service.Impl;
import com.hui.aop.service.HelloService;
import org.springframework.stereotype.Service;

@Service
public class HelloServiceImpl implements HelloService {
    @Override
    public void hello(String str) {
        System.out.println(str);
    }
}
```

### 2.定义多个切面

**切面1**： `src/main/java/com/hui/aop/aspect/OneAspect.java`

```java

package com.hui.aop.aspect;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
@Aspect
@Component
public class OneAspect {
    @Pointcut("execution(* com.hui.aop.service.Impl.HelloServiceImpl.hello(..))")
    public void point(){}
    @Before("point()")
    public void before(){
        System.out.println("OneAspect --> Before");
    }
    @After("point()")
    public void after(){
        System.out.println("OneAspect --> after");
    }
}
```

**切面2**： `src/main/java/com/hui/aop/aspect/TwoAspect.java`

```

package com.hui.aop.aspect;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TwoAspect {
    @Pointcut("execution(* com.hui.aop.service.Impl.HelloServiceImpl.hello(..))")
    public void point(){}
    @Before("point()")
    public void before(){
        System.out.println("TwoAspect --> Before");
    }
    @After("point()")
    public void after(){
        System.out.println("TwoAspect --> after");
    }
}
```

**切面3**： `src/main/java/com/hui/aop/aspect/ThreeAspect.java`

```java

package com.hui.aop.aspect;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
@Aspect
@Component
public class ThreeAspect {
    @Pointcut("execution(* com.hui.aop.service.Impl.HelloServiceImpl.hello(..))")
    public void point(){}
    @Before("point()")
    public void before(){
        System.out.println("ThreeAspect --> Before");
    }
    @After("point()")
    public void after(){
        System.out.println("ThreeAspect --> after");
    }
}
```

### 3. 测试

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
         helloService.hello("测试多个切面");
    }
}

/** 输出:
OneAspect --> Before
ThreeAspect --> Before
TwoAspect --> Before
测试多个切面
TwoAspect --> after
ThreeAspect --> after
OneAspect --> after
*/
```

### 4.控制顺序

当多个切面同时拦截相同的方法时，我们就需要控制切面的执行顺序，`Spring`提供了一个注解`@Order`和一个接口`Ordered`，我们可以使用它们的任意一个指定切面的顺序。

#### 4.1 修改上述切面

```java

...
@Order(1) // 定义切面顺序
public class OneAspect {...}

...
@Order(2) // 定义切面顺序
public class TwoAspect {...}

...
@Order(3) // 定义切面顺序
public class ThreeAspect {...}

/** 输出
OneAspect --> Before
TwoAspect --> Before
ThreeAspect --> Before
测试多个切面
ThreeAspect --> after
TwoAspect --> after
OneAspect --> after
*/
```

> 我们可以看到，对于前置通知（`before`）都是从小到大运行的，而对于后置通知和返回通知都是从大到小运行的，这就是一个典型的责任链模式的顺序。


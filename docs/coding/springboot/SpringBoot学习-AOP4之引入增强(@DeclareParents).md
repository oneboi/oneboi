### 1.需求说明

在不修改`HelloService`服务的情况下,调用`HelloService`服务中的`Hello`方法时，需要根据不同的参数，输出不同的内容。

- 如果参数是`Java`则输出:`[Java]`
- 如果参数是`PHP`则输出: `{PHP}`

### 2. 创建引入接口和服务

#### 2.1 新建HelloParamService接口

```
java
package com.hui.aop.service;
public interface HelloParamService {
    public String printOut(String str);
}
```

#### 2.2 新建HelloParamService实现类

```
java
package com.hui.aop.service.Impl;
import com.hui.aop.service.HelloParamService;
import org.springframework.stereotype.Service;
@Service
public class HelloParamServiceImpl implements HelloParamService {
    @Override
    public String printOut(String str) {
        if (str.equals("PHP")){
            return "{PHP}";
        } else if (str.equals("JAVA")){
            return "[JAVA]";
        }
        return str;
    }
}
```

### 3. 编辑切面

新建文件: `src/main/java/com/hui/aop/aspect/MyAspect.java`

```
java
package com.hui.aop.aspect;
import com.hui.aop.service.HelloParamService;
import com.hui.aop.service.Impl.HelloParamServiceImpl;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
/**
 * 定义切面类
 */
@Aspect
@Component
public class MyAspect {
    /**
     * 引入其他接口
     */
    @DeclareParents(value = "com.hui.aop.service.Impl.HelloServiceImpl",defaultImpl = HelloParamServiceImpl.class)
    public HelloParamService helloParamService;
}
```

### 4. 测试

新建文件: `src/test/java/com/hui/aop/AopApplicationTests.java`

```
java
package com.hui.aop;

import com.hui.aop.service.HelloParamService;
import com.hui.aop.service.HelloService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
class AopApplicationTests {
    @Resource
    private HelloService helloService;
    @Test
    void contextLoads() {
        List<String> paramList = Arrays.asList("Java", null);
        paramList.forEach(s -> {
            HelloParamService helloParamService = (HelloParamService) helloService;
            if (helloParamService.checkParam(s)) {
                System.out.println("result -->" +  helloService.hello(s));
            }
        });
    }
}
/* 输出:
引入增强接口 = Java
result -->Java
引入增强接口 = null
*/
```

### 5. 代码分析

上述代码中我们是通过注解`@DeclareParents`引入新的类来增强服务，它有两个必须配置的属性: `value`和`defaultImpl`。

- `value`: 指向要增强功能的目标对象，这里是指:`com.hui.aop.service.Impl.HelloServiceImpl`。
- `defaultImpl`: 引入增强功能的类，这指`HelloParamServiceImpl`，用来提供校验参数是否为空的功能。




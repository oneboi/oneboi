# java的可变参数的定义和使用



* Java中的可变参数允许在方法中传递任意数量的参数（包括零个）。

* 在方法定义中，使用省略号（...）来表示可变参数。

* 可变参数在方法内部被当作数组来处理。

定义可变参数方法的语法：

```java
public void methodName(dataType... variableName) {
    // 方法体
}
```



注意事项：

1. 每个方法只能有一个可变参数。
2. 可变参数必须是方法的最后一个参数。

使用示例：

1. 定义可变参数方法：

```java
public static void printNumbers(int... numbers) {
    //可变参数的本质是数组
    for (int number : numbers) {
        System.out.println(number);
    }
}
```



1. 调用可变参数方法：

```java
// 可以传递任意数量的参数
printNumbers(1, 2, 3);
printNumbers(10, 20);
printNumbers(); // 甚至可以不传参数
```



1. 如果方法有多个参数，可变参数必须放在最后：

```java
public static void printDetails(String message, int... numbers) {
    System.out.println(message);
    for (int number : numbers) {
        System.out.println(number);
    }
}

// 调用
printDetails("Numbers:", 1, 2, 3);
```



1. 传递数组给可变参数：
   可以直接将数组传递给可变参数，因为可变参数本质上就是数组。

```java
int[] arr = {1, 2, 3, 4};
printNumbers(arr);
```



1. 在问题中的方法`equalsAny`中，第二个参数就是可变参数，可以这样调用：

   ```java
     @Override
       public void checkRoleAllowed(SysRoleBo role) {
           if (ObjectUtil.isNotNull(role.getRoleId()) && LoginHelper.isSuperAdmin(role.getRoleId())) {
               throw new ServiceException("不允许操作超级管理员角色");
           }
           String[] keys = new String[]{TenantConstants.SUPER_ADMIN_ROLE_KEY, TenantConstants.TENANT_ADMIN_ROLE_KEY};
           // 新增不允许使用 管理员标识符
           if (ObjectUtil.isNull(role.getRoleId())
               && StringUtils.equalsAny(role.getRoleKey(), keys)) {
               throw new ServiceException("不允许使用系统内置管理员角色标识符!");
           }
           // 修改不允许修改 管理员标识符
           if (ObjectUtil.isNotNull(role.getRoleId())) {
               SysRole sysRole = baseMapper.selectById(role.getRoleId());
               // 如果标识符不相等 判断为修改了管理员标识符
               if (!StringUtils.equals(sysRole.getRoleKey(), role.getRoleKey())) {
                    //给定的字符，是否在数组中
                   if (StringUtils.equalsAny(sysRole.getRoleKey(), keys)) {
                       throw new ServiceException("不允许修改系统内置管理员角色标识符!");
                   } else if (StringUtils.equalsAny(role.getRoleKey(), keys)) {
                       throw new ServiceException("不允许使用系统内置管理员角色标识符!");
                   }
               }
           }
       }
   
       public static boolean equalsAny(CharSequence string, CharSequence... searchStrings) {
           if (ArrayUtils.isNotEmpty(searchStrings)) {
               for(CharSequence next : searchStrings) {
                   if (equals(string, next)) {
                       return true;
                   }
               }
           }
   
           return false;
       }
   
   ```

   

```java
equalsAny("hello", "hello", "world"); // 传递两个字符串
equalsAny("test", "a", "b", "c", "d"); // 传递多个字符串
equalsAny("foo"); // 只传递第一个参数，可变参数部分为空
```



1. 注意：如果传递一个数组给可变参数，可以直接传递，因为可变参数就是数组。例如：



```java
String[] searchStrings = {"A", "B", "C"};
boolean result = equalsAny("B", searchStrings);
```



1. 如果已经有一个数组，也可以直接传递，但是要注意，如果传递一个数组，它会被当作一个参数（即整个数组作为可变参数数组的一个元素）吗？不是的，在调用时，如果传递一个数组给可变参数，Java会自动将数组拆分为多个参数。但是，如果数组是基本类型数组，则不会自动拆箱。对于引用类型数组，会当作多个参数传递。

   实际上，对于可变参数，传递数组时，数组的每个元素会成为可变参数数组的一个元素。例如：



```java
String[] array = new String[]{"A", "B"};
equalsAny("A", array); // 等价于 equalsAny("A", "A", "B")
```



1. 如果有一个集合，可以转换为数组再传递：



```java
List<String> list = Arrays.asList("A", "B", "C");
equalsAny("A", list.toArray(new String[0]));
```



可变参数的使用使得方法调用更加灵活，特别是在参数数量不确定的情况下。但是要注意，可变参数在每次调用时都会创建一个数组，因此可能会有性能开销，在性能敏感的场景中需要谨慎使用。

# Java 可变参数（Varargs）的定义和使用

## 1. **定义可变参数方法**

### 基本语法



```java
// 方法定义时使用三个点(...)表示可变参数
public static void printNames(String... names) {
    for (String name : names) {
        System.out.println(name);
    }
}

// 可变参数必须是最后一个参数
public static void printInfo(String title, String... messages) {
    System.out.println("Title: " + title);
    for (String msg : messages) {
        System.out.println("- " + msg);
    }
}
```



### 注意事项



```java
// ❌ 错误：可变参数必须是最后一个参数
// public static void errorMethod(String... values, int count) {}

// ✅ 正确：可变参数在最后
public static void correctMethod(int count, String... values) {}
```



## 2. **调用可变参数方法**

### 传递多个参数



```java
// 1. 传递多个单独的参数
printNames("Alice", "Bob", "Charlie");
// 输出：
// Alice
// Bob
// Charlie

printInfo("系统消息", "用户登录", "操作成功");
// 输出：
// Title: 系统消息
// - 用户登录
// - 操作成功
```



### 传递数组



```java
// 2. 传递数组（自动解包）
String[] namesArray = {"张三", "李四", "王五"};
printNames(namesArray);

// 等同于
printNames("张三", "李四", "王五");
```



### 不传递参数



```java
// 3. 零个参数
printNames(); // 不报错，names 为空数组

printInfo("提示"); // 只传必需参数，messages 为空数组
```



### 混合传递



```java
// 4. 混合情况
printInfo("错误日志", "错误1", "错误2", "错误3");

// 复杂的例子
List<String> list = Arrays.asList("item1", "item2", "item3");
printInfo("列表", list.toArray(new String[0]));
```



## 3. **实际使用示例**

### 工具类方法



```java
public class StringUtils {
    // 检查字符串是否为空或null
    public static boolean isAnyEmpty(String... strings) {
        if (strings == null) return true;
        for (String str : strings) {
            if (str == null || str.trim().isEmpty()) {
                return true;
            }
        }
        return false;
    }
}

// 使用
boolean result1 = StringUtils.isAnyEmpty("a", "b", ""); // true
boolean result2 = StringUtils.isAnyEmpty("hello", "world"); // false
boolean result3 = StringUtils.isAnyEmpty(); // true
```



### 计算示例



```java
public class Calculator {
    // 计算多个数的和
    public static int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
    
    // 求最大值
    public static int max(int first, int... rest) {
        int max = first;
        for (int num : rest) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }
}

// 使用
int total = Calculator.sum(1, 2, 3, 4, 5); // 15
int maxNum = Calculator.max(10, 5, 8, 20, 3); // 20
```



## 4. **可变参数与数组参数的区别**



```java
public class VarargsExample {
    // 方法1：可变参数
    public static void method1(String... args) {
        System.out.println("Varargs: " + Arrays.toString(args));
    }
    
    // 方法2：数组参数
    public static void method2(String[] args) {
        System.out.println("Array: " + Arrays.toString(args));
    }
    
    public static void main(String[] args) {
        // 调用方式对比：
        
        // ✅ 可变参数可以这样调用
        method1(); // 不传参数
        method1("a");
        method1("a", "b", "c");
        method1(new String[]{"x", "y"}); // 可以传数组
        
        // ❌ 数组参数不能这样调用
        // method2(); // 编译错误
        // method2("a", "b", "c"); // 编译错误
        
        // ✅ 数组参数必须这样调用
        method2(new String[]{"x", "y"});
        method2(new String[0]); // 空数组
    }
}
```



## 5. **注意事项和最佳实践**

### 注意事项



```java
public class ImportantNotes {
    // 1. 重载时的歧义
    public static void process(String... strings) {}
    public static void process(String s1, String s2) {}
    
    // 调用时会有歧义
    // process("a", "b"); // 应该调用哪个？
    
    // 2. null 的处理
    public static void handle(String... args) {
        if (args == null) {
            System.out.println("args is null");
        } else if (args.length == 0) {
            System.out.println("args is empty array");
        } else {
            System.out.println("args has " + args.length + " elements");
        }
    }
}
```



### 最佳实践



```java
public class BestPractices {
    // 1. 使用 @SafeVarargs 注解（Java 7+）
    @SafeVarargs
    public static <T> List<T> asList(T... elements) {
        List<T> list = new ArrayList<>();
        Collections.addAll(list, elements);
        return list;
    }
    
    // 2. 清晰的文档说明
    /**
     * 格式化字符串
     * @param pattern 格式模式
     * @param args 可变参数，用于填充占位符
     * @return 格式化后的字符串
     */
    public static String format(String pattern, Object... args) {
        return String.format(pattern, args);
    }
    
    // 3. 性能考虑：避免在频繁调用的方法中使用
    public static void logMessages(String... messages) {
        // 每次调用都会创建数组，对于高性能要求场景要小心
    }
}
```



## 6. **可变参数在实际框架中的应用**



```java
// Spring MVC 中的使用
@Controller
public class UserController {
    @GetMapping("/users")
    public String getUsers(Model model, @RequestParam("ids") Long... userIds) {
        // 可以接受多个ID参数：/users?ids=1&ids=2&ids=3
        List<User> users = userService.getUsersByIds(userIds);
        model.addAttribute("users", users);
        return "users";
    }
}

// 测试中的使用
@Test
public void testMultipleScenarios() {
    // JUnit 参数化测试
    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {"test1", 1, 2, 3},
            {"test2", 4, 5, 6}
        });
    }
}
```



## 总结

**可变参数的使用场景：**

1. 参数数量不确定的方法
2. 需要向后兼容旧代码
3. 简化方法调用，提高代码可读性
4. 工具类方法的实现

**关键点：**

- 可变参数本质上是数组的语法糖
- 只能有一个可变参数，且必须在最后
- 可以传递0个或多个参数，也可以传递数组
- 注意与重载方法的歧义问题
- 在性能敏感的场景中谨慎使用
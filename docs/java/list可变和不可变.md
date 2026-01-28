Java 9 之后，`List.of()`方法返回的是**不可变 List**。下面详细介绍不可变 List 和可变 List 的区别：

## 主要区别

### 1 可变性

- **可变 List**：可以修改、添加、删除元素
- **不可变 List**：创建后不能修改、添加、删除任何元素

### 2 支持的操作

```java
import java.util.ArrayList;
import java.util.List;

public class ListComparison {
    public static void main(String[] args) {
        // 可变List
        List<Integer> mutableList = new ArrayList<>();
        mutableList.add(1);
        mutableList.add(2);
        mutableList.set(0, 10);  // 可以修改
        mutableList.remove(0);   // 可以删除
        System.out.println("可变List: " + mutableList);
        
        // 不可变List
        List<Integer> immutableList = List.of(2, 3);
        System.out.println("不可变List: " + immutableList);
        
        try {
            // 以下操作都会抛出UnsupportedOperationException
            immutableList.add(4);      // 编译通过，但运行时异常
            immutableList.set(0, 20);  // 编译通过，但运行时异常
            immutableList.remove(0);   // 编译通过，但运行时异常
        } catch (UnsupportedOperationException e) {
            System.out.println("不可变List不支持修改操作: " + e.getMessage());
        }
    }
}
```

### 3 创建方式

```java
// 可变List的创建方式
List<Integer> mutable1 = new ArrayList<>();
List<Integer> mutable2 = new ArrayList<>(List.of(1, 2, 3));
List<Integer> mutable3 = Arrays.asList(1, 2, 3); // 这个也是固定大小的

// 不可变List的创建方式
List<Integer> immutable1 = List.of(1, 2, 3);
List<Integer> immutable2 = List.of(); // 空的不可变List
List<Integer> immutable3 = List.copyOf(mutableList); // 复制可变List创建不可变List
```

### 4 线程安全性

- **可变 List**：不是线程安全的，多线程环境需要额外同步
- **不可变 List**：天然线程安全，多个线程可以安全地共享

### 5 性能特点

- **不可变 List**：

  

  - 创建时内存占用较小
  - 不需要额外的同步开销
  - 适合频繁读取、很少修改的场景

  

- **可变 List**：

  

  - 支持动态修改
  - 内存管理更复杂
  - 适合需要频繁修改的场景

  

### 6 异常处理

```java
public class ImmutableListExample {
    public static void main(String[] args) {
        // 创建不可变List
        List<String> names = List.of("Alice", "Bob", "Charlie");
        
        // 遍历是安全的
        for (String name : names) {
            System.out.println(name);
        }
        
        // 尝试修改会抛出异常
        try {
            names.add("David");
        } catch (UnsupportedOperationException e) {
            System.out.println("不能添加元素到不可变List");
        }
        
        try {
            names.remove(0);
        } catch (UnsupportedOperationException e) {
            System.out.println("不能删除元素从不可变List");
        }
        
        try {
            names.set(0, "Alex");
        } catch (UnsupportedOperationException e) {
            System.out.println("不能修改元素在不可变List中");
        }
    }
}
```

## 使用建议

### 什么时候用不可变 List：

1 数据一旦创建就不再需要修改

2 需要在多线程环境中共享数据

3 作为方法的返回值，避免外部修改

4 作为方法的参数，确保参数不被修改

### 什么时候用可变 List：

1 需要动态添加、删除、修改元素

2 数据结构需要频繁更新

3 实现队列、栈等动态数据结构

```java
// 好的实践：返回不可变List
public List<String> getConfigOptions() {
    return List.of("option1", "option2", "option3");
}

// 好的实践：参数校验后转为不可变List
public void processData(List<Integer> data) {
    if (data == null || data.isEmpty()) {
        throw new IllegalArgumentException("Data cannot be empty");
    }
    // 转换为不可变List以确保不被修改
    List<Integer> immutableData = List.copyOf(data);
    // 处理数据...
}
```

不可变 List 提供了更好的安全性和性能，是现代 Java 开发中的推荐做法。
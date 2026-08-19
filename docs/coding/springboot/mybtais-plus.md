# mybatis-plus的写法

## lamda条件构造器的写法



```java 
@Override
public boolean checkRoleNameUnique(SysRoleBo role) {
    // 构建Lambda查询条件
    boolean exist = baseMapper.exists(new LambdaQueryWrapper<SysRole>()
        // 条件1：角色名称相等
        .eq(SysRole::getRoleName, role.getRoleName())
        // 条件2：当roleId不为null时，排除自身（避免更新时把自己也算作重复）
        .ne(ObjectUtil.isNotNull(role.getRoleId()), SysRole::getRoleId, role.getRoleId()));
    
    // 存在则返回false（不唯一），不存在则返回true（唯一）
    return !exist;
}
```



```java
.ne(ObjectUtil.isNotNull(role.getRoleId()), SysRole::getRoleId, role.getRoleId())
核心逻辑：排除自身记录

参数1：ObjectUtil.isNotNull(role.getRoleId()) - 条件判断

为true时：添加不等于条件

为false时：不添加此条件

参数2：SysRole::getRoleId - 字段引用

参数3：role.getRoleId() - 比较值

生成的SQL：role_id != #{roleId}
```



---





# MyBatis-Plus 中 `et` 和 `ew` 的含义与使用

## 1. **`et` 和 `ew` 的基本含义**

### `et` - Entity 实体

- **全称**：Entity（实体）
- **作用**：代表当前操作的实体对象
- **默认值**：`et`
- **源码中的定义**：

java

```
String ENTITY = "et";
String ENTITY_DOT = ENTITY + DOT;  // DOT = "."
```



### `ew` - Entity Wrapper 包装器

- **全称**：Entity Wrapper（实体包装器）
- **作用**：代表条件构造器（LambdaQueryWrapper/QueryWrapper）
- **默认值**：`ew`
- **源码中的定义**：

java

```
String WRAPPER = "ew";
String COLLECTION = "coll";
```



## 2. **这些别名的作用场景**

这些别名主要用于**MyBatis的动态SQL中**，特别是在XML映射文件里引用方法参数时：

java

```
// Service/ServiceImpl 中
public class UserServiceImpl {
    // 方法参数会被自动映射到XML中的别名
    public List<User> selectByWrapper(@Param("ew") Wrapper<User> wrapper) {
        return userMapper.selectByWrapper(wrapper);
    }
}
```



## 3. **在 Service/ServiceImpl 中的使用**

### 3.1 自动注入

java

```
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> {
    // 通常不需要显式使用 et/ew，框架会自动处理
    public User getUserById(Long id) {
        // 框架内部会使用 et 别名
        return getById(id);
    }
    
    public List<User> listUsers(String name) {
        // 框架内部会使用 ew 别名
        return list(new LambdaQueryWrapper<User>()
            .eq(User::getName, name));
    }
}
```



### 3.2 自定义查询方法

java

```
public interface UserMapper extends BaseMapper<User> {
    // 方法1：使用默认 ew 别名
    List<User> selectCustomList(@Param("ew") Wrapper<User> wrapper);
    
    // 方法2：自定义别名
    List<User> selectByCondition(
        @Param("condition") Map<String, Object> condition,
        @Param("queryWrapper") Wrapper<User> wrapper);
}
```



## 4. **在 XML 映射文件中的使用**

### 4.1 基本使用示例

xml

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 1. 使用 et 别名访问实体属性 -->
    <select id="selectByEntity" resultType="User">
        SELECT * FROM user
        <where>
            <if test="et.name != null and et.name != ''">
                AND name = #{et.name}
            </if>
            <if test="et.age != null">
                AND age = #{et.age}
            </if>
        </where>
    </select>
    
    <!-- 2. 使用 ew 别名（最常用） -->
    <select id="selectList" resultType="User">
        SELECT * FROM user
        <where>
            <!-- 插入Wrapper生成的SQL条件 -->
            ${ew.customSqlSegment}
        </where>
    </select>
    
    <!-- 3. 自定义查询带 ew 参数 -->
    <select id="selectCustomList" resultType="User">
        SELECT id, name, age 
        FROM user
        <where>
            <!-- 使用 ew 别名引用Wrapper -->
            ${ew.customSqlSegment}
        </where>
        ORDER BY create_time DESC
    </select>
</mapper>
```



### 4.2 复杂示例：多个参数

xml

```
<mapper namespace="com.example.mapper.UserMapper">
    
    <!-- 方法：selectByMultiParams -->
    <!-- Java代码：
         List<User> selectByMultiParams(
             @Param("user") User user,
             @Param("query") Wrapper<User> wrapper);
    -->
    <select id="selectByMultiParams" resultType="User">
        SELECT * FROM user
        <where>
            <!-- 使用 user 别名（自定义） -->
            <if test="user.name != null">
                AND name LIKE CONCAT('%', #{user.name}, '%')
            </if>
            <if test="user.status != null">
                AND status = #{user.status}
            </if>
            
            <!-- 使用 ew 别名 -->
            <if test="query != null">
                AND ${query.customSqlSegment}
            </if>
        </where>
    </select>
</mapper>
```



## 5. **实际应用场景**

### 5.1 分页查询

java

```
// Service层
public Page<User> pageUsers(Page<User> page, Wrapper<User> wrapper) {
    return userMapper.selectPage(page, wrapper);
}

// XML映射
<select id="selectPage" resultType="User">
    SELECT * FROM user
    <where>
        ${ew.customSqlSegment}
    </where>
</select>
```



### 5.2 动态字段选择

xml

```
<select id="selectWithFields" resultType="map">
    SELECT 
    <choose>
        <when test="ew != null and ew.selectColumns != null">
            ${ew.selectColumns}
        </when>
        <otherwise>
            *
        </otherwise>
    </choose>
    FROM user
    <where>
        <if test="ew != null">
            ${ew.customSqlSegment}
        </if>
    </where>
</select>
```



### 5.3 联表查询

xml

```
<select id="selectWithRole" resultMap="userRoleMap">
    SELECT u.*, r.role_name
    FROM user u
    LEFT JOIN user_role ur ON u.id = ur.user_id
    LEFT JOIN role r ON ur.role_id = r.id
    <where>
        <!-- 这里仍然可以使用 ew，但要注意字段名前缀 -->
        <if test="ew != null">
            AND ${ew.customSqlSegment}
        </if>
    </where>
</select>
```



## 6. **自定义配置和注意事项**

### 6.1 修改默认别名（不推荐）

java

```
// 在配置类中修改
@Configuration
public class MybatisPlusConfig {
    
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 默认已经配置好，通常不需要修改
        return interceptor;
    }
}
```



### 6.2 使用注意事项

xml

```
<!-- ❌ 错误示例 -->
<select id="selectError" resultType="User">
    SELECT * FROM user
    <where>
        <!-- 直接使用 et 会报错，除非方法参数确实使用了 @Param("et") -->
        <if test="et.name != null">  <!-- 可能找不到 et -->
            AND name = #{et.name}
        </if>
    </where>
</select>

<!-- ✅ 正确示例 -->
<select id="selectCorrect" resultType="User">
    SELECT * FROM user
    <where>
        <!-- 明确指定参数别名 -->
        <if test="param1.name != null">  <!-- 或者使用具体的别名 -->
            AND name = #{param1.name}
        </if>
    </where>
</select>
```



### 6.3 获取 Wrapper 中的参数值

xml

```
<select id="selectWithWrapperParam" resultType="User">
    SELECT * FROM user
    <where>
        <!-- 可以通过 ew.paramNameValuePairs 访问Wrapper中的参数 -->
        <if test="ew != null and ew.paramNameValuePairs != null">
            <!-- 这里可以处理Wrapper中的参数 -->
            AND status = #{ew.paramNameValuePairs['status']}
        </if>
    </where>
</select>
```



## 7. **源码分析**

### 7.1 别名定义位置

java

```
// 在 SqlScript 类中定义
public abstract class SqlScript {
    // 实体相关
    public static final String ENTITY = "et";
    public static final String ENTITY_DOT = ENTITY + DOT;
    
    // 包装器相关
    public static final String WRAPPER = "ew";
    public static final String WRAPPER_DOT = WRAPPER + DOT;
    public static final String WRAPPER_PARAM = WRAPPER_DOT + "paramNameValuePairs.";
    
    // 集合相关
    public static final String COLLECTION = "coll";
}
```



### 7.2 在 BaseMapper 中的使用

java

```
public interface BaseMapper<T> {
    
    // 这些方法在XML中会自动使用 ew 别名
    List<T> selectList(@Param("ew") Wrapper<T> queryWrapper);
    
    // 这些方法在XML中会自动使用 et 别名
    int insert(@Param("et") T entity);
    int updateById(@Param("et") T entity);
}
```



## 总结

**`et` 和 `ew` 的主要作用：**

| 别名 | 含义                     | 使用场景       | 示例                      |
| :--- | :----------------------- | :------------- | :------------------------ |
| `et` | Entity（实体）           | 操作实体对象时 | `#{et.name}`, `#{et.age}` |
| `ew` | Entity Wrapper（包装器） | 条件查询时     | `${ew.customSqlSegment}`  |

**关键点：**

1. **自动映射**：MyBatis-Plus 的 BaseMapper 方法会自动使用这些别名
2. **XML中使用**：主要在动态SQL中引用方法参数
3. **默认值**：框架已预设，通常不需要修改
4. **灵活性**：可以通过 `@Param` 注解自定义别名

**最佳实践：**

- 对于简单的 CRUD，直接使用框架提供的方法
- 对于复杂查询，在自定义方法中明确使用 `@Param` 注解
- 在 XML 中优先使用 `${ew.customSqlSegment}` 来复用条件构造器
- 避免直接修改框架默认的别名配置


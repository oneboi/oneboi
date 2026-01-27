# MyBatis教程

从零开始学习MyBatis，掌握**Java持久层框架的核心技术**，构建高效、灵活的数据访问层



## 第一部分：MyBatis基础入门

## 第1章 MyBatis 框架介绍



## 🎯 学习目标

### 理解 MyBatis 核心概念

掌握 MyBatis 的基本原理、架构设计和核心组件

### 掌握配置方法

学会 MyBatis 的基本配置和环境搭建

### 了解应用场景

明确 MyBatis 在实际项目中的应用场景和优势



## 🎯 什么是MyBatis？

**MyBatis** 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## 🔧 MyBatis 核心概念

- **SqlSessionFactory**：MyBatis的核心，用于创建SqlSession实例
- **SqlSession**：执行SQL命令，获取映射器和管理事务的主要接口
- **Mapper**：映射器接口，定义数据库操作方法
- **Configuration**：MyBatis的配置信息，包含所有配置项
- **MappedStatement**：映射的SQL语句，包含SQL和相关配置

## ⭐ MyBatis 核心特性

### 🎯 SQL与Java代码分离

支持XML配置SQL语句，也支持注解方式配置，保持清晰的代码结构

### 🔧 动态SQL支持

提供if、choose、when、otherwise、foreach等标签，根据条件动态生成SQL

### 📊 结果集映射

自动映射查询结果到Java对象，支持复杂的嵌套映射

### 🚀 缓存机制

提供一级缓存（SqlSession级别）和二级缓存（Mapper级别）

### 🔄 事务管理

支持本地事务和分布式事务，与Spring事务无缝集成

### 🎨 插件机制

支持拦截器扩展功能，可以自定义插件开发

## 🔄 框架对比

| 特性         | MyBatis   | Hibernate    | JPA      |
| :----------- | :-------- | :----------- | :------- |
| **类型**     | 半自动ORM | 全自动ORM    | 标准接口 |
| **SQL控制**  | 完全控制  | HQL/Criteria | JPQL     |
| **学习成本** | 中等      | 较高         | 中等     |
| **性能**     | 高        | 中等         | 中等     |
| **灵活性**   | 高        | 中等         | 中等     |

## 🎯 应用场景

### 🌐 Web应用

- 企业级Web应用
- 移动端API服务
- 微服务架构
- 数据分析平台

### 📈 复杂查询

- 复杂报表查询
- 多表关联查询
- 数据统计分析
- 性能敏感的查询

### 🏢 遗留系统

- 遗留系统改造
- 数据库迁移
- 存储过程调用
- 自定义SQL优化

## 📋 基本配置示例

以下是MyBatis的**核心配置文件示例**：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
  <!-- 属性配置 -->
  <properties>
    <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mybatis_demo"/>
  </properties>
  
  <!-- 设置 -->
  <settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <setting name="cacheEnabled" value="true"/>
  </settings>
  
  <!-- 环境配置 -->
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
      </dataSource>
    </environment>
  </environments>
  
  <!-- 映射器 -->
  <mappers>
    <mapper resource="mappers/UserMapper.xml"/>
  </mappers>
</configuration>
```

## 💡 本章小结

本章我们学习了MyBatis框架的基本概念和核心特性。MyBatis作为一个半自动的ORM框架，在保持SQL灵活性的同时，简化了JDBC的复杂操作。它特别适合需要精确控制SQL的场景，如复杂查询、性能优化等。

**下一章预告**：我们将学习如何搭建MyBatis开发环境，包括JDK、IDE、Maven的配置，以及创建第一个MyBatis项目。



## 第02章 MyBatis 环境搭建

https://gaga.plus/app/mybatis/chapter-26-testing/index.html



## 第03章 第一个MyBatis程序

## 🎯 MyBatis工作流程

在开始编写第一个MyBatis程序之前，我们需要了解MyBatis的基本工作流程：

**步骤1：读取配置文件**
加载mybatis-config.xml主配置文件，获取数据源和映射器配置信息。

**步骤2：创建SqlSessionFactory**
根据配置文件创建SqlSessionFactory，这是MyBatis的核心工厂类。

**步骤3：获取SqlSession**
从SqlSessionFactory获取SqlSession，这是执行SQL的会话对象。

**步骤4：执行SQL语句**
通过SqlSession执行映射文件中定义的SQL语句。

**步骤5：处理结果**
获取并处理SQL执行结果。

**步骤6：关闭SqlSession**
释放数据库连接资源。



## 1. MyBatis主配置文件 (mybatis-config.xml)

xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 引入数据库配置文件 -->
    <properties resource="db.properties"/>
    <!-- 环境配置 -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${db.driver}"/>
                <property name="url" value="${db.url}"/>
                <property name="username" value="${db.username}"/>
                <property name="password" value="${db.password}"/>
            </dataSource>
        </environment>
    </environments>
    <!-- 映射器配置 -->
    <mappers>
        <mapper resource="mappers/UserMapper.xml"/>
    </mappers>
</configuration>
```



## 2. 数据库配置文件 (db.properties)

properties

```
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/mybatis_demo?useSSL=false&serverTimezone=UTC
db.username=root
db.password=123456
```



## 3. SQL映射文件 (UserMapper.xml)

xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mybatis.mapper.UserMapper">
    <!-- 查询所有用户 -->
    <select id="selectAllUsers" resultType="map">
        SELECT id, username, email, create_time, update_time
        FROM user
        ORDER BY id
    </select>
    <!-- 根据ID查询用户 -->
    <select id="selectUserById" parameterType="int" resultType="map">
        SELECT id, username, email, create_time, update_time
        FROM user
        WHERE id = #{id}
    </select>
</mapper>
```









##  核心概念理解

#### SqlSessionFactory

- MyBatis的核心工厂类，用于创建SqlSession
- 全局唯一，线程安全，通常设计为单例
- 包含了数据源配置和映射器配置信息

#### SqlSession

- 数据库会话对象，用于执行SQL语句
- 线程不安全，不能在多线程间共享
- 使用完毕后必须关闭以释放资源

#### Mapper映射器

- 定义SQL语句和参数映射的XML文件
- 通过namespace和id唯一标识每个SQL语句
- 支持参数映射和结果映射

## ⚠️ 注意事项

#### 资源管理

- 始终确保SqlSession被正确关闭
- 推荐使用try-with-resources语句自动管理资源
- SqlSessionFactory通常设计为全局单例

#### 线程安全

- SqlSessionFactory是线程安全的
- SqlSession不是线程安全的，不要在多线程间共享
- 每个线程都应该有自己的SqlSession实例

## 🚀 运行程序

1. 确保MySQL服务已启动
2. 执行init.sql脚本创建数据库和表
3. 修改db.properties中的数据库连接信息
4. 运行FirstProgramDemo.main()方法
5. 运行测试用例验证功能

**预期输出：**
MyBatis 第一个程序演示
查询结果: 3 条记录

## 📈 学习收获

通过本章的学习，你应该掌握了：

- MyBatis的基本工作流程
- 主配置文件的编写方法
- SQL映射文件的创建
- SqlSessionFactory和SqlSession的使用
- 基本的查询操作
- 资源管理的重要性



## 第04章 核心配置文件

## 📋 MyBatis 配置文件概述

MyBatis 的核心配置文件（通常命名为 mybatis-config.xml）是整个框架的控制中心，它定义了数据库连接、事务管理、映射器注册等关键信息。

### 配置文件的基本结构

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <properties/>           <!-- 属性配置 -->
  <settings/>             <!-- 全局设置 -->
  <typeAliases/>          <!-- 类型别名 -->
  <typeHandlers/>         <!-- 类型处理器 -->
  <objectFactory/>        <!-- 对象工厂 -->
  <plugins/>              <!-- 插件 -->
  <environments/>          <!-- 环境配置 -->
  <databaseIdProvider/>   <!-- 数据库厂商标识 -->
  <mappers/>              <!-- 映射器 -->
</configuration>
```

**⚠️ 注意：**配置元素的顺序必须严格按照上述顺序排列，否则会导致解析错误。

## 🔧 核心配置元素详解

### 1. properties（属性配置）

用于定义配置属性，可以在配置文件的其他地方引用这些属性。

```
<!-- 基本属性配置 -->
<properties>
  <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
  <property name="url" value="jdbc:mysql://localhost:3306/mybatis_demo"/>
</properties>

<!-- 引用外部属性文件 -->
<properties resource="db.properties">
  <property name="username" value="root"/>
  <property name="password" value="123456"/>
</properties>
```

### 2. settings（全局设置）

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。

| 设置名                   | 描述                                                   | 有效值                                                       | 默认值 |
| :----------------------- | :----------------------------------------------------- | :----------------------------------------------------------- | :----- |
| cacheEnabled             | 全局性地开启或关闭所有映射器配置文件中已配置的任何缓存 | true \| false                                                | true   |
| lazyLoadingEnabled       | 延迟加载的全局开关                                     | true \| false                                                | false  |
| mapUnderscoreToCamelCase | 是否开启驼峰命名自动映射                               | true \| false                                                | false  |
| logImpl                  | 指定 MyBatis 所用日志的具体实现                        | SLF4J \| LOG4J \| LOG4J2 \| JDK_LOGGING \| COMMONS_LOGGING \| STDOUT_LOGGING \| NO_LOGGING | 未设置 |

```
<settings>
  <setting name="cacheEnabled" value="true"/>
  <setting name="lazyLoadingEnabled" value="true"/>
  <setting name="mapUnderscoreToCamelCase" value="true"/>
  <setting name="logImpl" value="LOG4J"/>
  <setting name="defaultExecutorType" value="REUSE"/>
</settings>
```

### 3. typeAliases（类型别名）

类型别名可为 Java 类型设置一个缩写名字，降低冗余的全限定类名书写。

```
<typeAliases>
  <!-- 单个别名定义 -->
  <typeAlias alias="User" type="com.example.model.User"/>
  
  <!-- 包扫描方式 -->
  <package name="com.example.model"/>
</typeAliases>
```

### 4. environments（环境配置）

MyBatis 可以配置成适应多种环境，例如开发、测试和生产环境。

```
<environments default="development">
  <!-- 开发环境 -->
  <environment id="development">
    <transactionManager type="JDBC"/>
    <dataSource type="POOLED">
      <property name="driver" value="${driver}"/>
      <property name="url" value="${url}"/>
      <property name="username" value="${username}"/>
      <property name="password" value="${password}"/>
    </dataSource>
  </environment>
  
  <!-- 生产环境 -->
  <environment id="production">
    <transactionManager type="MANAGED"/>
    <dataSource type="JNDI">
      <property name="data_source" value="java:comp/env/jdbc/mybatis"/>
    </dataSource>
  </environment>
</environments>
```

### 5. mappers（映射器）

告诉 MyBatis 到哪里去找映射文件。

```
<mappers>
  <!-- 使用相对于类路径的资源引用 -->
  <mapper resource="com/example/mapper/UserMapper.xml"/>
  
  <!-- 使用完全限定资源定位符（URL） -->
  <mapper url="file:///var/mappers/UserMapper.xml"/>
  
  <!-- 使用映射器接口实现类的完全限定类名 -->
  <mapper class="com.example.mapper.UserMapper"/>
  
  <!-- 将包内的映射器接口实现全部注册为映射器 -->
  <package name="com.example.mapper"/>
</mappers>
```

## 🚀 配置示例

### 基本配置示例

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <properties resource="db.properties"/>
  
  <settings>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <setting name="logImpl" value="STDOUT_LOGGING"/>
  </settings>
  
  <typeAliases>
    <package name="com.example.model"/>
  </typeAliases>
  
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  
  <mappers>
    <package name="com.example.mapper"/>
  </mappers>
</configuration>
```

### 高级配置示例

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <properties resource="db.properties"/>
  
  <settings>
    <setting name="cacheEnabled" value="true"/>
    <setting name="lazyLoadingEnabled" value="true"/>
    <setting name="aggressiveLazyLoading" value="false"/>
    <setting name="mapUnderscoreToCamelCase" value="true"/>
    <setting name="logImpl" value="LOG4J"/>
    <setting name="defaultExecutorType" value="REUSE"/>
    <setting name="defaultStatementTimeout" value="25"/>
  </settings>
  
  <typeAliases>
    <typeAlias alias="User" type="com.example.model.User"/>
    <typeAlias alias="Order" type="com.example.model.Order"/>
  </typeAliases>
  
  <plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
      <property name="helperDialect" value="mysql"/>
      <property name="reasonable" value="true"/>
    </plugin>
  </plugins>
  
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
        <property name="poolMaximumActiveConnections" value="20"/>
        <property name="poolMaximumIdleConnections" value="5"/>
      </dataSource>
    </environment>
  </environments>
  
  <mappers>
    <package name="com.example.mapper"/>
  </mappers>
</configuration>
```

## 💡 配置最佳实践

#### 1. 属性外部化

将数据库连接信息等敏感配置放在外部属性文件中，便于不同环境的配置管理。

#### 2. 合理使用缓存

根据业务需求合理配置一级缓存和二级缓存，提高查询性能。

#### 3. 日志配置

在开发环境启用详细日志，生产环境使用适当的日志级别。

#### 4. 连接池优化

根据应用负载合理配置数据库连接池参数。

## 🔍 常见问题与解决方案

### 1. 配置文件解析错误

**问题：**配置元素顺序错误导致解析失败
**解决：**严格按照 DTD 定义的顺序排列配置元素

### 2. 属性引用失败

**问题：**${property} 无法正确解析
**解决：**确保属性在 properties 元素中正确定义

### 3. 映射器注册失败

**问题：**找不到映射器接口或 XML 文件
**解决：**检查包路径和文件路径是否正确

## 🎯 实践练习

#### 练习任务

1. 创建一个支持开发和生产两种环境的配置文件
2. 配置数据库连接池参数
3. 启用驼峰命名自动映射
4. 配置日志输出
5. 注册映射器

## 💡 本章小结

本章我们深入学习了MyBatis核心配置文件的各个组成部分，包括properties属性配置、settings全局设置、typeAliases类型别名、environments环境配置和mappers映射器注册。掌握这些配置要素是使用MyBatis的基础，合理的配置能够显著提升应用的性能和可维护性。

**下一章预告**：我们将学习MyBatis的SQL映射文件，包括如何编写SQL语句、参数映射、结果映射等核心内容。



## 🔧第二部分：映射文件与SQL操作

## 第05章 SQL映射

## 📚 学习目标

- 深入理解MyBatis SQL映射文件的结构和作用
- 掌握各种SQL语句的配置方法
- 学会参数映射和结果映射的配置
- 了解动态SQL的使用方法
- 掌握关联查询的配置技巧

## SQL映射文件概述

SQL映射文件是MyBatis的核心组件之一，它定义了SQL语句与Java方法的映射关系。通过映射文件，我们可以将复杂的SQL操作封装成简单的方法调用。

### 映射文件的基本结构

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mybatis.mapping.mapper.UserMapper">
    <!-- SQL语句定义 -->
</mapper>
```

## 基本SQL语句配置

### 1. SELECT语句

```
<!-- 查询所有用户 -->
<select id="selectAllUsers" resultType="User">
    SELECT id, name, age, email FROM users
</select>

<!-- 根据ID查询用户 -->
<select id="selectUserById" parameterType="long" resultType="User">
    SELECT id, name, age, email FROM users WHERE id = #{id}
</select>
```

### 2. INSERT语句

```
<!-- 插入用户 -->
<insert id="insertUser" parameterType="User" useGeneratedKeys="true" keyProperty="id">
    INSERT INTO users (name, age, email) VALUES (#{name}, #{age}, #{email})
</insert>
```

### 3. UPDATE语句

```
<!-- 更新用户 -->
<update id="updateUser" parameterType="User">
    UPDATE users SET name = #{name}, age = #{age}, email = #{email} WHERE id = #{id}
</update>
```

### 4. DELETE语句

```
<!-- 删除用户 -->
<delete id="deleteUser" parameterType="long">
    DELETE FROM users WHERE id = #{id}
</delete>
```

## 参数映射

### 1. 单个参数

```
<select id="selectUsersByAge" parameterType="int" resultType="User">
    SELECT * FROM users WHERE age = #{age}
</select>
```

### 2. 多个参数

```
<select id="selectUsersByCondition" parameterType="map" resultType="User">
    SELECT * FROM users 
    WHERE name LIKE CONCAT('%', #{name}, '%')
    AND age BETWEEN #{minAge} AND #{maxAge}
</select>
```

### 3. 对象参数

```
<insert id="insertUser" parameterType="User">
    INSERT INTO users (name, age, email) 
    VALUES (#{name}, #{age}, #{email})
</insert>
```

## 结果映射

### 1. 基本结果映射

```
<resultMap id="userResultMap" type="User">
    <id property="id" column="user_id"/>
    <result property="name" column="user_name"/>
    <result property="age" column="user_age"/>
    <result property="email" column="user_email"/>
</resultMap>

<select id="selectUsers" resultMap="userResultMap">
    SELECT user_id, user_name, user_age, user_email FROM users
</select>
```

### 2. 关联映射（一对一）

```
<resultMap id="userWithProfileMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    <association property="profile" javaType="UserProfile">
        <id property="id" column="profile_id"/>
        <result property="bio" column="bio"/>
        <result property="avatar" column="avatar"/>
    </association>
</resultMap>

<select id="selectUsersWithProfile" resultMap="userWithProfileMap">
    SELECT u.*, p.id as profile_id, p.bio, p.avatar
    FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id
</select>
```

### 3. 集合映射（一对多）

```
<resultMap id="userWithOrdersMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="orderNumber" column="order_number"/>
        <result property="amount" column="amount"/>
        <result property="orderDate" column="order_date"/>
    </collection>
</resultMap>

<select id="selectUsersWithOrders" resultMap="userWithOrdersMap">
    SELECT u.*, o.id as order_id, o.order_number, o.amount, o.order_date
    FROM users u LEFT JOIN orders o ON u.id = o.user_id
</select>
```

## 动态SQL

### 1. if标签

```
<select id="selectUsersDynamic" parameterType="User" resultType="User">
    SELECT * FROM users
    <where>
        <if test="name != null and name != ''">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
        <if test="email != null and email != ''">
            AND email = #{email}
        </if>
    </where>
</select>
```

### 2. choose、when、otherwise标签

```
<select id="selectUsersByCondition" parameterType="map" resultType="User">
    SELECT * FROM users
    <where>
        <choose>
            <when test="name != null">
                name LIKE CONCAT('%', #{name}, '%')
            </when>
            <when test="email != null">
                email = #{email}
            </when>
            <otherwise>
                age > 18
            </otherwise>
        </choose>
    </where>
</select>
```

### 3. foreach标签

```
<select id="selectUsersByIds" parameterType="list" resultType="User">
    SELECT * FROM users WHERE id IN
    <foreach collection="list" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
```

## SQL片段复用

```
<!-- 定义SQL片段 -->
<sql id="userColumns">
    id, name, age, email
</sql>

<!-- 使用SQL片段 -->
<select id="selectAllUsers" resultType="User">
    SELECT <include refid="userColumns"/> FROM users
</select>

<select id="selectUserById" parameterType="long" resultType="User">
    SELECT <include refid="userColumns"/> FROM users WHERE id = #{id}
</select>
```

## 最佳实践

### 1. 命名规范

- 映射文件名与Mapper接口名保持一致
- namespace与Mapper接口的全限定名一致
- SQL语句的id与Mapper接口的方法名一致

### 2. 性能优化

- 合理使用resultMap，避免不必要的字段映射
- 使用延迟加载处理关联查询
- 避免N+1查询问题
- 合理使用缓存机制

### 3. 安全考虑

- 使用参数化查询防止SQL注入
- 避免在SQL中直接拼接用户输入
- 对敏感数据进行适当的权限控制

## 常见问题与解决方案

### Q: 如何处理字段名与属性名不一致的情况？

A: 可以使用resultMap进行字段映射，或者在SQL中使用别名。

### Q: 动态SQL中的test条件如何编写？

A: test条件使用OGNL表达式，可以判断null值、空字符串、数值比较等。

### Q: 如何处理一对多关联查询的性能问题？

A: 可以使用分步查询配合延迟加载，或者使用嵌套结果映射。

### Q: 如何在映射文件中使用自定义的类型处理器？

A: 在resultMap中使用typeHandler属性指定自定义的类型处理器。

## 实践练习

### 练习1：基本CRUD操作

为User实体创建完整的CRUD操作映射，包括插入、查询、更新和删除。

### 练习2：动态查询

实现一个用户搜索功能，支持按姓名、年龄范围、邮箱等条件进行动态查询。

### 练习3：关联查询

实现用户与订单的一对多关联查询，要求能够查询用户及其所有订单信息。

### 练习4：批量操作

实现批量插入用户和批量删除用户的功能。

## 运行示例程序

### 步骤1：导入项目

将chapter-05-sql-mapping.json导入到IntelliJ IDEA中。

### 步骤2：配置数据库

确保MySQL数据库运行正常，执行init.sql创建测试数据。

### 步骤3：运行程序

运行SqlMappingDemo.java，观察各种映射配置的执行效果。

### 步骤4：查看结果

程序将演示基本映射、参数映射、结果映射和动态SQL的使用。



## 第06章 Mapper接口

## 学习目标

- 深入理解MyBatis Mapper接口的概念和作用
- 掌握XML映射和注解映射两种方式
- 了解Mapper代理机制的工作原理
- 学会定义和使用各种Mapper方法
- 掌握参数传递和结果处理的技巧



## Mapper接口概述

Mapper接口是MyBatis的核心组件，它定义了数据访问的方法签名，MyBatis会自动为这些接口创建代理实现，将方法调用转换为SQL执行。

### Mapper接口的优势

- **类型安全**：编译时检查方法签名和参数类型
- **代码简洁**：无需编写实现类，只需定义接口
- **易于维护**：接口与SQL映射分离，便于管理
- **IDE支持**：完整的代码提示和重构支持

## XML映射方式

### 1. 定义Mapper接口

```
package com.example.mybatis.mapper;

import com.example.mybatis.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserMapper {
    
    // 查询所有用户
    List<User> selectAllUsers();
    
    // 根据ID查询用户
    User selectUserById(Long id);
    
    // 根据年龄查询用户
    List<User> selectUsersByAge(@Param("age") Integer age);
    
    // 条件查询
    List<User> selectUsersByCondition(Map<String, Object> params);
    
    // 统计用户数量
    long countUsers();
    
    // 插入用户
    int insertUser(User user);
    
    // 更新用户
    int updateUser(User user);
    
    // 删除用户
    int deleteUser(Long id);
}
```

### 2. 创建XML映射文件

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.mybatis.mapper.UserMapper">
    
    <select id="selectAllUsers" resultType="User">
        SELECT id, name, age, email FROM users
    </select>
    
    <select id="selectUserById" parameterType="long" resultType="User">
        SELECT id, name, age, email FROM users WHERE id = #{id}
    </select>
    
    <select id="selectUsersByAge" parameterType="int" resultType="User">
        SELECT id, name, age, email FROM users WHERE age = #{age}
    </select>
    
    <select id="countUsers" resultType="long">
        SELECT COUNT(*) FROM users
    </select>
    
    <insert id="insertUser" parameterType="User" 
            useGeneratedKeys="true" keyProperty="id">
        INSERT INTO users (name, age, email) 
        VALUES (#{name}, #{age}, #{email})
    </insert>
    
    <update id="updateUser" parameterType="User">
        UPDATE users SET name = #{name}, age = #{age}, email = #{email} 
        WHERE id = #{id}
    </update>
    
    <delete id="deleteUser" parameterType="long">
        DELETE FROM users WHERE id = #{id}
    </delete>
    
</mapper>
```

### 3. 配置映射文件

```
<!-- 在mybatis-config.xml中配置 -->
<mappers>
    <mapper resource="mapper/UserMapper.xml"/>
</mappers>
```

## 注解映射方式

### 1. 基本注解

```
@Mapper
public interface UserAnnotationMapper {
    
    @Select("SELECT id, name, age, email FROM users")
    List<User> findAllUsers();
    
    @Select("SELECT id, name, age, email FROM users WHERE id = #{id}")
    User findUserById(@Param("id") Long id);
    
    @Insert("INSERT INTO users(name, age, email) VALUES(#{name}, #{age}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(User user);
    
    @Update("UPDATE users SET name = #{name}, age = #{age}, email = #{email} WHERE id = #{id}")
    int updateUser(User user);
    
    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteUser(@Param("id") Long id);
    
    @Select("SELECT COUNT(*) FROM users")
    long countUsers();
}
```

### 2. 结果映射注解

```
@Select("SELECT id, name, age, email FROM users")
@Results({
    @Result(property = "id", column = "id"),
    @Result(property = "name", column = "name"),
    @Result(property = "age", column = "age"),
    @Result(property = "email", column = "email")
})
List<User> findAllUsersWithMapping();
```

### 3. 动态SQL注解

```
@SelectProvider(type = UserSqlProvider.class, method = "selectUsersByCondition")
List<User> findUsersByCondition(@Param("name") String name, @Param("minAge") Integer minAge);

// SQL提供者类
class UserSqlProvider {
    public String selectUsersByCondition(@Param("name") String name, @Param("minAge") Integer minAge) {
        StringBuilder sql = new StringBuilder("SELECT id, name, age, email FROM users WHERE 1=1");
        if (name != null && !name.isEmpty()) {
            sql.append(" AND name LIKE CONCAT('%', #{name}, '%')");
        }
        if (minAge != null) {
            sql.append(" AND age >= #{minAge}");
        }
        return sql.toString();
    }
}
```

## Mapper代理机制

### 1. 代理对象的创建

```
// MyBatis自动创建代理对象
UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

// 查看代理对象信息
System.out.println("Mapper接口类型: " + userMapper.getClass().getName());
System.out.println("是否为代理对象: " + userMapper.getClass().getName().contains("Proxy"));
```

### 2. 方法调用流程

1. 调用Mapper接口方法
2. 代理对象拦截方法调用
3. 根据方法名查找对应的SQL语句
4. 执行SQL并处理结果
5. 返回处理后的结果

## 参数传递

### 1. 单个参数

```
// 接口定义
User selectUserById(Long id);

// XML映射
<select id="selectUserById" parameterType="long" resultType="User">
    SELECT * FROM users WHERE id = #{id}
</select>
```

### 2. 多个参数（使用@Param）

```
// 接口定义
List<User> selectUsersByAgeRange(@Param("minAge") Integer minAge, 
                                 @Param("maxAge") Integer maxAge);

// XML映射
<select id="selectUsersByAgeRange" resultType="User">
    SELECT * FROM users WHERE age BETWEEN #{minAge} AND #{maxAge}
</select>
```

### 3. 对象参数

```
// 接口定义
int insertUser(User user);

// XML映射
<insert id="insertUser" parameterType="User">
    INSERT INTO users (name, age, email) 
    VALUES (#{name}, #{age}, #{email})
</insert>
```

### 4. Map参数

```
// 接口定义
List<User> selectUsersByCondition(Map<String, Object> params);

// XML映射
<select id="selectUsersByCondition" parameterType="map" resultType="User">
    SELECT * FROM users
    <where>
        <if test="name != null">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="minAge != null">
            AND age >= #{minAge}
        </if>
    </where>
</select>
```

## 返回值处理

### 1. 基本类型返回值

```
// 返回数量
long countUsers();

// 返回影响行数
int insertUser(User user);
int updateUser(User user);
int deleteUser(Long id);
```

### 2. 对象返回值

```
// 返回单个对象
User selectUserById(Long id);

// 返回对象列表
List<User> selectAllUsers();
```

### 3. Map返回值

```
// 返回Map
@MapKey("id")
Map<Long, User> selectUsersAsMap();

// 返回单行Map
Map<String, Object> selectUserAsMap(Long id);
```

## 最佳实践

### 1. 接口设计原则

- 方法名要清晰表达业务意图
- 参数类型要明确，避免使用Object
- 返回值类型要准确，避免过度包装
- 合理使用@Param注解标识参数

### 2. XML vs 注解选择

- **简单SQL**：使用注解，代码更简洁
- **复杂SQL**：使用XML，可读性更好
- **动态SQL**：推荐使用XML
- **团队规范**：保持一致的风格

### 3. 性能优化

- 合理设计方法签名，避免不必要的数据传输
- 使用合适的返回值类型
- 避免在Mapper中进行复杂的业务逻辑
- 合理使用批量操作方法

## 常见问题与解决方案

### Q: Mapper接口方法找不到对应的SQL语句？

A: 检查namespace是否正确，方法名是否与SQL语句的id一致。

### Q: 多个参数时出现参数绑定错误？

A: 使用@Param注解明确指定参数名称。

### Q: 如何处理返回null的情况？

A: 在业务层进行null检查，或者使用Optional包装返回值。

### Q: 注解和XML映射可以混合使用吗？

A: 可以，但建议在同一个项目中保持一致的风格。

## 实践练习

### 练习1：基本Mapper接口

创建一个完整的UserMapper接口，包含CRUD操作和统计方法。

### 练习2：注解映射

使用注解方式重新实现UserMapper的部分方法。

### 练习3：复杂参数传递

实现一个支持多条件查询的方法，使用Map传递参数。

### 练习4：批量操作

实现批量插入和批量删除的Mapper方法。

## 运行示例程序

### 步骤1：导入项目

将chapter-06-mapper-interface.json导入到IntelliJ IDEA中。

### 步骤2：配置数据库

确保MySQL数据库运行正常，执行init.sql创建测试数据。

### 步骤3：运行程序

运行MapperInterfaceDemo.java，观察不同映射方式的执行效果。

### 步骤4：查看结果

程序将演示XML映射器、注解映射器、Mapper方法和代理机制的使用。



## 第07章 动态SQL

## 学习目标

- 深入理解MyBatis动态SQL的概念和优势
- 掌握if、choose、when、otherwise等条件标签
- 学会使用where、set、trim等辅助标签
- 熟练运用foreach标签进行批量操作
- 掌握SQL片段的定义和复用技巧
- 了解动态SQL的最佳实践和性能优化



## 动态SQL概述

动态SQL是MyBatis的强大特性之一，它允许我们根据不同的条件动态构建SQL语句，避免了在Java代码中拼接SQL字符串的复杂性和安全风险。

### 动态SQL的优势

- **灵活性**：根据条件动态生成SQL
- **安全性**：避免SQL注入风险
- **可维护性**：SQL逻辑集中管理
- **性能优化**：只查询需要的字段和条件

## if标签

if标签是最基本的条件判断标签，用于根据条件决定是否包含某段SQL。

### 基本语法

```
<if test="条件表达式">
    SQL片段
</if>
```

### 实际应用

```
<select id="selectUsersByCondition" resultType="User">
    SELECT id, name, age, email FROM users
    WHERE 1=1
    <if test="name != null and name != ''">
        AND name LIKE CONCAT('%', #{name}, '%')
    </if>
    <if test="minAge != null">
        AND age >= #{minAge}
    </if>
    <if test="maxAge != null">
        AND age <= #{maxAge}
    </if>
</select>
```

### 条件表达式

- `name != null`：判断参数是否为null
- `name != ''`：判断字符串是否为空
- `age > 0`：数值比较
- `list != null and list.size() > 0`：集合判断

## choose/when/otherwise标签

类似于Java中的switch语句，用于多条件选择，只会执行其中一个分支。

### 基本语法

```
<choose>
    <when test="条件1">
        SQL片段1
    </when>
    <when test="条件2">
        SQL片段2
    </when>
    <otherwise>
        默认SQL片段
    </otherwise>
</choose>
```

### 实际应用

```
<select id="selectUsersByChoice" resultType="User">
    SELECT id, name, age, email FROM users
    WHERE 1=1
    <choose>
        <when test="name != null and name != ''">
            AND name = #{name}
        </when>
        <when test="age != null">
            AND age = #{age}
        </when>
        <when test="email != null and email != ''">
            AND email = #{email}
        </when>
        <otherwise>
            AND 1=1
        </otherwise>
    </choose>
</select>
```

## where标签

where标签用于动态生成WHERE子句，自动处理AND和OR的前缀问题。

### 解决的问题

- 自动添加WHERE关键字
- 自动去除多余的AND或OR前缀
- 当没有条件时，不生成WHERE子句

### 实际应用

```
<select id="selectUsersByMap" parameterType="map" resultType="User">
    SELECT id, name, age, email FROM users
    <where>
        <if test="name != null and name != ''">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="minAge != null">
            AND age >= #{minAge}
        </if>
        <if test="maxAge != null">
            AND age <= #{maxAge}
        </if>
        <if test="email != null and email != ''">
            AND email = #{email}
        </if>
    </where>
</select>
```

## set标签

set标签用于动态生成SET子句，常用于UPDATE语句中的选择性更新。

### 解决的问题

- 自动添加SET关键字
- 自动去除多余的逗号
- 只更新非空字段

### 实际应用

```
<update id="updateUserSelective" parameterType="User">
    UPDATE users
    <set>
        <if test="name != null and name != ''">
            name = #{name},
        </if>
        <if test="age != null">
            age = #{age},
        </if>
        <if test="email != null and email != ''">
            email = #{email},
        </if>
    </set>
    WHERE id = #{id}
</update>
```

## foreach标签

foreach标签用于遍历集合，常用于IN查询、批量插入、批量删除等场景。

### 属性说明

- **collection**：要遍历的集合
- **item**：集合中每个元素的别名
- **index**：当前元素的索引
- **open**：开始字符
- **close**：结束字符
- **separator**：分隔符

### IN查询示例

```
<select id="selectUsersByIds" resultType="User">
    SELECT id, name, age, email FROM users
    WHERE id IN
    <foreach collection="ids" item="id" open="(" close=")" separator=",">
        #{id}
    </foreach>
</select>
```

### 批量插入示例

```
<insert id="batchInsertUsers">
    INSERT INTO users (name, age, email) VALUES
    <foreach collection="users" item="user" separator=",">
        (#{user.name}, #{user.age}, #{user.email})
    </foreach>
</insert>
```

### 批量删除示例

```
<delete id="batchDeleteUsers">
    DELETE FROM users
    WHERE id IN
    <foreach collection="ids" item="id" open="(" close=")" separator=",">
        #{id}
    </foreach>
</delete>
```

## trim标签

trim标签是最灵活的标签，可以自定义前缀、后缀，以及要去除的前缀和后缀。

### 属性说明

- **prefix**：添加的前缀
- **suffix**：添加的后缀
- **prefixOverrides**：要去除的前缀
- **suffixOverrides**：要去除的后缀

### 实际应用

```
<select id="selectUsersByTrim" resultType="User">
    SELECT id, name, age, email FROM users
    <trim prefix="WHERE" prefixOverrides="AND |OR ">
        <if test="name != null and name != ''">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
    </trim>
</select>
```

### 等价关系

```
<!-- where标签等价于 -->
<trim prefix="WHERE" prefixOverrides="AND |OR ">
    ...
</trim>

<!-- set标签等价于 -->
<trim prefix="SET" suffixOverrides=",">
    ...
</trim>
```

## SQL片段

SQL片段用于定义可重用的SQL代码块，提高代码复用性和维护性。

### 定义SQL片段

```
<!-- 定义常用的列名 -->
<sql id="userColumns">
    id, name, age, email
</sql>

<!-- 定义表名 -->
<sql id="userTable">
    users
</sql>

<!-- 定义常用的WHERE条件 -->
<sql id="userWhereCondition">
    <where>
        <if test="name != null and name != ''">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
        <if test="age != null">
            AND age = #{age}
        </if>
    </where>
</sql>
```

### 引用SQL片段

```
<select id="selectUsersWithFragment" resultType="User">
    SELECT <include refid="userColumns"/> 
    FROM <include refid="userTable"/>
    <include refid="userWhereCondition"/>
    ORDER BY id
</select>
```

### 带参数的SQL片段

```
<sql id="orderBy">
    ORDER BY ${column} ${direction}
</sql>

<select id="selectUsersWithOrder" resultType="User">
    SELECT <include refid="userColumns"/> FROM <include refid="userTable"/>
    <include refid="orderBy">
        <property name="column" value="name"/>
        <property name="direction" value="ASC"/>
    </include>
</select>
```

## 动态SQL最佳实践

### 1. 性能优化

- 避免在动态SQL中使用复杂的逻辑判断
- 合理使用索引，确保动态生成的WHERE条件能够利用索引
- 批量操作时控制批次大小，避免单次操作数据量过大
- 使用合适的参数类型，避免不必要的类型转换

### 2. 安全考虑

- 始终使用#{}进行参数绑定，避免SQL注入
- 谨慎使用${}，仅在必要时使用（如动态表名、列名）
- 对用户输入进行验证和过滤
- 避免在动态SQL中直接拼接用户输入

### 3. 代码组织

- 合理使用SQL片段，提高代码复用性
- 保持SQL语句的可读性，适当添加注释
- 将复杂的动态SQL拆分为多个简单的片段
- 统一命名规范，便于维护

### 4. 调试技巧

- 开启SQL日志，查看实际生成的SQL语句
- 使用单元测试验证各种条件分支
- 在开发环境中打印SQL参数
- 使用数据库工具验证SQL语句的正确性

## 常见问题与解决方案

### Q: 动态SQL中的条件判断不生效？

A: 检查test表达式是否正确，注意参数名称和类型，确保传入的参数不为null。

### Q: foreach标签遍历集合时出现异常？

A: 确保collection属性指向的集合不为null，检查item和index的命名是否正确。

### Q: where标签没有自动去除AND前缀？

A: 确保在if条件中使用AND或OR作为前缀，where标签会自动处理这些前缀。

### Q: SQL片段引用时找不到？

A: 检查sql片段的id是否正确，确保在同一个mapper文件中或者使用完整的命名空间引用。

### Q: 动态SQL性能较差？

A: 检查生成的SQL是否能够利用索引，避免全表扫描，合理设计查询条件。

## 实践练习

### 练习1：条件查询

实现一个用户搜索功能，支持按姓名、年龄范围、邮箱进行模糊查询。

### 练习2：选择性更新

实现一个用户信息更新功能，只更新非空字段。

### 练习3：批量操作

实现批量插入用户和批量删除用户的功能。

### 练习4：复杂动态SQL

结合多种动态SQL标签，实现一个复杂的报表查询功能。

## 运行示例程序

### 步骤1：导入项目

将chapter-07-dynamic-sql.json导入到IntelliJ IDEA中。

### 步骤2：配置数据库

确保MySQL数据库运行正常，执行init.sql创建测试数据。

### 步骤3：运行程序

运行DynamicSqlDemo.java，观察各种动态SQL标签的执行效果。

### 步骤4：查看日志

观察控制台输出的SQL语句，理解动态SQL的生成过程。

### 步骤5：运行测试

执行DynamicSqlTest.java中的测试用例，验证各种动态SQL功能。



## 第08章 结果映射

## 学习目标

- 深入理解MyBatis结果映射的工作原理
- 掌握基本结果映射和自定义结果映射
- 学会配置一对一和一对多关联映射
- 理解嵌套查询和嵌套结果的区别
- 掌握延迟加载的配置和使用
- 学会处理复杂的多层嵌套映射



## 结果映射概述

结果映射是MyBatis最强大的特性之一，它负责将SQL查询结果转换为Java对象。MyBatis提供了灵活的映射机制，支持简单类型映射、复杂对象映射、关联对象映射等多种场景。

### 结果映射的类型

- **基本映射**：直接使用resultType
- **自定义映射**：使用resultMap定义复杂映射
- **关联映射**：处理对象之间的关联关系
- **集合映射**：处理一对多的集合关系

## 基本结果映射

最简单的结果映射方式，直接使用resultType指定返回类型。

### 简单类型映射

```
<!-- 返回基本类型 -->
<select id="countUsers" resultType="long">
    SELECT COUNT(*) FROM users
</select>

<!-- 返回字符串 -->
<select id="getUserName" resultType="string">
    SELECT name FROM users WHERE id = #{id}
</select>
```

### 对象类型映射

```
<!-- 返回单个对象 -->
<select id="selectUserById" resultType="User">
    SELECT id, name, age, email FROM users WHERE id = #{id}
</select>

<!-- 返回对象列表 -->
<select id="selectAllUsers" resultType="User">
    SELECT id, name, age, email FROM users
</select>
```

### 自动映射规则

- 列名与属性名完全匹配
- 开启驼峰命名转换（mapUnderscoreToCamelCase=true）
- 类型自动转换（String ↔ 数值类型等）

## 自定义结果映射

当自动映射无法满足需求时，可以使用resultMap定义自定义的结果映射。

### 基本ResultMap

```
<resultMap id="userResultMap" type="User">
    <id property="id" column="user_id"/>
    <result property="name" column="user_name"/>
    <result property="age" column="user_age"/>
    <result property="email" column="user_email"/>
</resultMap>

<select id="selectUsersWithCustomMapping" resultMap="userResultMap">
    SELECT id as user_id, name as user_name, 
           age as user_age, email as user_email 
    FROM users
</select>
```

### ResultMap元素说明

- **id**：主键映射，用于性能优化
- **result**：普通字段映射
- **association**：一对一关联映射
- **collection**：一对多集合映射
- **discriminator**：鉴别器，根据条件选择映射

## 一对一关联映射

使用association标签处理一对一的关联关系。

### 嵌套查询方式

```
<resultMap id="userWithProfileMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    <association property="profile" column="id" 
                 select="com.example.mybatis.mapper.UserProfileMapper.selectProfileByUserId"/>
</resultMap>

<select id="selectUsersWithProfile" resultMap="userWithProfileMap">
    SELECT id, name, age, email FROM users
</select>
```

### 嵌套结果方式

```
<resultMap id="userWithProfileNestedMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    <association property="profile" javaType="UserProfile">
        <id property="id" column="profile_id"/>
        <result property="userId" column="user_id"/>
        <result property="phone" column="phone"/>
        <result property="address" column="address"/>
        <result property="birthday" column="birthday"/>
        <result property="avatar" column="avatar"/>
    </association>
</resultMap>

<select id="selectUsersWithProfileNested" resultMap="userWithProfileNestedMap">
    SELECT u.id, u.name, u.age, u.email,
           p.id as profile_id, p.user_id, p.phone, 
           p.address, p.birthday, p.avatar
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
</select>
```

### 两种方式的比较

| 特性       | 嵌套查询           | 嵌套结果 |
| :--------- | :----------------- | :------- |
| SQL数量    | 多个SQL（N+1问题） | 单个SQL  |
| 性能       | 可能较慢           | 通常更快 |
| 延迟加载   | 支持               | 不支持   |
| 配置复杂度 | 简单               | 相对复杂 |

## 一对多集合映射

使用collection标签处理一对多的集合关系。

### 嵌套查询方式

```
<resultMap id="userWithOrdersMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    <collection property="orders" column="id"
                select="com.example.mybatis.mapper.OrderMapper.selectOrdersByUserId"/>
</resultMap>

<select id="selectUsersWithOrders" resultMap="userWithOrdersMap">
    SELECT id, name, age, email FROM users
</select>
```

### 嵌套结果方式

```
<resultMap id="userWithOrdersNestedMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="userId" column="order_user_id"/>
        <result property="orderNo" column="order_no"/>
        <result property="amount" column="amount"/>
        <result property="status" column="status"/>
        <result property="createTime" column="create_time"/>
    </collection>
</resultMap>

<select id="selectUsersWithOrdersNested" resultMap="userWithOrdersNestedMap">
    SELECT u.id, u.name, u.age, u.email,
           o.id as order_id, o.user_id as order_user_id, 
           o.order_no, o.amount, o.status, o.create_time
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    ORDER BY u.id, o.id
</select>
```

## 复杂嵌套映射

在实际项目中，经常需要同时处理多种关联关系。

### 用户+档案+订单的复杂映射

```
<resultMap id="userComplexMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    
    <!-- 一对一关联：用户档案 -->
    <association property="profile" javaType="UserProfile">
        <id property="id" column="profile_id"/>
        <result property="userId" column="user_id"/>
        <result property="phone" column="phone"/>
        <result property="address" column="address"/>
        <result property="birthday" column="birthday"/>
        <result property="avatar" column="avatar"/>
    </association>
    
    <!-- 一对多关联：用户订单 -->
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="userId" column="order_user_id"/>
        <result property="orderNo" column="order_no"/>
        <result property="amount" column="amount"/>
        <result property="status" column="status"/>
        <result property="createTime" column="create_time"/>
    </collection>
</resultMap>

<select id="selectUsersWithComplexMapping" resultMap="userComplexMap">
    SELECT u.id, u.name, u.age, u.email,
           p.id as profile_id, p.user_id, p.phone, p.address, p.birthday, p.avatar,
           o.id as order_id, o.user_id as order_user_id, o.order_no, 
           o.amount, o.status, o.create_time
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    LEFT JOIN orders o ON u.id = o.user_id
    ORDER BY u.id, o.id
</select>
```

## 延迟加载

延迟加载是一种性能优化技术，只有在真正访问关联对象时才执行查询。

### 全局配置

```
<!-- 在mybatis-config.xml中配置 -->
<settings>
    <!-- 开启延迟加载 -->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!-- 关闭积极的延迟加载 -->
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

### 局部配置

```
<resultMap id="userLazyMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
    
    <!-- 延迟加载用户档案 -->
    <association property="profile" column="id" fetchType="lazy"
                 select="com.example.mybatis.mapper.UserProfileMapper.selectProfileByUserId"/>
    
    <!-- 延迟加载用户订单 -->
    <collection property="orders" column="id" fetchType="lazy"
                select="com.example.mybatis.mapper.OrderMapper.selectOrdersByUserId"/>
</resultMap>
```

### fetchType属性

- **eager**：立即加载
- **lazy**：延迟加载
- **默认值**：根据全局配置决定

## 高级映射技巧

### 1. 使用构造方法映射

```
<resultMap id="userConstructorMap" type="User">
    <constructor>
        <idArg column="id" javaType="long"/>
        <arg column="name" javaType="string"/>
        <arg column="age" javaType="int"/>
        <arg column="email" javaType="string"/>
    </constructor>
</resultMap>
```

### 2. 鉴别器映射

```
<resultMap id="userDiscriminatorMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <discriminator javaType="string" column="user_type">
        <case value="VIP" resultMap="vipUserMap"/>
        <case value="NORMAL" resultMap="normalUserMap"/>
    </discriminator>
</resultMap>
```

### 3. 继承映射

```
<resultMap id="baseUserMap" type="User">
    <id property="id" column="id"/>
    <result property="name" column="name"/>
    <result property="age" column="age"/>
    <result property="email" column="email"/>
</resultMap>

<resultMap id="extendedUserMap" type="User" extends="baseUserMap">
    <association property="profile" column="id" 
                 select="selectProfileByUserId"/>
</resultMap>
```

## 性能优化建议

### 1. 选择合适的映射方式

- 简单查询使用resultType
- 复杂映射使用resultMap
- 一对一关系优先使用嵌套结果
- 一对多关系根据数据量选择

### 2. 避免N+1问题

- 合理使用嵌套结果映射
- 启用延迟加载
- 批量查询优化
- 缓存机制配合

### 3. 延迟加载最佳实践

- 只对大对象或集合使用延迟加载
- 避免在循环中触发延迟加载
- 注意Session生命周期
- 合理设置fetchType

### 4. 内存使用优化

- 避免加载不必要的字段
- 合理设计对象结构
- 及时释放大对象
- 使用分页查询

## 常见问题与解决方案

### Q: 延迟加载时出现LazyInitializationException？

A: 确保在Session关闭前访问延迟加载的属性，或者使用OpenSessionInView模式。

### Q: 一对多映射时数据重复？

A: 检查resultMap中的id配置是否正确，确保主键映射准确。

### Q: 嵌套结果映射性能差？

A: 考虑使用嵌套查询+延迟加载，或者优化SQL查询和索引。

### Q: 复杂映射配置错误？

A: 逐步构建映射，先测试简单映射再添加复杂关联。

### Q: 类型转换异常？

A: 检查javaType和jdbcType配置，确保类型匹配。

## 实践练习

### 练习1：基本映射

创建一个自定义ResultMap，处理列名与属性名不匹配的情况。

### 练习2：一对一映射

实现用户和用户档案的一对一映射，分别使用嵌套查询和嵌套结果两种方式。

### 练习3：一对多映射

实现用户和订单的一对多映射，观察数据的组织方式。

### 练习4：延迟加载

配置延迟加载，观察SQL执行时机和性能差异。

### 练习5：复杂映射

实现包含用户、档案、订单的三层嵌套映射。

## 运行示例程序

### 步骤1：导入项目

将chapter-08-result-mapping.json导入到IntelliJ IDEA中。

### 步骤2：配置数据库

确保MySQL数据库运行正常，执行init.sql创建测试数据。

### 步骤3：运行程序

运行ResultMappingDemo.java，观察各种结果映射的执行效果。

### 步骤4：观察SQL日志

查看控制台输出的SQL语句，理解不同映射方式的查询策略。

### 步骤5：测试延迟加载

观察延迟加载的触发时机和SQL执行情况。

### 步骤6：运行测试

执行ResultMappingTest.java中的测试用例，验证各种映射功能。



## 第三部分：高级特性与缓存

## 第09章 缓存机制

## 学习目标

- 深入理解MyBatis缓存机制的工作原理
- 掌握一级缓存和二级缓存的配置与使用
- 学会缓存的生效条件和失效机制
- 了解自定义缓存的实现方法
- 掌握分布式缓存的集成方案
- 学会缓存性能优化和最佳实践



## 缓存机制概述

缓存是提高应用性能的重要手段，MyBatis提供了完善的缓存机制。通过缓存，可以减少数据库访问次数，提高查询性能。MyBatis支持一级缓存和二级缓存两种缓存级别。

### 缓存的作用

- **减少数据库访问**：避免重复查询相同数据
- **提高响应速度**：从内存获取数据比数据库查询快
- **降低数据库负载**：减少数据库连接和查询压力
- **改善用户体验**：更快的响应时间

### MyBatis缓存层次

- **一级缓存**：SqlSession级别，默认开启
- **二级缓存**：Mapper级别，需要手动配置
- **自定义缓存**：可以集成第三方缓存框架

## 一级缓存

一级缓存是SqlSession级别的缓存，在同一个SqlSession中，相同的查询会从缓存中获取结果。

### 一级缓存的特点

- 默认开启，无法关闭
- 作用域为SqlSession
- 基于HashMap实现
- 生命周期与SqlSession相同

### 一级缓存的工作原理

```
// 演示一级缓存的工作
public class FirstLevelCacheDemo {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = MyBatisUtils.getSqlSessionFactory();
        SqlSession session = factory.openSession();
        
        try {
            UserMapper mapper = session.getMapper(UserMapper.class);
            
            // 第一次查询，从数据库获取
            System.out.println("=== 第一次查询 ===");
            User user1 = mapper.selectUserById(1L);
            System.out.println("用户1: " + user1.getName());
            
            // 第二次查询，从一级缓存获取
            System.out.println("=== 第二次查询 ===");
            User user2 = mapper.selectUserById(1L);
            System.out.println("用户2: " + user2.getName());
            
            // 验证是否为同一个对象
            System.out.println("是否为同一对象: " + (user1 == user2));
            
        } finally {
            session.close();
        }
    }
}
```

### 一级缓存失效的情况

- **SqlSession关闭**：缓存随之清空
- **执行增删改操作**：会清空当前SqlSession的缓存
- **手动清除**：调用clearCache()方法
- **查询参数不同**：不同参数的查询不会命中缓存

```
// 演示一级缓存失效
public void testFirstLevelCacheInvalidation() {
    SqlSession session = factory.openSession();
    UserMapper mapper = session.getMapper(UserMapper.class);
    
    // 第一次查询
    User user1 = mapper.selectUserById(1L);
    
    // 执行更新操作，缓存失效
    mapper.updateUser(new User(2L, "Updated Name", 25, "new@email.com"));
    
    // 再次查询，需要重新从数据库获取
    User user2 = mapper.selectUserById(1L);
    
    session.close();
}
```

## 二级缓存

二级缓存是Mapper级别的缓存，可以在多个SqlSession之间共享。

### 二级缓存的特点

- 默认关闭，需要手动开启
- 作用域为Mapper（Namespace）
- 可以跨SqlSession共享
- 需要实体类实现Serializable接口

### 开启二级缓存

#### 1. 全局配置

```
<!-- 在mybatis-config.xml中开启二级缓存 -->
<settings>
    <setting name="cacheEnabled" value="true"/>
</settings>
```

#### 2. Mapper配置

```
<!-- 在UserMapper.xml中配置缓存 -->
<mapper namespace="com.example.mybatis.mapper.UserMapper">
    
    <!-- 开启二级缓存 -->
    <cache/>
    
    <!-- 或者使用详细配置 -->
    <cache 
        eviction="LRU"
        flushInterval="60000"
        size="512"
        readOnly="false"/>
    
    <select id="selectUserById" resultType="User">
        SELECT id, name, age, email FROM users WHERE id = #{id}
    </select>
    
</mapper>
```

#### 3. 实体类配置

```
// 实体类必须实现Serializable接口
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long id;
    private String name;
    private Integer age;
    private String email;
    
    // 构造方法、getter、setter等
}
```

### 缓存配置属性

| 属性          | 描述             | 默认值 | 可选值                |
| :------------ | :--------------- | :----- | :-------------------- |
| eviction      | 缓存回收策略     | LRU    | LRU、FIFO、SOFT、WEAK |
| flushInterval | 刷新间隔（毫秒） | 无     | 正整数                |
| size          | 缓存对象数量     | 1024   | 正整数                |
| readOnly      | 是否只读         | false  | true、false           |

### 缓存回收策略详解

- **LRU**：最近最少使用，移除最长时间不被使用的对象
- **FIFO**：先进先出，按对象进入缓存的顺序来移除
- **SOFT**：软引用，基于垃圾回收器状态和软引用规则移除对象
- **WEAK**：弱引用，更积极地基于垃圾收集器状态和弱引用规则移除对象

### 二级缓存的使用示例

```
// 演示二级缓存的工作
public class SecondLevelCacheDemo {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = MyBatisUtils.getSqlSessionFactory();
        
        // 第一个SqlSession
        SqlSession session1 = factory.openSession();
        try {
            UserMapper mapper1 = session1.getMapper(UserMapper.class);
            User user1 = mapper1.selectUserById(1L);
            System.out.println("Session1查询: " + user1.getName());
        } finally {
            session1.close(); // 关闭session1，数据进入二级缓存
        }
        
        // 第二个SqlSession
        SqlSession session2 = factory.openSession();
        try {
            UserMapper mapper2 = session2.getMapper(UserMapper.class);
            User user2 = mapper2.selectUserById(1L); // 从二级缓存获取
            System.out.println("Session2查询: " + user2.getName());
        } finally {
            session2.close();
        }
    }
}
```

### 控制缓存行为

#### 1. 禁用特定查询的缓存

```
<select id="selectUserById" resultType="User" useCache="false">
    SELECT id, name, age, email FROM users WHERE id = #{id}
</select>
```

#### 2. 控制缓存刷新

```
<insert id="insertUser" flushCache="true">
    INSERT INTO users (name, age, email) VALUES (#{name}, #{age}, #{email})
</insert>

<update id="updateUser" flushCache="true">
    UPDATE users SET name=#{name}, age=#{age}, email=#{email} WHERE id=#{id}
</update>

<delete id="deleteUser" flushCache="true">
    DELETE FROM users WHERE id = #{id}
</delete>
```

## 自定义缓存

MyBatis允许使用自定义缓存实现，可以集成Redis、Ehcache等第三方缓存框架。

### 实现Cache接口

```
public class CustomCache implements Cache {
    private final String id;
    private final Map<Object, Object> cache = new ConcurrentHashMap<>();
    
    public CustomCache(String id) {
        this.id = id;
    }
    
    @Override
    public String getId() {
        return id;
    }
    
    @Override
    public void putObject(Object key, Object value) {
        cache.put(key, value);
        System.out.println("缓存存储: " + key);
    }
    
    @Override
    public Object getObject(Object key) {
        Object value = cache.get(key);
        System.out.println("缓存获取: " + key + " -> " + (value != null ? "命中" : "未命中"));
        return value;
    }
    
    @Override
    public Object removeObject(Object key) {
        System.out.println("缓存移除: " + key);
        return cache.remove(key);
    }
    
    @Override
    public void clear() {
        System.out.println("清空缓存");
        cache.clear();
    }
    
    @Override
    public int getSize() {
        return cache.size();
    }
}
```

### 使用自定义缓存

```
<mapper namespace="com.example.mybatis.mapper.UserMapper">
    
    <!-- 使用自定义缓存 -->
    <cache type="com.example.mybatis.cache.CustomCache"/>
    
    <select id="selectUserById" resultType="User">
        SELECT id, name, age, email FROM users WHERE id = #{id}
    </select>
    
</mapper>
```

## Redis缓存集成

在分布式环境中，可以使用Redis作为二级缓存的存储介质。

### Redis缓存实现

```
public class RedisCache implements Cache {
    private final String id;
    private static JedisPool jedisPool;
    
    static {
        // 初始化Redis连接池
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(100);
        config.setMaxIdle(10);
        jedisPool = new JedisPool(config, "localhost", 6379);
    }
    
    public RedisCache(String id) {
        this.id = id;
    }
    
    @Override
    public String getId() {
        return id;
    }
    
    @Override
    public void putObject(Object key, Object value) {
        try (Jedis jedis = jedisPool.getResource()) {
            String keyStr = id + ":" + key.toString();
            String valueStr = serialize(value);
            jedis.setex(keyStr, 3600, valueStr); // 1小时过期
        }
    }
    
    @Override
    public Object getObject(Object key) {
        try (Jedis jedis = jedisPool.getResource()) {
            String keyStr = id + ":" + key.toString();
            String valueStr = jedis.get(keyStr);
            return valueStr != null ? deserialize(valueStr) : null;
        }
    }
    
    @Override
    public Object removeObject(Object key) {
        try (Jedis jedis = jedisPool.getResource()) {
            String keyStr = id + ":" + key.toString();
            return jedis.del(keyStr);
        }
    }
    
    @Override
    public void clear() {
        try (Jedis jedis = jedisPool.getResource()) {
            Set<String> keys = jedis.keys(id + ":*");
            if (!keys.isEmpty()) {
                jedis.del(keys.toArray(new String[0]));
            }
        }
    }
    
    @Override
    public int getSize() {
        try (Jedis jedis = jedisPool.getResource()) {
            return jedis.keys(id + ":*").size();
        }
    }
    
    // 序列化和反序列化方法
    private String serialize(Object obj) {
        // 实现对象序列化
        return JSON.toJSONString(obj);
    }
    
    private Object deserialize(String str) {
        // 实现对象反序列化
        return JSON.parseObject(str, Object.class);
    }
}
```

### 配置Redis缓存

```
<mapper namespace="com.example.mybatis.mapper.UserMapper">
    
    <!-- 使用Redis缓存 -->
    <cache type="com.example.mybatis.cache.RedisCache"
           eviction="LRU"
           flushInterval="600000"
           size="1000"
           readOnly="false"/>
    
</mapper>
```

## 缓存最佳实践

### 1. 缓存策略选择

- 读多写少的数据适合使用缓存
- 频繁变更的数据不适合长时间缓存
- 大对象缓存需要考虑内存占用
- 关联查询结果缓存需要谨慎处理

### 2. 缓存配置优化

- 合理设置缓存大小和过期时间
- 选择合适的回收策略
- 根据业务场景选择readOnly属性
- 监控缓存命中率和性能指标

### 3. 缓存一致性

- 及时清除过期缓存
- 处理好增删改操作对缓存的影响
- 考虑分布式环境下的缓存同步
- 避免缓存雪崩和缓存穿透

### 4. 性能监控

- 监控缓存命中率
- 观察缓存大小和内存使用
- 分析缓存失效原因
- 定期清理无效缓存

## 缓存问题与解决方案

### Q: 缓存不生效怎么办？

A: 检查全局配置是否开启、Mapper是否配置cache标签、实体类是否实现Serializable接口。

### Q: 如何避免缓存数据不一致？

A: 合理设置flushCache属性，在增删改操作后及时清除相关缓存。

### Q: 二级缓存序列化异常？

A: 确保所有相关实体类都实现了Serializable接口，包括关联对象。

### Q: 缓存占用内存过大？

A: 调整缓存大小配置，选择合适的回收策略，避免缓存大对象。

### Q: 分布式环境缓存同步问题？

A: 使用Redis等分布式缓存，或者实现缓存失效通知机制。

## 实践练习

### 练习1：一级缓存验证

编写代码验证一级缓存的生效和失效条件。

### 练习2：二级缓存配置

配置二级缓存，测试不同SqlSession间的缓存共享。

### 练习3：自定义缓存实现

实现一个带有统计功能的自定义缓存。

### 练习4：Redis缓存集成

集成Redis作为二级缓存，测试分布式缓存效果。

### 练习5：缓存性能测试

对比有缓存和无缓存的性能差异，分析缓存命中率。

## 运行示例程序

### 步骤1：导入项目

将chapter-09-cache.json导入到IntelliJ IDEA中。

### 步骤2：配置环境

确保MySQL和Redis服务正常运行，执行init.sql创建测试数据。

### 步骤3：运行基础示例

运行CacheDemo.java，观察一级缓存和二级缓存的工作效果。

### 步骤4：观察缓存日志

查看控制台输出，理解缓存的命中和失效机制。

### 步骤5：测试自定义缓存

运行自定义缓存示例，观察缓存的存储和获取过程。

### 步骤6：Redis缓存测试

配置Redis缓存，测试分布式缓存的效果。

### 步骤7：运行测试用例

执行CacheTest.java中的测试用例，验证各种缓存场景。



## 第10章 插件开发

## 学习目标

- 深入理解MyBatis插件机制的工作原理
- 掌握拦截器的开发和配置方法
- 学会开发常用的功能插件
- 了解插件的执行顺序和生命周期
- 掌握插件性能优化技巧
- 学会调试和测试插件功能



## 插件机制概述

MyBatis插件机制基于JDK动态代理和责任链模式，允许开发者在SQL执行的关键节点进行拦截和增强。通过插件，可以实现性能监控、SQL审计、分页查询、缓存增强等功能。

### 插件的优势

- **非侵入性**：不需要修改原有代码
- **可插拔**：可以灵活地启用或禁用功能
- **可扩展**：支持自定义功能扩展
- **链式处理**：多个插件可以协同工作

### 可拦截的对象

MyBatis允许拦截以下四种对象的方法调用：

- **Executor**：执行器，负责SQL的执行和缓存维护
- **ParameterHandler**：参数处理器，负责参数的设置
- **ResultSetHandler**：结果集处理器，负责结果的映射
- **StatementHandler**：语句处理器，负责SQL语句的准备和执行

## 插件开发基础

### 实现Interceptor接口

```
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
        .main-content {
            padding-right: 15px;
        }
        .main-content .container {
            padding-left: 0;
            padding-right: 0;
        }
    ),
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
    )
})
public class PerformanceInterceptor implements Interceptor {
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        try {
            // 执行原方法
            Object result = invocation.proceed();
            return result;
        } finally {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            // 记录执行时间
            MappedStatement ms = (MappedStatement) invocation.getArgs()[0];
            System.out.println("SQL执行时间: " + ms.getId() + " -> " + duration + "ms");
        }
    }
    
    @Override
    public Object plugin(Object target) {
        // 使用Plugin.wrap方法创建代理对象
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 设置插件属性
        String threshold = properties.getProperty("threshold", "100");
        System.out.println("性能监控阈值: " + threshold + "ms");
    }
}
```

### 注解说明

- **@Intercepts**：标记这是一个拦截器
- **@Signature**：指定要拦截的方法签名
- **type**：要拦截的对象类型
- **method**：要拦截的方法名
- **args**：方法的参数类型数组

### 插件注册

```
<!-- 在mybatis-config.xml中注册插件 -->
<configuration>
    <plugins>
        <!-- 性能监控插件 -->
        <plugin interceptor="com.example.mybatis.plugin.PerformanceInterceptor">
            <property name="threshold" value="100"/>
        </plugin>
        
        <!-- SQL日志插件 -->
        <plugin interceptor="com.example.mybatis.plugin.SqlLogInterceptor">
            <property name="logLevel" value="DEBUG"/>
        </plugin>
        
        <!-- 分页插件 -->
        <plugin interceptor="com.example.mybatis.plugin.PaginationInterceptor"/>
    </plugins>
</configuration>
```

## 常用插件开发实例

### 1. SQL日志插件

```
@Intercepts({
    @Signature(
        type = StatementHandler.class,
        method = "prepare",
        args = {Connection.class, Integer.class}
    )
})
public class SqlLogInterceptor implements Interceptor {
    
    private static final Logger logger = LoggerFactory.getLogger(SqlLogInterceptor.class);
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        BoundSql boundSql = statementHandler.getBoundSql();
        
        // 获取SQL语句
        String sql = boundSql.getSql();
        
        // 获取参数
        Object parameterObject = boundSql.getParameterObject();
        
        // 格式化SQL
        String formattedSql = formatSql(sql);
        
        // 记录SQL日志
        logger.info("执行SQL: {}", formattedSql);
        logger.info("参数: {}", parameterObject);
        
        return invocation.proceed();
    }
    
    private String formatSql(String sql) {
        // 简单的SQL格式化
        return sql.replaceAll("\s+", " ").trim();
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 可以配置日志级别等属性
    }
}
```

### 2. 分页插件

```
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
    )
})
public class PaginationInterceptor implements Interceptor {
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        Object parameter = args[1];
        RowBounds rowBounds = (RowBounds) args[2];
        
        // 检查是否需要分页
        if (rowBounds == null || rowBounds == RowBounds.DEFAULT) {
            return invocation.proceed();
        }
        
        Executor executor = (Executor) invocation.getTarget();
        BoundSql boundSql = ms.getBoundSql(parameter);
        
        // 构建count查询
        String countSql = buildCountSql(boundSql.getSql());
        
        // 执行count查询
        Long total = executeCountQuery(executor, ms, parameter, countSql);
        
        // 构建分页查询
        String pageSql = buildPageSql(boundSql.getSql(), rowBounds);
        
        // 创建新的MappedStatement
        MappedStatement newMs = copyMappedStatement(ms, new BoundSqlSource(boundSql, pageSql));
        args[0] = newMs;
        args[2] = RowBounds.DEFAULT;
        
        // 执行分页查询
        List result = (List) invocation.proceed();
        
        // 封装分页结果
        return new PageResult<>(result, total, rowBounds.getOffset(), rowBounds.getLimit());
    }
    
    private String buildCountSql(String originalSql) {
        return "SELECT COUNT(*) FROM (" + originalSql + ") tmp_count";
    }
    
    private String buildPageSql(String originalSql, RowBounds rowBounds) {
        return originalSql + " LIMIT " + rowBounds.getOffset() + ", " + rowBounds.getLimit();
    }
    
    private Long executeCountQuery(Executor executor, MappedStatement ms, 
                                  Object parameter, String countSql) throws SQLException {
        // 实现count查询逻辑
        // ...
        return 0L;
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 配置数据库方言等
    }
}
```

### 3. SQL审计插件

```
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
    )
})
public class SqlAuditInterceptor implements Interceptor {
    
    private static final Logger auditLogger = LoggerFactory.getLogger("SQL_AUDIT");
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        MappedStatement ms = (MappedStatement) invocation.getArgs()[0];
        Object parameter = invocation.getArgs()[1];
        
        // 记录操作前信息
        AuditInfo auditInfo = new AuditInfo();
        auditInfo.setStatementId(ms.getId());
        auditInfo.setSqlCommandType(ms.getSqlCommandType().name());
        auditInfo.setStartTime(new Date(startTime));
        auditInfo.setUserId(getCurrentUserId());
        auditInfo.setParameter(parameter);
        
        try {
            // 执行SQL
            Object result = invocation.proceed();
            
            // 记录成功信息
            auditInfo.setSuccess(true);
            auditInfo.setAffectedRows(getAffectedRows(result));
            
            return result;
        } catch (Exception e) {
            // 记录异常信息
            auditInfo.setSuccess(false);
            auditInfo.setErrorMessage(e.getMessage());
            throw e;
        } finally {
            // 记录结束时间和耗时
            long endTime = System.currentTimeMillis();
            auditInfo.setEndTime(new Date(endTime));
            auditInfo.setDuration(endTime - startTime);
            
            // 输出审计日志
            auditLogger.info("SQL审计: {}", JSON.toJSONString(auditInfo));
        }
    }
    
    private String getCurrentUserId() {
        // 获取当前用户ID，可以从ThreadLocal或Security Context中获取
        return "system";
    }
    
    private int getAffectedRows(Object result) {
        if (result instanceof Integer) {
            return (Integer) result;
        }
        return 0;
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 配置审计相关属性
    }
    
    // 审计信息实体类
    public static class AuditInfo {
        private String statementId;
        private String sqlCommandType;
        private Date startTime;
        private Date endTime;
        private long duration;
        private String userId;
        private Object parameter;
        private boolean success;
        private int affectedRows;
        private String errorMessage;
        
        // getter和setter方法
    }
}
```

## 高级插件开发技巧

### 1. 插件链和执行顺序

多个插件会形成一个拦截器链，执行顺序与注册顺序相反（后注册的先执行）。

```
// 插件执行顺序示例
// 注册顺序：Plugin1 -> Plugin2 -> Plugin3
// 执行顺序：Plugin3 -> Plugin2 -> Plugin1 -> 目标方法 -> Plugin1 -> Plugin2 -> Plugin3

public class PluginChainDemo {
    public static void demonstratePluginChain() {
        // Plugin3.intercept() 开始
        //   Plugin2.intercept() 开始
        //     Plugin1.intercept() 开始
        //       目标方法执行
        //     Plugin1.intercept() 结束
        //   Plugin2.intercept() 结束
        // Plugin3.intercept() 结束
    }
}
```

### 2. 条件拦截

```
@Intercepts({
    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
    )
})
public class ConditionalInterceptor implements Interceptor {
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        MappedStatement ms = (MappedStatement) invocation.getArgs()[0];
        
        // 只拦截特定的Mapper方法
        if (shouldIntercept(ms)) {
            // 执行拦截逻辑
            return doIntercept(invocation);
        }
        
        // 不拦截，直接执行原方法
        return invocation.proceed();
    }
    
    private boolean shouldIntercept(MappedStatement ms) {
        String id = ms.getId();
        // 只拦截UserMapper的方法
        return id.contains("UserMapper");
    }
    
    private Object doIntercept(Invocation invocation) throws Throwable {
        // 具体的拦截逻辑
        System.out.println("拦截UserMapper方法");
        return invocation.proceed();
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 配置属性
    }
}
```

### 3. 参数和结果处理

```
@Intercepts({
    @Signature(
        type = ParameterHandler.class,
        method = "setParameters",
        args = {PreparedStatement.class}
    )
})
public class ParameterInterceptor implements Interceptor {
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        ParameterHandler parameterHandler = (ParameterHandler) invocation.getTarget();
        
        // 获取参数对象
        Field field = parameterHandler.getClass().getDeclaredField("parameterObject");
        field.setAccessible(true);
        Object parameterObject = field.get(parameterHandler);
        
        // 处理参数（例如：敏感信息加密）
        if (parameterObject instanceof User) {
            User user = (User) parameterObject;
            if (user.getPassword() != null) {
                user.setPassword(encrypt(user.getPassword()));
            }
        }
        
        return invocation.proceed();
    }
    
    private String encrypt(String password) {
        // 简单的加密示例
        return "encrypted_" + password;
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 配置加密算法等
    }
}
```

## 插件配置和管理

### 1. 外部配置文件

```
# plugin-config.properties
# 性能监控配置
performance.threshold=100
performance.slowSqlLog=true

# SQL日志配置
sqllog.level=DEBUG
sqllog.format=pretty

# 分页配置
pagination.dialect=mysql
pagination.reasonable=true

# 审计配置
audit.enabled=true
audit.logFile=/var/log/mybatis-audit.log
```

### 2. 动态配置加载

```
public class ConfigurableInterceptor implements Interceptor {
    
    private Properties config;
    
    @Override
    public void setProperties(Properties properties) {
        this.config = new Properties();
        
        // 加载默认配置
        loadDefaultConfig();
        
        // 加载外部配置文件
        loadExternalConfig();
        
        // 应用传入的配置（优先级最高）
        this.config.putAll(properties);
    }
    
    private void loadDefaultConfig() {
        config.setProperty("threshold", "100");
        config.setProperty("enabled", "true");
    }
    
    private void loadExternalConfig() {
        try {
            InputStream is = getClass().getClassLoader()
                .getResourceAsStream("plugin-config.properties");
            if (is != null) {
                config.load(is);
            }
        } catch (IOException e) {
            // 处理异常
        }
    }
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 使用配置
        boolean enabled = Boolean.parseBoolean(config.getProperty("enabled", "true"));
        if (!enabled) {
            return invocation.proceed();
        }
        
        // 其他逻辑
        return invocation.proceed();
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
}
```

## 插件性能优化

### 1. 减少反射调用

- 缓存反射获取的Field和Method
- 使用高性能的反射库（如ReflectASM）
- 避免在热点路径中使用反射

### 2. 优化字符串操作

- 使用StringBuilder进行字符串拼接
- 缓存格式化后的SQL语句
- 避免不必要的字符串创建

### 3. 异步处理

- 将耗时操作（如日志写入）异步化
- 使用线程池处理后台任务
- 避免阻塞主执行流程

### 4. 内存管理

- 及时释放大对象引用
- 使用对象池减少GC压力
- 监控内存使用情况

## 插件调试和测试

### 1. 调试技巧

```
public class DebugInterceptor implements Interceptor {
    
    private static final Logger logger = LoggerFactory.getLogger(DebugInterceptor.class);
    
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 打印调用信息
        Object target = invocation.getTarget();
        Method method = invocation.getMethod();
        Object[] args = invocation.getArgs();
        
        logger.debug("拦截调用: {}.{}({})", 
            target.getClass().getSimpleName(),
            method.getName(),
            Arrays.toString(args));
        
        // 打印调用栈
        if (logger.isTraceEnabled()) {
            StackTraceElement[] stack = Thread.currentThread().getStackTrace();
            for (int i = 0; i < Math.min(stack.length, 10); i++) {
                logger.trace("  at {}", stack[i]);
            }
        }
        
        return invocation.proceed();
    }
    
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    
    @Override
    public void setProperties(Properties properties) {
        // 配置调试级别
    }
}
```

### 2. 单元测试

```
public class PerformanceInterceptorTest {
    
    private PerformanceInterceptor interceptor;
    private Invocation mockInvocation;
    
    @Before
    public void setUp() {
        interceptor = new PerformanceInterceptor();
        
        // 设置属性
        Properties props = new Properties();
        props.setProperty("threshold", "50");
        interceptor.setProperties(props);
        
        // 创建模拟对象
        mockInvocation = mock(Invocation.class);
    }
    
    @Test
    public void testIntercept() throws Throwable {
        // 模拟方法调用
        when(mockInvocation.proceed()).thenReturn("result");
        
        MappedStatement ms = mock(MappedStatement.class);
        when(ms.getId()).thenReturn("com.example.UserMapper.selectById");
        when(mockInvocation.getArgs()).thenReturn(new Object[]{ms, 1L});
        
        // 执行拦截
        Object result = interceptor.intercept(mockInvocation);
        
        // 验证结果
        assertEquals("result", result);
        verify(mockInvocation).proceed();
    }
    
    @Test
    public void testPlugin() {
        Object target = new Object();
        Object plugin = interceptor.plugin(target);
        
        // 验证返回的是代理对象
        assertNotSame(target, plugin);
        assertTrue(Proxy.isProxyClass(plugin.getClass()));
    }
}
```

## 常见问题与解决方案

### Q: 插件不生效怎么办？

A: 检查插件注册配置、@Signature注解的方法签名是否正确、plugin方法是否正确返回代理对象。

### Q: 插件执行顺序如何控制？

A: 插件执行顺序与注册顺序相反，可以通过调整配置文件中的顺序来控制。

### Q: 如何避免插件影响性能？

A: 减少反射调用、异步处理耗时操作、添加开关控制、优化算法复杂度。

### Q: 插件中如何获取SQL语句？

A: 通过MappedStatement.getBoundSql()方法获取BoundSql对象，再调用getSql()方法。

### Q: 如何在插件中修改SQL？

A: 创建新的BoundSql对象和MappedStatement，替换Invocation中的参数。

## 实践练习

### 练习1：性能监控插件

开发一个性能监控插件，记录SQL执行时间，并在超过阈值时发出警告。

### 练习2：SQL美化插件

开发一个SQL格式化插件，将SQL语句格式化后输出到日志。

### 练习3：参数加密插件

开发一个参数处理插件，自动加密敏感字段。

### 练习4：结果缓存插件

开发一个结果缓存插件，缓存查询结果以提高性能。

### 练习5：多数据源路由插件

开发一个数据源路由插件，根据SQL类型自动选择读写数据源。

## 运行示例程序

### 步骤1：导入项目

将chapter-10-plugins.json导入到IntelliJ IDEA中。

### 步骤2：配置数据库

确保MySQL数据库运行正常，执行init.sql创建测试数据。

### 步骤3：运行基础示例

运行PluginDemo.java，观察各种插件的工作效果。

### 步骤4：观察插件日志

查看控制台输出，理解插件的拦截和处理过程。

### 步骤5：测试性能影响

对比有插件和无插件的性能差异，分析插件开销。

### 步骤6：自定义插件开发

尝试开发自己的插件，实现特定的业务需求。

### 步骤7：运行测试用例

执行PluginTest.java中的测试用例，验证插件功能的正确性。



## 第11章 MyBatis关联映射

## 🎯 关联映射概述

关联映射是MyBatis中处理对象间关系的重要机制，用于解决数据库表之间的关联关系在对象模型中的映射问题。

### 关联映射的作用

- **对象关系映射**：将数据库表间的关联关系映射为对象间的关联关系
- **数据完整性**：保证关联数据的一致性和完整性
- **查询优化**：通过合理的关联查询减少数据库访问次数
- **代码简化**：避免手动处理复杂的关联查询逻辑

### 关联映射类型

| 映射类型 | 标签          | 描述                   | 应用场景                     |
| :------- | :------------ | :--------------------- | :--------------------------- |
| 一对一   | <association> | 一个对象关联另一个对象 | 用户-用户详情、订单-支付信息 |
| 一对多   | <collection>  | 一个对象关联多个对象   | 用户-订单、部门-员工         |
| 多对多   | <collection>  | 多个对象相互关联       | 用户-角色、学生-课程         |

## 🔧 一对一关联映射

一对一关联表示两个实体之间存在唯一对应关系，使用<association>标签配置。

### 2.1 实体类设计

```java
// 用户实体
public class User {
    private Long id;
    private String username;
    private String email;
    private Date createTime;
    private UserProfile profile; // 一对一关联
    
    // getter/setter方法...
}

// 用户详细信息实体
public class UserProfile {
    private Long id;
    private Long userId;
    private String realName;
    private String phone;
    private String address;
    
    // getter/setter方法...
}
```

### 2.2 ResultMap配置

```xml
<!-- 一对一关联映射 -->
<resultMap id="UserWithProfileMap" type="User">
    <id column="id" property="id"/>
    <result column="username" property="username"/>
    <result column="email" property="email"/>
    <result column="create_time" property="createTime"/>
    
    <!-- 一对一关联配置 -->
    <association property="profile" javaType="UserProfile">
        <id column="profile_id" property="id"/>
        <result column="user_id" property="userId"/>
        <result column="real_name" property="realName"/>
        <result column="phone" property="phone"/>
        <result column="address" property="address"/>
    </association>
</resultMap>
```

### 2.3 查询语句

```xml
<select id="selectUsersWithProfile" resultMap="UserWithProfileMap">
    SELECT u.id, u.username, u.email, u.create_time,
           p.id as profile_id, p.user_id, p.real_name, p.phone, p.address
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
</select>
```

## 3. 一对多关联映射

一对多关联表示一个实体对应多个相关实体，使用<collection>标签配置。

### 3.1 实体类设计

```java
// 用户实体（包含订单列表）
public class User {
    private Long id;
    private String username;
    private String email;
    private List<Order> orders; // 一对多关联
    
    // getter/setter方法...
}

// 订单实体
public class Order {
    private Long id;
    private String orderNo;
    private Long userId;
    private BigDecimal amount;
    private String status;
    
    // getter/setter方法...
}
```

### 3.2 ResultMap配置

```xml
<!-- 一对多关联映射 -->
<resultMap id="UserWithOrdersMap" type="User">
    <id column="id" property="id"/>
    <result column="username" property="username"/>
    <result column="email" property="email"/>
    
    <!-- 一对多关联配置 -->
    <collection property="orders" ofType="Order">
        <id column="order_id" property="id"/>
        <result column="order_no" property="orderNo"/>
        <result column="amount" property="amount"/>
        <result column="status" property="status"/>
    </collection>
</resultMap>
```

### 3.3 查询语句

```xml
<select id="selectUsersWithOrders" resultMap="UserWithOrdersMap">
    SELECT u.id, u.username, u.email,
           o.id as order_id, o.order_no, o.amount, o.status
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    ORDER BY u.id, o.id
</select>
```

## 4. 多对多关联映射

多对多关联通过中间表实现，表示两个实体之间的多对多关系。

### 4.1 实体类设计

```java
// 用户实体（包含角色列表）
public class User {
    private Long id;
    private String username;
    private String email;
    private List<Role> roles; // 多对多关联
    
    // getter/setter方法...
}

// 角色实体
public class Role {
    private Long id;
    private String roleName;
    private String roleCode;
    private String description;
    private List<User> users; // 反向关联
    
    // getter/setter方法...
}
```

### 4.2 ResultMap配置

```xml
<!-- 多对多关联映射 -->
<resultMap id="UserWithRolesMap" type="User">
    <id column="id" property="id"/>
    <result column="username" property="username"/>
    <result column="email" property="email"/>
    
    <!-- 多对多关联配置 -->
    <collection property="roles" ofType="Role">
        <id column="role_id" property="id"/>
        <result column="role_name" property="roleName"/>
        <result column="role_code" property="roleCode"/>
        <result column="role_description" property="description"/>
    </collection>
</resultMap>
```

### 4.3 查询语句

```xml
<select id="selectUsersWithRoles" resultMap="UserWithRolesMap">
    SELECT u.id, u.username, u.email,
           r.id as role_id, r.role_name, r.role_code, r.description as role_description
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    ORDER BY u.id, r.id
</select>
```

## 5. 嵌套查询 vs 嵌套结果

### 5.1 嵌套结果（推荐）

**优点：**

- 只执行一次SQL查询
- 性能较好，减少数据库访问
- 适合数据量不大的关联查询

### 5.2 嵌套查询

```xml
<!-- 嵌套查询方式 -->
<resultMap id="UserWithProfileNested" type="User">
    <id column="id" property="id"/>
    <result column="username" property="username"/>
    
    <!-- 嵌套查询 -->
    <association property="profile" javaType="UserProfile" 
                 column="id" select="selectProfileByUserId"/>
</resultMap>

<select id="selectProfileByUserId" resultType="UserProfile">
    SELECT * FROM user_profiles WHERE user_id = #{id}
</select>
```

**注意：**嵌套查询可能导致N+1问题，即查询N个用户时会执行N+1次SQL语句。

## 6. 延迟加载

延迟加载可以提高性能，只在需要时才加载关联数据。

### 6.1 全局配置

```xml
<!-- mybatis-config.xml -->
<settings>
    <!-- 开启延迟加载 -->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!-- 关闭积极加载 -->
    <setting name="aggressiveLazyLoading" value="false"/>
</settings>
```

### 6.2 局部配置

```xml
<!-- 在association或collection中配置 -->
<association property="profile" javaType="UserProfile" 
             column="id" select="selectProfileByUserId" 
             fetchType="lazy"/>
```

## 7. 高级映射技巧

### 7.1 ResultMap继承

```xml
<!-- 基础映射 -->
<resultMap id="BaseUserMap" type="User">
    <id column="id" property="id"/>
    <result column="username" property="username"/>
    <result column="email" property="email"/>
</resultMap>

<!-- 继承基础映射 -->
<resultMap id="UserWithProfileMap" type="User" extends="BaseUserMap">
    <association property="profile" javaType="UserProfile">
        <!-- 关联映射配置 -->
    </association>
</resultMap>
```

### 7.2 复杂条件关联

```xml
<!-- 使用多个列作为关联条件 -->
<association property="profile" javaType="UserProfile" 
             column="{userId=id,status=status}" 
             select="selectProfileByUserIdAndStatus"/>
```

## 8. 性能优化建议

### 8.1 查询优化

- **合理使用JOIN**：优先使用嵌套结果而非嵌套查询
- **控制数据量**：避免一次性加载过多关联数据
- **索引优化**：为关联字段建立适当的索引
- **分页处理**：对大量数据进行分页查询

### 8.2 内存优化

- **延迟加载**：合理使用延迟加载减少内存占用
- **结果缓存**：利用MyBatis缓存机制
- **对象复用**：避免创建不必要的对象

## 9. 常见问题与解决方案

### 9.1 N+1查询问题

**问题：**使用嵌套查询时，查询N个主对象会执行N+1次SQL。

**解决方案：**

- 使用嵌套结果代替嵌套查询
- 合理设计SQL语句，使用JOIN查询
- 启用批量查询优化

### 9.2 循环依赖问题

**问题：**双向关联可能导致无限循环。

**解决方案：**

- 避免在toString()方法中包含关联对象
- 使用@JsonIgnore注解避免JSON序列化循环
- 合理设计对象关系，避免不必要的双向关联

### 9.3 数据重复问题

**问题：**一对多查询可能导致主对象数据重复。

**解决方案：**

- 正确配置ResultMap的id标签
- 使用DISTINCT关键字
- 合理设计查询语句的ORDER BY子句

## 10. 实践练习

### 练习任务

1. **基础练习**：实现用户与用户详情的一对一关联查询
2. **进阶练习**：实现用户与订单的一对多关联查询
3. **高级练习**：实现用户与角色的多对多关联查询
4. **综合练习**：实现包含所有关联关系的复合查询
5. **性能优化**：对比嵌套查询和嵌套结果的性能差异

## 11. 运行示例程序

### 运行步骤：

1. 确保MySQL数据库已安装并运行
2. 执行`src/main/resources/init.sql`创建数据库和表
3. 修改`db.properties`中的数据库连接信息
4. 运行`AssociationDemo`主程序
5. 观察不同类型关联查询的执行结果
6. 运行测试类验证各种关联映射功能



## 第12章 注解开发

## 1. 注解开发概述

### 1.1 注解开发的优势

- **简化配置：**减少XML配置文件，提高开发效率
- **类型安全：**编译时检查，减少运行时错误
- **代码集中：**SQL语句与Java代码在同一位置，便于维护
- **IDE支持：**更好的代码提示和重构支持

### 1.2 注解开发的适用场景

- 简单的CRUD操作
- SQL语句相对简单的场景
- 需要快速开发的项目
- 团队更偏向于Java代码而非XML配置

**注意：**对于复杂的SQL语句和动态SQL，XML配置方式可能更加清晰和易于维护。

## 2. 基本CRUD注解

### 2.1 核心注解介绍

| 注解     | 作用         | 示例                                                         |
| :------- | :----------- | :----------------------------------------------------------- |
| @Select  | 定义查询语句 | @Select("SELECT * FROM users WHERE id = #{id}")              |
| @Insert  | 定义插入语句 | @Insert("INSERT INTO users(name, email) VALUES(#{name}, #{email})") |
| @Update  | 定义更新语句 | @Update("UPDATE users SET name=#{name} WHERE id=#{id}")      |
| @Delete  | 定义删除语句 | @Delete("DELETE FROM users WHERE id=#{id}")                  |
| @Options | 配置选项     | @Options(useGeneratedKeys = true, keyProperty = "id")        |

### 2.2 基本CRUD示例

```java
public interface UserMapper {
    
    // 查询单个用户
    @Select("SELECT * FROM users WHERE id = #{id}")
    User selectUserById(Long id);
    
    // 查询所有用户
    @Select("SELECT * FROM users")
    List<User> selectAllUsers();
    
    // 插入用户（自动生成主键）
    @Insert("INSERT INTO users(username, email, create_time) VALUES(#{username}, #{email}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(User user);
    
    // 更新用户
    @Update("UPDATE users SET username=#{username}, email=#{email} WHERE id=#{id}")
    int updateUser(User user);
    
    // 删除用户
    @Delete("DELETE FROM users WHERE id=#{id}")
    int deleteUser(Long id);
}
```

## 3. 动态SQL注解

### 3.1 Provider注解

对于复杂的动态SQL，MyBatis提供了Provider注解：

- `@SelectProvider` - 动态查询
- `@InsertProvider` - 动态插入
- `@UpdateProvider` - 动态更新
- `@DeleteProvider` - 动态删除

### 3.2 SQL提供者类

```java
public class UserSqlProvider {
    
    public String selectByCondition(String username, String email) {
        return new SQL() {{
            SELECT("*");
            FROM("users");
            if (username != null && !username.trim().isEmpty()) {
                WHERE("username LIKE CONCAT('%', #{username}, '%')");
            }
            if (email != null && !email.trim().isEmpty()) {
                WHERE("email LIKE CONCAT('%', #{email}, '%')");
            }
        }}.toString();
    }
    
    public String updateSelective(Long id, String username, String email) {
        return new SQL() {{
            UPDATE("users");
            if (username != null && !username.trim().isEmpty()) {
                SET("username = #{username}");
            }
            if (email != null && !email.trim().isEmpty()) {
                SET("email = #{email}");
            }
            WHERE("id = #{id}");
        }}.toString();
    }
}
```

### 3.3 使用Provider注解

```java
public interface UserMapper {
    
    // 使用动态SQL查询
    @SelectProvider(type = UserSqlProvider.class, method = "selectByCondition")
    List<User> selectUsersByCondition(@Param("username") String username, 
                                     @Param("email") String email);
    
    // 使用动态SQL更新
    @UpdateProvider(type = UserSqlProvider.class, method = "updateSelective")
    int updateUserSelective(@Param("id") Long id, 
                           @Param("username") String username, 
                           @Param("email") String email);
}
```

## 4. 结果映射注解

### 4.1 @Results和@Result注解

用于定义结果集映射关系：

```java
@Results(id = "userResultMap", value = {
    @Result(property = "id", column = "id", id = true),
    @Result(property = "username", column = "username"),
    @Result(property = "email", column = "email"),
    @Result(property = "createTime", column = "create_time")
})
@Select("SELECT id, username, email, create_time FROM users")
List<User> selectUsersWithMapping();
```

### 4.2 关联映射注解

#### 一对多关联映射

```java
@Select("SELECT * FROM users")
@Results({
    @Result(property = "id", column = "id", id = true),
    @Result(property = "username", column = "username"),
    @Result(property = "email", column = "email"),
    @Result(property = "createTime", column = "create_time"),
    @Result(property = "orders", column = "id", javaType = List.class,
            many = @Many(select = "com.mybatis.annotation.mapper.OrderMapper.selectOrdersByUserId",
                        fetchType = FetchType.LAZY))
})
List<User> selectUsersWithOrders();
```

#### 一对一关联映射

```java
@Select("SELECT * FROM orders")
@Results({
    @Result(property = "id", column = "id", id = true),
    @Result(property = "orderNo", column = "order_no"),
    @Result(property = "user", column = "user_id", javaType = User.class,
            one = @One(select = "com.mybatis.annotation.mapper.UserMapper.selectUserById",
                      fetchType = FetchType.LAZY))
})
List<Order> selectOrdersWithUser();
```

## 5. 高级注解特性

### 5.1 批量操作

```java
// 批量插入
@Insert({
    "<script>",
    "INSERT INTO users(username, email, create_time) VALUES",
    "<foreach collection='users' item='user' separator=','>",
    "(#{user.username}, #{user.email}, #{user.createTime})",
    "</foreach>",
    "</script>"
})
int insertUsers(@Param("users") List<User> users);
```

### 5.2 复杂查询条件

```java
// 多条件查询
@Select("SELECT * FROM orders WHERE amount > #{minAmount} AND status = #{status}")
List<Order> selectOrdersByAmountAndStatus(@Param("minAmount") BigDecimal minAmount, 
                                        @Param("status") String status);
```

## 6. 注解与XML的对比

#### 注解开发

- **优点：**
- 配置简单，开发快速
- 类型安全，编译时检查
- 代码集中，便于查看
- **缺点：**
- 复杂SQL难以维护
- 动态SQL支持有限
- SQL与Java代码耦合

#### XML配置

- **优点：**
- 支持复杂的动态SQL
- SQL与Java代码分离
- 更好的可读性和维护性
- **缺点：**
- 配置文件较多
- 开发效率相对较低
- 运行时才能发现错误

## 7. 最佳实践

### 7.1 选择原则

- **简单CRUD：**优先使用注解
- **复杂查询：**使用XML配置
- **动态SQL：**根据复杂度选择Provider或XML
- **团队偏好：**保持项目内一致性

### 7.2 注解开发建议

- 合理使用@Param注解明确参数名称
- 复杂SQL考虑使用Provider类
- 注意SQL注入安全问题
- 适当使用@Results复用结果映射
- 关联查询时注意懒加载配置

### 7.3 性能优化

- 合理使用延迟加载避免N+1问题
- 批量操作提高数据处理效率
- 适当使用缓存减少数据库访问
- 优化SQL语句和索引

## 8. 常见问题与解决方案

### 8.1 参数传递问题

**问题：**多参数传递时参数名不明确
**解决：**使用@Param注解明确指定参数名称

### 8.2 结果映射问题

**问题：**数据库字段名与Java属性名不匹配
**解决：**使用@Result注解或开启驼峰命名转换

### 8.3 动态SQL复杂度

**问题：**注解中的动态SQL过于复杂
**解决：**使用Provider类或考虑XML配置

## 9. 实践练习

### 练习任务

1. 创建用户和订单的注解Mapper接口
2. 实现基本的CRUD操作
3. 使用Provider实现动态查询
4. 配置一对多关联映射
5. 实现批量插入功能
6. 编写测试用例验证功能

## 10. 运行示例程序

### 运行步骤

1. 确保MySQL数据库服务正在运行
2. 执行`src/main/resources/init.sql`脚本创建数据库和表
3. 修改`db.properties`中的数据库连接信息
4. 运行`AnnotationDemo`主程序查看注解开发演示
5. 运行`AnnotationTest`测试类验证各项功能
6. 观察控制台输出，理解注解开发的执行过程

**学习重点：**

- 掌握基本CRUD注解的使用方法
- 理解动态SQL的注解实现方式
- 学会配置结果映射和关联查询
- 了解注解与XML配置的适用场景
- 掌握注解开发的最佳实践

[返回目录](https://gaga.plus/app/mybatis/index.html)

## 📖 本章小结

本章我们学习了 注解开发 的相关内容，包括：

- 核心概念和基本原理
- 配置方法和实践技巧
- 应用场景和最佳实践
- 常见问题和解决方案



## 第四部分：框架集成

## 第13章 Spring集成

## 1. Spring集成概述

### 1.1 集成的优势

MyBatis与Spring集成带来以下优势：

- **依赖注入：**自动管理Mapper接口和服务层依赖
- **事务管理：**声明式事务支持，简化事务处理
- **配置管理：**统一的配置管理和环境切换
- **测试支持：**完善的测试框架和模拟支持
- **AOP支持：**面向切面编程，增强功能

### 1.2 集成方式

Spring与MyBatis有多种集成方式：

- **XML配置：**传统的XML配置方式
- **Java配置：**基于@Configuration的配置
- **混合配置：**XML和Java配置结合
- **Spring Boot：**自动配置和起步依赖

## 2. 依赖配置

### 2.1 Maven依赖

```xml
<dependencies>
    <!-- Spring Core -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.21</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.3.21</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-tx</artifactId>
        <version>5.3.21</version>
    </dependency>
    
    <!-- MyBatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.13</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.1.0</version>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.18</version>
    </dependency>
</dependencies>
```

## 3. XML配置方式

### 3.1 Spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/tx
           http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!-- 启用注解扫描 -->
    <context:component-scan base-package="com.mybatis.spring"/>
    
    <!-- 加载属性文件 -->
    <context:property-placeholder location="classpath:db.properties"/>
    
    <!-- 配置数据源 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    
    <!-- 配置SqlSessionFactory -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <property name="mapperLocations" value="classpath:mapper/*.xml"/>
    </bean>
    
    <!-- 配置Mapper扫描 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.mybatis.spring.mapper"/>
    </bean>
    
    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    
    <!-- 启用事务注解 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>
    
</beans>
```

### 3.2 MyBatis配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    
    <settings>
        <setting name="logImpl" value="LOG4J"/>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <setting name="cacheEnabled" value="true"/>
        <setting name="lazyLoadingEnabled" value="true"/>
        <setting name="aggressiveLazyLoading" value="false"/>
    </settings>
    
    <typeAliases>
        <package name="com.mybatis.spring.entity"/>
    </typeAliases>
    
</configuration>
```

## 4. Java配置方式

### 4.1 配置类

```java
@Configuration
@PropertySource("classpath:db.properties")
@EnableTransactionManagement
public class DatabaseConfig {
    
    @Value("${jdbc.driver}")
    private String driverClassName;
    
    @Value("${jdbc.url}")
    private String url;
    
    @Value("${jdbc.username}")
    private String username;
    
    @Value("${jdbc.password}")
    private String password;
    
    /**
     * 配置数据源
     */
    @Bean
    public DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        
        // 连接池配置
        dataSource.setInitialSize(5);
        dataSource.setMinIdle(5);
        dataSource.setMaxActive(20);
        dataSource.setMaxWait(60000);
        
        return dataSource;
    }
    
    /**
     * 配置SqlSessionFactory
     */
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        
        // 设置MyBatis配置文件位置
        factoryBean.setConfigLocation(
            new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml"));
        
        // 设置Mapper XML文件位置
        factoryBean.setMapperLocations(
            new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*.xml"));
        
        return factoryBean.getObject();
    }
    
    /**
     * 配置Mapper扫描
     */
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer configurer = new MapperScannerConfigurer();
        configurer.setBasePackage("com.mybatis.spring.mapper");
        return configurer;
    }
    
    /**
     * 配置事务管理器
     */
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

## 5. 依赖注入

### 5.1 Mapper接口注入

```java
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Override
    public Long createUser(User user) {
        userMapper.insertUser(user);
        return user.getId();
    }
    
    @Override
    public User getUserById(Long id) {
        return userMapper.selectUserById(id);
    }
    
    @Override
    public List<User> getAllUsers() {
        return userMapper.selectAllUsers();
    }
}
```

### 5.2 服务层注入

```java
public class SpringIntegrationDemo {
    public static void main(String[] args) {
        // 加载Spring配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        
        // 获取UserService Bean
        UserService userService = context.getBean(UserService.class);
        
        // 使用服务
        User user = new User("spring_user", "spring@example.com");
        Long userId = userService.createUser(user);
        System.out.println("创建用户成功，ID: " + userId);
    }
}
```

## 6. 事务管理

### 6.1 声明式事务

```java
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    /**
     * 带事务的创建用户方法
     */
    @Transactional(rollbackFor = Exception.class)
    public Long createUserWithTransaction(String username, String email, boolean shouldFail) throws Exception {
        User user = new User(username, email);
        userMapper.insertUser(user);
        
        if (shouldFail) {
            throw new Exception("模拟业务异常，触发事务回滚");
        }
        
        return user.getId();
    }
    
    /**
     * 批量操作事务
     */
    @Transactional
    public int batchCreateUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User("batch_user1", "batch1@example.com"));
        users.add(new User("batch_user2", "batch2@example.com"));
        users.add(new User("batch_user3", "batch3@example.com"));
        
        return userMapper.batchInsertUsers(users);
    }
}
```

### 6.2 事务传播行为

| 传播行为      | 说明                                                         |
| :------------ | :----------------------------------------------------------- |
| REQUIRED      | 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务 |
| REQUIRES_NEW  | 创建一个新的事务，如果当前存在事务，则把当前事务挂起         |
| SUPPORTS      | 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行 |
| NOT_SUPPORTED | 以非事务方式运行，如果当前存在事务，则把当前事务挂起         |
| NEVER         | 以非事务方式运行，如果当前存在事务，则抛出异常               |
| MANDATORY     | 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常 |
| NESTED        | 如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行 |

## 7. 连接池配置

### 7.1 Druid连接池配置

```properties
# 数据库连接配置
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mybatis_spring?useSSL=false&serverTimezone=UTC&characterEncoding=utf8
jdbc.username=root
jdbc.password=123456

# 连接池配置
jdbc.initialSize=5
jdbc.minIdle=5
jdbc.maxActive=20
jdbc.maxWait=60000
jdbc.timeBetweenEvictionRunsMillis=60000
jdbc.minEvictableIdleTimeMillis=300000
jdbc.validationQuery=SELECT 1 FROM DUAL
jdbc.testWhileIdle=true
jdbc.testOnBorrow=false
jdbc.testOnReturn=false
```

### 7.2 连接池监控

```java
@Bean
public DataSource dataSource() {
    DruidDataSource dataSource = new DruidDataSource();
    
    // 基本配置
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUrl(url);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    
    // 连接池配置
    dataSource.setInitialSize(5);
    dataSource.setMinIdle(5);
    dataSource.setMaxActive(20);
    dataSource.setMaxWait(60000);
    
    // 监控配置
    dataSource.setTimeBetweenEvictionRunsMillis(60000);
    dataSource.setMinEvictableIdleTimeMillis(300000);
    dataSource.setValidationQuery("SELECT 1 FROM DUAL");
    dataSource.setTestWhileIdle(true);
    dataSource.setTestOnBorrow(false);
    dataSource.setTestOnReturn(false);
    
    // 开启监控统计
    try {
        dataSource.setFilters("stat,wall");
    } catch (SQLException e) {
        e.printStackTrace();
    }
    
    return dataSource;
}
```

## 8. 测试支持

### 8.1 Spring测试配置

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
@Transactional
public class SpringIntegrationTest {
    
    @Autowired
    private UserService userService;
    
    @Test
    public void testCreateAndQueryUser() {
        // 创建用户
        User user = new User("test_user", "test@example.com");
        Long userId = userService.createUser(user);
        System.out.println("创建用户ID: " + userId);
        
        // 查询用户
        User foundUser = userService.getUserById(userId);
        System.out.println("查询到的用户: " + foundUser);
        
        // 验证
        assert foundUser != null;
        assert "test_user".equals(foundUser.getUsername());
        assert "test@example.com".equals(foundUser.getEmail());
    }
    
    @Test
    public void testTransactionRollback() {
        try {
            userService.createUserWithTransaction("rollback_user", "rollback@example.com", true);
        } catch (Exception e) {
            System.out.println("事务回滚测试: " + e.getMessage());
        }
        
        // 验证用户没有被创建
        User user = userService.getUserByUsername("rollback_user");
        assert user == null;
        System.out.println("事务回滚验证成功");
    }
}
```

## 9. 性能优化

### 9.1 连接池优化

- **合理设置连接池大小：**根据并发量调整initialSize、minIdle、maxActive
- **连接验证：**配置validationQuery和testWhileIdle
- **连接回收：**设置合理的timeBetweenEvictionRunsMillis
- **监控统计：**开启Druid监控，分析SQL性能

### 9.2 事务优化

- **事务范围：**尽量缩小事务范围，避免长事务
- **只读事务：**对于查询操作使用readOnly=true
- **传播行为：**合理选择事务传播行为
- **异常处理：**明确指定rollbackFor异常类型

## 10. 常见问题与解决方案

### 10.1 Mapper注入失败

**问题：**@Autowired注入Mapper接口时报错
**解决：**

- 检查MapperScannerConfigurer的basePackage配置
- 确保Mapper接口在正确的包路径下
- 验证SqlSessionFactory配置是否正确

### 10.2 事务不生效

**问题：**@Transactional注解不生效
**解决：**

- 确保启用了@EnableTransactionManagement或<tx:annotation-driven>
- 检查方法是否为public
- 避免在同一个类中调用@Transactional方法
- 确保异常类型在rollbackFor范围内

### 10.3 连接池配置问题

**问题：**数据库连接超时或连接泄漏
**解决：**

- 合理配置maxWait和连接池大小
- 开启连接泄漏检测
- 配置连接验证和回收机制
- 监控连接池状态

## 11. 最佳实践

### 11.1 配置管理

- **环境分离：**使用Profile管理不同环境配置
- **外部化配置：**将数据库连接等配置外部化
- **配置加密：**对敏感信息进行加密处理
- **配置验证：**启动时验证关键配置项

### 11.2 代码组织

- **分层架构：**明确Controller、Service、Mapper职责
- **接口设计：**面向接口编程，便于测试和扩展
- **异常处理：**统一异常处理机制
- **日志记录：**合理配置日志级别和输出

## 12. 实践练习

**练习任务：**

1. 配置MyBatis与Spring的XML集成
2. 实现用户管理的CRUD操作
3. 配置声明式事务管理
4. 编写单元测试验证功能
5. 配置Druid连接池监控
6. 实现Java配置方式的集成
7. 测试事务回滚机制
8. 优化连接池和事务配置

## 13. 运行示例程序

**运行步骤：**

1. 创建数据库：执行init.sql脚本
2. 配置数据库：修改db.properties文件
3. 编译项目：mvn clean compile
4. 运行主程序：java SpringIntegrationDemo
5. 运行测试：mvn test
6. 查看监控：访问Druid监控页面

**注意事项：**

- 确保MySQL服务已启动
- 检查数据库连接配置
- 注意Spring和MyBatis版本兼容性
- 观察事务和连接池的行为

## 📖 本章小结

本章我们学习了 Spring集成 的相关内容，包括：

- 核心概念和基本原理
- 配置方法和实践技巧
- 应用场景和最佳实践
- 常见问题和解决方案



## 第14章 Spring Boot集成

## 1. Spring Boot集成概述

### 1.1 集成优势

#### 🚀 自动配置

Spring Boot提供MyBatis自动配置，减少手动配置工作

#### 📦 起步依赖

通过starter依赖快速集成MyBatis相关组件

#### ⚙️ 外部化配置

使用application.yml统一管理配置信息

#### 🔧 开箱即用

最小化配置即可快速启动应用

### 1.2 核心特性

- **自动配置：**自动配置SqlSessionFactory、DataSource等
- **起步依赖：**mybatis-spring-boot-starter简化依赖管理
- **配置属性：**通过application.yml配置MyBatis属性
- **监控管理：**集成Actuator提供应用监控

## 2. Maven依赖配置

### 2.1 核心依赖

<dependencies> <!-- Spring Boot Starter --> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-web</artifactId> </dependency> <!-- MyBatis Spring Boot Starter --> <dependency> <groupId>org.mybatis.spring.boot</groupId> <artifactId>mybatis-spring-boot-starter</artifactId> <version>2.3.1</version> </dependency> <!-- 数据库驱动 --> <dependency> <groupId>mysql</groupId> <artifactId>mysql-connector-java</artifactId> <scope>runtime</scope> </dependency> <!-- Druid连接池 --> <dependency> <groupId>com.alibaba</groupId> <artifactId>druid-spring-boot-starter</artifactId> <version>1.2.18</version> </dependency> </dependencies>

### 2.2 可选依赖

<!-- 分页插件 --> <dependency> <groupId>com.github.pagehelper</groupId> <artifactId>pagehelper-spring-boot-starter</artifactId> <version>1.4.6</version> </dependency> <!-- 监控管理 --> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-actuator</artifactId> </dependency>

## 3. 应用配置

### 3.1 启动类配置

@SpringBootApplication @MapperScan("com.mybatis.springboot.mapper") @EnableTransactionManagement public class SpringBootMybatisApplication { public static void main(String[] args) { SpringApplication.run(SpringBootMybatisApplication.class, args); } }

### 3.2 application.yml配置

\# 服务器配置 server: port: 8080 servlet: context-path: /mybatis-demo # Spring配置 spring: # 数据源配置 datasource: driver-class-name: com.mysql.cj.jdbc.Driver url: jdbc:mysql://localhost:3306/mybatis_springboot username: root password: 123456 # Druid连接池配置 type: com.alibaba.druid.pool.DruidDataSource druid: initial-size: 5 min-idle: 5 max-active: 20 max-wait: 60000 # MyBatis配置 mybatis: config-location: classpath:mybatis-config.xml mapper-locations: classpath:mapper/*.xml type-aliases-package: com.mybatis.springboot.entity configuration: map-underscore-to-camel-case: true cache-enabled: true lazy-loading-enabled: true

## 4. 注解开发

### 4.1 Mapper接口

@Mapper public interface UserMapper { @Select("SELECT * FROM users WHERE id = #{id}") User selectUserById(Long id); @Insert("INSERT INTO users (username, email, age) VALUES (#{username}, #{email}, #{age})") @Options(useGeneratedKeys = true, keyProperty = "id") int insertUser(User user); @Update("UPDATE users SET username = #{username}, email = #{email} WHERE id = #{id}") int updateUser(User user); @Delete("DELETE FROM users WHERE id = #{id}") int deleteUser(Long id); // 分页查询 @Select("SELECT * FROM users LIMIT #{offset}, #{limit}") List<User> selectUsersByPage(@Param("offset") int offset, @Param("limit") int limit); }

### 4.2 动态SQL注解

@Select({ "<script>", "SELECT COUNT(*) FROM users", "<where>", "<if test='username != null and username != \"\"'>", "AND username LIKE CONCAT('%', #{username}, '%')", "</if>", "<if test='email != null and email != \"\"'>", "AND email LIKE CONCAT('%', #{email}, '%')", "</if>", "</where>", "</script>" }) int countUsersByCondition(@Param("username") String username, @Param("email") String email);

## 5. 服务层开发

### 5.1 服务接口

public interface UserService { Long createUser(User user); User getUserById(Long id); List<User> getAllUsers(); void updateUser(User user); void deleteUser(Long id); List<User> getUsersByPage(int page, int size); Long createUserWithTransaction(String username, String email, Integer age, boolean shouldFail) throws Exception; }

### 5.2 服务实现

@Service public class UserServiceImpl implements UserService { @Autowired private UserMapper userMapper; @Override public Long createUser(User user) { userMapper.insertUser(user); return user.getId(); } @Override @Transactional(rollbackFor = Exception.class) public Long createUserWithTransaction(String username, String email, Integer age, boolean shouldFail) throws Exception { User user = new User(username, email, age); userMapper.insertUser(user); if (shouldFail) { throw new Exception("模拟业务异常，触发事务回滚"); } return user.getId(); } }

## 6. REST API开发

### 6.1 控制器实现

@RestController @RequestMapping("/api/users") public class UserController { @Autowired private UserService userService; @PostMapping public ResponseEntity<Long> createUser(@RequestBody User user) { Long userId = userService.createUser(user); return ResponseEntity.ok(userId); } @GetMapping("/{id}") public ResponseEntity<User> getUserById(@PathVariable Long id) { User user = userService.getUserById(id); return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build(); } @GetMapping public ResponseEntity<List<User>> getAllUsers() { List<User> users = userService.getAllUsers(); return ResponseEntity.ok(users); } @GetMapping("/page") public ResponseEntity<List<User>> getUsersByPage( @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) { List<User> users = userService.getUsersByPage(page, size); return ResponseEntity.ok(users); } }

### 6.2 API接口列表

| HTTP方法 | URL路径         | 功能描述       | 请求参数                   |
| :------- | :-------------- | :------------- | :------------------------- |
| GET      | /api/users      | 获取所有用户   | 无                         |
| GET      | /api/users/{id} | 根据ID获取用户 | id: 用户ID                 |
| POST     | /api/users      | 创建用户       | User对象(JSON)             |
| PUT      | /api/users/{id} | 更新用户       | id: 用户ID, User对象(JSON) |
| DELETE   | /api/users/{id} | 删除用户       | id: 用户ID                 |
| GET      | /api/users/page | 分页查询用户   | page: 页码, size: 页大小   |

## 7. 事务管理

### 7.1 声明式事务

@Transactional(rollbackFor = Exception.class) public Long createUserWithTransaction(String username, String email, Integer age, boolean shouldFail) throws Exception { User user = new User(username, email, age); userMapper.insertUser(user); if (shouldFail) { throw new Exception("模拟业务异常，触发事务回滚"); } return user.getId(); }

### 7.2 事务传播行为

- **REQUIRED：**默认传播行为，如果当前存在事务，则加入该事务
- **REQUIRES_NEW：**创建一个新的事务，如果当前存在事务，则把当前事务挂起
- **SUPPORTS：**如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行
- **NOT_SUPPORTED：**以非事务方式运行，如果当前存在事务，则把当前事务挂起

## 8. 监控管理

### 8.1 Druid监控

\# Druid监控配置 spring: datasource: druid: # 监控配置 web-stat-filter: enabled: true url-pattern: /* exclusions: "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*" stat-view-servlet: enabled: true url-pattern: /druid/* reset-enable: false login-username: admin login-password: admin

### 8.2 Spring Boot Actuator

\# 管理端点配置 management: endpoints: web: exposure: include: health,info,metrics,env endpoint: health: show-details: always

## 9. 测试开发

### 9.1 单元测试

@SpringBootTest @Transactional @Rollback class SpringBootMybatisApplicationTests { @Autowired private UserService userService; @Test void testCreateAndQueryUser() { User user = new User(); user.setUsername("test_user"); user.setEmail("test@example.com"); user.setAge(25); Long userId = userService.createUser(user); assertNotNull(userId); User foundUser = userService.getUserById(userId); assertNotNull(foundUser); assertEquals("test_user", foundUser.getUsername()); } }

### 9.2 集成测试

@Test void testTransactionRollback() { try { userService.createUserWithTransaction("rollback_user", "rollback@example.com", 25, true); fail("应该抛出异常"); } catch (Exception e) { System.out.println("事务回滚测试: " + e.getMessage()); } // 验证用户没有被创建 User user = userService.getUserByUsername("rollback_user"); assertNull(user); }

## 10. 性能优化

### 10.1 连接池优化

#### 🔧 连接池配置

- 合理设置初始连接数
- 配置最大连接数
- 设置连接超时时间
- 启用连接验证

#### 📊 监控指标

- 活跃连接数
- 连接池使用率
- SQL执行时间
- 慢查询统计

### 10.2 缓存配置

\# MyBatis缓存配置 mybatis: configuration: cache-enabled: true lazy-loading-enabled: true aggressive-lazy-loading: false

## 11. 最佳实践

### 11.1 项目结构

- **分层架构：**Controller → Service → Mapper → Entity
- **包命名：**按功能模块组织包结构
- **配置管理：**使用profile管理多环境配置
- **异常处理：**统一异常处理和错误响应

### 11.2 开发建议

#### 📝 代码规范

- 遵循RESTful API设计原则
- 使用合适的HTTP状态码
- 统一响应格式
- 添加适当的注释和文档

#### 🔒 安全考虑

- 参数验证和SQL注入防护
- 敏感信息加密存储
- 接口权限控制
- 日志脱敏处理

## 12. 常见问题与解决方案

### 12.1 配置问题

**问题：**Mapper接口无法注入
**解决：**检查@MapperScan注解配置，确保包路径正确

**问题：**数据源配置失败
**解决：**检查数据库连接信息，确保驱动类路径正确

### 12.2 运行时问题

**问题：**事务不生效
**解决：**确保@EnableTransactionManagement注解存在，方法为public

**问题：**SQL执行异常
**解决：**开启SQL日志，检查生成的SQL语句是否正确

## 13. 实践练习

### 练习任务：

1. 创建一个完整的用户管理REST API
2. 实现用户的CRUD操作
3. 添加分页查询功能
4. 实现条件查询和统计功能
5. 添加事务管理和异常处理
6. 配置Druid监控和Actuator端点
7. 编写单元测试和集成测试
8. 优化性能和添加缓存

## 14. 运行示例

### 运行步骤：

1. 创建数据库：`CREATE DATABASE mybatis_springboot`
2. 执行初始化脚本：`mysql -u root -p mybatis_springboot < init.sql`
3. 修改数据库连接配置：编辑`application.yml`
4. 启动应用：`mvn spring-boot:run`
5. 测试API：访问 `http://localhost:8080/mybatis-demo/api/users`
6. 查看监控：访问 `http://localhost:8080/mybatis-demo/druid/`
7. 运行测试：`mvn test`

**💡 提示：**Spring Boot与MyBatis的集成大大简化了配置工作，通过自动配置和起步依赖，可以快速构建现代化的数据访问应用。重点掌握配置管理、注解开发、事务管理和REST API设计等核心技能。

## 💡 本章小结

本章我们深入学习了Spring Boot与MyBatis的整合开发。通过Spring Boot的自动配置特性，我们可以快速搭建MyBatis项目，大大简化了配置工作。同时学习了多数据源配置、事务管理等高级特性。

**下一章预告**：我们将学习MyBatis-Plus框架，它在MyBatis基础上提供了更多便捷的功能，如代码生成器、条件构造器等，进一步提升开发效率。



## 第15章 MyBatis Plus

## 1. MyBatis Plus概述

### 1.1 什么是MyBatis Plus

MyBatis Plus（简称MP）是一个MyBatis的增强工具，在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生。

### 1.2 核心特性

#### 🚀 无侵入

只做增强不做改变，引入它不会对现有工程产生影响

#### 💪 损耗小

启动即会自动注入基本CRUD，性能基本无损耗

#### 🔧 强大的CRUD操作

内置通用Mapper、通用Service，仅仅通过少量配置即可实现单表大部分CRUD操作

#### 🎯 支持Lambda形式调用

通过Lambda表达式，方便的编写各类查询条件，无需再担心字段写错

#### 📄 支持主键自动生成

支持多达4种主键策略，可自由配置，完美解决主键问题

#### 📊 支持分页插件

基于MyBatis物理分页，开发者无需关心具体操作

## 2. 快速入门

### 2.1 依赖配置

<dependency> <groupId>com.baomidou</groupId> <artifactId>mybatis-plus-boot-starter</artifactId> <version>3.5.3.1</version> </dependency>

### 2.2 配置数据源

\# application.yml spring: datasource: driver-class-name: com.mysql.cj.jdbc.Driver url: jdbc:mysql://localhost:3306/mybatis_plus?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8 username: root password: 123456 mybatis-plus: configuration: map-underscore-to-camel-case: true log-impl: org.apache.ibatis.logging.stdout.StdOutImpl global-config: db-config: id-type: auto table-prefix: mp_

### 2.3 创建实体类

@Data @TableName("mp_users") public class User { @TableId(type = IdType.AUTO) private Long id; private String name; private Integer age; private String email; @TableField(fill = FieldFill.INSERT) private LocalDateTime createTime; @TableField(fill = FieldFill.INSERT_UPDATE) private LocalDateTime updateTime; }

### 2.4 创建Mapper接口

@Mapper public interface UserMapper extends BaseMapper<User> { // 继承BaseMapper后，无需编写任何代码即可获得CRUD功能 }

## 3. 基本CRUD操作

### 3.1 插入操作

// 插入一条记录 User user = new User(); user.setName("张三"); user.setAge(25); user.setEmail("zhangsan@example.com"); int result = userMapper.insert(user); System.out.println("插入结果: " + result); System.out.println("主键ID: " + user.getId());

### 3.2 删除操作

// 根据ID删除 int result = userMapper.deleteById(1L); // 根据条件删除 Map<String, Object> map = new HashMap<>(); map.put("name", "张三"); map.put("age", 25); int result = userMapper.deleteByMap(map); // 批量删除 List<Long> ids = Arrays.asList(1L, 2L, 3L); int result = userMapper.deleteBatchIds(ids);

### 3.3 更新操作

// 根据ID更新 User user = new User(); user.setId(1L); user.setName("李四"); user.setAge(26); int result = userMapper.updateById(user);

### 3.4 查询操作

// 根据ID查询 User user = userMapper.selectById(1L); // 查询所有 List<User> users = userMapper.selectList(null); // 根据条件查询 Map<String, Object> map = new HashMap<>(); map.put("name", "张三"); List<User> users = userMapper.selectByMap(map); // 批量查询 List<Long> ids = Arrays.asList(1L, 2L, 3L); List<User> users = userMapper.selectBatchIds(ids); // 查询总数 Integer count = userMapper.selectCount(null);

## 4. 条件构造器

### 4.1 QueryWrapper

QueryWrapper<User> queryWrapper = new QueryWrapper<>(); queryWrapper.eq("name", "张三") // name = '张三' .ne("age", 25) // age != 25 .gt("age", 18) // age > 18 .ge("age", 18) // age >= 18 .lt("age", 60) // age < 60 .le("age", 60) // age <= 60 .between("age", 18, 60) // age BETWEEN 18 AND 60 .notBetween("age", 18, 25) // age NOT BETWEEN 18 AND 25 .like("name", "张") // name LIKE '%张%' .notLike("name", "王") // name NOT LIKE '%王%' .likeLeft("name", "三") // name LIKE '%三' .likeRight("name", "张") // name LIKE '张%' .isNull("email") // email IS NULL .isNotNull("email") // email IS NOT NULL .in("age", 18, 25, 30) // age IN (18, 25, 30) .notIn("age", 40, 50) // age NOT IN (40, 50) .orderByAsc("age") // ORDER BY age ASC .orderByDesc("create_time"); // ORDER BY create_time DESC List<User> users = userMapper.selectList(queryWrapper);

### 4.2 LambdaQueryWrapper

// Lambda表达式（类型安全，避免字段名写错） LambdaQueryWrapper<User> lambdaQuery = new LambdaQueryWrapper<>(); lambdaQuery.eq(User::getName, "张三") .ge(User::getAge, 18) .le(User::getAge, 60) .isNotNull(User::getEmail) .orderByDesc(User::getCreateTime); List<User> users = userMapper.selectList(lambdaQuery);

### 4.3 UpdateWrapper

// 更新条件构造器 UpdateWrapper<User> updateWrapper = new UpdateWrapper<>(); updateWrapper.eq("name", "张三") .set("age", 26) .set("email", "zhangsan_new@example.com"); int result = userMapper.update(null, updateWrapper); // Lambda更新 LambdaUpdateWrapper<User> lambdaUpdate = new LambdaUpdateWrapper<>(); lambdaUpdate.eq(User::getName, "张三") .set(User::getAge, 26) .set(User::getEmail, "zhangsan_new@example.com"); int result = userMapper.update(null, lambdaUpdate);

### 4.4 复杂条件组合

// 复杂条件：(age > 18 AND age < 60) OR (name LIKE '%管理员%') QueryWrapper<User> queryWrapper = new QueryWrapper<>(); queryWrapper.and(wrapper -> wrapper.gt("age", 18).lt("age", 60)) .or(wrapper -> wrapper.like("name", "管理员")); // 嵌套查询 queryWrapper.exists("SELECT 1 FROM orders WHERE orders.user_id = mp_users.id"); // 动态条件 String name = "张三"; Integer minAge = 18; Integer maxAge = 60; queryWrapper.eq(StringUtils.isNotBlank(name), "name", name) .ge(minAge != null, "age", minAge) .le(maxAge != null, "age", maxAge);

## 5. 分页插件

### 5.1 配置分页插件

@Configuration public class MybatisPlusConfig { @Bean public MybatisPlusInterceptor mybatisPlusInterceptor() { MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor(); // 添加分页插件 interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL)); return interceptor; } }

### 5.2 分页查询

// 创建分页对象：第1页，每页10条 Page<User> page = new Page<>(1, 10); // 构造查询条件 QueryWrapper<User> queryWrapper = new QueryWrapper<>(); queryWrapper.ge("age", 18) .orderByDesc("create_time"); // 执行分页查询 Page<User> userPage = userMapper.selectPage(page, queryWrapper); // 获取分页信息 System.out.println("当前页: " + userPage.getCurrent()); System.out.println("每页大小: " + userPage.getSize()); System.out.println("总记录数: " + userPage.getTotal()); System.out.println("总页数: " + userPage.getPages()); System.out.println("是否有上一页: " + userPage.hasPrevious()); System.out.println("是否有下一页: " + userPage.hasNext()); System.out.println("当前页数据: " + userPage.getRecords());

### 5.3 自定义分页查询

// Mapper接口中定义 @Select("SELECT * FROM mp_users WHERE age BETWEEN #{minAge} AND #{maxAge}") Page<User> selectUsersByAgeRange(Page<User> page, @Param("minAge") Integer minAge, @Param("maxAge") Integer maxAge); // 使用 Page<User> page = new Page<>(1, 10); Page<User> result = userMapper.selectUsersByAgeRange(page, 18, 60);

## 6. 乐观锁

### 6.1 配置乐观锁插件

@Configuration public class MybatisPlusConfig { @Bean public MybatisPlusInterceptor mybatisPlusInterceptor() { MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor(); // 添加乐观锁插件 interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor()); return interceptor; } }

### 6.2 实体类配置

@Data public class User { private Long id; private String name; private Integer age; @Version // 乐观锁版本号字段 private Integer version; }

### 6.3 乐观锁使用

// 查询用户 User user = userMapper.selectById(1L); System.out.println("原始版本号: " + user.getVersion()); // 修改用户信息 user.setAge(user.getAge() + 1); // 更新时会自动检查版本号 int result = userMapper.updateById(user); if (result == 1) { System.out.println("更新成功，新版本号: " + user.getVersion()); } else { System.out.println("更新失败，可能存在并发冲突"); }

### 6.4 并发冲突演示

// 模拟并发更新 User user1 = userMapper.selectById(1L); User user2 = userMapper.selectById(1L); // 用户1先更新 user1.setAge(26); int result1 = userMapper.updateById(user1); // 成功，version变为2 // 用户2后更新（此时version仍为1） user2.setAge(27); int result2 = userMapper.updateById(user2); // 失败，返回0 System.out.println("用户1更新结果: " + result1); // 1 System.out.println("用户2更新结果: " + result2); // 0

## 7. 逻辑删除

### 7.1 全局配置

\# application.yml mybatis-plus: global-config: db-config: logic-delete-field: deleted # 全局逻辑删除字段名 logic-delete-value: 1 # 逻辑已删除值 logic-not-delete-value: 0 # 逻辑未删除值

### 7.2 实体类配置

@Data public class User { private Long id; private String name; private Integer age; @TableLogic // 逻辑删除字段 private Integer deleted; }

### 7.3 逻辑删除使用

// 删除操作（实际执行UPDATE语句） int result = userMapper.deleteById(1L); // 实际执行：UPDATE mp_users SET deleted=1 WHERE id=1 AND deleted=0 // 查询操作（自动过滤已删除数据） List<User> users = userMapper.selectList(null); // 实际执行：SELECT * FROM mp_users WHERE deleted=0 // 如需查询包含已删除的数据，需要自定义SQL @Select("SELECT * FROM mp_users") List<User> selectAllIncludeDeleted();

## 8. 自动填充

### 8.1 实体类配置

@Data public class User { private Long id; private String name; private Integer age; @TableField(value = "create_time", fill = FieldFill.INSERT) private LocalDateTime createTime; @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE) private LocalDateTime updateTime; }

### 8.2 配置填充处理器

@Component public class MyMetaObjectHandler implements MetaObjectHandler { @Override public void insertFill(MetaObject metaObject) { // 插入时自动填充 this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now()); this.strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now()); } @Override public void updateFill(MetaObject metaObject) { // 更新时自动填充 this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now()); } }

## 9. 服务层封装

### 9.1 IService接口

public interface UserService extends IService<User> { // 继承IService后获得大量便捷方法 // 自定义业务方法 Page<User> getUsersByPage(int current, int size); List<User> getUsersByAgeRange(Integer minAge, Integer maxAge); }

### 9.2 ServiceImpl实现

@Service public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService { @Override public Page<User> getUsersByPage(int current, int size) { Page<User> page = new Page<>(current, size); QueryWrapper<User> queryWrapper = new QueryWrapper<>(); queryWrapper.orderByDesc("create_time"); return this.page(page, queryWrapper); } @Override public List<User> getUsersByAgeRange(Integer minAge, Integer maxAge) { QueryWrapper<User> queryWrapper = new QueryWrapper<>(); queryWrapper.between("age", minAge, maxAge); return this.list(queryWrapper); } }

### 9.3 IService常用方法

| 方法名                   | 功能描述     | 示例                              |
| :----------------------- | :----------- | :-------------------------------- |
| save(entity)             | 插入一条记录 | userService.save(user)            |
| saveBatch(entityList)    | 批量插入     | userService.saveBatch(users)      |
| saveOrUpdate(entity)     | 插入或更新   | userService.saveOrUpdate(user)    |
| removeById(id)           | 根据ID删除   | userService.removeById(1L)        |
| removeBatchByIds(idList) | 批量删除     | userService.removeBatchByIds(ids) |
| updateById(entity)       | 根据ID更新   | userService.updateById(user)      |
| getById(id)              | 根据ID查询   | userService.getById(1L)           |
| list()                   | 查询所有     | userService.list()                |
| page(page)               | 分页查询     | userService.page(page)            |
| count()                  | 查询总数     | userService.count()               |

## 10. 代码生成器

### 10.1 添加依赖

<dependency> <groupId>com.baomidou</groupId> <artifactId>mybatis-plus-generator</artifactId> <version>3.5.3.1</version> </dependency> <dependency> <groupId>org.freemarker</groupId> <artifactId>freemarker</artifactId> </dependency>

### 10.2 生成器配置

public class CodeGenerator { public static void main(String[] args) { // 数据源配置 DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder( "jdbc:mysql://localhost:3306/mybatis_plus", "root", "123456" ).build(); // 全局配置 GlobalConfig globalConfig = new GlobalConfig.Builder() .outputDir(System.getProperty("user.dir") + "/src/main/java") .author("MyBatis Plus") .enableSwagger() .build(); // 包配置 PackageConfig packageConfig = new PackageConfig.Builder() .parent("com.mybatis.plus") .entity("entity") .mapper("mapper") .service("service") .serviceImpl("service.impl") .controller("controller") .build(); // 策略配置 StrategyConfig strategyConfig = new StrategyConfig.Builder() .addInclude("mp_users") // 指定表名 .entityBuilder() .enableLombok() .enableTableFieldAnnotation() .logicDeleteColumnName("deleted") .versionColumnName("version") .addTableFills(new Column("create_time", FieldFill.INSERT)) .addTableFills(new Column("update_time", FieldFill.INSERT_UPDATE)) .controllerBuilder() .enableRestStyle() .build(); // 执行生成 AutoGenerator generator = new AutoGenerator(dataSourceConfig); generator.global(globalConfig) .packageInfo(packageConfig) .strategy(strategyConfig) .execute(); } }

## 11. 性能优化

### 11.1 SQL性能分析

\# 开启SQL日志 mybatis-plus: configuration: log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

### 11.2 分页优化

#### 🔍 合理使用索引

- 为常用查询字段添加索引
- 避免在索引字段上使用函数
- 合理设计复合索引

#### 📊 分页参数控制

- 限制每页最大记录数
- 避免查询过大的页码
- 使用游标分页处理大数据量

### 11.3 批量操作优化

// 批量插入优化 @Transactional public boolean batchInsert(List<User> users) { // 分批处理，避免一次性插入过多数据 int batchSize = 1000; for (int i = 0; i < users.size(); i += batchSize) { int end = Math.min(i + batchSize, users.size()); List<User> batch = users.subList(i, end); userService.saveBatch(batch); } return true; }

## 12. MyBatis vs MyBatis Plus对比

| 功能     | MyBatis                 | MyBatis Plus              |
| :------- | :---------------------- | :------------------------ |
| 基本CRUD | 需要手写SQL和Mapper方法 | 继承BaseMapper即可获得    |
| 条件查询 | 需要手写动态SQL         | 使用Wrapper构造器         |
| 分页查询 | 需要手动计算和编写      | 内置分页插件              |
| 乐观锁   | 需要手动实现            | @Version注解自动处理      |
| 逻辑删除 | 需要手动实现            | @TableLogic注解自动处理   |
| 自动填充 | 需要手动实现            | MetaObjectHandler自动处理 |
| 代码生成 | 需要第三方工具          | 内置代码生成器            |
| 学习成本 | 较高                    | 较低                      |
| 开发效率 | 一般                    | 很高                      |

## 13. 最佳实践

### 13.1 项目结构建议

- **实体类：**使用@TableName、@TableId、@TableField等注解
- **Mapper层：**继承BaseMapper，添加自定义方法
- **Service层：**继承IService和ServiceImpl
- **Controller层：**使用RESTful风格API

### 13.2 配置建议

#### 🔧 全局配置

- 统一主键策略
- 配置逻辑删除
- 设置表名前缀
- 开启驼峰命名转换

#### 📊 性能配置

- 合理配置分页插件
- 启用乐观锁插件
- 配置SQL性能分析
- 设置合理的批量大小

### 13.3 开发建议

- **优先使用Lambda表达式：**避免字段名写错
- **合理使用条件构造器：**避免复杂的动态SQL
- **注意并发控制：**合理使用乐观锁
- **规范命名：**实体类、表名、字段名保持一致

## 14. 常见问题与解决方案

### 14.1 配置问题

**问题：**实体类与表名不匹配
**解决：**使用@TableName注解指定表名，或配置全局表名前缀

**问题：**主键策略不生效
**解决：**检查@TableId注解配置，确保数据库表主键设置正确

### 14.2 查询问题

**问题：**分页查询总数不准确
**解决：**检查是否有逻辑删除字段影响，确保分页插件配置正确

**问题：**乐观锁更新失败
**解决：**检查版本号字段类型，确保实体类有@Version注解

## 15. 实践练习

### 练习任务：

1. 创建用户管理系统，使用MyBatis Plus实现CRUD操作
2. 实现复杂条件查询（年龄范围、姓名模糊查询等）
3. 添加分页查询功能
4. 实现乐观锁并发控制
5. 配置逻辑删除功能
6. 使用代码生成器生成基础代码

## 16. 运行示例

**💡 提示：**本章节的完整代码示例已经准备就绪，你可以通过上方的"查看完整代码"按钮在在线IDE中运行和测试。

### 示例功能：

- ✅ 用户信息的增删改查操作
- ✅ 复杂条件查询演示
- ✅ 分页查询功能
- ✅ 乐观锁并发控制
- ✅ 逻辑删除演示
- ✅ 自动填充功能
- ✅ 批量操作优化






# react

## web前端工程化

**前端工程化是大厂前端开发人员的必备技能**。

在了解web前端工程化之前，我给大家回顾下web前端的发展史：

以2011年左右这个时间点为界线，在此之前的web前端就是为了完成HTML网页开发（一般叫拆板侠、切图仔），日常工作就是拿到UI设计师的设计稿，然后基于HTML、CSS、javascript一张一张地完成静态化网页的制作，然后把静态网页交给服务端开发（java，php等），完成的项目基本都是前后端不分离的web项目。

在此之后的web前端随着移动智能手机的普及，各种APP，微信开发随之蜂拥而来，场景也越来越丰富复杂了，不得不把前端独立出来，也是目前主流的前后端分离开发模式。

2015年之后，前端开发更是进入了技术井喷期，使前端开发的**开发形式**产生了翻天覆地的变化。至今为止，Web前端业务日益复杂化和多元化，前端项目开发早已经不是过去的5-6个页面、复制几个jQuery插件就能完成的了。

项目复杂了就会产生许多问题，比如：当开发团队的人数达到一定的规模以后（例如，30 人以上），如何进行高效的多人协作？如何保证项目的可维护性？如何提高项目的开发质量？

**前端工程化**是前端项目架构中重要的一环，它的出现就是为了解决上述大部分问题的。

### 声明式和命令式

1. 声明式：小明，出去操场跑5圈。

2. 命令式：小明，起来，滚出去，往东50米，看到操场了，跑1圈，跑完以后再跑一圈，再跑。。直到5圈。

   

## React基础

### 是什么

React是一个用于构建UI（User Interface，用户界面）的**JavaScript库**，也是目前全世界最流行的web前端框架之一，由Facebook在2013年5月开源的前端项目，因为Facebook对市场上所有 **JavaScript MVC框架**都不满意，所以就自己写了一个前端框架用来架设**Instagram网站**。



### 官方网址

官方网站：https://zh-hans.reactjs.org/

### 特点

React官方并不认可MVC开发模式，所以React不是一个完整的MVC前端框架，只能说是**一个轻量级的视图框架（MVC中的View**）。

React具有如下特点：

- **声明式设计**。为**应用的每一个状态**设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。
- **高效**。React采用Virtual DOM(虚拟DOM), 极大的提升了UI渲染(更新)效率。
- **灵活**。React 允许你结合其他框架或库一起使用，而且有大量的开发者围绕着React去**开发各种各样的工具库**。
- **JSX**。JSX 是 React框架基于JavaScript的语法扩展。JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。
- **组件** 。通过 React 构建组件，使得**代码更加容易得到复**用，能够很好的应用在大项目的开发中。
- **单向响应的数据流**。React 采用了单向响应的数据流，使组件状态更容易维护, 组件模块化更易于快速开发。

### 虚拟DOM

![image-20221115230940215](assets/image-20221115230940215.png)



- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## 快速上手



### 渲染内容 ReactDOM.createRoot

* react: 核心包，操作react的所有必要功能

* react-dom：dom包 提供操作DOM的相关功能



方法：

```java

var msg="hello react!"
var root=ReactDom.createRoot(document.querySelector("#root"))
root.reander(msg)
```





```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- React核心包，提供了操作React的所有必要功能，但不提供DOM操作相关的部分功能   -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <!-- ReactDOM，提供了支持react操作DOM的相关功能 -->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
<body>
    <div id="root"></div>
    <script>
        var msg = 'hello，React!';
        const root = ReactDOM.createRoot(document.querySelector('#root'));
        // 渲染，把msg变量的信息渲染到绑定的根节点中
        root.render(msg);
    </script>
</body>
</html>
```

 

### 创建虚拟节点 React.createElement



```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--
    React，实际上分 React-dom 网页开发  React-native App开发
    React核心包，提供了操作React的所有必要功能，但不提供DOM操作相关的部分功能   -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <!-- ReactDOM，提供了支持react操作DOM的相关功能 -->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
<body>
    <div id="root">

    </div>

    <script>
        var msg = "hello, React"
        // 创建React的虚拟DOM节点，a元素
        const SVDOM = React.createElement("a", {href: "http://www.qq.com"}, msg)
        // 创建React的虚拟DOM节点，h1元素
        const VDOM = React.createElement("h1", {title: msg}, SVDOM)
        // React把数据展示到#root标签
        const root = ReactDOM.createRoot(document.querySelector('#root'))
        // 渲染，把msg变量的信息渲染到绑定的根节点中
        root.render(VDOM)
    </script>

</body>
</html>
```

 

---



**`React.createElement`(type, [props], [...children])**  方法用于在 React 中创建一个元素。其参数结构可以概括为三个部分，具体来说：

1. **类型 (type)**: 这是要创建的 React 元素的类型，可以是一个字符串（如 "div"、"a"、"span" 等对应 HTML 元素）或是一个组件（如一个自定义的类组件或函数组件）。
2. **属性 (props)**: 这是一个对象，包含要应用到元素上的属性。对于 `a` 标签，常见的属性包括 `href`、`target`、`rel` 等。在你的示例中，`{ href: "http://www.qq.com" }` 就是 props 对象。
3. **子元素 (children)**: 这是元素的子内容，可以是文本、其他 React 元素或者数组。可以传递一个或多个子元素。在你的示例中，`msg` 代表要作为子元素的内容，它可以是一个字符串或其他 React 元素。

结合你的示例，

`React.createElement("a", {href: "http://www.qq.com"}, msg)` 的参数如下：

- 第一个参数是 `"a"`，表示创建一个 `a` 标签。
- 第二个参数是一个对象 `{href: "http://www.qq.com"}`，表示该 `a` 标签的属性。
- 第三个参数是 `msg`，表示该 `a` 标签的内容（子元素）。

因此，整体上这个方法创建了一个带有 `href` 属性的 `a` 标签，该标签显示了 `msg` 的内容。

React.createElement 方法文档

概述

`React.createElement` 是 React 中用于创建 React 元素的核心方法。它允许开发者以编程的方式生成 React 组件，并且是 JSX 编译的基础。此方法通常在使用 JSX 语法时被隐式调用，但在一些情况下（如在没有 JSX 的环境中），可以显式调用该方法以创建元素。

方法签名

```
javascriptReact.createElement(type, [props], [...children])
```

参数

1. **type (string | function)**:
   - 要创建的元素类型。可以是 HTML 元素的名称（如 `"div"`、`"span"`、`"a"` 等）或是自定义的 React 组件（函数组件或类组件）。
2. **props (object | null)**:
   - 元素的属性对象，包含元素的各种属性和事件处理程序。可以传递常规的 HTML 属性，也可以添加自定义属性。
   - 如果没有属性，可以传递 `null`。
3. **children (string | element | array)**:
   - 元素的子内容，可以是文本、其他 React 元素或者数组。如果有多个子元素，可以按顺序传递它们。

返回值

- 返回一个 React 元素，这是一个描述 DOM 结构的对象。该对象可用于渲染到 UI 中。

示例

创建一个简单的 `<a>` 标签

```javascript
javascriptconst msg = "点击这里";
const element = React.createElement("a", { href: "http://www.qq.com" }, msg);
```

在这个示例中，创建了一个链接，包含如下属性和内容：

- 类型为 `a`（表示一个锚点链接）。
- 属性为 `href: "http://www.qq.com"`，设置链接的目标 URL。
- 子元素为 `msg`，显示的文本内容为“点击这里”。

创建一个自定义组件

```javascript
javascriptfunction MyButton(props) {
  return React.createElement("button", null, props.label);
}

const buttonElement = React.createElement(MyButton, { label: "提交" });
```

在这个示例中：

- `MyButton` 是一个自定义的组件，接收一个 `label` 属性并渲染一个按钮。
- `buttonElement` 创建了一个 `MyButton` 组件的实例，并传递了 `label` 属性。

注意事项

- 虽然 `React.createElement` 方法可以直接使用，但大多数开发者更倾向于使用 JSX，因为它更具可读性和简洁性。使用 JSX 时，类似上述的 JavaScript 代码会被编译为 `React.createElement` 方法调用。
- 由于 React 的元素是不可变的，一旦创建，其属性和子元素就不能被改变。若需变更，需创建一个新的元素。

结论

`React.createElement` 是 React 中创建元素的基础方法，理解其工作原理有助于更好地利用 React 构建用户界面。尽管在大多数情况下使用 JSX 更为方便，但在特定情况下，了解如何直接使用 `React.createElement` 也非常重要。

## JSX

JSX（JavaScript Xml）是 React框架基于**JavaScript+XML实现的语法扩展**，**类似模板语言，但具有 JavaScript 的全部功能**。

JSX提供了**在 JavaScript 代码中写 XML（HTML）代码的功能**，让项目中的用户界面代码变得更加直观、结构清晰，从而提升开发效率，所以React推荐开发者使用JSX来声明描述用户界面。



> JSX本质上就是`React.createElement(component,props,children)`**函数的语法糖**，使用babel编译后，JSX会变成虚拟DOM对象。



```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel，一个JavaScript代码转译器，可以把ES6代码转换成ES5代码的的语法转换工具，也可以把JSX代码转换成javascript代码 -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <!-- script标签声明内部的代码需要使用babel进行转译 -->
    <script type="text/babel">
        var msg = 'hello，React!';
        // JSX语法创建虚拟DOM
        var VDOM = <div id="son">
            {msg}<br/>
            <span>{msg}</span>
        </div>

        const root = ReactDOM.createRoot(document.querySelector('#root'));

        // 渲染，这次渲染的是虚拟DOM节点
        root.render(VDOM);
    </script>
</body>
</html>
```

 ```javascript
 <script type="text/babel">
 </script>
 ```



##### 语法规则

1. **所有标签必须闭合，最外层必须有且只有一个根元素。遇到与js关键字同名的属性，要特殊处理**。

```javascript
/* 错误写法：最外层是2个元素 */
var VDOM = <span>1</span><span>2</span>

/* 正确写法 */
var VDOM = <span>1</span>
var VDOM = (<span>1</span>)
var VDOM = (<><span>1</span><span>1</span></>)
var VDOM = (<div><span>1</span><span>1</span></div>)

/* 错误写法：class与for都是js中的关键字 */
<p class="myele">!!!!!</p>
<label for="ooo">1111</label>
/* 正确写法 */
<p className="myele">!!!!!</p>
<label htmlFor="ooo">1111</label>


/* 错误写法：标签没有闭合 */
<br>
<input>

/* 正确写法 */
<br/>
<input></input>
<input/>
```

2. **在单个花括号`{}`中编写js代码。当标签的属性值是js代码时，把引号换成单个花括号。**

```javascript
// 假设msg和num是一个js变量
/* 错误写法： 属性值加了引号，"msg"成了字符串。*/
<p title="msg"></p>
/* 错误写法： 内容中没有花括号，所以msg被当成了字符串。*/
<p>msg</p>

/* 正确写法 */
<p title={msg}>鼠标放上来</p>
<p>{msg}</p>
```

3. **注释需要使用js多行注释，并且外面加上花括号。**

```javascript
// 错误写法：
<div>
    // 错误的注释写法
    <p>{ msg }</p>
    /* 错误的注释写法 */
    <p>{ msg }</p>
     {// 错误的注释写法}
</div>

// 正确写法
<div>
    {/* 正确的注释写法 */}
    { msg }
</div>
```

 

##### 渲染数据

###### 渲染变量

```javascript
/* 错误写法：没有返回值的语句，不能嵌入JSX中 */
<div>{ var a = 10  }</div>

/* 错误写法：for语句或者if语句没有结果，不能嵌入JSX中 */

<ul>
for(var i = 0 ; i < 10 ; i ++){
<li>{i}</li>
}
</ul>

/* 正确写法：三元表达式可以代替if语句 */
<div>{ 1>0?10:20 }</div>

/* 正确写法：改用map遍历对象或数组 */
const user = {name: 'xiaoming', age: 16}
// JSX语法创建虚拟DOM
const VDOM = (
<ul>
    {
        Object.keys(user).map(key=>
            <li key={key}>{key}={user[key]}</li>
        )
    }
</ul>
)

                      
/* 错误写法：大部分对象无法直接嵌入JSX中 */
<div>{ new Date() }</div>

/* 错误写法：匿名函数或函数名，无法直接嵌入JSX中 */
<div>{ ()=>2 }</div>
<div>{ functionName }</div>

/* 正确写法：表达式，可以嵌入JSX */
<div>{ a+=10  }</div>
/* 正确写法：单个变量属于表达式，可以嵌入JSX */
<div>{ a }</div>
/* 正确写法：字面量输入表达式，可以嵌入JSX */
<div>{ 10  }</div>
/* 正确写法：数组，可以嵌入JSX */
<div>{ [1,2,3]  }</div>
```

 

###### **渲染列表数据**



```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        let books_list = [
            {id: 10, title: "标题1", price: 38.50},
            {id: 13, title: "标题2", price: 28.50},
            {id: 15, title: "标题3", price: 68.50},
            {id: 21, title: "标题4", price: 58.50},
        ]
        
        class HelloComponent extends React.Component {
            render(){ // 所有视图代码，必须写在render方法中通过return返回给外界。
                return (
                    <table border='1'>
                        <tr>
                            <td>编号</td>
                            <td>价格</td>
                            <td>标题</td>
                        </tr>
                        {books_list.map((item,key)=>(
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.price.toFixed(3)}</td>
                                <td>{item.title}</td>
                            </tr>
                        ))}
                    </table>
                )
            }
        }
        
        const root = ReactDOM.createRoot(document.querySelector('#root'));

        root.render(<HelloComponent/>);
        
    </script>
</body>
</html>
```

###### **key属性说明**

因为React的**高性能是依赖于虚拟DOM的**，所以React的JSX操作中都是尽量避免去操作DOM元素的。但是对于开发中的列表数据而言，因为列表元素在操作过程中会出现位置改变的情况，而React的虚拟DOM是并不知道的，此时，有可能React的虚拟DOM会把位置改变后的所有元素全部进行重新渲染，这就会大量增加DOM操作了，因此React会要求我们在遍历列表元素时给元素绑定一个唯一的key值，当列表中的元素在操作过程中出现位置改变时，React就可以通过预先设置好的key值来识别到了。

 

###### 输出连续序数

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

</head>
<body>
    <div id="root">

    </div>

    <script type="text/babel">
        // 使用map来循环数组即可
        const VDOM = <div>
            <ul>
                {Array(10).fill(null, 2).map((item, key)=>
                    <li key={key}>{key}</li>)}
            </ul>
        </div>

        // React把数据展示到#root标签
        const root = ReactDOM.createRoot(document.querySelector('#root'))
        // 渲染，把msg变量的信息渲染到绑定的根节点中
        root.render(VDOM)
    </script>

</body>
</html>
```

 

这段代码的作用是生成一个包含 10 个 `<li>` (列表项) 的数组，并在每个列表项中显示该项的索引值，其中特定的填充值为 `null`，但在 `map` 方法中被忽略。

代码解析

```javascript
javascript{Array(10).fill(null, 2).map((item, key) => 
  <li key={key}>{key}</li>
)}
```

1. `Array(10)`

- `Array(10)` 创建了一个长度为 10 的空数组。这时数组的内容是 `[ <empty>, <empty>, <empty>, <empty>, <empty>, <empty>, <empty>, <empty>, <empty>, <empty> ]`。

2. `.fill(null, 2)`

- `fill(null, 2)` 用于填充数组。它会从索引 `2` 开始填充至数组末尾，填充的值是 `null`。
- 因此，填充后的数组将变成 `[ <empty>, <empty>, null, null, null, null, null, null, null, null]`。

3. `.map((item, key) => <li key={key}>{key}</li>)`

- `map` 方法会遍历数组的每一项，并对每一项执行给定的函数。

- 在这个函数中，`item` 是当前遍历的元素（在这个例子中，它可以是 `null` 或 `empty`），`key` 是当前元素的索引。

- 每次调用 map 时，都会返回一个 <li>

  元素，其中：

  - `key={key}` 是 React 用于识别每个元素的唯一标识符，建议使用唯一值，以便 React 能更有效地更新和渲染列表。
  - `{key}` 是当前循环的索引值，也就是显示在列表项中的内容。

最终结果

最终的输出将是一个包含索引值的列表，从 `0` 到 `9`。即使在索引 `2` 及以后的元素对应的原数组项是 `null`，因为在 `map` 中遍历的是 10 个元素，所以仍然会生成 10 个 `<li>` 元素。

渲染输出示例

渲染后的结果将是：

```html
<ul>
  <li key={0}>0</li>
  <li key={1}>1</li>
  <li key={2}>2</li>
  <li key={3}>3</li>
  <li key={4}>4</li>
  <li key={5}>5</li>
  <li key={6}>6</li>
  <li key={7}>7</li>
  <li key={8}>8</li>
  <li key={9}>9</li>
</ul>
```

注意事项

- 在这个例子中，`fill` 的使用并未实际对 `map` 的输出结果产生影响，因为 `map` 是基于数组的长度进行遍历，而非元素的实际值。
- 对于空值和 `null`，`map` 会正常执行，但开发者可以根据具体需求选择是否包含或更改这些值。



##### 渲染样式

###### 行内样式

```javascript
<div style={{color: 'red',fontSize: '20px'}}></div>

var myStyle = {color: 'green',fontSize: '20px'};
<div style={myStyle}></div>
```

* 第一个是字面变量

* 第二个是变量



###### class样式



```javascript
<!-- css代码，如果是外部样式文件，必须导入使用 -->
<style>
    .danger{
      color: red;
    }
    .info{
      color: blue;
    }
    .f24{
      font-size: 24px;
    }
</style>


// jsx代码
<div>
    <p className={'danger f24'}>危险</p>
    <p className={'info f24'}>安全</p>
</div>
```

`className` 属性的**值是一个字符串，其中包含多个类名**。在 JSX 中，`className` 用于设置 HTML 元素的 CSS 类，而不是将类名视为变量

---

这段代码的翻译：

在这段代码中，`className` 属性的值是一个字符串，其中包含多个类名。在 JSX 中，`className` 用于设置 HTML 元素的 CSS 类，而不是将类名视为变量。

代码解析

```jsx
<div>
    <p className={'danger f24'}>危险</p>
    <p className={'info f24'}>安全</p>
</div>
```

1. **`className` 属性**:
   - 在 JSX 中使用 `className` 属性来代替 HTML 中的 `class` 属性，这是因为 `class` 是 JavaScript 的关键字。
   - 你在 `className` 中写入 `'danger f24'` 和 `'info f24'`，表示将这两个类分别应用于 `<p>` 元素。
2. **类名字符串**:
   - `'danger f24'` 和 `'info f24'` 是字符串，这是一种组合了多个类名的写法。
   - 这两个类名是用空格分隔的，表示这两个类都将应用于对应的元素。这里，`danger` 和 `info` 是 CSS 类名，`f24` 则表示字体大小为 24px。

是否视为变量

- 在这个上下文中，`danger` 和 `info` 并不是变量，它们是 CSS 类名的字符串。在 JSX 中，类名以字符串的形式写出。
- 如果你想使用变量来动态设置类名，可以先定义变量，然后在 `className` 中使用它。例如：

```jsx
const dangerClass = 'danger';
const infoClass = 'info';

<div>
    <p className={`${dangerClass} f24`}>危险</p>
    <p className={`${infoClass} f24`}>安全</p>
</div>
```

在上面的例子中，`dangerClass` 和 `infoClass` 是 JavaScript 中的变量，它们的值相当于 CSS 类名。使用模板字符串 (`${}`) 可以将变量引入 `className` 中。

总结

在你提供的代码中，`danger` 和 `info` 只是 CSS 类名，并不是当做变量来使用。如果需要动态类名，可以通过变量来实现。

---





样式的使用说明：



基于组件化的整体性，React官方建议我们开发中使用行内样式，但在开发中大多数公司团队都是采取了基于目录的方式来保存不同组件的代码，往往一个页面就是一个组件，而属于这个页面的css样式文件和js组件文件则会保存当前目录下。

 

##### 代码转义

在默认情况下，React DOM会将所有嵌入JSX的数据进行编码，HTML代码会进行实体转义。这样可以有效避免xss攻击。

```javascript
// 默认会进行HTML转义
let content = '<script>console.log('hello，React!')<\/script>'
var VDOM = <div>{content}</div>


// 不进行HTML转义
let content = {
    __html: '<script>console.log('hello，React!')<\/script>'
};
var VDOM = <div dangerouslySetInnerHTML={content}></div>
```

 

## 基于项目构建工具来管理项目



在上面的学习中，我们一直把代码写在一个文件中，每次使用这个文件都要反复去引入react、react-dom、babel文件。这无疑很影响我们的学习和开发效率，所以接下来我们可以基于项目构建工具来搭建一个React项目，以工程化的方式来继续学习。

####  创建项目(初始化项目的命令)



```bash
# yarn+create-react-app
yarn create react-app yarn-react-basic

# npm + create-react-app
npm init react-app npm-react-basic

# npx+create-react-app
npx create-react-app npx-react-basic

# yarn+vite
yarn create vite

# npm+vite
npm init vite
```

* yarn、npm就是**包管理器**，还可以项目进行**构建管理**。

* React官方为了方便咱们学习React推出了一个脚手架create-react-app（100M）【CRA】，而vite则是另一个前端框架vue的作者尤雨溪开发的脚手架vite。

* create-react-app搭建的React项目，默认入口是`public/index.html`，脚本文件的扩展名是`js`。

* vite搭建的React，默认入口是`index.html`，脚本文件的扩展名是`jsx`。

 

#### 启动项目

```bash
# create-react-app启动项目
yarn start  # 或者 npm start

# vite启动项目
yarn dev  # 或者 npm run dev 
```

## 组件化

### 组件化的概念



在前端开发中经常出现多个网页的功能是重复的，而且很多不同的页面之间也存在同样的功能。在React中，我们可以按功能或业务来把UI界面进行拆分一个个包含**模板(HTML)+样式(CSS)+逻辑(JS)**的功能完备的结构单元。

这些结构单元就可以设计成一个个组件方便开发人员进行代码复用，这种开发方式也就是组件化开发，前端人员在组件化开发时，只需要书写一次代码，随处引入即可使用。

### React创建组件的两种方式：



- 函数式组件

  以函数格式来创建组件，直接在函数中return返回视图代码即可。

- 类组件

  以类的方式来创建组件，组件类必须直接或间接继承于React.Component类，而且视图代码必须通过render方法return返回给外界。

> 注意：
>
> 在React17以前，函数式组件也叫无状态（state）组件，而类组件则为有状态组件。所谓有无状态，指代的是**组件内部是否能定义状态**（**state，状态就是组件内部定义和使用的私有数据**），并通过state来保存数据或修改视图的界面效果。
>
> 在React17版本开始，**函数式组件也可以通过Hooks来定义状态（state），来保存数据或修改视图了，函数式组件的应用也变得强大起来了**。

 

#### 类组件

src/App.jsx，代码：

```javascript
import React from "react";
class App extends React.Component{
    constructor() {
        super();
        this.msg = 'Hello， Class Component！！'
    }
    render() {
        return (
            <div className="App">
                {this.msg}
            </div>
        )
    }
}

export default App
```

src/main.jsx，代码：

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
// 导入组件才能使用
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

> **注意：**
>
> **不管是函数式组件还是类组件，组件名必须首字母大写！！！否则报错！**



#### 函数式组件

src/Func.jsx，代码：

```javascript
function Func(){
    let msg = 'Hello， Function Component！！'
    return (
        <div className="App">
            {msg}
        </div>
    )
}

export default Func
```

src/main.jsx，代码：

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
// 导入组件才能使用
import App from './App'
import Func from "./Func.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Func />
  </React.StrictMode>
)
```

 

pycharm/vscode快速生成snip代码的快捷键：

```bash
rcc 快速生成类组件
rsf  快速生成函数式组件
rsc  快速生成工具函数的代码片段
```

 VsCode如何快速生成组件



#### 组件的嵌套

组件可以随意组合和嵌套的。

在开发中，我们习惯把整个项目分成许多大大小小的组件，一个页面可以设计成一个组件，而一个页面组件下又可以包含多个功能组件，有些复杂的功能组件，还可以细化嵌套自己的子组件。

src/App.jsx，代码：

```javascript
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class App extends React.Component{
    constructor() {
        super();
        this.msg = 'Hello， Class Component！！'
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <h1>中间内容属于App的</h1>
                <Footer/>
            </div>
        )
    }
}

export default App

```

src/Header.jsx，代码：

```javascript
import React from "react";

class Header extends React.Component{
    render() {
        return (
            <div>
               我是Header中定义的头部内容！！
            </div>
        )
    }
}

export default Header

```

src/Footer.jsx，代码：

```javascript
import React from "react";

class Footer extends React.Component{
    render() {
        return (
            <div>
               我是Footer中定义的脚部内容！！
            </div>
        )
    }
}

export default Footer

```

src/main.jsx，代码：

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

一般我们会把被导入的小功能组件叫子组件，同理，导入其他组件的当前组件，叫父组件。属于嵌套关系的两个组件之间的关系，就是父子组件。当然，如果两个组件被同一个父组件所调用，则这两个组件则为兄弟组件，属于并列关系。



---

AI解释不懂的地方：

在 `React.Component` 中，`.`（点）语法是用于访问对象的属性或方法。在这个例子中：

- `React` 是一个对象，它是 React 库的主要命名空间。
- `Component` 是 `React` 对象的一个属性，具体来说，它是一个类，用于创建 React 组件。

**详细解析**

1. **`React` 对象**:
   - `React` 是从 React 库中导入的。
   - 该对象包含了用来构建用户界面的各类属性和方法，比如 `createElement`、`Component`、`useState`、`useEffect` 等。
2. **`Component` 属性**:
   - `Component` 是 React 提供的一个基类，用于创建类组件。开发者可以通过继承 `Component` 类来创建自己的组件。
   - 一般情况下，开发者会在自己的组件类中实现 `render` 方法，以定义该组件在 UI 中的展示内容。

示例

下面是一个使用 `React.Component` 创建类组件的简单示例：

```javascript
javascriptimport React from 'react';

class MyComponent extends React.Component {
    render() {
        return <div>Hello, World!</div>;
    }
}
```

在这个示例中：

- `MyComponent` 继承自 `React.Component`，因此它成为一个 React 类组件。
- `render` 方法在组件实例化时被调用，返回一个描述该组件内容的 JSX 元素。

点语法的其他示例

点语法在 JavaScript 中非常常见，通常用于访问对象的属性。例如：

```javascript
javascriptconst person = {
    name: 'Alice',
    age: 30,
};

console.log(person.name); // 输出: Alice
console.log(person.age);  // 输出: 30
```

在这里，`person` 是一个对象，通过 `person.name` 和 `person.age` 可以访问其属性。

总结

在 `React.Component` 中，`React` 是一个对象，而 `Component` 是该对象的一个属性（一个类），用于基本的组件创建。点语法是用于访问这个结构中的属性或方法的常见方式。

---



 

## 事件和事件处理



React的主要功能就是渲染视图，而视图操作中事件的绑定和处理，肯定是必不可少的。

#### 事件绑定和处理



```javascript
import React from "react";

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <button onClick={this.func1.bind(this)}>点击按钮</button><br/>
                <button onClick={()=>this.func2('func2')}>点击按钮</button>
            </div>
        )
    }
    func1(){
        console.log("func1被点击了！！！")
    }
    func2(data){
        console.log(`${data}被点击了！！！`)
    }
}

export default App
```

修正事件中的this指向

```javascript
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class App extends React.Component{
    constructor() {
        super();
        this.msg = 'hello, Component'
    }
    render() {
        return (
            <div className="App">
                <button onClick={this.func1.bind(this)}>点击按钮</button><br/>
                <button onClick={()=>this.func2('func2')}>点击按钮</button>
            </div>
        )
    }
    func1(){
        console.log("func1被点击了！！！", this.msg)
    }
    func2(data){
        console.log(`${data}被点击了！！！`, this.msg)
    }
}

export default App

```

在javascript中函数中的this的上下文切换可以采用三个方法来完成：call、apply、bind，但是在上面代码环境中，只有bind符合我们的使用需求。

 



---

AI的解释： apply 和call和bind的区别

在 JavaScript 中，`this` 关键字的上下文切换是通过 `call`、`apply` 和 `bind` 这三个方法来实现的。虽然这三个方法的目的都是改变函数执行时的 `this` 值，但它们的用法和返回值有所不同。下面详细说明这三个方法的区别。

**1. `call()`**

- **用法**: `func.call(thisArg, arg1, arg2, ...)`
- **描述**: 直接调用指定 `this` 的函数，并传入参数。
- 参数
  - `thisArg`: 要绑定给函数的 `this` 值。
  - `arg1, arg2, ...`: 函数执行时传入的参数（从第一个位置开始，依次传入）。
- **返回值**: 函数的返回值。

示例：

```jsx
javascriptfunction greet() {
    console.log(`Hello, ${this.name}`);
}

const person = { name: 'Alice' };
greet.call(person); // 输出: Hello, Alice
```

**2. `apply()`**

- **用法**: `func.apply(thisArg, [argsArray])`

- **描述**: 与 `call()` 类似，但参数是以数组的形式传入。

- 参数

  :

  - `thisArg`: 要绑定给函数的 `this` 值。
  - `argsArray`: 参数数组或类数组对象，按顺序传入函数参数。

- **返回值**: 函数的返回值。

示例：

```jsx
javascriptfunction greet(greeting) {
    console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };
greet.apply(person, ['Hello']); // 输出: Hello, Alice
```

**3. `bind()`**

- **用法**: `const boundFunc = func.bind(thisArg, arg1, arg2, ...)`
- **描述**: 创建一个新函数，`this` 被永久绑定到 `thisArg`，并可以在调用时传入额外参数。
- 参数
  - `thisArg`: 要绑定给函数的 `this` 值。
  - `arg1, arg2, ...`: 在调用新函数时会作为预置参数传入。
- **返回值**: 返回一个新的函数。

示例：

```jsx
javascriptfunction greet() {
    console.log(`Hello, ${this.name}`);
}

const person = { name: 'Alice' };
const greetAlice = greet.bind(person);
greetAlice(); // 输出: Hello, Alice
```

总结

- `call` 和 `apply` 用于立即执行函数并改变其 `this` 指向，`call` 以逗号分隔的参数形式传入参数，而 `apply` 以数组形式传入参数。
- `bind` 用于创建一个新的函数，该函数的 `this` 永久绑定到指定的对象，并且可以在后续的时候调用。
- `call` 和 `apply` 都会立即调用函数，而 `bind` 返回一个新的函数，只有在后续调用时才会执行。





#### 了解React的事件机制

在React的事件处理中，**React并没有把事件绑定到具体的`dom`节点**上，而是**通过`事件代理`（也叫事件委托）的方式**将所有的事件绑定到了React注册的**根节点**（React17之前是Document）上，然后由统一的事件监听器（dispatchEvent）去监听事件的触发，这样的处理不仅减少页面的注册事件数量、减少事件处理和回收带来的内存开销、抹平浏览器之间的事件差异，还能在组件挂载销毁时统一订阅和移除事件，当然也达到了项目性能优化的目的。





React内部基**于浏览器的事件机制实现了一套事件机制**（SyntheticEvent，[合成事件](https://zh-hans.reactjs.org/docs/events.html)），包括事件的注册、事件的存储、事件的合成及执行等。

合成事件是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()` 和 `preventDefault()`。

**React在内部维护了一个映射表（listenerBank）来记录事件与组件的事件处理函数的对应关系**，当某个**事件触发时，React根据会根据当前的组件ID和事件类型到映射表中将事件分派给指定的事件处理函数**。当一个组件挂载与卸载时，相应的事件处理函数会自动被添加到事件监听器的内部映射表中或从表中删除。

因为React的合成事件，是在事件冒泡阶段执行，所以会比javascript原生事件对象要慢。



![image-20221116064426970](assets/image-20221116064426970.png)



 

```javascript
import React from "react";

class App extends React.Component{
    msg = "hello"
    render() {
        
        return <div onClick={()=>{
            this.fn3()
        }}>
            <button onClick={this.fn1.bind(this)}>点击按钮</button><br/>
            <p onClick={(event)=>{
                this.fn2(event) // 建议大家写这个格式绑定事件处理
            }}>点击按钮</p><br/>
            <a href="http://www.baidu.com" onClick={(evenet)=>{
                this.fn4(event)
            }}>跳转页面</a>
        </div>
    }
    
    fn1(){
        console.log("this=", this);
        console.log("fn1被点击了！", this.msg);
    }

    fn2(event){
        // 阻止事件冒泡
        event.stopPropagation()
        console.log("fn2被点击了！！", this.msg)
    }

    fn3(){
        console.log("fn3执行了！")
    }

    fn4(event){
        // 组织元素标签的默认行为，例如：a标签的页面跳转，表单的submit提交数据进行页面
        event.preventDefault()
    }
}
export default App
```



> 上面的方法定义和在类中的定义的方法 



---

定义方法的不同

在 JavaScript 中，定义方法的方式有很多种，包括在普通对象中定义方法和在 ES6 的 `class` 中定义方法。两者在语法、特性、上下文和继承等方面存在一些重要的区别。

1. 定义方式

在对象中定义方法

 使用匿名函数

你可以直接在普通对象字面量中定义方法。例如：

```javascript
const person = {
    name: 'Alice',
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet(); // 输出: Hello, my name is Alice
```

在这种情况下，`greet` 是 `person` 对象的一个属性，且它是一个函数。

使用箭头函数

使用箭头函数来定义对象的方法时，有一点需要注意：箭头函数不会绑定自身的 `this`，而是从外部上下文中继承 `this`。因此，如果在箭头函数中引用 `this`，它会依赖于外部作用域的 `this`，这可能会导致意想不到的结果：

```javascript
const person = {
    name: 'Alice',
    greet: () => {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet(); // 输出: Hello, my name is undefined
```

在这里，`this` 并不指向 `person` 对象，而是指向了全局上下文（在浏览器中，通常是 `window`），所以 `this.name` 是 `undefined`。



```javascript
// ES5中定义对象方法的语法
const personES5 = {
    sayHello: function() {
        console.log('Hello World!');
    }
};

// ES6中对象方法的简写语法
const personES6 = {
    sayHello() {
        console.log('Hello World!');
    }
};
```



在ES6中，对象方法的简写是一种使代码更加简洁和易读的新特性。下面我将根据你的要求逐一解释：

1. 解释ES6中对象方法简写的语法规则

在ES6中，当定义对象的方法时，可以省略`function`关键字和冒号（`:`），直接写方法名和函数体。这种简写方式使代码更加简洁。

https://es6.ruanyifeng.com/#docs/object

- [阮一峰：ECMAScript 6 入门 - 对象的扩展](http://es6.ruanyifeng.com/#docs/object)







在 ES6 `class` 中定义方法

使用 ES6 的 `class` 语法时，方法是通过类体内定义的。例如：

```java
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const alice = new Person('Alice');
alice.greet(); // 输出: Hello, my name is Alice
```

在这个例子中，`greet` 是 `Person` 类的一个原型方法。

使用匿名函数

在类中，通常不建议使用匿名函数作为方法，因为类中的方法是定义在原型上的，而匿名函数会在每次实例化时创建新的函数。尽管可以这样做，但这不是推荐的做法：

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }

    greet = function() { // 使用匿名函数
        console.log(`Hello, my name is ${this.name}`);
    }
}

const alice = new Person('Alice');
alice.greet(); // 输出: Hello, my name is Alice
```

在这个例子中，使用了类属性语法（此时 `greet` 是一个实例属性），并且该方法可以正常访问实例的 `this`。

使用箭头函数

在类中使用箭头函数同样可以用来定义方法，这里的 `this` 会正确绑定到实例：

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }

    greet = () => { // 使用箭头函数
        console.log(`Hello, my name is ${this.name}`);
    }
}

const alice = new Person('Alice');
alice.greet(); // 输出: Hello, my name is Alice
```

在这个例子中，由于使用了箭头函数，`this` 仍然指向 `Person` 类的实例，因此可以正确访问 `name` 属性。

总结

- **在对象中使用匿名函数** 可以正常工作，但要注意 `this` 的上下文。如果使用箭头函数，`this` 将取决于定义时的上下文，这可能导致错误。
- **在类中使用匿名函数** 和 **箭头函数** 都可以，但箭头函数的 `this` 绑定是更灵活的选择（在实例中使用时），而匿名函数通常不推荐使用，因为它们生成新的函数实例。



## 三大属性 Ref和props和state

三大属性指代的是React中组件最重要的，也是最常用的三个主要属性：ref，props和 state

在 React 中，`ref` 和 `props` 并不是常规定义的缩写词，而是它们的特定用语。

1. **ref**：
   - `ref` 是 "reference"（引用）的缩写。
   - 在 React 中，`ref` 用于获取对 DOM 元素或组件实例的直接引用。
2. **props**：
   - `props` 是 "properties"（属性）的缩写。
   - 在 React 中，`props` 用于传递数据和事件处理程序从父组件到子组件。

翻译

- `ref` 翻译为 **引用**
- `props` 翻译为 **属性**

总结：

- `ref` 是引用，通常用于获取元素的直接引用。
- `props` 是属性，用于组件之间传递数据。





#### 属性1：ref

React提供了Ref属性可以让开发者很方便快捷地拿到**组件实例对象**或**DOM元素**。

```javascript
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
class App extends React.Component{
    
    footer = React.createRef()
    p1 = React.createRef()
    
    render() {
        return (
            <div className="App">
                <Header ref="header"></Header>
                <input type="text" ref="username"/>
                <Footer ref={this.footer}/>
                <p ref={this.p1}>hello, p </p>
                <button onClick={()=>this.func1()}>点击按钮</button><br/>
            </div>
        )
    }
    
    func1(){
        console.log(this.refs.username.value)
        console.log(this.refs.header)
        console.log(this.footer.current)
        console.log(this.p1.current)
    }
}

export default App
```

监听数据变化

```javascript
import React from "react";
class App extends React.Component{
    input = React.createRef()
    render() {
        return (
            <div>
                <input type="text" ref={this.input} onChange={()=>{
                    this.changeEvent()
                }}/>
            </div>
        )
    }
    changeEvent(){
        console.log(this.input.current.value);
    }
}
export default App
```

>  jSX 的ref属性，这个属性的值是什么
>
> React.createRef()



---

---

AI属性的理解 

在 React 中，`ref` 是一种用于访问 DOM 元素或 React 组件实例的方式。它可以帮助你直接与这些元素进行交互，而不是通过 React 的状态或属性来管理它们。#

##### 理解 `ref`

1. **定义和使用 ref**：
   - `ref` 可以通过在组件内部使用 `React.createRef()` 创建，并将该 `ref` 作为属性传递给相应的 DOM 元素或组件。
   - 所有通过 `ref` 引用的元素或组件实例将存储在 `current` 属性中。
2. **React.createRef() 的返回值**：
   - `React.createRef()` 方法返回一个 `ref` 对象。
   - 这个对象有一个属性 `current`，最初值为 `null`，当所引用的组件或 DOM 元素挂载（mount）后，该属性会被自动设置为对应的元素或组件实例。

代码解读

在你的代码中，部分 `ref` 相关的代码如下：

```javascript
javascriptclass App extends React.Component {
    footer = React.createRef();
    p1 = React.createRef();
    
    render() {
        return (
            <div className="App">
                <Header ref="header"></Header>   // 这个写法不正确
                <input type="text" ref="username"/> // 这个写法不推荐
                <Footer ref={this.footer}/>
                <p ref={this.p1}>hello, p</p>
                <button onClick={() => this.func1()}>点击按钮</button><br/>
            </div>
        );
    }
    
    func1() {
        console.log(this.refs.username.value); // 不推荐用 refs，改用 this.username.current.value
        console.log(this.refs.header); // 这个方法不安全
        console.log(this.footer.current); // 正确，输出 Footer 实例
        console.log(this.p1.current); // 正确，输出 DOM 元素
    }
}
```

改进建议

1. **使用 `React.createRef()` 创建的 `ref`**：
   - 通过 `React.createRef()` 返回的 `ref` 对象可以直接放在 JSX 中，如 `ref={this.footer}` 和 `ref={this.p1}`。
   - 不推荐使用字符串形式的 `ref`（例如 `ref="header"`），因为它在新版本的 React 中不再建议使用，并且可能会在将来的版本中被移除。
2. **访问 DOM 元素或组件实例**：
   - 通过 `this.footer.current` 可以获取 `Footer` 组件的实例。
   - 通过 `this.p1.current` 可以获取 `<p>` 标签的 DOM 元素。
3. **获取输入框的值**：
   - 出于安全和可维护性考虑，直接访问 DOM 元素的值应使用 `this.username.current`（如果你为 `<input>` 创建了 `ref`）。

示例代码改正

以下是更新的代码示例：

```javascript
import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class App extends React.Component {
    footer = React.createRef();
    p1 = React.createRef();
    username = React.createRef(); // 添加对输入框的引用

    render() {
        return (
            <div className="App">
                <Header ref={this.header}/>  {/* 使用 ref 作为属性 */}
                <input type="text" ref={this.username}/> {/* 使用 ref 作为属性 */}
                <Footer ref={this.footer}/>
                <p ref={this.p1}>hello, p</p>
                <button onClick={() => this.func1()}>点击按钮</button><br/>
            </div>
        );
    }
    
    func1() {
        console.log(this.username.current.value); // 获取输入框的值
        console.log(this.footer.current); // 输出 Footer 实例
        console.log(this.p1.current); // 输出 DOM 元素
    }
}
```

总结

- `React.createRef()` 返回一个 `ref` 对象，`current` 属性被用来引用相应的 DOM 元素或组件实例。
- 使用 `ref` 可以直接与 DOM 元素或组件交互，适合需要直接操作的场景。
- 最好避免使用字符串形式的 `ref`，并使用 `React.createRef()` 创建的 `ref`。



---



#### 属性2：state

state（状态）就是每个组件中内部保存的**私有**数据，**只能在组件内部声明和使用**。

**state的值是对象**，一个组件中可以有多个state数据。

组件的state如果发生变化，那么React就会自动重新渲染用户界面(不需要操作DOM)，一句话就是，用户的界面会随着state状态的改变而自动发生改变，达到**自动响应**的目的。

```javascript
import React from "react";
class App extends React.Component{
    // 初始化状态，里面的变量都是自定义的。
    state = {
        type: "password",
        tips: "显示密码",
    }
    render() {
        return (
            <div>
                { /* 读取state中的数据 */ }
                <input type={this.state.type} />
                <button onClick={()=>this.changeevt()}>{this.state.tips}</button>
            </div>
        )
    }
    changeevt(){
        if(this.state.type === "password"){
            // 修改状态
            this.setState({
                type: "text",
                tips: "隐藏密码",
            })
        }else{
            this.setState({
                type: "password",
                tips: "显示密码",
            })
        }
    }
}
export default App
```

 

##### 案例-todolist-计划任务

###### 基础代码

todolist.css，代码：

```css
ul, li, input,button{
    padding: 0;
    margin: 0;
    font-family: Arial;
    list-style: none;
}
.clear:after{
    content: '';
    display: block;
    clear: both;
}
.todo-list{
    width: 600px;
    margin: 50px auto 0;
}
.todo-list li{
    height: 42px;
    line-height: 42px;
    text-indent: 5px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 12px;
}
.todo-list li :nth-child(1){
    float: left;
}
.todo-list li :nth-child(n+2){
    float: right;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
}
.todo-list li.no-tasks{
    border-bottom: none;
}
.todo-list li.no-tasks span{
    display: block;
    width: 100%;
    text-align: center;
}
input[type=text]{
    width: 500px;
    height: 32px;
    line-height: 32px;
    text-indent: 5px;
    outline: none;
    float: left;
    padding: 0;
    margin: 0;
}
button.add-btn{
    width: 96px;
    height: 36px;
    line-height: 36px;
    background-color: #888;
    float: right;
    color: white;
    border: 0;
}
```

TodoList.jsx，代码：

```javascript
import React, {Component} from 'react';
import "./todolist.css"

class TodoList extends Component {
    render() {
        return (
            <div className={'todo-list'}>
                <div className={'clear'}>
                    <input type="text"/><button className={'add-btn'}>添加</button>
                </div>
                <ul>
                    <li><span>学习Javascript</span><span>删除</span><span>↑</span><span>↓</span></li>
                    <li><span>学习HTML</span><span>删除</span><span>↑</span><span>↓</span></li>
                    <li><span>学习CSS</span><span>删除</span><span>↑</span><span>↓</span></li>
                    <li><span>学习Java</span><span>删除</span><span>↑</span><span>↓</span></li>
                </ul>
            </div>
        );
    }
}

export default TodoList;
```

###### 计划列表

```javascript
import React, {Component} from 'react';
import "./todolist.css"

class TodoList extends Component {
    state = {
        tasks: [  // 计划任务列表
            // "学习HTML",
            // "学习Javascript",
            // "学习CSS",
            // "学习Java",
        ],
    }
    render() {
        return (
            <div className={'todo-list'}>
                <div className={'clear'}>
                    <input type="text"/><button className={'add-btn'}>添加</button>
                </div>
                <ul>
                    {
                        this.state.tasks.map((item, key)=>{
                            return <li key={key}><span>{item}</span><span>删除</span><span>↑</span><span>↓</span></li>
                        })
                    }
                    {/* 基于逻辑运算实现判断效果 */}
                    {this.state.tasks.length === 0 && <li className={'no-tasks'}><span>暂时没有任何计划</span></li>}
                </ul>
            </div>
        );
    }
}

export default TodoList;
```

###### 添加计划

```javascript
import React, {Component} from 'react';
import "./todolist.css"

class TodoList extends Component {
    state = {
        tasks: [  // 计划任务列表
            "学习HTML",
            "学习Javascript",
            "学习CSS",
            "学习Java",
        ],
    }
    textBtn = React.createRef()
    render() {
        return (
            <div className={'todo-list'}>
                <div className={'clear'}>
                    <input type="text" ref={this.textBtn}/>
                    <button className={'add-btn'} onClick={()=>{
                        this.addTask()
                    }}>添加</button>
                </div>
                <ul>
                    {
                        this.state.tasks.map((item, key)=>{
                            return <li key={key}><span>{item}</span><span>删除</span><span>↑</span><span>↓</span></li>
                        })
                    }
                    {/* 基于逻辑运算实现判断效果 */}
                    {this.state.tasks.length === 0 && <li className={'no-tasks'}><span>暂时没有任何计划</span></li>}
                </ul>
            </div>
        );
    }
    addTask(){
        // 添加计划任务
        console.log(this.textBtn.current.value);
        // 获取到tasks任务列表
        const tasks = this.state.tasks.concat();
        // 添加计划任务到列表
        tasks.unshift(this.textBtn.current.value);
        // tasks.push(this.textBtn.current.value);
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
    }
}

export default TodoList;
```

###### 删除计划

```javascript
import React, {Component} from 'react';
import "./todolist.css"

class TodoList extends Component {
    state = {
        tasks: [  // 计划任务列表
            "学习HTML",
            "学习Javascript",
            "学习CSS",
            "学习Java",
        ],
    }
    textBtn = React.createRef()
    render() {
        return (
            <div className={'todo-list'}>
                <div className={'clear'}>
                    <input type="text" ref={this.textBtn}/>
                    <button className={'add-btn'} onClick={()=>{
                        this.addTask()
                    }}>添加</button>
                </div>
                <ul>
                    {
                        this.state.tasks.map((item, key)=>{
                            return (
                                <li key={key}>
                                    <span>{item}</span>
                                    <span onClick={()=>{
                                        this.delTask(key)
                                    }}>删除</span>
                                    <span>↑</span>
                                    <span>↓</span>
                                </li>
                            )
                        })
                    }
                    {/* 基于逻辑运算实现判断效果 */}
                    {this.state.tasks.length === 0 && <li className={'no-tasks'}><span>暂时没有任何计划</span></li>}
                </ul>
            </div>
        );
    }
    addTask(){
        // 添加计划任务
        console.log(this.textBtn.current.value);
        // 获取到tasks任务列表
        const tasks = this.state.tasks.concat();
        // 添加计划任务到列表
        tasks.unshift(this.textBtn.current.value);
        // tasks.push(this.textBtn.current.value);
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
    }
    delTask(key){
        // 删除计划任务
        console.log(key, this.state.tasks[key]);
        // 获取到tasks任务列表
        const tasks = this.state.tasks.concat();
        // splice
        // 参数1：删除成员的开始下标
        // 参数2：删除成员的个数
        // 参数3....：在删除未知上，是否填充新的成员
        // 返回值：被剔除的数组成员
        tasks.splice(key, 1);
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
    }
}

export default TodoList;
```

###### 移动计划

```javascript
import React, {Component} from 'react';
import "./todolist.css"

class TodoList extends Component {
    state = {
        tasks: [  // 计划任务列表
            "学习HTML",
            "学习Javascript",
            "学习CSS",
            "学习Java",
        ],
    }
    textBtn = React.createRef()
    render() {
        return (
            <div className={'todo-list'}>
                <div className={'clear'}>
                    <input type="text" ref={this.textBtn}/>
                    <button className={'add-btn'} onClick={()=>{
                        this.addTask()
                    }}>添加</button>
                </div>
                <ul>
                    {
                        this.state.tasks.map((item, key)=>{
                            return (
                                <li key={key}>
                                    <span>{item}</span>
                                    <span onClick={()=>{
                                        this.delTask(key)
                                    }}>删除</span>
                                    <span onClick={()=>{
                                        this.upTask(key)
                                    }}>↑</span>
                                    <span onClick={()=>{
                                        this.downTask(key)
                                    }}>↓</span>
                                </li>
                            )
                        })
                    }
                    {/* 基于逻辑运算实现判断效果 */}
                    {this.state.tasks.length === 0 && <li className={'no-tasks'}><span>暂时没有任何计划</span></li>}
                </ul>
            </div>
        );
    }
    addTask(){
        // 添加计划任务
        console.log(this.textBtn.current.value);
        // 获取到tasks任务列表
        const tasks = this.state.tasks.concat();
        // 添加计划任务到列表
        tasks.unshift(this.textBtn.current.value);
        // tasks.push(this.textBtn.current.value);
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
        // 清除原有输入框中内容
        this.textBtn.current.value = ""
    }

    delTask(key){
        // 删除计划任务
        console.log(key, this.state.tasks[key]);
        // 获取到tasks任务列表
        const tasks = this.state.tasks.concat();
        // splice
        // 参数1：删除成员的开始下标
        // 参数2：删除成员的个数
        // 参数3....：在删除未知上，是否填充新的成员
        // 返回值：被剔除的数组成员
        tasks.splice(key, 1);
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
    }
    upTask(key){
        // 任务向上移动
        // 如果当前任务已经在最顶层，则不需要移动
        if(key === 0) return
        // 从任务列表中把要移动的计划任务进行提取
        const tasks = this.state.tasks
        const task = tasks.splice(key, 1)[0]
        tasks.splice(key-1, 0, task)
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
    }

    downTask(key){
        // 任务向下移动
        // 从任务列表中把要移动的计划任务进行提取
        const tasks = this.state.tasks
        const task = tasks.splice(key, 1)[0]
        tasks.splice(key+1, 0, task)
        // 保存任务列表到state状态
        this.setState({
            tasks    //  tasks: tasks 的简写
        })
    }

}

export default TodoList;
```

 

#### 属性3： props

在前面我们已经学习了组件嵌套，所以组件会因为实现业务或者功能的需求，会出现嵌套或者并列的情况，甚至有时候会因为多个组件负责的业务是相关联的，此时就需要在多个**组件之间进行数据的传递了**。

React组件提供了Props属性， 专门用来**实现组件接受外部参数的传递**。

props是**只读的**，所以只能获取外部传递的数据，但不能修改该数据。

同时React还提供了props数据类型和必要性的约束（React15版本以后，需要单独安装`yarn add  prop-types`）。

 

##### 父组件传递数据给子组件

src/App.jsx，代码：

```javascript
import React from "react";
import Banner from "./components/Banner.jsx"

class App extends React.Component{
    state = {
        number: 0,
    }
    msg = 'hello, Message'
    render() {
        return (
            <div>
                <button onClick={()=>this.setState({number: this.state.number+1})}>number={this.state.number}</button>
                <Banner msg={this.msg} num={this.state.number}></Banner>
            </div>
        )
    }
}
export default App
```

src/Banner.jsx，代码：

```javascript
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Banner extends Component {
    render() {
        return (
            <div>
                接收父组件传递来过的数据：{this.props.msg}===> {this.props.num}
            </div>
        );
    }
}
//props 是隐藏的属性

// 对外界传递的参数可以设置约束要求：例如：必填，唯一，等其他的要求去。
Banner.propTypes = {
    msg: PropTypes.string.isRequired
}

export default Banner;

```

验证器

```javascript
组件名.propTypes = {
  // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
  props属性名: PropTypes.array,  // 数组
  props属性名: PropTypes.bool,   // 布尔值
  props属性名: PropTypes.func,    // 函数
  props属性名: PropTypes.number,   // 数值
  props属性名: PropTypes.object,    // 对象
  props属性名: PropTypes.string,    // 字符串
 
  // 可以被渲染的对象 numbers, strings, elements 或 array
  props属性名: PropTypes.node,
 
  //  React 元素
  props属性名: PropTypes.element,
 
  // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
  props属性名: PropTypes.instanceOf(Message),
 
  // 用 enum 来限制 prop 只接受指定的值。
  props属性名: PropTypes.oneOf(['News', 'Photos']),
 
  // 可以是多个对象类型中的一个
  props属性名: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),
 
  // 指定类型组成的数组
  props属性名: PropTypes.arrayOf(PropTypes.number),
 
  // 指定类型的属性构成的对象
  props属性名: PropTypes.objectOf(PropTypes.number),
 
  // 特定 shape 参数的对象
  props属性名: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
 
    // 任意类型加上 `isRequired` 来使 prop 不可空。
    props属性名: PropTypes.func.isRequired,
 
    // 不可空的任意类型
    props属性名: PropTypes.any.isRequired,
 
    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    props属性名: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error('Validation failed!');
    }
  }
}
```

 

---

 导出和引入的语法：

在 React 中，有多个导出语句，包括默认导出和命名导出。具体来说：

```javascript
import React, { Component } from 'react';


```



1. 默认导出（Default Export）

在 React 的源码中，整个 React 库是通过默认导出进行导出的。这意味着你可以将整个 React 库导入为一个单独的命名。例如：

```javascript
// src/react/index.js
const React = {
    // React 库的实现
};
export default React; // 默认导出
```

使用时：

```
import React from 'react';
```

2. 命名导出（Named Export）

React 也包含了一些命名导出。这些导出允许你以名称导入特定的功能，比如 `Component`、`PureComponent`、`Fragment` 等。示例：

```javascript
// src/react/index.js
export class Component { ... }
export class PureComponent { ... }
export const Fragment = Symbol('React.Fragment'); // 等等
```

使用时，需要使用大括号：

```
import { Component } from 'react';
```

React 的主要导出

在 `react` 源码中（特别是在 v17 及更高版本），通常会找到以下几类导出：

- **默认导出**：整个库作为 `React`
- **命名导出**：包括 `Component`、`PureComponent`、`Fragment`、`useState`、`useEffect`、`useContext` 等。

---



##### 子组件传递数据给父组件

React是单向数据流的。props是只读属性，所以父组件通过props传递进来的数据，子组件是无法修改，只能读取显示。而开发中总会遇到要修改父组件的数据的情况。那么我们就可以通过在父组件中定义一个修改数据（假设fn）的方法，然后通过props把fn方法传递给子组件调用，以此间接达到子组件修改父组件数据的目的。

src/App.jsx，代码：

```javascript
import React, {Component} from 'react';
import Son1 from "./Son1.jsx";

class App extends Component {
    state = {
        num: 100,
    }
    render() {
        return (
            <div>
                <Son1 changeNum={this.changeNum.bind(this)} num={this.state.num}></Son1>
                <p>num={this.state.num}</p>
            </div>
        )
    }
    changeNum(num){
        this.setState({
            num: num
        })
    }
}

export default App;
```

 

子组件，src/Banner.jsx，代码：

```javascript
import React, {Component} from 'react';

class Son1 extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>this.props.changeNum(this.props.num+1)}>子组件, num={this.props.num}</button>
            </div>
        );
    }
}

export default Son1;
```

开发中，有时候也可以在父组件中，通过ref来引用子组件对象来调用/修改子组件的状态。但是并不推荐。

src/App.jsx，代码：

```javascript
import React, {Component} from 'react';
import Son1 from "./Son1.jsx";

class App extends Component {
    state = {
        num: 100,
    }
    son = React.createRef()
    render() {
        return (
            <div>
                <Son1 ref={this.son} changeNum={this.changeNum.bind(this)} num={this.state.num}></Son1>
                <p>num={this.state.num}</p>
                <button onClick={()=>{
                    // 父组件也可以通过ref来引用子组件对象，通过引用对象修改/访问子组件的信息。
                    this.son.current.setState({
                        msg: "來自父组件的关怀！"
                    })
                    this.son.current.show()
                }}>点击修改子组件的数据</button>
            </div>
        )
    }
    changeNum(num){
        this.setState({
            num: num
        })
    }
}

export default App;
```

src/Son1.jsx，代码：

```javascript
import React, {Component} from 'react';

class Son1 extends Component {
    state = {
        msg: "hello"
    }
    render() {
        return (
            <div>
                <p>{this.state.msg}</p>
                <button onClick={()=>this.props.changeNum(this.props.num+1)}>子组件, num={this.props.num}</button>
            </div>
        );
    }
    show(){
        console.log("show方法被执行！")
    }
}

export default Son1;
```

 

##### 属性默认值

```
import React, {Component} from 'react';
import PropTypes from "prop-types";


class Son1 extends Component {
    // 属性的约束
    static propTypes = {
        msg: PropTypes.string.isRequired
    }
    // 属性的默认值
    static defaultProps = {
        message: "hello, React"
    }
    state = {
        msg: "hello"
    }
    render() {
        return (
            <div>
                <p>{this.state.msg}</p>
                <button onClick={()=>this.props.changeNum(this.props.num+1)}>子组件, num={this.props.num}</button>
                <p>message={this.props.message}</p>
            </div>
        );
    }
    show(){
        console.log("show????")
    }
}

// // 属性约束
// Son1.propTypes = {
//     msg: PropTypes.string.isRequired
// }
//
// // 属性默认值
// Son1.defaultProps = {
//     message: "hello, React"
// }


export default Son1;
```

##### 函数中的props使用

src/App.jsx，代码：

```
import React, {Component} from 'react';
import Son2 from "./Son2.jsx";


class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        num: 10,
    }
    render() {
        return (
            <div>
                <Son2 num={this.state.num}></Son2>
            </div>
        );
    }
}

export default App;
```

src/Son2.jsx，代码：

```
import React from 'react';
import PropTypes from "prop-types";

function Son2(props) {  // 实际上，不管函数式组件，还是类组件，第一个参数都是props
    const btn = React.createRef()
    return (
        <div>
            子组件，num={props.num}，msg={props.msg}
            <input type="text" ref={btn}/>
            <button onClick={()=>{
                console.log(btn.current.value)
            }}>点击按钮</button>
        </div>
    );
}

// 属性约束
Son2.propTypes = {
    num: PropTypes.number.isRequired
}

// 属性默认值
Son2.defaultProps = {
    msg: "msg的默认值"
}

export default Son2;
```

 


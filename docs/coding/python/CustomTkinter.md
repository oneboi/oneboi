# CustomTkinter教程

参考教程：https://customtkinter.tomschimansky.com/

## 一、安装和升级

```bash
pip install customtkinter
```



```
pip install customtkinter --upgrade
```

## 二、外观和主题

### 2.1 外观模式appearance



```python
customtkinter.set_appearance_mode("system")  # default
customtkinter.set_appearance_mode("dark")
customtkinter.set_appearance_mode("light")
```

* system 跟随系统 默认
* dark 深色模式
* light 浅色模式

###  2.2 颜色color



所有组件的颜色都可以自定义，具体组件的适当参数可以在该组件的文档中找到。

请注意，如果组件有圆角，bg_color 仅表示组件背后的颜色。组件的主要颜色称为 fg_color：

![CTkButton color attributes explained](https://customtkinter.tomschimansky.com/assets/images/bg_color-1b61e6d3e3ccc60fd15d2f09ebdbbc46.png)



颜色可以设置为单一颜色名称（ `"red"` ）、单一十六进制颜色字符串（ `"#FF0000"` ）或用于亮模式和暗模式的元组颜色（ `("red", "darkred")` ）。组件将根据当前外观模式自动选择当前颜色。因此，通过使用元组颜色，组件可以在亮模式和暗模式下具有不同的颜色。如果你使用单一颜色，则该颜色将用于亮模式和暗模式。

Example: 示例：

```python
button = customtkinter.CTkButton(root_tk, fg_color="red")  # single color name
button = customtkinter.CTkButton(root_tk, fg_color="#FF0000")  # single hex string
button = customtkinter.CTkButton(root_tk, fg_color=("#DB3E39", "#821D1A"))  # tuple color
```

### 2.3 主题Themes 

默认情况下，所有颜色都由配色主题设置。目前有三个主题可用： `"blue"` 、 `"dark-blue"` 和 `"green"` ，其中"blue"是标准主题。所有主题都提供用于浅色和深色外观模式的颜色元组。

您可以在编程开始时设置主题，如下所示：

```python
customtkinter.set_default_color_theme("dark-blue")  # Themes: "blue" (standard), "green", "dark-blue"
```

### 2.4自定义主题Custom Themes 

一个主题由一个类似于 dark-blue.json 的 .json 文件描述。你也可以创建自己的主题，这样你就不必手动为每个部件设置样式。只需复制上述 .json 文件并更改值。然后你可以通过将你的 .json 文件的路径传递给 `.set_default_color_theme` 方法来加载新主题：

```python
customtkinter.set_default_color_theme("path/to/your/custom_theme.json")
```



## 三、界面缩放比例

CustomTkinter 默认支持在 macOS 和 Windows 上的高 DPI 缩放。

###  3.1 自动缩放

在 macOS 上，Tk 窗口的缩放会自动进行。

在 Windows 上，应用程序会变为 DPI 感知（ `windll.shcore.SetProcessDpiAwareness(2)` ），并检测当前显示器的缩放因子。

然后 CustomTkinter 会根据这个因子缩放每个元素和窗口的尺寸。

### 3.2 禁用缩放

您可以像这样禁用自动缩放：

```python
customtkinter.deactivate_automatic_dpi_awareness()
```

然后在 Windows 上，当缩放值超过 100%时，窗口会变得模糊。

### 3.3 自定义缩放

除了自动检测的缩放因子外，您还可以像以下方式一样为应用程序设置自己的缩放因子：

```python
customtkinter.set_widget_scaling(float_value)  # widget dimensions and text size
customtkinter.set_window_scaling(float_value)  # window geometry dimensions
```



## 四、打包



在 Windows 上使用 pyinstaller 创建.exe 文件时，需要考虑两件事。

首先，不能使用 pyinstaller 的 `--onefile` 选项，因为 customtkinter 库不仅包含.py 文件，还包括.json 和.otf 等数据文件。

PyInstaller 无法将这些文件打包成一个.exe 文件，因此必须使用 `--onedir` 选项。

其次，必须使用 pyinstaller 的 `--add-data` 选项手动包含 customtkinter 目录。

因为出于某种原因，pyinstaller 不会自动包含库中的.json 等数据文件。

您可以使用以下命令找到 customtkinter 库的安装位置：

```text
pip show customtkinter
```

将显示一个位置，例如： `c:\users\<user_name>\appdata\local\programs\python\python310\lib\site-packages`

然后像这样添加库文件夹： `--add-data "C:/Users/<user_name>/AppData/Local/Programs/Python/Python310/Lib/site-packages/customtkinter;customtkinter/"`

**完整的命令会像这样：**

```
pyinstaller --noconfirm --onedir --windowed --add-data "<CustomTkinter Location>/customtkinter;customtkinter/"  "<Path to Python Script>"
```



## 五、组件



#### **基础容器和布局类**

| 组件                   | 说明                                                         | 核心参数                                                     | 基本示例                                                     |
| :--------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **CTkFrame**           | 基础的矩形框架容器，用于组织和布局其他组件。                 | `master`, `width`, `height`, `fg_color`, `border_width`, `corner_radius` | `frame = ctk.CTkFrame(master=root, width=200, height=100)`   |
| **CTkScrollableFrame** | 自带滚动条的可滚动框架容器，当内容超出框架大小时非常实用。   | `master`, `orientation` ("vertical"/"horizontal"), `label_text` (框架标题) | `scroll_frame = ctk.CTkScrollableFrame(master=root, orientation="vertical", height=200)` |
| **CTkTabview**         | 选项卡视图，类似于笔记本，通过`.add()`方法创建不同的选项卡页面。 | `master`, `width`, `height`, `corner_radius`                 | `tabview = ctk.CTkTabview(master=root)` `tab_1 = tabview.add("选项卡1")` |

#### **文本和选择类**

| 组件               | 说明                                                         | 核心参数                                                     | 基本示例                                                     |
| :----------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **CTkLabel**       | 用于显示文本或图像的静态标签。                               | `master`, `text`, `font`, `text_color`, `image`              | `label = ctk.CTkLabel(master=frame, text="Hello World", font=("Roboto", 24))` |
| **CTkButton**      | 可点击的按钮，可绑定命令（`command`）。                      | `master`, `text`, `command`, `fg_color`, `hover_color`, `anchor` (用于对齐图标和文本) | `button = ctk.CTkButton(master=frame, text="点击我", command=my_function)` |
| **CTkEntry**       | 单行文本输入框。                                             | `master`, `placeholder_text`, `show` (用于密码字符，如`"*"`), `width`, `height` | `entry = ctk.CTkEntry(master=frame, placeholder_text="请输入用户名")` |
| **CTkTextbox**     | 多行文本输入/显示区域，支持垂直和水平滚动（`wrap='none'`时）。 | `master`, `wrap` ("none"/"word"/"char"), `corner_radius`, `border_width` | `textbox = ctk.CTkTextbox(master=frame, wrap="word")` `textbox.insert("0.0", "多行文本内容...")` |
| **CTkCheckBox**    | 复选框组件，支持点击标签文本选中。                           | `master`, `text`, `variable`, `onvalue`, `offvalue`, `checkbox_width`, `checkbox_height` | `check_var = ctk.BooleanVar()` `checkbox = ctk.CTkCheckBox(master=frame, text="记住我", variable=check_var)` |
| **CTkRadioButton** | 单选按钮，通常一组内互斥。                                   | `master`, `text`, `variable`, `value`, `radiobutton_width`, `radiobutton_height` | `radio_var = ctk.StringVar(value="选项1")` `radio_1 = ctk.CTkRadioButton(master=frame, text="选项1", variable=radio_var, value="选项1")` |

#### **选择、进度和滚动类**

| 组件                   | 说明                                                         | 核心参数                                                     | 基本示例                                                     |
| :--------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **CTkComboBox**        | 组合框，允许用户从下拉列表中选择或手动输入。                 | `master`, `values` (列表), `justify`, `dropdown_fg_color`    | `combo = ctk.CTkComboBox(master=frame, values=["选项A", "选项B"])` |
| **CTkOptionMenu**      | 选项菜单，只能从下拉列表中选择，不可手动输入。               | `master`, `values` (列表), `anchor`, `dropdown_fg_color`     | `option = ctk.CTkOptionMenu(master=frame, values=["选项1", "选项2"])` |
| **CTkSegmentedButton** | 分段按钮，用于在几个互斥选项间切换，视觉上类似分段选择器。   | `master`, `values` (列表), `command`                         | `segment = ctk.CTkSegmentedButton(master=frame, values=["Day", "Week", "Month"])` |
| **CTkSlider**          | 滑动条，用于从范围内选择一个数值。                           | `master`, `from_`, `to`, `orientation` ("horizontal"/"vertical") | `slider = ctk.CTkSlider(master=frame, from_=0, to=100, orientation="horizontal")` |
| **CTkProgressBar**     | 进度条，用于显示任务的完成进度，支持不确定模式（`.start()`, `.stop()`）。 | `master`, `orientation`, `mode` ("determinate"/"indeterminate") | `progress = ctk.CTkProgressBar(master=frame, orientation="horizontal")` `progress.set(0.5)` |
| **CTkSwitch**          | 开关组件，用于切换开/关状态。                                | `master`, `text`, `variable`, `onvalue`, `offvalue`, `switch_width`, `switch_height` | `switch = ctk.CTkSwitch(master=frame, text="启用功能")`      |
| **CTkScrollbar**       | 独立的滚动条，通常用于需要手动关联的组件（如`CTkTextbox`自带滚动条）。 | `master`, `orientation` ("vertical"/"horizontal")            | 通常由`CTkScrollableFrame`或`CTkTextbox`内部管理。           |

### 5.1 按钮 CTkButton



```python
def button_event():
    print("button pressed")

button = customtkinter.CTkButton(app, text="CTkButton", command=button_event)
```

#### 参数



| argument 参数          | value 值                                                     |
| ---------------------- | ------------------------------------------------------------ |
| master                 | root, tkinter.Frame or CTkFrame root, tkinter.Frame 或 CTkFrame |
| width                  | button width in px 按钮宽度（像素）                          |
| height 高度            | button height in px 按钮高度（像素）                         |
| corner_radius 圆角半径 | corner radius in px 圆角半径（像素）                         |
| border_width           | button border width in px 按钮边框宽度（像素）               |
| border_spacing         | spacing between text and image and button border in px, default is 2 文本与图像和按钮边框之间的间距（以像素为单位），默认为 2 |
| fg_color 前景色        | forground color, tuple: (light_color, dark_color) or single color or "transparent" 前景色，元组：(浅色, 深色) 或单一颜色或 "透明" |
| hover_color 悬停颜色   | hover color, tuple: (light_color, dark_color) or single color 悬停色，元组：(浅色, 深色) 或单一颜色 |
| border_color 边框色    | border color, tuple: (light_color, dark_color) or single color 边框颜色，元组：(浅色, 深色) 或单一颜色 |
| text_color 文本颜色    | text color, tuple: (light_color, dark_color) or single color 文本颜色，元组：(浅色, 深色) 或单一颜色 |
| text_color_disabled    | text color when disabled, tuple: (light_color, dark_color) or single color 禁用时的文本颜色，元组：(浅色, 深色) 或单一颜色 |
| text 文本              | string 字符串                                                |
| font 字体              | button text font, tuple: (font_name, size), (set negative size value for size in pixels) 按钮文本字体，元组：(字体名称, 大小)，(在像素中设置负大小值) |
| textvariable           | tkinter.StringVar object to change text of button 用于更改按钮文本的 tkinter.StringVar 对象 |
| image                  | put an image on the button, removes the text, must be class PhotoImage 在按钮上放置图像，移除文本，必须是 PhotoImage 类 |
| state 状态             | "normal" (standard) or "disabled" (not clickable, darker color) "normal"（标准）或 "disabled"（不可点击，颜色较深） |
| hover 悬停             | enable/disable hover effect: True, False 启用/禁用悬停效果：True, False |
| command 命令           | callback function 回调函数                                   |
| compound 复合          | set image orientation if image and text are given ("top", "left", "bottom", "right") 如果给出图像和文本，设置图像方向("top", "left", "bottom", "right") |
| anchor 锚点            | alignment of text an image in button ("n", "ne", "e", "se", "s", "sw", "w", "nw", "center") 按钮中文本和图像的对齐方式("n", "ne", "e", "se", "s", "sw", "w", "nw", "center") |

#### 方法

- #### .configure(attribute=value, ...) .configure(属性=值, ...)

  All attributes can be configured, for example:
  所有属性都可以配置，例如：

  ```python
  button.configure(text="new text")
  ```

  

- #### .cget(attribute_name)

  Pass attribute name as string and get current value of attribute, for example.
  将属性名称作为字符串传递，并获取属性的当前值，例如。

  ```python
  text = button.cget("text")
  ```

  

- #### .invoke()

  Calls command if button state is 'disabled'.
  如果按钮状态为 'disabled'，则调用命令。

---

你看到的 `invoke()` 方法描述确实**容易让人产生困惑**。让我帮你澄清一下这个方法在 CTkButton 中的实际行为。

📌 **`invoke()` 的真正含义**

`invoke()` 方法的作用是**手动触发按钮的命令（command）**，就像用户点击了按钮一样。

**正确的行为应该是：**

- **正常状态（normal）**：调用 `invoke()` 会执行按钮绑定的 `command` 函数
- **禁用状态（disabled）**：调用 `invoke()` **不会**执行命令

❌ **文档中的描述可能是错误或过时的**

你引用的文档说：

> "如果按钮状态为 'disabled'，则调用命令。"

这个描述**与实际情况相反**，也很可能是个文档错误。在标准的 tkinter 和 CustomTkinter 中，`invoke()` 通常在按钮禁用时**不起作用**。

✅ **实际使用示例**

python

```
import customtkinter as ctk

def button_click():
    print("按钮被点击了！")

def test_invoke():
    # 手动触发按钮的命令
    my_button.invoke()  # 会打印 "按钮被点击了！"
    
    # 禁用按钮后再尝试
    my_button.configure(state="disabled")
    my_button.invoke()  # 不会打印任何内容（按钮被禁用）
    
    # 重新启用按钮
    my_button.configure(state="normal")
    my_button.invoke()  # 又会打印了

app = ctk.CTk()
my_button = ctk.CTkButton(app, text="点击我", command=button_click)
my_button.pack(pady=20)

test_button = ctk.CTkButton(app, text="测试 invoke", command=test_invoke)
test_button.pack(pady=20)

app.mainloop()
```

🎯 **`invoke()` 的典型使用场景**

1. **程序化触发按钮**：当某些条件满足时，自动"点击"按钮
2. **快捷键支持**：按下键盘快捷键时，自动触发对应的按钮
3. **测试和调试**：在代码中模拟用户点击来测试功能
4. **联动效果**：一个操作触发多个按钮的效果

**实际应用示例：**

python

```
import customtkinter as ctk

def save_data():
    print("保存数据...")

def auto_save():
    # 3秒后自动触发保存按钮
    app.after(3000, save_button.invoke)

app = ctk.CTk()

save_button = ctk.CTkButton(app, text="保存", command=save_data)
save_button.pack(pady=10)

auto_save_button = ctk.CTkButton(app, text="启动自动保存", command=auto_save)
auto_save_button.pack(pady=10)

app.mainloop()
```

📝 **总结**

- `invoke()` 的作用：手动触发按钮的命令
- 文档描述可能有误：在 disabled 状态下应该**不会**调用命令
- 实际用途：程序化触发、快捷键支持、自动化操作

如果你发现 CTk 的某个版本确实有不同的行为，建议你实际测试一下来确认。你也可以查看 CustomTkinter 的 GitHub 仓库或最新文档来获取准确信息。

---



```python
"""
CustomTkinter 组件完整示例
演示了15种常用组件的创建、配置和事件处理方式
需要先安装: pip install customtkinter
"""

import customtkinter as ctk
from tkinter import messagebox


# 设置外观模式和主题 (影响所有组件的外观)
ctk.set_appearance_mode("system")          # 可选: "light", "dark", "system"
ctk.set_default_color_theme("blue")         # 可选: "blue", "dark-blue", "green"


class App(ctk.CTk):
    """主应用程序类"""
    
    def __init__(self):
        super().__init__()
        
        # 窗口基础配置
        self.title("CustomTkinter 组件完整示例")
        self.geometry("900x700")
        
        # ==================== 1. CTkFrame 框架 ====================
        # 框架作为容器，用于组织和分组其他组件
        self.main_frame = ctk.CTkFrame(self)
        self.main_frame.pack(fill="both", expand=True, padx=10, pady=10)
        
        # ==================== 2. CTkScrollableFrame 可滚动框架 ====================
        # 当内容超出可视区域时自动显示滚动条
        self.scrollable_frame = ctk.CTkScrollableFrame(
            self.main_frame,
            label_text="所有组件展示区域",          # 框架标题
            label_font=("微软雅黑", 16, "bold")     # 标题字体
        )
        self.scrollable_frame.pack(fill="both", expand=True, padx=10, pady=10)
        
        # ==================== 3. CTkLabel 标签 ====================
        # 用于显示文本或图片的基础组件
        self.label = ctk.CTkLabel(
            self.scrollable_frame,
            text="这是一个标签 (CTkLabel)",
            font=("微软雅黑", 18, "bold"),
            text_color="#2CC985"                 # 文字颜色，支持十六进制
        )
        self.label.pack(pady=10)
        
        # ==================== 4. CTkButton 按钮 ====================
        # 可设置圆角、边框和悬浮颜色
        self.button = ctk.CTkButton(
            self.scrollable_frame,
            text="点击按钮 (CTkButton)",
            command=self.button_callback,        # 绑定点击事件
            width=200,
            height=40,
            corner_radius=10,                   # 圆角半径
            fg_color="#2C7DA0",                 # 背景色
            hover_color="#1F5068"               # 悬浮时的颜色
        )
        self.button.pack(pady=5)
        
        # ==================== 5. CTkEntry 输入框 ====================
        # 支持占位符和密码模式
        self.entry = ctk.CTkEntry(
            self.scrollable_frame,
            placeholder_text="请输入文本 (CTkEntry)",
            width=300,
            height=40,
            corner_radius=8
        )
        self.entry.pack(pady=5)
        
        # ==================== 6. CTkCheckBox 复选框 ====================
        # 多选场景使用，可通过 on/off 值获取状态
        self.checkbox = ctk.CTkCheckBox(
            self.scrollable_frame,
            text="选项1 (CTkCheckBox)",
            command=self.checkbox_callback,     # 状态改变时触发
            onvalue="已选中",                    # 选中时的返回值
            offvalue="未选中"                    # 未选中时的返回值
        )
        self.checkbox.pack(pady=5)
        
        # ==================== 7. CTkRadioButton 单选按钮 ====================
        # 多个单选用同一个 variable 关联，实现互斥
        self.radio_var = ctk.StringVar(value="选项A")  # 共享变量
        
        self.radio_a = ctk.CTkRadioButton(
            self.scrollable_frame,
            text="选项A (CTkRadioButton)",
            variable=self.radio_var,             # 关联变量
            value="选项A",                       # 选中时变量的值
            command=self.radio_callback
        )
        self.radio_a.pack(pady=2)
        
        self.radio_b = ctk.CTkRadioButton(
            self.scrollable_frame,
            text="选项B (CTkRadioButton)",
            variable=self.radio_var,
            value="选项B",
            command=self.radio_callback
        )
        self.radio_b.pack(pady=2)
        
        # ==================== 8. CTkSwitch 开关 ====================
        # 类似于复选框，但样式为滑动开关
        self.switch = ctk.CTkSwitch(
            self.scrollable_frame,
            text="启用功能 (CTkSwitch)",
            command=self.switch_callback,
            onvalue=True,
            offvalue=False
        )
        self.switch.pack(pady=5)
        
        # ==================== 9. CTkSlider 滑块 ====================
        # 用于选择连续范围内的数值
        self.slider = ctk.CTkSlider(
            self.scrollable_frame,
            from_=0,                           # 最小值
            to=100,                            # 最大值
            number_of_steps=10,                # 可选：设置为整数步长
            command=self.slider_callback,      # 滑动时实时触发
            width=300
        )
        self.slider.pack(pady=10)
        self.slider.set(50)                    # 设置初始值
        
        # 显示滑块数值的标签
        self.slider_label = ctk.CTkLabel(self.scrollable_frame, text="滑块值: 50")
        self.slider_label.pack()
        
        # ==================== 10. CTkProgressBar 进度条 ====================
        # 用于显示任务完成百分比
        self.progressbar = ctk.CTkProgressBar(
            self.scrollable_frame,
            width=300,
            height=20,
            corner_radius=10,
            progress_color="#2CC985"           # 进度条颜色
        )
        self.progressbar.pack(pady=10)
        self.progressbar.set(0)                # 初始值 0.0 ~ 1.0
        
        # ==================== 11. CTkComboBox 组合框 ====================
        # 下拉选择，支持自定义选项列表
        self.combobox = ctk.CTkComboBox(
            self.scrollable_frame,
            values=["选项1", "选项2", "选项3", "选项4"],  # 下拉列表内容
            command=self.combobox_callback,             # 选择时的回调
            width=200
        )
        self.combobox.pack(pady=10)
        self.combobox.set("请选择")                      # 设置默认显示文本
        
        # ==================== 12. CTkOptionMenu 选项菜单 ====================
        # 类似于 ComboBox，但样式不同，通常用于固定选项
        self.optionmenu = ctk.CTkOptionMenu(
            self.scrollable_frame,
            values=["设置1", "设置2", "设置3"],
            command=self.optionmenu_callback,
            width=200
        )
        self.optionmenu.pack(pady=10)
        self.optionmenu.set("设置1")                     # 默认选中项
        
        # ==================== 13. CTkSegmentedButton 分段按钮 ====================
        # 多个按钮连成一组，互斥选择
        self.segmented_var = ctk.StringVar(value="白天")
        self.segmented_button = ctk.CTkSegmentedButton(
            self.scrollable_frame,
            values=["白天", "黑夜", "自动"],            # 各段的文本
            variable=self.segmented_var,                # 绑定变量
            command=self.segmented_callback
        )
        self.segmented_button.pack(pady=10)
        
        # ==================== 14. CTkTabview 标签页 ====================
        # 多页面容器，每个Tab可以放置不同的内容
        self.tabview = ctk.CTkTabview(
            self.scrollable_frame,
            width=600,
            height=200
        )
        self.tabview.pack(pady=10)
        
        # 添加标签页
        self.tabview.add("标签页1")
        self.tabview.add("标签页2")
        self.tabview.add("标签页3")
        
        # 在标签页1中添加内容
        tab1_label = ctk.CTkLabel(self.tabview.tab("标签页1"), text="这是标签页1的内容")
        tab1_label.pack(pady=20)
        
        tab1_button = ctk.CTkButton(self.tabview.tab("标签页1"), text="标签页1的按钮")
        tab1_button.pack()
        
        # 在标签页2中添加内容
        tab2_textbox = ctk.CTkTextbox(self.tabview.tab("标签页2"), width=500, height=100)
        tab2_textbox.pack(pady=20)
        tab2_textbox.insert("0.0", "这是标签页2的文本框，可以编辑多行文本。")
        
        # ==================== 15. CTkTextbox 文本框 ====================
        # 多行文本输入/显示区域 (独立示例)
        self.textbox = ctk.CTkTextbox(
            self.scrollable_frame,
            width=500,
            height=100,
            corner_radius=10,
            border_width=1
        )
        self.textbox.pack(pady=10)
        self.textbox.insert("0.0", "这是一个独立的文本框 (CTkTextbox)\n可以写多行文字...")
        
        # ==================== 16. CTkScrollbar 滚动条 ====================
        # 通常与 Textbox 或 Frame 关联，这里附加到上面的 textbox
        self.scrollbar = ctk.CTkScrollbar(
            self.scrollable_frame,
            orientation="vertical",              # 垂直滚动条
            command=self.textbox.yview           # 控制 textbox 的垂直滚动
        )
        self.scrollbar.pack(side="right", fill="y")
        self.textbox.configure(yscrollcommand=self.scrollbar.set)  # 双向绑定
        
        # ==================== 额外：状态显示区域 ====================
        self.status_label = ctk.CTkLabel(
            self.scrollable_frame,
            text="状态：就绪",
            font=("微软雅黑", 12),
            text_color="gray"
        )
        self.status_label.pack(pady=10)
    
    # ==================== 回调函数 ====================
    
    def button_callback(self):
        """按钮点击事件"""
        input_text = self.entry.get()          # 获取输入框内容
        self.status_label.configure(text=f"按钮已点击，输入框内容：{input_text}")
        messagebox.showinfo("提示", f"按钮被点击了！\n输入内容：{input_text}")
    
    def checkbox_callback(self):
        """复选框状态改变事件"""
        status = self.checkbox.get()            # 获取复选框的 onvalue/offvalue
        self.status_label.configure(text=f"复选框状态：{status}")
    
    def radio_callback(self):
        """单选按钮选择事件"""
        selected = self.radio_var.get()         # 获取当前选中的值
        self.status_label.configure(text=f"单选按钮选中：{selected}")
    
    def switch_callback(self):
        """开关状态改变事件"""
        if self.switch.get():
            self.status_label.configure(text="开关已开启")
        else:
            self.status_label.configure(text="开关已关闭")
    
    def slider_callback(self, value):
        """滑块滑动事件"""
        self.slider_label.configure(text=f"滑块值: {int(value)}")
        # 同时更新进度条，展示联动效果
        self.progressbar.set(value / 100.0)
    
    def combobox_callback(self, choice):
        """组合框选择事件"""
        self.status_label.configure(text=f"组合框选择了：{choice}")
    
    def optionmenu_callback(self, choice):
        """选项菜单选择事件"""
        self.status_label.configure(text=f"选项菜单选择了：{choice}")
    
    def segmented_callback(self, value):
        """分段按钮点击事件"""
        self.status_label.configure(text=f"分段按钮选中：{value}")
        # 根据选择改变整体外观模式，演示动态切换主题
        if value == "白天":
            ctk.set_appearance_mode("light")
        elif value == "黑夜":
            ctk.set_appearance_mode("dark")
        else:
            ctk.set_appearance_mode("system")


# 程序入口
if __name__ == "__main__":
    app = App()
    app.mainloop()
```


## <center>编码规范</center>

#### 代码格式化工具 prettier

#### JavaScript 规范
- **动态字符串使用反引号**
- **统一使用分号结尾**
- **变量与常量声明**
    - 使用 let 和 const 代替 var
    - 函数的定义一定是const
    - 一些不应被改变到的引用也推荐使用const，避免重新赋值
    ```js
    // 变量统一使用小驼峰命名
    let scoreTotal = 1;
    
    // 常量统一使用大写大驼峰加下划线 
    const TEST_DEMO = '我是一个常量，不能被改变';
    ```
- **对象**
    - 对象尽量静态化，即一旦定义，就不得随意添加新的属性
    - 不要存储 this 引用，最好使用箭头函数
    - 数组遍历优先使用map、reduce、forEach等高阶函数
    - 对同级属性的对象分组
    	```js 
    	// 例如一些接口的表单参数，与接口交互时可直接发送整个对象
        let testForm = {
            form1,
            form2,
            form3,
        }
    	```
    	
    - 浅拷贝对象使用解构赋值
    	```js
        let origin = { a: 1, b: 2 };
        let newOrigin = { ...origin, c: 3 };
        ```
    
    - 检测对象中是否含有某个字段使用 hasOwnProperty
        ```js
        let test = {
            a: 0,
            b: false
        }
        
        // 该api 只检测键名是否存在于对象，不检测值是否为 true
        test.hasOwnProperty('a'); // true
        test.hasOwnProperty('c'); // false
        ```

- **函数**
    - 推荐使用async await 处理异步
    - 声明应同时添加该方法的作用及用途的注释
    - `(` 前不空格，但 `{` 前一定要有空格
    - 将函数功能模块化，剥离出独立业务为另一个函数
    - 函数之间空行，提高可读性
    	```js
        /*
        * @method: 函数名
        * @param: {Object(参数数据类型)} 参数名(name) 参数说明
        * @return: {Number} 返回值说明
        * @remark: 函数用途备注
        */
        function myFn(name, gender) {
    
        }
    	```
	
- **条件与判断**
    - if 和 else 条件语句下，业务代码不超过一行可省略代码块括号 {}，超过即要使用代码块括号 {}
        ```
        if (name) do something;
        
        if (collection.length) {
            ...
            ...
        }
        ```
    
    - 判断优先使用严格运算符
    - 不将 test === null 或 test.length > 0 作为判断条件，应使用抽象方法 To Boolean 强制转换 if (test)
        ```
        // bad
        if (name !== '')
        if (collection.length > 0) 
        
        // good
        if (name)
        if (collection.length)
        
        ```
    
- **语法和数据结构**
    - 单行注释// 双斜线后，必须跟一个空格
    ```js
    // 比较运算符、计算运算符、赋值符 = 前后空格
    c = a + b;
    
    // 对象属性冒号后空格,最后一个属性不要逗号
    test = {
        a: 1,
        b: 2
    };
    test = { a: 1, b: 2 };
    
    // 对象之间逗号前空格
    test = [1, 2, 3, 5];
    
    // 递增使用 += 1 而不是 ++
    a += 1;
    
    // 及时删除用于调试的console.log
    
    // 只判断对象是否存在于某个值使用 includes 替代 indexOf
    [1, 2, 3, 4, 5].includes(1);
    ```

#### HTML 规范

- **标签属性的定义，统一使用双引号**
- **避免多余的标签**
- **循环使用 ul li标签**
- **不建议使用行内式style**
- **模块代码段适度换行、注释**
- **自定义标签（组件）使用小写字母用`-`连接**
- **标签的属性顺序：原生属性 > 指令**
    ```html
    <!-- 注释内容与注释符前后空格； -->
    <div class="flex" v-for="(item, index) in 5" :key="index"></div>
    
    <!-- boolean值设置不需要声明取值的属性 -->
    <select>
        <option value="1" selected>1</option>
    </select>
    
    <!-- 自定义组件 -->
    <vue-modal></v-modal>
    
    <!-- 字段多状态展示不要再模板使用过长的 if-else, 应使用vue 过滤器 filters -->
    <div>{{info.state | stateText}}</div>
    ```

#### CSS 规范

- **统一预处理器Scss**
- **使用连字符 `-` 作为 ID、Class 名称界定符，不要驼峰和下划线命名**
- **url() 、属性选择符、属性值使用双引号**
- **属性名后的冒号 `:` 与属性值之间保留一个空格，冒号前不保留空格**
- **在用逗号`，`分隔的列表中，逗号后保留一个空格，逗号前不保留空格**
- **属性值为 0 时，省略单位**
- **禁止使用元素选择器**
- **项目搭建时编好常用的全局className，包括但不限于主题色、布局类、字体大小等；不必再复写**
    ```scss
    /* good 选择器与代码块括号之前需空格 */
    .element {
        ...
    }

    /* 父级选择器属性和子级嵌套时适当换行 */
    .dialog {
        color: red;
    
        &:after {
            ...
        }
    }
    
    /* 父页面对组件样式覆盖使用 /deep/深度选择器 */
    /deep/ .header {
        ...
    }
    ```

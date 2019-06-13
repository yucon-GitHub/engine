## <center>编码规范</center>


#### 1.0 JS规范
- **所有引用使用const声明，确保无法对引用重新赋值**
- **变量跟常量声明**

	```js

		/*变量统一使用驼峰命名法 */
		let testDemo = "测试例子";
		/* 常量统一使用大写加下划线 */
		const TEST_DEMO = "测试例子";

	```
- **尽量给将 const 和 let 分组, 但是要注意代码的作用域**
- **使用对象属性值的简写，并且把简写的属性分组**

	```js

		let testObj = {
			thisIsTsetOne,
			thisIsTestTwo,
			thisIsTestThree: 1
			thisIsTestFour: 1
		}

	```
- **浅拷贝对象使用解构赋值，而不是使用Object.assign**

	```js
		const original = { a: 1, b: 2 };
		const copy = { ...original, c: 3 };
	```

- **尽可能不要存储 this 引用，最好使用箭头函数或者bind**
- **禁止在一个非函数代码块（if、while 等）中声明一个函数**

	```js

		// error
		if (true) {
			function thisIsErrorDemo () {

			}
		}

	```
- **对数组遍历map、reduce、forEach等高阶函数，增加可读性，不建议使用for循环进行遍历**
- **方法声明应同时添加该方法的作用及用途的注释,建议使用**

	```js

		/*
		* 这是一个测试的方法
		* @param {Object(参数数据类型)} 参数名(name) 参数说明
		* @return {Number} 返回值说明
		*
		*/
		function thisTestMethod(name, gender) {

		}

	```
- **类型转换**

	```js

		/* 转字符串 */
		let toString = String(Conversion);
		/* 转number */
		let toNumber = Number(string) || +string || parseInt(inputValue,10);
		/* 转布尔值 */
		let toBoolean = Boolean(needConversion) || !!needConversion

	```
#### 2.0 CSS 规范
- **使用子选择器**

	```css

		.good > p {
			border:0;
		}
		// error
		.good  p {
			border:0;
		}

	```
- **建议属性声明顺序说明**
	* 布局类属性 盒模型 字体 字体 其他
	* 无前缀属性一定要写在最后
- **预处理器使用 scss**
- **如果当前组件 style 设置了 scoped，那么在编写 CSS 应尽可能不要使用元素选择器，因为元素选择器的效率比类选择器的效率慢太多了**
	```

- **全局盒子模型box-sizing应该使用继承**

	```css
		html {
			box-sizing: border-box;
		}
		*, *:before, *:after {
			box-sizing: inherit;
		}
	```

- **使用transition尽量指定变换的属性，降低性能消耗**
#### 3.0 文件的归类要准确
- **模块文件引用**
	- 被引用的文件如果被多个模块所引用，那么应该存放在多个引用模块的公共文件夹内
	- 被引用的文件如果只是被当前的文件所引用，那么被引用的文件应该存放在跟引用模块同一个文件夹内，不允许放在外部文件夹
#### 3.0 vue组件命名及使用

- **组件命名**

	- 组件声明使用首字母大写命名

	```js
		QueryScore.vue
	```

	- 组件的使用，使用短横线分隔命名进行使用

	```html
		<query-score></query-score>
	```

- **公共组件命名**
	- 公共组件的声明以公司名缩写为开头进行命名

	```js
		`YXLoading.vue`;
	```
	- 使用

	```html
		<yx-loading></yx-loading>
	```
- **组件内部模块命名**
	- 以组件模块名或简写为开头，如

		```js
			父组件`Live.vue`;
			子组件`LiveComment.vue`;
		```
	- 使用

		```html
			<live-comment></live-comment>
		```
- **组件的引用**

	- 组件的引用使用 import 语句的函数进行引用，而不要直接使用 import 进行引用

	```html
		<template>
			<info-data />
		</template>;
	```

	```js
		const InfoData = () => import("Component.vue"); // 正确
		import InfoData from "@/components/infoData"; // 不推荐

		export default {
			components: {
				InfoData
			}
		};
  	```

	- **尽量不要全局引用第三方组建**

- **切勿使用保留字**


#### 4.0 method 方法命名规范

- 驼峰式命名，统一使用动词或者动词+名词形式
- 请求数据方法，以 data 结尾
- 尽量使用常用单词开头（set、get、go、can、has、is）
- 善用英语语法和语序，用一段完整的语法去表达函数或者变量，例如： AfterRequestMethod

  ```js
	export default {
		methods: {
		getPageListData() {},
		requestMethod(){
				request().then(result=>{
					AfterRequestMethod(result);
				})
			}
		}
	};
  ```
#### 5.0 VUE API相关规范
- **state命名**

  ```js
  /* 新增与编辑 */
  data () {
    return {
      showEdit[*(功能名)] : false,
      showEditLiveInfo: false,
      showAddLiveInfo
    }
  }
  ```

- **组件与组件之间数据传递禁止使用解构赋值进行数据传递**
- __props 命名及接收__
	- Props 定义应该尽量详细，至少需要指定其类型
	- 不可或缺和关键变量要使用 validator 进行处理

	```js
		props: {
			status: String;
		}
	```

- __多个特性的元素规范__

	- 当元素有多个属性时，每个特性单独一行属性顺序: **原生属性 > 指令**

	```html
		<img
			src="https://vuejs.org/images/logo.png"
			alt="Vue Logo"
			v-for="(item, index) in 5"
			:key="index"
		/>
	```

- **v-for 跟 v-if 不允许作用在同一个元素上**

  - 过滤数据列表中某些元素可以使用 computed 计算属性计算后返回对应的数据，而不是在元素上面进行 v-for 跟 v-if,会导致元素重复渲染

  - 必须使用key配合v-for进行数据渲染，因为key会在虚拟DOM生成一个标识，在数据更新后，能够以最高的效率找出变化的DOM元素。

	```html
		<template>
			<ul>
				<li
					v-for="user in activeUsers"
					:key="user.id">
					{{ user.name }}
				</li>
			</ul>
		</template>
	```

	```js
    export default {
		computed: {
			activeUsers: function () {
			// 进行条件筛选或其他操作，把需要渲染的数据返回至页面
				return this.users.filter(function (user) {
					return user.isActive
				})
			}
		}
    }
	 ```
#### 6.0 配置文件规范
- 所有配置文件要忽略，并且在master分支和服务器环境保留一份。
- 所有请求的接口要求复用，书写注释，特别是公共接口。使用公共接口时必须查找当前项目是否已有该接口，有用无增。

#### 7.0 UI框架相关
- **对数据量大但是展现的样式及功能比较简单，请不要使用Table组件进行展现，因为Table组件太消耗性能了，特别是加了左固定或者右固定之后**

- **其他控件的尺寸最好选择small，而不是默认的medium**

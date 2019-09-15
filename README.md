## <center>编码规范</center>


#### 1.0 开发须知
- **文件目录**
    ```
    api —— API接口定义（按业务划分）
    components —— 公用的组件
    
    request —— 请求 
        config  —— 请求配置
        index   —— axios二次封装
    
    router —— 路由 
        module —— 按模块划分路由，新增只需定义json
        index —— 路由出口，统一处理页面引用
        
    static —— 项目静态资源，icon 和 全局css
    store —— vuex
    utils —— 工具类，一些常用的js方法
    views —— 业务视图层
    vue.config.js —— webpack配置集合
    ```
    
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
			thisIsTestThree: 1,
			thisIsTestFour: 1
		}

	```
- **浅拷贝对象使用解构赋值，而不是使用Object.assign**

	```js
		const original = { a: 1, b: 2 };
		const copy = { ...original, c: 3 };
	```

- **尽可能不要存储 this 引用，最好使用箭头函数或者bind**

- **建议对数组遍历map、reduce、forEach等高阶函数，增加可读性**
- **方法声明应同时添加该方法的作用及用途的注释,建议使用**

	```js

		/*
		* @method 方法名
		* @param {Object(参数数据类型)} 参数名(name) 参数说明
		* @return {Number} 返回值说明
		*
		*/
		function myFn(name, gender) {

		}
	```

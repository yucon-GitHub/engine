module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error',4],
        "space-before-function-paren": 0,  // 函数定义时括号前面要不要有空格
        "eol-last": 0,  // 文件以单一的换行符结束
        "no-extra-semi": 0, // 可以多余的冒号
        "semi": 0,  // 语句可以不需要分号结尾
        "one-var": 0, // 连续声明
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}

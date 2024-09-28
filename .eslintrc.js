module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: true
    },
    extends: ['eslint:recommended', 'plugin:vue/essential'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    plugins: ['vue'],
    rules: {
        // "indent": [
        // 	"error",
        // 	"tab"
        // ],
        'space-in-parens': 0,
        'func-call-spacing': 0,
        // 不需要
        'space-before-function-paren': 0, // 函数定义时括号前面要不要有空格
        'eol-last': 0, // 文件以单一的换行符结束
        'no-extra-semi': 0, // 可以多余的冒号
        semi: 0, // 语句可以不需要分号结尾
        eqeqeq: 0, // 必须使用全等
        'one-var': 0, // 连续声明
        'no-undef': 0, // 可以 有未定义的变量
        'no-unused-vars': 0, //定义的方法未使用

        // 警告
        'no-empty': 1, // 块语句中的内容不能为空
        'no-use-before-define': [1, 'nofunc'], // 未定义前不能使用
        'no-prototype-builtins': 1, //禁止直接使用 Object.prototypes 的内置属性
        'no-case-declarations': 1,

        // 错误
        'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
        'no-dupe-args': 2, // 函数参数不能重复
        'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-duplicate-case': 2, // switch中的case标签不能重复
        'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
        'no-invalid-regexp': 2, // 禁止无效的正则表达式
        'no-func-assign': 2, // 禁止重复的函数声明
        'valid-typeof': 2, // 必须使用合法的typeof的值
        'no-unreachable': 2, // 不能有无法执行的代码
        'no-sparse-arrays': 2, // 禁止稀疏数组， [1,,2]
        'no-shadow-restricted-names': 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
        'no-native-reassign': 2, // 不能重写native对象

        // 代码风格
        //"key-spacing": [1, {  // 对象字面量中冒号的前后空格
        //	"beforeColon": false,
        //	"afterColon": true
        //}],

        // common js
        'no-duplicate-imports': 1,
        'vue/html-self-closing': 0,
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 10,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-parsing-error': [
            'error',
            {
                'invalid-first-character-of-tag-name': false
            }
        ],
        'vue/no-v-html': 'off',
        'accessor-pairs': 2,
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'block-spacing': [2, 'always'],
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        curly: [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'eol-last': 2,
        eqeqeq: 'off', // ["error", "always", {"null": "ignore"}],
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'handle-callback-err': [2, '^(err|error)$'],
        'jsx-quotes': [2, 'prefer-double'],
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 2, // 禁止空格和 tab 的混合缩进
        'vue/html-indent': [0, 'tab'],
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        'no-console': 'off',
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        'no-dupe-args': 2,
        'no-dupe-class-members': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        'no-lone-blocks': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        'no-return-assign': [2, 'except-parens'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-trailing-spaces': 2,
        'no-undef': 2,
        'no-undef-init': 2,
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [
            2,
            {
                defaultAssignment: false
            }
        ],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'padded-blocks': [2, 'never'],
        'prefer-destructuring': ['error', { object: false, array: false }], // 此规则强制使用解构而不是通过成员表达式访问属性。
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        semi: [2, 'never'],
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ], // 在(参数后面不允许任何空格
        'space-before-blocks': [2, 'always'],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        'spaced-comment': [
            2,
            'always',
            {
                markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
            }
        ],
        'template-curly-spacing': [2, 'never'], // 不允许大括号内的空格
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        yoda: [2, 'never'],
        'prefer-const': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'object-curly-spacing': [
            2,
            'always',
            {
                objectsInObjects: true
            }
        ],
        'array-bracket-spacing': [2, 'never']
    }
}

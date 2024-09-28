/*
 * @Description:
 * @LastEditTime: 2024-01-24 17:07:14
 */
module.exports = {
	presets: [
		[
			// 预设配置
			'@babel/preset-env',
			{
				loose: true,
				// modules: false,
				useBuiltIns: 'usage', // 使用的引入，'entry','usage'
				/**
				 * 使用useBuiltIns 需要定义corejs版本，不定义默认为2
				 * 注意：这里写corejs: 3的话为3.0，所以一定要带小版本号
				 */
				corejs: '3',
				targets: {
					chrome: 49
					// esmodules: true,
					// browsers: ['chrome > 49']
				}
			}
		],
		'@vue/babel-preset-jsx',
	],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: '3',
				helpers: false
			}
		],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-object-rest-spread',
		// 下面3个解决疯狂报 false 的警告
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true
			}
		],
		['@babel/plugin-proposal-private-methods', { loose: true }],
		['@babel/plugin-proposal-private-property-in-object', { loose: true }]
	]
}

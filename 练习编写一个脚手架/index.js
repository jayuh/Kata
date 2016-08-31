var readline = require('readline')
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

var config = {
	grouping: '',
	name: '',
	name_zh: '',
	um: '',
	type: ''
}

rl.on('close', function() {
	console.log('---------- 配置参数如下 ----------')
	console.log(config)
});

var shell = {

	step1: function () {
		var self = this
		rl.question("请选择需要添加的分组模块（1、渠道管理；2、客户管理；3、营销管理；4、产品发布）: ",function(text){
			var o = {
				'1': 'channel',
				'2': 'custom',
				'3': 'marketing',
				'4': 'product'
			}
		    switch (text) {
		        case '1':
		        case '2':
		        case '3':
		        case '4':
		            config.grouping = o[text]
		            self.step2()
		            break
		        default :
		            self.step1()
		    }
		});
	},

	step2: function () {
		var self = this
		rl.question('请输入模块的英文名称，用于文件命名: ', function(text) {
			(text === '') && self.step2()
			config.name = text
			self.step3()
		})
	},

	step3: function() {
		var self = this
		rl.question('请输入模块的中文名称，用于代码中的注释: ', function(text) {
			(text === '') && self.step3()
			config.name_zh = text
			self.step4()
		})
	},

	step4: function() {
		var self = this
		rl.question('请输入您的UM账号: ', function(text) {
			(text === '') && self.step4()
			config.um = text
			self.step5()
		})
	},

	step5: function() {
		var self = this
		rl.question('请选择添加的模块类型（1、精简型；2、增删查改型）: ', function(text) {
			switch (text) {
				case '1':
					config.type = 1
					self.step7()
					break
				case '2':
					self.step6()
					break
				default:
					self.step5()
			}
		})
	},

	step6: function() {
		var self = this
		rl.question('请选择增删查改的类型（1、新增和修改为弹出框的形式；2、新增和修改为新页面的形式）: ', function(text) {
			switch (text) {
				case '1':
					config.type = 2
					self.step7()
					break
				case '2':
					config.type = 3
					self.step7()
					break
				default:
					self.step6()
			}
		})
	},

	step7: function() {
		rl.close()
	}
}

shell.step1()





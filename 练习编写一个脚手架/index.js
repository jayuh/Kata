var readline = require('readline')
var swig = require('swig')
var fs = require('fs')

// 修改swig差值表达式
swig.setDefaults({
	tagControls: ['{?', '?}']
})

// 全局配置项
var today = new Date()
var config = {
	grouping: 'marketing',
	grouping_rootpath: 'BROP-MARKTING',
	name: 'admin',
	name_zh: '管理员',
	um: 'shenxiaolong029',
	type: 1,
	date: today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate()
}

// 配置readline
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
rl.on('close', function() {
	console.log('\n---------- 开始执行操作 ----------')
	shell.handle()
})

// 操作步骤
var shell = {

	step1: function () {
		var self = this
		rl.question("请选择需要添加的分组模块（1、渠道管理；2、客户管理；3、营销管理；4、产品发布）: ",function(text){
			var o = {
				'1': {
					name: 'channel',
					rootpath: 'BROP-CHANNEL'
				},
				'2': {
					name: 'custom',
					rootpath: 'BROP-CUSTOM'
				},
				'3': {
					name: 'marketing',
					rootpath: 'BROP-MARKTING'
				},
				'4': {
					name: 'product',
					rootpath: 'BROP-PRODUCT'
				}
			}
		    switch (text) {
		        case '1':
		        case '2':
		        case '3':
		        case '4':
		            config.grouping = o[text].name
		            config.grouping_rootpath = o[text].rootpath
		            self.step2()
		            break
		        default :
		            self.step1()
		    }
		})
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
		console.log('\n---------- 配置参数如下 ----------')
		console.log(config)
		console.log('')
		this.step8()
	},

	step8: function() {
		var self = this
		rl.question('确认写(yes)，重来写(no): ', function(text) {
			switch (text) {
				case 'yes':
					rl.close()
					break
				case 'no':
					self.step1()
					break
				default:
					self.step8()
			}
		})
	},

	handle: function() {
		switch (config.type) {
			case 1:
				this.copyFile('./template/1/demo.html', './' + config.grouping_rootpath + '/' + config.name + '.shtml')
				this.copyFile('./template/1/assets/static/js/grouping/demo.js', './' + config.grouping_rootpath + '/www/assets/static/js/' + config.grouping + '/' + config.name + '.js')
				this.copyFile('./template/1/assets/modules/grouping/viewModel/demo.js', './' + config.grouping_rootpath + '/www/assets/modules/' + config.grouping + '/viewModel/' + config.name + '.js')
				this.copyFile('./template/1/assets/modules/grouping/model/demo-model.js', './' + config.grouping_rootpath + '/www/assets/modules/' + config.grouping + '/model/' + config.name + '-model.js')
				break
			case 2:
				this.copyFile('./template/2/demo.html', './' + config.grouping_rootpath + '/' + config.name + '.shtml')
				this.copyFile('./template/2/assets/static/js/grouping/demo.js', './' + config.grouping_rootpath + '/www/assets/static/js/' + config.grouping + '/' + config.name + '.js')
				this.copyFile('./template/2/assets/modules/grouping/viewModel/demo.js', './' + config.grouping_rootpath + '/www/assets/modules/' + config.grouping + '/viewModel/' + config.name + '.js')
				this.copyFile('./template/2/assets/modules/grouping/model/demo-model.js', './' + config.grouping_rootpath + '/www/assets/modules/' + config.grouping + '/model/' + config.name + '-model.js')
				break
			case 3:
				this.copyFile('./template/3/demo.html', './' + config.grouping_rootpath + '/' + config.name + '.shtml')
				this.copyFile('./template/3/assets/static/js/grouping/demo.js', './' + config.grouping_rootpath + '/www/assets/static/js/' + config.grouping + '/' + config.name + '.js')
				this.copyFile('./template/3/assets/modules/grouping/viewModel/demo.js', './' + config.grouping_rootpath + '/www/assets/modules/' + config.grouping + '/viewModel/' + config.name + '.js')
				this.copyFile('./template/3/assets/modules/grouping/model/demo-model.js', './' + config.grouping_rootpath + '/www/assets/modules/' + config.grouping + '/model/' + config.name + '-model.js')
				break
			default:
				console.log('config.type有误，请检查！')
		}
	},

	copyFile: function(copyPath, pastePath) {
		fs.exists(pastePath, function(exists) {
			if (exists) {
				console.log("Failed to create the file because it already exists: " + pastePath)
			} else {
				var template = swig.compileFile(copyPath)
				var str = template(config)
				fs.writeFile(pastePath, str, function(err) {
				    if (err) throw err
				    console.log('Create File: ' + pastePath)
				})
			}
		})
	}
}

shell.step1()







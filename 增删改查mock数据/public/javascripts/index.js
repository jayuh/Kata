var vm = new Vue({
    el: '#app',
    data: {
        projectList: [],
        currentProject: '',
        projectName: '',
        url: '',
        content: '',
        mockList: [1,2]
    },
    created: function () {
        this.getMockList()
    },
    methods: {
        addProject: function () {

        },
        getMockList: function () {
            $.get('/getMockList', {}, function(result) {
                if (result.code === 0) {
                    vm.mockList = result.data
                } else {
                    alert(result.message)
                }
            })
        },
        modifyMock: function (url) {
            var data = { url: url }
            $.get('/getMock', data, function(result) {
                if (result.code === 0) {
                    vm.url = url
                    vm.content = JSON.stringify(result.data)
                } else {
                    alert(result.message)
                }
            })
        },
        deleteMock: function (url) {
            var data = { url: url }
            $.post('/deleteMock', data, function(result) {
                if (result.code === 0) {
                    vm.getMockList()
                } else {
                    alert(result.message)
                }
            })
        },
        submitMock: function () {
            var data = {
                url: this.url,
                content: this.content
            }
            $.post('/addMock', data, function(result) {
                if (result.code === 0) {
                    vm.getMockList()
                } else {
                    alert(result.message)
                }
            })
        }
    }
})
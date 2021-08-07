$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage


    // 定义美化时间的过滤器
    template.defaults.imports.Formate = function(val) {
        var date = new Date(val)

        var yy = paddZero(date.getFullYear())
        var mm = paddZero(date.getMonth() + 1)
        var dd = paddZero(date.getDate())
        var h = paddZero(date.getHours())
        var m = paddZero(date.getMinutes())
        var s = paddZero(date.getSeconds())

        return `${yy}-${mm}-${dd} ${h}:${m}:${s}`
    }

    // 定义补零的函数
    function paddZero(n) {
        return n = n > 9 ? n : '0' + n
    }


    var queryInfo = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()



    //获取文章的列表数据
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: queryInfo,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('请求文章的列表数据失败')
                }
                var htmlStr = template('articleListTable', res)
                $('#tb').html(htmlStr)

                renderPage(res.total)
            }
        })
    }

    //获取下拉框分类可选项
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }
                var htmlStr = template('selectTpt', res)
                $('[name=cate_id').html(htmlStr)
                form.render()
            }
        })
    }

    // 为表单绑定提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        queryInfo.cate_id = cate_id
        queryInfo.state = state
            // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })

    // 渲染分页
    function renderPage(total) {
        laypage.render({
            elem: 'renderPage', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: queryInfo.pagesize,
            curr: queryInfo.pagenum,
            layout: ['count', 'limit', 'page', 'prev', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                queryInfo.pagenum = obj.curr
                queryInfo.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 点击删除按钮删除对应文章
    $('#tb').on('click', '#deleteArticleBtn', function() {
        var id = $(this).attr('data-id')
        var len = $('#deleteArticleBtn').length
        layer.confirm('是否确定删除该文章?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }

                    if (len === 1) {
                        queryInfo.pagenum = queryInfo.pagenum === 1 ? 1 : queryInfo.pagenum - 1
                    }
                    initTable()
                    layer.msg('删除文章成功！')
                    layer.close(index);
                }
            })
        })
    })

    //点击编辑按钮编辑文章
    $('#tb').on('click', '#editArticleBtn', function() {
        layer.open({
            type: 1,
            title: '修改文章',
            content: '开发中.../(ㄒoㄒ)/~~' //这里content是一个普通的String
        })
    })

})
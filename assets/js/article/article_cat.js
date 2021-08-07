$(function() {
    var layer = layui.layer
    var form = layui.form

    getArticleCateInfo()

    // 获取文章分类初始信息
    function getArticleCateInfo() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类信息失败')
                }

                var str = template('articleCateTable', res)
                $('.tb').html(str)
            }
        })
    }

    // 点击添加分类，弹出对话框
    var index = null
    $('#addCatBtn').on('click', function() {
        index = layer.open({
            type: '1',
            area: ['500px', '280px'],
            title: '添加文章分类',
            content: $('#addCatDialog').html()
        })
    })

    // 给表单绑定提交事件，完成添加文章分类
    $('body').on('submit', '#addCatForm', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res)
                    return layer.msg('添加文章分类失败')
                }
                getArticleCateInfo()
                layer.msg('添加文章分类成功！')
                layer.close(index)
            }
        })
    })

    //点击编辑按钮，弹出对话框
    var index1 = null
    $('.tb').on('click', '.editBtn', function() {
        index1 = layer.open({
            type: '1',
            area: ['500px', '280px'],
            title: '修改文章分类',
            content: $('#editCatDialog').html()
        })

        var id = $(this).attr('data-id')

        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('无法获取文章分类信息！')
                }
                form.val('editCateFileter', res.data)
            }
        })
    })

    // 为编辑表单绑定提交事件
    $('body').on('submit', '#editCatForm', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改文章分类失败')
                }
                getArticleCateInfo()
                layer.msg('修改文章成功！')
                layer.close(index1)
            }
        })
    })

    // 点击删除按钮，删除对应文章分类信息项
    $('.tb').on('click', '.deleteBtn', function() {
        var id = $(this).attr('data-id')
        layer.confirm('是否确定删除该项?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败')
                    }
                    
                    layer.msg('删除文章分类成功')
                    layer.close(index)
		    getArticleCateInfo()
                }
            })
        })
    })
})
$(function() {
    var layer = layui.layer
    var form = layui.form
    initArticleCate()
        //初始化富文本编辑器
    initEditor()

    function initArticleCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类信息失败')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('selectArticleCate', res)
                $('[ name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击选择封面按钮触发file点击事件
    $('#coverBtn').on('click', function() {
        $('#fileIpt').click()
    })

    // 为fileIpt绑定change事件
    $('#fileIpt').on('change', function(e) {
        // 拿到用户选择的文件
        var file = e.target.files[0]
            // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
            // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })



    var pub_state = '已发布'
    $('#draftBtn').on('click', function() {
        pub_state = '草稿'
    })



    $('#pubForm').submit(function(e) {

        e.preventDefault()
            // 基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData($(this)[0])

        fd.append('state', pub_state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                location.href = '/article/article_list.html'
            }
        })
    }

})
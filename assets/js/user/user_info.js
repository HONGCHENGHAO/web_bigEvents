$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(val) {
            if (val.length < 2 || val.length > 12) {
                return '请输入的昵称字符在2~12字符之内'
            }
        }
    })

    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败!")
                }
                console.log(res.data)
                form.val('userInfoForm', res.data)
            }
        })
    }

    // 重置表单
    $('.btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 更新表单
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                window.parent.getUserInfo()
                layer.msg('更新用户信息成功')
            }
        })
    })


})
$(function() {
    var layer = layui.layer

    //调用用户信息函数
    getUserInfo()

    // 为退出按钮绑定退出主页界面函数

    $('.btnLoginOut').on('click', function() {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        })
    })


    // 获取用户信息
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                    if (res.status !== 0) {
                        return console.log(res)
                    }
                    renderAvatar(res.data)
                }
                /* ,
                        complete: function(res) {
                            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                                localStorage.removeItem('token')
                                location.href = '/login.html'
                            }
                        } */
        })
    }

    function renderAvatar(user) {
        // 渲染用户名
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 渲染头像
        var src = user.user_pic
        if (src !== null) {
            $('.layui-nav-img').attr('src', src).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()

        }
    }




})
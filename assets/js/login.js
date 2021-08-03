// 立即执行函数
$(function() {
    // 点击去注册链接
    $('#link_login').on('click', function() {
            $('.regBox').hide();
            $('.loginBox').show();
        })
        // 点击去登录链接
    $('#link_reg').on('click', function() {
            $('.regBox').show();
            $('.loginBox').hide();
        })
        // 自定义表单规则验证
    var form = layui.form
    var layer = layui.layer

    form.verify({
        // 密码验证规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否相同规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.regBox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //发起ajax请求注册表单
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            } else {
                layer.msg('注册用户成功!')
                $('#link_login').click()
            }
        })
    })

    // 发起ajax请求登录表单
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})
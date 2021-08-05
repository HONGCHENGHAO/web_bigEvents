$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(val) {
            if (val === $('[name=oldpwd]').val()) {
                return "新密码与旧密码不可以一致"
            }
        },
        rePwd: function(val) {
            if (val !== $('[name=newpwd]').val()) {
                return "两次密码不一致"
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
    console.log('subsubsub...')
})
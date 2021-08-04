// 注：每次调用$.get（）/$.post（）/$.ajax（） 时都会先调用 ajaxPrefilter 对象
$.ajaxPrefilter(function(options) {
    // 统一配置根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一配置有权限的请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局挂载complete
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
/*
 **index customer-logo hover
 */

// $(".coustomer-logo").find(".am-u-md-2 a").each(function() {
//   $(this).hover(function() {
//     console.log(1)
//       $(this).find(".am-active").show();
//       $(this).find(".normal-logo").hide();
//   }, function() {
//     $(this).find(".am-active").hide();
//     $(this).find(".normal-logo").show();
//   });
// });
(function() {
    $('.customer-logo').find('.customer-box').each(function() {
        $(this).hover(function() {
            $(this).find('.am-active').show();
            $(this).find('.normal-logo').hide();
        }, function() {
            $(this).find('.am-active').hide();
            $(this).find('.normal-logo').show();
        })
    });
})()



var baseUrl = 'http://www.forrily.com:8089'

function ajaxGet(url, fn) {
    $.ajax({
        type: 'get',
        url: baseUrl + url,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        success: function(res) {
            if (res.code == 0) {
                fn(res.data)
            }
        }
    });
}

function ajaxPost(url, data, fn) {
    $.ajax({
        url: baseUrl + url,
        type: 'post',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(res) {
            if (res.code == 0) {
                fn(res.data)
            }
        }
    })
}



/**
 * 首页 获取浏览器参数
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}

/**
 * 合作伙伴logo
 */

var url = '/index/business/partners/list'
var data = {
    "page": {
        "page_index": 1,
        "page_size": 100
    }
}
ajaxPost(url, data, function(data) {
    var html = ''
    var bps = data.bps
    var len = bps.length
    for (var i = 0; i < len; i++) {
        html += '<div class="am-u-md-2 am-u-sm-4 customer-box">' + 
                    '<a href="javascript:;">' + 
                        '<img class="normal-logo" src="'+ bps[i].logo+'" alt="" style="display: inline;">' +
                        '<img class="am-active" alt="" src="'+ bps[i].logo+'" style="display: none;">' +
                    '</a>' + 
                '</div>'
    }
    $('.customer-logo .am-g').html(html)
})

/**
 * 页脚
 */
let get_web_setting_url = '/index/Setting/get'
ajaxPost(get_web_setting_url, "", function(data) {
    $("#rectangle_logo").attr('src', data.setting.rectangle_logo);
    $("#m-logo").attr('src', data.setting.rectangle_logo);
    $("#square_logo").attr('src', data.setting.square_logo);
    $("#name").text(data.setting.name)
    $("#hotline").text("服务专线: " + data.setting.hotline)
    $("#callUs").html("服务专线: <strong>" + data.setting.hotline+"</strong>, <br> Monday - Friday, 8am - 7pm")
    $("#enterprise_email").text(data.setting.enterprise_email)
    $("#sendMessage").html(data.setting.enterprise_email+",<br>期待您的来信...")  
    $("#address").text(data.setting.address)
    $("#visitUS").text(data.setting.address)
})
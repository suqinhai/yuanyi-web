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



var baseUrl = 'http://www.luckyagr.com:8089'

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

function ajaxPostV2(url, data, success, fail) {
    $.ajax({
        url: baseUrl + url,
        type: 'post',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(res) {
            if (res.code == 0) {
                success(res.data)
            }else{
                fail(res.code, res.msg)
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
    var logoHtml = ''
    var bps = data.bps
    var len = bps.length
    for (var i = 0; i < len; i++) {
        html += '<div class="am-u-md-2 am-u-sm-4 customer-box">' +
                    '<a href="javascript:;">' +
                        '<img class="normal-logo" src="'+ bps[i].logo+'" alt="" style="display: inline;">' +
                        // '<img class="am-active" alt="" src="'+ bps[i].logo+'" style="display: none;">' +
                    '</a>' +
                '</div>'
        logoHtml += '<li><a href="javascript:;"><img class="am-thumbnail" src="'+ bps[i].logo +'"></a></li>'
    }
    $('.customer-logo .am-g').html(html)
    $('.am-thumbnails').html(logoHtml)
})

/**
 * 页脚
 */
let get_web_setting_url = '/index/Setting/get'
ajaxPost(get_web_setting_url, "", function(data) {
    var companyIntro='"Lanying" one-stop service platform'
    $("#rectangle_logo").attr('src', data.setting.rectangle_logo);
    // $("#m-logo").attr('src', data.setting.rectangle_logo);
    $("#square_logo").attr('src', data.setting.square_logo);
    $("#name").text(data.setting.name)
    $("#hotline").text("服务专线: " + data.setting.hotline)
    $("#callUs").html("服务专线: <strong>" + data.setting.hotline+"</strong>, <br> Monday - Friday, 8am - 7pm")
    $("#enterprise_email").text(data.setting.enterprise_email)
    $("#sendMessage").html(data.setting.enterprise_email+",<br>期待您的来信...")
    $("#address").text(data.setting.address)
    $("#visitUS").text(data.setting.address)
    $(".footer_about--text").text(companyIntro)
})

let get_solution_catagory='/article/category/list'
ajaxPost(get_solution_catagory,"",function(data){
    // data.categories.unshift({id:1111,name:'全部'},{id:1112,name:'ceshi'},{id:1113,name:'ceshi'},{id:11134,name:'ceshi'})
    var sulution_menu_item=""
    var footer_solution=""
    var categories=data.categories
    for (var i = 0;i<categories.length ;i++) {
        sulution_menu_item += '<li data-id="' + categories[i].id + '" class="menu-item"><a href="./solution.html?id='+ categories[i].id+'">'+categories[i].type_name+'</a></li>'
        footer_solution+='<li data-id="' + categories[i].id + '" class="footer_navigation--item"><a href="./solution.html" class="footer_navigation--link">' +categories[i].type_name+'</a></li>'
    }
    $('.solution-category').html(sulution_menu_item)
    $('.footer_solution').html(footer_solution)
})

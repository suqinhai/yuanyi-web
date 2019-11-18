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
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(res) {
            if (res.code == 0) {
                fn(res.data)
            }
        }
    })
}
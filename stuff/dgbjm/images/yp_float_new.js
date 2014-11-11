$(function(){})
	$(window).scroll(function() {
		var scrollTop = window.pageYOffset
			|| document.documentElement.scrollTop
			|| document.body.scrollTop
			|| 0;
		var curTop = show(document.getElementById('FD'));
		if (curTop-scrollTop<=0) {
			var far = $('#FD2').parent();
            $('#FD2').width(far.width());
			$('#FD2').css('display','block');
		}else{
			$('#FD2').css('display','none');
		}
//		if(scrollTop >= 358){
//			$('.G_hy_nav').addClass('fixed-case');
//		}else{
//			$('.G_hy_nav').removeClass('fixed-case');
//		}
	});

function show(obj){
        var iTop = obj.offsetTop;
        while(obj = obj.offsetParent){
            iTop += obj.offsetTop
        }
		return iTop;
//        alert("距顶部"+iTop+"px")
    }
function avgmenu() {
	var mulen = $("#FD li").length;
	if (typeof ($("#menu3").html())=='string') {
		var avg = (99/mulen+1).toFixed(2);
	}else{
		var avg = (99/mulen).toFixed(2);
	}
	$("#FD li").each(function () {
		if ($(this).attr('id')=='menu3') {
			$(this).css('width',avg82+'%');
		}else{
			$(this).css('width',avg+'%');
		}
	});
	$("#FD2 li").each(function () {
		if ($(this).attr('id')=='menu_3') {
			$(this).css('width',avg82+'%');
		}else{
			$(this).css('width',avg+'%');
		}
	});
}
function AddFavorite(sURL, sTitle) {   
    try {   
        window.external.addFavorite(sURL, sTitle);   
    } catch (e) {   
        try {   
            window.sidebar.addPanel(sTitle, sURL, "");   
        } catch (e) {   
            alert("加入收藏失败！，请使用Ctrl+D进行添加");   
        }   
    }   
}
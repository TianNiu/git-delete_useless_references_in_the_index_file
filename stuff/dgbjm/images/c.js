if(typeof(t_url) == 'undefined'){
	var t_url =top.location.href;
	var domain=t_url.indexOf('ls.com')>-1?'ls.com':'liansuo.com';	
	//t_url=t_url.replace("#","?");//改用#comeid
	var referrerurl=document.referrer;//来访页面
	var a_url = t_url.split("?");
	var _str = a_url[1];
	if(typeof(_str) != 'undefined')
	{
	  var _a = _str.split("&");
		for(var i = 0; i < _a.length; i++)
		{
			_a[i] = _a[i].split("=");
			if(_a[i][0].toLowerCase() == "qid")
			{
				var __qid = _a[i][1];
			}
			if(_a[i][0].toLowerCase() == "bannerid")
			{
				var __bid = _a[i][1];
			}
			if(_a[i][0].toLowerCase() == "comeid")
			{
				var __cid = _a[i][1];
			}
			if (_a[i][0].toLowerCase() == 'kw') {
				var __kid = _a[i][1];
			}
		}
	}
	if(isNaN(__qid) == true)
	{
		var __qid = '0';
	}
	if(isNaN(__bid) == true)
	{
		var __bid = '0';
	}
	if(isNaN(__cid) == true)
	{
		var __cid = '0';
	}
	if (isNaN(__kid) == true) {
		var __kid = '0';
	}
	var _Geturl = 'http://logs.'+domain+'/log.php?qid='+__qid+'&bid='+__bid+'&cid='+__cid+'&kid='+__kid+"&nurl="+encodeURIComponent(t_url)+"&r="+encodeURIComponent(referrerurl);
		document.write("<iframe  src="+_Geturl+" width = '0' height = '0' ></iframe>");
	//全局显示微信二维码
	if (typeof jQuery != 'undefined') {
		if(t_url == 'http://jiameng.'+domain+'/' || t_url ==  'http://www.'+domain+'/manager/index.php?action=317&act=view&cid=854'){
				document.writeln(unescape("%3Cscript src=\"http:\/\/www."+domain+"\/html\/js\/jiameng\/fenxiang.js\"type='text/javascript'%3E%3C/script%3E"));	
		}else{
			if(t_url.indexOf('liansuo.com')>-1){
				document.writeln(unescape("%3Cscript  src=\"http:\/\/www."+domain+"\/html\/js\/smalltools.js\" type='text/javascript'%3E%3C/script%3E"));
			}
		}	 
	}	 
	//留言板获取
	var urlstr="";function showly(){if($("#dialogbox").length > 0){urlstr=$("#dialogbox").attr("src");}if($("#iframeid").length > 0){urlstr=$("#iframeid").attr("src");}if(urlstr!=''){	var tempint=urlstr.indexOf('?',urlstr);	var tempsubstr=urlstr.substr(tempint);lsBox.iFrame({src:'http://www.'+domain+'/gbook/gbook_dialogbox_760.php'+tempsubstr,modal:true,show:true,fixed:true,lsclose:true,outerc:true,title:'',w:760,h:420,center:true});}}
}
//商桥
//var myDate = new Date();var hour=myDate.getHours();
var myDate = new Date();
var timestr=(myDate.getTime()/1000+3600*8)%86400;
var lcaourl=window.location.href;
if(lcaourl!='http://www.liansuo.com/'&&lcaourl!='http://liansuo.com/'&&lcaourl!='http://www.liansuo.com/index.html'&&lcaourl.indexOf('200.')<0&&lcaourl.indexOf('http://m.liansuo.com')<0&&typeof(_bdhmProtocol) == 'undefined'&&timestr>30600&&timestr<84600){
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fd97f4f27aef16805ed7772f8c688cee2' type='text/javascript'%3E%3C/script%3E"))
}
//baidutongji
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2930b4a11577d5e0ea5db73088a601f5' type='text/javascript'%3E%3C/script%3E"));
///shangqiao
/////连锁商桥
if(t_url.indexOf("comeID=20460")!='-1'){
		document.write(unescape("%3Cscript src='http://www.liansuo.com/html/js/onebox_ad.js' type='text/javascript'%3E%3C/script%3E"));		
}

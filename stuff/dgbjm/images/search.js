//document.writeln('<script src="http:\/\/www.ls.com\/index.php?act=search&opt=geti" type="text\/javascript"><\/script>');
function getIndustry(val,id)
{
    var webdomain = location.host;
    var subid = 'sub'+id;
    document.getElementById(subid).length=1;
        var industry=getindustry(val)
        for (var i=0; i<industry.length; i++) {
            jQuery("<option value='"+industry[i][0]+"'>"+industry[i][2]+"</option>").appendTo('#'+subid);
        }
}
jQuery(function() {
		try
        {
          if(typeof(eval(getindustry))=="function")
          {
              var industry=getindustry(0)
        jQuery("*[id^=industry]").each(function () {
            for (var i=0; i<industry.length; i++) {
                jQuery(this).append("<option value='"+industry[i][0]+"'>"+industry[i][2]+"</option>")
            }

        })
        jQuery("*[id^=joinline]").each(function () {
            for (var i=0; i<arr_joinline.length; i++) {
                jQuery(this).append("<option value='"+arr_joinline[i][2]+","+arr_joinline[i][3]+"'>"+arr_joinline[i][1]+"</option>")
            }
        })
          }
        }catch(e)
        {
       }







})
function compair() {
    var domain = location.host;
    var darr = domain.split('.');
    domain = darr[1]+'.'+darr[2]
    var idstr = "";
    jQuery(":checkbox:checked").each(function () {
        idstr +=jQuery(this).val()+',';
    })
    if (idstr=='') {
        alert("请选择要对比的项目！");
    }else{
        idstr = idstr.substring(0,idstr.lastIndexOf(","));
        if (idstr.indexOf(",")<0) {
            alert("请至少选择两个项目进行对比！");
            return false;
        }
        window.open("http://www."+domain+"/index.php?act=search&opt=compare&info="+idstr,'target');
    }

}
function remove(id) {
    window.location.href="index.php?act=search&opt=compare&search="+id;
}
function checkcomp(obj) {
    if (jQuery(":checkbox:checked").length>5) {
        obj.checked = false;
        alert("您已选择5个项目，候选项目不能超过5个");
    }

}
function dosearch(id) {
    document.forms[0].industry.value=id;
    document.forms[0].subindustry.value='';
    document.forms[0].joinline.value='';
    document.forms[0].keywd.value='';
    document.forms[0].submit();
}
function doSearch(obj) {
     var industry = '0';
     var subindustry = '0';
     var joinline = '0';
     var keywd = '0';
     var page = '1';
     var webdomain = location.host;
     webdomain = webdomain.substring(webdomain.indexOf(".")+1,webdomain.length);
    //取1级行业
    var indus = obj.industry;
    if (indus!=undefined) {
        if (indus.value!='') {
            industry = indus.value;
        }
    }
    //取二级行业
    var subindus = obj.subindustry;
    if (subindus!=undefined) {
        if (subindus.value!='') {
            subindustry = subindus.value;
        }
    }
    //取加盟额度
    var joinl = obj.joinline;
    if (joinl!=undefined) {
        if (joinl.value!='') {
            joinline = joinl.value;
        }
    }
    //取关键字
    var kw = obj.keywd;
    if (kw!=undefined) {
        if (kw.value!=''&&kw.value!="请输入查询关键字") {
            keywd = kw.value;
        }
    }
    if(industry==0&&subindustry==0&&joinline==0&&keywd==0){
      obj.action = "http://search."+webdomain;
    }else
    obj.action = "http://search."+webdomain+"/"+industry+"-"+subindustry+"-"+joinline+"-"+keywd+"-"+page+".html";
    obj.method="post";
    obj.submit();
    return false;
}

function ckkw(obj) {
    if (obj.value.replace(/(^\s*)|(\s*$)/g, "")=='') {
        obj.value="请输入查询关键字";
    }
}
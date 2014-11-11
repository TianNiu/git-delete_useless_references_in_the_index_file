/************************************************
 *
 ************************************************/
//文件模块
var fs = require('fs-extra');
var util = require('util');
var cheerio = require('cheerio');
var findit = require('findit');

/* 变量集合*/
var _g = {
    "project_path": "projects",
    "src_foldername": "images"
};
/**
 * 获得index.html文件的绝对路径
 * @param  {[type]}   projects_path [description]
 * @param  {Function} next          [description]
 * @return {[type]}                 [description]
 */
function findIndexFile(projects_path, next) {
    var finder = findit(projects_path);
    finder.on('file', function(file, stat) {
        /* 匹配所有路径下的index.html 有效*/
        // if (/(\\|\/)index.htm.?/gi.test(file)) {
        //     //console.log(file);
        //     next(file);
        //     //console.log("");
        // }
        if (/.+\.js/i.test(file)) {

        }
        /* 匹配下下级目录下的index.htm(l)文件*/
        if (/projects(\\|\/)[0-9a-zA-Z-\.]*(\\|\/)index.htm.?/gi.test(file)) {
            //console.log("i am the only one: "+file);
            //finder.stop();
            next(file);
            //console.log("");
        }
    });
};

function scanUselessRefers(scan_folder_path, arr_refers_inuse, next) {
    /* 当前的refers数组中的路径都不是绝对路径，首先进行转换*/
    /*var so_ele = arr_refers_inuse[2];
    console.log("the images posited at: " + so_ele.indexOf("images"));
    var now_ele = so_ele.slice(so_ele.indexOf("images") + "images".length + 1);
    console.log("now ele is: " + now_ele);
    console.log("arr_refers_inuse is: " + arr_refers_inuse.toString());*/
    /* 定义转换之后的数组,可以直接读取的绝对路径数组*/
    var new_arr_convented=[];
    arr_refers_inuse.forEach(function(ele,index){
        var pos=ele.indexOf(_g.src_foldername);
        /* 路径中存在images*/
        if(pos!==-1){
            console.log("the "+index+"is : "+ele.indexOf(_g.src_foldername));
            var now_ele = ele.slice(pos + "images".length + 1);
            //now_ele.replace(/(\\|\/)/g,"\\");
            /* 加上之前的路径构成全部路径,replace用于重置路径中的斜杠*/
            new_arr_convented.push(scan_folder_path+"\\"+now_ele.replace(/(\\|\/)/g,"\\"));
            /* 不加前面的路径，只压入refers的文件名*/
            //new_arr_convented.push(now_ele);
        }
    });
    console.log("new_arr_convented is: "+new_arr_convented);
    var finder = findit(scan_folder_path);
    finder.on('file', function(file, stat) {
        if (/([0-9a-zA-Z-\.]*(\\|\/))+.*\.(css|js)/gi.test(file)) {
            console.log(file);
            if(new_arr_convented.indexOf(file)==-1){
                /* 如果在index文件引用中没有出现该文件，则删除*/
                console.log("i am not the same file : ");
                //console.log(file);
                fs.remove(file, function(err) {
                    if (err) {
                        console.error(err);
                    }else{
                        console.log("删除成功"); 
                        //console.log("来自文件夹"+scan_folder_path+"通知");   
                    }
                    

                });
                //console.log(new_arr_convented);
            }
            next(file);
        }
        /*if (file.) {
            console.log(file);
            next(file);
        }*/

    });
    
};

/**
 * 从index.html文件内容中获得其脚本和外链样式的引用
 * @param  {[type]}   filepath [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getRefersFromIndexFile(filepath) {
    var str_html = fs.readFileSync(filepath).toString();
    /* cheerio get html content*/
    var $ = cheerio.load(str_html, {
        decodeEntities: false
    });
    /* pending to be returned*/
    var output = {
        js_srcs: [],
        css_links: []
    };
    $("script[src]").each(function(index, ele) {
        output.js_srcs.push($(ele).attr("src"));
    });
    $("link[rel=stylesheet]").each(function(index, ele) {
        output.css_links.push($(ele).attr("href"));
    });
    return output;
    //callback(output);
};
/**
 * 得到资源文件的绝对路径
 * @param  {[type]} filepath [description]
 * @return {[type]}          [description]
 */
function createFullSrcPath(filepath) {
    var filepath_arr = filepath.split("\\");
    filepath_arr.length = 2;
    filepath_arr.push(_g.src_foldername);
    //var src_fullpath = filepath_arr.join("\\");
    return filepath_arr.join("\\");
};
/* */
module.exports = function() {
    /* 获得的filepath中包含其属于哪个项目文件夹(名称)*/
    findIndexFile(_g.project_path, function(filepath) {
        /* 资源文件夹路径*/
        var src_fullpath = createFullSrcPath(filepath);
        console.log("hah  the src path is:" + src_fullpath);
        var all_links = getRefersFromIndexFile(filepath);
        /* 将获得的字面量对象扁平化到一个数组中*/
        var all_refers_in_indexfile=[];
        for (var item in all_links) {
            //console.log("item is:" + all_links[item]);
            for(var inner_item in all_links[item]){
                all_refers_in_indexfile.push(all_links[item][inner_item]);
                //console.log("i am for var item: "+all_links[item][inner_item]);
            }
        }
        /* 扫描并删除无用的链接文件*/
        scanUselessRefers(src_fullpath,all_refers_in_indexfile,function(){

        });
        /* the src folder name*/
        //_g.src_foldername
        /* 从链接数组中获取images下的每个文件名*/
        
        //console.log("my name is :" + all_links.toString());
    });
};

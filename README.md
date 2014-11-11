git-delete_useless_references_in_the_index_file
===============================================

##概述
* 扒页面之后删除index文件的无用的reference,目前只是删除js和css文件。
* 处理的是手动删除页面多余html之后，保存下来的文件夹中(一般是index_files)中也一起保存下来的无用的js和css。

##功能实现
* 获取index.htm(l)文件并读取其中的js和link(stylesheet)的引用，存放在有效引用集合中。
* 读取资源文件夹(以images为例)中的资源，使用node每次获取到一个js或者css，查看它是否在有效引用集合中。没有则予以删除。

##项目说明
* 部分细节未完善。

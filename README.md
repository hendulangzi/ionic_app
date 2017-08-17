#ionic_app
###分享ionic 主要用于分享ionic出现的问题。
* 1、[ionic2+angular2中踩的那些坑](https://github.com/hendulangzi/ionic_app/blob/master/no1.md)
* 2、[angular中文文档](https://angular.cn/docs/ts/latest/quickstart.html)
* 3、[TypeScript文档](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)
* 4、[ionic2文档](http://ionicframework.com/docs/v2/)
* 5、[Ionic2入坑基础教程和安装指南](http://www.open-open.com/lib/view/open1476256273813.html)
* 6、[理解ionic2 + angular2开发方案](http://www.tuicool.com/articles/JZJBBjr)
* 7、[Ionic打包过程下载Gradle失败的解决方法](http://blog.csdn.net/leishi8819/article/details/52601113)
* 7-1、[cordova使用Gradle构建下载maven太慢，使用阿里云镜像](http://solebillow.com/home/article/detail/id/78.html)
* 8、[android 离线包下载地址  有最新的sdk22和sdk23](http://mirrors.neusoft.edu.cn/android/repository/)
* 9、[android开发环境集成版 adt下载](http://bbs.phonegap100.com/thread-1456-1-1.html)
* 10、[(ngcordova文档)获取通讯录里的信息](http://ngcordova.com/docs/plugins/contacts/)
* 11、[ionic实用功能->—点击拨打电话功能](http://www.ionic.ren/2016/01/15/ionic%E5%AE%9E%E7%94%A8%E5%8A%9F%E8%83%BD%E5%85%AB-%E7%82%B9%E5%87%BB%E6%8B%A8%E6%89%93%E7%94%B5%E8%AF%9D%E5%8A%9F%E8%83%BD/)
* 12、[Cannot read property 'substr' of undefined] 找到remainingLines[0] 替换为remainingLines[0]||""
* 13、[ionic2跨域问题](http://www.jianshu.com/p/a57e5d0345ce)
* 14、[版本更新](https://github.com/driftyco/ionic-cli)





### ionic 创建文件ionic g page orderDetail --pagesDir src/pages/xxx/

## ionc2 拍照实现中，错误提示：cordova not avalable，解决方案为更新cordova的版本到5.0以上，最好是更新到最新版本,同时只有在手机上或者模拟机上运行才能调出摄像头。



# 编译安装html: npm run build

# ionic 装不上，提示什么uuid used 
  修改C:\Users\Administrator\.npmrc 把内容清空
  
 # ionic 创建项目
  http://ionicframework.com/docs/cli/start/
 # ios 安装
  cordova add ios 无法安装时，cordova 版本改为4.0.0或低版本
 # 发布并检查代码
  npm run build --prod
 # npm 安装失败解决办法 1：npm cache verify ，2：npm cache clean
  https://github.com/npm/npm/issues/16861
 # ios 调试
 http://blog.csdn.net/svygh123/article/details/51218886
 # ios模拟器不能用键盘输入怎么解决
  让我想起了hello world 。选中模拟器然后看在MAC机上方模拟器菜单“Hardware”---“keyboard”---“Connect Hardware Keyboard”。勾选一下。就可以取消和键盘的关联。

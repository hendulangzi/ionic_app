#  ionic2+angular2中踩的那些坑
好久没写什么东西了，最近在做一个ionic2的小东西，遇到了不少问题，也记录一下，避免后来的同学走弯路。

之前写过一篇使用VS2015开发ionic1的文章，但自己还没摸清门道，本来也是感兴趣就学习了一下。后来看到TypeScript，觉得这个真不错，强类型，有点类似c#的感觉，而且如果写错了编辑器都可以感知出来，于是就开始看ionic2。ionic2是基于angular2的，语法跟以前有了很大的变化。但自己写原生app写惯了，反而觉得这种方式更方便一些。每个页面都是一个组件，组件里也可以套组件，html标签都可以自定义，也就可以无限扩展。虽然ionic2和angular2都还没发布正式版，但手头的这个小东西用一下也未尝不可，就开始动工了。

先列一下学习资源：

TypeScript中文手册，这个网站应该是官方团队的中国人搞的，非常好，我看到的时候已经把英文版看完了，记不清的时候会再来翻一下，地址：https://www.gitbook.com/book/zhongsp/typescript-handbook/details

 

angular2中文手册，这个网站出来不久，对学习非常有帮助，找到的时候也是已经把英文版文档看了一半多了，而且这个网站好的地方是可以同时把中文和英文对照着看。地址：https://angular.cn/docs/ts/latest/quickstart.html

 

ionic2文档，一些指令基本跟1代类似，但用法有些变化，地址：http://ionicframework.com/docs/v2/

 

开发工具强烈推荐VS Code，现在已经非常好用了，对TypeScript的智能感知甚至比VS2015都要好。还需要安装一些插件，我安装了和angular2有关的插件，可以快速生成一些代码段。下载地址：https://code.visualstudio.com 插件可以在商店里直接搜，很方便。

 

这篇文章不想再从hello world开始了，如果有耐心的话，照着官方文档敲一遍都能正常运行起来。参考这个文档：http://ionicframework.com/docs/v2/getting-started/installation/

前提是要安装好nodejs。用npm安装ionic和Cordova。就可以用ionic start projectname --v2 来开始项目了。这里要注意下，因为GFW的存在，有很大可能性会下载失败，因为ionic2基于angular2，需要下很多依赖，我新建一个项目后，node_modules目录大小是80多m，所以下载一定要有耐心，或者挂VPN。

新建项目后可以用ionic serve命令运行起来，可以在浏览器里看效果。

如果要添加Android平台支持，用ionic platform add android命令。

部署到真机的话，用ionic run android命令。或者ionic build android来编译。

 

# 问题一：因gradle下载不到导致编译失败
编译的时候会遇到gradle下载不下来的问题，导致编译失败。

解决办法：手动下载gradle，http://downloads.gradle.org/distributions/gradle-2.2.1-all.zip

修改 appname\platforms\android\cordova\lib\builders 目录下的GradleBuilder.js，找到类似下面的地方：

var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'http\://services.gradle.org/distributions/gradle-2.2.1-all.zip';


修改为本地地址，我是放在了iis下面，改成了localhost。就能找到了。

 

# 问题二：打包错误，提示Unable to start the daemon process.
这个问题找了很多原因，有的说要改gradle.properties，也不管用，后来我删掉了D:\yourusername\.gradle文件夹，重新编译才过。如果失败一次的话，重新编译的话还是会失败，只能删掉重新来。

以上这两个问题是打包到Cordova的时候遇到的，还有一些其他的问题就没记下来，比较大的原因就是网络没下载到某些文件所致。我们是已经有了一个Cordova的平台，只做里面的html5插件即可，所以打包这部分没再仔细研究。

 

# 问题三：Click Delays 点击延迟问题
熟悉前端的应该都知道，某些元素在click事件会有300ms的延迟，在ionic里也是只有button和a可以立即响应的。如果要给其他的元素比如div增加click事件，给该元素加上tappable属性即可解决。

 

# 问题四：http请求跨域问题
在ionic2里使用angular2的HTTP请求api时，如果在浏览器里运行，经常会遇到跨域问题，比如：

XMLHttpRequest cannot load http://www.xxx.com/clt/jsp/v3/channelContList.jsp?n=25950&WD-UUID=864819028898243&pageidx=1. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8101' is therefore not allowed access.
这是因为chrome不允许跨域访问。解决方法很简单，给chrome装一个ripple扩展，然后点击ripple，选择启用，就可以跨域访问了。

如果是自己同时开发api和app，很有可能api也是部署在本机上，比如api地址是http://localhost/api，ionic serve跑起来后是http://localhost:8100，这样在调用的时候又会遇到Internet Server Error的问题，比如：

Error code is:xhr_proxy?tinyhippos_apikey=ABC&tinyhippos_rurl=http%3A//localhost%3A30673/ap‌​i/user/Get%3Fjson rippleapi.herokuapp.com Status Code:500 Internal Server Error I'am getting data from my localhost post adress:localhost:30673/api/user/Get'; It is working well in browser . And getting data from localhost:30673/api/user/Get. But in ripple it tries to get data from There: xhr_proxy?tinyhippos_apikey=ABC&tinyhippos_rurl=http%3A//localhost%3A30673/api/u‌​ser/Get%3Fjson rippleapi.herokuapp.com
解决方法也很简单，ripple设置右上角有一个Cross Domain Proxy，有三个选择，Disabled、Local和Remote，通过字面意思就可以看出来分别对应禁用、本地和远程访问，如果是访问本机的api的话，一般设置为Disabled就可以了。如果访问远程主机的api，一般要设置为Remote或Disabled。

 

# 问题五：引用第三方js库的问题
开发过程中不可避免的要用到第三方js库，如果直接在TypeScript里写的话，编译器是认不出来的，会报错，编译也通不过。外部的类必须要import进来才可以用。TypeScript需要一个声明文件 d.ts来知道第三方库的接口。可参考 https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Writing%20Definition%20Files.html

如果用流行的库的话，不用我们自己写d.ts，有个开源的项目已经做好了：https://github.com/yanxiaodi/DefinitelyTyped

自己写的话很麻烦，特别是我用了一个项目平台的库，函数也不少，自己写的话也费时间，后来想到一个办法，TypeScript的编译器支持自动生成d.ts，可以用命令

tsc --declaration my.ts来生成，这个命令是给ts文件生成声明的，但TypeScript原生支持js，可以把第三方的js改后缀名为ts，tsc也可以生成。这里我又遇到一个问题，我的库里又调用了Cordova的一些函数，编译的话tsc找不到，解决办法是复制一份js，将所有认不出的东西都注释掉，再生成就可以了。反正这个命令只是生成一个声明文件，具体的js只要引入进来就可以用。用这个命令很快就可以生成一份声明了，然后在用到的地方用

/// <reference path="../sdk.d.ts"/>
这样的方式引用。注意一定要写在文件第一行。

 

# 问题六：开发模式选择
这个问题只是我做的项目的特殊情况，可能大部分人遇不到。我们的平台封装了Cordova的http请求，调用api必须用指定的方法才可以。但在chrome里调试的时候是加载不到Cordova的，于是我想了一个办法，增加一个全局的isDebug变量，封装一个全局的http方法，在debug模式时调用angular2的HTTP来请求，正式运行时才用Cordova的。其他的service都要调用这个方法，就无需关注是什么模式了，如果真机运行的话就改一下isDebug的值就可以了。

 放一段代码：

 

复制代码
 1 /// <reference path="../sdk.d.ts"/>
 2 import {Injectable, Component} from '@angular/core';
 3 import {HTTP_PROVIDERS, Http, Response} from '@angular/http';
 4 import {Headers, RequestOptions} from '@angular/http';
 5 import {AppGlobal} from '../app-global';
 6 
 7 
 8 /**
 9  * HttpRequestService
10  */
11 @Injectable()
12 @Component({
13     providers: [HTTP_PROVIDERS,Http]
14 })
15 export class HttpRequestService {
16     constructor(private http: Http) {
17 
18     }
19 
20 
21     /**
22      * get方法 获取json对象
23      * 
24      * @template T
25      * @param {string} server
26      * @param {string} url
27      * @returns {Promise<T>}
28      */
29     get4Json<T>(server: string, url: string): Promise<T> {
30         if (AppGlobal.getInstance().isDebug) {
31             return this.http.get(server + url).toPromise()
32                 .then(response => response.json());
33         }
34         else {
35             let promise: Promise<T> = new Promise<T>((resolve, reject) => {
36                 //由于SDK必须要求传入一个参数数组，因此必须传递一个空数组作为参数
37                 let paramJson = [];
38                 SDKRequest.get4Json(server, url, paramJson, function (resp) {
39                     resolve(resp);
40                 }, function (error) {
41                     reject(error);
42                 });
43             });
44             return promise;
45         }
46     }
47 
48 }
复制代码
 

angular2的http是用的Promise，但平台提供的方法用的callback，于是需要在这里将回调函数的方式改为Promise的方式，不管是不是debug模式都返回一个Promise，这样上层调用的时候就方便了。我是看的这里：https://basarat.gitbooks.io/typescript/content/docs/promise.html

在angular2的官方文档中，是推荐用Observable模式的，但我还没有搞明白怎么将callback转为Observable，目前也没有时间仔细研究这块，所以还是继续用Promise好了。

 

#  问题七：单例模式
单例是经常用到的，我参考一个老外的代码用了一个单例，用来保存一些全局变量：

复制代码
import {UserInfo} from './model/user';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();

    /**是否是调试状态 */
    isDebug: boolean = true;
    server: string = this.isDebug ? "http://localhost" : "http://www.xxx.com";

    apiUrl: string = "/MobileApi/api";

    /**当前用户信息 */
    currentUserInfo: UserInfo = new UserInfo();
    /**分页页数 */
    pageSize: number = 10;

    constructor() {
        if (AppGlobal.instance) {
            throw new Error("错误: 请使用AppGlobal.getInstance() 代替使用new.");
        }
        AppGlobal.instance = this;
    }

    /**
     * 获取当前实例
     * 
     * @static
     * @returns {AppGlobal}
     */
    public static getInstance(): AppGlobal {
        return AppGlobal.instance;
    }


}
复制代码
零零散散写了一些，不知道有没有人遇到过类似的问题。目前用ionic2做正式项目的应该还不多，希望用过的同学多多交流。^_^

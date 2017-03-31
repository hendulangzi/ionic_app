import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import {WelcomePage} from "../pages/welcome/welcome";
import {SignInPage} from "../pages/sign-in/sign-in";
import {QueryPage} from "../pages/query/query";

@Component({
  templateUrl: 'app.html',
  providers:[Storage]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // make HelloIonicPage the root (or first) page
  rootPage: any = WelcomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage
  ) {
    //this.initializeApp();
    //// set our app's pages
    //this.pages = [
    //  //{ title: 'Hello Ionic', component: HelloIonicPage },
    //  //{ title: 'My First List', component: ListPage },
    //  { title: 'login', component: LoginPage },
    //  { title: 'WelcomePage', component: WelcomePage }
    //
    if(localStorage.getItem('username')==null||localStorage.getItem('username')=='null'){
      this.storage.get('firstIn').then((result) => {
        if(result){
          this.rootPage = SignInPage;
        }else{
          this.storage.set('firstIn', true);
          this.rootPage = WelcomePage;
        }
      })
    }else{
      this.rootPage = QueryPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  isLogin(){
    return false;
  }
}

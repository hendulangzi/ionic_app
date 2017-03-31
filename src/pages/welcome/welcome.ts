import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignInPage} from '../sign-in/sign-in';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  goToHome(){
    //this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(SignInPage);
  }

}

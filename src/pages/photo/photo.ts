import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

/*
  Generated class for the Photo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})
export class PhotoPage {

  userInfo={
    img:'assets/img/avatar_default.png',
    username:'',
    tel:''
  };
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController
  ) {
    this.userInfo = this.navParams.get('data');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPage');
  }
  setValue(that){
    alert(that);
  }
  desk(){
    window.open('http://www.baidu.com', '_blank');
  }
  share(message, subject?, file?, url?) {
    SocialSharing.share(message, subject, file, url).then(() => {
      // Success!

    }, (err) => {
      // Error!
      alert('错误：分享失败！' + err);
    });
  }
}

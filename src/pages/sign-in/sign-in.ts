import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { RegPage} from '../reg/reg';
import { QueryPage} from '../query/query';
import { HttpServies} from '../../providers/http-servies';

/*
  Generated class for the SignIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
  providers:[HttpServies]
})
export class SignInPage {

  userInfo={
    'userName':'',
    'password':''
  }
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpServies:HttpServies,
      public alertCtrl:AlertController
  ) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  reg(){
    this.navCtrl.push(RegPage);
  }
  signIn(){
    var param = 'userName='+this.userInfo.userName+'&password='+this.userInfo.password;
    this.httpServies.httpPost('UserInfo.signIn',param)
    .then(res=>{
      if(res.ret==200){
        if(res.data){
          var data = res.data;
          if(data.code==0){
            localStorage.setItem('username',data.info.username);
            localStorage.setItem('id',data.info.id);
            this.navCtrl.push(QueryPage);
          }else{
            this.showErro(data.msg);
          }
        }
      }else{
        this.showErro(res.msg);
      }
    })
    .catch(err=>{
      alert(err);
    });
  }
  showErro(err){
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Erro '+err,
      buttons: ['OK']
    });
    alert.present();
  }
}

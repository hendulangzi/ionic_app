import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { QueryPage} from '../query/query';
import { SignInPage} from '../sign-in/sign-in';
import { HttpServies} from '../../providers/http-servies';

/*
  Generated class for the Reg page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
  providers:[HttpServies]
})
export class RegPage {
  userInfo={
    'userName':'',
    'password':'',
    'regcode':'',
    'smscode':''
  }
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpServies:HttpServies,
      private alertCtrl:AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegPage');
  }
  reg(){
    var param = 'userName='+this.userInfo.userName+'&password='+this.userInfo.password
        +'&regcode='+this.userInfo.regcode+'&smscode='+this.userInfo.smscode;
    this.httpServies.httpPost('UserInfo.reg',param)
        .then(res=>{
          if(res.ret==200){
            if(res.data){
              var info = res.data;
              if(info.code==0){
                localStorage.setItem('username',info.username);
                localStorage.setItem('id',info.id);
                this.navCtrl.push(QueryPage);
              }else{
                this.showErro(info.msg);
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
  sign(){
    this.navCtrl.push(SignInPage);
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ActionSheetController } from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera,Contacts, Contact, ContactName,ContactFindOptions,ContactFieldType } from 'ionic-native';
import { PhotoPage} from "../photo/photo";
import { SignInPage} from "../sign-in/sign-in";
import { SocialSharing } from 'ionic-native';
import { HttpServies} from '../../providers/http-servies';

/*
  Generated class for the Query page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-query',
  templateUrl: 'query.html',
  providers:[HttpServies]
})
export class QueryPage {
   username:any;
  tel:any;
  item:any;
  idx:any;
  show_name=localStorage.getItem('username');
  tempData:any=[
    {'username':'报警电话','tel':'110','img':'assets/img/110.jpg'},
    {'username':'火警电话','tel':'119','img':'assets/img/119.jpg'},
    {'username':'急救电话','tel':'120','img':'assets/img/120.jpg'},
    {'username':'中国移动','tel':'10086','img':'assets/img/10086.jpg'},
  ];
  profilePicture:any="assets/img/avatar_default.png";
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public platform: Platform,
      public alertCtrl: AlertController,
      public actionSheetCtrl: ActionSheetController,
      public httpServies:HttpServies,
      public sanitizer: DomSanitizer
  ) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad QueryPage');
  }
  getContact(){
    let contact: Contact = Contacts.create();
    var options = new ContactFindOptions();
    options.filter = this.username;//查询字符
    options.multiple = true;
    if(!this.username){
      this.showErro('请输入姓名');
      return;
    }
    //options.hasPhoneNumber = true;
    //noinspection TypeScriptValidateTypes
    let fields:ContactFieldType[] = ['displayName','phoneNumbers','urls','photos'];
    Contacts.find(fields,options).then(v=>{
      this.onSuccess(v);
    },(err)=>{
      this.onError(err);
    })
  }

  onSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
      if(contacts[i]['_objectInstance'].phoneNumbers&&i<10){
        var img = "";
        img = contacts[i]['_objectInstance'].photos?contacts[i]['_objectInstance'].photos[0].value:"";
        this.tempData.unshift(
            {
              'username':contacts[i]['_objectInstance'].displayName,
              "tel":contacts[i]['_objectInstance'].phoneNumbers[0].value,
              "img":img?this.sanitizer.bypassSecurityTrustUrl(img):'assets/img/avatar_default.png'
            }
        )
      }
    }
  }
  onError(contactError) {
    alert('onError!');
  }
  presentActionSheet(items:any,idx=0) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择你的想法',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-camera' : null,
          handler: () => {
            this.item = items;
            this.idx = idx;
            this.onTirarFoto();
          }
        },{
          text: '选择照片',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
          handler: () => {
            this.item = items;
            this.idx = idx;
            this.chooseImage();
          }
        },{
          text: '取消',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'ios-close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  onTirarFoto() {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      sourceType:Camera.PictureSourceType.CAMERA,//拍照时，此参数必须有，否则拍照之后报错，照片不能保存
      correctOrientation: true  //Corrects Android orientation quirks
    }
    /**
     * imageData就是照片的路径，关于这个imageData还有一些细微的用法，可以参考官方的文档。
     */
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      //this.path = base64Image;//给全局的文件路径赋值。
      //this.profilePicture=base64Image;//给image设置source。
      if(this.item){
        this.item.img = base64Image;
        this.tempData.splice(this.idx,1,this.item);
      }else{
        this.profilePicture = base64Image;
      }
      //alert(this.path);
      /*  this.zone.run(() => this.image = base64Image);*/
    }, (err) => {
      // Handle error，出错后，在此打印出错的信息。
      alert( err.toString());
    });
  }
  chooseImage(){
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      var uid = this.item?this.item.id:0;
      var mobile = this.item?this.item.tel:this.tel;
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      var param = 'id='+this.item.id+'&base64encode='+base64Image+'&mobile='+mobile;
      this.httpServies.httpPost('UserInfo.upload',param)
          .then(res=>{
            if(res.ret==200){
              if(res.data){
                var data = res.data;
                if(data.code==0){
                  base64Image = res.data.info;
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
      //this.path = base64Image;
      if(this.item){
        this.item.img = 'data:image/jpeg;base64,'+base64Image;
        this.tempData.splice(this.idx,1,this.item);
      }else{
        this.profilePicture = 'data:image/jpeg;base64,'+base64Image;
      }
    }, (err) => {
      // Handle error
      alert(err);
    });
  }
  goToDetail(env){
    this.navCtrl.push(DetailPage);
  }
  createToDesktop(){
    var env = {'img':this.profilePicture,'username':this.username,'tel':this.tel};
    if(!this.username){
      this.showErro('请输入用户名');
      return;
    }
    if(!this.tel){
      this.showErro('请输入电话');
      return;
    }
    if(this.profilePicture=='assets/img/avatar_default.png'){
      this.showErro('请点击图片并上传图片');
      return;
    }
    this.navCtrl.push(PhotoPage,{data:env});
  }
  addToDesktop(env){
    //window.open('http://api.njxixi.com/niukun-api/?service=UserInfo.signIn&userName=456&password=222', '_blank');
    this.navCtrl.push(PhotoPage,{'data':env});
  }
  mostrarAlertaErro(err){
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Erro ao capturar foto',
      buttons: ['OK']
    });
    alert.present();
  }
  showErro(err){
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: 'Erro '+err,
      buttons: ['OK']
    });
    alert.present();
  }
  select(items:any,idx=0) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择你的想法',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '分享',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-share' : null,
          handler: () => {
            this.share(null,null, 'http://www.baidu.com/img/bdlogo.gif', null);
          }
        },{
          text: '注销用户',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-log-out' : null,
          handler: () => {
            localStorage.setItem('username',null);
            this.navCtrl.push(SignInPage);
          }
        },{
          text: '取消',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'ios-close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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

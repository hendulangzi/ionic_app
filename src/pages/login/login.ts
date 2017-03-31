import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName,ContactFindOptions,ContactFieldType } from 'ionic-native';

/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  selectedLogin: any;
  private imagem: string;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      private domSanitizer: DomSanitizer
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedLogin = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      alert(base64Image);
      //alert(this.path);
      /*  this.zone.run(() => this.image = base64Image);*/
    }, (err) => {
      // Handle error，出错后，在此打印出错的信息。
      alert( err.toString());
    });
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
  getMan(ev:any){
    let contact: Contact = Contacts.create();
    //contact.name = new ContactName(null, 'Smith', 'John');
    //contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    //contact.save().then(
    //    () => console.log('Contact saved!', contact),
    //    (error: any) => console.error('Error saving contact.', error)
    //);
    var options = new ContactFindOptions();
    options.filter = ev.target.value;//查询字符
    options.multiple = true;
    //options.hasPhoneNumber = true;
    //noinspection TypeScriptValidateTypes
    let fields:ContactFieldType[] = ['displayName','phoneNumbers'];
    Contacts.find(fields,options).then(v=>{
      this.onSuccess(v);
    },(err)=>{
      this.onError(err);
    });
  }
  onSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
      if(i<10){
        alert(contacts[i]['_objectInstance'].displayName
        +contacts[i]['_objectInstance'].phoneNumbers[0].value);
      }
      //for (var j = 0; j < contacts[i].organizations.length; j++) {
      //  alert(
      //      "Name: "        + contacts[i].organizations[j].name       + "\n" +
      //      "phoneNumbers: "  + contacts[i].organizations[j].phoneNumbers + "\n" +
      //      "Title: "       + contacts[i].organizations[j].title);
      //}
    }
};
  onError(contactError) {
    alert('onError!');
  };
  choosePhoto(){
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType:0,//0对应的值为PHOTOLIBRARY ，即打开相册
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image =  imageData;
      //this.path = base64Image;
      //this.profilePicture=base64Image;
      alert(base64Image);
    }, (err) => {
      // Handle error
      alert(err);
    });
  }
  createdShortcut(){
    window.open('http://baidu.com', '_blank', 'location=yes');
  }
}

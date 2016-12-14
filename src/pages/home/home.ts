import { Component } from '@angular/core';

import { LoadingController, AlertController } from 'ionic-angular';
import { Camera, Transfer } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  base64Image;
  fileID="";
    constructor(
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController
    ) {}
   accessGallery(){
     Camera.getPicture({
       sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
       destinationType: Camera.DestinationType.FILE_URI
      // destinationType: Camera.DestinationType.DATA_URL
      }).then((imageData) => {
        // this.base64Image = 'data:image/jpeg;base64,'+imageData;
        this.base64Image = imageData;
       }, (err) => {
        console.log(err);
      });
    }

    upload(){
  const fileTransfer = new Transfer();
  var options: any;

  options = {
     fileKey: 'avatar',//'file',
     fileName: this.base64Image.substr(this.base64Image.lastIndexOf('/') + 1),
    // fileName: 'image.jpg',
     mimeType: "binary/octet-stream",
     headers: {}
  };
  let loading = this.loadingCtrl.create({content:"Loading..."});
  loading.present();
  fileTransfer.upload(this.base64Image, encodeURI("https://protected-temple-59341.herokuapp.com/file/"), options)
   .then((data) => {
     loading.dismiss();
     console.log("Successful upload...");
     console.log("Code = " + data.responseCode);
     this.fileID= data.response;
   }, (err) => {
     // error
     loading.dismiss();
     let alert = this.alertCtrl.create({
        title: 'Cannot upload',
        subTitle: err.code,
        buttons: ['Dismiss']
      });
    alert.present();
     console.log("Failed to upload...");
     console.log("Code = " + err.code);
   })
}
  }

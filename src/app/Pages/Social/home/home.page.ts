import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicationService } from '../../../services/publication.service';
import { AuthResponse } from 'src/app/Auth/auth-response';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private authResponse : AuthResponse
  croppedImagePath = "";
  isLoading = false;
  token:string

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  /*publication = JSON.stringify({
    title: "Titulo de la publicacion",
    description: "Descrpccion 24 de septiembre"
  });
  publication2 = {}*/



  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private http: PublicationService,
    private nativeStorage : NativeStorage
  ) { }

  ngOnInit() {
    //this.getAccessDataUser();
  }

  /*private async getAccessDataUser(){
    await this.nativeStorage.getItem('AccessDataUser').then(
      data => {
        this.token = data.token_type + ' ' + data.access_token;
      },
      error => console.error(error)
    );
  }*/


  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {

      this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      
    }, (err) => {
      console.log(err);
    });

    

    /*this.http.postPublication(this.publication2, this.token ).subscribe(
      async ( Response : (any) ) => {
        console.log(Response);
      },
      ( Errors : (any) ) => {
        console.log(Errors);
      },
      () => {
        console.log("Termino");
        
      } 
    );*/

    
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

}

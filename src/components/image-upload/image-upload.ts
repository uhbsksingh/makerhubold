import { Component, Input } from '@angular/core';
import {
  ActionSheetController,
  Platform,
  ToastController,
  LoadingController,
  Loading
} from 'ionic-angular';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ImageDetail } from '../../providers/item/item.model';
import { CONFIG } from '../../core/config';

declare var cordova: any;

@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.html'
})
export class ImageUploadComponent {
  lastImage: string = null;
  loading: Loading;
  rows: Array<Array<ImageDetail>>;

  private _imageDetails: ImageDetail[];
  @Input()
  set imageDetails(data: ImageDetail[]) {
    this._imageDetails = data;
    this.loadImages();
  }

  get imageDetails(): ImageDetail[] { return this._imageDetails; }

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,

    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath
  ) {

  }

  ngOnChanges() {
    this.loadImages();
  }

  public loadImages() {
    this.rows = Array(Math.ceil(this.imageDetails.length / 2));

    let rowNum = 0;

    for (let i = 0; i < this.imageDetails.length; i += 2) {

      this.rows[rowNum] = Array();

      if (this.imageDetails[i]) {
        this.rows[rowNum][0] = this.imageDetails[i];
      }

      if (this.imageDetails[i + 1]) {
        this.rows[rowNum][1] = this.imageDetails[i + 1];
      }

      rowNum++;
    }

    console.log("this.grid", this.rows);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
      this.uploadImage();
    }, (err) => {
      console.log("error takepicture", err);
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      console.log("error copyFileToLocalDir", error);
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = [CONFIG.apiUrl, "image"].join("/");

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      httpMethod: "POST"
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log("before pushed");
      this.imageDetails.push(JSON.parse(data.response));
      console.log("pushed");
      this.loading.dismissAll();
      this.presentToast('Image succesfully uploaded.');
      this.loadImages();
    }, err => {
      console.log("err", err);
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

}

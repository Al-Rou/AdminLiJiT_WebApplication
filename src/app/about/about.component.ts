import {Component} from "@angular/core";
import {ReqresService} from "../services/reqres.service";


@Component({
  selector: 'about-page',
  templateUrl: './about.component.html'
})

export class AboutComponent{
  listOfAbout: About[] = [];
  firstEntryAbout: About | undefined;
  updateAboutWanted = false;
  changePhotoFormWanted = false;
  allowUpdate = false;
  objectToUpdateAbout: About | undefined;
  url: any;
  msg = '';
  selectedFile: File | undefined;
  base64textString = '';
  photoConfirmed = false;

  aboutId = 0;
  aboutTitle1 = '';
  aboutTitle2 = '';
  aboutContent1 = '';
  aboutContent2 = '';
  aboutImageAbout = '';
  aboutFacebook = '';
  aboutTwitter = '';
  aboutInstagram = '';
  aboutTelephone = '';
  aboutEmail = '';
  aboutShareLink = '';

  constructor(private reqresService: ReqresService) {

  }

  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.selectedFile = <File> event.target.files[0];
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }

    // reader.onload =this._handleReaderLoaded.bind(this);
    // reader.readAsBinaryString(this.selectedFile);

  }
  /*handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }*/
  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    //console.log(btoa(binaryString));
    //console.log(this.base64textString);
  }
  onConfirmPhotoAbout() {
    if (this.selectedFile !== undefined) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.selectedFile);
      this.photoConfirmed = true;
    } else {
      alert('No photo is chosen!');
      return;
    }
  }
  onUploadPhotoAbout(){
    this.objectToUpdateAbout = {
      id: this.aboutId,
      title1: this.aboutTitle1,
      title2: this.aboutTitle2,
      content1: this.aboutContent1,
      content2: this.aboutContent2,
      imageAbout: this.base64textString,
      facebook: this.aboutFacebook,
      twitter: this.aboutTwitter,
      instagram: this.aboutInstagram,
      telephon: this.aboutTelephone,
      email: this.aboutEmail,
      shareLink: this.aboutShareLink
    }
    // if(this.objectToUpdateAbout.imageAbout !== '') {
    //   alert('image is full');
    // }
    this.goForUploadPhoto(this.objectToUpdateAbout);
    this.changePhotoFormWanted = false;
  }
  async goForUploadPhoto(dtoAbout: About){
    (await this.reqresService.uploadPhotoForAbout(dtoAbout));
  }

  async getAboutContent(){
    (await this.reqresService.getAbout()).subscribe((res) => {
      //for(let j = 0; j < res.length; j++) {
        alert("About is taken");
        this.firstEntryAbout = {
          id: (res as any).id,
          title1: (res as any).title1,
          title2: (res as any).title2,
          content1: (res as any).content1,
          content2: (res as any).content2,
          imageAbout: (res as any).imageAbout,
          facebook: (res as any).facebook,
          twitter: (res as any).twitter,
          instagram: (res as any).instagram,
          telephon: (res as any).telephon,
          email: (res as any).email,
          shareLink: (res as any).shareLink
        }
        this.listOfAbout.push(this.firstEntryAbout);
        this.allowUpdate = true;

        this.aboutId = this.firstEntryAbout.id;
      this.aboutTitle1 = this.firstEntryAbout.title1;
      this.aboutTitle2 = this.firstEntryAbout.title2;
      this.aboutContent1 = this.firstEntryAbout.content1;
      this.aboutContent2 = this.firstEntryAbout.content2;
      this.aboutImageAbout = this.firstEntryAbout.imageAbout;
      this.aboutFacebook = this.firstEntryAbout.facebook;
      this.aboutTwitter = this.firstEntryAbout.twitter;
      this.aboutInstagram = this.firstEntryAbout.instagram;
      this.aboutTelephone = this.firstEntryAbout.telephon;
      this.aboutEmail = this.firstEntryAbout.email;
      this.aboutShareLink = this.firstEntryAbout.shareLink;
      //}
    });
  }

  onShowAbout(){
    this.changePhotoFormWanted = false;
    this.updateAboutWanted = false;
    this.getAboutContent();
  }
  onUpdateAbout(){
    this.changePhotoFormWanted = false;
    this.updateAboutWanted = true;
    this.listOfAbout = [];
  }
  onChangePhotoAbout(){
    this.changePhotoFormWanted = true;
    this.updateAboutWanted = false;
    this.listOfAbout = [];
  }
  onSubmitUpdateAbout(){
    this.objectToUpdateAbout = {
      id: this.aboutId,
      title1: this.aboutTitle1,
      title2: this.aboutTitle2,
      content1: this.aboutContent1,
      content2: this.aboutContent2,
      imageAbout: this.aboutImageAbout,
      facebook: this.aboutFacebook,
      twitter: this.aboutTwitter,
      instagram: this.aboutInstagram,
      telephon: this.aboutTelephone,
      email: this.aboutEmail,
      shareLink: this.aboutShareLink
    }
    this.setUpdateAbout(this.objectToUpdateAbout);
    this.updateAboutWanted = false;
  }
  async setUpdateAbout(updatedDto: About){
    (await this.reqresService.setUpdateAboutContent(updatedDto));
  }
}
export interface About{
  id: number;
  title1: string;
  title2: string;
  content1: string;
  content2: string;
  imageAbout: string;
  facebook: string;
  twitter: string;
  instagram: string;
  telephon: string;
  email: string;
  shareLink: string;
}

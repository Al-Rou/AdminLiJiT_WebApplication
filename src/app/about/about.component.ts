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
  allowUpdate = false;
  objectToUpdateAbout: About | undefined;

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
    this.updateAboutWanted = false;
    this.getAboutContent();
  }
  onUpdateAbout(){
    this.updateAboutWanted = true;
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
    alert('Send to dto'+this.aboutEmail);
    this.setUpdateAbout(this.objectToUpdateAbout);
  }
  async setUpdateAbout(updatedDto: About){
    alert('Send to reqres');
    (await this.reqresService.setUpdateAboutContent(updatedDto));
    alert('The last message');
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

import {Component} from "@angular/core";
import {ReqresService} from "../services/reqres.service";
import {Type} from "../listingType/type.component";


@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html'
})

export class DetailComponetnt{
  listOfDetails: Detail[] = [];
  updateDetailWanted = false;
  deleteDetailWanted = false;
  updateDataDetail = false;
  newDetailFormWanted = false;
  detailIdToDeleteOrUpdate = '';
  firstEntryDetail: Detail | undefined;
  changePhotoWanted = false;
  changePhotoFormWanted = false;
  url: any;
  msg = '';
  selectedFile: File | undefined;
  base64textString = '';
  photoConfirmed = false;
  listOfListingTypes: Type[] = [];
  entryForFillingList: Type | undefined;
  showChangeOnBusinessType = false;

  detailId = 0;
  detailName = '';
  detailAddress = '';
  detailAddress2 = '';
  detailDescription = '';
  detailPhone = '';
  detailEmail = '';
  detailLocation = '';
  detailLocationLatitude = '';
  detailLocationLongitude = '';
  detailNote = '';
  detailWebsite = '';
  detailRate = 0;
  detailListingTypeId = 0;
  detailListingTypeName = '';
  detailIsHotBussiness = false;
  detailFacebook = '';
  detailInstagram = '';
  detailYoutube = '';
  detailShareLink = '';
  detailHomeImage = '';
  detailOrderLink = '';

  detailName2 = '';
  detailAddress222 = '';
  detailAddress22 = '';
  detailDescription2 = '';
  detailPhone2 = '';
  detailEmail2 = '';
  detailLocation2 = '';
  detailLocationLatitude2 = '';
  detailLocationLongitude2 = '';
  detailNote2 = '';
  detailWebsite2 = '';
  detailRate2 = 0;
  detailListingTypeId2 = 0;
  detailListingTypeName2 = '';
  detailIsHotBussiness2 = false;
  detailFacebook2 = '';
  detailInstagram2 = '';
  detailYoutube2 = '';
  detailShareLink2 = '';
  detailOrderLink2 = '';
  hotBiz = 'false';


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
  }
  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
  }
  onConfirmPhotoEvent() {
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
  onUploadPhotoDetail(){
    for(let j = 0; j < this.listOfDetails.length; j++) {
      this.firstEntryDetail = {
        id: this.listOfDetails[j].id,
        name: this.listOfDetails[j].name,
        address: this.listOfDetails[j].address,
        address2: this.listOfDetails[j].address2,
        description: this.listOfDetails[j].description,
        phone: this.listOfDetails[j].phone,
        email: this.listOfDetails[j].email,
        location: this.listOfDetails[j].location,
        note: this.listOfDetails[j].note,
        website: this.listOfDetails[j].website,
        rate: this.listOfDetails[j].rate,
        listingTypeId: this.listOfDetails[j].listingTypeId,
        listingTypeName: this.listOfDetails[j].listingTypeName,
        isHotBussiness: this.listOfDetails[j].isHotBussiness,
        facebook: this.listOfDetails[j].facebook,
        instagram: this.listOfDetails[j].instagram,
        youtube: this.listOfDetails[j].youtube,
        shareLink: this.listOfDetails[j].shareLink,
        homeImage: this.base64textString,
        orderLink: this.listOfDetails[j].orderLink
      }
      break;
    }
    if(this.firstEntryDetail !== undefined) {
      if (this.firstEntryDetail.homeImage !== '') {
        alert('image is full');
        //console.log(this.objectToUpdateEvent.imageEvent);
      }
      alert(this.detailIdToDeleteOrUpdate);
      this.goForUploadPhotoDetail(this.firstEntryDetail, this.detailIdToDeleteOrUpdate);
      this.changePhotoWanted = false;
      this.photoConfirmed = false;
    }else{
      alert('Something went worng!');
    }
  }
  async goForUploadPhotoDetail(updatedDetailDto: Detail, updatedId: string){
    (await this.reqresService.uploadPhotoForDetail(updatedDetailDto, updatedId));
    this.listOfDetails = [];
    this.changePhotoFormWanted = false;
    this.changePhotoWanted = false;
    this.url = undefined;
    this.detailIdToDeleteOrUpdate = '';
  }

  async getAllBusinesses(){
    (await this.reqresService.getBusiness()).subscribe((res) => {
      for(let j = 0; j < res.length; j++){
        this.firstEntryDetail = {
          id: (res[j] as any).id,
          name: (res[j] as any).name,
          address: (res[j] as any).address,
          address2: (res[j] as any).address2,
          description: (res[j] as any).description,
          phone: (res[j] as any).phone,
          email: (res[j] as any).email,
          location: (res[j] as any).location,
          note: (res[j] as any).note,
          website: (res[j] as any).website,
          rate: (res[j] as any).rate,
          listingTypeId: (res[j] as any).listingTypeId,
          listingTypeName: (res[j] as any).listingTypeName,
          isHotBussiness: (res[j] as any).isHotBussiness,
          facebook: (res[j] as any).facebook,
          instagram: (res[j] as any).instagram,
          youtube: (res[j] as any).youtube,
          shareLink: (res[j] as any).shareLink,
          homeImage: (res[j] as any).homeImage,
          orderLink: (res[j] as any).orderLink
        }
        this.listOfDetails.push(this.firstEntryDetail);
      }
    })
  }
  async fillListingTypes(){
    (await this.reqresService.getTypes()).subscribe((res) => {
      for(let j = 0; j < res.length; j++){
        this.entryForFillingList = {
          id: (res[j] as any).id,
          name: (res[j] as any).name,
          description: (res[j] as any).description
        }
        this.listOfListingTypes.push(this.entryForFillingList);
      }
    })
  }
  async sendDtoToService(updatedDto: Detail){
    (await this.reqresService.putUpdateBusinessDetail(updatedDto));
  }
  async sendDtoToServiceToCreate(newDetailDto: Detail){
    (await this.reqresService.setNewBusinessDetail(newDetailDto));
  }

  onUpdateDetail(){
    this.changePhotoFormWanted = false;
    this.changePhotoWanted = false;
    this.updateDetailWanted = true;
    this.deleteDetailWanted = false;
    this.updateDataDetail = false;
    this.newDetailFormWanted = false;
  }
  onDeleteDetail(){
    this.newDetailFormWanted = false;
    this.changePhotoFormWanted = false;
    this.changePhotoWanted = false;
    this.updateDetailWanted = false;
    this.deleteDetailWanted = true;
    this.updateDataDetail = false;
  }
  onSubmitUpdateDetail(){
    this.newDetailFormWanted = false;
    this.changePhotoFormWanted = false;
    this.changePhotoWanted = false;
    this.deleteDetailWanted = false;
    this.updateDetailWanted = false;
    for(let j = 0; j < this.listOfDetails.length; j++){
      let aux = '';
      if(this.listOfDetails[j].id.toString() === this.detailIdToDeleteOrUpdate){
        this.detailId = this.listOfDetails[j].id;
        this.detailName = this.listOfDetails[j].name;
        this.detailAddress = this.listOfDetails[j].address;
        this.detailAddress2 = this.listOfDetails[j].address2;
        this.detailDescription = this.listOfDetails[j].description;
        this.detailPhone = this.listOfDetails[j].phone;
        this.detailEmail = this.listOfDetails[j].email;

        for(let k = 0; k < this.listOfDetails[j].location.length;) {
          if (this.listOfDetails[j].location[k] === ' ') {
            k++;
          } else if (this.listOfDetails[j].location[k] !== ',') {
            aux += this.listOfDetails[j].location[k];
            k++;
          } else {
            this.detailLocationLatitude = aux;
            aux = '';
            k++;
            for (let kk = k; kk < this.listOfDetails[j].location.length;) {
              if (this.listOfDetails[j].location[kk] === ' ') {
                kk++;
              } else {
                aux += this.listOfDetails[j].location[kk];
                kk++;
              }
            }
            this.detailLocationLongitude = aux;
            break;
          }
        }
        this.detailNote = this.listOfDetails[j].note;
        this.detailWebsite = this.listOfDetails[j].website;
        this.detailRate = this.listOfDetails[j].rate;
        this.detailListingTypeId = this.listOfDetails[j].listingTypeId;
        this.detailListingTypeName = this.listOfDetails[j].listingTypeName;
        this.detailIsHotBussiness = this.listOfDetails[j].isHotBussiness;
        this.detailFacebook = this.listOfDetails[j].facebook;
        this.detailInstagram = this.listOfDetails[j].instagram;
        this.detailYoutube = this.listOfDetails[j].youtube;
        this.detailShareLink = this.listOfDetails[j].shareLink;
        this.detailHomeImage = this.listOfDetails[j].homeImage;
        this.detailOrderLink = this.listOfDetails[j].orderLink;

        break;
      }
    }

    this.listOfDetails = [];
    this.updateDataDetail = true;
  }
  onChangePhotoDetail(){
    this.newDetailFormWanted = false;
    this.changePhotoFormWanted = false;
    this.changePhotoWanted = true;
  }
  onSubmitDeleteDetail(){
    alert('Id ' + this.detailIdToDeleteOrUpdate + 'is going to be deleted');
  }
  chosenType = {
    id: 0,
    name: 'no name',
    description: 'no description'
  };
  chosenType2 = {
    id: 0,
    name: 'no name',
    description: 'no description'
  };
  onSubmitDataToUpdateDetail(){
    if(this.chosenType !== undefined) {
      alert(this.chosenType?.id);
    }
    if(this.chosenType.id === 0 || !this.showChangeOnBusinessType) {
      let auxLocation = this.detailLocationLatitude + ', ' + this.detailLocationLongitude;
      this.firstEntryDetail = {
        id: this.detailId,
        name: this.detailName,
        address: this.detailAddress,
        address2: this.detailAddress2,
        description: this.detailDescription,
        phone: this.detailPhone,
        email: this.detailEmail,
        location: auxLocation,
        note: this.detailNote,
        website: this.detailWebsite,
        rate: this.detailRate,
        listingTypeId: this.detailListingTypeId,
        listingTypeName: this.detailListingTypeName,
        isHotBussiness: this.detailIsHotBussiness,
        facebook: this.detailFacebook,
        instagram: this.detailInstagram,
        youtube: this.detailYoutube,
        shareLink: this.detailShareLink,
        homeImage: this.detailHomeImage,
        orderLink: this.detailOrderLink
      }
    }else if(this.chosenType.id !== 0 && this.showChangeOnBusinessType){
      let namOfType = '';
      for (let k = 0; k < this.listOfListingTypes.length; k++){
        if(this.listOfListingTypes[k].id === this.chosenType.id){
          namOfType = this.listOfListingTypes[k].name;
          alert(namOfType);
          alert(this.chosenType.id);
          break;
        }
      }
      let auxLocation = this.detailLocationLatitude + ', ' + this.detailLocationLongitude;
      this.firstEntryDetail = {
        id: this.detailId,
        name: this.detailName,
        address: this.detailAddress,
        address2: this.detailAddress2,
        description: this.detailDescription,
        phone: this.detailPhone,
        email: this.detailEmail,
        location: auxLocation,
        note: this.detailNote,
        website: this.detailWebsite,
        rate: this.detailRate,
        listingTypeId: this.chosenType.id,
        listingTypeName: namOfType,
        isHotBussiness: this.detailIsHotBussiness,
        facebook: this.detailFacebook,
        instagram: this.detailInstagram,
        youtube: this.detailYoutube,
        shareLink: this.detailShareLink,
        homeImage: this.detailHomeImage,
        orderLink: this.detailOrderLink
      }
    }
    this.updateDataDetail = false;
    this.listOfListingTypes = [];
    this.detailIdToDeleteOrUpdate = '';
    if(this.firstEntryDetail !== undefined) {
      alert(this.detailIsHotBussiness);
      this.sendDtoToService(this.firstEntryDetail);
    }
  }
  onSubmitDataToNewDetail(){
    if(this.selectedFile === undefined){
      alert('Choose a photo and press confirm button!');
    }
    else if(
      this.detailName2 !== '' &&
      this.detailAddress222 !== '' &&
      this.detailAddress22 !== '' &&
      this.detailDescription2 !== '' &&
      this.detailPhone2 !== '' &&
      this.detailEmail2 !== '' &&
      this.detailLocationLatitude2 !== '' &&
      this.detailLocationLongitude2 !== '' &&
      this.detailNote2 !== '' &&
      this.detailWebsite2 !== '' &&
      this.detailFacebook2 !== '' &&
      this.detailInstagram2 !== '' &&
      this.detailYoutube2 !== '' &&
      this.detailShareLink2 !== '' &&
      this.detailOrderLink2 !== ''
    ) {
      if (this.chosenType2.id === 0) {
        alert('Business Type has to be chosen!');
        return;
      } else {
        let namOfType = '';
        for (let k = 0; k < this.listOfListingTypes.length; k++) {
          if (this.listOfListingTypes[k].id === this.chosenType2.id) {
            namOfType = this.listOfListingTypes[k].name;
            alert(namOfType);
            alert(this.chosenType2.id);
            break;
          }
        }
        let auxLocation = this.detailLocationLatitude2 + ', ' + this.detailLocationLongitude2;
        if(this.hotBiz === 'true'){
          this.detailIsHotBussiness2 = true;
        }else if(this.hotBiz === 'false'){
          this.detailIsHotBussiness2 = false;
        }
        this.firstEntryDetail = {
          id: 0,
          name: this.detailName2,
          address: this.detailAddress222,
          address2: this.detailAddress22,
          description: this.detailDescription2,
          phone: this.detailPhone2,
          email: this.detailEmail2,
          location: auxLocation,
          note: this.detailNote2,
          website: this.detailWebsite2,
          rate: this.detailRate2,
          listingTypeId: this.chosenType2.id,
          listingTypeName: namOfType,
          isHotBussiness: this.detailIsHotBussiness2,
          facebook: this.detailFacebook2,
          instagram: this.detailInstagram2,
          youtube: this.detailYoutube2,
          shareLink: this.detailShareLink2,
          homeImage: this.base64textString,
          orderLink: this.detailOrderLink2
        }
        this.newDetailFormWanted = false;
        this.listOfListingTypes = [];
        this.detailIdToDeleteOrUpdate = '';
        if (this.firstEntryDetail !== undefined) {
          alert(this.detailIsHotBussiness2);
          this.sendDtoToServiceToCreate(this.firstEntryDetail);
        }
      }
    }else{
      alert('All fields are not filled yet!'+this.hotBiz+this.chosenType2.id);
    }
  }
  onShowAllDetail(){
    this.listOfListingTypes = [];
    this.newDetailFormWanted = false;
    this.changePhotoFormWanted = false;
    this.changePhotoWanted = false;
    this.updateDetailWanted = false;
    this.deleteDetailWanted = false;
    this.listOfDetails = [];
    this.getAllBusinesses();
    this.fillListingTypes();
  }
  onAddNewDetail(){
    this.listOfListingTypes = [];
    this.newDetailFormWanted = true;
    this.changePhotoWanted = false;
    this.updateDetailWanted = false;
    this.deleteDetailWanted = false;
    this.changePhotoFormWanted = false;
    this.listOfDetails = [];
    this.fillListingTypes();
  }
  onSubmitChangePhotoDetail(){
    this.newDetailFormWanted = false;
    this.changePhotoWanted = false;
    this.updateDetailWanted = false;
    this.deleteDetailWanted = false;
    this.changePhotoFormWanted = true;
  }
  onChangeTypeOfBusiness(){
    this.showChangeOnBusinessType = true;
  }

}

export interface Detail{
  id: number;
  name: string;
  address: string;
  address2: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  note: string;
  website: string;
  rate: number;
  listingTypeId: number;
  listingTypeName: string;
  isHotBussiness: boolean;
  facebook: string;
  instagram: string;
  youtube: string;
  shareLink: string;
  homeImage: string;
  orderLink: string;
}

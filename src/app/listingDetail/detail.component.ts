import {Component} from "@angular/core";
import {ReqresService} from "../services/reqres.service";


@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html'
})

export class DetailComponetnt{
  listOfDetails: Detail[] = [];
  updateDetailWanted = false;
  deleteDetailWanted = false;
  updateDataDetail = false;
  detailIdToDeleteOrUpdate = '';
  firstEntryDetail: Detail | undefined;

  detailId = 0;
  detailName = '';
  detailAddress = '';
  detailAddress2 = '';
  detailDescription = '';
  detailPhone = '';
  detailEmail = '';
  detailLocation = '';
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


  constructor(private reqresService: ReqresService) {

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

  onUpdateDetail(){
    this.updateDetailWanted = true;
    this.deleteDetailWanted = false;
    this.updateDataDetail = false;
  }
  onDeleteDetail(){
    this.updateDetailWanted = false;
    this.deleteDetailWanted = true;
    this.updateDataDetail = false;
  }
  onSubmitUpdateDetail(){
    this.deleteDetailWanted = false;
    this.updateDetailWanted = false;
    for(let j = 0; j < this.listOfDetails.length; j++){
      if(this.listOfDetails[j].id.toString() === this.detailIdToDeleteOrUpdate){
        this.detailId = this.listOfDetails[j].id;
        this.detailName = this.listOfDetails[j].name;
        this.detailAddress = this.listOfDetails[j].address;
        this.detailAddress2 = this.listOfDetails[j].address2;
        this.detailDescription = this.listOfDetails[j].description;
        this.detailPhone = this.listOfDetails[j].phone;
        this.detailEmail = this.listOfDetails[j].email;
        this.detailLocation = this.listOfDetails[j].location;
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
  onSubmitDeleteDetail(){
    alert('Id ' + this.detailIdToDeleteOrUpdate + 'is going to be deleted');
  }
  onSubmitDataToUpdateDetail(){

  }
  onShowAllDetail(){
    this.updateDetailWanted = false;
    this.deleteDetailWanted = false;
    this.getAllBusinesses();
  }
  onAddNewDetail(){
    this.updateDetailWanted = false;
    this.deleteDetailWanted = false;
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

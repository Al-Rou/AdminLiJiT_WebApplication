import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Weather, UpComingEvent} from "../events/events.component";
import {catchError, retry} from "rxjs/operators";
import {JwtService} from "./jwt.service";
import {About} from "../about/about.component";
import {TokenLiJiT} from "../login/login.component"
import {Type} from "../listingType/type.component";
import {Detail} from "../listingDetail/detail.component";

@Injectable({
  providedIn: 'root'
})

export class ReqresService{
  private urlGetJWT = 'https://adminlijit.azurewebsites.net/AuthenManagement/Login';

  private urlWeather = 'https://adminlijit.azurewebsites.net/weatherforecast';
  private urlUpcomingEvents = 'https://adminlijit.azurewebsites.net/Events/Upcoming';
  private urlAllEvents = 'https://adminlijit.azurewebsites.net/Events/All';
  private urlGetAbout = 'https://adminlijit.azurewebsites.net/AboutContent/About';
  private urlUpdateAbout = 'https://adminlijit.azurewebsites.net/AboutContent/Update?id=';
  private urlGetAllTypes = 'https://adminlijit.azurewebsites.net/ListingType/Category';
  private urlToCreateNewType = 'https://adminlijit.azurewebsites.net/ListingType/Create';
  private urlUpdateType = 'https://adminlijit.azurewebsites.net/ListingType/Update?id=';
  private urlGetAllBusinesses = 'https://adminlijit.azurewebsites.net/ListingDetail/Stores';
  private urlToUpdateDetail = 'https://adminlijit.azurewebsites.net/ListingDetail/Update?id=';
  private urlToCreateNewDetail = 'https://adminlijit.azurewebsites.net/ListingDetail/Create';
  private urlToCreateNewEvent = 'https://adminlijit.azurewebsites.net/Events/Create';
  private urlToUpdateEvent = 'https://adminlijit.azurewebsites.net/Events/Update?id=';
  private urlToDeleteEvent = 'https://adminlijit.azurewebsites.net/Events/Delete?id=';
  private urlToDeleteDetail = 'https://adminlijit.azurewebsites.net/ListingDetail/Delete?id=';

  tokenValue = '';
  constructor(private http: HttpClient) {

  }
  async getJWT(): Promise<Observable<TokenLiJiT>> {
    const headerDict = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      "UserName":"LiJiT",
      "Password":"1234"
    }
    return this.http.post<TokenLiJiT>(this.urlGetJWT, requestBody, requestOptions);
  }
  async getWeather(): Promise<Observable<Weather[]>> {
    const headerDict = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<Weather[]>(this.urlWeather, requestOptions);
  }
  async getAllEvents(): Promise<Observable<UpComingEvent[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<UpComingEvent[]>(this.urlAllEvents, requestOptions);
  }
  async getUpcomingEvents(): Promise<Observable<UpComingEvent[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<UpComingEvent[]>(this.urlUpcomingEvents, requestOptions);
  }
  async getTypes(): Promise<Observable<Type[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<Type[]>(this.urlGetAllTypes, requestOptions);
  }
  async getBusiness(): Promise<Observable<Detail[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<Detail[]>(this.urlGetAllBusinesses, requestOptions);
  }
  async getAbout(): Promise<Observable<About>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<About>(this.urlGetAbout, requestOptions);
  }
  async setUpcomingEvent(newEvent: UpComingEvent){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      id: 0,
      name: newEvent.name,
      note: newEvent.note,
      address: newEvent.address,
      address2: newEvent.address2,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      imageEvent: newEvent.imageEvent,
      location: newEvent.location,
      phone: newEvent.phone,
      email: newEvent.email,
      shareLink: newEvent.shareLink,
      organizer: newEvent.organizer
    }
    this.http.post<UpComingEvent>(this.urlToCreateNewEvent, requestBody, requestOptions).subscribe(res =>{
      alert('The Event was successfully stored!');
    });
  }
  async putUpdateEvent(updatedEve: UpComingEvent, idForUpdate: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      name: updatedEve.name,
      note: updatedEve.note,
      address: updatedEve.address,
      address2: updatedEve.address2,
      description: updatedEve.description,
      startDate: updatedEve.startDate,
      endDate: updatedEve.endDate,
      imageEvent: updatedEve.imageEvent,
      location: updatedEve.location,
      phone: updatedEve.phone,
      email: updatedEve.email,
      shareLink: updatedEve.shareLink,
      organizer: updatedEve.organizer
    }
    this.http.put<UpComingEvent>(this.urlToUpdateEvent+idForUpdate, requestBody, requestOptions).subscribe(res =>{
      alert('The Event was successfully updated!');
    });
  }
  async removeEvent(idToRemove: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    this.http.delete<UpComingEvent>(this.urlToDeleteEvent+idToRemove, requestOptions).subscribe(res =>{
      alert('The Event was successfully deleted!');
    });
  }
  async removeDetail(idToRemove: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    this.http.delete<Detail>(this.urlToDeleteDetail+idToRemove, requestOptions).subscribe(res =>{
      alert('The Business was successfully deleted!');
    });
  }
  async uploadPhotoForAbout(newAbout: About){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      title1: newAbout.title1,
      title2: newAbout.title2,
      content1: newAbout.content1,
      content2: newAbout.content2,
      imageAbout: newAbout.imageAbout,
      facebook: newAbout.facebook,
      twitter: newAbout.twitter,
      instagram: newAbout.instagram,
      telephon: newAbout.telephon,
      email: newAbout.email,
      shareLink: newAbout.shareLink
    }
    // if(newAbout.imageAbout !== ''){
    //   alert('Photo not empty');
    // }else {
    //   alert('Receive by reqres' + newAbout.id);
    // }
    this.http.put<About>(this.urlUpdateAbout+newAbout.id, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on About are successfully stored!');
    });
  }
  async uploadPhotoForEvent(updatedEve: UpComingEvent, idForUpdate: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      name: updatedEve.name,
      note: updatedEve.note,
      address: updatedEve.address,
      address2: updatedEve.address2,
      description: updatedEve.description,
      startDate: updatedEve.startDate,
      endDate: updatedEve.endDate,
      imageEvent: updatedEve.imageEvent,
      location: updatedEve.location,
      phone: updatedEve.phone,
      email: updatedEve.email,
      shareLink: updatedEve.shareLink,
      organizer: updatedEve.organizer
    }
    // if(updatedEve.imageEvent !== ''){
    //   alert('Photo not empty');
    // }else {
    //   alert('Receive by reqres' + updatedEve.id);
    // }
    this.http.put<UpComingEvent>(this.urlToUpdateEvent+idForUpdate, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on Event are successfully stored!');
    });
  }
  async uploadPhotoForDetail(updatedDto: Detail, idForUpdate: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      name: updatedDto.name,
      address: updatedDto.address,
      address2: updatedDto.address2,
      description: updatedDto.description,
      phone: updatedDto.phone,
      email: updatedDto.email,
      location: updatedDto.location,
      note: updatedDto.note,
      website: updatedDto.website,
      rate: updatedDto.rate,
      listingTypeId: updatedDto.listingTypeId,
      listingTypeName: updatedDto.listingTypeName,
      isHotBussiness: updatedDto.isHotBussiness,
      facebook: updatedDto.facebook,
      instagram: updatedDto.instagram,
      youtube: updatedDto.youtube,
      shareLink: updatedDto.shareLink,
      homeImage: updatedDto.homeImage,
      orderLink: updatedDto.orderLink
    }
    // if(updatedDto.homeImage !== ''){
    //   alert('Photo not empty');
    // }else {
    //   alert('Receive by reqres' + updatedDto.id);
    // }
    this.http.put<Detail>(this.urlToUpdateDetail+idForUpdate, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on the Business are successfully stored!');
    });
  }
  async setUpdateAboutContent(newAbout: About){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      title1: newAbout.title1,
      title2: newAbout.title2,
      content1: newAbout.content1,
      content2: newAbout.content2,
      imageAbout: newAbout.imageAbout,
      facebook: newAbout.facebook,
      twitter: newAbout.twitter,
      instagram: newAbout.instagram,
      telephon: newAbout.telephon,
      email: newAbout.email,
      shareLink: newAbout.shareLink
    }
    this.http.put<About>(this.urlUpdateAbout+newAbout.id, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on About are successfully stored!');
    });
  }
  async putUpdateBusinessDetail(updatedDto: Detail){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      name: updatedDto.name,
      address: updatedDto.address,
      address2: updatedDto.address2,
      description: updatedDto.description,
      phone: updatedDto.phone,
      email: updatedDto.email,
      location: updatedDto.location,
      note: updatedDto.note,
      website: updatedDto.website,
      rate: updatedDto.rate,
      listingTypeId: updatedDto.listingTypeId,
      listingTypeName: updatedDto.listingTypeName,
      isHotBussiness: updatedDto.isHotBussiness,
      facebook: updatedDto.facebook,
      instagram: updatedDto.instagram,
      youtube: updatedDto.youtube,
      shareLink: updatedDto.shareLink,
      homeImage: updatedDto.homeImage,
      orderLink: updatedDto.orderLink
    }
    this.http.put<Detail>(this.urlToUpdateDetail+updatedDto.id, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on the Business are successfully stored!');
    });
  }
  async setNewBusinessDetail(newDetail: Detail){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      id: 0,
      name: newDetail.name,
      address: newDetail.address,
      address2: newDetail.address2,
      description: newDetail.description,
      phone: newDetail.phone,
      email: newDetail.email,
      location: newDetail.location,
      note: newDetail.note,
      website: newDetail.website,
      rate: newDetail.rate,
      listingTypeId: newDetail.listingTypeId,
      listingTypeName: newDetail.listingTypeName,
      isHotBussiness: newDetail.isHotBussiness,
      facebook: newDetail.facebook,
      instagram: newDetail.instagram,
      youtube: newDetail.youtube,
      shareLink: newDetail.shareLink,
      homeImage: newDetail.homeImage,
      orderLink: newDetail.orderLink
    }
    this.http.post<Detail>(this.urlToCreateNewDetail, requestBody, requestOptions).subscribe(res =>{
      alert('The Business was successfully stored!');
    });
  }
  async setNewBusinessType(newType: Type){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      id: 0,
      name: newType.name,
      description: newType.description
    }
    this.http.post<Type>(this.urlToCreateNewType, requestBody, requestOptions).subscribe(res =>{
      alert('The Business Type was successfully stored!');
    });
  }
  async setUpdateBusinessTypePlease(updatedType: Type, updatedId: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      id: 0,
      name: updatedType.name,
      description: updatedType.description
    }
    alert('Receive by reqres '+updatedType.id);
    this.http.put<Type>(this.urlUpdateType+updatedId, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on the Business Type are successfully stored!');
    });
  }

}

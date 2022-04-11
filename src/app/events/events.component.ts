import {Component, Inject} from "@angular/core";
import {ReqresService} from "../services/reqres.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'events-page',
  templateUrl: './events.component.html'
})

export class EventsComponent{
  listOfEvents: UpComingEvent[] = [];
  url = 'https://lijitapi.azurewebsites.net/weatherforecast';
  //WeatherEntries1: UpComingEvent[] = [];
  //WeatherEntries2: Weather[] = [];
  firstEntry: Weather | undefined;
  firstEntryUpcomingEvents: UpComingEvent | undefined;
  firstEntryAllEvents: UpComingEvent | undefined;
  allowNewEvent = false;
  newEventWanted = false;
  updateWanted = false;
  updateFormWanted = false;
  deleteWanted = false;
  eventName = '';
  eventNote = '';
  eventAddress1 = '';
  eventAddress2 = '';
  eventDescription = '';
  eventStartDate: Date | undefined;
  eventEndDate: Date | undefined;
  eventLocation = '';
  eventPhone = '';
  eventEmail = '';
  eventShareLink = '';
  eventOrganizer = '';
  eventIdToDeleteOrUpdate = '';
  eventImage = '';
  eventId = '';

  eventName2 = '';
  eventNote2 = '';
  eventAddress12 = '';
  eventAddress22 = '';
  eventDescription2 = '';
  eventStartDate2: Date | undefined;
  eventEndDate2: Date | undefined;
  eventLocation2 = '';
  eventPhone2 = '';
  eventEmail2 = '';
  eventShareLink2 = '';
  eventOrganizer2 = '';
  eventImage2 = '';
  eventId2 = '';

  //private http: HttpClient;
  //constructor(http: HttpClient, @Inject('https://lijitapi.azurewebsites.net/weatherforecast') baseUrl: string) {
  constructor(private reqresService: ReqresService) {

  }
  async getAllEvents(){
      (await this.reqresService.getAllEvents()).subscribe((res) => {
        if(res.length === 0){
          alert('There is nothing to show!');
        }
        for(let j = 0; j < res.length; j++) {
          this.firstEntryAllEvents = {
            // date: (res[j] as any).date,
            // temperatureC: (res[j] as any).temperatureC,
            // summary: (res[j] as any).summary
            id: (res[j] as any).id,
            name: (res[j] as any).name,
            note: (res[j] as any).note,
            address: (res[j] as any).address,
            address2: (res[j] as any).address2,
            description: (res[j] as any).description,
            startDate: (res[j] as any).startDate,
            endDate: (res[j] as any).endDate,
            imageEvent: (res[j] as any).imageEvent,
            location: (res[j] as any).location,
            phone: (res[j] as any).phone,
            email: (res[j] as any).email,
            shareLink: (res[j] as any).shareLink,
            organizer: (res[j] as any).organizer
          }
          this.listOfEvents.push(this.firstEntryAllEvents);
        }
    });
  }
  async getUpcomingEvents(){
    (await this.reqresService.getUpcomingEvents()).subscribe((res) => {
      for(let j = 0; j < res.length; j++) {
        this.firstEntryUpcomingEvents = {
          id: (res[j] as any).id,
          name: (res[j] as any).name,
          note: (res[j] as any).note,
          address: (res[j] as any).address,
          address2: (res[j] as any).address2,
          description: (res[j] as any).description,
          startDate: (res[j] as any).startDate,
          endDate: (res[j] as any).endDate,
          imageEvent: (res[j] as any).imageEvent,
          location: (res[j] as any).location,
          phone: (res[j] as any).phone,
          email: (res[j] as any).email,
          shareLink: (res[j] as any).shareLink,
          organizer: (res[j] as any).organizer
        }
        this.listOfEvents.push(this.firstEntryUpcomingEvents);
      }
    });
  }

  async setUpcomingEvent(newEvent: UpComingEvent){
    (await this.reqresService.setUpcomingEvent(newEvent));
  }
  async putUpdateEvent(updatedEve: UpComingEvent, idForUpdate: string){
    (await this.reqresService.putUpdateEvent(updatedEve, idForUpdate));
  }
  async deleteEventNow(idForUpdate: string){
    (await this.reqresService)
  }
  onShowAllEvents(){
    this.updateFormWanted = false;
    this.updateWanted = false;
    this.deleteWanted = false;
    this.newEventWanted = false;
    this.listOfEvents = [];
    alert('Button is clicked');
    this.getAllEvents();
  }
  onShowUpcomingEvents(){
    this.updateFormWanted = false;
    this.updateWanted = false;
    this.deleteWanted = false;
    this.newEventWanted = false;
    this.listOfEvents = [];
    this.getUpcomingEvents();
  }
  onUpdateEvent(){
    this.updateFormWanted = false;
    this.updateWanted = true;
    this.deleteWanted = false;
    this.newEventWanted = false;
    this.eventIdToDeleteOrUpdate = '';
  }
  onDeleteEvent(){
    this.updateFormWanted = false;
    this.updateWanted = false;
    this.deleteWanted = true;
    this.newEventWanted = false;
    this.eventIdToDeleteOrUpdate = '';
  }
  onSubmitUpdateEvent(){
    this.updateFormWanted = true;
    this.updateWanted = false;
    alert('Id ' + this.eventIdToDeleteOrUpdate + ' will be updated');
    for(let j = 0; j < this.listOfEvents.length; j++){
      if(this.listOfEvents[j].id.toString() === this.eventIdToDeleteOrUpdate){
        this.eventId2 = this.listOfEvents[j].id.toString();
        this.eventName2 = this.listOfEvents[j].name;
        this.eventNote2 = this.listOfEvents[j].note;
        this.eventAddress12 = this.listOfEvents[j].address;
        this.eventAddress22 = this.listOfEvents[j].address2;
        this.eventDescription2 = this.listOfEvents[j].description;
        this.eventStartDate2 = this.listOfEvents[j].startDate;
        this.eventEndDate2 = this.listOfEvents[j].endDate;
        this.eventImage2 = this.listOfEvents[j].imageEvent;
        this.eventLocation2 = this.listOfEvents[j].location;
        this.eventPhone2 = this.listOfEvents[j].phone;
        this.eventEmail2 = this.listOfEvents[j].email;
        this.eventShareLink2 = this.listOfEvents[j].shareLink;
        this.eventOrganizer2 = this.listOfEvents[j].organizer;

        break;
      }
    }
    this.listOfEvents = [];
  }
  onSubmitDataForUpdateEvent(){
    if(this.eventName!=='' && this.eventNote!=='' && this.eventEmail!=='' && this.eventPhone!=='' && this.eventAddress1!=='' &&
      this.eventDescription!=='' && this.eventOrganizer!=='' && this.eventEndDate2!==undefined && this.eventStartDate2!==undefined && this.eventShareLink!=='' &&
      this.eventLocation!==''){
      this.firstEntryUpcomingEvents = {
        id: 0,
        name: this.eventName2,
        note: this.eventNote2,
        address: this.eventAddress12,
        address2: this.eventAddress22,
        description: this.eventDescription2,
        startDate: this.eventStartDate2,
        endDate: this.eventEndDate2,
        imageEvent: this.eventImage2,
        location: this.eventLocation2,
        phone: this.eventPhone2,
        email: this.eventEmail2,
        shareLink: this.eventShareLink2,
        organizer: this.eventOrganizer2
      }
      this.putUpdateEvent(this.firstEntryUpcomingEvents, this.eventId);
      this.updateFormWanted = false;
    }else {
      alert("All mandatory fields are not filled yet!");
    }
  }
  onSubmitDeleteEvent(){
    alert('Are you sure to delete event with Id ' + this.eventIdToDeleteOrUpdate + ' ?');
    this.deleteEventNow(this.eventIdToDeleteOrUpdate);
  }
  onAddEvent(){
    this.updateWanted = false;
    this.deleteWanted = false;
    this.listOfEvents = [];
    this.newEventWanted = true;
  }
  onSubmitNewEvent(){
    if(this.eventName!=='' && this.eventNote!=='' && this.eventEmail!=='' && this.eventPhone!=='' && this.eventAddress1!=='' &&
      this.eventDescription!=='' && this.eventOrganizer!=='' && this.eventEndDate!==undefined && this.eventStartDate!==undefined && this.eventShareLink!=='' &&
      this.eventLocation!==''){
      this.firstEntryUpcomingEvents = {
        id: 0,
        name: this.eventName,
        note: this.eventNote,
        address: this.eventAddress1,
        address2: this.eventAddress2,
        description: this.eventDescription,
        startDate: this.eventStartDate,
        endDate: this.eventEndDate,
        imageEvent: '',
        location: this.eventLocation,
        phone: this.eventPhone,
        email: this.eventEmail,
        shareLink: this.eventShareLink,
        organizer: this.eventOrganizer
      }
      this.setUpcomingEvent(this.firstEntryUpcomingEvents);
      this.newEventWanted = false;
    }else {
      alert("All mandatory fields are not filled yet!");
    }
  }

}
export interface Weather {
  date: Date;
  temperatureC: number;
  //temperatureF: number;
  summary: string;
}
export interface UpComingEvent {
  id: number;
  name: string;
  note: string;
  address: string;
  address2: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  imageEvent: string;
  phone: string;
  email: string;
  shareLink: string;
  organizer: string;
}

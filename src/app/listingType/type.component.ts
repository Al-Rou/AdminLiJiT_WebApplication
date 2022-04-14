import {Component} from "@angular/core";
import {ReqresService} from "../services/reqres.service";


@Component({
  selector: 'type-page',
  templateUrl: './type.component.html'
})

export class TypeComponent{
  listOfType: Type[] = [];
  firstEntryType: Type | undefined;
  newTypeWanted = false;
  typeId = '';
  typeName = '';
  typeDescription = '';
  typeIdToUpdate = '';
  updateWanted = false;
  updateFormWanted = false;

  constructor(private reqresService: ReqresService) {

  }
  async getAllTypes(){
    (await this.reqresService.getTypes()).subscribe((res) => {
      for(let j = 0; j < res.length; j++){
        this.firstEntryType = {
          id: (res[j] as any).id,
          name: (res[j] as any).name,
          description: (res[j] as any).description
        }
        this.listOfType.push(this.firstEntryType);
      }
    });
  }
  async setNewType(newType: Type){
    (await this.reqresService.setNewBusinessType(newType));
  }
  async putUpdateDataType(updatedTypeDto: Type, updatedId: string){
    (await this.reqresService.setUpdateBusinessTypePlease(updatedTypeDto, updatedId));
  }
  onShowAllTypes(){
    this.updateFormWanted = false;
    this.updateWanted = false;
    this.newTypeWanted = false;
    this.getAllTypes();
  }
  onAddNewType(){
    this.updateFormWanted = false;
    this.listOfType = [];
    this.updateWanted = false;
    this.newTypeWanted = true;
  }
  onSubmitNewType(){
    if(this.typeName!=='' && this.typeDescription!==''){
      this.firstEntryType = {
        id: 0,
        name: this.typeName,
        description: this.typeDescription
      }
      this.newTypeWanted = false;
      this.setNewType(this.firstEntryType);
    }else{
      alert("All mandatory fields are not filled yet!");
    }
  }
  onUpdateType(){
    this.updateWanted = true;
    this.updateFormWanted = false;
  }
  onDeleteType(){

  }
  onSubmitUpdateType(){
    this.updateWanted = false;
    for(let j = 0; j < this.listOfType.length; j++){
      if(this.listOfType[j].id.toString() === this.typeIdToUpdate){
        this.typeId = this.typeIdToUpdate;
        this.typeName = this.listOfType[j].name;
        this.typeDescription = this.listOfType[j].description;

        break;
      }
    }
    this.listOfType = [];
    this.updateFormWanted = true;
  }
  onSubmitUpdateDataType(){
    this.updateFormWanted = false;
    this.firstEntryType = {
      id: 0,
      name: this.typeName,
      description: this.typeDescription
    }
    this.putUpdateDataType(this.firstEntryType, this.typeIdToUpdate);
  }
}

export interface Type{
  id: number;
  name: string;
  description: string;
}

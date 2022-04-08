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
  typeName = '';
  typeDescription = '';
  typeId = '';
  updateWanted = false;

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

  onShowAllTypes(){
    this.updateWanted = false;
    this.newTypeWanted = false;
    this.getAllTypes();
  }
  onAddNewType(){
    this.listOfType = [];
    this.updateWanted = false;
    this.newTypeWanted = true;
  }
  onSubmitNewType(){
    if(this.typeName!=='' && this.typeDescription!==''){

    }else{
      alert("All mandatory fields are not filled yet!");
    }
  }

  onUpdateType(){
    this.updateWanted = true;
  }
  onSubmitUpdateType(){
    alert('Update Request on id ' + this.typeId + ' is submitted!');
  }
}

export interface Type{
  id: number;
  name: string;
  description: string;
}

import { Component, OnInit } from '@angular/core';
import { TechDataService } from '../techData.service'
import { faCoffee, faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class mainComponent implements OnInit {

  constructor(public techData:TechDataService) {
    // for(let i in techData.jsonTechData) {
      
    // }
   }

   // font awesome icons
   faCoffee = faCoffee;
   faTrash = faTrash;
   faPlus = faPlus;
   faPencilAlt = faPencilAlt;

  
  ngOnInit() {}

}

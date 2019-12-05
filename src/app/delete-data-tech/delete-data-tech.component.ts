import { Component, OnInit } from '@angular/core';
import { TechDataService } from "../techData.service";

@Component({
  selector: 'app-delete-data-tech',
  templateUrl: './delete-data-tech.component.html',
  styleUrls: ['./delete-data-tech.component.scss']
})
export class DeleteDataTechComponent implements OnInit {

  constructor(public techData:TechDataService) {}

  ngOnInit() {
  }

}

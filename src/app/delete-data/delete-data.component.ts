import { Component, OnInit } from '@angular/core';
import { TechDataService } from "../techData.service";

@Component({
  selector: 'app-delete-data',
  templateUrl: './delete-data.component.html',
  styleUrls: ['./delete-data.component.scss']
})
export class DeleteDataComponent implements OnInit {

  constructor(public techData:TechDataService) {}

  ngOnInit() {
  }

}

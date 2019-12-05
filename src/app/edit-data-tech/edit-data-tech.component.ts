import { Component, OnInit } from '@angular/core';
import { TechDataService } from '../techData.service';
import { Technology } from '../dataSample.model';

@Component({
  selector: 'app-edit-data-tech',
  templateUrl: './edit-data-tech.component.html',
  styleUrls: ['./edit-data-tech.component.scss']
})
export class EditDataTechComponent implements OnInit {

  public editingTechForm: Technology = new Technology();

  constructor(public techData:TechDataService) {
    //this.techData.jsonCourseData; 
  }

  ngOnInit() {
  }

  public editOldTechDataComp(id:any, name:any, description:any, difficulty:any, courses:any) {
    this.editingTechForm._id = id;
    this.editingTechForm.name = name;
    this.editingTechForm.description = description;
    this.editingTechForm.courses = courses;
    console.log(this.editingTechForm);
    this.techData.editOldTech(this.editingTechForm);
    //this.techData.editOldCourse(this.editingTechForm);
  }


}

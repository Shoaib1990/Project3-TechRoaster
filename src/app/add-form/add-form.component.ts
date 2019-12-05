import { Component, OnInit } from '@angular/core';
import { TechDataService } from '../techData.service';
//import { Course, Technology } from '../data.model';
import { Course } from '../dataSample.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  public addingCourseForm: Course = new Course();
  //public addingTechForm: Technology = new Technology();

  constructor(public techData:TechDataService) {

      this.addingCourseForm.code = "";
      this.addingCourseForm.name = "";

  }
  
  ngOnInit() {}

  public storeNewCourseData() {
    console.log(this.addingCourseForm);
    this.techData.saveNewCourse(this.addingCourseForm);
    for (const iterator of Object.values(this.addingCourseForm)) {
      //console.log("addingCourseForm " + this.addingCourseForm.code + " " + iterator);      
    }
  }

}

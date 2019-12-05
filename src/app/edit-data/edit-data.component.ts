import { Component, OnInit } from '@angular/core';
import { TechDataService } from '../techData.service';
import { Course } from '../dataSample.model';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  public editingCourseForm: Course = new Course();

  constructor(public techData:TechDataService) {
    
  }

  

  ngOnInit() {
  }

  public editOldCourseData(id:string, code:string, name:string) {
    this.editingCourseForm._id = id;
    this.editingCourseForm.code = code;
    this.editingCourseForm.name = name;
    console.log(this.editingCourseForm);
    this.techData.editOldCourse(this.editingCourseForm);
  }

  //public toggleCourseAddForm(): void { this.displaySwitch = !this.displaySwitch;}

}

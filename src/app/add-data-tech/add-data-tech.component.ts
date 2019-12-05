import { Component, OnInit } from '@angular/core';
import { TechDataService } from '../techData.service';
//import { Course, Technology } from '../data.model';
import { Course, Technology, TechnologyCourse } from '../dataSample.model';

@Component({
  selector: 'app-add-data-tech',
  templateUrl: './add-data-tech.component.html',
  styleUrls: ['./add-data-tech.component.scss']
})
export class AddDataTechComponent implements OnInit {

  public addingTechForm: Technology = new Technology();
  
  private techCourseObject:TechnologyCourse;
  public techCourses:TechnologyCourse[];

  constructor(public techData:TechDataService) {

    this.addingTechForm.name = "";
    this.addingTechForm.description = "";
    this.addingTechForm.difficulty;
    this.addingTechForm.courses = [];
    this.techCourseObject;
    this.techCourses = [];
    
  }

  ngOnInit() {}

  public addToArray(_courseCode:any, _courseName:any, event:any): void {
    this.techCourseObject = {
      "code": _courseCode,
      "name": _courseName
  }
    if(event.target.checked) {
      console.log(_courseName,_courseCode);
      this.addingTechForm.courses.push(this.techCourseObject);
    } else {
      this.addingTechForm.courses.forEach( (item, index) => {
        if(item === this.techCourseObject) this.addingTechForm.courses.splice(index,1);
    });

    }

    // this.addingTechForm.courses.forEach(course => {
    //   course.code = _courseCode;
    //   course.name = _courseName;
    // })
//    this.addingTechForm.courses.push(_courseName);
    console.log(this.addingTechForm.courses);
    
} 
  

  public storeNewTechData() {
    console.log(this.addingTechForm);
    this.techData.saveNewTech(this.addingTechForm);
    for (const iterator of Object.values(this.addingTechForm)) {
      console.log("addingTechForm " + this.addingTechForm.courses);      
    }
  }

}
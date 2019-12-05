import {Injectable, Input} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JSONSample, Technology, Course, TechnologyCourse} from "./dataSample.model";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// all services need this decorator function
@Injectable()

export class TechDataService {
    // request url of Web API to get/put/delete/post JSON
    private courseScript:string = "http://localhost:8080/get";
    private SEND_JSON_TECH: string = "http://localhost:8080/postTech"
    private SEND_JSON: string = "http://localhost:8080/post";
    private DELETE_JSON: string = "http://localhost:8080/delete/";
    private DELETE_JSON_TECH: string = "http://localhost:8080/deleteTech/";
    private PUT_JSON: string = "http://localhost:8080/put";
    private PUT_JSON_TECH: string = "http://localhost:8080/putTech"
    // the http service to be injected
    private http:HttpClient;
    public spinner: string;
    // array of Json data
    public jsonTechData:Technology[];
    public jsonCourseData:Course[];
    public _id: string;
    public name: string;
    public description: string;
    public difficulty: number;
    public courses: Course[];
    public courseId: string;
    public courseName: string;
    public courseCode: string;
    public techNewCourseArray:any[];

    // editComponent and deleteComponent variable

    public courseIdAction: string;
    public courseNameAction: string;
    public courseCodeAction: string;
    public techIdAction: string;
    public techNameAction: string;
    public techDescriptionAction: string;
    public techDifficultyAction: number;
    public techCoursesAction: any[];
    public techCoursesNameAction: any[];
    public techCoursesCodeAction: string;
    public techEditObject: any;
    

    // injecting Http service into PortfolioDataService
    constructor(myHttp:HttpClient){
        this.http = myHttp;
        this.spinner = "flex";
    }

    // load the app after every changes
    public load(): void {
        console.log("Loading Data! :)");

        // using services => techData.service
        this.http.get<JSONSample>(this.courseScript).subscribe(
            data => {

                // turn off the spinner when data loaded
                this.spinner = "none";                
                
                let json:JSONSample = data;
                // storing the complete api data in jsonTechData
                this.jsonTechData = json.technologies;
                this.jsonCourseData = json.courses;
                
                // storing data to variables
                for(let course of this.jsonCourseData) {
                    this.courseId = course._id;
                    this.courseName = course.name;
                    this.courseCode = course.code;
                }
                

                // storing data to variables
                for(let item of this.jsonTechData) {
                    
                    this._id = item._id;
                    this.name = item.name;                    
                    this.description = item.description;
                    this.difficulty = item.difficulty;   
                }                
            }, err => {
                this.spinner = "none";
                console.log("Error retrieving portfolio data :(");
            }
        )
    }

    // adding new technology
    public saveNewTech(newTech: Technology): void{
        this.http.post(this.SEND_JSON_TECH, newTech).subscribe(
            (val) => {
                console.log("PUT call successfu value returned in body", val);
                // using load method to refresh after submitting the form
                this.spinner = "flex";
                this.load();
            },
            (response) => {
                console.log("PUT call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed.");
            });
            console.log(newTech);
    }

    // adding new course
    public saveNewCourse(newCourse: Course): void{
        this.http.post(this.SEND_JSON, newCourse).subscribe(
            (val) => {
                console.log("POST call successfu value returned in body", val);
                this.spinner = "flex";
                // using load method to refresh after submitting the form
                
                this.load();
            },
            (response) => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed.");
            });
            console.log(newCourse);
    }

    // editing old course
    public editOldCourse(putCourse:Course):void {
        this.http.put(this.PUT_JSON, putCourse).subscribe(
          (val) => {
                console.log("PUT call successful returned value in body", val);
                this.spinner = "flex";
                this.load();
            },
            (response) => {
                console.log("PUT call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed."); 
            });
            console.log(putCourse);
    }

    // public confirmEditTech():void {
    //     this.editOldTech(this.techEditObject);
    //     //this.editOldTech(this.techCoursesAction);
    // }

    // editing old tech
    public editOldTech(putTech:any):void {
        console.log('dsbxfjksmhdskjs', putTech);
        this.http.put(this.PUT_JSON_TECH, putTech).subscribe(
            (val) => {
                console.log("PUT call successful returned value in body", val);
                this.spinner = "flex";
                this.load();
            },
            (response) => {
                console.log("PUT call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed."); 
            });
            console.log(putTech);
    }

    // delete old course
    public deleteExistingCourse(deleteCourse: any): void {
        this.http.delete(this.DELETE_JSON+deleteCourse).subscribe(
            (val) => {
                console.log("DELETE call successfu value returned in body", val);
                this.spinner = "flex";
                this.load();
            },
            (response) => {
                console.log("DELETE call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed.");
            });
            console.log(deleteCourse);
    }

    // delete old technology
    public deleteExistingTech(deleteTech: any): void {
        this.http.delete(this.DELETE_JSON_TECH+deleteTech).subscribe(
            (val) => {
                console.log("DELETE call successfu value returned in body", val);
                this.spinner = "flex";
                this.load();
            },
            (response) => {
                console.log("DELETE call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed.");
            });
            console.log(deleteTech);
    }


// pass parameters required for course delete form
    public courseDeleteForm(courseID:string, code:string, course:string): void { 
       
        this.courseIdAction = courseID;
        this.courseNameAction = course;
        this.courseCodeAction = code;
        //console.log(courseID);
        
    }

    // pass parameters required for tech delete form
    public techDeleteForm(techId:string,name: string): void { 
        
        this.techIdAction = techId;
        this.techNameAction = name;
        console.log(techId, name);
    }
    
    // pass parameters required for course edit form
    public courseEditForm(courseID:string, code:string, course:string): void { 
        this.courseNameAction = course;
        this.courseCodeAction = code;
        this.courseIdAction = courseID;
        console.log(courseID);
    }
    
    // pass parameters required for tech edit form
    public techEditForm(id:string ,name:string, description:string, difficulty:number, courses:any[]): void { 
        this.techIdAction = id;
        this.techNameAction = name;
        this.techDescriptionAction = description;
        this.techDifficultyAction = difficulty;
        this.techCoursesAction = courses.map(c => ({...c, selected: true}));
        //console.log(this.techCoursesAction.values());
        
        this.jsonCourseData.forEach(course => {
            const courseSelected = courses.some(c => c.code === course.code);
            if (!courseSelected) {
                this.techCoursesAction.push(course);
            }
        });

        this.techEditObject = {"_id": this.techIdAction,"name":this.techNameAction,"description": this.techDescriptionAction, "difficulty": this.techDifficultyAction, "courses": this.techCoursesAction};
        console.log(this.techEditObject);
        
        //console.log('ccccccccc', this.techCoursesAction);
        //this.editOldTech(this.techCoursesAction);
        //this.confirmEditTech();
        /*
        for(let course of this.techCoursesAction) {
            // console.log(course.name);
            
            this.techCoursesNameAction.push(course.name);
            console.log(this.techCoursesNameAction);
        }
        */
        //this.editTechForm = !this.editTechForm;
    }
    
}
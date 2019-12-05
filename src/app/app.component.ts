import { Component, OnInit } from '@angular/core';
import { TechDataService } from "./techData.service";
import { faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TechDataService]
})
export class AppComponent implements OnInit {

  constructor(public techData: TechDataService, public router: Router) {}

  faCoffee = faCoffee;
  faSpinner = faSpinner;
  
  public ngOnInit():void {
    this.techData.load();
    
    
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { mainComponent } from './main-page/main-page.component';
import { AddFormComponent } from './add-form/add-form.component';
import { DeleteDataComponent } from './delete-data/delete-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { EditDataTechComponent } from './edit-data-tech/edit-data-tech.component';
import { AddDataTechComponent } from './add-data-tech/add-data-tech.component';
import { DeleteDataTechComponent } from './delete-data-tech/delete-data-tech.component';

@NgModule({
  declarations: [
    AppComponent,
    mainComponent,
    AddFormComponent,
    DeleteDataComponent,
    EditDataComponent,
    EditDataTechComponent,
    AddDataTechComponent,
    DeleteDataTechComponent
  ],
  imports: [
    FontAwesomeModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,

    RouterModule.forRoot([
      { path: "main",component: mainComponent},
      { path: "editCourse",component: EditDataComponent},
      { path: "editTech",component: EditDataTechComponent},
      { path: "addCourse",component: AddFormComponent},
      { path: "addTech",component: AddDataTechComponent},
      { path: "deleteCourse",component: DeleteDataComponent},
      { path: "deleteTech",component: DeleteDataTechComponent},
      { path: "", redirectTo: "main",pathMatch: "full"},
      { path: "**", redirectTo: "main",pathMatch: "full"},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

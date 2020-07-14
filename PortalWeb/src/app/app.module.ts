import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatDialogModule,
  MatToolbarModule,
  MatInputModule,
  MatTooltipModule,
  MatBadgeModule,
  MatSelectModule,
  MatOptionModule,
  MatListModule
} from "@angular/material";
import { DetailService } from "./shared/detail.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommentsComponent } from "./components/comments/comments.component";
// import {
//   MsAdalAngular6Module,
//   AuthenticationGuard
// } from "microsoft-adal-angular6";
// import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ShowMessageComponent } from "./components/show-message/show-message.component";
import { AddMessageComponent } from "./components/add-message/add-message.component";
import { CommonModule } from "@angular/common";
import { ApprovedMessageComponent } from "./components/approved-message/approved-message.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { MatTabsModule } from "@angular/material/tabs";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { OpenMessageComponent } from "./components/open-message/open-message.component";
import { NgxFileDropModule } from "ngx-file-drop";
import { MatChipsModule } from "@angular/material/chips";
import { MessagesComponent } from './components/messages/messages.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { NewsComponent } from './components/news/news.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AboutComponent } from './components/about/about.component';
import { LiteratureComponent } from './components/literature/literature.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditLiteratureComponent } from './components/edit-literature/edit-literature.component';
import { EditNewsComponent } from './components/edit-news/edit-news.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowMessageComponent,
    CommentsComponent,
    AddMessageComponent,
    ApprovedMessageComponent,
    OpenMessageComponent,
    MessagesComponent,
    EmployeesComponent,
    DocumentationComponent,
    NewsComponent,
    ScheduleComponent,
    AboutComponent,
    LiteratureComponent,
    EditEmployeeComponent,
    EditLiteratureComponent,
    EditNewsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    MatTooltipModule,
    FontAwesomeModule,
    NgxFileDropModule,
    MatChipsModule,
    // MsAdalAngular6Module.forRoot({
    //   // instance: "https://login.microsoftonline.com/",
    //   // tenant: "0329a311-16b0-49e5-98f9-0a71d1134f6f", //
    //   // clientId: "5b78ed9a-fde9-4d6a-8b04-48a49752ef92", //
    //   // redirectUri: "https://pdp.mibo.ba",
    //   // navigateToLoginRequestUrl: true, // false je bilo
    //   // cacheLocation: "localStorage"

    //   instance: 'https://login.microsoftonline.com/',
    //   tenant: '783f3846-1a66-47b4-9188-c2e65baabcfa', //
    //   clientId: '8deb6b84-8d3b-473f-8685-7de630899343', //
    //   redirectUri: 'http://localhost:4200/',
    //   navigateToLoginRequestUrl: true, // false je bilo
    //   cacheLocation: 'localStorage',
    // })
  ],
  entryComponents: [
    AddMessageComponent,
    CommentsComponent,
    ApprovedMessageComponent,
    OpenMessageComponent,
    EditEmployeeComponent,
    EditLiteratureComponent,
    EditNewsComponent
  ],
  providers: [
    DetailService,
    // AuthenticationGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

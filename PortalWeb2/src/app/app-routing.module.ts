import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowMessageComponent } from './components/show-message/show-message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { NewsComponent } from './components/news/news.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AboutComponent } from './components/about/about.component';
import { LiteratureComponent } from './components/literature/literature.component';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

const routes: Routes = [
{
    path: '', component: ShowMessageComponent,
    children: [
      { path: '', component: AboutComponent },
      { path: 'Messages', component: MessagesComponent },
      { path: 'Employees', component: EmployeesComponent },
      { path: 'News', component: NewsComponent },
      { path: 'Documentation', component: DocumentationComponent },
      { path: 'Schedule', component: ScheduleComponent },
      { path: 'About', component: AboutComponent },
      { path: 'Literature', component: LiteratureComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

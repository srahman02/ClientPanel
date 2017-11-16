import { RegisterGuard } from './guards/register.guard';
import { SettingService } from './services/setting.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Angular fire import
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase,AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import {AngularFireAuth} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
// Service import
import { ClientService } from './services/client.service';
const appRoutes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'add-client',
    component: AddClientComponent,
  },
  {
    path:'client/:id',
    component: ClientDetailsComponent,
  },
  {
    path:'edit-client/:id',
    component: EditClientComponent,
  },
  {
    path:'**',
    component: LoginComponent
  }
  

]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlashMessagesModule,
    
    
    
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    AuthGuard,
    SettingService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

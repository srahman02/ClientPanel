import { SettingService } from './../../services/setting.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser : string;
  allowRegistration: boolean;

  constructor(
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private settingService: SettingService
  ) { }

  ngOnInit() {

    this.authService.user.subscribe(auth=>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    });
    this.allowRegistration = this.settingService.getSetting().allowRegistration;
  }

  logout(){
      this.authService.logout().then(success=>{
      this.flashMessageService.show("Logged you out...",{cssClass:'alert alert-success',timeout:4000});
      this.router.navigate(['/login']);
    })
    .catch(err=>{
      this.flashMessageService.show(err.message,{cssClass:'alert alert-success',timeout:4000});
    })
    

  }
}

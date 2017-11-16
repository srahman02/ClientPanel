import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password: string;

  constructor(
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(){
      this.authService.login(this.email,this.password).then((res)=>{
      this.flashMessageService.show("Successfully logged in",{cssClass:'alert alert-success',timeout:4000});
      this.router.navigate(['/']);
  })
  .catch(err=>{
    this.flashMessageService.show(err.message,{cssClass:'alert alert-success',timeout:4000});
    this.router.navigate(['/login']);

  });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signup(){
    this.authService.signup(this.email,this.password).then((res)=>{
      this.flashMessageService.show("Successfully created user",{cssClass:'alert alert-success',timeout:4000});
      this.router.navigate(['/']);
  })
  .catch(err=>{
    this.flashMessageService.show(err.message,{cssClass:'alert alert-success',timeout:4000});
    this.router.navigate(['/register']);

  });
  }

}

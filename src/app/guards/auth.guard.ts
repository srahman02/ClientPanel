import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate{
    authState: any = null;
    
    constructor(
        private router: Router,
        private angularFireAuth: AngularFireAuth,
        private authService: AuthService

    ){
        this.authService.user.subscribe(auth=>{
            this.authState = auth;
        });
    }
    
    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean{
                if(!this.authState){
                    this.router.navigate(['/login']);
                    return false;
                } else{
                    return true;
                }
    }
}
import { SettingService } from './../services/setting.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RegisterGuard implements CanActivate{
    authState: any = null;
    
    constructor(
        private router: Router,
        private settingService: SettingService

    ){
    }
    
    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean{
           if(this.settingService.getSetting().allowRegistration){
               return true;

           }else{
               this.router.navigate(['/login']);
               return false;
           }
    }
}
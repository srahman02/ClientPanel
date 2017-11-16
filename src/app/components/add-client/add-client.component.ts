import { SettingService } from './../../services/setting.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  }
  disableBalanceOnAdd: boolean = false;
  constructor(private flashMessagesService: FlashMessagesService, 
    private router:Router, 
    private clientService: ClientService,
    private settingService:SettingService) { 

  }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSetting().disableBalanceOnAdd;
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      this.flashMessagesService.show("Please Fill in all fields",{cssClass:'alert alert-danger', timeout:4000});
      this.router.navigate(["add-client"]);
    }else{
      this.clientService.addNewClient(value);
      this.flashMessagesService.show("New Client Added",{cssClass:'alert alert-success', timeout:4000});
      this.router.navigate(["/"]);
      
    }

  }




}

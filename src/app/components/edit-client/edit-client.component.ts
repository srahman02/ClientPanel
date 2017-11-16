import { SettingService } from './../../services/setting.service';
import { Client } from './../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0

  }
  disableBalanceOnEdit: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.id = params.get('id');
    });
    //this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingService.getSetting().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {

    if (!valid) {
      this.flashMessagesService.show("Please Fill in all fields", { cssClass: 'alert alert-danger', timeout: 4000 });
      this.router.navigate(['edit-client/'+this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show("Client Updated", { cssClass: 'alert alert-success', timeout: 4000 });
      this.router.navigate(['/client/'+this.id]);

    }

  }
}

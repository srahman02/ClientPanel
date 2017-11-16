import { Client } from './../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id:string;
  client: Client;
  hasBalance : boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(public router:Router,
  public route: ActivatedRoute,
  public flashMessagesService: FlashMessagesService,
  public clientService: ClientService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client=>{
      if(client.balance>0){
        this.hasBalance = true;
      }
      this.client = client;
      console.log(this.client);
    });

    }

    onUpdateBalance(id:string){
      this.clientService.updateClient(this.id, this.client);
      this.flashMessagesService.show("Balance Updated",{cssClass:'alert alert-success', timeout:4000});
      this.router.navigate(["/client/"+this.id]);
    }

    onClickDelete(){
      if(confirm("Do you really want to delete?")){
        this.clientService.deleteClient(this.id);
        this.flashMessagesService.show("Client Deleted",{cssClass:'alert alert-success', timeout:4000});
        this.router.navigate(['/']);

      }
    }
  }



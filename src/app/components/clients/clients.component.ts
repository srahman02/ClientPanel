import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any[];
  totalBalance:number;

  constructor(public clientService: ClientService) { }

  ngOnInit() {
      this.clientService.getAllClient().subscribe(clients=>{
        this.clients = clients;
        this.getTotalBalance();
      });
      
  }
  getTotalBalance(){
    let total = 0;
    for(let i = 0;i<this.clients.length; i++){
      total += parseFloat(this.clients[i].balance);

    }
    this.totalBalance = total;

}
}

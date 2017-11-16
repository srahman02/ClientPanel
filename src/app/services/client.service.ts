import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// for database
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs';
import {Client} from '../models/client';

@Injectable()
export class ClientService {
  
  clients : FirebaseListObservable<any[]>;
  client  : FirebaseObjectObservable<any>;

  constructor(private database: AngularFireDatabase) {
        this.clients = this.database.list('/clients');
   }

   getAllClient(){
     return this.clients;
   }

   addNewClient(client:Client){
     this.clients.push(client);

   }
   getClient(id:string){
     this.client = this.database.object('/clients/'+id) as FirebaseObjectObservable<Client>;
      return this.client;
   }

   updateClient(id:string, client:Client){
     return this.clients.update(id,client);

   }

   deleteClient(id:string){
     return this.clients.remove(id);

   }

}

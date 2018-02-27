import {Component,OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {ClientService} from './clientService';
import {AddClientPage} from './addClient'
import {ClientDetailPage} from './clientDetail'
import {EditClientPage} from './editClient'
import {SearchPipe} from './search.pipe'
import {UserService} from '../user/userService'

@Component({
  templateUrl: 'clientList.html'
})
export class ClientListPage implements OnInit{
  clients:FirebaseListObservable<any[]>;
  searchClient:string;
  clientList:any;
  files:any;
  constructor(private userService: UserService,private navCtrl: NavController,private clientService:ClientService) {
    this.userService.auth.onAuthStateChanged((auth)=>{
        this.clients=this.clientService.getClients();
        if(this.clientService.initLocalClient){
          this.clientList=this.clientService.getLocalClientList();        }
    })
    this.searchClient="";
  }
  ngOnInit(){

  }
  navAdd(){
    this.searchClient="";
    this.navCtrl.push(AddClientPage);
  }
  deleteClient(clientKey){
    this.clientService.deleteClient(clientKey);
    this.searchClient="";
  }
  navClient(client, name){
    console.log(client);
    this.clientService.client = this.clientService.af.object('clients/'+this.clientService.userId +'/'+client.$key);
    //this.clientService.client=client;
    this.clientService.clientName=name;
    this.clientService.setClientTasks(client.$key);
    this.navCtrl.push(ClientDetailPage);
  }
  navEditClient(client){
    this.clientService.setEditClientData(client,client.name,client.email,client.phoneNumber,client.address, client.$key);
    this.navCtrl.push(EditClientPage);
  }
  onInput(event){
    console.log(event)
    //this.clientService.initAddClient=false;
  }
}

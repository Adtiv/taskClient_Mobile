import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {UserService} from '../user/userService'
import {ClientService} from './clientService'
import {TaskService} from '../tasks/taskService';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'editClient.html'
})
export class EditClientPage implements OnInit {
  clientTasks:FirebaseListObservable<any[]>
  client:FirebaseObjectObservable<any>;
  name:string;
  email:string;
  phoneNumber:string;
  address:string;
  key:string;
  constructor(private clientService:ClientService,private taskService:TaskService,private userService:UserService,private af:AngularFireDatabase,private navCtrl: NavController) {
  }
  ngOnInit(){
    this.userService.auth.onAuthStateChanged((user)=>{
      this.client=this.clientService.getClient();
      this.client.subscribe((client)=>{
        this.key=client.$key;
        console.log(client);
      });
      this.name=this.clientService.clientName;
      this.email=this.clientService.clientEmail;
      this.phoneNumber=this.clientService.clientPhoneNumber;
      this.address=this.clientService.clientAddress;
    });
  }
  editClient(){
    //console.log(this.name + this.email + this.phoneNumber + this.address + this.key);
    var nav = this.navCtrl;
    this.clientService.updateClient(this.key,this.name,this.email,this.phoneNumber,this.address).then(function(snapshot) {
      // The Promise was "fulfilled" (it succeeded).
      console.log(snapshot);
      nav.pop();
    });
  }
}

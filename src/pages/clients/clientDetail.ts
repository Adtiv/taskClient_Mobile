import {Component, OnInit} from '@angular/core';
import {NavController,LoadingController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth } from 'angularfire2/auth';
import {UserService} from '../user/userService'
import {ClientService} from './clientService'
import {TaskService} from '../tasks/taskService';
import {EditClientPage} from './editClient'
import {Dropbox} from '../clients/dropboxService';
@Component({
  templateUrl: 'clientDetail.html'
})
export class ClientDetailPage implements OnInit {
  clientTasks:FirebaseListObservable<any[]>
  client:FirebaseObjectObservable<any>;
  name:string;
  files:any;
  path:string;
  constructor(private Loading:LoadingController,private dropbox: Dropbox,private clientService:ClientService,private taskService:TaskService,private userService:UserService,private af:AngularFireDatabase,private navCtrl: NavController) {
  }
  ngOnInit(){
    this.userService.auth.onAuthStateChanged((user)=>{
      this.files = [];
      //this.dropbox.setAccessToken("vSWm2_Qnc1IAAAAAAAAOrliJEIDiA7VJNsm-XIqKhn5cCS9nht5jdBcm9xvyS7uB");
      var name;
      this.client=this.clientService.getClient();
      this.client.subscribe(client=>{
        console.log(client);
      });
      this.clientTasks=this.clientService.getClientTasks();
      console.log("before");
      this.name=this.clientService.clientName;
      console.log("NAME " + this.name);
      this.path = '/clients/'+this.name;
      console.log("path"+this.path);
      this.dropbox.getFolders(this.path).subscribe(data => {
        console.log(data.entries);
        this.files = data.entries;
        //this.depth++;
      }, err => {
        console.log(err);
      });  
    });
  }
  ionViewWillEnter(){
    console.log("EDIT CLIENT VIEW DID ENTER")
    this.client=this.clientService.getClient();
    console.log(this.client);
  }
  downloadFile(filename){
    console.log("fileName"+filename);
    let loading = this.Loading.create({
        content: 'Downloading from Dropbox...'
      });
 
    loading.present();
    this.dropbox.downloadFile(this.path+'/'+filename,loading);
  }
  getStyle(clientTask){
    if(clientTask.days<=2){
      return "rgba(255,0,0,.8)";
    }
    else if(clientTask.days<=5){
      return "rgba(255,255,0,.8)";
    }
    else{
      return "rgba(0,255,0,.8)";
    }
  }
  deleteClient(clientKey){
    this.clientService.deleteClient(clientKey);
    this.navCtrl.pop();
  }
  navEditClient(client){
    this.clientService.setEditClientData(client,client.name,client.email,client.phoneNumber,client.address, client.$key);
    this.navCtrl.push(EditClientPage);
  }
}

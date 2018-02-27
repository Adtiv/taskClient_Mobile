import { Component,OnInit } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { UserService } from './userService';
import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../tabs/tabs'
import { TaskListPage } from '../tasks/taskList'

//declare var firebase: any;
import * as firebase from 'firebase';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit{
  userEmail:string;
  userPassword:string;
  auth:Observable<any>;
  constructor(public loading:LoadingController,private userService:UserService,private nav:NavController,private alert:AlertController) {
    console.log(firebase.auth().currentUser);
  }
  ngOnInit(){
    this.userEmail="";
    this.userPassword="";
  }
  login(){
    var self = this;
    let loading = this.loading.create({
      content:"Logging in.."
    })
    loading.present();
    this.userService.loginUser(this.userEmail,this.userPassword).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      loading.dismiss();
      let prompt = self.alert.create({
            title:error,
            buttons:["Cancel"]
      })
      prompt.present()
    }).then(user=>{
        console.log("LOGGED In")
        self.userService.uid=user.uid;
        self.userService.currentUser = user.email;
        loading.dismiss();
        if(user!=null){
          let prompt = self.alert.create({
              title:"Success!",
              buttons:["Ok"]
          })
          loading.onDidDismiss(() => {
            prompt.present()
            self.nav.setRoot(TabsPage)
          });
        }
        //console.log(user)
        //this.nav.setRoot(CameraViewPage);
    });
  }
  logout(){
    console.log("gets to logout")
    this.userService.logout();
  }
}

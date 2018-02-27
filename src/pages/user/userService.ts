import {Injectable,OnInit} from '@angular/core';
//import {LoadingController} from 'ionic-angular'
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//declare var firebase: any;
import * as firebase from 'firebase';

@Injectable()
export class UserService implements OnInit{
    uid: string;
    
    //user: FirebaseObjectObservable<any[]>;
    users: FirebaseListObservable<any[]>;
    public auth:any;
    public af:AngularFireDatabase;
    public currentUser:string;
    constructor(private angularFire:AngularFireDatabase){
        this.af=angularFire;
        this.auth=firebase.auth();
        this.users=this.af.list('users/');
        //this.users.subscribe((user)=>console.log(user));
    }
    ngOnInit(){
    }
    createUser(email, password){
        return this.auth.createUserWithEmailAndPassword(email, password)
    }
    logout(){
        this.auth.signOut().then(function() {
          // Sign-out successful.
        }, function(error) {
          // An error happened.
        });
    }
    loginUser(email, password){
        /*let loading = this.loading.create({
          content:"Logging in.."
        })
        loading.present();
        */
        var self = this;
        return this.auth.signInWithEmailAndPassword(email, password)
    }
}

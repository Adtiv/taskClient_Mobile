var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
//import {LoadingController} from 'ionic-angular'
import { AngularFireDatabase } from 'angularfire2/database';
//declare var firebase: any;
import * as firebase from 'firebase';
var UserService = /** @class */ (function () {
    function UserService(angularFire) {
        this.angularFire = angularFire;
        this.af = angularFire;
        this.auth = firebase.auth();
        this.users = this.af.list('users/');
        //this.users.subscribe((user)=>console.log(user));
    }
    UserService.prototype.ngOnInit = function () {
    };
    UserService.prototype.createUser = function (email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };
    UserService.prototype.logout = function () {
        this.auth.signOut().then(function () {
            // Sign-out successful.
        }, function (error) {
            // An error happened.
        });
    };
    UserService.prototype.loginUser = function (email, password) {
        /*let loading = this.loading.create({
          content:"Logging in.."
        })
        loading.present();
        */
        var self = this;
        return this.auth.signInWithEmailAndPassword(email, password);
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireDatabase])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=userService.js.map
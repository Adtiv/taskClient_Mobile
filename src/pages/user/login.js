var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from './userService';
import { TabsPage } from '../tabs/tabs';
//declare var firebase: any;
import * as firebase from 'firebase';
var LoginPage = /** @class */ (function () {
    function LoginPage(loading, userService, nav, alert) {
        this.loading = loading;
        this.userService = userService;
        this.nav = nav;
        this.alert = alert;
        console.log(firebase.auth().currentUser);
    }
    LoginPage.prototype.ngOnInit = function () {
        this.userEmail = "";
        this.userPassword = "";
    };
    LoginPage.prototype.login = function () {
        var self = this;
        var loading = this.loading.create({
            content: "Logging in.."
        });
        loading.present();
        this.userService.loginUser(this.userEmail, this.userPassword).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            loading.dismiss();
            var prompt = self.alert.create({
                title: error,
                buttons: ["Cancel"]
            });
            prompt.present();
        }).then(function (user) {
            console.log("LOGGED In");
            self.userService.uid = user.uid;
            self.userService.currentUser = user.email;
            loading.dismiss();
            if (user != null) {
                var prompt_1 = self.alert.create({
                    title: "Success!",
                    buttons: ["Ok"]
                });
                loading.onDidDismiss(function () {
                    prompt_1.present();
                    self.nav.setRoot(TabsPage);
                });
            }
            //console.log(user)
            //this.nav.setRoot(CameraViewPage);
        });
    };
    LoginPage.prototype.logout = function () {
        console.log("gets to logout");
        this.userService.logout();
    };
    LoginPage = __decorate([
        Component({
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [LoadingController, UserService, NavController, AlertController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map
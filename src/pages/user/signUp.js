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
import { NavController } from 'ionic-angular';
import { UserService } from './userService';
import { LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
var SignUpPage = /** @class */ (function () {
    function SignUpPage(nav, userService, loading, alert) {
        this.nav = nav;
        this.userService = userService;
        this.loading = loading;
        this.alert = alert;
    }
    SignUpPage.prototype.ngOnInit = function () {
        this.signUpEmail = "";
        this.signUpPassword = "";
        this.users = this.userService.users;
    };
    SignUpPage.prototype.signUp = function () {
        var _this = this;
        var self = this;
        var loading = this.loading.create({
            content: "Signing Up.."
        });
        loading.present();
        this.userService.createUser(this.signUpEmail, this.signUpPassword).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            loading.dismiss();
            var prompt = self.alert.create({
                title: error,
                buttons: ["Cancel"]
            });
            prompt.present();
            // ...
        }).then(function (user) {
            loading.dismiss();
            if (user != null) {
                self.userService.af.object('users/' + user.uid).set({ email: _this.signUpEmail });
                var prompt_1 = self.alert.create({
                    title: "Success! new account created",
                    buttons: ["Ok"]
                });
                loading.onDidDismiss(function () {
                    prompt_1.present();
                    self.nav.setRoot(TabsPage);
                });
            }
        });
    };
    SignUpPage = __decorate([
        Component({
            templateUrl: 'signUp.html'
        }),
        __metadata("design:paramtypes", [NavController, UserService, LoadingController, AlertController])
    ], SignUpPage);
    return SignUpPage;
}());
export { SignUpPage };
//# sourceMappingURL=signUp.js.map
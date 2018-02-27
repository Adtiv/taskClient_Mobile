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
import { Platform } from 'ionic-angular';
import { LoginPage } from './login';
import { SignUpPage } from './signUp';
import { AngularFireDatabase } from 'angularfire2/database';
//declare var LoginPage:any;
//declare var SignUpPage:any;
//declare var CameraViewPage:any;
//declare var firebase : any;
import * as firebase from 'firebase';
var x;
var HomePage = /** @class */ (function () {
    function HomePage(af, nav, platform) {
        this.af = af;
        this.nav = nav;
        this.platform = platform;
        var fileReader = new FileReader();
        //console.log(this.map["hello"]="hi");
        //console.log(downloadURL);
        this.auth = firebase.auth();
        /*
        this.images = this.af.database.list('images/');
        this.storageRef = firebase.storage().ref('pics/');
        var file;
        this.af.database.list('images/').subscribe((pics)=>{
        });
        var test = function(){
          console.log("HERE");
          console.log(this.auth);
        }
        test()
        */
    }
    HomePage.prototype.ngOnInit = function () {
        //this.initPics();
    };
    HomePage.prototype.navLogin = function () {
        this.nav.push(LoginPage);
    };
    HomePage.prototype.navSignUp = function () {
        this.nav.push(SignUpPage);
    };
    HomePage.prototype.navMain = function () {
        //this.nav.setRoot(CameraViewPage);
    };
    HomePage.prototype.preview = function () {
        if (!this.platform.is('android')) {
            localStorage.setItem('hasBeenHome', "true");
            var tapEnabled = false;
            var dragEnabled = false;
            var toBack = true;
            var rect = {
                x: 0,
                y: 0,
                width: this.platform.width(),
                height: this.platform.height()
            };
            cordova.plugins.camerapreview.startCamera(rect, "rear", tapEnabled, dragEnabled, toBack);
            location.reload(true);
        }
        else {
            //this.nav.setRoot(CameraViewPage);
        }
    };
    HomePage = __decorate([
        Component({
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [AngularFireDatabase, NavController, Platform])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map
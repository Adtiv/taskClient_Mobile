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
import { Http, Headers } from '@angular/http';
import { UserService } from '../user/userService';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';
var Dropbox = /** @class */ (function () {
    function Dropbox(http, iab, userService) {
        var _this = this;
        this.http = http;
        this.iab = iab;
        this.userService = userService;
        this.folderHistory = [];
        this.appKey = 'cm4wdj4ieymomyi';
        this.redirectURI = 'http://localhost';
        this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
        this.accessToken = "vSWm2_Qnc1IAAAAAAAAP1SEo5-FXljH_z3YybOWkYRepw-S08Y_113pmk-xcxOOX";
        this.userService.auth.onAuthStateChanged(function (user) {
            console.log("from Dropbox" + user.uid);
            //this.user = 
            if (user.dropboxToken) {
                _this.setAccessToken(user.dropboxToken);
            }
            //this.userService.af.object('users/'+user.uid).subscribe(()
            //this.clients.push({uid:this.userService.uid,name:name,email:email,phoneNumber:phoneNumber,address:address})
            //.update
        });
    }
    Dropbox.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    Dropbox.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var browser = _this.iab.create(_this.url, '_blank');
            var listener = browser.on('loadstart').subscribe(function (event) {
                //Ignore the dropbox authorize screen
                if (event.url.indexOf('oauth2/authorize') > -1) {
                    return;
                }
                //Check the redirect uri
                if (event.url.indexOf(_this.redirectURI) > -1) {
                    listener.unsubscribe();
                    browser.close();
                    var token = event.url.split('=')[1].split('&')[0];
                    _this.accessToken = token;
                    _this.userService.af.object('users/' + _this.userService.uid).update({ dropboxToken: token });
                    resolve(event.url);
                }
                else {
                    reject("Could not authenticate");
                }
            });
        });
    };
    Dropbox.prototype.getUserInfo = function () {
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('https://api.dropboxapi.com/2-beta-2/users/get_current_account', "null", { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Dropbox.prototype.getFolders = function (path) {
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        var folderPath;
        if (typeof (path) == "undefined" || !path) {
            folderPath = {
                path: ""
            };
        }
        else {
            folderPath = {
                path: path
            };
            if (this.folderHistory[this.folderHistory.length - 1] != path) {
                this.folderHistory.push(path);
            }
        }
        return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    Dropbox.prototype.downloadFile = function (path, loading) {
        var url = "https://api-content.dropbox.com/1/files/auto/" + path;
        var result;
        //InAppBrowser.open(url, '_system', 'location=yes');
        loading.dismiss();
    };
    Dropbox.prototype.goBackFolder = function () {
        if (this.folderHistory.length > 0) {
            this.folderHistory.pop();
            var path = this.folderHistory[this.folderHistory.length - 1];
            return this.getFolders(path);
        }
        else {
            return this.getFolders();
        }
    };
    Dropbox = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, InAppBrowser, UserService])
    ], Dropbox);
    return Dropbox;
}());
export { Dropbox };
//# sourceMappingURL=dropboxService.js.map
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
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user/userService';
import { ClientService } from './clientService';
import { TaskService } from '../tasks/taskService';
import { EditClientPage } from './editClient';
import { Dropbox } from '../clients/dropboxService';
var ClientDetailPage = /** @class */ (function () {
    function ClientDetailPage(Loading, dropbox, clientService, taskService, userService, af, navCtrl) {
        this.Loading = Loading;
        this.dropbox = dropbox;
        this.clientService = clientService;
        this.taskService = taskService;
        this.userService = userService;
        this.af = af;
        this.navCtrl = navCtrl;
    }
    ClientDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.files = [];
            //this.dropbox.setAccessToken("vSWm2_Qnc1IAAAAAAAAOrliJEIDiA7VJNsm-XIqKhn5cCS9nht5jdBcm9xvyS7uB");
            var name;
            _this.client = _this.clientService.getClient();
            _this.clientTasks = _this.clientService.getClientTasks();
            console.log("before");
            _this.name = _this.clientService.clientName;
            console.log("NAME " + _this.name);
            _this.path = '/clients/' + _this.name;
            console.log("path" + _this.path);
            _this.dropbox.getFolders(_this.path).subscribe(function (data) {
                console.log(data.entries);
                _this.files = data.entries;
                //this.depth++;
            }, function (err) {
                console.log(err);
            });
        });
    };
    ClientDetailPage.prototype.downloadFile = function (filename) {
        console.log("fileName" + filename);
        var loading = this.Loading.create({
            content: 'Downloading from Dropbox...'
        });
        loading.present();
        this.dropbox.downloadFile(this.path + '/' + filename, loading);
    };
    ClientDetailPage.prototype.getStyle = function (clientTask) {
        if (clientTask.days <= 2) {
            return "rgba(255,0,0,.8)";
        }
        else if (clientTask.days <= 5) {
            return "rgba(255,255,0,.8)";
        }
        else {
            return "rgba(0,255,0,.8)";
        }
    };
    ClientDetailPage.prototype.deleteClient = function (clientKey) {
        this.clientService.deleteClient(clientKey);
        this.navCtrl.pop();
    };
    ClientDetailPage.prototype.navEditClient = function (client) {
        this.clientService.setEditClientData(client, client.name, client.email, client.phoneNumber, client.address, client.$key);
        this.navCtrl.push(EditClientPage);
    };
    ClientDetailPage = __decorate([
        Component({
            templateUrl: 'clientDetail.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Dropbox, ClientService, TaskService, UserService, AngularFireDatabase, NavController])
    ], ClientDetailPage);
    return ClientDetailPage;
}());
export { ClientDetailPage };
//# sourceMappingURL=clientDetail.js.map
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
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user/userService';
import { ClientService } from './clientService';
import { TaskService } from '../tasks/taskService';
var AddClientPage = /** @class */ (function () {
    function AddClientPage(clientService, taskService, userService, af, navCtrl) {
        this.clientService = clientService;
        this.taskService = taskService;
        this.userService = userService;
        this.af = af;
        this.navCtrl = navCtrl;
    }
    AddClientPage.prototype.ngOnInit = function () {
    };
    AddClientPage.prototype.addClient = function () {
        console.log("FIRST " + this.clientService.clientList.length);
        this.clientService.addClient(this.name, this.email, this.phoneNumber, this.address);
        console.log("SECOND " + this.clientService.clientList.length);
        this.navCtrl.pop();
    };
    AddClientPage = __decorate([
        Component({
            templateUrl: 'addClient.html'
        }),
        __metadata("design:paramtypes", [ClientService, TaskService, UserService, AngularFireDatabase, NavController])
    ], AddClientPage);
    return AddClientPage;
}());
export { AddClientPage };
//# sourceMappingURL=addClient.js.map
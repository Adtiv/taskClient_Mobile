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
var EditClientPage = /** @class */ (function () {
    function EditClientPage(clientService, taskService, userService, af, navCtrl) {
        this.clientService = clientService;
        this.taskService = taskService;
        this.userService = userService;
        this.af = af;
        this.navCtrl = navCtrl;
    }
    EditClientPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.client = _this.clientService.getClient();
            _this.name = _this.clientService.clientName;
            _this.email = _this.clientService.clientEmail;
            _this.phoneNumber = _this.clientService.clientPhoneNumber;
            _this.address = _this.clientService.clientAddress;
            _this.key = _this.clientService.clientKey;
        });
    };
    EditClientPage.prototype.editClient = function () {
        //console.log(this.name + this.email + this.phoneNumber + this.address + this.key);
        this.clientService.updateClient(this.key, this.name, this.email, this.phoneNumber, this.address);
        this.navCtrl.pop();
    };
    EditClientPage = __decorate([
        Component({
            templateUrl: 'editClient.html'
        }),
        __metadata("design:paramtypes", [ClientService, TaskService, UserService, AngularFireDatabase, NavController])
    ], EditClientPage);
    return EditClientPage;
}());
export { EditClientPage };
//# sourceMappingURL=editClient.js.map
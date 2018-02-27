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
import { ClientService } from './clientService';
import { AddClientPage } from './addClient';
import { ClientDetailPage } from './clientDetail';
import { EditClientPage } from './editClient';
import { UserService } from '../user/userService';
var ClientListPage = /** @class */ (function () {
    function ClientListPage(userService, navCtrl, clientService) {
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.clientService = clientService;
        //setTimeout(() => {this.clientList=this.clientService.getLocalClientList();console.log("LIST "+this.clientList)}, 30000);  
        console.log("CLIENTLIST CONSTRUCTOR");
    }
    ClientListPage.prototype.ionViewDidEnter = function () {
        console.log("VIEW ENTERED");
        this.clientList = this.clientService.getLocalClientList();
        this.clientListLength = this.clientList.length;
        console.log("len" + this.clientListLength);
    };
    ClientListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.auth.onAuthStateChanged(function (auth) {
            _this.clients = _this.clientService.getClients();
            if (_this.clientService.initLocalClient) {
                _this.clientList = _this.clientService.getLocalClientList();
                _this.clientListLength = _this.clientList.clientListLength;
            }
            /*
            clientService.localClientObservable.subscribe((clients)=>{
              this.clientList=this.clientService.getLocalClientList();
            })*/
        });
        this.searchClient = "";
        //this.clientService.initAddClient=true;
        //setTimeout(() => { this.searchClient="" }, 1);          
    };
    ClientListPage.prototype.navAdd = function () {
        this.searchClient = "";
        this.navCtrl.push(AddClientPage);
    };
    ClientListPage.prototype.deleteClient = function (clientKey) {
        this.clientService.deleteClient(clientKey);
        this.searchClient = "";
        this.clientListLength = this.clientList.length;
    };
    ClientListPage.prototype.navClient = function (client, name) {
        this.clientService.client = client;
        this.clientService.clientName = name;
        this.clientService.setClientTasks(client.$key);
        this.navCtrl.push(ClientDetailPage);
    };
    ClientListPage.prototype.navEditClient = function (client) {
        this.clientService.setEditClientData(client, client.name, client.email, client.phoneNumber, client.address, client.$key);
        this.navCtrl.push(EditClientPage);
    };
    ClientListPage.prototype.onInput = function (event) {
        console.log(event);
        //this.clientService.initAddClient=false;
    };
    ClientListPage = __decorate([
        Component({
            templateUrl: 'clientList.html'
        }),
        __metadata("design:paramtypes", [UserService, NavController, ClientService])
    ], ClientListPage);
    return ClientListPage;
}());
export { ClientListPage };
//# sourceMappingURL=clientList.js.map
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
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user/userService';
import { Dropbox } from './dropboxService';
//import * as BoxSDK from 'box-node-sdk';
//deleting client from one source without typing anything in search copies local list
//adding client before typing anything in search copies list for both sources if other source hasnt typed anything in search
//same with update
var ClientService = /** @class */ (function () {
    function ClientService(af, userService, dropbox) {
        var _this = this;
        this.dropbox = dropbox;
        this.dupsMap = {};
        //console.log(BoxSDK);
        this.af = af;
        this.userService = userService;
        this.clientList = [];
        this.initLocalClient = true;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.userId = _this.userService.uid;
            _this.setClients();
        });
    }
    ClientService.prototype.ngOnInit = function () {
    };
    ClientService.prototype.setClients = function () {
        var _this = this;
        this.clientListLength = 0;
        this.clients = this.af.list('clients/' + this.userId, { preserveSnapshot: true });
        this.clientList = [];
        var self = this;
        this.localClientObservable = this.af.list('clients/' + this.userId, {
            query: {
                orderByChild: 'name',
            }
        });
        this.localClientObservable.subscribe(function (snapshots) {
            _this.clientListLength++;
            console.log("initLocalClient  " + _this.initLocalClient);
            var clientListLength = snapshots.length;
            if (_this.initLocalClient) {
                snapshots.forEach(function (snapshot) {
                    console.log("INSIDE INIT LOCAL");
                    //if(self.dupsMap[snapshot.$key]!==-1){
                    _this.setLocalClients(snapshot.$key, snapshot.name, snapshot.email, snapshot.phoneNumber, snapshot.address);
                    /*self.dupsMap[snapshot.$key]=-1;
                    console.log("dbLen  " + clientListLength +" localLen "+this.clientList.length);
                    if(this.clientList.length===clientListLength){
                      console.log(this.clientList)
                      this.initLocalClient=true;
                      localStorage.setItem("clientList",JSON.stringify(this.clientList));
                    }
                  }*/
                    //}
                    _this.initLocalClient = false;
                });
            }
            //this.initLocalClient=false;
        });
    };
    ClientService.prototype.setClientTasks = function (clientKey) {
        this.clientTasks = this.af.list('clientTasks/' + clientKey, {
            query: {
                orderByChild: 'days',
            }
        });
    };
    ClientService.prototype.getClientTasks = function () {
        return this.clientTasks;
    };
    ClientService.prototype.setLocalClients = function (key, name, email, phoneNumber, address) {
        this.clientList.push(new Client(key, name, email, phoneNumber, address));
    };
    ClientService.prototype.getClients = function () {
        if (this.userId != null) {
            this.clients = this.af.list('clients/' + this.userId, {
                query: {
                    orderByChild: 'name',
                }
            });
            return this.clients;
        }
    };
    ClientService.prototype.getClient = function () {
        return this.client;
    };
    ClientService.prototype.setEditClientData = function (client, name, email, phoneNumber, address, key) {
        this.client = client;
        this.clientName = name;
        this.clientEmail = email;
        this.clientPhoneNumber = phoneNumber;
        this.clientAddress = address;
        this.clientKey = key;
    };
    ClientService.prototype.getLocalClientList = function () {
        console.log("CLIENTLIST????" + this.clientList);
        //return this.clientList;
        return this.clientList;
        //return JSON.parse(localStorage.getItem('clientList'))
    };
    ClientService.prototype.addClient = function (name, email, phoneNumber, address) {
        this.initLocalClient = false;
        /*
        if(this.initAddClient){
          this.clientList = [];
        }
        */
        this.clients = this.af.list('clients/' + this.userService.uid);
        this.clientKey = this.clients.push({ uid: this.userService.uid, name: name, email: email, phoneNumber: phoneNumber, address: address }).key;
        this.addSortLocalClientArray(new Client(this.clientKey, name, email, phoneNumber, address));
        //this.setClients();
    };
    ClientService.prototype.addSortLocalClientArray = function (client) {
        console.log(this.clientList.length);
        this.clientList.push(client);
        console.log(this.clientList.length);
        this.clientList.sort(function (a, b) {
            var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
            return alc > blc ? 1 : alc < blc ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
        console.log(this.clientList.length);
    };
    ClientService.prototype.updateSortLocalClient = function (key, name, email, phoneNumber, address) {
        for (var i = 0; i < this.clientList.length; i++) {
            if (this.clientList[i].key == key) {
                this.clientList[i].name = name;
                this.clientList[i].email = email;
                this.clientList[i].phoneNumber = phoneNumber;
                this.clientList[i].address = address;
            }
        }
        this.clientList.sort(function (a, b) {
            var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
            return alc > blc ? 1 : alc < blc ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
    };
    ClientService.prototype.updateClient = function (clientKey, name, email, phoneNumber, address) {
        var _this = this;
        this.client = this.af.object('clients/' + this.userService.uid + '/' + clientKey);
        this.client.update({ name: name, email: email, phoneNumber: phoneNumber, address: address });
        this.af.list('clientTasks/' + clientKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.object('taskClients/' + snapshot.$key + '/' + clientKey).update({ client: name });
            });
        });
        this.updateSortLocalClient(clientKey, name, email, phoneNumber, address);
        //console.log(taskKey + title + description + dueDate + taskType + daysTillDue);
    };
    ClientService.prototype.deleteLocalClient = function (clientKey) {
        //figure out a way to delete from local list when delete on website
        console.log(clientKey);
        for (var i = 0; i < this.clientList.length; i++) {
            if (this.clientList[i].key === clientKey) {
                this.clientList.splice(i, 1);
            }
        }
    };
    ClientService.prototype.deleteClient = function (clientKey) {
        var _this = this;
        this.clients = this.af.list('clients/' + this.userService.uid);
        this.clients.remove(clientKey);
        this.af.list('clientTasks/' + clientKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                console.log("is this working??");
                _this.af.object('taskClients/' + snapshot.$key + '/' + clientKey).remove();
            });
        });
        this.af.list('clientTasks/' + clientKey).remove();
        this.deleteLocalClient(clientKey);
    };
    ClientService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireDatabase, UserService, Dropbox])
    ], ClientService);
    return ClientService;
}());
export { ClientService };
var Client = /** @class */ (function () {
    function Client(key, name, email, phoneNumber, address) {
        this.key = key;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
    return Client;
}());
export { Client };
//# sourceMappingURL=clientService.js.map
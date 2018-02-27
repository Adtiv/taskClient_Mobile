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
import { TaskService } from './taskService';
import { ClientService } from '../clients/clientService';
import { TaskListPage } from './taskList';
import * as moment from 'moment';
var now = moment().format('LLLL');
var AddTaskPage = /** @class */ (function () {
    function AddTaskPage(clientService, taskService, userService, af, navCtrl) {
        this.clientService = clientService;
        this.taskService = taskService;
        this.userService = userService;
        this.af = af;
        this.navCtrl = navCtrl;
    }
    AddTaskPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.clients = _this.clientService.getClients();
            _this.customTaskTypes = _this.taskService.customTaskTypes;
        });
    };
    AddTaskPage.prototype.addTask = function () {
        var curr = new Date();
        var due = this.date;
        var currentDate = moment(curr).startOf('day');
        var futureDate = moment(due).startOf('day');
        var differenceInDays = futureDate.diff(currentDate, 'days');
        var currentHour = moment(new Date());
        var hourDue;
        if (this.time.substring(0, 2) < 12) {
            this.time += ":AM";
        }
        else {
            this.time += ":PM";
        }
        console.log("time " + this.time);
        if (this.time.substring(6, 8) == 'AM') {
            hourDue = moment(this.time, 'hh:mm: A');
        }
        else {
            hourDue = moment(this.time, 'hh:mm: P');
        }
        var duration = moment.duration(hourDue.diff(currentHour));
        var differenceInHours = duration.asHours().toString();
        this.taskService.addTask(this.title, this.description, this.date, this.taskType, differenceInDays, this.client, this.time, differenceInHours);
        this.navCtrl.setRoot(TaskListPage);
    };
    AddTaskPage = __decorate([
        Component({
            templateUrl: 'addTask.html'
        }),
        __metadata("design:paramtypes", [ClientService, TaskService, UserService, AngularFireDatabase, NavController])
    ], AddTaskPage);
    return AddTaskPage;
}());
export { AddTaskPage };
//# sourceMappingURL=addTask.js.map
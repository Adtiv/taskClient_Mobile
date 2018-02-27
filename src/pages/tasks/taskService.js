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
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserService } from '../user/userService';
import * as moment from 'moment';
var now = moment().format('LLLL');
/*
import {ClientService} from '../clients/clients.service';
import * as moment from 'moment';
let now = moment().format('LLLL');
*/
var TaskService = /** @class */ (function () {
    function TaskService(auth, af, userService) {
        var _this = this;
        this.auth = auth;
        this.af = af;
        this.userService = userService;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.userId = _this.userService.uid;
            _this.startAtVal = 0;
            _this.endAtVal = 1000;
            _this.taskFilter = "All Tasks";
            _this.setTasks();
            _this.setTaskTypes();
        });
        setInterval(function () { _this.taskDateCountdown(); }, 60000 * 1);
    }
    TaskService.prototype.ngOnInit = function () {
    };
    TaskService.prototype.setTasks = function () {
        var _this = this;
        this.tasks = this.af.list('tasks/' + this.userId, { preserveSnapshot: true });
        this.af.list('tasks/' + this.userId).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.calculateNewDaysTillDue(snapshot);
            });
        });
    };
    TaskService.prototype.setTaskTypes = function () {
        this.customTaskTypes = this.af.list("users/" + this.userService.uid + "/types");
        var typeCount = 0;
        this.af.list("users/" + this.userService.uid + "/types").subscribe(function (types) {
            types.forEach(function (type) {
                typeCount++;
            });
        });
        this.typeCount = typeCount;
    };
    TaskService.prototype.taskDateCountdown = function () {
        var _this = this;
        this.af.list('tasks/' + this.userId).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.calculateNewDaysTillDue(snapshot);
            });
        });
    };
    TaskService.prototype.parseDateISO = function (date) {
        var parsedDate = "";
        parsedDate = date.substring(6, 10) + "-" + date.substring(0, 2) + "-" + date.substring(3, 5);
        return parsedDate;
    };
    TaskService.prototype.calculateNewTimeDue = function (task) {
        var differenceInHours = "0";
        //console.log("GETS HERER??");
        var currentHour = moment(new Date());
        var hourDue;
        if (task.dueTime.substring(6, 8) == 'AM') {
            hourDue = moment(task.dueTime, 'hh:mm: A');
        }
        else {
            var time = (parseInt(task.dueTime.substring(0, 2)) + 12).toString() + task.dueTime.substring(2, 8);
            hourDue = moment(time, 'hh:mm: P');
        }
        var duration = moment.duration(hourDue.diff(currentHour));
        differenceInHours = duration.asHours().toString();
        differenceInHours = differenceInHours.substring(0, 4);
        console.log(differenceInHours);
        this.task = this.af.object('tasks/' + this.userId + '/' + task.$key);
        this.task.update({ hoursTillDue: differenceInHours });
        this.filteredTask = this.af.object('customTaskFilters/' + this.userId + '/' + task.taskType + '/' + task.$key);
        this.filteredTask.update({ hoursTillDue: differenceInHours });
    };
    TaskService.prototype.calculateNewDaysTillDue = function (task) {
        var _this = this;
        var curr = new Date();
        var currentDate = moment(curr).startOf('day');
        var due = this.parseDateISO(task.dueDate);
        var futureDate = moment(due).startOf('day');
        var differenceInDays = futureDate.diff(currentDate, 'days');
        /*
        var differenceInHours="0";
        if(differenceInDays==0){
          var currentHour = moment(new Date());
          var hourDue;
          if(task.dueTime.substring(6,8)=='AM'){
            hourDue=moment(task.dueTime, 'hh:mm: A');
          }
          else{
            var time = (parseInt(task.dueTime.substring(0,2))+12).toString()+task.dueTime.substring(2,8);
            hourDue=moment(time,'hh:mm: P');
          }
          var duration = moment.duration(hourDue.diff(currentHour));
          differenceInHours = duration.asHours().toString();
        }
        differenceInHours=differenceInHours.substring(0,4);
        console.log(differenceInHours);
        */
        this.task = this.af.object('tasks/' + this.userId + '/' + task.$key);
        this.filteredTask = this.af.object('customTaskFilters/' + this.userId + '/' + task.taskType + '/' + task.$key);
        if (differenceInDays >= -30) {
            this.task.update({ daysTillDue: differenceInDays });
            if (task.taskType != "") {
                this.filteredTask.update({ daysTillDue: differenceInDays });
            }
            this.af.list('taskClients/' + task.$key).subscribe(function (snapshots) {
                snapshots.forEach(function (snapshot) {
                    _this.af.object('clientTasks/' + snapshot.$key + '/' + task.$key).update({ days: differenceInDays });
                    if (task.dueTime != null) {
                        _this.af.object('clientTasks/' + snapshot.$key + '/' + task.$key).update({ timeDue: task.dueTime });
                    }
                });
            });
        }
        else {
            this.task.remove();
            this.filteredTask.remove();
            this.af.list('taskClients/' + task.$key).subscribe(function (snapshots) {
                snapshots.forEach(function (snapshot) {
                    _this.af.object('clientTasks/' + snapshot.$key + '/' + task.$key).remove();
                });
            });
        }
    };
    TaskService.prototype.getTask = function () {
        return this.task;
    };
    TaskService.prototype.getTaskClients = function () {
        return this.taskClients;
    };
    TaskService.prototype.getTasks = function (filter) {
        console.log(this.userId);
        this.taskFilter = filter;
        console.log("STARTING AT?" + this.startAtVal);
        if (this.userId !== null) {
            if (this.taskFilter === 'All Tasks') {
                this.tasks = this.af.list('tasks/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.tasks;
            }
            if (this.taskFilter === 'past') {
                this.tasks = this.af.list('tasks/' + this.userId, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: -30,
                        endAt: -1
                    }
                });
                return this.tasks;
            }
            else {
                this.filteredTasks = this.af.list('customTaskFilters/' + this.userId + '/' + filter, {
                    query: {
                        orderByChild: 'daysTillDue',
                        startAt: this.startAtVal,
                        endAt: this.endAtVal
                    }
                });
                return this.filteredTasks;
            }
        }
    };
    TaskService.prototype.filterByColor = function (color) {
        console.log(color);
        if (color == "none") {
            this.startAtVal = 0;
            this.endAtVal = 1000;
        }
        else if (color == "green") {
            this.startAtVal = 6;
            this.endAtVal = 1000;
        }
        else if (color == "yellow") {
            this.startAtVal = 3;
            this.endAtVal = 5;
        }
        else {
            this.startAtVal = 0;
            this.endAtVal = 2;
        }
    };
    TaskService.prototype.deleteTask = function (taskKey, taskType) {
        var _this = this;
        this.tasks = this.af.list('tasks/' + this.userService.uid);
        this.filteredTask = this.af.object('customTaskFilters/' + this.userId + '/' + taskType + '/' + taskKey);
        this.filteredTask.remove();
        this.tasks.remove(taskKey);
        this.af.list('taskClients/' + taskKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.object('clientTasks/' + snapshot.$key + '/' + taskKey).remove();
            });
        });
        this.af.list('taskClients/' + taskKey).remove();
    };
    TaskService.prototype.deletePastTasks = function () {
        var _this = this;
        this.tasks = this.af.list('tasks/' + this.userId, {
            query: {
                orderByChild: 'daysTillDue',
                startAt: -30,
                endAt: 0
            }
        });
        this.tasks.subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.object('tasks/' + _this.userId + '/' + snapshot.$key).remove();
                _this.af.object('tasks/' + snapshot.taskType + '/' + _this.userId + '/' + snapshot.$key).remove();
                _this.af.object('customTaskFilters/' + _this.userId + '/' + snapshot.taskType + '/' + snapshot.$key);
                _this.af.list('taskClients/' + snapshot.$key).subscribe(function (snapshots) {
                    snapshots.forEach(function (snap) {
                        _this.af.object('clientTasks/' + snap.$key + '/' + snapshot.$key).remove();
                    });
                });
            });
        });
    };
    TaskService.prototype.parseClient = function (client) {
        for (var i = 0; i < client.length; i++) {
            if (client.charAt(i) == '/' && client.charAt(i + 1) == '/') {
                this.clientName = client.substring(0, i);
                this.clientKey = client.substring(i + 2, client.length);
            }
        }
    };
    TaskService.prototype.addTaskType = function (type) {
        this.af.list("users/" + this.userService.uid + "/types").push({ type: type });
        this.setTaskTypes();
    };
    TaskService.prototype.removeTaskType = function (types) {
        var _this = this;
        console.log("TYPES" + types);
        this.af.object("users/" + this.userService.uid + "/types/" + types.$key).remove();
        this.af.list('customTaskFilters/' + this.userService.uid + '/' + types.type).remove();
        this.af.list('tasks/' + this.userId).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                if (snapshot.taskType == types.type) {
                    _this.af.object('tasks/' + _this.userId + '/' + snapshot.$key).update({ taskType: "" });
                }
            });
        });
        this.setTaskTypes();
    };
    TaskService.prototype.parseMobileDateFormat = function (dueDate) {
        var formatted = "";
        formatted += dueDate.substring(5, 7) + '/' + dueDate.substring(8, 10) + '/' + dueDate.substring(0, 4);
        return formatted;
    };
    TaskService.prototype.addTask = function (title, description, dueDate, taskType, daysTillDue, client, dueTime, differenceInHours) {
        console.log(title + "   " + description + " " + dueDate + " " + taskType + " " + daysTillDue + " " + client + " " + dueTime + " " + differenceInHours);
        dueDate = this.parseMobileDateFormat(dueDate);
        this.tasks = this.af.list('tasks/' + this.userService.uid);
        this.taskKey = this.tasks.push({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, dueTime: dueTime, taskType: taskType, daysTillDue: daysTillDue, hoursTillDue: differenceInHours }).key;
        this.filteredTask = this.af.object('customTaskFilters/' + this.userService.uid + '/' + taskType + '/' + this.taskKey);
        this.filteredTask.set({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, dueTime: dueTime, taskType: taskType, daysTillDue: daysTillDue, hoursTillDue: differenceInHours });
        if (client != "") {
            this.parseClient(client);
            this.addClientTask(this.clientKey, this.clientName, this.taskKey, title, daysTillDue);
        }
        //this.userService.addUserTask(this.taskKey);
    };
    TaskService.prototype.addClientTask = function (clientKey, clientName, taskKey, title, daysTillDue) {
        this.af.object('clientTasks/' + clientKey + '/' + taskKey).set({ task: title, days: daysTillDue });
        this.af.object('taskClients/' + taskKey + '/' + clientKey).set({ client: clientName });
    };
    TaskService.prototype.updateTask = function (taskKey, title, description, dueDate, taskType, daysTillDue, dueTime, oldType) {
        var _this = this;
        this.task = this.af.object('tasks/' + this.userService.uid + '/' + taskKey);
        this.task.update({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, taskType: taskType, daysTillDue: daysTillDue, dueTime: dueTime });
        if (oldType != taskType) {
            this.filteredTask = this.af.object('customTaskFilters/' + this.userId + '/' + oldType + '/' + taskKey);
            this.filteredTask.remove();
        }
        this.filteredTask = this.af.object('customTaskFilters/' + this.userId + '/' + taskType + '/' + taskKey);
        this.filteredTask.update({ uid: this.userService.uid, title: title, description: description, dueDate: dueDate, taskType: taskType, daysTillDue: daysTillDue, dueTime: dueTime });
        this.af.list('taskClients/' + taskKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.object('clientTasks/' + snapshot.$key + '/' + taskKey).update({ task: title });
            });
        });
    };
    TaskService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuthModule, AngularFireDatabase, UserService])
    ], TaskService);
    return TaskService;
}());
export { TaskService };
//# sourceMappingURL=taskService.js.map
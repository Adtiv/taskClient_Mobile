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
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user/userService';
import { TaskService } from './taskService';
import { AddTaskPage } from './addTask';
import { TaskDetailPage } from './taskDetail';
import { EditTaskPage } from './editTask';
//import * as BoxSDK from 'box-node-sdk';
var TaskListPage = /** @class */ (function () {
    function TaskListPage(alert, taskService, userService, af, navCtrl) {
        this.alert = alert;
        this.taskService = taskService;
        this.userService = userService;
        this.af = af;
        this.navCtrl = navCtrl;
    }
    TaskListPage.prototype.ngOnInit = function () {
        var _this = this;
        //console.log("box " + BoxSDK);
        //console.log('BOX??');
        this.taskType = "All Tasks";
        this.editTaskTypes = false;
        this.addTypeBool = false;
        this.pastTasks = false;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.tasks = _this.taskService.getTasks('All Tasks');
            _this.customTaskTypes = _this.taskService.customTaskTypes;
            _this.taskType = "All Tasks";
        });
    };
    TaskListPage.prototype.getStyle = function (task) {
        if (task.daysTillDue <= 2) {
            return "rgba(255,0,0,.8)";
        }
        else if (task.daysTillDue <= 5) {
            return "rgba(255,255,0,.8)";
        }
        else {
            return "rgba(0,255,0,.8)";
        }
    };
    TaskListPage.prototype.navTask = function (task) {
        this.taskService.task = task;
        this.taskService.taskClients = this.af.list('taskClients/' + task.$key);
        this.navCtrl.push(TaskDetailPage);
    };
    TaskListPage.prototype.filterTasks = function (taskType) {
        if (taskType !== "Add Filters") {
            this.taskType = taskType;
            this.tasks = this.taskService.getTasks(this.taskType);
        }
        else {
            this.editTaskTypes = !this.editTaskTypes;
        }
        return false;
    };
    TaskListPage.prototype.closeEditTypes = function () {
        this.editTaskTypes = !this.editTaskTypes;
        this.taskType = 'All Tasks';
    };
    TaskListPage.prototype.filterByColor = function (filterColor) {
        this.taskService.filterByColor(filterColor);
        this.tasks = this.taskService.getTasks(this.taskService.taskFilter);
    };
    TaskListPage.prototype.addFilter = function () {
        console.log(this.newType);
        this.taskService.addTaskType(this.newType);
    };
    TaskListPage.prototype.removeFilter = function (filter) {
        console.log(filter);
        this.taskService.removeTaskType(filter);
    };
    TaskListPage.prototype.showPast = function () {
        if (!this.pastTasks) {
            this.tasks = this.taskService.getTasks("past");
            this.pastTasks = true;
        }
        else {
            this.tasks = this.taskService.getTasks("All Tasks");
            this.pastTasks = false;
        }
    };
    TaskListPage.prototype.historyToggle = function () {
        if (!this.pastTasks) {
            return "rgb(0,0,255)";
        }
        else {
            console.log("GETS TO DANGER");
            return "rgb(255,0,0)";
        }
    };
    TaskListPage.prototype.deleteTask = function (task) {
        var _this = this;
        var alert = this.alert.create({
            title: 'Delete',
            message: 'Delete Task?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.taskService.deleteTask(task.$key, task.taskType);
                        return false;
                    }
                }
            ]
        });
        //this.taskService.deleteTask(task.$key, task.taskType);
        return false;
    };
    TaskListPage.prototype.deletePast = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'Task History',
            message: 'Delete Completed Tasks?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.taskService.deletePastTasks();
                    }
                }
            ]
        });
        alert.present();
    };
    TaskListPage.prototype.navAdd = function () {
        this.navCtrl.push(AddTaskPage);
    };
    TaskListPage.prototype.navEditTask = function (task) {
        this.taskService.task = task;
        this.taskService.taskTitle = task.title;
        this.taskService.taskDescription = task.description;
        this.taskService.taskDueDate = task.dueDate;
        this.taskService.taskType = task.taskType;
        this.navCtrl.push(EditTaskPage);
    };
    TaskListPage = __decorate([
        Component({
            selector: 'task-list',
            templateUrl: 'taskList.html'
        }),
        __metadata("design:paramtypes", [AlertController, TaskService, UserService, AngularFireDatabase, NavController])
    ], TaskListPage);
    return TaskListPage;
}());
export { TaskListPage };
//# sourceMappingURL=taskList.js.map
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
import { TaskListPage } from './taskList';
import { EditTaskPage } from './editTask';
var TaskDetailPage = /** @class */ (function () {
    function TaskDetailPage(alert, taskService, userService, af, navCtrl) {
        this.alert = alert;
        this.taskService = taskService;
        this.userService = userService;
        this.af = af;
        this.navCtrl = navCtrl;
    }
    TaskDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.task = _this.taskService.getTask();
            _this.taskClients = _this.taskService.getTaskClients();
        });
    };
    TaskDetailPage.prototype.navEditTask = function () {
        this.navCtrl.push(EditTaskPage);
    };
    TaskDetailPage.prototype.deleteTask = function (key, taskType) {
        var _this = this;
        var alert = this.alert.create({
            title: 'Delete Task?',
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
                        _this.taskService.deleteTask(key, taskType);
                        _this.navCtrl.setRoot(TaskListPage);
                    }
                }
            ]
        });
        alert.present();
    };
    TaskDetailPage = __decorate([
        Component({
            templateUrl: 'taskDetail.html'
        }),
        __metadata("design:paramtypes", [AlertController, TaskService, UserService, AngularFireDatabase, NavController])
    ], TaskDetailPage);
    return TaskDetailPage;
}());
export { TaskDetailPage };
//# sourceMappingURL=taskDetail.js.map
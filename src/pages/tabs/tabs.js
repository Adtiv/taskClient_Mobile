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
import { NavController, NavParams } from 'ionic-angular';
import { TaskListPage } from '../tasks/taskList';
import { ClientListPage } from '../clients/clientList';
import { LoginDropboxPage } from '../clients/loginDropbox';
import { CalendarPage } from '../calendar/calendar';
import { UserService } from '../user/userService';
import { HomePage } from '../user/home';
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams, userService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.rootPage = TaskListPage;
        this.taskPage = TaskListPage;
        this.clientPage = ClientListPage;
        this.calendarPage = CalendarPage;
        this.loginDropboxPage = LoginDropboxPage;
        this.userService.auth.onAuthStateChanged(function (user) {
            _this.userName = _this.userService.currentUser;
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MainPage');
    };
    TabsPage.prototype.openPage = function (p) {
        this.rootPage = p;
    };
    TabsPage.prototype.logout = function () {
        this.userService.logout();
        this.rootPage = HomePage;
    };
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html'
        })
        /*
        export class TabsPage {
          // this tells the tabs component which Pages
          // should be each tab's root Page
          tab1Root: any = TaskListPage;
          tab2Root: any = ClientListPage;
          tab3Root: any = CalendarPage;
        
          constructor() {
        
          }
        }
        */
        ,
        __metadata("design:paramtypes", [NavController, NavParams, UserService])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map
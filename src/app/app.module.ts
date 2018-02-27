import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileOpener } from '@ionic-native/file-opener';
//import { CalendarModule } from 'angular-calendar';



import { MyApp } from './app.component';
//import { ScheduleModule } from 'primeng/components/schedule/schedule';

import { ClientListPage } from '../pages/clients/clientList';
import { AddClientPage } from '../pages/clients/addClient';
import { EditClientPage } from '../pages/clients/editClient';
import { ClientDetailPage } from '../pages/clients/clientDetail';
import { ClientService } from '../pages/clients/clientService';
import { SearchPipe } from '../pages/clients/search.pipe';
import { Dropbox } from '../pages/clients/dropboxService';
import { LoginDropboxPage } from '../pages/clients/loginDropbox';

import { CalendarTasksPage } from '../pages/calendar/calendarTasks'
import { NgCalendarModule  } from 'ionic2-calendar';

import { TaskListPage } from '../pages/tasks/taskList';
import { AddTaskPage } from '../pages/tasks/addTask';
import { EditTaskPage } from '../pages/tasks/editTask';
import { TaskDetailPage } from '../pages/tasks/taskDetail';
import { TaskService } from '../pages/tasks/taskService';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/user/login';
import { SignUpPage } from '../pages/user/signUp';
import { UserService } from '../pages/user/userService';
import { HomePage } from '../pages/user/home';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Pro } from '@ionic/pro';

Pro.init('YOUR_APP_ID', {
  appVersion: 'APP_VERSION'
})



// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyAZcXxUL6IgxKoLy3qt_75i-ApGtlQUJkA",
    authDomain: "lawyermanagementsys-2df1f.firebaseapp.com",
    databaseURL: "https://lawyermanagementsys-2df1f.firebaseio.com",
    storageBucket: "lawyermanagementsys-2df1f.appspot.com",
    messagingSenderId: "109616746212"
};
/*
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}*/

@NgModule({
  declarations: [
    MyApp,
    //CalendarModule,
    ClientListPage,
    AddClientPage,
    EditClientPage,
    ClientDetailPage,
    CalendarTasksPage,
    SearchPipe,
    TaskListPage,
    AddTaskPage,
    EditTaskPage,
    TaskDetailPage,
    TabsPage,
    HomePage,
    LoginPage,
    SignUpPage,
    LoginDropboxPage,
    HomePage
  ],
  imports: [
    //NgCalendarModule,
    //ScheduleModule,
    NgCalendarModule,
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
    //CalendarModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ClientListPage,
    AddClientPage,
    EditClientPage,
    ClientDetailPage,
    CalendarTasksPage,
    TaskListPage,
    AddTaskPage,
    EditTaskPage,
    TaskDetailPage,
    TabsPage,
    HomePage,
    LoginPage,
    SignUpPage,
    LoginDropboxPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    ClientService,
    TaskService,
    Dropbox,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    FileOpener
  ]
})
export class AppModule {}
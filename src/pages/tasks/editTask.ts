import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {UserService} from '../user/userService'
import {TaskService} from './taskService';
import {TaskListPage} from './taskList';
import {ClientService} from '../clients/clientService'
import * as moment from 'moment';
let now = moment().format('LLLL');
@Component({
  templateUrl: 'editTask.html'
})
export class EditTaskPage implements OnInit {
  taskClients:FirebaseListObservable<any[]>
  customTaskTypes:FirebaseListObservable<any[]>
  clients:FirebaseListObservable<any[]>
  taskType:string;
  title:string;
  description:string;
  task:FirebaseObjectObservable<any>;
  date:string;
  time:any;
  key:string;
  client:string;
  oldTaskType:string;
  constructor(private taskService:TaskService,private clientService:ClientService,private userService:UserService,private af:AngularFireDatabase,private navCtrl: NavController) {
  }
  ngOnInit(){
    this.userService.auth.onAuthStateChanged((user)=>{
      this.task=this.taskService.getTask();
      this.task.subscribe((task)=>{
        console.log("HERE2323?")
        this.time = task.dueTime.substr(0,5);
        this.taskType = task.taskType;
        this.date = this.parseDateIntoIsoFormat(task.dueDate);
        this.key = task.$key;
        this.client = task.taskClient;
        this.oldTaskType = task.taskType;
      });
      this.taskClients = this.taskService.getTaskClients();
      this.clients=this.clientService.getClients();
      this.customTaskTypes = this.taskService.customTaskTypes;
    });
  }
  parseDateIntoIsoFormat(date:string) {
    var formattedDate = date.substr(6,4) + '-' + date.substr(0,2) + '-' + date.substr(3,2);
    return formattedDate;
  }
  editTask() {
    var curr = new Date();
    var due = this.date;
    var currentDate=moment(curr).startOf('day');
    var futureDate =moment(due).startOf('day');
    var differenceInDays = futureDate.diff(currentDate, 'days');
    var currentHour = moment(new Date());
    var hourDue;
    if(parseInt(this.time.substring(0,2))<12){
      this.time+=":AM";
    }
    else{
      this.time+=":PM";
    }
    console.log("time " +this.time);
    if(this.time.substring(6,8)=='AM'){
      hourDue=moment(this.time, 'hh:mm: A');
    }
    else{
      hourDue=moment(this.time,'hh:mm: P');
    }
    var duration = moment.duration(hourDue.diff(currentHour));
    var differenceInHours = duration.asHours().toString();
    this.date = this.date.substr(5,2) + "/" + this.date.substr(8,2) + "/" + this.date.substr(0,4);
    //FIX DATE TO SHOW CORRECT ALWAYS 2018?
    console.log(this.key + " " + this.title + " " + this.description + " " + this.date + " " + this.taskType + " " + differenceInDays +  " " + this.time + " " + this.oldTaskType);
    this.taskService.updateTask(this.key,this.title,this.description,this.date,this.taskType,differenceInDays,this.time,this.oldTaskType);
    this.navCtrl.setRoot(TaskListPage);

  }
}

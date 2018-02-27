import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ModalController, AlertController } from 'ionic-angular';
import {TaskService} from '../tasks/taskService'
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as moment from 'moment';
let now = moment().format('LLLL');

//import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'calendar-tasks',
  templateUrl: 'calendarTasks.html'
})
export class CalendarTasksPage implements OnInit{
    public date: Date = new Date(Date.now());
    tasks:FirebaseListObservable<any[]>;
    eventSource = [];
    viewTitle: string;
    selectedDay = new Date();
 
    calendar = {
      mode: 'month',
      currentDate: new Date()
    };
    constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, private taskService: TaskService) { 
      this.getEvents();
    }

    ngOnInit() {
    }
    addEvent() {
      this.eventSource = this.createRandomEvents();
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
    getEvents(){
        var events = [];
        this.tasks = this.taskService.getTasks('All Tasks');
        this.tasks.subscribe(tasks=>{
            tasks.forEach(task=>{
              var startTime = new Date(moment(task.dueDate).utc().valueOf());
              var endTime = new Date(moment(task.dueDate).utc().valueOf());
              events.push({
                title: task.title,
                startTime: startTime,
                endTime: endTime,
                allDay:true
              });
            })
            //console.log("EVENTS: "+ events[0].startTime);
            this.eventSource = events;
            //console.log(this.eventSource);

        })
    }
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }
 
    onEventSelected(event) {
      let start = moment(event.startTime).format('LLLL');
      let end = moment(event.endTime).format('LLLL');
    
      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'From: ' + start + '<br>To: ' + end,
        buttons: ['OK']
      })
      alert.present();
    }
 
    onTimeSelected(ev) {
      this.selectedDay = ev.selectedTime;
    }

}

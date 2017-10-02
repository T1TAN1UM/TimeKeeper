import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
@Component({
  templateUrl: './modal.html'
})
export class ModalContentPage {
  character;
  taskTitle: string = '';
  taskJIRAID: string = '';
  taskDescription: string = '';
  today = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  todayAsString = this.today.getDate() + ' ' + this.monthNames[this.today.getMonth()] + ' ' + this.today.getFullYear();
  currrentTimesheet = [];
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.currrentTimesheet = [];
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  createTask() {
    if (localStorage[this.todayAsString]) {
      this.currrentTimesheet = JSON.parse(localStorage[this.todayAsString]);
    } else {
      this.currrentTimesheet = [];
    }
    if (this.taskTitle && this.taskJIRAID && this.taskDescription) {
      this.currrentTimesheet.push({
        taskId: Date.now(),
        taskTitle: this.taskTitle,
        taskJIRAID: this.taskJIRAID,
        taskDescription: this.taskDescription,
        startTime: this.formatAMPM(this.today),
        isRunning: true
      });
      localStorage[this.todayAsString] = JSON.stringify(this.currrentTimesheet);
      alert('Task created successfully');
      this.dismiss();
    } else {
      alert("Please fill all fields.");
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
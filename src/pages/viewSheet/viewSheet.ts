import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import moment from 'moment';

@Component({
  selector: 'page-view-sheet',
  templateUrl: 'viewSheet.html'
})
export class ViewSheetPage {
  currentSheet = sessionStorage['viewTimeSheet'];
  currentTaskList = [];
  constructor(public navCtrl: NavController) {
    this.initCurrentTaskList();
  }

  public initCurrentTaskList() {
    if (localStorage[this.currentSheet]) {
      this.currentTaskList = JSON.parse(localStorage[this.currentSheet]);
      for (let eachTask of this.currentTaskList) {
        eachTask.minutesSpent = moment.utc(moment(eachTask.endTime, "HH:mm:ss").diff(moment(eachTask.startTime, "HH:mm:ss"))).format("mm")
        eachTask.hoursSpent = eachTask.minutesSpent / 60;
      }      
    } else {
      this.currentTaskList = [];
    }
  }

  ionViewWillLeave() {
     document.getElementsByClassName("tabbar")[0].className = document.getElementsByClassName("tabbar")[0].className.replace(/\bhide\b/,'');
  }
}

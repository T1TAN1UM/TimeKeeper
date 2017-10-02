import { ViewSheetPage } from './../viewSheet/viewSheet';
import { AppConstants } from './../../app/app.config';
import { Component } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  AppTitle: any;
  isFirstTimer: boolean;
  today = new Date();
  timeSheetList = [];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  todayAsString = this.today.getDate() + ' ' + this.monthNames[this.today.getMonth()] + ' ' + this.today.getFullYear();
  slides = [
    {
      title: "Welcome to " + AppConstants.values.AppDisplayName,
      description: "  <p> Are you tired of non technical assholes wasting your time on JIRA effort tracking and Internal time tracking, From a developer\'s point of view all these bullshit just decrease the actual time utilized for coding. </p>",
      image: "assets/img/slide-1.png",
    },
    {
      title: "",
      description: "Also remembering each and every task what you did, incase you are working in multiple projects is very difficult. Finding a relevent JIRA ID for that task and then logging the effort is a pain in the ass, not to mention the effort entered must be synchronous with some other time tracking application incase your company uses one.",
      image: "assets/img/slide-2.png",
    },
    {
      title: "",
      description: "<p>If you are stuck in this kind of bullshit, this app can help you a lot if you play by its rules :-</p><p>1) Click <code>Start</code> before beginning a micro-task.</p><p>1) Click <code>Stop</code> immediately after ending a micro-task.</p>",
      image: "assets/img/slide-3.png",
    }
  ];



isInArray(value, array) {
  return array.indexOf(value) > -1;
}
constructor(public navCtrl: NavController) {
  this.AppTitle = AppConstants.values.AppDisplayName;
  this.timeSheetList = [];
  if (localStorage.length > 0) {
    this.isFirstTimer = false;
    for (var i = 0; i < localStorage.length; i++) {
      this.timeSheetList.push(localStorage.key(i));
    }
    if(!this.isInArray(this.todayAsString, this.timeSheetList)){
      this.timeSheetList.push(this.todayAsString);
    }
  } else {
    this.isFirstTimer = true;
    this.timeSheetList.push(this.todayAsString);
  }
}

  public skipIntro() {
  this.isFirstTimer = false;
}

  public newTimeSheet() {
  var t: Tabs = this.navCtrl.parent;
  t.select(1);
}

  public viewTimeSheet(item){
  sessionStorage['viewTimeSheet'] = item;
  document.getElementsByClassName("tabbar")[0].className += " hide";
  this.navCtrl.push(ViewSheetPage);
}

}

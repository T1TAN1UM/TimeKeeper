import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  toggleStatus: boolean;
  myDate: any;
  constructor(public navCtrl: NavController, public localNotifications: LocalNotifications) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.myDate = localISOTime;
    this.toggleStatus = false;
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      at: new Date(new Date().getTime() + 3600),
      led: 'FF0000',
      sound: null
    });    
  }

  public notify() {
    this.toggleStatus = !this.toggleStatus;
  }

  public scheduleNotification() {
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      at: new Date(new Date().getTime() + 3600),
      led: 'FF0000',
      sound: null
    });
  }

}

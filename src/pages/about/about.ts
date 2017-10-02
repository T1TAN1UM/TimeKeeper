import { ModalContentPage } from './modalContentPage';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  today = new Date();
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  todayAsString = this.today.getDate() + ' ' + this.monthNames[this.today.getMonth()] + ' ' + this.today.getFullYear();
  currentTaskList = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.initCurrentTaskList();
  }
  public openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.onDidDismiss(data => {
      this.initCurrentTaskList();
    });
    modal.present();
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

  public initCurrentTaskList() {
    if (localStorage[this.todayAsString]) {
      this.currentTaskList = JSON.parse(localStorage[this.todayAsString]);
    } else {
      this.currentTaskList = [];
    }
  }

  public endTask(task) {
    for (let eachTask of this.currentTaskList) {
      eachTask.isRunning = false;
      eachTask.endTime = this.formatAMPM(new Date());
    }
    localStorage[this.todayAsString] = JSON.stringify(this.currentTaskList);
  }

  public exportTimesheet() {
    var oldTable = document.getElementById('apps'),
      newTable = oldTable.cloneNode(true);
    var headers = ['Task Name', 'JIRA ID', 'Description', 'Start Time', 'End Time'];
    var tr = document.createElement('tr');
    for (let eachKey in headers) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(headers[eachKey]));
      tr.appendChild(td);
    }
    newTable.appendChild(tr);
    for (var i = 0; i < this.currentTaskList.length; i++) {
      tr = document.createElement('tr');
      for (let eachKey in this.currentTaskList[i]) {
        if (eachKey != 'taskId' && eachKey != 'isRunning') {
          td = document.createElement('td');
          td.appendChild(document.createTextNode(this.currentTaskList[i][eachKey]));
          tr.appendChild(td);
        }
      }
      newTable.appendChild(tr);
    }
    oldTable.parentNode.replaceChild(newTable, oldTable);
    console.log(newTable);
    //getting data from our table
    // var data_type = 'data:application/vnd.ms-excel';
    // var table_div = document.getElementById('table_wrapper');
    // var table_html = table_div.outerHTML.replace(/ /g, '%20');

    // var a = document.createElement('a');
    // a.href = data_type + ', ' + table_html;
    // a.
    // a.download = 'exported_table_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
    // a.click();    
  }

}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HazardPage} from '../hazard/hazard'


@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ReportPage Page');
  }

  openHazardPage(){
    //md-transition [android animation], ios-transition [iOS animation] and wp-transition [Windows Phone animation])
    let opts = { animate: true, animation: "wp-transition", duration: 5}
    this.navCtrl.push(HazardPage, opts);
  }

}

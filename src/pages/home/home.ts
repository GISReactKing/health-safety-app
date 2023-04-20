import { Component } from '@angular/core';
import { Modal, NavController, ModalController, ViewController} from 'ionic-angular';
import {ReportPage} from '../report/report'
import {WellbeingPage} from '../wellbeing/wellbeing'
import {FaqsPage} from '../faqs/faqs'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }



  dismiss() {
  this.viewCtrl.dismiss();
}

  openReportPage(){
    //md-transition [android animation], ios-transition [iOS animation] and wp-transition [Windows Phone animation])
    let opts = { animate: true, animation: "wp-transition", duration: 5}
    this.navCtrl.push(ReportPage, opts);
  };

  openWellBeingPage(){
    //md-transition [android animation], ios-transition [iOS animation] and wp-transition [Windows Phone animation])
    let opts = { animate: true, animation: "wp-transition", duration: 5}
    this.navCtrl.push(WellbeingPage, opts);
  }

  openFaqsPage(){
    //md-transition [android animation], ios-transition [iOS animation] and wp-transition [Windows Phone animation])
    let opts = { animate: true, animation: "wp-transition", duration: 5}
    this.navCtrl.push(FaqsPage, opts);
  }

}

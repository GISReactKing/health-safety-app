import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Wellbeing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wellbeing',
  templateUrl: 'wellbeing.html'
})
export class WellbeingPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WellbeingPage Page');
  }

}

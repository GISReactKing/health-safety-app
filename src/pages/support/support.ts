import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Support page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-support',
  templateUrl: 'support.html'
})
export class SupportPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SupportPage Page');
  }

}

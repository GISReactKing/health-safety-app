import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Incident page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-incident',
  templateUrl: 'incident.html'
})
export class IncidentPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello IncidentPage Page');
  }

}

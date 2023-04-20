import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Behaviour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-behaviour',
  templateUrl: 'behaviour.html'
})
export class BehaviourPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BehaviourPage Page');
  }

}

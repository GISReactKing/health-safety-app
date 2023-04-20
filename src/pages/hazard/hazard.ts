import { Component } from '@angular/core';
import {AddHazardPage} from '../../pages/add-hazard/add-hazard';
import { NavController } from 'ionic-angular';
import { Database } from '../../providers/database';


@Component({
  selector: 'page-hazard',
  templateUrl: 'hazard.html'
})
export class HazardPage {

 public hasHazards 		: boolean = false;
   public hazards  			: any;

  constructor(public navCtrl: NavController,
              public DB     : Database)
  {

  }

  ionViewWillEnter()
   {
     console.log("work");
   this.displayHazards();
   }


   displayHazards()
  {
     this.DB.retrieveHazards().then((data)=>
     {
        let existingData = Object.keys(data).length;
        if(existingData !== 0)
  {
           this.hasHazards 	= true;
           this.hazards 	= data;
  }
  else
  {
     console.log(data);

     console.log("we get nada!");
  }
     });
  }


  addHazard()
   {
      this.navCtrl.push(AddHazardPage);
   }



   viewHazard(param)
   {
      this.navCtrl.push(AddHazardPage, param);
   }


}// end page class

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Image } from '../../providers/image';
import { Database } from '../../providers/database';




@Component({
  selector: 'page-add-hazard',
  templateUrl: 'add-hazard.html'
})
export class AddHazardPage {

  public form : FormGroup;
  public user : any;
  public location : any;
  public locationType : any;
  public date : any = new Date().toISOString();
  public standards : any;
  public description : any;
  public immediateActionTaken : any;
  public hazardImage : any;
  public recordId : any;
  public revisionId : any;
  public isEdited : boolean = false;
  public hideForm : boolean = false;
  public pageTitle : any;
  public data: any;


  constructor(public navCtrl: NavController,
              public NP : NavParams,
              public fb : FormBuilder,
              public IMAGE : Image,
              public DB : Database,
              public toastCtrl: ToastController)
  {
        // this.form = fb.group(
        //   {
        //      "user"   : ["", Validators.required],
        //      "locationType"   : ["", Validators.required],
        //      "location"   : ["", Validators.required],
        //      "date"   : ["", Validators.required],
        //      "description"   : ["", Validators.required],
        //      "immediateActionTaken"   : ["", Validators.required],
        //      "standards"   : ["", Validators.required],
        //      "image"   : ["", Validators.required],
        //   });

          this.form = fb.group(
          {
             "user"   : [""],
             "locationType"   : [""],
             "location"   : [""],
             "date"   : [""],
             "description"   : [""],
             "immediateActionTaken"   : [""],
             "standards"   : [""],
             "image"   : [""]
          });

          this.resetFields();

          if(NP.get("key") && NP.get("rev"))
          {
            let key = NP.get("key");
            console.log(key);
            this.recordId = NP.get("key");
            this.revisionId = NP.get("rev");
            this.isEdited = true;
            this.selectHazard(this.recordId);
            this.pageTitle = 'Amend entry';
          }
          else
          {
            this.recordId = "";
            this.revisionId = "";
            this.isEdited = false;
            this.pageTitle = "Create entry";
          }
  }// end constructor

  selectHazard(id)
  {
     this.DB.retrieveHazard(id)
     .then((doc)=>
     {
       this.user = doc[0].user;
       this.locationType = doc[0].locationType;
       this.location = doc[0].location;
       this.date = doc[0].date;
       this.description = doc[0].description;
       this.standards = doc[0].standards;
       this.immediateActionTaken = doc[0].immediateActionTaken;
       this.hazardImage = doc[0].hazardImage;
       this.recordId = doc[0].id;
       this.revisionId = doc[0].revisionId;
     });
  }


  saveHazard(){

    let user : string  = this.form.controls["user"].value,
       locationType : string = this.form.controls["locationType"].value,
       location : string = this.form.controls["location"].value,
       date : string = this.form.controls["date"].value,
       description : string = this.form.controls["description"].value,
       standards: string = this.form.controls["standards"].value,
       immediateActionTaken: string = this.form.controls["immediateActionTaken"].value,
       image : string = this.form.controls["image"].value,
       revision : string = this.recordId,
       id : any = this.recordId;

    if(this.recordId !== '')
    {
      this.DB.updateHazard(id, revision, user, location, locationType, date, standards, description, immediateActionTaken, image )
      .then((data)=>
      {
        this.hideForm = true;
        this.sendNotification(`your hazard in ${location} was updated`);
      });
    }
    else
    {
      this.DB.addHazard(user, location, locationType, date, standards, description, immediateActionTaken, image )
      .then((data) =>
      {
        this.hideForm = true;
        this.resetFields();
        this.sendNotification(`${location} hazard was saved`);
      });
    }
  }


    handleChange(change){

        let changedDoc = null;
        let changedIndex = null;

        this.data.forEach((doc, index) =>{

          if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
          }
        });

        // document deleteHazard
        if (change.deleted){
          this.data.splice(changedIndex, 1);
        }
        else {
          // document updated
          if(changedDoc){
            this.data[changedIndex] = change.doc;
          }

        // document was added
        else {
          this.data.push(change.doc);
        }
      }
    }

   takePhotograph()
   {
      this.IMAGE.takePhotograph()
      .then((image)=>
      {
         this.hazardImage = image.toString();
      })
      .catch((err)=>
      {
         console.log(err);
      });
   }

   selectImage()
   {
        this.IMAGE.selectPhotograph()
      .then((image)=>
      {
         this.hazardImage = image.toString();
      })
      .catch((err)=>
      {
         console.log(err);
      });
   }




   deleteHazard()
   {
      let hazard;

      this.DB.retrieveHazard(this.recordId)
      .then((doc)=>
      {
         hazard = doc[0].hazard;
         return this.DB.removeHazard(this.recordId, this.revisionId);
        // return this.DB.deleteHazard(this.recordId, this.revisionId);

      })
      .then((data) =>
      {
         this.hideForm 	=	true;
         this.sendNotification( `The hazard in ${location} was removed`);
      })
      .catch((err)=>
      {
         console.log(err);
      });
   }





  resetFields(): void
  {
       this.user = "";
       this.locationType = "";
       this.location =  "";
       this.date = "";
       this.description = "";
       this.standards = "";
       this.hazardImage = "";
  }

  sendNotification(message) : void
  {
    let notification = this.toastCtrl.create({
      message: message,
      duration : 3000
    });
    notification.present();
  }


  ionViewDidLoad() {
    console.log('Hello Add Hazard Page ');

  }

}// end page class

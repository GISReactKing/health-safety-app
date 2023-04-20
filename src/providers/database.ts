import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';




@Injectable()
/*

*/
export class Database {

private _DB : any;
private success : boolean = true;
private remote : any;



  constructor(public http: Http,
              public alertCtrl: AlertController)
  {
    this.initialiseDB();
  }

  initialiseDB(){
    // initialise hazards db
    this._DB = new PouchDB('hazards');

    // remote sync db
    this.remote = "http://localhost:5984/hazards";

    let options = {
      live : true,
      retry: true,
      continuous: true
    };
    // sync method
    this._DB.sync(this.remote, options);
  }

  addHazard(user, location, locationType, date, standards, description, immedidateActionTaken, image ){
  var timeStamp = new Date().toISOString(),
  base64String = image.substring(23),
  hazard = {
    _id : timeStamp,
    user : user,
    location : location,
    date : date,
    locationType : location,
    standards : standards,
    description : description,
    immedidateActionTaken : immedidateActionTaken,
    _attachments : {
       "hazard.jpg" : {
         content_type : 'image/jpeg',
         data : base64String
}

}

};

return new Promise(resolve => { this._DB.put(hazard).catch((err) => {
this.success = false;});



resolve(true); });

}

  updateHazard(id, revision, user, location, locationType, date, standards, description, immedidateActionTaken, image )
   {
      var base64String	 = image.substring(23),
          hazard 	 = {
             _id 	     : id,
             _rev        : revision,
             user : user,
             location : location,
             locationType : locationType,
             standards : standards,
             description : description,
             immedidateActionTaken : immedidateActionTaken,
             _attachments: {
                "hazard.jpg" : {
                   content_type : 'image/jpeg',
                   data 	    : base64String
                }
             }
          };

      return new Promise(resolve =>
      {
         this._DB.put(hazard)
         .catch((err) =>
         {
            this.success = false;
         });

         if(this.success)
         {
            resolve(true);
         }
      });
   }

  retrieveHazard(id)
   {
      return new Promise(resolve =>
      {
         this._DB.get(id, {attachments: true})
         .then((doc)=>
         {
            var item 		= [],
		dataURIPrefix	= 'data:image/jpeg;base64,',
		attachment;

            if(doc._attachments)
            {
               attachment 	= doc._attachments["hazard.jpg"].data;
            }

            item.push(
            {
               id 	         : 	id,
               rev	         : 	doc._rev,
               user     :	doc.user,
               date	     :	doc.date,
               location	         :	doc.location,
               locationType	         :	doc.locationType,
               description	     :	doc.description,
               standards	     :	doc.standards,
               immedidateActionTaken	     :	doc.immedidateActionTaken,
               image         :  dataURIPrefix + attachment
            });
            resolve(item);
         })
      });
   }



   retrieveHazards()
   {
      return new Promise(resolve =>
      {
         this._DB.allDocs({include_docs: true, descending: true, attachments: true}, function(err, doc)
	 {
	    let k,
	        items 	= [],
	        row 	= doc.rows;

	    for(k in row)
	    {
	       var item            = row[k].doc,
	           dataURIPrefix   = 'data:image/jpeg;base64,',
	           attachment;

	       if(item._attachments)
	       {
	          attachment 	   = dataURIPrefix + item._attachments["hazard.jpg"].data;
	       }

	       items.push(
	       {
	          id 	    : 	item._id,
	          rev	    : 	item._rev,
	          user :	item.user,
	          location	    :	item.location,
	          locationType	    :	item.locationType,
	          date	    :	item.date,
	          standards	    :	item.standards,
	          description	    :	item.description,
	          immediateActionTaken    :	item.immediateActionTaken,
	          image     :   attachment
	       });
	    }
            resolve(items);
         });
      });
   }

   removeHazard(id, rev)
   {
      return new Promise(resolve =>
      {
         var hazard   = { _id: id, _rev: rev };

         this._DB.remove(hazard)
         .catch((err) =>
         {
            this.success = false;
         });

         if(this.success)
         {
            resolve(true);
         }
      });
   }




   errorHandler(err)
   {
      let headsUp = this.alertCtrl.create({
         title: 'Heads Up!',
         subTitle: err,
         buttons: ['Got It!']
      });
      console.log(err);
      headsUp.present();
   }


  // TO DO
  // addIncident(){}
  // updateIncident(id, revision){}
  // retrieveIncident(id){}
  // retrieveIncidents(){}
  // deleteIncidents(){}

  // TO DO
  // addIncident(){}
  // updateIncident(id, revision){}
  // retrieveIncident(id){}
  // retrieveIncidents(){}
  // deleteIncidents(){}


} // end of hazard class

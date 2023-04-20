import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HazardPage } from '../pages/hazard/hazard';
import { AddHazardPage } from '../pages/add-hazard/add-hazard';
import { Database } from '../providers/database';
import { Image } from '../providers/image';
import { IncidentPage } from '../pages/incident/incident';
import { ReportPage } from '../pages/report/report';
import { WellbeingPage } from '../pages/wellbeing/wellbeing';
import { AboutPage } from '../pages/about/about';
import { BehaviourPage } from '../pages/behaviour/behaviour';
import { SupportPage } from '../pages/support/support';
import { HomePage } from '../pages/home/home';
import { FaqsPage } from '../pages/faqs/faqs';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddHazardPage,
    HazardPage,
    IncidentPage,
    ReportPage,
    WellbeingPage,
    AboutPage,
    BehaviourPage,
    SupportPage,
    FaqsPage,
    AboutPage


  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddHazardPage,
    HazardPage,
    IncidentPage,
    ReportPage,
    WellbeingPage,
    AboutPage,
    BehaviourPage,
    SupportPage,
    FaqsPage,
    AboutPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Database, Image]
})
export class AppModule {}

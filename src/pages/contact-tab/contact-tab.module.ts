import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactTabPage } from './contact-tab';

@NgModule({
  declarations: [
    ContactTabPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactTabPage),
  ],
})
export class ContactTabPageModule {}

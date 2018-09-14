import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SodaPage } from './soda';

@NgModule({
  declarations: [
    SodaPage,
  ],
  imports: [
    IonicPageModule.forChild(SodaPage),
  ],
})
export class SodaPageModule {}

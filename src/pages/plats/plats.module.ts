import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatsPage } from './plats';

@NgModule({
  declarations: [
    PlatsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlatsPage),
  ],
})
export class PlatsPageModule {}

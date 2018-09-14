import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SandwishPage } from './sandwish';

@NgModule({
  declarations: [
    SandwishPage,
  ],
  imports: [
    IonicPageModule.forChild(SandwishPage),
  ],
})
export class SandwishPageModule {}

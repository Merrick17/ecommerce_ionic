import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailCommandePage } from './detail-commande';

@NgModule({
  declarations: [
    DetailCommandePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailCommandePage),
  ],
})
export class DetailCommandePageModule {}

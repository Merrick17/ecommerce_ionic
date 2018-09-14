import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {AccueilPage } from '../accueil/accueil';
import { PanierPage} from '../panier/panier';
import { CommandePage } from '../commande/commande' ;   


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  accueilRoot = 'AccueilPage'
  panierRoot = 'PanierPage'
  commandeRoot = 'CommandePage'
  


  constructor(public navCtrl: NavController) {}

}

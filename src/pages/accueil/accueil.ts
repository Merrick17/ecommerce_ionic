import { Component } from '@angular/core';
import {  IonicPage,NavController, NavParams, App } from 'ionic-angular';
import { SandwishPage } from '../sandwish/sandwish';
import { PizzaPage } from '../pizza/pizza';
import { SodaPage } from '../soda/soda';
import { PlatsPage } from '../plats/plats';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the AccueilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage {
name:any ; 
  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams,private us:RestProvider) {
   
  }
Exit()
{ this.app.getRootNavs()[0].setRoot(HomePage); 
   
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
   
  }
Sandwish()
{ 
  this.navCtrl.push(SandwishPage);
}
Pizza()
{ 
  this.navCtrl.push(PizzaPage); 
}
Boisson()
{ 
  this.navCtrl.push(SodaPage); 
}
Plats()
{ 
  this.navCtrl.push(PlatsPage); 
}
}

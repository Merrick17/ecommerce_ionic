import { Component } from '@angular/core';
import {  IonicPage,NavController, NavParams, App, ModalController } from 'ionic-angular';
import { SandwishPage } from '../sandwish/sandwish';
import { PizzaPage } from '../pizza/pizza';
import { SodaPage } from '../soda/soda';
import { PlatsPage } from '../plats/plats';
import { HomePage } from '../home/home';
import { RestProvider } from '../../providers/rest/rest';
import { HttpClient } from '@angular/common/http';

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
products:any=[]; 
  constructor(private app:App,public navCtrl: NavController, public navParams: NavParams,private us:RestProvider,private http:HttpClient, private modalCtrl:ModalController) {
   
  }
Exit()
{ this.app.getRootNavs()[0].setRoot(HomePage); 
   
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccueilPage');
   
  }
  ionViewWillEnter()
  {
    this.getProducts2() ; 
  }
getProducts()
{
  this.http.get('https://jsonplaceholder.typicode.com/photos').subscribe(data=>{

  let result :any =data ; 
  this.products=result ; 
  console.log(result); 
  });
}

showData(id)
{
  let modalCtrl = this.modalCtrl.create(PizzaPage,{'id':id}); 
  modalCtrl.present(); 
}

getProducts2()
{
  this.http.get('http://localhost:3000/prod/',{headers:{
    'x-access-token':'token'
  }}).subscribe(data=>{

  let result :any =data ; 
  this.products=result ; 
  console.log(result); 
  });
}
}

import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, IonicPage, App, ViewController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import {TabsPage} from '../tabs/tabs'; 
import { promotion } from '../../models/prmotion';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
})
export class PizzaPage {
 product:any="" ; 
 id:number ; 
  constructor( private app :App,public navCtrl: NavController, public navParams: NavParams, private AlrtCtrl: AlertController,private http:HttpClient,private us:RestProvider, private ViewCtrl:ViewController) {
   
  this.id=this.navParams.get('id'); 
  }

  ionViewDidLoad() {
  
  }
  ionViewWillEnter()
  {  this.id=this.navParams.get('id'); 
    this.getProductById(this.id) ; 
  }
 Exit()
{ this.app.getRootNavs()[0].setRoot(HomePage); 
   
}
GoBack()
{
  this.ViewCtrl.dismiss(); 
}
ajouter()
{
  let alert = this.AlrtCtrl.create({
    title:'Ajouter', 
    inputs:[
      {
        type:'number', 
        placeholder:'0.0', 
        name:'qte'
      }
    ], 
    buttons:[{
      text:'Ajouter',
      handler:(data)=>{
        console.log("Qte",data.qte); 
        let prix_unit = this.product.prix ;
        let prix_tt = prix_unit*data.qte; 
        this.AjouterAuPanier(data.qte,prix_unit,prix_tt) ; 
      }
    }, 
    {
      text:'Annuler',
      handler:()=>{
        console.log("Annuler"); 
      }
    },
  
  ]
  }); 
  alert.present(); 
}

getProductById(id)
{
  this.http.get('http://localhost:3000/prod/'+this.id).subscribe(data=>{

    let result :any =data ; 
    this.product=result ; 
    console.log(result); 
    });
}
AjouterAuPanier(qte,pu,ptt)
{
  this.http.post('http://localhost:3000/cart/add',{ 
    'cart_id':'cart_id',
    'prod':this.product.id,
    'qte' :qte, 
    'pu' : pu, 
    'ptt' :ptt, 
    'lib' :this.product.lib 
  },{headers:{
    'x-access-token':'token'
  }}).subscribe(data=>{
    console.log("data",data); 
  })
}
}

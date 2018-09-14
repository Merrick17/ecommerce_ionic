import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import {TabsPage} from '../tabs/tabs'; 


@Component({
  selector: 'page-plats',
  templateUrl: 'plats.html',
})
export class PlatsPage {
  
  items:any; 
  ing:any ;
  produits:Array<any>=[]; 
  ingredient:Array<any>=[]; 
  options:Array<any>=[]; 
 supplement:string; 
 commande:string ; 
 user:string;
 qte:string; 
 isToggled:boolean; 
 op:string ; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private AlrtCtrl: AlertController,private http:HttpClient,private us:RestProvider) {
    this.user=this.us.getEmail(); 
    this.supplement=" "; 
    this.isToggled=false ; 
  }
  notifyOp(val:string) {
  
    this.op=this.op+"|"+val+"|"; 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PizzaPage');
    this.getPlats(); 
    this.getSupp(); 
  }
  AddCart()
  { let alert = this.AlrtCtrl.create({ 
    title:"confirmation",
    subTitle:"Voulez vous Confirmez votre commande ? ",
    buttons:[
      { 
        text:"Confirmer",
        handler:()=>{
          this.Ajout_panier(); 
          console.log('confirmer'); 

          this.navCtrl.setRoot(TabsPage); 
        }
      }, {
        text:'Annnuler',
        handler:()=>{
          console.log("Annuler"); 
        }
      }
    ]
  }); 
  alert.present(); 
    
  }

  getSupp()
  { 
    this.http.get("http://127.0.0.1/resto/ingredient.php? ").subscribe(data=>{
  
  
    //console.log(data); 
        //this.prod.push(JSON.stringify(data))  ; 
        this.items=data ; 
        var prod:any; 
       /* console.log("this.items.result",this.items.result[0]); 
        prod=this.items.result[0][1]; 
        console.log("this.prod",prod); 
        console.log("this.items.result",this.items.result[1]); 
        prod=this.items.result[1][1]; 
        console.log("this.prod",prod); */
    for(var j=0 ;j<this.items.length;j++)
    { 
      prod=this.items[j][1] ; 
      console.log(j,prod); 
      this.ingredient.push(prod); 
    }
        
       console.log(this.items); 
       
       
    
  
  
    });
  }
  notify(verif:boolean,val:string) {
    var v =verif ; 
    var rep:string;
     rep=val.trim(); 
   if(v==true)
   { 
    this.supplement=this.supplement+"|"+val+"|"; 
    console.log(this.supplement); 
   
   }else
   if (v==false)
   { 
    console.log(this.supplement.replace("|"+val+"|","hello")); 
  }
   
   //console.log(this.supplement); 
    console.log(v); 
  }
  getIngredient()
  { 
    this.http.get("http://127.0.0.1/resto/getOptions.php?options=Plats").subscribe(data=>{ 
      console.log(data); 
  
      
    //console.log(data); 
        //this.prod.push(JSON.stringify(data))  ; 
        this.items=data ; 
        var prod:any; 
       /* console.log("this.items.result",this.items.result[0]); 
        prod=this.items.result[0][1]; 
        console.log("this.prod",prod); 
        console.log("this.items.result",this.items.result[1]); 
        prod=this.items.result[1][1]; 
        console.log("this.prod",prod); */
    for(var j=0 ;j<this.items.length;j++)
    { 
      prod=this.items[j][1] ; 
      console.log(j,prod); 
      this.options.push(prod); 
    }
        
       console.log("Options", this.options); 
    })
  }
  getPlats()
  {
    this.http.get("http://127.0.0.1/resto/produit.php?produit=plats").subscribe(data=>{ 
      console.log(data); 
      //this.prod.push(JSON.stringify(data))  ; 
      this.items=data ; 
    var prod:any; 
   /* console.log("this.items.result",this.items.result[0]); 
    prod=this.items.result[0][1]; 
    console.log("this.prod",prod); 
    console.log("this.items.result",this.items.result[1]); 
    prod=this.items.result[1][1]; 
    console.log("this.prod",prod); */
  
    for(var j=0 ;j<this.items.length;j++)
    { 
      prod=this.items[j][1] ; 
      console.log(j,prod); 
      this.produits.push(prod); 
    }
        
       console.log(this.items); 
       
       
   data=null ; 
   
    }); 
  
  }




Ajout_panier()
{ 

  this.http.get("http://127.0.0.1/resto/ajoutpanier.php?produit="+this.commande+"&supplement="+this.supplement+"&email="+this.user+"&Qte="+this.qte+"&options="+this.op).subscribe(
    data=>{ 
      console.log(data); 
      
    }
  )
}
}

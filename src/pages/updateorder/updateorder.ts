import { Component, ViewContainerRef } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { produit } from '../../models/produit';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';
import { Version } from '@angular/compiler';
import { ingredients } from '../../models/ingredients';
import { CrudProvider } from '../../providers/crud/crud';


@IonicPage()
@Component({
  selector: 'page-updateorder',
  templateUrl: 'updateorder.html',
})
export class UpdateorderPage {
  name:any ; 
 items:any; 
 ing:any ; 
 produits:Array<any>=[]; 
 produits_cheese:Array<any>=[]; 
 ingredient:Array<ingredients>=[]; 
 products:Array<any>=[]; 
 options:Array<ingredients>=[]; 
 supplement:string; 
 op:string; 
 commande:string ; 
 user:string;
 qte:string; 
  prix_prod:string; 
  isToggled: boolean ;
   product :produit ; 
   icons:string ; 
   id_detail:string ; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private AlrtCtrl:AlertController,private http:HttpClient,private us:RestProvider,private Toast:ToastController,private cr :CrudProvider) {
   this.product = new produit(); 
   this.produits=[]; 
   this.produits_cheese=[]; 
   this.ingredient=[]; 
   this.options=[]; 
    this.getSandwish(); 
    this.getCHeese(); 
    this.getSupp();
    this.prix_prod="1"; 
    this.user=this.us.getEmail(); 
    this.name=this.us.getName(); 
    console.log(this.user); 
    this.supplement="-"; 
    this.op="-"; 
    this.qte=""; 
    //this.isToggled=false ; 
   this.getIngredient(); 
   this.icons='Naan'; 
   this.id_detail=this.cr.getId(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SandwishPage');
    
  }
AddCart()
{ this.VerifOptions(); 
  let alert = this.AlrtCtrl.create({ 
  title:"confirmation",
  subTitle:"Voulez vous Confirmez votre commande ? ",
  buttons:[
    { 
      text:"Confirmer",
      handler:()=>{
        if(this.commande=="-" || this.op =="-" || this.qte=="" )
        { 
          let toast = this.Toast.create({ 
            message:'Choix non valide',
            duration:3000,
            position:'top'
          }); 
          toast.present(); 
        }else
        { 
          console.log('confirmer'); 
          this.Ajout_panier(); 
          this.navCtrl.setRoot(TabsPage); 
        }
       
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

Ajout(commande:string)
{ 
  this.commande=commande; 
}
getSandwish()
{ 
  this.http.get("http://tandoorifood.tn/resto/produit.php?").subscribe(data=>{ 
   

      //console.log(data); 
      //this.prod.push(JSON.stringify(data))  ; 
    this.items=data ;
     console.log(this.items); 
    var prod:produit; 
    
    
   /* console.log("this.items.result",this.items.result[0]); 
    prod=this.items.result[0][1]; 
    console.log("this.prod",prod); 
    console.log("this.items.result",this.items.result[1]); 
    prod=this.items.result[1][1]; 
    console.log("this.prod",prod); */
  
    for(var j=0 ;j<this.items.length;j++)
    { prod = new produit(); 
      prod.nom_produit=this.items[j][1] ; 
     prod.prix_produit=this.items[j][3]; 
     
      
      this.produits.push(prod); 
      
    }
        
      
       
       
    
    }); 


}
getCHeese()
{ 
  this.http.get("http://tandoorifood.tn/resto/produit_cheese.php?").subscribe(data=>{ 
   

      //console.log(data); 
      //this.prod.push(JSON.stringify(data))  ; 
      if(data!=null)
      {


        this.items=data ;
     console.log(this.items); 
    var prod:produit; 
    
    
   /* console.log("this.items.result",this.items.result[0]); 
    prod=this.items.result[0][1]; 
    console.log("this.prod",prod); 
    console.log("this.items.result",this.items.result[1]); 
    prod=this.items.result[1][1]; 
    console.log("this.prod",prod); */
  
    for(var j=0 ;j<this.items.length;j++)
    { prod = new produit(); 
      prod.nom_produit=this.items[j][1] ; 
     prod.prix_produit=this.items[j][3]; 
     
      
      this.produits_cheese.push(prod); 
      
    }
      }
    
        
      
       
       
    
    }); 


}
getIngredient()
{ 
  this.http.get("http://tandoorifood.tn/resto/getOptions.php?options=ingredients").subscribe(data=>{ 
    console.log(data); 

    
  //console.log(data); 
      //this.prod.push(JSON.stringify(data))  ; 
      this.items=data ; 
      //var prod:any; 
      var ing : ingredients ; 
   
      
  for(var j=0 ;j<this.items.length;j++)
  { 
    //prod=this.items[j][1] ; 
    ing = new ingredients(); 
    ing.nom_ingredient=this.items[j][1] ; 
    ing.checked=false 
    
    this.options.push(ing); 
  }
      
     console.log("Liste modifier", this.options); 
  })
}
Event(ok:boolean)
{ 
  console.log(ok); 
}
opt()
{ 
  console.log(this.commande); 
}
Ajout_panier()
{ if (this.qte=="" || this.op=="-" || this.commande=="")
{   
  
  let toast = this.Toast.create({ 
    message:'Veuillez remplir tout les champs ', 
    duration:3000, 
    position:'top'
  }); 
  toast.present(); 
}else{ 
  this.http.get("http://tandoorifood.tn/resto/update_order.php?produit="+this.commande+"&supplement="+this.supplement+"&Qte="+this.qte+"&options="+this.op+"$id_detail="+this.id_detail).subscribe(
    data=>{ 
      console.log(JSON.stringify(data)); 
      
    }
  )
}
  

 

}
getPrix(pr:string):string
{ var prix:string; 
  var pr_prod:number ; 
   if(pr=="")
   { 
     prix="0000";
   }else
   { 
    pr_prod=Number(pr)*Number(this.qte); 
    prix=pr_prod.toString(); 
   }
  return prix ; 
}
getSupp()
{ 
  this.http.get("http://tandoorifood.tn/resto/get_supplement.php?options=Supplement").subscribe(data=>{


  //console.log(data); 
      //this.prod.push(JSON.stringify(data))  ; 
      this.items=data ; 
      var prod:ingredients; 
    
  for(var j=0 ;j<this.items.length;j++)
  { prod = new ingredients(); 
    prod.nom_ingredient=this.items[j][1] ; 
    prod.checked=false ; 
    //console.log(j,prod); 
    this.ingredient.push(prod); 
   // console.log("liste modifier", this.ingredient)
  }
      
    // console.log(this.items); 
     
     
  


  });
}


VerifOptions()
{  
  for(var i=0; i<this.ingredient.length; i++)
  { 
    if(this.ingredient[i].checked==true) 
    { this.supplement=this.supplement+"|"+this.ingredient[i].nom_ingredient

    }
  }
  for( var i=0 ; i<this.options.length;i++)
  {  
    if(this.options[i].checked==true)
    { 
      this.op=this.op+"|"+this.options[i].nom_ingredient
    }
   
  }
}
}

import { Component, ViewContainerRef } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController, IonicPage, App } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { produit } from '../../models/produit';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';
import { Version } from '@angular/compiler';
import { ingredients } from '../../models/ingredients';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-sandwish',
  templateUrl: 'sandwish.html',
})
export class SandwishPage {
  somme:number ; 
  name:any ; 
 items:any; 
 ing:any ; 
 produits:Array<produit>=[]; 
 produits_cheese:Array<produit>=[]; 
 ingredient:Array<ingredients>=[]; 
 products:Array<any>=[]; 
 options:Array<ingredients>=[]; 
 supplement:string; 
 op:string; 
 commande:string ; 
 user:string;
 qte:string; 
 prix_unit :string; 
 prix_tt ; 
  prix_prod:string; 
  isToggled: boolean ;
   product :produit ; 
   icons:string ; 
   type:string ; 
   $type_prod:string ; 
  constructor(private app:App, public navCtrl: NavController, public navParams: NavParams, private AlrtCtrl:AlertController,private http:HttpClient,private us:RestProvider,private Toast:ToastController) {
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
    this.qte="1"; 
    //this.prix_unit ; 
    //this.isToggled=false ; 
   this.getIngredient(); 
   this.icons='Naan'; 
   this.type='Naan'; 
   this.somme=0 ; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SandwishPage');
    
  }
  type_naan( )
  { this.type="Naan" ; 
    console.log(this.type); 

  }
  type_cheese( )
  { this.type="Naan Cheese" ; 
    console.log(this.type); 

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
          this.Calcul_total(); 
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
 this.commande=this.type+" "+this.commande ; 
  this.http.get("http://tandoorifood.tn/resto/ajoutpanier.php?produit="+this.commande+"&supplement="+this.supplement+"&email="+this.user+"&Qte="+this.qte+"&options="+this.op+"&prix_tt="+this.prix_tt+"&type=Naan").subscribe(
    data=>{ 
      console.log(JSON.stringify(data)); 
      
    }
  )
}


}
Prix( pr:string)
{ 
  this.prix_unit =pr ; 
  console.log(this.prix_unit); 
  
}

Calcul_total()
{ 
  var prix:number; 
  var total :number ; 
  prix=Number.parseFloat(this.convertions(this.prix_unit).toString()); 
  total=this.somme+prix; 
console.log("prix Commande :" ,total ); 
this.prix_tt=total ; 

}
Calcul_prix_ingredients():number
{ var prix_total : number ;
   var pr_ing : number ; 
  prix_total=0 ;  
  for(var i=0 ; i<this.ingredient.length;i++  )
  { 
    if(this.ingredient[i].checked==true)
    { 
      //console.log(i); 
      console.log(this.ingredient.length); 
     //prix_total=Number.parseFloat(prix_total.toString())+Number.parseFloat(this.convertions(this.ingredient[i].prix).toString()); 
    console.log(this.ingredient[i]); 
    }
    //console.log(prix_total); 
    return prix_total ; 
   
  }
 
   
  console.log("val finale", prix_total); 
}
verif_ing(ok:ingredients)
{ if (ok.checked==true)
  { 
    this.somme=Number.parseFloat(this.somme.toString())+Number.parseFloat(this.convertions(ok.prix).toString()); 
    
  }else
  { 
    this.somme=Number.parseFloat(this.somme.toString())-Number.parseFloat(this.convertions(ok.prix).toString()); 
  }
   console.log(this.somme); 
}
convertions( s1:string ):number
{ 
 var pos= s1.indexOf(',',1); 
 let result= s1.slice(0,pos)+"."+s1.slice(pos+1); 
 
return Number.parseFloat(result);  
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
    prod.prix=this.items[j][3]; 
    //console.log('ingredients !!',this.items[j])
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



Exit()
{ this.app.getRootNavs()[0].setRoot(HomePage); 
   
}
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccueilPage } from '../pages/accueil/accueil';
import { CommandePage } from '../pages/commande/commande';
import { PanierPage } from '../pages/panier/panier';
import { TabsPage } from '../pages/tabs/tabs';
import { SandwishPage } from '../pages/sandwish/sandwish';
import { PizzaPage } from '../pages/pizza/pizza';
import { SodaPage } from '../pages/soda/soda';
import {HttpClientModule } from '@angular/common/http' ; 
import { RestProvider } from '../providers/rest/rest';
import { PlatsPage } from '../pages/plats/plats';
import { CrudProvider } from '../providers/crud/crud';
import { UpdateorderPage } from '../pages/updateorder/updateorder';
import { ContactPage} from '../pages/contact/contact'; 

@NgModule({
  declarations: [
   
    MyApp,
    HomePage,
    RegisterPage,TabsPage,SandwishPage,PizzaPage,SodaPage,PlatsPage,UpdateorderPage
  ],
  imports: [
   
    BrowserModule,
    HttpClientModule,
  
 
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
   TabsPage,SandwishPage,PizzaPage,SodaPage,PlatsPage,UpdateorderPage
  ],
  providers: [
    RestProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CrudProvider,
    
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { TodoService, TodoLocalStorageService } from "./services/todo/todo";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    MenuPage

    
        
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoService,
    TodoLocalStorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
    
  ]
})
export class AppModule {}

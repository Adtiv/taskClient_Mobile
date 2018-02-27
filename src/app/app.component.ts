import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/user/home';
@Component({
  templateUrl: 'app.html',
  selector: 'my-app'
})
export class MyApp {
  rootPage = HomePage;
  constructor(platform: Platform,private statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#0064ff");
      //SplashScreen.hide();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform, MenuController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: User[] = []; //Array that contains users from storage
  newUser: User = <User>{}; //New user to insert for first login
  passwordRepeated: string; //Repeat the password
  passwordToLogin: string; //Password to check the login
  itemsLength: number; //Users' array length

  constructor(private alertController: AlertController, private router: Router, private platform: Platform, 
    private loginService: LoginService, private menuController: MenuController) {

    //Disable the menu in the login to not allow to take access in the app without password
    this.menuController.enable(false);

    //Load users from localstorage
    this.platform.ready().then(() => {
      this.loadItems();
    });

    //Get the users' array length
    this.getItemsLength();
  }

  ngOnInit() {
  }

  //Load users from localstorage
  loadItems () {

    this.loginService.getItems().then(res => {
      this.users = res;
    });
  }

  //Get the length of the users' array
  getItemsLength () {

    this.loginService.getItems().then((users: User[]) => {
      this.itemsLength = users ? users.length : 0;
    });
  }

  /*
   * Add the new user into the storage
   */
  save () {

    if(this.newUser.password == this.passwordRepeated) {

        this.newUser.id = Date.now(); //Uso la data con l' ora come id per il nuovo user;
        this.loginService.addItem(this.newUser).then(item => {
        this.newUser = <User>{};
      });
      this.menuController.enable(true);
      this.router.navigate(['/tabs/tabs/accounts']);
    }
    else {

      this.presentAlertForErrorSignIn();
    }
  }

  /*
   * Check if the entered password is equals to the password stored in the storage
   */
  logIn (dbPassword: string) {

    if(dbPassword == this.passwordToLogin) {

      this.menuController.enable(true); //Enable menuController to allow user to use menu
      this.router.navigate(['/tabs/tabs/accounts']);
    }
    else {
      
      this.presentAlertForErrorLogIn();
    }   
  }

  /*
   * Delete the user (used for testing, NOT USE THIS METHOD)
   */
  delete (id: number) {

    this.loginService.deleteItem(id).then(res => {
      console.log("deleted")
    });
  }

  /*
   * Present the alert if the two password for the sign in are different
   */
  async presentAlertForErrorSignIn() {

    const alert = await this.alertController.create({
      header: 'SignIn Error',
      message: 'The two passwords must be equals.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });

    await alert.present();
  }

  /*
   * Present the alert if the password is incorrect
   */
  async presentAlertForErrorLogIn() {

    const alert = await this.alertController.create({
      header: 'LogIn Error',
      message: 'The password is incorrect.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });

    await alert.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  oldPassword: string; //It contains the old password
  newPassword: string; //It contains the new password
  newPasswordRepeated: string; //It contains the new password repeated
  users: User[] = []; //It contains the users list
  userForUpdate: User = <User>{}; //New user for update

  constructor(private modalController: ModalController, private alertController: AlertController, private loginService: LoginService, private platform: Platform) { }

  ngOnInit() {
    this.loadItems()
  }

  //load users from localstorage
  loadItems () {

    this.loginService.getItems().then(res => {
      console.log("res ", res)
      this.users = res;
    });
  }

  /*
    * Method that allow the password's change
    */
  changePassword (user: User) {

    //Check if the old password entered is correct
    if(user.password == this.oldPassword) {

      //Check if the newPassword and the newPasswordRepeated are equals
      if(this.newPassword == this.newPasswordRepeated) {

        user.password = this.newPassword;

        this.loginService.updateItem(user).then( () => {
          this.presentAlertForChangedPassword();
        });
      }
      else {

        this.presentAlertForNotEqualsPasswords();
      }
    }
    else {

      this.presentAlertForNotEqualsOldPassword();
    }
  }

  /*
    * Method that show an alert if the new password and the repeated new password are different
    */
  async presentAlertForNotEqualsPasswords () {

    const alert = await this.alertController.create({
      header: 'Error',
      message: 'The two new passwords must be equals.',
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
    * Method that show an alert if the old password is incorrect
    */
  async presentAlertForNotEqualsOldPassword () {

    const alert = await this.alertController.create({
      header: 'Error',
      message: 'The old password is incorrect.',
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
    * Method that show an alert if the password is changed correctly
    */
  async presentAlertForChangedPassword () {

    const alert = await this.alertController.create({
      header: 'Changed Password',
      message: 'Good! You have changed your password!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });

    await alert.present();
  }

  //Close the modal
  closeModal () {

    this.modalController.dismiss();
  }
}

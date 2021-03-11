import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangePasswordPage } from '../change-password/change-password.page';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private modalController: ModalController) {}

  async openModalChangePassword () {

    const modal = await this.modalController.create({
      component: ChangePasswordPage,
    });

    await modal.present();
  }
}

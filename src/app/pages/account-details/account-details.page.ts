import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountData } from 'src/app/models/AccountData';
import { AccountStorageService } from 'src/app/services/account-storage.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage {

  account: AccountData;
  accountToModify: AccountData;
  accountId: Number;
  isEdit: Boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private accountStorageService: AccountStorageService, private alertController: AlertController) {
    this.account = new AccountData();
    this.accountToModify = new AccountData();

    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadItem();
  }

  loadItem() {
    this.accountStorageService.getItems().then(res => {
      for(let tempAccount of res) {
        if(tempAccount.id == this.accountId){
          this.account = tempAccount;
          this.accountToModify = tempAccount;
        }
      }
    });
  }

  updateAccount() {
    this.accountStorageService.updateItem(this.accountToModify).then(res => {
      this.loadItem();
      this.isEdit = false;
    });
  }

  deleteAccount() {
    this.accountStorageService.deleteItem(this.account.id).then(res => {
      this.router.navigateByUrl("/tabs/tabs/accounts");
    });
  }

  showOrNotEdit() {
    if(this.isEdit){
      this.isEdit = false;
    }
    else{
      this.isEdit = true;
    }
  }

  async presentAlertForDelete () {

    const alert = await this.alertController.create({
      header: 'Deleting',
      message: 'Do you want to delete ' + this.account.accountName + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });

    await alert.present();
  }
}

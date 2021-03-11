import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accounts',
        loadChildren: () => import('../pages/accounts/accounts.module').then(m => m.AccountsPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('../pages/new/new.module').then(m => m.NewPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../pages/help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('../pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
      },
      {
        path: 'account-details/:id',
        loadChildren: () => import('../pages/account-details/account-details.module').then(m => m.AccountDetailsPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/accounts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

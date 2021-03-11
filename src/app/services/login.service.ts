import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';


const ITEMS_KEY = 'myUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private storage: Storage) { }

  // CREATE
  addItem(user: User): Promise<any> {
    console.log(user)
    return this.storage.get(ITEMS_KEY).then((users: User[]) => {
      if (users) {
        users.push(user);
        return this.storage.set(ITEMS_KEY, users);
      } else {
        return this.storage.set(ITEMS_KEY, [user]);
      }
    });
  }

  // READ
  getItems(): Promise<User[]> {
    return this.storage.get(ITEMS_KEY);
  }
 
  // UPDATE
  updateItem(user: User): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((users: User[]) => {
      if (!users || users.length === 0) {
        return null;
      }
 
      let newUser: User[] = [];
 
      for (let u of users) {
        if (u.id === user.id) {
          newUser.push(user);
        } else {
          newUser.push(u);
        }
      }

      return this.storage.set(ITEMS_KEY, newUser);
    });
  }

  // DELETE
  deleteItem(id: number): Promise<User> {
    return this.storage.get(ITEMS_KEY).then((users: User[]) => {
      if (!users || users.length === 0) {
        return null;
      }
 
      let toKeep: User[] = [];
 
      for (let u of users) {
        if (u.id !== id) {
          toKeep.push(u);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}

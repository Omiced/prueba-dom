import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor() {}
  newUser(username: string, password: string): boolean {
    if (localStorage.getItem(username)) return true;
    localStorage.setItem(username, password);
    return false;
  }
}

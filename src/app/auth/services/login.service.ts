import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (!localStorage.getItem(username)) return;
    const userPassword = localStorage.getItem(username);
    if (userPassword !== password) return;
    this.router.navigate(['/tweets']);
  }
}

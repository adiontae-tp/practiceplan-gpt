import { Injectable } from '@angular/core';
import { auth } from '../app.module';
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Sign up a new user
  async signUp(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  // Sign in an existing user
  async signIn(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // Sign out the current user
  async signOut(): Promise<void> {
    return await signOut(auth);
  }

  // Get the current user
  getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      onAuthStateChanged(auth, user => {
        resolve(user);
      }, error => {
        reject(error);
      });
    });
  }

}

import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firstValueFrom, lastValueFrom, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { ModalComponent } from '../components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AuthService {

  public user: User["email"];
  
  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    public modal: NgbModal,) {}

  async login(email: string, pass: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, pass);
      this.router.navigate(['/home']);
    } catch (error) {
      this.mostrarModalError("Error", "User or Pass incorrect");
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, pass: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        pass
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    const resul = this.afAuth.authState.pipe(first());
    const resul2 =  await firstValueFrom(resul);
    this.user = resul2?.email || null;
    console.log(this.user);
    return this.user;
  }

  private mostrarModalError(titulo: string, mensaje:string): void {
    const componente: ModalComponent = this.modal.open(ModalComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    }).componentInstance;
    componente.modalTitulo = titulo;
    componente.modalMensaje = mensaje;
    componente.modalSi = 'Aceptar';
  }

}

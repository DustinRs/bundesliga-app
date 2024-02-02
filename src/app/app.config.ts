import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-2566a","appId":"1:384008729967:web:19dfe5165eacfa3ee4649a","databaseURL":"https://simple-crm-2566a-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"simple-crm-2566a.appspot.com","apiKey":"AIzaSyA-ZLUpCQrP0u5UvJLICaFXww5Gaux2VRk","authDomain":"simple-crm-2566a.firebaseapp.com","messagingSenderId":"384008729967"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};

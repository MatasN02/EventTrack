import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./environments/firebase";

// 🔥 Inicializuojam Firebase
initializeApp(firebaseConfig);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  standalone: true,
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class ScanPage {

  photo?: string;

  constructor(private firebase: FirebaseService) { }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.photo = image.dataUrl!;

      // 🔥 SAUGOME Į FIRESTORE PER SERVICE
      await addDoc(
        collection(this.firebase.db, 'photos'),
        {
          image: this.photo,
          createdAt: serverTimestamp()
        }
      );

      alert('Nuotrauka sėkmingai išsaugota Firebase');

    } catch (err) {
      console.error('Kamera / Firestore klaida:', err);
      alert('Nepavyko nufotografuoti arba išsaugoti');
    }
  }
}

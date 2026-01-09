import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class AdminPage implements OnInit {

  records: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) { }

  async ngOnInit() {
    const snapshot = await getDocs(collection(this.firebase['db'], 'photos'));
    this.records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async deleteRecord(id: string) {
    await deleteDoc(doc(this.firebase['db'], 'photos', id));
    this.records = this.records.filter(r => r.id !== id);
  }

  async logout() {
    await this.firebase.logout();
    this.router.navigateByUrl('/admin-login');
  }
}

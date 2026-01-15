import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {

  events: any[] = [];

  constructor(private firebase: FirebaseService) { }

  async ngOnInit() {
    await this.loadEvents();
  }

  async loadEvents() {
    const db = this.firebase.getDb();
    const snapshot = await getDocs(collection(db, 'events'));

    this.events = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
  }

  // ✅ APPROVE
  async approveEvent(id: string) {
    const db = this.firebase.getDb();

    await updateDoc(doc(db, 'events', id), {
      status: 'Approved'
    });

    await this.loadEvents();
  }

  // ❌ REJECT
  async rejectEvent(id: string) {
    const db = this.firebase.getDb();

    await updateDoc(doc(db, 'events', id), {
      status: 'Rejected'
    });

    await this.loadEvents();
  }

  // 🗑 DELETE
  async deleteEvent(id: string) {
    const db = this.firebase.getDb();

    await deleteDoc(doc(db, 'events', id));
    this.events = this.events.filter(e => e.id !== id);
  }
}

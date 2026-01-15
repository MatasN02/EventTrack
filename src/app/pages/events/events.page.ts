import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from '../../services/firebase.service';

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizerId: string;
  status: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss']
})
export class EventsPage implements OnInit {

  title = '';
  description = '';
  date = '';
  location = '';

  events: EventItem[] = [];

  editingEventId: string | null = null;

  constructor(private firebase: FirebaseService) { }

  // 🔹 LOAD ONLY MY EVENTS
  async ngOnInit() {
    await this.loadMyEvents();
  }

  private async loadMyEvents() {
    const user = getAuth().currentUser;
    if (!user) {
      this.events = [];
      return;
    }

    const db = this.firebase.getDb();

    const q = query(
      collection(db, 'events'),
      where('organizerId', '==', user.uid)
    );

    const snapshot = await getDocs(q);

    this.events = snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<EventItem, 'id'>)
    }));
  }

  // 🔹 CREATE
  async createEvent() {
    const user = getAuth().currentUser;
    if (!user) {
      alert('❌ Reikia prisijungti');
      return;
    }

    if (!this.title || !this.date) {
      alert('❌ Pavadinimas ir data privalomi');
      return;
    }

    const db = this.firebase.getDb();

    try {
      await addDoc(collection(db, 'events'), {
        title: this.title,
        description: this.description,
        date: this.date,
        location: this.location,
        organizerId: user.uid, // 🔐 BŪTINA pagal rules
        status: 'Pending',     // 👮 ADMIN galės patvirtinti
        createdAt: new Date()
      });

      this.resetForm();
      await this.loadMyEvents();
      alert('✅ Renginys sukurtas (laukiama patvirtinimo)');
    } catch (err) {
      console.error(err);
      alert('❌ Neturi teisių kurti renginio');
    }
  }

  // 🔹 START EDIT
  startEdit(event: EventItem) {
    this.editingEventId = event.id;
    this.title = event.title;
    this.description = event.description;
    this.date = event.date;
    this.location = event.location;
  }

  // 🔹 UPDATE
  async updateEvent() {
    if (!this.editingEventId) return;

    const db = this.firebase.getDb();

    try {
      await updateDoc(
        doc(db, 'events', this.editingEventId),
        {
          title: this.title,
          description: this.description,
          date: this.date,
          location: this.location,
          updatedAt: new Date()
        }
      );

      this.resetForm();
      await this.loadMyEvents();
      alert('✅ Renginys atnaujintas');
    } catch (err) {
      console.error(err);
      alert('❌ Neturi teisių redaguoti šio renginio');
    }
  }

  // 🔹 DELETE
  async deleteEvent(id: string) {
    const confirmed = confirm('Ar tikrai norite ištrinti renginį?');
    if (!confirmed) return;

    const db = this.firebase.getDb();

    try {
      await deleteDoc(doc(db, 'events', id));
      this.events = this.events.filter(e => e.id !== id);
      alert('🗑 Renginys ištrintas');
    } catch (err) {
      console.error(err);
      alert('❌ Neturi teisių trinti šio renginio');
    }
  }

  // 🔹 RESET FORM
  resetForm() {
    this.editingEventId = null;
    this.title = '';
    this.description = '';
    this.date = '';
    this.location = '';
  }
}

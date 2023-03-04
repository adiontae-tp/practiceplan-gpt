import { Injectable } from '@angular/core';
import { fs } from '../app.module';
import { collection, CollectionReference, doc, DocumentReference, DocumentSnapshot, getDocs, Query, QuerySnapshot, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  // Get a reference to a Firestore collection
  getCollection(collectionPath: string): CollectionReference {
    return collection(fs, collectionPath);
  }

  // Get a reference to a Firestore document
  getDocument(documentPath: string): any {
    return doc(fs, documentPath) as any;
  }

  // Get a Firestore document snapshot
  async getDocumentSnapshot(documentPath: string): Promise<DocumentSnapshot> {
    const documentRef = this.getDocument(documentPath);
    return await documentRef.get();
  }

  // Get a Firestore collection snapshot
  async getCollectionSnapshot(collectionPath: string): Promise<QuerySnapshot> {
    const collectionRef = this.getCollection(collectionPath);
    return await getDocs(collectionRef);
  }

  // Add a new document to a Firestore collection
  async addDocument(collectionPath: string, data: any): Promise<DocumentReference> {
    const collectionRef = this.getCollection(collectionPath);
    const docRef = doc(collectionRef);
    await setDoc(docRef, data);
    return docRef;
  }

  // Update an existing Firestore document
  async updateDocument(documentPath: string, data: any): Promise<void> {
    const documentRef = this.getDocument(documentPath);
    return await setDoc(documentRef, data, { merge: true });
  }

  // Delete an existing Firestore document
  async deleteDocument(documentPath: string): Promise<void> {
    const documentRef = this.getDocument(documentPath);
    return await documentRef.delete();
  }

  // Query a Firestore collection
  queryCollection(collectionPath: string, queryFunction: (collectionRef: CollectionReference) => Query): Query {
    const collectionRef = this.getCollection(collectionPath);
    return queryFunction(collectionRef);
  }

}

/* eslint-disable */
"use client";

import { db } from "@/app/lib/firebase";
import {
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  collection,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  GoogleAuthProvider,
} from "firebase/auth";

// Utility to safely clone data (avoids "read-only property" errors)
function safeData(data) {
  return JSON.parse(JSON.stringify(data));
}

export async function addDocument(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, safeData(data));
  return docRef.id;
}

export async function getDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);

  return snapshot.exists()
    ? { id: snapshot.id, ...snapshot.data() }
    : null;
}

export async function getAllDocuments(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, safeData(data));
  return true;
}

export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return true;
}

// Firebase Auth
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  db,
};

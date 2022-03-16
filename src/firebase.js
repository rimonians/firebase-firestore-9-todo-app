// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Collection ref
const colRef = collection(db, "todos");

// Create todo
export const createTodo = async (data, cb) => {
  try {
    await addDoc(colRef, data);
    cb();
  } catch (err) {
    console.log(err.message);
  }
};

// Get todos
export const getTodos = async (cb) => {
  try {
    onSnapshot(colRef, (snapshot) => {
      const todos = [];
      snapshot.docs.map((item) => {
        todos.push({ ...item.data(), id: item.id });
      });
      cb(todos);
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Update todo
export const updateTodo = async (id, status, cb) => {
  try {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, { status: status });
    cb();
  } catch (err) {
    console.log(err.message);
  }
};

// Delete todo
export const deleteTodo = async (id, cb) => {
  try {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    cb();
  } catch (err) {
    console.log(err.message);
  }
};


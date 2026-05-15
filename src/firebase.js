import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbNC86MsCqkQkTZe-MdwpoT749TbG9ovI",
  authDomain: "shopify-3acd1.firebaseapp.com",
  projectId: "shopify-3acd1",
  storageBucket: "shopify-3acd1.firebasestorage.app",
  messagingSenderId: "529233383952",
  appId: "1:529233383952:web:7896632e481e1a3de73095"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
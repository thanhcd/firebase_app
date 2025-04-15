import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useState } from "react";
import { app } from "../firebaseConfig"; // Đảm bảo bạn đã cấu hình Firebase đúng
export const fetchUserData = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Không có tên",
        avatar: user.photoURL || "https://via.placeholder.com/150"
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


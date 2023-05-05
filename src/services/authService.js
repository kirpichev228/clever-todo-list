import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebase/index';

class AuthService {
  async login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    return auth.currentUser;
  }

  async register(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    return auth.currentUser;
  }

  async logout() {
    await signOut(auth);
  }

  async fetchUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject,
      );
    });
  }
}

export default AuthService;

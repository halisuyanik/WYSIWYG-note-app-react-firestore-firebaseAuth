import { async } from "@firebase/util";
import {
    collection,
    query,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore"
import { db } from "../firebase-config";


export async function getTitles() {

    try {
        const q = query(collection(db, 'notes'));

        return q
    } catch (error) {
        return {
            error: "cannot load notes titles"
        }
    }
}

export async function getNote(id) {


    try {
        const docRef = doc(db, 'notes', id);
        const docSnap = await getDoc(docRef);
        const data = {
            data:docSnap.data(),
            id:docSnap.id,
        }
        if (!data) {
            return {
                error: "note  not found"
            }
        }
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject({
            error
        });
    }
}

export async function noteAdd(data) {

    try {
        const docRef = await addDoc(collection(db, 'notes'), data)
    } catch (error) {
        return Promise.reject({
            error
        });
    }
}

export async function noteDelete(id) {
    try {
        const docRef = doc(db, 'notes', id);
        await deleteDoc(docRef);
    } catch (error) {
        return Promise.reject({
            error
        });
    }
}

export async function noteUpdate(id, data){
    
      try {
        
    } catch (error) {
        return Promise.reject({
            error
        });
    }
}

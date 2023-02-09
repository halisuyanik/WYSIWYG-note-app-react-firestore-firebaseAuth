import {
    collection,
    getDocs,
    where,
    query,
    orderBy,
    onSnapshot,
    QuerySnapshot,
    getDoc,
    doc,
    addDoc,
} from "firebase/firestore"
import {
    db
} from "../firebase-config";



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
        const data = docSnap.data();
        if (!data) {
            return {
                error: "note  not found"
            }
        }
        return Promise.resolve({
            data
        });
    } catch (error) {
        return Promise.reject({
            error
        });
    }
}

export async function noteAdd(data){
    
    try {
        const docRef=await addDoc(collection(db,'notes'),data)        
    } catch (error) {
        return Promise.reject({
            error
        });
    }
}
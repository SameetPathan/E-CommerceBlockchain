import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set,get ,update,remove } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBYvm5hbPJIZ1VBCEPCQP6UKLEPZDQ8J70",
    authDomain: "e-commerce-blockchain.firebaseapp.com",
    projectId: "e-commerce-blockchain",
    storageBucket: "e-commerce-blockchain.appspot.com",
    messagingSenderId: "396933784702",
    appId: "1:396933784702:web:d4f6511c15ccdf4299a42f"
};


export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export function register(phonenumber, fullname, email,usertype,aadharcard,address,password){
    const dbb = getDatabase();
    set(ref(dbb, 'users/' + phonenumber), {
      username: fullname,
      email: email,
      usertype:usertype,
      aadharcard:aadharcard,
      address:address,
      password:password
    });
    alert("Registration Successfull")
}

export function addpets(id, name, breed,age,gender,shelyteraadhar,phonenumber,imageurl,price,city){
    const dbb = getDatabase();
    set(ref(dbb, 'users/products/' + id), {
        name: name,
        breed: breed,
        age:age,
        gender:gender,
        shelyteraadhar:shelyteraadhar,
        phonenumber:phonenumber,
        imageurl:imageurl,
        price:price,
        city:city
    });
    alert("added Successfull")
}

export function addorder(id, phonenumber , productname , price , address){
    const dbb = getDatabase();
    set(ref(dbb, 'users/orders/' + id), {
        productName: productname,
        price: price,
        address:address,
        phonenumber:phonenumber,
    });
    alert("Blockchain Confirmed")
}

export function reportpets(id,status) {
    const dbb = getDatabase();
    const petsRef = ref(dbb, 'users/products/' + id);

    get(petsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const petData = snapshot.val();
            petData["report"] = status;
            update(petsRef, petData).then(() => {
                alert('Reported successfully!');
            }).catch((error) => {
                console.error('Error Reporting: ', error);
            });
        } else {
            console.error('Pet data not found!');
        }
    }).catch((error) => {
        console.error('Error getting pet data: ', error);
    });
}

export function deletePet(id) {
    const db = getDatabase();
    const petRef = ref(db, 'users/products/' + id);
  
    remove(petRef).then(() => {
      alert('Pet deleted successfully!');
    }).catch((error) => {
      console.error('Error deleting pet: ', error);
    });
  }


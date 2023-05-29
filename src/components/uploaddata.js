import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addpets } from "../firebaseConfig";

export const uploadImageToFirebase = async (id,name,breed,age,gender,shelterAadhar,phonenumber,imageUrl,price,city) => {
  const storage = getStorage();
  const filename = id + '.jpg';
  const storageRef = ref(storage, "images/"+filename);
  const metadata = {
    contentType: 'image/jpeg',
  };

  const uploadTask = uploadBytesResumable(storageRef, imageUrl,metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
        console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //console.log("File available at", downloadURL);
        addpets(id,name,breed,age,gender,shelterAadhar,phonenumber,downloadURL,price,city)
      });
    }
  );
};

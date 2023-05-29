import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect,useState } from 'react';
import { deletePet, reportpets } from '../firebaseConfig';
import { uploadImageToFirebase } from "./uploaddata";

function AdminHome() {

  const [pets, setPets] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [shelterAadhar, setShelterAadhar] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhone] = useState("");

  const [order,setOrder]=useState([]);


  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const filteredPets = pets.filter((pet) =>
    pet.city.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const reportshelter=(id)=>{
    reportpets(id,false)
  }

  function handleClick(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }

  const deletepets=(id)=>{
    deletePet(id)
  }

  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImageUrl(file);
        alert("Image Saved")
      }
    };
    function add(){
      uploadImageToFirebase(getRandomInt(1,500),name,breed,age,gender,shelterAadhar,phonenumber,imageUrl,price,city);
    }



  useEffect(() => {
    const dbb = getDatabase();
    const petsRef = ref(dbb, 'users/products');

    const unsubscribe = onValue(petsRef, (snapshot) => {
      const petsData = snapshot.val();
      const petsArray = petsData ? Object.entries(petsData).map(([id, pet]) => ({ id, ...pet })) : [];
      setPets(petsArray);
    });


    const orderRef = ref(dbb, 'users/orders');

    const unsubscribe2 = onValue(orderRef, (snapshot) => {
      const orderData = snapshot.val();
      const orderArray = orderData ? Object.entries(orderData).map(([id, order]) => ({ id, ...order })) : [];
      setOrder(orderArray);
    });


    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);


  return (
    <>

    <div className='container-fluid mt-3 mb-3'>
  
    <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Products !</h4>
  <hr/>
</div>

      <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Report</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Information</th>
              <th scope="col">Product City</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Quantity</th>
              <th scope="col">Report Trusted</th>
              <th scope="col">ETH Address</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
          {filteredPets.map((pet) => (
            <tr>
              <th scope="row">{pet.id}</th>
              <td>{pet.report ? "Reported":"Trusted"}</td>
              <td>{pet.name}</td>
              <td>{pet.breed}</td>
              <td>{pet.city}</td>
              <td>{pet.price}</td>
         
              <td>{pet.age}</td>
              <td><button type="button" class="btn btn-outline-success" onClick={()=>{reportshelter(pet.id)}}>Trusted</button></td>
              <td>{pet.phonenumber}</td>
              <td><button type="button" class="btn btn-outline-danger" onClick={()=>{deletepets(pet.id)}}>Delete</button></td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>


    <div className="container text-center" >
    <button
        type="button"
        class="btn btn-outline-info mt-3 m-1 ml-5"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@getbootstrap"
      >
        Add Product
      </button>
    </div>


  
    <div className='container-fluid mt-3 mb-3'>
    <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Orders !</h4>
  <hr/>
</div>

      <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
          {order.map((order) => (
            <tr>
              <th scope="row">{order.id}</th>
              <td>{order.productName}</td>
              <td>{order.price}</td>
              <td>{order.address}</td>
              <td>{order.phonenumber}</td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>

    
    


<div className="container">
    

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Add Products
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                 Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="breed" className="form-label">
                  Information
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="breed"
                  value={breed}
                  onChange={(event) => setBreed(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  required
                />
              </div>
             
              <div className="mb-3">
                <label htmlFor="shelterAadhar" className="form-label">
                  Your Aadhar
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shelterAadhar"
                  value={shelterAadhar}
                  onChange={(event) => setShelterAadhar(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shelterAadhar" className="form-label">
                  Your ETH Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shelterAadhar"
                  value={phonenumber}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>


              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Cryto Price (/ETH)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required
                />
              </div>

              <div class="custom-file">
                <input type="file" class="custom-file-input" onChange={handleImageChange} id="customFile"/>
                <label class="custom-file-label" for="customFile">Choose file</label>
              </div>
              

            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button className="btn btn-outline-success my-2 my-sm-0 ml-3" data-dismiss="modal" onClick={add} >Add Product</button>
       
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default AdminHome
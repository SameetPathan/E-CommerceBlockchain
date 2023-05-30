import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { addorder, reportpets } from "../firebaseConfig";
import { ethers } from "ethers";
import Cookies from "js-cookie";

const contractAddress = "0x59cf5f3fD49F9C112889e1d9c82D59c1BFaeDF5A";
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "spendFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "displayFunds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function UserHome() {
  const [cityFilter, setCityFilter] = useState("");
  const [pets, setPets] = useState([]);
  const [phonec, setCurrentphone] = useState([]);
  const [productnamef, setproductnamef] = useState([]);
  const [address,setaddress]=useState([]);
  const [pricef, setpricef] = useState([]);

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(cityFilter.toLowerCase())
  );

  const reportshelter = (id) => {
    reportpets(id, true);
  };

  const handleAddressChange = (event) => {
    setaddress(event.target.value);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }


  const handleClick = async () => {

    try {
    
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const EcomContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        let Txn2 = await EcomContract.spendFunds(pricef);
        console.log("Mining... please wait");
        await Txn2.wait();
        console.log(
          `Mined, see transaction: https://goerli.etherscan.io/tx/${Txn2.hash}`
        );
        alert("Successfully Placed Order");
        addorder(getRandomInt(1,500), phonec , productnamef , pricef , address)
      } else {
        alert("Ethereum object does not exist");
      }
    } catch (err) {
      alert("Contract Error");
    }
  };

  useEffect(() => {
    const cookieUsertype = Cookies.get("phonenumber");
    if (cookieUsertype) {
      setCurrentphone(cookieUsertype);
    }

    const dbb = getDatabase();
    const petsRef = ref(dbb, "users/products");

    const unsubscribe = onValue(petsRef, (snapshot) => {
      const petsData = snapshot.val();
      const petsArray = petsData
        ? Object.entries(petsData).map(([id, pet]) => ({ id, ...pet }))
        : [];
      setPets(petsArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="container" style={{ width: "400px" }}>
        <div className="form-group">
          <label htmlFor="cityFilter" style={{ marginLeft: "100px" }}>
            Filter by Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cityFilter"
            value={cityFilter}
            onChange={handleCityFilterChange}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {filteredPets.map((pet) => (
          <div class="card m-3 form-bg form-container">
            {pet.report ? (
              <span
                class="badge badge-danger"
                style={{ width: "60px", marginBottom: "10px" }}
              >
                Reported
              </span>
            ) : (
              <span
                class="badge badge-success"
                style={{ width: "60px", marginBottom: "10px" }}
              >
                Trusted
              </span>
            )}
            <span class="badge badge-success p-2">{pet.name}</span>
            <img
              src={pet.imageurl}
              class="card-img-top p-1 rounded-circle"
              width="100px"
              height="200px"
            ></img>

            <span class="badge badge-info p-2 m-2">
              Information : {pet.breed}
            </span>
            <span class="badge badge-info p-2 m-2">
              City : {pet.city} , ETH Price : {pet.price}{" "}
            </span>
            <span class="badge badge-info p-2 m-2"> Quantity: {pet.age} </span>

            <span class="badge badge-info p-2 m-2">
              ETH Address : {pet.phonenumber}{" "}
            </span>

            <div class="d-flex justify-content-around">
              <h5 className="card-title text-center">
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModalb"
                  onClick={() => {
                    setpricef(pet.price);
                    setproductnamef(pet.name); 
                  }}
                >
                  Buy
                </button>
              </h5>

              <h5 class="card-title text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    reportshelter(pet.id);
                  }}
                >
                  Report
                </button>
              </h5>
            </div>
          </div>
        ))}
      </div>

      <div
        class="modal fade"
        id="exampleModalb"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Place Order (Blockchain System)
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
                <div class="alert alert-success" role="alert">
                  <h4 class="alert-heading">{productnamef}</h4>
                  <hr />
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={phonec}
                    disabled
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="form-group">
                  <label for="price" class="col-form-label">
                    Price ETh:
                  </label>
                  <input
                    type="text"
                    value={pricef}
                    disabled
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">
                    Address:
                  </label>
                  <textarea class="form-control" id="message-text"  value={address}
        onChange={handleAddressChange}></textarea>
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
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleClick()}
              >
                Confirm and Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;

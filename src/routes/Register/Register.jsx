import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import productsData from "../../assets/productsData.json";

const Register = () => {
  const [reference, setReference] = useState("");
  const [serial, setSerial] = useState("");
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validRef, setValidRef] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(reference, serial, vendor, date);

    try {
      const response = await axios.post("http://localhost:3000/register", {
        ref: reference,
        sn: serial,
        vendor: vendor,
        date: date,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="registerPage">
      <div>Register</div>
      <Link to="/check">Go to check</Link>

      <form onSubmit={handleSubmit}>
        <label htmlFor="reference">
          Product reference
          <input
            type="text"
            name="reference"
            id="reference"
            placeholder="Product reference"
            className={validRef}
            value={reference}
            onChange={(event) => {
              setReference(event.target.value);
            }}
            required
            onBlur={(event) => {
              !reference
                ? setValidRef("")
                : productsData.find(
                    (product) => product.reference === reference
                  )
                ? setValidRef("valid")
                : setValidRef("invalid");
            }}
          />
          <div>
            {validRef === "invalid" ? (
              "This product refrence does not exist!"
            ) : (
              <img
                src={
                  productsData.find(
                    (product) => product.reference === reference
                  )?.image
                }
              />
            )}
          </div>
        </label>
        <label htmlFor="serial">
          Serial number
          <input
            type="text"
            name="serial"
            id="serial"
            placeholder="Serial number"
            value={serial}
            onChange={(event) => {
              setSerial(event.target.value);
            }}
            required
          />
        </label>
        <label htmlFor="vendor">
          Vendor
          <input
            type="text"
            name="vendor"
            id="vendor"
            placeholder="Name of vendor"
            value={vendor}
            onChange={(event) => {
              setVendor(event.target.value);
            }}
            required
          />
        </label>
        <label htmlFor="dateOfSale">
          Date of sale
          <input
            type="date"
            name="dateOfSale"
            id="dateOfSale"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
            required
          />
        </label>
        <button>Submit</button>
      </form>
      <div>{errorMessage ? errorMessage : ""}</div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import "./Check.css";
import productsData from "../../assets/productsData.json";

const Check = () => {
  const [reference, setReference] = useState("");
  const [serial, setSerial] = useState("");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(reference, serial);

    try {
      const response = await axios.get(
        `http://localhost:3000/warranty-check?ref=${reference}&sn=${serial}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="checkPage">
      <h1>Check your warranty</h1>
      <Link to="/">Go to warranty registration </Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reference">
          Product reference
          <input
            type="text"
            name="reference"
            id="reference"
            placeholder="Product reference"
            value={reference}
            onChange={(event) => {
              setReference(event.target.value);
              setErrorMessage("");
              setData(null);
            }}
            required
          />
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
              setErrorMessage("");
              setData(null);
            }}
            required
          />
        </label>
        <button>Submit</button>

        {data ? (
          <div className="response">
            <img
              src={
                productsData.find((product) => product.reference === reference)
                  ?.image
              }
              alt="Product image"
            />
            <div>
              <span>Product reference:</span> <span>{data.reference}</span>
            </div>
            <div>
              <span>Product serial number:</span>
              <span>{data.serialNumber}</span>
            </div>
            <div>
              <span>Product sold by:</span>
              <span>{data.vendor}</span>
            </div>
            <div>
              <span>Product sold on:</span>
              <span>{format(data.dateOfSale, "dd MMMM yyyy")}</span>
            </div>
            <div>
              <span>Under warranty until:</span>
              <span>{format(data.dateOfWarranty, "dd MMMM yyyy")}</span>
            </div>
          </div>
        ) : (
          <div className="error">{errorMessage ? errorMessage : null}</div>
        )}
      </form>
    </div>
  );
};

export default Check;

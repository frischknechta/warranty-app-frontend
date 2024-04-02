import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import "./Check.css";

const Check = () => {
  const [reference, setReference] = useState("");
  const [serial, setSerial] = useState("");
  const [data, setData] = useState(null);

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
    }
  };

  return (
    <div className="checkPage">
      <div>Check</div>
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
            }}
            required
          />
        </label>
        <button>Submit</button>
      </form>
      {data ? (
        <div>
          <div> Product reference: {data.reference}</div>
          <div> Product serial number: {data.serialNumber}</div>
          <div> Product sold by: {data.vendor}</div>
          <div> Product sold on: {format(data.dateOfSale, "dd MMMM yyyy")}</div>
          <div>
            Under warranty until: {format(data.dateOfWarranty, "dd MMMM yyyy")}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Check;

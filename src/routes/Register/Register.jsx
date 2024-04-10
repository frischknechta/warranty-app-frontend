import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Register.css";
import productsData from "../../assets/productsData.json";

const Register = () => {
  const [reference, setReference] = useState("");
  const [serial, setSerial] = useState("");
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validRef, setValidRef] = useState("");

  // SUBMIT FUNCTION
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://site--personal-projects-backend--79sf29g9cmjg.code.run/register",
        {
          ref: reference,
          sn: serial,
          vendor: vendor,
          date: date,
        }
      );
      console.log(response.data);
      alert("The warranty has been registered for your product!");
      setReference("");
      setSerial("");
      setVendor("");
      setDate("");
      setValidRef("");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="registerPage">
      <h1>Register your warranty</h1>
      <Link to="/check">Go to warranty checker</Link>

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
              setErrorMessage("");
              setValidRef("");
            }}
            required
            minLength={10}
            // CHECKING IF REFERENCE IS VALID ACCORDING TO LIST
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
          {/* VALIDITY INDICATOR (CHECK OR XMARK) */}
          {!validRef ? null : validRef === "invalid" ? (
            <div className={`symbol ${validRef}`}>
              <FontAwesomeIcon icon={"circle-xmark"} />
            </div>
          ) : (
            <div className={`symbol ${validRef}`}>
              <FontAwesomeIcon icon={"circle-check"} />
            </div>
          )}
        </label>

        {/* If ref is invalid, display error, else display product picture */}
        {!validRef ? null : validRef === "invalid" ? (
          <div className="error">This product reference does not exist!</div>
        ) : (
          <img
            src={
              productsData.find((product) => product.reference === reference)
                ?.image
            }
            alt="Product image"
          />
        )}
        <label htmlFor="serial">
          Serial number
          <input
            type="text"
            name="serial"
            minLength={5}
            maxLength={6}
            id="serial"
            placeholder="Serial number"
            value={serial}
            onChange={(event) => {
              setSerial(event.target.value);
              setErrorMessage("");
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
            max={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
            required
          />
        </label>
        <button disabled={validRef === "invalid" ? true : false}>Submit</button>
        <div className="error">{errorMessage ? errorMessage : null}</div>
        <details>
          <summary>
            <FontAwesomeIcon icon={"circle-question"} /> Need help to use the
            demo?
          </summary>
          <div className="hint">
            <span>
              For the demo, use the reference numbers 123456789[0 - 9]. For
              example 1234567895.
            </span>
          </div>
        </details>
      </form>
    </div>
  );
};

export default Register;

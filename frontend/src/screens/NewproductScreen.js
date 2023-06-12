import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewProductScreen() {
  const [s_n, setS_n] = useState('');
  const [type, setType] = useState();
  const [model, setModel] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [u_m, setU_m] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const formDataObj = {
      s_n: s_n,
      type: type,
      model: model,
      amount: amount,
      description: description,
      u_m: u_m,
      isborr: 'false',
    };
    // Send the JSON data to the server using Fetch API
    axios
      .post('http://localhost:4000/newproduct', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
          setS_n('');
          setType('');
          setModel('');
          setAmount('');
          setDescription('');
          setU_m('');
        } else {
          toast.error('Oops, something went wrong!');
        }
      });
  };

  return (
    <div className="signup">
      <form
        className="signup-form-container"
        id="signup-form-container"
        onSubmit={handleSubmit}
      >
        <h2>Add new product</h2>
        <div key="id" className="signup-form-group">
          <label className="signup-lable" htmlFor="equipment-select">
            Select equipment:
          </label>
          <select
            id="equipment-select"
            name="equipment"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="camera">Camera</option>
            <option value="rec">Rec</option>
            <option value="apple">Apple</option>
            <option value="tripod">Tripod</option>
            <option value="projector">Projector</option>
            <option value="cable">Cable</option>
            <option value="lights">Lights</option>
            <option value="convertor">Convertor</option>
          </select>
          <label className="signup-lable" htmlFor="s_n">
            Serial Number:
          </label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Serial Number"
            required={true}
            value={s_n}
            onChange={(e) => setS_n(e.target.value)}
          />
          <label className="signup-lable" htmlFor="model">
            Model:
          </label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Model"
            required={true}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <label className="signup-lable" htmlFor="amount">
            amount:
          </label>
          <input
            className="signup-input"
            type="number"
            placeholder="Enter amount"
            required={true}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label className="signup-lable" htmlFor="description">
            description:
          </label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter description"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="signup-lable" htmlFor="u_m">
            User manul:
          </label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter User manul"
            required={true}
            value={u_m}
            onChange={(e) => setU_m(e.target.value)}
          />
        </div>

        <button
          className="signup-submit"
          type="submit"
          id="submit-btn"
          title="Save"
        >
          Add new product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default NewProductScreen;

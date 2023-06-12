import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LINKS from './imagesLink.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';

function Product(props) {
  const auth = useAuthUser();
  const isAuth = useIsAuthenticated();
  const { product, users } = props;
  const [rentTime, setRentTime] = useState('');
  const [suspensionReason, setSuspensionReason] = useState('');
  const [borrowingUser, setBorrowingUser] = useState([]);
  const handleSelectUsers = (e) => {
    setBorrowingUser(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };
  const selectStyle = {
    width: '100%',
    height: '40px',
    margin: '10px 0',
    padding: '5px',
  };

  const borrowed = (event) => {
    event.preventDefault();
    const formDataObj = {
      serialNumber: product.serialNumber,
      borrowingUser: borrowingUser,
    };
    axios
      .put('http://localhost:4000/products/borrow', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Updated product:', response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };
  const ChangeRentTime = (event) => {
    event.preventDefault();
    const formDataObj = {
      serialNumber: product.serialNumber,
      newDate: rentTime,
    };
    axios
      .put('http://localhost:4000/products/rentTime', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Updated product:', response.data);
        toast.success(response.data.message);
        setRentTime('');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };
  const returned = (event) => {
    event.preventDefault();
    const formDataObj = { serialNumber: product.serialNumber };
    axios
      .put('http://localhost:4000/products/return', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Updated product:', response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };
  const suspend = (event) => {
    event.preventDefault();
    const formDataObj = {
      serialNumber: product.serialNumber,
      suspensionReason: suspensionReason,
    };
    axios
      .put('http://localhost:4000/products/suspend', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Updated product:', response.data);
        toast.success(response.data.message);
        setSuspensionReason('');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };
  const unsuspend = (event) => {
    event.preventDefault();
    const formDataObj = { serialNumber: product.serialNumber };
    axios
      .put('http://localhost:4000/products/unsuspend', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Updated product:', response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <Card className="product-card">
      {' '}
      {/* add the className attribute */}
      <img
        src={LINKS[product.type]}
        alt="Google Logo"
        className="product-image"
      />
      <Card.Body>
        <p>{product.serialNumber}</p>

        {isAuth() ? (
          auth().role === 'Admin' ? (
            <>
              {product.isSuspend ? (
                <Button onClick={unsuspend}>unsuspend</Button>
              ) : (
                <>
                  <label style={{ color: 'black' }}>Suspension Reason</label>
                  <input
                    type="text"
                    value={suspensionReason}
                    onChange={(e) => setSuspensionReason(e.target.value)}
                  ></input>
                  <Button onClick={suspend}>suspend</Button>

                  {product.isBorrowed ? (
                    <Button onClick={returned}>returned</Button>
                  ) : (
                    <>
                      <Button onClick={borrowed}>borrowed</Button>
                      <h5 class="multipleInvite">Multiple Group</h5>
                      <select
                        class="groupInvite"
                        style={selectStyle}
                        multiple={true}
                        onChange={handleSelectUsers}
                      >
                        {users.map(
                          (user, index) =>
                            user && (
                              <option key={index} value={user.value}>
                                {user.display}
                              </option>
                            )
                        )}
                      </select>
                    </>
                  )}
                  <label style={{ color: 'black' }}>Change Rent Time</label>
                  <input
                    type="Number"
                    value={rentTime}
                    onChange={(e) => setRentTime(e.target.value)}
                  ></input>
                  <Button onClick={ChangeRentTime}> Change</Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button>
                <Link
                  to={`order/${product.serialNumber}`}
                  style={{ color: 'white' }}
                >
                  Order
                </Link>
              </Button>
            </>
          )
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;

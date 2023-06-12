import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import Problem from '../componnents/Problem'; // Import the Problem component

const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [users, setUsers] = useState([]);
  const [transferUsers, setTransferUsers] = useState([]);

  const auth = useAuthUser();
  const user = auth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/profile/${user.role}`,
          {
            withCredentials: true,
          }
        );

        setOrders(data.orders);
        setRooms(data.rooms);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/order/student`,
          {
            withCredentials: true,
          }
        );

        if (Array.isArray(data)) {
          setUsers(
            data.map((user) => ({
              display: user.email.split('@')[0],
              value: user.email,
            }))
          );
        } else {
          console.error('Unexpected response data from /order');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const selectStyle = {
    width: '100%',
    height: '40px',
    margin: '10px 0',
    padding: '5px',
  };

  const handleSelectUsers = (e) => {
    setTransferUsers(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const TransferToAnotherUser = (event, serialNumber, orderId) => {
    event.preventDefault();

    if (transferUsers.length === 0) {
      toast.error('Please select a user to transfer the order.');
      return;
    }

    const formDataObj = {
      serialNumber: serialNumber,
      userId: auth().userid,
      transferUserId: transferUsers[0], // Assuming only one user can be selected
      note: 'hey you!',
      extendedDate: null,
      orderID: orderId,
    };

    axios
      .post('http://localhost:4000/request/transfer', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error creating transfer request:', error);
      });
  };

  const extend = (event, serialNumber, orderID) => {
    event.preventDefault();
    const formDataObj = {
      serialNumber: serialNumber,
      date: date,
      note: note,
      startTime: startTime,
      endTime: endTime,
      orderId: orderID,
    };
    axios
      .put('http://localhost:4000/request/extend', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return auth().role === 'Admin' ? (
    <>
      <h2 className="myOrderTitle">Borrowed equipment</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            <h3>Order: {order.serialNumber}</h3>
            <p>Start Date: {new Date(order.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(order.endDate).toLocaleDateString()}</p>
            <p>User Email: {order.userid}</p>
            {Date.now() > new Date(order.endDate) ? (
              <h4 style={{ color: 'red' }}>The equipment is late</h4>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </>
  ) : (
    <>
      <h2 className="myOrderTitle">My Orders</h2>
      <ul className="room-list">
        {rooms.map((room) => (
          <li key={room._id} className="room-item">
            <h3>Order: Room {room.roomNumber}</h3>
            <p>Date: {new Date(room.roomDate).toLocaleDateString()}</p>
            <p>Start Time: {room.startTime}</p>
            <p>End Time: {room.endTime}</p>
          </li>
        ))}
      </ul>
      <ul className="order-list">
        {orders
          .filter((order) => order.isActive !== 'old')
          .map((order) => (
            <li key={order._id} className="order-item">
              <h3>Order: {order.serialNumber}</h3>
              <p>
                Start Date: {new Date(order.startDate).toLocaleDateString()}
              </p>
              <p>End Date: {new Date(order.endDate).toLocaleDateString()}</p>
              {order.isActive === 'true' ? (
                auth().role === 'Student' ? (
                  <>
                    <h5 class="multipleInvite">
                      Request Transfer To Another Student
                    </h5>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        TransferToAnotherUser(e, order.serialNumber, order._id);
                      }}
                    >
                      Create Request
                    </button>
                  </>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}

              {order.isActive === 'true' ? (
                <>
                  <label>Extended the loan period:</label>
                  <input
                    type="date"
                    name="extendedDate"
                    min={new Date(order.endDate).toISOString().split('T')[0]}
                    max={
                      new Date(
                        new Date(order.endDate).getTime() +
                          7 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split('T')[0]
                    }
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <label>Note (optional):</label>
                  <input
                    className="signup-input"
                    type="text"
                    placeholder="Enter Model"
                    required={false}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={(e) => {
                      extend(e, order.serialNumber, order._id);
                    }}
                  >
                    Submit
                  </button>
                  <Problem order={order} /> {/* Problem component */}
                </>
              ) : (
                <></>
              )}
            </li>
          ))}
      </ul>

      <ToastContainer />
    </>
  );
};

export default ProfileScreen;

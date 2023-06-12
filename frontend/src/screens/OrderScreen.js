import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, isSaturday, differenceInCalendarDays } from 'date-fns';
import { useAuthUser } from 'react-auth-kit';
import { useParams } from 'react-router-dom';

const OrderScreen = () => {
  const params = useParams();
  const { slug } = params;
  const [loanDate, setLoanDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const selectStyle = {
    width: '100%',
    height: '40px',
    margin: '10px 0',
    padding: '5px',
  };

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
          setUsers(data.map(user => ({ display: user.email.split('@')[0], value: user.email })));
        } else {
          console.error('Unexpected response data from /order');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  });

  const auth = useAuthUser();

  const handleSelect = (ranges) => {
    setLoanDate(ranges.selection.startDate);
    setReturnDate(ranges.selection.endDate);
    setSelectionRange(ranges.selection);
  };

  const handleSelectUsers = (e) => {
    setInvitedUsers(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const rentTime = await axios.post(
      `http://localhost:4000/order/rentTime`,
      { serialNumber: slug },
      {
        withCredentials: true,
      }
    );
    console.log(rentTime.data);

    const setRentTime = auth().role === 'Student' ? rentTime.data : 0;

    if (!loanDate || !returnDate) {
      toast.error('Please select a date range');
      return;
    }

    if (differenceInCalendarDays(returnDate, loanDate) > setRentTime) {
      toast.error(`The maximum rental period is ${setRentTime + 1} days`);
      return;
    }

    if (isSaturday(loanDate) || isSaturday(returnDate)) {
      toast.error('Rental is not available on Saturdays');
      return;
    }

    try {
      const { data } = await axios.post('/order', {
        userid: auth().userid,
        startDate: loanDate,
        endDate: returnDate,
        serialNumber: slug,
        invitedUsers: invitedUsers,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h2>Order a Product</h2>
      <form
        className="order-form-container1"
        id="order-form-container"
        onSubmit={submitHandler}
      >
        <>
          <div className="date-and-select-container1">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              direction="horizontal"
              rangeColors={['#3498db']}
            />
            {auth().role === 'Student' ? (
              <>
                <h5 className="multipleInvite">Multiple Group</h5>
                <select
                  className="groupInvite"
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
            ) : (
              <></>
            )}
          </div>
        </>

        <button className="order-submit" type="submit" id="submit-btn">
          Order
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default OrderScreen;

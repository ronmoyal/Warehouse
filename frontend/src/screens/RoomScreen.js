import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isSaturday } from 'date-fns';
import { useAuthUser } from 'react-auth-kit';

const RoomScreen = () => {
  const [loanDate, setLoanDate] = useState(null);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('21:00');

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
        const { data } = await axios.get('http://localhost:4000/room', {
          withCredentials: true,
        });
        console.log(data);
        if (Array.isArray(data)) {
          setUsers(data.map(user => ({ display: user.email.split('@')[0], value: user.email })));
        } else {
          console.error('Unexpected response data from /room');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const auth = useAuthUser();

  const handleSelectUsers = (e) => {
    setInvitedUsers(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const startHour = parseInt(startTime.slice(0, 2));
    const endHour = parseInt(endTime.slice(0, 2));

    if (endHour - startHour < 1 || endHour - startHour > 4) {
      toast.error('Booking time must be minimum 1 hour and maximum 4 hours');
      return;
    }

    if (isSaturday(loanDate)) {
      toast.error('Rental is not available on Saturdays');
      return;
    }

    try {
      const { data } = await axios.post('/room', {
        userid: auth().userid,
        roomDate: loanDate,
        roomNumber: '1',
        invitedUsers: invitedUsers,
        startTime: startTime,
        endTime: endTime,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <h2>Order a Podcast Room</h2>
      <form className="order-form-container" id="order-form-container" onSubmit={submitHandler}>
        <div className="date-and-select-container">
          <div>
            <label htmlFor="loanDate" >Date</label>
            <input
              className='roomLoanDate'
              type="date"
              id="loanDate"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              required
              style={{ width: "300px", height: '40px', padding: '5px' }}
            />
          </div>

          <div>
            <label htmlFor="startTime">Start Time  </label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="select-black"  //  Hackathon - user story 6  
            >
              {Array.from({ length: 14 }, (_, i) => `0${8 + i}`.slice(-2)).map((hour) => (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              ))}
            </select>

            <label htmlFor="endTime">|End Time  </label>
            <select
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="select-black"  //  Hackathon - user story 6  
            >
              {Array.from({ length: 14 }, (_, i) => `0${9 + i}`.slice(-2)).map((hour) => (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="invitedUsers">Multiple Group</label>
          <select
            className="groupInvite"
            style={selectStyle}
            multiple={true}
            onChange={handleSelectUsers}
          >
            {users.map((user, index) => user && (
              <option key={index} value={user.value}>
              {user.display}
              </option>
            ))}
          </select>
        </div>

        <button className="order-submit" type="submit" id="submit-btn">
          Order
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default RoomScreen;

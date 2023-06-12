import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';

const RequestScreen = () => {
  const [requests, setRequests] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchUserRole();
    fetchRequests();
  }, []);

  const fetchUserRole = () => {
    axios
      .get(`http://localhost:4000/user/role`, { withCredentials: true })
      .then((response) => {
        setUserRole(response.data.role);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const fetchRequests = () => {
    axios
      .get(`http://localhost:4000/request`, { withCredentials: true })
      .then((response) => {
        setRequests(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const approveRequest = (
    serialNumber,
    requestId,
    userToTransferEmail,
    extendedDate
  ) => {
    axios
      .put(
        `http://localhost:4000/request/approved`,
        {
          requestId,
          userToTransferEmail,
          serialNumber,
          extendedDate,
        },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        fetchRequests(); // Refresh the requests after successful update
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <h1 class="ProductsTitle">Request</h1>
      <div className="request">
        {
          <>
            {requests.map((request) => (
              <li key={request._id} className="order-item">
                <h5>serialNumber: {request.serialNumber}</h5>
                <h5>User Email: {request.userEmail}</h5>
                <h5>Note: {request.note}</h5>
                <h5>extended Date: {request.extendedDate}</h5>
                <h5>user To Transfer Email: {request.userToTransferEmail}</h5>
                <Button
                  onClick={() =>
                    approveRequest(
                      request.serialNumber,
                      request._id,
                      request.userToTransferEmail,
                      request.extendedDate,
                    )
                  }
                >
                  Accept Request
                </Button>
              </li>
            ))}
          </>
        }
        <ToastContainer />
      </div>
    </div>
  );
};

export default RequestScreen;

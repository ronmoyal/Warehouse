import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Problem = ({ order }) => {
  const [problemNote, setProblemNote] = useState('');
  const [problemReported, setProblemReported] = useState(false);
  const [showReportField, setShowReportField] = useState(false);

  const reportProblem = (event, serialNumber) => {
    event.preventDefault();
    const formDataObj = { serialNumber: serialNumber, note: problemNote };
    axios
      .post('http://localhost:4000/problem', formDataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Reported problem:', response.data);
        toast.success(response.data.message);
        setProblemReported(true);
        setShowReportField(false);
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        }
        else{
        toast.error('Error updating problem:', error);
        }
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowReportField(!showReportField)}
        disabled={problemReported}
        className={problemReported ? 'button-complete' : ''}
      >
        {problemReported ? 'Reported!' : (showReportField ? 'Hide report field' : 'Report a problem')}
      </button>

      {showReportField && (
        <>
          <label>Report faulty equipment:</label>
          <textarea
            className="signup-input"
            placeholder="Describe the issue"
            value={problemNote}
            onChange={(event) => setProblemNote(event.target.value)}
          />

          <button 
            type="button" 
            onClick={(event) => {
              reportProblem(event, order.serialNumber);
            }}
            disabled={problemReported}
          >
            Report a problem
          </button>
        </>
      )}
    </>
  );
};

export default Problem;

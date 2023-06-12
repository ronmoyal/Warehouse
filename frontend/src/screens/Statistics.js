import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
  // State variables to store the fetched data
  const [old, setOld] = useState([]);
  const [future, setFuture] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(`http://localhost:4000/statistics`, {
        withCredentials: true,
      })
      .then((response) => {
        setOld(response.data.old);
        setFuture(response.data.future);
      });
  }, []);
  console.log(old);
  console.log(future);
  // Define the types of statistics
  const types = [
    'camera',
    'apple',
    'tripod',
    'projector',
    'cable',
    'lights',
    'convertor',
  ];

  // Store the order counts for each type - old
  const oldCounts = {};

  // Query the database
  types.forEach(async (type) => {
    const count = old.filter((item) => item.type === type).length;
    oldCounts[type] = count;
  });

  // Store the order counts for each type - future
  const futureCounts = {};

  // Query the database
  types.forEach(async (type) => {
    const count = future.filter((item) => item.type === type).length;
    futureCounts[type] = count;
  });

  return (
    <>
      <div className="container">
        <div className="statisticsContainer">
          <h2 className="statisticsTitle">Statistics</h2>

          {/* Future Orders Table */}
          <h3 className="tableTitle">Future Orders</h3>
          <table className="table table-spacing">
            <thead>
              <tr>
                <th scope="col">type</th>
                <th scope="col">amount</th>
              </tr>
            </thead>

            <tbody>
              {types.map((type) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{futureCounts[type]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Old Orders Table */}
          <h3 className="tableTitle">Old Orders</h3>
          <table className="table table-spacing">
            <thead>
              <tr>
                <th scope="col">type</th>
                <th scope="col">amount</th>
              </tr>
            </thead>

            <tbody>
              {types.map((type) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{oldCounts[type]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Statistics;

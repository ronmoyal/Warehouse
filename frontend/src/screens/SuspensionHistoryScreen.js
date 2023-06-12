import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';

function SuspensionHistoryPage() {
  const [suspensionHistory, setSuspensionHistory] = useState([]);

  useEffect(() => {
    const fetchSuspensionHistory = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/suspension-history',
          {
            withCredentials: true,
          }
        );
        setSuspensionHistory(response.data);
      } catch (error) {
        console.error('Error fetching suspension history:', error);
      }
    };

    fetchSuspensionHistory();
  }, []);
  const filteredProducts = suspensionHistory.filter(
    (product) => product.suspensionHistory.length > 0
  );
  return (
    <Container>
      <h1 className="text-center mb-4">Suspension History</h1>
      {filteredProducts.map((product) => (
        <div key={product.serialNumber}>
          <h3 className="mt-4">Serial Number: {product.serialNumber}</h3>
          <Row className="justify-content-center">
            <Col xs={10} md={8}>
              <div className="statisticsContainer">       {/* Hackathon - user story 6 */}
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>Suspension Reason</th>
                      <th>Suspension Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.suspensionHistory.map((suspension) => (
                      <tr key={suspension._id}>
                        <td>{suspension.reason}</td>
                        <td>{new Date(suspension.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default SuspensionHistoryPage;

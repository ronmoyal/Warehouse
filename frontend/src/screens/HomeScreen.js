import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../componnents/Product';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthUser } from 'react-auth-kit';

function HomeScreen() {
  const [sort, setSort] = useState('All');
  const auth = useAuthUser();
  const [users, setUsers] = useState([]);
  const [products, setProdusts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/products`, {
        withCredentials: true,
      })
      .then((response) => {
        setProdusts(response.data);
        toast.success(response.data.message);
      });
    axios
      .get(`http://localhost:4000/order/users`, {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(
          response.data.map((user) => ({
            display: user.email.split('@')[0],
            value: user.email,
          }))
        );
        toast.success(response.data.message);
      });
  }, []);

  return (
    <div>
      <div className="homeTitlePodcast">
        <h1 className="ProductsTitle"> Our Products </h1>
        <select
          id="sort-select"
          name="sort"
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="camera">Camera</option>
          <option value="rec">Rec</option>
          <option value="apple">Apple</option>
          <option value="tripod">Tripod</option>
          <option value="projector">Projector</option>
          <option value="cable">Cable</option>
          <option value="lights">Lights</option>
          <option value="convertor">Convertor</option>
        </select>
        {auth().role === 'Student' ? (
          <Link to="/room">
            <Button class="inviteButton">Invite Podcast Room</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="products">
        <Row>
          {sort === 'All'
            ? products.map((product) => (
                <Col
                  key={product.serialNumber}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3"
                >
                  <Product product={product} users={users}></Product>
                </Col>
              ))
            : products
                .filter((product) => product.type === sort)
                .map((product) => (
                  <Col
                    key={product.serialNumber}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-3"
                  >
                    <Product product={product} users={users}></Product>
                  </Col>
                ))}
        </Row>
        {/* )} */}
      </div>
      <ToastContainer position="middle" /> {/* Hackathon - user story 9  */}
    </div>
  );
}

export default HomeScreen;

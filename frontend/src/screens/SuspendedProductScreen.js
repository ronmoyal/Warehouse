import axios from 'axios';
import { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../componnents/Product';

import { toast } from 'react-toastify';

function SuspendedProductScreen() {
  const [products, setProdusts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/suspended`, {
        withCredentials: true,
      })
      .then((response) => {
        setProdusts(response.data);
        toast.success(response.data.message);
      });
  }, []);

  return (
    <div>
      <h1 class="ProductsTitle">Suspended Products</h1>
      <div className="products">
      
        <Row>
          {products
            .map((product) => (
              <Col
                key={product.serialNumber}
                sm={16}
                md={14}
                lg={13}
                className="mb-3"
              >
                <Product product={product}></Product>
              </Col>
            ))}
        </Row>
        {/* )} */}
      </div>
    </div>
  );
}

export default SuspendedProductScreen;

/*
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.serialNumber}</p>
          <p>{product.model}</p>
          <p>{product.amount}</p>
          <p>{product.description}</p>
          <p>{product.UserManual}</p>
          <p>{product.isBorrowed}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProductScreen;
*/


import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
export default ProductScreen;

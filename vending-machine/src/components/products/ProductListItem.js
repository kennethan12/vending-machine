import React from 'react';
import Col from "react-bootstrap/Col";

const ProductListItem = ({ product, handleGetItem }) => {
  return (
    <Col sm={4}>
      <div id="product" class="rounded m-1 p-1" value={product.id} style={{ height: '200px' }}>
        <div class="ml-1 font-weight-bold" onClick={handleGetItem} value={product.id}>
          {product.id}
        </div>
        <div className="text-center" value={product.id} style={{ fontSize: '1.3rem' }}>
          {product.name}
        </div>
        <div className="text-center" value={product.id}>
          ${Number(product.price).toFixed(2)}
        </div>
        <div className="text-center" value={product.id}>
          Quantity Left: {product.quantity}
        </div>
      </div>
    </Col>
  )
}

export default ProductListItem;
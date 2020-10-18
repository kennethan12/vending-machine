import React from "react";
import ProductListItem from "./ProductListItem";

class ProductList extends React.Component {

  static defaultProps = {
    products: [
      {
        "id": 11,
        "name": "Guild Certificate",
        "price": 10000.00,
        "quantity": 1
      },
      {
        "id": 12,
        "name": "Used Tractor",
        "price": 42.75,
        "quantity": 1
      },
      {
        "id": 15,
        "name": "TSG Vinyl Stickers",
        "price": 0.50,
        "quantity": 71
      },
      {
        "id": 20,
        "name": "TSG Hoodie [SALE!]",
        "price": 5.00,
        "quantity": 0
      },
      {
        "id": 21,
        "name": "TSG Programmable Drone",
        "price": 336.00,
        "quantity": 3
      },
      {
        "id": 25,
        "name": "Java Rox!! T-shirt",
        "price": 3.00,
        "quantity": 74
      },
      {
        "id": 26,
        "name": "I C#-er than most! T-shirt",
        "price": 4.00,
        "quantity": 0
      },
      {
        "id": 27,
        "name": "SQL II : Query Returns - The Movie",
        "price": 2.19,
        "quantity": 0
      }
    ]
  }

  render() {
    let { products, handleGetItem } = this.props;
    return (
      <div className="row">
        {products.map((product, i) => {
          return (
            <ProductListItem product={product} key={i} handleGetItem={handleGetItem} />
          )
        })}
      </div>
    )
  }
}

export default ProductList;
import React from "react";

export default function Cart() {
  return (
    <div className="container-sm mt-5">
      <div className="cartheader">
        <h2 className="font-weight-bold pt-5">Shopping Cart</h2>
        <hr></hr>
      </div>
      <div className="cartbody my-5">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Total</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

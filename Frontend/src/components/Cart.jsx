import { useEffect, useState } from "react";
import Cartitem from "./Cartitem";
function Cart(props) {
  const { items, addhandler, resethandler, minushandler, deleteitem } = props;
  return (
    <>
      {items.length > 0 && (
        <>
          <div className="overflow-x-auto m-w-lg m-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th></th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <Cartitem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    count={item.count}
                    price={item.price}
                    quantity={item.quantity}
                    addhandler={addhandler}
                    minushandler={minushandler}
                    deleteitem={deleteitem}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center mt-5 rounded-4xl">
            <button
              className="btn border-2 p-1 bg-blue-400 transition-all hover:scale-105 hover:bg-blue-600"
              onClick={resethandler}
            >
              Clean up
            </button>
          </div>
        </>
      )}
      {items.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center text-4xl font-bold relative top-10">
          Empty cart
          <div className="text-2xl mt-2 font-medium ">Add something!</div>
        </div>
      )}
    </>
  );
}

export default Cart;

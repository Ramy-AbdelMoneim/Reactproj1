import React from "react";
import Search from "./Search";
import { ToastContainer } from "react-toastify";
export default function Home({
  items,
  addToCarthandler,
  quantityinc,
  quantitydec,
  loading,
  categories,
  selectedcat,
  handleselected,
  numberofpages,
  selectedpage,
  pagehandler,
  readtext,
  search,
  inputtext,
}) {
  if (loading) {
    return (
      <>
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      </>
    );
  }

  let pages = [];
  for (let i = 1; i <= numberofpages; i++) {
    pages.push(i);
  }
  return (
    <>
      <ToastContainer position="top-left" theme="dark" />
      <div className="max-w-7xl m-auto">
        <div className="text-xl font-bold ">Menu</div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <div className="overflow-x-auto rounded-box border-5 border-base-content/5 bg-base-100 relative">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td
                        className={`cursor-pointer w-full text-center transition-all ${
                          cat.id !== selectedcat ? "hover:bg-amber-100" : ""
                        }
                          ${cat.id === selectedcat ? "bg-amber-500" : ""}`}
                        onClick={() => handleselected(cat.id)}
                      >
                        {cat.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="overflow-x-auto col-span-2 relative">
            <div className="absolute end-0">
              <Search
                readtext={readtext}
                search={search}
                inputtext={inputtext}
              />
            </div>
            <table className="table table-zebra my-3.5">
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.price}$</td>
                    <td className="text-center  justify-center flex gap-2">
                      <button
                        className="btn rounded-full w-3 h-auto"
                        onClick={() => quantitydec(item.id)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="btn rounded-full w-3 h-auto"
                        onClick={() => quantityinc(item.id)}
                      >
                        +
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => addToCarthandler(item.id)}
                        className="cursor-pointer transition-all hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={item.count > 0 ? "black" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {numberofpages > 1 && (
              <div className="join w-full justify-center">
                {pages.map((page) => (
                  <button
                    className={`join-item btn ${
                      selectedpage === page ? "btn-active" : ""
                    }`}
                    onClick={() => pagehandler(page)}
                    key={page}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

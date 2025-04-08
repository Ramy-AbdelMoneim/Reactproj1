import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Productform({ categories, loading, addItem }) {
  if (loading) {
    return (
      <>
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      </>
    );
  }

  const [formstate, setform] = useState({
    name: "",
    price: "",
    Category: 1,
  });

  const formhandler = (e) => {
    const newform = { ...formstate, [e.target.name]: e.target.value };
    setform(newform);
  };

  const navigate = useNavigate();
  const addtoDB = async (e) => {
    try {
      e.preventDefault();
      const newitem = {
        ...formstate,
        count: 0,
        quantity: 1,
      };
      navigate("/admin");
      const res = await axios.post("http://localhost:3000/menu?", newitem);
      addItem(res.data);
      const notify = () => toast("✔ Product is added successfully");
      notify();
    } catch {
      const notify = () =>
        toast.error(" Product is not added, try again later!");
      notify();
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="mb-4 text-xl font-semibold">Add Item</div>
        <div className="block relative w-full max-w-md">
          <form>
            <label htmlFor="name">Name</label>
            <input
              className="input block mb-4 w-full"
              type="text"
              name="name"
              value={formstate.name}
              placeholder="Name"
              onChange={formhandler}
            />
            <label htmlFor="price">Price</label>
            <input
              className="input block mb-4 w-full"
              type="text"
              name="price"
              placeholder="Price"
              value={formstate.price}
              onChange={formhandler}
            />
            <label htmlFor="Category">Category</label>
            <select
              name="Category"
              className="block w-full mb-4 input"
              onChange={formhandler}
            >
              {categories.slice(1).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              className="btn bg-green-400 rounded-4xl hover:bg-green-900"
              onClick={addtoDB}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

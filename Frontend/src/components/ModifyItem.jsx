import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModifyItem({ categories, items, modifyItemList }) {
  const Itemid = useParams().id;
  const [formstate, setform] = useState({
    name: "",
    price: "",
    Category: 1,
  });
  const navigate = useNavigate();
  const Item = items.find((item) => Itemid == item.id);
  useEffect(() => {
    const newform = { ...formstate, ...Item };
    setform(newform);
    // console.log("effect");
    // console.log(Item);
  }, []);

  const formhandler = (e) => {
    const newform = { ...formstate, [e.target.name]: e.target.value };
    setform(newform);
  };

  const modifyDBItem = async (e) => {
    try {
      e.preventDefault();
      navigate("/admin");
      const res = await axios.put("http://localhost:3000/menu/" + Itemid, {
        ...formstate,
      });
      modifyItemList(formstate);
      const notify = () => {
        toast("✔ Product modified successfully");
      };
      notify();
    } catch {
      const notify = () => {
        toast.error("Failed to  modify!");
      };
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
              className="btn bg-blue-400 rounded-4xl hover:bg-blue-900"
              onClick={modifyDBItem}
            >
              save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

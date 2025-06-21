import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Admin({
  items,
  categories,
  loading,
  deleteItemList,
  DeleteError,
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

  const navigate = useNavigate();
  const addpg = () => {
    navigate("/productform");
  };
  const deleteItemDB = async (id) => {
    let olditms;
    try {
      olditms = deleteItemList(id);
      const notify = () => {
        toast("✔ Product is deleted successfully");
      };
      notify();
      const res = await axios.delete(
        `http://localhost:3000/menu/${id}?_delay=3000`
      );
    } catch {
      DeleteError(olditms);
      const notify = () => {
        toast("✘ Failed to delete product!");
      };
      notify();
    }
  };

  const modifypage = (id) => {
    navigate("/modify/" + id);
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <div className="grid grid-cols-10 gap-5 m-auto w-6xl">
        <div className="col-span-8 mt-8">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    {categories.find((cat) => item.Category === +cat.id).name}
                  </td>

                  <td
                    className="btn mt-3.5"
                    onClick={() => modifypage(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </td>
                  <td className="btn mt-3.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-500"
                      onClick={() => deleteItemDB(item.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 w-lg">
          <button
            className="btn bg-green-400 rounded-xl hover:bg-green-600"
            onClick={addpg}
          >
            Add new item
          </button>
        </div>
      </div>
    </>
  );
}

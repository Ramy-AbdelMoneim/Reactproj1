import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import About from "./components/About.jsx";
import Error from "./components/Error.jsx";
import Home from "./components/Home.jsx";
import axios from "axios";
import Admin from "./components/Admin.jsx";
import Productform from "./components/Productform.jsx";
import ModifyItem from "./components/ModifyItem.jsx";
import { toast } from "react-toastify";
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedcat, setSelectedcat] = useState(0);
  const [selectedpage, setSelectedpage] = useState(1);
  const [inputtext, setInputtext] = useState("");
  const [searchtext, setSearchtext] = useState("");

  const pageItemSize = 4;
  useEffect(() => {
    setLoad(true);
    const getdata = async () => {
      const cat = await axios.get("http://localhost:3000/Categories");
      const food = await axios.get("http://localhost:3000/menu?_delay=3000");
      setCategories(cat.data);
      setItems(food.data);
      setLoad(false);
    };

    getdata();
  }, []);

  //  Cart Handlers
  const addhandler = (id) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems[index] = { ...newItems[index] };
    newItems[index].count = newItems[index].count + 1;
    setItems(newItems);
  };
  const sum = () => {
    let sum = 0;
    items.map((item) => {
      sum += item.count;
    });
    return sum;
  };

  const minushandler = (id) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems[index] = { ...newItems[index] };
    if (newItems[index].count > 0) {
      newItems[index].count = newItems[index].count - 1;
    }
    setItems(newItems);
  };
  const deleteitem = (id) => {
    // const newItem=items.map((item)=>({...item,count:item.id===id ? item.count+=1 : item.count}));
    // the above is another way
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems.splice(index, 1);
    newItems.map((item) => ({ ...item }));
    setItems(newItems);
  };
  const resethandler = () => {
    const newItems = items.map((item) => ({ ...item, count: 0 }));
    setItems(newItems);
  };

  //Home handlers
  const addToCarthandler = (id) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    if (newItems[index].count === 0) {
      newItems[index] = { ...newItems[index], count: newItems[index].quantity };
      setItems(newItems);
      const notify = () => {
        toast("✔ Product(s) added to cart");
      };
      notify();
    } else {
      newItems[index] = { ...newItems[index], count: 0 };
      setItems(newItems);
      const notify = () => {
        toast("✘ Product(s) removed from cart");
      };
      notify();
    }
  };
  const quantityinc = (id) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    newItems[index] = {
      ...newItems[index],
      quantity: newItems[index].quantity + 1,
    };
    setItems(newItems);
  };
  const quantitydec = (id) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id === id);
    if (newItems[index].quantity > 1) {
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity - 1,
      };
    }
    setItems(newItems);
  };

  //Categories
  const handleselected = (id) => {
    if (id >= 0) {
      setSearchtext("");
    }
    setSelectedpage(1);
    setSelectedcat(id);
    setInputtext("");
  };
  //filter
  let filtereditems;
  if (searchtext) {
    filtereditems = items.filter((item) =>
      item.name.toLowerCase().includes(searchtext.toLowerCase())
    );
  } else if (selectedcat !== 0) {
    filtereditems = items.filter((item) => +item.Category === selectedcat);
  } else {
    filtereditems = items;
  }

  //Pagination
  const numberofpages = Math.ceil(filtereditems.length / pageItemSize);
  const pagehandler = (pagenum) => {
    setSelectedpage(pagenum);
  };
  const start = (selectedpage - 1) * pageItemSize;
  const end = start + pageItemSize;
  filtereditems = filtereditems.slice(start, end);

  //search
  const readtext = (text) => {
    setInputtext(text);
  };
  const search = () => {
    setSelectedpage(1);
    setSearchtext(inputtext);
  };

  //add item
  const addItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
  };

  //delete item
  const deleteItemList = (id) => {
    const olditms = [...items];
    const ItemIndex = items.findIndex((item) => item.id == id);
    const newItems = [...items];
    newItems.splice(ItemIndex, 1);
    setItems(newItems);
    return olditms;
  };
  const DeleteError = (olditems) => {
    setItems(olditems);
  };
  //modify item
  const modifyItemList = (item) => {
    const newItems = [...items];
    const index = newItems.findIndex((itm) => item.id === itm.id);
    // console.log(index);
    newItems[index] = { ...item };
    setItems(newItems);
  };
  return (
    <>
      <Navbar numberOfitms={sum()} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={filtereditems}
              addToCarthandler={addToCarthandler}
              quantityinc={quantityinc}
              quantitydec={quantitydec}
              loading={loading}
              categories={categories}
              selectedcat={selectedcat}
              handleselected={handleselected}
              numberofpages={numberofpages}
              selectedpage={selectedpage}
              pagehandler={pagehandler}
              readtext={readtext}
              search={search}
              inputtext={inputtext}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<Error />} />

        <Route
          path="/cart"
          element={
            <Cart
              items={items.filter((item) => item.count > 0)}
              addhandler={addhandler}
              resethandler={resethandler}
              minushandler={minushandler}
              deleteitem={deleteitem}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              items={items}
              categories={categories}
              loading={loading}
              deleteItemList={deleteItemList}
              DeleteError={DeleteError}
            />
          }
        />
        <Route
          path="/productform"
          element={
            <Productform
              categories={categories}
              loading={loading}
              addItem={addItem}
            />
          }
        />
        <Route
          path="/modify/:id"
          element={
            <ModifyItem
              categories={categories}
              items={items}
              modifyItemList={modifyItemList}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

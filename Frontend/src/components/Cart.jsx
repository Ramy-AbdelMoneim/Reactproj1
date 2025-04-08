import { useState } from 'react'
import Cartitem from './Cartitem'
function Cart(props) {
    const {items, addhandler, resethandler, minushandler, deleteitem}=props
    // console.log(items)
  return (
    <>
    {items.map((item)=>(
      <Cartitem 
      key={item.id}
      id={item.id}
      name={item.name}
      count={item.count}
      addhandler={addhandler}
      minushandler={minushandler}
      deleteitem={deleteitem}
      />
    ))

  }
    {items.length>0 && <button className='border-2 p-1 bg-gray-500' onClick={resethandler}>reset</button>}
    {items.length===0 && <div className="w-full flex flex-col items-center justify-center text-4xl font-bold relative top-10">
    Empty cart
    <div className="text-2xl mt-2 font-medium ">Add something!</div>
  </div>}
    </>
  )
}

export default Cart

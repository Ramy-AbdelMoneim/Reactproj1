import React from 'react'
import { useState } from 'react'
export default function Cartitem(props) {
    // const [count, setCount] = useState(0)
    return (
        <>
       {/* { console.log(props)} */}
            <div className='flex gap-2 p-1'>
                <div>
                    {props.name}
                </div>
                <button className='border-2 p-1 bg-red-300 text-center' onClick={()=>props.minushandler(props.id)}>-</button>
                <div>
                    {props.count}
                </div>
                <button className='border-2 p-1 bg-green-300' onClick={()=>props.addhandler(props.id)}>+</button>

                <button className='border-2 p-1 bg-red-500' onClick={()=>props.deleteitem(props.id)} >Delete</button>
                <div>
                </div>
            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react'
import { currencyFormatter } from '../utilities/currencyFormatter';
import { FaArrowLeftLong } from "react-icons/fa6";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1)
  };

  const handleDecrease = () => {
    setCount(prevCount => prevCount - 1)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) return <p className=" min-h-screen flex justify-center items-center">Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className='cart-section container mx-auto py-10'>
      <h2 className="section-title uppercase text-2xl font-bold space-font text-center mb-10">
        Your Cart
      </h2>
      <div className="cart-container">
          <div className="product-headlines grid grid-cols-5 gap-10 border-b pb-3 uppercase font-medium">
            <div className="col-product col-span-2">Product</div>
            <div className="col-unit-price">Unit Price</div>
            <div className="col-quantity">Quantity</div>
            <div className="col-total-price ml-auto">Total Price</div>
          </div>
         <div className="products flex flex-col">
          {
            data?.products?.slice(0, 3).map(product => (
              <div className="product grid grid-cols-5 gap-5 mt-6 border-b pb-3" key={product.id}>
                <div className="left flex items-center col-span-2 gap-5">
                  <img className='h-32 w-32 object-cover' src={product.thumbnail} alt={product.title} />
                  <div className="details flex flex-col gap-3 items-start">
                    <span>{product.title}</span>
                    <button className='uppercase text-gray-400 hover:text-rose-500 duration-300'>Remove</button>
                  </div>
                </div>
                <div className="unit-price">
                  {currencyFormatter(product.price)}
                </div>
                <div className="counter flex">
                  <button onClick={() => handleDecrease()} className='h-10 w-10 bg-gray-100 border border-gray-300 active:bg-gray-700 active:text-gray-50'>-</button>
                  <span className='h-10 w-10 bg-gray-100 border border-gray-300 flex justify-center items-center'>{count}</span>
                  <button onClick={() => handleIncrease()} className='h-10 w-10 bg-gray-100 border border-gray-300 active:bg-gray-700 active:text-gray-50'>+</button>
                </div>
                <div className="total-price ml-auto">
                  {currencyFormatter(product.price)}
                </div>
              </div>
            ))
          }
         </div>
      </div>
      <div className="cart-lower flex justify-between items-start py-10">
       <button className='clear-btn uppercase border px-8 py-3 tracking-wider hover:bg-rose-200 hover:text-rose-600 font-medium hover:border-rose-200 duration-300'>Clear cart</button>
       <div className='flex flex-col items-start gap-2'>
        <div className="top flex justify-between w-full text-2xl font-medium">
          <span className='text-sky-500'>Subtotal</span>
          <span className='text-rose-500'>$200</span>
        </div>
        <p className='text-gray-400'>Taxes and shipping costs are calculated at the checkout</p>
       <button className='checkout bg-sky-500 w-full py-3 uppercase font-medium text-sky-50 tracking-widest hover:bg-sky-600 duration-300'>Checkout</button>
       <button className='continue flex gap-3 items-center uppercase text-sky-500 font-medium tracking-widest'><FaArrowLeftLong />Continue</button>
       </div>
      </div>
    </div>
  )
}

export default Cart

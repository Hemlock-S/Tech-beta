// import React, { useEffect, useState } from 'react'
import { currencyFormatter } from "../utilities/currencyFormatter";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseCart, getSubtotal, removeFromCart } from "../features/products/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState([]);
  // const [count, setCount] = useState(1);

  // const handleIncrease = () => {
  //   setCount(prevCount => prevCount + 1)
  // };

  // const handleDecrease = () => {
  //   setCount(prevCount => prevCount - 1)
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("https://dummyjson.com/products");
  //       if (!res.ok) throw new Error("Something went wrong");
  //       const data = await res.json();
  //       setData(data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (loading) return <p className=" min-h-screen flex justify-center items-center">Loading...</p>;
  // if (error) return <p>{error.message}</p>;

  const { cartItems: data, cartTotalAmount: subtotal } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecrease = product => {
    dispatch(decreaseCart(product));
  };

  const handleIncrease = product => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(getSubtotal());
  }, [data, dispatch]);

  return (
    <div className="cart-section container mx-auto py-10">
      <h2 className="section-title uppercase text-2xl font-bold space-font text-center mb-10">
        {
          data.length > 0 ? `Your have added ${ data.length } item${ data.length > 1 ? 's' : "" }` : 'Your cart is empty' 
        }
      </h2>
      {
        data.length === 0 && <Link to={'/products'} className="flex mx-auto -mt-7 items-center justify-center h-10 w-64 rounded-xl uppercase text-sky-50 hover:bg-sky-600 font-medium tracking-widest bg-sky-500 cursor-pointer">Start shopping now</Link>
      }
      {data.length > 0 && (
        <>
          <div className="cart-container">
            <div className="product-headlines grid grid-cols-5 gap-10 border-b pb-3 uppercase font-medium">
              <div className="col-product col-span-2">Product</div>
              <div className="col-unit-price">Unit Price</div>
              <div className="col-quantity">Quantity</div>
              <div className="col-total-price ml-auto">Total Price</div>
            </div>
            <div className="products flex flex-col">
              {
                /* data?.products?.slice(0, 3) */
                data?.map((product) => (
                  <div
                    className="product grid grid-cols-5 gap-5 mt-6 border-b pb-3"
                    key={product.id}
                  >
                    <div className="left flex items-center col-span-2 gap-5">
                      <img
                        className="h-32 w-32 object-cover"
                        src={product.thumbnail}
                        alt={product.title}
                      />
                      <div className="details flex flex-col gap-3 items-start">
                        <span>{product.title}</span>
                        <button
                          onClick={() => handleRemove(product)}
                          className="uppercase text-gray-400 hover:text-rose-500 duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="unit-price">
                      {currencyFormatter(product.price)}
                    </div>
                    <div className="counter flex">
                      <button onClick={() => handleDecrease(product)} className="h-10 w-10 bg-gray-100 border border-gray-300 active:bg-gray-700 active:text-gray-50">
                        -
                      </button>
                      <span className="h-10 w-10 bg-gray-100 border border-gray-300 flex justify-center items-center">
                        {product.cartQuantity}
                      </span>
                      <button onClick={() => handleIncrease(product)} className="h-10 w-10 bg-gray-100 border border-gray-300 active:bg-gray-700 active:text-gray-50">
                        +
                      </button>
                    </div>
                    <div className="total-price ml-auto">
                      {currencyFormatter(product.price * product.cartQuantity)}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="cart-lower flex justify-between items-start py-10">
            <button
              onClick={() => dispatch(clearCart())}
              className="clear-btn uppercase border px-8 py-3 tracking-wider hover:bg-rose-200 hover:text-rose-600 font-medium hover:border-rose-200 duration-300"
            >
              Clear cart
            </button>
            <div className="flex flex-col items-start gap-2">
              <div className="top flex justify-between w-full text-2xl font-medium">
                <span className="text-sky-500">Subtotal</span>
                <span className="text-rose-500">{currencyFormatter(subtotal)}</span>
              </div>
              <p className="text-gray-400">
                Taxes and shipping costs are calculated at the checkout
              </p>
              <Link to='/' className="checkout text-center bg-sky-500 w-full py-3 uppercase font-medium text-sky-50 tracking-widest hover:bg-sky-600 duration-300">
                Checkout
              </Link>
              <Link to='/products' className="continue flex gap-3 items-center uppercase text-sky-400 hover:text-sky-500 font-medium tracking-widest">
                <FaArrowLeftLong />
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

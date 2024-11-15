import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../utilities/currencyFormatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/products/cartSlice";

const Card = ({ product }) => {
  
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const addToCartHandler = (product) => {
    dispatch(addToCart(product))
    navigate('/cart');
  }

  return (
    <div
      className="product flex flex-col gap-2 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl duration-300"
      key={product.id}
    >
      <div className="img h-[400px] w-full">
        <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover object-center"/>
      </div>
      <div className="texts flex flex-col gap-3 px-5 pb-5">
        <span className="category-tag uppercase text-[16px] font-semibold tracking-widest text-teal-500">
          {product.category}
        </span>
        <h3 className="title text-xl font-medium h-[3.5rem]">{product.title}</h3>
        <p className="details text-gray-600 h-[10.5rem]">{truncateText(product.description, 90)}</p>
        <div className="flex justify-between items-center">
          <span className="text-rose-500 font-semibold">{currencyFormatter(product.price)}
          </span>
          <button onClick={() => addToCartHandler(product)} className="uppercase bg-teal-600 shadow-md shadow-teal-200 text-violet-50 font-medium py-1 px-7 tracking-tight rounded-md  hover:bg-green-500 hover:text-green-50 hover:shadow-xl hover:shadow-violet-200 duration-300">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

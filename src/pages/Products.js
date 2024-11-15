// import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Products = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [data, setData] = useState([]);

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

  const {items: data, status} = useSelector((state) => state.products);

  // if (loading) return <p className=" min-h-screen flex justify-center items-center">Loading...</p>;
  // if (error) return <p>{error.message}</p>;

  return (
    <div className="products-section container mx-auto py-10 ">
      <h2 className="section-title uppercase text-2xl font-bold space-font text-center mb-10">
        Browse all products
      </h2>
      <div className="products-wrapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
      {
        status && <p className="min-h-screen col-span-full text-center">{status}</p>
      }
        {data?.products?.length > 0
          ? data.products.map((product) => (
              <Card key={product.id} product={product}/>
            ))
          :  !{status} && <p className="min-h-screen col-span-full text-center">No products available</p>} 
      </div>
    </div>
  );
};

export default Products;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { SelectedIdContext } from "../context/selectedIdContext";

const api = "http://localhost:3001";

const retriveProduct = async ({ queryKey }) => {
  const response = await axios.get(`${api}/${queryKey[0]}/${queryKey[1]}`);

  return response.data;
};

const ProductDetails = () => {
  const { selectedId: id } = useContext(SelectedIdContext);
  // use axios and react-query to fetch data from the API

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retriveProduct,
    enabled: id !== null,
  });

  if (id === null) return <div className="w-1/5 flex-1 text-start text-2xl font-bold"> No product selected </div>;

  if (isLoading) return <div> Fetching data ... </div>;

  if (error) return <div> An error has occured: {error?.message} </div>;

  return (
    <div className="w-1/5 flex-1">
      <h1 className="text-start text-2xl font-bold">Product Details</h1>

      {/* show product details here also useing tailwind css */}
      <div className="p-5">
        <div className="flex justify-between items-center border p-2 shadow-lg rounded-md overflow-hidden max-w-sm border-gray-200 py-4">
          <div className="flex items-center">
            <img src={product?.thumbnail} alt={product?.title} className="w-24 h-24 object-cover" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{product?.title}</h2>
              <p className="text-sm text-gray-500">{product?.description}</p>
              <p className="text-sm text-gray-500">Price: ${product?.price}</p>
              <p className="text-sm text-gray-500">Rating: {product?.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

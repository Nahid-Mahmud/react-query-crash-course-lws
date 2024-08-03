import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { SelectedIdContext } from "../context/selectedIdContext";

const api = "http://localhost:3001";

const retriveProducts = async ({ queryKey }) => {
  const response = await axios.get(`${api}/${queryKey[0]}?_page=${queryKey[1]?.page}&_per_page=5`);

  return response?.data;
};

const ProductList = () => {
  // state for pagination
  const [page, setPage] = useState(1);

  // use axios and react-query to fetch data from the API

  const { selectedId, setSelectedId } = useContext(SelectedIdContext);

  const {
    data: products,
    error,
    isLoading,
    refetch,
    isStale,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retriveProducts,
    // refetch interval

    refetchInterval: 1000 * 30,
  });

  if (isLoading) return <div> Fetching data ... </div>;

  if (error) return <div> An error has occured: {error?.message} </div>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Products List </h1>

      {/* show product cart here also useing tailwind css */}

      <div className=" grid grid-cols-2 p-5 gap-5 ">
        {products?.data?.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedId(product?.id)}
            className={`flex col-span-1 justify-between items-center border max-w-sm border-gray-200 py-4 cursor-pointer ${
              selectedId === product.id ? "bg-gray-200" : ""
            }`}
          >
            <div className="flex items-center p-2">
              <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
              </div>
            </div>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button> */}
          </div>
        ))}
      </div>

      {/* buttons for pagination */}

      <div className="flex justify-center space-x-2">
        {products?.prev && (
          <button
            onClick={() => setPage(products?.prev)}
            disabled={page === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
        )}
        {products?.next && (
          <button
            onClick={() => setPage(products?.next)}
            disabled={products?.length < 5}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;

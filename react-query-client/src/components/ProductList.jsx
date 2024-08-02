import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = "http://localhost:3001/products";

const ProductList = () => {
  // use axios and react-query to fetch data from the API

  const retriveProducts = async () => {
    const response = await axios.get(api);
    return response.data;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retriveProducts,
  });

  //   console.log(products);

  //   {
  //     "id": "1",
  //     "title": "iPhone 9",
  //     "description": "An apple mobile which is nothing like apple",
  //     "price": 549,
  //     "rating": 4.69,
  //     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
  // }

  if (isLoading) return <div> Fetching data ... </div>;

  if (error) return <div> An error has occured: {error?.message} </div>;

  return (
    <div>
      <h1>Products</h1>

      {/* show product cart here also useing tailwind css */}

      <div className="grid grid-cols-3 max-w-[95vw] mx-auto gap-5">
        {products?.map((product) => (
          <div
            key={product.id}
            className="flex col-span-1 justify-between items-center border-b max-w-sm border-gray-200 py-4"
          >
            <div className="flex items-center">
              <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </div>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

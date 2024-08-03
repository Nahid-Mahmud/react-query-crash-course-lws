import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { SelectedIdContext } from "../context/selectedIdContext";

const api = "http://localhost:3001";

const AddProduct = () => {
  const { setSelectedId } = useContext(SelectedIdContext);

  const queryClient = useQueryClient();

  // state for the form inputs

  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "https://random.imagecdn.app/500/150",
  });

  //   posting data usnig axios and react-query

  const mutation = useMutation({
    mutationFn: async (newProduct) => await axios.post(`${api}/products`, newProduct),
    // invalid queries after successfully posting data
    onSuccess: (data, variables, context) => {
      console.log(context);
      queryClient?.invalidateQueries(["products"]);
    },

    onMutate: (variables) => {
      return { grettings: "Hello" };
    },
  });

  //   handle submit function

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...formInput,
      id: crypto.randomUUID().toString(),
    };

    try {
      mutation?.mutate(newData);
    } catch (error) {
      //
      console.log(error);
    } finally {
      setSelectedId(newData.id);
    }
  };

  if (mutation.isLoading) return <div>Adding product...</div>;
  if (mutation.isError) return <div>An error has occured: {mutation.error.message}</div>;

  return (
    <div className="w-1/5 flex-1">
      <h1 className="text-center text-2xl font-bold">Add Product</h1>
      {/* add product form with tailwind */}
      <form className="p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700 font-semibold">Title</span>
            <input
              value={formInput.title}
              onChange={(e) => setFormInput({ ...formInput, title: e.target.value })}
              type="text"
              name="title"
              id="title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Description</span>
            <input
              value={formInput.description}
              onChange={(e) => setFormInput({ ...formInput, description: e.target.value })}
              type="text"
              name="description"
              id="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Price</span>
            <input
              value={formInput.price}
              onChange={(e) => setFormInput({ ...formInput, price: e.target.value })}
              type="number"
              name="price"
              id="price"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Rating</span>
            <input
              value={formInput.rating}
              onChange={(e) => setFormInput({ ...formInput, rating: e.target.value })}
              type="number"
              name="rating"
              id="rating"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Thumbnail</span>
            <input
              value={formInput.thumbnail}
              onChange={(e) => setFormInput({ ...formInput, thumbnail: e.target.value })}
              type="text"
              name="thumbnail"
              id="thumbnail"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

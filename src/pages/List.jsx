import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("products");
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      setLoading(true);
      const endpoint = viewType === "products" ? "product/list" : "ads/list";
      const response = await axios.get(`${backendUrl}/api/${endpoint}`, {
        headers: { token },
      });

      console.log("API Response:", response.data); // Debugging response

      if (response.data.success) {
        setList(response.data.products || response.data.ads || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const endpoint = viewType === "products" ? "product/remove" : "ads/remove"; // Correct endpoint for ads
      console.log(`Deleting ${viewType === 'products' ? 'product' : 'ad'} with ID:`, id); // Debugging
      const response = await axios.post(`${backendUrl}/api/${endpoint}`, { id });
      
      console.log("API response after deletion:", response.data); // Debugging response
  
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in deleteProduct:", error.response || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  
  

  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  useEffect(() => {
    console.log("Fetching data for viewType:", viewType); // Debugging viewType changes
    fetchList();
  }, [viewType]);

  return (
    <>
      <div className="mb-4">
        <button
          onClick={() => setViewType("products")}
          className={`bg-gray-300 border-2 py-1 px-3 rounded-md hover:bg-gray-400 ${
            viewType === "products" ? "bg-gray-400 font-bold" : ""
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setViewType("ads")}
          className={`bg-gray-300 border-2 py-1 px-3 rounded-md hover:bg-gray-400 ml-2 ${
            viewType === "ads" ? "bg-gray-400 font-bold" : ""
          }`}
        >
          Ads
        </button>
      </div>
      <p className="mb-2">{viewType === "products" ? "All Products" : "Ads"}</p>
      {loading ? (
        <p>Loading...</p>
      ) : list.length === 0 ? (
        <p>No {viewType === "products" ? "products" : "ads"} available.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {viewType === "products" ? (
            <>
              <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                <b>Image</b> <b>Name</b> <b>Category</b> <b>Price</b> <b>Action</b>
              </div>
              {list.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-1 px-2 border"
                >
                  <img
                    src={item.image?.[0] || "default-image.jpg"}
                    alt={item.name || "Product"}
                    className="w-16 h-16 object-cover"
                  />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500"
                      onClick={() => editProduct(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => deleteProduct(item._id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            list.map((ads) => (
              <div
                key={ads._id}
                className="flex flex-col items-center py-1 px-2 border"
              >
                <img
                  src={ads.image || ads.ads || "default-ad.jpg"}
                  alt="Ad"
                  className="w-16 h-16 object-cover"
                />
                <p>{ads.title || "Ad Title"}</p>
                <button onClick={() => deleteProduct(ads._id)}>remove</button>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default List;

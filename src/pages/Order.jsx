import { useEffect, useState } from "react";
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from "../assets/assets";


const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const status = event.target.value;
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setOrders((prevOrders) => 
          prevOrders.map((order) => 
            order._id === orderId ? { ...order, status } : order
          )
        );
        toast.success("Order status updated successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-4">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-300 bg-white p-4 rounded-lg shadow-md" key={index}>
            <img className="w-full h-auto rounded" src={assets.parcel_icon} alt="" />
            <div>
              {order.items.map((item, index) => (
                <p key={index} className="text-gray-800">{item.name} x {item.quantity} <span className="text-gray-500">{item.size}</span></p>
              ))}
              <p className="text-gray-700 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
            </div>
            <div className="text-gray-600">
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p className="text-gray-600">{order.address.phone}, {order.address.alternate}</p>
            </div>
            <div className="text-gray-600">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Method: {order.status}</p>
              <p>Payment: {order.payment ? "Done" : "failed"}</p>
              <p>Date: {new Date(order.date).toDateString()}</p>
            </div>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="border rounded p-2 text-gray-600">
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;

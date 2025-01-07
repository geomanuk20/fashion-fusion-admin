import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { backendUrl } from "../App";
import { assets } from "../assets/assets";

// eslint-disable-next-line react/prop-types
const Ads = ({ token }) => {
  const [ads, setAds] = useState(null); // Initial state should be null

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      ads && formData.append("ads", ads);

      const response = await axios.post(`${backendUrl}/api/ads/add`, formData, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setAds(null); // Reset state to null
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload</p>
        <div>
          <label htmlFor="ads">
            <img className="w-20" src={!ads ? assets.upload_area : URL.createObjectURL(ads)} alt="" />
            <input onChange={(e) => setAds(e.target.files[0])} type="file" id="ads" hidden />
          </label>
        </div>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
    </form>
  );
};

export default Ads;

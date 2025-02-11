import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"


const Sidebar = () => {
  return (
    <div className="w-[16%] min-h-screen border-r-2">
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
                <img className="w-5 h-5" src={assets.add_icon} alt="" />
                <p className="hidden md:block">Add Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
                <img className="w-5 h-5" src={assets.order_icon} alt="" />
                <p className="hidden md:block">List Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders ">
            <img width="20" height="20" src="https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/30/external-list-multimedia-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png" alt="external-list-multimedia-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto"/>
                <p className="hidden md:block">Orders </p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/ads ">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/web-advertising.png" alt="web-advertising"/>
                <p className="hidden md:block">Ads</p>
            </NavLink>
            
        </div>
    </div>
  )
}

export default Sidebar
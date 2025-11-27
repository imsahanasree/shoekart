import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export function MainPage(){
  const navigate = useNavigate();  

    return (
          <div className="outercontainer">
            <div className="navbar">
              <Link to="/admin/all-cust" className="butstyle">View Customers</Link>
              <Link to="/admin/all-orders" className="butstyle">View Orders</Link>
              <Link to="/admin/add-item" className="butstyle">Add Item</Link>
              <Link to="/admin/upd-item" className="butstyle">Update Item</Link>
              <Link to="/admin/del-item" className="butstyle">Delete Item</Link>
              <Link to="/admin/show-pop" className="butstyle">Popular Items</Link>
            </div>
            <div className="display">
                <Outlet/>
            </div>
          </div>
      );
}

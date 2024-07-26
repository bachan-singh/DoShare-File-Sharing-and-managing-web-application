import React, { useState } from 'react'
import './Manager.css'

import { IoIosCloudOutline } from "react-icons/io";
import { VscNewFile } from "react-icons/vsc";


import AddressBar from '../../Components/AddressBar';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const AccountManager = () => {
    
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);
  
const menuItems = [
  { id: 1, name : "Update Password", icon: <VscNewFile />, content: <UpdatePassword />},
  { id: 2, name: 'Delete Account', icon: <IoIosCloudOutline />, content: <DeleteAccount />},
];
const handleMenuItemClick = (id:number) => {
  setSelectedMenuItem(id);
};
  return (
    <div className="manager">
    <div className="manager-navigation">
        <ul>
        { 
            menuItems.map((item, key) => (
            <li key={key} onClick={() => handleMenuItemClick(item.id)}>
                <span>{item.icon}</span> 
                <p>{item.name}</p>
            </li>
            ))
        }
        </ul>
    </div>
    <div className="manager-content">
    {selectedMenuItem && (
       <>
         <AddressBar page={menuItems[selectedMenuItem - 1].name}/>
       <div>{menuItems[selectedMenuItem - 1].content}</div>
     </>
    )}
    </div>
</div>
  )
}

export default AccountManager
import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import AddressBar from '../../Components/AddressBar';
import './UserDetails.css';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const UserDetails: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/all-users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data: UserInfo[] = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-user/${id}`, {
        method: 'DELETE'});

      if (response.ok) {
        alert('Account deleted successfully');
        setUserInfo(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete account');
    }
  };

  return (
    <div className='user-list'>
      <AddressBar page="User Activity"/>
      <h2>User Activity</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.map((user: UserInfo, index: number) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button title="Delete User" onClick={() => handleDeleteUser(user._id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;

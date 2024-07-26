import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import AddressBar from '../../Components/AddressBar';
import { FaUsers } from "react-icons/fa";
import { SiFiles } from "react-icons/si";
import { MdFeedback } from "react-icons/md";
import Feedback from './Feedback';
import { IconType } from 'react-icons/lib';

interface Information {
  id: number;
  content: string;
  icon: IconType;
  count: number;
  type: string;
}

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/total-users');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch total users');
        }
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.totalUsers);

        const filesResponse = await fetch('http://localhost:5000/total-files');
        if (!filesResponse.ok) {
          throw new Error('Failed to fetch total files');
        }
        const filesData = await filesResponse.json();
        setTotalFiles(filesData.totalFiles);

        const feedbacksResponse = await fetch('http://localhost:5000/total-feedbacks');
        if (!feedbacksResponse.ok) {
          throw new Error('Failed to fetch total feedbacks');
        }
        const feedbacksData = await feedbacksResponse.json();
        setTotalFeedbacks(feedbacksData.totalFeedbacks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const information: Information[] = [
    { id: 1, content: 'Users', icon: FaUsers, count: totalUsers, type: " Users"},
    { id: 2, content: 'Files', icon: SiFiles, count: totalFiles, type: " Files"},
    { id: 3, content: 'Feedback', icon: MdFeedback, count: totalFeedbacks, type: " Feedbacks"},
  ];

  return (
    <div className='admin-home'>
      <AddressBar page="Home" />
      <div className="data-category">
        <ul className="category">
          {information.map((info) => (
            <li key={info.id}>
              <span><info.icon /></span>
              <div>
                <h3>{info.content}</h3>
                <p>{info.count} {info.type}</p>
              </div>
            </li>
          ))}
        </ul>
        <Feedback />
      </div>
    </div>
  );
};

export default Dashboard;

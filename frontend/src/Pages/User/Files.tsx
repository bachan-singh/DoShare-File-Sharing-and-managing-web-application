import React, { useEffect, useState } from 'react';
import AddressBar from '../../Components/AddressBar';
import './Files.css';
import { FaRegFilePdf, FaRegFileWord, FaRegFileAlt } from "react-icons/fa";
import { MdOutlineInsertPhoto } from "react-icons/md";
import RecentFiles from './RecentFiles';
interface File {
  name: string;
  file_type: string;
}

interface FileCategory {
  name: string;
  icon: JSX.Element; // Assuming icon is a JSX.Element
  count: number; // Total count for the category
  bgColor: string; // Background color for the category
}
interface UserData {
  _id: string;
  // Add other fields if needed
}
const Files = () => {
  const [userFiles, setUserFiles] = useState<File[]>([]);
  const userDataString: any = localStorage.getItem('user');
  const userData: UserData = JSON.parse(userDataString);
  const userId = userData._id;
  useEffect(() => {

    getUserFiles(userId);
  }, []);

  const getUserFiles = async (userId: any) => {
    try {const user = localStorage.getItem('user');
    if (!user) {
        throw new Error('User data not found in local storage');
    }
    const userInfo: { _id: string } = JSON.parse(user);
    const userId = userInfo._id;

    const result = await fetch(`http://localhost:5000/files/${userId}`);
      let data: File[] = await result.json();
      setUserFiles(data);
    } catch (error) {
      console.error("Error fetching user files:", error);
    }
  };

  const getCount = (fileType: string) => {
    return userFiles.length > 0 ? userFiles.filter(file => file.file_type === fileType).length : 0;
  };

  const filesCategory: FileCategory[] = [
    { name: 'All Files', icon: <FaRegFileAlt />, count: userFiles.length, bgColor: '#6a3e94' },
    { name: 'PDFs', icon: <FaRegFilePdf />, count: getCount('application/pdf'), bgColor: '#c4200e' },
    { name: 'Word Files', icon: <FaRegFileWord />, count: getCount('application/vnd.openxmlformats-officedocument.wordprocessingml.document'), bgColor: '#448cd4' },
    { name: 'Images', icon: <MdOutlineInsertPhoto />, count: getCount('image/png'), bgColor: '#5fd417' },
  ];
  return (
    <div className="files">
      <AddressBar page="Files" />

      <div className="files-category">
        {filesCategory.map((item, index) => (
          <div className="category" key={index}>
            <div className="icon" style={{ backgroundColor: item.bgColor }}>
              {item.icon}
            </div>
            <div className="type">
              <h3>{item.name}</h3>
              <p>{item.count} files</p>
            </div>
          </div>
        ))}
      </div>
      <RecentFiles />
    </div>
  )
}

export default Files
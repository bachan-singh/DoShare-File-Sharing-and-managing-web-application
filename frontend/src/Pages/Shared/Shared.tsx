import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Shared.css';
import Viewer from './Viewer';

interface Data {
  name: string;
  file: string;
  file_type: string;
}


const Shared: React.FC = () => {
  const { id } = useParams<string>();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:5000/share/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      const result: Data = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    }
  };

  const handlePrint = () => {
    if (data) {
      const fileUrl = `http://localhost:5000/Uploads/${data.file}#toolbar=0`;
      const newWindow = window.open(fileUrl);
      
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print();
        };
      } else {
        console.error('Failed to open file for printing');
      }
    }
  };

  return (
    <div className='shared'>
      <div className="shared-file-info">
        <p>Filename : {data?.name}</p>
        {data && (
          <button onClick={handlePrint}>Print File</button>
        )}
      </div> 
      <div className="share-container">
        {data ? (
          <Viewer file_type={data.file_type} file={`http://localhost:5000/Uploads/${data.file}`} title={data.name} />
        ) : (
          <p>Loading file...</p>
        )}
      </div>
    </div>
  );
};

export default Shared;

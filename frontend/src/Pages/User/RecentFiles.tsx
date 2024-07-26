import React, { useEffect, useState } from 'react';
import { FaRegFilePdf, FaRegFileWord } from "react-icons/fa";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { Link } from 'react-router-dom';
import './RecentFiles.css'
import { BiShareAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsFileEarmarkPpt } from "react-icons/bs";

interface File {
    _id: string;
    name: string;
    file_type: string;
    size: number;
    file: string;
}

const RecentFiles: React.FC = () => {
    const [sharedFileId, setSharedFileId] = useState<string>('');
    const [shareFileName, setShareFileName] = useState<string>('');

    const [userFiles, setUserFiles] = useState<File[]>([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const user = localStorage.getItem('user');
            if (!user) {
                throw new Error('User data not found in local storage');
            }
            const userInfo: { _id: string } = JSON.parse(user);
            const userId = userInfo._id;

            const response = await fetch(`http://localhost:5000/files/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data: File[] = await response.json();
            setUserFiles(data);
        } catch (error) {
            console.error('Error fetching user files:', error);
        }
    };


    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case 'application/pdf':
                return <FaRegFilePdf />;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FaRegFileWord />;
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    return <BsFileEarmarkPpt />;
            default:
                return <MdOutlineInsertPhoto />;
        }
    };

    const getFileBackgroundColor = (fileType: string) => {
        switch (fileType) {
            case 'application/pdf':
                return '#c4200e';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return '#448cd4';
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    return '#FF8E1E';
            default:
                return '#5fd417';
        }
    };

    const formatFileSize = (size: number) => {
        if (size < 2 * 1024 * 1024) { // Less than 2 MB
            return `${(size / 1024).toFixed(2)} KB`;
        } else {
            return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        }
    };
    const deleteFile = async (fileId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/delete/${fileId}`, {
                method: 'delete'
            });
            if (!response.ok) {
                throw new Error('Failed to delete file');
            }
            // Process the response here (e.g., download the file)
            alert("File Deleted Successfully");
            setUserFiles((prevFile) => prevFile.filter((file) => file._id !== fileId))
        } catch (error) {
            console.error('Error deleting file:', error); // Log the error for debugging
            alert('Failed to delete file. Please try again.'); // Show a user-friendly message
        }
    };


    const downloadFile = async (filename: string) => {
        try {
            const response = await fetch(`http://localhost:5000/download/${filename}`);
            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const shareFile = async (fileId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/share/${fileId}`);
            const data = await response.json();
            setSharedFileId(data._id);
            setShareFileName(data.name);
        } catch (error) {
            console.error('Error sharing file:', error);
        }
    }

    const link = `http://localhost:3000/shared/${sharedFileId}`;

    const handleCopy = () => {
        alert("Link Copied");
    }
    return (
        <div className='recent'>
            {sharedFileId && (
                <div className="share-file">
                    <div className="title">Link Generated for <strong>{shareFileName}</strong> &nbsp;
                        <CopyToClipboard text={link}>
                            <button onClick={handleCopy}>copy</button>
                        </CopyToClipboard>
                    </div>
                </div>
            )
            }
            <h2>Files</h2>
            <div className="all-files">
                {userFiles.length > 0 ? userFiles.map((item: File, index: number) => (
                    <div className="file" key={index}>
                        <div className="fileicon" style={{ backgroundColor: getFileBackgroundColor(item.file_type) }}>
                            
                            <div className="icon">{getFileIcon(item.file_type)}</div>
                        </div>
                        <div className="file-info"> <h3>{item.name} </h3> &nbsp; <span>({formatFileSize(item.size)})</span>
                        </div>
                        <div className="file-operation">
                            <Link to={`/rename-file/${item._id}`} title="rename">
                                <TbEdit />
                            </Link>

                            <button title="download" onClick={() => downloadFile(item.file)}><IoMdDownload /></button>
                            <button title="share" onClick={() => shareFile(item._id)}><BiShareAlt /></button>
                            <button title="delete" onClick={() => deleteFile(item._id)}><RiDeleteBin6Line /></button>
                        </div>
                    </div>)) : <p>Add New File <Link to="/add-file">Click Here</Link></p>}
            </div>
        </div>
    );
};

export default RecentFiles;

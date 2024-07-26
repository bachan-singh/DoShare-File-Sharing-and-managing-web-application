import React from 'react';
import './Shared.css';

interface ViewerProps {
  file: string;
  file_type: string;
  title: string;
}

const Viewer: React.FC<ViewerProps> = ({ file, file_type, title }) => {
  if (!file) {
    return null;
  }

  const isImageFile = (file: string): boolean => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif']; // Add more extensions as needed
    return imageExtensions.some((ext) => file.toLowerCase().endsWith(ext));
  };

  const renderFileContent = () => {
    if (file.endsWith('.pdf')) {
      return <embed src={file + '#toolbar=0'} type={file_type} />;
    } else if (file.endsWith('.docx') || file.endsWith('.doc')) {
      return <iframe src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(file)}`} width="100%" height="600px" title={title}/>;
    } else if (file.endsWith('.pptx') || file.endsWith('.ppt')) {
      return <iframe src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(file)}`} title={title} width="100%" height="600px" />;
    } else if (isImageFile(file)) {
      return <img src={file} alt={title} />;
    } else {
      return <div>{`File type (${file_type}) not supported`}</div>;
    }
  };

  return (
    <div className="embed">
      {renderFileContent()}
    </div>
  );
};

export default Viewer;

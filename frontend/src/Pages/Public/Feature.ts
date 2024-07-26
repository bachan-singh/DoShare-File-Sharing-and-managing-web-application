import { IconType } from 'react-icons/lib';
import { MdOutlineFileUpload } from 'react-icons/md';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { MdMobileFriendly } from 'react-icons/md';
import { LuFileCode2 } from 'react-icons/lu';
import { CiLock } from 'react-icons/ci';
import { LuFileSignature } from 'react-icons/lu';

interface Feature {
  id: number;
  icon: IconType; // Use IconType as the type for the icon property
  heading: string;
  content: string;
}

const features: Feature[] = [
  { 
    id: 1, 
    icon: MdOutlineFileUpload, // Note: Don't use JSX syntax here
    heading: "instant sharing", 
    content: "Experience instant file sharing with our project, facilitating seamless transmission of various file formats. Enjoy effortless collaboration with support for diverse file types, enhancing productivity across the board."
  },
  { 
    id: 2, 
    icon: AiOutlineFileProtect, 
    heading: "secure environment", 
    content: "Secure your interactions with our project, offering services within a protected environment. Enjoy our platform ensures confidentiality and integrity throughout your experience. With robust security measures in place, your data remains safeguarded against unauthorized access."
  },
  { 
    id: 3, 
    icon: MdMobileFriendly, 
    heading: "user friendly interface", 
    content: "Enjoy effortless interactions as you explore our platform's straightforward features and controls. Discover convenience at your fingertips with our project's accessible design."
  },
  { 
    id: 4, 
    icon: LuFileCode2, 
    heading: "flexible file support", 
    content: "We provide support for various formats. Whether it's documents, images, videos, or more, our platform adapts to your needs. With flexible file support, our project accommodates your every requirement with ease."
  },
  { 
    id: 5, 
    icon: CiLock, 
    heading: "limited accessibility", 
    content: "Only authorized individuals can access your sensitive data. With strict limitations in place, your privacy remains intact, ensuring confidentiality at all times. Trust in our commitment to safeguard your personal information within our secure environment."
  },
  { 
    id: 6, 
    icon: LuFileSignature, 
    heading: "file management", 
    content: "Simplify your file management tasks with our project's seamless handling of large volumes of data. Enjoy streamlined workflows as our platform empowers you to efficiently categorize, search, and access your documents."
  },
];

export default features;

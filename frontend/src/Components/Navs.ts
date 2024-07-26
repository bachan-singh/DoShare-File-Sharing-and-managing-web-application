import Home from '../Pages/Public/Home';
import Features from '../Pages/Public/Features';
import Contact from '../Pages/Public/Contact';
import Process from '../Pages/Public/Process';
import Files from '../Pages/User/Files';
import AccountManager from '../Pages/User/AccountManager';
import Dashboard from '../Pages/Admin/Dashboard';
import UserDetails from '../Pages/Admin/UserDetails';
import Login from './Login';
import Register from './Register';
import UploadFile from '../Pages/User/UploadFile';
import RenameFile from '../Pages/User/RenameFile';
import MailReply from '../Pages/Admin/MailReply';

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/features', component: Features },
  { path: '/contact', component: Process },
  { path: '/process', component: Contact },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export const userRoutes = [
  { path: '/', component: Files },
  { path: '/add-file', component: UploadFile },
  { path: '/rename-file/:id', component: RenameFile },
  { path: '/account', component: AccountManager },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export const adminRoutes = [
  { path: '/', component: Dashboard },
  { path: '/user-details', component: UserDetails },
  { path: '/feedback-reply/:id', component: MailReply },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

# Project Title: DoSecure File Sharing and Managing Solution

## Overview

This project is designed to provide a secure solution for sharing and printing user files such as images, Word documents, PowerPoint presentations, PDFs, etc. The primary use case is to address the risk of misuse of files when printing at print shops. Typically, after printing, files remain on the print shop’s devices, posing a risk of unauthorized access and misuse. This solution enables users to share files via unique links that allow printing but prevent downloading, ensuring the security and privacy of the files.

## Features

1. **File Upload and Sharing**:
    - Users can upload various types of files (images, Word, PPT, PDF, etc.).
    - Each file is assigned a unique link for sharing.
    - The shared link allows the recipient to print the file but not download it.

2. **Role-Based Authentication**:
    - **User**: Can upload and share files.
    - **Admin**: Manages users and has access to additional administrative functionalities.

3. **Secure Printing**:
    - Files can be printed directly from the link without the option to download.
    - Ensures files are not stored on the print shop’s devices after printing.

4. **React Libraries and RESTful APIs**:
    - Utilizes various React libraries for a seamless user experience.
    - Implements RESTful APIs for efficient communication between the frontend and backend.

5. **Backend Structure**:
    - Follows the Model-Controller-Service pattern for better code management and utilization.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Role-based
- **File Storage**: Locally

## Screenshots

### Home Page
![Home Page]([link-to-image](https://drive.google.com/file/d/1NBNheo3yLigRjALQA_aO1ig5nsFmwd7O/view?usp=sharing))

### User Dashboard
![User Dashboard]([link-to-image](https://drive.google.com/file/d/1bYcazYRFyEs7Tt0T6CnkLC4s5FHixUPN/view?usp=sharing))

### Sign Up Page
![Sign Up Page]([link-to-image](https://drive.google.com/file/d/1pluvhbyQ5CNYDasg60rs9uxNKkLNYQVb/view?usp=sharing))

### Admin Dashboard
![Admin Dashboard]([link-to-image](https://drive.google.com/file/d/1Fc3vOxX4GlHYkYaYhKqZH4qt6Unegw02/view?usp=sharing))

## Installation and Setup

### Prerequisites

- Node.js (version 14.x or above)
- MongoDB (version 4.x or above)
- React (version 17 or higher)

### Steps to Run the Application

1. **Clone the repository**:
    ```bash
    git clone https://github.com/bachankapoor/DoShare-File-Sharing-and-managing-web-application.git
    cd DoShare-File-Sharing-and-managing-web-application
    ```

2. **Install dependencies for both frontend and backend**:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Run the backend server**:
    ```bash
    cd backend
    node index.js
    ```

4. **Run the frontend application**:
    ```bash
    cd ../frontend
    npm start
    ```

5. **Access the application**:
    - Open your browser and go to `http://localhost:3000`

## Backend Structure

### Models
- **User**: Represents the user data.
- **File**: Represents the file data, including metadata and the unique link.

### Controllers
- **AuthController**: Handles authentication and authorization.
- **FileController**: Manages file uploads, sharing, and access.

### Services
- **AuthService**: Implements the business logic for authentication.
- **FileService**: Implements the business logic for file handling.

### Routes
- **AuthRoutes**: Routes for authentication endpoints.
- **FileRoutes**: Routes for file-related endpoints.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, feel free to contact me at:
- Email: bachansingh1407@gmail.com
- GitHub: [bachankapoor](https://github.com/bachankapoo)

---

Thank you for using our secure file sharing and printing solution! We hope it meets all your needs for secure file management and printing.
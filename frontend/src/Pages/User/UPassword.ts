const UPassword = async (email: string, currentPassword: string, newPassword: string): Promise<{ success: boolean }> => {
    try {
      const response = await fetch('http://localhost:5000/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update password');
      }
  
      const data = await response.json();
      return data; // Assuming the backend returns { success: true } upon successful password update
    } catch (error) {
      throw error;
    }
  };
  
  export default UPassword;

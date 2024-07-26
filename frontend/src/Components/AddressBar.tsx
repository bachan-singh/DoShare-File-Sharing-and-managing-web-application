import React from 'react'

interface AddressBarProps {
    page: string; // Specify the type of the 'page' prop
  }
  
  const AddressBar: React.FC<AddressBarProps> = (props) => {
  return (
    <p>Dashboard / {props.page}</p>
  )
}

export default AddressBar
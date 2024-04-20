import React from 'react';
import { MdOutlineBathroom } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";


const HouseCard = ({ image, rooms, bathrooms, address, state, city }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <img src={image} alt="Imagen de ejemplo" className="w-full h-32 object-cover mb-4" />
      <div className="flex justify-between items-center">
        <p className='flex flex-row items-center gap-3'>
          <MdOutlineBathroom /><span className="text-white">{bathrooms}</span>
        </p>
        <p className='flex flex-row items-center gap-3'>
          <MdOutlineBedroomParent /><span className='text-white'>{rooms}</span>
        </p>
      </div>
      <p className="text-white mb-2">{ }</p>


      
      <div className="flex justify-between items-center">
        <div>
        <FaMapMarkerAlt /> <span className="text-white">{address}</span>
        </div>
      </div>
    </div>
  );
}

export default HouseCard;

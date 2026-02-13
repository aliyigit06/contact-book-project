import React from 'react'
import { RiEdit2Fill } from "react-icons/ri";
import { LiaTrashAlt } from "react-icons/lia";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Card = ({item, handleDelete, handleUpdate}) => {
  return (
    <div className='card'>
         {/* Buttons */}
         <div className="buttons">
            <button onClick={() => handleUpdate(item)}>  <RiEdit2Fill /></button>
            <button onClick={() => handleDelete(item.id)}>  <LiaTrashAlt /></button>
         </div>
           {/* Details */}
           <h1> {item.name[0]} {item.surname[0]}</h1>
            <h3><span>{item.name} </span>{item.surname}</h3>
           <p>{item.position}</p>
           <p>{item.company}</p>
           {/* Bottom */}
      <div className="bottom">
        {/* Phone */}
        <div>
          <span>
            <FaPhone />
          </span>
          <span>{item.phone}</span>
        </div>
        {/* Email */}
        <div>
          <span>
            <IoMdMail />
          </span>
           <span>{item.email}</span>
        </div>
      </div>
      
    </div>
  )
}

export default Card

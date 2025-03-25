import React from 'react'
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import icon from '../assets/Vector (5).svg'

function TopBar({ text }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  return (
    <div onClick={goBack} className="flex items-center w-full">
      {/* <HiChevronLeft className="text-lg mr-2" /> */}
      <img src={icon} alt="" />
      <span className="flex-1 text-[24px] text-center font-semibold text-black pr-6">{text}</span>
    </div>
  )
}

export default TopBar

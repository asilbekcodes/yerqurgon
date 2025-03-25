import React from 'react'
import TopBar from '../user/components/TopBar'
import img from "./assets/Frame 427321904.png"
import icon from "./assets/Vector (9).svg";
import Card from './components/Card';
import Footer from '../user/components/Footer';
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import home from "../user/assets/Vector (3).svg";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function MijozDetails() {
  return (
    <div className='p-3'>
        <TopBar text={"11 - Do'kon"} />
        <header className='my-4 flex items-center gap-3'>
            <img src={icon} alt="" />
            <p className='m-0'>Qashqadaryo - Qarshi</p>
        </header>
        <main className='flex flex-col gap-4'>
            <Card img={img} title={"1 Sort Qarshi "} location={"Narxi: 200 000 so'm"} soni={<><span className='text-gray-500'>Soni:</span> <span className='text-black'>20 kg</span></>} />
            <Card img={img} title={"2 Sort Qarshi "} location={"Narxi: 230 000 so'm"} soni={<><span className='text-gray-500'>Soni:</span> <span className='text-black'>20 kg</span></>} />
        </main>
        <Footer links={deliverLinks} />
    </div>
  )
}

export default MijozDetails
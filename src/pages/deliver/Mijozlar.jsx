import React from 'react'
import TopBar from '../user/components/TopBar'
import Card from './components/Card'
import img from "./assets/Frame 427321904.png"
import home from "../user/assets/Vector (3).svg";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import Footer from '../user/components/Footer';

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function Mijozlar() {
  return (
    <div className='p-3'>
        <TopBar text={"Mijozlar"} />
        <main className='mt-4 flex flex-col gap-4'>
            <Card img={img} title={"11 - Do'kon"} location={"Qashqadaryo - Qarshi"} />
            <Card img={img} title={"12 - Do'kon"} location={"Qashqadaryo - Qarshi"} />
            <Card img={img} title={"13 - Do'kon"} location={"Qashqadaryo - Qarshi"} />
        </main>
        <Footer links={deliverLinks} />
    </div>
  )
}

export default Mijozlar
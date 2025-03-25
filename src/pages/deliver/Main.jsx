import React from "react";
import Footer from "../user/components/Footer";
import home from "../user/assets/Vector (3).svg";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import logo from "@/assets/images/logo-icon.png";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import img from "./assets/Frame 427321904.png";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function Main() {
  return (
    <div className="p-3">
      <nav>
        <Link to={"/deliver"}>
          <img className="w-16" src={logo || "/placeholder.svg"} alt="logo" />
        </Link>
      </nav>
      <main className="mt-4">
        <p>Bugungi buyurtmalar</p>
        <Link to="/deliver/mijozlar/id" className="flex flex-col gap-4">
          <Card img={img} title="11 - Do'kon " location="Qashqadaryo - Qarshi" />
          <Card img={img} title="12 - Do'kon " location="Qashqadaryo - Qarshi" />
        </Link>
      </main>
      <Footer links={deliverLinks} />
    </div>
  );
}

export default Main;

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";

const userLinks = [
  { to: "/user/user", label: "Bosh sahifa", icon: home },
  { to: "/user/katalog", label: "Katalog", icon: search },
  { to: "/user/orders", label: "Buyurtmalar", icon: order },
  { to: "/user/profil", label: "Profil", icon: profil },
];

function Main() {
  return (
    <div className="p-3">
      <Navbar />
      <div className="lg:px-40 mt-5 mb-14">
        <Card />
      </div>

      <Footer links={userLinks}/>
    </div>
  );
}

export default Main;

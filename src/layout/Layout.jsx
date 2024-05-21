import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-100 text-gray-900 text-sm flex flex-col justify-between min-h-screen font-light">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

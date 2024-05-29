import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-50 overflow-x-clip text-gray-900 text-sm flex flex-col justify-between min-h-screen font-light">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

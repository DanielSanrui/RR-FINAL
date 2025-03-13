import { useState } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { Outlet } from "react-router";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="bg-black text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
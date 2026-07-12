import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className="
        lg:ml-64
      "
      >
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main
          className="
          p-4
          md:p-6
          min-h-screen
        "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

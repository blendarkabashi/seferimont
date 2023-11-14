import { useState } from "react";
import Sidebar from "src/components/Sidebar";
import MainMenu from "src/components/MainMenu";
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div>
        <div className="lg:pl-72">
          <MainMenu setSidebarOpen={setSidebarOpen}></MainMenu>
          <main className="">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;

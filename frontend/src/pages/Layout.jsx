import { useSelector } from "react-redux";
import { Footer, Sidebar } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const user = useSelector((state) => state.user);
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/welcome" />;
  }
  return (
    <div className="flex">
      {/* Sidebar stays fixed */}
      <div className="fixed z-20 left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen flex flex-col flex-1">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        {/* Fixed Footer */}
        <div className="border-t-2 shrink-0">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;

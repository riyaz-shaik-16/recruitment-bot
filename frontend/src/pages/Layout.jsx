import { useSelector } from "react-redux";
import { Footer, Sidebar } from "../components";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const user = useSelector((state) => state.user);
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex">

      <div className="h-screen">
        <Sidebar />
      </div>

      <main className="lg:ml-64 lg:pt-0 pt-15 bg-black-pearl-950 lg:mt-0 min-h-screen flex flex-col flex-1 h-full">

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        <div className="fixed mt-2 bottom-0 w-full lg:w-[calc(100%-256px)]
 shrink-0">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;

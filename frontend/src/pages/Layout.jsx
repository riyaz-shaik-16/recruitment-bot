
import {useSelector} from "react-redux";
import { Footer, Sidebar } from "../components";
import { Outlet } from "react-router-dom";


const Layout = () => {
  const user = useSelector(state => state.user);
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/welcome" />;
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar/>
      <main className="flex-1 flex min-h-screen flex-col justify-center">
        <Outlet />
        <Footer/>
      </main>
      
    </div>
  );
};

export default Layout;
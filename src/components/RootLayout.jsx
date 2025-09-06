import { Link, Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import AppProvider from "../context/AppProvider";
const RootLayout = () => {
  return (
    <>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Header */}
          <Header />

          <main className="">
            {/* This is where child routes render */}
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </AppProvider>
    </>
  );
};

export default RootLayout;

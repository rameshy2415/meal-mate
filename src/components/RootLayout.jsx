import { Link, Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
const RootLayout = () => {
  return (
    <>
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
    </>
  );
};

export default RootLayout;

import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Star,
  Clock,
  MapPin,
  CreditCard,
  Home,
  Building,
  User,
  CircleUserRound,
  ChevronUp,
  ChevronDown,
  LogOut,
  Bell,
  Gift,
  Heart,
  BaggageClaim,
  CirclePoundSterling,
  UserPen,
  TicketPercent,
  EllipsisVertical,
  Headset,
  BellRing,
  HandPlatter,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LogIn,
} from "lucide-react";
import { Link } from "react-router";
const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [isThreeDot, setThreeDot] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <header className="bg-white md:shadow-sm sticky top-0  z-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Icon */}
          <div className="flex items-center space-x-4">
            

             {/* Left Menu for Mobile */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => console((prev) => !prev)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div>
              <HandPlatter className="h-8 w-8 text-orange-500" />
            </div>
            <Link to="/" className="text-2xl font-bold text-orange-600 hidden md:block">
              FoodHub
            </Link>

            <div className="hidden md:flex items-center space-x-2 text-orange-500">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Deliver to: Mumbai, MH</span>
            </div>

          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food, restaurants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Login */}
          <div className="relative flex items-center p-2 rounded-lg hover:text-orange-600 hover:cursor-pointer hover:bg-orange-50">
            {isLogin && (
              <button
                onClick={() => {
                  setAuth((prev) => !prev);
                  setThreeDot(false);
                }}
                className=" text-gray-600 space-x-2 hover:text-orange-600 transition-colors flex justify-center items-center"
              >
                <CircleUserRound className="h-5 w-5" />
                <span className="text-lg leading-normal">Ramesh</span>
                {isAuth && <ChevronUp className="h-4 w-4 " />}
                {!isAuth && <ChevronDown className="h-4 w-4 " />}
              </button>
            )}

            {!isLogin && (
              <Link
                to="/login"
                className=" text-gray-600 space-x-2 hover:text-orange-600 transition-colors flex justify-center items-center"
              >
                <CircleUserRound className="h-5 w-5" />
                <span className="text-lg leading-normal">Login</span>
                <ChevronDown className="h-4 w-4 " />
              </Link>
            )}

            {isAuth && (
              <ul className="h-auto w-50 bg-gray-50 absolute top-10 left-0 shadow-lg text-gray-500 text-xs rounded-lg flex flex-col">
                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <UserPen className="h-4 w-4" />
                    <h4 className="font-medium">My Profile</h4>
                  </li>
                </a>

                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <CirclePoundSterling className="h-4 w-4" />
                    <h4 className="font-medium">SuperCoin Zone</h4>
                  </li>
                </a>
                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <BaggageClaim className="h-4 w-4" />
                    <h4 className="font-medium">Orders</h4>
                  </li>
                </a>

                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <Heart className="h-4 w-4" />
                    <h4 className="font-medium">Wishlist</h4>
                  </li>
                </a>

                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <TicketPercent className="h-4 w-4" />
                    <h4 className="font-medium">Coupons</h4>
                  </li>
                </a>

                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <Gift className="h-4 w-4" />
                    <h4 className="font-medium">Gift Cards</h4>
                  </li>
                </a>

                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <Bell className="h-4 w-4" />
                    <h4 className="font-medium">Notifications</h4>
                  </li>
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAuth(false);
                    setLogin(false);
                    setCartItems([]);
                  }}
                  className="hover:bg-gray-100 py-3 px-2"
                  title="Logout"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <LogOut className="h-4 w-4" />
                    <h4 className="font-medium">Logout</h4>
                  </li>
                </a>
              </ul>
            )}
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          {/* ThreeDot */}
          <div className="relative flex items-center p-2 rounded-lg hover:text-orange-600 hover:cursor-pointer">
            <button
              onClick={() => {
                setThreeDot((prev) => !prev);
                setAuth(false);
              }}
              className=" text-gray-600 space-x-2 hover:text-orange-600 transition-colors flex justify-center items-center"
            >
              <EllipsisVertical className="h-6 w-6" />
            </button>

            {isThreeDot && (
              <ul className="h-auto w-50 bg-gray-50 absolute top-11 right-0 shadow-lg text-gray-500 text-xs rounded-lg flex flex-col">
                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <BellRing className="h-4 w-4" />
                    <h4 className="font-medium">Notification Preferences</h4>
                  </li>
                </a>
                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <Headset className="h-4 w-4" />
                    <h4 className="font-medium">24x7 Customer Care</h4>
                  </li>
                </a>
                <a
                  href="#"
                  className="hover:bg-gray-100 py-3 px-2"
                  title="My Profile"
                >
                  <li className="flex space-x-4 px-2 font-semibold text-gray-900">
                    <TrendingUp className="h-4 w-4" />
                    <h4 className="font-medium">Advertise</h4>
                  </li>
                </a>
              </ul>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

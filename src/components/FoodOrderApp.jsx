import React, { useState, useEffect } from "react";
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

import Login from "./Login";

export default function FoodOrderApp() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isLeftMenu, setLeftMenu] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [isThreeDot, setThreeDot] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState("address"); // 'address' or 'payment'
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isLogin) {
      setCartItems([
        {
          id: 1,
          name: "Margherita Pizza",
          price: 12.99,
          quantity: 1,
          image: "🍕",
        },
        {
          id: 2,
          name: "Chicken Burger",
          price: 8.99,
          quantity: 2,
          image: "🍔",
        },
      ]);
    }
  }, [isLogin]);

  const [selectedCategory, setSelectedCategory] = useState("pizza");

  const [deliveryAddress, setDeliveryAddress] = useState({
    type: "home",
    street: "",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "",
    landmark: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const upiApps = [
    { id: "paytm", name: "Paytm", icon: "💰", color: "bg-blue-500" },
    { id: "gpay", name: "Google Pay", icon: "🟢", color: "bg-green-500" },
    { id: "phonepe", name: "PhonePe", icon: "💜", color: "bg-purple-500" },
    { id: "amazpay", name: "Amazon Pay", icon: "🟠", color: "bg-orange-600" },
    { id: "bhim", name: "BHIM", icon: "🇮🇳", color: "bg-blue-600" },
    { id: "cred", name: "CRED", icon: "💳", color: "bg-black" },
  ];

  const categories = [
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "burgers", name: "Burgers", icon: "🍔" },
    { id: "pasta", name: "Pasta", icon: "🍝" },
    { id: "salads", name: "Salads", icon: "🥗" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
    { id: "drinks", name: "Drinks", icon: "🥤" },
  ];

  const menuItems = {
    pizza: [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 12.99,
        rating: 4.8,
        time: "25-30 min",
        image: "🍕",
        description: "Fresh tomatoes, mozzarella, basil",
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        price: 14.99,
        rating: 4.9,
        time: "25-30 min",
        image: "🍕",
        description: "Pepperoni, mozzarella, tomato sauce",
      },
      {
        id: 3,
        name: "BBQ Chicken Pizza",
        price: 16.99,
        rating: 4.7,
        time: "30-35 min",
        image: "🍕",
        description: "BBQ sauce, chicken, red onions, cilantro",
      },
    ],
    burgers: [
      {
        id: 4,
        name: "Classic Burger",
        price: 8.99,
        rating: 4.6,
        time: "15-20 min",
        image: "🍔",
        description: "Beef patty, lettuce, tomato, onions",
      },
      {
        id: 5,
        name: "Chicken Burger",
        price: 9.99,
        rating: 4.7,
        time: "15-20 min",
        image: "🍔",
        description: "Grilled chicken, lettuce, mayo",
      },
      {
        id: 6,
        name: "Veggie Burger",
        price: 7.99,
        rating: 4.5,
        time: "15-20 min",
        image: "🍔",
        description: "Plant-based patty, avocado, sprouts",
      },
    ],
  };

  const updateCartQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1, image: item.image }];
      }
    });
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + deliveryFee + tax;

  // Carousel data
  const carouselSlides = [
    {
      id: 1,
      title: "30% Off on Pizza",
      subtitle: "Limited Time Offer",
      description: "Get your favorite pizzas with amazing discounts",
      image: "🍕",
      bgColor: "from-red-500 to-orange-500",
      buttonText: "Order Now",
    },
    {
      id: 2,
      title: "Free Delivery",
      subtitle: "On Orders Above $25",
      description: "No delivery charges for orders over $25",
      image: "🚚",
      bgColor: "from-green-500 to-blue-500",
      buttonText: "Start Ordering",
    },
    {
      id: 3,
      title: "Fresh Salads",
      subtitle: "Healthy & Delicious",
      description: "Farm fresh ingredients delivered to your door",
      image: "🥗",
      bgColor: "from-purple-500 to-pink-500",
      buttonText: "Explore Menu",
    },
    {
      id: 4,
      title: "Burger Combo",
      subtitle: "Buy 1 Get 1 Free",
      description: "Double the taste, double the fun",
      image: "🍔",
      bgColor: "from-yellow-500 to-red-500",
      buttonText: "Order Combo",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setCurrentStep("address");
  };

  const proceedToPayment = () => {
    setCurrentStep("payment");
  };

  const placeOrder = async () => {
    if (paymentMethod === "upi" && selectedUpiApp) {
      setIsProcessingPayment(true);

      // Simulate UPI payment processing
      setTimeout(() => {
        setIsProcessingPayment(false);
        alert(
          `Payment successful via ${
            upiApps.find((app) => app.id === selectedUpiApp)?.name
          }! 🎉\nOrder placed successfully!`
        );
        setCartItems([]);
        setShowCheckout(false);
        setIsCartOpen(false);
        setSelectedUpiApp("");
        setUpiId("");
      }, 3000);
    } else {
      alert("Order placed successfully! 🎉");
      setCartItems([]);
      setShowCheckout(false);
      setIsCartOpen(false);
    }
  };

  const processUpiPayment = () => {
    if (!selectedUpiApp) {
      alert("Please select a UPI app to continue");
      return;
    }
    placeOrder();
  };

  const loginHandler = () => {
    setLogin(true);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white md:shadow-sm sticky top-0  z-60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  className="md:hidden p-2 text-gray-600"
                  onClick={() => setLeftMenu((prev) => !prev)}
                >
                  <Menu className="h-6 w-6" />
                </button>

                <div>
                  <HandPlatter className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-orange-600 hidden md:block">
                  FoodHub
                </div>
                <div className="hidden md:flex items-center space-x-2 text-orange-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Deliver to: Mumbai, MH</span>
                </div>
              </div>

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
                    <span className="text-md">Ramesh</span>
                    {isAuth && <ChevronUp className="h-4 w-4 " />}
                    {!isAuth && <ChevronDown className="h-4 w-4 " />}
                  </button>
                )}

                {!isLogin && (
                  <button
                    onClick={loginHandler}
                    className=" text-gray-600 space-x-2 hover:text-orange-600 transition-colors flex justify-center items-center"
                  >
                    <CircleUserRound className="h-5 w-5" />
                    <span className="text-md">Login</span>
                    <ChevronDown className="h-4 w-4 " />
                  </button>
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

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>

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
                        <h4 className="font-medium">
                          Notification Preferences
                        </h4>
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

        {/* Body */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Responsive Carousel */}
            <div className="mb-8">
              <div
                className="relative overflow-hidden rounded-2xl shadow-lg"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Carousel Container */}
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carouselSlides.map((slide) => (
                    <div
                      key={slide.id}
                      className={`w-full flex-shrink-0 bg-gradient-to-r ${slide.bgColor} relative`}
                    >
                      <div className="px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          {/* Content */}
                          <div className="text-white mb-8 md:mb-0 md:w-2/3 text-center md:text-left">
                            <div className="text-sm md:text-base opacity-90 mb-2 font-medium">
                              {slide.subtitle}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                              {slide.title}
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 mb-6 max-w-md">
                              {slide.description}
                            </p>
                            <button className="bg-white text-gray-800 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105">
                              {slide.buttonText}
                            </button>
                          </div>

                          {/* Image/Icon */}
                          <div className="md:w-1/3 flex justify-center">
                            <div className="text-8xl md:text-9xl lg:text-[12rem] opacity-80 transform hover:scale-110 transition-transform duration-300">
                              {slide.image}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 hover:bg-opacity-30 text-orange-500 p-2 md:p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg- hover:bg-opacity-30 text-orange-500 p-2 md:p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        currentSlide === index
                          ? "bg-white"
                          : "bg-white bg-opacity-50 hover:bg-opacity-75"
                      }`}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-30">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{
                      width: `${
                        ((currentSlide + 1) / carouselSlides.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">
                  Delicious Food, Delivered Fast
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  Order your favorite meals from the best restaurants in your
                  area
                </p>
                <div className="flex space-x-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">30+</div>
                    <div className="text-sm opacity-90">Minutes</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Restaurants</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">4.8⭐</div>
                    <div className="text-sm opacity-90">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-orange-500 text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="font-medium text-sm">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {categories.find((c) => c.id === selectedCategory)?.name} Menu
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(menuItems[selectedCategory] || []).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{item.image}</div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500 mb-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {item.rating}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.time}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-600">
                          ${item.price}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-sm sticky bottom-0 py-4">
          <div className="flex justify-center space-x-4 text-center text-orange-500 font-semibold mx-2 md:mx-0">
            <span className="text-sm">
              © {new Date().getFullYear()} Techinsights Community. All Rights
              Reserved
            </span>
          </div>
        </footer>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-70 overflow-hidden">
            <div
              className="absolute inset-0 bg-opacity-50"
              onClick={() => setIsCartOpen(false)}
            ></div>
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-orange-500">
                  <h2 className="text-xl font-semibold">Your Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 p-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4"
                        >
                          <div className="text-2xl">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-orange-600 font-semibold">
                              ${item.price}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && !showCheckout && (
                  <div className="border-t border-orange-500 p-6">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee:</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-orange-600">
                            ${grandTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}

                {/* Checkout Flow */}
                {showCheckout && (
                  <div className="border-t border-orange-500 p-6 ">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex items-center space-x-2 ${
                            currentStep === "address"
                              ? "text-orange-600"
                              : "text-gray-400"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              currentStep === "address"
                                ? "bg-orange-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            <MapPin className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">Address</span>
                        </div>
                        <div className="w-8 h-px bg-gray-300"></div>
                        <div
                          className={`flex items-center space-x-2 ${
                            currentStep === "payment"
                              ? "text-orange-600"
                              : "text-gray-400"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              currentStep === "payment"
                                ? "bg-orange-600 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium">Payment</span>
                        </div>
                      </div>
                    </div>

                    {/* Address Step */}
                    {currentStep === "address" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">
                          Delivery Address
                        </h3>

                        {/* Address Type Selection */}
                        <div className="flex space-x-4 mb-4">
                          <button
                            onClick={() =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                type: "home",
                              })
                            }
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                              deliveryAddress.type === "home"
                                ? "border-orange-500 bg-orange-50 text-orange-600"
                                : "border-gray-300"
                            }`}
                          >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                          </button>
                          <button
                            onClick={() =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                type: "office",
                              })
                            }
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                              deliveryAddress.type === "office"
                                ? "border-orange-500 bg-orange-50 text-orange-600"
                                : "border-gray-300"
                            }`}
                          >
                            <Building className="h-4 w-4" />
                            <span>Office</span>
                          </button>
                        </div>

                        {/* Address Form */}
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={deliveryAddress.street}
                            onChange={(e) =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                street: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="City"
                              value={deliveryAddress.city}
                              onChange={(e) =>
                                setDeliveryAddress({
                                  ...deliveryAddress,
                                  city: e.target.value,
                                })
                              }
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="ZIP Code"
                              value={deliveryAddress.zipCode}
                              onChange={(e) =>
                                setDeliveryAddress({
                                  ...deliveryAddress,
                                  zipCode: e.target.value,
                                })
                              }
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Landmark (Optional)"
                            value={deliveryAddress.landmark}
                            onChange={(e) =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                landmark: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div className="flex space-x-3 mt-6">
                          <button
                            onClick={() => setShowCheckout(false)}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                          >
                            Back to Cart
                          </button>
                          <button
                            onClick={proceedToPayment}
                            disabled={
                              !deliveryAddress.street ||
                              !deliveryAddress.zipCode
                            }
                            className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Payment Step */}
                    {currentStep === "payment" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">
                          Payment Method
                        </h3>

                        {/* Payment Method Selection */}
                        <div className="space-y-3 mb-6">
                          <button
                            onClick={() => setPaymentMethod("card")}
                            className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
                              paymentMethod === "card"
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-300"
                            }`}
                          >
                            <CreditCard className="h-5 w-5" />
                            <span>Credit/Debit Card</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod("upi")}
                            className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
                              paymentMethod === "upi"
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-300"
                            }`}
                          >
                            <span className="text-lg">💳</span>
                            <span>UPI Payment</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod("cod")}
                            className={`w-full p-4 border rounded-lg flex items-center space-x-3 ${
                              paymentMethod === "cod"
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-300"
                            }`}
                          >
                            <span className="text-lg">💵</span>
                            <span>Cash on Delivery</span>
                          </button>
                        </div>

                        {/* Card Details Form */}
                        {paymentMethod === "card" && (
                          <div className="space-y-3 mb-6">
                            <input
                              type="text"
                              placeholder="Cardholder Name"
                              value={paymentDetails.cardholderName}
                              onChange={(e) =>
                                setPaymentDetails({
                                  ...paymentDetails,
                                  cardholderName: e.target.value,
                                })
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Card Number"
                              value={paymentDetails.cardNumber}
                              onChange={(e) =>
                                setPaymentDetails({
                                  ...paymentDetails,
                                  cardNumber: e.target.value,
                                })
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={paymentDetails.expiryDate}
                                onChange={(e) =>
                                  setPaymentDetails({
                                    ...paymentDetails,
                                    expiryDate: e.target.value,
                                  })
                                }
                                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="CVV"
                                value={paymentDetails.cvv}
                                onChange={(e) =>
                                  setPaymentDetails({
                                    ...paymentDetails,
                                    cvv: e.target.value,
                                  })
                                }
                                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        )}

                        {/* UPI Payment */}
                        {paymentMethod === "upi" && (
                          <div className="mb-6 space-y-4">
                            {/* UPI ID Input */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter UPI ID
                              </label>
                              <input
                                type="text"
                                placeholder="yourname@paytm, yourname@oksbi etc."
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              />
                            </div>

                            <div className="text-center text-gray-500">
                              <span className="text-sm">OR</span>
                            </div>

                            {/* UPI Apps Selection */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select UPI App
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                {upiApps.map((app) => (
                                  <button
                                    key={app.id}
                                    onClick={() => setSelectedUpiApp(app.id)}
                                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                                      selectedUpiApp === app.id
                                        ? "border-orange-500 bg-orange-50 transform scale-105"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex flex-col items-center space-y-2">
                                      <div
                                        className={`w-12 h-12 rounded-full ${app.color} flex items-center justify-center text-white text-xl`}
                                      >
                                        {app.icon}
                                      </div>
                                      <span className="text-sm font-medium text-gray-700">
                                        {app.name}
                                      </span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Selected UPI App Confirmation */}
                            {selectedUpiApp && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-10 h-10 rounded-full ${
                                      upiApps.find(
                                        (app) => app.id === selectedUpiApp
                                      )?.color
                                    } flex items-center justify-center text-white`}
                                  >
                                    {
                                      upiApps.find(
                                        (app) => app.id === selectedUpiApp
                                      )?.icon
                                    }
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-green-800">
                                      Selected:{" "}
                                      {
                                        upiApps.find(
                                          (app) => app.id === selectedUpiApp
                                        )?.name
                                      }
                                    </p>
                                    <p className="text-xs text-green-600">
                                      You'll be redirected to complete payment
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* UPI Payment Processing */}
                            {isProcessingPayment && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
                                  <div className="mb-4">
                                    <div
                                      className={`w-16 h-16 rounded-full ${
                                        upiApps.find(
                                          (app) => app.id === selectedUpiApp
                                        )?.color
                                      } flex items-center justify-center text-white text-2xl mx-auto mb-4`}
                                    >
                                      {
                                        upiApps.find(
                                          (app) => app.id === selectedUpiApp
                                        )?.icon
                                      }
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                      Processing Payment
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                      Please complete payment in{" "}
                                      {
                                        upiApps.find(
                                          (app) => app.id === selectedUpiApp
                                        )?.name
                                      }
                                    </p>
                                  </div>
                                  <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                                  </div>
                                  <div className="mt-4 text-xs text-gray-500">
                                    Amount: ₹{(grandTotal * 83).toFixed(2)}{" "}
                                    {/* Rough USD to INR conversion */}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Delivery Fee:</span>
                              <span>${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-orange-500 pt-2 flex justify-between font-semibold">
                              <span>Total:</span>
                              <span>${grandTotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => setCurrentStep("address")}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                          >
                            Back to Address
                          </button>
                          {paymentMethod === "upi" ? (
                            <button
                              onClick={processUpiPayment}
                              disabled={!selectedUpiApp && !upiId}
                              className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                              <span>Pay with UPI</span>
                              <span>₹{(grandTotal * 83).toFixed(0)}</span>
                            </button>
                          ) : (
                            <button
                              onClick={placeOrder}
                              className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                            >
                              Place Order
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Menu for mobile view*/}
        {isLeftMenu && (
          <div className="fixed inset-0 z-70 overflow-hidden">
            <div
              className="absolute inset-0 bg-opacity-50"
              onClick={() => setLeftMenu(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-2/3 max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-around p-3 bg-orange-500 text-gray-100 space-x-4">
                  <div className="flex items-center justify-start bg-orange-500 text-gray-100 space-x-4">
                    <button
                      onClick={() => setLeftMenu(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <CircleUserRound className="h-6 w-6" />
                    </button>
                    <h2 className="text-xl font-semibold">Ramesh</h2>
                  </div>

                  <button
                    onClick={() => setLeftMenu(false)}
                    className="p-2 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 p-6 h-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

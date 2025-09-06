import React, { useState, useEffect } from "react";
import {
  Plus,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  LogIn,
} from "lucide-react";

const Home = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
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
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("pizza");

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

  console.log(grandTotal);

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

  return (
    <>
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
                Order your favorite meals from the best restaurants in your area
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
    </>
  );
};

export default Home;

import { useState } from 'react';
import { Heart, Star, ShoppingCart, Check, Truck, RotateCcw, ChevronRight } from 'lucide-react';

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState({ name: 'Midnight Black', class: 'bg-gray-900' });
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);

  const product = {
    name: 'AudioTech Pro Max Wireless Headphones',
    price: 299.99,
    rating: 4.6,
    reviewCount: 128,
    description: 'Experience premium sound quality with our latest AudioTech Pro Max wireless headphones. Featuring advanced noise cancellation technology and superior comfort for all-day wear.',
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life', 
      'Wireless Charging Case',
      'Premium Materials'
    ]
  };

  const colors = [
    { name: 'Midnight Black', class: 'bg-gray-900' },
    { name: 'Space Gray', class: 'bg-gray-600' },
    { name: 'Rose Gold', class: 'bg-pink-400' },
    { name: 'Silver', class: 'bg-gray-200' }
  ];

  const sizes = ['Small', 'Standard', 'Large'];

  const images = ['main-view', 'side-view', 'detail-view', 'accessories'];

  const reviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2 days ago',
      title: 'Amazing sound quality!',
      content: 'These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised.'
    },
    {
      id: 2,
      author: 'Mike R.',
      rating: 4,
      date: '1 week ago',
      title: 'Great for travel',
      content: 'Perfect for long flights. Comfortable to wear for hours and the case is compact enough to fit in carry-on easily.'
    }
  ];

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${selectedColor.name} ${selectedSize} headphones to cart!`);
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const renderStars = (rating, size = 'h-5 w-5') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AudioTech</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 relative transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Electronics</a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">Wireless Headphones</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            {/* Image Thumbnails */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs">View {index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="w-full">
              <div className="w-full h-96 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold drop-shadow-md">Premium Wireless Headphones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <p className="ml-3 text-sm text-gray-700">
                  {product.rating} out of 5 stars
                </p>
                <a href="#reviews" className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  {product.reviewCount} reviews
                </a>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-base text-gray-700">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Color Options */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <span className="text-sm text-gray-700">{selectedColor.name}</span>
              </div>

              <div className="mt-2">
                <div className="flex items-center space-x-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'ring-2 ring-offset-2 ring-gray-900'
                          : 'ring-1 ring-gray-300'
                      }`}
                    >
                      <span className={`h-8 w-8 border border-black border-opacity-10 rounded-full ${color.class}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size Options */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Size guide
                </a>
              </div>

              <div className="mt-2">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                        selectedSize === size
                          ? 'bg-gray-900 border-transparent text-white hover:bg-gray-800'
                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to cart</span>
                  </button>
                </div>

                <button
                  onClick={toggleWishlist}
                  className={`bg-white rounded-md p-2 flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                    inWishlist ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900">Shipping & Returns</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-5 w-5 mr-3 text-gray-400" />
                  Free shipping on orders over $200
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw className="h-5 w-5 mr-3 text-gray-400" />
                  30-day return policy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-gray-200 pt-16" id="reviews">
          <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
          <div className="mt-6 space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-8">
                <div className="flex items-center">
                  {renderStars(review.rating, 'h-4 w-4')}
                  <p className="ml-3 text-sm text-gray-600">{review.author}</p>
                  <p className="ml-4 text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-gray-900">{review.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
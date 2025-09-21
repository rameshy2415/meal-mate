const config = {
    BACKEND_API: import.meta.env.VITE_BACKEND_API || "http://localhost:8080/api",
    RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_RH5et9rnLYiOGd",
    ENV: import.meta.env.VITE_ENV || "local",
  };
  
  export default config;
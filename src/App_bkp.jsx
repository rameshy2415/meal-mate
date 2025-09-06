import "./App.css";
import FoodOrderApp from "./components/FoodOrderApp";
import Header from "./components/Header";
import Home from "./components/Home";
import AppProvider from "./context/AppProvider";
import Router from './components/Router';

function App() {

  const renderRoute = (currentRoute, routeParams, navigate) => {
    switch (currentRoute) {
      case 'login':
        return <Login navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'cart':
        return <Cart navigate={navigate} />;
      case 'checkout':
        return <Checkout navigate={navigate} />;
      case 'product-detail':
        return <ProductDetail routeParams={routeParams} navigate={navigate} />;
      case 'order-success':
        return <OrderSuccess navigate={navigate} />;
      case 'home':
      default:
        return <Home navigate={navigate} />;
    }
  };

    return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {({ currentRoute, routeParams, navigate }) => (
            <>
              <Header navigate={navigate} currentRoute={currentRoute} />
              {renderRoute(currentRoute, routeParams, navigate)}
            </>
          )}
        </div>
      </Router>
    </AppProvider>
  );

  // return (
  //   <>
  //      <FoodOrderApp />
  //   </>
  // );
}

export default App;

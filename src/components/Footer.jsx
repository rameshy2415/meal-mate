const Footer = () => {
  return (
    <>
      <footer className="bg-white shadow-sm py-4 mt-6">
        <div className="flex justify-center space-x-4 text-center text-orange-500 md:font-semibold mx-2 md:mx-0">
          <span className="text-sm">
            © {new Date().getFullYear()} Techinsights Community. All Rights
            Reserved
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;

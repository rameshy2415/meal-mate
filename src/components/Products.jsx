import menuItems from "../data/menuItems.json";
const Products = () => {
  return (
    <>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name} — 💲{item.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;

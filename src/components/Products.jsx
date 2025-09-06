import menuItem from "./menuItem.json"; // direct import
const Products = () => {



  return (
    <>
      <ul>
        {menuItem.map((item) => (
          <li key={item.id}>
            {item.name} — 💲{item.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;

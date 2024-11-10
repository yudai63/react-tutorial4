import { useEffect,useState } from "react";

export default function App() {
  const [products,setProducts] = useState([]);
  const [category,setCategory] = useState("All");
  const [searchTerm,setSearchTerm] = useState("");

  useEffect(() =>{
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:",error));
  },[]);

  const handleFilter = () => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.type === category.toLowerCase();
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  };

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select 
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input 
                type="text" 
                id="searchTerm" 
                placeholder="e.g. beans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button type="button" onClick={() => {}}>
                Filter results
              </button>
            </div>
          </form>
        </aside>
        <main>
          {handleFilter().length > 0 ? (
            handleFilter().map((product,index) => (
              <section className={product.type} key={index}>
                <h2>{product.name}</h2>
                <p>${product.price.toFixed(2)}</p>
                <img src={`images/${product.image}`} alt={product.name} />
              </section>
            ))
          ) : (
            <p>No results to display!</p>
          )}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
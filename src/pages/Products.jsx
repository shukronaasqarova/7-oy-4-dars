import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../axios"; 

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    company: 'all',
    order: 'a-z',
    price: 100000,
    freeShipping: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { search, category, company, order, price, freeShipping } = filters;

        const response = await http.get(
          `products?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}${freeShipping ? '&shipping=true' : ''}`
        );

        if (response.status === 200) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      company: 'all',
      order: 'a-z',
      price: 100000,
      freeShipping: false,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>

      <div className="mb-6 p-6 border rounded-lg shadow-lg bg-white flex flex-col md:flex-row md:items-center">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search..."
          className="border rounded-lg p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
          <option value="Sofas">Sofas</option>
          <option value="Lamps">Lamps</option>
          <option value="Desks">Desks</option>
        </select>
        <select
          name="company"
          value={filters.company}
          onChange={handleFilterChange}
          className="border rounded-lg p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Companies</option>
          <option value="Company1">Company 1</option>
          <option value="Company2">Company 2</option>
          <option value="Company3">Company 3</option>
        </select>
        <button
          onClick={() => setFilters((prev) => ({ ...prev }))}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Search
        </button>
        <button
          onClick={resetFilters}
          className="bg-red-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 ml-4"
        >
          Reset
        </button>
        <div className="mt-4 md:mt-0 md:ml-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="freeShipping"
              checked={filters.freeShipping}
              onChange={handleFilterChange}
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Free Shipping</span>
          </label>
        </div>
      </div>

 
      <div className="flex flex-wrap gap-4 justify-center"> 
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/details/${product.id}`} 
              key={product.id}
              className="w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden mt-4 p-4" // Changed mt-20 to mt-4
            >
              <img
                className="w-full h-56 object-cover rounded-xl"
                src={product.attributes.image}
                alt={product.attributes.title}
              />
              <div className="mt-2 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-600 mt-5">{product.attributes.title}</h3>
                <h3 className="text-xl font-semibold text-gray-600">${product.attributes.price}</h3>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-600 text-center">No products found!</div>
        )}
      </div>
    </div>
  );
}

export default Products;

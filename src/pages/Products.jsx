import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductFilters = ({ filters, handleFilterChange, resetFilters }) => {
  return (
    <form
      style={{ maxWidth: "1087px" }}
      className="bg-gray-100 rounded-lg p-6 mt-10 mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center shadow-lg"
    >
      <div className="form-control">
        <label htmlFor="search" className="label text-gray-800">Search Product</label>
        <input
          type="search"
          name="search"
          className="rounded-md input input-bordered input-sm"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search..."
        />
      </div>

      <FilterSelect
        name="category"
        options={["all", "Tables", "Chairs", "Kids", "Sofas", "Beds"]}
        value={filters.category}
        handleChange={handleFilterChange}
      />
      <FilterSelect
        name="company"
        options={["all", "Modenza", "Luxora", "Artifex", "Comfora", "Homestead"]}
        value={filters.company}
        handleChange={handleFilterChange}
      />
      <FilterSelect
        name="order"
        options={["a-z", "z-a", "low-high", "high-low"]}
        value={filters.order}
        handleChange={handleFilterChange}
      />
      
      <div className="form-control">
        <label htmlFor="price" className="label text-gray-800">Max Price</label>
        <input
          type="range"
          name="price"
          min="0"
          max="1000"
          step="50"
          value={filters.price}
          onChange={handleFilterChange}
          className="range range-sm"
        />
        <span className="text-gray-600">${filters.price}</span>
      </div>

      <div className="form-control">
        <label htmlFor="freeShipping" className="label cursor-pointer text-gray-800">
          Free Shipping
          <input
            type="checkbox"
            name="freeShipping"
            className="checkbox"
            checked={filters.freeShipping}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <button type="button" className="btn btn-outline" onClick={resetFilters}>Reset</button>
        <button type="button" className="btn btn-primary" onClick={() => console.log('Search action here')}>Search</button>
      </div>
    </form>
  );
};

const FilterSelect = ({ name, options, value, handleChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label text-gray-800">{name}</label>
      <select
        name={name}
        id={name}
        className="rounded-md select select-bordered select-sm"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/details/${product.id}`)}
      className=" bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden mt-20 p-4"
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
    </div>
  );
};


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    company: 'all',
    order: 'a-z',
    price: 1000,
    freeShipping: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://strapi-store-server.onrender.com/api/products");
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
  }, []);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
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
      price: 1000,
      freeShipping: false,
    });
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedData = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mx-auto px-4">
      <ProductFilters filters={filters} handleFilterChange={handleFilterChange} resetFilters={resetFilters} />
      
      {loading ? (
        <p className="text-center mt-20">Loading...</p>
      ) : paginatedData.length === 0 ? (
        <p className="text-center mt-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* gap-6 o'rniga gap-4 */}
          {paginatedData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center my-4">
        <button
          className={`btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-4">{currentPage} / {totalPages}</span>
        <button
          className={`btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

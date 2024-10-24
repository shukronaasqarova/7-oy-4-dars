import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../axios";

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
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      const { search, category, company, order, price, freeShipping } = filters;

      http.get(
        `products?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}${freeShipping ? '&shipping=true' : ''}`
      )
      .then(response => {
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <form
        style={{ maxWidth: "1087px" }}
        className="bg-base-200 rounded-md px-8 mt-20 mx-auto py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      >
        <div className="form-control">
          <label htmlFor="search" className="label">
            <span className="label-text capitalize">search product</span>
          </label>
          <input
            type="search"
            name="search"
            className="rounded-lg input input-bordered input-sm"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category" className="label">
            <span className="label-text capitalize">select category</span>
          </label>
          <select
            name="category"
            id="category"
            className="rounded-lg select select-bordered select-sm"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="all">all</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="company" className="label">
            <span className="label-text capitalize">select company</span>
          </label>
          <select
            name="company"
            id="company"
            className="rounded-lg select select-bordered select-sm"
            value={filters.company}
            onChange={handleFilterChange}
          >
            <option value="all">all</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="order" className="label">
            <span className="label-text capitalize">sort by</span>
          </label>
          <select
            name="order"
            id="order"
            className="rounded-lg select select-bordered select-sm"
            value={filters.order}
            onChange={handleFilterChange}
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Free Shipping</span>
            <input
              type="checkbox"
              name="freeShipping"
              className="toggle"
              checked={filters.freeShipping}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </form>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          paginatedData.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div>
        {/* Pagination controls */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

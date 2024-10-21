import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Details() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { id } = params;
  const [color, setColor] = useState("");

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((data) => {
        if (data.status === 200) {
          console.log(data.data.data);
          setProduct(data.data.data);
          setColor(data.data.data.attributes.colors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container pl-56 pb-11 pr-56">
      <div className="flex gap-4 text-1xl items-center text-gray-600 pb-8">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p className="flex items-center text-sm font-thin">
          <FontAwesomeIcon icon={faChevronRight} />
        </p>
        <Link to="/products">
          <p>Products</p>
        </Link>
      </div>

      {product.id && (
        <>
          <div className="flex items-start gap-16">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-[530px] h-[400px] rounded-lg"
            />
            <div className="flex flex-col">
              <h3 className="text-3xl uppercase font-bold pb-3">
                {product.attributes.title}
              </h3>
              <h3 className="font-sans text-xl text-slate-300 pb-4 font-extrabold">
                {product.attributes.company}
              </h3>

              <h3 className="text-xl pb-5">$ {product.attributes.price}</h3>
              <h3 className="w-[450px] text-lg font-thin">
                {product.attributes.description}
              </h3>
              <div>
                <p className="pt-5 text-lg text-slate-500 pb-3 font-semibold font-sans">
                  Colors
                </p>
              </div>
              <div className="flex gap-1">
                {product.attributes.colors.length > 0 &&
                  product.attributes.colors.map((colorProduct) => (
                    <span
                      key={colorProduct}
                      style={{
                        backgroundColor: colorProduct,
                        border: color === colorProduct ? "2px solid black" : "none",
                      }}
                      className="block w-6 h-6 ml-2 rounded-full cursor-pointer"
                      onClick={() => setColor(colorProduct)}
                    ></span>
                  ))}
              </div>
              <div>
                <p className="pt-5 text-lg text-slate-500 pb-3">Amount</p>
                <select className="w-72 bg-slate-100 pt-3 pb-3 pr-3 rounded-md border pl-3">
                  {[...Array(9).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-9">
                <button className="bg-blue-600 p-3 rounded-md text-sm text-slate-200 font-semibold">
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;

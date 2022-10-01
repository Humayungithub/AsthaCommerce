/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ProductItem({ product, addToCartHandler }) {
  const [showModal, setShowModal] = useState(false); //For Tracking modal state

  return (
    <>
      <div className="card">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow h-64 w-full object-scale-down"
            />
          </a>
        </Link>

        <div className="flex flex-col items-center justify-center p-5">
          <Link href={`/product/${product.slug}`}>
            <a>
              <h2 className="text-lg">{product.name}</h2>
            </a>
          </Link>
          <p className="mb-2">{product.brand}</p>
          <p className="font-bold">
            <span className="font-extrabold">৳</span> {product.price}
          </p>
          <div className="flex p-4">
            <button
              className="quickView-button"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <span className="flex justify-center ">
                <MagnifyingGlassIcon className="h-6 w-5"></MagnifyingGlassIcon>
                &nbsp;Quick View
              </span>
            </button>
            &nbsp;&nbsp;
            <button
              className="primary-button"
              type="button"
              onClick={() => addToCartHandler(product)}
            >
              <span className="flex justify-center">
                <ShoppingCartIcon className="h-6 w-5 "></ShoppingCartIcon>
                &nbsp;Add to cart
              </span>
            </button>
          </div>
        </div>

        {/* Modal UI */}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-4xl">
                {/*Modal content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* Modal header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Quick View</h3>
                    <button
                      type="button"
                      className="p-1  float-right bg-white"
                      onClick={() => setShowModal(false)}
                    >
                      <XMarkIcon className="h-6 w-6 "></XMarkIcon>
                    </button>
                  </div>

                  {/* Modal body*/}
                  <div className="grid md:grid-cols-4 md:gap-3 m-3 ">
                    <div className="md:col-span-2">
                      <Link href={`/product/${product.slug}`}>
                        <a>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="rounded shadow h-64 w-94 object-contain"
                          />
                        </a>
                      </Link>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>
                          {product.rating} of {product.numReviews} reviews
                        </li>
                        <li>Description: {product.description}</li>
                      </ul>
                    </div>
                    <div>
                      <div className="card p-5">
                        <div className="mb-2 flex justify-between">
                          <div>Price</div>
                          <div>
                            <span className="text-xl">৳</span> {product.price}
                          </div>
                        </div>
                        <div className="mb-2 flex justify-between">
                          <div>Status</div>
                          <div>
                            {product.countInStock > 0
                              ? 'In stock'
                              : 'Unavailable'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal footer*/}
                  <div className="flex items-center justify-end p-6 border-solid border-slate-200 rounded-b">
                    <button
                      className="modalClose-button"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close Quick View
                    </button>
                    <Link href="/cart">
                      <button
                        type="button"
                        className="primary-button w-52"
                        onClick={() => addToCartHandler(product)}
                      >
                        <span className="flex justify-center">
                          <ShoppingCartIcon className="h-5 w-5 "></ShoppingCartIcon>
                          &nbsp;Buy Now
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      {/* Modal UI End*/}
    </>
  );
}

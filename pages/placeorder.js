import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //round2 function to round calculation values after decimal. 10.1769 => 10.18
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); //c.quantity = current item.quantity

  const deliveryCharge = itemsPrice > 20000 ? 50 : 100; //Delivery charge will be 50TK if price is over 20K otherwise 100TK
  const totalPrice = round2(itemsPrice + deliveryCharge);

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        deliveryCharge,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set('cart', JSON.stringify({ ...cart, cartItems: [] }));
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty. &nbsp;
          <button className="shopping-button">
            <Link href="/">Continue Shopping</Link>
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <div className="flex justify-between">
                <h2 className="mb-2 text-lg">Shipping Address:</h2>
                <button className="edit-button text-sm">
                  <Link href="/shipping">Edit</Link>
                </button>
              </div>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
            </div>
            <div className="card p-5">
              <div className="flex justify-between">
                <h2 className="mb-2 text-lg">Payment Method:</h2>
                <button className="edit-button text-sm">
                  <Link href="/payment">Edit</Link>
                </button>
              </div>
              <div>{paymentMethod}</div>
            </div>
            <div className="card overflow-x-auto p-5">
              <div className="flex justify-between">
                <h2 className="mb-2 text-lg">Order Items</h2>
                <button className="edit-button text-sm">
                  <Link href="/cart">Edit</Link>
                </button>
              </div>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-8 text-left">Item</th>
                    <th className="px-5 text-right">Product name</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={100}
                            ></Image>
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.name}</td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">{item.price}</td>
                      <td className="p-5 text-right">
                        <span className="text-2xl font-bold">৳ </span>
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Subtotal:</div>
                  <div>
                    <span className="text-xl font-bold">৳ </span>
                    {itemsPrice}
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Delivery Charge:</div>
                  <div>
                    <span className="text-xl font-bold">৳ </span>
                    {deliveryCharge}
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between font-bold border-t border-neutral-800">
                  <div>Total:</div>
                  <div>
                    <span className="text-sm font-extrabold">৳ </span>
                    {totalPrice}
                  </div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? 'Loading...' : 'Place Order'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;

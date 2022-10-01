import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('city', shippingAddress.city);
    setValue('country', shippingAddress.country);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
    phoneNumber,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country, phoneNumber },
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
          phoneNumber,
        },
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Shipping address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            placeholder="Enter your full name here"
            className="w-full"
            autoFocus
            {...register('fullName', {
              required: 'Please enter your full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            placeholder="Enter your address here"
            className="w-full"
            autoFocus
            {...register('address', {
              required: 'Please enter your address',
              minLength: {
                value: 4,
                message: 'Your Address must have atleast 4 characters',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            placeholder="Enter your postal code here"
            className="w-full"
            autoFocus
            {...register('postalCode', {
              required: 'Please enter your postal code',
            })}
          />
          {errors.postalcode && (
            <div className="text-red-500">{errors.postalcode.message}</div>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            placeholder="Enter your city here"
            className="w-full"
            autoFocus
            {...register('city', {
              required: 'Please enter your city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            placeholder="Enter your Country here"
            className="w-full"
            autoFocus
            {...register('country', {
              required: 'Please enter your Country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            placeholder="Enter your phone number here"
            className="w-full"
            autoFocus
            {...register('phoneNumber', {
              required: 'Please enter your Phone Number',
              minLength: {
                value: 11,
                message: 'Phone Number must have 11 Digits',
              },
              maxLength: {
                value: 11,
                message: 'Phone Number can not have more than 11 Digits',
              },
              pattern: {
                value: /[0-9]*/,
                message: 'Please enter valid Phone Number',
              },
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500">{errors.phoneNumber.message}</div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;

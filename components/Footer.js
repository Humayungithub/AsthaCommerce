import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div>
      {/*Footer*/}
      <footer>
        {/*Company Footer*/}
        <div className="bg-neutral-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-1">
          <div className="p-5 ">
            <ul>
              <Link href="/">
                <a className="text-lg font-bold text-neutral-800">
                  Astha<span className="text-red-500">Commerce</span>
                </a>
              </Link>
              <div className="flex gap-6 pb-5">
                <p>Download our Mobile Apps</p>
              </div>
              <li>
                <Image
                  src="/gpay.png"
                  alt="Google Play link"
                  width={110}
                  height={60}
                />
                &nbsp;&nbsp;
                <Image
                  src="/appstore.png"
                  alt="App store link"
                  width={110}
                  height={55}
                />
              </li>
            </ul>
          </div>
          <div className="p-5">
            <ul>
              <p className="text-neutral-800 font-bold text-xl pb-4">
                AsthaCommerce
              </p>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Terms & Conditions
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                About Us
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Contact Us
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Store Locator
              </li>
            </ul>
          </div>
          <div className="p-5">
            <ul>
              <p className="text-neutral-800 font-bold text-xl pb-4">
                Customer Service
              </p>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Shipping & Delivery
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Register Your Complaints
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Installation
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Service Hours
              </li>
            </ul>
          </div>
          <div className="p-5">
            <ul>
              <p className="text-neutral-800 font-bold text-xl pb-4">Support</p>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                FAQs
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Your Account
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Track Orders
              </li>
              <li className="text-neutral-700 text-md pb-2 font-normal hover:text-blue-600 cursor-pointer">
                Corporate
              </li>
            </ul>
          </div>
        </div>
        {/*Copyright Footer*/}
        <div className="flex md:flex-row justify-around h-12 shadow-inner w-full p-1">
          <p className="mt-2">
            Copyright © 2022 <span className="font-bold">AsthaCommerce.</span>{' '}
            All rights reserved.
          </p>
          <span className="flex md:flex-row">
            <p className="mt-2">Pay with</p>&nbsp;&nbsp;
            <Image src="/visa.png" alt="Visa Icon" width={50} height={50} />
            &nbsp;&nbsp;
            <Image
              src="/mastercard.png"
              alt="Master Card Icon"
              width={50}
              height={50}
            />
            &nbsp;&nbsp;
            <Image src="/bkash.svg" alt="bKash Icon" width={80} height={50} />
            &nbsp;&nbsp;
            <Image
              className="mt-2"
              src="/money.png"
              alt="Money Icon"
              width={50}
              height={50}
            />
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

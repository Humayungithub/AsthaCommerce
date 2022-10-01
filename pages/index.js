import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Slider from '../components/Slider';
import VideoSection from '../components/VideoSection';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added to the cart');
  };

  return (
    <>
      <Layout title="Home Page">
        {/*Image slider-Underdevelopment*/}
        <Slider />
        {/*Products Section*/}
        <p className="text-neutral-800 font-bold text-xl my-1">
          Featured Products
        </p>
        <hr className="drop-shadow-sm" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 py-16">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
            ></ProductItem>
          ))}
        </div>
        <p className="text-neutral-800 font-bold text-xl my-2">Videos</p>
        <hr className="drop-shadow-sm" />
        {/*Vide Section*/}
        <VideoSection />
      </Layout>
    </>
  );
}

{
  /*Server-Side Rendering components*/
}
export async function getServerSideProps() {
  await db.connect(); //Connect to database
  const products = await Product.find().lean(); //Get all products from db
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

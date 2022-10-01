/*API to get product data from MongoDB Backend basend on the URI*/
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect(); //Connect to database
  const product = await Product.findById(req.query.id); //Get product from db based on id in the URL
  await db.disconnect; //disonnect from database
  res.send(product);
};

export default handler;

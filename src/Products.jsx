import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product');
        const data = await response.json();
        console.log('API Response:', data.data);
        setProducts(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
        <div className=" w-full px-4 sm:px-6 lg:px-8  min-h-screen ">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


      


            {products.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id}>
                    <div className="bg-sky-100 rounded-lg shadow-md p-10 hover:shadow-lg transition duration-300">
                    {product.images && product.images.length > 0 && (
                        <img
                        src={product.images[0].secure_url}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-t-lg"
                        />) 
                    }
                    <div className="p-4">
                        <h2 className="text-teal-600 text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600 mt-2">${product.price}</p>
                    </div>
                    </div>
                 </Link>
             ))}


      

        




      </div>
    </div>

   
    
  );

   
}


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product');
        const result = await response.json();
        const allProducts = result.data;

        const foundProduct = allProducts.find((p) => p._id === id);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className='flex bg-amber-100 min-h-screen flex-wrap'>
        <div className="  p-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6  w-full">
                 {product.images?.length > 0 && (
                     <img
                             src={product.images[0].secure_url}
                             alt={product.name}
                             className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}
             <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-green-600 mb-2">${product.price}</p>
            <p className="text-gray-600">{product.description || 'No description available'}</p>
            {product.category && (
                <p className="text-gray-600">{product.category.name || 'No description available'}</p>)}
            </div>
        </div>

        <div className="  p-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                 {product.video?.secure_url && (
                    <video  className="w-full h-screen rounded-lg mb-4" controls autoPlay={true} muted>
                        <source src={product.video.secure_url} type="video/mp4"/>
                    </video>
                )}
             
            
            </div>
        </div>

    </div>
    
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormCreateProduct from '../components/FormProductos/FormCreateProduct';
import { getOneProduct } from '../services/productsService';

const ProductoEdit = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const { data } = await getOneProduct(id);
      setProducto(data)
      setLoading(false);
    }
    getProduct();
  }, [id]);


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin</h1>
      {/* <button className="btn btn-primary my-3" onClick={() => setCreateProduct(!createProduct)}>
        {createProduct ? 'Ver Tabla' : 'Agregar producto'}
      </button> */}
      <FormCreateProduct isEdit producto={producto} isEditLoading={loading} productId={id}/>
    </div>
  );
};

export default ProductoEdit;

import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Loader from '../components/Loader/Loader';
import FormCreateProduct from '../components/FormProductos/FormCreateProduct';
import { getAllProducts, deleteProduct } from '../services/productsService';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [productosSearch, setProductosSearch] = useState([]);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const { data } = await getAllProducts();
      setProductos(data);
      setProductosSearch(data);
    };
    fetchProducts();
    setLoading(false);
  }, []);

  useEffect(() => {
    const search = productos.filter(prod => prod.name.toLowerCase().includes(term.toLowerCase()));
    setProductosSearch(search)
  }, [term, productos])

  const deleteProducto = async (id) => {
    setLoading(true);
    await deleteProduct(id);
    const filteredProducts = productos.filter(
      (producto) => producto._id !== id
    );
    setProductos(filteredProducts);
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin</h1>
      <button
        className="btn btn-primary my-3"
        onClick={() => setCreateProduct(!createProduct)}
      >
        {createProduct ? 'Ver Tabla' : 'Agregar producto'}
      </button>
      {createProduct ? (
        <FormCreateProduct
          setCreateProduct={setCreateProduct}
          productos={productos}
          setProductos={setProductos}
          setProductosSearch={setProductosSearch}
        />
      ) : (
        <Loader isLoading={loading}>
          <InputGroup className="mb-3 my-3">
            <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setTerm(e.target.value)}
            />
          </InputGroup>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Actiones</th>
              </tr>
            </thead>
            <tbody>
              {productosSearch.map((producto, index) => (
                <tr>
                  <td>{++index}</td>
                  <td>{producto.name}</td>
                  <td>{producto.price}</td>
                  <td>{producto.categories?.name}</td>
                  <td>
                    <Button
                      type="button"
                      className="mx-2"
                      variant="danger"
                      onClick={() => deleteProducto(producto._id)}
                    >
                      D
                    </Button>
                    <Button
                      type="button"
                      className="mx-2"
                      variant="warning"
                      onClick={() =>
                        navigate(`/admin/edit/product/${producto._id}`)
                      }
                    >
                      E
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Loader>
      )}
    </div>
  );
};

export default Admin;

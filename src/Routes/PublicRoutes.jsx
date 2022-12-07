import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
// import Footer from '../components/Footer/Footer'
import NotFound from '../pages/NotFound';
import Details from '../pages/Details';
import PrivateRoutes from './PrivateRoutes';
import Admin from '../pages/Admin';
import VerifyAccount from '../pages/VerifyAccount';
import { useEffect } from 'react';
import { getLocalStorage } from '../utils/localStorageHelper';
import { ActionTypes, useContextState } from '../context/contextState';
import ProductoEdit from '../pages/ProductoEdit';

const PublicRoutes = () => {
  const { setContextState, contextState } = useContextState();

  useEffect(() => {
    const userData = getLocalStorage('user');
    if (userData) {
      setContextState({ type: ActionTypes.SET_USER_DATA, value: userData });
    }
    // if (userData && !contextState.userData.isVerified) {
    //   navigate('/verify-account')
    // }
  }, []);
  return (
    <>
      <Navbar title="Rolling Code <>" />
      {/* En react-router v5 Routes = Switch */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:name" element={<Details />} />
        <Route
          path="/admin"
          exact
          element={
            // <PrivateRoutes>
            <Admin />
            // </PrivateRoutes>
          }
        />
        <Route
          path="/admin/edit/product/:id"
          exact
          element={
            // <PrivateRoutes>
            <ProductoEdit />
            // </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default PublicRoutes;

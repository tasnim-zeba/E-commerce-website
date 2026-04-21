import React, {Fragment, useEffect} from 'react';
import {CgMouse} from "react-icons/cg";
import "./Home.css"
import Product from "./Product.js"
import MetaData from "../layout/MetaData.js";
import {getProducts} from "../../actions/productAction.js";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from "react-alert";


function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector((state) => state.products);
    useEffect(() => {
        if (error) {
           return alert.error(error);
        }
        dispatch(getProducts());
    }, [dispatch, error]);
  return (
    <>
        {loading ? <Loader /> : <Fragment>
        <MetaData title="Home" />
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse />
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
            {products && products.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    </Fragment>}
    </>
    
  );
};

export default Home;
import React, { Fragment, useEffect } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { Meta, useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useState } from 'react'
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData'

const categories = [
    "Laptop",
    "Phone",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 250000]);
    const [category, setCaterogy] = useState("");
    const [priceCommitted, setPriceCommitted] = useState([0, 250000]); //only updates on mouse release
    const [ratings, setRatings] = useState(0);



    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    const priceCommittedHandler = (event, newPrice) => {
        setPriceCommitted(newPrice); //triggers useEffect only when user releases slider
        setCurrentPage(1);          // reset to page 1 on new filter
    };
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);

   
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, currentPage, priceCommitted, category, ratings));

    }, [dispatch, keyword, currentPage, priceCommitted[0], priceCommitted[1], category, ratings, error, alert]);


  return (
    <>
        {
            loading?<Loader/>: <Fragment>
                <MetaData title="PRODUCTS -- ECOMMERCE" />
                <h2 className='productsHeading'>Products</h2>
                <div className='products'>
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        onChangeCommitted={priceCommittedHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={250000}
                    />
                    <Typography>
                        Categories
                    </Typography>
                    <ul className='categoryBox'>
                        {categories.map((category) => (
                            <li
                                className='category-link'
                                key={category}
                                onClick={() => {
                                    setCaterogy(category);
                                }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => setRatings(newRating)}
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                            valueLabelDisplay='auto'
                        />
                    </fieldset>
                </div>

                {resultPerPage < productsCount && (<Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />)}

            </Fragment>
        }
    </>
  )
}

export default Products

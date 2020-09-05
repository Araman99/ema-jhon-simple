import React from 'react';
import { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
            const savedCart = getDatabaseCart();
            const productKey = Object.keys(savedCart);
            const cartProducts = productKey.map( key => {
                const product = fakeData.find( pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
    },[]);

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
           <div className="product-container">
            {
                cart.map(pd =>  <ReviewItem 
                    removeProduct ={removeProduct}
                    key={pd.key}
                    product= {pd}></ReviewItem>)
            }
            { thankyou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button 
                    onClick={handlePlaceOrder}
                    className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
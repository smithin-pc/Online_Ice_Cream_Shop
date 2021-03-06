import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems, selectCartItemsCount, selectCartItemsTotal } from '../../redux/cart/cart.selector';
import Cart from '../../components/cart/cart.component'
import { selectCurrUser } from "../../redux/user/user.selector";

const CartPage = ({cartItems, cartTotal,itemCount}:any)=>
    (
        <div>
            <Cart />
        </div>
    );



const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartItemsTotal,
    itemCount: selectCartItemsCount,
    currUser : selectCurrUser,
});

export default connect(mapStateToProps)(CartPage);
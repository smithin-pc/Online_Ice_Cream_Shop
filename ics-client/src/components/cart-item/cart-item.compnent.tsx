import { connect } from 'react-redux';
import { clearItem, addItem, removeItem } from '../../redux/cart/cart.action';

import './cart-item.styles.scss';

const CartItem = ({ cartItem, clearItem, addItem, removeItem }: any) => {
    const { name, img, quantity, cost } = cartItem;

    return (
        <tr>
            <td data-th="Product">
                <div className="col-md-3 text-left">
                    <img src={`${img}`} alt={`${name}`} title={name} className="img-fluid d-none d-md-block rounded mb-2 shadow" />
                    <p className="item-name">{name}</p>
                </div>
            </td>
            <td data-th="Price">${cost}</td>
            <td>
                <div className='quantity-custom'>
                    <div className='arrow' onClick={() => removeItem(cartItem)}>&#8722;    </div>
                    <span className='value'>     {quantity}    </span>
                    <div className='arrow' onClick={() => addItem(cartItem)}> &#43;</div>
                </div>
            </td>
            <td>
                <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
            </td>

        </tr>
    );
};

const mapDispatchToProps = (dispatch: (arg0: { type: any; payload: any; }) => any) => ({
    clearItem: (item: any) => dispatch(clearItem(item)),
    addItem: (item: any) => dispatch(addItem(item)),
    removeItem: (item: any) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CartItem);
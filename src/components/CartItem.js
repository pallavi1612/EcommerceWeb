import React from 'react'
import FormatPrice from "../Helpers/FormatPrice";
import CartAmmountToggle from './CartAmmountToggle';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';

const CartItem = ({id ,name, color , price , image  , amount}) => {

    const{removeItem , setDecrease , setIncrement} = useCartContext();
    
  return (
    <div className='cart-heading grid grid-five-column'>
         {/* Item */}
        <div className="cart-image--name">
            <div>
                <figure>
                    <img src={image} alt={id} />
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <div className="color-div">
                    <p>color:</p>
                    <div className="color-style" style={{ backgroundColor : color , color : color }}></div>
                </div>
            </div>
        </div>

        {/* Price */}
        <div className="cart-hide">
            <p>
                <FormatPrice price={price}/>
            </p>
        </div>

         {/* Quantity */}
        <CartAmmountToggle amount={amount} setDecrease={()=>setDecrease(id)} setIncrease={()=>setIncrement(id)}/>

         {/* Subtotal */}
        <div className="cart-hide">
            <p>
            <FormatPrice price={price * amount}/> 
            </p>
        </div>

         {/* Remove*/}
        <div>
            <FaTrash className="remove-icon" onClick={()=>removeItem(id)}/>
        </div>
    </div>
  )
}

export default CartItem
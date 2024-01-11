import { createContext , useContext , useEffect, useReducer } from "react";
import reducer from '../Reducers/cartReducer';


const CartContext = createContext();

  const getLocalData=()=>{
     let localData = localStorage.getItem("pallaviStore");
     const parsedData = JSON.parse(localData);
     if(!Array.isArray(parsedData)) return [];
     return parsedData;
 }

const initialState ={
    cart : getLocalData() ,
    total_item :"",
    total_price :"",
    shipping_fee:""
}


const CartProvider =({children})=>{

    const [state , dispatch] = useReducer(reducer , initialState)

    const addToCart =(id , color , amount , product)=>{
        dispatch({type:"ADD-TO-CART" ,payload : {id , color , amount , product} })
     }

     const removeItem =(id)=>{
        dispatch({type:"REMOVE_ITEM" , payload : id})
     }

    //add data to local storage

     useEffect(() => {
      dispatch({type:"UPDATE_CART_ITEM"})
       localStorage.setItem("pallaviStore", JSON.stringify(state.cart))
     }, [state.cart])
     
     //To clear cart

     const clearCart=()=>{
        dispatch({type:"CLEAR_CART"})
     }

     //increment and ddecrement

     const setDecrease=(id)=>{
       dispatch({type:"SET_DECREASE" , payload: id})
     }
     const setIncrement=(id)=>{
       dispatch({type:"SET_INCREMENT" , payload: id})
     }

     return (
        <CartContext.Provider value={{...state , addToCart , removeItem , clearCart , setDecrease , setIncrement}}>
            {children}
        </CartContext.Provider>
     )
}

const useCartContext =()=>{
    return useContext(CartContext);
}
export {CartProvider ,useCartContext};
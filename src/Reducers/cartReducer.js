


const cartReducer = (state , action) => {
   if(action.type ==="ADD-TO-CART"){
    let {id , color, amount , product } = action.payload;

    //Tacle with existing product

    let existingProduct = state.cart.find((curItem)=> curItem.id === id + color)
     
    if(existingProduct){
       let updatedProduct = state.cart.map((curElem)=>{
          if(curElem.id === id + color){
            let newAmount = curElem.amount + amount;
            if(newAmount >= curElem.max){
              newAmount = curElem.max;
            }
            return{
              ...curElem,
              amount: newAmount
            }
          }else{
           return curElem;
          }
       })
       return {
        ...state , 
        cart : updatedProduct,
       }
       
    }else{
    let cartProduct ;
    cartProduct ={
      id: id + color,
      image : product.image[0].url,
      max : product.stock,
      amount ,
      color:product.color , 
      name :product.name,
      price:product.price
    }
    return{
      ...state,
      cart :[...state.cart , cartProduct],
    }
   }
  }

   if(action.type ==="REMOVE_ITEM"){

    let updatedCart =state.cart.filter((curItem)=> curItem.id !== action.payload)
    return {
      ...state , 
      cart : updatedCart,
    }
   }

   if(action.type === "CLEAR_CART"){
    return{
      ...state ,
      cart :[]
    }
   }

   if(action.type === "SET_DECREASE"){
    let updatedProduct = state.cart.map((curElem)=>{
        if(curElem.id === action.payload){
          let newAmount = curElem.amount -1;
          if(newAmount <= 1){
            newAmount =1;
          }
          return{
            ...curElem ,
            amount : newAmount,
          }
        }else{
          return curElem;
        }
    })
    return{
      ...state ,
      cart : updatedProduct
    }
   }
  
   if(action.type === "SET_INCREMENT"){
    let updatedProduct = state.cart.map((curElem)=>{
      if(curElem.id === action.payload){
        let newAmount = curElem.amount + 1;
        if(newAmount >= curElem.max){
          newAmount = curElem.max;
        }
        return{
          ...curElem , 
          amount : newAmount
        }
      }else{
        return curElem;
      }
    })
    return{
      ...state ,
      cart : updatedProduct
    }
   }

   if(action.type === "UPDATE_CART_ITEM"){
    let updatedItemVal = state.cart.reduce((initialVal , curElem)=>{
        let {amount} = curElem;

        initialVal = initialVal + amount;
        return initialVal;
    },0)
   
   return{
    ...state , 
    total_item : updatedItemVal
   }
  }
  return state;
  }
  

export default cartReducer
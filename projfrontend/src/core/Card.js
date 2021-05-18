import React, {useState, useEffect} from 'react'
import ImageHelper from './helper/ImageHelper'
import { addItemtoCart, removeItemFromCart } from './helper/cartHelper';
import {Redirect} from 'react-router-dom'

const Card = ({product, addtoCart = true, removefromCart=false, setReload =f => f, reload = undefined}) => {


  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)


  const addToCart = () => {
    addItemtoCart(product, () => setRedirect(true))
  }

  const performRedirect = (redirect) => {
    if(redirect) {
      return <Redirect to= "/cart" />
    }
  }


  const cartTitle = product ? product.name : "a photo from pexels"
  const cartDescription = product ? product.Description : "Description"
  const cartPrice = product ? product.price : "29"

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
              onClick={addToCart}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
      )
    )

  }

  const showRemoveFromCart = (removefromCart) => {
    return (
      removefromCart && (
        <button
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
      )
    )

  }



  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          {performRedirect(redirect)}
          <ImageHelper product = {product}/>
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">Rs. {cartPrice} </p>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addtoCart)}

          </div>
          <div className="col-12">
            {showRemoveFromCart(removefromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Card

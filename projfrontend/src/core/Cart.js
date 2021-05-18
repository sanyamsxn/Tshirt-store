import React, {useState, useEffect } from 'react'
import "../styles.css"
import Base from "./Base"
import Card from "./Card"
import loadCart from "./helper/cartHelper"
import PaymentB from './Paymentb'

const Cart = () => {
    
    const [products ,setProducts] = useState([])
    const [ reload, setReload] = useState(false)
    
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])


    const loadAllProducts = products => {
        return (
            <div>
                <h2> This section is going to load Products</h2>
                {products.map((product, index) => {
                   return (
                    <Card 
                    key={index}
                    product={product}
                    removefromCart = {true}
                    addtoCart = {false} 
                    setReload = {setReload}
                    reload = {reload} />
                   )
                })}
            </div>
        )
    }

    const loadCheckOut = () => {
        return (
            <div>
                <h2> This section is going to Show the payment</h2>
                <br/>
                <br/>
            </div>
        )
    }
    

    const EmptyCartMsg = () => {
        return (
            <div>
                <h2> This section is going to load Products</h2>
                <br/>
                <br/>
                <h2 className="text-danger"> Your Cart is Empty</h2>
            </div>
            
        )
    }

    return (
        <Base title = "Cart Page" description= "Ready to Order some Products?">
            <div className = "row text-center ">
                <div className="col-6">{products.length > 0 ? loadAllProducts(products) : EmptyCartMsg()}</div>
                <div className="col-6">
                    {loadCheckOut()}
                    <PaymentB products={products} setReload={setReload}/>
                </div>
            </div>
        </Base>
    )
        
    
}

export default Cart
import React, {useState, useEffect} from 'react'
import {loadCart, cartEmpty} from "./helper/cartHelper"
import {withRouter} from "react-router-dom"
import {getmeToken, processPayment} from "./helper/paymentbhelper"
import {createOrder} from "./helper/orderHelper"
import {isAuthenticated} from "../auth/helper"
import DropIn from "braintree-web-drop-in-react"


const PaymentB = ({history, products, setReload= f => f, reload= undefined}) => {

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token  = isAuthenticated() && isAuthenticated().token
    
    const [info, setInfo] = useState({
        loading : false,
        success : false,
        clientToken : null,
        error:"",
        getaRedirect: false,
        instance: {}   // this automatically fills up
    })

    const getToken = (userId, token) => {
        getmeToken(userId, token).then(info=>{
            console.log(info)        
            if(info.error) {
                setInfo({...info, error: info.error})
            }else {
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    
    const successMessage = () => {
        if(info.success) {
            return (
                <h4 className="text-success">Payment Successfull!</h4>
            )
        }
    }

    const performRedirect = () => {
        if(info.getaRedirect) {
            setTimeout(() => {
                history.push('/Home')
            },2000)
        }
    }


    
    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken!==null && products.length>0   ?(
                    <div>
                        <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className = " btn btn-block btn-success" onClick={onBuy}>Buy</button>
                    </div>
                    
                ) : ( <h3> Add something to cart</h3>)}
            </div>
        )
    }


    
    const onBuy = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount : getAmount()
            }
            processPayment(userId, token, paymentData)
                .then(response => {
                    console.log(response)
                    setInfo({...info, success: response.success, loading:false, getaRedirect:true})
                    console.log("Payment Successful")
            

                    const orderData = {                      //  creating order data
                        products: products,
                        transaction_id : response.transaction.id,   // coming from the response we get after process payment
                        amount : response.transaction.amount
                    }

                    createOrder(userId, token, orderData)   //  passing these order data in our method
                    cartEmpty(()=>{
                    })
                    setReload(!reload)
                    })
                .catch(error => {
                    setInfo({loading:false, success:false})
                    console.log("Payment Failed")
                })
        })
    }

    const getAmount = () => {
        let amount = 0 
        products.map(p => {
            amount= amount+p.price
        })
        return amount
    }


    return (
        <div>
            <h3> Total Bill : {getAmount()} </h3>
            {showbtdropIn()}
            {successMessage()}
            {performRedirect()}
        </div>
    )
}

export default withRouter(PaymentB)
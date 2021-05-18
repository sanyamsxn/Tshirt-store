import React from 'react'
import Base from '../core/Base'
import {isAuthenticated} from "../auth/helper"
import {Link} from "react-router-dom"

const AdminDashBoard = () => {

    // deconstructing user from isAuthenticated first and then from user we are grabbing name , email so we can directly 
    // use them
    const {user : {name, email, role}} = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className = "card">
                <h4 className = "card-header bg-dark text-white"> Admin Navigation </h4>
                    <ul className = "list-group">
                        <li className = "list-group-item">
                            <Link to="/admin/create/category" className = "nav-link text-secondary font-weight-bold"> Create Categories</Link>
                        </li>
                        <li className = "list-group-item">
                            <Link to="/admin/categories" className = "nav-link text-secondary font-weight-bold"> Manage Categories</Link>
                        </li>
                        <li className = "list-group-item">
                            <Link to="/admin/create/product" className = "nav-link text-secondary font-weight-bold"> Create Product</Link>
                        </li>
                        <li className = "list-group-item">
                            <Link to="/admin/products" className = "nav-link text-secondary font-weight-bold"> Manage Products</Link>
                        </li>
                        <li className = "list-group-item">
                            <Link to="/admin/orders" className = "nav-link text-secondary font-weight-bold"> Create Orders</Link>
                        </li>
                    </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header"> Admin Info.</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2"> Name: </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2"> Email: </span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger">Admin Area</span>
                    </li>
                      
                </ul>
            </div>
        )
    }


    return (
        <Base title="Welcome to Admin Area" description = "Manage all your order from here"
            className = "container bg-success p-4">
            <div className="row">
                <div className="col-3"> {adminLeftSide()} </div>
                <div className = "col-9"> {adminRightSide()} </div>
            </div>
            
            
            
        </Base>
    )
}


export default AdminDashBoard
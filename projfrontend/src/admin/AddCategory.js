import React, {useState} from "react"
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper"
import {Link, withRouter} from "react-router-dom"
import {createCategory} from "../admin/helper/adminapicall"

const AddCategory = ({history}) => {


    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [redirect, setRedirect] = useState(false)


    const {user, token} = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard"> Go to DashBoard</Link>
            </div>
        )
    }

    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request fired
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true)
            } else {
                setError("")
                setSuccess(true)
                setRedirect(true)
                setName("")          // Once submit is pressed i want to clear the fields
            }
        })
    }



    const successMessage = () => {
        if(success) {
            return (
                <h4 className="text-success">Category created Successfully!</h4>
            )
        }
    }
    const WarningMessage = () => {
        if(error) {
            return (
                <h4 className="text-danger">Failed to Create!</h4>
            )
        }
    }


    const performRedirect = () => {
        if(redirect) {
            setTimeout(() => {
                history.push('/admin/dashboard')
            },2000)
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    
                    <p className="lead">Enter the Category</p>
                    <input type="text"
                    className ="form-control my-3"
                    onChange = {handleChange}
                    value = {name}
                    required
                    placeholder="For Ex. Summer"/>
                    <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
                </div>
            </form>
        )

    }
    return (
        <Base title= "Create a Category" description = "Add a new category for store" className = "container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {WarningMessage()}
                    {myCategoryForm()}
                    {performRedirect()}
                    {goBack()}
                </div>
            </div>
        </Base>
        )
    
}


export default withRouter(AddCategory)
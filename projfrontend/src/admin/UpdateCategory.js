import React, {useState, useEffect} from "react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth/helper/index"
import {getCategory, updateCategory} from "../admin/helper/adminapicall"




const UpdateCategory = ({match}) => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();


    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard"> Go to DashBoard</Link>
            </div>
        )
    }


    const preload = (categoryId) => {
        getCategory(categoryId).then( data => {
            if(data.error) {
                setError(true)
            } else {
                setName(data.name)   
            }
        })  
    }

    useEffect (() => {
        preload(match.params.categoryId)
    }, [])

    
    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }    
    

    const updationForm = () => {
        return (
            <form>
                <div className="form-group">
                    
                    <p className="lead">Enter the Category</p>
                    <input type="text"
                    className ="form-control my-3"
                    placeholder = "For Ex. Summer"
                    value = {name}
                    onChange = {handleChange}
                    required/>
                    <button onClick = {onSubmit} className="btn btn-outline-info">Update the Category</button>
                </div>
            </form>
        )

    }


    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)
        console.log(name)
        updateCategory(match.params.categoryId, user._id, token, {name})
        
        .then(data => {
            console.log(data)
            if(data.error) {
                setError(true)
            } else {
                setError("")
                setSuccess(true)
                setName("")          // Once submit is pressed i want to clear the fields
            }
        })
   }

   const successMessage = () => {
    if(success) {
        return (
            <h4 className="text-success">Category Updated Successfully!</h4>
        )
    }
}
const WarningMessage = () => {
    if(error) {
        return (
            <h4 className="text-danger">Failed to Update!</h4>
        )
    }
}



    return (
        <Base title= "Update a Category" description = "Add a new category for store" className = "container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">  
                    {successMessage()}   
                    {WarningMessage()}
                    {updationForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
        
    )
}

export default UpdateCategory
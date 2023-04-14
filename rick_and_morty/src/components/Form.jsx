import {useState} from "react"
import validation from "./validation"

const Form = ({login})=>{


    const [userData, setUserData] = useState({
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event)=>{
setUserData({
    ...userData,
    [event.target.name] :event.target.value
})
setErrors(validation({
    ...userData,
    [event.target.name] :event.target.value

}))
    }

    
    const handleSubmit = (event)=>{
   event.preventDefault();
        login(userData);

    }

    return(
        <form onSubmit = {handleSubmit}>

        <label htmlFor="username">USERNAME</label>
        <input type= "text" name="username" value = {userData.username} onChange={handleChange}></input>
{errors.username && <p>{errors.username}</p>}

        <label htmlFor="password">PASSWORD</label>
        <input type= "password" name="password" value = {userData.password} onChange={handleChange} ></input>
        {errors.password && <p>{errors.password}</p>}

        <button> SUBMIT </button>


        </form>
    )
}

export default Form;
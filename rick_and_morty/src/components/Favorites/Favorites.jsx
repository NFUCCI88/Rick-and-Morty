import { useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import { filterCards, orderCards } from "../redux/actions"

const Favorites = () => {

    const {myFavorites} = useSelector(state => state)
    const dispatch = useDispatch()

    const HandleOrder = (event)=>{
      dispatch(orderCards(event.target.value))
    }

    
    const HandleFilter = (event)=>{
        dispatch(filterCards(event.target.value))
      }

return (
    <div>  

        <select onChange = {HandleOrder}>
            <option value = "order" disabled = "disabled"> Order By</option>
          <option value = "Ascendente"> Ascendente</option>
          <option value = "Descendente">Descendente</option>
        </select>

        <select onChange = {HandleFilter}>
        <option value = "filter" disabled = "disabled"> Filter By</option>
           <option value="Male"> Male</option>
           <option value="Female"> Female</option>
           <option value="Genderless"> Genderless</option>
           <option value="unknown"> unknown</option>


        </select>


        {myFavorites.map((character) => {
          return(
               <div>
  
                   <div>
<Link to={`/detail/${character.id}`}>
         <h2>{character.name}</h2>
         </Link>
    
         <h2> {character.species}</h2>
         <h2>{character.gender}</h2>
         
         <img src={character.image} alt='' />
</div>
  
      </div>

   
)
        })}
 


    </div>
)
}

export default Favorites
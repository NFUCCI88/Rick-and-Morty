import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addfavorite,deleteFavorite} from "./redux/actions";
import { useState, useEffect} from "react";

export default function Card({id, name,status,species, gender,origin,image,onClose}) {
   const dispatch = useDispatch();
   const myFavorites = useSelector(state =>state.myFavorites);
   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);
   
   const handleFavorite = ()=>{
   if(isFav){
   setIsFav(false);
   dispatch(deleteFavorite(id))
}
else {
   setIsFav(true);
   dispatch(addfavorite({id, name,status,species, gender,origin,image,onClose})) //aca le paso todo porque hice destructuring, si no iria props como dice el readme
}
   }
   return (
      <div>
{
   isFav ? (
      <button onClick={handleFavorite}>❤️</button>
   ) : (
      <button onClick={handleFavorite}>🤍</button>
   )
}
         <Link to={`/detail/${id}`}>
         <h2>{name}</h2>
         </Link>
         <button onClick={()=>onClose(id)}>X</button>
         <h2>{id}</h2>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin}</h2>
         <img src={image} alt='' />
      </div>
   );
}

import { Link, useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
const Ao = () => {
    const navigate = useNavigate ();
    return ( 
        <DefaultLayout  className="container">
        <div className="row">
        <h1>Ao</h1>

        <button onClick={()=>navigate("/phukien")}>Quay trở về home</button>
         </div>
         </DefaultLayout>
        
     );
}
 
export default Ao;
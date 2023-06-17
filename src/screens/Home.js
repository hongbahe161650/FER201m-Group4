import DefaultLayout from "../layouts/DefaultLayout";
import data from "../data/database.json"
import "../styles/Home.css"
import { useEffect, useState } from "react";
const Home = () => {
    const product = data.product.filter((item, index) => {
        return index >=0 && index <= 3
    })
    return ( 
        <DefaultLayout  className="container">
        <h2>DANH MỤC NỔI BẬT</h2>
        <div className="bestSeller">
        {product.map((item,index) => {
            return (<div key={index} className="itemProduct">
                <img src={item?.img}/>
                <h5>{item?.name}</h5>
                <p>{item?.price}</p>
            </div>)
        })}
        </div>
         </DefaultLayout>
        
     );
}
 
export default Home;
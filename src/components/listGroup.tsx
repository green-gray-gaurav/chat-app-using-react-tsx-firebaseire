import { Fragment } from "react";
import { useState } from "react";

interface props{
    header :string
    items : string[]
}

function ListGroup({header , items}:props){
  
    //use state hook
    var [Selected , SetSelected] = useState(-1)

    return (
         <Fragment>
            {items.length == 0 ? <h1>NO ELEM IN THE LIST</h1>: <h1>{header}</h1> }
            <ul className="list-group">
            {items.map((item , index)=>
            <li className= {Selected == index ? "list-group-item active" : "list-group-item" } 
                key={index} 
                onClick={()=>{SetSelected(index);}}>
                {item}

                </li>)}
            </ul>
        </Fragment>

    );
}

export default ListGroup
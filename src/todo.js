import React, { useState, useEffect } from 'react';
import "./style.css";

            // to get the things store in local storage data
    const getlocaldata=()=>{                // this function is passed in usestate  setItems
    const lists=localStorage.getItem("todolist")  // here in this key is passed 
    if(lists){                                    // if there is some data in local storage so it  will return 
        return JSON.parse(lists);
    }
    else{
        return [];
    }
    }

        const Todo = () => {
            const [inputdata,setInputdata]=useState("")
            // const [items,setItems]=useState([]);
            const [items,setItems]=useState(getlocaldata());
            const[edititem1,setEdititem1]=useState("");
            const[toggle,setToggle]=useState(false);

            /// adding add function for  the function to br called when plus icon is been clicked
            const addItem=()=>{
                if(!inputdata){
                    alert("plz enter some todo items in the list");

                } 
                else if(inputdata && toggle) {        // there should be some data in input and toggle button should be true
                    setItems(
                        items.map((currelem)=>{
                            if(currelem.id===edititem1){
                                return {...currelem,name:inputdata};        // it will retrn all the previous values and the one which it matches the id it name value will be changed to  =new input data
                            }
                            return currelem;
                           

                        })
                    )
                    setInputdata("");
                    setEdititem1(null );
                    setToggle(false);

                }
                else{
                    const newitems={
                        id:new Date().getTime().toString(),     // this is created to get a unique id when we enter some data in input field
                        name:inputdata,
                    };
                    setItems([...items,newitems]);   // this will store the prevous value as well as current value
                    setInputdata("");
                }
        }
        // for editing the items in the list call through edit button
        const edititem=(id)=>{
            const item_edit=items.find((currelem)=>{
                return currelem.id===id;
            }) ;
            setInputdata(item_edit.name);
            setEdititem1(id);
            setToggle(true);

        }
        //   deleting the item from the todo list call through trash button

        const deleteItem=(id)=>{
        // in this we the returning the id of the element that is been click and that has to be remove from the list
            const updatedItem=items.filter((currelem)=>{
                return currelem.id !== id;
            });
            setItems(updatedItem);  
            // after deleteing we will pass the new list 

        }
            //  to remove all the elements from the list 
        const removeAll=()=>{
                setItems([]);           // passing an empty array so that no elements is been shown  in the todo list
        }
        // for storing values in local storage
        useEffect(()=>{
            localStorage.setItem("todolist" ,JSON.stringify(items));            //to store the data in the loccal storage
        },[items])

  return (
    <div classname='main-div'>
        <div className="child-div">
            <figure >
                <img src="./images/todo.svg" alt="todologo"></img>
                <figcaption>Add your list here</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder="✍ Add items" className='form-control'
                value={ inputdata} 
                onChange={(event)=>{setInputdata(event.target.value);}}  // this statement is very necessary to take input from the user without this the user input will not be taken
                />
                {toggle ?<i className="far fa-edit add-btn" onClick={addItem}></i>:<i className="fa fa-plus add-btn" onClick={addItem}></i>}
            </div>

            {/* show our items */}
            <div className="showItems">
                    {/* this is used to map each  item that is been type im input field */}
               { items.map((currelem) =>{
                return(
                    <div className="eachItem" key={currelem.id} >
                 {/* in the newitems object in the else part two objects are there id,name so to pass the name value we have written currelem.name     */}
                    <h3>{currelem.name}</h3>  
                   
             {/* passing currelem as the parameter because each  time the loop iterate the value of inputdata is been fetched */}
             {/* if we passed items as the parameter than its set value is an array and the output will be like appleapple,applemango.. */}
                    <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={()=>edititem(currelem.id)}></i>
                    <i className="fa fa-trash add-btn" onClick={()=>deleteItem(currelem.id)}></i>
                    </div>
                    
                </div>
                );
                // map function ends over here  we are using currelem as a parameter bcoz we are itearting items from the items array and above we have created an obejct passing id and name as an parameter and set it to setItems

                })}
                 

            </div>
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>check list</span></button> 
            </div>
        </div>
      
    </div>
  )
};

export default Todo

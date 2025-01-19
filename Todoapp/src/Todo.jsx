import React, { useEffect } from 'react';
import { useState } from 'react';


const getlocaldata = () => {
  const lists = localStorage.getItem("mytodolist")

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}
const Todo = () => {
  const [input, setinput] = useState("")
  const [content, setcontent] = useState(getlocaldata())
  const [editcontent, seteditcontent] = useState('')
  const [togglebutton, settogglebutton] = useState(false)

  // Content Add
  const addfunction = () => {
    if(!input){
      alert("enter the input first")
      return;
    }
    else if (input && togglebutton) {
      setcontent(
        content.map((data) =>{
          if(data.id === editcontent){
            return {...data , name:input}
          }
          return data;
        })
      )
      settogglebutton(false);
      setinput("");
      seteditcontent("");
    }
    else{
      const realcontent = {
        id: Date.now(),
        name:input
       }
       setcontent([...content, realcontent])
       setinput("")
       console.log(realcontent)
    }
  }
  // Edit Item 
  const editfunction = (index) => {
    const editdata = content.find((data) => {
      return data.id === index
    })
    setinput(editdata.name);
    seteditcontent(index);
    settogglebutton(true);
  }

  // Delete Item
  const deletefunction = (id) =>{
    const deletes = content.filter((data)=> data.id !== id )
    setcontent(deletes)
  }

  // Delete All Content
  const allclear = () => {
      setcontent([])
  }

  useEffect(() => {
    localStorage.setItem("mytodolist" , JSON.stringify(content));
  }, [content])
  

  return (
    <div className="main">
      <div className="heading">
        <h1>Add Your List Here ✌</h1>
      </div>

      <div className="input">
        <input className='inputs' type="text" placeholder="Enter the task..." value={input} onChange={(e) => setinput(e.target.value)} />
        {togglebutton ? (<button onClick={addfunction} className="add-btn">Edit</button>) : (<button onClick={addfunction} className="add-btn">Add</button>) }
      </div>

      <div className="content">
        {content.map((data) => (
          <div className="todo-item" key={data.id} >
          <span className="task">{data.name}</span>
          <button onClick={()=>editfunction(data.id)} className="edit-btn">✏</button>
          <button onClick={() =>deletefunction(data.id)} className="delete-btn">🗑</button>
        </div>
        ))}
      </div>

      <button onClick={allclear} className="checklist-btn">Check List</button>
    </div>
  );
};

export default Todo;

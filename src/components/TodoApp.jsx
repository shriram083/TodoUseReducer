import React, { useState, useReducer } from 'react';
import TodoInput from "./TodoInput";
import TodoList from './TodoList';;
import { v4 as uuidv4} from 'uuid';
import styles from '../styles/TodoApp.module.css';

const reducer = (list,action) => {
    switch(action.type){
        case "add":{
            return [...list,{name:action.name, id:action.id,isChecked:action.isChecked}]
        }
        case "delete":{
            console.log(list)
            let newList = list.filter((el)=>{
                return el!=action.todo
            })
            return newList
        }
    }
};


const TodoApp = () => {
  const [list,setList] = useReducer(reducer, []);

  const addNew = (newTodo) => {
    setList({ name:newTodo,
            id:uuidv4(),
            qty:1,
            isChecked:false,
            type:"add"})
  };

  const deleteTodo = (todoName) => {
    setList({todo:todoName,type:"delete"})
  }

  const chengeChecked = (index) => {
    let newList = list.map((el,i)=>{
      if(index==i)
      {
        el.isChecked=(!el.isChecked);
      }
      return (
        el
      );
    })
    setList(newList)
  };




  return (
    <div className={styles.mainBox}>
      <h1>My Todo App</h1>
      <TodoInput addNew={addNew}/>
      <TodoList 
          list={list}
          deleteTodo={deleteTodo}
          chengeChecked={chengeChecked}/>
    </div>
  )
}

export default TodoApp;
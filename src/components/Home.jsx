import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import todoicon from "../assets/ticon.gif";
import ToDo from "./ToDo";
import { db } from "./firebase";
import {
   query,
   collection,
   onSnapshot,
   updateDoc,
   doc,
   addDoc,
   deleteDoc,
   or,
} from "firebase/firestore";

const style = {
   bg: `h-screen w-screen p-4 bg-gradient-to-r from-cyan-500 to-blue-500 ...]`,
   container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md drop-shadow-md p-4 `,
   heading: ` text-3xl font-bold text-center text-gray-800 p-2  `,
   form: `flex justify-between text-xl `,
   input: `border p-2 w-full text-xl`,
   button: `border p-4  ml-2 bg-blue-500 text-slate-100 hover:bg-cyan-500`,
   count: `text-center p-2 font-bold`,
   icon: `rounded-lg ... border-4 border-emerald-300 hover:border-cyan-300 ...`,
};

function Home() {
   const [todos, settodos] = useState([]);
   const [input, setinput] = useState("");

   //Create todo
   const createTodo = async (e) => {
      e.preventDefault(e);
      //chack length
      if ((input.trim().length !== 0) == false) {
         alert("please enter a valid todo");
         // console.log("Input", input.trim().length !== 0);
         return;
      }
      await addDoc(collection(db, "todos"), {
         text: input,
         completed: false,
      });
      setinput("");
   };
   //Read todo from firebase
   useEffect(() => {
      const q = query(collection(db, "todos"));
      const unsubsctribe = onSnapshot(q, (QuerySnapshot) => {
         let todosArr = [];
         QuerySnapshot.forEach((doc) => {
            todosArr.push({ ...doc.data(), id: doc.id });
         });
         settodos(todosArr);
      });
      return () => unsubsctribe();
   }, []);

   //Update todo in firebase
   const toggleComplete = async (todo) => {
      await updateDoc(doc(db, "todos", todo.id), {
         completed: !todo.completed,
      });
   };
   //Delete todo
   const deleteTodo = async (id) => {
      await deleteDoc(doc(db, "todos", id));
   };

   return (
      <div className={style.bg}>
         <div className={style.container}>
            <div className="flex justify-center mb-8 bg-transparent">
               <img src={todoicon} alt="" className={style.icon} />
               <h3 className={style.heading}>ToDo App</h3>
            </div>

            <form onSubmit={createTodo} className={style.form}>
               <input
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  className={style.input}
                  type="text"
                  placeholder="Add Todo"
               />
               <button className={style.button}>
                  <AiOutlinePlus size={30} />
               </button>
            </form>
            <ul>
               {todos.map((todo, index) => (
                  <ToDo
                     key={index}
                     todo={todo}
                     toggleComplete={toggleComplete}
                     deleteTodo={deleteTodo}
                  />
               ))}
            </ul>
            {todos.length < 1 ? null : (
               <p className={style.count}>{`You have ${todos.length} todos`}</p>
            )}
         </div>
      </div>
   );
}

export default Home;

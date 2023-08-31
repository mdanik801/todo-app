import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
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
} from "firebase/firestore";

const style = {
   bg: `h-screen w-screen p-4 bg-gradient-to-r from-indigo-500 to-pink-500]`,
   container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md drop-shadow-md p-4 `,
   heading: ` text-3xl font-bold text-center text-gray-800 p-2`,
   form: `flex justify-between text-xl `,
   input: `border p-2 w-full text-xl`,
   button: `border p-4  ml-2 bg-purple-500 text-slate-100 hover:`,
   count: `text-center p-2 font-bold`,
};

function Home() {
   const [todos, settodos] = useState([]);
   const [input, setinput] = useState("");

   //Create todo
   const createTodo = async (e) => {
      e.preventDefault(e);
      if (input === " ") {
         alert("please enter a valid todo");
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
            <h3 className={style.heading}>ToDo App</h3>
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

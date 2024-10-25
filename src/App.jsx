import { useEffect, useState } from 'react'
import Navbar from './component/navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let TodoString  = localStorage.getItem("Todos")
    if(TodoString){
      let Todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos)
    }
  }, [])
  

  
  const savetoLS = (params) => {
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }

  const toggleFinished = ()=>{
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e,id)=>{
    let t = Todos.filter(i=>i.id===id)
    setTodo(t[0].Todo)
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLS()
  }
  const handleDelete = (e,id)=>{
    let conf = confirm("are you sure to delete this Todo");
    if (conf==true){ 
      let newTodos = Todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      savetoLS()
    }
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleAdd = ()=>{
    setTodos([...Todos,{id:uuidv4(), Todo,isCompeted:false}])
    setTodo("")
    savetoLS()
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].isCompeted = !newTodos[index].isCompeted;
    setTodos(newTodos)
    savetoLS()
  }
  

  return (
    <>
    <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /></head>
    <Navbar/>
    <div className="back w-full h-[calc(100vh-8vh)] lm:py-5 bg-[url('https://t3.ftcdn.net/jpg/05/88/07/50/360_F_588075097_r1ttVbY4i1Nh6OPdSGatzfP29xe7nTCb.jpg')] bg-no-repeat bg-cover">
    <div className="container lm:mx-auto backdrop-blur-3xl shadow-2xl lm:border-l lm:border-t lm:border-gray-300 shadow-[#958896] lm:rounded-xl p-4 h-[calc(100vh-8vh)] lm:h-auto w-full lm:w-[90vw] md:w-[50vw]">
      <h1 className='font-bold text-center text-xl hidden lm:block'>iTask - Manage your todo at one place</h1>
      <h1 className='font-bold text-center text-2xl block lm:hidden'>iTask</h1>
      <div className="addTodo my-5 flex flex-col gap-2">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input  onChange={handleChange} value={Todo} type="text" className='1/4 px-2 py-1 outline-none rounded-md' />
        <button className='bg-violet-800 hover:bg-violet-700 px-2 text-sm font-bold text-white py-1 rounded-md disabled:bg-violet-600' onClick={handleAdd} disabled={Todo.length<1}>Save</button>
      </div>
      <div className="heading flex  justify-between w-full">
        <h2 className='text-lg font-bold'>Your todo</h2>
      <label htmlFor="show" className='flex gap-2'>
      <input onChange={toggleFinished} id="show" type="checkbox" chacked={showFinished} />
      <h4 className='text-[14px] flex justify-center items-center'>Finished</h4>
      </label>
      </div>
        <div className="todos">

          {Todos.length===0 && <div className='m-5'>No Todo display</div>}
          {Todos.map(item=>{
          return (showFinished || !item.isCompeted) && <div key={item.id} className="todo flex justify-between w-full my-2">
            <div className='flex gap-2'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" chacked={item.isCompeted} id="" />
            <div className={item.isCompeted?'line-through':""}>{item.Todo}</div>
            </div>
            <div className="btn flex h-full gap-2">
              <button className='hidden lm:block bg-violet-800 hover:bg-violet-700 px-2 text-sm font-bold text-white py-1 rounded-md ml-4' onClick={(e)=>{handleEdit(e,item.id)}}>Edit</button>
              <button className='lm:hidden block  hover:text-violet-500 text-violet-800' onClick={(e)=>{handleEdit(e,item.id)}}><span class="material-symbols-outlined">
edit_note
</span></button>
              <button className='hidden lm:block bg-violet-800 hover:bg-violet-700 px-2 text-sm font-bold text-white py-1 rounded-md ' onClick={(e)=>{handleDelete(e,item.id)}}>Delete</button>
              <button className='lm:hidden block  hover:text-violet-500 text-violet-800' onClick={(e)=>{handleDelete(e,item.id)}}><span class="material-symbols-outlined">
delete
</span></button>
            </div>
          </div>
           })}
        </div>
    </div>
    </div>
    </>
  )
}

export default App

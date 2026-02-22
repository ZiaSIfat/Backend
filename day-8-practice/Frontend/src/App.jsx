import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  
  const [notes, setNotes] = useState([])

  function fetchNotes(){
    axios.get('https://backend-8viy.onrender.com/api/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })
  }

  function handleSubmit(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    axios.post('https://backend-8viy.onrender.com/api/notes',{
      title: title.value,
      description: description.value
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
   
  }

  function handleDelete(noteId){
    axios.delete('https://backend-8viy.onrender.com/api/notes/'+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])



  return (
    <>
    <form className='note-form' onSubmit={handleSubmit} >
      <input name='title' type="text" placeholder='Enter Title'/>
      <input name='description' type="text" placeholder='Enter Description'/>
      <button>Create Note</button>
    </form>
      <div className="notes">
        {
          notes.map(note=>{
           return  <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>{handleDelete(note._id)}}>Delete</button>
        </div>
          })
        }
        
      </div>
    </>
  )
}

export default App

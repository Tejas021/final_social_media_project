import React from 'react'
import {useState} from "react"
import {  userRequest } from '../../axios'
const AddPost = ({posts,setPosts,user}) => {
    
const [image, setimage] = useState(null)
const [newpost, setnewpost] = useState({caption:"",like:0,user:user.name,userId:user._id})

let F="http://localhost:8000/images/"

let fileName

const  submitFunction=async(e)=>{
    e.preventDefault()
console.log(image)
    if(image){
        const data = new FormData()
        fileName= Date.now() + image.name
        data.append("name",fileName)
        data.append("file",image)


        
            await userRequest.post("/api/upload",data).then(res=>res.data).then(res=>console.log(res)).catch(err=>console.log(err))
        
            await userRequest.post("add-post",{...newpost,imgUrl:F+fileName}).then(res=>res.data).then(res=>setPosts([...posts,res]))

    }



}


// const onPostSubmit =(e)=>{
// e.preventDefault();

// imageUpload()

// submitFunction()
// setnewpost({content:"",caption:"",like:"",user:"",imgUrl:""})
// }

    return (
        <div>
{console.log(newpost)}
        <form onSubmit={e=>submitFunction(e)}> 
            <h4 className="text-warning">ADDPOST</h4>
            {/* <input className="form-control" placeholder="content" value={newpost.content} onChange={e=>setnewpost({...newpost,content:e.target.value})}/> */}
            <input className="form-control" type="text" placeholder="caption" value={newpost.caption} onChange={e=>setnewpost({...newpost,caption:e.target.value})}/>
           
            {/* <input className="form-control" placeholder="likes" value={newpost.like} onChange={e=>setnewpost({...newpost,like:e.target.value})}/> */}
          
           <input type="file" onChange={e=>  setimage(e.target.files[0])} className="form-control" />


  {/* <button  onClick={e=>imageUpload(e)} className="btn btn-warning m-2">upload</button> */}
     <button className="btn btn-warning" type="submit" id="post-button">Post</button>
  <span class="sr-only">Loading...</span>

         
  </form>
           
        </div>
    )
}

export default AddPost

import React from 'react'
import { useContext,useState,useEffect } from 'react'

import {useParams} from "react-router-dom"
import Post from "../home/Post"
// import SearchModal from '../home/search/SearchModal'
import {UserContext} from "../../UserContext"

import "../Profile/Profile.css"
import ProfilePic from '../Profile/ProfilePic'
import { userRequest } from '../../axios'
const Profile1 = () => {
    const {user}=useContext(UserContext)
    const params = useParams();
    const [follow,setFollow]=useState(user.following.includes(params.id))
    const [posts,setPosts]=useState([])
   
    const [currentuser, setcurrentUser] = useState({"followers":[],"following":[]})

    
    useEffect(()=>{
        const fetchPosts=async()=>{
        //    const fetchposts=await fetch(`http://localhost:5000/getposts/${params.id}`,{
        //         method:"GET",
        //         headers:{"Content-type":"application/json"},
        //     }).then(res=>(res.json())).catch(error=>console.log(error))
        const fetchposts= await userRequest.get(`getposts/${params.id}`).then(res=>res.data)
            const final=await fetchposts
            setPosts(final)
        }
      fetchPosts()
    },[params.id])


    useEffect(() => {
        const getUser=async()=>{
           // fetch(`http://localhost:5000/user?userId=${params.id}`).then(res=>res.json())
            await userRequest.get(`user?userId=${params.id}`).then(res=>setcurrentUser(res.data))
        }
        getUser()

        
    }, [params.id,follow])

    

    useEffect(()=>{
        if(user.following.includes(params.id)){
            // console.log("sup",user.following.includes(params.id))
            setFollow(true)
        }
        else{
            setFollow(false)
        }
    },[user.following,params.id])

    const handleFollow=async(e)=>{
        e.preventDefault()
        // fetch(`http://localhost:5000/follow/${currentuser._id}`,{
        //     method:"post",
        //     headers:{"Content-type":"application/json"},
        //     body:JSON.stringify({userId:user._id})
        // }).then(res=>res.json()).then(res=>console.log(res))


        await userRequest.post(`follow/${currentuser._id}`,{userId:user._id}).then(res=>console.log(res.data))
        setFollow(true)
        // setUser({...user)
    }

    const handleUnfollow=async(e)=>{
        e.preventDefault()
        // fetch(`http://localhost:5000/unfollow/${currentuser._id}`,{
        //     method:"post",
        //     headers:{"Content-type":"application/json"},
        //     body:JSON.stringify({userId:user._id})
        // }).then(res=>res.json()).then(res=>console.log(res))
        await userRequest.post(`unfollow/${currentuser._id}`,{userId:user._id}).then(res=>console.log(res.data))
        setFollow(false)
    }
    // console.log(currentuser)
    return (
        <div>
     
          {/* <SearchModal/> */}
        <ProfilePic/>

         <h3 className="text-light text-center mt-3">{currentuser.name}</h3>
         <h5 className="text-warning text-center mb-5">{currentuser.department}</h5>

        
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                <h5 className="text-light ">Bio: <span className="text-warning">{currentuser.bio}</span></h5>
         <h5 className="text-light ">City: <span className="text-warning">{currentuser.city}</span></h5>
         <h5 className="text-light ">Email: <span className="text-warning">{currentuser.email}</span> </h5>
                </div>
                <div className="col-md-6  text-warning text-center row ">
                    <div className="col-md-3 col-6"><h3>{currentuser.followers.length}</h3>Followers</div>
                    <div className="col-md-3 col-6 "><h3>{currentuser.following.length}</h3>Following</div>
                   
                   
                    {(user._id!==currentuser._id)?follow?<button className="btn btn-outline-warning" onClick={e=>handleUnfollow(e)}>Following</button>:
                     <button className="btn btn-warning" onClick={e=>handleFollow(e)}>Follow</button>:<></>
                    }
                   
                    
                    </div>

            </div>
        </div>
     
        

        
        <div className="container homecontainer">
            
        
        
        <h3 className="text-warning"> Posts:</h3>
        {posts.map(post=><Post key={post._id} user_id={user._id} created_At={post.createdAt} likedPeople={post.likedPeople} post_id={post._id} Name={post.user} Caption={post.caption} friend_id={post.userId} likes={post.like} img={post.imgUrl}/>)}

        </div>
      
        </div>
    )
}

export default Profile1


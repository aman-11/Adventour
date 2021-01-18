import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userContext} from '../App'
import M from 'materialize-css'
const Navbar = ()=>{

    const searchmodal = useRef(null)
    const [search,setSearch] = useState('')
    const {state,dispatch} = useContext(userContext)
    const [userDetails,setUserDetails] = useState([])
    const history = useHistory()

    const renderlist = ()=>{
      if(state){
           
          return [
            <li key="2"><Link to="/profile" style={{fontWeight:'600', fontSize:'20px', color:'white'}}>Profile</Link></li>,
            <li key="3"><Link to="/post" style={{fontWeight:'600', fontSize:'20px', color:'white'}}>Post</Link></li>,
            <li key="4"><Link to="/myfollowingposts" style={{fontWeight:'600', fontSize:'20px', color:'white'}}>My Following</Link></li>,
            <li key="5"><button className="btn waves-effect waves-light #01579b green darken- " 
            onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
            window.location.reload()
            }}
            > 
            Logout
          </button>

          </li>
          ]
      }else{
        return [
        <li key="6" style={{color:'white'}}><Link to="/signup" style={{fontWeight:'600', fontSize:'20px', color:'white'}}>Sign Up</Link></li>,
        <li key="7"><Link to="/signin" style={{fontWeight:'600', fontSize:'20px', color:'white'}}>Sign In</Link></li>
        ]
      }
    }





    return(
    <nav style={{background:'#FF7700'}}>
    <div className="nav-wrapper"  >
      <Link to={state?"/":"/signin"} className="brand-logo left" style={{fontWeight:'600', fontSize:'30px', color:'white'}}>Adventour</Link>
      <ul id="nav-mobile" className="right" style={{marginRight:'50px'}}>
        {renderlist()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar
import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup =()=>{
        const history = useHistory()
        const [name,setName] = useState("")
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [image,setImage] = useState("")
        const [url,setUrl] = useState(undefined)
        useEffect(()=>{
            if(url){
                uploadfields()
            }
        },[url])
        const uploadpic =()=>{
            const data =new FormData()
        data.append("file",image)
        data.append("upload_preset","sociomeet")
        data.append("cloud_name","cloud-storage-813")

        fetch("https://api.cloudinary.com/v1_1/cloud-storage-813/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        }).catch(e=>{
            console.log(e)
        })
        }

        const uploadfields = () =>{
            if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name))
            {
                return M.toast({html:"Please use only alphabets for Name",classes:'#e53935 red darken-1 rounded'})      
            }
            else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                return M.toast({html:"Please use a valid Email Address",classes:'#e53935 red darken-1 rounded'})
            }
            else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password))
            {
                return M.toast({html:"Please use a password between 8-15 characters having atleast 1[0-9],1[A-Z],1[a-z]&1[@#$%^*&~]",classes:'#e53935 red darken-1 rounded'})
            }
            fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
                if(data.error){
                    M.toast({html:data.error,classes:'#e53935 red darken-1 rounded'})
                }
                else{
                    M.toast({html:data.message,classes:'#43a047 green darken-1 rounded'})
                    history.push('/signin')
                }
            }).catch(error=>{
                console.log(error)
            })

        }

        const PostData = () =>{
            if(image){
                uploadpic()
            }else{

                    uploadfields()
            }
            /*Form validation using regex js*/
            
        }
        return (
        <div className="mycard-signup">
            <div className="card signup-card input-field">
                <h3>New User</h3>
                <h6>Signup to see travel blog</h6>
                <div className="input-field col">
                <input
                    id="icon_prefix_2"
                    type="text"
                    className="validate"
                    placeholder = "Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                </div>
                

                <div className="input-field col">
                <input
                    id="icon_prefix_0"
                    type="text"
                    className="validate"
                    placeholder = "Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                <div className="input-field col">
                <input
                    id="icon_prefix_1"
                    type="password"
                    className="validate"
                    placeholder = "Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                
                />
                </div>
                <div className="file-field input-field">
                    
                </div>
                  <button className="btn waves-effect waves-light  "  style={{background:'tomato'}}
                  onClick={()=>PostData()}
                  >Sign Up
                </button>
                <h6 >
                    Already have an account?
                    <Link to = "./signin"  >Sign in</Link>
                </h6>

            </div>
        </div>
    )
}

export default Signup
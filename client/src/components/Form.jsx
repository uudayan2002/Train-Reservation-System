import React, { useState } from "react";
import { ChakraProvider} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText
  } from '@chakra-ui/react'
  import { Button} from '@chakra-ui/react'
  import {NavLink} from 'react-router-dom';
  import { useRef } from "react";
  import { useToast } from '@chakra-ui/react'
  import { addUser } from "../service/api.js";


const Form = () =>{


    const toast = useToast()

    const [user, setUser] = useState({
        name:'',
        mobile:'',
        image:'',
        email:'',
        password:''
    })


    const onValueChange = (e) =>{
        setUser({...user, [e.target.name] : e.target.value});
        console.log(user)
    }


    const fileData = (e) =>{
        setUser({...user, image : e.target.files[0]});
    }


    const nameValid = useRef(null);
    const validMobile = useRef(null);
    const validEmail = useRef(null);
    const validPassword = useRef(null);
    const imageValid = useRef(null);


    const submitData = async(e) =>{
        e.preventDefault()
        const {name, mobile , image, email, password} = user
        if(!name){
            document.getElementById('nameValid').style.display = 'block';
            nameValid.current.focus()
        }else if(!mobile){
            alert("Enter Your Mobile Number !")
            validMobile.current.focus()
        }else if(mobile.length !== 10){
            alert("Enter 10 Digit Mobile Number !");
            validMobile.current.focus()
        }else if(!image){
            alert("Upload You Image File !");
            imageValid.current.focus()
        }else if (!email){
            alert("Enter Your Email !")
            validEmail.current.focus()
        }else if (!password){
            alert("Enter Your Email !")
            validPassword.current.focus()
        } else{
            const formData = new FormData()
            formData.append('image', user.image, user.image.name)
            formData.append('name', user.name)
            formData.append('mobile', user.mobile)
            formData.append('email',user.email)
            formData.append('password',user.password)

            const res = await addUser(formData);
            console.log("Response Object: ", res);

            if(res.status === 201){
                toast({
                    title: res.data,
                    description: "Data Successfully Inserted",
                    status: 'success',
                    duration: 9000,
                    position:'top',
                    isClosable: true,
                  });
            }else{
                toast({
                    // title: res.data,
                    title: res && res.data ? res.data : "Something Went Wrong",
                    description: "Something Went Wrong",
                    status: 'danger',
                    duration: 9000,
                    position:'top',
                    isClosable: true,
                  })
            }
        }
    };


    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-4">
                       <ChakraProvider>
                            <div className="form pl-3 pr-3">
                                <h6 className="pt-3">Registration Form</h6><hr></hr>
                                <form>
                                    <FormControl>
                                        <FormLabel id="label">Name <span style={{color:'red'}}>*</span></FormLabel>
                                        <Input
                                            type='text'
                                            name="name"
                                            placeholder={'Enter Your Name'}
                                            id="name"
                                            ref={nameValid}
                                            onChange={(e) => onValueChange(e)}
                                        />
                                    <FormHelperText id="nameValid">Please Enter Your Name *</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel id="label">Mobile Number <span style={{color:'red'}}>*</span></FormLabel>
                                        <Input
                                            type='number'
                                            name="mobile"
                                            placeholder={'Enter Your Mobile'}
                                            id="mobile"
                                            ref={validMobile}
                                            onChange={(e) => onValueChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel id="label">Email <span style={{color:'red'}}>*</span></FormLabel>
                                        <Input
                                            type='email'
                                            name="email"
                                            placeholder={'Enter Your Email'}
                                            id="email"
                                            ref={validEmail}
                                            onChange={(e) => onValueChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel id="label">Password <span style={{color:'red'}}>*</span></FormLabel>
                                        <Input
                                            type='password'
                                            name="password"
                                            placeholder={'Enter Your password'}
                                            id="password"
                                            ref={validPassword}
                                            onChange={(e) => onValueChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel id="label">Image <span style={{color:'red'}}>*</span></FormLabel>
                                        <Input
                                            type='file'
                                            name="image"
                                            id="image"
                                            ref={imageValid}
                                            onChange={fileData}
                                        />
                                    </FormControl>


                                    <div className="row">
                                        <div className="col-12">
                                            <Button colorScheme='blue' id="btn" onClick={submitData}><NavLink to="/Home">Register</NavLink></Button>
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                       </ChakraProvider>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Form

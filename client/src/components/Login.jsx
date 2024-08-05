import React, { useState } from "react";
import { ChakraProvider} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText
  } from '@chakra-ui/react'
  import { Button} from '@chakra-ui/react'
  import { useRef } from "react";
  import { useToast } from '@chakra-ui/react'
  import { addUser } from "../service/api.js";


const Login = () =>{

    const toast = useToast()

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const onValueChange = (e) =>{
        setUser({...user, [e.target.name] : e.target.value});
        console.log(user)
    }

    const validEmail = useRef(null);
    const validPassword = useRef(null);


    const submitData = async(e) =>{
        e.preventDefault()
        const {email,password} = user
        if(!email){
            document.getElementById('validEmail').style.display = 'block';
            validEmail.current.focus()
        }else if (!password){
            alert("Enter Your Email !")
            validPassword.current.focus()
        } else{
            const formData = new FormData()
            formData.append('email', user.email)
            formData.append('password', user.password)


            const res = await addUser(formData);
            if(res.status === 201){
                toast({
                    title: res.data,
                    description: "Data Successfully Inserted",
                    status: 'success',
                    duration: 9000,
                    position:'top',
                    isClosable: true,
                  })
            }else{
                toast({
                    title: res.data,
                    description: "Something Went Wrong",
                    status: 'danger',
                    duration: 9000,
                    position:'top',
                    isClosable: true,
                  })
            }
        }
    }


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

                                    <div className="row">
                                        <div className="col-12">
                                            <Button colorScheme='blue' id="btn" onClick={submitData}>Button</Button>
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


export default Login

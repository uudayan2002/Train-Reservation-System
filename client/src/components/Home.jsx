import React, {useState} from "react";
import {ChakraProvider} from '@chakra-ui/react'
import {Form, FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';
import {Input, Box, Flex} from '@chakra-ui/react'
import {useRef} from "react";
// import {NavLink} from 'react-router-dom';
import { addUser } from "../service/api.js";

const Home = () => {

    const [user, setUser] = useState({startingLocation: '', destination: ''})

    const onValueChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        console.log(user)
    }

    const startingLocation = useRef(null)
    const destination = useRef(null)

    const calculateFare = async(e) => {
        const baseFare = 10;
        const distance = 10;
        const fare = baseFare + distance * 2;
        console.log(`The fare is: ${fare}`);
 
    const formData = new FormData()
    formData.append('startingLocation',user.startingLocation)
    formData.append('destination',user.destination)

    const res = await addUser(formData);
    console.log("Response Object: ", res);
    }

    return (
        <Box>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-4">
                        <ChakraProvider>
                            <Form>
                                <div className="form pl-3 pr-3">
                                    <FormGroup>

                                        <FormLabel>Starting Location</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="startingLocation"
                                            id="startingLocation"
                                            placeholder="Enter starting location"
                                            ref={startingLocation}
                                            onChange={(e) => onValueChange(e)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Destination</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="destination"
                                            id="destination"
                                            placeholder="Enter destination"
                                            ref={destination}
                                            onChange={(e) => onValueChange(e)}/>
                                    </FormGroup>
                                </div>
                                <Flex justifyContent="center">
                                    <Button colorScheme='blue' id="btn" onClick={calculateFare}>Calculate Fare
                                    </Button>
                                </Flex>
                                <div/>
                            </Form>
                        </ChakraProvider>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Home;
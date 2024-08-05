import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
import Login from './components/Login';
import Home from './components/Home';
// import QRCodeGenerator from './components/QRcode';

function App() {
  return (<div className="App">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Form/>}></Route>
    <Route path='/Home' element={<Home/>}></Route>
    <Route path='/Login' element={<Login/>}></Route>
    {/* <Route path='/QRcode' element={<QRCodeGenerator/>}/> */}
  </Routes>
  </BrowserRouter>
</div>
  );
}

export default App;
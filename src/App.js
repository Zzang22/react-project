/* eslint-disable */
import React, {useContext, useState, lazy, Suspense} from 'react';
import './App.css';
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import Data from './data.js';
//import Detail from './Detail.js';
let Detail = lazy(()=> import('./Detail.js'));
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import Cart from './Cart';

export let 재고context = React.createContext(); //같은 변수값을 공유할 범위생성

function App() {

  let [shoes, shoesChange] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">SHOES SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Navbar>

      
    <Switch>
      <Route exact path="/">
          <Jumbotron className="background">
            <h1> SPRING BIG SALE <span className="percent">[50% OFF ↓]</span>  </h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">

           <재고context.Provider value={재고}>
            <div className="row">
            
            {
              shoes.map((a,i)=>{
                return (<Products shoe={a} i={i} key={i}/>)
              })
            }
            </div>
            </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{
              //로딩 중이라는 UI 띄움


              // 서버에 get 요청 axios.get(데이터요청할 url)
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res)=>{
                // 로딩중이라는 UI 안보이게 처리 

                shoesChange([...shoes, ...res.data]);//자료 변경, 3개 자료 추가

              }) // ajax 성공했을 때  
              .catch(()=>{
                console.log('실패했어요')
              }) 
            }}>더보기
            </button>
          </div>
      </Route>

      <Route path="/detail/:id">
        <재고context.Provider value={재고}>
          <Suspense fallback={<div>로딩중이에요</div>}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </Suspense>
         </재고context.Provider>
      </Route>
      {/*<Route path="/component" component={Modal} ></Route>  route쓰는 다른 방법 컴포넌트만 보이게 함*/}
      
      <Route path="/cart">
        <Cart></Cart>
      </Route>


    </Switch>
    {/* 추가할 기능
    1.로딩 중 UI 만들기 2.보여줄 상품이 마지막에 도달했을 때 버튼 숨기기
    3. ajax post로 요청하는 경우 찾아보기! 
     */}
           
    </div>
  );
  
}
  
  function Products(props){

    let 재고 = useContext(재고context);
    let history = useHistory();
    return (
      
      <div className="col-md-4 img" onClick={()=>{history.push('detail/' + props.shoe.id)}}>
        
        <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i + 1) +'.jpg' } width="100%" alt="사진"/>
        <h4>{props.shoe.title}</h4>
        <p>
          {props.shoe.content}<br/>
          {props.shoe.price}
        </p>
        
        <Test></Test>
      </div>
     
    )
  }
  function Test(){
    let 재고 = useContext(재고context);
    return <p>{재고[0]}</p>
  }


export default App;

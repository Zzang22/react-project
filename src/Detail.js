import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import image from './images/chair1.jpg';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

// 컴포넌트를 만드는데, CSS를 미리 입혀놓은 컴포넌트 (className 작명 필요없음) style이 귀속된 컴포넌트
let 박스 = styled.div`
  padding : 20px;  
`;
let 제목 = styled.h4`
 font-size : 25px;
 color : ${ props => props.색상 }
`; 



function Detail(props){
  let [alert, alertChange] = useState(true);
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  let 재고 = useContext(재고context);
  
  
  useEffect(()=>{

    // 2초후에 alert 창을 안보이게 하려면 
    let timer = setTimeout(()=>{
      alertChange(false)
    }, 2000);
    
    return ()=> { clearTimeout(timer) }
  },[alert]);
 // let [inputDate, inputDate변경] = useState('');
  let history = useHistory(); // 방문 기록 등을 저장해놓는 object. useHistory hook 사용
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function(상품){
    return 상품.id == id
  });
  useEffect(()=>{
    var arr = localStorage.getItem('watched');
    if(arr == null) {arr = [];}
    else{
    arr = JSON.parse(arr);}
    arr.push(id);
    arr = new Set(arr);
    arr = [...arr];  // 소괄호를 벗겨서 []안에 넣어주세요.

    localStorage.setItem('watched', JSON.stringify(arr));
  }, []);

  
  

  return (
      <div className="container">
          <박스>
            <제목 className="red">상세상품</제목>
          </박스>
          {
            alert === true 
            ? (<div className="my-alert2" >
              <p>재고가 얼마 남지 않았습니다.</p>
              </div>
            )
            : null 
          }
          

          <div className="row">
            <div className="col-md-6">
              <img src={'https://codingapple1.github.io/shop/shoes1.jpg' } width="100%" alt="사진"/>
            </div>
            
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>

              <Info 재고={props.재고}></Info>
              <button className="btn btn-danger" onClick={()=>{
                let copyArr = [...props.재고];
                copyArr[0] = 9
                props.재고변경(copyArr);
                props.dispatch({type : '항목추가', payload : {id:찾은상품.id, name: 찾은상품.title, quan: 1}})
                history.push('/cart');
              }
              }>주문하기</button>
              &nbsp;
              <button className="btn btn-danger" onClick={()=>{
                  history.push('/');
                  {/*특정 경로로 이동시키려면 history.push('/')*/} 
              }}>뒤로가기</button>  
            </div>
             재고(contextAPI 연습) : {재고[0]} 
          </div>

          <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={()=>{누른탭변경(0); 스위치변경(false)}}>상품설명</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={()=>{누른탭변경(1); 스위치변경(false)}}>배송정보</Nav.Link>
            </Nav.Item>
          </Nav>   
          <CSSTransition in={스위치} classNames="wow" timeout={500}>
            <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>    
          </CSSTransition>

      </div> 
  )
}
// div 도 object. jsx 문법! 
function TabContent(props){

  useEffect(()=>{
    props.스위치변경(true)
  });

  if(props.누른탭 === 0){
    return <div>0번째 내용입니다.</div>
  }else if(props.누른탭 === 1){
    return <div>1번째 내용입니다. </div>
  }else if(props.누른탭 === 2){
    return <div>2번째 내용입니다. </div>
  }
}

function Info(props){
  return (
    <p>재고 :{props.재고[0]}</p>
  )
}

function state를props화(state){
  console.log(state.Reducer);
  return {
    //상품명 : state.name
    // reducer가 두개 이상 저장되면, props처럼 가져왔을 때 잘 저장해야된다. 
    // 지금 두개의 reducer가 저장되어 있다. 
    state : state.Reducer,
    alert열렸니 : state.reducer2
  }
}

export default connect(state를props화)(Detail)

//export default Detail;
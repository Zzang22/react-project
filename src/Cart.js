import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import './Cart.scss';

function Cart(props){
  let [alert, alertChange] = useState(true);



  return (
    <div>
       <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            props.state.map((a, i)=>{
              return(
                <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button onClick={()=>{ props.dispatch({ type: '수량증가', payload: a.id }) }}>+</button>
                  <button onClick={()=>{ props.dispatch({ type: '수량감소', payload: a.id }) }}>-</button>
                </td>
              </tr>
              )
            })       
          }
        </tbody>
      </Table>
      
      {
        alert === true 
        ?(<div className="my-alert2">
        <p>지금 구매하시면 신규할인 20%</p>
        <button onClick={()=>{alertChange(false)}}>닫기</button>
      </div>) 
      :null
      }
      {
        props.alert열렸니 === true
        ?(<div className="my-alert2">
        <p>지금 구매하시면 신규할인 20%</p>
        <button onClick={()=>{props.dispatch({type:'변경'})}}>닫기</button>
      </div> )
      : null
      }
    </div>
  )
}

function state를props화(state){
 
  return {
    //상품명 : state.name
    // reducer가 두개 이상 저장되면, props처럼 가져왔을 때 잘 저장해야된다. 
    // 지금 두개의 reducer가 저장되어 있다. 
    state : state.Reducer,
    alert열렸니 : state.reducer2
  }
}
//라이브러리 문법
export default connect(state를props화)(Cart)

//export default Cart;
import React from 'react';



let 초기값 = [{id : 0, name: '멋진신발', quan: 2},
{id:1, name: '매력적인 신발', quan:1},
{id:2, name: '편한신발', quan: 3}];


function reducer(state = 초기값, 액션){
  if(액션.type === '항목추가'){
    const found = state.findIndex((a)=>{ return a.id === 액션.payload.id}); 

    if(found >= 0){
      let copy = [...state];
      copy[found].quan++;
      return copy;
    }else{
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }    
  }else if( 액션.type === '수량증가'){
    let copy = [...state];
    copy[액션.payload].quan++
    return copy

  }else if( 액션.type === '수량감소'){
    let minu = [...state];
    minu[액션.payload].quan--
    return minu
  }else {
  return state
  }
}



export default reducer;
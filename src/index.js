import { createStore } from 'redux';

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const number = document.querySelector('.count');


// const reducer = ( state = 0) => {
//   return state;
// }
const countModifier = ( count = 0 , action ) => {
  console.log(count, action)
  if ( action.type === 'plus' ) {
    return count + 1;
  }  else if ( action.type === 'minus' ) {
    return count - 1;
  } else {
    return count;
  }
  
}
const countStore = createStore(countModifier);

// console.log( countStore.getState() );

const onChangeText = () => {
  number.innerText = countStore.getState();
}

countStore.subscribe(onChangeText);

const handleAdd = ()=> {
  countStore.dispatch( {  type: 'plus' } );
}
const handleMinus = ()=> {
  countStore.dispatch( {  type: 'minus' } );
}
plus.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
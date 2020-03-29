import { createStore } from 'redux';

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const number = document.querySelector('.count');


// const reducer = ( state = 0) => {
//   return state;
// }

const addNumber = 'plus';
const removeNumber = 'minus';
const countModifier = ( count = 0 , action ) => {
  //console.log(count, action)
  switch (action.type) {
    case addNumber:
      return count + 1;
    case removeNumber:
      return count - 1;
    default:
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
  countStore.dispatch( {  type: addNumber } );
}
const handleMinus = ()=> {
  countStore.dispatch( {  type: removeNumber } );
}
plus.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
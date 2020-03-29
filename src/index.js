import { createStore } from 'redux';

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  }
}
const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = ( state=[], action ) => {
  //console.log(action, state)
  switch( action.type ) {
    case ADD_TODO :
      return [ { text: action.text , id: Date.now() }, ...state ];
    case DELETE_TODO:
      return state.filter( toDo => toDo.id !== action.id );
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe( () => console.log(store.getState()) );

const paintToDos = () => {
  ul.innerHTML = '';
  const toDos = store.getState();
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = 'DEL';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}
store.subscribe( paintToDos );

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
}
const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch( deleteToDo(id) )
}
const onSubmint = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
}

form.addEventListener('submit', onSubmint);
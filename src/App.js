// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {

  const header_title = 'KyuLog'
  let [title, f] = useState(['여자 코트 추천', '남자코트 추천', '배고파']);
  let [like_count, count_up] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [modal_title, setModalTitle] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{header_title}</h4>
      </div>

      <button onClick={()=> {
        let title_sort = [...title].sort();
        f(title_sort);
      }}>
        제목 정렬하기
      </button>

      <button onClick={ () => {
        let title_copy = [...title];
        title_copy[0] = '강아지 추천';
        f(title_copy);        
      } }>제목 바꾸기</button>

      {
        title.map((a, i)=>{
          return(
            <div key={i} className="list">
              <h4 onClick={()=>{ 
                setModalTitle(i);
                modal ? setModal(false) : setModal(true);
                }}>
                {title[i]}
                <span onClick={ (e)=>{ 
                  e.stopPropagation();
                  let like_copy = [...like_count];
                  like_copy[i] += 1;
                  count_up(like_copy);
                } }> 👍 {like_count[i]} </span> 
              </h4>
              <p>날짜</p>
              <DeleteBord i = {i} title = { title } f = {f} like_count = { like_count } count_up = { count_up }/>
            </div>
          );
        })
      }

      {
        modal === false ? null : <Modal setModalTitle = {setModalTitle} modal_title = {modal_title} title = {title}/>
      }

      <InsertBord title = { title } f = {f} like_count = { like_count } count_up = { count_up }/>

    </div>
  );
}

const DeleteBord = (props) => {
  const deleteBord = () => {
    
    const title_copy = [...props.title];
    title_copy.splice(props.i,1);
    props.f(title_copy);
    
    const like_copy = [...props.like_count];
    like_copy.splice(props.i, 1);
    props.count_up(like_copy);

  };

  return(
    <button className='delete_button' onClick={ deleteBord }> 삭제 </button>
  );
}

const Modal = (props) => {
  
  return (
      <div className='modal'>
        <h4>{ props.title[props.modal_title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button>글수정</button>
      </div>
  );
}

const InsertBord = (props) => {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
    // console.log(text);
  }

  const pushTitle = () => {
    
    let title_copy = [...props.title];
    title_copy.unshift(text);
    console.log(text);
    props.f(title_copy);

    let like_copy = [...props.like_count];
    like_copy.unshift(0);
    props.count_up(like_copy);
  }

  return(
    <>
      <input onChange={ onChange } value={ text }/>
      <button onClick={ pushTitle }> 등록 </button>
    </>
  );
} 

export default App;

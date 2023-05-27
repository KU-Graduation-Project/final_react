import React, { useState } from 'react';
import './section0.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; // React Router의 useHistory 사용
import { FaHome } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Section0 = () => {
  const navigate = useNavigate(); // navigate 훅 사용

  const [infoList, setInfoList] = useState([]);
  const [info0, setInfo0] = useState('');
  const [info1, setInfo1] = useState('');
  const [info2, setInfo2] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInfo0Change = (e) => {
    setInfo0(e.target.value);
  };

  const handleInfo1Change = (e) => {
    setInfo1(e.target.value);
  };

  const handleInfo2Change = (e) => {
    setInfo2(e.target.value);
  };

  const handleSave = () => {
    if (!info0 || !info1 || !info2) {
        alert("해당 정보를 모두 입력해주세요");
        return;
      }
    if (editIndex !== -1) {
      // 수정 모드일 때
      const updatedInfoList = [...infoList];
      updatedInfoList[editIndex] = { info0, info1, info2 };
      setInfoList(updatedInfoList);
    } else {
      // 추가 모드일 때
      setInfoList([...infoList, { info0, info1, info2 }]);
    }
    setInfo0('');
    setInfo1('');
    setInfo2('');
    setEditIndex(-1);
  };

  const handleEnroll = (event) => {
    const confirmation = window.confirm('등록하시겠습니까?');
    if(confirmation){
      const did = infoList.map((info) => info.info0);
      const uid = infoList.map((info) => info.info1);
      const name = infoList.map((info) => info.info2);

      const data = { did, uid, name };

      axios.post('/api/enroll', data)
        .then((response) => {
          // 등록 후 작업 수행
          alert("데이터가 등록되었습니다.");
          console.log('Enrollment successful');
          console.log(response.data); // 서버로부터 받은 응답 데이터 출력
          navigate("/Home2");
        })
        .catch((error) => {
          console.error('Error while enrolling data', error); // 에러 처리
        });
    }                          
    else{
      alert("해당 정보를 모두 저장해주세요");
    }
  };

  

  const handleEdit = (index) => {
    const { info0, info1, info2 } = infoList[index];
    setInfo0(info0);
    setInfo1(info1);
    setInfo2(info2);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedInfoList = [...infoList];
    updatedInfoList.splice(index, 1);
    setInfoList(updatedInfoList);
  };

  const getSequenceNumber = (index) => {
    return index + 1;
  };

  return (
    <div className='total'>
        <div className="container">
            <div className="input-container">
                <input className="input-field" placeholder='Device ID' type="text" value={info0} onChange={handleInfo0Change} />
                <input className="input-field" placeholder='User ID' type="text" value={info1} onChange={handleInfo1Change} />
                <input className="input-field" placeholder='User Name' type="text" value={info2} onChange={handleInfo2Change} />
                <button onClick={handleSave} className="save-button">{editIndex !== -1 ? 'Update' : 'Save'}</button>
                <button onClick={handleEnroll} className="enroll-button">{editIndex !== -1 ? 'Enroll' : 'Enroll'}</button>
                {/* <a className="top" href="http://localhost:3000/Home2"><FaHome />HOME</a> */}
            </div>
        </div>
      <ul className="info-list">
        {infoList.map((info, index) => (
          <li key={index}  className="info-item">
            <p className="sequence-number">{getSequenceNumber(index)}번째 해경</p>
            <p className="info">device ID &nbsp; &nbsp;: {info.info0}</p>
            <p className="info">user ID &nbsp; &nbsp; &nbsp; &nbsp;: {info.info1}</p>
            <p className="info">user name &nbsp;: {info.info2}</p>
            <div className="button-group">
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section0;

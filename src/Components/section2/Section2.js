import icon from './icon.png';
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FaHome, FaChild, FaHeartbeat, FaWind, FaTemperatureHigh } from 'react-icons/fa';
import fall from './fall.png';
import lean from './lean.png';
import run from './run.png';
import sit from './sit.png';
import stand from './stand.png';
import walk from './walk.png';
import { act } from 'react-dom/test-utils';

let user1_hr=0, user1_rp=0, user1_tp = 0; 
let user2_hr=0, user2_rp=0, user2_tp = 0;
let user3_hr=0, user3_rp=0, user3_tp = 0;
let user4_hr=0, user4_rp=0, user4_tp = 0;
let user5_hr=0, user5_rp=0, user5_tp = 0;
let user6_hr=0, user6_rp=0, user6_tp = 0;
let user7_hr=0, user7_rp=0, user7_tp = 0;
let user8_hr=0, user8_rp=0, user8_tp = 0;
let user9_hr=0, user9_rp=0, user9_tp = 0;

const Section2 = () => {
    const [message, setMessage] = useState('');

    const [imageSrc, setImageSrc] = useState(stand);
    const [actionState, setActionState] = useState(stand);
    const [imageSrc2, setImageSrc2] = useState(stand);
    const [imageSrc3, setImageSrc3] = useState(stand);
    const [imageSrc4, setImageSrc4] = useState(stand);
    const [imageSrc5, setImageSrc5] = useState(stand);
    const [imageSrc6, setImageSrc6] = useState(stand);
    const [imageSrc7, setImageSrc7] = useState(stand);
    const [imageSrc8, setImageSrc8] = useState(stand);
    const [imageSrc9, setImageSrc9] = useState(stand);

    const changeImageSrc=(action)=>{
      if(action==='-3'){ //fall
        setImageSrc(fall);
        // setActionState(fall)
      }else if(action==="-2"){ //run
        setImageSrc(fall);
        // setActionState(stand)
      }else{ //stand
        setImageSrc(stand);
      }
    }

    const changeImageSrc2=(did, action)=>{
      if (did === '1') {
        if (action === '-3') {
          setImageSrc1(fall)
        }else if (action === '-2') {
          setImageSrc1(run)
        }else{
          setImageSrc1(stand)
        }
      }else if (did === '2') {
        if (action === '-3') {
          setImageSrc2(fall)
        }else if (action === '-2') {
          setImageSrc2(run)
        }else{
          setImageSrc2(stand)
        }
      }else if (did === '3') {
        if (action === '-3') {
          setImageSrc3(fall)
        }else if (action === '-2') {
          setImageSrc3(stand)
        }else{
          setImageSrc3(stand)
        }
      }else if (did === '4') {
        if (action === '-3') {
          setImageSrc4(fall)
        }else if (action === '-2') {
          setImageSrc4(stand)
        }else{
          setImageSrc4(stand)
        }
      }else if (did === '5') {
        if (action === '-3') {
          setImageSrc5(fall)
        }else if (action === '-2') {
          setImageSrc5(stand)
        }else{
          setImageSrc5(stand)
        }
      }else if (did === '6') {
        if (action === '-3') {
          setImageSrc6(fall)
        }else if (action === '-2') {
          setImageSrc6(stand)
        }else{
          setImageSrc6(stand)
        }
      }else if (did === '7') {
        if (action === '-3') {
          setImageSrc7(fall)
        }else if (action === '-2') {
          setImageSrc7(run)
        }else{
          setImageSrc7(stand)
        }
      }else if (did === '8') {
        if (action === '-3') {
          setImageSrc8(fall)
        }else if (action === '-2') {
          setImageSrc8(run)
        }else{
          setImageSrc8(stand)
        }
      }else if (did === '9') {
        if (action === '-3') {
          setImageSrc9(fall)
        }else if (action === '-2') {
          setImageSrc9(run)
        }else{
          setImageSrc9(stand)
        }
      }
    }


    useEffect(() => {
        const WebSocket = require('ws');
        const socket = new window.WebSocket('ws://localhost:8080');

        socket.onmessage = (event) => {
          setMessage(event.data);
          const arr1 = event.data.split(",")
          const did = arr1[1]
          const hr = arr1[3]
          const rp = arr1[5]
          const tp = arr1[4]
          const action = arr1[7]
          changeImageSrc(action)

          changeImageSrc2(did, action)

          console.log('did: '+did)
          console.log('hr: '+hr)
          console.log('rp: '+rp)
          console.log('tp: '+tp)

          if (did === '1'){
            user1_hr=hr;
            user1_rp=rp;
            user1_tp=tp;
          }
          else if (did === '2'){
            user2_hr=hr;
            user2_rp=rp;
            user2_tp=tp;
          }
          else if (did === '3'){
            user3_hr=hr;
            user3_rp=rp;
            user3_tp=tp;
          }
          else if (did === '4'){
            user4_hr=hr;
            user4_rp=rp;
            user4_tp=tp;
          }
          else if (did === '5'){
            user5_hr=hr;
            user5_rp=rp;
            user5_tp=tp;
          }
          else if (did === '6'){
            user6_hr=hr;
            user6_rp=rp;
            user6_tp=tp;
          }
          else if (did === '7'){
            user7_hr=hr;
            user7_rp=rp;
            user7_tp=tp;
          }
          else if (did === '8'){
            user8_hr=hr;
            user8_rp=rp;
            user8_tp=tp;
          }
          else if (did === '9'){
            user9_hr=hr;
            user9_rp=rp;
            user9_tp=tp;
          }

        };

        return () => {
          if(socket.readyState===1){
            socket.close();
          }
        };
      }, []);

    return (
        <div className="section">
            {/* <p>{message}</p> */}
            <div className="experience">
                <div>
                <div className="row1">
                <div className="square">
                <Link to={"/Detail1"}>
                    <div id="data" className="click">#1</div>
                    <img id="action" className="pic" src={imageSrc} height="45px"/>
                    <div id="hr"><FaHeartbeat/> : {user1_hr}</div>
                    <div id="rp"><FaWind/> : {user1_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user1_tp}</div>
                </Link>              
                </div>  
                </div>
                <div className="row1">
                <div className="square">
                <Link to={"/Detail2"}>
                    <div id="data" className="click">#2</div><br/>
                    <img className="pic" src={imageSrc2} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user2_hr} </div>
                    <div id="rp"><FaWind/> : {user2_rp} </div>
                    <div id="tp"><FaTemperatureHigh/> : {user2_tp} </div>
                </Link>              
                </div>                 
                </div>
                <div className="row1">
                <div className="square">
                <Link to={"/Detail3"}>
                    <div id="data" className="click">#3</div><br/>
                    <img className="pic" src={imageSrc3} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user3_hr} </div>
                    <div id="rp"><FaWind/> : {user3_hr} </div>
                    <div id="tp"><FaTemperatureHigh/> : {user3_hr} </div>
                </Link>              
                </div>                  
                </div>
                </div>
                <div>
                <div className="row2">
                <div className="square">
                <Link to={"/Detail4"}>
                    <div id="data" className="click">#4</div><br/>
                    <img className="pic" src={imageSrc4} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user4_hr}</div>
                    <div id="rp"><FaWind/> : {user4_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user4_tp}</div>
                </Link>              
                </div>                 
                </div>
                <div className="row2">
                <div className="square">
                <Link to={"/Detail5"}>
                    <div id="data" className="click">#5</div><br/>
                    <img className="pic" src={imageSrc5} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user5_hr}</div>
                    <div id="rp"><FaWind/> : {user5_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user5_tp}</div>
                </Link>              
                </div>           
                </div>
                <div className="row2">
                <div className="square">
                <Link to={"/Detail6"}>
                    <div id="data" className="click">#6</div><br/>
                    <img className="pic" src={imageSrc6} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user6_hr}</div>
                    <div id="rp"><FaWind/> : {user6_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user6_tp}</div>
                </Link>              
                </div>               
                </div>
                </div>

                <div>
                <div className="row3">
                <div className="square">
                <Link to={"/Detail7"}>
                    <div id="data" className="click">#7</div><br/>
                    <img className="pic" src={imageSrc7} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user7_hr}</div>
                    <div id="rp"><FaWind/> : {user7_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user7_tp}</div>
                </Link>              
                </div>                 
                </div>
                <div className="row3">
                <div className="square">
                <Link to={"/Detail8"}>
                    <div id="data" className="click">#8</div><br/>
                    <img className="pic" src={imageSrc8} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user8_hr}</div>
                    <div id="rp"><FaWind/> : {user8_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user8_tp}</div>
                </Link>              
                </div>             
                </div>
                <div className="row3">
                <div className="square">
                <Link to={"/Detail9"}>
                    <div id="data" className="click">#9</div><br/>
                    <img className="pic" src={imageSrc9} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : {user9_hr}</div>
                    <div id="rp"><FaWind/> : {user9_rp}</div>
                    <div id="tp"><FaTemperatureHigh/> : {user9_tp}</div>
                </Link>              
                </div>               
                </div>
                </div>
            </div>
        </div>
    )
}

export default Section2
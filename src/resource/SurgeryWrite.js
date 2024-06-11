import axios from 'axios';
import '../css/SurgeryWrite.css';
import {url} from '../config'
import {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const SurgeryWrite = () => {
    return (
        <div>
            <div id="surWriteBox">
                <div className="diagBoxHeader">
                    <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                    <h3 className="sboxHeader">&nbsp;수술 기록</h3>
                </div>
                <div className='boxContent'>
                        <div className='surInfoRow'>
                            <div style={{marginRight:'-25px'}}>마취 종류 <input className='surInfoInputStyle'/></div>
                            <div style={{marginRight:'-25px'}}>마취 부위 <input className='surInfoInputStyle'/></div>
                            <div style={{marginRight:'-25px', display:"flex"}}>혈액팩 사용 여부
                                <div className='radioStyle' style={{display:"flex"}}>
                                    <input type='radio' id='used' name='radio' style={{marginRight:"5px"}}/>
                                    <label htmlFor='used'>사용</label>
                                    <select className="bloodpackSelect">
                                        <option>사용 혈액팩</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>O</option>
                                    </select>
                                    <input className='surInfoInputStyle' placeholder="사용 개수"/>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='unused' name='radio' style={{marginRight:"5px"}}/>
                                    <label htmlFor='unused'>미사용</label>
                                </div>
                            </div>
                        </div>
                        <div className='surInfoRow'>
                            <div style={{display:"flex"}}>수술 종료시간 <input className='surInfoInputStyle'/>
                                <button className='buttonStyle' style={{margin:"15px 120px 15px 0", float:"right"}}>저장</button>
                            </div>
                            <div>수술 지연시간 <input className='surInfoInputStyle' style={{color:'#007212', fontWeight:'bold'}}/></div>
                            <div>총 수술시간 <input className='surInfoInputStyle' style={{color:'#007212', fontWeight:'bold'}}/></div>
                        </div>
                        <div className='surInfoRow'>
                            <div>수술 기록 <input className='surInfoInputStyle'/></div>
                            <div>특이사항 <input className='surInfoInputStyle'/></div>
                        </div>
                    </div>
                <div>
                    <button className='buttonStyle' style={{margin:"15px 120px 15px 0", float:"right"}}>저장</button>
                </div>
            </div>
        </div>
    )
}

export default SurgeryWrite;
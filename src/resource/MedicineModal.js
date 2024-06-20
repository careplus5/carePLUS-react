import React, { useState } from 'react';
import '../css/DiagResult.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const MedicineModal = ({ medModalIsOpen, openMedModal, inputKeyword, medSearchType, setMedSearchType, medSearchKeyword, setmedSearchKeyword,
    medicineFilter, searchMedicine, clickMedicine, medicineList, favMedicineList, addFavMedicine, isFavMedicine, clickMedicineName }) => {
    return (
        <Modal isOpen={medModalIsOpen} toggle={openMedModal} style={{ maxWidth: "1530px" }}>
            <ModalHeader toggle={openMedModal} className='modalTitle'>처방 의약품 명칭 및 코드</ModalHeader>
            <ModalBody className='diagModalBodyStyle'>
                <div className='medStaticSearchbar'>
                    <div className="medSearchbar" style={{ width: "700px", marginLeft: "90px" }}>
                        <select class="medKeywordSort" style={{ width: "110px" }} value={medSearchType}
                            onChange={(e) => setMedSearchType(e.target.value)}>
                            <option value="">구분</option>
                            <option value="medNum">약품코드</option>
                            <option value="medEnName">약품영어명</option>
                            <option value="medKorName">약품한글명</option>
                        </select> |
                        <input type="text" id="keyword" style={{ width: "480px", backgroundColor: "#f7f7f7", paddingLeft: "20px" }} placeholder=' 검색...'
                            value={medSearchKeyword} onChange={(e) => setmedSearchKeyword(e.target.value)} />
                        <label class="docSearchButton" for="searchButton1" style={{ marginTop: "5px" }}>
                            <button id="searchButton1" onClick={searchMedicine}></button>
                        </label>
                        {medicineFilter.length > 0 && (
                            <div className='medAutoCompleteDrop'>
                                {medicineFilter.map(medicine => (
                                    <div
                                        key={medicine.medicineNum}
                                        className='medAutoCompleteItem'
                                        onClick={() => clickMedicineName(medicine)}
                                    >
                                        {inputKeyword(medicine.medicineKorName, medSearchKeyword)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div className='medicineContainer'>
                        <table className="docDiagList" style={{ padding: "var(--bs-modal-padding)", width: "95%" }}>
                            <tbody>
                                <tr className='trTitle'>
                                    <th style={{ padding: "15px 0px" }}>약품코드</th>
                                    <th style={{ padding: "15px 0px" }}>약품영어명</th>
                                    <th style={{ padding: "15px 0px" }}>약품한글명</th>
                                    <th style={{ padding: "15px 0px" }}>규격</th>
                                    <th style={{ padding: "15px 0px" }}>태그등록</th>
                                    <th style={{ padding: "15px 0px" }}>처방</th>
                                </tr>
                                {medicineList.length === 0 ? (
                                    <tr>
                                        <td colSpan='6' style={{ paddingTop: "15px" }}>
                                            검색한 약품이 존재하지 않습니다
                                        </td>
                                    </tr>
                                ) : (
                                    medicineList.map(medicine => (
                                        <tr className='trContent' key={medicine.medicineNum}>
                                            <td>{medicine.medicineNum}</td>
                                            <td>{medicine.medicineEnName}</td>
                                            <td>{medicine.medicineKorName}</td>
                                            <td>{medicine.medicineStandard}</td>
                                            <td>
                                                <img id="starImg" src={isFavMedicine(medicine.medicineNum) ? "./img/yellowStar.png" : "./img/star.png"}
                                                    style={{ width: "20px", cursor: "pointer" }} onClick={() => addFavMedicine(medicine.medicineNum)} />
                                            </td>
                                            <td><button className='buttonStyle' style={{ width: "50px" }} onClick={() => clickMedicine(medicine)}>처방</button></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='starMedicineContainer'>
                        <div className='favHeaderStyle trTitle' style={{ backgroundColor: "#f7f7f7" }}>
                            <img src="./img/medIcon.png" style={{ width: "20px", marginLeft: "95px" }} />  즐겨 찾는 약품
                        </div>
                        <div className='favMedicineTag' style={{position:'sticky', top:'100px'}}>
                            {favMedicineList.map(favMedicine => (
                                <div className='medTag' key={favMedicine.favoriteMedicinesNum} onClick={() => clickMedicine(favMedicine)}>
                                    #{favMedicine.medicineKorName}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default MedicineModal;

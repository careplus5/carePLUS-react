import {configureStore} from '@reduxjs/toolkit';
import reducer from"./reducer";
// 상태를 세션에 저장하기 위한 유틸
import storageSession from 'redux-persist/lib/storage/session';
// 리듀서를 감싸서 상태를 지속 가능하게 만듦
import {persistReducer} from 'redux-persist';

// 리덕스 스토어: 애플리케이션의 모든 상태(state)를 포함하고 관리하는 객체
// 상태 관리, 액션 처리, 상태 변화에 따라 업데이트시켜 주는 역할
// 단일 스토어 원칙이기 때문에 앱의 전역 상태를 중앙 집중식으로 관리

// redux의 createStore를 통해 스토어 생성, 파라미터로 리듀서(reducer) 초기 상태(initial State) 미들웨어(MiddleWare) 등을 받을 수 있음

// persistConfig 객체 정의, 상태를 어떻게 저장할지 구성
const persistConfig = {
    // 상태 저장의 루트 키 정의
    key:'root',
    // 상태를 세션 스토리지에 저장하도록 저장소 지정
    storage: storageSession
}

// 리듀서의 상태가 지속성 있게 만듦
const persistedReducer = persistReducer(persistConfig,reducer);

// configureStore 함수를 사용해 Redux 스토어 생성
const store = configureStore(
    // 스토어에서 사용할 리듀서 설정
    {reducer:{persistedReducer},
    // 미들웨어 설정 (기본 미들웨어, 직렬화 활성화)
    middleware:(getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false}))});

export default store;
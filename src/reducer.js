
// 초기 상태 정의, 토큰과 사용자 정보 포함
export const initState = {
    token:'',
    emp:{ username:'', password:''}
}

// 리듀서 정의
// 리듀서: 상태와 액션을 인수를 파라미터로 받아 새로운 상태를 반환, 리덕스 애플리케이션에서 상태 관리의 핵심 역할을 함
//       구조 '현재 상태와 액션을 파라미터로 받음' -> '새로운 상태 반환'
const reducer = (state=initState, action)=>{
    // 새로운 상태 객체를 만듦
    // 기존 상태를 복사해 변경 불가능한 상태 유지
    const newState={...state};

    // 액션 타입에 따라 상태 변경
    switch(action.type){
        // 액션 타입: 토큰, 토큰을 액션의 payload로 설정
        case 'token': newState.token=action.payload; break;

        // 액션 타입: 유저, 유저를 액션의 Payload로 설정
        case 'emp': newState.user=action.payload; break;

        // 정의되지 않은 액션 타입인 경우, 상태 변경 없음
        default: 
    }

    // 액션 타입에 맞게 액션에 Payload를 설정하고 새로운 상태 반환
    return newState;
}


export default reducer;
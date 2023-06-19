const nameRegEx = /^[가-힣]+$/;
const idRegEx = /^[a-zA-Z0-9_]{4,16}$/;

// 적어도 하나의 소문자, 대문자, 숫자, 특수문자 포함, 최소 8자 이상 ex. Aabb3ccd!ss
const pwRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&`])[A-Za-z\d@$!%*?&`]{8,}$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export { nameRegEx, idRegEx, pwRegEx, emailRegEx };

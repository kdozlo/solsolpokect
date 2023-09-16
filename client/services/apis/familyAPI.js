import axios from 'axios';
import { useRecoilState } from 'recoil';

import { familyMemberIdListAtom } from '../../recoil/accountBook';
import { SOLSOL_URL } from '../../utils/const/api';

export const getFamilyMemberIdList = async userId => {
  const familyInfoRes = await fetch(`http://${SOLSOL_URL}/api/family/info/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
      credentials: 'include',
    },
  });

  // 일반 계좌만 받아오도록 필터링
  if (familyInfoRes.ok) {
    const result = await familyInfoRes.json();

    console.log('familyAPI data', result.data);
    return result.data;
  }
  return null;
};

// export const get

// export const getFamilyInfo = async userId => {
//   await axios
//     .get(`http://3.34.50.120:8080/api/family/info/${userId}`)
//     .then(function (response) {
//       const v = response.request._response;
//       const ParsedV = JSON.parse(v);

//       const id = ParsedV.data.usersId;
//       const usersName = ParsedV.data.usersName;
//       const roles = ParsedV.data.roles;

//       console.log(id.length);

//       const familyList = [];

//       for (let i = 0; i < id.length; i++) {
//         const element1 = id[i];
//         const element2 = usersName[i];
//         const element3 = roles[i];

//         const newArray = [element1, element2, element3];

//         console.log(newArray);

//         familyList.push(newArray);
//       }

//       setNameList(familyList);

//       console.log(nameList);
//     })
//     .catch(function (error) {
//       console.error(error.response);
//     });
// };

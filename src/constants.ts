import {Parts} from './@types/index';

const teamColors = [
  '#1B378A', // 1
  '#B6171E', // 2
  '#41B33B', // 3
  '#e162dc', // 4
  '#f76904', // 5
  '#a8f908', // 6
  '#479eef', // 7
  '#F4297D', // 8
  '#1C1A25', // 9
  '#f3f3fd', // 10
  '#9C27B0', // 11
  '#607D8B', // 12
  '#795548', // 13
  '#9E9E9E', // 14
  '#00BCD4'  // 15
];

const parts: Parts = {
  HAND: {
    id: 1,
    korean: '손',
    spells: [
      {
        main: '펴',
        similar: ['펴', '표', '피라고', '벽', '효'],
        code: 11,
        command: 'motor-6/forward/80'
      },
      {
        main: '접어',
        similar: ['접어', '저붜', '자보', '저봐', '줘봐', '줘바', '접포', '초밥', '여보', '초보', '터보', '초봉', '서버', '더워'],
        code: 12,
        command: 'motor-6/backward/80'
      },
    ],
    stop: {
      code: 1000,
      command: 'motor-6/stop'
    },
  },
  ARM: {
    id: 2,
    korean: '팔',
    spells: [
      {
        main: '펴',
        similar: ['펴','표', '8', '피라고', '피라고', '표', '벽', '효', '벼'],
        code: 21,
        command: 'motor-5/backward/100'
      },
      {
        main: '접어',
        similar: ['접어', '저붜', '자보', '저봐', '줘봐', '줘바', '접포', '초밥', '여보', '초보', '터보', '초봉', '서버', '더워'],
        code: 22,
        command: 'motor-5/forward/100'
      },
      {
        main: '들어',
        similar: ['들어', '틀어', '드론', '트럭', '불어', '그럼'],
        code: 23,
        command: 'motor-2/forward/100'
      },
      {
        main: '내려',
        similar: ['내려', '내려와', '매력', '노력', '매려', '노려', '느려', '재료'],
        code: 24,
        command: 'motor-2/backward/100'
      },
    ],
    stop: {
      code: 2000,
      command: 'arm/stop'
    },
  },
  WAIST: {
    id: 3,
    korean: '몸',
    spells: [
      {
        main: '왼쪽',
        similar: ['왼쪽', '외쪽'],
        code: 31,
        command: 'motor-1/backward/60'
      },
      {
        main: '오른쪽',
        similar: ['오른쪽', '어른쪽', '어느쪽'],
        code: 32,
        command: 'motor-1/forward/60'
      }
    ],
    stop: {
      code: 3000,
      command: 'motor-1/stop'
    },
  },
  BOTTOM : {
    id: 4,
    korean: '다리',
    spells: [
      {
        main: '앞으로',
        similar: ['앞으로', '아프로', '아브로', '어그로'],
        code: 41,
        command: 'bottom/forward/100'
      },
      {
        main: '뒤로',
        similar: ['뒤로', '기록', '귀로', '1호', '위로'],
        code: 42,
        command: 'bottom/backward/100'
      },
      {
        main: '왼쪽',
        similar: ['왼쪽'],
        code: 43,
        command: 'bottom/left/50'
      },
      {
        main: '오른쪽',
        similar: ['오른쪽', '어른쪽', '어느쪽'],
        code: 44,
        command: 'bottom/right/50'
      }
    ],
    stop: {
      code: 4000,
      command: 'bottom/stop'
    },
  }
};

enum Locale {
  en_US = 'en-US',
  ko_KR = 'ko-KR',
  ja_JP = 'ja-JP',
  zh_CN = 'zh-CN',
  zh_HK = 'zh_HK',
  zh = 'zh'
}

const rapiURL = (team: number) => {
  return `http://voice-car-0${team}.jp.ngrok.io.ngrok.io`;
}
const serverURL = 'http://voice-car.club';

export {
  teamColors,
  parts,
  Locale,
  rapiURL,
  serverURL
}
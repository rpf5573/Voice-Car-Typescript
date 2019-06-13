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
        main: '손 펴',
        similar: ['손펴', '손표', '손피라고', '성표', '성펴'],
        code: 11,
        command: 'motor-6/forward/40'
      },
      {
        main: '손 접어',
        similar: ['손접어', '손저붜', '손자보', '손저봐'],
        code: 12,
        command: 'motor-6/backward/40'
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
        main: '팔 펴',
        similar: ['팔펴','발표', '8펴', '팔피라고', '탈피라고','팔표'],
        code: 21,
        command: 'motor-5/backward/100'
      },
      {
        main: '팔 접어',
        similar: ['팔접어', '팔저붜', '팔자보', '팔저봐'],
        code: 22,
        command: 'motor-5/forward/100'
      },
      {
        main: '팔 들어',
        similar: ['팔들어'],
        code: 23,
        command: 'motor-2/forward/100'
      },
      {
        main: '팔 내려',
        similar: ['팔내려'],
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
    korean: '허리',
    spells: [
      {
        main: '왼쪽',
        similar: ['왼쪽'],
        code: 31,
        command: 'motor-1/backward/100'
      },
      {
        main: '오른쪽',
        similar: ['오른쪽'],
        code: 32,
        command: 'motor-1/forward/100'
      }
    ],
    stop: {
      code: 3000,
      command: 'motor-1/stop'
    },
  },
  BOTTOM : {
    id: 4,
    korean: '하체',
    spells: [
      {
        main: '앞으로',
        similar: ['앞으로'],
        code: 41,
        command: 'bottom/forward'
      },
      {
        main: '뒤로',
        similar: ['뒤로'],
        code: 42,
        command: 'bottom/backward'
      },
      {
        main: '왼쪽',
        similar: ['왼쪽'],
        code: 43,
        command: 'bottom/left'
      },
      {
        main: '오른쪽',
        similar: ['오른쪽'],
        code: 44,
        command: 'bottom/right'
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
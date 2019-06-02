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
        code: 11
      },
      {
        main: '손 접어',
        similar: ['손접어', '손저붜', '손자보', '손저봐'],
        code: 12
      },
    ],
    stop: 1000,
  },
  ARM: {
    id: 2,
    korean: '팔',
    spells: [
      {
        main: '팔 펴',
        similar: ['팔펴','발표', '8펴', '팔피라고', '탈피라고','팔표'],
        code: 21
      },
      {
        main: '팔 접어',
        similar: ['팔접어', '팔저붜', '팔자보', '팔저봐'],
        code: 22
      },
      {
        main: '팔 들어',
        similar: ['팔들어'],
        code: 23
      },
      {
        main: '팔 내려',
        similar: ['팔내려'],
        code: 24
      },
    ],
    stop: 2000,
  },
  WAIST: {
    id: 3,
    korean: '허리',
    spells: [
      {
        main: '왼쪽',
        similar: ['왼쪽'],
        code: 31
      },
      {
        main: '오른쪽',
        similar: ['오른쪽'],
        code: 32
      }
    ],
    stop: 3000,
  },
  BOTTOM : {
    id: 4,
    korean: '하체',
    spells: [
      {
        main: '앞으로',
        similar: ['앞으로'],
        code: 41
      },
      {
        main: '뒤로',
        similar: ['뒤로'],
        code: 42
      },
      {
        main: '왼쪽',
        similar: ['왼쪽'],
        code: 43
      },
      {
        main: '오른쪽',
        similar: ['오른쪽'],
        code: 44
      }
    ],
    stop: 4000,
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

const serverURL = 'http://test-server.com'

export {
  teamColors,
  parts,
  Locale,
  serverURL
}
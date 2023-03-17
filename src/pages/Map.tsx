import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { getCitys } from '../api/firebase';
import City from '../components/City';
import { InfoContextProvider } from '../components/context/InfoContextProvider';

export default function Map() {
  const [citys, setCitys] = useState<string[]>([]);
  const geoUrl = process.env.PUBLIC_URL + '/maps/land-50m.json';
  // const markers = [
  //   { city_lang: ['포르투갈어'], city_religion: '기독교', coordinates: [-9, 38.8] },
  //   { city_lang: ['에스파냐어'], city_religion: '기독교', coordinates: [-5.8, 36.5] },
  //   { city_lang: ['에스파냐어'], city_religion: '기독교', coordinates: [-4.45, 36.75] },
  //   { city_lang: ['에스파냐어', '프랑스어'], city_religion: '기독교', coordinates: [1.5, 41.5] },
  //   { city_lang: ['에스파냐어'], city_religion: '기독교', coordinates: [-0.8, 39.4] },
  //   { city_lang: ['아랍어', '포르투갈어'], city_religion: '기독교', coordinates: [-5.5, 35.2] },
  //   { city_lang: ['아랍어', '오스만어'], city_religion: '이슬람교', coordinates: [3.14, 36.62] },
  //   { city_lang: ['아랍어', '포르투갈어'], city_religion: '-', coordinates: [-7.62, 33.64] },
  //   { city_lang: ['포르투갈어', '에스파냐어'], city_religion: '기독교', coordinates: [-7.9, 37.02] },
  //   { city_lang: ['에스파냐어'], city_religion: '기독교', coordinates: [2.7, 39.54] },
  //   { city_lang: ['포르투갈어'], city_religion: '기독교', coordinates: [-25.6, 37.72] },
  //   { city_lang: ['포르투갈어'], city_religion: '기독교', coordinates: [-16.93, 32.65] },
  //   { city_lang: ['프랑스어', '영어'], city_religion: '기독교', coordinates: [-1.5, 47] },
  //   { city_nm: '나폴리', city_lang: ['라틴어', '에스파냐어'], city_religion: '기독교', coordinates: [14.29, 40.82] },
  //   { city_nm: '마르세유', city_lang: ['프랑스어'], city_religion: '기독교', coordinates: [5.33, 43.3] },
  //   { city_nm: '제노바', city_lang: ['라틴어', '프랑스어'], city_religion: '기독교', coordinates: [8.89, 44.42] },
  //   { city_nm: '투니스', city_lang: ['아랍어'], city_religion: '이슬람교', coordinates: [10.21, 36.8] },
  //   { city_nm: '피사', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [10.4, 43.69] },
  //   { city_nm: '몽펠리에', city_lang: ['프랑스어'], city_religion: '기독교', coordinates: [3.88, 43.56] },
  //   { city_nm: '사사리', city_lang: ['프랑스어', '포르투갈어'], city_religion: '기독교', coordinates: [8.54, 40.76] },
  //   { city_nm: '칼리아리', city_lang: ['프랑스어', '에스파냐어'], city_religion: '기독교', coordinates: [9.08, 39.24] },
  //   { city_nm: '칼비', city_lang: ['프랑스어', '라틴어'], city_religion: '기독교', coordinates: [8.77, 42.56] },
  //   { city_nm: '베네치아', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [12.32, 45.44] },
  //   { city_nm: '라구사', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [17.4, 43] },
  //   { city_nm: '시라쿠자', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [14.5, 37.5] },
  //   { city_nm: '벵가지', city_lang: ['아랍어', '오스만어'], city_religion: '이슬람교', coordinates: [20.5, 32.3] },
  //   { city_nm: '안코나', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [13.51, 43.62] },
  //   { city_nm: '자라', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [15.25, 44.12] },
  //   { city_nm: '타라불루스', city_lang: ['아랍어'], city_religion: '이슬람교', coordinates: [12, 32.9] },
  //   { city_nm: '트리에스테', city_lang: ['라틴어'], city_religion: '기독교', coordinates: [13.78, 45.64], markerOffset: -1 },
  //   { city_nm: '알이스칸다리야', city_lang: ['아랍어', '오스만어'], city_religion: '이슬람교', coordinates: [28.5, 30.8] },
  //   { city_nm: '베이루트', city_lang: ['아랍어', '오스만어'], city_religion: '이슬람교', coordinates: [36, 34] },
  //   { city_nm: '알카히라', city_lang: ['아랍어'], city_religion: '이슬람교', coordinates: [30, 29] },
  //   { city_nm: '칸디아', city_lang: ['그리스어', '아랍어'], city_religion: '기독교', coordinates: [24.8, 35.3] },
  //   { city_nm: '레프코샤', city_lang: ['그리스어', '오스만어'], city_religion: '이슬람교', coordinates: [33.2, 35] },
  //   { city_nm: '보르사이드', city_lang: ['아랍어', '오스만어'], city_religion: '이슬람교', coordinates: [33, 31] },
  //   { city_nm: '안탈리아', city_lang: ['그리스어'], city_religion: '이슬람교', coordinates: [30.3, 37] },
  //   { city_nm: '야파', city_lang: ['아랍어', '오스만어'], city_religion: '이슬람교', coordinates: [35, 32.2] },
  //   { city_nm: '아티나', city_lang: ['그리스어', '오스만어'], city_religion: '기독교', coordinates: [23.8, 38.3] },
  //   { city_nm: '코스탄티니예', city_lang: ['오스만어'], city_religion: '이슬람교', coordinates: [28.2, 41.25] },
  //   { city_nm: '바르나', city_lang: ['슬라브어', '오스만어'], city_religion: '이슬람교', coordinates: [28, 43.8] },
  //   { city_nm: '오데사', city_lang: ['슬라브어', '오스만어'], city_religion: '이슬람교', coordinates: [31, 47] },
  //   { city_nm: '케르치', city_lang: ['슬라브어', '오스만어'], city_religion: '이슬람교', coordinates: [36, 45.3] },
  //   { city_nm: '타간로크', city_lang: ['슬라브어', '오스만어'], city_religion: '이슬람교', coordinates: [38.5, 47.5] },
  //   { city_nm: '테살로니키', city_lang: ['그리스어', '오스만어'], city_religion: '이슬람교', coordinates: [22.5, 40.7] },
  //   { city_nm: '트라브존', city_lang: ['오스만어'], city_religion: '이슬람교', coordinates: [40.24, 40.86] },
  // { city_id: 14, city_nm: '두블린', city_lang: ['영어', '라틴어'], city_religion: '기독교', coordinates: [,] },
  // { city_id: 15, city_nm: '보르도', city_lang: ['프랑스어'], city_religion: '기독교', coordinates: [-0.8, 45.5] },
  // { city_id: 16, city_nm: '브리스틀', city_lang: ['영어'], city_religion: '기독교', coordinates: [,] },
  // { city_id: 17, city_nm: '포르투', city_lang: ['포르투갈어'], city_religion: '기독교', coordinates: [,] },
  // { city_id: 18, city_nm: '플리머스', city_lang: ['영어'], city_religion: '기독교', coordinates: [,] },
  // { city_id: 19, city_nm: '히혼', city_lang: ['에스파냐어'], city_religion: '기독교', coordinates: [,] },
  // { city_id: 20, city_nm: '런던', city_lang: ['영어'], city_religion: '기독교' },
  // { city_id: 21, city_nm: '암스테르담', city_lang: ['네덜란드어'], city_religion: '기독교' },
  // { city_id: 22, city_nm: '함부르크', city_lang: ['도이치어'], city_religion: '기독교' },
  // { city_id: 23, city_nm: '브레멘', city_lang: ['도이치어', '네덜란드어'], city_religion: '기독교' },
  // { city_id: 24, city_nm: '안트베르펜', city_lang: ['네덜란드어', '영어'], city_religion: '기독교' },
  // { city_id: 25, city_nm: '에든버러', city_lang: ['영어'], city_religion: '기독교' },
  // { city_id: 26, city_nm: '칼레', city_lang: ['프랑스어', '영어'], city_religion: '기독교' },
  // { city_id: 27, city_nm: '덴헬데르', city_lang: ['네덜란드어'], city_religion: '기독교' },
  // { city_id: 28, city_nm: '도버', city_lang: ['영어', '네덜란드어'], city_religion: '기독교' },
  // { city_id: 29, city_nm: '흐로닝언', city_lang: ['네덜란드어', '도이치어'], city_religion: '기독교' },
  // { city_id: 30, city_nm: '상트페테르부르크', city_lang: ['루스어', '스웨덴어'], city_religion: '기독교' },
  // { city_id: 31, city_nm: '쾨벤하운', city_lang: ['덴마크어', '노르웨이어'], city_religion: '기독교' },
  // { city_id: 32, city_nm: '뤼베크', city_lang: ['도이치어', '덴마크어'], city_religion: '기독교' },
  // { city_id: 33, city_nm: '스톡홀름', city_lang: ['스웨덴어'], city_religion: '기독교' },
  // { city_id: 34, city_nm: '오슬로', city_lang: ['노르웨이어', '덴마크어'], city_religion: '기독교' },
  // { city_id: 35, city_nm: '그단스크', city_lang: ['슬라브어'], city_religion: '기독교' },
  // { city_id: 36, city_nm: '리가', city_lang: ['도이치어'], city_religion: '기독교' },
  // { city_id: 37, city_nm: '베르겐', city_lang: ['노르웨이어', '덴마크어'], city_religion: '기독교' },
  // { city_id: 38, city_nm: '비스뷔', city_lang: ['스웨덴어', '덴마크어'], city_religion: '기독교' },
  // { city_id: 39, city_nm: '코콜라', city_lang: ['스웨덴어'], city_religion: '기독교' },
  // { city_id: 73, city_nm: '팀북투', city_lang: ['만데어'], city_religion: '-' },
  // { city_id: 74, city_nm: '아비장', city_lang: ['만데어'], city_religion: '-' },
  // { city_id: 75, city_nm: '엘미나', city_lang: ['만데어'], city_religion: '-' },
  // { city_id: 76, city_nm: '두알라', city_lang: ['만데어', '반투어'], city_religion: '-' },
  // { city_id: 77, city_nm: '라스팔마스', city_lang: ['아랍어', '에스파냐어'], city_religion: '이슬람교' },
  // { city_id: 78, city_nm: '배서스트', city_lang: ['만데어'], city_religion: '-' },
  // { city_id: 79, city_nm: '베냉', city_lang: ['만데어', '반투어'], city_religion: '-' },
  // { city_id: 80, city_nm: '비사우', city_lang: ['만데어'], city_religion: '-' },
  // { city_id: 81, city_nm: '상토메', city_lang: ['만데어', '포르투갈어'], city_religion: '-' },
  // { city_id: 82, city_nm: '시에라리온', city_lang: ['만데어'], city_religion: '-' },
  // { city_id: 83, city_nm: '아르김', city_lang: ['포르투갈어'], city_religion: '-' },
  // { city_id: 84, city_nm: '프라이아', city_lang: ['만데어', '포르투갈어'], city_religion: '-' },
  // { city_id: 85, city_nm: '베라크루스', city_lang: ['나우아틀어', '마야어'], city_religion: '-' },
  // { city_id: 86, city_nm: '트루히요', city_lang: ['나우아틀어', '마야어'], city_religion: '-' },
  // { city_id: 87, city_nm: '포르토벨로', city_lang: ['북아메리카어', '아라와크어'], city_religion: '기독교' },
  // { city_id: 88, city_nm: '과테말라', city_lang: ['마야어', '나우아틀어'], city_religion: '-' },
  // { city_id: 89, city_nm: '나사우', city_lang: ['아라와크어', '북아메리카어'], city_religion: '기독교' },
  // { city_id: 90, city_nm: '누탁', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 91, city_nm: '메리다', city_lang: ['마야어'], city_religion: '-' },
  // { city_id: 92, city_nm: '아비앗', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 93, city_nm: '아카풀코', city_lang: ['나우아틀어'], city_religion: '-' },
  // { city_id: 94, city_nm: '오흘론', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 95, city_nm: '코하셋', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 96, city_nm: '터코마', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 97, city_nm: '파나마', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 98, city_nm: '산토도밍고', city_lang: ['아라와크어'], city_religion: '기독교' },
  // { city_id: 99, city_nm: '포트로열', city_lang: ['아라와크어', '카리브어'], city_religion: '기독교' },
  // { city_id: 100, city_nm: '마라카이보', city_lang: ['아라와크어', '카리브어'], city_religion: '-' },
  // { city_id: 101, city_nm: '빌렘스타트', city_lang: ['카리브어'], city_religion: '기독교' },
  // { city_id: 102, city_nm: '사우스사이드', city_lang: ['아라와크어'], city_religion: '기독교' },
  // { city_id: 103, city_nm: '산티아고', city_lang: ['카리브어', '아라와크어'], city_religion: '기독교' },
  // { city_id: 104, city_nm: '산후안', city_lang: ['아라와크어', '카리브어'], city_religion: '기독교' },
  // { city_id: 105, city_nm: '아바나', city_lang: ['아라와크어'], city_religion: '기독교' },
  // { city_id: 106, city_nm: '카라카스', city_lang: ['카리브어'], city_religion: '-' },
  // { city_id: 107, city_nm: '카르타헤나', city_lang: ['아라와크어', '남아메리카어'], city_religion: '기독교' },
  // { city_id: 108, city_nm: '카옌', city_lang: ['남아메리카어'], city_religion: '기독교' },
  // { city_id: 109, city_nm: '포를라마르', city_lang: ['카리브어'], city_religion: '기독교' },
  // { city_id: 110, city_nm: '리마', city_lang: ['케추아어'], city_religion: '-' },
  // { city_id: 111, city_nm: '리우데자네이루', city_lang: ['남아메리카어'], city_religion: '기독교' },
  // { city_id: 112, city_nm: '바이아', city_lang: ['남아메리카어'], city_religion: '기독교' },
  // { city_id: 113, city_nm: '발파라이소', city_lang: ['케추아어'], city_religion: '-' },
  // { city_id: 114, city_nm: '부에노스아이레스', city_lang: ['남아메리카어', '케추아어'], city_religion: '-' },
  // { city_id: 115, city_nm: '우수아이아', city_lang: ['남아메리카어'], city_religion: '-' },
  // { city_id: 116, city_nm: '코피아포', city_lang: ['케추아어'], city_religion: '-' },
  // { city_id: 117, city_nm: '툼베스', city_lang: ['케추아어'], city_religion: '-' },
  // { city_id: 118, city_nm: '페르남부쿠', city_lang: ['남아메리카어', '케추아어'], city_religion: '기독교' },
  // { city_id: 119, city_nm: '루안다', city_lang: ['만데어'], city_religion: '반투어' },
  // { city_id: 120, city_nm: '모삼비크', city_lang: ['반투어', '스와힐리어'], city_religion: '-' },
  // { city_id: 121, city_nm: '소팔라', city_lang: ['반투어'], city_religion: '-' },
  // { city_id: 122, city_nm: '이카파', city_lang: ['반투어'], city_religion: '-' },
  // { city_id: 123, city_nm: '잔지바르', city_lang: ['스와힐리어'], city_religion: '-' },
  // { city_id: 124, city_nm: '나탈', city_lang: ['반투어'], city_religion: '-' },
  // { city_id: 125, city_nm: '만바사', city_lang: ['스와힐리어'], city_religion: '-' },
  // { city_id: 126, city_nm: '말린디', city_lang: ['스와힐리어'], city_religion: '-' },
  // { city_id: 127, city_nm: '무크디쇼', city_lang: ['아랍어', '스와힐리어'], city_religion: '-' },
  // { city_id: 128, city_nm: '벵겔라', city_lang: ['만데어', '반투어'], city_religion: '-' },
  // { city_id: 129, city_nm: '카리비브', city_lang: ['반투어'], city_religion: '-' },
  // { city_id: 130, city_nm: '칼리마니', city_lang: ['반투어', '스와힐리어'], city_religion: '-' },
  // { city_id: 131, city_nm: '킬와', city_lang: ['스와힐리어'], city_religion: '-' },
  // { city_id: 132, city_nm: '토아마시나', city_lang: ['스와힐리어'], city_religion: '-' },
  // { city_id: 133, city_nm: '마스카트', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 134, city_nm: '바그다드', city_lang: ['페르시아어'], city_religion: '이슬람교' },
  // { city_id: 135, city_nm: '아딘', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 136, city_nm: '알바스라', city_lang: ['페르시아어', '아랍어'], city_religion: '이슬람교' },
  // { city_id: 137, city_nm: '앗수웨이스', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 138, city_nm: '지다', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 139, city_nm: '하라무즈', city_lang: ['페르시아어'], city_religion: '이슬람교' },
  // { city_id: 140, city_nm: '도파르', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 141, city_nm: '마사와', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 142, city_nm: '시라즈', city_lang: ['페르시아어'], city_religion: '이슬람교' },
  // { city_id: 143, city_nm: '알비다', city_lang: ['아랍어', '페르시아어'], city_religion: '이슬람교' },
  // { city_id: 144, city_nm: '하디보', city_lang: ['아랍어'], city_religion: '이슬람교' },
  // { city_id: 145, city_nm: '코지코드', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 146, city_nm: '고아', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 147, city_nm: '고치', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 148, city_nm: '디우', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 149, city_nm: '마실리파트남', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 150, city_nm: '코테', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 151, city_nm: '콜카타', city_lang: ['산스크리트어', '몬 아유타야어'], city_religion: '힌두교' },
  // { city_id: 152, city_nm: '판디체리', city_lang: ['산스크리트어'], city_religion: '힌두교' },
  // { city_id: 153, city_nm: '페구', city_lang: ['몬 아유타야어'], city_religion: '불교' },
  // { city_id: 154, city_nm: '레이캬비크', city_lang: ['노르웨이어', '영어'], city_religion: '기독교' },
  // { city_id: 155, city_nm: '오호츠크', city_lang: ['루스어'], city_religion: '-' },
  // { city_id: 156, city_nm: '코르프', city_lang: ['루스어'], city_religion: '-' },
  // { city_id: 157, city_nm: '믈라카', city_lang: ['마인어', '자와어'], city_religion: '이슬람교' },
  // { city_id: 158, city_nm: '자야카르타', city_lang: ['자와어'], city_religion: '이슬람교' },
  // { city_id: 159, city_nm: '롭부리', city_lang: ['몬 아유타야어', '몬 크메르어'], city_religion: '불교' },
  // { city_id: 160, city_nm: '수라바야', city_lang: ['자와어'], city_religion: '힌두교' },
  // { city_id: 161, city_nm: '아체', city_lang: ['자와어'], city_religion: '이슬람교' },
  // { city_id: 162, city_nm: '파사이', city_lang: ['자와어'], city_religion: '이슬람교' },
  // { city_id: 163, city_nm: '팔렘방', city_lang: ['자와어'], city_religion: '이슬람교' },
  // { city_id: 164, city_nm: '팡칼피낭', city_lang: ['자와어'], city_religion: '이슬람교' },
  // { city_id: 165, city_nm: '하노이', city_lang: ['몬 크메르어'], city_religion: '불교' },
  // { city_id: 166, city_nm: '호베', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 167, city_nm: '다바오', city_lang: ['타갈로그어'], city_religion: '이슬람교' },
  // { city_id: 168, city_nm: '딜리', city_lang: ['마인어'], city_religion: '힌두교' },
  // { city_id: 169, city_nm: '마닐라', city_lang: ['타갈로그어'], city_religion: '이슬람교' },
  // { city_id: 170, city_nm: '마카사르', city_lang: ['마인어', '자와어'], city_religion: '이슬람교' },
  // { city_id: 171, city_nm: '반다', city_lang: ['마인어'], city_religion: '이슬람교' },
  // { city_id: 172, city_nm: '반자르마신', city_lang: ['자와어', '마인어'], city_religion: '이슬람교' },
  // { city_id: 173, city_nm: '브루네이', city_lang: ['마인어', '타갈로그어'], city_religion: '이슬람교' },
  // { city_id: 174, city_nm: '암본', city_lang: ['마인어'], city_religion: '이슬람교' },
  // { city_id: 175, city_nm: '쿠칭', city_lang: ['마인어'], city_religion: '이슬람교' },
  // { city_id: 176, city_nm: '타이난', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 177, city_nm: '테르나테', city_lang: ['마인어'], city_religion: '이슬람교' },
  // { city_id: 178, city_nm: '홀로', city_lang: ['타갈로그어'], city_religion: '이슬람교' },
  // { city_id: 179, city_nm: '북경', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 180, city_nm: '서안', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 181, city_nm: '중경', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 182, city_nm: '항주', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 183, city_nm: '마카오', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 184, city_nm: '천주', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 185, city_nm: '연운', city_lang: ['한어'], city_religion: '불교' },
  // { city_id: 186, city_nm: '가리', city_lang: ['오세아니아어'], city_religion: '-' },
  // { city_id: 187, city_nm: '어널래스카', city_lang: ['북아메리카어'], city_religion: '-' },
  // { city_id: 188, city_nm: '카카투와', city_lang: ['오세아니아어'], city_religion: '-' },
  // { city_id: 189, city_nm: '포트피리', city_lang: ['오세아니아어'], city_religion: '-' },
  // { city_id: 190, city_nm: '핀자라', city_lang: ['오세아니아어'], city_religion: '-' },
  // { city_id: 191, city_nm: '호바톤', city_lang: ['오세아니아어'], city_religion: '-' },
  // { city_id: 192, city_nm: '한양', city_lang: ['조선어'], city_religion: '불교' },
  // { city_id: 193, city_nm: '동래', city_lang: ['조선어'], city_religion: '불교' },
  // { city_id: 194, city_nm: '덕원', city_lang: ['조선어'], city_religion: '불교' },
  // { city_id: 195, city_nm: '영일', city_lang: ['조선어'], city_religion: '불교' },
  // { city_id: 196, city_nm: '제주', city_lang: ['조선어'], city_religion: '불교' },
  // { city_id: 197, city_nm: '에도', city_lang: ['일본어'], city_religion: '불교' },
  // { city_id: 198, city_nm: '나가사키', city_lang: ['일본어'], city_religion: '불교' },
  // { city_id: 199, city_nm: '사카이', city_lang: ['일본어'], city_religion: '불교' },
  // { city_id: 200, city_nm: '수이', city_lang: ['일본어'], city_religion: '불교' },
  // { city_id: 201, city_nm: '에조', city_lang: ['일본어'], city_religion: '불교' },
  // ];

  function handleMarkerClick(id: string) {
    if (citys[citys.length - 1] !== id) {
      // 값이 없으면 배열에 추가
      setCitys([...citys, id]);
    } else {
      // 값이 있으면 배열에서 제거
      setCitys(citys.slice(0, citys.length - 1));
    }
  }

  const { data: cityDatas } = useQuery(['citys'], getCitys);
  const handleDelete = (delIndex: number): void => setCitys(citys.filter((city, index) => index !== delIndex));

  return (
    <div className='flex'>
      <div className='basis-4/6'>
        <ComposableMap projectionConfig={{ scale: 110 }} width={650} height={500}>
          <ZoomableGroup center={[15, 40]} zoom={7}>
            <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#D0AE89' />)}</Geographies>
            {cityDatas &&
              cityDatas.map(({ city_id, goods_url, city_nm, city_coordinates, markerOffset }) => (
                <Marker className='cursor-pointer' key={city_id} coordinates={city_coordinates} onClick={() => handleMarkerClick(city_nm)}>
                  <circle r={0.55} fill='#F00' />
                  <text textAnchor='middle' y={markerOffset ? markerOffset : 2} style={{ fontSize: 1, fontWeight: 'bold', fontFamily: 'system-ui', fill: citys.includes(city_nm) ? '#F00' : '#5D5A6D' }}>
                    {city_nm}
                    <img src={goods_url} alt='' />
                  </text>
                </Marker>
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className='m-2 basis-2/6'>
        {citys.map((city, index) => (
          <InfoContextProvider>
            <City key={index} city={city} nextCity={citys[index + 1]} index={index} onDelete={handleDelete} />
          </InfoContextProvider>
        ))}
      </div>
    </div>
  );
}

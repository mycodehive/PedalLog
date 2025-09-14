import { Coordinates } from '../types';

/**
 * 두 위도/경도 지점 간의 거리를 킬로미터 단위로 계산합니다 (하버사인 공식).
 */
export function getDistanceFromLatLonInKm(p1: Coordinates, p2: Coordinates): number {
  const R = 6371; // 지구의 반경 (km)
  const dLat = deg2rad(p2.lat - p1.lat);
  const dLon = deg2rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 거리 (km)
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

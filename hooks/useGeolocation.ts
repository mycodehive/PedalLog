import { useState, useRef, useCallback } from 'react';
import type { Coordinates, TrackingData } from '../types';
import { getDistanceFromLatLonInKm } from '../utils/geolocation';

const initialTrackingData: TrackingData = {
  currentSpeed: 0,
  distance: 0,
  maxSpeed: 0,
  path: [],
  elapsedTime: 0,
};

export const useGeolocation = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<TrackingData>(initialTrackingData);

  const watchId = useRef<number | null>(null);
  const lastPosition = useRef<Coordinates | null>(null);
  const timerId = useRef<number | null>(null);

  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude, speed } = position.coords;
    const currentCoords: Coordinates = { lat: latitude, lng: longitude };
    
    // speed는 m/s 단위이므로 km/h로 변환. null일 경우 0으로 처리.
    const currentSpeedKmh = (speed || 0) * 3.6;

    setTrackingData(prevData => {
      let newDistance = prevData.distance;
      if (lastPosition.current) {
        newDistance += getDistanceFromLatLonInKm(lastPosition.current, currentCoords);
      }
      lastPosition.current = currentCoords;

      return {
        ...prevData,
        currentSpeed: currentSpeedKmh,
        distance: newDistance,
        maxSpeed: Math.max(prevData.maxSpeed, currentSpeedKmh),
        path: [...prevData.path, currentCoords],
      };
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    if (err.code === 1) {
      setError("위치 정보 접근이 거부되었습니다. 브라우저 설정을 확인해주세요.");
    } else {
      setError(`위치 정보를 가져올 수 없습니다: ${err.message}`);
    }
    stopTracking();
  };

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 위치 정보 기능을 사용할 수 없습니다.");
      return;
    }
    
    setError(null);
    setTrackingData(initialTrackingData);
    lastPosition.current = null;
    setIsTracking(true);

    const startTime = Date.now();
    timerId.current = window.setInterval(() => {
      setTrackingData(prevData => ({
        ...prevData,
        elapsedTime: Math.floor((Date.now() - startTime) / 1000),
      }));
    }, 1000);

    watchId.current = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  const stopTracking = useCallback(() => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
    setIsTracking(false);
  }, []);

  return { isTracking, startTracking, stopTracking, trackingData, error };
};
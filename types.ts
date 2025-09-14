export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TrackingData {
  currentSpeed: number;
  distance: number;
  maxSpeed: number;
  path: Coordinates[];
  elapsedTime: number;
}
import React, {useEffect, useState} from 'react';
import Map, { GeolocateControl, NavigationControl, Source, Layer} from 'react-map-gl';
import {lostPetCoordsState} from "atoms/atoms"
import {useSetRecoilState} from "recoil"

export function Mapbox() {
  const setLostPetCoordsState = useSetRecoilState(lostPetCoordsState)

  const [petZoneCoords, setPetZoneCoords] = useState({
    type: 'FeatureCollection' as 'FeatureCollection',
    features: [
      {type: 'Feature' as 'Feature', geometry: {type: 'Point' as 'Point',  coordinates: []}, properties: [""]}
    ],
  })

  useEffect(()=>{
    setLostPetCoordsState(petZoneCoords.features[0].geometry.coordinates)
  }, [petZoneCoords])
    
    function handleClick(e) {
      const lat = parseFloat(e.lngLat.lat)
      const lng= parseFloat(e.lngLat.lng)
      
      setPetZoneCoords({
        type: 'FeatureCollection' as 'FeatureCollection',
    features: [
      {type: 'Feature' as 'Feature', geometry: {type: 'Point' as 'Point',  coordinates: [lng, lat]}, properties: [""]} 
    ] 
      })
  }
  
  const layerStyle = {
    id: 'point',
    type: 'circle' as 'sky',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };
  
  return (
    <Map
    initialViewState={{
      longitude: -58.4374742,
      latitude: -34.593171,
      zoom: 10
    }}
    style={{width: 350, height: 350, borderRadius: "4px"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken="pk.eyJ1IjoiaGFjaGVjb3NpbiIsImEiOiJja3pwaXd1amg2OTE2MndtemtmMHV4MzN1In0.D0p6cNSXOMBxio-BgB6gbA"
    attributionControl={false}
    onClick={handleClick}
    >
        <NavigationControl/>
        <GeolocateControl/>
      {petZoneCoords.features[0].geometry.coordinates[0]?
        <Source id="my-data" type="geojson" data={petZoneCoords}>
          <Layer {...layerStyle} />
        </Source> : ""}
    </Map>
  );
}
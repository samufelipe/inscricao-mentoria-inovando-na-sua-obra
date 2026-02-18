import { MapView } from "@/components/Map";
import { ArchitecturalTitle } from "./architectural-title";

export function LocationMap() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 z-10 bg-white/90 backdrop-blur-sm p-8 m-4 md:m-8 max-w-md border-l-4 border-[oklch(0.75_0.18_65)] shadow-lg">
        <p className="text-[oklch(0.75_0.18_65)] text-xs font-bold tracking-widest uppercase mb-2">Local do Evento</p>
        <ArchitecturalTitle variant="h3" color="purple" className="mb-4">
          Auditório AFRESP
        </ArchitecturalTitle>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Av. Brigadeiro Luís Antônio, 4843<br />
          Jardim Paulista, São Paulo - SP<br />
          01401-002
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-[oklch(0.35_0.12_320)]">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Capacidade para 297 pessoas
        </div>
      </div>
      
      <MapView 
        className="w-full h-full"
        onMapReady={(map) => {
          const location = { lat: -23.5826, lng: -46.6667 }; // Approx coords for AFRESP
          
          map.setCenter(location);
          map.setZoom(15);
          
          new google.maps.Marker({
            position: location,
            map: map,
            title: "Auditório AFRESP",
            animation: google.maps.Animation.DROP,
          });
          
          // Style the map to match the architectural theme (grayscale + purple)
          map.setOptions({
            styles: [
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
              },
              {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{"color": "#dedede"}, {"lightness": 21}]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
              },
              {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
              },
              {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
              }
            ]
          });
        }}
      />
    </div>
  );
}

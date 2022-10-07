import { Viewer } from 'photo-sphere-viewer';
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers';
import { VideoPlugin } from 'photo-sphere-viewer/dist/plugins/video';
import { EquirectangularVideoAdapter } from 'photo-sphere-viewer/dist/adapters/equirectangular-video';


const viewer = new Viewer({
  container: document.querySelector('#viewer'),
  panorama: '/public/asset/i002.jpg',
  plugins: [
    [MarkersPlugin, {
      markers: [
        {
          id: 'marker1',
          longitude: 0,
          latitude: 0,
          image: 'public/asset/marker.png',
          width: 32,
          height: 32,
          anchor: 'bottom center',
          tooltip: 'Marker 1'},],
        }
      ],
  ]
});

// testing show video
// const viewer = new Viewer({
//   adapter: EquirectangularVideoAdapter,
//   container: document.querySelector('#viewer'),
//   panorama: {
//     source: 'public/asset/Ayutthaya_HD.mp4',
//   },
//   plugins: [
//     [VideoPlugin, MarkersPlugin, {
//       markers: [
//         {
//           id: 'new-marker',
//           longitude: 0,
//           latitude: 0,
//           image: 'public/asset/pin-blue.png',
//           width: 32,
//           height: 32,
//         },
//       ],
//     }],
//   ],
// });

const markersPlugin = viewer.getPlugin(MarkersPlugin);

markersPlugin.on('select-marker', (e, marker) => {
  markersPlugin.updateMarker({
    id: marker.id,
    image: 'public/asset/pin-blue.png'
  });
  
});

viewer.on('click', (e, data) => {
  if (!data.rightclick) {
    markersPlugin.addMarker({
      id: '#' + Math.random(),
      longitude: data.longitude,
      latitude: data.latitude,
      image: 'public/asset/pin-blue.png',
      width: 32,
      height: 32,
      anchor: 'bottom center',
      tooltip: 'Generated pin',
      data: {
        generated: true
      }
    });
  }
});




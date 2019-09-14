import mapboxgl from 'mapbox-gl';

export default ({app}, inject) => {
    inject('mapboxgl', mapboxgl);
};

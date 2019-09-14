export const mapToken = 'pk.eyJ1IjoidGFzaGlyIiwiYSI6ImNqdnA2OGtqMTF6OGkzenJ0d3k5eXNzYnQifQ.jJLoXi58MO9LH0zEDspmag';

export const mapStyles = 'mapbox://styles/tashir/cjxd6orhn0e4i1cnxrv72gu6l';

export const revertCords = (cords) => [Number(cords[1]), Number(cords[0])];

export const generateMarker = (className, html) => {
    const el = document.createElement('DIV');
    el.classList.add(className || 'mb-marker');
    el.innerHTML = html || '<div class="mb-marker__icn"></div>';
    return el;
};

export const infraIconTemplate = (coords, name, address, svg) => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: revertCords(coords),
        },
        properties: {
            name: name,
            address: address,
            coords: revertCords(coords)
        }
    };
};

export const generateInfraGeoJson = types => {
    return new Promise(resolve => {
        let arr = [];

        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let typeObj = {
                id: type.id,
                icon: type.icon,
                json: {
                    'type': 'FeatureCollection',
                    'features': []
                }
            };

            for (let y = 0; y < type.infra_set.length; y++) {
                let infra = type.infra_set[y];
                let item = infraIconTemplate(infra.coords, infra.name, infra.address, type.icon);

                typeObj.json.features.push(item);
            }

            arr.push(typeObj);
            if (i === types.length - 1) resolve(arr);
        }
    });
};

let size = 32;
export const generateInfraMarker = (map, type) => ({
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd: function () {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    render: function () {
        let radius = size / 2;
        let context = this.context;

        context.beginPath();
        context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fill();

        if (type.icon) {
            let icon = type.icon;
            icon = icon.replace('<svg', '<svg stroke="black"');

            let svg64 = btoa(icon);
            let b64Start = 'data:image/svg+xml;base64,';
            let image64 = b64Start + svg64;

            let image = new Image();
            image.src = image64;
            context.drawImage(image, radius / 2, radius / 2, radius, radius);
        }

        this.data = context.getImageData(0, 0, size, size).data;
        map.triggerRepaint();

        return true;
    }
});

export const decodeCordsFromObject = ({lat, lng}) => {
    return [lng, lat];
};
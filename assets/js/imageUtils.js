export const loadImage = path => {
    return new Promise(resolve => {
        let img = new Image;

        img.onload = function () {
            console.log();
            resolve([path, img]);
        };

        img.src = path;
    });
};

export const getNaturalProps = src => {
    return new Promise((resolve, reject) => {
        loadImage(src)
            .then(([path, img]) => {
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            });
    });
};
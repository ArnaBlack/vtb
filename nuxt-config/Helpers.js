import fs from 'fs';

export const componentFolder = (path) => {
    let components = fs.readdirSync(path);
    return components.join(',');
};

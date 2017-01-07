import path from 'path';

class Store{
    get(dir){
        if (!dir) dir = '';
        return fetch(path.join('/api/dir', dir));
    }
}

export default new Store();
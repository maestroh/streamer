import path from 'path';

class Store{
    get(dir){
        return fetch(path.join('/api/dir', dir));
    }
}

export default new Store();
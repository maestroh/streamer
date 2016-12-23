import path from 'path';

class Store{
    get(file){
        console.log('file2',file);
        return fetch(path.join('/api/', file));
    }
}

export default new Store();
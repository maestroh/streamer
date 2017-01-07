import path from 'path';

let subscription = null;

class Store{
    get(dir){
        if (!dir) dir = '';
        return fetch(path.join('/api/dir', dir));
    }

    subscribe(cb){
        subscription = cb;
    }

    play(file){
        var route = path.join('/api/audio', file);
        subscription(route);
    }
}

export default new Store();
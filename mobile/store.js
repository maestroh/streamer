import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Audio } from 'expo';
const url = 'http://192.168.1.242:3001';

class PlayStore {
  constructor() {
    Audio.setIsEnabledAsync(true);
    this._sound = undefined;
  }

  play(file) {
    var route = url + '/api/audio/' + file;

    this._sound = new Audio.Sound({
      source: route,
    });
    this._sound.loadAsync()
      .then(v => {
        this._sound.playAsync();
      })
      .catch(console.log);
  }
}

class PlaylistStore {
  constructor() {
    this._subscription = null;
  }
  subscribe(cb) {
    this._subscription = cb;
  }
  load(files, file) {
    this._subscription(files, file);
  }

}

class DirectoryStore {
  constructor() {
    this.directories$ = new ReplaySubject(1);
  }
  get(dir) {
    if (!dir) dir = '';
    fetch(url + '/api/dir/' + dir)
      .then(response => {
        response.json()
          .then(value =>
            this.directories$.next(value));

      });
  }
}

let playStore = new PlayStore();
let directoryStore = new DirectoryStore();
let playlistStore = new PlaylistStore();
export { playStore, directoryStore, playlistStore };
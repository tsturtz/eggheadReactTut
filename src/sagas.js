import { fetchImages } from './flickr';
import { put, take, fork } from 'redux-saga/effects';

export function* loadImages() {
  try {
    const images = yield fetchImages();
    yield put({type: 'IMAGES_LOADED', images});
  }
  catch(error) {
    yield put({type: 'IMAGE_LOAD_FAILURE', error}) //no case for this in reducer YET
  }
}

export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    yield fork(loadImages);
  }
}

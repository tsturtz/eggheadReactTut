import test from 'tape';
import {put, take, fork} from 'redux-saga/effects'
import {watchForLoadImages, loadImages} from './sagas';
import {fetchImages} from './flickr';

test('watchForLoadImages', assert => {
  const genWatch = watchForLoadImages();

  assert.deepEqual(
    genWatch.next().value,
    take('LOAD_IMAGES'),
    'watchForLoadImages should be waiting for LOAD_IMAGES action'
  );

  assert.deepEqual(
    genWatch.next().value,
    fork(loadImages),
    'watchForLoadImages should call loadImages after LOAD_IMAGES action is received'
  );

  assert.end();
});

test('loadImages', assert => {
  const gen = loadImages();

  assert.deepEqual(
    gen.next().value,
    call(fetchImages),
    'loadImages should call the fetchImages api'
  );

  const images = [0];

  assert.deepEqual(
    gen.next(images).value,
    put({type: 'IMAGES_LOADED', images}),
    'loadImages should dispatch an IMAGES_LOADED action with the images'
  );

  assert.deepEqual(
    gen.next(images).value,
    put({type: 'IMAGE_SELECTED', image: images[0]}),
    'loadImages should dispatch an IMAGE_SELECTED action with the first image'
  );

  const error = 'error';

  assert.deepEqual(
    gen.throw(error).value,
    put({type: 'IMAGE_LOAD_FAILURE', error}),
    'loadImages should dispatch an IMAGE_LOAD_FAILURE if an error is thrown'
  );

  assert.end();
});

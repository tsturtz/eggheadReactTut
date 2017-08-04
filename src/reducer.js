////
// The reducer needs to return the current state of the application.
////

// In Redux, reducers don’t have side effects. This means that reducers don’t handle async activity in our application. We can’t use them to load our remote data because reducers are pure functions with no side effects.

// const defaultState = {
//   images: [
//     "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg", "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
//     "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg", "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg", "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
//   ],
//   selectedImage: "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg"
// }

const defaultState = {
  selectedImage : '',
  images: []
}

// export this function back to component
export default function images(state = defaultState, action) {
  switch(action.type) {
    case 'IMAGE_SELECTED':
      //console.log('test', state, action);
      return {...state, selectedImage: action.image};
    case 'IMAGES_LOADED':
      return {...state, images: action.images, selectedImage: action.images[0]};
    case 'IMAGE_LOAD_FAILURE':
      return {...state, error: 'error'};
    default:
      return state;
  }
}

// To review, we’ve done several things:

// -- created a reducer that contains the initial (default) state of our application and listens for actions

// -- created a store that consumes the reducer and provides a dispatcher that we can use to dispatch actions

// -- connected our Gallery component to the store

// -- mapped the store’s state to props that are passed to the Gallery

// -- mapped an action creator function so that the Gallery can simply call selectImage(image) and the application state will update.

// How do we use these patterns and load data from the remote data source? This is where it gets interesting!

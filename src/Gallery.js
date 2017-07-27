import React, {Component} from 'react'

const flickrImages = [
  "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg",
  "https://farm2.staticflickr.com/1581/25283151224_50f8da511e.jpg",
  "https://farm2.staticflickr.com/1653/25265109363_f204ea7b54.jpg",
  "https://farm2.staticflickr.com/1571/25911417225_a74c8041b0.jpg",
  "https://farm2.staticflickr.com/1450/25888412766_44745cbca3.jpg"
];

export default class Gallery extends Component {
  constructor(props) {
    // what is super(props)?
    super(props);
    // control state of this component
    this.state = {
      // assigns images the flickrImages const (hard coded array above is replaced by the flikr API call below)
      images: flickrImages,
      // sets initial image
      selectedImage: flickrImages[0]
    }
  }
  // "We are using React’s componentDidMount lifecycle method to trigger the loading of data from Flickr. We are using the fetch browser API to make a request to Flickr. Fetch returns a promise that resolves with response object. Calling response.json() gives us another promise, which is the actual JSON result we are looking for."
  componentDidMount() {
    const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
    const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=5`;

    fetch(API_ENDPOINT)
    .then((response) => {
      return response.json()
      .then((json) => {
        const images = json.photos.photo.map(({farm, server, id, secret}) => {
            return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        });
        // this sets the state with the updated images const and selected image
        this.setState({images, selectedImage: images[0]});
      })
    })
  }
  // this is a click handler from an element within this component
  handleThumbClick(selectedImage) {
    // set the state of this component
    this.setState({
      selectedImage
    })
  }
  render() {
    // render this stuff according to the component's state
    const {images, selectedImage} = this.state;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage} />
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            // "Note that we are using bind(this,image) in the onClick. By passing image as the second argument, it is sent as the first argument to handleThumbClick. This use of bind is an extermely handy way to pass context to an event handler."
            <div key={index} onClick={this.handleThumbClick.bind(this,image)}>
              <img src={image}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

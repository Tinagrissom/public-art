class App extends React.Component {
  state = {
    artist: '',
    title: '',
    location: '',
    image: '',
    address: '',
    input: 'Texas',
    show: false,
    art: []
  }

  refresh = () => {
    event.preventDefault()
    this.setState({
      input: 'Texas'
    })
  }

  componentDidMount = () => {
    axios.get('api/art').then(
      (response) => {
        this.setState({
          art:response.data,
          artist: '',
          title: '',
          location: '',
          image: '',
          address: '',
        })
      })
  }

  showModal = (event) => {
    event.preventDefault()
    this.setState({
      show: !this.state.show
      })
  }

  closeModal = () => {
    event.preventDefault()
    this.setState({
      show: !this.state.show
    })
  }

  handleSearch = (event) => {
    event.preventDefault()
    axios.get('art/api').then((response) => {
      this.setState({
        art:response.data,
        artist: '',
        title: '',
        location: '',
        image: '',
        address: '',
      })
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  deleteArt = (event) => {
    axios.delete('/api/art/' + event.target.value).then((response) => {
      this.setState({
        art: response.data,
      })
    })
  }

  updateArt = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/api/art/' + id, this.state).then((response) => {
      this.setState({
        art: response.data,
        artist: '',
        title: '',
        location: '',
        image: '',
        address: '',
      })
    })
  }

  handleChanges = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  addArt = (event) => {
    event.preventDefault()
    axios.post('/api/art', this.state).then((response) => {
      this.setState({ art: response.data, artist: '', title: '', location: '', image: '', address: '', })
    })
  }

  render = () => {
    return <div>
          {this.state.show === true ?
            <div id="modal">
              <div id="modal-text" className="hello">
                  <p>Hello,</p>
                  <br />
                  <p>I do consider this an incomplete list of Public Art in Texas.
                  If you have knowledge of a public works that is not included, I would love to hear from you!
                  I want to make this as comprehensive as possible, and I appreciate any and all suggestions. </p>
                  <a href="mailto:tinagrissom@yahoo.com">Email me</a>
                  <h2>Thanks for visiting!</h2>
                  <p>-Tina Marie</p>
                  <button type="button" id="close" onClick={this.closeModal}>X</button>
                </div>
              </div>
            : '' }
        <div className="main">
        <div className="header">
        <button type="button" id="open" onClick={this.showModal}>Get in Touch</button>
        <h1>Public <span>ART</span> in <span>{this.state.input}</span> </h1>
        <div id="narrow">
        <p>Filter your search by City: </p>
        <select name="locations" id="input" onChange={this.handleInput}>
                <option value="Texas">Select City</option>
                <option value="Amarillo">Amarillo</option>
                <option value="Austin">Austin</option>
                <option value="Dallas">Dallas</option>
                <option value="Denton">Denton</option>
                <option value="El Paso">El Paso</option>
                <option value="Fort Worth">Fort Worth</option>
                <option value="Galveston">Galveston</option>
                <option value="Houston">Houston</option>
                <option value="Marfa">Marfa</option>
                <option value="San Antonio">San Antonio</option>
              </select>
              </div>
              <form onSubmit={this.handleSearch} id="narrow">
              <button onClick={this.refresh}>Back to all Art</button>
              </form>
        </div>

        <ul>
          <div className="row">
        {
          this.state.art.map(
            (art, index) => {
              if(art.location == this.state.input ) {
                  return <div className="card">
                          <li>
                              <img src={art.image}/>
                              <span id="name">{art.artist}</span>
                              <br />
                              "{art.title}" | {art.location}<br />
                              <button id="directions"><a href={'http://maps.google.com/?q=' + art.address} target="_blank">Directions</a></button>
                          </li>
                    </div>
                  } else if (this.state.input == 'Texas') {
                    return <div className="card">
                            <li>
                                <img src={art.image}/>
                                <span id="name">{art.artist}</span>
                                <br />
                                "{art.title}" | {art.location}<br />
                                <button id="directions"><a href={'http://maps.google.com/?q=' + art.address} target="_blank">Directions</a></button>
                            </li>
                      </div>
                  }
              })}
            </div>
          </ul>
        </div>
        </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

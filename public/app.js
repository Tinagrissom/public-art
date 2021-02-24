class App extends React.Component {
  state = {
    artist: '',
    title: '',
    location: '',
    image: '',
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
      this.setState({ art: response.data, artist: '', title: '', location: '', image: '' })
    })
  }

  render = () => {
    return <div className="main">
        <div className="header">
        <h1>Public <span>ART</span> in <span>{this.state.input}</span> </h1>
        <div id="narrow">
        <p>Filter your search by City: </p>
        <select name="locations" id="input" onChange={this.handleInput}>
                <option value="Texas">Select City</option>
                <option value="Austin">Austin</option>
                <option value="Dallas">Dallas</option>
                <option value="Denton">Denton</option>
                <option value="Fort Worth">Fort Worth</option>
                <option value="Galveston">Galveston</option>
                <option value="Houston">Houston</option>
                <option value="San Antonio">San Antonio</option>
              </select>
              </div>
              <form onSubmit={this.handleSearch} id="narrow">
              <button onClick={this.refresh}>Back to all Art</button>
              </form>
        </div>
        {this.state.show === true ?
          <div id="modal">
            <div id="modal-img">
              {this.state.art.map((art) => {
                  <img src={art.image}/>
                })
              }
                <button type="button" id="close" onClick={this.closeModal}>X</button>
              </div>
            </div>
          : '' }

        <ul>
          <div className="row">
        {
          this.state.art.map(
            (art, index) => {
              if(art.location == this.state.input ) {
                  return <div className="card">
                          <li>
                              {art.artist}: {art.title}
                              <br />
                              <img src={art.image}/>
                              {art.location}<br />
                          </li>
                    </div>
                  } else if (this.state.input == 'Texas') {
                    return <div className="card">
                            <li>
                                {art.artist}: {art.title}<br />
                                <img src={art.image}/>
                                {art.location}<br />
                            </li>
                      </div>
                  }
              })}
            </div>
          </ul>
        </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

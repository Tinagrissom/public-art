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

  showModal = () => {
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
    return <div>
      <button type="button" id="open" onClick={this.showModal}>Add Works</button>
      {this.state.show === true ?
        <div id="modal">
          <div id="modal-text">
              <h2>Add work to this list</h2>
              <form onSubmit={this.addArt}>
                  <input type="text" id="artist" placeholder="Artist" onChange={this.handleChanges}/>
                  <br />
                  <input type="text" id="title" placeholder="Title" onChange={this.handleChanges}/>
                  <br />
                  <input type="text" id="location" placeholder="Location" onChange={this.handleChanges}/>
                  <br />
                  <input type="text" id="image" placeholder="Image URL" onChange={this.handleChanges}/>
                  <br />
                  <input type="submit" value="ADD" />
              </form>
              <button type="button" id="close" onClick={this.closeModal}>X</button>
            </div>
          </div>
        : '' }
        <h1>Public Art Around {this.state.input}</h1>

        <form onSubmit={this.handleSearch}>
            <input type="text" id="input" onChange={this.handleInput}/>
            <input type="submit" id="search" value="Search"/>
        </form>
        <ul>
          <div className="row">
        {
          this.state.art.map(
            (art, index) => {
              if (art.location == this.state.input ) {
              return <div className="card">
                <li>
                    {art.artist}: {art.title}<br />
                    {art.location}<br />
                    <img src={art.image}/>
                    <button value={art.id} onClick={this.deleteArt}>Remove</button>
                    <details>
                        <summary>Edit</summary>
                        <form id={art.id} onSubmit={this.updateArt}>
                            <input type="text" id="artist" placeholder="Artist" onChange={this.handleChanges}/>
                            <br />
                            <input type="text" id="title" placeholder="Title" onChange={this.handleChanges}/>
                            <br />
                            <input type="text" id="location" placeholder="Location" onChange={this.handleChanges}/>
                            <br />
                            <input type="text" id="image" placeholder="Image URL" onChange={this.handleChanges}/>
                            <br />
                            <input type="submit" value="Update" />
                        </form>
                    </details>
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

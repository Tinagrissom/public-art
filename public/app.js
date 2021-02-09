class App extends React.Component {
  state = {
    artist: '',
    title: '',
    location: '',
    image: '',
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
        <h1>Public Art Near You</h1>
        {
          this.state.art.map(
            (art, index) => {
              return <li>
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
            }
          )
        }
        </div>
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)

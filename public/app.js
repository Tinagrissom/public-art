class App extends React.Component {
  state = {
    art: []
  }

  componentDidMount = () => {
    axios.get('api/art').then(
      (response) => {
        this.setState({
          art:response.data
        })
      }
    )
  }

  render = () => {
    return <div>
        <h1>Public Art Near You</h1>
        {
          this.state.art.map(
            (art, index) => {
              return <li>
                {art.artist}: {art.title}<br />
                {art.location}<br />
                <img src={art.image}/>
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

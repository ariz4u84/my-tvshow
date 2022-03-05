import React, { Component } from 'react';
import './App.css';
import { Modal, Row, Col, Container, Navbar, Button } from 'react-bootstrap';
import ShowDetails from './components/ShowDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showsAiring: [],
      openDetails: [],
      theme: 'light'
    };

    this.closeDetails = this.closeDetails.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  //setting theme
  setTheme(theme) {
    this.setState({ theme: theme });
  }

  toggleTheme() {
    if (this.state.theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      this.setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light')
      this.setTheme('light');
    }
  }

  //open a specific modal
  openDetails(id) {
    this.setState({
      openDetails: {
        [id]: true
      }
    });
  }

  //close a modal
  closeDetails() {
    this.setState({ openDetails: false });
  }

  handleShowDetails() {
    this.openDetails();
  }

  componentDidMount() {

    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      this.setTheme(localTheme);
    }

    
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then(res => res.json())
      .then(
        (results) => {
          this.setState({
            showsAiring: results
          });
        })
  }

  render() {
    let theme = this.state.theme;
    return (
      <div className={`App ${theme}`}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src="./logo.png"
              className="navbarLogo"
            />
            {'Shows Airing Today in India'}
          </Navbar.Brand>
          <Button variant="success" size="sm" onClick={this.toggleTheme}>
            {(this.state.theme === 'dark') ?<i className="fa fa-sun-o" /> : <i className="fa fa-moon-o" />}
          </Button>
        </Navbar>
        <Container>
          <Row>
            {this.state.showsAiring.map((item, i) => {
              return (
                <Col key={i} lg={3} md={4} sm={6} xs={12}>
                  <div
                    style={{ transitionDelay: '0.' + i + 's' }}
                    className="thumb center-block"
                  >
                    <div className="thumbImageContainer">
                      <div
                        className="thumbImage"
                        style={{
                          background: item.show.image ?
                            'url('+ item.show.image.medium +')' : '#333'
                        }}
                      />
                      <div className="thumbImageOverlayContainer"
                        onClick={this.openDetails.bind(this, i)}
                      >
                        <div className="thumbImageOverlay">
                        </div>
                      </div>
                    </div>
                    <div className="thumbTitle">{item.show.name}</div>
                    <div className="thumbAirtime">{item.show.schedule.time}</div>
                  </div>
                  <Modal
                    bssize="large"
                    show={this.state.openDetails[i] || false}
                    onHide={this.closeDetails}
                  >
                    <ShowDetails id={item.show.id} />
                  </Modal>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
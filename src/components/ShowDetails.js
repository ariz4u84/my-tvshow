import React, { Component } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import '../App.css';
import './ShowDetails.css';

class ShowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvDetails: {},
      loading: true
    };
  }

  componentDidMount() {

   
    let id = this.props.id;
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(
        (response) => response.json()
      )
      .then(
        (details) => {
          this.setState({
            tvDetails: details,
            loading: false
          });
        }
      )
  }

  render() {
    var bg = '';

    if (this.state.tvDetails.image && this.state.tvDetails.image.medium) {
      bg = 'url(' + this.state.tvDetails.image.medium + ')';
    } else {
      bg = '#333';
    }

    return (
      <div className="showsDetailsContainer">
        <div className="showsDetails" style={{ background: bg }} />
        <div className="showsDetailsOverlay">
          <Modal.Header closeButton={true} />
          <Modal.Body>
            {this.state.loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <Row>
                  <Col md={12}>
                    <div className="showsTitle">
                      <span className="showsName">
                        {this.state.tvDetails.name}
                      </span>
                    </div>
                    <div className="showsSubtitle">
                      <div> <b>Type: </b>{this.state.tvDetails.type ? this.state.tvDetails.type : ''}</div>
                      <i className="fa fa-clock-o" />
                      {' ' + this.state.tvDetails.runtime + ' min'}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <b>Summary</b>
                    <p className="showsOverview">
                      {this.state.tvDetails.summary}
                    </p>
                  </Col>
                  <Col md={4} sm={12} xs={12}>
                  <div className="showsSchedule">
                      {this.state.tvDetails.schedule.days.length !== 0 ? (
                        <div>
                          <div><b>Time: </b>{this.state.tvDetails.schedule.time}</div>
                          <div><b>Airing Days</b></div>
                          <ul> 
                            {this.state.tvDetails.schedule.days.map((day, i) => {
                              return <li key={i}>{day}</li>;
                            })}
                          </ul>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
        </div>
      </div>

    );
  }
}

export default ShowDetails;
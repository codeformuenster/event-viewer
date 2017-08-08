import {} from 'dotenv/config';
import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './Pin';


class EventCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
        viewport: {
        zoom: 15,
        bearing: 0,
        pitch: 0,
        width: 400,
        height: 400,
      }
    };
  }

  render() {
    const {viewport} = this.state;

    return (
      <div className="Event">
      {this.state.items.map ((e, index) => {
        return (
         <div>
            <Card className="Card">
              <CardHeader
                key={index}
                title={e.name}
                subtitle={e.startDate + " bis " + e.endDate}
                actAsExpander={false}
              />
              <CardText>
                <div className="Description">
                  {e.description}
                </div>
                <div className="Location">
                  {e.location.name}
                </div>
                <div className="Url">
                  Weitere Informationen unter {e.url}
                </div>
                {(e.location.geo) &&
                 <ReactMapGL
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this._updateViewport}
                    latitude={e.location.geo.latitude}
                    longitude={e.location.geo.longitude}
                    width={400}
                    height={400}

                    // Optionally call `setState` and use the state to update the map.
                    >
                      <Marker latitude={e.location.geo.latitude} longitude={e.location.geo.longitude} offsetLeft={-20} offsetTop={-10}>
                            <Pin size={30} />
                        </Marker>
                    </ReactMapGL>
                  }
              </CardText>
           </Card>
          </div>
        )
      })}
      </div>
    )
  }

  componentDidMount() {
    fetch('https://event-api.codeformuenster.org/v0/events')
      .then(result => result.json())
      .then(items => this.setState({items}));

   window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }
}

export default EventCard;

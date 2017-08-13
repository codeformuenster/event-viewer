import {} from 'dotenv/config';
import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import ReactMapGL, { Marker } from 'react-map-gl';
import Moment from 'react-moment';
import 'moment/locale/de';
import Pin from './Pin';
import Flexbox from 'flexbox-react';
// ^ see https://css-tricks.com/snippets/css/a-guide-to-flexbox/


// const token = process.env.MapboxAccessToken;



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
                subtitle={<Moment fromNow locale="de">{e.startDate}</Moment>}
                actAsExpander={false}
                avatar='data:image/svg+xml;charset=UTF-8,<svg%20width%3D"75"%20height%3D"75"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2075%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_15dc39fb053%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_15dc39fb053"><rect%20width%3D"75"%20height%3D"75"%20fill%3D"%23777"><%2Frect><g><text%20x%3D"18.5546875"%20y%3D"42">75x75<%2Ftext><%2Fg><%2Fg><%2Fsvg>' />

              <Flexbox flexDirection="column">
                <CardTitle title={e.name} subtitle="Card subtitle" />

                <Flexbox>
                  <Flexbox flexDirection="row" flexGrow="1">
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
                    </CardText>
                  </Flexbox>

                  {(e.location.geo) &&
                    <ReactMapGL
                      {...viewport}
                      mapStyle="mapbox://styles/mapbox/dark-v9"
                      mapboxApiAccessToken="pk.eyJ1IjoiY29kZTRtcyIsImEiOiJjajV0enltMnMxaGYxMzNxdDVjbnU5Zmh1In0.Yt7JtjMnXylpppUrTMWbGg"
                      onViewportChange={this._updateViewport}
                      latitude={e.location.geo.latitude}
                      longitude={e.location.geo.longitude}
                      width={400}
                      height={400} >
                      <Marker latitude={e.location.geo.latitude} longitude={e.location.geo.longitude} offsetLeft={-20} offsetTop={-10}>
                        <Pin size={30} />
                      </Marker>
                    </ReactMapGL>
                  }
                </Flexbox>
              </Flexbox>
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

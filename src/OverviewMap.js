import {} from 'dotenv/config';
import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './Pin';


class OverviewMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
        items: [],
        viewport: {
        latitude: 52,
        longitude:7,
        zoom: 4,
        bearing: 0,
        pitch: 0,
        width: 600,
        height: 400
      }
    };
  }

  render() {
    const {viewport} = this.state;

    return (
        <div className="OverviewMap">
            <Card className="Card">
                <CardHeader
                    title={"Übersichtskarte"}
                    actAsExpander={false}
                />
                <CardText>
                    {<ReactMapGL
                        {...viewport}
                        mapStyle="mapbox://styles/mapbox/dark-v9"
                        onViewportChange={this._onViewportChange}
                    >
                        {this.state.items.map ((e, index) => {
                            return (
                                (e.location.geo) &&
                                <Marker latitude={e.location.geo.latitude} longitude={e.location.geo.longitude} offsetLeft={-20} offsetTop={-10}>
                                    <Pin size={30} />
                                </Marker>
                            )
                        })}
                    </ReactMapGL>
                }
                </CardText>
            </Card>
        </div>
    )
  }

    componentDidMount() {
        fetch('https://event-api.codeformuenster.org/v0/events')
          .then(result => result.json())
          .then(items => this.setState({items}));

        window.addEventListener('resize', this._resize);
        //this._resize();
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

    _onViewportChange = viewport => this.setState({viewport});
}

export default OverviewMap;

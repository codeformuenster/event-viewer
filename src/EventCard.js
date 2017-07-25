import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class EventCard extends Component {

  constructor() {
    super()

    this.state = {
      items: []
    }
  }

  render() {
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
      .then(items => this.setState({items}))
  }
}

export default EventCard;

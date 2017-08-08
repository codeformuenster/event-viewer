import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import OverviewMap from './OverviewMap';
import EventCard from './EventCard';
import TitleComponent from './TitleComponent';

import './index.css';

const App = () => (
  <div>
  <MuiThemeProvider>
    <TitleComponent />
  </MuiThemeProvider>
  <MuiThemeProvider>
    <OverviewMap />
  </MuiThemeProvider>
  <MuiThemeProvider>
    <EventCard />
  </MuiThemeProvider>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

import React, {Component} from 'react';
import Table from './Table';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Hello I'm App</div>
        <Table />
      </div>
    );
  }
}

import React, {Component} from 'react';
import Table from './Table';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.setState({
      data: this.props.data
    });
  }

  render() {
    return (
      <div>
        <Table data={this.state.data}/>
      </div>
    );
  }
}

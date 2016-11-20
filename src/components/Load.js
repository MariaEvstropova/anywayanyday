import React, {Component} from 'react';

export default class Load extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {"Загружено " + this.props.data.Completed + "%"}
      </div>
    );
  }
}

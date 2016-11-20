//Компонент служит для отображения объема загруженной информации
import React, {Component} from 'react';

export default class Load extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="load">
        {"Загружено " + this.props.data.Completed + "%"}
      </div>
    );
  }
}

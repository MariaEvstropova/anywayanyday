//Если в перелете всего один рейс не имеет смысла разделять данные на 2 части,
//в таком случае заполняем этот компонент
import React, {Component} from 'react';

export default class FullInfoRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <tr className = "full-info-row">
        <td>{this.props.data.Legs[0].FlightNumber}</td>
        <td>{this.props.data.Airline}</td>
        <td>{this.props.data.Fare + ' руб.'}</td>
        <td>{this.props.data.Legs[0].DepartureDate}</td>
        <td>{this.props.data.Legs[this.props.data.Legs.length-1].ArrivalDate}</td>
        <td>{this.props.data.Duration}</td>
        <td>нет</td>
        <td>{this.props.data.Points[0]}</td>
        <td>{this.props.data.Points[this.props.data.Points.length-1]}</td>
        <td>{this.props.data.Legs[0].Plane}</td>
      </tr>
    );
  }
}

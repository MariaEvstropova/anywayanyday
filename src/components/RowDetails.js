//Компонент используется для перелетов с пересадками
//для каждого рейса создается экземпляр этого компонента с деталями данного перелета
import React, {Component} from 'react';

export default class RowDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className = "row-details">
        <td>{this.props.data.FlightNumber}</td>
        <td></td>
        <td></td>
        <td>{this.props.data.DepartureDate}</td>
        <td>{this.props.data.ArrivalDate}</td>
        <td>{this.props.data.FlightDuration}</td>
        <td></td>
        <td>{this.props.points[0]}</td>
        <td>{this.props.points[1]}</td>
        <td>{this.props.data.Plane}</td>
      </tr>
    );
  }
}

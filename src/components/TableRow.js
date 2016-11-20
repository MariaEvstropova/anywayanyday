//Компонент используется для перелетов с пересадками
//для перелета создается 1 экземпляр данного компонента, содержащий общую информацию
//и необходимо число экзепляров компонента RowDetails
import React, {Component} from 'react';

export default class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <tr className = "table-row">
        <td></td>
        <td>{this.props.data.Airline}</td>
        <td>{this.props.data.Fare + ' руб.'}</td>
        <td>{this.props.data.Legs[0].DepartureDate}</td>
        <td>{this.props.data.Legs[this.props.data.Legs.length-1].ArrivalDate}</td>
        <td>{this.props.data.Duration}</td>
        <td>{this.props.data.Points.length-2}</td>
        <td>{this.props.data.Points[0]}</td>
        <td>{this.props.data.Points[this.props.data.Points.length-1]}</td>
        <td></td>
      </tr>
    );
  }
}

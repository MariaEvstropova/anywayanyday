import React, {Component} from 'react';
import RowDetails from './RowDetails';

export default class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*let data = this.props.data.Legs;
    let details = data.map((item, index, array) => {
      return <RowDetails data={item} key={index}/>
    });*/

    return (
      <tr className = "table-row">
        <td></td>
        <td>{this.props.data.Airline}</td>
        <td>{this.props.data.Fare}</td>
        <td>{this.props.data.Legs[0].DepartureDate}</td>
        <td>{this.props.data.Legs[this.props.data.Legs.length-1].ArrivalDate}</td>
        <td></td>
        <td>Пересадки</td>
        <td>{this.props.data.Points[0]}</td>
        <td>{this.props.data.Points[this.props.data.Points.length-1]}</td>
        <td></td>
      </tr>
    );
  }
}

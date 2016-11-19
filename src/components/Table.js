import React, {Component} from 'react';
import TableRow from './TableRow';
import RowDetails from './RowDetails';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    /*let rows = data.map((item, index, array) => {
      return <TableRow data = {item} key = {index}/>
    });*/

    let rows = [];
    data.forEach((info, index, array) => {
      let mainInfo = <TableRow data = {info} key = {index}/>
      rows.push(mainInfo);
      info.Legs.forEach((leg, legIndex) => {
        let legInfo = <RowDetails data={leg} key={Math.random()*(Date.now()-legIndex) + legIndex}/>
        rows.push(legInfo);
      });
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Номер рейса</th>
            <th>Авиакомпания</th>
            <th>Стоимость</th>
            <th>Время вылета</th>
            <th>Время прилета</th>
            <th>Время в пути</th>
            <th>Пересадки</th>
            <th>Аэропорт вылета</th>
            <th>Аэропорт прилета</th>
            <th>Тип самолета</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

import React, {Component} from 'react';
import TableRow from './TableRow';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    );
  }
}

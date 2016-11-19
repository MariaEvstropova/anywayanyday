import React, {Component} from 'react';

export default class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className = "table-row">
        <td>Номер рейса</td>
        <td>Авиакомпания</td>
        <td>Стоимость</td>
        <td>Время вылета</td>
        <td>Время прилета</td>
        <td>Время в пути</td>
        <td>Пересадки</td>
        <td>Аэропорт вылета</td>
        <td>Аэропорт прилета</td>
        <td>Тип самолета</td>
      </tr>
    );
  }
}

//Компонент таблицы, создает по входным данным (props) экземпляры "строк"
import React, {Component} from 'react';
import TableRow from './TableRow';
import RowDetails from './RowDetails';
import FullInfoRow from './FullInfoRow';

export default class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;

    let rows = [];
    //Для всех входных данных создать строки
    data.forEach((info, index, array) => {
      if (info.Legs.length > 1) {
        //Если для данного перелета есть пересадки используем TableRow и RowDetails
        //Создаем 1 экземпляр TableRow для данного перелета
        let points = info.Points;
        let mainInfo = <TableRow data = {info} key = {index}/>
        rows.push(mainInfo);

        info.Legs.forEach((leg, legIndex) => {
          //Для всех промежуточных рейсов данного перелета создаем экземпляры RowDetails
          let pointsInfo = points.slice(legIndex, legIndex+2);
          let legInfo = <RowDetails data={leg} points={pointsInfo} key={Math.random()*(Date.now()-legIndex) + legIndex}/>
          rows.push(legInfo);
        });
      } else {
        //Если для данного перелета пересадок нет используем FullInfoRow
        let mainInfo = <FullInfoRow data = {info} key = {index}/>
        rows.push(mainInfo);
      }
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

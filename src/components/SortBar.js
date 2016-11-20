//Компонент для выбора метода сортировки

import React, {Component} from 'react';

export default class SortBar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  //Метод, подхватывающий изменения выбора метода сортировки
  handleChange(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    return (
      <div className="sort-bar">
        <form>
          <label>
            Сортировать по
            <select value={this.props.value} onChange={this.handleChange}>
              <option value="flight">Номер рейса</option>
              <option value="airline">Авиакомпания</option>
              <option value="cost">Стоимость</option>
              <option value="departureTime">Время вылета</option>
              <option value="arrivalTime">Время прилета</option>
              <option value="duration">Время в пути</option>
              <option value="changes">Пересадки</option>
              <option value="departureAir">Аэропорт вылета</option>
              <option value="arrivalAir">Аэропорт прилета</option>
              <option value="plane">Тип самолета</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

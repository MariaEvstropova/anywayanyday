import React, {Component} from 'react';
import Table from './Table';
import SortBar from './SortBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    //При загрузке данные должны быть отсортироанны по стоимости
    this.state = {
      sortBy: 'cost'
    };
    this.handleSortByChanged = this.handleSortByChanged.bind(this);
  }

  //Метод получает данные для сортировки и параметр по которому сортировать
  sort(data, sortBy) {
    //Необходимо создать копию массива входных данных, сортировать будем именно копию
    let newData = data.slice();
    switch (sortBy) {
      case 'flight':
        // Сортировка по номеру рейса, номера сортируются в алфавитном порядке
        newData.sort((flight1, flight2) => {
          if(flight1.Legs[0].FlightNumber < flight2.Legs[0].FlightNumber) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'airline':
        // Сортировка по авиакомпании, в алфавитном порядке
        newData.sort((flight1, flight2) => {
          if(flight1.Airline < flight2.Airline) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'cost':
        // Сортировка по стоимости
        newData.sort((flight1, flight2) => {
          if(flight1.Fare < flight2.Fare) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'departureTime':
        // Сортировка по времени отправления
        newData.sort((flight1, flight2) => {
          //Используются вспомогательные "сырые" данные
          //Рассматриваем время отправления первого из рейсов для данного перелета
          if(flight1.Legs[0].RowDepartureDate < flight2.Legs[0].RowDepartureDate) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'arrivalTime':
        // Сортировка по времени прибытия
        newData.sort((flight1, flight2) => {
          //Используются вспомогательные "сырые" данные
          //Рассматриваем время прибития для последнего из рейсов для данного перелета
          if(flight1.Legs[flight1.Legs.length - 1].RowArrivalDate < flight2.Legs[flight2.Legs.length - 1].RowArrivalDate) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'duration':
        // Сортировка по продолжительности перелета
        newData.sort((flight1, flight2) => {
          //Используются вспомогательные "сырые" данные
          if(flight1.RowDuration < flight2.RowDuration) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'changes':
        // Сортировка по числу пересадок
        newData.sort((flight1, flight2) => {
          if(flight1.Points.length < flight2.Points.length) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'departureAir':
        // Сортировка по аэропорту отправления, в алфавитном порядке
        newData.sort((flight1, flight2) => {
          if(flight1.Points[0] < flight2.Points[0]) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'arrivalAir':
        // Сортировка по аэропорту прибытия, в алфавитном порядке
        newData.sort((flight1, flight2) => {
          if(flight1.Points[flight1.Points.length - 1] < flight2.Points[flight2.Points.length - 1]) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'plane':
        // Сортировка по наименованию первого из самолетов, в алфавитном порядке
        newData.sort((flight1, flight2) => {
          if(flight1.Legs[0].Plane < flight2.Legs[0].Plane) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      default: break;
    }
    return newData;
  }

  //Записать выбор параметра по которому призводить сортировку в состояние
  handleSortByChanged(sortBy) {
    this.setState({
      sortBy: sortBy
    });
  }

  render() {
    return (
      <div>
        <SortBar value={this.state.sortBy} handleChange={this.handleSortByChanged}/>
        <Table data={this.sort(this.props.data, this.state.sortBy)}/>
      </div>
    );
  }
}

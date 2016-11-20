//Функция для преобразования ответа от сервера в неоходимый формат

export function createInitialState(response) {
  //Исходные данные
  let data = response.Airlines;
  let refsAirports = response.References.Airports;
  let refsCarriers = response.References.Carriers;
  let refsPlanes = response.References.Planes;
  //Массив результатов
  var result = [];

  //Совершаем проход по всем вложенным объектам и извлекаем полезную информацию
  data.forEach((airline, index, array) => {
    //Изменяем название авиакомпании в соответствии с данными из References
    refsCarriers.forEach(carrier => {
      if (carrier.Code == airline.Code) {
        airline.Code = carrier.Name;
        return;
      }
    });

    airline.Fares.forEach(fare => {
      fare.Directions.forEach(direction => {
        //Изменяем названия аэропортов в соответствии с данными из References
        let points = [];
        direction.Points.forEach(point => {
          refsAirports.forEach(airport => {
            if(airport.Code == point.ArrivalCode) {
              point.ArrivalCode = airport.Name;
              return;
            }
          });
          points.push(point.ArrivalCode);
        });

        direction.Variants.forEach(variant => {
          //В переменную info будем записывать полезные данные
          let info = {
            Airline: airline.Code, //Измененноеназвание авиакомпании
            Fare: fare.TotalAmount, //Стоимость билета
            Points: points //Измененные точки полета
          };

          let legs = []; //В этот массив будем заносить данные о каждом из перелетов
          variant.Legs.forEach(leg => {
            //Изменяем названия самолетов в соответствии с данными из References
            refsPlanes.forEach(plane => {
              if(plane.Code == leg.Plane) {
                leg.Plane = plane.Name;
                return;
              }
            });

            //В переменную legInfo будем записывать полезные данные, затем занесем ее в массив legs
            let legInfo = {
              FlightNumber: leg.FlightNumber, //Номер рейса
              FlightDuration: converTime(leg.FlightDuration), //Продолжительность полета
              DepartureDate: formatDate(convertDate(leg.DepartureDate)), //Время отправления
              ArrivalDate: formatDate(convertDate(leg.ArrivalDate)), //Время прибытия
              Plane: leg.Plane, //Измененное название самолета
              RowDepartureDate: leg.DepartureDate, //Вспомогательные данные для сортировки
              RowArrivalDate: leg.ArrivalDate //Вспомогательные данные для сортировки
            };

            legs.push(legInfo);
          });
          info.Legs = legs; //Заносим массив данных о перелетах в массив результатов

          info.Duration = calculateDuration(variant.Legs); //Заносим информацию об общей продолжительности перелета
          info.RowDuration = calculateRowDuration(variant.Legs); //Вспомогательные данные для сортировки

          //Случайно заметила, что сервер отдает данные для других дат :(
          //Например для даты 28.02 17:45
          //Для авиакомпании Alitalia
          //Такие перелеты заносить в результирующий набор не будем
          if (info.Legs[0].RowDepartureDate.slice(0,4) == '2102') result.push(info);
        });
      });
    });
  });

  return result;
}

//Функция преобразует время, переданное сервером в удобный для восприятия формат
function converTime(data) {
  let date;
  if (data[0] == '0') {
      if (data[1] == '0') date = data.slice(2, 4) + ' мин';
      else date = data.slice(1, 2) + ' ч ' + data.slice(2, 4) + ' мин';
  } else {
    date = data.slice(0, 2) + ' ч ' + data.slice(2, 4) + ' мин';
  }
  return date;
}

//Вспомогательная функция, преобразует дату в формате, отданном сервером в объект Date
function convertDate(data) {
  let date = new Date(2016, data.slice(2, 4)-1, data.slice(0, 2), data.slice(4, 6), data.slice(6));
  return date;
}

//Функция преобразует дату в удобный для восприятия формат
function formatDate(data) {
  let hours = data.getHours();
  let minutes = data.getMinutes();
  if (minutes.toString().length == 1) minutes = '0' + minutes;

  return hours + ':' + minutes;
}

//Функция делает подсчет длительности полета в миллисекундах
//Данные будут использоваться для сортировки
function calculateRowDuration(legs) {
  let departure = convertDate(legs[0].DepartureDate);
  let arrival = convertDate(legs[legs.length - 1].ArrivalDate);
  let duration = arrival.getTime() - departure.getTime(); //В миллисекундах
  return duration;
}

//Функция преобразует длительность перелета в удобный для восприятия формат
function calculateDuration(legs) {
  let duration = calculateRowDuration(legs); //В миллисекундах
  let sec = duration / 1000;
  let hours = Math.floor(sec / 3600  % 24);
  let minutes = sec / 60 % 60;
  if (minutes === 0) minutes = "00";

  return hours + " ч " + minutes + " мин";
}

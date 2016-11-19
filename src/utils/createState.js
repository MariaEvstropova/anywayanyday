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
            Fare: fare.TotalAmount + ' руб.', //Стоимость билета
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
              DepartureDate: convertDate(leg.DepartureDate), //Время отправления
              ArrivalDate: convertDate(leg.ArrivalDate), //Время прибытия
              Plane: leg.Plane //Измененное название самолета
            };

            legs.push(legInfo);
          });
          info.Legs = legs; //Заносим массив данных о перелетах в массив результатов
          result.push(info);
        });
      });
    });
  });

  return result;
}

function converTime(data) {
  let date;
  if (data[0] == '0') {
      if (data[1] == '0') date = data.slice(2, 4) + ' мин';
      else date = data.slice(1, 2) + ' ч ' + data.slice(2, 4) + ' мин';
  } else {s
    date = data.slice(0, 2) + ' ч ' + data.slice(2, 4) + ' мин';
  }
  return date;
}

function convertDate(data) {
  let date = new Date(2016, data.slice(2, 4)-1, data.slice(0, 2), data.slice(4, 6), data.slice(6));
  return date.toLocaleString();
}

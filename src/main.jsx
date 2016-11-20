import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Load from './components/Load';
import {createJsonpRequest} from './utils/load';
import {createInitialState} from './utils/createState';

var url1 = "http://api.anywayanyday.com/api/NewRequest3/?Route=2102MOWPARAD1CN0IN0SCE&Partner=awadweb&_Serialize=JSON";
var url2, url3;
var isComplete = false;

//Используем генератор для опросов сервера
function *polling() {
  do {
    yield createJsonpRequest(url2);
  } while (!isComplete);
}

//Рекурсивная функция для запуска опросов сервера
function runPolling(pollingIterator) {
  if (!pollingIterator) {
    //Если генератора опросов нет, создать новый генератор
    pollingIterator = polling();
  }
  //Производить опрос каждую секунду
  setTimeout(function() {
    let result = pollingIterator.next();
    if(result.value) {
      result.value.then(function (data) {
        if (!result.done) {
          if (data.Completed !== "100") {
            //Если данные загружены не до конца вывести информацию о количестве загруженных данных
            ReactDOM.render(<Load data={data}/>, document.getElementById('mount-point'));
            runPolling(pollingIterator);
          } else {
            //Данные загружены полностью
            //Перевести генератор в состояние "выполнено"
            isComplete = true;
            //Загрузить данные с сервера
            createJsonpRequest(url3).then((resolve, reject) => {
              //Данные получены, создаем экземпляр компонента приложения
              let state = createInitialState(resolve);
              ReactDOM.render(<App data={state}/>, document.getElementById('mount-point'));
            });
          }
        }
      });
    }
  }, 1000);
}

//Создать 1й запрос к серверу
createJsonpRequest(url1).then((resolve, reject) => {
  if (resolve.IdSynonym) {
    //Если ответ успешно получен сформировать ссылки для загрузки результатов
    url2 = "http://api.anywayanyday.com/api/RequestState/?R=" + resolve.IdSynonym + "&_Serialize=JSON";
    url3 = "http://api.anywayanyday.com/api/Fares2/?R=" + resolve.IdSynonym + "&L=RU&C=RUB&Limit=200&DebugFullNames=true&_Serialize=JSON";
  }
  //Запустить функцию опросов сервера
  runPolling();
});

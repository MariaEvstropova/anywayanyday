import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createJsonpRequest} from './utils/load';
import {createInitialState} from './utils/createState';

var url1 = "http://api.anywayanyday.com/api/NewRequest3/?Route=2102MOWPARAD1CN0IN0SCE&Partner=awadweb&_Serialize=JSON";
var url2, url3;
var isComplete = false;

function *polling() {
  do {
    yield createJsonpRequest(url2);
  } while (!isComplete);
}

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
        console.log(data);
        if (!result.done) {
          if (data.Completed !== "100") {
            document.getElementById('mount-point').innerHTML = "Загружено " + data.Completed + "%";
            runPolling(pollingIterator);
          } else {
            isComplete = true;
            createJsonpRequest(url3).then((resolve, reject) => {
              let state = createInitialState(resolve);
              console.log(state);
              ReactDOM.render(<App data={state}/>, document.getElementById('mount-point'));
            });
          }
        }
      });
    }
  }, 1000);
}

createJsonpRequest(url1).then((resolve, reject) => {
  if (resolve.IdSynonym) {
    url2 = "http://api.anywayanyday.com/api/RequestState/?R=" + resolve.IdSynonym + "&_Serialize=JSON";
    url3 = "http://api.anywayanyday.com/api/Fares2/?R=" + resolve.IdSynonym + "&L=RU&C=RUB&Limit=200&DebugFullNames=true&_Serialize=JSON";
  }
  runPolling();
});

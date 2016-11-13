//Функция получения данных от сервера.
//Т.к. сервер не поддерживает CORS неоходимо использовать JSONP для получения данных.
function createJsonpRequest(url) {

  return new Promise((resolve, reject) => {
    //Генерируем случайное имя функции callback для того чтобы при многочисленных обращениях оно было уникальным.
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    var script = createScript(url, callbackName);

    script.onerror = reject;

    document.body.appendChild(script);

    window[callbackName] = function(data) {
      resolve(data);

      window[callbackName] = null;
      delete window[callbackName];
      document.body.removeChild(script);
    };
  });
}

function createScript(url, callbackName) {
  var script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;

  return script;
}

var url1 = "http://api.anywayanyday.com/api/NewRequest3/?Route=2102MOWPARAD1CN0IN0SCE&Partner=awadweb&_Serialize=JSON";
var url2, url3;
var isComplete = false;

function *polling() {
  var count = 0, val={};
  yield createJsonpRequest(url1);
  do {
    count++;
    yield createJsonpRequest(url2);
  } while (!isComplete);
  yield createJsonpRequest(url3);
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
        if (data.IdSynonym) {
          url2 = "http://api.anywayanyday.com/api/RequestState/?R=" + data.IdSynonym + "&_Serialize=JSON";
          url3 = "http://api.anywayanyday.com/api/Fares2/?R=" + data.IdSynonym + "&L=RU&C=RUB&Limit=200&DebugFullNames=true&_Serialize=JSON";
        }
        if (!result.done) {
          if (data.Completed !== "100") {
            runPolling(pollingIterator);
          } else {
            isComplete = true;
            runPolling(pollingIterator);
          }
        }
      });
    }
  }, 1000);
}

runPolling();

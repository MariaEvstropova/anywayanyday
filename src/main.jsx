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

window.onload = function () {
  let url1 = "http://api.anywayanyday.com/api/NewRequest3/?Route=2102MOWPARAD1CN0IN0SCE&Partner=awadweb&_Serialize=JSON";
  let url2 = "http://api.anywayanyday.com/api/RequestState/?R={IdSynonym}&_Serialize=JSON";
  let url3 = "http://api.anywayanyday.com/api/Fares2/?R={IdSynonym}&L=RU&C=RUB&Limit=200&DebugFullNames=true&_Serialize=JSON";
  createJsonpRequest(url1).then(resolve => {
    console.log(resolve);
    return createJsonpRequest(url2);
  }).then(resolve => {
    console.log(resolve);
    return createJsonpRequest(url3);
  }).then(resolve => {
    console.log(resolve);
  });
};

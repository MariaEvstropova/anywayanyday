//Функция получения данных от сервера
//Т.к. сервер не поддерживает CORS неоходимо использовать JSONP для получения данных
export function createJsonpRequest(url) {

  return new Promise((resolve, reject) => {
    //Генерируем случайное имя функции callback для того чтобы при многочисленных обращениях оно было уникальным
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

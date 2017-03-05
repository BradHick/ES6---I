class HttpService {
  constructor() {

  }
  get(url){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            //pega os valores que estão no servidor e converte pra JSON
            resolve(JSON.parse(xhr.responseText));
          }else{
            reject(xhr.responseText);

          }
        }
      };

      xhr.send();

    });
  }
}

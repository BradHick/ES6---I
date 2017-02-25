

var campos = [
  document.querySelector('#data'),
  document.querySelector('#quantidade'),
  document.querySelector('#valor'),
];

var limpaCampos = function(){
    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();
}

console.log(campos);

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function(event){
  event.preventDefault();
  var tr = document.createElement('tr');

  campos.forEach(function(campo){
    var td = document.createElement('td');
    td.textContent = campo.value;
    tr.appendChild(td);
  }); //fim do forEach que percorre os elementos e cria uma td pra incluir na tr

  var tdVolume = document.createElement('td');
  tdVolume.textContent = campos[1].value * campos[2].value;
  tr.appendChild(tdVolume);

  tbody.appendChild(tr);
  limpaCampos();


}); //fim da finction para trabalhar com a submissão do form

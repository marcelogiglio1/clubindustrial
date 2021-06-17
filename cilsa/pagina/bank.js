var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre:   /^[a-zA-ZÀ-ÿ\s]{3,20}$/,//Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
	documento: /^\d{7,8}$/, // 7 a 8 numeros.
  cuenta: /^\d{8}$/, //8 numeros.
  cbu: /^\d{22}$/, // 22 numeros.
  monto: /^\d{1,6}$/ // 1 a 999999 pesos.
	
}

const campos = {
	nombre: false,
	apellido: false,
	documento: false,
	cuenta: false,
  cbu: false,
  monto: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "documento":
			validarCampo(expresiones.documento, e.target, 'documento');
		break;
		case "cuenta":
			validarCampo(expresiones.cuenta, e.target, 'cuenta');
		break;
		case "cbu":
			validarCampo(expresiones.cbu, e.target, 'cbu');
		break;
    case "monto":
			validarCampo(expresiones.monto, e.target, 'monto');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.documento && campos.cuenta && campos.cbu && campos.monto && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 500);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


document.querySelector('#mov').addEventListener('click', mostrarmov);

function mostrarmov(){ 
  const xa = new XMLHttpRequest('Access-Control-Allow-Origin','https://my-json-server.typicode.com/srocco/my-json-server/movimientos');
//
  xa.open('GET', 'https://my-json-server.typicode.com/srocco/my-json-server/movimientos', true);

  xa.send();

  xa.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200 ){

      let datos = JSON.parse(this.responseText);

        let tm = document.querySelector('#tmov');
      tm.innerHTML = ' ';

      for(let item of datos){
       tm.innerHTML += `
        <tr>
        <td>${item.fecha}</td>
        <td>${item.titulo}</td>
        <td>${item.credito}</td>
        <td>${item.debito}</td>
        
    </tr>
    `
      }
    }
  }
}
document.querySelector('#mas').addEventListener('click', mostrarmas);

function mostrarmas(){ 
  const xa = new XMLHttpRequest('Access-Control-Allow-Origin','https://my-json-server.typicode.com/srocco/my-json-server/movimientos');
//
  xa.open('GET', 'https://my-json-server.typicode.com/srocco/my-json-server/movimientos', true);

  xa.send();

  xa.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200 ){

      let datosa = JSON.parse(this.responseText);

        let tmm = document.querySelector('#tmas');
      tmm.innerHTML = ' ';

      for(let item of datosa){
       tmm.innerHTML += `
        <tr>
        <td>${item.fecha}</td>
        <td>${item.titulo}</td>
        <td>${item.credito}</td>
    </tr>
    `
      }
    }
  }
}
document.querySelector('#menos').addEventListener('click', mostrarmenos);

function mostrarmenos(){ 
  const xa = new XMLHttpRequest('Access-Control-Allow-Origin','https://my-json-server.typicode.com/srocco/my-json-server/movimientos');
//
  xa.open('GET', 'https://my-json-server.typicode.com/srocco/my-json-server/movimientos', true);

  xa.send();

  xa.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200 ){

      let datosb = JSON.parse(this.responseText);

        let tmn = document.querySelector('#tmenos');
      tmn.innerHTML = ' ';

      for(let item of datosb){
       tmn.innerHTML += `
        <tr>
        <td>${item.fecha}</td>
        <td>${item.titulo}</td>
        <td>${item.debito}</td>  
    </tr>
    `
      }
    }
  }
}

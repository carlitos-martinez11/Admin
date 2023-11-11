
import { Gift } from "../clases.js";
import {cargaDeDatos} from "../funciones.js";
let datos =[]

const cuerpoTabla = document.querySelector('#cuerpo-tabla');
// const myModal = new bootstrap.Modal(document.getElementById('modalGift'), options);


let idGiftUpdate = null;
window.mostrarModal = (id) => {
    console.log(id);
    let index = datos.findIndex((item) => item.id == idGiftUpdate);

  
    document.querySelector("#NombreModal").value = datos[index].Nombre;
    document.querySelector("#CategoriasModal").value = datos[index].Categorias;
    document.querySelector("#DescripcónModal").value = datos[index].Descripción;
    document.querySelector("#PrecioModal").value = datos[index].Precio;
    document.querySelector("#imagenModal").value = datos[index].imagen;

    myModal.Show();
};
  const giftUpdate = (e) => {
    e.preventDefault();
    let index = datos.findIndex((item) => item.id == idGiftUpdate);
    datos[index].Nombre = document.querySelector("#NombreModal").value;
    datos[index].Categorias = document.querySelector("#CategoriasModal").value;
    datos[index].Descripción = document.querySelector("#DescripciónModal").value;
    datos[index].Precio = document.querySelector("#PrecioModal").value;
    datos[index].imagen = document.querySelector("#imagenModal").value;
    localStorage.setItem('datos',JSON.stringify(datos));
    cargarTabla();
myModal.hide()
  };

  const cargarTabla = () => {
    datos=JSON.parse(localStorage.getItem('datos'))
    cuerpoTabla.innerHTML= "";
    datos.map((item)=>{
        const fila=document.createElement('tr');

        const celdas= `<th>${item.Nombre}</th>
            <td>$${item.Precio}</td>
            <td>${item.id}</td>
            <td>${item.Categorias}</td>
            <td>${item.Descripción}</td>
            <td>
            <div class="d-flex gap-3">
                <button class="btn btn-outline-success" onclick="mostrarModal(${item.id})><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="btn btn-outline-danger" onclick="borarGift(${item.id})><i class="fa fa-times" aria-hidden="true"></i></button>
                </td>
              `;
 
            fila.innerHTML = celdas;
            cuerpoTabla.append(fila);
    });
};

const agregarGift = (event) => {
    event.preventDefault();

    let id = datos.at(-1).id + 1;
    let gift = document.querySelector('#gift').value;
    let Nombre = document.querySelector('#Nombre').value;
    let Precio = document.querySelector('#Precio').value;
    let Categorias = document.querySelector('#Categorias').value;
    let Descripción = document.querySelector('#Descripción').value;
    let imagenes = document.querySelector('#imagenes').value;


      datos.push(new Gift(id, gift, Nombre, Precio, Categorias, Descripción, imagenes));
      document.querySelector("#formGift").reset();
      localStorage.setItem('datos',JSON.stringify(datos));
      cargarTabla();
   };



 window.borrarGift = (id) => {
    let index = datos.findIndex((item) => item.id == id);
  
    let validar = confirm(
      `Está seguro/a que quiere eliminar este juego ${datos[index].gift}?`
      );
  
    if (validar) {
      datos.splice(index, 1);
      localStorage.setItem('datos',JSON.stringify(datos));
      cargarTabla();
    }
  };
  cargaDeDatos()
  cargarTabla();
  
  
  document.querySelector("#formGift").addEventListener("submit", agregarGift);
document.querySelector('#formModal').addEventListener("submit", giftUpdate);
  

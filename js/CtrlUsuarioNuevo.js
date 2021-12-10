import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import { muestraUsuarios } from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaUsuario,
  selectAlumnos
} from "./usuarios.js";


const daoUsuario =
  getFirestore().
    collection("Usuario");
/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const listaRoles = document.
  querySelector("#listaRoles");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
    selectAlumnos(
      forma.alumnoId, "");
    checksRoles(listaRoles, []);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  const formData = new FormData(forma);
  const id = getString(formData, "cue").trim();
  await guardaUsuario(evt, formData, id);
  try {
      evt.preventDefault();
      /*const formData =
        new FormData(forma);*/
      const nombre = getString(formData, "nombre").trim();  
      const apellido = getString(formData, "apellido").trim();
      const curp = getString(formData, "curp").trim();
      const telefono = getString(formData, "telefono").trim();
      const fechayhora = getString(formData, "fechayhora").trim();
      const doctor = getString(formData, "doctor").trim();
      const motivo = getString(formData, "motivo").trim();
      /**
       * @type {
          import("./tipos.js").
                  Alumno} */
      const modelo = {
        nombre,
        apellido,
        curp,
        telefono, 
        fechayhora,
        doctor,
        motivo 
      };
      await daoUsuario.
        add(modelo);
      muestraUsuarios();
    } catch (e) {
      muestraError(e);
    }
  }
  
  


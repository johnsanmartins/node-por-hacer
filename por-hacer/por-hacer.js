const fs = require('fs');
const { removeAllListeners } = require('cluster');

let listadoPorHacer = [];

const guardarDB = () => {

    // stringify => COMBIERTE UN OBJETO EN UN JSON VALIDO
    let data = JSON.stringify(listadoPorHacer);

    //fs.writeFile('tabla-2.txt', data, (err) => {  //esta linea el nombre del archivo es fijo
    fs.writeFile(`db/data.json`, data, (err) => {
        //para que el archivo ser guarde en una direccion el nombre de este va antes un con ./NOMBRE-ARCHIVO/tabla
        if (err) throw new Error('No se pudo grabar', err);
    });

}

//metodo que indica la BBDD en este caso el json
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
        //con este clg puedo ver lo que esta dentro del archivo JSON
        // console.log(listadoPorHacer);
    } catch (error) {

        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    //con esto llama al metodo de la bbdd
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    //CON ESTO GUARDA EN EL JSON
    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;

    }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
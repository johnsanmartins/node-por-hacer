//
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'marca como completado o pendiente la tarea'

}


const argv = require('yargs')
    .command('crear', 'crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tare', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra la tarea indicada', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}
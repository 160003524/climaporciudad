require('dotenv').config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listadoLugares,
} = require('./help/inq');
const Busqueda = require('./model/busqueda');
require('colors');
//console.log(process.env);
const main = async () => {
  const busqueda = new Busqueda();
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const termino = await leerInput('Ciudad: ');
        const lugares = await busqueda.ciudad(termino);
        const id = await listadoLugares(lugares);
        if (id === '0') continue;
        const lugarSele = lugares.find((l) => l.id === id);
        busqueda.agregarHistorial(lugarSele.nombre);
        const clima = await busqueda.climaLugar(lugarSele.lat, lugarSele.lng);
        console.clear();
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad:', lugarSele.nombre);
        console.log('Latitud: ', lugarSele.lat);
        console.log('Longitud: ', lugarSele.lng);
        console.log('Temperatura: ', clima.temp);
        console.log('Temperatura minima: ', clima.min);
        console.log('Temperatura maxima: ', clima.max);
        console.log('Como esta el clima: ', clima.desc);
        break;
      case 2:
        busqueda.historialCapital.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }
    //console.log({ opt });

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();

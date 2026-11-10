import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, ChevronRight, Crosshair, MapPin, Mountain, Pause, Play, Radio, Waves, Wind, Wrench, Zap } from 'lucide-react';
import type { GradeLevel } from '../types';
import { AREAS_DATA } from '../data/areas';
import { CityMap } from './CityMap';

export const CITY_IDS = ['estructuras', 'hidraulica', 'movilidad', 'geotecnia', 'construccion', 'sostenibilidad'] as const;
const OUTSIDE_IDS = ['agua-rural', 'camino-sierra', 'planta-industrial', 'parque-eolico', 'muelle-logistico', 'borde-costero'] as const;
export const ZONE_IDS = [...CITY_IDS, ...OUTSIDE_IDS] as const;
export type OutsideId = typeof OUTSIDE_IDS[number];
export type ZoneId = typeof ZONE_IDS[number];
export type TerritoryId = 'ciudad' | 'sierra' | 'industria' | 'costa';

export type Teammate = { name: string; job: string; line: string; skin: string; helmet: string; kit: string; hair: 'short' | 'long'; glasses?: boolean };
type Puzzle = { prompt: string; hint: string; choices: [string, string, string]; answer: 0 | 1 | 2; retry: string };
export type Zone = { tag: string; title: string; problem: string; restored: string; team: [Teammate, Teammate]; levels: Record<GradeLevel, Puzzle> };
type OutsideZone = Zone & { label: string; specialty: string; position: [number, number] };

export const TERRITORIES: { id: TerritoryId; number: string; name: string; pitch: string; work: string; zones: readonly ZoneId[] }[] = [
  { id: 'ciudad', number: '01', name: 'Ciudad', pitch: 'Recupera los lugares que sostienen la vida diaria.', work: 'Edificios · transporte · obra urbana', zones: CITY_IDS },
  { id: 'sierra', number: '02', name: 'Campo y montaña', pitch: 'Lleva agua a una comunidad y vuelve a conectar la sierra.', work: 'Redes rurales · caminos · trabajo de campo', zones: ['agua-rural', 'camino-sierra'] },
  { id: 'industria', number: '03', name: 'Industria y energía', pitch: 'Pon en marcha una planta y prepara el terreno para generar energía.', work: 'Plantas industriales · cimentaciones · energía', zones: ['planta-industrial', 'parque-eolico'] },
  { id: 'costa', number: '04', name: 'Costa y puertos', pitch: 'Desbloquea un muelle y protege el acceso a la costa.', work: 'Terminales · logística · adaptación costera', zones: ['muelle-logistico', 'borde-costero'] },
];

export const OUTSIDE_ZONES: Record<OutsideId, OutsideZone> = {
  'agua-rural': {
    label: 'Red de agua rural', specialty: 'Hidráulica · redes y operación', position: [25, 55],
    tag: 'COMUNIDAD / RED DE AGUA', title: 'El agua dejó de llegar',
    problem: 'El tanque de la comunidad aún tiene agua, pero las tomas más alejadas apenas reciben un hilo. El equipo necesita localizar dónde se pierde presión.',
    restored: 'El equipo midió la presión, localizó una fuga y reparó el tramo. Las tomas alejadas vuelven a recibir agua en el escenario.',
    team: [
      { name: 'Alma', job: 'Ingeniera de redes de agua', line: 'Mido la presión en distintos tramos. Me gusta que una buena prueba pueda devolver agua a varias casas.', skin: '#AB664A', helmet: '#75BAC5', kit: '#205761', hair: 'long', glasses: true },
      { name: 'Beto', job: 'Ingeniero de operación', line: 'Recorro la red con el comité de agua. Me motiva aprender con quienes conocen el terreno de memoria.', skin: '#8A5239', helmet: '#FFA468', kit: '#734C30', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Cómo averiguas por dónde se pierde el agua?', hint: 'Compara lo que pasa cerca del tanque con lo que pasa en las tomas lejanas.', choices: ['Medir en varios puntos y revisar fugas', 'Pintar el tanque', 'Cerrar todas las tomas alejadas'], answer: 0, retry: 'Necesitas localizar el tramo que falla antes de decidir qué cambiar.' },
      '6': { prompt: 'Al tramo entran 6 L/s y se entregan 4 L/s. En este modelo sin almacenamiento, ¿qué pérdida queda por investigar?', hint: 'Haz un balance de caudales. La diferencia entre lo que entra y lo que se entrega es la pérdida del tramo.', choices: ['10 L/s', '2 L/s', '6 L/s'], answer: 1, retry: 'Resta el caudal que sí llega del que entra. Esa diferencia guía la búsqueda.' },
    },
  },
  'camino-sierra': {
    label: 'Camino de montaña', specialty: 'Geotecnia · conservación vial', position: [71, 59],
    tag: 'SIERRA / CAMINO COMUNITARIO', title: 'La sierra quedó incomunicada',
    problem: 'El agua cortó el borde de un camino después de la tormenta. Por aquí pasan alimentos y servicios para las comunidades.',
    restored: 'El equipo revisó el terreno, reconstruyó el borde y dio una salida al agua. El camino recupera su conexión en la maqueta.',
    team: [
      { name: 'Ximena', job: 'Ingeniera de conservación vial', line: 'Recorro caminos para detectar daños antes de que crezcan. Me importa que la gente pueda llegar a su comunidad.', skin: '#AA7858', helmet: '#FFD18B', kit: '#805431', hair: 'short' },
      { name: 'Mar', job: 'Ingeniera geotécnica', line: 'Observo suelo y escurrimientos en campo. Me encanta que el paisaje te dé pistas para resolver el problema.', skin: '#6D4638', helmet: '#BFD482', kit: '#4E5C38', hair: 'long', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Qué haces para que el agua no vuelva a llevarse el borde?', hint: 'Seguir la ruta del agua ayuda a decidir dónde darle una salida.', choices: ['Cubrir el corte con pintura', 'Echar más tierra sin revisar la lluvia', 'Revisar el drenaje y reconstruir el borde'], answer: 2, retry: 'Atiende tanto el daño como el camino que tomó el agua.' },
      '6': { prompt: 'En el levantamiento, el camino baja 2 m en 50 m horizontales. ¿Cuál es la pendiente media?', hint: 'Divide el desnivel entre la distancia horizontal y multiplica por 100 para expresarlo en porcentaje.', choices: ['4 %', '25 %', '2 %'], answer: 0, retry: 'El desnivel es el numerador. Compara 2 m de caída con 50 m de recorrido horizontal.' },
    },
  },
  'planta-industrial': {
    label: 'Planta industrial', specialty: 'Materiales · mantenimiento y producción', position: [29, 62],
    tag: 'PLANTA / ÁREA DE CARGA', title: 'El piso de la planta falló',
    problem: 'El piso se agrietó justo donde maniobran los montacargas. La planta necesita mantener su operación mientras se investiga el daño.',
    restored: 'El equipo revisó las cargas y el apoyo del piso, coordinó la intervención con operación y reabrió el paso tras verificarlo.',
    team: [
      { name: 'Ren', job: 'Ingeniera de materiales', line: 'Comparo muestras y reviso cómo se construyó el piso. Me encanta entender por qué un material falla.', skin: '#D28E61', helmet: '#72C0B3', kit: '#613F32', hair: 'short', glasses: true },
      { name: 'Omar', job: 'Ingeniero de obra industrial', line: 'Coordino reparaciones sin detener toda la planta. Me gusta resolver el rompecabezas entre seguridad y operación.', skin: '#865440', helmet: '#F5B969', kit: '#365763', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Qué información ayuda a saber por qué apareció la grieta ahí?', hint: 'Compara esa zona con una donde no pasan vehículos pesados.', choices: ['El color de las paredes', 'Las cargas de los vehículos y el estado del piso', 'El nombre de la planta'], answer: 1, retry: 'El patrón de uso y el estado del piso ayudan a explicar por qué el daño se concentra.' },
      '6': { prompt: 'Una placa idealizada transmite 24 kN sobre 0.12 m². ¿Cuál es la presión media de contacto?', hint: 'Presión media = fuerza dividida entre área. Un kN/m² equivale a un kPa.', choices: ['2.88 kPa', '24 kPa', '200 kPa'], answer: 2, retry: 'Divide 24 entre 0.12. Sobre una superficie pequeña, la misma fuerza da una presión mayor.' },
    },
  },
  'parque-eolico': {
    label: 'Parque eólico', specialty: 'Estructuras · energía y montaje', position: [73, 50],
    tag: 'ENERGÍA / TORRE EÓLICA', title: 'La torre perdió su apoyo',
    problem: 'El equipo detectó movimiento en el apoyo durante una inspección. La turbina queda fuera de operación mientras se revisan suelo, cimentación y acciones del viento.',
    restored: 'El equipo verificó el suelo y corrigió el apoyo en el modelo. La torre se vuelve a poner en servicio tras las comprobaciones.',
    team: [
      { name: 'Julia', job: 'Ingeniera de cimentaciones', line: 'Estudio cómo pasa la fuerza de la torre al suelo. Me gusta hacer posible algo que parece imposible desde abajo.', skin: '#A7644F', helmet: '#F5E6C6', kit: '#4B6755', hair: 'long' },
      { name: 'Nico', job: 'Ingeniero de montaje', line: 'Organizo caminos y maniobras para equipos enormes. Me emociona ver el primer giro de una turbina.', skin: '#CD8D63', helmet: '#FFA35E', kit: '#794529', hair: 'short', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Qué debe estudiar el equipo antes de volver a operar?', hint: 'Una torre alta transmite al suelo su peso y el empuje del viento.', choices: ['El color de las aspas', 'Cuántos focos tiene el acceso', 'Cómo responde la cimentación y el suelo'], answer: 2, retry: 'Revisa qué sostiene la torre y cómo llega al terreno la fuerza del viento.' },
      '6': { prompt: 'En un modelo simple, una fuerza lateral de 12 kN actúa a 8 m del apoyo. ¿Cuál es el momento respecto a la base?', hint: 'Si la fuerza es perpendicular al brazo, multiplica la fuerza por la distancia a la base.', choices: ['96 kN·m', '20 kN·m', '1.5 kN·m'], answer: 0, retry: 'La distancia amplifica el efecto de giro. Multiplica 12 por 8.' },
    },
  },
  'muelle-logistico': {
    label: 'Terminal portuaria', specialty: 'Transporte · operación y logística', position: [30, 61],
    tag: 'PUERTO / PATIO DE CARGA', title: 'El muelle quedó atorado',
    problem: 'Los contenedores se acumulan porque salen más lento de lo que llegan. El patio empieza a invadir las rutas de maniobra.',
    restored: 'El equipo reorganizó áreas de espera y programó salidas para liberar las rutas de maniobra en la terminal.',
    team: [
      { name: 'Iris', job: 'Ingeniera de infraestructura portuaria', line: 'Diseño el espacio entre muelle, patio y salidas. Me encanta ver cómo un puerto conecta lugares lejanos.', skin: '#795044', helmet: '#75B7D0', kit: '#6A4334', hair: 'long' },
      { name: 'Teo', job: 'Ingeniero de logística', line: 'Mido entradas y salidas para evitar cuellos de botella. Disfruto que los números expliquen lo que veo en el patio.', skin: '#DB9968', helmet: '#F9C97D', kit: '#2D5F60', hair: 'short', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Qué cambio ayuda a despejar la ruta de maniobras?', hint: 'Si el patio se llena, ubica dónde esperan las cargas y cómo podrán salir.', choices: ['Reorganizar la espera y coordinar las salidas', 'Poner más carga sobre la ruta de giro', 'Aumentar las llegadas sin cambiar las salidas'], answer: 0, retry: 'Una ruta despejada requiere espacio de espera y un ritmo de salida compatible.' },
      '6': { prompt: 'Entran 12 contenedores por hora y salen 8. Si hoy hay 10 lugares libres, ¿qué pasa tras 3 horas a ese ritmo?', hint: 'Calcula la acumulación por hora y compárala con el espacio libre.', choices: ['Quedan 2 lugares libres', 'Faltan 2 lugares', 'Faltan 10 lugares'], answer: 1, retry: 'Se acumulan 4 por hora. Proyecta esa diferencia a 3 horas.' },
    },
  },
  'borde-costero': {
    label: 'Acceso costero', specialty: 'Hidráulica · riesgo y adaptación', position: [76, 63],
    tag: 'COSTA / ACCESO PÚBLICO', title: 'El oleaje cortó el acceso',
    problem: 'Durante la tormenta, el oleaje rebasó el acceso. El equipo necesita entender hasta dónde llega el agua antes de elegir cómo recuperar el paso.',
    restored: 'El equipo identificó una cota más segura y rehízo el recorrido fuera de la franja más expuesta del escenario.',
    team: [
      { name: 'Eva', job: 'Ingeniera costera', line: 'Comparo mareas y oleaje con lo que vemos en tierra. Me apasiona diseñar con un borde que está siempre cambiando.', skin: '#A26750', helmet: '#B5D484', kit: '#2F6264', hair: 'long', glasses: true },
      { name: 'Luis', job: 'Ingeniero de inspección costera', line: 'Levanto niveles y reviso cómo se dañan los accesos. Me motiva que la gente vuelva a caminar por su costa.', skin: '#8F543B', helmet: '#F89B59', kit: '#6D563E', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Qué observas antes de elegir por dónde reabrir el paso?', hint: 'Busca hasta dónde llegó el agua y qué partes del recorrido quedaron expuestas.', choices: ['La pintura de los letreros', 'Las marcas de inundación y el nivel del terreno', 'El color de las lanchas'], answer: 1, retry: 'Las huellas de la tormenta y la altura del terreno ayudan a comparar trazados.' },
      '6': { prompt: 'En el modelo, el agua está a 1.1 m y el oleaje añade 0.7 m de alcance vertical. Si el acceso está a 1.5 m, ¿cuánto se rebasa?', hint: 'Suma los dos aportes verticales y resta la cota del acceso. Todos usan la misma referencia.', choices: ['0.7 m', '1.8 m', '0.3 m'], answer: 2, retry: 'La altura modelada llega a 1.8 m. Compara esa altura con la del acceso.' },
    },
  },
};

export function isOutside(id: ZoneId): id is OutsideId {
  return Object.prototype.hasOwnProperty.call(OUTSIDE_ZONES, id);
}

export function territoryFor(id: ZoneId) {
  return TERRITORIES.find(territory => territory.zones.includes(id))!;
}

const ZONES: Record<Exclude<ZoneId, OutsideId>, Zone> = {
  estructuras: {
    tag: 'TORRE / BLOQUE A', title: 'La torre quedó en alerta',
    problem: 'Después de un sismo aparecen grietas. El edificio permanece cerrado mientras el equipo revisa qué partes sufrieron daño.',
    restored: 'El equipo inspeccionó los elementos de soporte y reparó los dañados en este escenario. La torre vuelve a recibir gente tras la revisión.',
    team: [
      { name: 'Maya', job: 'Ingeniera estructural', line: 'Modelo cómo se mueve un edificio. Me encanta entender qué lo mantiene en pie.', skin: '#A66044', helmet: '#FF7A31', kit: '#215E67', hair: 'long', glasses: true },
      { name: 'Leo', job: 'Ingeniero de inspección', line: 'Reviso vigas y columnas en sitio. Me gusta encontrar las pistas que otros pasan por alto.', skin: '#E6AD7D', helmet: '#F7D087', kit: '#583722', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Qué deberían revisar antes de abrir la torre?', hint: 'Imagina que quitas una pata a una mesa. Importa dónde está el daño y qué sostiene esa pieza.', choices: ['Pintar las paredes para cubrir las grietas', 'Revisar vigas y columnas', 'Cambiar los letreros de entrada'], answer: 1, retry: 'Primero busca los elementos que sostienen la torre. El acabado se revisa después.' },
      '6': { prompt: 'El daño se concentra en un piso. ¿Qué dato ayuda a comparar cuánto se deformó con los demás?', hint: 'La deriva de entrepiso compara el desplazamiento horizontal relativo entre dos niveles con su altura.', choices: ['El desplazamiento relativo entre pisos vecinos y su altura', 'El ancho de la fachada', 'La altura total del edificio por sí sola'], answer: 0, retry: 'Necesitas comparar dos niveles contiguos. Una medida global puede ocultar una deformación concentrada.' },
    },
  },
  hidraulica: {
    tag: 'CANAL / BARRIO BAJO', title: 'El agua tomó la calle',
    problem: 'La lluvia llenó el canal y el cruce quedó bajo el agua. Hay que reducir la acumulación sin trasladar el problema al siguiente barrio.',
    restored: 'El equipo habilitó almacenamiento temporal y una salida controlada. En este escenario baja el agua del cruce sin descargarla toda de golpe.',
    team: [
      { name: 'Inés', job: 'Ingeniera hidráulica', line: 'Sigo el camino del agua en modelos. Me emociona cuando una solución protege a todo un barrio.', skin: '#E2A474', helmet: '#69BAC0', kit: '#873F2B', hair: 'long' },
      { name: 'Dani', job: 'Ingeniero de campo', line: 'Mido niveles en canales. Mi parte favorita es contrastar el modelo con lo que pasa afuera.', skin: '#794737', helmet: '#FF803F', kit: '#235B67', hair: 'short', glasses: true },
    ],
    levels: {
      '5': { prompt: 'El canal ya está lleno. ¿Cómo ganas tiempo mientras pasa la lluvia?', hint: 'Piensa en una tina que puede guardar agua y vaciarse poco a poco.', choices: ['Guardar parte del agua y soltarla despacio', 'Enviar más agua al canal de golpe', 'Tapar todas las coladeras'], answer: 0, retry: 'El canal ya está al límite. Busca una opción que evite que le llegue toda el agua al mismo tiempo.' },
      '6': { prompt: 'La entrada al tanque es de 8 L/s y la salida de 3 L/s. ¿Qué ocurre en ese instante?', hint: 'En este modelo, la tasa de cambio del volumen es caudal de entrada menos caudal de salida.', choices: ['El volumen disminuye 5 L por segundo', 'El volumen se mantiene', 'El volumen aumenta 5 L por segundo'], answer: 2, retry: 'Compara lo que entra con lo que sale. Si entra más, queda agua acumulada.' },
    },
  },
  movilidad: {
    tag: 'ESTACIÓN / CRUCE 03', title: 'El cruce se bloqueó',
    problem: 'Una fila de autobuses ocupa el paso peatonal. Los pasajeros necesitan una conexión segura entre los andenes.',
    restored: 'El equipo separó la espera de autobuses del cruce de peatones. La estación recuperó un recorrido despejado.',
    team: [
      { name: 'Nora', job: 'Ingeniera de transporte', line: 'Analizo cómo se mueve la gente. Me gusta recuperar minutos que miles de personas pierden al día.', skin: '#815041', helmet: '#F5BD59', kit: '#3D5551', hair: 'short', glasses: true },
      { name: 'Raúl', job: 'Ingeniero de vialidades', line: 'Diseño recorridos y giros. Me apasiona ver que una calle funciona mejor para quien va a pie.', skin: '#DA9762', helmet: '#F4EEE0', kit: '#934424', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Cómo proteges el paso de la gente que cambia de autobús?', hint: 'Mira dónde se juntan los trayectos. Un mismo espacio no puede ser fila de buses y cruce seguro a la vez.', choices: ['Hacer que la gente cruce entre los buses', 'Mover el cruce a cualquier lugar sin señalizar', 'Separar la fila de buses del paso peatonal'], answer: 2, retry: 'La gente debe poder cruzar sin meterse a la fila de vehículos. Busca una solución para ambos recorridos.' },
      '6': { prompt: 'Llegan 12 buses cada 10 minutos y salen 9. Si se mantiene el ritmo, ¿cuánto crece la fila en 20 minutos?', hint: 'Calcula el saldo de llegadas menos salidas para un intervalo y multiplícalo por dos.', choices: ['6 buses', '3 buses', '21 buses'], answer: 0, retry: 'La fila cambia por la diferencia, no por el total. Ve cuánto se acumula cada 10 minutos.' },
    },
  },
  geotecnia: {
    tag: 'TALUD / LADERA SUR', title: 'La ladera empezó a ceder',
    problem: 'Tras la lluvia, el terreno se ablanda y aparece una grieta junto al sendero. El paso se cierra para estudiar el suelo.',
    restored: 'El equipo estudió el suelo y controló el agua antes de estabilizar el talud. El sendero se reabre en el escenario.',
    team: [
      { name: 'Sol', job: 'Ingeniera geotécnica', line: 'Leo lo que hay bajo nuestros pies. Me fascina que dos suelos parecidos puedan comportarse distinto.', skin: '#BF7750', helmet: '#C6DD82', kit: '#72502E', hair: 'long' },
      { name: 'Iván', job: 'Ingeniero de laboratorio', line: 'Pruebo muestras de suelo. Me encanta que un puñado de tierra ayude a explicar lo que pasa en una ladera.', skin: '#EABD9C', helmet: '#FF9456', kit: '#315954', hair: 'short', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Qué harías antes de decidir cómo sostener la ladera?', hint: 'La tierra seca y el lodo reaccionan distinto. Averigua qué hay debajo y por dónde pasa el agua.', choices: ['Abrir el sendero porque dejó de llover', 'Tomar muestras y revisar la humedad del suelo', 'Cubrir la grieta con pintura'], answer: 1, retry: 'Una grieta tapada no nos dice si el terreno se puede seguir moviendo. Empieza con observaciones y muestras.' },
      '6': { prompt: 'Tras la lluvia aumenta la presión del agua en los poros. ¿Qué merece atención en el modelo?', hint: 'Esfuerzo efectivo = esfuerzo total menos presión de poros. Piensa en cuánto contacto queda entre granos.', choices: ['A igual esfuerzo total, baja el esfuerzo efectivo', 'A igual esfuerzo total, aumenta el esfuerzo efectivo', 'La presión de poros no cambia el esfuerzo efectivo'], answer: 0, retry: 'Usa la resta de la pista. Si el término que restas aumenta, el resultado baja.' },
    },
  },
  construccion: {
    tag: 'OBRA / PLAZA CENTRAL', title: 'La obra perdió el ritmo',
    problem: 'Llegaron materiales fuera de orden y un paso de trabajo está bloqueado. El equipo detiene esa zona y reorganiza el frente.',
    restored: 'El equipo despejó el acceso, reordenó las tareas y coordinó las entregas. El frente vuelve a trabajar con un recorrido claro.',
    team: [
      { name: 'Vale', job: 'Ingeniera residente de obra', line: 'Coordino a las personas y reviso la seguridad. Me encanta ver cómo un plano se vuelve un lugar real.', skin: '#A8705B', helmet: '#FF813B', kit: '#3E6660', hair: 'short' },
      { name: 'Emi', job: 'Ingeniero de planeación', line: 'Ordeno tareas, materiales y tiempos. Disfruto hacer que todo encaje antes de que llegue el primer camión.', skin: '#725044', helmet: '#F2D18F', kit: '#9B5031', hair: 'long', glasses: true },
    ],
    levels: {
      '5': { prompt: '¿Cuál es la primera decisión útil del equipo?', hint: 'Si el acceso está bloqueado, sumar más personas y materiales puede empeorar el problema.', choices: ['Mandar más camiones al mismo acceso', 'Dejar los materiales donde cayeron', 'Despejar el paso y reordenar las entregas'], answer: 2, retry: 'Antes de acelerar el trabajo, el equipo necesita recuperar un acceso seguro y ordenar qué entra primero.' },
      '6': { prompt: 'Preparar el paso toma 2 h. Luego se puede montar la estructura (3 h) y, al mismo tiempo, revisar materiales (1 h). ¿Cuándo termina el conjunto?', hint: 'Suma la tarea que va primero y la rama paralela más larga. Esa secuencia fija el tiempo mínimo.', choices: ['4 horas', '5 horas', '6 horas'], answer: 1, retry: 'Las dos últimas tareas pueden correr en paralelo. El conjunto acaba cuando termina la más larga de esas dos.' },
    },
  },
  sostenibilidad: {
    tag: 'PARQUE / DISTRITO VERDE', title: 'La plaza se volvió un charco',
    problem: 'La plaza tiene mucho pavimento duro. La lluvia corre hacia los accesos y el sol calienta las zonas de espera.',
    restored: 'El equipo agregó sombra y un jardín de lluvia en esta maqueta. Parte del agua se retiene y aparecen espacios más frescos.',
    team: [
      { name: 'Luz', job: 'Ingeniera de infraestructura sostenible', line: 'Comparo materiales y estrategias para usar mejor el agua. Me apasiona devolverle vida a lugares muy duros.', skin: '#E3A27C', helmet: '#B9D271', kit: '#316453', hair: 'long', glasses: true },
      { name: 'Sam', job: 'Ingeniero de drenaje urbano', line: 'Diseño cómo entra y sale el agua de un espacio. Me gusta que un jardín también pueda resolver un problema.', skin: '#875144', helmet: '#FFD68B', kit: '#8B502C', hair: 'short' },
    ],
    levels: {
      '5': { prompt: '¿Qué cambio ayuda a la vez con el agua y con el calor?', hint: 'Busca algo que reciba parte del agua y dé sombra al lugar donde espera la gente.', choices: ['Un jardín de lluvia y árboles de sombra', 'Más pavimento oscuro', 'Cubrir la plaza con láminas transparentes'], answer: 0, retry: 'Compara dos beneficios: captar parte de la lluvia y proteger del sol. La opción debe ayudar con ambos.' },
      '6': { prompt: 'En un modelo sencillo caen 10 mm de lluvia sobre 100 m². ¿Qué volumen recibe esa superficie antes de que infiltre agua?', hint: 'Convierte 10 mm a 0.01 m y multiplica por el área. Cada metro cúbico equivale a 1,000 litros.', choices: ['100 litros', '10,000 litros', '1,000 litros'], answer: 2, retry: 'Primero calcula el volumen en metros cúbicos. Después conviértelo a litros.' },
    },
  },
};

const width = 'mx-auto max-w-[1220px] px-4 sm:px-7';
const micro = 'font-mono-tech text-[11px] font-bold uppercase tracking-[0.12em]';
const action = 'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border border-[#191716] bg-[#FF681E] px-4 py-2.5 text-sm font-extrabold text-[#191716] shadow-[3px_3px_0_#8F3813] transition-colors hover:bg-[#FF8C52] disabled:cursor-not-allowed disabled:border-[#766257] disabled:bg-[#DBD1C6] disabled:shadow-none';
const back = 'inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#693618] underline-offset-4 hover:underline';

function CrewArt({ person }: { person: Teammate }) {
  return (
    <g stroke="#251D19" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="82" rx="24" ry="4" fill="#251D19" opacity=".2" stroke="none" />
      {person.hair === 'long' && <path d="M15 27q-5 17-3 22h39q2-12-4-24Z" fill="#30251F" />}
      <path d="M19 63h26l4 17H34l-2-8-3 8H15Z" fill="#332D2B" />
      <path d="M19 45 9 53l-3 10 8 4 7-9-1 10h24l-1-10 7 8 7-5-4-9-8-7Z" fill={person.kit} />
      <path d="m24 46 5 15h6l5-15m-20 17h24" fill="none" stroke="#FFD59A" />
      <path d="M15 27q-4-9 6-12 12-7 24 2 6 2 4 12" fill="#332420" />
      <path d="M17 24h31v10q-2 14-16 14-12 0-15-13Z" fill={person.skin} />
      <path d="M23 33h1m15 0h1m-14 7q5 4 11-1" fill="none" />
      {person.glasses && <path d="M19 29h10v8H19Zm16 0h10v8H35Zm-6 3h6" fill="none" strokeWidth="1.5" />}
      <path d="M14 23v-4Q16 6 31 6q15 0 19 14v3M10 24l43-1v5H10Z" fill={person.helmet} />
      <path d="M29 8v12" fill="none" stroke="#FFF1D6" />
    </g>
  );
}

function Portrait({ person }: { person: Teammate }) {
  return <svg aria-hidden="true" className="h-[70px] w-[54px] shrink-0" viewBox="0 0 64 86"><CrewArt person={person} /></svg>;
}

function ZoneScene({ id, restored }: { id: ZoneId; restored: boolean }) {
  const zone = isOutside(id) ? OUTSIDE_ZONES[id] : ZONES[id];
  if (isOutside(id)) {
    return (
      <div className="relative" role="img" aria-label={`${restored ? 'Zona reparada' : 'Zona dañada'}. ${restored ? zone.restored : zone.problem}`}>
        <TerritoryLandscape territory={territoryFor(id).id} zone={id} damaged={!restored} />
        <svg aria-hidden="true" viewBox="0 0 640 300" className="pointer-events-none absolute inset-0 h-full w-full">
          <g key={String(restored)} className={restored ? 'motion-safe:animate-[zone-arrive_.65s_ease-out_both]' : undefined}>
            <g transform="translate(45 214) scale(.86)"><CrewArt person={zone.team[0]} /></g>
            <g transform="translate(87 225) scale(.74)"><CrewArt person={zone.team[1]} /></g>
          </g>
          {restored && <g transform="translate(561 54)"><circle r="20" fill="#2E6656"/><path d="m-8 0 5 6 11-12" fill="none" stroke="#F7EFDA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></g>}
        </svg>
      </div>
    );
  }
  return (
    <svg role="img" aria-label={`${restored ? 'Zona reparada' : 'Zona dañada'}. ${restored ? zone.restored : zone.problem}`}
      viewBox="0 0 640 302" className="block h-auto w-full">
      <defs>
        <pattern id="mission-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#614D3C" strokeOpacity=".12" /></pattern>
      </defs>
      <rect width="640" height="302" fill={restored ? '#F8E9C7' : '#DCD1C3'} />
      <circle cx="504" cy="68" r="33" fill={restored ? '#F6BB5E' : '#B3A39B'} />
      <path d="M0 140h55v-17h43v-16h34v23h39V99h22v20h29v24h42v-26h34v13h40V91h38v40h24v-14h42v25h42v-29h25v-14h24v31h36v-13h41v24h30v87H0Z" fill={restored ? '#DCC8A7' : '#B9A99C'} />
      <path d="M31 219 208 152h298l112 73-171 67H155Z" fill={restored ? '#E2BE8F' : '#A99684'} stroke="#403029" strokeWidth="2" />
      <path d="M31 219 155 292h292l171-67v14l-171 63H155L31 234Z" fill={restored ? '#9F7654' : '#776355'} stroke="#403029" strokeWidth="2" />
      <rect width="640" height="302" fill="url(#mission-grid)" />
      {id === 'estructuras' && <g stroke="#3C302A" strokeWidth="3" strokeLinejoin="round">
        <path d="m206 209 114-44 160 24-99 52Z" fill="#654C3F" opacity=".25" stroke="none" />
        <path d="m237 56 69-25 80 27-73 28Z" fill={restored ? '#FFD59D' : '#A78F82'} />
        <path d="M237 56v146l76 36V86Z" fill={restored ? '#E9B575' : '#B0998A'} />
        <path d="m313 86 73-28v144l-73 36Z" fill={restored ? '#FFF3D7' : '#D2BCAB'} />
        {[0,1,2,3].map(n => <path key={n} d={`M327 ${98+n*27}l44-18v12l-44 19Z`} fill={restored ? '#529C92' : '#847A72'} strokeWidth="1.8" />)}
        {restored ? <><path d="m245 90 55 27-55 28 55 27-55 28" fill="none" stroke="#774527" strokeWidth="6" /><path d="m330 229 45-20 43 15-49 21Z" fill="#668B60" /></> : <><path d="m260 71-6 32 20 9-13 17 18 15-10 37 20 30" fill="none" stroke="#A83422" strokeWidth="6" /><path d="m190 223 61 19m-61-8 61 19m-59-39v26m58-9v26" stroke="#B84D23" strokeWidth="6" /></>}
      </g>}
      {id === 'hidraulica' && <g stroke="#3C302A" strokeWidth="2.6">
        <path d="m346 153 87 7 100 85-106 31-95-104Z" fill={restored ? '#439C9B' : '#486E72'} />
        <path d="m119 204 408-20 41 25-420 27Z" fill="#393738" />
        <path d="m141 218 405-22" stroke="#F3DFB6" strokeDasharray="14 10" />
        <path d="m214 168 57-20 54 17-57 22Z" fill="#B06648" /><path d="M214 168v42l54 13v-36Zm54 19 57-22v42l-57 16Z" fill="#F3D1A6" />
        {restored ? <><path d="m371 220 40-17 60 31-50 19Z" fill="#225D6A" /><path d="m374 220 47 29 51-16" fill="none" stroke="#B1DBCF" strokeWidth="5" /><path d="m156 211 30-2 10 9-30 3Z" fill="#F48035" /></> : <><path d="M134 208q57-22 110-4t103-8q49-23 124-2t77 34q-53 18-118 7t-155 16q-80 11-142-17-17-13 1-26Z" fill="#517F87" opacity=".89" /><path d="M161 226q35-9 66 0m44-9q35-10 70-4m72 3q45 7 83-3" fill="none" stroke="#BBD5CB" strokeWidth="3" /></>}
      </g>}
      {id === 'movilidad' && <g stroke="#3C302A" strokeWidth="2.5" strokeLinejoin="round">
        <path d="m95 218 405-56 77 47-407 66Z" fill="#3C3E40" />
        <path d="m139 240 399-60" stroke="#FFDF9C" strokeDasharray="13 12" />
        <path d="M280 176 399 140l76 21-125 43Z" fill="#F4E4C1" /><path d="M305 181v33m114-62v37m27-26v34" strokeWidth="6" />
        <path d="m278 198 11 4-46 53-12-6Zm16-6 11 4-46 53-12-5Zm17-5 10 4-46 52-11-5Z" fill="#FFF4DA" stroke="none" />
        {(restored ? [399,481] : [158,232,292]).map((x,i) => <g key={x} transform={`translate(${x} ${restored ? 201-i*10 : 231-i*11})`}><path d="m0 0 58-8 14 8-59 10Z" fill={i===1?'#D9A344':'#EC762F'} /><path d="M0 0v15l13 10V10l59-10v15l-59 10" fill="#AB5B36" /><path d="m19 13 44-7v6l-44 7Z" fill="#34474C" /></g>)}
        {restored ? <><path d="m209 221 61-10m-8-5 10 5-6 9" fill="none" stroke="#87BC83" strokeWidth="5" /><circle cx="273" cy="201" r="7" fill="#70AF6F" /></> : <path d="m208 218 74-11m-72 21 74-11m-73-17 2 34m70-45 1 34" fill="none" stroke="#E35A30" strokeWidth="6" />}
      </g>}
      {id === 'geotecnia' && <g stroke="#493426" strokeWidth="3" strokeLinejoin="round">
        <path d={restored?'M150 232l28-34 69-17 19-30 92-21 110 42 20 48-151 51Z':'M150 232l58-66 66-10 19-24 66 9 104 19 30 61-156 48Z'} fill={restored?'#9F8157':'#9A674A'} />
        {restored ? <><path d="m177 224 80-22 84 19 131-42m-272 15 80-22 58 12 107-31m-239 94 74-21 62 12 127-41" fill="none" stroke="#E2B982" strokeWidth="7" /><path d="m178 216 47-11m101 14 41-13m18-48 39 9m-160 61 43 8" stroke="#648955" strokeWidth="12" /></> : <><path d="m308 138-20 28 27 13-20 24 23 19-18 35m-71-65 14 13-15 17-17-2Zm128 26 16 9-5 14-28 1Z" fill="none" stroke="#A52F22" strokeWidth="6" /><path d="m115 232 65 12m-64-24 61 11m-60-20v31m61-23v34" stroke="#E66335" strokeWidth="5" /></>}
      </g>}
      {id === 'construccion' && <g stroke="#4D382B" strokeWidth="3" strokeLinejoin="round">
        <path d="m166 216 165-53 165 51-167 52Z" fill="#BF9771" />
        <path d="M355 199V58h15v144m-15-133L239 89l16-21 115-20 88 37-8 8-88-29m5 16v39m54-37v48" fill="#F28A37" />
        <path d="M418 127h10v9h-10" fill="#C77C2F" />
        {(restored ? [[200,203,0],[236,191,0],[271,180,0]] : [[221,203,-24],[250,207,15],[269,214,37]]).map(([x,y,r])=><g key={x} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 0 28-7l16 7-27 8Z" fill="#E8AE62"/><path d="M0 0v17l17 8V8L44 0v17l-27 8" fill="#A46942" /></g>)}
        {restored ? <path d="m174 232 143 13 142-44m-22 1 22-1-10 11" fill="none" stroke="#EDF1B7" strokeWidth="7" /> : <path d="m145 229 126 23m-125-11 121 21m-117-43v30m118-9v30" stroke="#B64528" strokeWidth="6" />}
      </g>}
      {id === 'sostenibilidad' && <g stroke="#48392E" strokeWidth="2.5" strokeLinejoin="round">
        <path d="m160 215 155-63 169 56-161 68Z" fill={restored?'#B9B67D':'#8A8177'} />
        <path d="m181 224 125-48 153 41m-239 32 129-50m-94 61 131-49" fill="none" stroke={restored?'#E5CEA2':'#AA9D8D'} strokeWidth="3" />
        {restored ? <><path d="M246 212q31-29 68-21l91 20-53 32q-34 12-79-2Z" fill="#548151" /><path d="M284 221q44-24 85-5l-32 17Z" fill="#5FA7A0" />{[[215,183],[381,163],[445,204]].map(([x,y])=><g key={x} transform={`translate(${x} ${y})`}><path d="M0 0v42" stroke="#735034" strokeWidth="7" /><circle cy="-1" r="24" fill="#769E56" /><circle cx="-7" cy="-7" r="13" fill="#99B76B" stroke="none" /></g>)}</> : <><path d="M226 219q33-29 97-18t109 21q-48 35-134 30-63-5-72-33Z" fill="#668587" /><path d="M247 228q38-10 67-5m22 11q43 2 64-5" fill="none" stroke="#9EBAB4" strokeWidth="3" /><path d="m192 186 85-21 15 7-82 26Z" fill="#87746C" /></>}
      </g>}
      {!restored && <g transform="translate(534 222)"><path d="M0-21 22 18h-44Z" fill="#E26A38" stroke="#4D2419" strokeWidth="2.5" /><path d="M0-9V4m0 7v1" stroke="#241913" strokeWidth="4" strokeLinecap="round" /></g>}
      <g key={String(restored)} className={restored ? 'motion-safe:animate-[zone-arrive_.65s_ease-out_both]' : undefined}>
        <g transform="translate(60 181) scale(1.05)"><CrewArt person={zone.team[0]} /></g>
        <g transform="translate(108 191) scale(.92)"><CrewArt person={zone.team[1]} /></g>
      </g>
      {restored && <g transform="translate(553 66)"><circle r="20" fill="#2E6656"/><path d="m-8 0 5 6 11-12" fill="none" stroke="#F7EFDA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></g>}
    </svg>
  );
}

export function TerritoryBoard({ territory, grade, onGrade, repaired, onOpen }: {
  territory: (typeof TERRITORIES)[number];
  grade: GradeLevel;
  onGrade: (grade: GradeLevel) => void;
  repaired: ReadonlySet<ZoneId>;
  onOpen: (id: string) => void;
}) {
  const localRepaired = new Set(territory.zones.filter(id => repaired.has(id)));
  return (
    <section className="bg-[#EFE5D7]">
      <div className="border-b border-[#D3BCA8] bg-[#FBF2E4]">
        <div className={width + ' flex flex-wrap items-center justify-between gap-2 py-1'}>
          <a href="#mapa" className={back}><ArrowLeft size={16} aria-hidden="true" /> Volver al atlas</a>
          <GradeSwitch grade={grade} onChange={onGrade} />
        </div>
      </div>
      <div className={width + ' py-5 sm:py-8'}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className={micro + ' flex items-center gap-2 text-[#874722]'}><Crosshair size={15} aria-hidden="true" /> Territorio {territory.number}</p>
            <h1 className="mt-1 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{territory.name}</h1>
            <p className="mt-2 text-sm text-[#5B4433]">{territory.pitch} Toca una alerta para entrar.</p>
          </div>
          <p className={micro + ' border border-[#C9A78E] bg-[#FFF4E5] px-3 py-2 text-[#6E3D24]'} aria-live="polite">
            {localRepaired.size}/{territory.zones.length} resueltas
          </p>
        </div>
        {territory.id === 'ciudad' ? (
          <div className="grid items-start gap-4 lg:grid-cols-[1.58fr_1fr]">
            <CityMap onSelectArea={onOpen} repairedAreas={localRepaired} />
            <nav aria-label="Misiones de la ciudad" className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {AREAS_DATA.map(area => {
                const complete = repaired.has(area.id as ZoneId);
                return (
                  <a key={area.id} href={`#zona/${area.id}`}
                    className={`flex min-h-[68px] items-center gap-2 rounded-lg border p-2.5 text-left transition-colors sm:p-3 ${complete ? 'border-[#6F937F] bg-[#E4EDDA] hover:bg-[#D0E5CD]' : 'border-[#C5A98F] bg-[#FBF5E9] hover:border-[#A74119] hover:bg-[#FBE4CC]'}`}>
                    <span className={`grid size-8 shrink-0 place-items-center rounded font-mono-tech text-[11px] font-extrabold ${complete ? 'bg-[#2B6252] text-white' : 'bg-[#9F3822] text-[#FFF3DF]'}`}>{complete ? <Check size={16} aria-hidden="true" /> : area.number}</span>
                    <span className="min-w-0 flex-1"><strong className="block text-xs leading-tight sm:text-sm">{area.title}</strong><span className={micro + ' mt-1 block ' + (complete ? 'text-[#305B4C]' : 'text-[#863819]')}>{complete ? 'Reparada' : 'En alerta'}</span></span>
                    <ChevronRight size={15} className="hidden shrink-0 sm:block" aria-hidden="true" />
                  </a>
                );
              })}
            </nav>
          </div>
        ) : <OutsideBoard id={territory.id} repaired={localRepaired} />}
      </div>
    </section>
  );
}

export function ZoneMission({ id, grade, onGrade, repaired, onRepair }: {
  id: ZoneId;
  grade: GradeLevel;
  onGrade: (grade: GradeLevel) => void;
  repaired: boolean;
  onRepair: () => void;
}) {
  const zone = isOutside(id) ? OUTSIDE_ZONES[id] : ZONES[id];
  const label = isOutside(id) ? OUTSIDE_ZONES[id].label : AREAS_DATA.find(item => item.id === id)!.title;
  const specialty = isOutside(id) ? OUTSIDE_ZONES[id].specialty : null;
  const territory = territoryFor(id);
  const backToTerritory = `#territorio/${territory.id}`;
  const puzzle = zone.levels[grade];
  const scene = useRef<HTMLElement>(null);
  const decision = useRef<HTMLHeadingElement>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [retry, setRetry] = useState(false);
  const [compareBefore, setCompareBefore] = useState(false);
  const [practice, setPractice] = useState(false);
  const canDecide = !repaired || practice;
  const displayRestored = repaired && !compareBefore;

  useEffect(() => {
    setChoice(null);
    setRetry(false);
  }, [grade]);

  function focusDecision() {
    decision.current?.scrollIntoView({ block: 'start' });
    decision.current?.focus({ preventScroll: true });
  }

  function tryAgain(nextGrade: GradeLevel) {
    onGrade(nextGrade);
    setChoice(null);
    setRetry(false);
    setPractice(true);
    requestAnimationFrame(focusDecision);
  }

  function dispatch() {
    if (choice === null || !canDecide) return;
    if (choice !== puzzle.answer) {
      setRetry(true);
      return;
    }
    if (repaired) {
      setPractice(false);
      setCompareBefore(false);
    } else {
      onRepair();
    }
    requestAnimationFrame(() => {
      scene.current?.scrollIntoView({ block: 'start' });
      scene.current?.focus({ preventScroll: true });
    });
  }

  return (
    <section className="min-h-[70vh] bg-[#EFE5D7]">
      <div className="sticky top-20 z-30 border-b border-[#D3BCA8] bg-[#FBF2E4]">
        <div className={width + ' flex items-center justify-between gap-2 py-1'}>
          <a href={backToTerritory} className={back}><ArrowLeft size={16} aria-hidden="true" /> Volver al territorio</a>
          <GradeSwitch grade={grade} onChange={nextGrade => {
            if (repaired && nextGrade !== grade) tryAgain(nextGrade);
            else onGrade(nextGrade);
          }} />
        </div>
      </div>
      <div className={width + ' py-5 sm:py-8'}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
          <div>
            <p className={micro + ' flex items-center gap-1.5 text-[#874722]'}><Radio size={14} aria-hidden="true" /> Misión {String(ZONE_IDS.indexOf(id) + 1).padStart(2, '0')} / {label}</p>
            <h1 className="mt-1 text-3xl font-black leading-[1.04] tracking-[-.045em] sm:text-5xl">{repaired ? 'Misión resuelta' : zone.title}</h1>
            {specialty && <p className="mt-2 text-xs font-semibold text-[#694631] sm:text-sm">{specialty}</p>}
          </div>
          {canDecide && <button type="button" className={back} onClick={focusDecision}>Ir a la decisión <ArrowRight size={15} aria-hidden="true" /></button>}
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.25fr_1fr]">
          <figure ref={scene} tabIndex={-1} className="scroll-mt-36 overflow-hidden rounded-xl border border-[#906F57] bg-[#FCF3E5] shadow-[3px_3px_0_#CDB49C]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#906F57] bg-[#2B211C] px-3 py-2.5 text-[#FFF4E3]">
              <span className={micro + ' text-[#FFC49D]'}>{zone.tag}</span>
              <span className={micro + ' rounded px-2 py-1 ' + (displayRestored ? 'bg-[#C5E3C3] text-[#254C43]' : 'bg-[#F3AA7F] text-[#4E2719]')}>{displayRestored ? 'Zona reparada' : 'Daño activo'}</span>
            </div>
            <ZoneScene id={id} restored={displayRestored} />
            <figcaption className="p-3 text-sm leading-relaxed sm:p-4" aria-live="polite">
              {displayRestored && <strong className="mb-1 flex items-center gap-1.5 text-[#305B4C]"><Check size={17} aria-hidden="true" /> Equipo desplegado · 60 XP</strong>}
              <span>{displayRestored ? zone.restored : zone.problem}</span>
              {repaired && <button type="button" onClick={() => setCompareBefore(value => !value)} className={back + ' mt-1 block'}>{compareBefore ? 'Ver después' : 'Ver antes'}</button>}
            </figcaption>
          </figure>

          <div className="grid gap-3">
            <div className="rounded-xl border border-[#C7A98F] bg-[#FFF8EA] p-3 sm:p-4">
              <h2 className={micro + ' mb-2 text-[#874722]'}>Equipo en escena</h2>
              <div className="grid gap-2">
                {zone.team.map(person => (
                  <article key={person.name} className="flex items-center gap-2 rounded-lg bg-[#F1E4D5] px-2 py-1.5 sm:gap-3 sm:px-3">
                    <Portrait person={person} />
                    <div><h3 className="text-sm font-extrabold">{person.name} <span className="font-semibold text-[#795138]">· {person.job}</span></h3><p className="mt-0.5 text-xs leading-relaxed text-[#382922] sm:text-sm">“{person.line}”</p></div>
                  </article>
                ))}
              </div>
            </div>
            {!canDecide ? (
              <div className="rounded-xl border border-[#88A188] bg-[#E2ECDA] p-4 text-[#234D41]">
                <strong>La zona ya cambió en el mapa.</strong>
                <p className="mt-1 text-sm">Elige otro incidente para seguir recuperando la ciudad.</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a href={backToTerritory} className={action}>Volver al territorio <ArrowRight size={16} aria-hidden="true" /></a>
                  <button type="button" onClick={() => tryAgain(grade)} className={back}>Volver a practicar</button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[#574035] bg-[#2A201A] p-3 text-[#FFF5E8] sm:p-4">
                <p className={micro + ' mb-1 flex items-center gap-1.5 text-[#FFBE94]'}><Zap size={14} aria-hidden="true" /> {grade === '5' ? '5.º de prepa / Decide con una pista' : '6.º · Área 1 / Analiza el dato'}{practice ? ' · Práctica' : ''}</p>
                <h2 ref={decision} tabIndex={-1} className="scroll-mt-36 text-xl font-black leading-tight sm:text-2xl">{puzzle.prompt}</h2>
                <p className="mt-2 border-l-2 border-[#FF8D55] bg-[#423028] px-2.5 py-2 text-sm leading-relaxed text-[#FFF0DA]"><strong>Pista.</strong> {puzzle.hint}</p>
                <div role="group" aria-label="Elige una respuesta" className="mt-3 grid gap-1.5">
                  {puzzle.choices.map((option, index) => (
                    <button type="button" key={option} aria-pressed={choice === index}
                      onClick={() => { setChoice(index); setRetry(false); }}
                      className={`min-h-[44px] rounded-md border px-2.5 py-2 text-left text-sm font-semibold ${choice === index ? 'border-[#FFD09D] bg-[#FFBC85] text-[#261A15]' : 'border-[#7E6152] bg-[#362820] hover:border-[#F8B68A]'}`}>
                      <span className="mr-2 font-mono-tech text-xs" aria-hidden="true">{String.fromCharCode(65 + index)}</span>{option}
                    </button>
                  ))}
                </div>
                <button type="button" disabled={choice === null} onClick={dispatch} className={action + ' mt-3'}><Wrench size={16} aria-hidden="true" /> Enviar al equipo</button>
                {retry && <p role="status" className="mt-2 text-sm text-[#FFE1C2]">{puzzle.retry}</p>}
              </div>
            )}
          </div>
        </div>
        <p className="mt-5 text-xs text-[#5F4637]">Misión ilustrativa · Personajes ficticios · Caso simplificado</p>
      </div>
    </section>
  );
}

function Pines({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="M-17 2 0-24 18 2H9l12 15h-42L-9 2Z" fill="#547858" stroke="#2A443B" strokeWidth="2" /><path d="M0 17v8" stroke="#553A2E" strokeWidth="3" /></g>;
}

function Turbine({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} fill="#FCF3E1" stroke="#463932" strokeWidth="2.5" strokeLinejoin="round">
    <path d="M-4 0h8l5 108h-18Z" /><path d="m0 0-15-55 3-12L5-7Zm0 0 56-11 11 6L7 5Zm0 0-41 40-10 2L-7-2Z" />
    <circle r="7" fill="#F4AE6B" />
  </g>;
}

export function TerritoryLandscape({ territory, zone, damaged = false, repaired }: {
  territory: TerritoryId;
  zone?: OutsideId;
  damaged?: boolean;
  repaired?: ReadonlySet<ZoneId>;
}) {
  const hasDamage = (id: OutsideId) => zone === id ? damaged : repaired ? !repaired.has(id) : false;
  const sierra = territory === 'sierra';
  const industria = territory === 'industria';
  const coast = territory === 'costa';
  return (
    <svg aria-hidden="true" viewBox="0 0 640 300" className="block h-auto w-full">
      <rect width="640" height="300" fill={damaged ? '#DED3C7' : coast ? '#F5E7C8' : sierra ? '#E6E4C8' : '#F7DFC2'} />
      <circle cx="492" cy="55" r="30" fill={damaged ? '#BBAFA0' : '#F2B76F'} />
      <path d="M32 58h104m-79 12h122m303 48h102m-546 28h554" fill="none" stroke="#645041" strokeOpacity=".2" strokeWidth="1.5" strokeDasharray="9 6" />
      {territory === 'ciudad' && <g stroke="#45362F" strokeWidth="3" strokeLinejoin="round">
        <path d="M46 206 218 134l172 2 205 79-171 70H176Z" fill="#D2BC99" />
        <path d="M46 206 176 285h248l171-70v13l-171 68H176L46 220Z" fill="#967055" />
        <path d="m287 140 55-4 151 122-61 25Z" fill="#4C8B8C" />
        <path d="m115 221 346-71 55 22-337 76Z" fill="#393637" />
        <path d="m144 226 347-65" fill="none" stroke="#FFD6A1" strokeDasharray="13 11" />
        <path d="M180 97l59-25 48 21-57 28Z" fill="#EBA65F" /><path d="M180 97v110l50 21V121Z" fill="#C78656" /><path d="m230 121 57-28v112l-57 23Z" fill="#F7D8A4" />
        <path d="m246 132 27-13m-27 35 27-13m-27 35 27-13" stroke="#487678" strokeWidth="5" />
        <path d="m360 174 66-29 51 22-67 27Z" fill="#6C9861" /><path d="M360 174v39l50 24v-43l67-27v42l-67 28" fill="#F0C393" />
        <path d="M335 171v-55m0 4 55 37m-55-35-35 55" fill="none" stroke="#F47533" strokeWidth="5" />
        <Pines x={135} y={197} /><Pines x={513} y={221} /><Pines x={480} y={249} />
      </g>}
      {sierra && <g strokeLinejoin="round">
        <path d="M0 181 122 53l70 64L286 33l128 117 64-83 162 108v126H0Z" fill="#A5A77C" />
        <path d="m71 117 51-64 71 64-47-14-25 8-28-12Zm154-22 61-62 71 64-43-13-28 10-23-13Z" fill="#E6DEC3" />
        <path d="M0 209q137-89 260-45t380-10v146H0Z" fill="#788B58" />
        <path d="M0 258q100-39 175-29t148-16 180 10 137-32v109H0Z" fill="#ADAE70" />
        <path d="M353 300q-78-40-53-62t-19-55" fill="none" stroke="#5D9F9D" strokeWidth="19" />
        <path d={hasDamage('camino-sierra') ? 'M640 195q-124 14-167 45m-31 15q-123 4-169 45' : 'M640 195q-124 14-167 45t-111 17q-51 8-89 43'} fill="none" stroke="#5C4A36" strokeWidth="16" />
        <path d={hasDamage('camino-sierra') ? 'M640 195q-124 14-167 45m-31 15q-123 4-169 45' : 'M640 195q-124 14-167 45t-111 17q-51 8-89 43'} fill="none" stroke="#F4CEA4" strokeWidth="10" />
        <g stroke="#47392C" strokeWidth="2.5">
          <path d="m121 192 35-27 42 24v42h-77Z" fill="#F6DCB2" /><path d="m112 194 44-35 53 33-11 7-43-27-34 29Z" fill="#B36743" />
          <path d="M213 172v36m24-36v33m-28-35h33v-20h-33Z" fill="#78B7B7" /><ellipse cx="225.5" cy="150" rx="16.5" ry="5" fill="#C4DDD1" />
          <path d={hasDamage('agua-rural') ? 'M224 172v47h-17m-9 0h-19' : 'M224 172v47h-45'} fill="none" stroke="#325B62" strokeWidth="4" />
        </g>
        {hasDamage('agua-rural') && <path d="M202 220q-14 12-9 17t14 0q5-5-5-17Z" fill="#72B6C9" stroke="#2F6069" strokeWidth="2" />}
        {zone==='agua-rural' && !damaged && <path d="M164 218q-7 8 0 13 8-4 0-13Z" fill="#86D0C6" />}
        <Pines x={66} y={201} /><Pines x={91} y={181} /><Pines x={519} y={183} /><Pines x={556} y={161} />
      </g>}
      {industria && <g strokeLinejoin="round">
        <path d="M0 184 106 140l76 11 113-21 163 23 108-23 74 31v139H0Z" fill="#B49A72" />
        <path d="M0 216q183-40 324-7t316-30v121H0Z" fill="#D5B489" />
        <path d="m48 224 175-41 161 63-180 48Z" fill="#A99D89" stroke="#625449" strokeWidth="2" />
        <path d="m83 155 140-49 110 47-143 49Z" fill="#E3A46F" stroke="#503C32" strokeWidth="3" />
        <path d="M83 155v72l107 48v-73Z" fill="#AC775B" stroke="#503C32" strokeWidth="3" />
        <path d="m190 202 143-49v69l-143 53Z" fill="#EFD6A6" stroke="#503C32" strokeWidth="3" />
        <path d="m215 223 38-14v42l-38 14Zm53-19 41-15v42l-41 15Z" fill="#517A76" stroke="#503C32" strokeWidth="2.5" />
        <path d="m97 164 106-38m-80 51 107-37m-78 50 105-37" fill="none" stroke="#F2C695" strokeWidth="4" />
        {hasDamage('planta-industrial') ? <path d="m224 267 21-15 8 8 21-8 17 3 16-15" fill="none" stroke="#AB3C27" strokeWidth="5" /> : <path d="m228 273 101-36" stroke="#F8DA8B" strokeWidth="4" strokeDasharray="8 5" />}
        <Turbine x={458} y={91} /><Turbine x={558} y={103} size={.72} />
        <path d="m439 206 18-10 29 8-22 13Z" fill={hasDamage('parque-eolico') ? '#AD694C' : '#E5D7B8'} stroke="#5E4939" strokeWidth="2" />
        {hasDamage('parque-eolico') && <path d="m448 207 9-5 8 6 8-6" fill="none" stroke="#A82D20" strokeWidth="4" />}
        <path d="M640 224q-129-9-193 37t-107 39" fill="none" stroke="#EED6AD" strokeWidth="11" />
      </g>}
      {coast && <g strokeLinejoin="round">
        <path d="M0 124q90-30 180 20t186 6q92-38 274 20v130H0Z" fill="#4F8C91" />
        <path d="M0 176q75-28 158-8l112 31 63 55 91-78q91-28 216-3v127H0Z" fill="#E4C093" />
        <path d="M0 172q84-31 155-4l112 30 66 56 91-78q91-28 216-3" fill="none" stroke="#F9E6BC" strokeWidth="5" />
        <path d="m44 170 150 5 94 56-52 21-103-59-89-3Z" fill="#B6AB9B" stroke="#4E4946" strokeWidth="2" />
        <path d="m72 150 113 6-20 18-115-8Z" fill="#DC754A" stroke="#4E4946" strokeWidth="2.5" /><path d="m81 150 18-13 62 3 14 15Z" fill="#F5D7AB" stroke="#4E4946" strokeWidth="2" />
        <path d="M144 201v-81h8v80m-8-81 48 16-3 6-38-11m32 12v22" fill="none" stroke="#674639" strokeWidth="4" />
        {(hasDamage('muelle-logistico') ? [[169,190],[188,203],[210,215],[185,194]] : [[158,201],[174,211],[190,221]]).map(([x,y],i)=><path key={i} d={`m${x} ${y} 23-9 16 9-23 10Z`} fill={i%2 ? '#E88C52' : '#548789'} stroke="#4E4946" strokeWidth="2"/>)}
        <path d="M632 246q-67-32-128-6t-91 28" fill="none" stroke="#684D38" strokeWidth="11" />
        <path d="M632 246q-67-32-128-6t-91 28" fill="none" stroke="#F5E1B6" strokeWidth="7" />
        {hasDamage('borde-costero') && <path d="M640 167q-102-19-147 26-29 28-69 46 54 29 127 9l89-45Z" fill="#609DA4" stroke="#EEF0CF" strokeWidth="4" />}
        {(zone==='borde-costero' || repaired) && !hasDamage('borde-costero') && <><Pines x={551} y={214} /><Pines x={579} y={208} /></>}
        <path d="M323 147q29-12 53-2m-19 24q28-11 57-3m115-33q32-7 64 3" fill="none" stroke="#D6E7D3" strokeWidth="3" />
      </g>}
      {zone && damaged && <g transform={`translate(${zone==='agua-rural'||zone==='planta-industrial'||zone==='muelle-logistico'?275:535} 205)`}><path d="M0-16 19 18h-38Z" fill="#EF7B3D" stroke="#4D291E" strokeWidth="2.5"/><path d="M0-5v10m0 6v1" stroke="#3F291E" strokeWidth="3" strokeLinecap="round" /></g>}
    </svg>
  );
}

export function GradeSwitch({ grade, onChange }: { grade: GradeLevel; onChange: (grade: GradeLevel) => void }) {
  return (
    <div role="group" aria-label="Nivel de la misión" className="flex shrink-0 gap-1 rounded-lg border border-[#CDBAAB] bg-[#F1E6DA] p-1">
      <button type="button" aria-label="5.º de prepa" aria-pressed={grade === '5'} onClick={() => onChange('5')}
        className={`min-h-[44px] rounded px-2.5 text-xs font-extrabold ${grade === '5' ? 'bg-[#191716] text-white' : 'text-[#512E1E] hover:bg-[#E3D0C1]'}`}>5.º <span className="hidden sm:inline">de prepa</span></button>
      <button type="button" aria-label="6.º · Área 1" aria-pressed={grade === '6'} onClick={() => onChange('6')}
        className={`min-h-[44px] rounded px-2.5 text-xs font-extrabold ${grade === '6' ? 'bg-[#191716] text-white' : 'text-[#512E1E] hover:bg-[#E3D0C1]'}`}>6.º <span className="hidden sm:inline">· Área 1</span></button>
    </div>
  );
}

const SIGNALS = {
  ciudad: { label: 'Ciudad', icon: Building2, detail: 'Revisa una torre después de un sismo.', x: 143, y: 135 },
  sierra: { label: 'Sierra', icon: Mountain, detail: 'Devuelve el agua a una comunidad.', x: 285, y: 151 },
  industria: { label: 'Energía', icon: Wind, detail: 'Pon en marcha una planta y su parque eólico.', x: 510, y: 111 },
  costa: { label: 'Costa', icon: Waves, detail: 'Recupera el paso en un puerto.', x: 487, y: 291 },
} as const;

function TerrainModel({ active }: { active: TerritoryId }) {
  const { x, y } = SIGNALS[active];

  return (
    <svg className="launch-model" viewBox="0 0 640 414" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="launch-land" x2=".8" y2="1">
          <stop stopColor="#424238" />
          <stop offset="1" stopColor="#211F20" />
        </linearGradient>
        <linearGradient id="launch-water" x1="0" x2=".9" y1=".1" y2="1">
          <stop stopColor="#193E43" />
          <stop offset="1" stopColor="#115361" />
        </linearGradient>
        <linearGradient id="launch-mountain" x2="1" y2=".8">
          <stop stopColor="#676852" />
          <stop offset="1" stopColor="#30372E" />
        </linearGradient>
        <linearGradient id="launch-girder" x2="0" y2="1">
          <stop stopColor="#F4A15B" />
          <stop offset="1" stopColor="#C44D20" />
        </linearGradient>
        <pattern id="launch-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0v34" fill="none" stroke="#F2B68E" strokeOpacity=".13" />
          <circle cx="1" cy="1" r="1.15" fill="#F2B68E" opacity=".28" />
        </pattern>
        <pattern id="launch-strata" width="13" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(26)">
          <path d="M0 0h13" stroke="#A9694D" strokeOpacity=".48" />
        </pattern>
        <clipPath id="launch-ground-clip"><path d="M33 254 311 118 606 251 328 388Z" /></clipPath>
        <clipPath id="launch-road-clip"><path d="m110 273 368-83 37 17-365 86Z" /></clipPath>
        <g id="launch-turbine">
          <path d="m-20 74 23-9 23 11L3 86Z" fill="#212926" stroke="#759C8D" />
          <path d="M-3 0h6l4 76-9 2Z" fill="#B5D4C5" stroke="#16343B" strokeWidth="1.5" />
          <g className="launch-rotor">
            {[0, 120, 240].map(angle => (
              <path key={angle} transform={`rotate(${angle})`} d="M0 0-4-11l2-36 5-6 2 13-1 32Z" fill="#DFEEE2" stroke="#426A65" strokeWidth="1" />
            ))}
            <circle r="5.5" fill="#EFB683" stroke="#253A33" strokeWidth="1.5" />
          </g>
        </g>
      </defs>
      <path d="M0 0h640v414H0Z" fill="url(#launch-grid)" />
      <g fill="none" stroke="#F0B78D" opacity=".16">
        <ellipse cx="330" cy="252" rx="291" ry="115" strokeDasharray="4 6" />
        <ellipse cx="330" cy="252" rx="305" ry="138" />
        <path d="M17 245h607M328 72v326M58 111l535 242M63 378 579 128" strokeDasharray="3 8" />
      </g>
      <path d="m33 254 295 134 278-137v17L328 407 33 271Z" fill="#261E1B" stroke="#81543E" strokeWidth="1.5" />
      <path d="m33 257 295 134 278-136v11L328 405 33 269Z" fill="url(#launch-strata)" />
      <path d="M33 254 311 118 606 251 328 388Z" fill="url(#launch-land)" stroke="#A67B59" strokeWidth="1.6" />
      <g clipPath="url(#launch-ground-clip)">
        <path d="m41 262 273-137m-235 155 281-135M115 297l283-137M153 314l283-137M193 333l282-137M232 350l282-137M271 370l282-137m-506 5 303 137M86 220l303 137M125 201l303 137M164 182l303 137M203 163l303 137M242 144l303 137M281 125l303 137" fill="none" stroke="#E2C59B" strokeOpacity=".13" />
        <path d="M287 122c42 20 37 42 38 66 1 17 25 25 58 40 29 14 32 36 35 49 3 17 38 37 109 56l108-67-103-34-55-16c-61-20-82-40-89-68l-66-34Z" fill="url(#launch-water)" stroke="#5D9896" strokeWidth="1.8" />
        <g className="launch-flow" fill="none" stroke="#83D5CC" strokeWidth="1.6" strokeDasharray="11 14">
          <path d="M327 127c32 27 10 59 54 79 52 25 58 26 73 62 10 23 47 40 116 53" />
          <path d="M363 134c16 28 7 56 51 74 59 23 55 41 79 59 20 15 46 20 90 28" opacity=".65" />
          <path d="m508 271 92 29M488 283l76 26" opacity=".7" />
        </g>
      </g>
      <g className="launch-sector" data-signal="sierra">
        <path d="m149 204 59-56 28 7 42-64 32 25 22 43 25-14 38 48-87 36Z" fill="url(#launch-mountain)" stroke="#AAAB83" strokeWidth="1.4" />
        <path d="m207 148 16 37-74 19m129-113-5 72-50 22 85 44m-35-66 37-47 22 43 28 28-52 42m24-70 25-14 38 48-35-6" fill="none" stroke="#A9B995" strokeOpacity=".68" />
        <path d="m278 92-25 36 21-8 9 10 12-7 15-7Z" fill="#D5CFB0" opacity=".75" />
        <path d="m176 214 49-16 41 5 27-13-8-12 25-10" fill="none" stroke="#172721" strokeWidth="9" strokeLinejoin="round" />
        <path d="m176 214 49-16 41 5 27-13-8-12 25-10" fill="none" stroke="#BCC585" strokeWidth="2" strokeLinejoin="round" strokeDasharray="3 5" />
        <path d="m309 164 12-5 15 6-13 6Z" fill="#9AD4BF" stroke="#183832" />
        <path d="M309 164v9l14 7 13-6v-9l-13 6Z" fill="#467969" stroke="#183832" />
      </g>
      <g className="launch-sector" data-signal="industria">
        <g transform="translate(526 113) scale(.7)"><use href="#launch-turbine" /></g>
        <g transform="translate(457 112) scale(.62)"><use href="#launch-turbine" /></g>
        <g transform="translate(495 159) scale(.89)"><use href="#launch-turbine" /></g>
        <path d="m520 225 32-14 35 14-33 16Z" fill="#BF8261" stroke="#312422" />
        <path d="M520 225v12l34 16v-12l33-16v12l-33 16Z" fill="#644837" stroke="#312422" />
        <path d="m531 232 15 7m19 1 15-7" stroke="#FFC070" strokeWidth="2.8" />
      </g>
      <g className="launch-sector" data-signal="costa">
        <path d="m426 274 65-31 78 35-64 30Z" fill="#AC9173" stroke="#1E2422" strokeWidth="2" />
        <path d="M426 274v10l79 35 64-31v-10l-64 30Z" fill="#594E43" stroke="#1E2422" strokeWidth="2" />
        <path d="m437 277 66 28 54-26" fill="none" stroke="#E6C481" strokeDasharray="6 4" />
        <path d="m454 269 21-10 27 12-21 10Zm29 12 21-10 27 12-21 10Z" fill="#EE7744" stroke="#623525" />
        <path d="M454 269v8l27 12v-8l21-10v8l-21 10m2-8v8l27 12v-8l21-10v8l-21 10" fill="#A4472C" stroke="#623525" />
        <path d="m555 309 42-20 20 2-4 9-40 19-22-1Z" fill="#1E3235" stroke="#8BC5B9" strokeWidth="1.5" />
        <path d="m558 309 42-19 11 3-42 20Z" fill="#EBC9A7" /><path d="m575 300 17-8 8 3-17 8Z" fill="#DB7847" />
        <path className="launch-flow" d="m548 313-18 8m22-2-16 8" stroke="#A4E3DA" strokeWidth="1.6" strokeDasharray="3 5" />
      </g>
      <g className="launch-sector" data-signal="ciudad">
        <path d="m71 226 43-18 50 20-47 23Z" fill="#86664D" stroke="#C2966E" />
        <path d="m93 123 30-13 37 15-32 15Z" fill="#F0A675" stroke="#402B24" strokeWidth="2" />
        <path d="M93 123v98l35 17v-98l32-15v98l-32 15Z" fill="#5B4137" stroke="#332420" strokeWidth="2" />
        <path d="m128 140 32-15v98l-32 15Z" fill="#926146" stroke="#332420" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => <path key={i} d={`m100 ${142 + i * 16} 19 9m18-2 16-8`} stroke="#FFC289" strokeWidth="2" />)}
        <path d="m163 224 27-12 31 12-28 14Z" fill="#7D674E" stroke="#C59B73" />
        <path d="M190 221V63h9v158m-9-154 9 14-9 13 9 14-9 14 9 14-9 14 9 14-9 14 9 14-9 14M148 79l50-25 78 24-3 7-76-19-45 18Z" fill="none" stroke="#FF9B50" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="m197 57 15 15 13-5 11 11 13-3 11 8" fill="none" stroke="#FFAD72" strokeWidth="1.4" />
        <path d="M261 81v33" fill="none" stroke="#EAC9A7" strokeWidth="1.4" />
        <g className="launch-load">
          <path d="M261 112v25l-12 10m12-10 12 10" fill="none" stroke="#EAC9A7" strokeWidth="1.4" />
          <path d="m247 147 12-5 15 5-12 6Z" fill="#FFBE7C" stroke="#3D2F27" />
          <path d="M247 147v8l15 7v-9l12-6v8l-12 7Z" fill="#C36536" stroke="#3D2F27" />
        </g>
      </g>
      <g strokeLinejoin="round">
        <path d="M251 246v45l11 6 10-4v-48m101-24v53l11 5 10-5v-56" fill="#624533" stroke="#A4775E" strokeWidth="1.5" />
        <path d="m110 273 368-83 37 17-365 86Z" fill="#282A2B" stroke="#171C1C" strokeWidth="2" />
        <path d="m150 293 365-86v9l-365 86-40-20v-9Z" fill="url(#launch-girder)" stroke="#5D3928" strokeWidth="1.5" />
        <path d="m122 273 353-80m-323 96 353-83" fill="none" stroke="#E1AA7E" strokeWidth="1.7" />
        <path d="m140 281 354-81" fill="none" stroke="#F1D5B8" strokeWidth="1.6" strokeDasharray="9 7" opacity=".74" />
        <g clipPath="url(#launch-road-clip)">
          <g className="launch-traffic">
            <path d="m108 278 24-6 7 3-24 6Z" fill="#FF9C57" />
            <path d="m115 281 24-6v3l-24 6Z" fill="#F7BE83" />
            <path d="m138 276 5-1m-5 4 5-1" stroke="#FFF4D8" strokeWidth="1.6" />
          </g>
        </g>
        <path d="m260 259 7 3 5-1v-91l-6-3-6 2Zm106-24 7 4 5-2v-89l-6-3-6 2Z" fill="#F5AA71" stroke="#653823" strokeWidth="1.5" />
        <path d="m266 176-91 105m91-105-58 96m58-96-30 89m31-89 22 77m-22-77 49 70m56-92-55 90m55-90-27 84m27-84 24 74m-24-74 51 67m-51-67 76 62" fill="none" stroke="#F5C2A0" strokeOpacity=".8" strokeWidth="1.3" />
      </g>
      <path d="M47 259 328 385l258-126" fill="none" stroke="#FF9B59" strokeOpacity=".55" strokeWidth="1.5" />
      <g transform={`translate(${x} ${y})`}>
        <circle r="24" fill="none" stroke="#FF9C5F" strokeOpacity=".6" strokeDasharray="4 4" />
        <circle className="launch-ping" r="15" fill="none" stroke="#FF9C5F" strokeWidth="2" />
        <circle r="7" fill="#FF8848" stroke="#FFE5CE" strokeWidth="1.5" />
        <path d="M-31 0h11m40 0h11M0-31v11m0 40v11" stroke="#FFA66A" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

type LaunchProps = {
  territories: readonly { id: TerritoryId; number: string; name: string; zones: readonly ZoneId[] }[];
  repaired: ReadonlySet<ZoneId>;
  onOpenAtlas: () => void;
};

function MissionLaunch({ territories, repaired, onOpenAtlas }: LaunchProps) {
  const [selection, setSelection] = useState(0);
  const [paused, setPaused] = useState(false);
  const territory = territories[selection];
  const signal = SIGNALS[territory.id];
  const total = territories.reduce((sum, item) => sum + item.zones.length, 0);
  const nextMission = territory.zones.find(zone => !repaired.has(zone));

  return (
    <div className="launch-hero" data-sector={territory.id} data-paused={paused}>
      <div className="launch-layout">
        <div className="launch-intro">
          <p className="launch-kicker font-mono-tech"><span aria-hidden="true" /> Ingeniería Civil / Territorio en Proyecto</p>
          <h1 className="launch-title" aria-label="Levanta lo imposible">
            <span className="launch-title-main">LEVANTA</span>
            <span className="launch-title-sub"><span>LO</span> IMPOSIBLE<span className="launch-period">.</span></span>
          </h1>
          <p className="launch-copy">Reconecta una comunidad, pon en marcha un parque eólico o rescata un puerto. Elige dónde intervenir y toma la primera decisión.</p>
          <div className="launch-actions">
            <a className="launch-play" href={nextMission ? `#zona/${nextMission}` : `#territorio/${territory.id}`}>
              {nextMission ? 'Jugar misión' : 'Revisar misiones'} <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <button type="button" className="launch-atlas" onClick={onOpenAtlas}>
              Ver atlas <ArrowDown size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="launch-progress font-mono-tech" aria-live="polite">
            <span>{repaired.size}/{total} misiones</span>
            <span className="launch-meter" aria-hidden="true"><span style={{ width: `${repaired.size / total * 100}%` }} /></span>
            <strong>{repaired.size * 60} XP</strong>
          </p>
        </div>
        <div className="launch-console">
          <p className="launch-signals-label font-mono-tech" id="launch-signals-label">Elige una señal</p>
          <div className="launch-signals" role="group" aria-labelledby="launch-signals-label">
            {territories.map((item, index) => {
              const { label, icon: Icon } = SIGNALS[item.id];
              return (
                <button key={item.id} type="button" aria-pressed={selection === index} onClick={() => setSelection(index)}>
                  <Icon size={17} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <div className="launch-screen">
            <div className="launch-screen-top font-mono-tech">
              <span><Radio size={15} aria-hidden="true" /> Señal {territory.number} <span aria-hidden="true">//</span> {signal.label}</span>
              <button type="button" className="launch-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reanudar animación' : 'Pausar animación'} title={paused ? 'Reanudar animación' : 'Pausar animación'}>
                {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              </button>
            </div>
            <TerrainModel active={territory.id} />
            <div className="launch-screen-caption" role="status">
              <span className="launch-cue font-mono-tech">MISIÓN {territory.number}</span>
              <span>{signal.detail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TerritoryHub({ repaired, grade, onGrade, onReset }: {
  repaired: ReadonlySet<ZoneId>; grade: GradeLevel; onGrade: (grade: GradeLevel) => void; onReset: () => void;
}) {
  const atlasHeading = useRef<HTMLHeadingElement>(null);
  return (
    <section id="mapa" className="bg-[#EEE6D9]">
      <MissionLaunch territories={TERRITORIES} repaired={repaired} onOpenAtlas={() => {
        atlasHeading.current?.focus({ preventScroll: true });
        atlasHeading.current?.scrollIntoView({ block: 'start' });
      }} />
      <div className={width+' py-5 sm:py-7'}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div><p className={micro+' text-[#834323]'}>Atlas de misiones</p><h2 ref={atlasHeading} tabIndex={-1} className="mt-1 scroll-mt-28 text-2xl font-black tracking-tight">Elige dónde intervenir.</h2></div>
          <GradeSwitch grade={grade} onChange={onGrade} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TERRITORIES.map(t=>{
            const count=t.zones.filter(z=>repaired.has(z)).length;
            return <a key={t.id} href={`#territorio/${t.id}`} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#B89578] bg-[#FFF8ED] shadow-[2px_3px_0_#C9AE95] hover:border-[#9A4824] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B3D17]">
              <div className="relative overflow-hidden border-b border-[#C0A184]">
                <TerritoryLandscape territory={t.id}/>
                <span className={micro+' absolute left-2 top-2 bg-[#251A14] px-2 py-1 text-[#FFF0DB]'}>T{t.number}</span>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-xl font-black leading-tight tracking-tight">{t.name}</h3>
                <p className="mt-1 text-sm leading-snug text-[#534135]">{t.pitch}</p>
                <p className="mt-2 text-xs font-bold leading-snug text-[#754323]">{t.work}</p>
                <div className="mt-auto flex items-center justify-between gap-1 pt-3 text-xs font-extrabold text-[#693A24]"><span>{count}/{t.zones.length} resueltas</span><span className="flex items-center gap-1">Entrar <ArrowRight size={16} aria-hidden="true"/></span></div>
              </div>
            </a>;
          })}
        </div>
        <nav aria-label="Explorar más" className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[#C9B099] pt-2 text-sm font-bold text-[#67381E]">
          <a className="inline-flex min-h-[44px] items-center rounded bg-[#FFDBC2] px-3 hover:underline" href="#mitos">Jugar mitos y verdades</a>
          <a className="inline-flex min-h-[44px] items-center hover:underline" href="#conecta">Conecta con Anáhuac</a>
          <a className="inline-flex min-h-[44px] items-center hover:underline" href="#mision-lluvia">Simulador de lluvia</a>
          <a className="inline-flex min-h-[44px] items-center hover:underline" href="#mision-equipo">Civil y Arquitectura</a>
          <a className="inline-flex min-h-[44px] items-center hover:underline" href="#explorar">Fichas de las áreas</a>
          {repaired.size>0 && <button type="button" className="min-h-[44px] hover:underline sm:ml-auto" onClick={onReset}>Reiniciar turno</button>}
        </nav>
      </div>
    </section>
  );
}

export function OutsideBoard({ id, repaired }: { id: Exclude<TerritoryId, 'ciudad'>; repaired: ReadonlySet<ZoneId> }) {
  const territory = TERRITORIES.find(t => t.id === id)!;
  const zones = territory.zones.filter(isOutside);
  return <div className="grid items-start gap-4 lg:grid-cols-[1.5fr_1fr]">
    <div className="relative overflow-hidden rounded-xl border border-[#AC866B] bg-[#FFF2DF] shadow-[3px_3px_0_#CDB49C]">
      <TerritoryLandscape territory={id} repaired={repaired}/>
      {zones.map((zone,index)=>{
        const incident=OUTSIDE_ZONES[zone];
        const complete=repaired.has(zone);
        return <a key={zone} href={`#zona/${zone}`} style={{left:`${incident.position[0]}%`,top:`${incident.position[1]}%`}} aria-label={`Abrir ${incident.label}`}
          className={`absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#FFF2DE] font-mono-tech text-sm font-extrabold text-white shadow-md ${complete?'bg-[#2B6554]':'bg-[#96381F]'}`}>{complete?<Check size={20} aria-hidden="true"/>:index+1}</a>;
      })}
    </div>
    <nav aria-label={`Misiones de ${territory.name}`} className="grid gap-2">
      {zones.map(zone=>{
        const incident=OUTSIDE_ZONES[zone];
        const complete=repaired.has(zone);
        return <a key={zone} href={`#zona/${zone}`} className={`flex min-h-[72px] items-center gap-3 rounded-lg border p-3 ${complete?'border-[#83A68F] bg-[#E4ECD9]':'border-[#BDA086] bg-[#FFF8ED] hover:border-[#9A4824]'}`}>
          <span className={`grid size-8 shrink-0 place-items-center rounded ${complete?'bg-[#2E6654] text-white':'bg-[#F1CFB3] text-[#71391F]'}`}>{complete?<Check size={16} aria-hidden="true"/>:<MapPin size={16} aria-hidden="true"/>}</span>
          <span className="flex-1"><strong className="block text-sm">{incident.label}</strong><span className="text-xs text-[#674433]">{incident.specialty}</span></span>
          <ChevronRight size={16} aria-hidden="true"/>
        </a>;
      })}
    </nav>
  </div>;
}

/* Escribe la cifra: solo cifras «de examen», redondas y muy repetidas (Sergio, 25-11: que no sean complicadas).
   Las rebuscadas (autocaravanas por masa, mercancías peligrosas, transporte escolar, remolques...) siguen como tipo test.
   Las que llevan `de` salen de una pregunta ya verificada del banco (data/preguntas.js): mismo enunciado, lección y cita.
   Las demás están escritas a mano con su cita literal. Todas pasan comprobar.py. */
window.EJERCICIOS.push(
  // ---------- Velocidad ----------
  {
    "id": "cifra-vel-0011",
    "de": "vel-0011",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "¿Cuál es la velocidad mínima en autopistas y autovías para los vehículos a motor?",
    "respuesta": 60,
    "unidad": "km/h",
    "porque": "Para no entorpecer a los demás, en autopistas y autovías está prohibido circular con vehículos a motor a menos de 60 km/h. Hay excepciones, como los vehículos especiales o cuando las circunstancias impiden ir más rápido sin riesgo.",
    "truco": "Mínimas: en autopista y autovía, 60 para vehículos a motor; en las demás vías, la mitad de la genérica de tu vehículo en esa vía.",
    "fuente": {
      "norma": "RGC",
      "articulo": "49.1",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a49",
      "cita": "se prohíbe la circulación en autopistas y autovías de vehículos a motor a una velocidad inferior a 60 kilómetros por hora"
    }
  },
  {
    "id": "cifra-vel-0014",
    "de": "vel-0014",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "¿Cuál es el límite genérico de velocidad en una vía urbana con plataforma única de calzada y acera?",
    "respuesta": 20,
    "unidad": "km/h",
    "porque": "Cuando calzada y acera están al mismo nivel, en una plataforma única, peatones y vehículos comparten espacio, y el límite genérico baja a 20 km/h.",
    "truco": "En ciudad, cuenta los carriles por sentido sin los reservados: plataforma única, 20; un carril, 30; dos o más, 50.",
    "fuente": {
      "norma": "RGC",
      "articulo": "50.1.a",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a50",
      "cita": "20 km/h en vías que dispongan de plataforma única de calzada y acera."
    }
  },
  {
    "id": "cifra-vel-0012",
    "de": "vel-0012",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "¿Cuál es la velocidad mínima de un turismo en una carretera convencional, en condiciones normales?",
    "respuesta": 45,
    "unidad": "km/h",
    "porque": "Fuera de autopistas y autovías, la mínima es la mitad de la velocidad genérica de tu vehículo en esa vía. El turismo tiene 90 en convencional, así que su mínima es 45 km/h.",
    "truco": "Mínimas: en autopista y autovía, 60 para vehículos a motor; en las demás vías, la mitad de la genérica de tu vehículo en esa vía.",
    "fuente": {
      "norma": "RGC",
      "articulo": "49.1",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a49",
      "cita": "a una velocidad inferior a la mitad de la genérica señalada para cada categoría de vehículos · Turismos [...] | Convencional 90",
      "comprobar": [
        "a una velocidad inferior a la mitad de la genérica señalada para cada categoría de vehículos",
        "Convencional                 90"
      ]
    }
  },
  {
    "id": "cifra-vel-0017",
    "de": "vel-0017",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "¿Cuál es el límite genérico de velocidad en una autopista que transcurre dentro de poblado?",
    "respuesta": 80,
    "unidad": "km/h",
    "porque": "Una autopista o autovía que pasa por dentro de un poblado tiene un límite genérico propio: 80 km/h. Puede ampliarse con señalización específica, pero nunca por encima de los límites que tendría fuera de poblado.",
    "fuente": {
      "norma": "RGC",
      "articulo": "50.6",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a50",
      "cita": "El límite genérico de velocidad en autopistas y autovías que transcurren dentro de poblado será de 80 km/h"
    },
    "truco": "Autopista o autovía que pasa por dentro de un poblado: 80, salvo que una señal permita más."
  },
  {
    "id": "cifra-vel-0010",
    "de": "vel-0010",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "¿Cuál es el límite de velocidad máximo en una vía sin pavimentar?",
    "respuesta": 30,
    "unidad": "km/h",
    "porque": "En una vía sin pavimentar el agarre y el firme son peores, y la norma fija un máximo de 30 km/h, sea cual sea el límite que tendría tu vehículo en otra vía.",
    "fuente": {
      "norma": "RGC",
      "articulo": "48.1.f",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a48",
      "cita": "En las vías sin pavimentar el límite de velocidad máximo será de 30 km/h."
    },
    "truco": "Sin asfalto, 30 como máximo, vayas en el vehículo que vayas."
  },
  // ---------- Alcohol ----------
  {
    "id": "cifra-D-alc-0010",
    "de": "D-alc-0010",
    "tipo": "cifra",
    "materia": 4,
    "enunciado": "¿Cuál es la tasa máxima de alcohol en aire espirado para el conductor de un turismo con más de dos años de antigüedad de permiso?",
    "respuesta": 0.25,
    "unidad": "mg/l",
    "porque": "Con más de dos años de permiso, y en un turismo que no sea de servicio público ni de otro grupo especial, se aplica la tasa general: 0,25 mg/l en aire espirado, que equivale a 0,5 g/l en sangre.",
    "truco": "Dos grupos y dos números: novatos y profesionales, 0,15 en aire; el resto, 0,25. En la norma, la cifra en sangre es el doble que la de aire (0,3 y 0,5): si te preguntan en gramos por litro de sangre, multiplica por dos. Y si el conductor es menor de edad, 0.",
    "fuente": {
      "norma": "RGC",
      "articulo": "20",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a20",
      "cita": "con una tasa de alcohol en sangre superior a 0,5 gramos por litro, o de alcohol en aire espirado superior a 0,25 miligramos por litro."
    }
  },
  {
    "id": "cifra-D-alc-0011",
    "de": "D-alc-0011",
    "tipo": "cifra",
    "materia": 4,
    "enunciado": "¿Cuál es la tasa máxima de alcohol en sangre para el conductor de un turismo con más de dos años de antigüedad de permiso?",
    "respuesta": 0.5,
    "unidad": "g/l",
    "porque": "La tasa general en sangre es 0,5 g/l, que equivale a 0,25 mg/l en aire espirado. Es la que se aplica con más de dos años de permiso y en un turismo que no sea de servicio público.",
    "truco": "Dos grupos y dos números: novatos y profesionales, 0,15 en aire; el resto, 0,25. En la norma, la cifra en sangre es el doble que la de aire (0,3 y 0,5): si te preguntan en gramos por litro de sangre, multiplica por dos. Y si el conductor es menor de edad, 0.",
    "fuente": {
      "norma": "RGC",
      "articulo": "20",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a20",
      "cita": "con una tasa de alcohol en sangre superior a 0,5 gramos por litro, o de alcohol en aire espirado superior a 0,25 miligramos por litro."
    }
  },
  {
    "id": "cifra-D-alc-0016",
    "de": "D-alc-0016",
    "tipo": "cifra",
    "materia": 4,
    "enunciado": "Durante los dos años siguientes a la obtención del permiso, ¿qué tasa máxima de alcohol en aire espirado puede tener un conductor mayor de edad?",
    "respuesta": 0.15,
    "unidad": "mg/l",
    "porque": "Durante los dos primeros años de permiso la norma rebaja la tasa al mismo nivel que la de los profesionales: 0,15 mg/l en aire espirado (0,3 g/l en sangre), para cualquier vehículo.",
    "truco": "Dos grupos y dos números: novatos y profesionales, 0,15 en aire; el resto, 0,25. En la norma, la cifra en sangre es el doble que la de aire (0,3 y 0,5): si te preguntan en gramos por litro de sangre, multiplica por dos.",
    "fuente": {
      "norma": "RGC",
      "articulo": "20",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a20",
      "cita": "no podrán superar la tasa de alcohol en sangre de 0,3 gramos por litro ni de alcohol en aire espirado de 0,15 miligramos por litro durante los dos años siguientes a la obtención del permiso"
    }
  },
  {
    "id": "cifra-D-alc-0018",
    "de": "D-alc-0018",
    "tipo": "cifra",
    "materia": 4,
    "enunciado": "Entre la primera y la segunda prueba de alcoholemia por aire espirado, ¿qué tiempo mínimo debe transcurrir?",
    "respuesta": 10,
    "unidad": "minutos",
    "porque": "Si la primera prueba supera la tasa, o hay síntomas evidentes, se hace una segunda por aire espirado, y tienes derecho a controlar que entre las dos pasen al menos 10 minutos.",
    "truco": "Segunda prueba de aire: al menos 10 minutos después de la primera.",
    "fuente": {
      "norma": "RGC",
      "articulo": "23.2",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a23",
      "cita": "que entre la realización de la primera y de la segunda prueba medie un tiempo mínimo de 10 minutos."
    }
  },
  // ---------- Puntos y multas ----------
  {
    "id": "cifra-C-pun-0001",
    "de": "C-pun-0001",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "Con carácter general, ¿cuál es el crédito inicial de puntos asignado al titular de un permiso de conducción?",
    "respuesta": 12,
    "unidad": "puntos",
    "porque": "La regla general es que todo titular de un permiso o licencia empieza con doce puntos. Solo en dos casos excepcionales se empieza con ocho.",
    "truco": "Empiezan con 8 puntos quienes tienen el permiso desde hace tres años o menos (sin otro anterior con esa antigüedad) y quienes lo recuperan tras perderlos todos. Si pasan dos años sin sanciones firmes que quiten puntos, suben a 12.",
    "fuente": {
      "norma": "LSV",
      "articulo": "63.1",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722#a63",
      "cita": "Al titular de un permiso o licencia de conducción se le asignará un crédito inicial de doce puntos."
    }
  },
  {
    "id": "cifra-C-pun-0014",
    "de": "C-pun-0014",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "¿Cuál es el número máximo de puntos que puede llegar a acumular un conductor gracias a las bonificaciones?",
    "respuesta": 15,
    "unidad": "puntos",
    "porque": "El crédito inicial general es de 12 puntos. Quien los mantiene todos sin ser sancionado en firme recibe 2 de bonificación por los tres primeros años (14) y 1 más por los tres siguientes, hasta un máximo de 15.",
    "truco": "Con los 12 puntos completos y sin sanciones: +2 a los tres años y +1 a los seis. Tope: 15.",
    "fuente": {
      "norma": "LSV",
      "articulo": "63.4",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722#a63",
      "cita": "pudiendo llegar a acumular hasta un máximo de quince puntos en lugar de los doce iniciales"
    }
  },
  {
    "id": "cifra-C-pun-0005",
    "de": "C-pun-0005",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "¿Cuántos puntos se pueden recuperar como máximo con un curso de sensibilización y reeducación vial de recuperación parcial?",
    "respuesta": 6,
    "unidad": "puntos",
    "porque": "Quien ha perdido parte de sus puntos puede recuperar hasta 6 con un curso de sensibilización y reeducación vial, siempre que lo supere con aprovechamiento. Nunca se recuperan más puntos de los perdidos.",
    "truco": "Curso parcial: hasta 6 puntos, una vez cada dos años (cada año los profesionales).",
    "fuente": {
      "norma": "LSV",
      "articulo": "65.4",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722#a65",
      "cita": "podrá optar a su recuperación parcial, hasta un máximo de seis puntos, por una sola vez cada dos años"
    }
  },
  {
    "id": "cifra-C-pun-0016",
    "de": "C-pun-0016",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "Como norma general, ¿cuántos puntos como máximo puede perder un conductor por acumulación de infracciones en un solo día?",
    "respuesta": 8,
    "unidad": "puntos",
    "porque": "La ley pone un tope a lo que se pierde en un solo día sumando infracciones: como mucho 8 puntos. La excepción son algunas infracciones muy graves, con las que se pierden todos los puntos que correspondan.",
    "truco": "El 8 sale dos veces: es el tope de puntos que se pierden en un día y es el saldo con el que empieza quien tiene el permiso desde hace tres años o menos.",
    "fuente": {
      "norma": "LSV",
      "articulo": "64.4",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722#a64",
      "cita": "Los conductores no perderán más de ocho puntos por acumulación de infracciones en un solo día, salvo que concurra alguna de las infracciones muy graves"
    }
  },
  {
    "id": "cifra-D-mov-0002",
    "de": "D-mov-0002",
    "tipo": "cifra",
    "materia": 4,
    "enunciado": "¿Cuántos puntos pierde el conductor sancionado en firme por utilizar, sujetándolo con la mano, el teléfono móvil mientras conduce?",
    "respuesta": 6,
    "unidad": "puntos",
    "porque": "Usar el móvil sujetándolo con la mano mientras se conduce cuesta 6 puntos. Está entre las infracciones que más puntos quitan, como el tramo alto de alcohol o las drogas.",
    "truco": "Móvil sujeto con la mano: 6 puntos. Manipular el navegador o el móvil de otra forma, o llevar auriculares conectados: 3.",
    "fuente": {
      "norma": "LSV",
      "articulo": "Anexo II.8",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722",
      "cita": "8. Utilizar, sujetando con la mano, dispositivos de telefonía móvil mientras se conduce. | 6",
      "comprobar": [
        "8. Utilizar, sujetando con la mano, dispositivos de telefonía móvil mientras se conduce. 6"
      ]
    }
  },
  {
    "id": "cifra-x1b-0113",
    "de": "x1b-0113",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "Como norma general, ¿con qué multa se sanciona una infracción grave?",
    "respuesta": 200,
    "unidad": "euros",
    "porque": "La Ley fija tres cuantías generales: las infracciones leves, hasta 100 euros; las graves, 200 euros; y las muy graves, 500 euros. Los excesos de velocidad tienen su propio cuadro y algunas infracciones tienen multas especiales.",
    "truco": "Multas de la Ley: leve, hasta 100 €; grave, 200 €; muy grave, 500 €. Con cuantía propia: alcohol o drogas y negarse a las pruebas, 1.000 € (en el alcohol, solo en ciertos casos); inhibidor de radar, 6.000 €. La velocidad va por su propio cuadro.",
    "fuente": {
      "norma": "LSV",
      "articulo": "80.1",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722#a80",
      "cita": "Las infracciones leves serán sancionadas con multa de hasta 100 euros; las graves, con multa de 200 euros"
    }
  },
  {
    "id": "cifra-x1b-0114",
    "de": "x1b-0114",
    "tipo": "cifra",
    "materia": 1,
    "enunciado": "Como norma general, ¿con qué multa se sanciona una infracción muy grave?",
    "respuesta": 500,
    "unidad": "euros",
    "porque": "La Ley fija tres cuantías generales: las infracciones leves, hasta 100 euros; las graves, 200 euros; y las muy graves, 500 euros. Algunas muy graves tienen una multa especial más alta, pero la regla general es 500.",
    "truco": "Multas de la Ley: leve, hasta 100 €; grave, 200 €; muy grave, 500 €. Con cuantía propia: alcohol o drogas y negarse a las pruebas, 1.000 € (en el alcohol, solo en ciertos casos); inhibidor de radar, 6.000 €. La velocidad va por su propio cuadro.",
    "fuente": {
      "norma": "LSV",
      "articulo": "80.1",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722#a80",
      "cita": "y las muy graves, con multa de 500 euros"
    }
  },
  // ---------- Permiso, vehículo y seguridad ----------
  {
    "id": "cifra-C-doc-0007",
    "de": "C-doc-0007",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "Se considera remolque ligero aquel cuya masa máxima autorizada no excede de...",
    "respuesta": 750,
    "unidad": "kg",
    "porque": "La Ley de Tráfico define el remolque ligero como aquel cuya masa máxima autorizada no excede de 750 kg. Es una cifra clave: por encima de 750 kg el remolque necesita matrícula y su propio seguro, y cambian los requisitos del permiso.",
    "truco": "750 kg es la frontera de los remolques: hasta ahí, sin matrícula ni seguro propio y con el permiso B sin más requisitos.",
    "fuente": {
      "norma": "LSV",
      "articulo": "Anexo I.21",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11722",
      "cita": "Remolque ligero. Aquél cuya masa máxima autorizada no exceda de 750 kg."
    }
  },
  {
    "id": "cifra-sri-135",
    "tipo": "cifra",
    "materia": 15,
    "enunciado": "¿Hasta qué estatura tienen que ir los niños en un sistema de retención infantil (silla o alzador homologado)?",
    "respuesta": 135,
    "unidad": "cm",
    "porque": "Los menores de edad que miden 135 cm o menos tienen que ir en un sistema de retención infantil homologado. Cuando pasan de 135 cm, usan el cinturón de seguridad como los adultos.",
    "truco": "La cifra es la altura, no la edad: 135 cm.",
    "fuente": {
      "norma": "RGC",
      "articulo": "117.1",
      "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514#a117",
      "cita": "En todo caso, los menores de edad de estatura igual o inferior a 135 centímetros deberán utilizar sistemas de retención infantil"
    }
  },
  {
    "id": "cifra-neumaticos-1-6",
    "tipo": "cifra",
    "materia": 14,
    "enunciado": "¿Qué profundidad mínima tiene que tener el dibujo de los neumáticos de un turismo?",
    "respuesta": 1.6,
    "unidad": "mm",
    "porque": "Las ranuras de la banda de rodadura de un turismo tienen que tener al menos 1,6 milímetros de profundidad.",
    "truco": "Turismos, furgonetas ligeras y remolques ligeros: 1,6 mm. Autobuses y camiones de más de 3.500 kg: 1 mm.",
    "fuente": {
      "norma": "MANUAL_DGT",
      "articulo": "Tema 5, Neumáticos (p. 98)",
      "url": "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf",
      "cita": "La banda de rodamiento de los turismos debe tener unas ranuras con al menos 1,6 milímetros de profundidad."
    }
  },
  {
    "id": "cifra-edad-permiso-b",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "¿Con qué edad mínima puedes sacarte el permiso B?",
    "respuesta": 18,
    "unidad": "años",
    "porque": "El permiso B, el de los coches, se puede obtener a partir de los 18 años.",
    "truco": "Ciclomotor (AM) a los 15, moto de 125 (A1) a los 16 y coche (B) a los 18.",
    "fuente": {
      "norma": "MANUAL_DGT",
      "articulo": "Tema 2, Permisos (p. 29)",
      "url": "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf",
      "cita": "B | Automóviles que pueden llevar hasta nueve pasajeros [...] | 18 años",
      "comprobar": [
        "Automóviles\nque pueden llevar\nhasta nueve pasajeros.",
        "B     Vehículos especiales      18 años"
      ]
    }
  },
  {
    "id": "cifra-itv-primera",
    "tipo": "cifra",
    "materia": 10,
    "enunciado": "Te compras un turismo nuevo. ¿A los cuántos años tiene que pasar su primera ITV?",
    "respuesta": 4,
    "unidad": "años",
    "porque": "Un turismo nuevo pasa la primera inspección técnica a los 4 años. Después, cada 2 años, y a partir de los 10 años, todos los años.",
    "truco": "Turismo: 4, luego cada 2, y con más de 10 años, cada año.",
    "fuente": {
      "norma": "MANUAL_DGT",
      "articulo": "Tema 2, Inspección técnica (p. 35)",
      "url": "https://www.dgt.es/export/sites/web-DGT/.galleries/downloads/nuestros_servicios/permisos-de-conducir/Accesibilidad/TeoricaAbreviada_LecturaFacil_2023-12_Interactivo.pdf",
      "cita": "Primera revisión a los 4 años. | Vehículos de motor que pueden transportar hasta nueve pasajeros | Después de 4 años, revisión cada 2 años. Después de 10 años, revisión cada año.",
      "comprobar": [
        "Primera revisión a los 4 años.\nVehículos de motor\nque pueden transportar\nhasta nueve pasajeros",
        "Después de 4 años,\nrevisión cada 2 años.\nDespués de 10 años,\nrevisión cada año."
      ]
    }
  },
);

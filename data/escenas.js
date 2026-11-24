// Generado por tools/build_escenas.mjs desde preguntas/escenas.json. No editar a mano.
window.ESCENAS = {
 "A-pri-0001": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Cruce de cuatro brazos sin señales, marcas ni semáforos. El vehículo A llega por el sur, el B por el este y el C por el norte; los tres quieren seguir recto. El brazo oeste está vacío.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N"
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   },
   {
    "letra": "C",
    "desde": "N",
    "hacia": "S"
   }
  ],
  "orden": [
   [
    "C"
   ],
   [
    "B"
   ],
   [
    "A"
   ]
  ]
 },
 "A-pri-0002": {
  "tipo": "cruce",
  "antes": "escena",
  "entorno": "campo",
  "titulo": "Cruce sin señales. El vehículo A circula hacia arriba por una vía pavimentada; por su derecha llega el vehículo B desde un camino de tierra sin pavimentar.",
  "vias": {
   "E": {
    "firme": "tierra"
   },
   "O": {
    "firme": "tierra"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   }
  ],
  "orden": [
   [
    "A"
   ],
   [
    "B"
   ]
  ]
 },
 "B1-pri-0066": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Cruce sin señales. Usted (A) llega por el sur; B se acerca por su derecha y C por su izquierda. Todos siguen recto.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E"
   }
  ],
  "orden": [
   [
    "B"
   ],
   [
    "A"
   ],
   [
    "C"
   ]
  ]
 },
 "A-pri-0006": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) llega a un ceda el paso. Por la vía preferente vienen B por la derecha y C por la izquierda.",
  "vias": {
   "S": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E"
   }
  ],
  "orden": [
   [
    "B",
    "C"
   ],
   [
    "A"
   ]
  ]
 },
 "B1-pri-0061": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) llega a un ceda el paso. Por la vía preferente vienen B por la derecha y C por la izquierda.",
  "vias": {
   "S": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E"
   }
  ],
  "orden": [
   [
    "B",
    "C"
   ],
   [
    "A"
   ]
  ]
 },
 "B1-pri-0062": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "A llega a un ceda el paso y por la vía preferente no viene nadie.",
  "vias": {
   "S": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "No viene nadie por la vía preferente. A reduce la velocidad al llegar, comprueba que está libre y sigue sin detenerse: con ceda el paso solo hay que pararse cuando es preciso.",
    "ms": 4200,
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "llegando a detener por completo su marcha cuando sea preciso"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Cede"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "valle"
     }
    ]
   }
  ]
 },
 "B1-pri-0063": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "A llega a un STOP y por la otra vía no viene nadie.",
  "vias": {
   "S": {
    "senal": "stop"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Aunque no venga nadie, A se detiene por completo en la línea de detención: el STOP lo exige siempre.",
    "ms": 2600,
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "llegando a detener por completo su marcha cuando sea preciso y, en todo caso, cuando así lo indique la señal correspondiente"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "STOP"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ]
   },
   {
    "texto": "Ya detenido, comprueba que la vía está libre y sigue.",
    "ms": 2400,
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ]
   }
  ]
 },
 "x1a-0060": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "A llega a un ceda el paso; por la vía preferente se acerca B.",
  "vias": {
   "S": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "lejos"
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Con antelación, A reduce la velocidad poco a poco hasta la línea: por su forma de circular, B ya ve que A le va a ceder el paso.",
    "ms": 3000,
    "cita": {
     "norma": "RGC",
     "articulo": "58.1",
     "texto": "debe mostrar con suficiente antelación, por su forma de circular y especialmente con la reducción paulatina de la velocidad que efectivamente va a cederlo"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Cede"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ]
   },
   {
    "texto": "B pasa sin tener que frenar ni cambiar su trayectoria.",
    "ms": 2400,
    "cita": {
     "norma": "RGC",
     "articulo": "58.1",
     "texto": "hasta haberse asegurado de que con ello no fuerza al conductor del vehículo que tiene la prioridad a modificar bruscamente la trayectoria o la velocidad de éste"
    },
    "foco": [
     "B"
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ]
   },
   {
    "texto": "Con la vía preferente libre, A sigue su camino.",
    "ms": 2400,
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ]
   }
  ]
 },
 "A-pri-0008": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Cruce visto desde arriba. El vehículo A está en el cruce y quiere girar a la izquierda; el vehículo B se acerca de frente, a poca distancia, y va a seguir recto.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "dentro"
   },
   {
    "letra": "B",
    "desde": "N",
    "hacia": "S",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "B viene de frente, cerca, y sigue recto. A no tiene sitio para girar sin peligro, así que espera junto al eje con el intermitente puesto.",
    "ms": 2400,
    "cita": {
     "norma": "RGC",
     "articulo": "74.1",
     "texto": "cerciorarse de que la velocidad y la distancia de los vehículos que se acerquen en sentido contrario le permiten efectuar la maniobra sin peligro, absteniéndose de realizarla de no darse estas circunstancias"
    },
    "foco": [
     "B"
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ]
   },
   {
    "texto": "Cuando B ha pasado, A gira dejando el centro de la intersección a su izquierda.",
    "ms": 2600,
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.c",
     "texto": "dejará a la izquierda el centro de la intersección"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ]
   }
  ]
 },
 "A-dir-0006": {
  "tipo": "cruce",
  "antes": "nada",
  "centro": true,
  "titulo": "A va a girar a la izquierda en un cruce sin marcas que indiquen otra cosa.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "A pone el intermitente izquierdo y se ciñe al eje de la calzada, sin invadir el sentido contrario.",
    "ms": 2400,
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "se ceñirá a la marca longitudinal de separación entre sentidos o, si ésta no existiera, al eje de la calzada, sin invadir la zona destinada al sentido contrario"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {},
    "mover": [
     {
      "v": "A",
      "hasta": "dentro",
      "modo": "suave"
     }
    ]
   },
   {
    "texto": "Gira dejando el centro de la intersección a su izquierda.",
    "ms": 2600,
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.c",
     "texto": "dejará a la izquierda el centro de la intersección, a no ser que ésta esté acondicionada o señalizada para dejarlo a su derecha"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ]
   }
  ]
 },
 "A-pri-0004": {
  "tipo": "glorieta",
  "antes": "escena",
  "titulo": "Glorieta de un carril sin señales ni marcas de ceda el paso. El vehículo A circula por el anillo y se acerca a la entrada sur; el vehículo B llega por esa entrada.",
  "vehiculos": [
   {
    "letra": "A",
    "dentro": 168,
    "hacia": "E",
    "inicio": "espera"
   },
   {
    "letra": "B",
    "desde": "S",
    "hacia": "N",
    "inicio": "espera"
   }
  ],
  "pasos": [
   {
    "texto": "A ya circula por el anillo, así que tiene preferencia. B espera en la entrada hasta que A pasa.",
    "ms": 2600,
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.c",
     "texto": "En las glorietas, los que se hallen dentro de la vía circular tendrán preferencia de paso sobre los que pretendan acceder a aquéllas"
    },
    "foco": [
     "A"
    ],
    "etiquetas": {
     "A": "Pasa",
     "B": "Espera"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ]
   },
   {
    "texto": "Con el anillo libre, B entra y circula dejando a su izquierda el centro de la glorieta.",
    "ms": 3600,
    "cita": {
     "norma": "RGC",
     "articulo": "43.2",
     "texto": "En las plazas, glorietas y encuentros de vías los vehículos circularán dejando a su izquierda el centro de aquéllas."
    },
    "foco": [
     "B"
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     }
    ]
   }
  ]
 },
 "x1a-0013": {
  "tipo": "glorieta",
  "antes": "imagen",
  "titulo": "A entra en una glorieta por el sur y va a salir por el oeste, a su izquierda.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Aunque A va a salir por la izquierda, recorre el anillo dejando el centro de la glorieta a su izquierda hasta su salida.",
    "ms": 5200,
    "cita": {
     "norma": "RGC",
     "articulo": "43.2",
     "texto": "En las plazas, glorietas y encuentros de vías los vehículos circularán dejando a su izquierda el centro de aquéllas."
    },
    "foco": [
     "A"
    ],
    "etiquetas": {},
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "suave"
     }
    ]
   }
  ]
 },
 "x1a-0067": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega una autocaravana (A); por la derecha, un camión (B).",
  "retrocede": "B",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "autocaravana",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos y no se sabe quién entró primero.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "En caso de duda sobre dicha circunstancia, tendrá la preferencia el vehículo con mayores dificultades de maniobra, de acuerdo con lo que se determina en el artículo 62."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: la autocaravana (A) va en la letra d) y el camión (B), en la f). Por eso el camión (B) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "La autocaravana (A) pasa y después el camión (B) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "d) Turismos que arrastran remolques de hasta 750 kilogramos de masa máxima autorizada y autocaravanas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0068": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega una motocicleta (A); por la derecha, un turismo (B).",
  "retrocede": "A",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "moto",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "turismo",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos y no se sabe quién entró primero.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "En caso de duda sobre dicha circunstancia, tendrá la preferencia el vehículo con mayores dificultades de maniobra, de acuerdo con lo que se determina en el artículo 62."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el turismo (B) va en la letra g) y la motocicleta (A), en la j). Por eso la motocicleta (A) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "B": "Pasa primero",
     "A": "Marcha atrás"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "El turismo (B) pasa y después la motocicleta (A) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "g) Turismos y vehículos derivados de turismos."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0069": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un camión con remolque (A); por la derecha, un autobús (B).",
  "retrocede": "B",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "camion+remolque",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "autobus",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos y no se sabe quién entró primero.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "En caso de duda sobre dicha circunstancia, tendrá la preferencia el vehículo con mayores dificultades de maniobra, de acuerdo con lo que se determina en el artículo 62."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el camión con remolque (A) va en la letra b) y el autobús (B), en la e). Por eso el autobús (B) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "El camión con remolque (A) pasa y después el autobús (B) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "b) Conjunto de vehículos, excepto los contemplados en el párrafo d)."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3800
   }
  ]
 },
 "A-est-0002": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un turismo (A); por la derecha, un camión (B).",
  "retrocede": "A",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "turismo",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos y no se sabe quién entró primero.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "En caso de duda sobre dicha circunstancia, tendrá la preferencia el vehículo con mayores dificultades de maniobra, de acuerdo con lo que se determina en el artículo 62."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el camión (B) va en la letra f) y el turismo (A), en la g). Por eso el turismo (A) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "B": "Pasa primero",
     "A": "Marcha atrás"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "El camión (B) pasa y después el turismo (A) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "f) Camiones, tractocamiones y furgones."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "A-est-0004": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un autobús (A); por la derecha, un camión (B).",
  "retrocede": "B",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "autobus",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos, así que uno tiene que dar marcha atrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el autobús (A) va en la letra e) y el camión (B), en la f). Por eso el camión (B) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "El autobús (A) pasa y después el camión (B) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "e) Vehículos destinados al transporte colectivo de viajeros."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3800
   }
  ]
 },
 "A-est-0005": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un autobús (A); por la derecha, un turismo con remolque (B).",
  "retrocede": "A",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "autobus",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "turismo+remolque",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos, así que uno tiene que dar marcha atrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el turismo con remolque (B) va en la letra d) y el autobús (A), en la e). Por eso el autobús (A) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "B": "Pasa primero",
     "A": "Marcha atrás"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "El turismo con remolque (B) pasa y después el autobús (A) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "d) Turismos que arrastran remolques de hasta 750 kilogramos de masa máxima autorizada y autocaravanas."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "A-est-0006": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un vehículo de tracción animal (A); por la derecha, un turismo con remolque (B).",
  "retrocede": "B",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "carro",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "turismo+remolque",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos, así que uno tiene que dar marcha atrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el vehículo de tracción animal (A) va en la letra c) y el turismo con remolque (B), en la d). Por eso el turismo con remolque (B) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "El vehículo de tracción animal (A) pasa y después el turismo con remolque (B) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "c) Vehículos de tracción animal."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3800
   }
  ]
 },
 "A-est-0007": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un turismo (A); por la derecha, un camión (B).",
  "retrocede": "A",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "turismo",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos, así que uno tiene que dar marcha atrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el camión (B) va en la letra f) y el turismo (A), en la g). Por eso el turismo (A) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "B": "Pasa primero",
     "A": "Marcha atrás"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "El camión (B) pasa y después el turismo (A) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "f) Camiones, tractocamiones y furgones."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "v5a-est-0001": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un turismo con remolque (A); por la derecha, un camión con remolque (B).",
  "retrocede": "A",
  "criterio": "62.1",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "turismo+remolque",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion+remolque",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B entran a la vez en el tramo estrecho y se encuentran: no caben los dos, así que uno tiene que dar marcha atrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Manda el orden del artículo 62: el camión con remolque (B) va en la letra b) y el turismo con remolque (A), en la d). Por eso el turismo con remolque (A) da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "B": "Pasa primero",
     "A": "Marcha atrás"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "El camión con remolque (B) pasa y después el turismo con remolque (A) sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "b) Conjunto de vehículos, excepto los contemplados en el párrafo d)."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0070": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega un camión (A); por la derecha, otro camión (B).",
  "retrocede": "B",
  "criterio": "62.1-tamano",
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "camion",
    "largo": 84,
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion",
    "largo": 60,
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "Los dos camiones se encuentran en el centro del tramo: los dos tendrían que retroceder la misma distancia.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "Cuando se trate de vehículos del mismo tipo o de supuestos no enumerados, la preferencia de paso se decidirá a favor del que tuviera que dar marcha atrás mayor distancia"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "A es más largo que B, así que tiene la preferencia: B da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "en caso de igualdad, del que tenga mayor anchura, longitud o masa máxima autorizada"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "A pasa y después B sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "en caso de igualdad, del que tenga mayor anchura, longitud o masa máxima autorizada"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3800
   }
  ]
 },
 "A-est-0003": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. Por la izquierda llega el turismo A y por la derecha, el turismo B.",
  "retrocede": "B",
  "criterio": "62.1-distancia",
  "encuentro": 226,
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A y B se encuentran dentro del tramo. A ya ha recorrido casi todo; B acaba de entrar.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "Cuando se trate de vehículos del mismo tipo o de supuestos no enumerados, la preferencia de paso se decidirá a favor del que tuviera que dar marcha atrás mayor distancia"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "A tendría que retroceder mucho más que B, así que tiene la preferencia: B da marcha atrás, que para él es poco.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "Cuando se trate de vehículos del mismo tipo o de supuestos no enumerados, la preferencia de paso se decidirá a favor del que tuviera que dar marcha atrás mayor distancia"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "A pasa y después B sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "Cuando se trate de vehículos del mismo tipo o de supuestos no enumerados, la preferencia de paso se decidirá a favor del que tuviera que dar marcha atrás mayor distancia"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2000
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1300,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3600
   }
  ]
 },
 "A-est-0001": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho visto desde arriba, donde solo cabe un vehículo. El turismo A se acerca por la izquierda.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "desde": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "A entra en el tramo estrecho. B llega después por el otro lado y se encuentra el tramo ocupado.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "tendrá derecho de preferencia de paso el que hubiese entrado primero"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "antes",
      "modo": "frena",
      "retraso": 500
     }
    ],
    "etiquetas": {
     "A": "Entró primero",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "Tiene la preferencia el que entró primero: A termina de pasar y B espera fuera del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "tendrá derecho de preferencia de paso el que hubiese entrado primero"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Pasa",
     "B": "Espera"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   },
   {
    "texto": "Con el tramo libre, B entra.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.1",
     "texto": "tendrá derecho de preferencia de paso el que hubiese entrado primero"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   }
  ]
 },
 "A-est-0010": {
  "tipo": "estrecho",
  "antes": "imagen",
  "entorno": "puente",
  "titulo": "Puente estrecho visto desde arriba, donde solo cabe un vehículo. Usted (A) entra por el extremo izquierdo; por el derecho llega B.",
  "retrocede": "A",
  "criterio": "61.2",
  "senales": [
   {
    "cod": "R-5",
    "extremo": "O"
   },
   {
    "cod": "R-6",
    "extremo": "E"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) entra en el puente por el extremo de la señal de prioridad en sentido contrario y se encuentra con B: no caben los dos.",
    "cita": {
     "norma": "RGC",
     "articulo": "61.1",
     "texto": "El orden de preferencia de paso por puentes u obras de paso cuya anchura no permita el cruce de vehículos se realizará conforme a la señalización que lo regule."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Quien ha llegado por el extremo de esa señal es quien retrocede: usted da marcha atrás hasta salir del puente.",
    "cita": {
     "norma": "RGC",
     "articulo": "61.2",
     "texto": "el que llegue por ese extremo habrá de retroceder para dejar paso al otro"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Marcha atrás",
     "B": "Pasa primero"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "B cruza el puente y después usted sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "61.2",
     "texto": "el que llegue por ese extremo habrá de retroceder para dejar paso al otro"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "B1-pri-0072": {
  "tipo": "estrecho",
  "antes": "imagen",
  "entorno": "puente",
  "titulo": "Puente estrecho visto desde arriba, donde solo cabe un vehículo. Usted (A) entra por el extremo izquierdo; por el derecho llega B.",
  "retrocede": "A",
  "criterio": "61.2",
  "senales": [
   {
    "cod": "R-5",
    "extremo": "O"
   },
   {
    "cod": "R-6",
    "extremo": "E"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) entra en el puente por el extremo de la señal de prioridad en sentido contrario y se encuentra con B: no caben los dos.",
    "cita": {
     "norma": "RGC",
     "articulo": "61.1",
     "texto": "El orden de preferencia de paso por puentes u obras de paso cuya anchura no permita el cruce de vehículos se realizará conforme a la señalización que lo regule."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Quien ha llegado por el extremo de esa señal es quien retrocede: usted da marcha atrás hasta salir del puente.",
    "cita": {
     "norma": "RGC",
     "articulo": "61.2",
     "texto": "el que llegue por ese extremo habrá de retroceder para dejar paso al otro"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Marcha atrás",
     "B": "Pasa primero"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "B cruza el puente y después usted sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "61.2",
     "texto": "el que llegue por ese extremo habrá de retroceder para dejar paso al otro"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0059": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) está parado en un ceda el paso; por la vía preferente se acerca B.",
  "vias": {
   "S": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "Hay un hueco, pero B ya está muy cerca: si usted (A) sale ahora, B tendría que frenar de golpe.",
    "cita": {
     "norma": "RGC",
     "articulo": "58.1",
     "texto": "hasta haberse asegurado de que con ello no fuerza al conductor del vehículo que tiene la prioridad a modificar bruscamente la trayectoria o la velocidad de éste"
    },
    "mover": [],
    "etiquetas": {
     "A": "Espera",
     "B": "Preferente"
    },
    "foco": [
     "B"
    ],
    "ms": 2000
   },
   {
    "texto": "Usted espera y B pasa sin tener que frenar ni cambiar su trayectoria.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2200
   },
   {
    "texto": "Ahora sí: sale sin obligar a nadie a frenar.",
    "cita": {
     "norma": "RGC",
     "articulo": "58.1",
     "texto": "hasta haberse asegurado de que con ello no fuerza al conductor del vehículo que tiene la prioridad a modificar bruscamente la trayectoria o la velocidad de éste"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "x1a-0096": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) se acerca a un cruce y va a girar a la izquierda.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "lejos",
    "tu": true
   }
  ],
  "pasos": [
   {
    "texto": "Con antelación, usted pone el intermitente izquierdo y se va arrimando al eje de la calzada antes de llegar al cruce.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "la colocación del vehículo en el lugar adecuado se efectuará con la necesaria antelación"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se coloca"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Ya colocado, gira en el menor espacio y tiempo posibles, dejando el centro de la intersección a su izquierda.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "la maniobra en el menor espacio y tiempo posibles"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   }
  ]
 },
 "A-dir-0002": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) se acerca a un cruce y va a girar a la derecha.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "lejos",
    "tu": true
   }
  ],
  "pasos": [
   {
    "texto": "Antes de girar a la derecha, usted se ciñe todo lo posible al borde derecho de la calzada.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "se ceñirá todo lo posible al borde derecho de la calzada, si el cambio de dirección es a la derecha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se coloca"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Desde ahí gira pegado al borde, sin abrirse, en el menor espacio y tiempo posibles.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "la maniobra en el menor espacio y tiempo posibles"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-dir-0004": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) circula por una calzada de doble sentido y va a girar a la izquierda; de frente viene B.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "lejos",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "N",
    "hacia": "S",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Usted se coloca junto a la marca central, sin pasar al carril contrario, por donde viene B.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "se ceñirá a la marca longitudinal de separación entre sentidos o, si ésta no existiera, al eje de la calzada, sin invadir la zona destinada al sentido contrario"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue",
      "retraso": 900,
      "dura": 2600
     }
    ],
    "etiquetas": {
     "A": "Se coloca",
     "B": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3500
   },
   {
    "texto": "Con el carril contrario libre, gira dejando el centro de la intersección a su izquierda.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.c",
     "texto": "dejará a la izquierda el centro de la intersección"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   }
  ]
 },
 "A-pri-0009": {
  "tipo": "cruce",
  "antes": "nada",
  "entorno": "campo",
  "titulo": "Usted (A) va a salir a una carretera desde el camino privado de su casa. Por la carretera circulan B y C.",
  "vias": {
   "N": {
    "cerrada": true
   },
   "S": {
    "firme": "tierra"
   }
  },
  "edificios": [
   [
    268,
    296,
    86,
    62
   ]
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) sale despacio del camino privado de su casa, asegurándose de que puede hacerlo sin peligro.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.2",
     "texto": "debe asegurarse previamente de que puede hacerlo sin peligro para nadie y efectuarlo a una velocidad que le permita detenerse en el acto"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "borde",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Despacio"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Cede el paso a todos los que circulan por la vía, vengan por la izquierda (C) o por la derecha (B).",
    "cita": {
     "norma": "RGC",
     "articulo": "72.2",
     "texto": "cediendo el paso a los vehículos que circulen por aquélla, cualquiera que sea el sentido en que lo hagan"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "sigue",
      "retraso": 500
     }
    ],
    "etiquetas": {
     "A": "Cede",
     "B": "Pasa",
     "C": "Pasa"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2800
   },
   {
    "texto": "Con la carretera libre, se incorpora.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "de que puede hacerlo sin peligro para los demás usuarios"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-inc-0003": {
  "tipo": "cruce",
  "antes": "nada",
  "entorno": "campo",
  "titulo": "Usted (A) va a salir a una carretera desde el camino privado de su casa. Por la carretera circulan B y C.",
  "vias": {
   "N": {
    "cerrada": true
   },
   "S": {
    "firme": "tierra"
   }
  },
  "edificios": [
   [
    268,
    296,
    86,
    62
   ]
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) se acerca a la vía tan despacio que podría detenerse en el acto en cualquier momento.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.2",
     "texto": "debe asegurarse previamente de que puede hacerlo sin peligro para nadie y efectuarlo a una velocidad que le permita detenerse en el acto"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "borde",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Despacio"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Se detiene y deja pasar a B y a C, que circulan por la vía en los dos sentidos.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.2",
     "texto": "cediendo el paso a los vehículos que circulen por aquélla, cualquiera que sea el sentido en que lo hagan"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "sigue",
      "retraso": 500
     }
    ],
    "etiquetas": {
     "A": "Cede",
     "B": "Pasa",
     "C": "Pasa"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2800
   },
   {
    "texto": "Con la carretera libre, se incorpora.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "de que puede hacerlo sin peligro para los demás usuarios"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "B1-pri-0059": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) se acerca a un cruce; por la vía que cruza se acerca B.",
  "vias": {
   "S": {
    "cartel": "P-1"
   },
   "E": {
    "senal": "ceda"
   },
   "O": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   }
  ],
  "pasos": [
   {
    "texto": "La señal avisa de una intersección con prioridad para usted (A): la vía que cruza tiene ceda el paso.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.4",
     "texto": "Los conductores de los vehículos que se aproximen a una intersección señalizada con señal de intersección con prioridad"
    },
    "mover": [],
    "etiquetas": {
     "A": "Preferente",
     "B": "Cede"
    },
    "foco": [
     "A"
    ],
    "ms": 2000
   },
   {
    "texto": "B viene por su derecha, pero es quien debe cederle el paso: usted pasa primero.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.4",
     "texto": "tendrán prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Pasa",
     "B": "Espera"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   },
   {
    "texto": "Después pasa B.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.4",
     "texto": "tendrán prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   }
  ]
 },
 "B1-pri-0060": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) circula por una calzada con la señal R-3; desde la vía que cruza quieren pasar B y C.",
  "vias": {
   "S": {
    "cartel": "R-3"
   },
   "E": {
    "senal": "ceda"
   },
   "O": {
    "senal": "ceda"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "O",
    "hacia": "E"
   },
   {
    "letra": "C",
    "desde": "E",
    "hacia": "O"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) circula por una calzada con prioridad.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.4",
     "texto": "o que circulen por una vía señalizada con señal de calzada con prioridad"
    },
    "mover": [],
    "etiquetas": {
     "A": "Preferente",
     "B": "Cede",
     "C": "Cede"
    },
    "foco": [
     "A"
    ],
    "ms": 2000
   },
   {
    "texto": "Tiene prioridad sobre quien viene de la otra vía, tanto por la derecha (C) como por la izquierda (B): usted pasa primero.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.4",
     "texto": "tendrán prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Pasa",
     "B": "Espera",
     "C": "Espera"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   },
   {
    "texto": "Cuando usted ha pasado, salen B y C, que no se cortan entre sí.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.4",
     "texto": "tendrán prioridad de paso sobre los vehículos que circulen por otra vía o procedan de ella"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "B": "Pasa",
     "C": "Pasa"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2400
   }
  ]
 },
 "B1-sen-0075": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) llega a un cruce sin otras señales; por su derecha llega B.",
  "vias": {
   "S": {
    "cartel": "P-2"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O"
   }
  ],
  "orden": [
   [
    "B"
   ],
   [
    "A"
   ]
  ]
 },
 "B1-pri-0064": {
  "tipo": "cruce",
  "antes": "imagen",
  "entorno": "campo",
  "titulo": "Usted (A) llega por un camino con señal de STOP a una carretera; no hay línea pintada en el suelo. Por la carretera se acerca B.",
  "vias": {
   "N": {
    "cerrada": true
   },
   "S": {
    "senal": "stop",
    "linea": false
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "No hay línea de detención: usted (A) se detiene justo antes de la calzada a la que se aproxima.",
    "cita": {
     "norma": "RGC",
     "articulo": "anexo I, 4.4 (M-6.3)",
     "texto": "indica la obligación de detener el vehículo ante una línea de detención (M-4.1) o, si esta no existiera, inmediatamente antes de la calzada a la que se aproxima"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "borde",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "STOP"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "Una vez detenido, cede el paso a B, que circula por esa calzada.",
    "cita": {
     "norma": "RGC",
     "articulo": "anexo I, 4.4 (M-6.3)",
     "texto": "y, una vez detenido el vehículo, ceder el paso a los vehículos que circulen por ella"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "STOP",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "Con la carretera libre, sale.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "B1-pri-0065": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) llega a un STOP; un edificio en la esquina le tapa la vista hacia la derecha. Por la derecha se acerca B.",
  "vias": {
   "N": {
    "cerrada": true
   },
   "S": {
    "senal": "stop"
   }
  },
  "edificios": [
   [
    258,
    258,
    150,
    150
   ]
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) se detiene por completo en la línea de detención, pero el edificio no le deja ver quién viene por la derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "llegando a detener por completo su marcha cuando sea preciso y, en todo caso, cuando así lo indique la señal correspondiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "STOP"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "Avanza muy despacio hasta donde ya ve la vía y se detiene de nuevo: ahora ve que se acerca B.",
    "cita": {
     "norma": "RGC",
     "articulo": "anexo I, 4.2 (M-4.1)",
     "texto": "Si desde el lugar donde se ha efectuado la detención no existe visibilidad suficiente, la persona conductora deberá detenerse de nuevo en el lugar desde donde tenga visibilidad, sin poner en peligro a ninguna persona usuaria de la vía."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "borde",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "cerca",
      "modo": "sigue",
      "retraso": 600,
      "dura": 1800
     }
    ],
    "etiquetas": {
     "A": "Para otra vez"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Cede el paso a B, que circula por la vía preferente.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Cede",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2000
   },
   {
    "texto": "Con la vía libre, gira dejando el centro de la intersección a su izquierda.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.c",
     "texto": "dejará a la izquierda el centro de la intersección"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   }
  ]
 },
 "B2-mv-0031": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) llega a un cruce con una marca pintada en su carril; por la otra vía se acerca B.",
  "vias": {
   "S": {
    "senal": "stop",
    "pintada": true,
    "poste": false
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "lejos",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "La marca STOP obliga a detenerse ante la línea de detención (o, si no la hubiera, justo antes de la calzada).",
    "cita": {
     "norma": "RGC",
     "articulo": "anexo I, 4.4 (M-6.3)",
     "texto": "indica la obligación de detener el vehículo ante una línea de detención (M-4.1) o, si esta no existiera, inmediatamente antes de la calzada a la que se aproxima"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "STOP"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Ya detenido, usted (A) cede el paso a B, que circula por la calzada a la que se aproxima.",
    "cita": {
     "norma": "RGC",
     "articulo": "anexo I, 4.4 (M-6.3)",
     "texto": "y, una vez detenido el vehículo, ceder el paso a los vehículos que circulen por ella"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "STOP",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "Con la vía libre, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "B2-mv-0032": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Usted (A) llega a un cruce con un triángulo pintado en su carril; por la otra vía se acerca B.",
  "vias": {
   "S": {
    "senal": "ceda",
    "pintada": true,
    "poste": false
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "lejos",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "El triángulo obliga a ceder el paso a quien circula por la calzada a la que se aproxima. Como se acerca B, usted (A) se detiene en la línea de ceda el paso.",
    "cita": {
     "norma": "RGC",
     "articulo": "anexo I, 4.4 (M-6.5)",
     "texto": "indica a las personas conductoras la obligación de ceder el paso a los vehículos que circulen por la calzada a la que se aproxima, deteniéndose si es preciso ante la línea de ceda el paso (M-4.2)"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Cede"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "B pasa sin tener que frenar.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2200
   },
   {
    "texto": "Con la vía libre, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "56.5",
     "texto": "los conductores cederán siempre el paso a los vehículos que transiten por la vía preferente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-cic-0001": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Cruce visto desde arriba. Un grupo de ciclistas lo atraviesa de izquierda a derecha y el primero ya está dentro; usted (A) llega por el sur.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true
   },
   {
    "id": "ciclistas",
    "tipo": "bici",
    "grupo": 5,
    "separacion": 27,
    "color": "D",
    "desde": "O",
    "hacia": "E",
    "inicio": "medio"
   }
  ],
  "pasos": [
   {
    "texto": "El primer ciclista ya ha entrado en el cruce: todo el grupo tiene prioridad, aunque venga por la izquierda de usted (A).",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.c",
     "texto": "Cuando circulando en grupo, el primero haya iniciado ya el cruce o haya entrado en una glorieta."
    },
    "mover": [],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "ciclistas"
    ],
    "ms": 2200
   },
   {
    "texto": "Usted espera a que pase el grupo entero, sin meterse entre los ciclistas.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.c",
     "texto": "Cuando circulando en grupo, el primero haya iniciado ya el cruce o haya entrado en una glorieta."
    },
    "mover": [
     {
      "v": "ciclistas",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "ciclistas"
    ],
    "ms": 3600
   },
   {
    "texto": "Cuando ha pasado el último ciclista, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.c",
     "texto": "Cuando circulando en grupo, el primero haya iniciado ya el cruce o haya entrado en una glorieta."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-cic-0002": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) va a girar a la derecha; delante, junto al borde, va un ciclista que sigue recto.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "lejos",
    "tu": true
   },
   {
    "id": "ciclista",
    "tipo": "bici",
    "color": "D",
    "desde": "S",
    "hacia": "N",
    "lat": 34,
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) quiere girar a la derecha y el ciclista, a su lado, va a seguir recto.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.b",
     "texto": "Cuando para entrar en otra vía el vehículo de motor o el ciclomotor gire a la derecha o izquierda, en los supuestos permitidos, y haya un ciclista en sus proximidades."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "dentro",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 3000
   },
   {
    "texto": "El ciclista tiene prioridad: usted le deja pasar antes de girar.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.b",
     "texto": "Cuando para entrar en otra vía el vehículo de motor o el ciclomotor gire a la derecha o izquierda, en los supuestos permitidos, y haya un ciclista en sus proximidades."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "ciclista": "Pasa"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 2600
   },
   {
    "texto": "Ahora gira, ciñéndose al borde derecho.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "se ceñirá todo lo posible al borde derecho de la calzada, si el cambio de dirección es a la derecha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-pea-0001": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) va a girar a la derecha; en la calle a la que entra hay dos peatones cruzando, donde no hay paso para peatones.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "cerca",
    "tu": true
   },
   {
    "id": "p1",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      262,
      150
     ],
     [
      262,
      246
     ]
    ]
   },
   {
    "id": "p2",
    "tipo": "peaton",
    "color": "C",
    "puntos": [
     [
      276,
      142
     ],
     [
      275,
      244
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) va a girar a la derecha y en la calle a la que entra hay peatones cruzando, aunque allí no hay paso para peatones.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.b",
     "texto": "Cuando un vehículo vaya a girar para entrar en otra vía y haya peatones cruzándola, aunque no exista paso para éstos."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "p1",
      "hasta": 0.45,
      "modo": "sigue"
     },
     {
      "v": "p2",
      "hasta": 0.4,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "p1",
     "p2"
    ],
    "ms": 2800
   },
   {
    "texto": "Los peatones tienen prioridad: usted espera hasta que terminan de cruzar.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.b",
     "texto": "Cuando un vehículo vaya a girar para entrar en otra vía y haya peatones cruzándola, aunque no exista paso para éstos."
    },
    "mover": [
     {
      "v": "p1",
      "hasta": 0.99,
      "modo": "sigue"
     },
     {
      "v": "p2",
      "hasta": 0.99,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "p1",
     "p2"
    ],
    "ms": 2800
   },
   {
    "texto": "Con la calle libre, gira ciñéndose al borde derecho.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "se ceñirá todo lo posible al borde derecho de la calzada, si el cambio de dirección es a la derecha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "x1a-0017": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Usted (A) circula por una calle y se acerca a un paso para peatones sin semáforo. En la acera, junto al paso, hay una persona.",
  "elementos": [
   {
    "tipo": "cebra",
    "x": 252,
    "ancho": 26,
    "desde": 162,
    "hasta": 240
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "cerca": 150,
     "linea": 240
    }
   },
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      265,
      262
     ],
     [
      265,
      250
     ],
     [
      265,
      140
     ],
     [
      265,
      126
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) se acerca a un paso para peatones que no regula ningún semáforo ni agente: modera la velocidad.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.b",
     "texto": "en las proximidades de vías de uso exclusivo de ciclos y de los pasos de peatones no regulados por semáforo o agentes de la circulación"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "cerca",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Modera"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "La persona empieza a cruzar. Usted se detiene antes del paso: en él, el peatón tiene prioridad.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.a",
     "texto": "En los pasos para peatones debidamente señalizados, aceras y demás zonas peatonales."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "linea",
      "modo": "frena"
     },
     {
      "v": "peaton",
      "hasta": 0.45,
      "modo": "sigue",
      "retraso": 300
     }
    ],
    "etiquetas": {
     "A": "Se detiene",
     "peaton": "Cruza"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2800
   },
   {
    "texto": "Cuando ha terminado de cruzar, sigue su marcha.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1",
     "texto": "Se circulará a velocidad moderada y, si fuera preciso, se detendrá el vehículo cuando las circunstancias lo exijan"
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": 0.99,
      "modo": "sigue",
      "dura": 1600
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1100
     }
    ],
    "etiquetas": {
     "A": "Sigue"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   }
  ]
 },
 "bm3-0006": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true,
   "sentidoUnico": true
  },
  "titulo": "Calle de sentido único con coches aparcados a la derecha. En la acera, entre los coches, juegan unos niños. Usted (A) circula por el carril izquierdo.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": -10,
    "y": 199,
    "w": 420,
    "h": 2
   }
  ],
  "vehiculos": [
   {
    "id": "ap0",
    "tipo": "turismo",
    "puntos": [
     [
      150,
      222
     ],
     [
      151,
      222
     ]
    ]
   },
   {
    "id": "ap1",
    "tipo": "turismo",
    "puntos": [
     [
      200,
      222
     ],
     [
      201,
      222
     ]
    ]
   },
   {
    "id": "ap2",
    "tipo": "turismo",
    "puntos": [
     [
      300,
      222
     ],
     [
      301,
      222
     ]
    ]
   },
   {
    "id": "ap3",
    "tipo": "turismo",
    "puntos": [
     [
      350,
      222
     ],
     [
      351,
      222
     ]
    ]
   },
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "y": 180,
    "marcas": {
     "modera": 120,
     "para": 222
    }
   },
   {
    "id": "nino",
    "tipo": "nino",
    "color": "C",
    "puntos": [
     [
      250,
      262
     ],
     [
      250,
      240
     ],
     [
      250,
      194
     ],
     {
      "marca": "calzada"
     },
     [
      252,
      230
     ],
     [
      254,
      262
     ],
     [
      254,
      263
     ]
    ]
   },
   {
    "id": "nino2",
    "tipo": "nino",
    "color": "B",
    "puntos": [
     [
      226,
      258
     ],
     [
      227,
      258
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Todavía no hay nadie en la calzada, pero hay niños jugando junto a los coches aparcados: es previsible que alguno salga. Usted (A) modera la velocidad.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.a",
     "texto": "Cuando haya peatones en la parte de la vía que se esté utilizando o pueda preverse racionalmente su irrupción en ella, principalmente si se trata de niños, ancianos, invidentes u otras personas manifiestamente impedidas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "modera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Modera"
    },
    "foco": [
     "nino",
     "nino2"
    ],
    "ms": 3000
   },
   {
    "texto": "Un niño sale de pronto entre dos coches. Como ya iba despacio, puede detenerse a tiempo.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.a",
     "texto": "Cuando haya peatones en la parte de la vía que se esté utilizando o pueda preverse racionalmente su irrupción en ella, principalmente si se trata de niños, ancianos, invidentes u otras personas manifiestamente impedidas."
    },
    "mover": [
     {
      "v": "nino",
      "hasta": "calzada",
      "modo": "suave",
      "dura": 1500
     },
     {
      "v": "A",
      "hasta": "para",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se detiene"
    },
    "foco": [
     "nino"
    ],
    "ms": 2600
   },
   {
    "texto": "El niño vuelve a la acera y usted sigue con precaución.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1",
     "texto": "Se circulará a velocidad moderada y, si fuera preciso, se detendrá el vehículo cuando las circunstancias lo exijan"
    },
    "mover": [
     {
      "v": "nino",
      "hasta": 0.99,
      "modo": "suave",
      "dura": 1500
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1000
     }
    ],
    "etiquetas": {
     "A": "Sigue"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   }
  ]
 },
 "xd-0049": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Una persona quiere cruzar la calle. A pocos metros hay un paso para peatones.",
  "elementos": [
   {
    "tipo": "cebra",
    "x": 300,
    "ancho": 26,
    "desde": 162,
    "hasta": 240
   }
  ],
  "vehiculos": [
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      140,
      258
     ],
     [
      140,
      257
     ],
     {
      "marca": "quiere"
     },
     [
      300,
      257
     ],
     {
      "marca": "llega"
     },
     [
      313,
      252
     ],
     [
      313,
      140
     ],
     {
      "marca": "cruzado"
     },
     [
      313,
      124
     ]
    ]
   },
   {
    "letra": "B",
    "desde": "E",
    "marcas": {
     "pasa": -60
    }
   }
  ],
  "pasos": [
   {
    "texto": "Esta persona quiere cruzar. Como hay un paso para peatones muy cerca, no cruza por donde está: va hasta el paso.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1",
     "texto": "En zonas donde existen pasos para peatones, los que se dispongan a atravesar la calzada deberán hacerlo precisamente por ellos, sin que puedan efectuarlo por las proximidades"
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": "llega",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Va al paso"
    },
    "foco": [
     "peaton"
    ],
    "ms": 3200
   },
   {
    "texto": "En el paso espera a que el coche B, que ya está muy cerca, pase.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1.c",
     "texto": "En los restantes pasos para peatones señalizados mediante la correspondiente marca vial, aunque tienen preferencia, sólo deben penetrar en la calzada cuando la distancia y la velocidad de los vehículos que se aproximen permitan hacerlo con seguridad."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "pasa",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Espera"
    },
    "foco": [
     "B"
    ],
    "ms": 2200
   },
   {
    "texto": "Con la calle libre, cruza por el paso.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1",
     "texto": "En zonas donde existen pasos para peatones, los que se dispongan a atravesar la calzada deberán hacerlo precisamente por ellos, sin que puedan efectuarlo por las proximidades"
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": "cruzado",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Cruza"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2800
   }
  ]
 },
 "xd-0050": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Paso para peatones con un semáforo solo para los vehículos, en verde. En la acera hay una persona que quiere cruzar.",
  "elementos": [
   {
    "tipo": "cebra",
    "x": 252,
    "ancho": 26,
    "desde": 162,
    "hasta": 240
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 242,
    "y": 201,
    "w": 4,
    "h": 38
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 284,
    "y": 161,
    "w": 4,
    "h": 38
   },
   {
    "tipo": "semaforo",
    "id": "s",
    "x": 240,
    "y": 258,
    "ang": 90,
    "color": "verde"
   },
   {
    "tipo": "semaforo",
    "id": "s2",
    "x": 290,
    "y": 142,
    "ang": -90,
    "color": "verde"
   }
  ],
  "vehiculos": [
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      265,
      262
     ],
     [
      265,
      250
     ],
     [
      265,
      140
     ],
     [
      265,
      126
     ]
    ]
   },
   {
    "letra": "A",
    "desde": "O",
    "marcas": {
     "cerca": 60
    }
   },
   {
    "letra": "B",
    "desde": "E",
    "marcas": {
     "cerca": 460,
     "linea": 290
    }
   },
   {
    "letra": "C",
    "desde": "O",
    "marcas": {
     "linea": 240
    }
   }
  ],
  "pasos": [
   {
    "texto": "El semáforo de los vehículos está en verde: les permite pasar. La persona no entra en la calzada, aunque haya hueco.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1.b",
     "texto": "Si no existiera semáforo para peatones pero la circulación de vehículos estuviera regulada por agente o semáforo, no penetrarán en la calzada mientras la señal del agente o del semáforo permita la circulación de vehículos por ella."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Espera",
     "A": "Pasa"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2600
   },
   {
    "texto": "El semáforo pasa a ámbar y luego a rojo. Los coches que llegan se detienen.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1.b",
     "texto": "Si no existiera semáforo para peatones pero la circulación de vehículos estuviera regulada por agente o semáforo, no penetrarán en la calzada mientras la señal del agente o del semáforo permita la circulación de vehículos por ella."
    },
    "mover": [
     {
      "v": "C",
      "hasta": "linea",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "linea",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "peaton": "Espera",
     "B": "Se detiene",
     "C": "Se detiene"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2800,
    "semaforos": {
     "s": "ambar",
     "s2": "ambar"
    }
   },
   {
    "texto": "Ahora el semáforo ya no permite pasar a los vehículos y la persona cruza.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1.b",
     "texto": "Si no existiera semáforo para peatones pero la circulación de vehículos estuviera regulada por agente o semáforo, no penetrarán en la calzada mientras la señal del agente o del semáforo permita la circulación de vehículos por ella."
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": 0.99,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Cruza",
     "B": "Espera",
     "C": "Espera"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2800,
    "semaforos": {
     "s": "rojo",
     "s2": "rojo"
    }
   }
  ]
 },
 "xd-0051": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Paso para peatones sin semáforo ni agente. Una persona espera en la acera; se acercan dos coches, A muy cerca y B más lejos.",
  "elementos": [
   {
    "tipo": "cebra",
    "x": 252,
    "ancho": 26,
    "desde": 162,
    "hasta": 240
   }
  ],
  "vehiculos": [
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      265,
      262
     ],
     [
      265,
      250
     ],
     [
      265,
      140
     ],
     [
      265,
      126
     ]
    ]
   },
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca",
    "marcas": {
     "cerca": 200
    }
   },
   {
    "letra": "B",
    "desde": "O",
    "marcas": {
     "lejos": -150,
     "linea": 240
    }
   }
  ],
  "pasos": [
   {
    "texto": "El coche A ya está encima del paso: no le daría tiempo a pararse con seguridad. La persona, aunque tiene preferencia, espera.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1.c",
     "texto": "En los restantes pasos para peatones señalizados mediante la correspondiente marca vial, aunque tienen preferencia, sólo deben penetrar en la calzada cuando la distancia y la velocidad de los vehículos que se aproximen permitan hacerlo con seguridad."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Espera"
    },
    "foco": [
     "A"
    ],
    "ms": 1800
   },
   {
    "texto": "B viene lejos y despacio: hay distancia de sobra. La persona entra en el paso y B se detiene.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.1.c",
     "texto": "En los restantes pasos para peatones señalizados mediante la correspondiente marca vial, aunque tienen preferencia, sólo deben penetrar en la calzada cuando la distancia y la velocidad de los vehículos que se aproximen permitan hacerlo con seguridad."
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": 0.5,
      "modo": "sigue",
      "retraso": 200
     },
     {
      "v": "B",
      "hasta": "linea",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "peaton": "Cruza",
     "B": "Se detiene"
    },
    "foco": [
     "peaton"
    ],
    "ms": 3000
   },
   {
    "texto": "Termina de cruzar y B sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.a",
     "texto": "En los pasos para peatones debidamente señalizados, aceras y demás zonas peatonales."
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": 0.99,
      "modo": "sigue",
      "dura": 1500
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1000
     }
    ],
    "etiquetas": {
     "B": "Sigue"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2800
   }
  ]
 },
 "xd-0052": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "urbana": true
  },
  "titulo": "Una persona cruza una calle en la que no hay paso para peatones.",
  "elementos": [],
  "vehiculos": [
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      200,
      262
     ],
     [
      200,
      250
     ],
     [
      200,
      140
     ],
     [
      200,
      126
     ]
    ]
   },
   {
    "letra": "A",
    "desde": "O",
    "marcas": {
     "pasa": 470
    }
   }
  ],
  "pasos": [
   {
    "texto": "Antes de cruzar fuera de un paso para peatones, se asegura de que puede hacerlo sin riesgo: deja pasar al coche A.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.2",
     "texto": "Para atravesar la calzada fuera de un paso para peatones, deberán cerciorarse de que pueden hacerlo sin riesgo ni entorpecimiento indebido."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "pasa",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Espera"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   },
   {
    "texto": "Cruza en línea recta, perpendicular al eje de la calzada, el camino más corto, sin pararse en medio.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.3",
     "texto": "Al atravesar la calzada, deben caminar perpendicularmente al eje de ésta, no demorarse ni detenerse en ella sin necesidad y no entorpecer el paso a los demás."
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": 0.99,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Recto"
    },
    "foco": [
     "peaton"
    ],
    "ms": 3000
   }
  ]
 },
 "xd-0053": {
  "tipo": "glorieta",
  "antes": "escena",
  "titulo": "Una persona quiere llegar al otro lado de una glorieta. No hay ningún paso para peatones.",
  "vehiculos": [
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      104,
      304
     ],
     [
      106,
      302
     ],
     [
      109.5,
      290.5
     ],
     [
      117.7,
      298.1
     ],
     [
      126.6,
      304.9
     ],
     [
      136,
      310.9
     ],
     [
      145.9,
      316
     ],
     [
      156.2,
      320.3
     ],
     [
      166.9,
      323.6
     ],
     [
      177.8,
      326.1
     ],
     [
      188.8,
      327.5
     ],
     [
      200,
      328
     ],
     [
      211.2,
      327.5
     ],
     [
      222.2,
      326.1
     ],
     [
      233.1,
      323.6
     ],
     [
      243.8,
      320.3
     ],
     [
      254.1,
      316
     ],
     [
      264,
      310.9
     ],
     [
      273.4,
      304.9
     ],
     [
      282.3,
      298.1
     ],
     [
      290.5,
      290.5
     ],
     [
      298.1,
      282.3
     ],
     [
      304.9,
      273.4
     ],
     [
      310.9,
      264
     ],
     [
      316,
      254.1
     ],
     [
      320.3,
      243.8
     ],
     [
      323.6,
      233.1
     ],
     [
      326.1,
      222.2
     ],
     [
      327.5,
      211.2
     ],
     [
      328,
      200
     ],
     [
      327.5,
      188.8
     ],
     [
      326.1,
      177.8
     ],
     [
      323.6,
      166.9
     ],
     [
      320.3,
      156.2
     ],
     [
      316,
      145.9
     ],
     [
      310.9,
      136
     ],
     [
      304.9,
      126.6
     ],
     [
      298.1,
      117.7
     ],
     [
      290.5,
      109.5
     ],
     [
      296,
      104
     ]
    ]
   },
   {
    "letra": "A",
    "dentro": 150,
    "hacia": "N"
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "S"
   }
  ],
  "pasos": [
   {
    "texto": "Los coches circulan por la calzada de la glorieta. El peatón no la atraviesa por el medio aunque sea más corto.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.4",
     "texto": "Los peatones no podrán atravesar las plazas y glorietas por su calzada, debiendo rodearlas, a no ser que exista un paso para peatones habilitado."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "No cruza"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2800
   },
   {
    "texto": "La rodea por fuera y cruza cada calle que encuentra después de asegurarse de que no viene nadie.",
    "cita": {
     "norma": "RGC",
     "articulo": "124.4",
     "texto": "Los peatones no podrán atravesar las plazas y glorietas por su calzada, debiendo rodearlas, a no ser que exista un paso para peatones habilitado."
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": 0.99,
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 2600
     }
    ],
    "etiquetas": {
     "peaton": "Rodea"
    },
    "foco": [
     "peaton"
    ],
    "ms": 5200
   }
  ]
 },
 "xd-0047": {
  "tipo": "recta",
  "antes": "escena",
  "titulo": "Carretera sin acera ni arcén practicable. Una persona camina por la calzada, por la izquierda, de cara a los coches. Se acerca una ambulancia en servicio urgente.",
  "vehiculos": [
   {
    "id": "peaton",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      140,
      172
     ],
     [
      141,
      172
     ],
     {
      "marca": "oye"
     },
     [
      180,
      172
     ],
     {
      "marca": "aparta"
     },
     [
      190,
      160
     ],
     [
      196,
      140
     ],
     {
      "marca": "fuera"
     },
     [
      198,
      136
     ]
    ]
   },
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "desde": "E",
    "marcas": {
     "cerca": 330
    }
   }
  ],
  "pasos": [
   {
    "texto": "La persona camina por la calzada y oye la sirena: se acerca una ambulancia.",
    "cita": {
     "norma": "RGC",
     "articulo": "122.5",
     "texto": "Al apercibirse de las señales ópticas o acústicas de los vehículos prioritarios, los peatones deberán despejar la calzada y permanecer en los refugios o zonas peatonales, si existen, o, en su defecto, alejarse de la zona de circulación de los vehículos."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "cerca",
      "modo": "sigue"
     },
     {
      "v": "peaton",
      "hasta": "aparta",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Urgencia"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2600
   },
   {
    "texto": "Despeja la calzada: como no hay zona peatonal, se aparta lejos de la circulación.",
    "cita": {
     "norma": "RGC",
     "articulo": "122.5",
     "texto": "Al apercibirse de las señales ópticas o acústicas de los vehículos prioritarios, los peatones deberán despejar la calzada y permanecer en los refugios o zonas peatonales, si existen, o, en su defecto, alejarse de la zona de circulación de los vehículos."
    },
    "mover": [
     {
      "v": "peaton",
      "hasta": "fuera",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "peaton": "Se aparta"
    },
    "foco": [
     "peaton"
    ],
    "ms": 2000
   },
   {
    "texto": "La ambulancia pasa con la calzada libre.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Pasa"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2200
   }
  ]
 },
 "xd-0065": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "urbana": true
  },
  "titulo": "Un ciclista circula por una calle; detrás, en el mismo carril, va usted (A).",
  "vehiculos": [
   {
    "id": "ciclista",
    "tipo": "bici",
    "color": "D",
    "desde": "O",
    "marcas": {
     "medio": 200,
     "sigue": 350
    }
   },
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "lejos": -120,
     "medio": 132,
     "sigue": 282
    }
   }
  ],
  "pasos": [
   {
    "texto": "En ciudad, el ciclista va por el centro del carril: así se le ve mejor y nadie intenta pasar rozándole.",
    "cita": {
     "norma": "RGC",
     "articulo": "153.3",
     "texto": "Los ciclistas circularán preferentemente por el centro del carril en la medida en que su seguridad y la de los otros usuarios lo permitan."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "medio",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "medio",
      "modo": "sigue"
     }
    ],
    "etiquetas": {},
    "foco": [
     "ciclista"
    ],
    "ms": 3000
   },
   {
    "texto": "Usted (A) va detrás, en el mismo carril, y deja al menos 5 metros de separación.",
    "cita": {
     "norma": "RGC",
     "articulo": "153.4",
     "texto": "Los conductores de vehículos a motor deberán dejar una separación mínima de cinco metros con los ciclistas que les precedan en el mismo carril"
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "sigue",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "sigue",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "5 m"
    },
    "foco": [
     "A"
    ],
    "ms": 3400
   }
  ]
 },
 "xd-0066": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "urbana": true,
   "sentidoUnico": true,
   "carriles": 2
  },
  "titulo": "Calle con dos carriles en el mismo sentido. Circulan un ciclista y un coche (A).",
  "vehiculos": [
   {
    "id": "ciclista",
    "tipo": "bici",
    "color": "D",
    "intermitente": "izquierda",
    "puntos": [
     [
      -30,
      220
     ],
     [
      130,
      220
     ],
     {
      "marca": "derecho"
     },
     [
      200,
      210
     ],
     [
      250,
      184
     ],
     [
      280,
      180
     ],
     {
      "marca": "izquierdo"
     },
     [
      440,
      180
     ]
    ]
   },
   {
    "letra": "A",
    "desde": "O",
    "y": 180,
    "marcas": {
     "lejos": -80,
     "pasa": 380
    }
   }
  ],
  "pasos": [
   {
    "texto": "Con dos carriles en su sentido, el ciclista circula por el carril derecho. A pasa por el izquierdo.",
    "cita": {
     "norma": "RGC",
     "articulo": "153.3",
     "texto": "En vías que dispongan de al menos dos carriles de circulación por sentido, los ciclistas circularán por el carril derecho."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "derecho",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "pasa",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ciclista": "Derecho"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 3000
   },
   {
    "texto": "Puede usar el otro carril cuando va a cambiar de dirección (o por seguridad): aquí se cambia al izquierdo para girar más adelante.",
    "cita": {
     "norma": "RGC",
     "articulo": "153.3",
     "texto": "Podrán circular por los otros carriles cuando vayan a cambiar de dirección, o cuando lo precisen por razones de seguridad."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "izquierdo",
      "modo": "suave"
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ciclista": "Va a girar"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 3000
   }
  ]
 },
 "xd-0067": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "urbana": true
  },
  "titulo": "En una calle, un ciclista circula detrás de una furgoneta que va muy despacio. Por el otro carril vienen coches de frente.",
  "vehiculos": [
   {
    "id": "furgoneta",
    "tipo": "furgoneta",
    "desde": "O",
    "y": 214,
    "marcas": {
     "lejos": 210,
     "lenta": 260,
     "despacio": 300
    }
   },
   {
    "id": "ciclista",
    "tipo": "bici",
    "color": "D",
    "puntos": [
     [
      60,
      214
     ],
     [
      120,
      214
     ],
     {
      "marca": "detras"
     },
     [
      170,
      228
     ],
     [
      200,
      233
     ],
     [
      330,
      233
     ],
     [
      365,
      226
     ],
     {
      "marca": "pasa"
     },
     [
      390,
      218
     ],
     [
      440,
      214
     ]
    ]
   },
   {
    "letra": "B",
    "desde": "E",
    "marcas": {
     "lejos": 520,
     "cruza": 60
    }
   }
  ],
  "pasos": [
   {
    "texto": "Por la izquierda vienen coches de frente: adelantar por ese lado no sería seguro.",
    "cita": {
     "norma": "RGC",
     "articulo": "153.5",
     "texto": "Los ciclistas podrán adelantar a otros vehículos por la derecha o por la izquierda, según sea más conveniente para su seguridad."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "detras",
      "modo": "sigue"
     },
     {
      "v": "furgoneta",
      "hasta": "lenta",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "cruza",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "B": "De frente"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "El ciclista puede adelantar por la derecha o por la izquierda, según le resulte más seguro: aquí, por la derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "153.5",
     "texto": "Los ciclistas podrán adelantar a otros vehículos por la derecha o por la izquierda, según sea más conveniente para su seguridad."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "pasa",
      "modo": "sigue"
     },
     {
      "v": "furgoneta",
      "hasta": "despacio",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ciclista": "Derecha"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 3200
   }
  ]
 },
 "B2-mv-0027": {
  "tipo": "recta",
  "antes": "escena",
  "titulo": "Un carril bici cruza la carretera por un paso para ciclistas, marcado con dos líneas de cuadros blancos. Se acerca un ciclista; usted (A) circula por la carretera.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "tierra",
    "x": 252,
    "y": 240,
    "w": 22,
    "h": 160
   },
   {
    "tipo": "zona",
    "clase": "tierra",
    "x": 252,
    "y": 0,
    "w": 22,
    "h": 160
   },
   {
    "tipo": "pasoCiclistas",
    "x": 252,
    "ancho": 22,
    "desde": 160,
    "hasta": 240
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "cerca": 140,
     "linea": 240
    }
   },
   {
    "id": "ciclista",
    "tipo": "bici",
    "color": "D",
    "puntos": [
     [
      263,
      410
     ],
     [
      263,
      300
     ],
     {
      "marca": "llega"
     },
     [
      263,
      -20
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) se acerca a un paso para ciclistas y un ciclista va a cruzar por él.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.b",
     "texto": "en las proximidades de vías de uso exclusivo de ciclos y de los pasos de peatones no regulados por semáforo o agentes de la circulación"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "cerca",
      "modo": "frena"
     },
     {
      "v": "ciclista",
      "hasta": "llega",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Modera"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 2600
   },
   {
    "texto": "Las dos líneas de cuadros indican que los vehículos de la calzada deben dejar paso a los ciclistas: usted se detiene.",
    "cita": {
     "norma": "RGC",
     "articulo": "Anexo I, marcas viales",
     "texto": "una marca consistente en dos líneas transversales discontinuas y paralelas sobre la calzada indica un paso para ciclistas en el cual los vehículos que circulan por esta deben dejarles paso"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "linea",
      "modo": "frena"
     },
     {
      "v": "ciclista",
      "hasta": 0.75,
      "modo": "sigue",
      "retraso": 400
     }
    ],
    "etiquetas": {
     "A": "Deja paso",
     "ciclista": "Cruza"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 3000
   },
   {
    "texto": "Cuando el ciclista ha cruzado, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1",
     "texto": "Se circulará a velocidad moderada y, si fuera preciso, se detendrá el vehículo cuando las circunstancias lo exijan"
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": 0.99,
      "modo": "sigue",
      "dura": 1200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 900
     }
    ],
    "etiquetas": {
     "A": "Sigue"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   }
  ]
 },
 "bm6-0001": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Calle con charcos junto al bordillo derecho. En la acera hay dos personas. Por el carril circulan B y, detrás, usted (A).",
  "elementos": [
   {
    "tipo": "charco",
    "x": 236,
    "y": 232,
    "rx": 30,
    "ry": 7
   },
   {
    "tipo": "charco",
    "x": 92,
    "y": 234,
    "rx": 16,
    "ry": 5
   }
  ],
  "vehiculos": [
   {
    "id": "p1",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      238,
      256
     ],
     [
      239,
      256
     ]
    ]
   },
   {
    "id": "p2",
    "tipo": "peaton",
    "color": "C",
    "puntos": [
     [
      262,
      258
     ],
     [
      263,
      258
     ]
    ]
   },
   {
    "letra": "B",
    "desde": "O",
    "marcas": {
     "lejos": 120,
     "salpica": 340
    }
   },
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "lejos": -40,
     "modera": 150,
     "charco": 280
    }
   }
  ],
  "pasos": [
   {
    "texto": "B pasa deprisa por el charco y salpica a las personas de la acera. Eso es lo que hay que evitar.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.g",
     "texto": "Al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios de la vía."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "salpica",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "B": "Salpica"
    },
    "foco": [
     "B"
    ],
    "ms": 1400,
    "avisos": {
     "B": {
      "salpica": true
     }
    }
   },
   {
    "texto": "Usted (A) ve el agua y a los peatones: modera la velocidad antes de llegar.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.g",
     "texto": "Al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios de la vía."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "modera",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Modera"
    },
    "foco": [
     "A"
    ],
    "ms": 2400,
    "avisos": {
     "B": {
      "salpica": false
     }
    }
   },
   {
    "texto": "Pasa despacio junto al charco, sin salpicarles, y luego sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.g",
     "texto": "Al circular por pavimento deslizante o cuando pueda salpicarse o proyectarse agua, gravilla u otras materias a los demás usuarios de la vía."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "valle"
     }
    ],
    "etiquetas": {
     "A": "Despacio"
    },
    "foco": [
     "A"
    ],
    "ms": 4200
   }
  ]
 },
 "A-urg-0001": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "urbana": true
  },
  "titulo": "Una ambulancia en servicio urgente se acerca por detrás a usted (A).",
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "puntos": [
     [
      110,
      220
     ],
     [
      170,
      220
     ],
     {
      "marca": "oye"
     },
     [
      230,
      220
     ],
     [
      270,
      230
     ],
     [
      300,
      231
     ],
     {
      "marca": "aparta"
     },
     [
      340,
      231
     ],
     [
      380,
      222
     ],
     [
      460,
      220
     ]
    ]
   },
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "puntos": [
     [
      -80,
      220
     ],
     [
      60,
      220
     ],
     {
      "marca": "detras"
     },
     [
      150,
      216
     ],
     [
      230,
      192
     ],
     [
      330,
      190
     ],
     [
      390,
      200
     ],
     [
      480,
      210
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "La ambulancia avisa de que va en servicio urgente con la señal luminosa (los rotativos azules) y, a la vez, con la acústica (la sirena).",
    "cita": {
     "norma": "RGC",
     "articulo": "68.2",
     "texto": "cuyos conductores adviertan de su presencia mediante la utilización simultánea de la señal luminosa y del aparato emisor de señales acústicas especiales"
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "detras",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "oye",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Luz y sirena"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2800
   },
   {
    "texto": "Al percibirlas, usted (A) se aparta a su derecha y le deja sitio para pasar.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "aparta",
      "modo": "frena"
     },
     {
      "v": "ambulancia",
      "hasta": 0.38,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Se aparta"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "La ambulancia pasa y usted sigue su marcha.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1200
     }
    ],
    "etiquetas": {
     "ambulancia": "Pasa"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2800
   }
  ]
 },
 "v5a-pri-0001": {
  "tipo": "recta",
  "antes": "nada",
  "titulo": "Una ambulancia en servicio urgente circula por una carretera despejada.",
  "vehiculos": [
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "desde": "O",
    "avisos": {
     "sirena": false
    },
    "marcas": {
     "despejada": 150,
     "cerca": 230
    }
   },
   {
    "letra": "B",
    "puntos": [
     [
      480,
      180
     ],
     [
      400,
      180
     ],
     {
      "marca": "aparece"
     },
     [
      300,
      180
     ],
     [
      260,
      174
     ],
     [
      236,
      170
     ],
     {
      "marca": "aparta"
     },
     [
      150,
      170
     ],
     [
      90,
      178
     ],
     [
      -80,
      180
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "La carretera está despejada: no hay nadie a quien poner en peligro si no suena la sirena. La ambulancia usa solo la señal luminosa.",
    "cita": {
     "norma": "RGC",
     "articulo": "68.2",
     "texto": "los conductores de los vehículos prioritarios deberán utilizar la señal luminosa aisladamente cuando la omisión de las señales acústicas especiales no entrañe peligro alguno para los demás usuarios."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "despejada",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Solo luz"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2800
   },
   {
    "texto": "Aparece otro vehículo (B). Ahora sí hace falta avisar con la luz y con la sirena a la vez.",
    "cita": {
     "norma": "RGC",
     "articulo": "68.2",
     "texto": "cuyos conductores adviertan de su presencia mediante la utilización simultánea de la señal luminosa y del aparato emisor de señales acústicas especiales"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "aparece",
      "modo": "sigue"
     },
     {
      "v": "ambulancia",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Luz y sirena"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2400,
    "avisos": {
     "ambulancia": {
      "sirena": true
     }
    }
   },
   {
    "texto": "B, al percibirlas, se aparta a su derecha y la ambulancia sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "aparta",
      "modo": "frena"
     },
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "B": "Se aparta"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   }
  ]
 },
 "x1a-0082": {
  "tipo": "recta",
  "antes": "nada",
  "titulo": "Una ambulancia en servicio urgente circula por una carretera sin otros usuarios a la vista.",
  "vehiculos": [
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "desde": "O",
    "avisos": {
     "sirena": false
    },
    "marcas": {
     "despejada": 150,
     "cerca": 230
    }
   },
   {
    "letra": "B",
    "puntos": [
     [
      480,
      180
     ],
     [
      400,
      180
     ],
     {
      "marca": "aparece"
     },
     [
      300,
      180
     ],
     [
      260,
      174
     ],
     [
      236,
      170
     ],
     {
      "marca": "aparta"
     },
     [
      150,
      170
     ],
     [
      90,
      178
     ],
     [
      -80,
      180
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "La carretera está despejada: no hay nadie a quien poner en peligro si no suena la sirena. La ambulancia usa solo la señal luminosa.",
    "cita": {
     "norma": "RGC",
     "articulo": "68.2",
     "texto": "los conductores de los vehículos prioritarios deberán utilizar la señal luminosa aisladamente cuando la omisión de las señales acústicas especiales no entrañe peligro alguno para los demás usuarios."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "despejada",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Solo luz"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2800
   },
   {
    "texto": "Aparece otro vehículo (B). Ahora sí hace falta avisar con la luz y con la sirena a la vez.",
    "cita": {
     "norma": "RGC",
     "articulo": "68.2",
     "texto": "cuyos conductores adviertan de su presencia mediante la utilización simultánea de la señal luminosa y del aparato emisor de señales acústicas especiales"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "aparece",
      "modo": "sigue"
     },
     {
      "v": "ambulancia",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Luz y sirena"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2400,
    "avisos": {
     "ambulancia": {
      "sirena": true
     }
    }
   },
   {
    "texto": "B, al percibirlas, se aparta a su derecha y la ambulancia sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "aparta",
      "modo": "frena"
     },
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "B": "Se aparta"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   }
  ]
 },
 "A-urg-0003": {
  "tipo": "recta",
  "antes": "escena",
  "titulo": "Carretera de doble sentido. Usted (A) circula detrás de B; por detrás se acerca una ambulancia en servicio urgente, y de frente viene C.",
  "vehiculos": [
   {
    "letra": "B",
    "puntos": [
     [
      170,
      220
     ],
     [
      171,
      220
     ],
     {
      "marca": "oye"
     },
     [
      250,
      220
     ],
     [
      290,
      231
     ],
     [
      310,
      232
     ],
     {
      "marca": "aparta"
     },
     [
      330,
      232
     ],
     {
      "marca": "para"
     },
     [
      380,
      224
     ],
     [
      470,
      220
     ]
    ]
   },
   {
    "letra": "A",
    "tu": true,
    "puntos": [
     [
      100,
      220
     ],
     [
      101,
      220
     ],
     {
      "marca": "oye"
     },
     [
      170,
      220
     ],
     [
      210,
      231
     ],
     [
      230,
      232
     ],
     {
      "marca": "aparta"
     },
     [
      250,
      232
     ],
     {
      "marca": "para"
     },
     [
      300,
      224
     ],
     [
      470,
      220
     ]
    ]
   },
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "puntos": [
     [
      -80,
      220
     ],
     [
      20,
      220
     ],
     {
      "marca": "detras"
     },
     [
      130,
      220
     ],
     {
      "marca": "espera"
     },
     [
      190,
      200
     ],
     [
      260,
      190
     ],
     [
      360,
      192
     ],
     [
      420,
      206
     ],
     [
      520,
      216
     ]
    ]
   },
   {
    "letra": "C",
    "desde": "E",
    "marcas": {
     "lejos": 430,
     "cruza": -80
    }
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) y B perciben las señales de la ambulancia: se apartan a su derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "detras",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "aparta",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "aparta",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se aparta"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 3000
   },
   {
    "texto": "Viene C de frente y la ambulancia aún no puede pasar: ustedes se detienen junto al borde derecho y C se para.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "A",
      "hasta": "para",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "para",
      "modo": "frena"
     },
     {
      "v": "C",
      "hasta": 0.5,
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se detiene",
     "C": "Para"
    },
    "foco": [
     "A",
     "B",
     "C"
    ],
    "ms": 2600
   },
   {
    "texto": "Con sitio libre, la ambulancia pasa. Después siguen todos.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1800
     },
     {
      "v": "C",
      "hasta": "cruza",
      "modo": "arranca",
      "retraso": 1500
     }
    ],
    "etiquetas": {
     "ambulancia": "Pasa"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 3600
   }
  ]
 },
 "x1a-0084": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Usted (A) se acerca a un cruce sin señales. Por la calle de su izquierda, todavía lejos, se acerca una ambulancia en servicio urgente.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true,
    "inicio": "lejos"
   },
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) oye la sirena y ve los rotativos, aunque la ambulancia todavía está lejos. Desde ese momento ya actúa para facilitarle el paso.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "cerca",
      "modo": "frena"
     },
     {
      "v": "ambulancia",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Reduce"
    },
    "foco": [
     "A",
     "ambulancia"
    ],
    "ms": 2800
   },
   {
    "texto": "Se detiene antes del cruce. Por la regla de la derecha tendría preferencia, pero los vehículos prioritarios en servicio urgente la tienen sobre todos.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "ambulancia",
      "hasta": "dentro",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Cede",
     "ambulancia": "Prioridad"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2400
   },
   {
    "texto": "Pasa la ambulancia; después cruza usted.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1400
     }
    ],
    "etiquetas": {
     "ambulancia": "Pasa"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 3000
   }
  ]
 },
 "x1a-0075": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Una ambulancia de una empresa privada, en servicio urgente, llega a un cruce. Por los lados se acercan B y C.",
  "elementos": [
   {
    "tipo": "texto",
    "x": 268,
    "y": 384,
    "t": "Privada",
    "tam": 12
   }
  ],
  "vehiculos": [
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "desde": "S",
    "hacia": "N",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Que la ambulancia sea pública o privada no importa: en servicio urgente tiene prioridad. B y C se detienen.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "C",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "ambulancia",
      "hasta": "espera",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "B": "Cede",
     "C": "Cede"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2800
   },
   {
    "texto": "La ambulancia cruza.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Pasa",
     "B": "Espera",
     "C": "Espera"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2200
   },
   {
    "texto": "Después, B y C siguen: sus trayectorias no se cortan.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "B": "Pasa",
     "C": "Pasa"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2400
   }
  ]
 },
 "A-urg-0004": {
  "tipo": "recta",
  "antes": "escena",
  "via": {},
  "titulo": "Usted (A) circula por una carretera. Por detrás se acerca un coche de policía con las señales encendidas.",
  "elementos": [],
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "puntos": [
     [
      40,
      220
     ],
     [
      190,
      220
     ],
     {
      "marca": "va"
     },
     [
      250,
      220
     ],
     {
      "marca": "senal"
     },
     [
      310,
      229
     ],
     [
      332,
      232
     ],
     {
      "marca": "parado"
     },
     [
      350,
      232
     ]
    ]
   },
   {
    "id": "policia",
    "tipo": "policia",
    "puntos": [
     [
      -140,
      220
     ],
     [
      100,
      220
     ],
     {
      "marca": "llega"
     },
     [
      165,
      220
     ],
     {
      "marca": "senal"
     },
     [
      212,
      229
     ],
     [
      234,
      232
     ],
     {
      "marca": "parado"
     },
     [
      252,
      232
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Un coche de policía, con sus señales encendidas, se coloca detrás de usted (A).",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "se sitúa detrás de cualquier otro vehículo y activa además un dispositivo de emisión de luz roja hacia adelante de forma intermitente o destellante"
    },
    "mover": [
     {
      "v": "policia",
      "hasta": "llega",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "va",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "Detrás"
    },
    "foco": [
     "policia"
    ],
    "ms": 2400
   },
   {
    "texto": "Además enciende la luz roja intermitente hacia delante: le indica que se detenga.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "se sitúa detrás de cualquier otro vehículo y activa además un dispositivo de emisión de luz roja hacia adelante de forma intermitente o destellante"
    },
    "mover": [
     {
      "v": "policia",
      "hasta": "senal",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "senal",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "Luz roja"
    },
    "foco": [
     "policia"
    ],
    "ms": 2600,
    "avisos": {
     "policia": {
      "roja": true
     }
    }
   },
   {
    "texto": "Usted se detiene con precaución en el lado derecho, delante del coche de policía, donde no estorba, y se queda dentro del coche.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "deberá detenerlo con las debidas precauciones en el lado derecho, delante del vehículo policial, en un lugar donde no genere mayores riesgos o molestias para el resto de los usuarios, y permanecerá en su interior."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "parado",
      "modo": "frena"
     },
     {
      "v": "policia",
      "hasta": "parado",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se detiene"
    },
    "foco": [
     "A"
    ],
    "ms": 3000,
    "avisos": {
     "policia": {
      "sirena": false
     }
    }
   }
  ]
 },
 "B1-sen-0025": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Usted (A) circula por una calle. Por detrás se acerca un coche de policía.",
  "elementos": [
   {
    "tipo": "cebra",
    "x": 200,
    "ancho": 26,
    "desde": 162,
    "hasta": 240
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "puntos": [
     [
      40,
      220
     ],
     [
      190,
      220
     ],
     {
      "marca": "va"
     },
     [
      250,
      220
     ],
     {
      "marca": "senal"
     },
     [
      332,
      229
     ],
     [
      354,
      232
     ],
     {
      "marca": "parado"
     },
     [
      372,
      232
     ]
    ]
   },
   {
    "id": "policia",
    "tipo": "policia",
    "puntos": [
     [
      -140,
      220
     ],
     [
      100,
      220
     ],
     {
      "marca": "llega"
     },
     [
      165,
      220
     ],
     {
      "marca": "senal"
     },
     [
      236,
      229
     ],
     [
      258,
      232
     ],
     {
      "marca": "parado"
     },
     [
      276,
      232
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Un coche de policía, con sus señales encendidas, se coloca detrás de usted (A).",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "se sitúa detrás de cualquier otro vehículo y activa además un dispositivo de emisión de luz roja hacia adelante de forma intermitente o destellante"
    },
    "mover": [
     {
      "v": "policia",
      "hasta": "llega",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "va",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "Detrás"
    },
    "foco": [
     "policia"
    ],
    "ms": 2400
   },
   {
    "texto": "Además enciende la luz roja intermitente hacia delante: le indica que se detenga.",
    "cita": {
     "norma": "RGC",
     "articulo": "Anexo I.1.2.e",
     "texto": "Luz roja intermitente o destellante hacia delante: el agente desde un vehículo indica al conductor del que le precede que debe detener el vehículo en el lado derecho, delante del vehículo policial, en un lugar donde no genere mayores riesgos o molestias para el resto de los usuarios"
    },
    "mover": [
     {
      "v": "policia",
      "hasta": "senal",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "senal",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "Luz roja"
    },
    "foco": [
     "policia"
    ],
    "ms": 2600,
    "avisos": {
     "policia": {
      "roja": true
     }
    }
   },
   {
    "texto": "Usted se detiene con precaución en el lado derecho, delante del coche de policía, donde no estorba (pasado el paso para peatones), y se queda dentro del coche.",
    "cita": {
     "norma": "RGC",
     "articulo": "Anexo I.1.2.e",
     "texto": "Luz roja intermitente o destellante hacia delante: el agente desde un vehículo indica al conductor del que le precede que debe detener el vehículo en el lado derecho, delante del vehículo policial, en un lugar donde no genere mayores riesgos o molestias para el resto de los usuarios"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "parado",
      "modo": "frena"
     },
     {
      "v": "policia",
      "hasta": "parado",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se detiene"
    },
    "foco": [
     "A"
    ],
    "ms": 3000,
    "avisos": {
     "policia": {
      "sirena": false
     }
    }
   }
  ]
 },
 "x1b-0044": {
  "tipo": "recta",
  "antes": "nada",
  "titulo": "Un coche de policía con la señal V-1 (rotativos) encendida circula detrás de usted (A).",
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "puntos": [
     [
      40,
      220
     ],
     [
      190,
      220
     ],
     {
      "marca": "va"
     },
     [
      250,
      220
     ],
     {
      "marca": "senal"
     },
     [
      310,
      229
     ],
     [
      332,
      232
     ],
     {
      "marca": "parado"
     },
     [
      350,
      232
     ]
    ]
   },
   {
    "id": "policia",
    "tipo": "policia",
    "avisos": {
     "sirena": false
    },
    "puntos": [
     [
      -140,
      220
     ],
     [
      100,
      220
     ],
     {
      "marca": "llega"
     },
     [
      165,
      220
     ],
     {
      "marca": "senal"
     },
     [
      212,
      229
     ],
     [
      234,
      232
     ],
     {
      "marca": "parado"
     },
     [
      252,
      232
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "El coche de policía circula detrás de usted (A) con la señal V-1 encendida.",
    "cita": {
     "norma": "RGC",
     "articulo": "141.3",
     "texto": "podrán dar órdenes o indicaciones a los usuarios mientras hacen uso de la señal V-1 que establece el Reglamento General de Vehículos, a través de la megafonía"
    },
    "mover": [
     {
      "v": "policia",
      "hasta": "llega",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "va",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "V-1"
    },
    "foco": [
     "policia"
    ],
    "ms": 2400
   },
   {
    "texto": "Le da indicaciones por megafonía: por ejemplo, que se detenga a la derecha. Esas órdenes son válidas y hay que cumplirlas.",
    "cita": {
     "norma": "RGC",
     "articulo": "141.3",
     "texto": "podrán dar órdenes o indicaciones a los usuarios mientras hacen uso de la señal V-1 que establece el Reglamento General de Vehículos, a través de la megafonía"
    },
    "mover": [
     {
      "v": "policia",
      "hasta": "senal",
      "modo": "sigue"
     },
     {
      "v": "A",
      "hasta": "senal",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "Megafonía"
    },
    "foco": [
     "policia"
    ],
    "ms": 2800,
    "avisos": {
     "policia": {
      "megafonia": true
     }
    }
   },
   {
    "texto": "Usted ajusta lo que hace a esas instrucciones y se detiene a la derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "En todo momento el conductor ajustará su comportamiento a las instrucciones que imparta el agente a través de la megafonía o por cualquier otro medio que pueda ser percibido claramente por aquel."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "parado",
      "modo": "frena"
     },
     {
      "v": "policia",
      "hasta": "parado",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Obedece"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   }
  ]
 },
 "A-urg-0005": {
  "tipo": "recta",
  "antes": "nada",
  "titulo": "Usted (A) lleva urgentemente a un herido en su turismo porque no hay otro medio. Delante circula B.",
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "avisos": {
     "emergencia": true,
     "claxon": true
    },
    "puntos": [
     [
      -60,
      220
     ],
     [
      60,
      220
     ],
     {
      "marca": "avisa"
     },
     [
      140,
      220
     ],
     {
      "marca": "detras"
     },
     [
      200,
      212
     ],
     [
      260,
      192
     ],
     [
      330,
      192
     ],
     [
      365,
      206
     ],
     {
      "marca": "delante"
     },
     [
      400,
      214
     ],
     [
      480,
      218
     ]
    ]
   },
   {
    "letra": "B",
    "puntos": [
     [
      210,
      220
     ],
     [
      211,
      220
     ],
     {
      "marca": "va"
     },
     [
      250,
      220
     ],
     [
      290,
      231
     ],
     [
      310,
      232
     ],
     {
      "marca": "aparta"
     },
     [
      340,
      232
     ],
     [
      390,
      222
     ],
     [
      470,
      220
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) avisa de la urgencia tocando el claxon de forma intermitente y con la luz de emergencia encendida.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.1",
     "texto": "utilizando para ello el avisador acústico en forma intermitente y conectando la luz de emergencia, si se dispusiera de ella, o agitando un pañuelo o procedimiento similar."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "avisa",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "va",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Claxon y emergencia"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Los demás, al darse cuenta, le facilitan el paso como harían con un vehículo prioritario: B se aparta a la derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.2",
     "texto": "deberán respetar las normas de circulación, sobre todo en las intersecciones, y los demás usuarios de la vía darán cumplimiento a lo dispuesto en el artículo 69."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "detras",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "aparta",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "B": "Se aparta"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Aun así, usted (A) no es un vehículo prioritario: adelanta con precaución y respeta las normas.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.2",
     "texto": "deberán respetar las normas de circulación, sobre todo en las intersecciones, y los demás usuarios de la vía darán cumplimiento a lo dispuesto en el artículo 69."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "delante",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": 0.75,
      "modo": "arranca",
      "retraso": 1400
     }
    ],
    "etiquetas": {
     "A": "Con precaución"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   }
  ]
 },
 "x1a-0085": {
  "tipo": "recta",
  "antes": "nada",
  "titulo": "Usted (A) lleva urgentemente a un herido en un coche que no tiene luz de emergencia. Delante circula B.",
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "avisos": {
     "panuelo": true,
     "claxon": true
    },
    "puntos": [
     [
      -60,
      220
     ],
     [
      60,
      220
     ],
     {
      "marca": "avisa"
     },
     [
      140,
      220
     ],
     {
      "marca": "detras"
     },
     [
      200,
      212
     ],
     [
      260,
      192
     ],
     [
      330,
      192
     ],
     [
      365,
      206
     ],
     {
      "marca": "delante"
     },
     [
      400,
      214
     ],
     [
      480,
      218
     ]
    ]
   },
   {
    "letra": "B",
    "puntos": [
     [
      210,
      220
     ],
     [
      211,
      220
     ],
     {
      "marca": "va"
     },
     [
      250,
      220
     ],
     [
      290,
      231
     ],
     [
      310,
      232
     ],
     {
      "marca": "aparta"
     },
     [
      340,
      232
     ],
     [
      390,
      222
     ],
     [
      470,
      220
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Su coche no tiene luz de emergencia: además del claxon intermitente, avisa agitando un pañuelo por la ventanilla.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.1",
     "texto": "utilizando para ello el avisador acústico en forma intermitente y conectando la luz de emergencia, si se dispusiera de ella, o agitando un pañuelo o procedimiento similar."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "avisa",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "va",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Claxon y pañuelo"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Los demás, al darse cuenta, le facilitan el paso como harían con un vehículo prioritario: B se aparta a la derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.2",
     "texto": "deberán respetar las normas de circulación, sobre todo en las intersecciones, y los demás usuarios de la vía darán cumplimiento a lo dispuesto en el artículo 69."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "detras",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "aparta",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "B": "Se aparta"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Aun así, usted (A) no es un vehículo prioritario: adelanta con precaución y respeta las normas.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.2",
     "texto": "deberán respetar las normas de circulación, sobre todo en las intersecciones, y los demás usuarios de la vía darán cumplimiento a lo dispuesto en el artículo 69."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "delante",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": 0.75,
      "modo": "arranca",
      "retraso": 1400
     }
    ],
    "etiquetas": {
     "A": "Con precaución"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   }
  ]
 },
 "A-urg-0006": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Usted (A) lleva urgentemente a un herido, con la luz de emergencia y el claxon. Llega a un cruce regulado por semáforos.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 201,
    "y": 262,
    "w": 38,
    "h": 4
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 134,
    "y": 201,
    "w": 4,
    "h": 38
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 262,
    "y": 161,
    "w": 4,
    "h": 38
   },
   {
    "tipo": "semaforo",
    "id": "sur",
    "x": 262,
    "y": 268,
    "ang": 0,
    "color": "rojo"
   },
   {
    "tipo": "semaforo",
    "id": "oeste",
    "x": 132,
    "y": 262,
    "ang": 90,
    "color": "verde"
   },
   {
    "tipo": "semaforo",
    "id": "este",
    "x": 268,
    "y": 138,
    "ang": -90,
    "color": "verde"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "tu": true,
    "inicio": "lejos",
    "avisos": {
     "emergencia": true,
     "claxon": true
    }
   },
   {
    "letra": "B",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Su semáforo está en rojo. Usted (A) no es un vehículo prioritario: debe respetar las normas, sobre todo en las intersecciones. Se detiene.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.2",
     "texto": "deberán respetar las normas de circulación, sobre todo en las intersecciones, y los demás usuarios de la vía darán cumplimiento a lo dispuesto en el artículo 69."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue",
      "retraso": 600
     }
    ],
    "etiquetas": {
     "A": "Rojo: para",
     "B": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Cuando su semáforo se pone en verde, sigue, sin dejar de avisar.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.1",
     "texto": "utilizando para ello el avisador acústico en forma intermitente y conectando la luz de emergencia, si se dispusiera de ella, o agitando un pañuelo o procedimiento similar."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 500
     }
    ],
    "etiquetas": {
     "A": "Verde"
    },
    "foco": [
     "A"
    ],
    "ms": 2600,
    "semaforos": {
     "sur": "verde",
     "oeste": "rojo",
     "este": "rojo"
    }
   }
  ]
 },
 "x1a-0077": {
  "tipo": "cruce",
  "antes": "nada",
  "titulo": "Una ambulancia en servicio urgente llega a un cruce con su semáforo en rojo. Por los lados se acercan B y C con el semáforo en verde.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 201,
    "y": 262,
    "w": 38,
    "h": 4
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 134,
    "y": 201,
    "w": 4,
    "h": 38
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 262,
    "y": 161,
    "w": 4,
    "h": 38
   },
   {
    "tipo": "semaforo",
    "id": "sur",
    "x": 262,
    "y": 268,
    "ang": 0,
    "color": "rojo"
   },
   {
    "tipo": "semaforo",
    "id": "oeste",
    "x": 132,
    "y": 262,
    "ang": 90,
    "color": "verde"
   },
   {
    "tipo": "semaforo",
    "id": "este",
    "x": 268,
    "y": 138,
    "ang": -90,
    "color": "verde"
   }
  ],
  "vehiculos": [
   {
    "id": "ambulancia",
    "tipo": "ambulancia",
    "desde": "S",
    "hacia": "N",
    "inicio": "lejos"
   },
   {
    "letra": "B",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   },
   {
    "letra": "C",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "La ambulancia llega con el semáforo en rojo. No pasa sin más: extrema las precauciones y reduce mucho la velocidad.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.2",
     "texto": "cuidarán de no vulnerar la prioridad de paso en las intersecciones de vías o las señales de los semáforos, sin antes adoptar extremadas precauciones"
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "cerca",
      "modo": "sigue"
     },
     {
      "v": "C",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "ambulancia": "Precaución"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2800
   },
   {
    "texto": "Espera hasta asegurarse de que B y C la han visto y se han detenido.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.2",
     "texto": "hasta cerciorarse de que no existe riesgo de atropello a peatones y de que los conductores de otros vehículos han detenido su marcha o se disponen a facilitar la suya."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "C",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "B": "Se detiene",
     "C": "Se detiene",
     "ambulancia": "Comprueba"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2400
   },
   {
    "texto": "Con los demás parados, la ambulancia cruza.",
    "cita": {
     "norma": "RGC",
     "articulo": "67.1",
     "texto": "Tendrán prioridad de paso sobre los demás vehículos y otros usuarios de la vía los vehículos de servicios de urgencia, públicos o privados, cuando se hallen en servicio de tal carácter."
    },
    "mover": [
     {
      "v": "ambulancia",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "ambulancia": "Pasa",
     "B": "Espera",
     "C": "Espera"
    },
    "foco": [
     "ambulancia"
    ],
    "ms": 2400
   },
   {
    "texto": "Después, B y C siguen con su semáforo en verde.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "Tan pronto perciban las señales especiales que anuncien la proximidad de un vehículo prioritario, los demás conductores adoptarán las medidas adecuadas, según las circunstancias del momento y lugar, para facilitarles el paso, apartándose normalmente a su derecha o deteniéndose si fuera preciso"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "B": "Pasa",
     "C": "Pasa"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2400
   }
  ]
 },
 "xc-0120": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "sentidoUnico": true,
   "carriles": 2
  },
  "titulo": "Una ambulancia en servicio de urgencia llega a una vía con un carril reservado (VAO) y retención en el carril normal.",
  "elementos": [
   {
    "tipo": "carrilReservado",
    "y": 200,
    "rotulo": "VAO",
    "rombo": true,
    "rotulos": [
     70,
     290
    ]
   }
  ],
  "vehiculos": [
   {
    "id": "c1",
    "tipo": "camion",
    "puntos": [
     [
      120,
      180
     ],
     [
      121,
      180
     ]
    ]
   },
   {
    "id": "c2",
    "tipo": "turismo",
    "puntos": [
     [
      210,
      180
     ],
     [
      211,
      180
     ]
    ]
   },
   {
    "id": "c3",
    "tipo": "turismo",
    "puntos": [
     [
      270,
      180
     ],
     [
      271,
      180
     ]
    ]
   },
   {
    "id": "c4",
    "tipo": "turismo",
    "puntos": [
     [
      330,
      180
     ],
     [
      331,
      180
     ]
    ]
   },
   {
    "id": "urgencia",
    "tipo": "ambulancia",
    "desde": "O",
    "y": 220,
    "marcas": {
     "cerca": 100,
     "pasa": 390
    }
   }
  ],
  "pasos": [
   {
    "texto": "Hay retención en el carril normal. El de la derecha está reservado para vehículos de alta ocupación (VAO).",
    "cita": {
     "norma": "RGC",
     "articulo": "35.2.c",
     "texto": "Los vehículos de policía, extinción de incendios, protección civil y salvamento y asistencia sanitaria en servicio de urgencia, así como los equipos de mantenimiento de las instalaciones y de la infraestructura de la vía, podrán utilizar los carriles reservados."
    },
    "mover": [
     {
      "v": "urgencia",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "urgencia": "Urgencia"
    },
    "foco": [
     "urgencia"
    ],
    "ms": 2600
   },
   {
    "texto": "Los vehículos de urgencia en servicio urgente pueden usar los carriles reservados: pasa por el VAO.",
    "cita": {
     "norma": "RGC",
     "articulo": "35.2.c",
     "texto": "Los vehículos de policía, extinción de incendios, protección civil y salvamento y asistencia sanitaria en servicio de urgencia, así como los equipos de mantenimiento de las instalaciones y de la infraestructura de la vía, podrán utilizar los carriles reservados."
    },
    "mover": [
     {
      "v": "urgencia",
      "hasta": "pasa",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "urgencia": "Por el VAO"
    },
    "foco": [
     "urgencia"
    ],
    "ms": 2800
   }
  ]
 },
 "v5a-cesp-0001": {
  "tipo": "recta",
  "antes": "nada",
  "via": {
   "sentidoUnico": true,
   "carriles": 2
  },
  "titulo": "Un camión de bomberos en servicio de urgencia llega a una vía con un carril VAO y retención en el carril normal.",
  "elementos": [
   {
    "tipo": "carrilReservado",
    "y": 200,
    "rotulo": "VAO",
    "rombo": true,
    "rotulos": [
     70,
     290
    ]
   }
  ],
  "vehiculos": [
   {
    "id": "c1",
    "tipo": "camion",
    "puntos": [
     [
      120,
      180
     ],
     [
      121,
      180
     ]
    ]
   },
   {
    "id": "c2",
    "tipo": "turismo",
    "puntos": [
     [
      210,
      180
     ],
     [
      211,
      180
     ]
    ]
   },
   {
    "id": "c3",
    "tipo": "turismo",
    "puntos": [
     [
      270,
      180
     ],
     [
      271,
      180
     ]
    ]
   },
   {
    "id": "c4",
    "tipo": "turismo",
    "puntos": [
     [
      330,
      180
     ],
     [
      331,
      180
     ]
    ]
   },
   {
    "id": "urgencia",
    "tipo": "bomberos",
    "desde": "O",
    "y": 220,
    "marcas": {
     "cerca": 100,
     "pasa": 390
    }
   }
  ],
  "pasos": [
   {
    "texto": "Hay retención en el carril normal. El de la derecha está reservado para vehículos de alta ocupación (VAO).",
    "cita": {
     "norma": "RGC",
     "articulo": "35.2.c",
     "texto": "Los vehículos de policía, extinción de incendios, protección civil y salvamento y asistencia sanitaria en servicio de urgencia, así como los equipos de mantenimiento de las instalaciones y de la infraestructura de la vía, podrán utilizar los carriles reservados."
    },
    "mover": [
     {
      "v": "urgencia",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "urgencia": "Urgencia"
    },
    "foco": [
     "urgencia"
    ],
    "ms": 2600
   },
   {
    "texto": "Los vehículos de urgencia en servicio urgente pueden usar los carriles reservados: pasa por el VAO.",
    "cita": {
     "norma": "RGC",
     "articulo": "35.2.c",
     "texto": "Los vehículos de policía, extinción de incendios, protección civil y salvamento y asistencia sanitaria en servicio de urgencia, así como los equipos de mantenimiento de las instalaciones y de la infraestructura de la vía, podrán utilizar los carriles reservados."
    },
    "mover": [
     {
      "v": "urgencia",
      "hasta": "pasa",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "urgencia": "Por el VAO"
    },
    "foco": [
     "urgencia"
    ],
    "ms": 2800
   }
  ]
 },
 "x1a-0083": {
  "tipo": "recta",
  "antes": "escena",
  "titulo": "Carretera de doble sentido. Un coche averiado está parado en su carril con la luz de emergencia; detrás, un coche de los agentes con los rotativos encendidos. Usted (A) se acerca.",
  "vehiculos": [
   {
    "id": "averiado",
    "tipo": "turismo",
    "avisos": {
     "emergencia": true
    },
    "puntos": [
     [
      290,
      226
     ],
     [
      291,
      226
     ]
    ]
   },
   {
    "id": "policia",
    "tipo": "policia",
    "avisos": {
     "sirena": false
    },
    "puntos": [
     [
      236,
      222
     ],
     [
      237,
      222
     ]
    ]
   },
   {
    "letra": "A",
    "tu": true,
    "puntos": [
     [
      -60,
      220
     ],
     [
      40,
      220
     ],
     {
      "marca": "modera"
     },
     [
      150,
      220
     ],
     {
      "marca": "espera"
     },
     [
      190,
      214
     ],
     [
      230,
      190
     ],
     [
      330,
      190
     ],
     [
      380,
      210
     ],
     [
      470,
      220
     ]
    ]
   },
   {
    "letra": "C",
    "desde": "E",
    "marcas": {
     "lejos": 440
    }
   }
  ],
  "pasos": [
   {
    "texto": "Los agentes han detenido su coche en el carril, protegiendo al averiado: pueden situarse en la parte de la vía que haga falta para auxiliar.",
    "cita": {
     "norma": "RGC",
     "articulo": "68.1",
     "texto": "podrán utilizar o situar sus vehículos en la parte de la vía que resulte necesaria cuando presten auxilio a los usuarios de ésta"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "modera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "policia": "Auxilio"
    },
    "foco": [
     "policia"
    ],
    "ms": 2800
   },
   {
    "texto": "Usted (A) modera la velocidad y, como viene C de frente, espera detrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.f",
     "texto": "Fuera de poblado al acercarse a vehículos inmovilizados en la calzada, a vehículos de auxilio prestando servicio"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "A",
     "C"
    ],
    "ms": 2800
   },
   {
    "texto": "Con el otro carril libre, los rebasa despacio y vuelve a su carril.",
    "cita": {
     "norma": "RGC",
     "articulo": "46.1.f",
     "texto": "Fuera de poblado al acercarse a vehículos inmovilizados en la calzada, a vehículos de auxilio prestando servicio"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "suave"
     }
    ],
    "etiquetas": {
     "A": "Despacio"
    },
    "foco": [
     "A"
    ],
    "ms": 3600
   }
  ]
 },
 "x1a-0086": {
  "tipo": "recta",
  "antes": "nada",
  "titulo": "Usted (A) lleva urgentemente a un herido, con la luz de emergencia y tocando el claxon. Le sigue un coche de policía.",
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "avisos": {
     "emergencia": true,
     "claxon": true
    },
    "puntos": [
     [
      40,
      220
     ],
     [
      190,
      220
     ],
     {
      "marca": "va"
     },
     [
      250,
      220
     ],
     {
      "marca": "senal"
     },
     [
      310,
      229
     ],
     [
      332,
      232
     ],
     {
      "marca": "parado"
     },
     [
      350,
      232
     ]
    ]
   },
   {
    "id": "policia",
    "tipo": "policia",
    "puntos": [
     [
      -140,
      220
     ],
     [
      100,
      220
     ],
     {
      "marca": "llega"
     },
     [
      165,
      220
     ],
     {
      "marca": "senal"
     },
     [
      212,
      229
     ],
     [
      234,
      232
     ],
     {
      "marca": "parado"
     },
     [
      252,
      232
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) avisa de que lleva un herido con el claxon intermitente y la luz de emergencia.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.1",
     "texto": "utilizando para ello el avisador acústico en forma intermitente y conectando la luz de emergencia, si se dispusiera de ella, o agitando un pañuelo o procedimiento similar."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "va",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Urgencia"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   },
   {
    "texto": "Se le acerca por detrás un coche de policía y le indica que se detenga.",
    "cita": {
     "norma": "RGC",
     "articulo": "69",
     "texto": "se sitúa detrás de cualquier otro vehículo y activa además un dispositivo de emisión de luz roja hacia adelante de forma intermitente o destellante"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "senal",
      "modo": "sigue"
     },
     {
      "v": "policia",
      "hasta": "senal",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "policia": "Luz roja"
    },
    "foco": [
     "policia"
    ],
    "ms": 2400,
    "avisos": {
     "policia": {
      "roja": true
     }
    }
   },
   {
    "texto": "Se detiene a la derecha. Los agentes pueden pedirle en cualquier momento que justifique la urgencia.",
    "cita": {
     "norma": "RGC",
     "articulo": "70.3",
     "texto": "En cualquier momento, los agentes de la autoridad podrán exigir la justificación de las circunstancias a que se alude en el apartado 1."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "parado",
      "modo": "frena"
     },
     {
      "v": "policia",
      "hasta": "parado",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Justifica"
    },
    "foco": [
     "A"
    ],
    "ms": 3000,
    "avisos": {
     "A": {
      "claxon": false
     },
     "policia": {
      "sirena": false
     }
    }
   }
  ]
 },
 "A-est-0008": {
  "tipo": "estrecho",
  "antes": "escena",
  "entorno": "pendiente",
  "titulo": "Tramo estrecho de gran pendiente visto desde arriba: la carretera sube de izquierda a derecha. Por abajo llega A; por arriba, B.",
  "sube": "O",
  "retrocede": "B",
  "criterio": "63.1",
  "elementos": [
   {
    "tipo": "pendiente",
    "alto": "E"
   }
  ],
  "senales": [
   {
    "cod": "P-16b",
    "extremo": "O"
   },
   {
    "cod": "P-16a",
    "extremo": "E"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A sube y B baja por un tramo estrecho de gran pendiente; se encuentran y no caben los dos.",
    "cita": {
     "norma": "RGC",
     "articulo": "63.1",
     "texto": "Se entienden por tramos de gran pendiente los que tienen una inclinación mínima del siete por ciento."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Sube",
     "B": "Baja"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Tiene la preferencia el que sube, así que B, que baja, da marcha atrás hasta salir del tramo.",
    "cita": {
     "norma": "RGC",
     "articulo": "63.1",
     "texto": "la preferencia de paso la tendrá el vehículo que circule en sentido ascendente, salvo si éste pudiera llegar antes a un apartadero establecido al efecto"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Pasa primero",
     "B": "Marcha atrás"
    },
    "foco": [
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "A termina de subir y después B sigue bajando.",
    "cita": {
     "norma": "RGC",
     "articulo": "63.1",
     "texto": "la preferencia de paso la tendrá el vehículo que circule en sentido ascendente, salvo si éste pudiera llegar antes a un apartadero establecido al efecto"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0072": {
  "tipo": "estrecho",
  "antes": "escena",
  "entorno": "pendiente",
  "titulo": "Tramo estrecho en pendiente visto desde arriba: la carretera sube de izquierda a derecha. Por abajo llega el turismo A; por arriba, el camión B.",
  "retrocede": "A",
  "criterio": "62.1",
  "elementos": [
   {
    "tipo": "pendiente",
    "alto": "E"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "tipo": "camion",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "A sube y B baja; se encuentran en el tramo estrecho. No está claro que la pendiente llegue al 7 %.",
    "cita": {
     "norma": "RGC",
     "articulo": "63.1",
     "texto": "En caso de duda sobre la inclinación de la pendiente o la distancia al apartadero, se estará a lo establecido en el artículo 62"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Sube",
     "B": "Baja"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Con esa duda se aplica el orden del artículo 62: el camión (B) va en la letra f) y el turismo (A), en la g). Por eso A da marcha atrás, aunque suba.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "el orden de preferencia entre los distintos tipos de vehículos cuando uno de ellos tenga que dar marcha atrás es el siguiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "B": "Pasa primero",
     "A": "Marcha atrás"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "El camión (B) pasa y después A sigue subiendo.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "f) Camiones, tractocamiones y furgones."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0064": {
  "tipo": "estrecho",
  "antes": "escena",
  "entorno": "obras",
  "titulo": "Obras que dejan un solo carril. B espera para pasar; detrás llega usted (A) y, por el otro lado, sale C.",
  "senales": [
   {
    "cod": "P-18",
    "extremo": "O"
   }
  ],
  "elementos": [
   {
    "tipo": "conos",
    "puntos": [
     [
      140,
      189
     ],
     [
      152,
      189
     ],
     [
      164,
      189
     ],
     [
      176,
      189
     ],
     [
      188,
      189
     ],
     [
      200,
      189
     ],
     [
      212,
      189
     ],
     [
      224,
      189
     ],
     [
      236,
      189
     ],
     [
      248,
      189
     ],
     [
      260,
      189
     ],
     [
      278,
      182
     ],
     [
      292,
      175
     ],
     [
      306,
      168
     ]
    ]
   }
  ],
  "vehiculos": [
   {
    "letra": "B",
    "desde": "O",
    "inicio": "antes"
   },
   {
    "letra": "A",
    "desde": "O",
    "inicio": "lejos",
    "tu": true
   },
   {
    "letra": "C",
    "desde": "E",
    "inicio": "dentro"
   }
  ],
  "pasos": [
   {
    "texto": "B llegó antes y espera mientras sale C. Usted (A) se coloca detrás de B, lo más arrimado posible a la derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.4",
     "texto": "se colocará detrás de él, lo más arrimado que sea posible al borde de la derecha, y no intentará pasar sino siguiendo al que tiene delante"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "cola",
      "modo": "frena"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "B": "Espera",
     "A": "Detrás",
     "C": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Cuando B entra en el tramo de obras, usted le sigue, sin intentar adelantarle.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.4",
     "texto": "se colocará detrás de él, lo más arrimado que sea posible al borde de la derecha, y no intentará pasar sino siguiendo al que tiene delante"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2600
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 700,
      "dura": 2600
     }
    ],
    "etiquetas": {
     "B": "Pasa",
     "A": "Le sigue"
    },
    "foco": [
     "A"
    ],
    "ms": 3400
   }
  ]
 },
 "x1a-0063": {
  "tipo": "estrecho",
  "antes": "escena",
  "entorno": "obras",
  "titulo": "Tramo de carretera con obras de reparación. Usted (A) se acerca.",
  "senales": [
   {
    "cod": "P-18",
    "extremo": "O"
   }
  ],
  "elementos": [
   {
    "tipo": "conos",
    "puntos": [
     [
      140,
      189
     ],
     [
      152,
      189
     ],
     [
      164,
      189
     ],
     [
      176,
      189
     ],
     [
      188,
      189
     ],
     [
      200,
      189
     ],
     [
      212,
      189
     ],
     [
      224,
      189
     ],
     [
      236,
      189
     ],
     [
      248,
      189
     ],
     [
      260,
      189
     ],
     [
      278,
      182
     ],
     [
      292,
      175
     ],
     [
      306,
      168
     ]
    ]
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "lejos",
    "tu": true
   }
  ],
  "pasos": [
   {
    "texto": "Hay obras de reparación: los conos marcan el sitio por el que hay que pasar.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.2",
     "texto": "Cuando en una vía se estén efectuando obras de reparación, los vehículos, caballerías y toda especie de ganado marcharán por el sitio señalado al efecto."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Despacio"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "Usted pasa por el sitio señalado, sin salirse de él.",
    "cita": {
     "norma": "RGC",
     "articulo": "60.2",
     "texto": "Cuando en una vía se estén efectuando obras de reparación, los vehículos, caballerías y toda especie de ganado marcharán por el sitio señalado al efecto."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "suave"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3400
   }
  ]
 },
 "x1a-0071": {
  "tipo": "estrecho",
  "antes": "escena",
  "titulo": "Tramo estrecho donde solo cabe un vehículo. Por la izquierda llega un autobús (A); por la derecha, un turismo (B). En el tramo hay un agente.",
  "elementos": [
   {
    "tipo": "persona",
    "agente": true,
    "x": 296,
    "y": 150,
    "ang": 150
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "autobus",
    "desde": "O",
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "desde": "E",
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "El autobús (A) y el turismo (B) se encuentran en el estrechamiento. Por el orden del artículo 62, el autobús tendría la preferencia.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "e) Vehículos destinados al transporte colectivo de viajeros."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "encuentro",
      "modo": "frena"
     },
     {
      "v": "B",
      "hasta": "encuentro",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Pero el agente ordena al autobús que retroceda, y lo que ordena el agente va por delante del orden del artículo 62.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "Sin perjuicio de lo que pueda ordenar el agente de la autoridad"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes"
     }
    ],
    "etiquetas": {
     "A": "Marcha atrás",
     "B": "Pasa primero"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "B pasa y después el autobús sigue su camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "62.1",
     "texto": "Sin perjuicio de lo que pueda ordenar el agente de la autoridad"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2200
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1500,
      "dura": 2300
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3800
   }
  ]
 },
 "x1a-0011": {
  "tipo": "recta",
  "antes": "escena",
  "titulo": "Vía de doble sentido con una isleta en el centro de la calzada. A circula hacia la derecha y B, hacia la izquierda.",
  "elementos": [
   {
    "tipo": "isleta",
    "x": 150,
    "y": 194,
    "w": 100,
    "h": 12
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "marcas": {
     "cerca": 70,
     "antes": 120
    }
   },
   {
    "letra": "B",
    "desde": "E",
    "marcas": {
     "cerca": 330,
     "antes": 280
    }
   }
  ],
  "pasos": [
   {
    "texto": "A y B se acercan a una isleta situada en el centro de la calzada.",
    "cita": {
     "norma": "RGC",
     "articulo": "43.1",
     "texto": "se circulará por la parte de la calzada que quede a la derecha de éstos, en el sentido de la marcha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "antes",
      "modo": "sigue"
     }
    ],
    "etiquetas": {},
    "foco": [
     "A",
     "B"
    ],
    "ms": 2000
   },
   {
    "texto": "Cada uno pasa por la parte de la calzada que queda a la derecha de la isleta, según su sentido de marcha.",
    "cita": {
     "norma": "RGC",
     "articulo": "43.1",
     "texto": "se circulará por la parte de la calzada que quede a la derecha de éstos, en el sentido de la marcha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Por su derecha",
     "B": "Por su derecha"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2800
   }
  ]
 },
 "x1a-0012": {
  "tipo": "recta",
  "antes": "imagen",
  "via": {
   "urbana": true,
   "sentidoUnico": true,
   "carriles": 2
  },
  "titulo": "Calle de sentido único con un refugio para peatones en el centro. A y B circulan en el mismo sentido.",
  "elementos": [
   {
    "tipo": "isleta",
    "peatones": true,
    "x": 160,
    "y": 196,
    "w": 80,
    "h": 8
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "y": 180,
    "marcas": {
     "antes": 125
    }
   },
   {
    "letra": "B",
    "desde": "O",
    "y": 220,
    "marcas": {
     "antes": 95
    }
   }
  ],
  "pasos": [
   {
    "texto": "En una calle de sentido único hay un refugio para peatones y ninguna señal indica por dónde pasar.",
    "cita": {
     "norma": "RGC",
     "articulo": "43.1",
     "texto": "salvo cuando estén situados en una vía de sentido único o dentro de la parte correspondiente a un solo sentido de circulación, en cuyo caso podrá hacerse por cualquiera de los dos lados"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "antes",
      "modo": "sigue"
     }
    ],
    "etiquetas": {},
    "foco": [
     "A",
     "B"
    ],
    "ms": 2200
   },
   {
    "texto": "Se puede pasar por cualquiera de los dos lados: A lo deja a su derecha y B, a su izquierda.",
    "cita": {
     "norma": "RGC",
     "articulo": "43.1",
     "texto": "salvo cuando estén situados en una vía de sentido único o dentro de la parte correspondiente a un solo sentido de circulación, en cuyo caso podrá hacerse por cualquiera de los dos lados"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Por la izquierda",
     "B": "Por la derecha"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2800
   }
  ]
 },
 "x1a-0014": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "mediana": true
  },
  "titulo": "Vía dividida en dos calzadas por una mediana. A circula hacia la derecha y B, hacia la izquierda.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "y": 266,
    "marcas": {
     "medio": 200
    }
   },
   {
    "letra": "B",
    "desde": "E",
    "y": 134,
    "marcas": {
     "medio": 200
    }
   }
  ],
  "pasos": [
   {
    "texto": "Cada uno usa la calzada de la derecha según su sentido de marcha: A, la de abajo; B, la de arriba.",
    "cita": {
     "norma": "RGC",
     "articulo": "44.1",
     "texto": "los vehículos deben utilizar la calzada de la derecha, en relación con el sentido de su marcha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "medio",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "medio",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Su derecha",
     "B": "Su derecha"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "Así nunca se encuentran de frente: la mediana separa los dos sentidos.",
    "cita": {
     "norma": "RGC",
     "articulo": "44.1",
     "texto": "los vehículos deben utilizar la calzada de la derecha, en relación con el sentido de su marcha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {},
    "foco": [
     "A",
     "B"
    ],
    "ms": 2400
   }
  ]
 },
 "x1a-0073": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Usted (A) va a girar a la derecha y en la calle a la que entra hay un rebaño cruzando, donde no hay paso para animales.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "E",
    "inicio": "cerca",
    "tu": true
   },
   {
    "id": "rebano",
    "tipo": "oveja",
    "grupo": 7,
    "separacion": 15,
    "desorden": 6,
    "puntos": [
     [
      270,
      -80
     ],
     [
      270,
      150
     ],
     {
      "marca": "borde"
     },
     [
      270,
      196
     ],
     {
      "marca": "medio"
     },
     [
      270,
      262
     ],
     {
      "marca": "cruzado"
     },
     [
      270,
      440
     ]
    ],
    "inicio": "medio"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) va a girar a la derecha y el rebaño está cruzando la calle a la que entra.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.b",
     "texto": "Cuando vayan a girar con su vehículo para entrar en otra vía y haya animales cruzándola, aunque no exista paso para éstos."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "rebano",
      "hasta": "cruzado",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "rebano"
    ],
    "ms": 3000
   },
   {
    "texto": "Los animales tienen prioridad: espera a que crucen todos.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.b",
     "texto": "Cuando vayan a girar con su vehículo para entrar en otra vía y haya animales cruzándola, aunque no exista paso para éstos."
    },
    "mover": [
     {
      "v": "rebano",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "rebano"
    ],
    "ms": 3600
   },
   {
    "texto": "Con la calle libre, gira ciñéndose al borde derecho.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "se ceñirá todo lo posible al borde derecho de la calzada, si el cambio de dirección es a la derecha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "x1a-0074": {
  "tipo": "cruce",
  "antes": "escena",
  "entorno": "campo",
  "titulo": "Usted (A) va a girar a la derecha para entrar en una finca. Por el arcén caminan unas vacas.",
  "vias": {
   "N": {
    "cerrada": true
   },
   "S": {
    "firme": "tierra"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "hacia": "S",
    "inicio": "cerca",
    "tu": true
   },
   {
    "id": "vacas",
    "tipo": "vaca",
    "grupo": 3,
    "separacion": 34,
    "puntos": [
     [
      460,
      247
     ],
     [
      300,
      247
     ],
     {
      "marca": "vienen"
     },
     [
      150,
      247
     ],
     {
      "marca": "entrada"
     },
     [
      40,
      247
     ],
     {
      "marca": "pasadas"
     },
     [
      -160,
      247
     ]
    ],
    "inicio": "vienen"
   }
  ],
  "pasos": [
   {
    "texto": "Para entrar en la finca, usted (A) tiene que cruzar el arcén, y por él caminan unas vacas.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.c",
     "texto": "Cuando el vehículo cruce un arcén por el que estén circulando animales que no dispongan de cañada"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "vacas",
      "hasta": "entrada",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "vacas"
    ],
    "ms": 3000
   },
   {
    "texto": "Allí no hay cañada, pero las vacas tienen prioridad: espera a que pasen.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.c",
     "texto": "Cuando el vehículo cruce un arcén por el que estén circulando animales que no dispongan de cañada"
    },
    "mover": [
     {
      "v": "vacas",
      "hasta": "pasadas",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "vacas"
    ],
    "ms": 3000
   },
   {
    "texto": "Con el arcén libre, entra en la finca.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.c",
     "texto": "Cuando el vehículo cruce un arcén por el que estén circulando animales que no dispongan de cañada"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-ani-0001": {
  "tipo": "recta",
  "antes": "imagen",
  "titulo": "Carretera con la señal de paso de ganado y el panel «Cañada». Usted (A) se acerca y unas vacas están cruzando.",
  "elementos": [
   {
    "tipo": "cartel",
    "cod": "P-23",
    "x": 108,
    "y": 262,
    "panel": "Cañada"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca",
    "tu": true,
    "marcas": {
     "cerca": 60,
     "para": 214
    }
   },
   {
    "id": "vacas",
    "tipo": "vaca",
    "grupo": 4,
    "separacion": 32,
    "desorden": 6,
    "puntos": [
     [
      256,
      -60
     ],
     [
      256,
      140
     ],
     {
      "marca": "borde"
     },
     [
      256,
      210
     ],
     {
      "marca": "medio"
     },
     [
      256,
      460
     ]
    ],
    "inicio": "borde"
   }
  ],
  "pasos": [
   {
    "texto": "Hay una cañada señalizada y el ganado está cruzando: usted (A) se detiene.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.a",
     "texto": "En las cañadas debidamente señalizadas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "para",
      "modo": "frena"
     },
     {
      "v": "vacas",
      "hasta": "medio",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "vacas"
    ],
    "ms": 2800
   },
   {
    "texto": "En las cañadas señalizadas, los animales tienen prioridad: espera a que crucen todos.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.a",
     "texto": "En las cañadas debidamente señalizadas."
    },
    "mover": [
     {
      "v": "vacas",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "vacas"
    ],
    "ms": 3800
   },
   {
    "texto": "Con la vía libre, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.a",
     "texto": "En las cañadas debidamente señalizadas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "B1-pri-0069": {
  "tipo": "recta",
  "antes": "imagen",
  "titulo": "Carretera con la señal de paso de ganado y el panel «Cañada». Usted (A) se acerca y unas vacas están cruzando.",
  "elementos": [
   {
    "tipo": "cartel",
    "cod": "P-23",
    "x": 108,
    "y": 262,
    "panel": "Cañada"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "inicio": "cerca",
    "tu": true,
    "marcas": {
     "cerca": 60,
     "para": 214
    }
   },
   {
    "id": "vacas",
    "tipo": "vaca",
    "grupo": 4,
    "separacion": 32,
    "desorden": 6,
    "puntos": [
     [
      256,
      -60
     ],
     [
      256,
      140
     ],
     {
      "marca": "borde"
     },
     [
      256,
      210
     ],
     {
      "marca": "medio"
     },
     [
      256,
      460
     ]
    ],
    "inicio": "borde"
   }
  ],
  "pasos": [
   {
    "texto": "Hay una cañada señalizada y el ganado está cruzando: usted (A) se detiene.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.2",
     "texto": "se señalizarán por medio de paneles complementarios con la inscripción “cañada”, que se colocarán debajo de la señal “paso de animales domésticos”"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "para",
      "modo": "frena"
     },
     {
      "v": "vacas",
      "hasta": "medio",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "vacas"
    ],
    "ms": 2800
   },
   {
    "texto": "En las cañadas señalizadas, los animales tienen prioridad: espera a que crucen todos.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.a",
     "texto": "En las cañadas debidamente señalizadas."
    },
    "mover": [
     {
      "v": "vacas",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "vacas"
    ],
    "ms": 3800
   },
   {
    "texto": "Con la vía libre, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "66.1.a",
     "texto": "En las cañadas debidamente señalizadas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-pri-0003": {
  "tipo": "cruce",
  "antes": "imagen",
  "titulo": "Cruce sin señales. Usted (A) llega por el sur y por su izquierda se acerca un tranvía (B).",
  "elementos": [
   {
    "tipo": "railes",
    "eje": "h",
    "y": 200,
    "enCalzada": true
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "espera",
    "tu": true
   },
   {
    "letra": "B",
    "tipo": "tranvia",
    "puntos": [
     [
      -300,
      200
     ],
     [
      40,
      200
     ],
     {
      "marca": "cerca"
     },
     [
      760,
      200
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "El tranvía (B) se acerca por su izquierda. Aun así, tiene prioridad: los vehículos que circulan por raíles la tienen sobre los demás.",
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.b",
     "texto": "Los vehículos que circulen por raíles tienen derecho de prioridad de paso sobre los demás usuarios."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "cerca",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Prioridad"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Usted espera a que pase el tranvía entero.",
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.b",
     "texto": "Los vehículos que circulen por raíles tienen derecho de prioridad de paso sobre los demás usuarios."
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 3000
   },
   {
    "texto": "Con las vías libres, cruza.",
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.b",
     "texto": "Los vehículos que circulen por raíles tienen derecho de prioridad de paso sobre los demás usuarios."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "B1-pri-0067": {
  "tipo": "cruce",
  "antes": "escena",
  "entorno": "campo",
  "titulo": "Paso a nivel sin barreras. Usted (A) se acerca por la carretera y por la vía del tren se acerca un tren.",
  "vias": {
   "E": {
    "cerrada": true
   },
   "O": {
    "cerrada": true
   },
   "S": {
    "cartel": "P-8"
   }
  },
  "elementos": [
   {
    "tipo": "railes",
    "eje": "h",
    "y": 200
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "cerca",
    "tu": true
   },
   {
    "id": "tren",
    "tipo": "tren",
    "grupo": 4,
    "separacion": 78,
    "color": "B",
    "puntos": [
     [
      -520,
      200
     ],
     [
      60,
      200
     ],
     {
      "marca": "cerca"
     },
     [
      1100,
      200
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Se acerca un tren: usted (A) se detiene antes del paso a nivel.",
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.b",
     "texto": "Los vehículos que circulen por raíles tienen derecho de prioridad de paso sobre los demás usuarios."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "tren",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "tren"
    ],
    "ms": 2800
   },
   {
    "texto": "El tren tiene prioridad de paso: espera a que pase entero.",
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.b",
     "texto": "Los vehículos que circulen por raíles tienen derecho de prioridad de paso sobre los demás usuarios."
    },
    "mover": [
     {
      "v": "tren",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "tren"
    ],
    "ms": 3400
   },
   {
    "texto": "Con la vía libre, cruza el paso a nivel.",
    "cita": {
     "norma": "RGC",
     "articulo": "57.1.b",
     "texto": "Los vehículos que circulen por raíles tienen derecho de prioridad de paso sobre los demás usuarios."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-pea-0002": {
  "tipo": "cruce",
  "antes": "escena",
  "entorno": "campo",
  "titulo": "Usted (A) va a girar a la derecha para entrar en un camino. Por el arcén caminan dos peatones; allí no hay acera.",
  "vias": {
   "N": {
    "cerrada": true
   },
   "S": {
    "firme": "tierra"
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "hacia": "S",
    "inicio": "cerca",
    "tu": true
   },
   {
    "id": "p1",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      330,
      246
     ],
     {
      "marca": "vienen"
     },
     [
      150,
      246
     ],
     {
      "marca": "entrada"
     },
     [
      100,
      246
     ],
     {
      "marca": "pasados"
     },
     [
      60,
      246
     ]
    ]
   },
   {
    "id": "p2",
    "tipo": "peaton",
    "color": "C",
    "puntos": [
     [
      350,
      247
     ],
     {
      "marca": "vienen"
     },
     [
      170,
      247
     ],
     {
      "marca": "entrada"
     },
     [
      120,
      247
     ],
     {
      "marca": "pasados"
     },
     [
      80,
      247
     ]
    ]
   }
  ],
  "pasos": [
   {
    "texto": "Para entrar en el camino, usted (A) tiene que cruzar el arcén, y por él caminan dos peatones que no tienen acera.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.c",
     "texto": "Cuando el vehículo cruce un arcén por el que estén circulando peatones que no dispongan de zona peatonal."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     },
     {
      "v": "p1",
      "hasta": "entrada",
      "modo": "sigue"
     },
     {
      "v": "p2",
      "hasta": "entrada",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "p1",
     "p2"
    ],
    "ms": 3000
   },
   {
    "texto": "Los peatones tienen prioridad: espera a que pasen.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.c",
     "texto": "Cuando el vehículo cruce un arcén por el que estén circulando peatones que no dispongan de zona peatonal."
    },
    "mover": [
     {
      "v": "p1",
      "hasta": "pasados",
      "modo": "sigue"
     },
     {
      "v": "p2",
      "hasta": "pasados",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "p1",
     "p2"
    ],
    "ms": 2600
   },
   {
    "texto": "Con el arcén libre, gira.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.c",
     "texto": "Cuando el vehículo cruce un arcén por el que estén circulando peatones que no dispongan de zona peatonal."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-pea-0004": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true,
   "sinCasasSur": true
  },
  "titulo": "Usted (A) sale de un garaje y tiene que atravesar la acera para llegar a la calzada. Por la acera camina un peatón.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "asfalto",
    "x": 170,
    "y": 262,
    "w": 60,
    "h": 150
   },
   {
    "tipo": "casa",
    "x": -6,
    "y": 280,
    "w": 166,
    "h": 100
   },
   {
    "tipo": "casa",
    "x": 240,
    "y": 280,
    "w": 170,
    "h": 100
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "intermitente": "derecha",
    "puntos": [
     [
      200,
      430
     ],
     [
      200,
      330
     ],
     {
      "marca": "garaje"
     },
     [
      200,
      296
     ],
     {
      "marca": "antes"
     },
     [
      200,
      262
     ],
     [
      204,
      246
     ],
     [
      214,
      232
     ],
     [
      232,
      223
     ],
     [
      258,
      220
     ],
     [
      720,
      220
     ]
    ],
    "inicio": "garaje"
   },
   {
    "id": "p1",
    "tipo": "peaton",
    "color": "D",
    "puntos": [
     [
      -40,
      256
     ],
     [
      440,
      256
     ]
    ],
    "inicio": 0.18
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) sale del garaje y se detiene antes de la acera: por ella camina un peatón.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.a",
     "texto": "En los pasos para peatones debidamente señalizados, aceras y demás zonas peatonales."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes",
      "modo": "frena"
     },
     {
      "v": "p1",
      "hasta": 0.42,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "p1"
    ],
    "ms": 2800
   },
   {
    "texto": "En la acera, el peatón tiene prioridad: le deja pasar.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.a",
     "texto": "En los pasos para peatones debidamente señalizados, aceras y demás zonas peatonales."
    },
    "mover": [
     {
      "v": "p1",
      "hasta": 0.8,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "p1"
    ],
    "ms": 2600
   },
   {
    "texto": "Después cruza la acera y se incorpora a la calzada cuando puede hacerlo sin peligro.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "de que puede hacerlo sin peligro para los demás usuarios"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   }
  ]
 },
 "x1a-0092": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true,
   "sinCasasSur": true
  },
  "titulo": "Usted (A) va a salir de un garaje a la calle; los edificios le tapan la vista. En la acera hay una persona.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "asfalto",
    "x": 170,
    "y": 262,
    "w": 60,
    "h": 150
   },
   {
    "tipo": "casa",
    "x": -6,
    "y": 270,
    "w": 166,
    "h": 110
   },
   {
    "tipo": "casa",
    "x": 240,
    "y": 270,
    "w": 170,
    "h": 110
   },
   {
    "tipo": "persona",
    "x": 148,
    "y": 252,
    "ang": -90
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "intermitente": "derecha",
    "puntos": [
     [
      200,
      430
     ],
     [
      200,
      330
     ],
     {
      "marca": "garaje"
     },
     [
      200,
      296
     ],
     {
      "marca": "antes"
     },
     [
      200,
      262
     ],
     [
      204,
      246
     ],
     [
      214,
      232
     ],
     [
      232,
      223
     ],
     [
      258,
      220
     ],
     [
      720,
      220
     ]
    ],
    "inicio": "garaje"
   },
   {
    "letra": "B",
    "desde": "O",
    "marcas": {
     "cerca": 40
    }
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) se acerca despacio a la calle, pero los edificios no le dejan ver si viene alguien.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "de que puede hacerlo sin peligro para los demás usuarios"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "antes",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Sin visibilidad"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Una persona en la acera le indica que espere: se acerca B.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "incluso siguiendo las indicaciones de otra persona en caso necesario"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Cuando la persona le indica que la calle está libre, sale.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "incluso siguiendo las indicaciones de otra persona en caso necesario"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   }
  ]
 },
 "A-pea-0005": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Una fila escolar cruza la calzada donde no hay paso para peatones. Usted (A) se acerca.",
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "cerca": 40,
     "para": 206
    }
   },
   {
    "id": "fila",
    "tipo": "nino",
    "color": "C",
    "grupo": 9,
    "separacion": 12,
    "desorden": 3,
    "puntos": [
     [
      252,
      -80
     ],
     [
      252,
      150
     ],
     {
      "marca": "borde"
     },
     [
      252,
      200
     ],
     {
      "marca": "medio"
     },
     [
      252,
      480
     ]
    ],
    "inicio": "medio"
   }
  ],
  "pasos": [
   {
    "texto": "Una fila escolar está cruzando la calzada, aunque allí no hay paso para peatones. Usted (A) se detiene.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.e",
     "texto": "Cuando transiten unidades militares a pie, filas escolares y comitivas organizadas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "para",
      "modo": "frena"
     },
     {
      "v": "fila",
      "hasta": 0.62,
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "fila"
    ],
    "ms": 3000
   },
   {
    "texto": "La fila escolar tiene prioridad: espera a que cruce entera.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.e",
     "texto": "Cuando transiten unidades militares a pie, filas escolares y comitivas organizadas."
    },
    "mover": [
     {
      "v": "fila",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "fila"
    ],
    "ms": 3400
   },
   {
    "texto": "Con la calzada libre, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "65.1.e",
     "texto": "Cuando transiten unidades militares a pie, filas escolares y comitivas organizadas."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-cic-0003": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Calle con un paso para ciclistas señalizado, sin semáforo. Un ciclista lo va a cruzar y usted (A) se acerca.",
  "elementos": [
   {
    "tipo": "pasoCiclistas",
    "x": 244,
    "desde": 160,
    "hasta": 240,
    "ancho": 22
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "cerca": 40,
     "para": 230
    }
   },
   {
    "id": "ciclista",
    "tipo": "bici",
    "color": "D",
    "puntos": [
     [
      255,
      40
     ],
     [
      255,
      140
     ],
     {
      "marca": "borde"
     },
     [
      255,
      420
     ]
    ],
    "inicio": 0.3
   }
  ],
  "pasos": [
   {
    "texto": "Un ciclista va a cruzar por el paso para ciclistas: usted (A) se detiene antes del paso.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.a",
     "texto": "Cuando circulen por un carril bici, paso para ciclistas o arcén debidamente señalizados."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "para",
      "modo": "frena"
     },
     {
      "v": "ciclista",
      "hasta": "borde",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 2800
   },
   {
    "texto": "En el paso para ciclistas, el ciclista tiene prioridad: le deja cruzar.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.a",
     "texto": "Cuando circulen por un carril bici, paso para ciclistas o arcén debidamente señalizados."
    },
    "mover": [
     {
      "v": "ciclista",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "ciclista"
    ],
    "ms": 2600
   },
   {
    "texto": "Con el paso libre, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "64.2.a",
     "texto": "Cuando circulen por un carril bici, paso para ciclistas o arcén debidamente señalizados."
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "A-inc-0004": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Calle de un pueblo. Un autobús (B) está en una parada señalizada y usted (A) se acerca por el mismo carril.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "asfalto",
    "x": 140,
    "y": 238,
    "w": 150,
    "h": 22,
    "r": 4
   },
   {
    "tipo": "parada",
    "x": 150,
    "y": 240,
    "w": 130,
    "h": 18
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "cerca": 20,
     "frena": 110
    }
   },
   {
    "letra": "B",
    "tipo": "autobus",
    "intermitente": "izquierda",
    "puntos": [
     [
      206,
      249
     ],
     [
      240,
      249
     ],
     {
      "marca": "sale"
     },
     [
      272,
      246
     ],
     [
      300,
      236
     ],
     [
      328,
      225
     ],
     [
      352,
      220
     ],
     [
      760,
      220
     ]
    ],
    "inicio": 0
   }
  ],
  "pasos": [
   {
    "texto": "El autobús (B) pone el intermitente para salir de la parada. Usted (A) reduce la velocidad, llegando a detenerse si hace falta.",
    "cita": {
     "norma": "RGC",
     "articulo": "73.2",
     "texto": "los conductores de los demás vehículos deberán desplazarse lateralmente, siempre que fuera posible, o reducir su velocidad"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "frena",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Reduce",
     "B": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   },
   {
    "texto": "Le deja salir para que siga su marcha.",
    "cita": {
     "norma": "RGC",
     "articulo": "73.1",
     "texto": "especialmente si se trata de un vehículo de transporte colectivo de viajeros que pretende incorporarse a la circulación desde una parada señalizada"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 3000
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Sale"
    },
    "foco": [
     "B"
    ],
    "ms": 3000
   },
   {
    "texto": "Después, usted sigue detrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "73.2",
     "texto": "los conductores de los demás vehículos deberán desplazarse lateralmente, siempre que fuera posible, o reducir su velocidad"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "x1a-0095": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Calle de un pueblo. Un autobús (B) está en una parada señalizada; por el mismo carril se acerca A.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "asfalto",
    "x": 140,
    "y": 238,
    "w": 150,
    "h": 22,
    "r": 4
   },
   {
    "tipo": "parada",
    "x": 150,
    "y": 240,
    "w": 130,
    "h": 18
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "marcas": {
     "cerca": 20,
     "frena": 110
    }
   },
   {
    "letra": "B",
    "tipo": "autobus",
    "intermitente": "izquierda",
    "puntos": [
     [
      206,
      249
     ],
     [
      240,
      249
     ],
     {
      "marca": "sale"
     },
     [
      272,
      246
     ],
     [
      300,
      236
     ],
     [
      328,
      225
     ],
     [
      352,
      220
     ],
     [
      760,
      220
     ]
    ],
    "inicio": 0
   }
  ],
  "pasos": [
   {
    "texto": "El conductor del autobús (B) anuncia con el intermitente que va a salir de la parada.",
    "cita": {
     "norma": "RGC",
     "articulo": "73.3",
     "texto": "de adoptar las precauciones necesarias para evitar todo riesgo de accidente, después de haber anunciado por medio de sus indicadores de dirección su propósito de reanudar la marcha"
    },
    "mover": [],
    "etiquetas": {
     "B": "Intermitente"
    },
    "foco": [
     "B"
    ],
    "ms": 2000
   },
   {
    "texto": "Aunque los demás deben facilitarle la salida, B se asegura de que puede salir sin riesgo: espera a ver que A frena.",
    "cita": {
     "norma": "RGC",
     "articulo": "73.3",
     "texto": "de adoptar las precauciones necesarias para evitar todo riesgo de accidente, después de haber anunciado por medio de sus indicadores de dirección su propósito de reanudar la marcha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "frena",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Reduce",
     "B": "Espera"
    },
    "foco": [
     "A",
     "B"
    ],
    "ms": 2800
   },
   {
    "texto": "Entonces B sale de la parada y A sigue detrás.",
    "cita": {
     "norma": "RGC",
     "articulo": "73.2",
     "texto": "los conductores de los demás vehículos deberán desplazarse lateralmente, siempre que fuera posible, o reducir su velocidad"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 3000
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 1600,
      "dura": 2400
     }
    ],
    "etiquetas": {
     "B": "Sale"
    },
    "foco": [
     "B"
    ],
    "ms": 4000
   }
  ]
 },
 "A-inc-0001": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Usted (A) está estacionado junto a la acera y quiere incorporarse a la circulación. Por la calzada se acerca B.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "asfalto",
    "x": -10,
    "y": 240,
    "w": 420,
    "h": 22
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "intermitente": "izquierda",
    "puntos": [
     [
      170,
      251
     ],
     [
      190,
      251
     ],
     {
      "marca": "asoma"
     },
     [
      222,
      246
     ],
     [
      250,
      232
     ],
     [
      280,
      222
     ],
     [
      306,
      220
     ],
     [
      760,
      220
     ]
    ],
    "inicio": 0
   },
   {
    "id": "e1",
    "tipo": "turismo",
    "puntos": [
     [
      110,
      251
     ],
     [
      111,
      251
     ]
    ],
    "inicio": 0
   },
   {
    "id": "e2",
    "tipo": "autocaravana",
    "puntos": [
     [
      290,
      251
     ],
     [
      291,
      251
     ]
    ],
    "inicio": 0
   },
   {
    "letra": "B",
    "desde": "O",
    "marcas": {
     "cerca": 60
    }
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) pone el intermitente para incorporarse y mira: por la calzada se acerca B.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "cediendo el paso a otros vehículos y teniendo en cuenta la posición, trayectoria y velocidad de éstos"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "Le cede el paso: B sigue sin tener que frenar.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "cediendo el paso a otros vehículos y teniendo en cuenta la posición, trayectoria y velocidad de éstos"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Cede"
    },
    "foco": [
     "B"
    ],
    "ms": 2200
   },
   {
    "texto": "Con la calzada libre, se incorpora.",
    "cita": {
     "norma": "RGC",
     "articulo": "72.1",
     "texto": "de que puede hacerlo sin peligro para los demás usuarios"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   }
  ]
 },
 "A-inc-0005": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "sentidoUnico": true,
   "carriles": 2
  },
  "titulo": "Calzada de dos carriles en el mismo sentido. Usted (A) va por el de la derecha; B, por el de la izquierda, algo más atrás.",
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "intermitente": "izquierda",
    "puntos": [
     [
      -300,
      220
     ],
     [
      70,
      220
     ],
     {
      "marca": "ahora"
     },
     [
      170,
      220
     ],
     {
      "marca": "espera"
     },
     [
      230,
      220
     ],
     {
      "marca": "mas"
     },
     [
      262,
      216
     ],
     [
      290,
      204
     ],
     [
      318,
      188
     ],
     [
      340,
      180
     ],
     [
      800,
      180
     ]
    ],
    "inicio": "ahora"
   },
   {
    "letra": "B",
    "desde": "O",
    "y": 180,
    "marcas": {
     "cerca": 110
    }
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) quiere pasarse al carril de la izquierda, pero por él se acerca B.",
    "cita": {
     "norma": "RGC",
     "articulo": "74.2",
     "texto": "Toda maniobra de desplazamiento lateral que implique cambio de carril deberá llevarse a efecto respetando la prioridad del que circule por el carril que se pretende ocupar"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "cerca",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Intermitente",
     "B": "Prioridad"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "B tiene la prioridad: usted sigue en su carril y le deja pasar.",
    "cita": {
     "norma": "RGC",
     "articulo": "74.2",
     "texto": "Toda maniobra de desplazamiento lateral que implique cambio de carril deberá llevarse a efecto respetando la prioridad del que circule por el carril que se pretende ocupar"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "mas",
      "modo": "sigue"
     },
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   },
   {
    "texto": "Con el carril libre, cambia de carril.",
    "cita": {
     "norma": "RGC",
     "articulo": "74.2",
     "texto": "Toda maniobra de desplazamiento lateral que implique cambio de carril deberá llevarse a efecto respetando la prioridad del que circule por el carril que se pretende ocupar"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Cambia"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   }
  ]
 },
 "A-dir-0003": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Usted (A) circula por una calzada de sentido único (dos carriles hacia arriba) y va a girar a la izquierda.",
  "vias": {
   "S": {
    "flechas": 0
   },
   "N": {
    "flechas": 0
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "intermitente": "izquierda",
    "puntos": [
     [
      171,
      440
     ],
     [
      171,
      330
     ],
     {
      "marca": "cerca"
     },
     [
      171,
      270
     ],
     {
      "marca": "espera"
     },
     [
      171,
      232
     ],
     [
      170.4,
      224.2
     ],
     [
      168.6,
      216.5
     ],
     [
      165.6,
      209.3
     ],
     [
      161.5,
      202.6
     ],
     [
      156.4,
      196.6
     ],
     [
      150.4,
      191.5
     ],
     [
      143.7,
      187.4
     ],
     [
      136.5,
      184.4
     ],
     [
      128.8,
      182.6
     ],
     [
      121,
      182
     ],
     [
      -320,
      182
     ]
    ],
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "En una calzada de sentido único, para girar a la izquierda usted se ciñe todo lo posible al borde izquierdo.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "y al borde izquierdo, si es a la izquierda y la calzada es de un solo sentido"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se coloca"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Desde ahí gira en el menor espacio y tiempo posibles.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.b",
     "texto": "la maniobra en el menor espacio y tiempo posibles"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   }
  ]
 },
 "x1a-0097": {
  "tipo": "cruce",
  "antes": "escena",
  "centro": true,
  "titulo": "Intersección con marcas que señalizan los giros a la izquierda. Usted (A) llega por el sur y va a girar a la izquierda.",
  "elementos": [
   {
    "tipo": "guia",
    "puntos": [
     [
      211,
      262
     ],
     [
      210.6,
      252.2
     ],
     [
      209.2,
      244.4
     ],
     [
      207.1,
      236.9
     ],
     [
      204.1,
      229.6
     ],
     [
      200.3,
      222.8
     ],
     [
      195.7,
      216.4
     ],
     [
      190.5,
      210.5
     ],
     [
      184.6,
      205.3
     ],
     [
      178.2,
      200.7
     ],
     [
      171.4,
      196.9
     ],
     [
      164.1,
      193.9
     ],
     [
      156.6,
      191.8
     ],
     [
      148.8,
      190.4
     ],
     [
      141,
      190
     ],
     [
      104,
      182
     ]
    ]
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "tu": true,
    "intermitente": "izquierda",
    "puntos": [
     [
      211,
      440
     ],
     [
      211,
      330
     ],
     {
      "marca": "cerca"
     },
     [
      211,
      282
     ],
     {
      "marca": "espera"
     },
     [
      211,
      260
     ],
     [
      210.6,
      252.2
     ],
     [
      209.2,
      244.4
     ],
     [
      207.1,
      236.9
     ],
     [
      204.1,
      229.6
     ],
     [
      200.3,
      222.8
     ],
     [
      195.7,
      216.4
     ],
     [
      190.5,
      210.5
     ],
     [
      184.6,
      205.3
     ],
     [
      178.2,
      200.7
     ],
     [
      171.4,
      196.9
     ],
     [
      164.1,
      193.9
     ],
     [
      156.6,
      191.8
     ],
     [
      148.8,
      190.4
     ],
     [
      141,
      190
     ],
     [
      110,
      182
     ],
     [
      -320,
      182
     ]
    ],
    "inicio": "cerca"
   }
  ],
  "pasos": [
   {
    "texto": "La intersección está señalizada para girar a la izquierda dejando el centro a la derecha: las marcas indican la trayectoria.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.c",
     "texto": "a no ser que ésta esté acondicionada o señalizada para dejarlo a su derecha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se coloca"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Usted gira siguiendo las marcas, con el centro de la intersección a su derecha.",
    "cita": {
     "norma": "RGC",
     "articulo": "75.1.c",
     "texto": "a no ser que ésta esté acondicionada o señalizada para dejarlo a su derecha"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Gira"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   }
  ]
 },
 "A-dir-0008": {
  "tipo": "cruce",
  "antes": "escena",
  "entorno": "campo",
  "titulo": "Carretera fuera de poblado sin carril para girar. Un ciclista (A) quiere girar a la izquierda hacia un camino; por la carretera circulan B y C.",
  "vias": {
   "S": {
    "cerrada": true
   }
  },
  "vehiculos": [
   {
    "letra": "A",
    "tipo": "bici",
    "intermitente": "izquierda",
    "puntos": [
     [
      -200,
      232
     ],
     [
      60,
      232
     ],
     {
      "marca": "cerca"
     },
     [
      150,
      233
     ],
     [
      180,
      238
     ],
     [
      200,
      247
     ],
     [
      212,
      254
     ],
     [
      220,
      258
     ],
     {
      "marca": "fuera"
     },
     [
      220,
      246
     ],
     [
      220,
      160
     ],
     [
      220,
      -200
     ]
    ],
    "inicio": "cerca"
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "lejos"
   },
   {
    "letra": "C",
    "desde": "O",
    "hacia": "E",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "No hay carril para girar a la izquierda: el ciclista (A) se aparta a la derecha, fuera de la calzada.",
    "cita": {
     "norma": "RGC",
     "articulo": "76.2",
     "texto": "deberán situarse a la derecha, fuera de la calzada siempre que sea posible, e iniciarlo desde ese lugar"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fuera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Se aparta"
    },
    "foco": [
     "A"
    ],
    "ms": 3000
   },
   {
    "texto": "Desde allí espera a que pasen B y C.",
    "cita": {
     "norma": "RGC",
     "articulo": "76.2",
     "texto": "deberán situarse a la derecha, fuera de la calzada siempre que sea posible, e iniciarlo desde ese lugar"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "sigue",
      "retraso": 500
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa",
     "C": "Pasa"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2800
   },
   {
    "texto": "Con la carretera libre, cruza recto hacia el camino.",
    "cita": {
     "norma": "RGC",
     "articulo": "76.2",
     "texto": "deberán situarse a la derecha, fuera de la calzada siempre que sea posible, e iniciarlo desde ese lugar"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Cruza"
    },
    "foco": [
     "A"
    ],
    "ms": 2800
   }
  ]
 },
 "A-pri-0007": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Cruce con semáforos. El suyo (A) está en verde, pero al otro lado del cruce hay coches parados.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 201,
    "y": 263,
    "w": 38,
    "h": 5
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 161,
    "y": 132,
    "w": 38,
    "h": 5
   },
   {
    "tipo": "semaforo",
    "id": "s",
    "x": 256,
    "y": 276,
    "color": "verde"
   },
   {
    "tipo": "semaforo",
    "id": "e",
    "x": 278,
    "y": 142,
    "ang": -90,
    "color": "rojo"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "cerca",
    "tu": true
   },
   {
    "letra": "B",
    "puntos": [
     [
      220,
      128
     ],
     [
      220,
      -320
     ]
    ],
    "inicio": 0
   },
   {
    "letra": "C",
    "puntos": [
     [
      220,
      76
     ],
     [
      220,
      -372
     ]
    ],
    "inicio": 0
   },
   {
    "letra": "D",
    "desde": "E",
    "hacia": "O",
    "inicio": "espera"
   }
  ],
  "pasos": [
   {
    "texto": "Su semáforo está en verde, pero al otro lado hay retención: si usted (A) entra, se quedará parado en mitad del cruce.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.1",
     "texto": "Aun cuando goce de prioridad de paso, ningún conductor deberá penetrar con su vehículo en una intersección o en un paso para peatones o para ciclistas si la situación de la circulación es tal que, previsiblemente, pueda quedar detenido de forma que impida u obstruya la circulación transversal"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "No entra",
     "B": "Parado",
     "C": "Parado"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2800
   },
   {
    "texto": "Su semáforo cambia a rojo. Como no ha entrado, el cruce está libre y D puede pasar.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.1",
     "texto": "Aun cuando goce de prioridad de paso, ningún conductor deberá penetrar con su vehículo en una intersección o en un paso para peatones o para ciclistas si la situación de la circulación es tal que, previsiblemente, pueda quedar detenido de forma que impida u obstruya la circulación transversal"
    },
    "mover": [
     {
      "v": "D",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "D": "Pasa"
    },
    "foco": [
     "D"
    ],
    "ms": 2800,
    "semaforos": {
     "s": "rojo",
     "e": "verde"
    }
   },
   {
    "texto": "Cuando vuelve el verde y hay sitio al otro lado, cruza.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.1",
     "texto": "Aun cuando goce de prioridad de paso, ningún conductor deberá penetrar con su vehículo en una intersección o en un paso para peatones o para ciclistas si la situación de la circulación es tal que, previsiblemente, pueda quedar detenido de forma que impida u obstruya la circulación transversal"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2400
     },
     {
      "v": "C",
      "hasta": "fin",
      "modo": "arranca",
      "dura": 2400
     },
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca",
      "retraso": 700,
      "dura": 2400
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 3200,
    "semaforos": {
     "s": "verde",
     "e": "rojo"
    }
   }
  ]
 },
 "x1a-0061": {
  "tipo": "recta",
  "antes": "escena",
  "via": {
   "urbana": true
  },
  "titulo": "Calle con semáforo y, justo después, un paso para peatones. El semáforo de A está en verde; delante hay coches parados.",
  "elementos": [
   {
    "tipo": "cebra",
    "x": 232,
    "ancho": 26,
    "desde": 162,
    "hasta": 240
   },
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 222,
    "y": 201,
    "w": 5,
    "h": 38
   },
   {
    "tipo": "semaforo",
    "id": "s",
    "x": 226,
    "y": 256,
    "ang": 90,
    "color": "verde"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "O",
    "tu": true,
    "marcas": {
     "cerca": 40,
     "linea": 220
    }
   },
   {
    "letra": "B",
    "desde": "O",
    "inicio": "cola",
    "marcas": {
     "cola": 308,
     "avanza": 420
    }
   },
   {
    "letra": "C",
    "desde": "O",
    "inicio": "cola",
    "marcas": {
     "cola": 358,
     "avanza": 470
    }
   }
  ],
  "pasos": [
   {
    "texto": "Semáforo en verde, pero la cola llega casi hasta el paso para peatones: si usted (A) avanza, se quedará parado encima.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.1",
     "texto": "Aun cuando goce de prioridad de paso, ningún conductor deberá penetrar con su vehículo en una intersección o en un paso para peatones o para ciclistas si la situación de la circulación es tal que, previsiblemente, pueda quedar detenido de forma que impida u obstruya la circulación transversal"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "linea",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "No entra",
     "B": "Parado"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2800
   },
   {
    "texto": "Usted espera antes del paso hasta que la cola avanza.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.1",
     "texto": "Aun cuando goce de prioridad de paso, ningún conductor deberá penetrar con su vehículo en una intersección o en un paso para peatones o para ciclistas si la situación de la circulación es tal que, previsiblemente, pueda quedar detenido de forma que impida u obstruya la circulación transversal"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "avanza",
      "modo": "arranca"
     },
     {
      "v": "C",
      "hasta": "avanza",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Espera"
    },
    "foco": [
     "B",
     "C"
    ],
    "ms": 2600
   },
   {
    "texto": "Con sitio para rebasar el paso, sigue.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.1",
     "texto": "Aun cuando goce de prioridad de paso, ningún conductor deberá penetrar con su vehículo en una intersección o en un paso para peatones o para ciclistas si la situación de la circulación es tal que, previsiblemente, pueda quedar detenido de forma que impida u obstruya la circulación transversal"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Pasa"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 },
 "x1a-0062": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Cruce con semáforos. Usted (A) se ha quedado parado dentro del cruce, girando a la izquierda; B espera en la otra vía.",
  "elementos": [
   {
    "tipo": "zona",
    "clase": "pintura",
    "x": 201,
    "y": 263,
    "w": 38,
    "h": 5
   },
   {
    "tipo": "semaforo",
    "id": "s",
    "x": 256,
    "y": 276,
    "color": "verde"
   },
   {
    "tipo": "semaforo",
    "id": "e",
    "x": 278,
    "y": 142,
    "ang": -90,
    "color": "rojo"
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "O",
    "inicio": "dentro",
    "tu": true
   },
   {
    "letra": "B",
    "desde": "E",
    "hacia": "O",
    "inicio": "espera"
   }
  ],
  "pasos": [
   {
    "texto": "Usted (A) se ha quedado parado dentro del cruce y los semáforos cambian: ahora B tiene verde y usted le estorba.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.2",
     "texto": "deberá salir de aquélla sin esperar a que se permita la circulación en la dirección que se propone tomar, siempre que al hacerlo no entorpezca la marcha de los demás usuarios que avancen en el sentido permitido"
    },
    "mover": [],
    "etiquetas": {
     "A": "Estorba",
     "B": "Verde"
    },
    "foco": [
     "A"
    ],
    "ms": 2400,
    "semaforos": {
     "s": "rojo",
     "e": "verde"
    }
   },
   {
    "texto": "No espera a que se abra su dirección: sale del cruce, porque puede hacerlo sin entorpecer a nadie.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.2",
     "texto": "deberá salir de aquélla sin esperar a que se permita la circulación en la dirección que se propone tomar, siempre que al hacerlo no entorpezca la marcha de los demás usuarios que avancen en el sentido permitido"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Sale",
     "B": "Espera"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "Con el cruce libre, B pasa.",
    "cita": {
     "norma": "RGC",
     "articulo": "59.2",
     "texto": "deberá salir de aquélla sin esperar a que se permita la circulación en la dirección que se propone tomar, siempre que al hacerlo no entorpezca la marcha de los demás usuarios que avancen en el sentido permitido"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2400
   }
  ]
 },
 "A-dir-0001": {
  "tipo": "cruce",
  "antes": "escena",
  "titulo": "Cruce con niebla espesa. Usted (A) llega por el sur y querría girar a la izquierda.",
  "elementos": [
   {
    "tipo": "niebla",
    "cx": 220,
    "cy": 300,
    "r": 78
   }
  ],
  "vehiculos": [
   {
    "letra": "A",
    "desde": "S",
    "hacia": "N",
    "inicio": "cerca",
    "tu": true,
    "intermitente": "izquierda"
   },
   {
    "letra": "B",
    "desde": "N",
    "hacia": "S",
    "inicio": "lejos"
   }
  ],
  "pasos": [
   {
    "texto": "Hay niebla espesa: usted (A) quería girar a la izquierda, pero no ve si viene alguien de frente.",
    "cita": {
     "norma": "RGC",
     "articulo": "74.1",
     "texto": "También deberá abstenerse de realizar la maniobra cuando se trate de un cambio de dirección a la izquierda y no exista visibilidad suficiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "espera",
      "modo": "frena"
     }
    ],
    "etiquetas": {
     "A": "Sin visibilidad"
    },
    "foco": [
     "A"
    ],
    "ms": 2600
   },
   {
    "texto": "De la niebla sale B, que viene de frente: girar a la izquierda sin ver habría sido peligroso.",
    "cita": {
     "norma": "RGC",
     "articulo": "74.1",
     "texto": "También deberá abstenerse de realizar la maniobra cuando se trate de un cambio de dirección a la izquierda y no exista visibilidad suficiente"
    },
    "mover": [
     {
      "v": "B",
      "hasta": "fin",
      "modo": "sigue"
     }
    ],
    "etiquetas": {
     "A": "Espera",
     "B": "Pasa"
    },
    "foco": [
     "B"
    ],
    "ms": 2600
   },
   {
    "texto": "Usted se abstiene de girar y sigue recto.",
    "cita": {
     "norma": "RGC",
     "articulo": "74.1",
     "texto": "También deberá abstenerse de realizar la maniobra cuando se trate de un cambio de dirección a la izquierda y no exista visibilidad suficiente"
    },
    "mover": [
     {
      "v": "A",
      "hasta": "fin",
      "modo": "arranca"
     }
    ],
    "etiquetas": {
     "A": "Recto"
    },
    "foco": [
     "A"
    ],
    "ms": 2400
   }
  ]
 }
};

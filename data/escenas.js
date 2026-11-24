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
 }
};

let INDEX_PREGUNTA=0
let puntaje=0
cargarPregunta(INDEX_PREGUNTA);


function cargarPregunta(index){
    objetopregunta = basedejuego[index];
    respuestas = [...objetopregunta.distractores];
    
    respuestas.push(objetopregunta.respuesta);
    for(let i =0; i<4; i++){
        respuestas.sort( ()=>Math.random()- 0.5 );
    }

    document.getElementById("pregunta").innerHTML = objetopregunta.pregunta;
    document.getElementById("imagen").src = objetopregunta.imagen;

    document.getElementById("respuesta1").innerHTML = respuestas[0];
    document.getElementById("respuesta2").innerHTML = respuestas[1];
    document.getElementById("respuesta3").innerHTML = respuestas[2];
    document.getElementById("respuesta4").innerHTML = respuestas[3];
}

async function seleccionarrespuesta(index){
        let validezrespuesta = respuestas[index] == objetopregunta.respuesta
        if (validezrespuesta){
            await Swal.fire({
                title:"Correcto ",
                    text:"La respuesta ha sido correcta",
                    icon: "success",
            })
            puntaje++
        }else{
        await Swal.fire({
            title:"Incorrecto ",
            text: `La respuesta es " ${objetopregunta.respuesta} "`,
            icon: "error",
        });
    }
    INDEX_PREGUNTA++;
    if(INDEX_PREGUNTA>=basedejuego.length){
    
    await Swal.fire({
        title:"Juego Terminado ",
        text: `Tu puntaje fue de: ${puntaje}/${basedejuego.length} puntos`,
        icon: "success",
    });
    INDEX_PREGUNTA=0;
    puntaje=0;
    }
    cargarPregunta(INDEX_PREGUNTA);
    
}

function ayuda() {
    Swal.fire({
        title: "ayuda",
        text: objetopregunta.ayuda,
        imageUrl: objetopregunta.ayudaimg,
        
        imageHeight: 300,
        
      });
}
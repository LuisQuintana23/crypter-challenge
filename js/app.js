
const llaves = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
}

let hayMensaje = false

function normalizar(texto){
    /*
    - convierte todo a minusuculas
    - Elimina acentos y caracteres especiales
    */

    // elimina espacios extremos
    texto = texto.trim()
    // convertir a minusculas
    texto = texto.toLowerCase()
    // quitar acentos
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // eliminar caracteres especiales
    texto = texto.replace(/[^a-zA-Z0-9 ]/g, '')


    return texto
}

function showMensaje(texto){
    if (texto !== ""){ // no hay mensaje
        hideAlertaNoMensaje()

        // establecer mensaje
        let mensajeTag = document.getElementById("mensaje_cifrado")
        mensajeTag.innerText = texto

        let btnCopiar = document.getElementById("btn_copiar")

        let decifradoMensajeContainer = document.getElementById("decifrado_mensaje")
        decifradoMensajeContainer.style.display = "flex"
        decifradoMensajeContainer.style.justifyContent = "space-around"
    }
}

function hideAlertaNoMensaje(){
    /*
    Esconde el muneco
    */

    let ningunMensajeContainer = document.getElementById("ningun_mensaje")
    ningunMensajeContainer.style.display = "none"
}

function encriptar(){


    const input = document.getElementById('input_text')
    let texto = normalizar(input.value)


    let textoEncriptado = ""

    for (let letra of texto){
        // si la letra es parte de las llaves
        let letraIncluir = letra
        if ( Object.keys(llaves).includes(letra) ){
            letraIncluir = llaves[letra]
        }

        textoEncriptado += letraIncluir
    }

    showMensaje(textoEncriptado)
}

function desencriptar(){
    const input = document.getElementById('input_text')
    let textoEncriptado = normalizar(input.value)
    let textoDesencriptado = ""


    for ( let i = 0; i < textoEncriptado.length; i++ ){
        const letra = textoEncriptado.charAt(i)

        if ( Object.keys(llaves).includes(letra) ){
            // recortar el tamano de su valor
            const longitud = llaves[letra].length
            i += longitud - 1 // se saltara los caracteres restantes
        }

        textoDesencriptado += letra

    }

    showMensaje(textoDesencriptado)
}

function copiar(){
    const textoMensaje = document.getElementById("mensaje_cifrado")

    toClipboard(textoMensaje.innerHTML)

}

async function toClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('No se copio en el clipoboard', error);
    }
}
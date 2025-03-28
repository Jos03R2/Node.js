/**
 * Clase Nodo representa un nodo de una lista enlazada.
 */
class Nodo {
    constructor(dato, enlace = null) {
        this.dato = dato;
        this.enlace = enlace;
    }
}


class Lista {
    constructor() {
        this.primero = null;
    }
    insertarCabezaLista(entrada) {
        const nuevo = new Nodo(entrada, this.primero);
        this.primero = nuevo;
    }

    visualizar() {
        let n = this.primero;
        const elementos = [];
        while (n !== null) {
            elementos.push(n.dato);
            n = n.enlace;
        }
        console.log(elementos.join(' '));
    }

    /**
     * Invierte el orden de la lista enlazada.
     */
    invertir() {
        let actual = this.primero;
        let anterior = null;
        let siguiente = null;
        
        while (actual !== null) {
            siguiente = actual.enlace;
            actual.enlace = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.primero = anterior;
        //aca con el invertir va a recorrer la lista una sola vez y ajusta los enlaces
        //la complejidad es O(n) donde n es el numero de nodos
    }


    eliminarDuplicados() {
        let actual = this.primero;
        let valores = new Set();
        let previo = null;
        
        while (actual !== null) {
            if (valores.has(actual.dato)) {
                previo.enlace = actual.enlace;
            } else {
                valores.add(actual.dato);
                previo = actual;
            }
            actual = actual.enlace;
        }
         //el metodo eliminar va a usar un Set para que almacene los valores unicos y recorre la lista una vez.
        //complejida O(n) en promedio pero en el peor caso sin estructura de datos adicional
        //puede ser O(n²).
    }

    obtenerDesdeElFinal(n) {
        let principal = this.primero;
        let referencia = this.primero;
        let contador = 0;

        while (contador < n) {
            if (referencia === null) return null;
            referencia = referencia.enlace;
            contador++;
        }

        while (referencia !== null) {
            principal = principal.enlace;
            referencia = referencia.enlace;
        }
        return principal ? principal.dato : null;       
        //va a usar dos punteros para recorrer la lista una sola vez.
        //Devuelve el n-esimo elemento desde el final de la lista.
        // n - Posicion desde el final.
        //valor del nodo en la posicion especificada o null si no existe.
    }
}


function pruebas() {
    let lista = new Lista();
    console.assert(lista.obtenerDesdeElFinal(1) === null, "Error: la lista vacía debe devolver null");

    lista.insertarCabezaLista(10);
    console.assert(lista.obtenerDesdeElFinal(1) === 10, "Error:la lista con un solo elemento debe devolve 10");
    lista.insertarCabezaLista(20);
    lista.insertarCabezaLista(30);
    console.assert(lista.obtenerDesdeElFinal(2) === 20, " Error:el segundo elemento desde el final debe ser 20");

    lista.invertir();
    console.assert(lista.obtenerDesdeElFinal(1) === 30, "Error:la cabeza debe ser 30 despues de invertir");

    lista.insertarCabezaLista(30);
    lista.insertarCabezaLista(20);
    lista.insertarCabezaLista(10);
    lista.eliminarDuplicados();
    console.assert(lista.obtenerDesdeElFinal(3) === 30, "Error:la lista sin duplicados debe mantener 30");

    console.log("todas las pruebas pasaron correctamente.");
}


pruebas();


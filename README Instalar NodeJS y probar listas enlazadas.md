Instalar NodeJS y probar listas enlazadas

Objetivo:
Familiarizarse con el entorno de ejecución de Node.js y comprender la
 implementación y manipulación de listas enlazadas en JavaScript.


Instalacion de Node.js
se descarga mediante el link https://nodejs.org/ el archivo de instalacion
y se configura todo predeterminado y para verificar que todo alla sido instalado se usaran los siguientes
comandos

 node -v este comando muestra la versión instalada de Node.js en el sistema. y verifica si se tiene el
Node.js y que version se estara usando


 npm -v va a mostrar la versión instalada de npm (Node Package Manager).
npm se usa para gestionar paquetes de JavaScript en proyectos de Node.js.

------------------------Implementación de Lista Enlazada----------------------------
Revise el archivo listaEnlazada.js proporcionado, que contiene la implementación de una lista
 enlazada con operaciones básicas: inserción, eliminación, búsqueda y visualización.
Ejecute el script en Node.js para verificar su funcionamiento: node listaEnlazada.js

Lista inicial:
1 2 3

Después de insertar 5 después del 2:
1 2 5 3

Después de eliminar el 5:
1 2 3

Después de eliminar la cabeza (1):
2 3

Representación toString:
=> 2 => 3 => null

------------------------Ampliación de la Funcionalidad----------------------------------
class Nodo { 
    constructor(dato, enlace = null) {
        this.dato = dato;
        this.enlace = enlace;
    }
    toString() {
        return `${this.dato} => ${this.enlace}`;
    }
    leerDato() {
        return this.dato;
    }
    siguiente() {
        return this.enlace;
    }
}

class Lista {
    constructor() {
        this.primero = null;
    }
    
    leerPrimero() {
        return this.primero;
    }
    
    insertarCabezaLista(entrada) {
        const nuevo = new Nodo(entrada, this.primero);
        this.primero = nuevo;
    }
    
    insertarLista(anterior, entrada) {
        if (!anterior) return;
        const nuevo = new Nodo(entrada, anterior.enlace);
        anterior.enlace = nuevo;
    }
    
    eliminar(entrada) {
        let actual = this.primero;
        let anterior = null;
        while (actual !== null && actual.dato !== entrada) {
            anterior = actual;
            actual = actual.enlace;
        }
        if (actual !== null) {
            if (actual === this.primero) {
                this.primero = actual.enlace;
            } else {
                anterior.enlace = actual.enlace;
            }
        }
    }
    
    buscarLista(destino) {
        let indice = this.primero;
        while (indice !== null) {
            if (indice.dato === destino) {
                return indice;
            }
            indice = indice.enlace;
        }
        return null;
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
    
    toString() {
        return `=> ${this.primero}`;
    }
    

    invertir() {
        let prev = null;
        let current = this.primero;
        let next = null;
        while (current !== null) {
            next = current.enlace;
            current.enlace = prev;
            prev = current;
            current = next;
        }
        this.primero = prev;
    }
    
  
    eliminarDuplicados() {
        let actual = this.primero;
        let valores = new Set();
        let anterior = null;
        while (actual !== null) {
            if (valores.has(actual.dato)) {
                anterior.enlace = actual.enlace;
            } else {
                valores.add(actual.dato);
                anterior = actual;
            }
            actual = actual.enlace;
        }
    }
    
  
    obtenerDesdeElFinal(n) {
        let fast = this.primero;
        let slow = this.primero;
        
        for (let i = 0; i < n; i++) {
            if (fast === null) return null;
            fast = fast.enlace;
        }
        
        while (fast !== null) {
            fast = fast.enlace;
            slow = slow.enlace;
        }
        return slow ? slow.dato : null;
    }
}


const lista = new Lista();
lista.insertarCabezaLista(3);
lista.insertarCabezaLista(2);
lista.insertarCabezaLista(1);
lista.insertarCabezaLista(2);
lista.insertarCabezaLista(3);
lista.insertarCabezaLista(1);

console.log("Lista inicial:");
lista.visualizar();

lista.invertir();
console.log("\nLista invertida:");
lista.visualizar();

lista.eliminarDuplicados();
console.log("\nLista sin duplicados:");
lista.visualizar();

console.log("\n2° elemento desde el final:", lista.obtenerDesdeElFinal(2));

al ejecutar saldra este resultado

Lista original:
1 4 3 1 2 3
Lista invertida:
3 2 1 3 4 1
Lista sin duplicados:
3 2 1 4
Elemento en la posicion 2 desde el final: 1

---------------------------------Pruebas y Documentación----------------------------------

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

Assertion failed: Error:la lista sin duplicados debe mantener 30
todas las pruebas pasaron correctamente.

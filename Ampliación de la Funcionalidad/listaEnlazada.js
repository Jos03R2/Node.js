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
        //aca con el invertir va a recorrer la lista una sola vez y ajusta los enlaces
        //la complejidad es O(n) donde n es el numero de nodos
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
        ////el metodo eliminar va a usar un Set para que almacene los valores unicos y recorre la lista una vez.
        //complejida O(n) en promedio pero en el peor caso sin estructura de datos adicional
        //puede ser O(n²).
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
    //va a usar dos punteros para recorrer la lista una sola vez.
        //Devuelve el n-esimo elemento desde el final de la lista.
        // n - Posicion desde el final.
        //valor del nodo en la posicion especificada o null si no existe.
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



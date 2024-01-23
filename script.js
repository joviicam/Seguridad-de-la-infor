
    var posicionesOcupadas = [];

    function iniciarActividad() {
        // Limpiar posiciones ocupadas al inicio
        posicionesOcupadas = [];

        // Obtener valores del formulario
        var x = document.getElementById("x").value;
        var y = document.getElementById("y").value;
        var tiempo = document.getElementById("tiempo").value;
        var cantidad = document.getElementById("cantidad").value;

        // Crear la matriz
        var matriz = document.getElementById("matriz");
        matriz.innerHTML = "";

        for (var i = 0; i < x; i++) {
            var row = matriz.insertRow(i);
            for (var j = 0; j < y; j++) {
                var cell = row.insertCell(j);
                cell.textContent = i + "," + j;
            }
        }

        // Pintar celdas aleatorias cada cierto tiempo
        setInterval(function () {
            for (var k = 0; k < cantidad; k++) {
                var randomX = Math.floor(Math.random() * x);
                var randomY = Math.floor(Math.random() * y);
                
                // Verificar si la posición ya está ocupada
                if (posicionesOcupadas.includes(randomX + "," + randomY)) {
                    // Limpiar toda la tabla
                    limpiarMatriz(matriz);
                    // Limpiar las posiciones ocupadas
                    posicionesOcupadas = [];
                    break;  // Salir del bucle for si se limpia la tabla
                }

                posicionesOcupadas.push(randomX + "," + randomY);
                matriz.rows[randomX].cells[randomY].style.backgroundColor = "yellow";
            }
        }, tiempo * 1000);
    }

    function limpiarMatriz(matriz) {
        for (var i = 0; i < matriz.rows.length; i++) {
            for (var j = 0; j < matriz.rows[i].cells.length; j++) {
                matriz.rows[i].cells[j].style.backgroundColor = "";
            }
        }
    }


// Obtener todos los alumnos
async function fetchAlumnos() {
    const response = await fetch('http://127.0.0.1:5000/alumnos');
    const alumnos = await response.json();
    const alumnosList = document.getElementById('alumnosList');
    alumnosList.innerHTML = ''; // Limpiar la lista

    alumnos.forEach(alumno => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${alumno.id}</td><td>${alumno.name}</td><td>${alumno.carrera}</td><td>${alumno.edad}</td>`;
        alumnosList.appendChild(row);
    });
}

// Agregar un alumno
async function addAlumno() {
    const name = document.getElementById('name').value;
    const carrera = document.getElementById('carrera').value;
    const edad = document.getElementById('edad').value;

    const response = await fetch('http://127.0.0.1:5000/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, carrera, edad })
    });

    if (response.ok) alert("Alumno agregado exitosamente!");
    fetchAlumnos();
}

// Actualizar un alumno
async function updateAlumno() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const carrera = document.getElementById('updateCarrera').value;
    const edad = document.getElementById('updateEdad').value;

    const response = await fetch(`http://127.0.0.1:5000/alumnos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, carrera, edad })
    });

    if (response.ok) alert("Alumno actualizado exitosamente!");
    fetchAlumnos();
}

// Eliminar un alumno
async function deleteAlumno() {
    const id = document.getElementById('deleteId').value;

    const response = await fetch(`http://127.0.0.1:5000/alumnos/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) alert("Alumno eliminado exitosamente!");
    fetchAlumnos();
}

// Llamar a la función para cargar los alumnos al cargar la página
window.onload = fetchAlumnos;

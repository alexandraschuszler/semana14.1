document.addEventListener('DOMContentLoaded', () => {
    let inputBuscar = document.getElementById('inputBuscar');
   let btnBuscar = document.getElementById('btnBuscar');
    let contenedor = document.getElementById('contenedor');
  
    // Escuchar el evento de clic en el botón de búsqueda
    btnBuscar.addEventListener('click', async () => {
      const query = inputBuscar.value.trim();
      if (!query) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
      }
  
      const apiUrl = `https://images-api.nasa.gov/search?q=${query}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al conectar con la API.');
  
        const data = await response.json();
        const items = data.collection.items;
  
        // Limpiar el contenedor antes de mostrar nuevos resultados
        contenedor.innerHTML = '';
  
        // Verificar si hay resultados
        if (items.length === 0) {
          contenedor.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
          return;
        }
  
        // Generar HTML con los resultados
        items.forEach((item) => {
            const { title, description, date_created } = item.data[0];
            const image = item.links ? item.links[0].href : 'https://via.placeholder.com/150';
          
            const card = `
              <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100 shadow-sm">
                  <img src="${image}" class="card-img-top" alt="${title}">
                  <div class="card-body">
                    <h5 class="card-title text-primary">${title}</h5>
                    <p class="card-text">${description || 'Sin descripción disponible.'}</p>
                  </div>
                  <div class="card-footer text-end">
                    <small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            `;
          
            contenedor.innerHTML += card;
          });
          
      } catch (error) {
        console.error(error);
        contenedor.innerHTML = '<p class="text-center">Ocurrió un error al realizar la búsqueda.</p>';
      }
    });
  });
  
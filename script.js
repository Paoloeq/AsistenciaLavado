const API_URL = "https://script.google.com/macros/s/AKfycbw7UqWOuzJNf1BeEHMi8U3fVjSq2M0U8pnldBd1Cg4LvXpnUDpjgmdQxIfCJWDrJkAvWQ/exec";
    
    async function marcarAsistencia() {
        const nombre = document.getElementById("nombre").value;
        const mensaje = document.getElementById("mensaje");
        const btnMarcar = document.getElementById("btnMarcar");

        if (!nombre) {
            mensaje.textContent = "Por favor selecciona tu nombre.";
            return;
        }

        btnMarcar.disabled = true;
        mensaje.innerHTML = '<span class="loading"></span>Registrando...';

        try {
            const res = await fetch(API_URL, {
              method: "POST",
              body: new URLSearchParams({ nombre })
            });

            const texto = await res.text();
            mensaje.textContent = texto === "Success" ? "¡Asistencia marcada con éxito!" : "Hubo un problema al registrar.";
        } catch (error) {
            mensaje.textContent = "Error de conexión. Por favor intenta nuevamente.";
            console.error(error);
        } finally {
            btnMarcar.disabled = false;
        }
    }

    async function verHistorial() {
      const container = document.getElementById("historialContainer");
      const btnHistorial = document.getElementById("btnHistorial");
      
      btnHistorial.disabled = true;
      container.innerHTML = '<p>Cargando registros...</p>';

      try {
          const response = await fetch(API_URL);
          const data = await response.json();
          
          if (data.length > 0) {
              let html = '<h3>Historial de Asistencias</h3>';
              html += '<table><tr><th>Nombre</th><th>Fecha</th><th>Hora</th></tr>';
              
              data.forEach(registro => {
                  html += `<tr>
                      <td>${registro.nombre}</td>
                      <td>${registro.fecha}</td>
                      <td>${registro.hora}</td>
                  </tr>`;
              });
              
              html += '</table>';
              container.innerHTML = html;
          } else {
              container.innerHTML = '<p>No hay registros de asistencia.</p>';
          }
      } catch (error) {
          container.innerHTML = '<p>Error al cargar los registros.</p>';
          console.error(error);
      } finally {
          btnHistorial.disabled = false;
      }
    }
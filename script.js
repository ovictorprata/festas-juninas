document.addEventListener('DOMContentLoaded', function() {
  const festasContainer = document.getElementById('festas');

      async function carregarFestas() {
        try {
          const response = await fetch('festas.json'); // Carrega o arquivo festas.json
          const festas = await response.json(); // Converte a resposta para JSON
          mostrarFestas(festas); // Exibe as festas na página
        } catch (error) {
          console.error('Erro ao carregar festas.json:', error);
        }
      }

      function mostrarFestas(listaFestas) {
        listaFestas.forEach(festa => {
          const div = document.createElement('div');
          div.classList.add('col-lg-6');
          div.innerHTML = `
              <div class="festa">
                  <h2 class="card-title">${festa.local}</h2>
                  <p><strong>Data:</strong> ${festa.data}</p>
                  <p><strong>⏰</strong> ${festa.horario}</p>
                  <p><strong>Preço:</strong> ${festa.preco}</p>
                  <p><strong>Endereço:</strong> ${festa.endereco}</p>
              </div>
          `;
    //       festasContainer.appendChild(divFesta);
    //       div.innerHTML = `
    //       <div class="festa">
    //       <h2 class="card-title">${festa.local}</h2>
    //       <p><strong>Data:</strong> ${festa.data}</p>
    //       <p><strong>Horário:</strong> ${festa.horario}</p>
    //       <p><strong>Preço:</strong> ${festa.preco}</p>
    //       <p><strong>Endereço:</strong> ${festa.endereco}</p>
    //   </div>
    //       `;
          festasContainer.appendChild(div);
        });
      }


  const filtroDataInput = document.getElementById('filtro-data');
  filtroDataInput.addEventListener('change', function() {
      filtrarFestas();
  });

  const filtroPrecoSlider = document.getElementById('filtro-preco');
  const valorPreco = document.getElementById('valor-preco');

  filtroPrecoSlider.addEventListener('input', function() {
      valorPreco.textContent = `Até R$ ${this.value},00`;
      filtrarFestas();
  });

  function filtrarFestas() {
      const dataSelecionada = filtroDataInput.value;
      const precoMaximo = parseFloat(filtroPrecoSlider.value);

      let festasFiltradas = festas.filter(festa => {
          if (dataSelecionada && festa.data !== dataSelecionada) {
              return false;
          }
        })


      mostrarFestas(festasFiltradas);
  }
  carregarFestas();
});

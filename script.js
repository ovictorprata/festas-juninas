document.addEventListener('DOMContentLoaded', function() {
  const festas = [
      { local: "Parque das Mangabeiras", data: "2024-06-21", horario: "19:00", preco: "Gratuito" },
      { local: "Pampulha", data: "2024-06-22", horario: "20:00", preco: "R$ 20,00" },
      { local: "Savassi", data: "2024-06-23", horario: "18:30", preco: "R$ 15,00" },
      { local: "Lagoa Seca", data: "2024-06-24", horario: "21:00", preco: "Gratuito" }
  ];

  const festasContainer = document.getElementById('festas');

  function mostrarFestas(listaFestas) {
      festasContainer.innerHTML = '';
      listaFestas.forEach(festa => {
          const divFesta = document.createElement('div');
          divFesta.classList.add('col-lg-6');
          divFesta.innerHTML = `
              <div class="festa">
                  <h2 class="card-title">${festa.local}</h2>
                  <p><strong>Data:</strong> ${festa.data}</p>
                  <p><strong>Horário:</strong> ${festa.horario}</p>
                  <p><strong>Preço:</strong> ${festa.preco}</p>
                  <p><strong>Endereço:</strong> ${festa.endereco}</p>
              </div>
          `;
          festasContainer.appendChild(divFesta);
      });
  }

  mostrarFestas(festas);

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

          if (precoMaximo === 30) {
              return true;
          } else if (festa.preco === 'Gratuito') {
              return true;
          } else {
              const precoFesta = parseFloat(festa.preco.replace('R$', '').replace(',', '.'));
              return precoFesta <= precoMaximo;
          }
      });

      mostrarFestas(festasFiltradas);
  }
});

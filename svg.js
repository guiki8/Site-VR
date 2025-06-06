fetch("Glove_icon_better.svg")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("svg-container").innerHTML = data;

    const boxes = document.querySelectorAll(".info-box");

    function hideAllBoxes() {
      boxes.forEach((box) => box.classList.remove("active"));
    }

    const clickMap = {
      ".motor": ".box-motor",
      ".uno": ".box-uno",
      ".finger": ".box-finger",
      ".hand": ".box-hand",
      ".protoboard": ".box-protoboard",
      ".string": ".box-string",
      ".potenciometer": ".box-potenciometer",
      ".controller": ".box-controller",
    };

    for (let selector in clickMap) {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("click", () => {
          hideAllBoxes();

          const box = document.querySelector(clickMap[selector]);
          if (box) {
            box.classList.add("active");
            updateConnectorLines(); // Atualiza a linha após mostrar box
          }
        });
      });
    }

    // POSICIONA OS ELEMENTOS TARGET DE ACORDO COM O SVG
    const targetMap = {
      motor: ".motor",
      uno: ".uno",
      finger: ".finger",
      string: ".string",
      potenciometer: ".potenciometer",
      protoboard: ".protoboard",
      hand: ".hand",
      controller: ".controller"
    };

    function positionTargets() {
      for (const [id, selector] of Object.entries(targetMap)) {
        const svgElement = document.querySelector(selector);
        const targetDiv = document.getElementById(`${id}-target`);

        if (!svgElement || !targetDiv) continue;

        const rect = svgElement.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        targetDiv.style.left = `${centerX - targetDiv.offsetWidth / 2}px`;
        targetDiv.style.top = `${centerY - targetDiv.offsetHeight / 2}px`;
      }
    }

    // Chama após o SVG ser inserido no DOM
    positionTargets();
    updateConnectorLines();

    // Atualiza em redimensionamento
    window.addEventListener('resize', () => {
      positionTargets();
      updateConnectorLines();
    });
  })
  .catch((error) => {
    console.error("Erro ao carregar o SVG:", error);
  });


// Desenha as linhas entre caixas visíveis e seus alvos
function updateConnectorLines() {
  const svg = document.getElementById('connector-svg');
  svg.innerHTML = '';

  const boxes = document.querySelectorAll('.info-box[id]');

  boxes.forEach(box => {
    const style = window.getComputedStyle(box);
    if (style.display === 'none') return;

    const id = box.id;
    const targetId = id + '-target';
    const target = document.getElementById(targetId);
    if (!target) return;

    const boxRect = box.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const x1 = boxRect.right;
    const y1 = boxRect.top + boxRect.height / 1.5;

    const x2 = targetRect.left + targetRect.width / 2;
    const y2 = targetRect.top + targetRect.height / 2;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'cyan');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-opacity', '0.8');
    line.style.filter = 'drop-shadow(0 0 4px cyan)';
    line.style.transition = 'all 0.3s ease';

    svg.appendChild(line);
  });
}

// Garante atualização ao carregar tudo
window.addEventListener('load', updateConnectorLines);
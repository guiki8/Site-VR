fetch("../imagens/Glove_icon_better.svg")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("svg-container").innerHTML = data;

    const infoBoxes = document.querySelectorAll(".info-box");
    const imageBoxes = document.querySelectorAll(".image-box");

    function hideAllBoxes() {
      infoBoxes.forEach((box) => box.classList.remove("active"));
      imageBoxes.forEach((box) => box.classList.remove("active")); // Esconde todas as caixas de imagem
    }

    const clickMap = {
      ".motor": { info: ".box-motor", image: "#motor-image-box" },
      ".uno": { info: ".box-uno", image: "#uno-image-box" },
      ".finger": { info: ".box-finger", image: "#finger-image-box" },
      ".hand": { info: ".box-hand", image: "#hand-image-box" },
      ".protoboard": { info: ".box-protoboard", image: "#protoboard-image-box" },
      ".string": { info: ".box-string", image: "#string-image-box" },
      ".potenciometer": { info: ".box-potenciometer", image: "#potenciometer-image-box" },
      ".controller": { info: ".box-controller", image: "#controller-image-box" },
    };

    for (let selector in clickMap) {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("click", () => {
          hideAllBoxes();

          const infoBox = document.querySelector(clickMap[selector].info);
          if (infoBox) {
            infoBox.classList.add("active");
          }

          const imageBox = document.querySelector(clickMap[selector].image);
          if (imageBox) {
            imageBox.classList.add("active"); // Exibe a caixa de imagem correspondente
          }
          updateConnectorLines(); // Atualiza a linha após mostrar box
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
    const y2 = targetRect.top + targetRect.height / 2 + 150;
  });
}

// Garante atualização ao carregar tudo
window.addEventListener('load', updateConnectorLines);
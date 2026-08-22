// ចាប់យកគ្រប់ខេត្តទាំងអស់នៅលើផែនទី
const provinces = document.querySelectorAll(".province");
const tooltip = document.getElementById("tooltip");

provinces.forEach((province) => {
  // ពេល Mouse ចូលទៅក្នុងខេត្ត
  province.addEventListener("mouseenter", function (e) {
    // ទាញយកទិន្នន័យពី attributes នៃ HTML
    const name = this.getAttribute("data-name");
    const total = this.getAttribute("data-total");
    const male = this.getAttribute("data-male");
    const female = this.getAttribute("data-female");

    // បញ្ចូលទិន្នន័យទៅក្នុង Tooltip ជាមួយការរចនា
    tooltip.innerHTML = `
            <h3>${name}</h3>
            <p><span>សរុប៖</span> <strong>${total}</strong></p>
            <p><span>ប្រុស៖</span> <strong>${male}</strong></p>
            <p><span>ស្រី៖</span> <strong>${female}</strong></p>
        `;

    // បង្ហាញ Tooltip
    tooltip.style.display = "block";
  });

  // ពេល Mouse រំកិលចុះឡើងក្នុងខេត្ត
  province.addEventListener("mousemove", function (e) {
    // ធ្វើឲ្យ Tooltip រត់តាម Mouse ដោយដកឃ្លាបន្តិច (offset) កុំឲ្យបាំង
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });

  // ពេល Mouse ចេញពីខេត្ត
  province.addEventListener("mouseleave", function () {
    // លាក់ Tooltip វិញ
    tooltip.style.display = "none";
  });
});

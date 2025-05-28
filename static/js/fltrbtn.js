document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".fltrbtn");
  const clearbtn = document.getElementById("clearbtn");

  clearbtn.style.display = "none"; 

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = [...btn.classList].filter(c => c !== "fltrbtn");
      
      filterButtons.forEach(compbtn => {
        const compbtnClasses = [...compbtn.classList].filter(c => c !== "fltrbtn");
        const itsamatch = selected.every(c => compbtnClasses.includes(c));
        if (itsamatch) {
          compbtn.classList.toggle("active");
        }
      });

      filterItems();
      toggleclearbtn();
    });
  });

  clearbtn.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    
    filterItems();

    toggleclearbtn();
  });
});

function filterItems() {
  const activeFilters = new Set(); 
  document.querySelectorAll('.fltrbtn.active').forEach(button => {
    [...button.classList].filter(className => className !== 'fltrbtn' && className !== 'category' && className !== 'tag' && className !== 'active')
      .forEach(filterClass => activeFilters.add(filterClass));
  });

  const galleryItems = document.querySelectorAll('.galerieobj');
  galleryItems.forEach(item => {
    const itemClasses = [...item.classList].filter(className => className !== 'galerieobj');
    const matchesFilters = [...activeFilters].every(filter => itemClasses.includes(filter));

    if (matchesFilters || activeFilters.size === 0) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

function toggleclearbtn() {
  const clearbtn = document.getElementById("clearbtn");
  const activeFilters = document.querySelectorAll('.fltrbtn.active').length;

  if (activeFilters > 0) {
    clearbtn.style.display = "inline-block";
  } else {
    clearbtn.style.display = "none";
  }
}
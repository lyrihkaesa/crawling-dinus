async function getData() {
  // const requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
  // const request = new Request(requestURL);

  const response = await fetch("./files/user.json");
  if (response.status !== 200) {
    throw new Error("cannot fetch data");
  }
  const result = await response.json();

  return result;
}

getData()
  .then((result) => {
    const eleUser = document.getElementById("user");
    eleUser.textContent = result.user;

    const eleMatkul = document.getElementById("matkul");
    const matkuls = result.matkuls;
    let aMatkul = ``;
    for (let index = 0; index < matkuls.length; index++) {
      const matkul = matkuls[index];
      const forums = matkul.forums;
      aMatkul += cardMatkul(matkul.category, matkul.shortName, matkul.fullName, forums);
    }
    eleMatkul.innerHTML = aMatkul;
  })
  .catch((error) => {
    console.error(error);
  });

function cardMatkul(category, shortName, fullName, forums, index) {
  let result = "";
  result += `<div class="col-md-3 mb-4">`;
  switch (fullName) {
    case "[20212] ANALISA DAN PERANCANGAN SISTEM ...":
      result += `<div class="card text-white bg-primary text-center">`;
      break;
    case "[20212] INTERAKSI MANUSIA DAN KOMPUTER":
    case "[20212] ETIKA PROFESI":
      result += `<div class="card text-white bg-secondary text-center">`;
      break;
    case "[20212] PEMROGRAMAN BERORIENTASI OBYEK":
      result += `<div class="card text-white bg-dark text-center">`;
      break;
    case "[20212] PEMROGRAMAN WEB":
      result += `<div class="card text-white bg-success text-center">`;
      break;
    case "[20212] PROBABILITAS DAN STATISTIKA":
    case "[20212] Dasar Kewirausahaan":
      result += `<div class="card text-dark bg-light text-center">`;
      break;
    case "[20212] MANAJEMEN RANTAI PASOK":
      result += `<div class="card text-dark bg-warning text-center">`;
      break;
    default:
      result += `<div class="card  text-center">`;
      break;
  }
  result += `<div class="card-header">${category}</div>`;
  result += `<div class="card-body">`;
  result += `<h5 class="card-title">${fullName}</h5>`;
  result += `<p class="card-text">${shortName}</p>`;

  const dataForum = {
    amountUnSubscribe: 0,
  };
  for (let i = 0; i < forums.length; i++) {
    const forum = forums[i];
    const discus = forum.discus;
    if (discus.length >= 1) {
      for (let j = 0; j < discus.length; j++) {
        const discussion = discus[j];
        if (discussion.subscribe == false) {
          result += `<a href="https://kulino.dinus.ac.id/mod/forum/view.php?id=${forum.module}" class="btn btn-danger mx-1">${i + 1}</a>`;
          dataForum.amountUnSubscribe++;
        }
      }
    }
  }

  //   result += `<a href="#" class="btn btn-primary">Go somewhere</a>`;
  result += `</div>`;
  result += `<div class="card-footer">${forums.length} | ${dataForum.amountUnSubscribe}</div>`;
  result += `</div>`;
  result += `</div>`;
  return result;
}

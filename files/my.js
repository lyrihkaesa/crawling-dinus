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

function cardMatkul(category, shortName, fullName, forums) {
  let result = "";
  result += `<div class="card text-center col-md-3 mb-4">`;
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
  result += `<div class="card-footer text-muted">${forums.length} | ${dataForum.amountUnSubscribe}</div>`;
  result += `</div>`;
  return result;
}

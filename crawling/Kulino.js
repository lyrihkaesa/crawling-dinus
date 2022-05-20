import { browsers, pages, waitTillHTMLRendered } from "./ThePuppet.js";

async function kulino(username, password) {
  const browser = await browsers();
  const page = await pages(browser);
  await page.goto("https://kulino.dinus.ac.id");
  await page.type("#inputName", username); // Types instantly
  await page.type("#inputPassword", password); // Types instantly
  await page.click("#submit");
  // await page.waitForSelector(".go-top");
  await waitTillHTMLRendered(page);

  const dataKulino = {};

  const user = await getUser(page);
  dataKulino.user = user;

  const matkuls = await getMatkul(page);
  dataKulino.matkuls = matkuls;

  for (let index = 0; index < dataKulino.matkuls.length; index++) {
    const localIdMatkul = dataKulino.matkuls[index].idMatkul;
    console.log(localIdMatkul);
    const forums = await getForum(page, localIdMatkul);
    dataKulino.matkuls[index].forums = forums;
  }

  await browser.close();
  return dataKulino;
}

async function getUser(page) {
  const result = await page.evaluate(() => {
    return document.querySelector(".usertext").textContent;
  });
  return result;
}

async function getMatkul(page) {
  const result = await page.evaluate(() => {
    const matkuls = [];
    let base = document.querySelectorAll("#inst10 .dashboard-card .course-info-container");
    for (let index = 0; index < base.length; index++) {
      let matkul = {};
      const element = base[index];
      matkul.category = element.children[0].children[0].children[0].children[1].textContent.trim();
      matkul.shortName = element.children[0].children[0].children[0].children[4].textContent.trim();
      matkul.fullName = element.children[0].children[0].children[1].children[2].textContent.trim();
      matkul.idMatkul = element.children[0].children[0].children[1].children[0].getAttribute("data-course-id");
      matkuls.push(matkul);
    }
    return matkuls;
  });
  return result;
}

async function getForum(page, idMatkul) {
  console.info("Load Forum");
  await waitTillHTMLRendered(page);
  await page.goto(`https://kulino.dinus.ac.id/course/view.php?id=${idMatkul}`);
  const result = await page.evaluate(() => {
    const forums = [];
    const base = document.querySelectorAll(".modtype_forum");
    for (let index = 0; index < base.length; index++) {
      const forum = {};
      const element = base[index];
      forum.name = element.children[0].children[0].children[1].children[0].textContent.trim();
      forum.module = element.id.substring(7);
      if (element.children[0].children[0].children[1].children.length > 1) {
        forum.isRestricted = true;
        forum.msgRestricted = element.children[0].children[0].children[1].children[1].textContent.trim();
      } else {
        forum.isRestricted = false;
        forum.msgRestricted = "Tidak Ketat (Restrict)";
      }
      forums.push(forum);
    }
    return forums;
  });
  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    if (!element.isRestricted) {
      element.discus = await getDiscus(page, element.module);
    } else {
      element.discus = [];
    }
  }
  return result;
}

async function getDiscus(page, module) {
  console.info("Load Discus");
  // await waitTillHTMLRendered(page);
  await page.goto(`https://kulino.dinus.ac.id/mod/forum/view.php?id=${module}`);
  const result = await page.evaluate(() => {
    const discus = [];
    const base = document.querySelectorAll(".discussion");
    if (base != null) {
      for (let index = 0; index < base.length; index++) {
        const discussion = {};
        const element = base[index];
        discussion.name = element.children[1].children[0].children[0].textContent.trim();
        discussion.subscribe = element.classList.contains("subscribed");
        discus.push(discussion);
      }
    }
    return discus;
  });
  return result;
}

export { kulino };

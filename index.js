import { kulino } from "./crawling/Kulino.js";
import { userFarhan } from "./config.js";
import { writeFileSync } from "fs";

await kulinoSinkronDatas(userFarhan.username, userFarhan.password);

async function kulinoSinkronDatas(username, password) {
  const theDatas = await kulino(username, password);

  try {
    writeFileSync(`files/${username}.json`, JSON.stringify(theDatas, null, 2), "utf8");
    console.log("Data successfully saved to disk");
    return "Successfully";
  } catch (error) {
    console.log("An error has occurred ", error);
    return "error" + error;
  }
}

export { kulinoSinkronDatas };

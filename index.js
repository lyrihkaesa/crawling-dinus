import { kulino } from "./crawling/Kulino.js";
import { userFarhan } from "./config.js";
import { writeFileSync } from "fs";

const theDatas = await kulino(userFarhan.username, userFarhan.password);

try {
  writeFileSync("files/user.json", JSON.stringify(theDatas, null, 2), "utf8");
  console.log("Data successfully saved to disk");
} catch (error) {
  console.log("An error has occurred ", error);
}

import { utils, writeFile } from "xlsx";

// const data = [
//   {
//     firstName: "John",
//     lastName: "Doe",
//   },
//   {
//     firstName: "Smith",
//     lastName: "Peters",
//   },
//   {
//     firstName: "Lol",
//     lastName: "Lee",
//   },
// ];

function jsonToXLSX(data, nameFile) {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Responses");
  writeFile(wb, `./files/${nameFile}.xlsx`);
}

// jsonToXLSX(data, "coba");

export { jsonToXLSX };

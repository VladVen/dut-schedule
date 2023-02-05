import * as cheerio from "cheerio";

export const selectDepartment = async function () {
  try {
    let response = await fetch(
      "https://e-rozklad.dut.edu.ua/timeTable/teacher"
    );
    let parsed = await response.text();
    let cheer = cheerio.load(parsed);
    let department = [];

    for (
      let number = 2;
      null !==
      cheer(`.chosen-select:nth-child(2) > option:nth-child(${number})`).html();
      number++
    ) {
      let name = cheer(
        `.chosen-select:nth-child(2) > option:nth-child(${number})`
      ).html();
      let value = cheer(
        `.chosen-select:nth-child(2) > option:nth-child(${number})`
      ).val();
      department = [...department, { name, value }];
    }

    return department;
  } catch (e) {
    throw e;
  }
};

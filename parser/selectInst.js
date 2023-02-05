import * as cheerio from "cheerio";

export const selectInst = async function () {
  try {
    let response = await fetch("https://e-rozklad.dut.edu.ua/timeTable/group");
    let parsed = await response.text();
    let cheer = cheerio.load(parsed);
    let inst = [];

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
      inst = [...inst, { name, value }];
    }
    return inst;
  } catch (e) {
    throw e;
  }
};

import * as cheerio from "cheerio";
import {categoryType} from "./getSchedule";

export const selectDepartment = async (category: categoryType) =>  {
  try {
    const response = await fetch(
      `https://e-rozklad.dut.edu.ua/timeTable/${category}`
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

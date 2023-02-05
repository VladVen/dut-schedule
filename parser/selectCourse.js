import * as cheerio from "cheerio";

export const selectCourse = async (val) => {
  try {
    let response = await fetch(
      `https://e-rozklad.dut.edu.ua/timeTable/group?TimeTableForm[faculty]=${val}`
    );
    let parsedPage = await response.text();
    let cheer = cheerio.load(parsedPage);
    let course = [];
    for (
      let number = 2;
      null !==
      cheer(
        `.span2:nth-child(2) > select > option:nth-child(${number})`
      ).html();
      number++
    ) {
      let name = cheer(
        `.span2:nth-child(2) > select > option:nth-child(${number})`
      ).html();
      let value = cheer(
        `.span2:nth-child(2) > select > option:nth-child(${number})`
      ).val();
      course = [...course, { name, value }];
    }
    return course;
  } catch (e) {
    throw e;
  }
};

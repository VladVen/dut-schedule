import * as cheerio from "cheerio";

export const getSchedTeacher = async (id, parsedDate1, parsedDate2) => {
  try {
    let response = await fetch(
      `https://e-rozklad.dut.edu.ua/timeTable/teacher?TimeTableForm[teacher]=${id}&TimeTableForm[date1]=${parsedDate1}&TimeTableForm[date2]=${parsedDate2}`
    );
    let parsedPage = await response.text();
    let cheer = cheerio.load(parsedPage);

    let dateOfParas = (number) => {
      let date = cheer(
        `#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(1)`
      ).html();
      let day = {
        date: date,
        info: [],
      };
      for (
        let i = 2;
        null !==
        cheer(
          `#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(${i})`
        ).html();
        i++
      ) {
        let time = `${cheer(
          `#timeTableGroup > tbody > tr:nth-child(${number}) > td:first-child > div:nth-child(${i})> .start`
        ).html()} - ${cheer(
          `#timeTableGroup > tbody > tr:nth-child(${number}) > td:first-child > div:nth-child(${i})> .finish`
        ).html()}`;
        let info = {
          subject: cheer(
            `#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(${i})`
          ).data().content,
          time: time,
        };
        day.info = [...day.info, info];
      }
      return day;
    };

    let weekSchedule = [];
    for (let i = 1; i !== 8; i++) {
      weekSchedule.push(dateOfParas(i));
    }

    return weekSchedule;
  } catch (e) {
    throw e;
  }
};

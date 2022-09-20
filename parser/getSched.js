import * as cheerio from "cheerio";


export const getSched = async (group ) => {
    let response = await fetch(`https://e-rozklad.dut.edu.ua/timeTable/group?TimeTableForm[group]=${group}&TimeTableForm[date1]=12.09.2022&TimeTableForm[date2]=18.09.2022`)
    let parsedPage = await response.text()
    let cheer = cheerio.load(parsedPage)

    let dateOfParas = (number) => {
        let date = cheer(`#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(1)`).html()
        let day = {
            date: date,
            info: []
        }
        for(let i = 2; null !== cheer(`#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(${i})`).html(); i++ ) {
            debugger
            let info = {
                subject: cheer(`#timeTableGroup > tbody > tr:nth-child(${number}) > td:nth-child(2) > div:nth-child(${i})`).data().content,
                time: cheer(`#timeTableGroup > tbody > tr:nth-child(${number}) > td:first-child > div:nth-child(${i})> .start`).html()
            }
            day.info = [...day.info, info]
        }
        return day
    }

    let weekSchedule = []
    for(let i = 1; i !== 8; i++) {
        weekSchedule.push(dateOfParas(i))
    }

    return weekSchedule
}

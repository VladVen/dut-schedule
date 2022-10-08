import * as cheerio from 'cheerio';



export const selectTeacher =  async (val) => {
    try {
        let response = await fetch(`https://e-rozklad.dut.edu.ua/timeTable/teacher?TimeTableForm[chair]=${val}`)
        let parsedPage = await response.text()
        let cheer = cheerio.load(parsedPage)
        let teacher = []
        for (let number = 2; null !== cheer(`.span2:nth-child(2) > select > option:nth-child(${number})`).html(); number++) {
            let name = cheer(`.span2:nth-child(2) > select > option:nth-child(${number})`).html()
            let value = cheer(`.span2:nth-child(2) > select > option:nth-child(${number})`).val()
            teacher = [...teacher, {name, value}]
        }
        return teacher
    } catch (e) {
        throw e
    }

}


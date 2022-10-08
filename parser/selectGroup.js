import * as cheerio from 'cheerio';


export const selectGroup = async (inst, course) => {
    try {
        let response = await fetch(`https://e-rozklad.dut.edu.ua/timeTable/group?TimeTableForm[faculty]=${inst}&TimeTableForm[course]=${course}`)
        let parsedPage = await response.text()
        let cheer = cheerio.load(parsedPage)
        let group = []
        for ( let number = 2 ; null !== cheer(`.span2:nth-child(3) > select > option:nth-child(${number})`).html(); number++) {
            let name =  cheer(`.span2:nth-child(3) > select > option:nth-child(${number})`).html()
            let value =  cheer(`.span2:nth-child(3) > select > option:nth-child(${number})`).val()
            group = [...group, {name, value}]
        }
        return group
    } catch (e) {
        throw e
    }

}
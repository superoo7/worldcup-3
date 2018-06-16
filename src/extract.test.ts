import { findRes, eachCountryFilter, extractBody, removeDecoration } from './extract'
// import { readFile } from '.'

describe('extract string', () => {
  it('finds result for reverse string', () => {
    let res1 = findRes('| t', true)
    let res2 = findRes('| w', true)
    let res3 = findRes('| l', true)
    expect(res1).toEqual('t')
    expect(res2).toEqual('w')
    expect(res3).toEqual('l')
  })

  it('finds result for string', () => {
    let res1 = findRes('| t w')
    let res2 = findRes('| w l')
    let res3 = findRes('| l t')
    expect(res1).toEqual('t')
    expect(res2).toEqual('w')
    expect(res3).toEqual('l')
  })

  it('filters each country', () => {
    let res1 = eachCountryFilter('t | italy v australia | t', 'italy', 'australia')
    let res2 = eachCountryFilter('w | italy v australia | l', 'italy', 'australia')
    let res3 = eachCountryFilter('l | italy v australia | w', 'italy', 'australia')

    expect(res1.match).toEqual('t')
    expect(res2.match).toEqual('w')
    expect(res3.match).toEqual('l')
  })

  // it('extract match condition', async () => {
  //   let file = await readFile() // get from sample.json
  //   let res1 = extractBody(file[1].body.toLowerCase())
  //   let res2 = extractBody(file[0].body.toLowerCase())
  // })

  it('remove decoration like bold and table', () => {
    let res1 = removeDecoration('**germany: **')
    let res2 = removeDecoration('<table>test test</table>')
    let res3 = removeDecoration(test)
    console.log(res3)

    expect(res1).toBe('germany: ')
    expect(res2).toBe(' test test ')
  })
})

let test = `
<TABLE BORDER="1">
<TR>
<TD><b>Score</b></TD>
<TD><b>Team</b></TD>
<TD></TD>
<TD><b>Team</b></TD>
<TD><b>Score</b></TD>
</TR>
<TR>
<TD>W</TD><TD>Russia</TD>
<TD>vs</TD>
<TD>Saudi Arabia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Egypt</TD>
<TD>vs</TD>
<TD>Uruguay</TD>
<TD>W</TD>
</TR>
<TR>
<TD>T</TD>
<TD>Morocco </TD>
<TD>vs</TD>
<TD>Iran</TD>
<TD>T</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Portugal</TD>
<TD>vs</TD>
<TD>Spain</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>France</TD>
<TD>vs</TD>
<TD>Australia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Argentina</TD>
<TD>vs</TD>
<TD>Iceland</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Peru</TD>
<TD>vs</TD>
<TD>Denmark</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Croatia</TD>
<TD>vs</TD>
<TD>Nigeria</TD>
<TD>L</TD>
</TR>
<TR>
<TD>T</TD>
<TD>Costa Rica</TD>
<TD>vs</TD>
<TD>Serbia</TD>
<TD>T</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Germany</TD>
<TD>vs</TD>
<TD>Mexico</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Brazil</TD>
<TD>vs</TD>
<TD>Switzerland</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Sweden</TD>
<TD>vs</TD>
<TD>South Korea</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Belgium</TD>
<TD>vs</TD>
<TD>Panama</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Tunisia</TD>
<TD>vs</TD>
<TD>England</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Poland</TD>
<TD>vs</TD>
<TD>Senegal</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Colombia</TD>
<TD>vs</TD>
<TD>Japan</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Russia</TD>
<TD>vs</TD>
<TD>Egypt</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Portugal</TD>
<TD>vs</TD>
<TD>Morocco</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Uruguay</TD>
<TD>vs</TD>
<TD>Saudi Arabia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Iran</TD>
<TD>vs</TD>
<TD>Spain</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>France</TD>
<TD>vs</TD>
<TD>Peru</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Denmark</TD>
<TD>vs</TD>
<TD>Australia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Argentina</TD>
<TD>vs</TD>
<TD>Croatia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Brazil</TD>
<TD>vs</TD>
<TD>Costa Rica</TD>
<TD>L</TD>
</TR>
<TR>
<TD>T</TD>
<TD>Nigeria</TD>
<TD>vs</TD>
<TD>Iceland</TD>
<TD>T</TD>
</TR>
<TR>
<TD>T</TD>
<TD>Serbia</TD>
<TD>vs</TD>
<TD>Switzerland</TD>
<TD>T</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Belgium</TD>
<TD>vs</TD>
<TD>Tunisia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Germany</TD>
<TD>vs</TD>
<TD>Sweden</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>South Korea</TD>
<TD>vs</TD>
<TD>Mexico</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>England</TD>
<TD>vs</TD>
<TD>Panama</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Japan</TD>
<TD>vs</TD>
<TD>Senegal</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Poland</TD>
<TD>vs</TD>
<TD>Colombia</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Uruguay</TD>
<TD>vs</TD>
<TD>Russia</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Saudi Arabia</TD>
<TD>vs</TD>
<TD>Egypt</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Spain</TD>
<TD>vs</TD>
<TD>Morocco</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Iran</TD>
<TD>vs</TD>
<TD>Portugal</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Denmark</TD>
<TD>vs</TD>
<TD>France</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Australia</TD>
<TD>vs</TD>
<TD>Peru</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Nigeria</TD>
<TD>vs</TD>
<TD>Argentina</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Iceland</TD>
<TD>vs</TD>
<TD>Croatia</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>South Korea</TD>
<TD>vs</TD>
<TD>Germany</TD>
<TD>W</TD>
</TR>
<TR>
<TD>T</TD>
<TD>Mexico</TD>
<TD>vs</TD>
<TD>Sweden</TD>
<TD>T</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Serbia</TD>
<TD>vs</TD>
<TD>Brazil</TD>
<TD>W</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Switzerland</TD>
<TD>vs</TD>
<TD>Costa Rica</TD>
<TD>L</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Japan</TD>
<TD>vs</TD>
<TD>Poland</TD>
<TD>W</TD>
</TR>
<TR>
<TD>L</TD>
<TD>Senegal</TD>
<TD>vs</TD>
<TD>Colombia</TD>
<TD>W</TD>
</TR>
<TR>
<TD>T</TD>
<TD>England</TD>
<TD>vs</TD>
<TD>Belgium</TD>
<TD>T</TD>
</TR>
<TR>
<TD>W</TD>
<TD>Panama</TD>
<TD>vs</TD>
<TD>Tunisia</TD>
<TD>L</TD>
</TR>
</TABLE>`

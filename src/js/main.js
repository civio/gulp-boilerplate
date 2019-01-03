import {mean} from 'd3-array'
import {nest} from 'd3-collection'
import {csv} from 'd3-fetch'
import {timeFormat, timeParse,} from 'd3-time-format'
import AreaChart from './components/areaChart'
import LineChart from './components/lineChart'

const dataUrl = 'https://gist.githubusercontent.com/rauldiazpoblete/d6d880f0fc16c8bf16af9bf58af9db91/raw/0ec229e88ee46808ae1ff02e0c8ee7fd3f858f8a/precio-electricidad-medio-horario.csv'
//const dataUrl = 'https://data.civio.es/elboenuestrodecadadia/butano-precio/butano-precio.csv'

const formatDate = timeFormat('%Y-%m-%d')
const parseDate = timeParse('%Y-%m-%d')

const chart = new AreaChart('#chart', {
  heightRatio: 9/16,
  margin: {
    top: 10,
    right: 12,
    bottom: 20,
    left: 30
  }
})

// load data
csv(dataUrl).then((data) => {

  // format 
  const dataMonth = nest()
    .key(d => d.datetime.split('-').slice(0,-1).join('-'))
    .rollup((d) => mean(d, (d) => +d.value))
    .entries(data)

  chart
    .setup(dataMonth.map(({key, value}) => ({date: parseDate(key+'-01'), value}))) //data.map(({datetime, value}) => ({date: parseDate(datetime), value: +value})))
  
  /*
  // Setup custom y axis values
  chart.axisRendererY.tickValues([12, 14, 16])
  // Setup custom x axis format
  chart.axisRendererX
    .tickFormat(timeFormat('%Y'))
    .ticks(timeYear)
  */

  chart.render()
})

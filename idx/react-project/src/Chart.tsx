import { Link } from 'react-router'

const Chart = () => {
  const chartData = {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Fruit Consumption'
    },
    xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
        title: {
            text: 'Fruit eaten'
        }
    },
    series: [{
        name: 'Jane',
        data: [1, 0, 4]
    }, {
        name: 'John',
        data: [5, 7, 3]
    }]
}
  return (
    <section className='p-5 '>
      <h2 className='text-2xl'>Chart: </h2>
      <Link to={`/`} className='text-[14px] text-red-500' >Back to Dashboard</Link>
      <div className='grid grid-cols-2 gap-5'>
        <div className='p-5'>Chart</div>
        <div className='p-5'>ChartForm</div>
      </div>      
    </section>
  )
}

export default Chart

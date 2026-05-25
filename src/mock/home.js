import Mock from 'mockjs'

let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          Apple:    Mock.Random.float(100, 8000, 0, 0),
          Samsung:  Mock.Random.float(100, 8000, 0, 0),
          Google:   Mock.Random.float(100, 8000, 0, 0),
          Motorola: Mock.Random.float(100, 8000, 0, 0),
          OnePlus:  Mock.Random.float(100, 8000, 0, 0),
          Sony:     Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        videoData: [
          { name: 'Apple',    value: 5999 },
          { name: 'Samsung',  value: 4500 },
          { name: 'Google',   value: 3200 },
          { name: 'Motorola', value: 1800 },
          { name: 'OnePlus',  value: 1500 },
          { name: 'Sony',     value: 2200 }
        ],
        userData: [
          { date: 'Mon', new: 5,  active: 200 },
          { date: 'Tue', new: 10, active: 500 },
          { date: 'Wed', new: 12, active: 550 },
          { date: 'Thu', new: 60, active: 800 },
          { date: 'Fri', new: 65, active: 550 },
          { date: 'Sat', new: 53, active: 770 },
          { date: 'Sun', new: 33, active: 170 }
        ],
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
        },
        tableData: [
          { name: 'Apple',    todayBuy: 800,  monthBuy: 4500, totalBuy: 65000 },
          { name: 'Samsung',  todayBuy: 600,  monthBuy: 3800, totalBuy: 48000 },
          { name: 'Google',   todayBuy: 420,  monthBuy: 2900, totalBuy: 31000 },
          { name: 'Motorola', todayBuy: 250,  monthBuy: 1700, totalBuy: 18000 },
          { name: 'OnePlus',  todayBuy: 180,  monthBuy: 1200, totalBuy: 12000 },
          { name: 'Sony',     todayBuy: 310,  monthBuy: 2100, totalBuy: 22000 }
        ]
      }
    }
  }
}

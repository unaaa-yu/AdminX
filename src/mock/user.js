import Mock from 'mockjs'

function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) return {}
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

// 70% Canadian · 20% US · 10% worldwide
const addresses = [
  // Canada (14)
  'Toronto, ON, Canada',
  'Vancouver, BC, Canada',
  'Montreal, QC, Canada',
  'Calgary, AB, Canada',
  'Ottawa, ON, Canada',
  'Edmonton, AB, Canada',
  'Winnipeg, MB, Canada',
  'Quebec City, QC, Canada',
  'Hamilton, ON, Canada',
  'Kitchener, ON, Canada',
  'London, ON, Canada',
  'Halifax, NS, Canada',
  'Saskatoon, SK, Canada',
  'Victoria, BC, Canada',
  // United States (4)
  'New York, NY, USA',
  'Los Angeles, CA, USA',
  'Chicago, IL, USA',
  'Seattle, WA, USA',
  // Worldwide (2)
  'London, England, UK',
  'Sydney, NSW, Australia',
]

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.name(),
      'addr|1': addresses,
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}

export default {
  getUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return { code: 20000, count: mockList.length, list: pageList }
  },
  createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    List.unshift({ id: Mock.Random.guid(), name, addr, age, birth, sex })
    return { code: 20000, data: { message: 'Added successfully' } }
  },
  deleteUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) return { code: -999, message: 'Invalid parameters' }
    List = List.filter(u => u.id !== id)
    return { code: 20000, message: 'Deleted successfully' }
  },
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return { code: 20000, data: { message: 'Batch deleted successfully' } }
  },
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name; u.addr = addr; u.age = age
        u.birth = birth; u.sex = sex_num
        return true
      }
    })
    return { code: 20000, data: { message: 'Updated successfully' } }
  }
}

import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'
import permissionApi from './permission'

Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/deleteUser/, 'post', userApi.deleteUser)
Mock.mock(/user\/editUser/, 'put', userApi.updateUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
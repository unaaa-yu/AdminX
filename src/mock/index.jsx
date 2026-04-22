import Mock from 'mockjs'
import homeApi from './home'

Mock.mock(/home\/getData/, homeApi.getStatisticalData)
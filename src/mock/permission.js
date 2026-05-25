import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: 'Home',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/mall',
              name: 'mall',
              label: 'Products',
              icon: 'video-play',
              url: 'mall/index'
            },
            {
              path: '/user',
              name: 'user',
              label: 'Users',
              icon: 'user',
              url: 'User/index'
            },
            {
              label: 'Other',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: 'Page 1',
                  icon: 'setting',
                  url: 'other/pageOne'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: 'Page 2',
                  icon: 'setting',
                  url: 'other/pageTwo'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: 'Success'
        }
      }
    } else if (username === 'jessica' && password === 'jessica') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: 'Home',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: 'Products',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: 'Success'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: 'Incorrect username or password'
        }
      }
    }
  }
}

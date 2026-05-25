export default [
    {
        path: '/home',
        name: 'home',
        label: 'Home',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: 'Products',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: 'Users',
        icon: 'UserOutlined',
        url: '/user/index'
    },
    {
        path: '/other',
        label: 'Other',
        icon: 'SettingOutlined',
        children: [
            {
                path: '/other/pageone',
                name: 'page1',
                label: 'Page 1',
                icon: 'SettingOutlined'
            },
            {
                path: '/other/pagetwo',
                name: 'page2',
                label: 'Page 2',
                icon: 'SettingOutlined'
            }
        ]
    }
]



module.exports = {

    base: '',

    account: {
        username: 'admin',
        password: '123abc'
    },
    
    qcloud: {
        scope: [{
            action: 'name/cos:PutObject',
            bucket: '',
            region: 'ap-beijing',
            prefix: '*'
        }],
        secretId: '',
        secretKey: ''
    }
}
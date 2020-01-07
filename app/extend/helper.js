'use strict';

const NodeRSA = require('node-rsa');
const jwtCoder = require('jwt-simple');
const dayjs = require('dayjs');
const STS = require('qcloud-cos-sts');

module.exports = {

    async fetchCosCredential() {

        const { scope, secretId, secretKey } = this.config.qcloud;

        return new Promise(resolve => {

            const policy = STS.getPolicy(scope);
            STS.getCredential({ secretId, secretKey, policy }, function(err, credential) {
                if (err) {
                    console.log(err);
                    resolve(null);
                } else {
                    resolve(credential);
                }
            });
        })
    },

    /**
     * 创建Jwt
     */
    createJwt(payload) {
        const { secret, expires } = this.config.jwt;
        payload.exp = dayjs().add(expires, 'days').valueOf();
        return jwtCoder.encode(payload, secret);
    },

    /**
     * RSA解密
    */
    decryptRSA(encryption, privateToken) {

        try {
            const privateKey = new NodeRSA(privateToken, 'private');
            privateKey.setOptions({ encryptionScheme: 'pkcs1' });
            return privateKey.decrypt(encryption, 'utf8');
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }

}
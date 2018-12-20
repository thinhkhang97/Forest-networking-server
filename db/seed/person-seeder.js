import person from '../models/person';
import fs from 'fs';

const people = [
    new person({
        username: 'Anonymous',
        avatar: {
            data: fs.readFileSync('./db/seed/avatar.png'),
            contentType: 'image/png'
        },
        _id: 'GASKH5T53W3CGU4XQZ2XEOAKZOXIX3HHAER4DUC3HQH6RXMCNXXCBNXS',
        balance: 10000000,
        posts: [
            {
                content: 'This is the first post',
                comment: [
                    {
                        publicKey: 'GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO',
                        cmtcontent: 'Great !!!'
                    },
                    {
                        publicKey: 'GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO',
                        cmtcontent: 'Thats wonderful !!!'
                    }
                ],
                shareWith: [
                    {
                        publicKey: 'GDNL34FUNIGL7PO26H2O3SXXTAE2BLPJBYDRD6HNHYEYPYCBHW5M6IRO',
                    },
                    {
                        publicKey: 'GBHE24WVKFLUA77IBCMYFHSCEZ6PIVIGE2VYGUBIGAWQ3THZXF2PWMFJ',
                    },
                ],
                following: [],
                follwers: []
            }
        ]
    })
]

export default people;
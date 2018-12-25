import {getAccountInfo, getSomeUser} from '../db/fn/account';
import {sendResponse} from './index';

export async function getAccount(req, res) {
    const accountInfo = await getAccountInfo(req.params.publicKey);
    if(accountInfo === null) {
        return sendResponse(res,204,'false','Couldnt find this user in database');
    } else {
        return sendResponse(res,200,'ok','Found the user',accountInfo);
    }
}

export async function getSomeAccount(req, res) {
    console.log('In get some user', req.params.page, req.params.perpage);
    const page = parseInt(req.params.page);
    const perpage = parseInt(req.params.perpage);
    const users = await getSomeUser(page, perpage);
    if(users === null) {
        return sendResponse(res,204,'false','Couldnt find any users in database');
    } else {
        return sendResponse(res,200,'ok','Found the user',users);
    }
}
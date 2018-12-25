import {getNewFeed} from '../db/fn/newsfeed';
import {sendResponse} from './index';

export async function getAllNewFeed(req, res) {
    const page = parseInt(req.params.page);
    const perpage = parseInt(req.params.perpage);
    // console.log('Page:', req.params.page, 'perpage:', req.params.perpage);
    const allNewFeed = await getNewFeed(page, perpage);
    if(allNewFeed === null) {
        return sendResponse(res,204,'false','Couldnt find data of newsfeed');
    } else {
        return sendResponse(res,200,'ok','Get all newsfeed',allNewFeed);
    }
}
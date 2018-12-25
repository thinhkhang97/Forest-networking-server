import system from '../models/system';
import {initAccount} from './account';
export async function getHeight() {
    let height = -1;
    const query = system.findOne({
        type: 'height'
    })
    const s = await query.exec();
    if(s!=undefined)
        height = s.height
    return height;
} 

export async function updateHeight(Height) {
    const query = system.updateOne({
        type: 'height'
    },{
        height: Height
    })
    await query.exec();
}

export async function initSystem() {
    // create user master
    await initAccount('GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7');
    const s = new system({
        type: 'height',
        height: 0
    });
    await s.save();
}
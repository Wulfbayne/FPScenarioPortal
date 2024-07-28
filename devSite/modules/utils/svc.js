import $ from 'jquery';
import {DateTime} from 'luxon';

export const generateID = () =>{
    return id = DateTime.local().toMillis();
}
/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary= require("../errors/asyncErrorBoundary")

//middleware
function hasFirst(req, res, next){
  const {data: {first_name}={}}= req.body;
  if(first_name){
    res.locals.first=first_name;
    return next();
  }else{
    next({
      status: 400,
      message: `Must include first name`
    });
  }
}

function hasLast(req, res, next){
  const {data: {last_name}={}}= req.body;
  if(last_name){
    res.locals.last=last_name;
    return next();
  }else{
    next({
      status: 400,
      message: `Must include last name`
    });
  }
}

function hasMobile(req, res, next){
  const {data: {mobile_number}={}}= req.body;
  if(mobile_number){
    res.locals.mobile=mobile_number;
    return next();
  }else{
    next({
      status: 400,
      message: `Must include mobile number`
    });
  }
}

async function hasDate(req, res, next){
  const {data: {reservation_date}={}}= req.body;
  if(reservation_date){
    res.locals.date=reservation_date;
    return next();
  }else{
    next({
      status: 400,
      message: `Must include date`
    });
  }
}

function hasTime(req, res, next){
  const {data: {reservation_time}={}}= req.body;
  if(reservation_time){
    res.locals.time=reservation_time;
    return next();
  }else{
    next({
      status: 400,
      message: `Must include time`
    });
  }
}

// function formatOffset(date){
//   let offset= date.getTimezoneOffset()/60;
//   offset = Math.abs(offset)>9 ? (`${offset}`) : (`0${offset}`)
//   offset = Number(offset)>=0 ? (`+${offset}`) :(`${offset}`);
//   return offset;
// }

function dateTimeValidation(req, res, next){
  const errors=[];
  const {date, time}= res.locals;
  const rightNow= new Date();
  
  //get reservation as date object by parsing the information
  const [year, month, day]= date.split("-");
  const [hours, minutes]= time.split(":");
  const resDate= new Date(Number(year), Number(month)-1, Number(day), Number(hours), Number(minutes), 0);

  //convert to miliseconds
  const nowMili= rightNow.valueOf();
  const resMili= resDate.valueOf();

  //find the day of the week
  const weekday= resDate.getDay();

  //compare reservation time to opening and closing/lastcall hours
  const resTime= Number(hours)*60 + Number(minutes);
  const opening= 10*60 +30;
  const closing= 21*60 +30;

  if(resMili<nowMili){
    errors.push("Reservation is in the past.");
  }if(weekday==2){
    errors.push("We are are closed Tuesdays.");
  }if(resTime<opening || resTime>closing){
    errors.push("Restuarant is unable to take reservations before 10:30am and after 9:30pm.");
  }if(errors[0]){
    res.locals.errors=errors;
    next({
      status: 400,
      message: `${errors}`});
  }else{
    return next();
  }
}

function hasPeople(req, res, next){
  const {data: {people}={}}= req.body;
  if(people){
    res.locals.people=people;
    const reservation= res.locals;
    res.locals.reservation= reservation;
    return next();
  }else{
    next({
      status: 400,
      message: `Must include people`
    });
  }
}

//VERBS
async function list(req, res) {
  const {date}=req.query;
  let data;
  if(date){
    console.log(date);
    data= await service.listByDate(date);
  }else{
    data = await service.list();
  }
  
  res.status(200).json({data});
}

async function create(req, res){
  const {first, last, mobile, date, time, people}= res.locals;
  const reservation={
    first_name: first,
    last_name: last,
    mobile_number: mobile,
    reservation_date: date,
    reservation_time: time,
    people: people
  };
  const data = await service.create(reservation);
  res.status(201).json({data});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasFirst, hasLast, hasMobile, hasDate, hasTime, dateTimeValidation, hasPeople, asyncErrorBoundary(create)]
};

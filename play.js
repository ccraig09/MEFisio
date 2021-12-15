let slots = [
  {
    slot: "9:00am a 10:00am",
    isReserved: false,
  },
  {
    slot: "10:00am a 11:00am",
    isReserved: false,
  },
  { slot: "11:00am a 12:00pm", isReserved: false },
  {
    slot: "15:00pm a 16:00pm",
    isReserved: false,
  },
  {
    slot: "17:00pm a 18:00pm",
    isReserved: false,
  },
  {
    slot: "18:00pm a 19:00pm",
    isReserved: false,
  },
  { slot: "19:00pm a 20:00pm", isReserved: false },
];

const test = [
  {
    slot: "9:00am a 10:00am",
    isReserved: true,
  },
  {
    slot: "10:00am a 11:00am",
    isReserved: false,
  },
  { slot: "11:00am a 12:00pm", isReserved: false },
  {
    slot: "15:00pm a 16:00pm",
    isReserved: true,
  },
];
let cars = [
  {
    color: "purple",
    type: "minivan",
    registration: new Date("2017-01-03"),
    capacity: 7,
  },
  {
    color: "red",
    type: "station wagon",
    registration: new Date("2018-03-03"),
    capacity: 5,
  },
];

// test.map((x) => {
//   let index = slots.findIndex((d) => d.slot === x.slot);
//   slots[index] = x;
// });

let carsProperties = cars.map((car) => {
  let properties = {
    // capacity: car.capacity,
    // size: "large",
  };
  if (car.capacity <= 5) {
    properties["size"] = "medium";
  }
  // if (car.capacity <= 3) {
  //   properties["size"] = "small";
  // }
  return properties;
});

// cars.forEach((car) => {
//   car["size"] = "large";
//   if (car.capacity <= 5) {
//     car["size"] = "medium";
//   }
//   if (car.capacity <= 3) {
//     car["size"] = "small";
//   }
// });
const nextDate = [
  "2021-06-28",
  "2021-06-29",
  "2021-07-04",
  "2021-07-5",
  "2021-09-06",
  "2021-08-05",
];

let mark = {};

nextDate.forEach((day) => {
  mark[day] = {
    marked: true,
  };
});
console.log(mark);

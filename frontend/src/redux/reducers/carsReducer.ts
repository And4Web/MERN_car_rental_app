const initialData = {
  cars: [
    {
      name: "Mahindra XUV 700",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
      rentPerHour: 799
    },
    {
      name: "Tata Safari",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/138895/safari-facelift-exterior-right-front-three-quarter-39.jpeg?isig=0&q=80",
      rentPerHour: 899
    },
    {
      name: "Tata Nexon",
      image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80",
      rentPerHour: 599
    },
    {
      name: "Maruti Ertiga",
      image: "https://imgd.aeplcdn.com/1056x594/n/c6es93a_1572125.jpg?q=80",
      rentPerHour: 699
    },
    {
      name: "Tata Tiago",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40453/tiago-ev-exterior-right-front-three-quarter-11.jpeg?isig=0&q=80",
      rentPerHour: 499
    },
    {
      name: "Tata Altroz",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/32597/tata-altroz-right-front-three-quarter20.jpeg?q=80",
      rentPerHour: 599
    },
    {
      name: "Mahindra Scorpio",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/128413/scorpio-exterior-right-front-three-quarter-47.jpeg?isig=0&q=80",
      rentPerHour: 699
    },
    {
      name: "Mahindra Scorpio-N",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg?isig=0&q=80",
      rentPerHour: 799
    }
  ]
}

export const carsReducer = (state = initialData, action)=>{
  switch(action.type){
    case "GET_ALL_CARS":
      return {
        ...state,
        cars: action.payload
      }
    default:
      return state;
  }
}
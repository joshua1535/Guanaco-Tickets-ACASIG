const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#9cdbff",
        "teal": "#2ce4e7",
        "dark-blue": "#0F131F",
        "Orange": "#DD8E0A",
        "darkless-blue" : "#333F51", 
    },
    width: {
      "1/7": "14.2857143%",
      "2/7": "28.5714286%",
      "3/7": "42.8571429%",
      "4/7": "57.1428571%",
      "5/7": "71.4285714%",
      "6/7": "85.7142857%",
      "CarouselItemPC-1920*1080": "1750px",
      "CarouselItemPC-1600*900": "1250px",
      "CarouselItemPC-1366*768": "1000px",
      "CarouselItemPC-1280*720": "900px",
      "CarouselItemPC-1024*768": "800px",
      "CarouselItemPC-800*600": "600px",
      "CarouselItemPC-640*480": "400px",
      "CarouselItemPC-320*240": "200px",
      "CarouselItemMobile-390*844": "300px",
      "CarouselItemMobile-280": "200px",
      "ButtonCarouselPC-1920*1080": "200px",
      "ButtonCarouselPC-1600*900": "150px",
      "ButtonCarouselPC-1366*768": "145px",
      "ButtonCarouselPC-1280*720": "144px",
      "ButtonCarouselPC-1024*768": "140px",
      "ButtonCarouselPC-800*600": "135px",
      "ButtonCarouselPC-640*480": "120px",
      "ButtonCarouselPC-320*240": "115px",
      "ButtonCarouselMobile-390*844": "100px",
      "ButtonCarouselMobile-280":"80px",
      "ButtonViewMoreEventsPC-1920*1080": "200px",
      "ButtonViewMoreEventsPC-1600*900": "200px",
      "ButtonViewMoreEventsPC-1366*768": "150px",
      "ButtonViewMoreEventsPC-1280*720": "130px",
      "ButtonViewMoreEventsPC-1024*768": "110px",
      "ButtonViewMoreEventsPC-800*600": "100px",
      "ButtonViewMoreEventsPC-640*480": "80px",
      "ButtonViewMoreEventsPC-320*240": "60px",
      "ButtonViewMoreEventsMobile-390*844": "70px",
      "ButtonViewMoreEventsMobile-280":"65px",
      "CardTicketImgPC-1920*1080": "210px",
      "CardTicketImgPC-1600*900": "190px",
      "CardTicketImgPC-1366*768": "180px",
      "CardTicketImgPC-1280*720": "170px",
      "CardTicketImgPC-800*600": "170px",
      "CardTicketImgPC-640*480": "150px",
      "CardTicketImgPC-320*240": "100px",
      "CardTicketImgMobile-390*844": "70px",
      "CardTicketImgMobile-280":"65px",
      "CardTicketContainerPC-1920*1080": "400px",
      "CardTicketContainerPC-1600*900": "350px",
      "CardTicketContainerPC-1366*768": "300px",
      "CardTicketContainerPC-1280*720": "275px",
      "CardTicketContainerPC-800*600": "275px",
      "CardTicketContainerPC-640*480": "275px",
      "CardTicketContainerPC-320*240": "175px",
      "CardTicketContainerMobile-390*844": "275px",
      "CardTicketContainerMobile-280":"100px",
      "CardGeneralContainerPC-1920*1080": "1750px",
      "CardGeneralContainerPC-1600*900": "1500px",
      "CardGeneralContainerPC-1366*768": "1250px",
      "CardGeneralContainerPC-1280*720": "1000px",
      "CardGeneralContainerPC-800*600": "640px",
      "CardGeneralContainerPC-640*480": "475px",
      "CardGeneralContainerPC-320*240": "400px",
      "CardGeneralContainerMobile-390*844": "275px",
      "CardGeneralContainerMobile-280":"170px",
    },
    height: {
      "1/7": "14.2857143%",
      "2/7": "28.5714286%",
      "3/7": "42.8571429%",
      "4/7": "57.1428571%",
      "5/7": "71.4285714%",
      "6/7": "85.7142857%",
      "CarouselItemPC-1920*1080": "700px",
      "CarouselItemPC-1600*900": "650px",
      "CarouselItemPC-1366*768": "600px",
      "CarouselItemPC-1280*720": "550px",
      "CarouselItemPC-1024*768": "500px",
      "CarouselItemPC-800*600": "400px",
      "CarouselItemPC-640*480": "300px",
      "CarouselItemPC-320*240": "200px",
      "CarouselItemMobile-390*844": "250px",
      "CarouselItemMobile-280": "200px",
      "ButtonCarouselPC-1920*1080": "50px",
      "ButtonCarouselPC-1600*900": "40px",
      "ButtonCarouselPC-1366*768": "35px",
      "ButtonCarouselPC-1280*720": "32px",
      "ButtonCarouselPC-1024*768": "30px",
      "ButtonCarouselPC-800*600": "28px",
      "ButtonCarouselPC-640*480": "25px",
      "ButtonCarouselMobile-390*844": "25px",
      "ButtonCarouselMobile-280":"25px",
      "BackgroundContainerCarouselPC-1920*1080": "10%",
      "BackgroundContainerCarouselPC-1600*900": "11%",
      "BackgroundContainerCarouselPC-1366*768": "12%",
      "BackgroundContainerCarouselPC-1280*720": "13%",
      "BackgroundContainerCarouselPC-1024*768": "14%",
      "BackgroundContainerCarouselPC-800*600": "15%",
      "BackgroundContainerCarouselPC-640*480": "16%",
      "BackgroundContainerCarouselMobile-390*844": "20%",
      "BackgroundContainerCarouselMobile-280": "20%",
      "ButtonViewMoreEventsPC-1920*1080": "50px",
      "ButtonViewMoreEventsPC-1600*900": "40px",
      "ButtonViewMoreEventsPC-1366*768": "35px",
      "ButtonViewMoreEventsPC-1280*720": "32px",
      "ButtonViewMoreEventsPC-1024*768": "30px",
      "ButtonViewMoreEventsPC-800*600": "28px",
      "ButtonViewMoreEventsPC-640*480": "25px",
      "ButtonViewMoreEventsMobile-390*844": "25px",
      "ButtonViewMoreEventsMobile-280":"25px",
      "CardTicketImgPC-1920*1080": "270px",
      "CardTicketImgPC-1600*900": "250px",
      "CardTicketImgPC-1366*768": "230px",
      "CardTicketImgPC-1280*720": "210px",
      "CardTicketImgPC-800*600": "195px",
      "CardTicketImgPC-640*480": "190px",
      "CardTicketImgPC-320*240": "130px",
      "CardTicketImgMobile-390*844": "130px",
      "CardTicketImgMobile-280":"130px",
      "CardTicketContainerPC-1920*1080": "625px",
      "CardTicketContainerPC-1600*900": "610px",
      "CardTicketContainerPC-1366*768": "600px",
      "CardTicketContainerPC-1280*720": "550px",
      "CardTicketContainerPC-800*600": "500px",
      "CardTicketContainerPC-640*480": "475px",
      "CardTicketContainerMobile-390*844": "475px",
      "CardTicketContainerMobile-280":"425px",
      "CardGeneralContainerPC-1920*1080": "400px",
      "CardGeneralContainerPC-1600*900": "350px",
      "CardGeneralContainerPC-1366*768": "300px",
      "CardGeneralContainerPC-1280*720": "275px",
      "CardGeneralContainerPC-800*600": "265px",
      "CardGeneralContainerPC-640*480": "220px",
      "CardGeneralContainerMobile-390*844": "300px",
      "CardGeneralContainerMobile-280":"450px",
  },
  screens: {
    "PC-1920*1080": {'min': '1800px', 'max': '2000px'},
    "PC-1600*900": {'min': '1600px', 'max': '1800px'},
    "PC-1366*768": {'min': '1000px', 'max': '1600px'},
    "PC-1280*720": {'min': '1000px', 'max': '1280px'},
    "PC-800*600": {'min': '640px', 'max': '1000px'},
    "PC-640*480": {'min': '500px', 'max': '640px'},
    "Mobile-390*844": {'min': '300px', 'max': '500px'},
    "Mobile-280": {'min': '200px', 'max': '300px'},
  },
  fontSize : {
    "ButtonCarouselPC-1920*1080": "50px",
    "ButtonCarouselPC-1600*900": "45px",
    "ButtonCarouselPC-1366*768": "40px",
    "ButtonCarouselPC-1280*720": "35px",
    "ButtonCarouselPC-1024*768": "30px",
    "ButtonCarouselPC-800*600": "25px",
    "ButtonCarouselPC-640*480": "10px",
    "ButtonCarouselMobile-390*844": "10px",
    "ButtonCarouselMobile-280":"8px",
    "2.5xl" : "2.1rem",
    "9xl" : "10rem",
    "8xl" : "9rem",
    "7xl" : "8rem",
    "6xl" : "6rem",
    "5xl" : "5rem",
    "4xl" : "4rem",
    "3xl" : "3rem",
  },
  backgroundImage: {
    'background-image': "url('src/assets/backgroundWave.png')",
  },
  fontFamily: {
    'sans': ['Roboto', 'sans-serif'],
    'serif': ['Roboto', 'serif'],
    'mono': ['Roboto', 'monospace'],
    'display': ['Roboto', 'sans-serif'],
    'body': ['Roboto', 'sans-serif'],
    'text': ['PoppinsLight', 'PoppinsLight'],
},
    },
  plugins: [],
}
});

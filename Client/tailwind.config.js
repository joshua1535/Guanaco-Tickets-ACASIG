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
      "ButtonCarouselPC-320*240": "10px",
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
      "ButtonViewMoreEventsPC-320*240": "10px",
      "ButtonViewMoreEventsMobile-390*844": "25px",
      "ButtonViewMoreEventsMobile-280":"25px",
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
  }
},
  plugins: [],
}
});

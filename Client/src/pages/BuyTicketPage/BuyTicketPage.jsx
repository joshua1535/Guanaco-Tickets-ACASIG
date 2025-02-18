import React, { useState, useEffect } from "react";
import "./BuyTicketPage.module.css";
import logo from "../../assets/logo.png";
import classes from "./BuyTicketPage.module.css";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars2Icon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useUserContext } from "../../Context/userContext";
import { eventService } from "../../Services/eventService";
import { tierService } from "../../Services/tierService";
import { orderService } from "../../Services/orderService";
import { ticketService } from "../../Services/ticketService";

import { Toaster, toast } from "sonner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { or } from "fp-ts/lib/Predicate";
import Footer from '../../Components/Footer';
import Header from "../../Components/Header/Header";

const DropBoxContainer = ({ tier, onSelectTier }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleDecrease = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  useEffect(() => {
    onSelectTier(tier, selectedQuantity);
  }, [selectedQuantity, tier]);

  return (
    <div className={[classes["dropboxContainer"]]}>
      <button
        className="mr-4 text-white font-bold bg-red-500 rounded-full w-8 h-8 mt-auto
      PC-800*600:w-5 PC-800*600:h-5 PC-800*600:mr-2
      PC-640*480:w-6 PC-640*480:h-6 PC-640*480:mr-2
      Mobile-390*844:w-7 Mobile-390*844:h-7
      Mobile-280:w-6 Mobile-280:h-6
      "
        onClick={handleDecrease}
      >
        -
      </button>
      <span className="text-white font-bold w-auto h-auto mt-auto mb-auto">
        {selectedQuantity}
      </span>
      <button
        className="ml-4 text-white font-bold bg-green-500 rounded-full w-8 h-8
      PC-800*600:w-5 PC-800*600:h-5 PC-800*600:ml-2
      PC-640*480:w-5 PC-640*480:h-5 PC-640*480:ml-2
      Mobile-390*844:w-7 Mobile-390*844:h-7
      Mobile-280:w-6 Mobile-280:h-6
      "
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

const BuyTicket = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [activeButton, setActiveButton] = useState(1);
  const { user, token } = useUserContext();
  const { code } = useParams(); // Obtiene el código de la URL
  const [event, setEvent] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [moreLowTier, setMoreLowTier] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [tiersToBuy, setTiersToBuy] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // Nuevo estado para mostrar el video
  const [showWeather, setShowWeather] = useState(false);
  const [finalTiers, setFinalTiers] = useState([]);
  const [eventCapacity, setEventCapacity] = useState(0);
  const [eventRemainingCapacity, setEventRemainingCapacity] = useState(0);
  const [demoLink, setDemoLink] = useState("");
  // Nuevo estado para almacenar el pronóstico del clima
  const [weatherForecast, setWeatherForecast] = useState(null);
  // Nuevo estado para almacenar la imagen del clima
  const [climateImage, setClimateImage] = useState("");


  const handleSelectTier = (tier, quantity) => {
    setTiersToBuy((prevTiers) => {
      const existingTier = prevTiers.find((t) => t.name === tier.name);
      if (quantity > 0) {
        if (existingTier) {
          // Si el tier ya existe en la lista, se actualiza la cantidad
          return prevTiers.map((t) =>
            t.name === tier.name ? { ...t, quantity } : t
          );
        } else {
          // Si el tier no existe en la lista, se agrega
          return [...prevTiers, { id: tier.code, name: tier.name, quantity }];
        }
      } else {
        // Si la cantidad es 0, se elimina el tier de la lista
        return prevTiers.filter((t) => t.name !== tier.name);
      }
    });
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    setShowDetails(true);
    setShowVideo(false); // Asegurarse de que el video no se muestre
    setShowBuy(false); // Asegurarse de que los detalles de compra no se 
    setShowWeather(false); // Asegurarse de que el clima no se muestre
  };

  const handleButtonClick2 = () => {
    setShowDetails(false);
    setShowVideo(false); // Asegurarse de que el video no se muestre
    setShowBuy(true);
    setShowWeather(false); // Asegurarse de que el clima no se muestre
  };

  const handleButtonClick3 = (demoLink) => {
    const videoId = demoLink.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    const embedLink = ampersandPosition !== -1
      ? `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`
      : `https://www.youtube.com/embed/${videoId}`;
    setDemoLink(embedLink);
    setShowVideo(true);
    setShowBuy(false); // Asegurarse de que los detalles de compra no se muestren
    setShowDetails(false); // Asegurarse de que los detalles no se muestren
    setShowWeather(false); // Asegurarse de que el clima
  };

  const handleShowWeather = () => {
    //getWeatherForecastForEvent(); 
    setShowWeather(true); // Asegurarse de que el clima se muestre
    setShowDetails(false);
    setShowVideo(false); // Asegurarse de que el video no se muestre
    setShowBuy(false);
  };


  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (token) {
      eventService.getEventById(code, token).then((event) => setEvent(event));

      eventService.getEventById(code, token).then((event) => {
        setEvent(event);
        if (event?.eventLocation?.latitude && event?.eventLocation?.longitude) {
          fetchWeatherForecast(event.eventLocation.latitude, event.eventLocation.longitude);
        }
      });

      tierService
        .getTiersbyEvent(code, token)
        .then((tiers) => setTiers(tiers.tiers));

      tierService
        .getTiersbyEvent(code, token)
        .then((tiers) => setEventCapacity(tiers.eventCapacity));

      tierService
        .getTiersbyEvent(code, token)
        .then((tiers) =>
          setEventRemainingCapacity(tiers.eventRemainingCapacity)
        );
    }
  }, [token, code]);

  useEffect(() => {
    if (tiers.length > 0) {
      //Setear el tier con el precio mas bajo
      const moreLowTier = tiers.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      );
      setMoreLowTier(moreLowTier);
    }
  }, [moreLowTier, tiers]);

  useEffect(() => {
    console.log(tiersToBuy);
  }, [selectedTiers, selectedQuantity, tiersToBuy]);

  const handleBuyTicket = async () => {
    if (tiersToBuy.length > 0 && token) {
      // Obtener fecha actual en formato YYYY-MM-DD
      const date = new Date();
      const currentDate = date.toISOString().split("T")[0];

      try {
        // Crear la orden
        const order = await orderService.createOrder(token, currentDate);
        setOrderId(order);

        // Crear los tickets
        const finalTiers = tiersToBuy.flatMap((tier) =>
          Array.from({ length: tier.quantity }, () => ({
            order: order,
            tier: tier.id,
          }))
        );

        // Enviar la solicitud POST para comprar los tickets
        const orderResponse = await ticketService.createTicket(
          finalTiers,
          token
        );

        if (orderResponse) {
          toast.success("Tickets comprados exitosamente", {
            duration: 5000,
            icon: <CheckCircleIcon style={{ color: "green" }} />,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error comprando los tickets:", error);

        toast.error("Error comprando los tickets", {
          duration: 5000,
          icon: <XCircleIcon style={{ color: "red" }} />,
          position: "top-right",
        });
      }
    }
  };

  useEffect(() => {
    console.log(eventCapacity);
    console.log(eventRemainingCapacity);
  }, [eventCapacity, eventRemainingCapacity]);

  const fetchWeatherForecast = async (lat, lon) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}&units=metric&lang=sp`);
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }
      const data = await response.json();
      if (data && data.list) {
        setWeatherForecast(data);
      } else {
        throw new Error('Invalid weather data');
      }
    } catch (error) {
      console.error('Failed to fetch weather forecast:', error);
      setWeatherForecast(null); // Set to null to handle errors gracefully
    }
  };

  const updateClimateImage = (weatherMain) => {
    switch (weatherMain) {
      case "Thunderstorm":
        setClimateImage("https://static.scientificamerican.com/sciam/cache/file/144E974E-8AF8-4E08-9D4D8B2C8F5CDC14_source.jpg?w=1200");
        break;
      case "Drizzle":
        setClimateImage("https://cdn.windy.app/site-storage/posts/October2023/nature-grass-snow-fog-mist-morning-41797-pxhere.com.jpg");
        break;
      case "Rain":
        setClimateImage("https://cdn.britannica.com/65/123865-050-687A9E4C/Rain.jpg");
        break;
      case "Mist":
        setClimateImage("https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/foggy-morning-in-a-meadow.jpg");
        break;
      case "Dust":
        setClimateImage("https://images.nationalgeographic.org/image/upload/v1638886115/EducationHub/photos/dust-clouds-in-the-central-valley.jpg ");
        break;
      case "Fog":
        setClimateImage("https://www.cincinnati.com/gcdn/authoring/authoring-images/2024/01/25/PCIN/72350905007-fog-1.JPG?crop=3968,2233,x0,y188");
        break;
      case "Clear":
        setClimateImage("https://mrwallpaper.com/images/hd/clear-sky-with-wispy-clouds-zycncm0xf02v4a8i.jpg");
        break;
      case "Clouds":
        setClimateImage("https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL0hvdy1DbG91ZHMtV29yay5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ==");
        break;
      default:
        setClimateImage("https://www.sunheron.com/static/17c2f00a8be8c9914d1269c00d1f7841/d5217/san-salvador-147254882.jpg");
    }
  };



  const getWeatherForecastForEvent = () => {
    if (!event || !weatherForecast || !weatherForecast.list) {
      return "Espera a que el evento esté a 5 días de su realización para que te podamos dar un pronóstico más preciso :c";
    }

    const eventDateTime = new Date(`${event.date}T${event.time}`);
    let closestForecast = null;
    let minDiff = Infinity;

    weatherForecast.list.forEach(forecast => {
      const forecastDateTime = new Date(forecast.dt_txt);
      const diff = Math.abs(eventDateTime - forecastDateTime);

      if (diff < minDiff) {
        minDiff = diff;
        closestForecast = forecast;
      }
    });

    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
    if (minDiff <= fiveDaysInMs) {
      return `El clima será ${closestForecast.weather[0].description}, con una temperatura de ${closestForecast.main.temp}°C`;
    } else {
      return "Espera a que el evento esté a 5 días de su realización para que te podamos dar un pronóstico más preciso :c";
    }
  };

  useEffect(() => {
    if (weatherForecast && weatherForecast.list && event) {
      const eventDateTime = new Date(`${event.date}T${event.time}`);
      let closestForecast = null;
      let minDiff = Infinity;
  
      weatherForecast.list.forEach(forecast => {
        const forecastDateTime = new Date(forecast.dt_txt);
        const diff = Math.abs(eventDateTime - forecastDateTime);
  
        if (diff < minDiff) {
          minDiff = diff;
          closestForecast = forecast;
        }
      });
  
      const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;
      if (minDiff <= fiveDaysInMs) {
        updateClimateImage(closestForecast.weather[0].main);
      }
    }
  }, [weatherForecast, event]);
  


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-between min-h-screen
      Mobile-280:flex-col Mobile-280:justify-start
      Mobile-390*844:flex-col Mobile-390*844:justify-start
      ">
        <Header darkMode={true} />
        <div className={[classes["generalContainer"]]}>
          <div className="flex w-4/5 h-full overflow-auto">
            <div className="flex flex-col h-full justify-center m-auto overflow-hidden">
              <img
                className={[classes["imgContainer"]]}
                src={event?.image}
                alt="Event"
              />
              <Typography
                className={[classes["titleContainer"]]}
                color="white"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {event?.title}
              </Typography>
              <Typography
                className={[classes["capacityContainer"]]}
                color="white"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {eventRemainingCapacity} boletos disponibles
              </Typography>
            </div>
            <div className={[classes["infoContainer"]]}>
              <div className={[classes["topbuttonsContainer"]]}>
                <button
                  onClick={handleButtonClick2}
                  className={`PC
                    PC-800*600:text-base PC-1280*720:text-xl PC-800*600:w-1/2
                    PC-640*480:text-xs PC-640*480:w-1/2  
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${showBuy === true &&
                      showDetails === false &&
                      showVideo === false
                      ? "bg-Orange text-blue-900"
                      : "bg-dark-blue text-white hover:bg-orange-600"
                    }`}
                  style={{ fontFamily: "Poppins" }}
                >
                  COMPRAR
                </button>
                <button
                  onClick={handleButtonClick}
                  className={`
                    PC-1280*720:text-base PC-800*600:text-sm  PC-800*600:w-1/2
                    PC-640*480:text-sm PC-640*480:w-1/2  PC-640*480:text-center 
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${showDetails === true
                      ? "bg-Orange text-blue-900 "
                      : "bg-dark-blue text-white hover:bg-orange-600"
                    }
                      text-blue-900 `}
                  style={{ fontFamily: "Poppins" }}
                >
                  DETALLES
                </button>
                <button
                  onClick={() => handleButtonClick3(event?.demo)}
                  className={`
                    PC-1280*720:text-base PC-800*600:text-sm  PC-800*600:w-1/2
                    PC-640*480:text-sm PC-640*480:w-1/2  PC-640*480:text-center 
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${showVideo === true
                      ? "bg-Orange text-blue-900 "
                      : "bg-dark-blue text-white hover:bg-orange-600"
                    }
                      text-blue-900 `}
                  style={{ fontFamily: "Poppins" }}
                >
                  VIDEO
                </button>
                <button
                  onClick={handleShowWeather}
                  className={`
                    PC-1280*720:text-base PC-800*600:text-sm  PC-800*600:w-1/2
                    PC-640*480:text-sm PC-640*480:w-1/2  PC-640*480:text-center 
                    sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${showWeather === true
                      ? "bg-Orange text-blue-900 "
                      : "bg-dark-blue text-white hover:bg-orange-600"
                    }
                      text-blue-900 `}
                  style={{ fontFamily: "Poppins" }}
                >
                  CLIMA
                </button>
              </div>

              {
                showWeather && (
                  <div className="mt-4">
                    <p className={[classes["pData"]]}>
                      <span className={[classes["titleSpan"]]}>Clima esperado: </span>
                      <span className={[classes["contentSpan"]]}>
                        {getWeatherForecastForEvent()}
                      </span>
                    </p>
                    <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                      <img src={climateImage} alt="Weather condition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                )
              }

              {showDetails && (
                <div className="mt-4">
                  <h1 className={[classes["titleH1"]]}>{event?.title}</h1>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Fecha: </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.date}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Hora: </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.time}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>
                      Participantes:{" "}
                    </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.involvedPeople}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>
                      Patrocinadores:{" "}
                    </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.sponsors}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Categoría: </span>
                    <span className={[classes["contentSpan"]]}>
                      {event?.category.name}
                    </span>
                  </p>
                  <p className={[classes["pData"]]}>
                    <span className={[classes["titleSpan"]]}>Capacidad: </span>
                    <span className={[classes["contentSpan"]]}>
                      {eventCapacity} entradas
                    </span>
                  </p>
                </div>
              )}

              {showVideo && event?.demo && (
                <div className="mt-4">
                  <iframe
                    width="560"
                    height="315"
                    src={demoLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {!showDetails && !showVideo && !showWeather && (
                <>
                  <div className="grid grid-cols-2">
                    {tiers.map((tier) => (
                      <div
                        className=" 
                          PC-1280*720:ml-3 PC-1280*720:mt-3
                          PC-800*600:ml-3 PC-800*600:mt-2  
                          PC-640*480:ml-1 PC-640*480:mt-2
                          flex items-center w-fit text-Orange ml-14 mt-7"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <div>
                          <h2 className={[classes["ticketText"]]}>
                            {tier?.name}
                          </h2>
                          <p className={[classes["ticketPrice2"]]}>
                            Precio:{" "}
                            <span className={[classes["ticketPrice"]]}>
                              ${tier.price}
                            </span>
                          </p>
                        </div>
                        <div className="PC-640*480:ml-1 ml-3">
                          <DropBoxContainer
                            tier={tier}
                            onSelectTier={handleSelectTier}
                          />
                          <p className={[classes["ticketPrice2"]]}>
                            restantes: {tier.remainingCapacity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className={[classes["botbuttonsContainer"]]}>
                <button
                  onClick={handleBuyTicket}
                  className=" 
                    PC-1280*720:w-32 C-1280*720:h-12 
                    PC-800*600:w-24 PC-800*600:h-10 
                    PC-640*480:w-20 PC-640*480:h-7 
                    bg-Orange   h-14 w-44 rounded-full text-white hover:bg-orange-600"
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden flex flex-col items-center h-72 w-full bg-cover ">
          <div className="flex flex-col items-center  text-white rounded">
            <img
              className=" w-full h-full object-cover mb-6 opacity-10 shadow-xl"
              src={event?.image}
              alt="Event"
            />
            <img
              className=" w-5/6 h-full object-cover mb-6 -mt-96 shadow-xl"
              src={event?.image}
              alt="Event"
            />
          </div>

          <h1
            className="text-white  text-center text-2xl mt-8"
            style={{ fontFamily: "PoppinsSemiBold" }}
          >
            {event?.title}
          </h1>

          <div className="flex flex-col items-center text-white p-4 rounded mt-4">
            <p className="text-base">
              <span className="ml-2" style={{ fontFamily: "PoppinsLight" }}>
                {" "}
                Categoría:{" "}
              </span>
              <span
                className="font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {event?.category.name}{" "}
              </span>
            </p>
            <p className="text-base">
              <span className="ml-2" style={{ fontFamily: "PoppinsLight" }}>
                {" "}
                Fecha:{" "}
              </span>
              <span
                className="font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {" " + event?.date}{" "}
              </span>
            </p>
            <p className="text-base">
              <span className="ml-2" style={{ fontFamily: "PoppinsLight" }}>
                {" "}
                Hora:{" "}
              </span>
              <span
                className=" font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                {" " + event?.time}
              </span>
            </p>
            <p className="flex pt-2 text-3xl font-bold mt-8">
              <span
                className=" text-2xl mr-2 font-bold"
                style={{ fontFamily: "PoppinsLight" }}
              >
                Entradas desde:{" "}
              </span>
              <span
                className="text-3xl text-Orange font-bold"
                style={{ fontFamily: "PoppinsBold" }}
              >
                ${moreLowTier?.price}
              </span>
            </p>
            <div className="grid grid-cols-1 border-2 border-Orange mb-4">
              {tiers.map((tier) => (
                <div
                  className=" 
                    flex items-center w-fit text-Orange mx-4 my-7"
                  style={{ fontFamily: "Poppins" }}
                >
                  <div>
                    <h2 className={[classes["ticketText"]]}>{tier?.name}</h2>
                    <p className={[classes["ticketPrice2"]]}>
                      Precio:{" "}
                      <span className={[classes["ticketPrice"]]}>
                        ${tier.price}
                      </span>
                    </p>
                  </div>
                  <div className="PC-640*480:ml-1 ml-3">
                    <DropBoxContainer
                      tier={tier}
                      onSelectTier={handleSelectTier}
                    />
                    <p className={[classes["ticketPrice2"]]}>
                      restantes: {tier.remainingCapacity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleBuyTicket}
              className=" 
                w-32 h-12 bg-Orange rounded-full text-white hover:bg-orange-600"
            >
              Pagar
            </button>
          </div>
        </div>
        <Footer additionalClasses="hidden sm:block" />
      </div>
    </>
  );
};

export default BuyTicket;
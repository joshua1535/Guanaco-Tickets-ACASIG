import './HomePage.module.css';
import classes from './HomePage.module.css';
import logo from '../../assets/logo.png';
import React, { useState } from "react";
import { useEffect } from "react";
import {Carousel,Navbar,Collapse,Typography,Button,Menu,MenuHandler,MenuList,MenuItem,Avatar,Card,IconButton} from "@material-tailwind/react";
import {ChevronDownIcon,Bars2Icon} from "@heroicons/react/24/outline";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import SliderCards from '../../Components/SliderCards';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';
import { categoryService } from '../../Services/categoryservice';

const listEvents = [
  {
    title: "Mario",
    description: "Descripcion del evento 1",
    date: "01/01/2021",
    img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
  },
  {
    title: "Pink Floyd",
    description: "Descripcion del evento 2",
    date: "02/02/2023",
    img: "https://i0.wp.com/mixturapop.com/wp-content/uploads/2019/06/camacu%C3%A1.jpg?fit=700%2C390&ssl=1",
  },
  {
    title: "Fas vs Dragon",
    description: "Descripcion del evento 3",
    date: "03/03/2021",
    img: "https://futbolcentroamerica.com/__export/1667069866944/sites/futbolcentroamerica/img/2022/10/28/fas-dragon.jpg_242310155.jpg",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 4",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 5",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 6",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
  },
];

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [recentMoviesEvents, setRecentMoviesEvents] = useState([]);
  const [recentSportsEvents, setRecentSportsEvents] = useState([]);
  const [recentConcertsEvents, setRecentConcertsEvents] = useState([]);
  const [recentTheaterEvents, setRecentTheaterEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, token} = useUserContext();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0); // Para controlar la página actual
  const [size] = useState(6); // Para controlar el tamaño de la página

  const navigate = useNavigate();

  const viewBuyTicketsHandler = (code) => {
    navigate(`/buytickets/${code}`);
  };

  const viewEventsHandler = () => {
    navigate("/events");
  };

  useEffect(() => {
    if (token) {
        categoryService.getAllCategories(token)
            .then((data) => {
                if (data === undefined) {
                    console.log('No se pudieron obtener las categorías');
                } else {
                    setCategories(data);
                }
            })
            .catch((error) => {
                console.error('Hubo un error al obtener las categorías:', error);
            });
    }
}, [token]);
  
  useEffect(() => {
    const fetchEventsByCategory = async (category, setStateFunction) => {
      try {
        const data = await eventService.getEventsByCategory(category, 0, size, token);
        setStateFunction(data.content);
        console.log(`Soy los ${category.toLowerCase()}`);
        console.log(data.content);
      } catch (error) {
        console.error(`Hubo un error al obtener las eventos de la categoría ${category}:`, error);
      }
    };
  
    const fetchData = async () => {
      try {
        if (token) {
          const eventData = await eventService.getCurrentEvents(page, size, token);
          setEvents(eventData.content);
  
          if (categories.length > 0) {
            categories.forEach((category) => {
              switch (category.name) {
                case 'Cine':
                  fetchEventsByCategory('CINE', setRecentMoviesEvents);
                  break;
                case 'Musica':
                  fetchEventsByCategory('MUSC', setRecentConcertsEvents);
                  break;
                case 'Deportes':
                  fetchEventsByCategory('DEPO', setRecentSportsEvents);
                  break;
                case 'Obras de teatro':
                  fetchEventsByCategory('OBTR', setRecentTheaterEvents);
                  break;
                default:
                  break;
              }
            });
        }
      }
      } catch (error) {
        console.error('Hubo un error al obtener los eventos:', error);
      }
    };
  
    fetchData();
  }, [page, size, token, categories]);



  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);


  return (
    <div className={[classes["generalContainer"]]}>
      <Header/>
      <Carousel
      className={classes["carouselContainer"]}>
    {events.map(({ image }, index) => (
    <div className={classes["imgContainer"]} key={index}>
      <img src={image} alt={`image ${index + 1}`} className={classes["imgCarouselFormat"]} />
      <div className={classes["imgBackgroundContainer"]}>
        <div className={classes["buttonContainer"]}>
          <div className="flex gap-2">
            <button 
            onClick={() => viewBuyTicketsHandler(events[index].code)}
            className={classes["buttonCarousel"]}>Tickets</button>
          </div>
        </div>
      </div>
    </div>
  ))}
</Carousel>
      <div className={[classes["categoriesContainer"]]}>
        <div className={[classes["categoriesTitle"]]}>
          <h1>Categorías</h1></div>
        </div>
        <div className={[classes["eventsTitle"]]}>
          <h1>Cine</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/03/palomitas-sala-cine-2992264.jpg?tf=3840x"
           alt="Cine" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentMoviesEvents.filter((event ) => event.category.name === "Cine").length > 0 ? (
          recentMoviesEvents
            .filter((event) => event.category.name === "Cine")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md
              object-cover border-blue-gray-300 border-2 h-auto max-h-60 min-h-fit'>
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>
</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Conciertos</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://thumbs.dreamstime.com/b/muchedumbre-del-concierto-10447765.jpg"
           alt="Música" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentConcertsEvents.filter((event ) => event.category.name === "Musica").length > 0 ? (
          recentConcertsEvents
            .filter((event) => event.category.name === "Musica")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>
</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Deportes</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://st1.uvnimg.com/9d/c5/454987434d0d885858562ca1a8f9/el-salvador-concacaf-nations-league.jpg"
           alt="Deportes" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentSportsEvents.filter((event ) => event.category.name === "Deportes").length > 0 ? (
          recentSportsEvents
            .filter((event) => event.category.name === "Deportes")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>

</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Obras de teatro</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://www.hoyesarte.com/wp-content/uploads/2009/08/teatro-2.jpg"
           alt="Obras de teatro" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentTheaterEvents.filter((event ) => event.category.name === "Obras de teatro").length > 0 ? (
          recentTheaterEvents
            .filter((event) => event.category.name === "Obras de teatro")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>

</div>
<SliderCards/>
  <Footer/>
</div>
      );
      
    }



import { useState, useEffect } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { Button, Rate, message, Space, Spin } from "antd";
import { Input, Avatar, List } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToChart,
  getReviews,
  saveRatingAndComment,
  deleteChart,
} from "../../Redux/Actions/Index";
import "./CardDetail.css";

const imgProvisoria = require("../Assets/a-way-out-ps5-retro.jpg");

function CardDetail() {
  const [card, setCard] = useState([]);
  const [string, setString] = useState("vacio");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { Meta } = Card;
  const cookie = new Cookies();
  const idCoockie = cookie.get("id");
  const [value, setValue] = useState(1);
  const [comment, setComment] = useState("");
  const [prom, setProm] = useState();
  const [placeholder, setPlaceholder] = useState("Dejanos tu comentario");
  const [stringR, setStringR] = useState("hola");
  const reviews2 = useSelector((state) => state.reviews);
  const Swal = require("sweetalert2");

  useEffect(() => {
    setProm(prom);
  }, [prom]);

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch]);

  if (!card.length) {
    axios
      .get(`https://pfservidor-production.up.railway.app/videogames/${id}`)
      .then((res) => {
        console.log(res.data);
        setCard([res.data]);
      })
      .catch((err) => console.log(err));
  }

  const handleShoppingChart = () => {

    console.log(card);

    if (!idCoockie) {
      Swal.fire({
        title: "Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else if (card[0].stock > 0) {

      const product_id = card[0].id;
      const put = {
        userId: idCoockie,
        products: {
          id: product_id,
          quantity: 1,
        },
      };

      dispatch(addItemToChart(put));
      message.success("¡Juego agregado a Carrito!", 5);

    } else if (card[0].stock < 1) {
      Swal.fire({
        title: "¡Error!",
        text: 'Juego Agotado',
        icon: "error",
        confirmButtonText: 'Ok'
      })
    }

  };

  const handleShoppingChart2 = () => {


    console.log(card);

    if (!idCoockie) {
      Swal.fire({
        title: "¡Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else if (card[0].stock > 0) {

      const product_id = card[0].id;
      const put = {
        userId: idCoockie,
        products: {
          id: product_id,
          quantity: 1,
        },
      };

      dispatch(addItemToChart(put));
      message.success("¡Juego agregado a Carrito!", 5);
      window.location.href = "/status-payment"

    } else if (card[0].stock < 1) {
      Swal.fire({
        title: "¡Error!",
        text: 'Juego Agotado',
        icon: "error",
        confirmButtonText: 'Ok'
      })
    }

  };

  function handleRatingChange(value2) {
    if (idCoockie) {
      setValue(value2);
      console.log(value);
    } else {
      message.warning("¡Debe loguearse para Puntuar!", 5);
    }
  }

  function handleChangeInput(e) {
    if (idCoockie) {
      setComment(e.target.value);
      setPlaceholder("Dejanos tu comentario");
      console.log(comment);
    } else {
      message.warning("¡Debe loguearse para Comentar!", 5);
    }
  }

  function onClick(e) {

    if (!idCoockie) {
      e.preventDefault();
      Swal.fire({
        title: "¡Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else {
      e.preventDefault();
      const put = {
        userId: idCoockie,
        videogameId: Number(id),
        comment: comment,
        rate: value,
      };
      console.log(put);
      dispatch(saveRatingAndComment(put));
      message.success("¡La operación se realizó con éxito!", 5);
      setTimeout(function () {
        dispatch(getReviews(id));
        setStringR("hola");
      }, 1000);

    }

  }

  if (card.length !== 0) {
    if (stringR === "hola") {
      if (reviews2.length !== 0) {
        var number = 0;
        var number2 = 0;
        var number3 = 0;
        for (let i = 0; i < reviews2.length; i++) {
          if (reviews2[i].status === "Disabled") {
            number = number;
            number2 = number2 + 1;
          } else {
            number = number + Number(reviews2[i].rate);
            number2 = number2;
          }
        }
        number3 = reviews2.length - number2;
        number = number / number3;
        console.log(number);
        setProm(number);
        setStringR("Chau");
      }
    }

    var precio = `$ ${card[0].price}`;

    return (
      <div className="card-detail-component2">
        <div className="body-card card-detail-component">
          <div className="cardsDetailsRates">
            <div className="cardsContainer">
              <div className="cardFormReview">
                <Card
                  style={{ width: 360, height: 580 }}
                  cover={
                    <img
                      style={{ width: 360, height: 460 }}
                      alt="Among Us"
                      src={card[0].image[0]}
                    />
                  }>
                  <Meta
                    title={card[0].name}
                    description="Henry Game Store, los mejores juegos, al mejor precio del mercado"
                  />
                  <br></br>
                </Card>

                <div className="rateForm">
                  <Rate
                    onChange={handleRatingChange}
                    className="rateAux"
                    allowHalf
                    defaultValue={1}
                    value={value}
                  />

                  <div className="inputButton">
                    <Input
                      className="form"
                      placeholder={placeholder}
                      bordered={false}
                      onChange={(e) => handleChangeInput(e)}
                      value={comment}
                      type="text"
                    />

                    <Button
                      className="buttonAux"
                      style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
                      type="primary"
                      onClick={(e) => onClick(e)}>
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="detailNameInfo">
                <div className="nameFormat">
                  <h3 className="title">{card[0].name}</h3>
                  <p className="title">DIGITAL</p>
                </div>
                <br></br>
                <hr></hr>
                <Card
                  className="cardDetailDescription"
                  title={precio}
                  bordered={false}
                  style={{
                    width: 400,
                    height: 510,
                  }}>
                  <p>{card[0].description}</p>

                  <br></br>
                  <br></br>
                  <p>Platforma: {card[0].platform}</p>
                  <p>Genero: {card[0].genre}</p>

                  <div className="buttonsContainer">
                    <Button
                      className="buttonsCardDetail"
                      style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
                      type="primary"
                      onClick={handleShoppingChart2}>
                      Comprar ahora
                    </Button>

                    <Button
                      style={{ color: "rgba(9, 22, 29, 0.712)" }}
                      className="buttonsCardDetail"
                      onClick={handleShoppingChart}>
                      Añadir al carrito
                    </Button>

                  </div>
                </Card>
              </div>

              <div className="comentarios-card">
                <div className="reviews-card-admin">
                  <div className="carta-aux">
                    <div className="aux7">
                      <h4 className="titulooo">
                        Calificación y opiniones
                      </h4>
                      <div>
                        <Rate
                          className="rateProm"
                          disabled
                          bordered={false}
                          allowHalf
                          value={prom}
                        />
                      </div>
                      <hr></hr>
                    </div>
                  </div>

                  {reviews2.length !== 0 ? (
                    <List
                      itemLayout="horizontal"
                      dataSource={reviews2}
                      renderItem={(item, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              item.status !== "Disabled" ? (
                                <Avatar
                                  src={
                                    item.userInfo && item.userInfo.img
                                      ? item.userInfo.img[0]
                                      : ""
                                  }
                                />
                              ) : null
                            }
                            title={

                              item.status !== "Disabled" ? (
                                <div>
                                  <p className="name_review">{item.userInfo.firstname}</p>
                                  <Rate
                                  className="rate"
                                  disabled
                                  allowHalf
                                  value={Number(item.rate)}
                                  />
                              </div>
                                
                              ) : null
                            }
                            description={
                              item.status !== "Disabled" ? (
                                <div>
                                  <p className="comment">{item.comment}</p>
                                </div>
                              ) : null
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <br></br>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader-card-detail">
        {" "}
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </Space>
      </div>
    );
  }
}

export default CardDetail;
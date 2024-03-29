import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Rate, Button, Input, message, Card, Modal } from "antd";
import "./RatingWeb.css";
import Cookies from "universal-cookie";
import { getRatingWeb, saveRatingWeb } from "../../Redux/Actions/Index";

const RatingWeb = () => {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const { id } = useParams();
  const idCoockie = cookie.get("id");
  const [value, setValue] = useState(1);
  const [comment, setComment] = useState("");
  const [placeholder, setPlaceholder] = useState("Leave your comment");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRatingWeb(id));
  }, [dispatch]);

  function handleRatingChange(value2) {
    if (idCoockie) {
      setValue(value2);
    } else {
      message.warning("¡Debe loguearse para puntuar!", 5);
    }
  }

  function handleChangeInput(e) {
    if (idCoockie) {
      setComment(e.target.value);
      setPlaceholder("Leave your comment");
    } else {
      message.warning("¡Debe loguearse para puntuar!", 5);
    }
  }

  function onClick(e) {
    if (idCoockie) {
      e.preventDefault();
      const put = {
        userId: idCoockie,
        comment: comment,
        rate: value,
      };
      console.log(put);
      dispatch(saveRatingWeb(put));
      message.success("¡La operación se realizó con éxito!", 5);
      navigate("/home");
    } else {
      message.warning("¡Debe loguearse para puntuar!", 5);
    }
    // window.location.reload();
  }
  const title = "Cuentanos que te pareció la página!";

  return (
    <div className="ratingweb-container">
      <Card bordered={false} style={{ width: 800, background: "white" }} className="card-review-general">
        <div className="rateForm">
          <h2>Cuentanos que te pareció la página!</h2>
          <br></br>
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
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RatingWeb;

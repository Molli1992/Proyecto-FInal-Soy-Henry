import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

function LandingPage() {
    return (
        <div className="landing-page-component container">
            <div className="row">
                <div className="col text-col">
                    <h1>Videojuegos</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button>
                        <Link to="/home">Ingresar</Link>
                    </Button>
                </div>
                <div className="col cards-col">
                    <div className="card card1"></div>
                    <div className="card card2"></div>
                    <div className="card card3"></div>
                    <div className="card card4"></div>
                    <div className="card card5"></div>
                    <div className="card card6"></div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
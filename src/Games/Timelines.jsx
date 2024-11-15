import { useState, useEffect } from "react";
import { Button, Modal, ModalContent } from "semantic-ui-react";
import { countries } from "./countries";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { events } from "./events";
import './Games.css'

export const Timelines = props => {
    const [choices, setChoices] = useState([])
    const [correctIndex, setCorrectIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [isWrong, setIsWrong] = useState(false)
    const [currStreak, setCurrStreak] = useState(localStorage.getItem('timelines-curr') ? parseInt(localStorage.getItem('timelines-curr')) : 0)
    const [personalRecord, setPersonalRecord] = useState(localStorage.getItem('timelines-record') ? parseInt(localStorage.getItem('timelines-record')) : 0)
    const navigate = useNavigate()

    function randomProperty(obj) {
        var keys = Object.keys(obj);
        return keys[keys.length * Math.random() << 0];
    };

    function randomItem(obj) {
        return obj[obj.length * Math.random() << 0];
    };

    function nextQuestion() {
        setSelectedIndex(-1)
        const choices = []
        let indexWithMin = -1
        let min = 5000
        for (let i = 0; i < 4; i++) {
            let property = randomProperty(events)
            while (choices.some((choice) => choice.year == property)) {
                property = randomProperty(events)
            }
            if (parseInt(property) < min) {
                min = parseInt(property)
                indexWithMin = i
            }
            console.log(property)
            const content = randomItem(events[property]).content
            choices.push({ content: content, year: property })
        }
        setIsWrong(false)

        setCorrectIndex(indexWithMin)
        setChoices(choices)
    }

    function makeSelection(index) {
        setSelectedIndex(index)
        if (index === correctIndex) {
            setIsWrong(false)
            setCurrStreak(currStreak + 1)
            if (currStreak + 1 > personalRecord) {
                setPersonalRecord(currStreak + 1)
                localStorage.setItem('timelines-record', currStreak + 1)
            }
        } else {
            setIsWrong(true)
            setCurrStreak(0)
        }
    }

    useEffect(() => {
        if (currStreak > personalRecord) {
            setPersonalRecord(currStreak)
            localStorage.setItem('timelines-record', currStreak)
        }
        localStorage.setItem('timelines-curr', currStreak)
    }, [currStreak])

    useEffect(() => {
        if (!localStorage.getItem('timelines-record')) {
            localStorage.setItem('timelines-record', 0)
        }
        nextQuestion()
    }, [])

    return <div className="basic-page" style={{ color: "var(--tan)", fontSize: "1.3rem" }}>
        <div style={{ marginBottom: "1rem" }}>{"Current streak: " + currStreak + ". Personal record: " + personalRecord}</div>
        <div>{"Which happened first?"}</div>
        <div style={{ width: "fit-content", maxWidth: "80%", display: "flex", flexDirection: "column", alignItems: "center", margin: 0, padding: 0 }}>
            {choices.map((choice, index) => {
                return <Button
                    onClick={() => { makeSelection(index) }}
                    style={{
                        width: "90%",
                        fontSize: "1rem",
                        textAlign: "left",
                        color: selectedIndex !== -1 && (index === selectedIndex || index === correctIndex) ? "black" : "",
                        backgroundColor: isWrong && index === selectedIndex ? "red" : selectedIndex !== -1 && index === correctIndex ? "green" : "var(--tan)"
                    }}
                    key={index}>
                    {index + 1 + ". " + choice.content + " "}
                    <span
                        style={{
                            textDecoration: "underline",
                            color: "blue",
                            fontSize: "1.2rem",
                            display: selectedIndex === -1 ? "none" : ""
                        }}>
                        {choice.year} CE
                    </span>
                </Button>
            })}

        </div>
        <div>
            <Button onClick={() => navigate('/')} style={{ backgroundColor: "rgb(180, 130, 130)", fontSize: "1rem" }}>Home</Button>
            <Button disabled={selectedIndex === -1} onClick={nextQuestion} style={{ backgroundColor: "lightgreen", fontSize: "1rem" }}>Next</Button>
        </div>

    </div>

}
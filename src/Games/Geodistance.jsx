import { useState, useEffect } from "react";
import { Button, Modal, ModalContent, DimmerDimmable } from "semantic-ui-react";
import { countries } from "./countries";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { Leaderboard, LeaderboardModal } from "./Leaderboard.jsx";
import './Games.css'

export const Geodistance = props => {
    const [choices, setChoices] = useState([])
    const [chosenCountry, setChosenCountry] = useState({})
    const [correctIndex, setCorrectIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [isWrong, setIsWrong] = useState(false)
    const [currStreak, setCurrStreak] = useState(localStorage.getItem('geodistance-curr') ? parseInt(localStorage.getItem('geodistance-curr')) : 0)
    const [personalRecord, setPersonalRecord] = useState(localStorage.getItem('geodistance-record') ? parseInt(localStorage.getItem('geodistance-record')) : 0)
    const [showingMap, setShowingMap] = useState(false)
    const [showingLeaderboard, setShowingLeaderboard] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [showingModal, setShowingModal] = useState(false)
    const navigate = useNavigate()

    function distance(countryA, countryB) {
        const lat1 = countryA.latitude
        const lon1 = countryA.longitude
        const lat2 = countryB.latitude
        const lon2 = countryB.longitude

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // in metres
    }

    function randomItem(obj) {
        return obj[obj.length * Math.random() << 0];
    };

    function chooseCountry() {
        setIsWrong(false)
        setSelectedIndex(-1)
        const chosenCountry = randomItem(countries);
        const choices = []
        let numFound = 0;
        while (numFound < 4) {
            const choice = randomItem(countries)
            if (!choices.some((c) => c.COUNTRY === choice.COUNTRY) && choice.COUNTRY == choice.COUNTRYAFF) {
                choices.push(choice)
                numFound++;
            }
        }

        let indexWithMin = 0;
        let min = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < 4; i++) {
            const d = distance(choices[i], chosenCountry)
            if (d < min) {
                min = d;
                indexWithMin = i;
            }
        }
        setCorrectIndex(indexWithMin)
        setChosenCountry(chosenCountry)
        setChoices(choices)
    }

    function makeSelection(index) {
        setSelectedIndex(index)
        if (index === correctIndex) {
            setIsWrong(false)
            setCurrStreak(currStreak + 1)
            if (currStreak + 1 > personalRecord) {
                setPersonalRecord(currStreak + 1)
                localStorage.setItem('geodistance-record', currStreak + 1)
            }
        } else {
            setIsWrong(true)
            setShowingModal(true)
        }
    }

    useEffect(() => {
        if (currStreak > personalRecord) {
            setPersonalRecord(currStreak)
            localStorage.setItem('geodistance-record', currStreak)
        }
        localStorage.setItem('geodistance-curr', currStreak)
    }, [currStreak])

    const position = [20, 0]

    useEffect(() => {
        if (!localStorage.getItem('geodistance-record')) {
            localStorage.setItem('geodistance-record', 0)
        }
        chooseCountry()
    }, [])

    function restart() {
        setCurrStreak(0)
        setIsWrong(false)
        chooseCountry()
        setSelectedIndex(-1)
        setShowingModal(false)
    }

    return <DimmerDimmable dimmed={showingLeaderboard} as='div' className="basic-page" style={{ color: "var(--tan)", fontSize: "1.3rem" }}>
        <Leaderboard showingLeaderboard={showingLeaderboard}
            game='geodistance'
            refresh={refresh}
            setShowingLeaderboard={setShowingLeaderboard}></Leaderboard>
        <LeaderboardModal restart={restart} storageKey='geodistance-curr' game='geodistance' setRefresh={setRefresh} refresh={refresh} showingModal={showingModal} />
        <Modal open={showingMap}>
            <ModalContent style={{ backgroundColor: "rgba(0,0,0,.5)" }}><div style={{ height: "75vh" }}>
                <MapContainer center={position} zoom={1.5} scrollWheelZoom={true} style={{ height: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {choices.map((country, index) => {
                        return <Marker position={[country.latitude, country.longitude]}>
                            <Tooltip permanent>
                                <div style={{ fontWeight: "bold" }}>
                                    {country.COUNTRY}
                                </div>
                            </Tooltip>
                        </Marker>
                    })}
                    <Marker position={[chosenCountry.latitude, chosenCountry.longitude]}>
                        <Tooltip permanent>
                            <div style={{ fontWeight: "bold" }}>
                                {chosenCountry.COUNTRY}
                            </div>
                        </Tooltip>
                    </Marker>
                </MapContainer></div>
                <div>
                    <Button style={{ width: "fit-content", height: "fit-content", fontSize: "1rem" }} onClick={() => setShowingMap(false)}>Close</Button>
                    Please note the calculation is based on the globe and this is a 2D projection.
                </div>
            </ModalContent>
        </Modal>
        <div style={{ marginBottom: "1rem" }}>{"Current streak: " + currStreak + ". Personal record: " + personalRecord}</div>
        <div>{"Which country is closest to: " + chosenCountry.COUNTRY + "?"}</div>
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
                    key={index}>{index + 1 + ". " + choice.COUNTRY}</Button>
            })}

        </div>
        <div>
            <Button onClick={() => navigate('/')} style={{ backgroundColor: "rgb(180, 130, 130)", fontSize: "1rem" }}>Home</Button>
            <Button disabled={selectedIndex === -1} onClick={chooseCountry} style={{ backgroundColor: "lightgreen", fontSize: "1rem" }}>Next</Button>
        </div>

        <Button style={{ display: selectedIndex === -1 ? "none" : "", backgroundColor: "lightgreen", fontSize: "1rem" }} onClick={() => { setShowingMap(true) }}>Show map</Button>
        <Button style={{ fontSize: "1rem" }} onClick={() => { setShowingLeaderboard(true) }}>View leaderboard</Button>
    </DimmerDimmable>

}
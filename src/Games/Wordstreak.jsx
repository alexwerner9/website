import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { words } from './words.js'
import { useNavigate } from "react-router-dom";

export const Wordstreak = props => {
    const [chosenWords, setChosenWords] = useState([])
    const [definitions, setDefinitions] = useState([])
    const [correctIndex, setCorrectIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [isWrong, setIsWrong] = useState(false)
    const [currStreak, setCurrStreak] = useState(localStorage.getItem('wordstreak-curr') ? parseInt(localStorage.getItem('wordstreak-curr')) : 0)
    const [personalRecord, setPersonalRecord] = useState(localStorage.getItem('wordstreak-record') ? parseInt(localStorage.getItem('wordstreak-record')) : 0)
    const navigate = useNavigate()

    function longestCommonSubstring(str1, str2) {
        let n = str1.length;
        let m = str2.length;

        let lcs = [];
        for (let i = 0; i <= n; i++) {
            lcs[i] = [];
            for (let j = 0; j <= m; j++) {
                lcs[i][j] = 0;
            }
        }

        let result = "";
        let max = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (str1[i] === str2[j]) {
                    lcs[i + 1][j + 1] = lcs[i][j] + 1;
                    if (lcs[i + 1][j + 1] > max) {
                        max = lcs[i + 1][j + 1];
                        result = str1.substring(i - max + 1, i + 1);
                    }
                }
            }
        }
        return result;
    }

    function randomProperty(obj) {
        var keys = Object.keys(obj);
        return keys[keys.length * Math.random() << 0];
    };

    function chooseWords() {
        let firstWord = null
        while (!firstWord) {
            firstWord = randomProperty(words);
            if (longestCommonSubstring(firstWord.toLowerCase(), words[firstWord].definition.toLowerCase()).length > 4) {
                firstWord = null;
            }
        }
        const foundWords = [firstWord]
        const foundDefinitions = [words[firstWord].definition]
        const firstWordType = words[firstWord].type;
        while (foundWords.length < 4) {
            const newWord = randomProperty(words);
            const newWordDef = words[newWord].definition;
            const newWordType = words[newWord].type;
            if (newWord.length < 5 || longestCommonSubstring(newWord.toLowerCase(), newWordDef.toLowerCase()).length > 4 || newWordType !== firstWordType) {
                continue
            }
            foundWords.push(newWord);
            foundDefinitions.push(newWordDef);
        }

        setCorrectIndex(Math.random() * 4 << 0)
        setChosenWords(foundWords)
        setDefinitions(foundDefinitions)
    }

    function makeSelection(index) {
        setSelectedIndex(index)
        if (index === correctIndex) {
            setIsWrong(false)
            setCurrStreak(currStreak + 1)
            if (currStreak + 1 > personalRecord) {
                setPersonalRecord(currStreak + 1)
                localStorage.setItem('wordstreak-record', currStreak + 1)
            }
        } else {
            setIsWrong(true)
            setCurrStreak(0)
        }
        setTimeout(() => {
            setIsWrong(false)
            setSelectedIndex(-1)
            chooseWords()
        }, [750])
    }

    useEffect(() => {
        if (currStreak > personalRecord) {
            setPersonalRecord(currStreak)
            localStorage.setItem('wordstreak-record', currStreak)
        }
        localStorage.setItem('wordstreak-curr', currStreak)
    }, [currStreak])

    useEffect(() => {
        if(!localStorage.getItem('wordstreak-record')) {
            localStorage.setItem('wordstreak-record', 0)
        }
        chooseWords()
    }, [])

    return <div className="basic-page" style={{ color: "var(--tan)", fontSize: "1.3rem" }}>
        <div style={{ marginBottom: "1rem" }}>{"Current streak: " + currStreak + ". Personal record: " + personalRecord}</div>
        <div>{"What is the definition of: " + chosenWords[correctIndex] + "?"}</div>
        <div style={{ width: "fit-content", maxWidth: "80%", display: "flex", flexDirection: "column", alignItems: "center", margin: 0, padding: 0 }}>
            {definitions.map((definition, index) => {
                return <Button
                    onClick={() => { makeSelection(index) }}
                    style={{
                        width: "90%",
                        fontSize: "1rem",
                        textAlign: "left",
                        color: selectedIndex !== -1 && (index === selectedIndex || index === correctIndex) ? "black" : "",
                        backgroundColor: isWrong && index === selectedIndex ? "red" : selectedIndex !== -1 && index === correctIndex ? "green" : "var(--tan)"
                    }}
                    key={index}>{index + 1 + ". " + definition}</Button>
            })}
        </div>
        <Button onClick={() => navigate('/')} style={{backgroundColor: "rgb(180, 130, 130)", fontSize: "1rem"}}>Home</Button>
    </div>

}
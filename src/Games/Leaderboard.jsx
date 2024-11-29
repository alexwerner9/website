import { useState, useEffect, Icon } from 'react'
import { Dimmer, Grid, Button, Modal, ModalContent, Input } from 'semantic-ui-react'
import { sendScore } from './client'
import './Games.css'

export const LeaderboardModal = props => {
    const [name, setName] = useState('')

    async function submitScore() {
        await sendScore(name, localStorage.getItem(props.storageKey), props.game)
        props.restart()
        props.setRefresh(!props.refresh)
    }

    return <Modal style={{ width: "fit-content" }} open={props.showingModal}>
        <ModalContent>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "1.5rem" }}>Oh no! That's wrong.</div>
                <Button style={{ fontSize: "1rem" }} onClick={props.restart}>Try again</Button>
                <div>Or submit score to leaderboard</div>
                <Input onChange={(_, data) => { setName(data.value) }} placeholder={"Your name"} value={name} />
                <Button style={{ fontSize: "1rem" }} onClick={submitScore}>Submit</Button>
            </div>
        </ModalContent>
    </Modal>
}

export const Leaderboard = props => {
    const [leaderboard, setLeaderboard] = useState([])

    async function getLeaderboard(game) {
        const resp = await fetch(process.env.REACT_APP_BACKEND + 'alexwerner/leaderboard?game=' + game)
        const respJson = await resp.json()
        setLeaderboard(respJson.scores.sort((x, y) => y.score - x.score));
    }

    useEffect(() => {
        getLeaderboard(props.game)
    }, [props.refresh])

    return <Dimmer style={{ backgroundColor: "rgba(0,0,0,.9)" }} active={props.showingLeaderboard}>
        <Grid style={{ width: "30rem", height: "30rem", overflow: "auto" }}>
            <Grid.Row style={{ textDecoration: "underline" }}>
                <Grid.Column width={2}>
                    Place
                </Grid.Column>
                <Grid.Column width={6}>
                    Name
                </Grid.Column>
                <Grid.Column width={4}>
                    Score
                </Grid.Column>
                <Grid.Column width={4}>
                    Date
                </Grid.Column>
            </Grid.Row>
            {leaderboard.map((val, index) => {
                return <Grid.Row style={{ color: index == 0 ? "green" : "", fontWeight: index <= 2 ? "bold" : "" }}>
                    <Grid.Column width={2}>
                        {index + 1}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {val.name}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {val.score}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {val.date.split("T")[0]}
                    </Grid.Column>
                </Grid.Row>
            })}
        </Grid>
        <Button style={{ fontSize: "1rem" }} onClick={() => props.setShowingLeaderboard(false)}>Close</Button>
    </Dimmer>
}
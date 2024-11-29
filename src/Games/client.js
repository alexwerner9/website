
export async function sendScore(name, score, game) {
    const date = new Date(); // Or the date you'd like converted.
    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const resp = await fetch(process.env.REACT_APP_BACKEND + 'alexwerner/leaderboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: score,
            name: name,
            date: isoDateTime,
            game: game
        })
    })
}
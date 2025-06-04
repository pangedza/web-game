async function submitScore() {
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    if (!name || !score) return;
    await fetch('/submit_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score: parseInt(score, 10) })
    });
    loadScores();
}

async function loadScores() {
    const res = await fetch('/scores');
    const data = await res.json();
    const list = document.getElementById('scores');
    list.innerHTML = '';
    data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name}: ${entry.score}`;
        list.appendChild(li);
    });
}

loadScores();

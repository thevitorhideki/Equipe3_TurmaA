document.addEventListener('DOMContentLoaded', () => {
    let infos = JSON.parse(localStorage.getItem('Exercício Iniciado'));
    let nome_exercicio = infos.nome;
    let desc_exercicio = infos.desc;
    let tempo_exercicio = infos.tempo;
    let bg_color = infos.bg_color;
    document.querySelector('#nome_exercicio').innerHTML = nome_exercicio;
    document.querySelector('#desc_exercicio').innerHTML = desc_exercicio;
    document.querySelector('#tempo_exercicio').innerHTML = tempo_exercicio;
    document.querySelector('body').style.backgroundImage = bg_color;

    let heart = document.querySelector('#favoritar');
    let favoritos = JSON.parse(localStorage.getItem(nome_exercicio));

    heart.src = favoritos === null ? 'img/white_heart.png' : 'img/white_heart_filled.png';

    heart.addEventListener('click', () => {
        favoritos = JSON.parse(localStorage.getItem(nome_exercicio));
        if (favoritos === null) {
            heart.src = 'img/white_heart_filled.png';
            localStorage.setItem(nome_exercicio, JSON.stringify(infos));
        } else {
            heart.src = 'img/white_heart.png';
            localStorage.removeItem(nome_exercicio);
        }
    });

    const play = document.querySelector('#iniciar');
    let played = false;
    let counter;

    play.addEventListener('click', () => {
        progress = document.querySelector('.progress');
        circle = document.querySelector('.circle');
        tempo_percorrido = document.querySelector('.tempo-percorrido');

        tempo_total = tempo_exercicio.split(':').map((x) => parseInt(x));

        let seconds = 0;
        let minutes = 0;
        let total_seconds = 0;

        if (!played) {
            played = true;
            play.src = 'img/pause-button.png';
            counter = setInterval(() => {
                total_seconds++;
                seconds++;

                progress.style.width = `${(total_seconds / (tempo_total[0] * 60 + tempo_total[1])) * 100}%`;
                circle.style.left = `calc(${
                    (total_seconds / (tempo_total[0] * 60 + tempo_total[1])) * 100
                }% - 0.13rem)`;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }

                tempo_percorrido.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')}`;

                if (minutes === tempo_total[0] && seconds === tempo_total[1]) {
                    played = false;
                    play.src = 'img/play-button.png';
                    clearInterval(counter);
                }
            }, 1000);
        } else {
            played = false;
            play.src = 'img/play-button.png';
            clearInterval(counter);
        }
    });
});

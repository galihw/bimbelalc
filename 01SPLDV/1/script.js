// Kunci Jawaban (Diinput dalam bentuk Array untuk 20 soal)
const answerKey = [
    'A', 'C', 'D', 'B', 'C', 
    'C', 'B', 'C', 'C', 'B', 
    'C', 'C', 'C', 'D', 'C', 
    'D', 'C', 'D', 'A', 'D'
];

const totalQuestions = answerKey.length;
let currentQuestionIndex = 0;
let userAnswers = new Array(totalQuestions).fill(null);

// Elemen DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const btnStart = document.getElementById('btn-start');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');
const btnMenu = document.getElementById('btn-menu');

const questionNumberEl = document.getElementById('question-number');
const questionImageEl = document.getElementById('question-image');
const radioOptions = document.getElementsByName('answer');

const modal = document.getElementById('navigation-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalGrid = document.getElementById('modal-grid');
const resultGrid = document.getElementById('result-grid');
const scoreDisplay = document.getElementById('score-display');

// Event Listeners
btnStart.addEventListener('click', startQuiz);
btnPrev.addEventListener('click', goToPrevQuestion);
btnNext.addEventListener('click', goToNextQuestion);
btnSubmit.addEventListener('click', submitQuiz);

btnMenu.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

// Simpan jawaban setiap kali user memilih radio button
radioOptions.forEach(radio => {
    radio.addEventListener('change', (e) => {
        userAnswers[currentQuestionIndex] = e.target.value;
    });
});

// Fungsi Memulai Tes
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion(0);
}

// Fungsi Memuat Soal berdasarkan Index
function loadQuestion(index) {
    currentQuestionIndex = index;

    // Update Nomor Soal
    questionNumberEl.textContent = `Soal ${index + 1} dari ${totalQuestions}`;

    // Update Gambar Soal (Mengambil dari folder img/1.png - img/20.png)
    questionImageEl.src = `img/${index + 1}.png`;
	questionImageEl.style.width = '120%';
	questionImageEl.style.height = 'auto';


    // Set Radio Button sesuai jawaban terpilih sebelumnya
    const savedAnswer = userAnswers[index];
    radioOptions.forEach(radio => {
        radio.checked = (radio.value === savedAnswer);
    });

    // Kontrol Tombol Navigasi
    btnPrev.disabled = (index === 0);

    if (index === totalQuestions - 1) {
        btnNext.classList.add('hidden');
        btnSubmit.classList.remove('hidden');
    } else {
        btnNext.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
    }
}

function goToPrevQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

// Fungsi Pop-up Menu Navigasi Nomor
function openModal() {
    modalGrid.innerHTML = '';
    for (let i = 0; i < totalQuestions; i++) {
        const numBtn = document.createElement('button');
        numBtn.classList.add('nav-num-btn');
        numBtn.textContent = i + 1;

        if (userAnswers[i] !== null) {
            numBtn.classList.add('answered');
        }

        if (i === currentQuestionIndex) {
            numBtn.classList.add('active-num');
        }

        numBtn.addEventListener('click', () => {
            loadQuestion(i);
            closeModal();
        });

        modalGrid.appendChild(numBtn);
    }
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// Fungsi Kumpulkan & Hitung Nilai
function submitQuiz() {
    if (confirm("Apakah Anda yakin ingin mengumpulkan tes?")) {
        let score = 0;

        resultGrid.innerHTML = '';

        for (let i = 0; i < totalQuestions; i++) {
            const isCorrect = userAnswers[i] === answerKey[i];
            if (isCorrect) {
                score++;
            }

            // Buat elemen indikator nomor hasil (Hijau / Merah)
            const resultBox = document.createElement('div');
            resultBox.classList.add('result-box');
            resultBox.classList.add(isCorrect ? 'correct' : 'incorrect');
            resultBox.textContent = i + 1;

            resultGrid.appendChild(resultBox);
        }

        // Kalkulasi Skor Akhir (Skala 0 - 100)
        const finalScore = (score / totalQuestions) * 100;
        scoreDisplay.textContent = finalScore;

        // Pindah ke Tampilan Hasil
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');
    }
}
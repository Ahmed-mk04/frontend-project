// logout.js
// Ici, juste un petit effet pour le bouton si besoin
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".btn-primary");

    if(btn){
        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "scale(1.05)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "scale(1)";
        });
    }
});//
// Toggle login/register
const container = document.querySelector('.container');
document.querySelector('.register-btn').addEventListener('click', () => container.classList.add('active'));
document.querySelector('.login-btn').addEventListener('click', () => container.classList.remove('active'));

// Étape choix type utilisateur -> afficher les champs
const chooseBtns = document.querySelectorAll('.choose-btn');
const stepChoose = document.querySelector('.step-choose');
const stepFields = document.querySelector('.step-fields');
const userTypeInput = document.getElementById('user_type');
const studentFields = document.querySelector('.student-fields');
const teacherFields = document.querySelector('.teacher-fields');

chooseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        stepChoose.style.display = 'none';
        stepFields.style.display = 'block';
        userTypeInput.value = type;

        if(type === 'student') {
            studentFields.style.display = 'block';
            teacherFields.style.display = 'none';
        } else {
            studentFields.style.display = 'none';
            teacherFields.style.display = 'block';
        }
    });
});

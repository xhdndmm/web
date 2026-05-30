//[https://github.com/xhdndmm/web]
//[https://xhdndmm.net/]

document.getElementById('year').textContent = new Date().getFullYear();

const links = [...document.querySelectorAll('.nav-links a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
    }
    });
}, { threshold: 0.55 });

sections.forEach(section => observer.observe(section));

const fadeItems = document.querySelectorAll('.panel, .project, .contact-item, .about-box, .stat');
fadeItems.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    setTimeout(() => {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
    }, 80 + i * 40);
});

function show_runtime() {
    const startDate = new Date("2024-06-28T20:32:00Z"); //此处时间为CST时间

    function updateRuntime() {
        const currentDate = new Date();
        const timeDiff = currentDate - startDate;
        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerYear = msPerDay * 365.25;

        let years = Math.floor(timeDiff / msPerYear);
        let days = Math.floor((timeDiff % msPerYear) / msPerDay);
        let hours = Math.floor((timeDiff % msPerDay) / msPerHour);
        let minutes = Math.floor((timeDiff % msPerHour) / msPerMinute);
        let seconds = Math.floor((timeDiff % msPerMinute) / msPerSecond);

        document.getElementById('runtime_span').innerHTML = 
            years + "年 " + 
            days + "天 " + 
            hours + "小时 " + 
            minutes + "分 " + 
            seconds + "秒";
    }

    updateRuntime();
    setInterval(updateRuntime, 1000);
}

show_runtime();
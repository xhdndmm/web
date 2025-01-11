//[https://github.com/xhdndmm/web]
//[https://xhdndmm.cn/]

async function show_runtime() {
    try {
        const response = await fetch('/time_api');
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.time_api) { 
            const startDate = new Date("2024-06-28T12:32:00Z");
            const ntpDate = new Date(data.time_api);

            const timeDiff = ntpDate - startDate;
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

            function updateRuntime() {
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
                if (hours >= 24) {
                    hours = 0;
                    days++;
                }
                if (days >= 365.25) {
                    days = 0;
                    years++;
                }

                document.getElementById('runtime_span').innerHTML = 
                    years + "年 " + 
                    days + "天 " + 
                    hours + "小时 " + 
                    minutes + "分 " + 
                    seconds + "秒";
            }

            setInterval(updateRuntime, 1000);
        }
    } catch (error) {
        console.error('请求失败:', error);
    }
}

show_runtime();

async function fetchServerStatus() {
    try {
        const response = await fetch('/server_status');
        const data = await response.json();
        document.getElementById('server_status').innerText = 
            `CPU使用率: ${data.cpu_usage}%, 内存使用率: ${data.memory_usage}%`;
    } catch (error) {
        console.error('获取服务器状态失败:', error);
    }
}

function setupNavigation() {
    document.querySelector('nav').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            navigateToSection(e.target.getAttribute('href').substring(1));
        }
    });

    document.querySelectorAll('nav a').forEach(navItem => {
        navItem.addEventListener('mouseover', () => {
            navItem.classList.add('hover');
        });
        navItem.addEventListener('mouseout', () => {
            navItem.classList.remove('hover');
        });
    });

    document.querySelectorAll('.dropdown-content a').forEach(dropdownItem => {
        dropdownItem.addEventListener('mouseover', () => {
            dropdownItem.classList.add('hover');
        });
        dropdownItem.addEventListener('mouseout', () => {
            dropdownItem.classList.remove('hover');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection(this.getAttribute('href').substring(1));
        });
    });
}

function navigateToSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    var target = document.querySelector(`[data-section="${sectionId}"]`);
    if (target) {
        setTimeout(() => {
            target.classList.add('active');
        }, 100); 
    }
}

window.onload = function() {
    setupNavigation();
    document.querySelector('.section').classList.add('active');
    
    const center = document.querySelector('.center');
    setTimeout(() => {
        center.classList.add('loaded');
    }, 100);

    var canvas = document.getElementById("canvas");
    canvas.style.display = 'block';
    var context = canvas.getContext("2d");
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    var fontSize = 15;
    var colunms = Math.floor(W / fontSize);  
    var drops = [];
    for (var i = 0; i < colunms; i++) {
        drops.push(0);
    }

    var str = "0123456789qwertyuiopasdfghjklzxcvbnm";

    function draw() {
        context.fillStyle = "rgba(0,0,0,0.05)";
        context.fillRect(0,0,W,H);
        context.font = fontSize + 'px arial';
        context.fillStyle = "green";

        for (var i = 0; i < colunms; i++) {
            var index = Math.floor(Math.random() * str.length);
            var x = i * fontSize;
            var y = drops[i] * fontSize;
            context.fillText(str[index], x, y);
            if (y >= canvas.height && Math.random() > 0.92) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    draw();
    setInterval(draw, 30);

    AOS.init({
        duration: 1500
    });

    fetchServerStatus();
}
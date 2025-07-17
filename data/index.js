//[https://github.com/xhdndmm/web]
//[https://xhdndmm.cn/]

// 显示运行时间的函数
async function show_runtime() {
    try {
        const response = await fetch('/time_api');
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.time_api) { 
            const startDate = new Date("2024-06-28T20:32:00Z"); //此处时间为CST时间
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

            // 更新运行时间的函数
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

// 获取计数器数据的函数
async function updateCounter() {
    try {
        const response = await fetch('/counter');
        const data = await response.json();
        document.getElementById('counter_span').innerText = data.count;
    } catch (error) {
        console.error('无法获取计数器数据:', error);
    }
}

// 增加计数器的函数
async function incrementCounter() {
    try {
        await fetch('/counter/increment', { method: 'POST' });
        updateCounter();
    } catch (error) {
        console.error('无法增加计数器:', error);
    }
}

// 设置导航的函数
function setupNavigation() {
    document.querySelector('nav').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const href = e.target.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                navigateToSection(href.substring(1));
            }
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

// 修复导航到指定部分的逻辑
function navigateToSection(sectionId) {
    const target = document.querySelector(`[data-section="${sectionId}"]`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 服务器状态显示
async function showServerStatus() {
    try {
        const response = await fetch('/server_status');
        const data = await response.json();
        document.getElementById('server_status_span').innerHTML =
            `CPU使用率: ${data.cpu_percent}%` +
            `内存: ${(data.memory_used / 1024 / 1024).toFixed(1)}MB / ${(data.memory_total / 1024 / 1024).toFixed(1)}MB (${data.memory_percent}%)`;
    } catch (error) {
        document.getElementById('server_status_span').innerText = '无法获取服务器状态';
    }
}

// 页面加载时定时刷新服务器状态
window.onload = function() {
    setupNavigation();
    document.querySelector('.section').classList.add('active');
    const center = document.querySelector('.center');
    setTimeout(() => {
        center.classList.add('loaded');
    }, 100);
    AOS.init({ duration: 1500 });
    updateCounter();
    incrementCounter();
    showServerStatus();
    setInterval(showServerStatus, 10000);
};

document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00e0ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00e0ff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        }
    });

    // 隐藏加载动画并显示主内容
    setTimeout(() => {
        document.querySelector('.loader').style.opacity = '0';
        document.querySelector('.loader').style.visibility = 'hidden';
        document.getElementById('main-container').classList.add('loaded');
    }, 2000);

    // 更新子菜单显示逻辑
    function setupDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                console.log('Mouse entered:', dropdown);
                dropdown.classList.add('show');
            });
            dropdown.addEventListener('mouseleave', () => {
                console.log('Mouse left:', dropdown);
                dropdown.classList.remove('show');
            });
        });
    }

    // 调用 setupDropdowns 初始化子菜单逻辑
    setupDropdowns();
});

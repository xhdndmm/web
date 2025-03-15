//[https://github.com/xhdndmm/web]
//[https://xhdndmm.cn/]

// 显示运行时间的函数
async function show_runtime() {
    try {
        const response = await fetch('/time_api');
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.time_api) { 
            const startDate = new Date("2024-06-28T12:32:00Z"); //此处时间为UTC时间
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

// 导航到指定部分的函数
function navigateToSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    var target = document.querySelector(`[data-section="${sectionId}"]`);
    if (target) {
        setTimeout(() => {
            target.classList.add('active');
        }, 100); 
    }
}

// 页面加载完成后的初始化函数
window.onload = function() {
    setupNavigation();
    document.querySelector('.section').classList.add('active');
    
    const center = document.querySelector('.center');
    setTimeout(() => {
        center.classList.add('loaded');
    }, 100);

    AOS.init({
        duration: 1500
    });
}
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


locoScroll.stop()


gsap.set("body,#main", {
    overflowY: "hidden",
    overflowX: "hidden"
})

gsap.set("#nav", {
    y: -80
})
gsap.set("#elemm1", {
    opacity: 1
})

gsap.set("#elemm1 p", {
    opacity: 1
})

function loadingAnimation() {
    var timer = document.querySelector("#timer h1");
    var timerButton = document.querySelector("#timer button");
    var grow = 0;
    var int = setInterval(function () {
        if (grow < 90) {
            grow += Math.floor(Math.random() * 20);
            timer.innerHTML = grow + "%";
        } else {
            grow = 100;
            timer.innerHTML = grow + "%";
            timer.style.transform = "translateY(-100%)";
            timerButton.style.transform = "translateY(-100%)";
            timerButton.style.opacity = "1";

            clearInterval(int);
        }
    }, Math.floor(Math.random() * 300));

    var btn = document.querySelector("#page1 button")
    btn.addEventListener("click", function () {
        locoScroll.start()
        var tl = gsap.timeline()
        tl.to("#page1", {
            scale: 1,
            duration: 0.8
        }, "anim")
        tl.to("#main", {
            overflowY: "auto"
        }, "anim")
        tl.to("#log", {
            opacity: 1,
        }, "anim");
        tl.to(btn, {
            opacity: 0
        }, "anim")
        tl.to("#nav", {
            y: 0
        })
    })

}

loadingAnimation()

var text = document.querySelector("#page2-part1 h1").textContent
var clutter = ""
text.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
})

document.querySelector("#page2-part1 h1").innerHTML = clutter

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        scrub: 2,
        pin: true,
        start: "top 0",
        end: "top -200%"
    }
})
tl.to("#page2 h1 span", {
    color: "#111",
    stagger: 0.2,
})

// Commented out unused animations
/*
tl.to("#page2-part1", {
    transform: "translateX(-100vw)",
    duration: 10
}, "anim")
tl.to("#page2-part2", {
    transform: "translateX(-100vw)", 
    duration: 30
}, "anim")
*/

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page3",
        scroller: "#main", 
        start: "top 0",
        end: "top -200%",
        scrub: true,
        pin: true
    }
})

tl3.to("#page3 img", {
    y: 200
})
    .to("#page3 #elemm1", {
        opacity: 0.5
    }, "lol")
    .to("#page3 #elemm1 p", {
        opacity: 0
    }, "lol")
    .to("#page3 #elemm2", {
        opacity: 1
    }, "lol")
    .to("#page3 #elemm2 p", {
        opacity: 1
    }, "lol")
    .to("#page3 img", {
        y: 400
    })
    .to("#elemm2", {
        opacity: 0.5
    })
    .to("#elemm2 p", {
        opacity: 0
    })
    .to("#elemm3", {
        opacity: 1
    })
    .to("#elemm3 p", {
        opacity: 1
    })

function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });
}

swiperAnimation()

// Commented out duplicate init function since it's redundant
/*
function init() {
    // Duplicate locomotive scroll initialization
}
init()
*/

var overlay = document.querySelector("#overlay")
var iscroll = document.querySelector("#scroll")

overlay.addEventListener("mouseenter", function () {
    iscroll.style.scale = 1
})
overlay.addEventListener("mouseleave", function () {
    iscroll.style.scale = 0
})
overlay.addEventListener("mousemove", function (dets) {
    iscroll.style.left = `${dets.x - 45}px`
    iscroll.style.top = `${dets.y - 38}px`
})

document.querySelector("#paage3").addEventListener("mousemove", function (dets) {
    document.querySelector("#paage3 #img-div").style.left = `${dets.x}px`
    document.querySelector("#paage3 #img-div").style.top = `${dets.y}px`
})

document.querySelector("#page4").addEventListener("mousemove", function (dets) {
    document.querySelector("#page4>img").style.left = dets.x + "px"
    document.querySelector("#page4>img").style.top = dets.y + "px"
    document.querySelector("#page4>button").style.left = (dets.x + 50) + "px"
    document.querySelector("#page4>button").style.top = (dets.y + 200) + "px"
})

var elem = document.querySelectorAll(".elem")
elem.forEach(function (e) {
    var a = e.getAttribute("data-img")
    e.addEventListener("mouseenter", function () {
        document.querySelector("#page4>img").setAttribute("src", a)
    })
})

// Commented out unused animations
/*
gsap.from("#page2 h1", {
    duration: 0.5,
    onStart: function () {
        $('#page2 h1').textillate({
            in: {
                effect: 'bounceIn',
                delayScale: 0.5,
            }
        });
    },
    scrollTrigger: {
        trigger: "#page2 h1",
        scroller: "#main",
        start: "top 90%"
    }
})

gsap.to("#page2 img", {
    rotate: -5,
    scrollTrigger: {
        scroller: "#main",
        trigger: "#page2 img", 
        start: "top 80%",
        scrub: 3
    }
})
*/

gsap.to("#main", {
    backgroundColor: "#111",
    scrollTrigger: {
        scroller: "#main",
        trigger: "#page2",
        start: "top -100%",
        end: "top -100%",
        scrub: 3
    }
})

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "svg",
        scroller: "#main",
        start: "top 0%",
        end: "top -200%",
        scrub: true,
    }
})

tl.to("svg", {
    scale: 1,
    top: "5%",
    fill: "#111",
})

tl.to("#nav", {
    color: "#111",
    background: "linear-gradient(#ffffffeb,#ffffff6e,#ffffff00)",
})

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "svg",
        scroller: "#main",
        start: "top -340%",
        end: "top -340%",
        scrub: true,
    }
})
tl2.to("svg", {
    scale: 1,
    top: "5%",
    fill: "#fff",
})
tl2.to("#nav", {
    color: "#fff",
    background: "linear-gradient(#000000d5,#00000089,#00000000)",
})

// Commented out duplicate timeline animations
/*
var tl = gsap.timeline({...})
var tl2 = gsap.timeline({...})
*/

gsap.to("#page5", {
    scrollTrigger: {
        trigger: "#page5",
        scroller: "#main",
        start: "top 0%",
        end: "top -100%",
        scrub: true,
        pin: true,
    }
})
gsap.from("#page5-div1", {
    rotate: -5,
    scrollTrigger: {
        trigger: "#page5-div1",
        scroller: "#main",
        start: "top 85%%",
        end: "top 30%",
        scrub: true,
    }
})

gsap.from("#page5-div2", {
    y: 570,
    rotate: -15,
    scrollTrigger: {
        trigger: "#page5-div2",
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
        scrub: 2,
    }
})

document.querySelector("#nav i").addEventListener("click",function(){
    document.querySelector("#full-scr").style.top = "0vh"
})
document.querySelector("#full-scr i").addEventListener("click",function(){
    document.querySelector("#full-scr").style.top = "-100vh"
})

// Commented out auto-refresh on resize since it's not needed
/*
window.addEventListener("resize",function(){
    location.reload()
})
*/
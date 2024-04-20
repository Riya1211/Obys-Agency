function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function cursorAnimation(){
    // document.addEventListener('mousemove', function(dets){
    //     gsap.to('#crsr',{
    //         left: dets.x,
    //         top: dets.y
    //     })
    // })
    // 2nd way tomake mouse follower
    Shery.mouseFollower({
        skew: true,
        // ease:"cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1
    })
    // Magnet Effect  was okayish on Shery
    // Shery.makeMagnet(".nav-part2 h4" /* Element to target.*/, {
    //     //Parameters are optional.
    // });

    // used this function for magnet

    var hoverMouse = function (elements) {
        elements.forEach(function (element) {
          var self = element;
          var hover = false;
          var offsetHoverMax = self.getAttribute("offset-hover-max") || 0.7;
          var offsetHoverMin = self.getAttribute("offset-hover-min") || 0.5;
      
          var attachEventsListener = function () {
            window.addEventListener("mousemove", function (e) {
              //
              var hoverArea = hover ? offsetHoverMax : offsetHoverMin;
      
              // cursor
              var cursor = {
                x: e.clientX,
                y: e.clientY - window.scrollY
              };
      
              // size
              var width = self.offsetWidth;
              var height = self.offsetHeight;
      
              // position
              var offset = self.getBoundingClientRect();
              var elPos = {
                x: offset.left + width / 2,
                y: offset.top + height / 2
              };
      
              // comparaison
              var x = cursor.x - elPos.x;
              var y = cursor.y - elPos.y;
      
              // dist
              var dist = Math.sqrt(x * x + y * y);
      
              // mutex hover
              var mutHover = false;
      
              // anim
              if (dist < width * hoverArea) {
                mutHover = true;
                if (!hover) {
                  hover = true;
                }
                onHover(x, y);
              }
      
              // reset
              if (!mutHover && hover) {
                onLeave();
                hover = false;
              }
            });
          };
      
          var onHover = function (x, y) {
            TweenMax.to(self, 0.4, {
              x: x * 0.8,
              y: y * 0.8,
              //scale: .9,
              rotation: x * 0.05,
              ease: Power2.easeOut
            });
          };
          var onLeave = function () {
            TweenMax.to(self, 0.7, {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              ease: Elastic.easeOut.config(1.2, 0.4)
            });
          };
      
          attachEventsListener();
        });
    };
      
    var elements = document.querySelectorAll(".nav-part2 h4");
    hoverMouse(elements);
      

    // Second Page Video
    var vdoContainer = document.querySelector('.videoContainer');
    var video = document.querySelector('.videoContainer video');
    vdoContainer.addEventListener('mouseenter', function(){
        vdoContainer.addEventListener('mousemove', function(dets){
            gsap.to('.mousefollower',{
                opacity:0
            })
            gsap.to('#vdoCrsr',{
                left: dets.x - 530,
                y: dets.y - 300
            })
        })
    });
    vdoContainer.addEventListener('mouseleave', function(){
        gsap.to('.mousefollower',{
            opacity:1
        })
        gsap.to('#vdoCrsr',{
            left: "70%",
            top: "-15%"
        })
    });
    var flag = 0;
    vdoContainer.addEventListener('click', function(){
        if(flag == 0){
            video.play();
            video.style.opacity = 1;
            document.querySelector('#vdoCrsr').innerHTML = `<i class="ri-pause-fill"></i>`
            gsap.to('#vdoCrsr', {
                scale:0.5
            });
            flag = 1;
        } else{
            video.pause();
            video.style.opacity = 0;
            document.querySelector('#vdoCrsr').innerHTML = `<i class="ri-play-fill"></i>`
            gsap.to('#vdoCrsr', {
                scale:1
            })
            flag = 0;
        }
    })

}
function loaderAnimation(){
    var tl = gsap.timeline();
tl.from(".line h1",{
    y:150,
    stagger: 0.25,
    duration: 0.6,
    delay:0.5
});
tl.from('#line1-part1',{
    opacity: 0,
    onStart: function(){
        var h5timer = document.querySelector('#line1-part1 h5');
        var grow = 0;
        // setInterval is like a loop
        setInterval(function(){
            if(grow<100){
                h5timer.innerHTML = grow++;
            } else{
                h5timer.innerHTML = grow;
            }
        },33)
    }
});
tl.to('.line h2',{
    animationName: 'loaderNow',
    opacity:1
})
tl.to('.loader', {
    opacity:0,
    duration: 0.2,
    delay:4
});
tl.from('.page1',{
    delay:0.2,
    y:1500,
    opacity:0,
    duration: 0.6,
    ease: Power4
});
tl.to('.loader',{
    display: 'none'
})

// Page 1 Animation
tl.from('.nav',{
    opacity: 0
});
tl.from('#hero1 h1, #hero2 h1, #hero3 h2,#hero4 h1',{
    y: 130,
    stagger: 0.2
});
tl.from('#hero1, .page2',{
    opacity: 0
}, '-=1.2');
// }, '-=1.2'); This speeds up the process or you can say that the above play first
}
function page3ImgEffect(){
    Shery.imageEffect(".imgDiv", {
        style: 5,
        // debug: true,
        config:{"a":{"value":0.69,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272786988409361},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.21,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.66,"range":[0,10]},"metaball":{"value":0.43,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.44,"range":[0,2]},"noise_scale":{"value":7.63,"range":[0,100]}},
        gooey: true,
      });
}
function flagEffect(){
    document.addEventListener('mousemove', function(dets){
        gsap.to('#flag',{
            x:dets.x,
            y:dets.y,
        })
    })
    document.querySelector('#hero3').addEventListener('mouseenter', function(){
        gsap.to('#flag',{
            opacity:1
        })
    })
    document.querySelector('#hero3').addEventListener('mouseleave', function(){
        gsap.to('#flag',{
            opacity:0
        })
    })
}
// function footerAnimation() {
//     var clutter = ""
//     var clutter2 = ""
//     document.querySelector(".footer h1").textContent.split("").forEach(function (elem) {
//       clutter += `<span>${elem}</span>`
//     })
//     document.querySelector(".footer h1").innerHTML = clutter
//     document.querySelector(".footer h2").textContent.split("").forEach(function (elem) {
//       clutter2 += `<span>${elem}</span>`
//     })
//     document.querySelector(".footer h2").innerHTML = clutter2
//     document.querySelector("#footer-text").addEventListener("mouseenter", function () {
//       gsap.to(".footer h1 span", {
//         opacity: 0,
//         stagger: 0.05
//       })
//       gsap.to(".footer h2 span", {
//         delay: 0.1,
//         opacity: 1,
//         stagger: 0.1
//       })
//     })
//     document.querySelector("#footer-text").addEventListener("mouseleave", function () {
//       gsap.to(".footer h1 span", {
//         opacity: 1,
//         stagger: 0.1,
//         delay: 0.1, 
//       })
//       gsap.to(".footer h2 span", {
//         opacity: 0,
//         stagger: 0.05
//       })
//     })
// }


// best 

function footerAnimation() {
    var clutter = "";
    var clutter2 = "";
    document.querySelector(".footer h1").textContent.split("").forEach(function (elem) {
        clutter += `<span>${elem}</span>`;
    });
    document.querySelector(".footer h1").innerHTML = clutter;
    document.querySelector(".footer h2").textContent.split("").forEach(function (elem) {
        clutter2 += `<span>${elem}</span>`;
    });
    document.querySelector(".footer h2").innerHTML = clutter2;

    // By making the timeline paused it gives me the ability to start and stop the animations

    var tlH1 = gsap.timeline({ paused: true });
    var tlH2 = gsap.timeline({ paused: true });
    var isAnimatingH1 = false;
    var isAnimatingH2 = false;

    tlH1.to(".footer h1 span", {
        opacity: 0,
        // stagger: 0.05
        stagger: 0.03,
        duration: 0.25
    });

    tlH2.to(".footer h2 span", {
        delay: 0.15,
        opacity: 1,
        // stagger: 0.1
        stagger: 0.07,
        duration: 0.25
    });

    var tlReverseH1 = gsap.timeline({ paused: true });
    var tlReverseH2 = gsap.timeline({ paused: true });

    tlReverseH1.to(".footer h1 span", {
        opacity: 1,
        // stagger: 0.1,
        stagger: 0.07,
        duration: 0.25,
        delay: 0.15
    });

    tlReverseH2.to(".footer h2 span", {
        opacity: 0,
        // stagger: 0.05
        stagger: 0.03,
        duration: 0.25
    });

    //  using restart() ensures that the reverse animations always start from the beginning when the mouse 
    // leaves, even if they were partially completed or interrupted before. This can be useful for maintaining 
    // consistent behavior and ensuring that the animations always look smooth and complete.

    document.querySelector("#footer-text").addEventListener("mouseenter", function () {
        if (!isAnimatingH1 && !isAnimatingH2) {
            isAnimatingH1 = true;
            isAnimatingH2 = true;
            tlH1.restart();
            tlH2.restart();
        }
    });

    document.querySelector("#footer-text").addEventListener("mouseleave", function () {
        if (tlH1.isActive() || tlH2.isActive()) {
            tlH1.reverse();
            tlH2.reverse();
        } else {
            tlReverseH1.restart();
            tlReverseH2.restart();
        }
        // Reset flags after handling animations
        isAnimatingH1 = false;
        isAnimatingH2 = false;
    });

    // Set flags on animation complete to handle quick mouse leave
    tlH1.eventCallback("onComplete", function() {
        isAnimatingH1 = false;
    });
    tlH2.eventCallback("onComplete", function() {
        isAnimatingH2 = false;
    });
}

cursorAnimation();
locomotiveAnimation();
loaderAnimation();
page3ImgEffect();
flagEffect();
footerAnimation();
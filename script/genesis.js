(function($,window,document){
    const genesis ={
        init(){
            this.section1();
            this.section2();
        },
        section1(){
            //변수
            //메인슬라이드함수
            //다음카운트함수
            //자동타이머
            //페이지버튼클릭이벤트
            //터치스와이프
            //드래그&드롭

            //변수
            let cnt=0;
            let setId =0;
            let touchStart =null;
            let touchEnd = null;
            let mouseDown = false;
            let dragStart =null;
            let dragEnd =null;
            let winW =$(window).width();        //창너비; $(윈도우).너비()
            //메인슬라이드 0 1 2 3 4 5 6 7 8 9 10 꼭 적고 시작
            function mainSlide(){
                $('.slide-wrap').stop().animate({left:`${-100*cnt}%`},600,'easeInOutExpo',function(){
                    if(cnt>10)cnt=0;
                    if(cnt<0)cnt=10;
                    $('.slide-wrap').stop().animate({left:`${-100*cnt}%`},0);
                });
                //페이지번호
                $('.page-btn').removeClass('on')
                $('.page-btn').eq(cnt>10?0:cnt).addClass('on')
            }
            //다음카운트
            function nextCount(){
                cnt+=1;
                mainSlide();
            }
            //이전카운트
            function prevCount(){
                cnt-=1;
                mainSlide();
            }
            //자동타이머함수
            function autoTimer(){
                setId =setInterval(nextCount,3000);
            }
            autoTimer();
            //페이지버튼클릭이벤트
            $('.page-btn').each(function(idx){
                $(this).on({
                    click(){
                        clearInterval(setId);
                        cnt=idx;
                        mainSlide();
                        autoTimer();
                    }
                });
            });
            $('.play-stop-btn').on({
                click(){
                    if($(this).hasClass('play')===true){
                        clearInterval(setId);
                        $(this).removeClass('play');
                        $(this).addClass('stop');
                    }
                    else{
                        $(this).removeClass('stop');
                        $(this).addClass('play');
                        autoTimer();
                    }
                }
            });

            //터치스와이프
            $('.content').on({
                mousedown(e){
                    mouseDown = true;  
                    winW =$(window).width();
                    $('.slide-container').css({cursor:'grabbing'});
                    clearInterval(setId);
                    touchStart = e.clientX;
                    dragStart = e.clientX-($('.slide-wrap').offset().left+winW);
                },
                mousemove(e){
                    if(!mouseDown) return;
                    dragEnd = e.clientX;
                    console.log(dragEnd-dragStart); //드래그길이
                    $('.slide-wrap').css({left:`${dragEnd-dragStart}px` })
                },
                mouseup(e){
                    mouseDown = false; 
                    $('.slide-container').css({cursor:'grab'});
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd>500){
                        nextCount();
                    }
                    if(touchStart-touchEnd<-500){
                        prevCount();
                    }
                    if(touchStart-touchEnd>=-500 && touchStart-touchEnd<=500){
                        mainSlide();
                    }
                }
            })
            $(document).on({
                mouseup(e){

                    
                    
                    if(!mouseDown) return;           

                    mouseDown = false; 
                    $('.slide-container').css({cursor:'grab'});
                    touchEnd = e.clientX;
                    if(touchStart > touchEnd){
                        nextCount();
                    }
                    if(touchStart < touchEnd){
                        prevCount();
                    }
                    autoTimer();
                }

            })
        },//조심 넘어가면안되요!!!
        section2(){

        }
    }
    genesis.init();
})(jQuery,window,document);
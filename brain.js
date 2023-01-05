
var pathname = new URL(location.href).pathname.split('/');
pathname.pop()
// console.log(pathname)
let chapterString = pathname[pathname.length-2]
let chptrInd=""
for(let i=0;i<chapterString.length;++i){
    if(Number.isInteger(parseInt(chapterString[i])))chptrInd+=chapterString[i]
}
chptrInd=parseInt(chptrInd)
pathname=pathname[pathname.length-1]
let ind=""
for(let i=0;i<pathname.length;++i){
    if(Number.isInteger(parseInt(pathname[i])))ind+=pathname[i]
}

ind=parseInt(ind)
for(let i=0;i<n;++i){
    let t=document.createElement('div')
    t.setAttribute('class','verseBox')
    if(i+1==ind){
        t.setAttribute('id','currentVerse')
    }
    document.getElementById('verses').appendChild(t)
}
let verses=document.getElementsByClassName('verseBox')
for(let i=0;i<verses.length;++i){
    verses[i].textContent=i+1
    if(i+1==ind)continue
    verses[i].addEventListener('click',()=>{
        location.href='../verse'+parseInt(i+1)
    })
}

let fontSizeRange = document.getElementById('fontSizeRange')
fontSizeRange.addEventListener('input',()=>{
    let fontSize=fontSizeRange.value 
    document.getElementById('content').style.fontSize=fontSize+"px"
})

let chname = document.getElementById('chname')
chname.innerHTML="<div style='font-size:20px;margin-bottom:15px;'>अध्याय <span id='chptr'>"+chptrInd+"</span></div>"+chname.textContent 
document.getElementById('title').textContent=document.getElementById('chname').textContent+" | श्लोक: "+ind



var client = new XMLHttpRequest();
client.open('GET', '/extra1.ejs');
client.onreadystatechange = function() {
let ejstext=client.responseText
var html = ejs.render(ejstext);
document.getElementById('extra1').innerHTML = html;

}
client.send();

var client2 = new XMLHttpRequest();
client2.open('GET', '/extra2.ejs');
client2.onreadystatechange = function() {
    let ejstext=client2.responseText
    let html = ejs.render(ejstext);
    document.getElementById('extra2').innerHTML = html;
    

    
        var client6 = new XMLHttpRequest();
            client6.open('GET', '/completed.ejs');
            client6.onreadystatechange = function() {
                let ejstext=client6.responseText
                let html = ejs.render(ejstext);
                document.getElementById('completed').innerHTML = html;
            
                try{
                    let chptr=document.getElementById('chptr').textContent

                    document.getElementById('pageInfo').innerHTML="<a href='/chapter"+chptr+"/verse1'>अध्याय "+chptr+"</a> > श्लोक "+ind

                        let completedCheck=document.getElementById('completedCheck')
                        let saveCheck = document.getElementById('saveCheck')


                        if(localStorage.getItem('completedArray')){
                            let arr=JSON.parse(localStorage.getItem('completedArray'))
                            if(arr.includes(chptr+"."+ind)){
                                completedCheck.checked=true
                            }
                            let comp=(arr.length/700)*100
                            comp=comp.toFixed(1)
                            document.getElementById('progressBar').style.width=comp+"%"
                            document.getElementById('completedData').textContent=arr.length+"/"+700
                        }


                        completedCheck.addEventListener('click',()=>{
                            if(!localStorage.getItem('completedArray')){
                                localStorage.setItem('completedArray',JSON.stringify([]))
                            }
                            let completedArray = JSON.parse(localStorage.getItem('completedArray'))
                            if(completedCheck.checked==true){
                                if(completedArray.includes(chptr+"."+ind)==false)
                                completedArray.push(chptr+"."+ind)
                                localStorage.setItem('completedArray',JSON.stringify(completedArray))
                            }
                            else{
                                const index = completedArray.indexOf(chptr+"."+ind);
                                if (index > -1) { 
                                    completedArray.splice(index, 1); 
                                }
                                localStorage.setItem('completedArray',JSON.stringify(completedArray))
                            }
                            
                            location.reload()
                        })
                        
                        if(localStorage.getItem('savedArray')){
                            let arr=JSON.parse(localStorage.getItem('savedArray'))
                            if(arr.includes(chptr+"."+ind)){
                                saveCheck.checked=true
                            }
                        }
                        saveCheck.addEventListener('click',()=>{
                            if(!localStorage.getItem('savedArray')){
                                localStorage.setItem('savedArray',JSON.stringify([]))
                            }
                            let savedArray = JSON.parse(localStorage.getItem('savedArray'))
                            if(saveCheck.checked==true){
                                if(savedArray.includes(chptr+"."+ind)==false)
                                savedArray.push(chptr+"."+ind)
                                localStorage.setItem('savedArray',JSON.stringify(savedArray))
                            }
                            else{
                                const index = savedArray.indexOf(chptr+"."+ind);
                                if (index > -1) { 
                                    savedArray.splice(index, 1); 
                                }
                                localStorage.setItem('savedArray',JSON.stringify(savedArray))
                            }
                            console.log(savedArray)
                            location.reload()
                        })
                    }
                    catch(e){
                        console.log(e)
                    }
            }
        client6.send();

}
client2.send();


var client3 = new XMLHttpRequest();
client3.open('GET', '/footer.ejs');
client3.onreadystatechange = function() {
    let ejstext=client3.responseText
    let html = ejs.render(ejstext);
    document.getElementById('footer').innerHTML = html;
        // Get the button
    let mybutton = document.getElementById("myBtn");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }
    
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }
    try{
        mybutton.addEventListener('click',topFunction)
    }
    catch(e){
        console.log(e)
    }

}
client3.send();



var client5 = new XMLHttpRequest();
client5.open('GET', '/nav.ejs');
client5.onreadystatechange = function() {
    let ejstext=client5.responseText
    let html = ejs.render(ejstext);
    document.getElementById('nav').innerHTML = html;

    var client4 = new XMLHttpRequest();
    client4.open('GET', '/heading.ejs');
    client4.onreadystatechange = function() {
        let ejstext=client4.responseText
        let html = ejs.render(ejstext);
        document.getElementById('heading').innerHTML = html;

        let fontSizeRange = document.getElementById('fontSizeRange')
            fontSizeRange.addEventListener('input',()=>{
                let fontSize=fontSizeRange.value 
                document.getElementById('content').style.fontSize=fontSize+"px"
        })
        
    }
    client4.send();
}
client5.send();

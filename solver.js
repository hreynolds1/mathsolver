try{
    var answersright=0;
    var questionnum=0;
    function addElement(parentId, elementTag, elementId, html) {
        var p = document.getElementById(parentId);
        //alert(parentId)
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        p.appendChild(newElement);
    }
    function removeElement(elementId) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
    function randint(min, max) {
        min=parseInt(min)
        max=parseInt(max)
        if (min>max){
            temp=max
            max=min
            min=temp
            alert("Swapped")
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function choice(li) {
        return li[randint(0,li.length-1)]
    }
    /*
    operations=["+","-"]
    if (desiredprompt("Would you like to play on hard mode?",["no","yes"],"Response must be 'Yes' or 'No'",true).toLowerCase()=="yes"){
        operations.push("*","/")
    }
    */
    function getrounds(){
        header=document.getElementById("header")
        questionnum=document.getElementById("rounds").value
        if (questionnum==""){
           return;
        }
        removeElement("rounds")
        removeElement("roundbutton")
        header.innerHTML="Select a maximum and minimum number"
        addElement("inputs",'input',"minnumber","")
        addElement("inputs",'br',"","")
        minelement=document.getElementById('minnumber')
        minelement.type="number"
        minelement.placeholder="Minimum number"
        addElement("inputs",'input',"maxnumber","")
        maxelement=document.getElementById('maxnumber')
        maxelement.type="number"
        maxelement.placeholder="Maximum number"
        addElement("inputs",'br',"linebreak","")
        addElement("inputs",'button',"maxbutton","Submit")
        document.getElementById("maxbutton").onclick=function() {getmaxmin()}
    }
    function getmaxmin(){
        minnumber=document.getElementById("minnumber").value
        maxnumber=document.getElementById("maxnumber").value
        if (minnumber=="" || maxnumber==""){
            return;
        }
        removeElement("minnumber")
        removeElement("maxnumber")
        removeElement("maxbutton")
        removeElement("linebreak")
        header=document.getElementById("header")
        header.innerHTML="Select a difficulty"
        addElement("inputs","button","easy","Easy")
        document.getElementById("easy").onclick=function() {setdifficulty("easy")}
        addElement("inputs","button","hard","Hard")
        document.getElementById("hard").onclick=function() {setdifficulty("hard")}
    }
    var operations=["+","-"]
    function setdifficulty(difficulty){
        if (difficulty!="easy"){
            operations.push("*","/")
        }
        removeElement("inputs")
        addElement("overall","div","game","")
        addElement("game","h2","questionnum","")
        addElement("game","h2","question","")
        addElement("game","input","answer")
        addElement("game","button","enteranswer","Submit")
        inputbar=document.getElementById("answer")
        inputbar.placeholder="Answer"
        inputbar.type="text"
        document.getElementById("enteranswer").onclick=function() {submitanswer()}
        createquestion(1)
    }

    function submitanswer(){
        try{
            
            if (document.getElementById("answer").value==eval(document.getElementById("question").innerHTML)){
                //alert("Epic you got it right")
                answersright+=1
                correct="Correct!"
            } else {
                correct="Haha stupid idiot you got it wrong the answer was "+eval(document.getElementById("question").innerHTML)
            }
            document.getElementById("question").hidden=true
            addElement("game","h3","correct",correct)
            addElement("game","p","amountright","Your score: "+answersright)
            addElement("game","button","nextquestion","Next question")
            document.getElementById("nextquestion").onclick=function() {createquestion(parseInt(document.getElementById("questionnum").innerHTML.replace("Question ",""))+1)}
        } catch (err){
            alert(err.message)
        }
    }

    function createquestion(currentnum){
        document.getElementById("")
        try{
            looped=false
            if (currentnum>questionnum){
                removeElement("game")
                addElement("overall","div","finish","")
                addElement("finish","h2","congrats","Congratulations!")
                addElement("finish","h3","finalscore","Your score: "+answersright)
                addElement("finish","h3","lazy","Refresh to start again because I'm too lazy to write a restart function")
            } else {
                try{
                    removeElement("correct")
                    removeElement("amountright")
                    removeElement("nextquestion")
                } catch (err){}
                if (isNaN(parseInt(document.getElementById("question").innerHTML))){
                    questionval=-1
                } else {
                    questionval=parseInt(document.getElementById("question").innerHTML)
                }
                alert(eval(questionval))
                alert(eval(questionval)!=parseInt(eval(questionval)))
                alert(eval(questionval)<0)
                while (((eval(questionval)!=parseInt(eval(questionval)) && eval(questionval)<0)) || !(looped)){
                    document.getElementById("questionnum").innerHTML="Question "+currentnum
                    question=""+randint(minnumber,maxnumber)+choice(operations)+randint(minnumber,maxnumber)
                    document.getElementById("question").innerHTML=question
                    document.getElementById("question").hidden=false
                    questionval=document.getElementById("question").innerHTML
                    looped=true
                }
            }
        } catch (err){
            alert(err.message)
        }
    }
} catch (err){
    alert(err.message)
}

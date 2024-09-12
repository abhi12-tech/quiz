var index;
initialize = () => {
     index = 0;
};

const _dirty = {
    1: "16 – 30",
    2: "51- 100",
    3: "Plant Code",
    4: "6 June",
    5: "Digital Resilience"
};

const _wrong_dirty = {
    1: "No",
    2: "1960",
    3: "5",
    4: "Taylor Swift"
};

const pos_mark = 2;
const neg_mark = -1;

let marks_obtained = {
};

const quiz = {
    1 : {
        "question" : "How many company codes are there?",
        "options"  : [
            "0 – 10", "10 – 15", "16 – 30", "31 – 35"
        ]
    },
    2 : {
        "question" : "How many onsite consultants (BPO, BPL) are there as of today? (YHS - & IBM)",
        "options"  : [
             "10-30", "31- 50", "51- 100", "as many stars as in the sky"
        ]
    },
     3 : {
        "question" : "What does this code signify – KMPP?",
        "options"  : [
             "Plant Code", "Company Code", "Sales Org", "Postal Code"
        ]
    },
    4 : {
        "question" : "When did the project kick-off?",
        "options"  : [
            "6 June", "16 June", "26 June", "36 June"
        ]
    },
    5 : {
        "question" : "Which is one of the reasons for S/4 HANA transformation?",
        "options"  : [
            "Digital Resilience", "User authorization compliance", "ECC license renewal", "Just because…"
        ]
    }
}

const btn_sub_ans = document.getElementById("sub_ans");

const hideHomeComps = () => {
    document.getElementById("soy_product").classList.add('hide');
    document.getElementById("quiz_start").classList.add('hide');
}

const getRequiredDivs = () => {
    const qaDiv = document.getElementById("qa_div");
    const qDiv = document.getElementById("q_div");
    const optDiv = document.getElementById("opt_div");
    return [qaDiv, qDiv, optDiv];
}

const showQuiz = () => {

    if(index === 0) {
        hideHomeComps();
        showTimer();
        index = index + 1;
        // result = confirm('Do you want to start the quiz?');
        // if(!result) return;
    }

    const [qaDiv, qDiv, optDiv] = getRequiredDivs();
    
    const qz = quiz[index];
    const htmlLegend = getHTMLLegend(quiz[index]['question'],index);
    const htmlOptions = getHTMLOptions(quiz[index]['options']);

    qDiv.innerHTML = htmlLegend;
    optDiv.innerHTML = htmlOptions;  
    qaDiv.classList.add('show');
}

const getHTMLLegend = (quest, ind) => {
    return "<legend>"+ind+". "+ quest +"</legend> <br/>"
}

const getHTMLOptions = (options) => {
    let id_idx = 1;
    const htmlOptions = options.map(op => {
       return "<label>" 
        + "<input type='radio' name='quest' value='" + op + "' id='opt"+(id_idx++) +"' />"
        + " "+op
        "</label> "
        +""
    });
    let htmlOptionsStr = "";
    htmlOptions.forEach(element => {
        htmlOptionsStr += element;
    });
    return htmlOptionsStr;
}

const submitAns = (event) => { 
    const selectedRadio = document.querySelector('input[name="quest"]:checked');
    const selectedValue = selectedRadio ? selectedRadio.value : null;
    const error_div = document.getElementById("error_div");
    if(!selectedValue) {
       error_div.classList.remove('hide');
       error_div.classList.add('show_error');
       return;
    }
    error_div.classList.remove('show_error');
    error_div.classList.add('hide');
    disable_button_sub_ans();
    disable_radio_options();
    assign_mark(selectedValue);
    setTimeout(next_question,2000);
    if(Object.keys(marks_obtained).length === Object.keys(quiz).length) {
        setTimeout(final_submit, 1000);
    }
}

const disable_button_sub_ans = () => {
    btn_sub_ans.classList.remove('red_button');
    btn_sub_ans.classList.add('grey_button');
    btn_sub_ans.disabled = true;
}

const enable_button_sub_ans = () => {
    btn_sub_ans.classList.remove('grey_button');
    btn_sub_ans.classList.add('red_button');
    btn_sub_ans.disabled = false;
}

const disable_radio_options = () => {
    const opt1 = document.getElementById("opt1");
    const opt2 = document.getElementById("opt2");
    if(opt1) {  
        opt1.disabled = true;
        opt1.checked = true;
    }
    if(opt2) {
        opt1.checked = true;
        opt2.disabled = true;
    }
}

const enable_radio_options = () => {
    const opt1 = document.getElementById("opt1");
    const opt2 = document.getElementById("opt2");
    if(opt1) {  
        opt1.disabled = false;
        opt1.checked = true;
    }
    if(opt2) {
        opt1.checked = true;
        opt2.disabled = false;
    }
}

const assign_mark = (ans_choosen) => {
    if(ans_choosen === _dirty[index]) {
            if(!marks_obtained[index]) {
                marks_obtained[index] = pos_mark;
                show_result('show_result', ans_choosen, true)
            }
        } else {
            if(!marks_obtained[index]) {
                marks_obtained[index] = neg_mark;
                show_result('show_result', ans_choosen, false)
            }
        }
}

const show_result = (div_id, ans, is_correct) => {
   const result_div = document.getElementById(div_id);
   if(is_correct) {
    result_div.innerHTML = "Bravo! '"+ans+"' is <b><u>correct</u></b> option. +"+pos_mark;
   } else {
    result_div.innerHTML = "Oops! '"+ans+"' is <b><u>incorrect</u></b> option. "+neg_mark;
   }
   result_div.classList.remove('hide');
   result_div.classList.add('show');
}

const hide_result = (div_id) => {
    const result_div = document.getElementById(div_id);
    result_div.classList.remove('show');
    result_div.classList.add('hide');
}

const next_question = () => {
    if(index >= Object.keys(quiz).length) {
        return;
    }
    index = index + 1;
    if(!marks_obtained[index]) {
        hide_result('show_result');
        enable_radio_options();
        enable_button_sub_ans();
    } else {
        const temp_chos = marks_obtained[index] > 0 ? _dirty[index] : _wrong_dirty[index];
        show_result('show_result', temp_chos, marks_obtained[index] > 0 ? true : false);
        disable_radio_options();
        disable_button_sub_ans();
    }
    showQuiz();
}

const prev_question = () => {
    if(index <= 1) {
        return;
    }
    index = index - 1;
    if(!marks_obtained[index]) {
        hide_result('show_result');
        enable_radio_options();
        enable_button_sub_ans();
    } else {
        const temp_chos = marks_obtained[index] > 0 ? _dirty[index] : _wrong_dirty[index];
        show_result('show_result', temp_chos, marks_obtained[index] > 0 ? true : false);
        disable_radio_options();
        disable_button_sub_ans();
    }
    showQuiz();
}

const hide_div = (div_id) => {
    const div = document.getElementById(div_id);
    div.classList.remove('show');
    div.classList.add('hide');
}

const show_div = (div_id) => {
    const div = document.getElementById(div_id);
    div.classList.add('show');
    div.classList.remove('hide');
}

var totalSeconds = 0;
var totalMilliSeconds = 0;
const showTimer = () => {
    setTime();
    setInterval(setTime, 1); //call at every milli second
}


function setTime() {
    const timer_div = document.getElementById("timer_div");
    timer_div.classList.remove('hide');
    if(!timer_div.classList.contains('show')) {
        timer_div.classList.add('show');
    }
    const minutesLabel = document.getElementById("minutes");
    const secondsLabel = document.getElementById("seconds");
    const milliSecondsLabel = document.getElementById("milliseconds");
    ++totalMilliSeconds;
    totalSeconds = parseInt(totalMilliSeconds / 1000);
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    milliSecondsLabel.innerHTML = padMilli(totalMilliSeconds % 1000);
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function padMilli(val) {
  const valString = val + "";
  if (valString.length < 3) {
    if(valString.length < 2) {
        return "00" + valString;
    }
    return "0" + valString;
  } else {
    return valString;
  }
}


const final_submit = () => {
    hide_div('qa_div');
    
    let final_score = 0;
    Object.values(marks_obtained).forEach(value => {
        final_score += value;
    })
   
    const show_fin_result = document.getElementById('show_fin_result');   
    

    const minutesLabel = document.getElementById("minutes");
    const secondsLabel = document.getElementById("seconds");
    const milliSecondsLabel = document.getElementById("milliseconds");
    const timeTaken = minutesLabel.textContent+":"+ secondsLabel.textContent+":"+milliSecondsLabel.textContent;
    hide_div('timer_div'); 
    show_fin_result.innerHTML = "<h2>Congratulations! </h2><h3>You scored: "+final_score +" </h3> In ["+timeTaken+"] (mm:ss:ms)";
    show_div('final_result_div');
}

const elem = document.getElementById("quiz_start");
elem.addEventListener("click", showQuiz)
elem.addEventListener("touchstart", showQuiz)


btn_sub_ans.addEventListener("click", submitAns)
btn_sub_ans.addEventListener("touchstart", submitAns)

// const btn_final_sub = document.getElementById("btn_final_sub");
// btn_final_sub.addEventListener("click", final_submit)
// btn_final_sub.addEventListener("touchstart", final_submit)
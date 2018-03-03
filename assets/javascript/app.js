window.onload = function () {


    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);

    $(".jumbotron").on("click", ".answer", gameplay.checkAnswer);

};

var intervalId;
var questionNumber = 0;
var numberCorrect = 0;
var numberWrong = 0;
var clockRunning = false;

//gameplay object holding functions for proceedind through game
var gameplay = {

    loadQuestion: function (n) {

        $(".answer").text("");

        $(".question-prompt").text(questions[n].prompt);

        for (i = 0; i < 4; i++) {

            var possibleAnswer = $("<div>");
            possibleAnswer.text(questions[n].answer[i]);
            possibleAnswer.data("index", i);
            possibleAnswer.addClass("answer lead");
            $(".question-area").append(possibleAnswer);
        }

    },

    checkAnswer: function () {

        console.log("hello there")
        console.log(questions[questionNumber].correct);
        console.log($(this).data("index"));
        console.log("question number: " + questionNumber);

        if (questionNumber < questions.length) {

            if ($(this).data("index") === questions[questionNumber].correct) {
                console.log("hurray you got it");
                numberCorrect++;
                stopwatch.time = 10;
                console.log(stopwatch.time);

                $(".number-correct").text("correct: " + numberCorrect);

            } else {
                console.log("swing and a miss");
                numberWrong++;
                stopwatch.time = 10;
                console.log(stopwatch.time);

                $(".number-wrong").text("wrong: " + numberWrong);
            };

        };



        if (questionNumber < questions.length) {

            questionNumber++;
            // not sure why this isn't working, gameplay.loadQuestion is running immediately
            setTimeout(gameplay.loadQuestion(questionNumber), 3000);


        } else {

            console.log("game over");
            stopwatch.stop();
            $("#reset").removeClass("hidden");



        }


    },


};








var stopwatch = {

    time: 10,

    reset: function () {

        stopwatch.time = 10;

        $("#display").text("02:00");
        $(".lead").text("");
        $("#reset").addClass("hidden");


        stopwatch.stop()

        questionNumber = 0;
        numberCorrect = 0;
        numberWrong = 0;

        $(".number-correct").text("correct: " + numberCorrect);
        $(".number-wrong").text("wrong: " + numberWrong);
        $("#start").removeClass("hidden");



    },

    start: function () {

        gameplay.loadQuestion(questionNumber)
        $("#start").addClass("hidden");


        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }

    },

    stop: function () {

        clearInterval(intervalId);
        clockRunning = false;



        console.log("stopwatch is stopped");
    },

    count: function () {

        stopwatch.time--;

  
        var converted = stopwatch.timeConverter(stopwatch.time);

        $("#display").text(converted);

        if (stopwatch.time === 0) {

            console.log("swing and a miss");
            numberWrong++;
            stopwatch.time = 10;
            console.log(stopwatch.time);

            $(".number-wrong").text("wrong: " + numberWrong);

         

            if (questionNumber < questions.length - 1) {

                questionNumber++;
                gameplay.loadQuestion(questionNumber);

            } else {

                console.log("game over");
                stopwatch.stop();

            }
        }
    },


    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
};


// array holding all of the question-objects
var questions = [

    {
        prompt: "For the last several years, interest rates have been?",
        answer: ["extremely low", "low", "average", "high"],
        correct: 0,
    },

    {
        prompt: "If bulls make money, and bears make money, what do pigs do?",
        answer: ["make money", "say 'oink oink'", "get slaughtered", "star in youtube videos"],
        correct: 2,
    },

    {
        prompt: "In 2001, Barry Bonds' slugging percentage was 863. If that was a person's credit score it would be considered:",
        answer: ["extremely low", "low", "average", "high"],
        correct: 0,
    },

    {
        prompt: "If bulls make money, and bears make money, what do pigs do?",
        answer: ["make money", "say 'oink oink'", "get slaughtered", "star in youtube videos"],
        correct: 2,
    },

    {
        prompt: "The recently imploded XIV was an inverse ETN tracking VIX futures which are based on the CBOE volatility index. This product had:",
        answer: ["small beta, positive delta", "negative delta, small beta", "positive delta, high beta", "high alpha, low omega-3"],
        correct: 0,
    },

    {
        prompt: "The largest one-day decline of the Dow Jones industrial average occured in the year:",
        answer: ["2018", "2008", "1987", "1929"],
        correct: 2,
    },

    {
        prompt: "For the last several years, interest rates have been?",
        answer: ["extremely low", "low", "average", "high"],
        correct: 0,
    },

    {
        prompt: "this is the last question",
        answer: ["make money", "say 'oink oink'", "get slaughtered", "star in youtube videos"],
        correct: 2,
    },
];

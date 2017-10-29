var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var defaultRoom = 'dashboardFees';
var postObjects = [];
var countDownToUpdate = 3;
var interval;
io.on('connection', function (socket) {

    clearInterval(interval);
    socket.join(defaultRoom);
    interval = setInterval(function () {
        if (socket) {
            io.sockets.in(defaultRoom).emit(defaultRoom, randomPosts());
        }
    }, 5000);


    socket.on('disconnect', function () {
        clearInterval(interval);
    });
});

function randomPosts() {
    if (countDownToUpdate >= 1) {
        postObjects = [];

        for (var index = 0; index < 5; index++) {

            postObjects.push({
                id: guid(),
                name: "post_name",
                upvoteCount: 100000000,
                commentCount: 50000000,
                title: "This new application is very cool!",
                link: "https://reddit.com/r/NewApplication/comments/78a9b1/post_name"
            })
        }
    } else {
        countDownToUpdate = 3;
        postObjects.forEach(function (post) {
            post.name = post.name + '(edited)';
            post.upvoteCount = Math.floor((Math.random() * 100000000) + 1);
            post.commentCount = Math.floor((Math.random() * 50000000) + 1);
        })
    }
    countDownToUpdate--;
    return postObjects;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

http.listen(3000, function () {
    console.log('listening on localhost:3000');
});

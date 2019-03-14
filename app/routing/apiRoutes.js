var path = require("path");

var friends = require("../data/friends");

module.exports = function (app) {
    //return all friends found in friends.js as JSON
    app.get("/api/friends", function (req, res) {
        res.json(friends);

    })

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        //receive user details (name, photo, score)
        var user = req.body;

        //parseInt for score
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        };

        //default friend match is the first friend but result will be whoever has the minimum difference in score
        var bestFriendIndex = 0;
        var minimumDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }
        friends.push(user);

        res.json(friends[bestFriendIndex]);
    })
}
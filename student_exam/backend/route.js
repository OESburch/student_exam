const express = require('express');
const router = express.Router();

const Exam = require('./schema/examSchema');

router.get('/exams', (req, res, next) => {
    Exam.find((err, items) => {
        if (err) {
            res.json(err);
        } else {
            res.json(items);
        }
    })
})



router.get('/exams/math', (req, res, next) => {

    Exam.find({
        examType: "math"
    }, function (err, result) {
    
        if (err) {
            return err;
        } else {
            // res.json({msg: 'Items has been added successfully'});
            return res.status(201).send(result);
            // console.log(result);
        }
    });
});


router.get('/exams/english', (req, res, next) => {

    Exam.find({
        examType: "english"
    }, function (err, result) {
    
        if (err) {
            return err;
        } else {
            // res.json({msg: 'Items has been added successfully'});
            return res.status(201).send(result);
            // console.log(result);
        }
    });
});
router.post('/exam', (req, res, next) => {

    let newExam = new Exam({
        examType: req.body.type,
        examGrade: "level1",
        examProblem: req.body.question,

        examAnswer1: req.body.answer1,
        examAnswer2: req.body.answer2,
        examAnswer3: req.body.answer3,
        examAnswer4: req.body.answer4,
        examResult: req.body.correctNum,

        examDone: true,

    });
    newExam.save((err) => {
        if (err) {
            // console.log("err");
            return err;
        } else {
            // res.json({msg: 'Items has been added successfully'});
            return res.status(201).send("Register the exam question successfully");

        }
    });
});

router.put('/exam/:id', (req, res, next) => {
    Exam.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                examType: req.body.examType,
                examGrade: req.body.examGrade,
                examProblem: req.body.examProblem,

                examAnswer1: req.body.examAnswer1,
                examAnswer2: req.body.examAnswer2,
                examAnswer3: req.body.examAnswer3,
                examAnswer4: req.body.examAnswer4,
                examResult: req.body.examResult4,

                examDone: req.body.examDone,
            }
        },
        (err, result) => {
            if (err) {
                // return err;
                console.log("err");
            } else {
                // res.json(result);
                // res.json({msg: 'updated successfully'});
                console.log("success");
                return res.status(201).send("Register the exam question successfully");
            }
        }
    )
});

router.delete('/exam/:id', (req, res, next) => {
    Exam.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})



module.exports = router;
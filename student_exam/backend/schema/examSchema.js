var mongoose = require('mongoose');

const ExamSchema = mongoose.Schema({
    examType: {type: String},
    examGrade: {type: String, default:"level1"},
    examProblem: {type: String},

    examAnswer1: {type:String},
    examAnswer2: {type:String},
    examAnswer3: {type:String},
    examAnswer4: {type:String},
    examResult: {type:Number},

    examDone:{ type: Boolean, default:false}
});



const Exam = module.exports = mongoose.model('Exam', ExamSchema);
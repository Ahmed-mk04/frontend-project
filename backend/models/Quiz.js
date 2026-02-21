const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Le titre du quiz est requis']
    },
    description: {
        type: String
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        correctAnswer: {
            type: Number, // Index de la bonne réponse
            required: true
        },
        points: {
            type: Number,
            default: 1
        }
    }],
    duration: {
        type: Number, // en minutes
        default: 30
    },
    passingScore: {
        type: Number,
        default: 50 // pourcentage
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);

const indicative = require('indicative/validator')
const Event = require('./../models/event.model.js').model
const Question = require('./../models/question.model.js').model
const Answer = require('./../models/answer.model.js')

module.exports = {
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'required|string|max:255',
                description: 'required|string',
                date: 'required|date',
                time: 'required|date',
                questions: 'array',
            })
            .then(() => {
                const event = new Event()
                event.title = req.body.title
                event.description = req.body.description
                event.date = req.body.date
                event.time = req.body.time

                if (req.body.questions) {
                    for (const question of req.body.questions) {
                        const questionEntity = new Question()
                        questionEntity.content = question.content
                        questionEntity.event = event._id
                        questionEntity.answers = []

                        for (const answer of question.answers) {
                            const answerEntity = new Answer()
                            answerEntity.content = answer
                            answerEntity.question = questionEntity._id
                            answerEntity.save()
                            questionEntity.answers.push(answerEntity.id)
                        }

                        questionEntity.save()
                    }
                }

                event.save()

                res.json({
                    success: true,
                    message: 'Event created',
                    event,
                })
            })
            .catch((err) => {
                res.send(err)
            })
    },
    show: async (req, res) => {
        const event = await Event.findById(req.params.question_id)

        if (!event) {
            res.json({
                success: false,
                message: 'No event found',
            })
        }

        const questions = await Question.find({ event: event.id }).populate(
            'answers'
        )
        event.questions = questions

        res.json({
            success: true,
            event,
            statistics: [],
        })
    },
}
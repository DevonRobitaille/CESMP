const Publication = require('../model/Publication');
const User = require('../model/User')

const endOfYear = require('date-fns/endOfYear')
const startOfYear = require('date-fns/startOfYear')

const createPublication = async (req, res) => {
    const { title, editors, medium, focusArea, type } = req.body

    if (!title || title == "") return res.status(204).json({ 'message': 'Could not find title' })

    const user = req?.user
    const foundUser = await User.findOne({ 'username': user }).exec()
    if (!foundUser) return res.status(204).json({ 'message': 'Could not find user' })

    // return all ID's for editors
    let foundEditors = []
    if (editors.length > 0) {
        foundEditors = await User.find({ 'username': { $in: editors } }, 'id').exec()
    }
    foundEditors = foundEditors.map(obj => obj._id)
    // Create Publication
    const publication = await Publication.create({
        owner: foundUser.id,
        title,
        editors: foundEditors,
        medium,
        focusArea,
        type
    });

    if (!publication) return res.status(204).json({ 'message': 'Could not create publication' });
    res.json({ 'publicationID': publication._id });
}

const getPublication = async (req, res) => {
    let { medium, title, focusArea, type, years, author } = req.body

    if (!Object.keys(req.body).some(val => req.body[val].length > 0)) {
        const publications = await Publication.find().populate('owner', '-__v -_id -password -refreshToken -role').populate('editors', '-__v -_id -password -refreshToken -role').exec()
        res.json(publications)
    } else {
        // return all ID's for editors
        let foundAuthors = []
        if (author.length > 0) {
            foundAuthors = await User.find({ 'username': { $in: author } }, 'id').exec()
        }
        foundAuthors = foundAuthors.map(obj => obj._id)

        // Create the list of criteria
        let criteria = Object.keys(req.body).map(c => {
            if (req.body[c].length > 0) return { [c]: { $in: req.body[c] } }
        })
        criteria = criteria.filter(val => val?.constructor === ({}).constructor)

        // title
        let re = new RegExp(title, 'i')
        if (title) criteria.push({ 'title': { $regex: re } })

        // editors and owner
        if (author?.length > 0) {
            author = {
                $or: [
                    { 'editors': { $in: foundAuthors } },
                    { 'owner': { $in: foundAuthors } }
                ]
            }
            criteria.push({ ...author })
        }

        // year
        if (years?.length > 0) {
            years = years.map((year => {
                year = (parseInt(year) + 1).toString()
                return {
                    "updatedAt": {
                        $gte: startOfYear(new Date(year)),
                        $lte: endOfYear(new Date(year))
                    }
                }
            }))
            criteria.push({
                $or: [...years]
            })
        }
        criteria = criteria.filter((obj, index) => {
            return Object.keys(obj)[0] != 'years'
        })

        const publications = await Publication.find({
            $and: [
                ...criteria
            ]
        }).populate('owner editors', '-__v -_id -password -refreshToken -role').exec()

        res.json(publications)
    }
}

module.exports = {
    createPublication,
    getPublication
}
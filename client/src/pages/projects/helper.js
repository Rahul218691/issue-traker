export const validateProjectDetails = ({
    title,
    description,
    category,
    assignee,
    startDate,
    projectLead
}) => {
    const errors = {}

    if (!title) {
        errors['title'] = 'Project Title is Required'
    }

    if (!description) {
        errors['description'] = 'Please add project description'
    }

    if (!category || !category.length) {
        errors['category'] = "Please choose project category"
    }

    if (!startDate) {
        errors['startDate'] = "Please select project start date"
    }

    if (!projectLead) {
        errors['projectLead'] = "Please choose a project lead"
    }

    if (!assignee || !assignee.length) {
        errors['assignee'] = "Please choose assignee"
    }

    return errors
}
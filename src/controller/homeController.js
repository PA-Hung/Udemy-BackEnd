import userServices from '../service/userService'

const handleTest = (req, res) => {
    return res.render("home.ejs")
}

const handleUserPage = async (req, res) => {

    let userInfo = await userServices.getUserInfo()
    //console.log('check user info >>>>', userInfo)
    return res.render("user.ejs", { userInfo })
}

const handleCreateNewUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    userServices.createNewUser(email, password, username)
    res.redirect("/user")

}

const handleDeleteUser = async (req, res) => {
    let userId = req.params.id
    //console.log('check idddddd', UserId)
    await userServices.deleteUser(userId)
    return res.redirect("/user")
}

const handleGetInfoUpdateUser = async (req, res) => {
    let userId = req.params.id
    let user = await userServices.getUserById(userId)
    let userInfo = {}
    userInfo = user
    //console.log('>>>>>', userInfo)
    return res.render('user-update.ejs', { userInfo })
}

const handlePostInfoUpdateUser = async (req, res) => {
    //console.log('>>>>> check data', req.body)
    let id = req.body.id
    let email = req.body.email
    let username = req.body.username
    await userServices.postUpdateUserById(email, username, id)
    return res.redirect("/user")
}

module.exports = {
    handleTest: handleTest,
    handleUserPage: handleUserPage,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleGetInfoUpdateUser: handleGetInfoUpdateUser,
    handlePostInfoUpdateUser: handlePostInfoUpdateUser,
}
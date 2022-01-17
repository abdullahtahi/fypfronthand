const PORT = process.env.PORT || 3000
// const connection = require('./node-apis/connection/connections')
const express = require('express')
const app = express()

const SetUser = require('./node-apis/insert-user/insertUser')
const SetHelper = require('./node-apis/insert-helper/insertHelper')
const GetUsers = require('./node-apis/get-users/getUsers')
const GetHelpers = require('./node-apis/get-helpers/getHelpers')
const FindUser = require('./node-apis/find-user-if-already-in-db/findUserExistance')
const AddServiceRecord = require('./node-apis/add-service-record/addServiceRecord')
const GetServiceRecord = require('./node-apis/get-service-record/getServiceRecord')
const UpdateUserLocation = require('./node-apis/update-user-location/updateUserLocation')
const UpdateHelperLocation = require('./node-apis/update-helper-location/updateHelperLocation')
const FindUserForLogin = require('./node-apis/find-user-for-login/findUserForLogin')
const UpdateUserProfile = require('./node-apis/update-user-profile/updateUserProfile')
const UpdateHelperProfile = require('./node-apis/update-helper-profile/updateHelperProfile')
const GetUsageHistory = require('./node-apis/get-user-history/getUsageHistory')
const AddUsageHistory = require('./node-apis/add-usage-history/addUsageHistory')
const LogUserOut = require('./node-apis/user-logout/userLogout')
const FindHelperForLogin = require('./node-apis/find-helper-for-login/helperLogin')
const LogHelperOut = require('./node-apis/helper-logout/logoutHelper')
const AddUserReviewToHelper = require('./node-apis/add-user-review-to-helper/addReview')
const GetHelperReviews = require('./node-apis/get-helper-reviews/getHelperReviews')
const AddMechanicNote = require('./node-apis/add-mechanic-note/addMechanicNote')
const GetMechanicNotes = require('./node-apis/get-mechanic-notes/getMechanicNotes')
const SendUserRequest = require('./node-apis/send-request-to-helper/sendRequestToHelper')
const GetUserRequests = require('./node-apis/get-user-request/getUserRequest')
const AcceptUserRequest = require('./node-apis/user-request-accept/userRequestAccept')
const DeclineUserRequest = require('./node-apis/user-request-decline/userRequestDecline')
const UpdateHelperActiveStatus = require('./node-apis/update-helper-active-status/updateHelperActiveStatus')
const UpdateCostOfService = require('./node-apis/update-service-cost-from-helper/updateServiceCost')
const GetUserCurrentJob = require('./node-apis/get-current-job/getCurrentJob')
const PayWithWallet = require('./node-apis/pay-with-wallet/payWithWallet')
const PayWithCash = require('./node-apis/pay-with-cash/payWithCash')
const CheckIfUserAlreadyExistsInDatabase = require('./node-apis/check-if-user-is-already-in-db/userCheckAlreadyInDb')
const CheckIfHelperAlreadyExistsInDatabase = require('./node-apis/check-if-helper-is-already-in-db/checkIfHelperIsAlreadyInDb')
const GetUserWalletValue = require('./node-apis/get-user-wallet-value/getUserWalletValue')
const CheckUserForForgotPassword = require('./node-apis/check-user-for-forgot-password/checkUserForForgotPass')
const UpdateUserPassword = require('./node-apis/update-user-password/updateUserPassword')
const CheckHelperForForgotPassword = require('./node-apis/check-helper-for-forgot-password/checkHelperForForgotPassword')
const UpdateHelperPassword = require('./node-apis/update-helper-password/updateHelperPassword')
const GetTowersForMechanic = require('./node-apis/get-towers-for-mechanic/getTowersForMechanic')
const MechanicRequestToTower = require('./node-apis/mechanic-request-to-tower/mechanicRequestToTower')
const GetMechanicTowerJob = require('./node-apis/get-mechanic-tower-job/getMechanicTowerJob')

app.use(express.json())
app.use(express.urlencoded())
app.get('/', (req, res) => {
    res.send('Working')
})
app.use('/insert-user', SetUser)
app.use('/insert-helper', SetHelper)
app.use('/get-users', GetUsers)
app.use('/get-helpers', GetHelpers)
app.use('/find-user', FindUser)
app.use('/add-service-record', AddServiceRecord)
app.use('/get-service-record', GetServiceRecord)
app.use('/update-user-location', UpdateUserLocation)
app.use('/update-helper-location', UpdateHelperLocation)
app.use('/update-user-profile', UpdateUserProfile)
app.use('/update-helper-profile', UpdateHelperProfile)
app.use('/find-user-for-login', FindUserForLogin)
app.use('/get-user-usage-history', GetUsageHistory)
app.use('/add-user-usage-history', AddUsageHistory)
app.use('/logout-user', LogUserOut)
app.use('/find-helper-for-login', FindHelperForLogin)
app.use('/logout-helper', LogHelperOut)
app.use('/add-user-review-to-helper', AddUserReviewToHelper)
app.use('/get-helper-reviews', GetHelperReviews)
app.use('/add-mechanic-note', AddMechanicNote)
app.use('/get-mechanic-notes', GetMechanicNotes)
app.use('/send-request-to-recevier', SendUserRequest)
app.use('/get-user-request', GetUserRequests)
app.use('/accept-user-request', AcceptUserRequest)
app.use('/decline-user-request', DeclineUserRequest)
app.use('/update-helper-active-status', UpdateHelperActiveStatus)
app.use('/update-cost-of-service', UpdateCostOfService)
app.use('/get-current-job', GetUserCurrentJob)
app.use('/pay-with-wallet', PayWithWallet)
app.use('/pay-with-cash', PayWithCash)
app.use('/check-for-user-in-database', CheckIfUserAlreadyExistsInDatabase)
app.use('/check-for-helper-in-database', CheckIfHelperAlreadyExistsInDatabase)
app.use('/get-user-wallet-value', GetUserWalletValue)
app.use('/check-user-for-forgot-password', CheckUserForForgotPassword)
app.use('/update-user-password', UpdateUserPassword)
app.use('/check-helper-for-forgot-password', CheckHelperForForgotPassword)
app.use('/update-helper-password', UpdateHelperPassword)
app.use('/get-towers-for-mechanic', GetTowersForMechanic)
app.use('/mechanic-request-to-tower-for-service', MechanicRequestToTower)
app.use('/get-mechanic-tower-job', GetMechanicTowerJob)


app.listen(PORT, () => {
    console.log('Server listening at ', PORT)
})

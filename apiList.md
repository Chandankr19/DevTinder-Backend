# DevTinder APIs

##authRouter
- POST /signUp
- POST /login
- POST /logout

##profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

##connectionRequestRouter
- POST /request/send/:status(interested)/:userId
- POST /request/send/:status(ignored)/:userId
- POST /request/review/:status(accepted)/:requestId
- POST /request/review/:status(rejected)/:requestId

##userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
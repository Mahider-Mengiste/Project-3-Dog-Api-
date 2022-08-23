# Dogs App Client

This is a client for our dog app. It will users to see, and create new dog, as well as edit them, and add leash for their dogs.

### Route Table
## Route Table

### User route table

Verb| Route | Description |
---| ----- | ----------- |
POST| /sign-up | allows users to create a new account |
GET| /sign-in | allows users to sign into their account |
DELETE| /sign-out | allows users to sign out of their account |
PATCH| /change-password | allows users to change their password |

### Dog route table

Verb| Route | Description |
---| ----- | ----------- |
GET| /dogs | allows user to view all dogs|
GET| /dogs/:id | allows user to view a dog |
POST| /dogs | allows user to create new dog of their account |
PATCH| /dogs/:id | allows user to update dog|
DELETE| /dogs/:id | allows user to delete dog|

### comment route table

Verb| Route | Description |
---| ----- | ----------- |
POST| /create-comment | allows user to create new comment|
PATCH| /edit-comment | allows user to update comment|
DELETE| /delete-comment | allows user to delete comment|

### leash route table

Verb| Route | Description |
---| ----- | ----------- |
POST| /leashes | allows user to create new comment|
PATCH| /leashes/:dogId | allows user to update comment|
DELETE| /leashes/dogId/:leashId | allows user to delete comment|

### ERD


![ERD](planning/IMG_2241.heic)
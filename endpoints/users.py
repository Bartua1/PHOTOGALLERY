from silence.decorators import endpoint

@endpoint(
	route="/users/$userId",
	method="GET",
	sql="SELECT * FROM Users WHERE userId = $userId"
)

def get_by_id():
	pass

###############################################################################

@endpoint(
    route="/users/$userId/photos",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId = $userId"
)
def getPhotoByUserId():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="PUT",
    sql="UPDATE Users SET avatarUrl=$avatarUrl WHERE userId = $userId",
    auth_required=True
)
def updateAvatar(avatarUrl):
    pass

###############################################################################

@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users",
    auth_required=True
)

def getAll():
    pass